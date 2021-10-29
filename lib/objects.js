function ObjectFilter(obj, predicate){
    return Object.fromEntries(Object.entries(obj).filter(predicate));
}
                  

export {ObjectFilter};