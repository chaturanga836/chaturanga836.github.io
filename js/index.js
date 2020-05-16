var test = {
    appName:'TestApp',
    subElem: {
        arr: [1,2,3,4],
        getFunc: ()=>{
            console.log(this);
        }
    }
}
test.subElem.getFunc();

