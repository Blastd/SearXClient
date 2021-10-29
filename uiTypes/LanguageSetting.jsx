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
import { languageList } from '../lib/languageMan';
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
                backgroundColor: '#444',
            },
            engineIcon:{
                color: '#fff',
                marginRight: 2
            },
            engineList:{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end'
            },
            itemStyle:{
                backgroundColor: '#444',
                color: '#fff'
            }
        });

        return (<View style={styles.resultBody}>
                    <TouchableOpacity>
                        <Picker itemStyle={styles.itemStyle} mode="dropdown" dropdownIconColor="#fff" dropdownIconRippleColor="#22aa77" style={styles.engineText}
                            selectedValue={this.state.selectedLanguage}
                            onValueChange={(itemValue, itemIndex) =>this.setLanguage(itemValue)}>
                                {languageList.map((resultEntry, i) => {
                                    return (<Picker.Item key={i} style={styles.itemStyle} label={resultEntry[0]} value={resultEntry[1]} />)
                                })}
                        </Picker>    
                    </TouchableOpacity>
                </View>);
    }
}