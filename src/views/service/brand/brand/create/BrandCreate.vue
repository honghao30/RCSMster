<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'"/>
      <div class="top_title_area">
        <h2 class="h2_title" style="text-align:left;">브랜드 개설</h2>
      </div>
      <div class="bullet_area" style="padding-left:0; border-bottom:2px solid #666; padding-botom:20px;">
        <ul class="bullet_list fs16 mar_b20">
          <li>신청한 브랜드 정보는 운영자 심사를 거쳐 노출 여부가 결정되며 승인 결과는 문자메시지(SMS) 및 이메일로 알려드립니다.</li>
          <li>승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</li>
        </ul>
        <div class="bullet_btn_wrap btn_wrap right" style="margin-bottom:20px;">
          <GuideForPdf btnName="브랜드 가이드" popupName="brandGuide"></GuideForPdf>
          <a href="javascript:void(0);" @click="brandLoad = true" class="btn sml bd_black type2 mar_l12">브랜드 불러오기</a>
        </div>
      </div>
      <div class="rcs_bundle_wrap">
        <div class="rcs_emul_form_wrap type2">
          <div class="rcs_emul_form_cont bd_no">
            <emulator-step1 :brandInfoData="brandInfo"/>
            <brand-main-step1 ref="brandInfo" :loadBrandInfo="loadBrandInfo" @getTel="getTel" @changeBrandInfo="changeBrandinfo"/>
          </div>
          <div class="rcs_emul_form_cont bd_no mar_t80">
            <emulator-step2 :brandInfoData="brandInfo" :sendInfoData="sendInfo"/>
            <brand-main-step2 ref="sendInfo" :loadBrandInfo="loadBrandInfo" :tel="this.tel" @changeSendInfo="changeSendinfo"/>
          </div>
          <div class="rcs_emul_form_cont bd_no mar_t80">
            <brand-main-step3 ref="cateInfo" :loadBrandInfo="loadBrandInfo"/>
          </div>
          <div class="rcs_emul_form_cont bd_no mar_t80">
            <emulator-step4 :brandInfoData="brandInfo" :feedInfoData="feedInfo"/>
            <brand-main-step4 ref="feedInfo" :brandInfoData="brandInfo" @changeFeedInfo="changeFeedInfo"/>
          </div>
          <div class="rcs_emul_form_cont bd_no">
            <span class="custom_checkbox mar_t20 type02">
              <input type="checkbox" id="agree01" v-model="agreeCheckFlag">
              <label for="agree01">메시지 발송 시 free템플릿은 정보성에 한하여 이용 가능합니다. 규정위반 시 서비스 이용이 제한될 수 있습니다.</label>
            </span>
          </div>
          <div class="btn_wrap mar_t40 right">
            <span style="float:left; margin-left:400px;"><a href="javascript:void(0);" class="btn mid bd_blue" @click="cancel"><span>취소</span></a></span>
            <a href="javascript:void(0);" class="btn mid blue" @click="savevalidation"><span>저장</span></a>
            <a href="javascript:void(0);" class="btn mid black" @click="apply"><span>승인요청</span></a>
          </div>
        </div>
      </div>
    </article>
    <apply-confirm-popup v-if="visible" :visible.sync="visible" :msg="msg" @save="save" @apply="apply"/>
    <brand-info-selector v-if="brandLoad" :visible.sync="brandLoad" @setLoadBrandInfo="setLoadBrandInfo"/>
    <index v-if="ApplyMassRegFilePopupFlag" :uploadResult="uploadResult"/>
  </div>
</template>

<script>
import BrandMainStep1 from '@/views/service/brand/brand/create/BrandCreateStep1'
import BrandMainStep2 from '@/views/service/brand/brand/create/BrandCreateStep2'
import BrandMainStep3 from '@/views/service/brand/brand/create/BrandCreateStep3'
import BrandMainStep4 from '@/views/service/brand/brand/create/BrandCreateStep4'
import EmulatorStep1 from '@/views/service/brand/brand/emulator/EmulatorStep1'
import EmulatorStep2 from '@/views/service/brand/brand/emulator/EmulatorStep2'
import EmulatorStep4 from '@/views/service/brand/brand/emulator/EmulatorStep4'
import ApplyConfirmPopup from '@/components/popupSet/ApplyConfirmPopup'
import BrandInfoSelector from '@/components/popupSet/BrandInfoSelector'
import GuideForPdf from '@/views/service/components/GuideForPdf'
import Breadcrumb from '@/components/global/Breadcrumb'
import index from '@/components/excel'
import { createBrand } from '@/api/service/service'

