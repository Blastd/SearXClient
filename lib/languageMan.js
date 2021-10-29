import * as Localization from 'expo-localization';
import {readData, writeData} from './storage';

async function loadLanguage(){
    var readLanguage = await readData("language");        
    if(!readLanguage)
        readLanguage = Localization.locale.replace("-","_");
    return readLanguage;
}

export {loadLanguage};