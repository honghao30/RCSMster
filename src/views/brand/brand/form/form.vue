<template>
  <div>
    <Step01 v-show='curStep === 1' ref='brandInfo' @nextStep='nextStep' @save='save' @modified='setModified'></Step01>
    <Step02 v-show='curStep === 2' ref='menuInfo' @nextStep='nextStep' @prevStep='prevStep' @save='save'></Step02>
    <Step03 v-show='curStep === 3' ref='feedInfo' @prevStep='prevStep' @nextStep='nextStep' @save='save'></Step03>
    <Step04 v-show='curStep === 4'></Step04>
  </div>
</template>
<script>
import Step01 from '@/views/brand/brand/form/step01.vue'
import Step02 from '@/views/brand/brand/form/step02.vue'
import Step03 from '@/views/brand/brand/form/step03.vue'
import Step04 from '@/views/brand/brand/form/step04.vue'
import { createBrand, brandDefaultImg } from '@/api/service/service'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Step01,
    Step02,
    Step03,
    Step04
  },
  data() {
    return {
      curStep: 1,
      modified: false
    }
  },
  mounted() {
    window.addEventListener('beforeunload', this.unLoadEvent)
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.unLoadEvent)
  },
  watch: {
  },
  computed: {
    ...mapGetters({
      brandDetail: 'brand/getBrandDetail',
      brandFile: 'brand/getBrandFile'
    })
  },
  created() {
    const brandId = this.$route.params.brandId
    if (brandId) {
      this.brandId = brandId
      this.fetchApprovalBrand({ brandId: this.brandId })
        .then(() => {
          this.$nextTick(() => {
            this.$refs.brandInfo.loadCategoryList()
          })
          this.loadBrandDefaultImg()
            .then(() => {
              this.$nextTick(() => {
                this.$refs.brandInfo.initImgFileInfo()
              })
            })
          this.$nextTick(() => {
            this.$refs.menuInfo.initMenus()
          })
        })
    } else {
      this.setEmptyBrand()
      this.loadBrandDefaultImg()
      this.$nextTick(() => {
        this.$refs.brandInfo.loadCategoryList()
      })
    }
  },
  methods: {
    ...mapActions('brand', {
      setEmptyBrand: 'setEmptyBrand',
      fetchApprovalBrand: 'fetchApprovalBrand',
      setBrandId: 'setBrandId',
      setBrandDefaultImg: 'setBrandDefaultImg'
    }),
    unLoadEvent: function (event) {
      if (!this.modified) return

      event.preventDefault()
      event.returnValue = ''
    },
    prevStep() {
      if (this.curStep > 1) this.curStep--
    },
    nextStep() {
      if (this.curStep <= 2) this.curStep++
    },
    setModified() {
      this.modified = true
    },
    changeBrandinfo(data) {
      this.brandInfo = data
    },
    save() {
      let reqData = {
        corpId: this.$store.state.user.corpId,
        ...this.$store.getters['brand/getBrandDetail'],
        //curTab: feedInfoData.curTab,
        //initFeedItem: feedInfoData.initFeedItem,
        aprvRet: 'SAVED'
      }

      let formData = new FormData()
      formData.append('data', JSON.stringify(reqData))
      formData.append('bgImgFile', this.brandFile.bgImgFile)
      formData.append('profileImgFile', this.brandFile.profileImgFile)

      // if (!this.agreeCheckFlag) {
      //   this.$alertMsg('필수 동의를 확인해 주세요.')
      //   return
      // }
      createBrand(formData)
        .then(res => {
          this.$alertMsg('입력하신 정보가 임시저장 되었습니다.')

          // 임시저장된 brandId 세팅
          const brandId = res.result.brandId
          this.setBrandId(brandId)
          //this.$refs.brandInfo.methods.setBrandId(brandId)
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    loadBrandDefaultImg() {
      return brandDefaultImg()
        .then(res => {
          if (res.code === '20000000') {
            if (!jglib.isEmpty(res.result)) {
              let jsonArray = JSON.parse(res.result)
              this.setBrandDefaultImg(jsonArray)
            }
          }
        })
    }
  }
}
</script>
