import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import default_config from './config';
import clearContainer from './tools/clearContainer';
import getPointArr from './tools/getPointArr';
import createPointLine from './tools/createPointLine';
import createDurationList from './tools/createDurationList';
import './index.css';
var Timeline = function (_a) {
    var _b = _a.data, data = _b === void 0 ? default_config === null || default_config === void 0 ? void 0 : default_config.data : _b, _c = _a.barHeight, barHeight = _c === void 0 ? default_config === null || default_config === void 0 ? void 0 : default_config.barHeight : _c, _d = _a.barTitleWidth, barTitleWidth = _d === void 0 ? default_config === null || default_config === void 0 ? void 0 : default_config.barTitleWidth : _d, _e = _a.colors, colors = _e === void 0 ? default_config === null || default_config === void 0 ? void 0 : default_config.colors : _e, _f = _a.margin, margin = _f === void 0 ? 0 : _f, _g = _a.onClick, onClick = _g === void 0 ? function (el, e, d) {
        console.log(el, e, d, 'click');
    } : _g;
    var containerRef = useRef();
    useEffect(function () {
        if (containerRef.current) {
            // 取到container
            var oContainer = d3.select(containerRef.current).style('position', 'relative');
            // 每次渲染的时候，先清楚所有的子元素
            clearContainer(containerRef.current);
            // let oChild = containerRef.current.lastElementChild;
            // while(oChild) {
            //   containerRef.current.removeChild(oChild);
            //   oChild = containerRef.current.lastElementChild
            // }
            // 取到container的style
            var oStyle = window.getComputedStyle(containerRef.current);
            var _a = [parseInt(oStyle.width), parseInt(oStyle.height)], width = _a[0], height = _a[1];
            console.log(width, height);
            // 获取数据的时间两个端点
            // 获取所有的起始点和终点
            var start_time_arr_1 = [];
            var end_time_arr_1 = [];
            data === null || data === void 0 ? void 0 : data.map(function (g) {
                var _a;
                (_a = g.items) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                    start_time_arr_1.push(item.start_time);
                    end_time_arr_1.push(item.end_time);
                    return item;
                });
                return g;
            });
            // 利用d3取出start的最小值和end的最大值
            var start = d3.min(start_time_arr_1);
            var end = d3.max(end_time_arr_1);
            console.log(start, end);
            // =========================================================================
            // 创建时间比例尺
            var scaleTime_1 = d3.scaleTime().domain([new Date(start), new Date(end)]).range([0, width]);
            // 根据宽度创建时间点，默认10个中间点
            var _b = getPointArr(width, 10), axis_arr = _b[0], unit_width = _b[1];
            // const unit_width = parseInt(width / 10);
            // console.log(unit_width, 'unit_width');
            // const axis_arr = [];
            // for(let i = 0; i < 10; i++) {
            //   axis_arr.push((unit_width / 2) + unit_width * i);
            // }
            console.log(axis_arr, 'axis_arr');
            // 根据axis_arr计算axis_time_arr
            var axis_time_arr = axis_arr === null || axis_arr === void 0 ? void 0 : axis_arr.map(function (axis) { return scaleTime_1.invert(axis); });
            console.log(axis_time_arr, 'axis_time_arr');
            // =====================================================================
            // 绘制时间轴
            createPointLine(oContainer, axis_arr, unit_width, axis_time_arr);
            // const line_container = oContainer.append('div').attr('class', 'line-container').style('position', 'absolute').style('top', '100%').style('width', '100%');
            // // const solid_line = line_container.append('div').attr('class', 'solid-line').style('width', '100%').style('border', '1px solid #999');
            // const dashed_line = line_container.append('div').attr('class', 'dashed-line').style('width', '100%').style('border', '1px dashed #999');
            // // 生成一个个的时间点axis——tick
            // const point_box = line_container.append('div').attr('class', 'point-box').style('width', '100%').style('margin-top', '-13.5px');
            // const point_arr = point_box.selectAll('div').data(axis_arr).enter().append('div')
            //   .attr('class', 'point-item')
            //   .attr('id', function(d, i) {return `point-item-${i}`})
            //   // .style('width', '10px')
            //   // .style('height', '10px')
            //   .style('display', 'inline-block')
            //   .style('position', 'relative');
            // console.log(point_arr?.nodes())
            // // 往每一个item中添加图标和时间label
            // point_arr?.nodes()?.forEach((node, index) => {
            //   // 图标
            //   d3.select(node).append('div').attr('class', 'point-icon')
            //     .style('width', '8px')
            //     .style('height', '8px')
            //     .style('border-radius', '100%')
            //     .style('border', '1px solid #999')
            //     .style('display', 'inline-block')
            //     .style('margin-left', index === 0 ? `${unit_width / 2 - 8}px` : `${unit_width - 8}px`)
            //     .style('transform', `translate(-4px, 0)`)
            //     .style('background-color', '#fff')
            //   // label
            //   d3.select(node).append('div').attr('class', 'point-label')
            //     .style('position', 'absolute')
            //     .style('font-size', '14px')
            //     .style('left', index === 0 ? `45%` : `70%`)
            //     .style('top', '100%')
            //     .text(new Date(axis_time_arr?.[index])?.getFullYear())
            // })
            // =========================================================================
            // =========================================================================
            // 按照数据绘制图形
            // 添加group_container
            createDurationList(oContainer, data, scaleTime_1, colors, barHeight, barTitleWidth, onClick);
            // const duration_list_arr = oContainer.selectAll('duration-list').data(data).enter().insert('div').attr('class', 'duration-list')
            //   .style('height', '30px')
            //   .style('line-height', '30px')
            //   .style('position', 'relative')
            // duration_list_arr?.nodes()?.forEach((node, index) => {
            //   // 添加标题
            //   d3.select(node).append('div')
            //     .text(data?.[index].group)
            //     .style('font-size', '12px')
            //     .style('transform', 'translateX(-100px)')
            //     .style('width', '100px')
            //     .style('text-align', 'center')
            //     .style('padding', '0px 10px')
            //   // 添加tips
            //   d3.select(node).selectAll('duration-item-tips').data(data?.[index]?.items).enter().append('div')
            //     .attr('class', 'duration-item-tips')
            //     .attr('id', function(d, i) {return `duration-item-tips-${i}`})
            //     .style('position', 'absolute')
            //     .style('left', function(d) {
            //       return `${scaleTime(new Date(d.start_time)) + (scaleTime(new Date(d.end_time)) - scaleTime(new Date(d.start_time))) / 2 + 10}px`
            //     })
            //     .style('top', '35px')
            //     .style('transform', `translateX(-50%)`)
            //     .style('background-color', '#fff')
            //     .style('opacity', 0)
            //     .style('transition', 'opacity 0.3s')
            //     .style('padding', '0 10px')
            //     .text(function(d) {return d.title})
            //     .style('font-size', '12px')
            //     .style('text-align', 'center')
            //     .style('white-space', 'nowrap')
            //   // 添加事件incident
            //   d3.select(node).selectAll('duration-item').data(data?.[index]?.items).enter().append('div')
            //     .attr('class', 'duration-item')
            //     .attr('id', function(d, i) {return `duration-item-${i}`})
            //     .style('position', 'absolute')
            //     .style('left', function(d) {return `${scaleTime(new Date(d.start_time))}px`})
            //     .style('top', '0')
            //     .style('width', function(d) {return `${scaleTime(new Date(d.end_time)) - scaleTime(new Date(d.start_time))}px`})
            //     .style('background-color', function(d, i) {return `${colors[index][i % colors[index]?.length]}`})
            //     .style('height', '28px')
            //     .style('border-radius', '28px')
            //     .text(function(d) {return d.title})
            //     .style('text-align', 'center')
            //     .style('font-size', '12px')
            //     .style('padding', '0px 10px')
            //     .style('overflow', 'hidden')
            //     .style('word-break', 'break-all')
            //     .style('text-overflow', 'ellipsis')
            //     .style('white-space', 'nowrap')
            //     .style('border', '1px solid rgba(#999, 0.1)')
            //     .style('transition', 'all 0.3s')
            //     .style('cursor', 'default')
            //     .on('mouseover', function(e, d) {
            //       d3.select(this).style('scale', '1.05').style('z-index', 2)
            //       const index = this.id?.split('-').pop();
            //       console.log(index, 'index')
            //       d3.select(this.parentNode).select(`#duration-item-tips-${index}`).style('opacity', 1).style('z-index', 2)
            //     })
            //     .on('mouseout', function(e, d) {
            //       d3.select(this).style('scale', '1').style('z-index', 1)
            //       const index = this.id?.split('-').pop();
            //       console.log(index, 'index')
            //       d3.select(this.parentNode).select(`#duration-item-tips-${index}`).style('opacity', 0).style('z-index', 1)
            //     })
            //     .on('click', function(e, d) {
            //     })
            // })
        }
    }, []);
    return (React.createElement("div", { className: 'Timeline', style: {
            display: 'inline-block',
            padding: '40px 20px 40px 100px',
            paddingLeft: barTitleWidth + 20,
            margin: margin
        } },
        React.createElement("div", { className: 'container', style: { width: 600, height: 200 }, ref: containerRef })));
};
export default Timeline;
