export default {
  labels: ['2월 26일', '2월 27일', '2월 28일', '3월 1일', '3월 2일', '3월 3일', '3월 4일'],
  datasets: [
    {
      type: 'bar',
      label: '고객센터',
      backgroundColor: '#2F77FB',
      data: [1400, 1100, 2200, 1700, 800, 1200, 1200],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3
    },
    {
      type: 'bar',
      label: '공지사항',
      backgroundColor: '#8EB6FF',
      data: [0, 0, 2800, 2200, 1000, 2000, 2000],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3
    },
    {
      type: 'bar',
      label: '문자수신 동의하고 6천원 받기',
      backgroundColor: '#C1D7FF',
      data: [0, 0, 3800, 3200, 1600, 2800, 3000],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3
    }
  ]
}
