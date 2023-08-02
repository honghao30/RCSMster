export default {
  labels: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
  datasets: [
    {
      type: 'bar',
      label: '남성',
      backgroundColor: '#65D59A',
      data: [60, 77, 60, 60, 40, 20],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3,
      order: 2
    },
    {
      type: 'bar',
      label: '여성',
      backgroundColor: '#FF9DB5',
      data: [45, 83, 63, 58, 37, 29],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3,
      order: 2
    },
    {
      type: 'line',
      label: '전체평균',
      data: [20, 20, 20, 20, 20, 20], // 07.31 디자인 변경으로 인한 수정(데이터 변경)
      borderColor: '#000',
      order: 1,
      // 07.31 디자인 변경으로 인한 수정(borderWidth, pointStyle, radius 추가)
      borderWidth: 1,
      pointStyle: 'line',
      radius: 0.5
    }
  ]
}
