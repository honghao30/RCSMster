export default {
  labels: ['D', 'D+1', 'D+2', 'D+3'],
  datasets: [
    {
      type: 'bar',
      label: '발송 성공 건수',
      backgroundColor: '#2F77FB',
      data: [500, 600, 600, 600],
      borderRadius: 4, // 바 그래프의 테두리 둥글기 정도
      barPercentage: 0.9, // 막대의 너비 비율을 조정
      categoryPercentage: 0.3,
      order: 2
    },
    {
      type: 'bar',
      label: '읽음 확인 건수',
      backgroundColor: '#F87B35',
      data: [300, 500, 550, 550],
      borderRadius: 4, // 바 그래프의 테두리 둥글기 정도
      barPercentage: 0.9, // 막대의 너비 비율을 조정
      categoryPercentage: 0.3, // 카테고리 간의 간격 비율을 조정
      order: 2
    },
    {
      type: 'bar',
      label: '버튼 클릭 수',
      backgroundColor: '#2F37FB',
      data: [90, 100, 100, 120],
      borderRadius: 4, // 바 그래프의 테두리 둥글기 정도
      barPercentage: 0.9, // 막대의 너비 비율을 조정
      categoryPercentage: 0.3, // 카테고리 간의 간격 비율을 조정
      order: 2
    },
    {
      type: 'line',
      yAxisID: 'y1', // y1 축 사용
      label: '읽음 확인율',
      borderColor: '#F86335',
      data: [51, 79, 83, 88],
      borderWidth: 2, // 라인의 두께
      pointStyle: 'circle',
      backgroundColor: '#fff',
      order: 1
    },
    {
      type: 'line',
      yAxisID: 'y1', // y1 축 사용
      label: '버튼 반응률',
      borderColor: '#1C00C6',
      data: [7, 12, 12, 15],
      borderWidth: 2, // 라인의 두께
      pointStyle: 'circle',
      backgroundColor: '#fff',
      order: 1
    }
  ]
}
