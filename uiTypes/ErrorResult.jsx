import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

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

export default function ErrorResult({type}) {
    let styles = StyleSheet.create({
        resultBody: {
            backgroundColor: '#444',
            width: '95%',
            padding: 10,
            marginVertical: 5,
            borderRadius: 10,
            textAlign: 'center'
        },
        resultPrettyUrl: {
            color: '#fff',
            fontWeight: '400',
            fontSize: 12,
            fontStyle: 'italic',
            textAlign: 'right'
        },
        resultTitle: {
            color: '#69c8db',
            fontWeight: '700',
            fontSize: 18,
            textAlign: 'center'
        },
        resultContent: {
            color: '#fff',
            fontWeight: '400',
            fontSize: 15,
            textAlign: 'center'
        },
        engineText:{
            textAlign: 'right',
            color: '#bbb',
            fontWeight: '400',
            fontSize: 13,
        },
        engineIcon:{
            color: '#fff',
            marginRight: 2,
            textAlign: 'center',
        },
        centerEverything:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    });

    return (<View style={styles.resultBody}>
        <Text selectable={true} style={styles.resultPrettyUrl}>{type}</Text>
        <View style={styles.centerEverything}>
        <FontAwesomeIcon style={styles.engineIcon} size={50} icon={ faGhost }/>
        <Text selectable={true} style={styles.resultTitle}>We couldn't load any search results</Text>
        <Text selectable={true} ellipsizeMode="head" style={styles.resultContent}>Try using another searX Instance. Click here to reload</Text>
        </View>
    </View>);
}