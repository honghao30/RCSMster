export default {
  labels: ['D (3월 1일)', 'D+1 (3월 2일)', 'D+2 (3월 3일)', 'D+3 (3월 4일)', 'D (3월 1일)', 'D+1 (3월 2일)', 'D+2 (3월 3일)', 'D+3 (3월 4일)'],
  datasets: [
    {
      type: 'bar',
      label: '발송 성공 건수',
      backgroundColor: '#6FB1FF', // 07.31 디자인 변경으로 인한 수정 (type : 'line' 삭제)
      data: [500, 600, 600, 600],
      borderRadius: 4,
      barPercentage: 0.9, // 막대의 너비 비율을 조정
      categoryPercentage: 0.3, // 카테고리 간의 간격 비율을 조정
      order: 2
    },
    {
      type: 'bar',
      label: '읽음 확인 건수',
      backgroundColor: '#78E1FF', // 07.31 디자인 변경으로 인한 수정 (type : 'line' 삭제)
      data: [300, 500, 550, 550],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3,
      order: 2
    },
    {
      type: 'bar',
      label: '버튼 클릭 수',
      backgroundColor: '#FF8964', // 07.31 디자인 변경으로 인한 수정 (type : 'line' 삭제)
      data: [90, 100, 100, 120],
      borderRadius: 4,
      barPercentage: 0.9,
      categoryPercentage: 0.3,
      order: 2
    }
    // 07.31 디자인 변경으로 인한 수정 (type : 'line' 삭제)
  ]
}
