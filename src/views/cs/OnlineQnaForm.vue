<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <breadcrumb :depth1MenuId="'M0400'" :depth2MenuId="'M0403'"/>
      <div class="top_title_area">
        <h2 class="h2_title">온라인 문의</h2>
      </div>
      <div class="tbl_top_area">
        <ul class="desc_list left" v-show="!member">
          <li>로그인 후 문의 내용을 작성하시면 답변 내용을 사이트에서도 확인할 수 있습니다.</li>
          <li>문의에 대한 답변은 입력하신 이메일로 회신드립니다.</li>
        </ul>
        <div class="btn_wrap right" v-show="!member">
          <a href="javascript:void(0);" class="btn sml bd_black type2" @click="goLogin">
            <span>로그인</span>
          </a>
        </div>
        <div class="btn_wrap right" v-show="member">
          <a href="javascript:void(0);" class="btn sml bd_black type2" @click="goQnaList">
            <span>문의내역</span>
          </a>
        </div>
      </div>
      <Online-Qna-Form-Info ref="Info" :from="from"></Online-Qna-Form-Info>
      <div class="agree_wrap mar_t60" v-show="!member">
        <h4>개인정보 수집 및 이용에 대한 안내</h4>
        <div class="box_agree">
          <div class="inner_agree">
            <p>문의 내용 접수 및 처리, 결과 회신을 위하여 최소한의 개인정보를 수집합니다.</p>
            <ul class="desc_list mar_t25">
              <li>수집항목 : 이름, 휴대폰번호, 이메일주소</li>
              <li>보유기간 : 문의 접수 후 3년</li>
            </ul>
          </div>
        </div>
        <div class="check_wrap">
          <span class="custom_checkbox">
            <input type="checkbox" name="Checkbox" id="Checkbox01" v-model="agreeCheck" ref="agreeCheck">
            <label for="Checkbox01">개인정보 수집 및 이용에 동의합니다.</label>
          </span>
        </div>
      </div>
      <div class="btn_wrap center mar_t40">
        <a href="javascript:void(0);" class="btn mid bd_blue" v-show="member" @click="goBack">
          <span>취소</span>
        </a>
        <a href="javascript:void(0);" class="btn mid blue" @click="inquiryValidation">
          <span>문의하기</span>
        </a>
      </div>
    </article>
  </div>
</template>

<script>
import { memberInquiry, noMemberInquiry } from '@/api/cs/onlineqna'
import OnlineQnaFormInfo from '@/views/cs/components/OnlineQnaFormInfo'
import Breadcrumb from '@/components/global/Breadcrumb'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  name: 'onlineqnaform',
  components: {
    OnlineQnaFormInfo,
    Breadcrumb
  },
  props: {
    from: { type: String, default: '' }
  },
  data() {
    return {
      // 회원 true, 비회원 flase
      member: true,
      agreeCheck: false
    }
  },
  created() {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
    // this.userId = this.$route.params.userId
    if (jglib.isEmpty(this.$store.state.user.userId)) {
      this.member = false
    }
  },
  mounted() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
    // onload 상태와 동일하다. DOM 이후에 조작할 경우 이곳에서 수행
  },
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
    // method를 바로 연결하면 tic 단위로 계속 실행되기 때문에, 값이 변경할 때만 수행되고,
    // cache로 남는 computed를 활용하는 것이 성능에 좋음
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 이벤트에 따라 실행하거나, 내부적으로 사용되는 함수들을 정의한다.
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
    goQnaList() {
      this.$router.push('/cs/qna')
    },
    inquiryValidation() {
      if (!this.$refs.Info.getInfoValidation()) {
        return
      }
      if (this.member === false && this.agreeCheck === false) {
        this.$alertMsg('개인정보 수집 및 이용 동의 후 문의 가능합니다.')
        this.$refs.agreeCheck.focus()
        return
      }
      this.saveOnlineQna()
    },
    saveOnlineQna() {
      let infoData = this.$refs.Info.getInfo()
      if (this.member === false) {
        let formData = new FormData()
        let params = {
          subject: infoData.subject,
          ctn: infoData.ctn,
          name: infoData.name,
          mblNum: infoData.mblNum,
          email: infoData.email,
          privYn: 'Y'
        }
        formData.append('data', JSON.stringify(params))
        if (!jglib.isEmpty(infoData.fileList)) {
          infoData.fileList.forEach(item => {
            formData.append('regFile', item)
          })
        }
        noMemberInquiry(formData)
          .then(res => {
            this.$alertMsg('온라인문의가 접수되었습니다. 답변내용은 입력하신 이메일로 보내드립니다.')
              .then(() => {
                this.$router.push('/')
              })
          })
          .catch(res => {
            this.$alertMsg(res.desc ? res.desc : '온라인문의는 60초 이내 재접수 할 수 없습니다.')
          })
      } else {
        let formData = new FormData()
        let params = {
          subject: infoData.subject,
          ctn: infoData.ctn,
          name: infoData.name,
          mblNum: infoData.mblNum,
          email: infoData.email,
          privYn: 'Y'
        }
        formData.append('data', JSON.stringify(params))
        if (!jglib.isEmpty(infoData.fileList)) {
          infoData.fileList.forEach(item => {
            formData.append('regFile', item)
          })
        }
        memberInquiry(formData)
          .then(res => {
            this.$alertMsg('온라인문의가 접수되었습니다. 답변내용은 입력하신 이메일로 보내드립니다.')
              .then(() => {
                this.$router.push('/cs/qna')
              })
          })
          .catch(res => {
            this.$alertMsg(res.desc ? res.desc : '온라인문의는 60초 이내 재접수 할 수 없습니다.')
          })
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
