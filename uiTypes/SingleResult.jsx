import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrosoft, faWikipediaW, faGoogle, faYahoo } from '@fortawesome/free-brands-svg-icons';
import { faKiwiBird} from '@fortawesome/free-solid-svg-icons';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Pressable,
    Appearance,
    Linking
  } from 'react-native';
import { Fragment } from 'react';

export default function SingleResult({url, pretty_url, title, content, engine}) {
    let styles = StyleSheet.create({
        resultBody: {
            backgroundColor: '#444',
            width: '95%',
            padding: 10,
            marginVertical: 5,
            borderRadius: 10,
        },
        resultPrettyUrl: {
            color: '#fff',
            fontWeight: '400',
            fontSize: 12,
            fontStyle: 'italic'
        },
        resultTitle: {
            color: '#69c8db',
            fontWeight: '700',
            fontSize: 18,
        },
        resultContent: {
            color: '#fff',
            fontWeight: '400',
            fontSize: 15,
        },
        engineText:{
            textAlign: 'right',
            color: '#bbb',
            fontWeight: '400',
            fontSize: 13,
        },
        engineIcon:{
            color: '#fff',
            marginRight: 2
        },
        engineList:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
        }
    });
    let engineIcon = null;
    if(engine){
        switch(engine){
            case 'google':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faGoogle }/>;
                break;
            case 'yahoo':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faYahoo }/>;
                break;
            case 'duckduckgo':
            case 'ddg definitions':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faKiwiBird }/>;
                break;
            case 'bing':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faMicrosoft }/>;
                break;
            case 'wikidata':
            case 'wikipedia':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faWikipediaW }/>;
                break;
        }
    }

    return (<View style={styles.resultBody}>
        <TouchableOpacity onPress={()=>{if(Linking.canOpenURL(url)){Linking.openURL(url);}}}>
        <Text selectable={true} style={styles.resultPrettyUrl}>{pretty_url}</Text>
        <Text selectable={true} style={styles.resultTitle}>{title}</Text>
        <Text selectable={true} ellipsizeMode="head" style={styles.resultContent}>{content}</Text>
        {engine!=null && (
            <View style={styles.engineList}>
                {engineIcon}
                <Text selectable={true} style={styles.engineText}>{engine}</Text>
            </View>
        )}
        </TouchableOpacity>
    </View>);
}