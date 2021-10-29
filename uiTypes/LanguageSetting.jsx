import React, {Component, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGlobeAfrica } from '@fortawesome/free-solid-svg-icons';
import { Picker } from '@react-native-picker/picker';
import {readData, writeData} from '../lib/storage';
import * as Localization from 'expo-localization';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Pressable,
    Appearance,
    Linking
} from 'react-native';
export default class LanguageSetting extends Component {
    
    constructor(){
        super();
        this.state = {
            selectedLanguage: null
        };
        this.loadLanguage();
    };

    async setLanguage(value){
        this.setState({selectedLanguage: value});
        writeData("language", value);
    };

    async loadLanguage(){
        var readLanguage = await readData("language");        
        if(!readLanguage)
            readLanguage = Localization.locale.replace("-","_");
        this.setState({selectedLanguage: readLanguage});
    }

    render(){
        let styles = StyleSheet.create({
            resultBody: {
                backgroundColor: '#444',
                width: '50%',
                paddingHorizontal: 10,
                paddingVertical: 2,
                marginVertical: 5,
                borderRadius: 10,
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

        return (<View style={styles.resultBody}>
                    <TouchableOpacity>
                        <Picker style={styles.engineText}
                            selectedValue={this.state.selectedLanguage}
                            onValueChange={(itemValue, itemIndex) =>this.setLanguage(itemValue)}>
                            <Picker.Item label="🇮🇹 Italiano" value="it_IT" />
                            <Picker.Item label="🇺🇸 English" value="en_US"/>
                            <Picker.Item label="🇬🇧 English" value="en_GB"/>
                            <Picker.Item label="🇫🇷 French" value="fr_FR"/>
                        </Picker>    
                    </TouchableOpacity>
                </View>);
    }
}