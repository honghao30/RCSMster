<template>
  <table class="tbl_row_type">
    <caption>
      <strong>온라인문의</strong>
      <p>이름, 휴대폰번호, 이메일, 제목, 문의내용, 파일첨부</p>
    </caption>
    <colgroup>
      <col style="width:180px">
      <col style="width:auto">
    </colgroup>
    <tbody>
      <tr>
        <th scope="row">
          이름 <span class="require">*</span>
        </th>
        <td>
          <span class="custom_input">
            <input type="text" id placeholder ref="name" maxlength="20" v-model="userNm">
          </span>
        </td>
      </tr>
      <tr>
        <th scope="row">
          휴대폰번호 <span class="require">*</span>
        </th>
        <td>
          <div class="phone_number_area">
            <div class="input_phone_bundle">
              <span class="custom_select">
                <select v-model="mblnumList">
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                  <option value="017">017</option>
                  <option value="018">018</option>
                  <option value="019">019</option>
                </select>
              </span>
              <span class="hypen">-</span>
              <span class="custom_input">
                <input type="text" maxlength="4" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" v-model="mblNum[1]" ref="mblNum1">
              </span>
              <span class="hypen">-</span>
              <span class="custom_input">
                <input type="text" maxlength="4" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" v-model="mblNum[2]" ref="mblNum2">
              </span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">
          이메일 <span class="require">*</span>
        </th>
        <td>
          <div class="email_area">
            <span class="custom_input">
              <input type="text" placeholder v-model="emailId"  maxlength="30" ref="email1">
            </span>
            <span class="atsign">@</span>
            <span class="custom_input">
              <input v-if="!emailFormFlag" type="text" v-model="emailDomain" ref="email2" maxlength="29">
              <input v-if="emailFormFlag" type="text" v-model="emailDomain" ref="email2" maxlength="29" disabled>
            </span>
            <span class="custom_select">
              <select v-model="setEmailDomain">
                <option value>직접입력</option>
                <option v-for="item in emailDomainList" :value="item.code" :key="item.code">{{item.codeNm}}</option>
              </select>
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">
          제목 <span class="require">*</span>
        </th>
        <td>
          <div class="length_area">
            <span class="custom_input">
              <input type="text" id placeholder="제목을 입력해 주세요." maxlength="40" v-model="subject" ref="subject">
            </span>
            <span class="length">
              (<em>{{ subject.length }}</em>/40자)
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">
          문의내용 <span class="require">*</span>
        </th>
        <td>
          <div class="length_area">
            <div class="custom_textarea big">
              <textarea placeholder="문의 내용을 입력하세요." maxlength="1000" v-model="ctn" ref="ctn"></textarea>
            </div>
            <span class="length">
              (<em>{{ ctn.length }}</em>/1000자)
            </span>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">파일첨부</th>
        <td>
          <Drag-Drop-File-Upload
            :fileExt="['jpg', 'png', 'tiff', 'pdf', 'doc', 'ppt', 'pptx', 'xls', 'xlsx', 'hwp']"
            :limit="5"
            maxSize="50MB"
            @change="handleChangeFileList"
            @exceed="handleExceedFileSize"
            @exceed-limit="handleExceedLimit"
            @invalid-ext="handleInvalidExtension"
          ></Drag-Drop-File-Upload>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getUserSimple } from '@/api/cs/onlineqna'
