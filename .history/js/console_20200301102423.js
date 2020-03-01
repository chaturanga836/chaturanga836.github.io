

(function(window){
    //var root = document.getElementsByTagName('body')[0];


   
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

    var rootStyle={
        'position':'absolute',
        'width':'100%',
        'minHeight':'50px',
        'zIndex':'1000',
        'backgroundColor':'#282828',
        'color':'#D8D8D8',
        'top':'0',
        'padding':'20px',
    };

    var ulStyles = {
        'paddingLeft': '15px',
        'borderLeft':'1px solid #737373',
        'marginLeft': '0px',
    }

    var supElemStyles = {
        paddingTop: '5px',
        paddingBottom: '5px'
    }

    var pStyles = {
        'marginTop':'0px',
        'marginBottom': '0px'
    }

    var colorCodes = {
        'BOOLEAN': '#3385ff',
        'TEXT': '#47d147',
        'NUMBER': '#ffd24d',
        'FUNCTION': '#f2f2f2'
    }

    var vDom ={};

    setStyles = function(element,styles){
        for(var i in styles){
            var cas = i.replace(/[A-Z]/g, function(m){ return "-" + m.toLowerCase()});
            element.style[cas] = styles[i];
        }

        return element;
    }

    setStylesAttr = function(attrname){
       
        return attrname.replace(/[A-Z]/g, function(m){ return "-" + m.toLowerCase()});
       
    }

    _getType = function(obj){

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

    var cssClass = function(){
        var consoleParent ={
            position:'absolute',
            width: '100%',
            minHeight: '50px',
            zIndex: 1000,
            backgroundColor: 'rgb(40, 40, 40)',
            color: 'rgb(216, 216, 216)',
            top: '0px',
            padding: '20px' 
        };

        var consoleContainer = {
            paddingLeft: '15px',
            borderLeft: '1px solid rgb(115, 115, 115)',
            marginLeft: '0px'
        };

        var consoleElemenContainer = {
            paddingTop: '5px',
            paddingBottom: '5px',
            consoleKey:{
                marginTop: '0px',
                marginBottom: '0px'
             },

        };

        var consoleValue ={
            color: 'rgb(71, 209, 71)'
        };

        var _classes = {
            consoleParent,
            consoleContainer,
            consoleElemenContainer,
            consoleValue
        };

        processCalssess = function(){
            var head = document.head || document.getElementsByTagName('head')[0];
            style = document.createElement('style');
            style.type = 'text/css';

            var css = document.createDocumentFragment();
            head.appendChild(style);
            var generateStyles = function(key, val){

                return setStylesAttr(key)+':'+val+';';
            }

            var _travarseClass = function(obj, parentClass){

                var _styles = [];
                var _cssText = '';
                for(var i in obj){

                    var ty = _getType( obj[i]);
                    if( ty === types._ARRAY || ty === types._OBJECT ){
                        _cssText = _cssText+_travarseClass(obj[i],"."+i);
                        
                    }else{
                        _styles.push( generateStyles(i,obj[i]) );
                    }
                     
                 }
                 if(_styles.length > 0){
                   
                    _cssText = _cssText+""+parentClass+"{ \n"+_styles.join('\n')+"\n }";
                    
                 }
                 
                 return _cssText;
            }
            
            var _finalCss = [];
            for(var cl in _classes){
                
                var obj = _travarseClass(_classes[cl], " ."+cl);
                _finalCss.push(obj);
               
            }
           
            if(style.styleSheet){
                
                style.styleSheet.cssText = _finalCss.join('\n');
            }else{
             
                style.appendChild(document.createTextNode(css));
            }
        }

        processCalssess();
    }();



    var _element = function(e){
        if(_getType(e) !== _HTML_ELEMENT){
            throw "invalid dom element";
        }
        var self = this;

    }

    createElement = function(tagName,textNode){
        var para = document.createElement(tagName);
        if(textNode !== undefined && textNode !== null && typeof textNode === 'string'){
            var node = document.createTextNode(textNode);
            para.appendChild(node);
        }
        
        //document.body.appendChild(para);
        return para;
    };

    createChildElement = function(){

    }


    setAttributes = function(element,attrs){
       
        if(_getType(attrs) === types._OBJECT){

            for(var i in attrs){
                setAttribute(element,i, attrs[i]);
            }
        }

        return element;
    }

    canAppend = function(element){
        if(element.nodeType === 1){
            return true;
        }

        return false;
    }

    setAttribute = function(element,attr,value){

        if(element.hasAttribute(i)){
            if(value){
                element.setAttribute(attr,value);
            }else{
                element.setAttribute(attr,'');
            }
        }

        return element;
    }



    updateStyle = function(element,prop,value){
        
        element.style[prop] = value;
    }



    insertFirst = function(parentElem, newElem){
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
        setStyles(ele,supElemStyles)
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
            setStyles(nam,pStyles)

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
        setStyles(ele,ulStyles)

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
        var root = document.body;
        var elem = createElement("div");
        setStyles(elem,rootStyle);
        insertFirst(root, elem);

         var t = generateStack(dummy);
         
        elem.appendChild(t);
    };

    window.onload = function(){

        init();
    }
})(window);