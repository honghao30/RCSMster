<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'브랜드 관리'"/>
      </div>

      <brand-top active="brand" :brandId="brandId"></brand-top>
      <div class="dashboard_wrap">
        <section class="section">
          <div class="title_area inline mar_b10" v-if="activeOk">
            <h3 class="h3_title">승인완료</h3>
            <span class="h3_desc">승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</span>
          </div>
          <div class="title_area inline mar_b20" v-else>
            <h3 class="h3_title">{{ getDisplayAprvNm(this.getApprovalBrandList) }}</h3>
            <span class="h3_desc">승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</span>
          </div>
          <span class="h3_desc mar_b16" v-if="activeOk"  style="margin-top:-30px">
            ※ 브랜드 명 / 프로필 이미지를 수정하실 경우
            <strong>운영자의 승인완료 후 정보가 변경됩니다.</strong>
          </span>
          <div class="rcs_bundle_wrap">
            <div class="rcs_emul_form_wrap">
              <Approval-Brand-Info ref="brandInfo" @getTel="getTel" @viewerDataInfo="viewerDataInfo" :brandIdData="brandIdData"/>
              <div class="title_area">
                <h3 class="h3_title">대화방 관리</h3>
              </div>
              <Approval-Brand-Send ref="sendInfo" :tel="this.tel" :brandIdData="brandIdData"/>
              <div class="title_area" v-show="result">
                <h3 class="h3_title">승인결과</h3>
              </div>
              <div class="rcs_emul_form_cont" v-show="result">
                <div class="rcs_item_bundle">
                  <strong class="rcs_tit_bundle">{{ this.getApprovalBrandList.aprvRetNm }}</strong>
                  <div class="rcs_cont_bundle">
                    <span>{{ this.getApprovalBrandList.aprvDt }}</span>
                    <span class="mar_l20">{{ this.getApprovalBrandList.mstStatus === 'ACTIVE' ? '승인완료' : this.getApprovalBrandList.aprvRetDescr }}</span>
                  </div>
                </div>
              </div>
              <div class="btn_wrap mar_t40 center full_width" v-show="waiting">
                <a href="javascript:void(0);" class="btn mid bd_black" @click="goDashboard">대시보드로 이동</a>
              </div>
              <div class="btn_wrap mar_t40 center full_width" v-show="rejected">
                <a href="javascript:void(0);" class="btn mid bd_black" @click="goDashboard">대시보드로 이동</a>
                <a href="javascript:void(0);" class="btn mid black" v-if="corpAdmYnDelete  && this.userCd === 'CORPY'" @click="deleteApprovalBrandClick ">삭제</a>
                <a href="javascript:void(0);" class="btn mid blue" @click="saveValidation" v-if="this.userCd !== 'AGENCY'">저장</a>
                <a href="javascript:void(0);" class="btn mid blue" @click="apply" v-if="this.userCd !== 'AGENCY'">승인요청</a>
              </div>
              <div class="btn_wrap mar_t40 center full_width" v-show="ok">
                <a href="javascript:void(0);" class="btn mid bd_blue" @click="goDashboard"><span>대시보드로 이동</span></a>
                <a href="javascript:void(0);" class="btn mid bd_blue"
                  v-if="corpAdmYnDelete && (this.getApprovalBrandList.admYn === 'Y' && this.userCd !== 'AGENCY')" @click="deleteApprovalBrandClick"><span>삭제</span></a>
                <a href="javascript:void(0);" class="btn mid blue" @click="apply" v-if="this.userCd !== 'AGENCY'"><span>승인요청</span></a>
              </div>
              <Approval-Brand-Delete-Certification-Popup :corpIdData="corpIdData" v-if="visibleDelete" :visibleDelete.sync="visibleDelete" @turnvisible="turnvisible"/>
              <apply-confirm-popup v-if="visible" :visible.sync="visible" :msg="msg" @save="save" @apply="apply"/>
            </div>
            <Create-Brand-Viewer :brandInfoData="this.viewerData"/>
            <!-- 엑셀 업로드 결과 팝업 -->
            <excel-upload-result-popup v-if="popupObj.visible" :visible.sync="popupObj.visible" :uploadResult="popupObj.excelUploadResult" @errorListDown="uploadErrorListDownload"/>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'

import CreateBrandViewer from '@/views/service/components/CreateBrandViewer'
import ApprovalBrandInfo from '@/views/service/components/ApprovalBrandInfo'
import ApprovalBrandSend from '@/views/service/components/ApprovalBrandSend'

import store from '@/store'
import { getUserInfo } from '@/api/service/service'
import ApprovalBrandDeleteCertificationPopup from '@/views/service/components/ApprovalBrandDeleteCertificationPopup'
import Breadcrumb from '@/components/global/Breadcrumb'
import ApplyConfirmPopup from '@/components/popupSet/ApplyConfirmPopup'
import ExcelUploadResultPopup from '@/components/excel'
import { getDisplayAprvNm } from '@/utils/string'

import {
  getApprovalBrand,
  deleteApprovalBrand,
  applyBrand,
  getCheckTplYnChatbotYn
} from '@/api/service/approvalBrand'

