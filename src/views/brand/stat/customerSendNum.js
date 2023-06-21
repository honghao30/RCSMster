export default {
  labels: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
  datasets: [
    {
      label: '남성',
      backgroundColor: '#2F77FB',
      data: [60, 78, 60, 60, 60, 40, 20],
      borderRadius: 4, // 바 그래프의 테두리 둥글기 정도
      barPercentage: 0.9, // 막대의 너비 비율을 조정
      categoryPercentage: 0.3 // 카테고리 간의 간격 비율을 조정
    },
    {
      label: '여성',
      backgroundColor: '#F87B35',
      data: [50, 85, 65, 58, 37, 25],
      borderRadius: 4,
      barPercentage: 0.9, // 막대의 너비 비율을 조정
      categoryPercentage: 0.3 // 카테고리 간의 간격 비율을 조정
    }
  ]
}
