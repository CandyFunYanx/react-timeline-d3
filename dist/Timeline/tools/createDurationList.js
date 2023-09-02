import * as d3 from 'd3';
function createDurationList(oContainer, data, scaleTime, colors, barHeight, barTitleWidth, onClick) {
    var _a;
    // 按照数据绘制图形
    // 添加group_container
    var duration_list_arr = oContainer.selectAll('duration-list').data(data).enter().insert('div').attr('class', 'duration-list')
        .style('height', barHeight + 'px')
        .style('line-height', barHeight + 'px')
        .style('position', 'relative');
    (_a = duration_list_arr === null || duration_list_arr === void 0 ? void 0 : duration_list_arr.nodes()) === null || _a === void 0 ? void 0 : _a.forEach(function (node, index) {
        var _a, _b;
        // 添加标题
        d3.select(node).append('div')
            .text((data === null || data === void 0 ? void 0 : data[index]).group)
            .style('font-size', '12px')
            .style('transform', "translateX(-".concat(barTitleWidth, "px)"))
            .style('width', barTitleWidth + 'px')
            .style('text-align', 'center')
            .style('padding', '0px 10px');
        // 添加tips
        d3.select(node).selectAll('duration-item-tips').data((_a = data === null || data === void 0 ? void 0 : data[index]) === null || _a === void 0 ? void 0 : _a.items).enter().append('div')
            .attr('class', 'duration-item-tips')
            .attr('id', function (d, i) { return "duration-item-tips-".concat(i); })
            .style('position', 'absolute')
            .style('left', function (d) {
            return "".concat(scaleTime(new Date(d.start_time)) + (scaleTime(new Date(d.end_time)) - scaleTime(new Date(d.start_time))) / 2, "px");
        })
            .style('top', '35px')
            .style('transform', "translateX(-50%)")
            .style('background-color', '#fff')
            .style('opacity', 0)
            .style('transition', 'opacity 0.3s')
            .style('padding', '0 10px')
            .text(function (d) { return d.content; })
            .style('font-size', '12px')
            .style('text-align', 'center')
            .style('white-space', 'nowrap');
        // 添加事件incident
        d3.select(node).selectAll('duration-item').data((_b = data === null || data === void 0 ? void 0 : data[index]) === null || _b === void 0 ? void 0 : _b.items).enter().append('div')
            .attr('class', 'duration-item')
            .attr('id', function (d, i) { return "duration-item-".concat(i); })
            .style('position', 'absolute')
            .style('left', function (d) { return "".concat(scaleTime(new Date(d.start_time)), "px"); })
            .style('top', '0')
            .style('width', function (d) { return "".concat(scaleTime(new Date(d.end_time)) - scaleTime(new Date(d.start_time)), "px"); })
            .style('background-color', function (d, i) {
            var _a;
            if (typeof colors[index] === 'object') {
                return "".concat(colors[index % (colors === null || colors === void 0 ? void 0 : colors.length)][i % ((_a = colors[index]) === null || _a === void 0 ? void 0 : _a.length)]);
            }
            else {
                return colors[index];
            }
        })
            .style('height', barHeight - 2 + 'px')
            .style('border-radius', barHeight - 2 + 'px')
            .text(function (d) { return d.title; })
            .style('text-align', 'center')
            .style('font-size', '12px')
            .style('padding', '0px 10px')
            .style('overflow', 'hidden')
            .style('word-break', 'break-all')
            .style('text-overflow', 'ellipsis')
            .style('white-space', 'nowrap')
            .style('border', '1px solid rgba(#999, 0.1)')
            .style('transition', 'all 0.3s')
            .style('cursor', 'default')
            .on('mouseover', function (e, d) {
            var _a;
            d3.select(this).style('scale', '1.05').style('z-index', 2);
            var index = (_a = this.id) === null || _a === void 0 ? void 0 : _a.split('-').pop();
            console.log(index, 'index');
            d3.select((this.parentNode)).select("#duration-item-tips-".concat(index)).style('opacity', 1).style('z-index', 2);
        })
            .on('mouseout', function (e, d) {
            var _a;
            d3.select(this).style('scale', '1').style('z-index', 1);
            var index = (_a = this.id) === null || _a === void 0 ? void 0 : _a.split('-').pop();
            console.log(index, 'index');
            d3.select((this.parentNode)).select("#duration-item-tips-".concat(index)).style('opacity', 0).style('z-index', 1);
        })
            .on('click', function (e, d) {
            onClick(this, e, d);
        });
    });
}
export default createDurationList;
