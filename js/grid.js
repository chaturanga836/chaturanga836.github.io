( function($){
    $.expr[':'].regex = function(elem, index, match) {
        var matchParams = match[3].split(','),
            validLabels = /^(data|css):/,
            attr = {
                method: matchParams[0].match(validLabels) ? 
                            matchParams[0].split(':')[0] : 'attr',
                property: matchParams.shift().replace(validLabels,'')
            },
            regexFlags = 'ig',
            regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
        return regex.test(jQuery(elem)[attr.method](attr.property));
    }
    $.fn.bootStrapResizeGird = function(options){
        var rows = [];
        var cols = [];

        var defaults = { 
            resizeCreate: function(event, ui){ },
            resizeStop: function(event, ui){ },
            onResize: function(event, ui){ },
            resizeStart: function(event, ui){ },
        }

        var settings = $.extend( {}, defaults, options );
        var parent = $(this[0]);
        findRows();

        function findRows(){
        
            parent.children('.row').each(function(indexRow, valRow){
             
                $(valRow).children('.col, :regex(class, col-*)').each( function(index,val){
                    $(val).data( "resizebleRowIndex",indexRow );
                    $(val).data( "resizebleColIndex",index );

                    $(val).resizable({
                        create: function(event, ui){ 
                            
                        },
                        stop: function(event, ui){ },
                        resize: function(event, ui){
                          
                            
                         },
                        start: function(event, ui){ 
                            console.log(ui.element);
                            $(ui.element).css('flex','none');
                        },
                    });
            
                    cols.push( $(val) );
                });
                
                rows.push( $(valRow) );
            });
        }
       
        var self = this;

        onResize = function(e,elem){};

        stop = function(e, elem){};

        start = function(e, elem){};

        return this;
    }
})(jQuery);