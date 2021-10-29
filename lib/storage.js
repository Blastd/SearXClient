import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

async function writeData(key, value){
    try {
        await AsyncStorage.setItem(key, value); 
    } catch (error) {
        Alert("Cannot save data", "title");
    }
}

async function readData(key){
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        Alert("Cannot read data", "title");
    }
}