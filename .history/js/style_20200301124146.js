
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
        'li': {
            'listSytle':'none',
            '.one': {
                'color':'#ccc'
            }
        },
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

    self.head = document.head || document.getElementsByTagName('head')[0],
    self.style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';

    self.setStylesAttr = function(attrname,value){
       
        var attr = attrname.replace(/[A-Z]/g, function(m){ return "-" + m.toLowerCase()});

        return attr+':'+value+';';
       
    }

    _style = {};
    self.isObject = function(obj, parentClass){
        console.warn('......start......');
        var _finale = {};
       
        for(var i in obj){
            if( obj.hasOwnProperty(i) ){
                if(typeof obj[i] === TYPES._OBJECT){
                    self.isObject(obj[i], parentClass+' '+i)
                }else{
                    _finale[i] = obj[i];
                }
            }
        }
        
        _style[parentClass] = _finale;
       
    };


     self.isObject(rootStyle, '.console');
    console.log(_style)

})(window);