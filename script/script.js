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

    function _separateValueWithRegex(){
        rawValue = rawValue.trim();
        var len = rawValue.length;

        switch (len) {
            case 6 : separatedValue = rawValue.replace(/(\d{2})(\d{2})(\d{2})/, "$1 $2 $3"); //'00 00 00';
                break;
            case 7 : separatedValue = rawValue.replace(/(\d{3})(\d{2})(\d{2})/, "$1 $2 $3"); //'000 00 00';
                break;
            case 8 : separatedValue = rawValue.replace(/(\d{3})(\d{3})(\d{2})/, "$1 $2 $3"); //'000 000 00';
                break
            case 9 : separatedValue = rawValue.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3"); //'000 000 000';
                break;
            case 10 : separatedValue = rawValue.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4"); //'000 000 00 00';
                break;
            default : separatedValue = rawValue;
        }
    }

    function _getBuckets(mask){
        var tmp = [],
            maskLen = mask.length,
            i = 0,
            j = 0;

        for(; i < maskLen; i = i + 1 ){
            if (mask[i] != ' ') {
                tmp[i] = rawValue[j];
                j = j + 1;
            }else{
                tmp[i] = ' ';
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
            var o = 100000, z= 0, p=0;
            while(o--){
                r1 = performance.now();
                _separateValue();
                r2 = performance.now();
                p += +(r2-r1).toFixed(6);

                t1 = performance.now();
                _separateValueWithRegex();
                t2 = performance.now();
                z += +(t2-t1).toFixed(6);
            }
            console.log('Без регекса', p/100000);
            console.log('C регексом', z/100000);
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


