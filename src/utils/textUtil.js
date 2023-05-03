import moment from 'moment'

export function addHyphenRegiNum(string) {
  return addHyphenTagRegi(string, false)
}
export function addHyphenTagRegiNum(string) {
  return addHyphenTagRegi(string, true)
}
function addHyphenTagRegi(string, tag) {
  if (!string) {
    return ''
  }
  return string.replace(/(\d{3})(\d{2})(\d{5})/, tag ? `$1<span class='hy'>-</span>$2<span class='hy'>-</span>$3` : '$1-$2-$3')
}

/**
 * 전화번호 정규식
 * 이통사: 010, 011, 017, 018, 019
 * 개인번호: 050
 * 지역번호: 02, 031, 032, 033, 041, 042, 043, 044, 051, 052, 053, 054, 055, 061, 062, 063, 064
 * 인터넷: 070, 080
 */
const WHOLE_TEL_PATTERN = /^((0(1(0|1|6|7|8|9)))|(0(2|3(1|2|3)|4(1|2|3|4)|5(0|1|2|3|4|5)|6(1|2|3|4)|70|80))).*$/

export function addHyphenTelNum(string) {
  return addHyphenTel(string, false)
}
export function addHyphenTagTelNum(string) {
  return addHyphenTel(string, true)
}
function addHyphenTel(string, tag) {
  if (!string) {
    return ''
  }
  if (string.match(WHOLE_TEL_PATTERN)) {
    if (string.indexOf('02') === 0) {
      // 02로 시작하는 경우
      return string.replace(/(\d{2})([0-9*]+)(\d{4})/, tag ? `$1<span class='hy'>-</span>$2<span class='hy'>-</span>$3` : '$1-$2-$3')
    } else {
      // 02를 제외한 나머지 전화번호 형태
      return string.replace(/(\d{3})([0-9*]+)(\d{4})/, tag ? `$1<span class='hy'>-</span>$2<span class='hy'>-</span>$3` : '$1-$2-$3')
    }
  }

  // 전국대표번호(정규식에 해당하지 않는 케이스) ex: 1588 등 8~9자리로 이루어진 번호
  if (string.length === 8 || string.length === 9) {
    return string.replace(/(\d{4})([0-9*]+)/, tag ? `$1<span class='hy'>-</span>$2` : '$1-$2')
  }

  // 어디에도 해당하지 않는 경우
  return string
}

/**
 * day인 경우 YYYY-MM-DD(요일) 형식을 리턴한다.
 * @type {string[]}
 */
const days = ['일', '월', '화', '수', '목', '금', '토']
export function dateFormatWithDayOfWeek(value, type) {
  if (value && type === 'day') {
    return moment(String(value)).format('YYYY-MM-DD') + ' (' + days[moment(String(value)).day()] + ')'
  } else if (value) {
    return moment(String(value)).format('YYYY-MM-DD')
  } else {
    return value
  }
}

const money = new Intl.NumberFormat('ko-Kr')
export function moneyFormat(val) {
  try {
    return money.format(val)
  } catch (e) {
    return val
  }
}
