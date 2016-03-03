var telInputHandler = (function(){
    var $telInput = $('#telInput'),
        rawValue = '',
        separatedValue = '';

    function _separateValue(){
        rawValue = rawValue.trim();
        var len = rawValue.length;

        switch (len) {
            case 6 : separatedValue = _getBuckets('XX XX XX');
                break;
            case 7 : separatedValue = _getBuckets('XXX XX XX');
                break;
            case 8 : separatedValue = _getBuckets('XXX XXX XX');
                break
            case 9 : separatedValue = _getBuckets( 'XXX XXX XXX');
                break;
            case 10 : separatedValue = _getBuckets('XXX XXX XX XX');
                break;
            default : separatedValue = rawValue;
        }
    }

    function _getBuckets(mask){
        var tmp = [],
            maskLen = mask.length,
            i = 0,
            j = 0;

        for(; i < maskLen; i += 1 ){
            if (mask[i] != ' ') {
                tmp.push(rawValue[j]);
                j += 1;
            }else{
                tmp.push(' ');
            }
        }

        return tmp.join('');
    }

    function _fillSeparated(){
        $telInput.val(separatedValue);
    }

    function _fillRaw(){
        $telInput.val(rawValue);
    }

    $telInput.on('focusout.telInput', function(){
        var newValue = $(this).val().trim();
        if (newValue != rawValue) {
            rawValue = newValue;
            t1 = performance.now();
            _separateValue();
            t2 = performance.now();

            console.log((t2-t1).toFixed(4));
        }

        _fillSeparated();
    });

    $telInput.on('focusin.telInput', function(){
        _fillRaw();
    });

    return {
        getSeparated : function(){
            return separatedValue;
        },

        getRaw: function(){
            return rawValue;
        }
    };
})();


