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

async function getInstance(){
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

export {RequestData, getInstance};