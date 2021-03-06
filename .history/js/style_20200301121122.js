
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
        _style = [];
        var _cssClass;
        for(var i in obj){

            if( obj.hasOwnProperty(i) ){
                if(typeof obj[i] === TYPES._OBJECT){
                    _cssClass = self.isObject(obj[i], parentClass+' '+i)
                }else{
                    var prop = self.setStylesAttr(i,obj[i]);
                    _style.push(prop);
                }
            }
        }
      
        if(_style.length > 0){
            var _s = parentClass+' \n{\n \t'+_style.join('\n \t')+'\n}';
            _finale.push(_s);
        }

        if(typeof _cssClass !== TYPES._UNDEFINED){
            _finale.push(_cssClass);
        }

        return _finale;
    };


    var m = self.isObject(rootStyle, '.console');
    console.log(m)

})(window);