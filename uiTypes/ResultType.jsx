import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import SingleResult from './SingleResult';
import ErrorResult from './ErrorResult';
import Infobox from './Infobox';
import { Fragment } from 'react';
import { Text } from 'react-native';
export default function ResultType({data}) {
    switch(data.category){
        case 'infobox':
            return (<Infobox title={data.infobox} url={data.id} content={data.content} image={data.img_src} engine={data.engine} urls={data.urls}/>);
        case 'general':
        case 'videos':
        case 'files':
        case 'images':
        case 'it':
        case 'map':
        case 'music':
        case 'news':
        case 'science':
            return (<SingleResult title={data.title} pretty_url={data.pretty_url} url={data.url} category={data.category} content={data.content} engine={data.engine} data={data}/>);
       default:
            console.log(data.category);
            return (<Text>Could not determine type</Text>);
    }
}