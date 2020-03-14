
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
    self.classes = {};
    self.head = document.head || document.getElementsByTagName('head')[0],
    self.style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';

    self.setStylesAttr = function(attrname,value){
        var attr = attrname.replace(/[A-Z]/g, function(m){ return "-" + m.toLowerCase()});

        //return attr+':'+value+';';
        return {'attr':attr, 'value':value}
       
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
            self.classes[parentClass] = _finale;
            var _prop = [];
            for(var _i in _finale){
                _prop.push( _finale[_i].attr+':'+_finale[_i].value+';')
            }
            var _cssClass = parentClass+ '{'+_prop.join('')+'} ';
            self._styleTxt = self._styleTxt+''+_cssClass; 
        }
       
       
    };

    window.ConsoleStyle = function(rootStyle){
 
        if(rootStyle){
            if(typeof rootStyle === TYPES._OBJECT && !Array.isArray(rootStyle)){
                self.isObject(rootStyle, '.console');
             
                self.style.appendChild(document.createTextNode(_styleTxt));
            }else{
                throw "invalid style object"
            }
 
        }

        return self.classes;
    }
    //window.ConsoleStyle(rootStyle)



})(window);