import * as Localization from 'expo-localization';
import {readData, writeData} from './storage';

async function loadLanguage(){
    var readLanguage = await readData("language");        
    if(!readLanguage)
        readLanguage = Localization.locale.replace("-","_");
    return readLanguage;
}

let languageList = [
    ["🇮🇹 Italiano","it_IT"],
    ["🇺🇸 English","en_US"],
    ["🇬🇧 English","en_GB"],
    ["🇫🇷 French","fr_FR"],
];

export {loadLanguage, languageList};