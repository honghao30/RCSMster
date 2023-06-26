export default {
  labels: ['2월 26일', '2월 27일', '2월 28일', '3월 1일', '3월 2일', '3월 3일', '3월 4일'],
  datasets: [
    {
      type: 'bar',
      label: '방문자수',
      backgroundColor: '#2F77FB',
      data: [100, 80, 50, 100, 150, 60, 40],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3,
      order: 2
    },
    {
      type: 'line',
      label: '페이지뷰',
      borderColor: '#F86335',
      data: [120, 230, 180, 200, 270, 110, 190],
      borderWidth: 2,
      pointStyle: 'circle',
      backgroundColor: '#fff',
      order: 1
    }
  ]
}
