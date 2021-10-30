async function RequestData(url, method, data){
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        if(method === 'POST')
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function(){
        if(this.status >=200 && this.status < 300)
            resolve(xhr.response);
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

export {RequestData};