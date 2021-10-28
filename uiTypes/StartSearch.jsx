import React, {Component} from 'react';
import { ResultPage } from './ResultPage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableHighlight,
    TextInput,
    Pressable,
    Appearance,
    Linking
  } from 'react-native';

var textRef = "";

const executeSearch = function(queryData, navigation){
  if(queryData.length>0){    
      navigation.navigate('SearchResultUi', {query: queryData, lang: "it-IT"});
  }
};

export default function StartSearch() {
  const navigation = useNavigation();
  var styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#222222",
        justifyContent: "center",
        alignItems: "center"
      },
      search_logo:{
        resizeMode: 'contain',
        width: '80%',
      },
      search_box_container:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      scroll_box:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      search_box:{
        width: '75%',
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
      }
  });

  return(
      <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll_box}>
          <Image style={styles.search_logo} source={require('../assets/searchUI/logo_searx_a.png')}/>
          <View style={styles.search_box_container}>
            <TextInput onChangeText={value=>{textRef = value; console.log(value);}} onSubmitEditing={(e)=>{executeSearch(textRef, navigation);}} style={styles.search_box} returnKeyType='search'></TextInput>
            <TouchableHighlight  style={styles.search_button} onPress={()=>{executeSearch(textRef, navigation)}}>
                <FontAwesomeIcon size={20} icon={ faSearch } style={styles.search_icon}/>
            </TouchableHighlight>
          </View>
      </ScrollView>
      </SafeAreaView>
  );
}