export default {
  name: 'ApprovalBrand',
  components: {
    BrandTop,
    CreateBrandViewer,
    ApprovalBrandInfo,
    ApprovalBrandSend,
    ApprovalBrandDeleteCertificationPopup,
    Breadcrumb,
    ApplyConfirmPopup,
    ExcelUploadResultPopup
  },
  data() {
    return {
      activeOk: false,

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
      viewerData: {},
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
      }
    }
  },
  created() {
    this.userCd = this.$store.state.user.userCd
    this.brandId = this.$route.params.brandId
    let params = { brandId: this.brandId }

    getApprovalBrand(params)
      .then(res => {
        this.getApprovalBrandList = res.result
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
  computed: {
    brandIdData() {
      return this.brandId
    },
    corpIdData() {
      return this.corpId
    }
  },
  methods: {
    getDisplayAprvNm,
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
        .then(res => {
          let reqData = {
            brandId: this.brandId
          }
          deleteApprovalBrand(reqData)
            .then(res => {
              this.$router.push('/service/dashboard')
            })
            .catch(err => {
              this.$alertMsg(err.desc)
            })
        })
        .catch(err => {
          console.error(err)
        })
    },
    goDashboard() {
      this.$router.push('/service/dashboard')
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
          .then(res => {
            let formData = new FormData()
            let reqData = {
              corpId: this.getApprovalBrandList.corpId,
              brandId: this.brandId,
              brandKey: this.getApprovalBrandList.brandKey,
              name: brandInfoData.name,
              descr: brandInfoData.descr,
              bizCateGrp: brandInfoData.bizCateGrp,
              bizCateCd: brandInfoData.bizCateCd,
              cate3: brandInfoData.cate3,
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
                if (jglib.isEmpty(sendInfoData.massRegFile)) {
                  this.$router.push('/service/dashboard')
                } else {
                  this.ApplyMassRegFilePopup()
                  this.massRegFileData = res.result
                }
              })
              .catch(err => {
                this.$alertMsg(err.desc)
              })
          }).catch(res => {})
      } else if ((this.ok && this.name !== brandInfoData.name) || (!jglib.isEmpty(brandInfoData.profileImgFile) || this.mstProfileImgFileId !== brandInfoData.profileImgFileId)) {
        // 승인이 필요한 수정
        this.$confirmMsg('브랜드명, 프로필 이미지 수정시 <br> 운영자의 승인완료 후 반영됩니다. <br> 수정하시겠습니까?', '타이틀', '확인', '취소')
          .then(res => {
            let formData = new FormData()
            let reqData = {
              corpId: this.getApprovalBrandList.corpId,
              brandId: this.brandId,
              brandKey: this.getApprovalBrandList.brandKey,
              name: brandInfoData.name,
              descr: brandInfoData.descr,
              bizCateGrp: brandInfoData.bizCateGrp,
              bizCateCd: brandInfoData.bizCateCd,
              cate3: brandInfoData.cate3,
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
                if (jglib.isEmpty(sendInfoData.massRegFile)) {
                  this.$router.push('/service/dashboard')
                } else {
                  this.ApplyMassRegFilePopup()
                  this.massRegFileData = res.result
                }
              })
              .catch(err => {
                this.$alertMsg(err.desc)
              })
          })
          .catch(res => {})
      } else if (this.getApprovalBrandList.aprvRet === 'SAVED' || this.getApprovalBrandList.aprvRet === 'REJECTED') {
        // 저장, 반려 상태일 때 승인요청
        this.$confirmMsg(`운영자 승인이 완료되면 브랜드를 사용할 수 있습니다.<br>입력하신 정보로 브랜드를 개설하시겠습니까?`)
          .then(res => {
            let formData = new FormData()
            let reqData = {
              corpId: this.getApprovalBrandList.corpId,
              brandId: this.brandId,
              brandKey: this.getApprovalBrandList.brandKey,
              name: brandInfoData.name,
              descr: brandInfoData.descr,
              bizCateGrp: brandInfoData.bizCateGrp,
              bizCateCd: brandInfoData.bizCateCd,
              cate3: brandInfoData.cate3,
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
              formData.append('excelFile', sendInfoData.massRegFile)
            } else {
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
                  if (res.code === '20000000') {
                    this.popupObj.visible = true
                    this.popupObj.excelUploadResult.totalCount = res.result.totalCount
                    this.popupObj.excelUploadResult.successCount = res.result.successCount
                    this.popupObj.excelUploadResult.etcFailCount = res.result.etcFailCount
                    this.popupObj.excelUploadResult.dupFailCount = res.result.dupFailCount
                    this.popupObj.excelUploadResult.duplicateCount = res.result.duplicateCount
                    this.popupObj.excelUploadResult.list = res.result.list
                  }
                }
              })
              .catch(err => {
                this.$alertMsg(err.desc)
              })
          })
          .catch(res => {})
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
        bizCateGrp: brandInfoData.bizCateGrp,
        bizCateCd: brandInfoData.bizCateCd,
        cate3: brandInfoData.cate3,
        tel: brandInfoData.tel,
        menuItemList: getmenuItemList,
        url: brandInfoData.url,
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
        reqData.profileImgFileId = sendInfoData.profileImgFileId
      }
      if (!jglib.isEmpty(sendInfoData.massRegFile)) {
        formData.append('excelFile', sendInfoData.massRegFile)
      } else {
        reqData.excelFileId = sendInfoData.massRegFileId
      }
      if (!jglib.isEmpty(sendInfoData.regCertiFile)) {
        formData.append('regCertiFile', sendInfoData.regCertiFile)
      } else {
        reqData.regCertiFileIdOld = sendInfoData.regCertiFileIdOld
      }
      formData.append('data', JSON.stringify(reqData))

      applyBrand(formData)
        .then(res => {
          this.$router.push('/service/dashboard')
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    }
  }
}
</script>
