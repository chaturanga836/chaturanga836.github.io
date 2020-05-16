
var rootStyle = {
    'position':'absolute',
    'width':'100%',
    'minHeight':'50px',
    'zIndex':'1000',
    'backgroundColor':'#282828',
    'color':'#D8D8D8',
    'top':'0',
    'padding':'20px',
    'ul': {
        'paddingLeft': '15px',
        'borderLeft':'1px solid #737373',
        'marginLeft': '0px',

        'li.ona':{
            'color':'#ccc'
        }
    },
    'p':{
        'marginTop':'0px',
        'marginBottom': '0px'
    }
};
(function(window){
      
    var self = this;
    self.TYPES = {
        _UNDEFINED: "undefined",
        _STRING: "string",
        _NUMBER: "number",
        _ARRAY: "array",
        _NULL: "null",
        _OBJECT: "object",
        _HTML_ELEMENT: "HTMLElement",
        _BOOLEAN: "boolean",
        _FUNCTION: "function",
    };

    this.head = document.head || document.getElementsByTagName('head')[0],
    this.style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';


    self.isObject = function(obj, parentClass){
        
        for(var i in obj){
            if( obj.hasOwnProperty(i) ){
                if(typeof i === TYPES._OBJECT){
                    console.log(i)
                }
            }
        }
    };


    self.isObject(rootStyle, '.console');

})(window);