

(function(window){
    var colorCodes = {
        'BOOLEAN': '#3385ff',
        'TEXT': '#47d147',
        'NUMBER': '#ffd24d',
        'FUNCTION': '#f2f2f2'
    }
    var rootStyle = {
        'position':'absolute',
        'width':'100%',
        'minHeight':'50px',
        'zIndex':'1000',
        'backgroundColor':'#282828',
        'color':'#D8D8D8',
        'top':'0',
        'padding':'20px',
        '.subelement': {
            paddingTop: '5px',
            paddingBottom: '5px'
        },
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

    var types = {
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

    var vDom ={};

    var setCSSClass = function(element,cssClass){

        setAttribute(element,'class',cssClass);
    }

    var _getType = function(obj){

        if(typeof obj === types._UNDEFINED){
            return types._UNDEFINED;
        }

        
        if(typeof obj === types._STRING){ 
            return types._STRING;
        }

        if(typeof obj === types._NUMBER){ 
            return types._NUMBER;
        }

        if(typeof obj === types._FUNCTION){ 
            return types._FUNCTION;
        }

        if(typeof obj === types._OBJECT){
            if(obj === null){
                return types._NULL;
            }
            if(obj instanceof Array){
                return types._ARRAY;
            }

            if(obj instanceof HTMLElement){
                return types._HTML_ELEMENT;
            }
           
            return types._OBJECT;  
        }

        if(typeof obj  === types._BOOLEAN){
            return types._BOOLEAN;
        }
        
        throw "unknow object";
    }

    var createElement = function(tagName,textNode){
        var para = document.createElement(tagName);
        if(textNode !== undefined && textNode !== null && typeof textNode === 'string'){
            var node = document.createTextNode(textNode);
            para.appendChild(node);
        }
        return para;
    };
    // var setAttributes = function(element,attrs){
       
    //     if(_getType(attrs) === types._OBJECT){

    //         for(var i in attrs){
    //             setAttribute(element,i, attrs[i]);
    //         }
    //     }

    //     return element;
    // }

    // var canAppend = function(element){
    //     if(element.nodeType === 1){
    //         return true;
    //     }

    //     return false;
    // }

    var setAttribute = function(element,attr,value){
            if(value){
                element.setAttribute(attr,value);
            }else{
                element.setAttribute(attr,'');
            }
        
        return element;
    }

    updateStyle = function(element,prop,value){
        
        element.style[prop] = value;
    }

    var insertFirst = function(parentElem, newElem){
        var chil = parentElem.children;
      
        if(chil.length > 0){
            parentElem.insertBefore(newElem, chil[0]);
        }else{
            parentElem.appendChild(newElem);
        }

        return parentElem;
    };

    var textColor = function(element, value){
       var t = _getType(value);
      
        if(t === types._NUMBER){
            updateStyle(element,'color',colorCodes.NUMBER);

            return element;
        }

        if(t === types._BOOLEAN){
            updateStyle(element,'color',colorCodes.BOOLEAN);
            return element;
        }

        if(t === types._STRING){
            updateStyle(element,'color',colorCodes.TEXT);
            return element;
        }
    };

    var createSubElement = function(key, val, type){
        var ele = createElement('div');
        setCSSClass(ele, 'subelement');
        var tp =_getType(val);
        var startNode = "{";
        var endNode = "}";
        if(tp === types._HTML_ELEMENT){
         
            
            if(type === types._ARRAY){
                startNode="[";
                endNode = "]";
            }else{
                startNode="{";
                endNode = "}";
            }
            var nam = createElement('P');

            var btn = createElement('button');
            btn.innerText = ":";

            var _nodeKey = document.createTextNode("\""+key+"\":");
            

            var _node = document.createTextNode(startNode);
            var _node2 = document.createTextNode(endNode);

            nam.appendChild(_nodeKey);
            //nam.appendChild(btn);
            nam.appendChild(_node);
            ele.appendChild(nam);
            ele.appendChild(val);
            ele.appendChild(_node2);

       
        }else{
            var _nodeKey = createElement('span');
            var _nodeVal = createElement('span');
        

             var _nodeKeyText = document.createTextNode("\""+key+"\": ");
             var _nodeValText = document.createTextNode(""+val+"");

             _nodeKey.appendChild(_nodeKeyText);
             _nodeVal.appendChild(_nodeValText);

            textColor(_nodeVal,val);
           
            ele.appendChild(_nodeKey);
            ele.appendChild(_nodeVal);
        }
 
        return ele;
    }

    var generateStack = function(ob){
        var ele = createElement('div');

            for(var  i in ob){
                var _ele = null;

                
                var ty = _getType(ob[i]);
                if( ty === types._ARRAY || ty === types._OBJECT ){
                     _eleP = generateStack(ob[i]);
                }else{
                    _eleP = ob[i]
                   
                }

                _ele = createSubElement(i,_eleP,ty);

                ele.appendChild(_ele);
            }
     
           
        return ele;
    }

    var init = function(){
        var cssClasses =window.ConsoleStyle(rootStyle);
        var root = document.body;
        var elem = createElement("div");
        insertFirst(root, elem);
        setCSSClass(elem, 'console');
         var t = generateStack(dummy);
         
        elem.appendChild(t);
    };

    window.onload = function(){
        init();
        console.dir(document)
    }
})(window);