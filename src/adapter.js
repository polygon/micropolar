µ.adapter = {};
µ.adapter.plotly = function module() {
    var exports = {};
    exports.convert = function(_inputConfig) {
        var outputConfig = {};
        var r = {};
        if(_inputConfig.data){
            outputConfig.data = _inputConfig.data.map(function(d, i){
                var data = {
                    x: d.x,
                    y: d.y,
                    name: d.name,
                    type: d.type,
                };
                if(d.yStack) data.yStack = d.yStack;
                return data;
            });
            outputConfig.geometryConfig = _inputConfig.data.map(function(d, i){
                r = {};
                if(d.type) r.geometry = d.type.substr('Polar'.length);
                if(d.line && d.line.color) r.color = d.line.color;
                if(d.line && d.line.width) r.lineStrokeSize = d.line.width;
                if(d.line && d.line.dash) r.dash = d.line.dash;
                if(d.line && d.line.interpolation) r.lineInterpolation = d.line.interpolation;
                if(d.opacity) r.opacity = d.opacity;
                if(typeof d.visible != 'undefined') r.visible = d.visible;
                if(typeof d.visibleInLegend != 'undefined') r.visibleInLegend = d.visibleInLegend;
                return r;
            });
        }
        if(_inputConfig.layout){
            outputConfig.legendConfig = {};
            r = {};
            d3.entries(_inputConfig.layout).forEach(function(d, i){
                if(d.key === 'height') r.height = d.value;
                if(d.key === 'width') r.width = d.value;
                if(d.key === 'title') r.title = d.value;
                if(d.key === 'showlegend') outputConfig.legendConfig.showLegend = d.value;
                if(d.key === 'direction') r.flip = (d.value === 'clockwise');
                if(d.key === 'needsEndSpacing') r.needsEndSpacing = d.needsEndSpacing;
                if(d.key === 'legend'){
                    if(d.value.traceorder) outputConfig.legendConfig.reverseOrder = (d.value.traceorder === 'reversed');
                }
                if(d.key === 'plot_bgcolor') r.backgroundColor = d.value;
                if (d.key === 'xaxis'){
                    if(typeof d.value.range != 'undefined') r.angularDomain = d.value.range;
                    if(typeof d.value.tickCount != 'undefined') r.angularTicksCount = d.value.tickCount;
                    if(typeof d.value.tickStep != 'undefined') r.angularTicksStep = d.value.tickStep;
                    if(typeof d.value.minorTickCount != 'undefined') r.minorTicks = d.value.minorTickCount;
                    if(d.value.suffix) r.angularTicksSuffix = d.value.suffix;
                    if(typeof d.value.flip != 'undefined') r.flip = d.value.flip;
                }
                if (d.key === 'yaxis'){
                    if(typeof d.value.range != 'undefined') r.radialDomain = d.value.range;
                    if(d.value.suffix) r.radialTicksSuffix = d.value.suffix;
                    if(typeof d.value.orientation != 'undefined') r.radialAxisTheta = d.value.orientation;
                }
                if (d.key === 'font'){
                    if(d.value.size) r.fontSize = d.value.size;
                    if(d.value.color) r.fontColor = d.value.color;
                    if(d.value.family) r.fontFamily = d.value.family;
                }
                if(d.key === 'margin'){
                    var source = ['t', 'r', 'b', 'l', 'pad'];
                    var target = ['top', 'right', 'bottom', 'left', 'pad'];
                    r.margin = {};
                    d3.entries(d.value).forEach(function(dB, iB){
                        r.margin[target[source.indexOf(dB.key)]] = dB.value;
                    });
                }
                if(d.key === "orientation") r.originTheta = d.value;
            });
            outputConfig.axisConfig = r;
            if(_inputConfig.container) outputConfig.axisConfig.container = _inputConfig.container;
        }

        return outputConfig;
    };
    return exports;
};