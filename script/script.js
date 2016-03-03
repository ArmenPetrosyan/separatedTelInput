var telInputHandler = (function(){
    var $telInput = $('#telInput'),
        rawValue = '',
        separatedValue = '';

    function _separateValue(){
        rawValue = rawValue.trim();
        var len = rawValue.length;

        separatedValue = _getBuckets(len);
    }

    function _getBuckets(len){
        var tmp = [];

        for(var i = 0; i < len; i += 1 ){
            tmp.push(rawValue[i]);
            if (i && i % 2 === 0) {
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

    $telInput.on('focusout', function(){
        var newValue = $(this).val().trim();
        if (newValue != separatedValue) {
            rawValue = newValue;
            _separateValue();
        }

        _fillSeparated();
    });

    $telInput.on('focusin', function(){
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


