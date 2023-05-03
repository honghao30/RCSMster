<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'"/>
      <div class="top_title_area">
        <h2 class="h2_title">브랜드 개설</h2>
      </div>
      <div class="bullet_area">
        <ul class="bullet_list fs18 mar_b20">
          <li>신청한 브랜드 정보는 운영자 심사를 거쳐 노출 여부가 결정되며 승인 결과는 문자메시지(SMS) 및 <br>이메일로 알려드립니다.</li>
          <li>승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</li>
        </ul>
        <div class="bullet_btn_wrap btn_wrap right"><a href="javascript:void(0);" @click="brandLoad = true" class="btn sml bd_black type2">브랜드 불러오기</a></div>
      </div>
      <div class="rcs_bundle_wrap">
        <div class="rcs_emul_form_wrap">
          <!-- 브랜드 개설 > 브랜드 정보 입력 Component -->
          <create-brand-info ref="brandInfo" :loadBrandInfo="loadBrandInfo" @getTel="getTel" @changeBrandInfo="changeBrandinfo"/>
          <div class="title_area">
            <h3 class="h3_title">대화방 관리</h3>
          </div>
          <create-brand-send ref="sendInfo" :loadBrandInfo="loadBrandInfo" :tel="this.tel"/>
          <span class="custom_checkbox mar_t20">
            <input type="checkbox" v-model="agreeCheckFlag" id="agree01">
            <label for="agree01">메시지 발송 시 기본(free)템플릿은 정보성에 한하여 이용 가능합니다. 규정위반 시 서비스 이용이 제한될 수 있습니다.</label>
          </span>
          <div class="btn_wrap mar_t40 center full_width">
            <a href="javascript:void(0);" class="btn mid bd_blue" @click="cancel">취소</a>
            <!-- <a href="javascript:void(0);" class="btn mid blue" @click="save">저장</a> -->
            <a href="javascript:void(0);" class="btn mid blue" @click="savevalidation">저장</a>
            <a href="javascript:void(0);" class="btn mid black" @click="apply">승인요청</a>
          </div>
        </div>
        <!-- 스크롤시 고정-->
        <create-brand-viewer :brandInfoData="this.brandInfo"/>
        <apply-confirm-popup v-if="visible" :visible.sync="visible" :msg="msg" @save="save" @apply="apply"/>
        <brand-info-selector v-if="brandLoad" :visible.sync="brandLoad" @setLoadBrandInfo="setLoadBrandInfo"/>
        <index v-if="ApplyMassRegFilePopupFlag" :uploadResult="uploadResult"/>
      </div>
    </article>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import CreateBrandInfo from '@/views/service/components/CreateBrandInfo'
