import React, { Fragment } from 'react';
import { View, Text, NativeModules, StyleSheet, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity} from 'react-native';
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
            minHeight: 68
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
            backgroundColor: '#333',
            color: '#37de9f',
            textDecorationLine: 'none',
            borderColor: '#555',
        },
        buttonStyle: {
            flex: 1,
            flexBasis: 0,
            color: '#777',
            backgroundColor: '#1a1a1a',
            fontSize: 18,
            paddingHorizontal: 15,
            paddingVertical: 15,
            paddingBottom: 20,
            borderRadius: 40,
            marginHorizontal: 5,
            borderWidth: 3,
            borderStyle: 'solid',
            borderColor: '#333',
            textAlign: 'center',
        }
      });
      
      return (
          <ScrollView scrollEnabled={true} horizontal={true} style={styles.scrollViewStyle} contentContainerStyle={styles.barStyle}>
              <TouchableOpacity key="general" onPress={(e)=>{this.handleClick("general")}}>
                <Text style={{...styles.buttonStyle, ...this.state.category_general?styles.buttonStyleOn:null}}>General</Text>
              </TouchableOpacity>
              <TouchableOpacity key="images" onPress={(e)=>{this.handleClick("images")}}>
                <Text style={{...styles.buttonStyle, ...this.state.category_images?styles.buttonStyleOn:null}}>Pictures</Text>
              </TouchableOpacity>
              <TouchableOpacity key="videos" onPress={(e)=>{this.handleClick("videos")}}>
                <Text style={{...styles.buttonStyle, ...this.state.category_videos?styles.buttonStyleOn:null}}>Videos</Text>
              </TouchableOpacity>
              <TouchableOpacity key="news" onPress={(e)=>{this.handleClick("news")}}>
                <Text style={{...styles.buttonStyle, ...this.state.category_news?styles.buttonStyleOn:null}}>News</Text>
              </TouchableOpacity>
              <TouchableOpacity key="music" onPress={(e)=>{this.handleClick("music")}} >
                <Text style={{...styles.buttonStyle, ...this.state.category_music?styles.buttonStyleOn:null}}>Music</Text>
              </TouchableOpacity>
              <TouchableOpacity key="map" onPress={(e)=>{this.handleClick("map")}} >
                <Text style={{...styles.buttonStyle, ...this.state.category_map?styles.buttonStyleOn:null}}>Maps</Text>
              </TouchableOpacity>
              <TouchableOpacity key="files" onPress={(e)=>{this.handleClick("files")}}>
                <Text style={{...styles.buttonStyle, ...this.state.category_files?styles.buttonStyleOn:null}}>Files</Text>
              </TouchableOpacity>
              <TouchableOpacity key="science" onPress={(e)=>{this.handleClick("science")}}>
                <Text style={{...styles.buttonStyle, ...this.state.category_science?styles.buttonStyleOn:null}}>Science</Text>
              </TouchableOpacity>
              <TouchableOpacity key="it" onPress={(e)=>{this.handleClick("it")}}>
                <Text style={{...styles.buttonStyle, ...this.state.category_it?styles.buttonStyleOn:null}}>IT</Text>
              </TouchableOpacity>
          </ScrollView>
      );
  }
}