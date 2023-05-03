<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'브랜드 관리'"/>
      </div>
      <brand-top active="brand" :brandId="brandId"/>
      <div class="dashboard_wrap">
        <section class="section">
          <div class="title_area inline">
            <h3 class="h3_title" v-if="activeOk">승인완료</h3>
            <h3 class="h3_title" v-else>{{ getDisplayAprvNm(this.getApprovalBrandList) }}</h3>
            <ul class="bullet_list fs18 mar_b30"><li>승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</li></ul>
          </div>
          <span class="h3_desc mar_b16" v-if="activeOk" style="margin-top:-30px">
            ※ 브랜드 명 / 프로필 이미지를 수정하실 경우
            <strong>운영자의 승인완료 후 정보가 변경됩니다.</strong>
          </span>
          <div class="bullet_btn_wrap btn_wrap right" :style="activeOk ? 'margin-top: -55px;' : 'margin-top: -40px;'">
            <GuideForPdf btnName="브랜드 가이드" popupName="brandGuide"></GuideForPdf>
          </div>
          <div class="rcs_bundle_wrap">
            <div class="rcs_emul_form_wrap type2">
              <div class="rcs_emul_form_cont bd_no">
                <emulator-step1 :brandInfoData="viewerData"/>
                <brand-approval-step1 ref="brandInfo" @getTel="getTel" @viewerDataInfo="viewerDataInfo" :brandId="brandId" :RESPONSE="RESPONSE" v-if="RESPONSE != null"/>
              </div>
              <div class="rcs_emul_form_cont bd_no mar_t50">
                <emulator-step2 :brandInfoData="viewerData" :sendInfoData="sendInfo"/>
                <brand-approval-step2 ref="sendInfo" :tel="tel" @changeSendInfo="changeSendinfo" :brandId="brandId" :RESPONSE="RESPONSE" v-if="RESPONSE != null"/>
              </div>
              <div class="rcs_emul_form_cont bd_no" :class="isActive ? 'no_content_mar_t' : 'mar_t50'">
                <brand-approval-step3 ref="cateInfo" :RESPONSE="RESPONSE" v-if="RESPONSE != null"/>
              </div>
              <div class="rcs_emul_form_cont bd_no" :class="isActive ? 'mar_t150' : 'mar_t50'">
                <emulator-step4 :brandInfoData="viewerData" :feedInfoData="feedInfo" style="margin-top: 40px"/>
                <brand-approval-step4 ref="feedInfo" :RESPONSE="RESPONSE" @changeFeedInfo="changeFeedInfo" v-if="RESPONSE != null"/>
              </div>
              <div class="rcs_emul_form_cont bd_no mar_t50" v-show="result">
                <div class="rcs_emul_form_step">
                  <h3 class="h3_title fs20 mar_b10 mar_t40">승인결과</h3>
                  <div class="rcs_item_bundle extra_bd_t" style="padding-top:6px !important;">
                    <strong class="rcs_tit_bundle extra_bd_t">{{ getApprovalBrandList.aprvDt }}</strong>
                    <div class="rcs_cont_bundle">
                      <span>{{ getApprovalBrandList.aprvDt }}</span>
                      <span class="mar_l20">{{ getApprovalBrandList.mstStatus === 'ACTIVE' ? '승인완료' : getApprovalBrandList.aprvRetDescr }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn_wrap" style="text-align:right;" :class="isActive ? 'mar_t220' : 'mar_t40'" v-show="waiting">
                <a href="javascript:void(0);" class="btn mid bd_black" @click="goDashboard" style="margin-left:400px;float:left;">대시보드로 이동</a>
              </div>
              <div class="btn_wrap mar_t40" style="text-align:right;" v-show="rejected">
                <a href="javascript:void(0);" class="btn mid bd_black" @click="goDashboard"  style="margin-left:400px;float:left;">대시보드로 이동</a>
                <a href="javascript:void(0);" class="btn mid black" v-if="corpAdmYnDelete  && userCd === 'CORPY'" @click="deleteApprovalBrandClick ">삭제</a>
                <a href="javascript:void(0);" class="btn mid blue" @click="saveValidation" v-if="userCd !== 'AGENCY'">저장</a>
                <a href="javascript:void(0);" class="btn mid blue" @click="apply" v-if="userCd !== 'AGENCY'">승인요청</a>
              </div>
              <div class="btn_wrap mar_t40" style="text-align:right;" v-show="ok">
                <a href="javascript:void(0);" class="btn mid bd_blue" @click="goDashboard" style="margin-left:400px;float:left;"><span>대시보드로 이동</span></a>
                <a href="javascript:void(0);" class="btn mid bd_blue"
                  v-if="corpAdmYnDelete && (this.getApprovalBrandList.admYn === 'Y' && userCd !== 'AGENCY')" @click="deleteApprovalBrandClick"><span>삭제</span></a>
                <a href="javascript:void(0);" class="btn mid blue" @click="apply" v-if="userCd !== 'AGENCY'"><span>승인요청</span></a>
              </div>
              <Approval-Brand-Delete-Certification-Popup :corpIdData="corpIdData" v-if="visibleDelete" :visibleDelete.sync="visibleDelete" @turnvisible="turnvisible"/>
              <apply-confirm-popup v-if="visible" :visible.sync="visible" :msg="msg" @save="save" @apply="apply"/>
            </div>
          </div>
        </section>
      </div>
    </article>
    <index v-if="ApplyMassRegFilePopupFlag" :uploadResult="uploadResult"/>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import BrandApprovalStep1 from '@/views/service/brand/brand/approval/BrandApprovalStep1'
import BrandApprovalStep2 from '@/views/service/brand/brand/approval/BrandApprovalStep2'
import BrandApprovalStep3 from '@/views/service/brand/brand/approval/BrandApprovalStep3'
import BrandApprovalStep4 from '@/views/service/brand/brand/approval/BrandApprovalStep4'
import EmulatorStep1 from '@/views/service/brand/brand/emulator/EmulatorStep1'
import EmulatorStep2 from '@/views/service/brand/brand/emulator/EmulatorStep2'
import EmulatorStep4 from '@/views/service/brand/brand/emulator/EmulatorStep4'
import GuideForPdf from '@/views/service/components/GuideForPdf'
import index from '@/components/excel'

import store from '@/store'
import { getUserInfo } from '@/api/service/service'
import ApprovalBrandDeleteCertificationPopup from '@/views/service/components/ApprovalBrandDeleteCertificationPopup'
import Breadcrumb from '@/components/global/Breadcrumb'
import ApplyConfirmPopup from '@/components/popupSet/ApplyConfirmPopup'
import { getDisplayAprvNm } from '@/utils/string'
import {
  getApprovalBrand,
  deleteApprovalBrand,
  applyBrand,
  getCheckTplYnChatbotYn
} from '@/api/service/approvalBrand'

export default {
  name: 'BrandMain',
  components: {
    BrandTop,
    BrandApprovalStep1,
    BrandApprovalStep2,
    BrandApprovalStep3,
    BrandApprovalStep4,
    EmulatorStep1,
    EmulatorStep2,
    EmulatorStep4,
    GuideForPdf,
    ApprovalBrandDeleteCertificationPopup,
    Breadcrumb,
    ApplyConfirmPopup,
    index
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isSaveOrApply) { // 저장, 승인버튼을 눌렀으면 체크 안함.
      let brandInfoData = this.$refs.brandInfo.getBrandInfo()
      let sendInfoData = this.$refs.sendInfo.getSendInfo()
      let cateInfoData = this.$refs.cateInfo.getCateInfo()
      let feedInfoData = this.$refs.feedInfo.getFeedInfo()

      let menuItemListData = []
      menuItemListData = brandInfoData.menuItemList.filter(res => {
        return res.visible
      })

      let getNowMenuItemList = []
      for (let i = 0; i < menuItemListData.length; i++) {
        if (menuItemListData[i].menuItemNm === 'App') {
          getNowMenuItemList.push({
            menuItemId: menuItemListData[i].menuItemId.toLowerCase(),
            webLink: menuItemListData[i].values[0].value,
            appPkgNm: menuItemListData[i].values[1].value,
            appAct: menuItemListData[i].values[2].value,
            appUri: menuItemListData[i].values[3].value
          })
        } else if (menuItemListData[i].menuItemNm === 'Chat') {
          getNowMenuItemList.push({
            menuItemId: menuItemListData[i].menuItemId.toLowerCase(),
            webLink: ''
          })
        } else {
          getNowMenuItemList.push({
            menuItemId: menuItemListData[i].menuItemId.toLowerCase(),
            webLink: (menuItemListData[i].values[0].value ? menuItemListData[i].values[0].value : '')
          })
        }
      }

      let newSaveMenuItemList = []
      for (let data of this.saveApprovalBrandList.menuItemList) {
        let newObj = {}
        newObj.menuItemId = data.menuItemId
        if (data.webLink) {
          newObj.webLink = data.webLink
        } else {
          newObj.webLink = ''
        }
        newSaveMenuItemList.push(newObj)
      }

      // console.log('newSaveMenuItemList', newSaveMenuItemList)
      // console.log('getNowMenuItemList', getNowMenuItemList)

      let reqData = {
        corpId: this.saveApprovalBrandList.corpId,
        brandId: this.brandId,
        brandKey: this.saveApprovalBrandList.brandKey,
        name: brandInfoData.name,
        descr: brandInfoData.descr,
        bizCateGrp: cateInfoData.bizCateGrp,
        bizCateCd: cateInfoData.bizCateCd,
        cate3: cateInfoData.cate3,
        tel: brandInfoData.tel,
        url: brandInfoData.url,
        curTab: feedInfoData.curTab,
        initFeedItem: feedInfoData.initFeedItem,
        email: brandInfoData.email,
        addrRegnNo: brandInfoData.addrRegnNo,
        addrMngNo: brandInfoData.addrMngNo,
        addrDtl: brandInfoData.addrDtl,
        subTitle: sendInfoData.subTitle,
        profileImgFileId: brandInfoData.profileImgFileId,
        bgImgFileId: brandInfoData.bgImgFileId
      }

      // console.log('reqData', reqData)
      // console.log('this.saveApprovalBrandList', this.saveApprovalBrandList)

      let isDifferent = false // true면 변경점이 있다는 말.

      // 퀵버튼 개수 비교
      if (getNowMenuItemList.length !== newSaveMenuItemList.length) {
        isDifferent = true
      }

      // 데이터 수정여부 확인
      if (!isDifferent) {
        for (let data in reqData) {
          if (reqData[data]) {
            if (this.saveApprovalBrandList[data] !== reqData[data]) {
              // console.log(`다른부분 발견 \n${data} \nthis.saveApprovalBrandList:, ${this.saveApprovalBrandList[data]} \nreqData:, ${reqData[data]}`)
              isDifferent = true
              break
            }
          }
        }
      }

      // 퀵버튼 수정여부 확인
      if (!isDifferent) {
        let sortByMenuItemId = function (a, b) {
          if (a.menuItemId > b.menuItemId) {
            return 1
          } else if (a.menuItemId < b.menuItemId) {
            return -1
          } else {
            return 0
          }
        }
        getNowMenuItemList = getNowMenuItemList.sort(sortByMenuItemId)
        newSaveMenuItemList = newSaveMenuItemList.sort(sortByMenuItemId)

        // console.log('after sort getNowMenuItemList', getNowMenuItemList)
        // console.log('after sort newSaveMenuItemList', newSaveMenuItemList)

        for (let index in getNowMenuItemList) {
          if ((getNowMenuItemList[index].menuItemId !== newSaveMenuItemList[index].menuItemId) ||
            (getNowMenuItemList[index].webLink !== newSaveMenuItemList[index].webLink)) {
            // console.log(`다른부분 발견 \n${index} \nbrandInfoData[index].menuItemId:, ${getNowMenuItemList[index].menuItemId} \nthis.getApprovalBrandList.newSaveMenuItemList[index]:, ${newSaveMenuItemList[index].menuItemId}`)
            // console.log(`다른부분 발견 \n${index} \nbrandInfoData[index].webLink:, ${getNowMenuItemList[index].webLink} \nthis.getApprovalBrandList.newSaveMenuItemList[index]:, ${newSaveMenuItemList[index].webLink}`)
            isDifferent = true
            break
          }
        }
      }

      // console.log('diff', isDifferent)
      if (isDifferent) {
        this.$confirmMsg('페이지를 이동하면 작성중인 내용이 취소됩니다. \n이동하시겠습니까?', '', '확인', '취소').then(() => {
          next()
        })
      } else {
        next()
      }
    } else {
      next()
    }
  },
  data() {
    return {
      RESPONSE: null,
      isActive: false, // 최초 승인 여부
      activeOk: false, // 현재 승인 여부

      // 승인상태값
      waiting: false,
      ok: false,
      rejected: false,
      result: false,

      tel: '',
      corpAdmYn: '',
      corpAdmYnDelete: false,
      defMdn: '',
      brandId: '',
      corpId: '',
      name: '',
      regCertiFileName: '',
      brandOperYn: '',
      tplYn: '',
      chatbotYn: '',
      agencyYn: '',
      chatbotTwowayYn: '',
      autoReplyMsgYn: '',
      getApprovalBrandList: [],
      saveApprovalBrandList: [],
      viewerData: {},
      sendInfo: {},
      feedInfo: {},
      visibleDelete: false,
      visible: false,
      mstProfileImgFileId: '',
      userCd: '',
      msg: `저장은 작성하신 정보가 저장만 되는 기능입니다.<br>승인요청을 하셔야 심사 후 브랜드를 이용하실 수 있습니다.`,
      popupObj: {
        visible: false,
        excelUploadResult: {
          totalCount: '', // 총갯수
          successCount: '', // 등록갯수
          etcFailCount: '', // 유효하지 않은 번호
          dupFailCount: '', // 중복된 번호
          duplicateCount: '', // 이미 등록된 번호
          list: []
        }
      },
      isSaveOrApply: false,
      ApplyMassRegFilePopupFlag: false,
      uploadResult: {}
    }
  },
  computed: {
    brandIdData() {
      return this.brandId
    },
    corpIdData() {
      return this.corpId
    }
  },
  created() {
    this.userCd = this.$store.state.user.userCd
    this.brandId = this.$route.params.brandId
    let params = { brandId: this.brandId }

    getApprovalBrand(params)
      .then(res => {
        this.RESPONSE = res
        this.getApprovalBrandList = res.result
        this.isActive = this.getApprovalBrandList.mstStatus === 'ACTIVE' && this.getApprovalBrandList.mstAprvRet === 'OK'
        this.activeOk = this.getApprovalBrandList.mstStatus === 'ACTIVE' && this.getApprovalBrandList.mstAprvRet === 'OK' && this.getApprovalBrandList.aprvRet === 'OK'
        this.regCertiFileName = this.getApprovalBrandList.regCertiFileName
        this.corpId = this.getApprovalBrandList.corpId
        this.name = this.getApprovalBrandList.mstName
        this.tel = this.getApprovalBrandList.tel
        this.mstProfileImgFileId = this.getApprovalBrandList.mstProfileImgFileId
        if (this.getApprovalBrandList.aprvRet === 'WAITING' || this.getApprovalBrandList.aprvRet === 'INSPECTED' || this.getApprovalBrandList.aprvRet === 'INSPECTING') {
          this.waiting = true
        } else if (this.getApprovalBrandList.mstAprvRet === 'OK') {
          this.ok = true
        } else if (this.getApprovalBrandList.aprvRet === 'REJECTED' || this.getApprovalBrandList.aprvRet === 'SAVED') {
          this.rejected = true
        }
        if (this.getApprovalBrandList.aprvRet === 'REJECTED' || this.getApprovalBrandList.aprvRet === 'OK') {
          this.result = true
        }

        this.saveApprovalBrandList = _.cloneDeep(this.getApprovalBrandList) // 현재 정보 저장

        let reqData = {
          userType: store.state.user.userType,
          corpId: store.state.user.corpId
        }
        getUserInfo(reqData).then(res => {
          this.corpId = res.result.corpId
          this.brandOperYn = res.result.brandOperYn
        })
        store.dispatch('SetUserInfo').then(res => {
          if (res.result.corpAdmYn === 'Y') {
            this.corpAdmYnDelete = true
          }
        })
      })
      .catch(err => {
        this.$alertMsg(err.desc)
        if (err.code === '60000702') {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
      })
  },
  mounted() {},
  methods: {
    getDisplayAprvNm,
    changeSendinfo(data) {
      this.sendInfo = data
    },
    changeFeedInfo(data) {
      this.feedInfo = data
    },
    getTel(tel) {
      this.tel = tel
    },
    viewerDataInfo(viewerData) {
      this.viewerData = viewerData
    },
    deleteApprovalBrandClick() {
      if (this.ok === true) {
        if (this.brandOperYn === 'Y') {
          this.visibleDelete = true
        }
      } else if (this.rejected === true) {
        this.checkTplYnChatbotYn()
      }
    },
    turnvisible(visibleDelete) {
      if (visibleDelete.ok === 'Y') {
        this.visibleDelete = false
        this.checkTplYnChatbotYn()
      } else {
        this.visibleDelete = false
      }
    },

    // 템플릿 있는 경우 삭제 알럿
    checkTplYnChatbotYn() {
      let params = { brandId: this.brandId }
      getCheckTplYnChatbotYn(params)
        .then(res => {
          this.tplYn = res.result.tplYn
          this.chatbotYn = res.result.chatbotYn
          this.agencyYn = res.result.agencyYn
          this.chatbotTwowayYn = res.result.chatbotTwowayYn
          this.autoReplyMsgYn = res.result.autoReplyMsgYn
          if (this.agencyYn === 'Y') {
            this.$alertMsg('브랜드에 계약된 대행사가 존재합니다. 대행사 계약 해지 후 브랜드를 삭제할 수 있습니다.', '타이틀', '확인', '취소')
          } else if (this.tplYn === 'Y') {
            this.$alertMsg('브랜드에 등록된 템플릿이 존재합니다. 템플릿 관리 탭에서 모든 목록을 삭제한 후 브랜드를 삭제할 수 있습니다.', '타이틀', '확인', '취소')
          } else if (this.chatbotYn === 'Y') {
            this.$alertMsg('브랜드에 등록된 발신번호가 존재합니다. 발신번호 관리 탭에서 모든 목록을 삭제한 후 브랜드를 삭제할 수 있습니다.', '타이틀', '확인', '취소')
          } else if (this.chatbotTwowayYn === 'Y') {
            this.$alertMsg('브랜드에 등록된 양방향대화방이 존재합니다. 양방향대화방 관리 탭에서 모든 목록을 삭제한 후 브랜드를 삭제할 수 있습니다.', '타이틀', '확인', '취소')
          } else if (this.autoReplyMsgYn === 'Y') {
            this.$alertMsg('브랜드에 등록된 자동응답이 존재합니다. 자동응답 관리 탭에서 모든 목록을 삭제한 후 브랜드를 삭제할 수 있습니다.', '타이틀', '확인', '취소')
          } else {
            this.checkAllBrandDelete()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 브랜드 정보 삭제 알럿
    checkAllBrandDelete() {
      this.$confirmMsg('브랜드 정보를 모두 삭제 하시겠습니까?', '타이틀', '확인', '취소')
        .then(() => {
          let reqData = {
            brandId: this.brandId
          }
          deleteApprovalBrand(reqData)
            .then(() => {
              this.$router.push('/service/dashboard')
            })
            .catch(err => {
              this.$alertMsg(err.desc)
            })
        })
    },
    goDashboard() {
      this.$router.push('/service/dashboard')
    },
    apply() {
      let brandInfoData = this.$refs.brandInfo.getBrandInfo()
      let sendInfoData = this.$refs.sendInfo.getSendInfo()
      let cateInfoData = this.$refs.cateInfo.getCateInfo()
      let feedInfoData = this.$refs.feedInfo.getFeedInfo()

      if (!this.$refs.brandInfo.validation()) {
        return
      }
      if (!this.$refs.sendInfo.validation()) {
        return
      }
      if (!this.$refs.cateInfo.validation()) {
        return
      }

      let menuItemListData = []
      menuItemListData = brandInfoData.menuItemList.filter(res => {
        return res.visible
      })
      let getmenuItemList = []
      for (let i = 0; i < menuItemListData.length; i++) {
        if (menuItemListData[i].menuItemNm === 'App') {
          getmenuItemList.push({
            menuItemId: menuItemListData[i].menuItemId.toLowerCase(),
            webLink: menuItemListData[i].values[0].value,
            appPkgNm: menuItemListData[i].values[1].value,
            appAct: menuItemListData[i].values[2].value,
            appUri: menuItemListData[i].values[3].value
          })
        } else if (menuItemListData[i].menuItemNm === 'Chat') {
          getmenuItemList.push({
            menuItemId: menuItemListData[i].menuItemId.toLowerCase(),
            webLink: ''
          })
        } else {
          getmenuItemList.push({
            menuItemId: menuItemListData[i].menuItemId.toLowerCase(),
            webLink: menuItemListData[i].values[0].value
          })
        }
      }
      // 비승인 수정
      if (this.ok && this.name === brandInfoData.name && jglib.isEmpty(brandInfoData.profileImgFile) && this.mstProfileImgFileId === brandInfoData.profileImgFileId) {
        this.$confirmMsg('수정하시겠습니까?', '타이틀', '확인', '취소')
          .then(() => {
            this.isSaveOrApply = true
            let formData = new FormData()
            let reqData = {
              corpId: this.getApprovalBrandList.corpId,
              brandId: this.brandId,
              brandKey: this.getApprovalBrandList.brandKey,
              name: brandInfoData.name,
              descr: brandInfoData.descr,
              bizCateGrp: cateInfoData.bizCateGrp,
              bizCateCd: cateInfoData.bizCateCd,
              cate3: cateInfoData.cate3,
              tel: brandInfoData.tel,
              menuItemList: getmenuItemList,
              url: brandInfoData.url,
              email: brandInfoData.email,
              addrRegnNo: brandInfoData.addrRegnNo,
              addrMngNo: brandInfoData.addrMngNo,
              addrDtl: brandInfoData.addrDtl,
              mdn: sendInfoData.mdn,
              subTitle: sendInfoData.subTitle,
              chatbotList: sendInfoData.chatbotList,
              regCertiFileIdOld: sendInfoData.regCertiFileIdOld, // 통신사실가입증명원 수정 불가
              excelFileId: sendInfoData.massRegFileId, // 발신번호 대량 등록 수정 불가
              profileImgFileId: brandInfoData.profileImgFileId, // 프로필 이미지 수정 없음
              aprvYn: 'G',
              aprvRet: 'OK'
            }
            if (!jglib.isEmpty(brandInfoData.bgImgFile)) {
              formData.append('bgImgFile', brandInfoData.bgImgFile)
            } else {
              reqData.bgImgFileIdOld = brandInfoData.bgImgFileId
            }
            formData.append('data', JSON.stringify(reqData))

            // 승인요청 API (승인요청시에는 aprvRet값 코드 ''로 넣어서 호출)
            applyBrand(formData)
              .then(res => {
                this.$router.push('/service/dashboard')
              })
              .catch(err => {
                this.$alertMsg(err.desc)
              })
          })
      } else if (this.ok && (this.name !== brandInfoData.name || (!jglib.isEmpty(brandInfoData.profileImgFile) || this.mstProfileImgFileId !== brandInfoData.profileImgFileId))) {
        // 승인이 필요한 수정
        this.$confirmMsg('브랜드명, 프로필 이미지 수정시 <br> 운영자의 승인완료 후 반영됩니다. <br> 수정하시겠습니까?', '타이틀', '확인', '취소')
          .then(() => {
            this.isSaveOrApply = true
            let formData = new FormData()
            let reqData = {
              corpId: this.getApprovalBrandList.corpId,
              brandId: this.brandId,
              brandKey: this.getApprovalBrandList.brandKey,
              name: brandInfoData.name,
              descr: brandInfoData.descr,
              bizCateGrp: cateInfoData.bizCateGrp,
              bizCateCd: cateInfoData.bizCateCd,
              cate3: cateInfoData.cate3,
              tel: brandInfoData.tel,
              menuItemList: getmenuItemList,
              url: brandInfoData.url,
              email: brandInfoData.email,
              addrRegnNo: brandInfoData.addrRegnNo,
              addrMngNo: brandInfoData.addrMngNo,
              addrDtl: brandInfoData.addrDtl,
              mdn: sendInfoData.mdn,
              subTitle: sendInfoData.subTitle,
              chatbotList: sendInfoData.chatbotList,
              regCertiFileIdOld: sendInfoData.regCertiFileIdOld,
              excelFileId: sendInfoData.massRegFileId,
              aprvYn: 'Y',
              aprvRet: 'WAITING'
            }
            if (!jglib.isEmpty(brandInfoData.bgImgFile)) {
              formData.append('bgImgFile', brandInfoData.bgImgFile)
            } else {
              reqData.bgImgFileIdOld = brandInfoData.bgImgFileId
            }
            if (!jglib.isEmpty(brandInfoData.profileImgFile)) {
              formData.append('profileImgFile', brandInfoData.profileImgFile)
            } else {
              reqData.profileImgFileId = brandInfoData.profileImgFileId
            }
            formData.append('data', JSON.stringify(reqData))

            // 승인요청 API (승인요청시에는 aprvRet값 코드 ''로 넣어서 호출)
            applyBrand(formData)
              .then(res => {
                this.$router.push('/service/dashboard')
              })
              .catch(err => {
                this.$alertMsg(err.desc)
              })
          })
      } else if (this.getApprovalBrandList.aprvRet === 'SAVED' || this.getApprovalBrandList.aprvRet === 'REJECTED') {
        // 저장, 반려 상태일 때 승인요청
        this.$confirmMsg(`운영자 승인이 완료되면 브랜드를 사용할 수 있습니다.<br>입력하신 정보로 브랜드를 개설하시겠습니까?`)
          .then(() => {
            this.isSaveOrApply = true
            let formData = new FormData()
            let reqData = {
              corpId: this.getApprovalBrandList.corpId,
              brandId: this.brandId,
              brandKey: this.getApprovalBrandList.brandKey,
              name: brandInfoData.name,
              descr: brandInfoData.descr,
              bizCateGrp: cateInfoData.bizCateGrp,
              bizCateCd: cateInfoData.bizCateCd,
              cate3: cateInfoData.cate3,
              tel: brandInfoData.tel,
              menuItemList: getmenuItemList,
              url: brandInfoData.url,
              curTab: feedInfoData.curTab,
              initFeedItem: feedInfoData.initFeedItem,
              email: brandInfoData.email,
              addrRegnNo: brandInfoData.addrRegnNo,
              addrMngNo: brandInfoData.addrMngNo,
              addrDtl: brandInfoData.addrDtl,
              mdn: sendInfoData.mdn,
              subTitle: sendInfoData.subTitle,
              chatbotList: sendInfoData.chatbotList,
              aprvRet: 'WAITING'
            }
            if (!jglib.isEmpty(brandInfoData.bgImgFile)) {
              formData.append('bgImgFile', brandInfoData.bgImgFile)
            } else {
              reqData.bgImgFileIdOld = brandInfoData.bgImgFileId
            }
            if (!jglib.isEmpty(brandInfoData.profileImgFile)) {
              formData.append('profileImgFile', brandInfoData.profileImgFile)
            } else {
              reqData.profileImgFileId = brandInfoData.profileImgFileId
            }
            if (!jglib.isEmpty(sendInfoData.massRegFile)) {
              reqData.chatbotList = null
              formData.append('excelFile', sendInfoData.massRegFile)
            } else {
              if (sendInfoData.additionalType === 'large') {
                reqData.chatbotList = null
              }
              reqData.excelFileId = sendInfoData.massRegFileId
            }
            if (!jglib.isEmpty(sendInfoData.regCertiFile)) {
              formData.append('regCertiFile', sendInfoData.regCertiFile)
            } else {
              reqData.regCertiFileIdOld = sendInfoData.regCertiFileIdOld
            }
            formData.append('data', JSON.stringify(reqData))

            // 승인요청 API (승인요청시에는 aprvRet값 코드 ''로 넣어서 호출)
            applyBrand(formData)
              .then(res => {
                if (jglib.isEmpty(sendInfoData.massRegFile)) {
                  this.$router.push('/service/dashboard')
                } else {
                  this.massRegFileData = res.result
                  this.ApplyMassRegFilePopup()
                }
              })
              .catch(err => {
                this.$alertMsg(err.desc)
              })
          })
      }
    },
    saveValidation() {
      if (!this.$refs.brandInfo.validation()) {
        return
      }
      if (!this.$refs.sendInfo.validation()) {
        return
      }
      this.visible = true
    },
    // 단순 저장
    save() {
      let brandInfoData = this.$refs.brandInfo.getBrandInfo()
      let sendInfoData = this.$refs.sendInfo.getSendInfo()
      let cateInfoData = this.$refs.cateInfo.getCateInfo()
      let feedInfoData = this.$refs.feedInfo.getFeedInfo()

      let menuItemListData = []
      menuItemListData = brandInfoData.menuItemList.filter(res => {
        return res.visible
      })
      let getmenuItemList = []
      for (let i = 0; i < menuItemListData.length; i++) {
        if (menuItemListData[i].menuItemNm === 'App') {
          getmenuItemList.push({
            menuItemId: menuItemListData[i].menuItemId.toLowerCase(),
            webLink: menuItemListData[i].values[0].value,
            appPkgNm: menuItemListData[i].values[1].value,
            appAct: menuItemListData[i].values[2].value,
            appUri: menuItemListData[i].values[3].value
          })
        } else if (menuItemListData[i].menuItemNm === 'Chat') {
          getmenuItemList.push({
            menuItemId: menuItemListData[i].menuItemId.toLowerCase(),
            webLink: ''
          })
        } else {
          getmenuItemList.push({
            menuItemId: menuItemListData[i].menuItemId.toLowerCase(),
            webLink: menuItemListData[i].values[0].value
          })
        }
      }

      let formData = new FormData()
      let reqData = {
        corpId: this.getApprovalBrandList.corpId,
        brandId: this.brandId,
        brandKey: this.getApprovalBrandList.brandKey,
        name: brandInfoData.name,
        descr: brandInfoData.descr,
        bizCateGrp: cateInfoData.bizCateGrp,
        bizCateCd: cateInfoData.bizCateCd,
        cate3: cateInfoData.cate3,
        tel: brandInfoData.tel,
        menuItemList: getmenuItemList,
        url: brandInfoData.url,
        curTab: feedInfoData.curTab,
        initFeedItem: feedInfoData.initFeedItem,
        email: brandInfoData.email,
        addrRegnNo: brandInfoData.addrRegnNo,
        addrMngNo: brandInfoData.addrMngNo,
        addrDtl: brandInfoData.addrDtl,
        mdn: sendInfoData.mdn,
        subTitle: sendInfoData.subTitle,
        rcsReply: sendInfoData.rcsReply,
        chatbotList: sendInfoData.chatbotList,
        aprvRet: 'SAVED'
      }
      if (!jglib.isEmpty(brandInfoData.bgImgFile)) {
        formData.append('bgImgFile', brandInfoData.bgImgFile)
      } else {
        reqData.bgImgFileIdOld = brandInfoData.bgImgFileId
      }
      if (!jglib.isEmpty(brandInfoData.profileImgFile)) {
        formData.append('profileImgFile', brandInfoData.profileImgFile)
      } else {
        reqData.profileImgFileId = brandInfoData.profileImgFileId
      }
      if (!jglib.isEmpty(sendInfoData.massRegFile)) {
        reqData.chatbotList = null
        formData.append('excelFile', sendInfoData.massRegFile)
      } else {
        if (sendInfoData.additionalType === 'large') {
          reqData.chatbotList = null
        }
        reqData.excelFileId = sendInfoData.massRegFileId
      }
      if (!jglib.isEmpty(sendInfoData.regCertiFile)) {
        formData.append('regCertiFile', sendInfoData.regCertiFile)
      } else {
        reqData.regCertiFileIdOld = sendInfoData.regCertiFileIdOld
      }
      formData.append('data', JSON.stringify(reqData))

      this.isSaveOrApply = true
      applyBrand(formData)
        .then((res) => {
          if (jglib.isEmpty(sendInfoData.massRegFile)) {
            this.$router.push('/service/dashboard')
          } else {
            this.massRegFileData = res.result
            this.ApplyMassRegFilePopup()
          }
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    ApplyMassRegFilePopup() {
      let sendInfoData = this.$refs.sendInfo.getSendInfo()
      if (!jglib.isEmpty(sendInfoData.massRegFile)) {
        this.ApplyMassRegFilePopupFlag = true
        this.uploadResult = this.massRegFileData
      }
    }
  }
}
</script>
