import {loadLanguage} from './languageMan';
import { Sanitizer } from 'sanitize';
import {hasJsonStructure, ObjectFilter} from '../lib/objects';

function onOrOff(name, value){
  return value==true?'&' + name +'=on':'';
}

async function RetrieveAutocomplete(){
  let ddgAC = 'https://ac.duckduckgo.com/ac/?{0}&type=list';
  let gooAC = 'https://suggestqueries.google.com/complete/search?client=toolbar&';
  let scAC = 'https://startpage.com/do/suggest?{query}';
}

async function RequestData(url, method, data){
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        if(method === 'POST')
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.responseType = 'json';
        xhr.onload = function(){
        if(this.status >=200 && this.status < 300 && xhr.responseType === 'json'){
            resolve(xhr.response);
        }
        else
            resolve({
            error: 'error',
            status: this.status,
            statusText: this.statusText
            });
        };
        xhr.onerror = function(evt){
        resolve({
            error: 'error',
            status: this.status,
            statusText: this.statusText
        });
        };
    xhr.send(data);
    });
}

async function GetInstance(){
    var instances = null;
    var instancesUrl = "https://searx.space/data/instances.json";
    instances = await RequestData(instancesUrl, 'GET', null);
    console.log("parsing instances");
    if(instances.error !=null){console.log(instances);return this.getInstance();}
    if(typeof instances === 'object'){
      instances = instances.instances;
    }
    else
      instances = JSON.parse(instances).instances;
    instances = ObjectFilter(instances, ([address, data])=> data.network_type === 'normal' && 
                                                            address.indexOf('.i2p')<0 &&
                                                            data.error == null &&
                                                            this.RunPrintCommand(address, data) &&
                                                            (data.html!=null)?(["Cjs", "E", "E, js\?", "js\?", "F"].includes(data.html.grade)==false):false &&
                                                            (data.tls!=null)?(data.tls.grade.indexOf('F')<0):false &&
                                                            (data.tls!=null)?(data.tls.grade.indexOf('E')<0):false &&
                                                            (data.version!=null)?data.version.indexOf("1.0.0")>-1:false &&
                                                            address.indexOf('searx.rasp.fr')<0 &&
                                                            address.indexOf('xeek.com')<0 &&
                                                            address.indexOf('ahmia.fi')<0 
                                                            );
    return Object.keys(instances)[Math.floor(Math.random()*Object.keys(instances).length-1)];
  };

  async function ExecuteSearch(queryData, instance, currAttempts, pageno, categories) {
    if(queryData.length<=0)return;
    let lang = await loadLanguage();
    var max = 5;
    var attempts = (currAttempts!=null)?currAttempts:0;
    console.log("attempt " + attempts);
    var sanitizer = new Sanitizer();
    var saneInput = sanitizer.str(queryData);
    var encodedQueryData = encodeURIComponent(saneInput);
    var urlParameter = "q=" + encodedQueryData + "&language=" + lang.replace("_", "-") + "&pageno=" + pageno + "&format=json";
    if(categories){
      urlParameter += onOrOff("category_general", categories.category_general);
      urlParameter += onOrOff("category_videos", categories.category_videos);
      urlParameter += onOrOff("category_files", categories.category_files);
      urlParameter += onOrOff("category_images", categories.category_images);
      urlParameter += onOrOff("category_it", categories.category_it);
      urlParameter += onOrOff("category_map", categories.category_map);
      urlParameter += onOrOff("category_music", categories.category_music);
      urlParameter += onOrOff("category_news", categories.category_news);
      urlParameter += onOrOff("category_science", categories.category_science);
    }
    console.log(instance+ 'search' + "?"+urlParameter);
    var result = await RequestData(instance+'search', 'POST', urlParameter);
    if(result.error !=null){
      if(attempts<5){
        attempts+=1;
        return ExecuteSearch(queryData, instance, attempts, pageno, categories);
      }else{
        return {errorType: 429, hasSearched: true};
      }
    }else{
      return {results: result, errorType: 0, hasSearched: true};
    }
}

export {RequestData, GetInstance, ExecuteSearch};