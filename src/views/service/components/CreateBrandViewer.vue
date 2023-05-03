<template>
  <!-- 스크롤시 고정-->
  <div class="rcs_emulator_wrap open_brand">
    <div class="rcs_inner_emul">
      <strong class="blind">미리보기</strong>
      <div class="rcs_emulator_area">
        <div class="rcs_img_area">
          <img :src="bgImageData" v-if="bgImageData && !retrivebgFlag">
          <img :src="this.brandInfoData.bgImgFileUrl" v-else-if="retrivebgFlag">
          <img src="@/assets/images/common/rcs_emulator_blank.jpg" v-else>
        </div>
        <div class="rcs_emul_cont">
          <div class="rcs_profile_area">
            <img :src="profileImageData" v-if="profileImageData && !retriveProfileFlag">
            <img :src="this.brandInfoData.profileImgFileUrl" v-else-if="retriveProfileFlag">
            <img src="@/assets/images/common/img_profile_blank.png" v-else>
          </div>
          <strong class="rcs_brand_name">{{this.brandInfoData.name}}</strong>
          <div class="rcs_icon_area">
            <!-- chat icon class icon_chat-->
            <span
              v-for="(item, index) in visibleMenuItemList"
              :key="index"
              class="rcs_icon"
              :class="`icon_${item.code.toLowerCase()}`"
            ></span>
            <!-- call icon class icon_call-->
            <!-- <span class="rcs_icon icon_call" :class="'icon_'+item.code"></span> -->
          </div>
          <div class="rcs_desc_area" v-html="this.brandInfoData.descr"></div>
          <div class="rcs_detail_area">
            <dl>
              <dt>전화번호</dt>
              <dd>{{this.brandInfoData.tel}}</dd>
              <dt>웹사이트</dt>
              <dd>{{this.brandInfoData.url}}</dd>
              <dt>이메일</dt>
              <dd v-if="this.brandInfoData.email === '@'"></dd>
              <dd v-else>{{this.brandInfoData.email}}</dd>
              <dt>주소</dt>
              <dd>{{this.brandInfoData.addrRegnNo}}{{this.brandInfoData.addrMngNo}} {{this.brandInfoData.addrDtl}}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
// import { getImageUrl } from '@/api/common/code'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
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
  created() {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
  },
  mounted() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
    // onload 상태와 동일하다. DOM 이후에 조작할 경우 이곳에서 수행
  },
  watch: {
    'brandInfoData.descr'() {
      this.brandInfoData.descr = this.brandInfoData.descr.replace(/\(|\)|on.*\(|eval\(|javascript/gi, '')
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
        // let reqObj = {
        //   fileId: this.brandInfoData.profileImgFileId,
        //   fileNo: this.brandInfoData.profileImgFileNo
        // }
        // getImageUrl(reqObj).then(res => {
        //   this.profileImageUrl = res.downloadUrl
        // })
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
        // let reqObj = {
        //   fileId: this.brandInfoData.bgImgFileId,
        //   fileNo: this.brandInfoData.bgImgFileNo
        // }
        // getImageUrl(reqObj).then(res => {
        //   this.bgImageUrl = res.downloadUrl
        // })
      } else {
        this.retrivebgFlag = false
        this.bgImageUrl = ''
      }
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
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 이벤트에 따라 실행하거나, 내부적으로 사용되는 함수들을 정의한다.
  }
}
</script>
