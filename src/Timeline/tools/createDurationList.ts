import * as d3 from 'd3';

function createDurationList(oContainer: any, data: [], scaleTime: any, colors: [], barHeight: number, barTitleWidth: number, onClick: Function) {
  // 按照数据绘制图形
  // 添加group_container
  const duration_list_arr = oContainer.selectAll('duration-list').data(data).enter().insert('div').attr('class', 'duration-list')
    .style('height', barHeight + 'px')
    .style('line-height', barHeight + 'px')
    .style('position', 'relative')

  duration_list_arr?.nodes()?.forEach((node: HTMLElement, index: number) => {
    // 添加标题
    d3.select(node).append('div')
      .text((data?.[index] as any).group)
      .style('font-size', '12px')
      .style('transform', `translateX(-${barTitleWidth}px)`)
      .style('width', barTitleWidth + 'px')
      .style('text-align', 'center')
      .style('padding', '0px 10px')

    // 添加tips
    d3.select(node).selectAll('duration-item-tips').data((data?.[index] as any)?.items).enter().append('div')
      .attr('class', 'duration-item-tips')
      .attr('id', function(d: any, i: number) {return `duration-item-tips-${i}`})
      .style('position', 'absolute')
      .style('left', function(d: any) {
        return `${scaleTime(new Date(d.start_time)) + (scaleTime(new Date(d.end_time)) - scaleTime(new Date(d.start_time))) / 2}px`
      })
      .style('top', '35px')
      .style('transform', `translateX(-50%)`)
      .style('background-color', '#fff')
      .style('opacity', 0)
      .style('transition', 'opacity 0.3s')
      .style('padding', '0 10px')
      .text(function(d: any) {return d.content})
      .style('font-size', '12px')
      .style('text-align', 'center')
      .style('white-space', 'nowrap')

    // 添加事件incident
    d3.select(node).selectAll('duration-item').data((data?.[index] as any)?.items).enter().append('div')
      .attr('class', 'duration-item')
      .attr('id', function(d: any, i: number) {return `duration-item-${i}`})
      .style('position', 'absolute')
      .style('left', function(d: any) {return `${scaleTime(new Date(d.start_time))}px`})
      .style('top', '0')
      .style('width', function(d: any) {return `${scaleTime(new Date(d.end_time)) - scaleTime(new Date(d.start_time))}px`})
      .style('background-color', function(d: any, i: number) {
        if(typeof colors[index] === 'object') {
          return `${colors[index % colors?.length][i % (colors[index] as [])?.length]}`
        } else {
          return colors[index]
        }
      })
      .style('height', barHeight - 2 + 'px')
      .style('border-radius', barHeight - 2 + 'px')
      .text(function(d: any) {return d.title})
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
      .on('mouseover', function(this: HTMLElement, e: MouseEvent, d: any) {
        d3.select(this).style('scale', '1.05').style('z-index', 2)
        const index = this.id?.split('-').pop();
        console.log(index, 'index')
        d3.select((this.parentNode) as HTMLElement).select(`#duration-item-tips-${index}`).style('opacity', 1).style('z-index', 2)
      })
      .on('mouseout', function(this: HTMLElement, e: MouseEvent, d: any) {
        d3.select(this).style('scale', '1').style('z-index', 1)
        const index = this.id?.split('-').pop();
        console.log(index, 'index')
        d3.select((this.parentNode) as HTMLElement).select(`#duration-item-tips-${index}`).style('opacity', 0).style('z-index', 1)
      })
      .on('click', function(this: HTMLElement, e: MouseEvent, d: any) {
        onClick(this, e, d)
      })
  })
}

export default createDurationList;