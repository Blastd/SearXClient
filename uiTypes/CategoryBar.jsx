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
    this.state = {
        category_general: true,
        category_videos: true,
        category_files: true,
        category_images: false,
        category_it: true,
        category_map: true,
        category_music: true,
        category_news: true,
        category_science: true
    };
  }



  render(){
      let styles = StyleSheet.create({
        scrollViewStyle:{
            width: '100%',
            marginTop: 10,
            paddingBottom: 10
        },
        barStyle: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        },
        buttonStyleOn: {
            color: '#22aa77',
            backgroundColor: '#1a1a1a',
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            textDecorationColor: '#000',
        },
        buttonStyle: {
            flex: 1,
            flexBasis: 0,
            backgroundColor: '#111',
            color: '#fff',
            fontSize: 25,
            paddingHorizontal: 15,
            paddingTop: 10,
            paddingBottom: 15,
            textAlignVertical: 'center',
            borderRadius: 40,
            marginHorizontal: 5,
        }
      });
      return (
          <ScrollView scrollEnabled={true} horizontal={true} style={styles.scrollViewStyle} contentContainerStyle={styles.barStyle}>
              <Text style={{...styles.buttonStyle, ...this.state.category_general?styles.buttonStyleOn:null}} key="general">General</Text>
              <Text style={{...styles.buttonStyle, ...this.state.category_videos?styles.buttonStyleOn:null}} key="videos">Videos</Text>
              <Text style={{...styles.buttonStyle, ...this.state.category_news?styles.buttonStyleOn:null}} key="news">News</Text>
              <Text style={{...styles.buttonStyle, ...this.state.category_music?styles.buttonStyleOn:null}} key="music">Music</Text>
              <Text style={{...styles.buttonStyle, ...this.state.category_files?styles.buttonStyleOn:null}} key="files">Files</Text>
              <Text style={{...styles.buttonStyle, ...this.state.category_science?styles.buttonStyleOn:null}} key="science">Science</Text>
          </ScrollView>
      );
  }
}