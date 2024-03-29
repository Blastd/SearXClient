function ObjectFilter(obj, predicate){
    return Object.fromEntries(Object.entries(obj).filter(predicate));
}
             
function hasJsonStructure(str) {
    if (typeof str !== 'string') return false;
    try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result);
        return type === '[object Object]' 
            || type === '[object Array]';
    } catch (err) {
        return false;
    }
}

export {ObjectFilter, hasJsonStructure};