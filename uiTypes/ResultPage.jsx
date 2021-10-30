import React, { Fragment } from 'react';
import { View, Text, NativeModules, StyleSheet, SafeAreaView, ScrollView, Image, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Sanitizer } from 'sanitize';
import SingleResult from './SingleResult';
import ErrorResult from './ErrorResult';
import Infobox from './Infobox';
import {loadLanguage} from '../lib/languageMan';
import {RequestData} from '../lib/network';
import {hasJsonStructure, ObjectFilter} from '../lib/objects';

var textRef = "";

export default class ResultPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      results: null,
      currentInstance: 'https://searx.sunless.cloud/',
      hasSearched: false,
      errorType: 0,
      pageno: 1,
    };
  }

  RunPrintCommand = function(address, data){
    console.log(address);
    if(data.version!=null)
    console.log(data.version);
    console.log("-----------------------");
    return true;
    
  };

  getInstance = async function(){
    var instances = null;
    var instancesUrl = "https://searx.space/data/instances.json";
    instances = await RequestData(instancesUrl, 'GET', null);
    console.log("parsing instances");
    if(instances.error !=null){console.log(instances);return this.getInstance();}
    if(typeof instances === 'object'){
      instances = instances.instances;
    }
    else
      instances = JSON.parse(instances).instances;
    instances = ObjectFilter(instances, ([address, data])=> data.network_type === 'normal' && 
                                                            address.indexOf('.i2p')<0 &&
                                                            data.error == null &&
                                                            this.RunPrintCommand(address, data) &&
                                                            (data.html!=null)?(["Cjs", "E", "E, js\?", "js\?", "F"].includes(data.html.grade)==false):false &&
                                                            (data.tls!=null)?(data.tls.grade.indexOf('F')<0):false &&
                                                            (data.tls!=null)?(data.tls.grade.indexOf('E')<0):false &&
                                                            (data.version!=null)?data.version.indexOf("1.0.0")>-1:false &&
                                                            address.indexOf('searx.rasp.fr')<0 &&
                                                            address.indexOf('xeek.com')<0 &&
                                                            address.indexOf('ahmia.fi')<0 
                                                            );
    return Object.keys(instances)[Math.floor(Math.random()*Object.keys(instances).length-1)];
  };

  executeSearch = async function(queryData, newInstance, currAttempts) {
      if(queryData.length<0)return;
      let lang = await loadLanguage();
      var max = 5;
      var attempts = (currAttempts!=null)?currAttempts:0;
      console.log("attempt " + attempts);
      console.log("mem instance: " + this.state.currentInstance);
      var url = (newInstance!=null)?newInstance:((this.state.currentInstance!=null)?this.state.currentInstance:await this.getInstance());
      //if(url == null) url = "https://searx.sunless.cloud/"; //Fallback
      var sanitizer = new Sanitizer();
      var saneInput = sanitizer.str(queryData);
      var encodedQueryData = encodeURIComponent(saneInput);
      var urlParameter = "q=" + encodedQueryData + "&language=" + lang.replace("_", "-") + "&pageno=" + this.state.pageno + "&format=json";
      console.log(url+ 'search' + "?"+urlParameter);
      var result = await RequestData(url+'search', 'POST', urlParameter);
      if(result.error !=null){
        if(attempts<5){
          attempts+=1;
          this.executeSearch(queryData, url, attempts);
        }else{
          this.setState({errorType: 429, hasSearched: true});  
        }
      }else{
        console.log("updating state result = " + typeof result);
        this.setState({results: result, errorType: 0, currentInstance: url,  hasSearched: true});
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
    let resultsObj = this.state.results;
    console.log(typeof resultsObj);
    if(typeof resultsObj !== 'object'){
      resultsObj = JSON.parse(this.state.results);
    }else{
      console.log("resultobj: " + resultsObj);
    }
    let infoboxList = null;
    if(Object.keys(resultsObj.infoboxes).length>0){
      console.log("There are infoboxes");
      infoboxList = (<Fragment>
        {resultsObj.infoboxes.map((infoboxEntry, i) =>{
         return (<Infobox title={infoboxEntry.infobox} url={infoboxEntry.id} content={infoboxEntry.content} image={infoboxEntry.img_src} engine={infoboxEntry.engine}/>)
        })} 
      </Fragment>);     
    }
    //console.log(resultsObj.results.length);
    return (<Fragment>
      {infoboxList}
      {resultsObj.results.map((resultEntry, i) => {
        return (<SingleResult key={i} title={resultEntry.title} pretty_url={resultEntry.pretty_url} url={resultEntry.url} content={resultEntry.content} engine={resultEntry.engine}/>)
      })}
      {resultsObj.results.length==0 &&
      <TouchableHighlight onPress={()=>{this.setState({results: null, errorType: 0, currentInstance: null,  hasSearched: false})}}>
        <ErrorResult type="Error_No_Result"/>
      </TouchableHighlight>
      }
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
          this.executeSearch(textRef!=""?textRef:query);

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