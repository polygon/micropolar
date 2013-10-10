micropolar.chart.CircularBarChart = function module() {
    var config = {
        axis: null,
        containerSelector: 'body',
        dotRadius: 5,
        fill: 'orange',
        stroke: 'red'
    };
    var dispatch = d3.dispatch('hover');

     function exports(_datum) {
        d3.select(config.containerSelector)
            .datum(_datum)
            .each(function(_data, _index) {

                config.axis.config({container: this})
                config.axis(_datum);

                radialScale = config.axis.radialScale();
                angularScale = config.axis.angularScale();
                axisConfig = config.axis.config();
            
                var geometryGroup = d3.select(this).select('svg g.geometry');

                var markStyle = {fill: config.fill, stroke: config.stroke};

                var barW = 12;
                var geometry = geometryGroup.selectAll('rect.mark')
                    .data(_data);
                geometry.enter().append('rect').attr({'class': 'mark'});
                geometry.attr({
                        x: -barW/2,
                        y: radialScale(0), 
                        width: barW, 
                        height: function(d, i){ return radialScale(d[1]); }, 
                        transform: function(d, i){ return 'rotate('+ (axisConfig.originTheta - 90 + (angularScale(d[0]))) +')'}
                    })
                .style(markStyle);

        });
    }
    exports.config = function(_x) {
        if (!arguments.length) return config;
        micropolar._override(_x, config);
        return this;
    };
    d3.rebind(exports, dispatch, 'on');
    return exports;
};