import CreateBrandViewer from '@/views/service/components/CreateBrandViewer'
import CreateBrandSend from '@/views/service/components/CreateBrandSend'
import index from '@/components/excel/index'
import ApplyConfirmPopup from '@/components/popupSet/ApplyConfirmPopup'
import BrandInfoSelector from '@/components/popupSet/BrandInfoSelector'
import { createBrand } from '@/api/service/service'
import Breadcrumb from '@/components/global/Breadcrumb'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  components: {
    CreateBrandInfo,
    CreateBrandViewer,
    CreateBrandSend,
    ApplyConfirmPopup,
    BrandInfoSelector,
    index,
    Breadcrumb
  },
  data() {
    return {
      tel: '',
      brandInfo: {},
      agreeCheckFlag: false,
      visible: false,
      brandLoad: false,
      msg: `저장은 작성하신 정보가 저장만 되는 기능입니다.<br>승인요청을 하셔야 심사 후 브랜드를 이용하실 수 있습니다.`,
      ApplyMassRegFilePopupFlag: false,
      uploadResult: {},
      massRegFileData: {},
      loadBrandInfo: {} // 브랜드 불러오기 데이터
    }
  },
  created() {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
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
    getTel(tel) {
      this.tel = tel
    },
    changeBrandinfo(data) {
      this.brandInfo = data
    },
    cancel() {
      this.$confirmMsg(`브랜드 개설을 취소하시겠습니까?`)
        .then(res => {
          this.$router.push('/service/dashboard')
        })
        .catch(e => {
          this.$alertMsg(e.desc)
        })
    },
    savevalidation() {
      if (!this.$refs.brandInfo.validation()) {
        return
      }
      if (!this.$refs.sendInfo.validation()) {
        return
      }
      if (!this.agreeCheckFlag) {
        this.$alertMsg('정보성 메시지 발송에 동의해 주세요.')
        return
      }
      this.visible = true
    },
    save() {
      let brandInfoData = this.$refs.brandInfo.getBrandInfo()
      let sendInfoData = this.$refs.sendInfo.getSendInfo()

      // 메뉴 버튼 설정 체크 된 것만 넘기도록 설정
      let menuItemListData = []
      menuItemListData = brandInfoData.menuItemList.filter(res => {
        return res.visible
      })

      let menuItemList = []
      menuItemListData.forEach(res => {
        if (res.code === 'APP') {
          menuItemList.push({
            menuItemId: res.code.toLowerCase(),
            webLink: res.values[0].value,
            appPkgNm: res.values[1].value,
            appAct: res.values[2].value,
            appUri: res.values[3].value
          })
        } else if (res.code === 'Ticket') {
          menuItemList.push({
            menuItemId: 'tickets',
            webLink: res.values[0].value
          })
        } else {
          menuItemList.push({
            menuItemId: res.code.toLowerCase(),
            webLink: res.values[0].value
          })
        }
      })

      let formData = new FormData()

      let reqData = {
        corpId: this.$store.state.user.corpId,
        name: brandInfoData.name,
        email: brandInfoData.email,
        descr: brandInfoData.descr,
        bizCateGrp: brandInfoData.bizCateGrp,
        bizCateCd: brandInfoData.bizCateCd,
        cate3: brandInfoData.cate3,
        tel: brandInfoData.tel,
        menuItemList: menuItemList,
        url: brandInfoData.url,
        addrRegnNo: brandInfoData.addrRegnNo,
        addrMngNo: brandInfoData.addrMngNo,
        addrDtl: brandInfoData.addrDtl,
        mdn: sendInfoData.mdn,
        subTitle: sendInfoData.subTitle,
        rcsReply: sendInfoData.rcsReply,
        chatbotList: sendInfoData.chatbotList,
        bgImgFileId: brandInfoData.bgImgFileId,
        bgImgFileNo: brandInfoData.bgImgFileNo,
        profileImgFileId: brandInfoData.profileImgFileId,
        profileImgFileNo: brandInfoData.profileImgFileNo,
        aprvRet: 'SAVED'
      }
      formData.append('data', JSON.stringify(reqData))
      formData.append('bgImgFile', brandInfoData.bgImgFile)
      formData.append('profileImgFile', brandInfoData.profileImgFile)
      if (!jglib.isEmpty(sendInfoData.massRegFile)) {
        formData.append('excelFile', sendInfoData.massRegFile)
      }
      formData.append('regCertiFile', sendInfoData.regCertiFile)

      if (!this.agreeCheckFlag) {
        this.$alertMsg('필수 동의를 확인해 주세요.')
        return
      }
      createBrand(formData)
        .then(res => {
          this.$router.push('/service/dashboard')
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    apply() {
      let brandInfoData = this.$refs.brandInfo.getBrandInfo()
      let sendInfoData = this.$refs.sendInfo.getSendInfo()
      if (!this.$refs.brandInfo.validation()) {
        return
      }
      if (!this.$refs.sendInfo.validation()) {
        return
      }
      if (!this.agreeCheckFlag) {
        this.$alertMsg('정보성 메시지 발송에 동의해 주세요.')
        return
      }

      let menuItemListData = []
      menuItemListData = brandInfoData.menuItemList.filter(res => {
        return res.visible
      })
      let menuItemList = []
      menuItemListData.forEach(res => {
        if (res.code === 'APP') {
          menuItemList.push({
            menuItemId: res.code.toLowerCase(),
            webLink: res.values[0].value,
            appPkgNm: res.values[1].value,
            appAct: res.values[2].value,
            appUri: res.values[3].value
          })
        } else if (res.code === 'Ticket') {
          menuItemList.push({
            menuItemId: 'tickets',
            webLink: res.values[0].value
          })
        } else {
          menuItemList.push({
            menuItemId: res.code.toLowerCase(),
            webLink: res.values[0].value
          })
        }
      })

      let formData = new FormData()

      let reqData = {
        corpId: this.$store.state.user.corpId,
        name: brandInfoData.name,
        email: brandInfoData.email,
        descr: brandInfoData.descr,
        bizCateGrp: brandInfoData.bizCateGrp,
        bizCateCd: brandInfoData.bizCateCd,
        cate3: brandInfoData.cate3,
        tel: brandInfoData.tel,
        menuItemList: menuItemList,
        url: brandInfoData.url,
        addrRegnNo: brandInfoData.addrRegnNo,
        addrMngNo: brandInfoData.addrMngNo,
        addrDtl: brandInfoData.addrDtl,
        mdn: sendInfoData.mdn,
        subTitle: sendInfoData.subTitle,
        rcsReply: sendInfoData.rcsReply,
        chatbotList: sendInfoData.chatbotList,
        bgImgFileId: brandInfoData.bgImgFileId,
        bgImgFileNo: brandInfoData.bgImgFileNo,
        profileImgFileId: brandInfoData.profileImgFileId,
        profileImgFileNo: brandInfoData.profileImgFileNo,
        aprvRet: 'WAITING'
      }
      formData.append('data', JSON.stringify(reqData))
      formData.append('bgImgFile', brandInfoData.bgImgFile)
      formData.append('profileImgFile', brandInfoData.profileImgFile)
      if (!jglib.isEmpty(sendInfoData.massRegFile)) {
        formData.append('excelFile', sendInfoData.massRegFile)
      }
      formData.append('regCertiFile', sendInfoData.regCertiFile)

      // 승인요청 API (승인요청시에는 aprvRet값 코드 ''로 넣어서 호출)
      this.$confirmMsg(`운영자 승인이 완료되면 브랜드를 사용할 수 있습니다.<br>입력하신 정보로 브랜드를 개설하시겠습니까?`)
        .then(res => {
          createBrand(formData)
            .then(res => {
              if (!jglib.isEmpty(sendInfoData.massRegFile)) {
                this.massRegFileData = res.result
                this.ApplyMassRegFilePopup()
              } else {
                this.$router.push('/service/dashboard')
              }
            })
            .catch(e => {
              this.$alertMsg(e.desc)
            })
        })
    },
    ApplyMassRegFilePopup() {
      let sendInfoData = this.$refs.sendInfo.getSendInfo()
      if (!jglib.isEmpty(sendInfoData.massRegFile)) {
        this.ApplyMassRegFilePopupFlag = true
        this.uploadResult = this.massRegFileData
      }
    },
    setLoadBrandInfo(brandInfo) {
      this.loadBrandInfo = brandInfo
      this.agreeCheckFlag = false
    }
  }
}
</script>
