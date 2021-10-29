import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGlobeAfrica } from '@fortawesome/free-solid-svg-icons';
import { Picker } from '@react-native-picker/picker';
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
            selectedLang: null
          };
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
                        <Picker style={styles.engineText}>
                            <Picker.Item label="🇮🇹 Italiano" />
                            <Picker.Item label="🇺🇸 English" />
                            <Picker.Item label="🇬🇧 English" />
                            <Picker.Item label="🇫🇷 French" />
                        </Picker>    
                    </TouchableOpacity>
                </View>);
    }
}