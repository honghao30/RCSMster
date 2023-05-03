// 나이스 인증 팝업 오픈
// export function openNiceCertiPopup() {
//   window.open(
//     '',
//     'popup',
//     'width=500, height=550,toolbar=no,directories=no,scrollbars=no,resizable=no,status=no,menubar=no,top=0,left=0'
//   )

//   let niceUrl = process.env.VUE_APP_NICE_URL
//   let form = document.createElement('form')
//   form.setAttribute('action', '/nice/Checkplus_main') // 개발

//   form.setAttribute('target', 'popup')
//   document.body.appendChild(form)
//   form.submit()
// }

/**
 * 휴대폰 인증 성공 결과
 */
// export function fnCiDupCheck(ci, mdn, userName, di) {
//   let mobile = mdn.replace(
//     /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
//     '$1-$2-$3'
//   )
//   sessionStorage.setItem('certMobileNo', mdn)
//   sessionStorage.setItem('certCI', ci)
//   sessionStorage.setItem('certDI', di)
//   sessionStorage.setItem('userName', userName)

//   document.getElementById('btnNiceCallback').click()
// }

// export function getCertiMobileInfo() {
//   let info = {
//     mobile: sessionStorage.getItem('certMobileNo'),
//     ci: sessionStorage.getItem('certCI'),
//     di: sessionStorage.getItem('certDI'),
//     userName: sessionStorage.getItem('userName')
//   }

//   sessionStorage.removeItem('certMobileNo')
//   sessionStorage.removeItem('certCI')
//   sessionStorage.removeItem('certDI')
//   sessionStorage.removeItem('userName')

//   return info
// }
