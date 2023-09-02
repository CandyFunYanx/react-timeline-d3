export const colors = [
  [
    '#ccd1f5',
    '#c3d4eb',
    '#d1cdf5'
  ],
  [
    '#e1c3ea',
    '#f3bfdd',
    '#efc7cf',
  ],
  [
    '#efd6be',
    '#f0cbb4'
  ]
]

export const data: object[] = [
  {
    group: '中国',
    items: [
      {
        start_time: '2000',
        end_time: '2017',
        title: 'china-01',
        content: '2000-2017 china-01'
      },
      {
        start_time: '2021',
        end_time: '2022',
        title: 'china-02',
        content: '2021-2022 china-02'
      },
    ]
  },
  {
    group: '日本',
    items: [
      {
        start_time: '2006',
        end_time: '2008',
        title: 'nihonggo-01',
        content: '2006-2008 nihong-01'
      },
      {
        start_time: '2012',
        end_time: '2018',
        title: 'nihonggo-02',
        content: '2012-2018 nihong-02'
      },
    ]
  },
  {
    group: '欧洲',
    items: [
      {
        start_time: '2002',
        end_time: '2008',
        title: 'EU-01',
        content: '2002-2008 EU-01'
      },
      {
        start_time: '2008',
        end_time: '2016',
        title: 'EU-02',
        content: '2008-2016 EU-02'
      },
    ]
  }
]

export const barHeight = 30
export const barTitleWidth = 80

export default {
  data,
  colors,
  barHeight,
  barTitleWidth
}