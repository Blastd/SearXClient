import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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

export default function Suggestion({value}) {
    let styles = StyleSheet.create({
        resultBody: {
            backgroundColor: '#444',
            width: '90%',
            padding: 10,
            marginVertical: 5,
            borderRadius: 10,
        },
        resultTitle: {
            color: '#69c8db',
            fontWeight: '700',
            fontSize: 18,
        }
    });

    return (<View style={styles.resultBody}>
        <TouchableOpacity>
            <Text selectable={true} style={styles.resultTitle}>{value}</Text>
        </TouchableOpacity>
    </View>);
}