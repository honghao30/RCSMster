<template>
  <div class="rcs_emulator_wrap open_brand step2 type2">
    <div class="rcs_inner_emul">
      <strong class="blind">미리보기</strong>
      <div class="rcs_emulator_area">
        <div class="rcs_emul_cont">
          <div class="rcs_emul_brand">
            <div class="rcs_emul_brand_info_wrap">
              <div class="rcs_emul_brand_logo">
                <img alt="" :src="profileImageData" v-if="profileImageData && !retriveProfileFlag">
                <img alt="" :src="brandInfoData.profileImgFileUrl" v-else-if="retriveProfileFlag">
                <img alt="" src="@/assets/images/common/img_profile_blank.png" v-else>
              </div>
              <div class="rcs_emul_brand_info">
                <p class="brand_title">{{ sendInfoData.subTitle ? sendInfoData.subTitle : '대화방명' }}</p>
                <p class="brand_phone">{{ sendInfoData.tel ? addHyphenTelNum(sendInfoData.tel) : '대표 발신번호' }}</p>
              </div>
            </div>
            <div class="rcs_emul_brand_btn">
              <a href="javascript:void(0);" class="brand_btn">브랜드홈</a>
              <a href="javascript:void(0);" class="brand_btn">수신차단</a>
            </div>
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
    },
    sendInfoData: {
      type: Object
    }
  },
  data() {
    return {
      retriveProfileFlag: false,
      profileImageData: null
    }
  },
  watch: {
    'brandInfoData.profileImgFileId'() {
      if (!jglib.isEmpty(this.brandInfoData.profileImgFileId) && !jglib.isEmpty(this.brandInfoData.profileImgFileNo)) {
        this.retriveProfileFlag = true
      } else {
        this.retriveProfileFlag = false
        this.profileImageUrl = ''
      }
    },
    'brandInfoData.profileImgFile'() {
      if (this.brandInfoData.profileImgFile) {
        let reader = new FileReader()
        let file = this.brandInfoData.profileImgFile
        reader.onload = e => {
          this.profileImageData = e.target.result
        }
        reader.readAsDataURL(file)
      } else {
        this.profileImageData = ''
      }
    }
  },
  methods: {
    addHyphenTelNum
  }
}
</script>
