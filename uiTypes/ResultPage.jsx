import React, { Fragment } from 'react';
import { View, Text, NativeModules, StyleSheet, FlatList, Image, TextInput, TouchableHighlight, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExecuteSearch, InitSearch } from '../lib/network';
import * as Progress from 'react-native-progress';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SingleResult from './SingleResult';
import ErrorResult from './ErrorResult';
import CategoryBar from './CategoryBar';
import Infobox from './Infobox';
import ResultType from './ResultType';
let textRef = "";
/**
 * This is the generic search result page which wraps every search result screen.
 * The query is passed here via props and by default it is given the generic search result.
 */
export default class ResultPage extends React.Component {

  constructor(props){
    var {query} = props.route.params;
    textRef = query;
    super(props);
    this.loadingRef = React.createRef();
    this.state = {
      results: null,
      currentInstance: 'https://searx.sunless.cloud/',
      hasSearched: false,
      errorType: 0,
      pageno: 1,
      currentQuery: query,
      categories: {
        category_general: true,
        category_videos: true,
        category_files: true,
        category_images: false,
        category_it: false,
        category_map: true,
        category_music: true,
        category_news: true,
        category_science: true
      }
    };
    this.updateVisibility = this.updateVisibility.bind(this);
  }

/**
 * Updates visibility in Result page root
 * @param {state} newVisibility is the Category Bar updated state
 */
  updateVisibility(newVisibility){
    this.setState({
      categories:{
        category_general: newVisibility.category_general,
        category_videos:  newVisibility.category_videos,
        category_files:   newVisibility.category_files,
        category_images:  newVisibility.category_images,
        category_it:      newVisibility.category_it,
        category_map:     newVisibility.category_map,
        category_music:   newVisibility.category_music,
        category_news:    newVisibility.category_news,
        category_science: newVisibility.category_science
      },
      hasSearched: false
    });
  }

  updateSearchBox(){
    if(textRef != this.state.currentQuery)
    this.setState({currentQuery: textRef, hasSearched: false})
  }

  componentDidMount(){
    var {query} = this.props.route.params;
    this.setState({hasSearched: false});
  }

  async componentDidUpdate(){
    if(this.state.hasSearched == false){
      var result = await ExecuteSearch(this.state.currentQuery, this.state.currentInstance, 0, this.state.pageno, this.state.categories);
      this.setState(result);
    }
  }
  
  parseResults(){
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

    let newDataList = [];

    let resultsObj = this.state.results;
    if(typeof resultsObj !== 'object'){
      resultsObj = JSON.parse(this.state.results);
    }
    resultsObj.infoboxes.map((infoboxEntry, i) =>{
      let newKey = "infobox-" + i;
      newDataList.push({...infoboxEntry, category: 'infobox', key: newKey});
    });

    resultsObj.results.map((resultEntry, i) => {
      let newKey = "result-"+i;
      newDataList.push({...resultEntry, key: newKey});
    });
    return newDataList;
    /*let infoboxList = null;
    if(Object.keys(resultsObj.infoboxes).length>0){
      infoboxList = (<Fragment>
        {resultsObj.infoboxes.map((infoboxEntry, i) =>{
         return (<Infobox title={infoboxEntry.infobox} url={infoboxEntry.id} content={infoboxEntry.content} image={infoboxEntry.img_src} engine={infoboxEntry.engine} urls={infoboxEntry.urls}/>)
        })} 
      </Fragment>);     
    }
    return (<Fragment>
      {infoboxList}

      {resultsObj.results.map((resultEntry, i) => {
        return (<SingleResult key={i} title={resultEntry.title} pretty_url={resultEntry.pretty_url} url={resultEntry.url} category={resultEntry.category} content={resultEntry.content} engine={resultEntry.engine} data={resultEntry}/>)
      })}
      {Object.keys(resultsObj.results).length==0 &&
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
      <SingleResult key={resultsObj.results.length+1} title={this.state.currentQuery} pretty_url={""} url={""} content={"Instance: " + this.state.currentInstance} category={"general"} data={{}}/>
    </Fragment>);*/
  }

  render(){
      var styles = StyleSheet.create({
          container: {
            backgroundColor: "#222222"
          },
          search_box_container:{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
            marginBottom: 5
          },
          scroll_box:{
            display: 'flex',
            width: '100%',
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
            height: 52,
            width: '15%',
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
            backgroundColor: '#44bb99',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          search_button_text:{
            fontSize: 25,
            color: 'white',
          },
          search_icon: {
            
            color: '#fff'
          },
          result_container:{
              width: '100%',
          },
      });
      let resultEntries = [];
      if(this.state.results!=null){
        if(this.state.results.message !=null)
          resultEntries = [{category: 'general', content: 'Too many requests', key:'error_key'}];
        else
          resultEntries = this.parseResults();
      }

      const renderItem = ({item})=>(
        <ResultType data={item} />
      );

      return(
        <SafeAreaView style={styles.container}>
            <View style={styles.search_box_container}>
              <TextInput onChangeText={value=>{textRef = value;}} onSubmitEditing={()=>{if(textRef != this.state.currentQuery)this.setState({currentQuery: textRef, hasSearched: false})}} defaultValue={this.state.currentQuery} style={styles.search_box} returnKeyType='search'></TextInput>
              <TouchableHighlight style={styles.search_button} onPress={()=>{this.setState({currentQuery: textRef, hasSearched: false})}}>
                  <FontAwesomeIcon size={20} icon={ faSearch } style={styles.search_icon}/>
              </TouchableHighlight>
            </View>
            <View style={styles.result_container}>
            {/*<Text onPress={()=>{this.flatListRef.scrollToOffset({ animated: true, offset: 0 })}} style={{textAlign: 'center', color:'#fff'}}>Scroll to top</Text>*/}
            <CategoryBar onChangeVisibility={this.updateVisibility} startingState={this.state.categories}/>
            <Progress.Bar ref={this.loadingRef} unfilledColor="#444" borderWidth={0} color="#44bb99" indeterminate={true} width={null} style={{width: '100%', display:(this.state.hasSearched)?'none':'flex'}}/>
            <FlatList ref={(ref) => { this.flatListRef = ref; }} data={resultEntries} renderItem={renderItem} keyExtractor={item => item.key} style={styles.scroll_box_styles} contentContainerStyle={styles.scroll_box}/>
            </View>
        </SafeAreaView>
      );
  }
}