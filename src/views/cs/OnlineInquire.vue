<template>
  <div class="inner notice online">
    <div class="online-title__wrap--top">
      <PageTitle pagetitle="온라인 문의" />
      <PageTitleH3 titleh3="문의정보" />
    </div>
    <form ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="200px">
            <col />
          </colgroup>
          <tbody>
            <!-- 문의유형 / select -->
            <tr>
              <th scope="row"><span class="form-item__label required">문의유형</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row w--half">
                    <Dropdown v-if="inquiryCateList.length > 0" :options="inquiryCateList" placeholder="선택해 주세요." v-model="form.cate" @input="cateValidation" />
                  </div>
                  <p class="guide-text error" v-if="error.cate">문의 유형을 선택해주세요.</p>
                </div>
              </td>
            </tr>
            <!-- 문의 제목 / text -->
            <tr class="limit-area">
              <th scope="row"><span class="form-item__label required">문의 제목</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item input-limit">
                      <span class="input">
                        <input type="text" class="input" maxlength="40" placeholder="문의 제목을 입력해주세요." v-model="form.subject" @focusout="subjectValidation">
                        <p class="input-limit__text">
                          {{ form.subject.length }}/40자
                        </p>
                      </span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="error.subject">문의 제목을 입력해주세요.</p>
                </div>
              </td>
            </tr>
            <!-- 문의 내용 / textarea -->
            <tr>
              <th scope="row"><span class="form-item__label required">문의 내용</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item input-limit">
                      <div class="textarea">
                        <textarea maxlength="1000" placeholder="문의 내용을 입력해주세요." v-model="form.ctn" @focusout="ctnValidation"></textarea>
                        <div class="textarea-limit__text">
                          <p>
                            {{ form.ctn.length }}/1000자
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="error.ctn">문의 내용을 입력해주세요.</p>
                </div>
              </td>
            </tr>
            <!-- 파일 선택 -->
            <tr>
              <th scope="row"><span class="form-item__label">파일첨부</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="file-choice">
                      <div class="file-choice__title">
                        <input type="file" id="fileUp" class="input blind" @change="fileChangeCheck">
                        <label for="fileUp" class="btn btn-default-line">파일선택</label>
                      </div>
                      <el-upload
                        class="file-upload"
                        drag
                        action
                        :on-change="handleChange"
                        :auto-upload="false"
                        multiple
                        :show-file-list ="false"
                        v-if="fileList.length < 1"
                        >
                        <span class="file-upload__text">마우스로 파일을 끌어다 놓으세요.</span>
                      </el-upload>
                      <ul class="file-choice__result" v-if="fileList.length > 0" >
                        <li v-for="(file, i) in fileList" :key="i">
                          {{ file.name }}
                          (
                          <em class="file_size">{{ file.size }}</em>
                          )
                          <a role="button" class="btn-file--del" @click="deleteFile(i)"><span>삭제</span></a>
                        </li>
                      </ul>
                    </div>

                  </div>
                  <p class="guide-text black">&middot; 이미지 용량: 최대 {{ maxSize }}</p>
                  <p class="guide-text black">&middot; 파일종류: {{ fileExtString }}</p>
                  <p class="guide-text black">&middot; 최대 {{ limit }}개까지 첨부 가능합니다.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <div class="online-title__wrap--top">
      <PageTitleH3 titleh3="회원정보" />
    </div>
    <!-- 회원정보 -->
    <form ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="200px">
            <col />
          </colgroup>
          <tbody>
            <!-- 이름 -->
            <tr>
              <th scope="row"><span class="form-item__label required">이름</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <span class="input input-info"><input type="text" class="input" placeholder="이름을 입력해 주세요." v-model="form.name" @focusout="nameValidation"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="error.name">이름을 입력해주세요.</p>
                </div>
              </td>
            </tr>
            <!-- 휴대폰 -->
            <tr>
              <th scope="row"><span class="form-item__label required">휴대폰 번호</span></th>
              <td>
                <div class="form-item__content">
                  <!-- <div class="form-item-row">
                    <div class="input-item">
                    <span class="input input-info">
                      <input
                        type="text"
                        class="input"
                        placeholder="휴대폰 번호를 입력해주세요."
                        v-model="form.mblNum"
                        @focusout="mblNumValidation"
                        maxlength="12"
                        @keydown="keydownOnlyNum"
                        @keyup="keyupOnlyNum">
                    </span>
                    </div>
                  </div> -->
                  <!-- 기획서 1.0 수정 -->
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="dropdown-tel"><Dropdown :options="dropdownTel" value="선택" @beforeChange="isChange" v-model="form.telFirst" /></span>
                      <span>-</span>
                      <span class="input input-tel"><input type="text" class="input" placeholder="" v-model="form.mblNum"></span>
                      <span>-</span>
                      <span class="input input-tel"><input type="text" class="input" placeholder="" v-model="form.mblNum"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="error.mblNum">휴대폰 번호를 입력해주세요.</p>
                </div>
              </td>
            </tr>
            <!-- 이메일 -->
            <tr>
              <th scope="row"><span class="form-item__label required">이메일</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input input-info"><input type="text" class="input" placeholder="이메일을 입력해 주세요." v-model="form.email" @focusout="emailValidation"></span>
                    </div>
                  </div>
                  <p class="guide-text">※ 문의에 대한 답변을 받을 수 있도록 이메일을 정확히 입력해 주세요.</p>
                  <p class="guide-text error" v-if="error.email">이메일을 입력해주세요.</p>
                  <p class="guide-text error" v-if="error.emailFormat">잘못된 이메일 형식 입니다.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <form ref="form" :model="form" v-show="!member">
      <div class="agree__wrap privacy">
        <h3 class="agree__title">약관동의</h3>
        <p class="agree__title-sub">개인정보 수집 및 이용 안내 (필수)</p>
        <div class="agree__item">
          <div class="agree__box">
            <div class="terms">
              <p class="terms__text">문의 내용 접수 및 처리, 결과 회신을 위하여 최소한의 개인정보를 수집합니다.</p>
              <br>
              <p class="terms__text">수집항목 : 이름, 휴대폰번호, 이메일주소</p>
              <p class="terms__text">보유기간 : 문의 접수 후 3년</p>
            </div>
          </div>
        </div>
        <div class="checkbox">
            <input type="checkbox" id="delegate" v-model="agreeCheck" @change="agreeValidation" />
            <label for="delegate">
              <span class="checkbox__text">개인정보 수집 및 이용에 동의합니다.</span>
            </label>
            <!-- 기획서 1.0 수정 -->
            <p class="guide-text error" v-if="error.agree">개인정보 수집 및 이용 약관에 동의해주세요.</p>
        </div>
      </div>
    </form>
    <div class="button__wrap">
      <ButtonCmp
        type="btn-blue-line"
        @click="goBack"
      >취소</ButtonCmp>
      <ButtonCmp
        type="btn-blue"
        @click="inquiryValidation"
      >등록</ButtonCmp>
    </div>
    <!-- 모달 창 -->
    <ModalView v-if="loginConfirm">
      <ConfirmMsg v-if="loginConfirm">
        <div slot="msg">
          <div class="msg">
            <div class="phone-cert__title">
              로그인 하시겠습니까?
            </div>
            <div class="phone-cert__msg">
              로그인 후 문의를 작성하시면<br>답변 내용을 사이트에서도 확인하실 수 있습니다.<br>(로그인하지 않으셔도 문의 가능합니다.)
            </div>
          </div>
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp type="btn-blue-line" @click="closeConfirm">아니요</ButtonCmp>
          <ButtonCmp type="btn-blue" @click="goLogin">예</ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- //모달 창 -->
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import { retrieveCommonCode } from '@/api/common/code'
import { memberInquiry, noMemberInquiry } from '@/api/cs/onlineqna'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    ModalView,
    ConfirmMsg,
    PageTitleH3,
    Dropdown
  },
  props: {
    from: { type: String, default: '' }
  },
  data() {
    return {
      // 회원 true, 비회원 flase
      member: true,
      agreeCheck: false,
      form: {
        cate: '',
        subject: '',
        ctn: '',
        name: '',
        mblNum: '',
        email: ''
      },
      error: {
        cate: false,
        subject: false,
        ctn: false,
        name: false,
        mblNum: false,
        email: false,
        emailFormat: false,
        agree: false
      },
      inquiryCateList: [],
      maxSize: '50MB',
      limit: '5',
      fileExt: ['JPG', 'PNG', 'TIFF', 'PDF', 'DOC', 'PPT', 'PPTX', 'XLS', 'XLSX', 'HWP'],
      fileList: [],
      loginConfirm: false,
      dropdownTel: [
        { codeNm: '010' },
        { codeNm: '070' },
        { codeNm: '02' },
        { codeNm: '031' },
        { codeNm: '032' },
        { codeNm: '062' },
        { codeNm: '063' },
        { codeNm: '064' }
      ]
    }
  },
  computed: {
    totalSize() {
      let size = 0

      this.fileList.map(f => {
        size += f.size
      })

      return size
    },
    maxSizeByte() {
      return this.convertFileSizeStringToByte(this.maxSize)
    },
    fileExtString() {
      return this.fileExt.join(', ')
    }
  },
  created() {
    if (jglib.isEmpty(this.$store.state.user.userId)) {
      this.member = false
    }
  },
  mounted() {
    // 콤보 코드 목록 조회
    retrieveCommonCode('INQUIRY_CATE').then(res => {
      res.result.forEach(element => {
        this.inquiryCateList.push({
          code: element.code,
          codeNm: element.codeNm
        })
      })
    })

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

    if (this.member === false) {
      this.loginConfirm = true
    }
  },
  methods: {
    goLogin() {
      this.$router.push('/login')
    },
    goBack() {
      if (this.member === true) {
        if (this.from === 'miricanvas') {
          // 미리캔버스 이벤트 페이지에서 넘어온 경우는 '서비스 관리'로 돌린다.
          this.$router.push('/service/dashboard')
        } else {
          this.$router.go(-1)
        }
      } else {
        this.$router.push('/')
      }
    },
    cateValidation(value) {
      this.error.cate = jglib.isEmpty(this.form.cate)
    },
    subjectValidation() {
      this.error.subject = jglib.isEmpty(this.form.subject)
    },
    ctnValidation() {
      this.error.ctn = jglib.isEmpty(this.form.ctn)
    },
    nameValidation() {
      this.error.name = jglib.isEmpty(this.form.name)
    },
    mblNumValidation() {
      this.error.mblNum = jglib.isEmpty(this.form.mblNum)
    },
    emailValidation() {
      this.error.email = false
      this.error.emailFormat = false
      if (jglib.isEmpty(this.form.email)) {
        this.error.email = true
      } else if (!jglib.isEmail(this.form.email)) {
        this.error.emailFormat = true
      }
    },
    agreeValidation() {
      if (this.member === false && this.agreeCheck === false) {
        this.error.agree = true
      } else {
        this.error.agree = false
      }
    },

    inquiryValidation() {
      this.cateValidation()
      this.subjectValidation()
      this.ctnValidation()
      this.nameValidation()
      this.mblNumValidation()
      this.emailValidation()
      this.agreeValidation()

      if (
        this.error.cate || this.error.subject || this.error.ctn || this.error.name ||
        this.error.mblNum || this.error.email || this.error.emailFormat || this.error.agree
      ) {
        window.scrollTo(0, 0)
        return
      }
      this.saveOnlineQna()
    },
    saveOnlineQna() {
      let formData = new FormData()
      let params = {
        cate: this.form.cate,
        subject: this.form.subject,
        ctn: this.form.ctn,
        name: this.form.name,
        mblNum: this.form.mblNum,
        email: this.form.email,
        privYn: 'Y'
      }
      formData.append('data', JSON.stringify(params))
      if (!jglib.isEmpty(this.fileList)) {
        this.fileList.forEach(item => {
          formData.append('regFile', item)
        })
      }

      if (this.member === false) {
        noMemberInquiry(formData)
          .then(res => {
            this.$alertMsg('온라인 문의가 접수되었습니다. 문의 답변은 입력하신 이메일로 전달드립니다.').then(() => {
              this.$router.push('/')
            })
          })
          .catch(res => {
            this.$alertMsg(res.desc ? res.desc : '온라인 문의는 60초 이내에 재접수 할 수 없습니다.')
          })
      } else {
        memberInquiry(formData)
          .then(res => {
            this.$alertMsg('온라인 문의가 접수되었습니다. 문의 답변은 입력하신 이메일로 전달드립니다.').then(() => {
              this.$router.push('/cs/qna/list')
            })
          })
          .catch(res => {
            this.$alertMsg(res.desc ? res.desc : '온라인 문의는 60초 이내에 재접수 할 수 없습니다.')
          })
      }
    },
    fileChangeCheck(e) {
      this.fileUpload(e.target.files[0])
    },
    handleChange(file, fileList) {
      this.fileUpload(file.raw)
    },
    fileUpload(file) {
      // limit
      if (this.fileList.length + 1 > this.limit) {
        this.$alertMsg(this.limit + '개 이하의 파일을 등록해주세요.')
        return
      }

      // check uploaded file size
      if (file.size + this.totalSize > this.maxSizeByte) {
        this.$alertMsg(this.maxSize + ' 이하의 파일을 등록해주세요.')
        return
      }

      // check uploaded file extension
      if (
        !new RegExp(
          '(' +
            this.fileExt
              .join('|')
              .toLocaleLowerCase()
              .replace(/\./g, '\\.') +
            ')$'
        ).test(file.name.toLocaleLowerCase())
      ) {
        this.$alertMsg(this.fileExtString + ' 형식의 파일만 등록해주세요.')
        return
      }

      this.fileList.push(file)
    },
    deleteFile(index) {
      this.fileList.splice(index, 1)
    },
    convertFileSizeStringToByte(value) {
      let num = value.replace(/[^0-9]/g, '')
      let byte = num

      if (value.toUpperCase().indexOf('MB')) {
        byte = num * 1024 * 1024
      } else if (value.toUpperCase().indexOf('KB')) {
        byte = num * 1024
      }

      return byte
    },
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    },
    closeConfirm() {
      this.loginConfirm = false
    }
  }
}
</script>
