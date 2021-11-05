import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrosoft, faWikipediaW, faGoogle, faYahoo, faYoutube, faDailymotion, faPinterest, faVimeo } from '@fortawesome/free-brands-svg-icons';
import { faKiwiBird, faPlayCircle, faMap, faMeteor, faSearch} from '@fortawesome/free-solid-svg-icons';
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

export default function SingleResult({url, pretty_url, title, content, engine, category, data}) {
    let styles = StyleSheet.create({
        resultBody: {
            backgroundColor: '#444',
            maxWidth: '95%',
            minWidth: '95%',
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
            marginBottom: 2,
        },
        resultContent: {
            color: '#fff',
            fontWeight: '400',
            fontSize: 15,
            textAlign: 'justify'
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
            marginTop: 5,
            width: '100%',
            height: 300,
            resizeMode: 'contain',
            borderRadius: 5,
            marginBottom: 10
        },
        videoDesc:{
            color: '#fff',
            fontSize: 18,
            textAlign: 'left'
        }
    });

    let engineIcon = null;

    let openUrl = function(url){
        if(url.length>0){if(Linking.canOpenURL((url.length>0)?url:"http://")){Linking.openURL((url.length>0)?url:"http://");}}
    };

    if(engine){
        switch(engine){
            case 'google':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faGoogle }/>;
                break;
            case 'yahoo':
            case 'yahoo news':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faYahoo }/>;
                break;
            case 'duckduckgo':
            case 'ddg definitions':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faSearch }/>;
                break;
            case 'bing':
            case 'bing videos':
            case 'bing news':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faMicrosoft }/>;
                break;
            case 'wikidata':
            case 'wikipedia':
            case 'wikinews':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faWikipediaW }/>;
                break;
            case 'youtube':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faYoutube }/>;
                break;
            case 'dailymotion':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faDailymotion }/>;
                break;
            case 'pinterest':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faPinterest }/>;
                break;
            case 'vimeo':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faVimeo }/>;
                break;
            case 'openstreetmap':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faMap }/>;
                break;
            case 'photon':
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faMeteor }/>;
                break;
            default:
                engineIcon = <FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faSearch }/>;
                break;
        }
    }
    return (<View style={styles.resultBody}>
        <TouchableOpacity>
        <Text selectable={true} style={styles.resultPrettyUrl} onPress={()=>{openUrl(url)}}>{pretty_url}</Text>
        <Text selectable={true} style={styles.resultTitle} onPress={()=>{openUrl(url)}}>{title}</Text>

        {category=="images" && (
            <Fragment>
                <Image source={{uri: data.thumbnail_src}} style={styles.image_infobox} onPress={()=>{openUrl(data.img_src)}}></Image>
                <Text selectable={true} style={styles.resultTitle} onPress={()=>{openUrl(data.img_src)}}>{data.img_src}</Text>
            </Fragment>
        )}

        {category=="videos" && url.indexOf('peer.tube')<0 &&(
            <Fragment>
                <Image source={{uri: data.thumbnail}} style={styles.image_infobox}></Image>
                <Text selectable={true} style={styles.videoDesc}>{data.author}</Text>
                <Text selectable={true} style={styles.videoDesc}>{data.length}</Text>
            </Fragment>
        )}

        <Text selectable={true} ellipsizeMode="head" style={styles.resultContent}>{content}</Text>

        {engine!=null && (
            <View style={styles.engineList}>
                {category=="videos" && (<FontAwesomeIcon style={styles.engineIcon} size={20} icon={ faPlayCircle }/>)}
                {engineIcon}
                <Text selectable={true} style={styles.engineText}>{engine}</Text>
            </View>
        )}
        </TouchableOpacity>
    </View>);
}