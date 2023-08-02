export default {
  labels: ['장년 - 쇼퍼홀릭', '장년 - 인싸장년', '중년 - 영유아부모', '청년 - 대학생', '노년 - 오프라인 실버', '기타'],
  datasets: [
    {
      type: 'doughnut',
      label: '발송고객 SEG TOP 5',
      data: [25, 21, 15, 10, 10, 19],
      backgroundColor: ['#6EB1FF', '#78E1FF', '#FF8964', '#FFD965', '#65D59A', '#A194FF'] // 07.31 디자인 변경으로 인한 수정
    }
  ]
}
