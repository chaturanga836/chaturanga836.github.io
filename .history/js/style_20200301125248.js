
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

    self._styleTxt = "";
    self.head = document.head || document.getElementsByTagName('head')[0],
    self.style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';

    self.setStylesAttr = function(attrname,value){
       
        var attr = attrname.replace(/[A-Z]/g, function(m){ return "-" + m.toLowerCase()});

        return attr+':'+value+';';
       
    }

   
    self.isObject = function(obj, parentClass){
        var _finale = [];
       
        for(var i in obj){
            if( obj.hasOwnProperty(i) ){
                if(typeof obj[i] === TYPES._OBJECT){
                    self.isObject(obj[i], parentClass+' '+i)
                }else{
                    var prop = self.setStylesAttr( i, obj[i] );
                    _finale.push(prop);
                }
            }
        }
        
        if(_finale.length > 0){
            var _cssClass = parentClass+ '{'+_finale.join('')+'} ';
            self._styleTxt = self._styleTxt+''+_cssClass; 
        }
       
       
    };

    var init = function(){
     self.isObject(rootStyle, '.console');
     self.style.appendChild(document.createTextNode(_styleTxt));
    }

    init();



})(window);