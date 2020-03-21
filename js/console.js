(function (window) {
    var colorCodes = {
        BOOLEAN: "#f24b18",
        TEXT: "#538cc6",
        NUMBER: "#ffd24d",
        FUNCTION: "#f2f2f2"
    };

    var rootelem;
    var rootStyle = {
        position: "absolute",
        minHeight: "50px",
        zIndex: "1000",
        backgroundColor: "#282828",
        color: "#D8D8D8",
        top: "0",
        left:'0',
        margin:'0',
        padding: '0px',
        '.hide':{
            'display':'none',
        },
        '.main-element':{

        },
        '.label':{
            borderBottom: '1px dashed #474342',
            padding: '0px 8px',
            height: '1px',
            position: 'relative',
            top: '-8px',
            marginRight: '5px',
        },
        ".subelement": {
            paddingTop: "5px",
            paddingBottom: "5px",
            marginLeft: "10px",
            ".key": {
                paddingLeft: "20px"
            }
        },
        '.border-element':{
            display: "inline-block",
        },
        '.tree-line': {
            borderLeft: '1px dashed #474342',
        },
        '.tree-line:first-child': {
            borderLeft: 'none',
            margin: 0
        },
        ul: {
            paddingLeft: "1px",
            borderLeft: "1px solid #737373",
            marginLeft: "0px",
            listStyle: "none",
            li: {
                ".one": {
                    color: "#ccc"
                }
            }
        },
        p: {
            marginTop: "0px",
            marginBottom: "0px"
        },
        '.arrow': {
            display: 'inline-block',
            cursor: 'pointer',
            marginLeft: '5px',
            marginRight: '5px',
        },

        '.arrow-right': {
            width: '0',
            height: '0',
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: '5px solid green',
        },

        '.arrow-down': {
            width: '0',
            height: '0',
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid green',
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
        _FUNCTION: "function"
    };

    var vDom = {};
    var carrotCount = 0;

    var setCSSClass = function (element, cssClass) {
        var t = _getType(cssClass);
        var _x = element.getAttribute("class");
        var _classes = [];

        if (_x) {
            _classes = _x.split(' ');

        }
        if (t === TYPES._ARRAY) {
            for (var i in cssClass) {
                var _ind = _classes.indexOf(cssClass[i]);
                if (_ind == -1) {
                    _classes.push(cssClass[i]);
                }
            }

        } else {
            var _ind = _classes.indexOf(cssClass);
            if (_ind == -1) {
                _classes.push(cssClass);
            }
        }
        setAttribute(element, "class", _classes.join(' '));

    };

    var setStyle = function(element,styles){
        var t = _getType(styles);
        
            for(var i in styles){
                element.style[i] = styles[i];
            }
    }

    var removeCSSClass = function (element, cssClass) {

        var x = element.getAttribute("class");
        if (x) {
            var t = _getType(cssClass);
            var _classes = x.split(' ');

            if (t === TYPES._ARRAY) {
                for (var _i in cssClass) {
                    var _ind = _classes.indexOf(cssClass[i]);
                    if (_ind > -1) {
                        _classes.splice(_ind, 1);
                    }
                }
            } else {

                var _ind = _classes.indexOf(cssClass);
                if (_ind > -1) {
                    _classes.splice(_ind, 1);
                }
            }
            setAttribute(element, "class", _classes.join(' '));
        }
    };

    var _getType = function (obj) {
        if (typeof obj === types._UNDEFINED) {
            return types._UNDEFINED;
        }
        if (typeof obj === types._STRING) {
            return types._STRING;
        }
        if (typeof obj === types._NUMBER) {
            return types._NUMBER;
        }

        if (typeof obj === types._FUNCTION) {
            return types._FUNCTION;
        }

        if (typeof obj === types._OBJECT) {
            if (obj === null) {
                return types._NULL;
            }
            if (obj instanceof Array) {
                return types._ARRAY;
            }

            if (obj instanceof HTMLElement) {
                return types._HTML_ELEMENT;
            }

            return types._OBJECT;
        }

        if (typeof obj === types._BOOLEAN) {
            return types._BOOLEAN;
        }

        throw "unknow object";
    };

    var createElement = function (tagName, textNode) {
        var para = document.createElement(tagName);
        if (
            textNode !== undefined &&
            textNode !== null &&
            typeof textNode === "string"
        ) {
            var node = document.createTextNode(textNode);
            para.appendChild(node);
        }
        return para;
    };

    var setAttribute = function (element, attr, value) {
        if (value) {
            element.setAttribute(attr, value);
        } else {
            element.setAttribute(attr, "");
        }

        return element;
    };


    updateStyle = function (element, prop, value) {
        element.style[prop] = value;
    };

    var insertFirst = function (parentElem, newElem) {
        var chil = parentElem.children;

        if (chil.length > 0) {
            parentElem.insertBefore(newElem, chil[0]);
        } else {
            parentElem.appendChild(newElem);
        }

        return parentElem;
    };

    var textColor = function (element, value) {
        var t = _getType(value);
        if (t === types._NUMBER) {
            updateStyle(element, "color", colorCodes.NUMBER);
            return element;
        }

        if (t === types._BOOLEAN) {
            updateStyle(element, "color", colorCodes.BOOLEAN);
            return element;
        }

        if (t === types._STRING) {
            updateStyle(element, "color", colorCodes.TEXT);
            return element;
        }
    };

    var setAnimation = function () {
        var selfAn = {};
        selfAn['anim'] = undefined;
        selfAn['start'] = function ( callback,param) {
            if(selfAn.anim){
                clearInterval(selfAn.anim);
                setWidth();
            }
            selfAn.anim = setInterval( function(param){ 
                callback(param);
                setWidth(); 
            }, 1000/60, param, selfAn.anim);
        }

        selfAn['stop'] = function(key){
            if(selfAn.anim){
                clearInterval(selfAn.anim);
                setWidth();
            }
        }
        return selfAn;
    };

    var setToggleHideShow = function(elem, show, parent){
        var li =parent.parentElement.parentElement;

        var _closeElems = elem.parentElement.querySelectorAll('.close-br');
        var _openElems = elem.parentElement.querySelectorAll('.open-br');
  
        var _openElem = _openElems[0];
        var _closeElem = _closeElems[_closeElems.length -1];
       
        if(elem._anim === undefined){
            elem._anim = setAnimation();
        }else{
            elem._anim.stop();
        }
        if(show){
            setStyle(elem, {
                opacity: 0
            });
            removeCSSClass(elem,'hide');
            _closeEleminnerText = "";
            _openEleminnerText = "";
            if(li._valueType == types._ARRAY){
                _openEleminnerText = "[";
                _closeEleminnerText = "]";
            }

            _closeElem.innerText = _closeEleminnerText;
            _openElem.innerText = _openEleminnerText;
            elem._anim.start(function(){
                var _opacity = elem.style.opacity;
                if(_opacity){
                    _opacity = parseFloat(_opacity);
                    _opacity = _opacity + 0.1;
                }else{
                    _opacity = 1;
                }
                if(_opacity > 1){
                    elem._anim.stop();
                    elem.removeAttribute('style');
                }else{
                    setStyle(elem, {
                        opacity: _opacity
                    });
                }
 
            })
           
        }else{
            elem._anim.start(function(){
                var _opacity = elem.style.opacity;
                if(_opacity){
                    _opacity = parseFloat(_opacity);
                    _opacity = _opacity - 0.1;
                }else{
                    _opacity = 1;
                }
                if(_opacity < 0){
                    elem._anim.stop();
                    setCSSClass(elem, 'hide');
                    elem.removeAttribute('style');
     
                    _closeEleminnerText = "";
                    _openEleminnerText = "{...}";
                    if(li._valueType == types._ARRAY){
                        _openEleminnerText = "[...]";
                        _closeEleminnerText = "";
  
                    }

                   _closeElem.innerText = _closeEleminnerText;
                   _openElem.innerText = _openEleminnerText;
                }else{
                    setStyle(elem, {
                        opacity: _opacity
                    });
                }
 
            })
            
        }
        
    }

    var createSubElement = function (key, val, type) {
        var ele = createElement("LI");
        var startNode = createElement('b');
        var endNode = createElement('b');

        setCSSClass(ele, "subelement");

        setCSSClass(startNode, "open-br");
        setCSSClass(endNode, "close-br");
        var tp = _getType(val);


        if (tp === types._HTML_ELEMENT) {
            if (type === types._ARRAY) {
                ele._valueType = types._ARRAY;
                startNode.innerText = "[";
                endNode.innerText = "]";
            } else {
                ele._valueType = types._OBJECT;
                startNode.innerText = "";
                endNode.innerText = "";
            }

            carrotCount = carrotCount + 1;
            //label
            var nam = createElement("P");
           
            var carrot = createElement("div");
            carrot['carrotIndex'] = carrotCount;
            vDom['carrot_index' + carrotCount] = {
                show: true
            };

            setAttribute(carrot, 'cons-index', 'carrot_' + carrotCount);
            setCSSClass(carrot, ["arrow-down", "arrow"]);
            carrot.addEventListener('click', function () {


                var _id = this.carrotIndex;
                var _remClass = 'arrow-down';
                var _addClass = 'arrow-right';

                if (vDom['carrot_index' + _id].show === false) {
                    _addClass = 'arrow-down';
                    _remClass = 'arrow-right';
                } else {
                    _remClass = 'arrow-down';
                    _addClass = 'arrow-right';
                }
                vDom['carrot_index' + _id].show = !vDom['carrot_index' + _id].show;
                removeCSSClass(this, _remClass);
                setCSSClass(this, _addClass);
        
                if(this.parentElement.parentElement.children.length > 0){
                    setToggleHideShow(this.parentElement.parentElement.children[1], vDom['carrot_index' + _id].show, this);
                }

            });

            // var btn = createElement("button");
            // btn.innerText = ":";

            var _nodeKey = document.createTextNode("" + key + ":");

            // var _node = document.appendChild(startNode);
            // var _node2 = document.appendChild(endNode);
            nam.appendChild(_nodeKey);
            nam.appendChild(carrot)
            nam.appendChild(startNode);
            ele.appendChild(nam);
            ele.appendChild(val);
            ele.appendChild(endNode);
        } else {
            ele._valueType = 'text';
            var _nodeKey = createElement("span");
            var _nodeVal = createElement("span");

            var _nodeKeyText = document.createTextNode("" + key + ": ");
            var _nodeValText;
            if (tp === TYPES._STRING) {
                _nodeValText = document.createTextNode("\"" + val + "\"");
            } else {
                _nodeValText = document.createTextNode("" + val + "");
            }
            _nodeKey.appendChild(_nodeKeyText);
            _nodeVal.appendChild(_nodeValText);

            textColor(_nodeVal, val);

            ele.appendChild(_nodeKey);
            ele.appendChild(_nodeVal);
        }

        return ele;
    };

    var generateStack = function (ob) {
        var ele = createElement("UL");

        setCSSClass(ele, "tree-line");
        //main-element
        
        for (var i in ob) {
            var _ele = null;

            var ty = _getType(ob[i]);
            if (ty === types._ARRAY || ty === types._OBJECT) {
                _eleP = generateStack(ob[i]);
            } else {
                _eleP = ob[i];
            }

            _ele = createSubElement(i, _eleP, ty);

            ele.appendChild(_ele);
        }

        return ele;
    };

    var setWidth = function(){
        var _style = rootelem.currentStyle || window.getComputedStyle(rootelem);
        var margin = parseFloat(_style.marginLeft) + parseFloat(_style.marginRight),
         padding = parseFloat(_style.paddingLeft) + parseFloat(_style.paddingRight),
         border = parseFloat(_style.borderLeftWidth) + parseFloat(_style.borderRightWidth);
         height = parseFloat(_style.height);

        setStyle(rootelem,{'width':(window.innerWidth -17)+'px'});
        if(height < window.innerHeight){
            setStyle(rootelem,{'height':(window.innerHeight)+'px'});
        }
    
    }

    window.onresize = function(){
        setWidth();
    }
    var init = function () {
        var cssClasses = window.ConsoleStyle(rootStyle);
        var root = document.body;
        rootelem = createElement("div");
        insertFirst(root, rootelem);
        setCSSClass(rootelem, "console");
        var t = generateStack(dummy);

        rootelem.appendChild(t);
        setWidth()
        
    };

    window.onload = function () {
        init();
    };
})(window);
