import * as d3 from 'd3';
function createPointLine(oContainer, axis_arr, unit_width, axis_time_arr, type) {
    var _a;
    if (type === void 0) { type = 'dashed'; }
    // 绘制时间轴
    var line_container = oContainer.append('div').attr('class', 'line-container').style('position', 'absolute').style('top', '100%').style('width', '100%');
    type === 'dashed' ?
        line_container.append('div').attr('class', 'dashed-line').style('width', '100%').style('border', '1px dashed #999')
        :
            line_container.append('div').attr('class', 'solid-line').style('width', '100%').style('border', '1px solid #999');
    // 生成一个个的时间点axis——tick
    var point_box = line_container.append('div').attr('class', 'point-box').style('width', '100%').style('margin-top', '-13.5px');
    var point_arr = point_box.selectAll('div').data(axis_arr).enter().append('div')
        .attr('class', 'point-item')
        .attr('id', function (d, i) { return "point-item-".concat(i); })
        // .style('width', '10px')
        // .style('height', '10px')
        .style('display', 'inline-block')
        .style('position', 'relative');
    console.log(point_arr === null || point_arr === void 0 ? void 0 : point_arr.nodes());
    // 往每一个item中添加图标和时间label
    (_a = point_arr === null || point_arr === void 0 ? void 0 : point_arr.nodes()) === null || _a === void 0 ? void 0 : _a.forEach(function (node, index) {
        var _a;
        // 图标
        d3.select(node).append('div').attr('class', 'point-icon')
            .style('width', '8px')
            .style('height', '8px')
            .style('border-radius', '100%')
            .style('border', '1px solid #999')
            .style('display', 'inline-block')
            .style('margin-left', index === 0 ? "".concat(unit_width / 2 - 8, "px") : "".concat(unit_width - 8, "px"))
            .style('transform', "translate(-4px, 0)")
            .style('background-color', '#fff');
        // label
        d3.select(node).append('div').attr('class', 'point-label')
            .style('position', 'absolute')
            .style('font-size', '14px')
            .style('left', index === 0 ? "45%" : "70%")
            .style('top', '100%')
            .text((_a = new Date(axis_time_arr === null || axis_time_arr === void 0 ? void 0 : axis_time_arr[index])) === null || _a === void 0 ? void 0 : _a.getFullYear());
    });
}
export default createPointLine;
