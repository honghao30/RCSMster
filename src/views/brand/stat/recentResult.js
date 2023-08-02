export default {
  labels: ['2월 26일', '2월 27일', '2월 28일', '3월 1일', '3월 2일', '3월 3일', '3월 4일'],
  datasets: [
    {
      type: 'bar',
      label: '고객센터',
      backgroundColor: '#6FB1FF', // 07.31 디자인 변경으로 인한 수정
      data: [1400, 1100, 2200, 1700, 800, 1200, 1200],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3
    },
    {
      type: 'bar',
      label: '공지사항',
      backgroundColor: '#78E1FF', // 07.31 디자인 변경으로 인한 수정
      data: [0, 0, 2800, 2200, 1000, 2000, 2000],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3
    },
    {
      type: 'bar',
      label: '문자수신 동의하고 6천원 받기',
      backgroundColor: '#FF8964', // 07.31 디자인 변경으로 인한 수정
      data: [0, 0, 3800, 3200, 1600, 2800, 3000],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3
    },
    // 07.31 디자인 변경으로 인한 수정 (데이터 추가)
    {
      type: 'bar',
      label: '항목 4',
      backgroundColor: '#FFD965',
      data: [0, 0, 1600, 1600, 1600, 1600, 1600],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3
    },
    // 07.31 디자인 변경으로 인한 수정 (데이터 추가)
    {
      type: 'bar',
      label: '항목 5',
      backgroundColor: '#65D59A',
      data: [0, 0, 1200, 1200, 1200, 1200, 1200],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3
    }
  ]
}
