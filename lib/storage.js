import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

function writeData(key, value){
    try {
        AsyncStorage.setItem(key, value); 
    } catch (error) {
        console.log(error);
        alert("Cannot save data");
    }
}

async function readData(key){
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        return null;
    }
}

export {writeData, readData};