export default {
  name: 'BrandMain',
  components: {
    BrandMainStep1,
    BrandMainStep2,
    BrandMainStep3,
    BrandMainStep4,
    EmulatorStep1,
    EmulatorStep2,
    EmulatorStep4,
    ApplyConfirmPopup,
    BrandInfoSelector,
    GuideForPdf,
    index,
    Breadcrumb
  },
  data() {
    return {
      tel: '',
      brandInfo: {},
      sendInfo: {},
      feedInfo: {},
      agreeCheckFlag: false,
      visible: false,
      brandGuide: false,
      brandLoad: false,
      msg: `저장은 작성하신 정보가 저장만 되는 기능입니다.<br>승인요청을 하셔야 심사 후 브랜드를 이용하실 수 있습니다.`,
      ApplyMassRegFilePopupFlag: false,
      uploadResult: {},
      massRegFileData: {},
      loadBrandInfo: {} // 브랜드 불러오기 데이터
    }
  },
  methods: {
    getTel(tel) {
      this.tel = tel
    },
    changeBrandinfo(data) {
      this.brandInfo = data
    },
    changeSendinfo(data) {
      this.sendInfo = data
    },
    changeFeedInfo(data) {
      this.feedInfo = data
    },
    cancel() {
      this.$confirmMsg(`브랜드 개설을 취소하시겠습니까?`)
        .then(() => {
          this.$router.push({ name: 'Dashboard' })
        })
    },
    savevalidation() {
      if (!this.$refs.brandInfo.validation()) {
        return
      }
      if (!this.$refs.sendInfo.validation()) {
        return
      }
      if (!this.$refs.cateInfo.validation()) {
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
      let cateInfoData = this.$refs.cateInfo.getCateInfo()
      let feedInfoData = this.$refs.feedInfo.getFeedInfo()

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

      let reqData = {
        corpId: this.$store.state.user.corpId,
        name: brandInfoData.name,
        email: brandInfoData.email,
        descr: brandInfoData.descr,
        bizCateGrp: cateInfoData.bizCateGrp,
        bizCateCd: cateInfoData.bizCateCd,
        cate3: cateInfoData.cate3,
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
        curTab: feedInfoData.curTab,
        initFeedItem: feedInfoData.initFeedItem,
        aprvRet: 'SAVED'
      }

      let formData = new FormData()
      formData.append('data', JSON.stringify(reqData))
      formData.append('bgImgFile', brandInfoData.bgImgFile)
      formData.append('profileImgFile', brandInfoData.profileImgFile)
      if (!jglib.isEmpty(sendInfoData.massRegFile)) {
        reqData.chatbotList = null
        formData.append('excelFile', sendInfoData.massRegFile)
      }
      formData.append('regCertiFile', sendInfoData.regCertiFile)

      if (!this.agreeCheckFlag) {
        this.$alertMsg('필수 동의를 확인해 주세요.')
        return
      }
      createBrand(formData)
        .then(() => {
          this.$router.push('/service/dashboard')
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    apply() {
      if (!this.$refs.brandInfo.validation()) {
        return
      }
      if (!this.$refs.sendInfo.validation()) {
        return
      }
      if (!this.$refs.cateInfo.validation()) {
        return
      }
      if (!this.agreeCheckFlag) {
        this.$alertMsg('정보성 메시지 발송에 동의해 주세요.')
        return
      }
      let brandInfoData = this.$refs.brandInfo.getBrandInfo()
      let sendInfoData = this.$refs.sendInfo.getSendInfo()
      let cateInfoData = this.$refs.cateInfo.getCateInfo()
      let feedInfoData = this.$refs.feedInfo.getFeedInfo()
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

      let reqData = {
        corpId: this.$store.state.user.corpId,
        name: brandInfoData.name,
        email: brandInfoData.email,
        descr: brandInfoData.descr,
        bizCateGrp: cateInfoData.bizCateGrp,
        bizCateCd: cateInfoData.bizCateCd,
        cate3: cateInfoData.cate3,
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
        curTab: feedInfoData.curTab,
        initFeedItem: feedInfoData.initFeedItem,
        aprvRet: 'WAITING'
      }
      let formData = new FormData()
      formData.append('data', JSON.stringify(reqData))
      formData.append('bgImgFile', brandInfoData.bgImgFile)
      formData.append('profileImgFile', brandInfoData.profileImgFile)
      if (!jglib.isEmpty(sendInfoData.massRegFile)) {
        formData.append('excelFile', sendInfoData.massRegFile)
      }
      formData.append('regCertiFile', sendInfoData.regCertiFile)

      // 승인요청 API (승인요청시에는 aprvRet값 코드 ''로 넣어서 호출)
      this.$confirmMsg(`운영자 승인이 완료되면 브랜드를 사용할 수 있습니다.<br>입력하신 정보로 브랜드를 개설하시겠습니까?`)
        .then(() => {
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
