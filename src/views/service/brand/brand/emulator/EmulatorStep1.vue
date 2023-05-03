<template>
  <div class="rcs_emulator_wrap open_brand type2">
    <div class="rcs_inner_emul">
      <strong class="blind">미리보기</strong>
      <div class="rcs_emulator_area">
        <div class="rcs_img_area">
          <img alt="" :src="bgImageData" v-if="bgImageData && !retrivebgFlag">
          <img alt="" :src="brandInfoData.bgImgFileUrl" v-else-if="retrivebgFlag">
          <img alt="" src="@/assets/images/common/rcs_emulator_blank.jpg" v-else>
        </div>
        <div class="rcs_emul_cont">
          <div class="rcs_icon_area">
            <span v-for="(item, index) in visibleMenuItemList" :key="index" class="rcs_icon" :class="`icon_${item.code.toLowerCase()}`"></span>
          </div>
          <div class="rcs_profile_area">
            <img alt="" :src="profileImageData" v-if="profileImageData && !retriveProfileFlag">
            <img alt="" :src="brandInfoData.profileImgFileUrl" v-else-if="retriveProfileFlag">
            <img alt="" src="@/assets/images/common/img_profile_blank.png" v-else>
          </div>
          <div class="rcs_brand_txtbox">
            <strong class="rcs_brand_name">{{ brandInfoData.name ? brandInfoData.name : '브랜드명'}}</strong>
            <div class="rcs_desc_area" v-html="brandInfoData.descr ? brandInfoData.descr : '브랜드에 대한 간략한 설명'"></div>
          </div>
          <div class="mar_t10">
            <img src="@/assets/images/common/emul_tab_img.png" alt="">
          </div>
          <div class="rcs_detail_area">
            <ul>
              <li class="tell_icon">
                <p class="rcs_detail_tit">전화번호</p>
                <p class="rcs_detail_txt">{{ addHyphenTelNum(brandInfoData.tel) }}</p>
              </li>
              <li class="url_icon" v-if="brandInfoData.url">
                <p class="rcs_detail_tit">웹사이트</p>
                <p class="rcs_detail_txt">{{ brandInfoData.url }}</p>
              </li>
              <li class="mail_icon" v-if="brandInfoData.email !== '' && brandInfoData.email !== '@'">
                <p class="rcs_detail_tit">이메일</p>
                <p class="rcs_detail_txt" v-if="brandInfoData.email === '@'"></p>
                <p class="rcs_detail_txt" v-else>{{ brandInfoData.email }}</p>
              </li>
              <li class="add_icon" v-if="brandInfoData.addrRegnNo">
                <p class="rcs_detail_tit">주소</p>
                <p class="rcs_detail_txt">{{ brandInfoData.addrRegnNo }}&nbsp;{{ brandInfoData.addrMngNo }}&nbsp;{{ brandInfoData.addrDtl }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addHyphenTelNum } from '@/utils/textUtil'

export default {
  props: {
    brandInfoData: {
      type: Object
    }
  },
  data() {
    return {
      bgImageData: '',
      profileImageData: '',
      profileImageUrl: '',
      bgImageUrl: '',
      retriveProfileFlag: false,
      retrivebgFlag: false
    }
  },
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
    // method를 바로 연결하면 tic 단위로 계속 실행되기 때문에, 값이 변경할 때만 수행되고,
    // cache로 남는 computed를 활용하는 것이 성능에 좋음
    visibleMenuItemList() {
      if (this.brandInfoData.menuItemList) {
        return this.brandInfoData.menuItemList.filter(res => {
          return res.visible
        })
      } else {
        return []
      }
    }
  },
  watch: {
    'brandInfoData.descr'() {
      this.brandInfoData.descr = this.brandInfoData.descr.replace(/on.*\(|eval\(|javascript/gi, '')
        .split('\n')
        .join('<br />')
    },
    'brandInfoData.profileImgFile'() {
      if (this.brandInfoData.profileImgFile) {
        let reader = new FileReader()
        let vm = this
        let file = this.brandInfoData.profileImgFile

        reader.onload = e => {
          vm.profileImageData = e.target.result
        }
        reader.readAsDataURL(file)
      } else {
        this.profileImageData = ''
      }
    },
    'brandInfoData.bgImgFile'() {
      if (this.brandInfoData.bgImgFile) {
        let reader = new FileReader()
        let vm = this
        let file = this.brandInfoData.bgImgFile

        reader.onload = e => {
          vm.bgImageData = e.target.result
        }
        reader.readAsDataURL(file)
      } else {
        this.bgImageData = ''
      }
    },
    'brandInfoData.profileImgFileId'() {
      if (
        !jglib.isEmpty(this.brandInfoData.profileImgFileId) &&
        !jglib.isEmpty(this.brandInfoData.profileImgFileNo)
      ) {
        this.retriveProfileFlag = true
      } else {
        this.retriveProfileFlag = false
        this.profileImageUrl = ''
      }
    },
    'brandInfoData.bgImgFileId'() {
      if (
        !jglib.isEmpty(this.brandInfoData.bgImgFileId) &&
        !jglib.isEmpty(this.brandInfoData.bgImgFileNo)
      ) {
        this.retrivebgFlag = true
      } else {
        this.retrivebgFlag = false
        this.bgImageUrl = ''
      }
    }
  },
  methods: {
    addHyphenTelNum
  }
}
</script>
