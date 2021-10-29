import React, { Fragment } from 'react';
import { View, Text, NativeModules, StyleSheet, SafeAreaView, ScrollView, Image, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Sanitizer } from 'sanitize';
import SingleResult from './SingleResult';
import {loadLanguage} from '../lib/languageMan';
import {ObjectFilter} from '../lib/objects';

var textRef = "";

export default class ResultPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      results: null,
      hasSearched: false,
      errorType: 0,
      pageno: 1,
    };
  }

  RequestData = async function(url, method, data){
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      if(method === 'POST')
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onload = function(){
        if(this.status >=200 && this.status < 300)
          resolve(xhr.response);
        else
          resolve({
            error: 'error',
            status: this.status,
            statusText: this.statusText
          });
      };
      xhr.onerror = function(evt){
        resolve({
          error: 'error',
          status: this.status,
          statusText: this.statusText
        });
      };
    xhr.send(data);
    });
  };

  RunPrintCommand = function(address, data){
    console.log(address);
    if(data.tls!=null)
    console.log(data.tls.grade);
    if(data.html!=null)
    console.log(data.html.grade);
    console.log("-----------------------");
    return true;
    
  };

  getInstances = async function(){
    var instances = null;
    var instancesUrl = "https://searx.space/data/instances.json";
    instances = await this.RequestData(instancesUrl, 'GET', null);
    console.log("parsing instances");
    instances = JSON.parse(instances).instances;
    instances = ObjectFilter(instances, ([address, data])=> data.network_type === 'normal' && 
                                                            address.indexOf('.i2p')<0 &&
                                                            data.error == null &&
                                                            //this.RunPrintCommand(address, data) &&
                                                            (data.html!=null)?(["Cjs", "E", "E, js\?", "js\?"].includes(data.html.grade)==false):false &&
                                                            (data.tls!=null)?(data.tls.grade.indexOf('F')<0):false &&
                                                            (data.tls!=null)?(data.tls.grade.indexOf('E')<0):false
                                                            );
    return Object.keys(instances)[Math.round(Math.random()*Object.keys(instances).length-1)];
  };

  executeSearch = async function(queryData, currAttempts) {
      let lang = await loadLanguage();
      if(queryData.length>0){
        var max = 5;
        var attempts = currAttempts!=null?currAttempts:0;
        console.log("attempt " + attempts);
        var url = await this.getInstances();
        if(url == null) var url = "https://searx.sunless.cloud/";
        url +="search";
        var sanitizer = new Sanitizer();
        var saneInput = sanitizer.str(queryData);
        var encodedQueryData = encodeURIComponent(saneInput);
        var urlParameter = "q=" + encodedQueryData + "&language=" + lang.replace("_", "-") + "&pageno=" + this.state.pageno + "&format=json";
        var parent = this;
        console.log(url + "?"+urlParameter);
        var result = await this.RequestData(url, 'POST', urlParameter);
        if(result.error !=null){
          if(attempts<5){
            attempts+=1;
            this.executeSearch(attempts);
          }else{
            parent.setState({results: {message: 'error_too_many_attempts'}, hasSearched: true});  
          }
        }else
          parent.setState({results: result, hasSearched: true});
      }
  };

  parseResults = function(){

    let styles = StyleSheet.create({
      pageVisualizer: {
        backgroundColor: '#444',
        width: '95%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row'
      },
      pageno:{
        flex: 1,
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center'
      },
      pageButton:{
        flex: 1,
        color:'#fff'
      }
    });
    console.log("parsing results");
    let resultsObj = JSON.parse(this.state.results);
    //console.log(resultsObj.results.length);
    return (<Fragment>
      {resultsObj.results.map((resultEntry, i) => {
        return (<SingleResult key={i} title={resultEntry.title} pretty_url={resultEntry.pretty_url} url={resultEntry.url} content={resultEntry.content} engine={resultEntry.engine}/>)
      })}
      <View style={styles.pageVisualizer}>
        <TouchableOpacity onPress={()=>{if(this.state.pageno>1)this.setState({pageno: this.state.pageno-1, hasSearched: false});}}>
          <FontAwesomeIcon style={styles.pageButton} size={20} icon={ faArrowLeft }/>
        </TouchableOpacity>
        <Text style={styles.pageno}>{this.state.pageno}</Text>
        <TouchableOpacity onPress={()=>{this.setState({pageno: this.state.pageno+1, hasSearched: false});}}>
          <FontAwesomeIcon style={styles.pageButton} size={20} icon={ faArrowRight }/>
        </TouchableOpacity>
      </View>
      <SingleResult key={resultsObj.results.length+1} title={textRef} pretty_url={""} url={""} content={""}/>
    </Fragment>);
    
  }

  render(){
      var {query} = this.props.route.params;
      if(query && this.state.hasSearched == false)
          this.executeSearch(query);

      var styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: "#222222",
            justifyContent: "center",
          },
          search_box_container:{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginTop: 110,
          },
          scroll_box:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },
          scroll_box_styles:{
            flex: 0,
            flexGrow: 1,
            height: '100%',
            borderBottomColor: '#fff',
            borderBottomWidth: 4
          },
          search_box:{
            width: '80%',
            height: 52,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            backgroundColor: '#444',
            borderWidth: 2,
            borderRightWidth: 0,
            borderColor: '#555',
            fontSize: 22,
            paddingHorizontal: 10,
            color: '#fff'
          },
          search_button:{
            borderWidth: 2,
            borderLeftWidth: 0,
            borderColor: '#555',
            flex: 0,
            padding: 10,
            height: 52,
            width: '15%',
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
            backgroundColor: '#44bb99',
          },
          search_button_text:{
            fontSize: 25,
            color: 'white',
          },
          search_icon: {
            marginTop: 4,
            marginLeft: 7,
            color: '#fff'
          },
          result_container:{
              width: '100%',
              marginTop: 0,
          },
      });
      let resultEntries = (<Fragment></Fragment>);
      if(this.state.results!=null){
        if(this.state.results.message !=null)
          resultEntries = (<Fragment><Text>Error Too many attempts</Text></Fragment>)
        else
          resultEntries = this.parseResults();
      }

      return(
          <SafeAreaView style={styles.container}>
              <View style={styles.search_box_container}>
                <TextInput onChangeText={value=>{textRef = value; console.log(value);}} defaultValue={query} onSubmitEditing={(e)=>{this.executeSearch(textRef);}} style={styles.search_box} returnKeyType='search'></TextInput>
                <TouchableHighlight style={styles.search_button} onPress={()=>{this.executeSearch(textRef)}}>
                    <FontAwesomeIcon size={20} icon={ faSearch } style={styles.search_icon}/>
                </TouchableHighlight>
              </View>
              <View style={styles.result_container}>
              <ScrollView style={styles.scroll_box_styles} contentContainerStyle={styles.scroll_box}>
                  {resultEntries}
              </ScrollView>
              </View>
          </SafeAreaView>
      );
  }
}