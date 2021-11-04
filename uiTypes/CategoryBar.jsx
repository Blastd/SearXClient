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
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  /**
   * Handles Visibility change in search results, by updating parent's state
   *  @returns void
   */
  handleVisibilityChange(e) {
    this.props.onChangeVisibility(e.state);
  }

  /**
   * Handles click of a category, toggles same-name value in state
   * @returns void
   */
  handleClick(keyName){
    let changed = 0;
    switch(keyName){
      case 'general':
        this.setState({category_general: !this.state.category_general});
        changed++;
        break;
      case 'videos':
        this.setState({category_videos: !this.state.category_videos});
        changed++;
        break;
      case 'files':
        this.setState({category_files: !this.state.category_files});
        changed++;
        break;
      case 'images':
        this.setState({category_images: !this.state.category_images});
        changed++;
        break;
      case 'it':
        this.setState({category_it: !this.state.category_it});
        changed++;
        break;
      case 'map':
        this.setState({category_map: !this.state.category_map});
        changed++;
        break;
      case 'music':
        this.setState({category_music: !this.state.category_music});
        changed++;
        break;
      case 'news':
        this.setState({category_news: !this.state.category_news});
        changed++;
        break;
      case 'science':
        this.setState({category_science: !this.state.category_science});
        changed++;
        break;
    }
    if(changed>0){
      console.log(changed);
      this.handleVisibilityChange(this);
    }
    
  }

  render(){
      let styles = StyleSheet.create({
        scrollViewStyle:{
            width: '100%',
            marginTop: 10,
            paddingBottom: 10,
            marginHorizontal: '2.5%'
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
            fontSize: 25,
            paddingHorizontal: 15,
            paddingTop: 10,
            paddingBottom: 15,
            textAlignVertical: 'center',
            borderRadius: 40,
            marginHorizontal: 5,
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
              <Text style={{...styles.buttonStyle, ...this.state.category_files?styles.buttonStyleOn:null}} key="files" onPress={(e)=>{this.handleClick("files")}}>Files</Text>
              <Text style={{...styles.buttonStyle, ...this.state.category_science?styles.buttonStyleOn:null}} key="science" onPress={(e)=>{this.handleClick("science")}}>Science</Text>
          </ScrollView>
      );
  }
}