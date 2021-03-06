µ.util = {};

µ.util._override = function(_objA, _objB){ for(var x in _objA) if(x in _objB) _objB[x] = _objA[x]; };
µ.util._extend = function(_objA, _objB){ for(var x in _objA) _objB[x] = _objA[x]; };

µ.util._rndSnd = function(){
    return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
};

µ.util.dataFromEquation2 = function(_equation, _step){
    var step = _step || 6;
    var data = d3.range(0, 360 + step, step).map(function(deg, index){
        var theta = deg * Math.PI / 180;
        var radius = _equation(theta);
        return [deg, radius];
    });
    return data;
};

µ.util.dataFromEquation = function(_equation, _step, _name){
    var step = _step || 6;
    var x = [], y = [];
    d3.range(0, 360 + step, step).forEach(function(deg, index){
        var theta = deg * Math.PI / 180;
        var radius = _equation(theta);
        x.push(deg);
        y.push(radius);
    });
    var result = {x: x, y: y};
    if(_name) result.name = _name;
    return result;
};

µ.util.ensureArray = function(_val, _count){
    if(typeof _val === 'undefined') return null;
    var arr = [].concat(_val);
    return d3.range(_count).map(function(d, i){
        return arr[i] || arr[0];
    });
};

µ.util.fillArrays = function(_obj, _valueNames, _count){
    _valueNames.forEach(function(d, i){
        _obj[d] = µ.util.ensureArray(_obj[d], _count);
    });
    return _obj;
};


// Taken from http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
µ.util.deepExtend = function(destination, source) {
    for (var property in source) {
        if (source[property] && source[property].constructor &&
            source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            arguments.callee(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
};

µ.util.validateKeys = function(obj, keys) {
    if(typeof keys === 'string') keys = keys.split('.');
    var next = keys.shift();
    return obj[next] && (! keys.length || objHasKeys(obj[next], keys));
};

µ.util.sumArrays = function(a, b){ return d3.zip(a, b).map(function(d, i){ return d3.sum(d); }); }
µ.util.arrayLast = function(a){ return a[a.length-1]; }
µ.util.arrayEqual = function(a, b) {
    var i = Math.max(a.length, b.length, 1);
    while(i-- >= 0 && a[i] === b[i]);
    return (i === -2);
}
µ.util.flattenArray = function(arr) {
    var r = [];
    while (!µ.util.arrayEqual(r, arr)) {
        r = arr;
        arr = [].concat.apply([], arr);
    }
    return arr;
}


