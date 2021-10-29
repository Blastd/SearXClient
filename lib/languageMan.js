import * as Localization from 'expo-localization';
import {readData, writeData} from './storage';

async function loadLanguage(){
    var readLanguage = await readData("language");        
    if(!readLanguage)
        readLanguage = Localization.locale.replace("-","_");
    return readLanguage;
}

function compare( a, b ) {
    if ( a[1] < b[1] ){
      return -1;
    }
    if ( a[1] > b[1] ){
      return 1;
    }
    return 0;
  }

let languageList = [
    ["🇮🇹 Italiano","it_IT"],
    ["🇺🇸 English","en_US"],
    ["🇬🇧 English","en_GB"],
    ["🇫🇷 French","fr_FR"],
].sort(compare);

export {loadLanguage, languageList};