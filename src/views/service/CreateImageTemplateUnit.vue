<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'템플릿 관리'"/>
      </div>
      <brand-top active="template" :brandId="brandId"></brand-top>
      <div class="dashboard_wrap">
        <section class="section">
          <div class="title_area"
            :class=" bullet_list ? 'mar_b20 inline pad_b20 br_bottom' : 'mar_b20 inline pad_b20 br_bottom'">
            <h3 class="h3_title" v-html="procTitle" />
            <div v-html="procDesc" />
          </div>
          <div class="rcs_bundle_wrap">
            <!-- 템플릿 작성 -->
            <image-template-write
              v-if="modify || (ready && isWriteMode)"
              :isNewbie="isNewbie"
              :modify="modify"
              :infoComponents="imgTplInfoComponents" :disableData="disableData"
              :common.sync="commonInfo"
              :mainImg.sync="mainImgInfo"
              :titAndDesc.sync="titAndDescInfo"
              :detail.sync="detailInfo"
              :buttons.sync="buttonsInfo"
              :templateData="templateData"></image-template-write>
            <!-- 템플릿 조회 -->
            <image-template-view
              v-if="!modify && (ready && !isWriteMode)"
              :infoComponents="imgTplInfoComponents" :disableData="disableData"
              :common.sync="commonInfo"
              :mainImg.sync="mainImgInfo"
              :titAndDesc.sync="titAndDescInfo"
              :detail.sync="detailInfo"
              :buttons.sync="buttonsInfo"
              :templateData="templateData"
              :fmtStrData="fmtStrData"
              :userParams.sync="userParams"
              :images.sync="images" :modify.sync="modify"></image-template-view>
            <!-- 상품별 에뮬레이터 -->
            <component :is="emulator" :type="commonInfo.tplType" :data="previewData"></component>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import ImageTemplateWrite from '@/views/service/brand/template/ImageTemplateWrite'
import ImageTemplateView from '@/views/service/brand/template/ImageTemplateView'
import { retrieveTemplateId, retrieveTemplateDetail } from '@/api/service/template'
import Breadcrumb from '@/components/global/Breadcrumb'
import imgTplUtils from '@/components/imageTemplate/js/imageTemplateUtils'

