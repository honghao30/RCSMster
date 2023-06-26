export default {
  labels: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
  datasets: [
    {
      label: '남성',
      backgroundColor: '#2F77FB',
      data: [60, 78, 60, 60, 60, 40, 20],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3
    },
    {
      label: '여성',
      backgroundColor: '#F87B35',
      data: [50, 85, 65, 58, 37, 25],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3
    }
  ]
}