import { retrieveCommonCode } from '@/api/common/code'
import DragDropFileUpload from '@/components/DragDropFileUpload'
// 스크립트를 정의하는 부분
// 개발자 작업 영역

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  name: 'onlineqnainfo',
  components: {
    DragDropFileUpload
  },
  props: {
    from: { type: String, default: '' },
    fileExt: {
      type: Array,
      default() {
        return [
          'jpg',
          'png',
          'tiff',
          'pdf',
          'doc',
          'ppt',
          'pptx',
          'xls',
          'xlsx',
          'hwp'
        ]
      }
    },
    maxSize: { type: String, default: '50MB' },
    limit: { type: Number, default: 0 }
  },
  data() {
    return {
      userId: '',
      userNm: '',
      mblNum: [],
      email: [],
      emailId: '',
      emailDomain: '',
      setEmailDomain: '',
      emailDomainList: [],
      userNameFlag: true,
      mblnumList: '010',
      subject: '',
      ctn: '',
      imageData: '',
      fileList: []
    }
  },
  computed: {
    totalSize() {
      let size = 0
      this.fileList.map(f => { size += f.size })
      return size
    },
    maxSizeByte() {
      return this.convertFileSizeStringToByte(this.maxSize)
    },
    fileExtString() {
      return this.fileExt.join(', ')
    },
    emailFormFlag() {
      return !jglib.isEmpty(this.setEmailDomain)
    }
  },
  watch: {
    setEmailDomain(value) {
      if (value) {
        this.emailDomain = value
      } else {
        this.emailDomain = ''
      }
    }
  },
  created() {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
    if (!jglib.isEmpty(this.$store.state.user.userId)) {
      this.userId = this.$store.state.user.userId
      let params = { userId: this.userId }
      getUserSimple(params)
        .then(res => {
          this.userNm = res.result.userNm
          this.userNameFlag = true
          if (res.result.mblNum.length === 11) {
            this.mblNum.push(res.result.mblNum.substr(0, 3))
            this.mblNum.push(res.result.mblNum.substr(3, 4))
            this.mblNum.push(res.result.mblNum.substr(7, 4))
            this.mblnumList = this.mblNum[0]
          } else {
            this.mblNum.push(res.result.mblNum.substr(0, 3))
            this.mblNum.push(res.result.mblNum.substr(3, 3))
            this.mblNum.push(res.result.mblNum.substr(6, 4))
            this.mblnumList = this.mblNum[0]
          }
          this.email = res.result.email.split('@')
          this.emailId = this.email[0]
          this.emailDomain = this.email[1]
        })
        .catch(res => {})
    } else {
      this.userNameFlag = false
    }

    retrieveCommonCode('EMAIL_DOMAIN').then(res => {
      this.emailDomainList = res.result
      let filter = _.filter(this.emailList, { code: this.emailDomain })
      if (filter.length > 0) {
        this.setEmailDomain = filter[0].code
      }
    })
  },
  mounted() {
    // 미리캔버스 이벤트 페이지에서 넘어온 경우
    if (this.from === 'miricanvas') {
      this.subject = '[미리캔버스 제작 지원 신청]'
      this.ctn =
        `문의 내용을 입력하세요.
---------------------------------------------------------------------------------------------------------
미리캔버스 제작 지원 신청하실 고객이시라면, 아래 사항을 입력해주세요.

01. 기업 고객이 직접 신청
· RBC 아이디 :
· 연락처 :
   (이메일, 휴대폰 번호 모두 입력) **해당 연락처로 지원 코드가 발급 및 1:1 맞춤 디자인이 진행되오니 정확히 입력해주세요.
· 브랜드명 :
· 가입한 대행사 :

02. 대행사가 대리 신청
· 고객사의 RBC 아이디 :
· 연락처 :
   (이메일, 휴대폰 번호 모두 입력) **해당 연락처로 지원 코드가 발급 및 1:1 맞춤 디자인이 진행되오니 정확히 입력해주세요.
· 브랜드명 :
· 가입한 대행사 :


* (공지) 미리캔버스 디자이너와 1:1 디자인 진행을 위해 고객님의 연락처와 브랜드명 등은 미리캔버스로 전달 될 예정입니다.`
    }
  },
  methods: {
    // 파일 업로드 영역
    handleChangeFileList(fileList) {
      this.fileList = fileList
    },
    handleExceedFileSize(sizeInfo) {
      let maxSize = jglib.convertFileSizeByte(sizeInfo.maxSize)
      this.$alertMsg(maxSize + ' 이하의 파일만 업로드 할 수 있습니다.')
    },
    handleExceedLimit(limitInfo) {
      this.$alertMsg(
        '첨부파일은 최대 ' + limitInfo.limit + '개까지 첨부 가능합니다.'
      )
    },
    handleInvalidExtension(extInfo) {
      this.$alertMsg(
        extInfo.ableExtension + ' 형식의 파일만 업로드 가능합니다.'
      )
    },
    getInfoValidation() {
      if (jglib.isEmpty(this.userNm)) {
        this.$alertMsg('이름을 입력해 주세요.').then(res => {
          this.$refs.name.focus()
          window.scrollTo(0, 0)
        })
        return false
      } else if (jglib.isEmpty(this.mblNum[1])) {
        this.$alertMsg('휴대폰 번호를 입력해 주세요.').then(res => {
          this.$refs.mblNum1.focus()
          window.scrollTo(0, 0)
        })
        return false
      } else if (jglib.isEmpty(this.mblNum[2])) {
        this.$alertMsg('휴대폰 번호를 입력해 주세요.').then(res => {
          this.$refs.mblNum2.focus()
          window.scrollTo(0, 0)
        })
        return false
      } else if (jglib.isEmpty(this.emailId)) {
        this.$alertMsg('이메일을 입력해 주세요.').then(res => {
          this.$refs.email1.focus()
          window.scrollTo(0, 0)
        })
        return false
      } else if (jglib.isEmpty(this.emailDomain)) {
        this.$alertMsg('이메일을 입력해 주세요.').then(res => {
          this.$refs.email2.focus()
          window.scrollTo(0, 0)
        })
        return false
      } else if (!jglib.isEmail(this.emailId + '@' + this.emailDomain)) {
        this.$alertMsg('잘못된 이메일 형식 입니다.').then(res => {
          this.$refs.email1.focus()
          window.scrollTo(0, 0)
        })
        return false
      } else if (jglib.isEmpty(this.subject)) {
        this.$alertMsg('제목을 입력해 주세요.').then(res => {
          this.$refs.subject.focus()
          window.scrollTo(0, 0)
        })
        return false
      } else if (jglib.isEmpty(this.ctn)) {
        this.$alertMsg('문의내용을 입력해 주세요.').then(res => {
          this.$refs.ctn.focus()
          window.scrollTo(0, 0)
        })
        return false
      }
      return true
    },
    getInfo() {
      let getInfoData = {
        name: this.userNm,
        mblNum: this.mblnumList + this.mblNum[1] + this.mblNum[2],
        email: this.emailId + '@' + this.emailDomain,
        subject: this.subject,
        ctn: this.ctn,
        fileList: this.fileList
      }
      return getInfoData
    },
    // 숫자만 입력
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    }
  }
}
</script>

<style lang="less" scoped></style>
