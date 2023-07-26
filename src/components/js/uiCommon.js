const uiCommon = {
  // 드롭 박스용 데이터 만들기
  getDropDownCodes (list, codeNmKey, codeKey, isAll) {
    let resultArr = []
    if (isAll) resultArr.push({ codeNm: '전체보기', code: '' })
    let _list = JSON.parse(JSON.stringify(list))
    for (let i = 0; i < _list.length; i++) {
      resultArr.push(
        { codeNm: _list[i][codeNmKey], code: _list[i][codeKey] }
      )
    }
    return resultArr
  }
}

export default uiCommon