// 이미지 템플릿 상품별 에뮬레이터
import HighlightImageAndTitleEmulator from '@/components/imageTemplate/emulator/HighlightImageAndTitleEmulator'
import HighlightImageEmulator from '@/components/imageTemplate/emulator/HighlightImageEmulator'
import ThumbnailEmulator from '@/components/imageTemplate/emulator/ThumbnailEmulator'
import SnsEmulator from '@/components/imageTemplate/emulator/SnsEmulator'
import comlib from '@/components/messageTemplate/js/common'
export default {
  name: 'CreateImageTemplateUnit',
  components: {
    BrandTop,
    Breadcrumb,
    ImageTemplateWrite,
    ImageTemplateView,
    HighlightImageAndTitleEmulator,
    HighlightImageEmulator,
    ThumbnailEmulator,
    SnsEmulator
  },
  props: {
    brandId: {
      type: String,
      require: true
    },
    tplId: {
      type: String,
      require: false
    }
  },
  data() {
    return {
      /** 공통 정보 */
      tplThemeType: {},
      ready: false, // 데이터 load 여부
      modify: false, // 승인템플릿 수정
      bullet_list: true, // 타이틀 클래스
      procTitle: null,
      procDesc: null,
      asisData: null,
      fmtStrData: {}, // 포맷 스트링 데이터 - 신규등록시 해당 상품에 해당하는 데이터 / 수정,조회시 사용자가 입력한 데이터가 들어있음
      infoComponents: null, // 화면 구성 컴포넌트 목록
      disableData: null, // 화면 내 입력 불가능 데이터
      emulator: '', // 상품별 사용될 에뮬레이터 이름
      templateId: '', // (임시, 아직 사용부분 없음)
      templateData: null, // 템플릿 상세 데이터(조회시 사용)
      /** 사용자 입력 데이터 바인딩 및 미리보기 데이터 */
      commonInfo: {
        brandId: '',
        tplFormId: '', // 메시지 베이스 폼 ID
        tplTheme: '', // 템플릿 테마
        tplThemeNm: '', // 템플릿 테마명
        tplType: '', // 템플릿 속성
        tplTypeNm: '', // 템플릿 속성명
        tplId: '', // 템플릿 ID
        tplNm: '', // 템플릿명
        isFirstOptChange: true // 옵션 최초변경 여부
      },
      mainImgInfo: {
        media: '', // maap url 정보(업로드 완료된 이미지가 있을 경우 데이터 존재)
        mediaUrl: '', // 링크정보
        fileSrc: '', // (사용자가 업로드한) 이미지 src
        fileName: '', // 파일 이름
        fileType: '', // 파일 타입
        fileSize: 0, // byte
        previewSrc: '' // (emulator - 이미지 미리보기)
      },
      titAndDescInfo: {
        title: '', // 제목
        description: '', // 본문
        useTitle: true, // 제목 사용여부
        useDescription: true // 본문 사용여부
      },
      detailInfo: {
        minCnt: 0, // 최소 개수
        maxCnt: 3, // 최대 개수
        list: [] // 상세 정보 목록: { subTitle, subMedia, subMediaUrl, subDesc } + fileSrc, fileType, fileName, fileUrl, fileSize
      },
      buttonsInfo: {
        maxCnt: 2,
        btnList: [] // { action: { ...  }}
      },
      userParams: null,
      images: null
    }
  },
  computed: {
    isNewbie() { return !this.tplId },
    isWriteMode() { return this.isNewbie || this.modify },
    // 상품별 사용하는 데이터에 따라 미리보기 데이터가 구성한다
    previewData() {
      let previewMapData = new Map()
      this.imgTplInfoComponents.forEach(infoComp => {
        previewMapData.set(infoComp, this.$data[`${infoComp}Info`])
      })
      return previewMapData
    }
  },
  watch: {
    modify() {
      if (this.modify) {
        if (this.templateData.aprvRet === 'SAVED') this.procTitle = '임시저장(수정)'
        else if (this.templateData.aprvRet === 'REJECTED') {
          this.procTitle = '반려(수정)'
          this.procDesc = '<ul class="bullet_list fs18"><li>승인 심사 기준:<br>12시 전 신청 건은 당일 오후, 12시 이후 신청 건에 대해서는 익일 오전 중 심사 예정입니다.(주말 신청 건에 대해서는 차주 월요일 중 심사) 내부 사정상 지체될 수 있습니다.</li></ul>'
        } else if (this.templateData.aprvRet === 'OK') {
          this.procTitle = '승인완료(수정)'
          this.procDesc = '<ul class="bullet_list fs18"><li>템플릿은 승인 완료 후 사용 및 발송이 가능합니다.</li><li>승인 심사 기준:<br>12시 전 신청 건은 당일 오후, 12시 이후 신청 건에 대해서는 익일 오전 중 심사 예정입니다.(주말 신청 건에 대해서는 차주 월요일 중 심사) 내부 사정상 지체될 수 있습니다.</li></ul>'
        }
        // 수정시 이미 등록된 메인 이미지가 있으면, 최초 옵션 변경시 알림창 출력을 위해 set
        this.commonInfo.isFirstOptChange = !comlib.isEmpty(this.mainImgInfo.media)
      }
    }
  },
  created() {
    if (!comlib.isEmpty(this.$store.getters.getThemeTypeInfo)) this.tplThemeType = this.$store.getters.getThemeTypeInfo
    else this.tplThemeType = JSON.parse(localStorage.getItem('themeTypeInfo'))

    // 1) 상품별 화면 구성 컴포넌트 정보
    let compInfo = imgTplUtils.getComponentInfo(this.tplThemeType.theme, this.tplThemeType.type)
    this.imgTplInfoComponents = compInfo.components // 입력/조회 데이터 항목(depth1)
    this.disableData = compInfo.disableData // 입력/조회 데이터 중 사용하지 않는 상세 항목 목록 (depth2)
    this.emulator = `${compInfo.emulator}Emulator` // 상품별 에뮬레이터 컴포넌트 명
    // 2) 템플릿 공통 정보
    let theme = this.tplThemeType.theme
    let type = this.tplThemeType.type
    let tplNameData = imgTplUtils.getThemeTypeName(theme, type)
    this.commonInfo.brandId = this.brandId
    this.commonInfo.tplTheme = theme
    this.commonInfo.tplType = type
    this.commonInfo.tplThemeNm = tplNameData.themeNm
    this.commonInfo.tplTypeNm = tplNameData.typeNm

    // 상품별로 상세 데이터 default 개수 set
    let detailMinCnt = 0
    if (theme === 'HIT') detailMinCnt = 1
    else if (theme === 'TBN') {
      if (type === 'V') detailMinCnt = 2
      else if (type === 'H') detailMinCnt = 3
    }
    this.detailInfo.minCnt = detailMinCnt
    // 신규 템플릿 등록의 경우 default 데이터 SET
    if (this.isNewbie) {
      for (let i = 0; i < detailMinCnt; i++) {
        this.detailInfo.list.push({ subTitle: '', subMedia: '', subMediaUrl: '', subDesc: '', fileSrc: '', fileType: '', fileName: '', fileUrl: '', fileSize: 0 })
      }
      this.setImageTempalteId()
    } else {
      this.getImageTemplateInfo()
    }
  },
  mounted() {},
  methods: {
    /**  신규 이미지 템플릿 ID 채번 */
    setImageTempalteId() {
      let params = { templateFormProductCode: 'I' }
      retrieveTemplateId(this.brandId, params)
        .then((res) => { this.commonInfo.tplId = res.result.tplId }) // 새로 생성된 tplId를 set
        .catch((err) => { this.$alertMsg(err.desc) })
        .finally(() => {
          this.ready = true
          this.currentProcess()
        })
    },
    /** 이미지 템플릿 조회 */
    getImageTemplateInfo() {
      retrieveTemplateDetail(this.brandId, this.tplId)
        .then((res) => {
          if (res.result) {
            let data = res.result
            // data set
            this.templateData = data // 상세 데이터

            this.commonInfo.tplId = data.tplId
            this.commonInfo.tplNm = data.tplNm
            this.commonInfo.tplFormId = data.tplFormId
            // 나머지 정보는 fmtStr에서 추출..
            this.fmtStrData = data.fmtStr
            this.userParams = data.userParams || null
            this.images = data.images
          }
        })
        .catch((err) => {
          this.$alertMsg('잘못된 형식의 JSON 데이터 입니다.').then(() => { // (에러메시지 유지?)
            if (err.code === '60000021') {
              this.$router.push({
                name: 'TemplateList',
                params: { brandId: this.brandId }
              })
            }
          })
        })
        .finally(() => {
          this.ready = true
          this.currentProcess()
        })
    },
    /** 템플릿 상태, 상태별 안내문구 지정 */
    currentProcess() {
      if (this.isNewbie) {
        this.procTitle = '템플릿 작성'
        this.procDesc =
          '<ul class="bullet_list fs18"><li>발송 내용이 잘 드러나도록 각 영역 별로 고정부 메시지를 기재해주세요. 내용 확인이 어려울 경우 반려 처리 될 수 있습니다.</li><li>각 영역 별로 변수명은 최대 20자 이내로 작성해 주세요. 고정부 메시지와 변수명 포함하여 각 영역 별 최대 입력 글자 수 초과 시 전송 불가합니다.</li></ul>'
      } else {
        this.bullet_list = false
        this.procDesc =
          '<div><ul class="bullet_list fs18"><li>승인 심사 기준: 12시 전 신청 건은 당일 오후, 12시 이후 신청 건에 대해서는 익일 오전 중 심사 예정입니다.<br/>(주말 신청 건에 대해서는 차주 월요일 중 심사) 내부 사정상 지체될 수 있습니다.</li></ul></div>'
        if (this.templateData.aprvRet === 'INSPECTED') {
          this.procTitle = '처리중'
        } else if (this.templateData.aprvRet === 'OK') {
          this.procTitle = '승인완료'
          this.procDesc = null
        } else if (this.templateData.aprvRet === 'REJECTED') {
          if (this.templateData.activeYn === 'Y') {
            this.procTitle = '반려(수정)'
          } else {
            this.procTitle = '반려'
          }
        } else {
          if (this.templateData.aprvRet === 'SAVED') {
            this.bullet_list = true
            this.procTitle = '임시저장'
            this.procDesc = '<ul class="bullet_list fs18"><li>템플릿은 승인 완료 후 사용 및 발송이 가능합니다.</li><li>승인 심사 기준:<br>12시 전 신청 건은 당일 오후, 12시 이후 신청 건에 대해서는 익일 오전 중 심사 예정입니다.(주말 신청 건에 대해서는 차주 월요일 중 심사) 내부 사정상 지체될 수 있습니다.</li></ul>'
          } else if (this.templateData.status === 'DEL_WAIT') {
            this.procTitle = '처리중(삭제)'
            this.procDesc = null
          } else {
            if (this.templateData.status === 'APRV_NEW') {
              this.procTitle = '신규승인대기'
            } else if (this.templateData.status === 'APRV_MOD') {
              this.procTitle = '수정승인대기'
            }
          }
        }
      }
    }
  }
}
</script>
