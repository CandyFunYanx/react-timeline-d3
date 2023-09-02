import * as d3 from 'd3';

function createPointLine(oContainer: any, axis_arr: [], unit_width: number, axis_time_arr: [], type = 'dashed') {
  // 绘制时间轴
  const line_container = oContainer.append('div').attr('class', 'line-container').style('position', 'absolute').style('top', '100%').style('width', '100%');
  type === 'dashed' ? 
  line_container.append('div').attr('class', 'dashed-line').style('width', '100%').style('border', '1px dashed #999')
  :
  line_container.append('div').attr('class', 'solid-line').style('width', '100%').style('border', '1px solid #999');
  
  // 生成一个个的时间点axis——tick
  const point_box = line_container.append('div').attr('class', 'point-box').style('width', '100%').style('margin-top', '-13.5px');
  const point_arr = point_box.selectAll('div').data(axis_arr).enter().append('div')
    .attr('class', 'point-item')
    .attr('id', function(d: any, i: number) {return `point-item-${i}`})
    // .style('width', '10px')
    // .style('height', '10px')
    .style('display', 'inline-block')
    .style('position', 'relative');
  console.log(point_arr?.nodes())
  // 往每一个item中添加图标和时间label
  point_arr?.nodes()?.forEach((node: HTMLElement, index: number) => {
    // 图标
    d3.select(node).append('div').attr('class', 'point-icon')
      .style('width', '8px')
      .style('height', '8px')
      .style('border-radius', '100%')
      .style('border', '1px solid #999')
      .style('display', 'inline-block')
      .style('margin-left', index === 0 ? `${unit_width / 2 - 8}px` : `${unit_width - 8}px`)
      .style('transform', `translate(-4px, 0)`)
      .style('background-color', '#fff')

    // label
    d3.select(node).append('div').attr('class', 'point-label')
      .style('position', 'absolute')
      .style('font-size', '14px')
      .style('left', index === 0 ? `45%` : `70%`)
      .style('top', '100%')
      .text(new Date(axis_time_arr?.[index])?.getFullYear())
  })
}

export default createPointLine;