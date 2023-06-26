export default {
  labels: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
  datasets: [
    {
      type: 'bar',
      label: '남성',
      backgroundColor: '#2F77FB',
      data: [60, 77, 60, 60, 40, 20],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3,
      order: 2
    },
    {
      type: 'bar',
      label: '여성',
      backgroundColor: '#F87B35',
      data: [45, 83, 63, 58, 37, 29],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3,
      order: 2
    }
  ]
}
