var telInputHandler = (function(){
    var $telInput = $('#telInput'),
        rawValue = '',
        separatedValue = '';

    function _separateValue(){
        rawValue = rawValue.trim();
        var len = rawValue.length;

        switch (len) {
            case 6 : separatedValue = _getBuckets(len, 'XX XX XX');
                break;
            case 7 : separatedValue = _getBuckets(len, 'XXX XX XX');
                break;
            case 8 : separatedValue = _getBuckets(len, 'XXX XXX XX');
                break
            case 9 : separatedValue = _getBuckets(len, 'XXX XXX XXX');
                break;
            case 10 : separatedValue = _getBuckets(len, 'XXX XXX XX XX');
                break;
            default : separatedValue = rawValue;
        }
    }

    function _getBuckets(len, mask){
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
        if (newValue != separatedValue) {
            rawValue = newValue;
            _separateValue();
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


