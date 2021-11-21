import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMicrosoft, faWikipediaW, faGoogle, faYahoo, faYoutube, faDailymotion, faPinterest, faVimeo } from '@fortawesome/free-brands-svg-icons';
import { faKiwiBird, faPlayCircle, faMap, faMeteor, faSearch} from '@fortawesome/free-solid-svg-icons';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { withAnchorPoint } from 'react-native-anchor-point';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Pressable,
    Appearance,
    Linking,
    Dimensions
  } from 'react-native';
import { Fragment } from 'react';

export default class SingleResult extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            imgScale: 1.0,
            focalX: 0,
            focalY: 0,
            keepUpdatingZoom: true
        };
        this.imageRef = React.createRef();
        this.imageWidth = 0;
        this.imageHeight = 0;
    }

    getTransform = () => {
        let transform = {
            transform: [{ perspective: 200 }, {scale: this.state.imgScale}],
        };
        return withAnchorPoint(transform, { x: this.state.focalX, y: this.state.focalY }, { width: this.imageWidth, height: this.imageHeight });
    };

    imageOnLayout(event){
        let layout = event.nativeEvent.layout;
        //console.log('height:', layout.height);
        //console.log('width:', layout.width);
        //console.log('x:', layout.x);
        //console.log('y:', layout.y);
        this.imageWidth = layout.width;
        this.imageHeight = layout.height;
        console.log(this.imageWidth + " - " + this.imageHeight);
    }

    componentDidMount(){
        
    }

    render(){
        let {url, pretty_url, title, content, engine, category, data} = this.props;
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
                marginBottom: 10,
                
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

        let onPinchGestureEvent = event => {
            let newFocalX = event.nativeEvent.focalX;
            let newFocalY = event.nativeEvent.focalY;
            this.setState({imgScale: event.nativeEvent.scale, focalX: newFocalX, focalY: newFocalY});
            //imgRef.current.style.transform = {scale: event.nativeEvent.scale};
        }

        let onPinchHandlerStateChange = (event) => {
            if (event.nativeEvent.oldState === State.ACTIVE) {
                this.setState({imgScale: 1.0, focalX: 0, focalY: 0, keepUpdatingZoom: true});
            }else{
                this.setState({keepUpdatingZoom: false});
            }
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
                    <PinchGestureHandler onGestureEvent={onPinchGestureEvent} onHandlerStateChange={onPinchHandlerStateChange}>
                        <Image onLayout={event=>this.imageOnLayout(event)} ref={this.imageRef} source={{uri: data.thumbnail_src}} onLoad={()=>{Dimensions.set("image", )}} style={styles.image_infobox} onPress={()=>{openUrl(data.img_src)}}></Image>
                    </PinchGestureHandler>
                    <Text selectable={true} style={styles.resultTitle} onPress={()=>{openUrl(data.img_src)}}>{data.img_src}</Text>
                </Fragment>
            )}

            {category=="videos" && url.indexOf('peer.tube')<0 &&(
                <Fragment>
                    <PinchGestureHandler onGestureEvent={onPinchGestureEvent} onHandlerStateChange={onPinchHandlerStateChange}> 
                        <Image onLayout={event=>this.imageOnLayout(event)} ref={this.imageRef} source={{uri: data.thumbnail}} style={styles.image_infobox}></Image>
                    </PinchGestureHandler>
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
}