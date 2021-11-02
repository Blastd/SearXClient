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

export default function Infobox({title, url, content, image, engine, urls}) {
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
        },
        image_infobox:{
            width: '100%',
            height: 200,
            resizeMode: 'contain',
            marginBottom: 10
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
    console.log(image);
    return (<View style={styles.resultBody}>
        <TouchableOpacity>
        <Text selectable={true} onPress={()=>{if(url.length>0){if(Linking.canOpenURL((url.length>0)?url:"http://")){Linking.openURL((url.length>0)?url:"http://");}}}}
         style={styles.resultTitle}>{title}</Text>
         </TouchableOpacity>
        {(image!="" && image !=null   ) &&
            <Image source={{uri: image}} style={styles.image_infobox}></Image>
        }
        <Text selectable={true} ellipsizeMode="head" style={styles.resultContent}>{content}</Text>
        {(urls!="" && urls!=null) &&(
            <Fragment>
                <Text style={{...styles.resultTitle, color: '#fff', fontSize: 20}}>Link:</Text>
                {urls.map((urlEntry, i) =>{
                    return (<TouchableOpacity key={i}>
                            <Text onPress={()=>{if(urlEntry.url.length>0){if(Linking.canOpenURL((urlEntry.url.length>0)?urlEntry.url:"http://")){Linking.openURL((urlEntry.url.length>0)?urlEntry.url:"http://");}}}}
                            style={styles.resultTitle}>{urlEntry.title}</Text>
                         </TouchableOpacity>)
                })}
            </Fragment>
        )}
        {engine!=null && (
            <View style={styles.engineList}>
                {engineIcon}
                <Text selectable={true} style={styles.engineText}>{engine}</Text>
            </View>
        )}
    </View>);
}