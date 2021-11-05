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

export default class CategoryBar extends React.Component {

  constructor(props){
    super(props);
    this.state = props.startingState;
    //this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  /**
   * Handles click of a category, toggles same-name value in state
   * @returns void
   */
  handleClick(keyName){
    let currentState = this.state;
    switch(keyName){
      case 'general':
        /*if(currentState.category_images == true && currentState.category_general == false)
          currentState.category_images= false;*/
        currentState.category_general = !currentState.category_general;
        break;
      case 'videos':
        currentState.category_videos= !currentState.category_videos;
        break;
      case 'files':
        currentState.category_files= !currentState.category_files;
        break;
      case 'images':
        /*if(currentState.category_images == false && currentState.category_general == true)
          currentState.category_general = false;*/
        currentState.category_images= !currentState.category_images;
        break;
      case 'it':
        currentState.category_it= !currentState.category_it;
        break;
      case 'map':
        currentState.category_map= !currentState.category_map;
        break;
      case 'music':
        currentState.category_music= !currentState.category_music;
        break;
      case 'news':
        currentState.category_news= !currentState.category_news;
        break;
      case 'science':
        currentState.category_science= !currentState.category_science;
        break;
    }
    this.props.onChangeVisibility(currentState);
    this.setState(currentState);
  }

  render(){
      let styles = StyleSheet.create({
        scrollViewStyle:{
            width: '100%',
            marginTop: 5,
            paddingBottom: 10,
        },
        barStyle: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        },
        buttonStyleOn: {
            textDecorationStyle: 'solid',
            textDecorationColor: '#000',
            backgroundColor: '#111',
            color: '#fff',
            textDecorationLine: 'none'
        },
        buttonStyle: {
            flex: 1,
            flexBasis: 0,
            color: '#22aa77',
            backgroundColor: '#1a1a1a',
            fontSize: 20,
            paddingHorizontal: 15,
            paddingTop: 10,
            paddingBottom: 10,
            textAlignVertical: 'center',
            borderRadius: 40,
            marginHorizontal: 15,
            textDecorationLine: 'line-through'
        }
      });
      
      return (
          <ScrollView scrollEnabled={true} horizontal={true} style={styles.scrollViewStyle} contentContainerStyle={styles.barStyle}>
              <Text style={{...styles.buttonStyle, ...this.state.category_general?styles.buttonStyleOn:null}} key="general" onPress={(e)=>{this.handleClick("general")}}>General</Text>
              <Text style={{...styles.buttonStyle, ...this.state.category_images?styles.buttonStyleOn:null}} key="images" onPress={(e)=>{this.handleClick("images")}}>Pictures</Text>
              <Text style={{...styles.buttonStyle, ...this.state.category_videos?styles.buttonStyleOn:null}} key="videos" onPress={(e)=>{this.handleClick("videos")}}>Videos</Text>
              <Text style={{...styles.buttonStyle, ...this.state.category_news?styles.buttonStyleOn:null}} key="news" onPress={(e)=>{this.handleClick("news")}}>News</Text>
              <Text style={{...styles.buttonStyle, ...this.state.category_music?styles.buttonStyleOn:null}} key="music" onPress={(e)=>{this.handleClick("music")}} >Music</Text>
              <Text style={{...styles.buttonStyle, ...this.state.category_map?styles.buttonStyleOn:null}} key="map" onPress={(e)=>{this.handleClick("map")}} >Maps</Text>
              <Text style={{...styles.buttonStyle, ...this.state.category_files?styles.buttonStyleOn:null}} key="files" onPress={(e)=>{this.handleClick("files")}}>Files</Text>
              <Text style={{...styles.buttonStyle, ...this.state.category_science?styles.buttonStyleOn:null}} key="science" onPress={(e)=>{this.handleClick("science")}}>Science</Text>
              <Text style={{...styles.buttonStyle, ...this.state.category_it?styles.buttonStyleOn:null}} key="it" onPress={(e)=>{this.handleClick("it")}}>IT</Text>
          </ScrollView>
      );
  }
}