<template>
  <!-- 템플릿 신규 -->
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'자동응답 관리'"/>
      </div>
      <brand-top active="autoReply" :brandId="brandId"></brand-top>
      <div class="contents_wrap callerid_wrap">
        <div class="title_area mar_b30">
          <h3 class="h3_title">{{procTitle}}</h3>
        </div>

        <div class="rbc_bundle_wrap auto_wrap">
          <auto-reply-write
            v-if="ready"
            :autoReplyInfo.sync="autoReplyInfo"
            :templateContentInfo.sync="templateContentInfo"
            :isNewbie.sync="isNewbie"
            :isModify.sync="isModify"
            :currCardIdx.sync="currCardIdx"
          />
          <!-- 스크롤시 자동ㄹ-->
          <auto-reply-emulator
            :autoReplyInfo.sync="autoReplyInfo"
            :templateContentInfo.sync="templateContentInfo"
            :brandInfo="brandInfo"
            :currCardIdx.sync="currCardIdx"
          />

        </div>
      </div>
    </article>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import Breadcrumb from '@/components/global/Breadcrumb'
import AutoReplyWrite from '@/views/service/components/AutoReplyWrite'
import AutoReplyEmulator from '@/views/service/components/AutoReplyEmulator'
import { retireveAutoReplyInfo, reformSuggestForView, retireveBrandInfo } from '@/api/service/autoReply'

export default {
  name: 'AutoReplyInfo',
  components: {
    BrandTop,
    Breadcrumb,
    AutoReplyWrite,
    AutoReplyEmulator
  },
  data() {
    return {
      brandId: '',
      armId: '',
      ready: false,
      isNewbie: false,
      isModify: false,
      procTitle: '',
      autoReplyInfo: {},
      templateContentInfo: {},
      currCardIdx: 0,
      brandInfo: {}
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    this.brandId = this.$route.params.brandId
    this.armId = this.$route.params.armId
    this.retireveBrandInfo()

    if (this.armId) {
      this.getAutoReplyInfo()
    } else {
      this.initAutoRelyInfo()
    }
  },
  mounted() {},
  methods: {
    retireveBrandInfo() {
      retireveBrandInfo(this.brandId).then(res => {
        this.brandInfo = res.result
        // console.log('this.brandInfo', JSON.stringify(this.brandInfo))
      })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    getAutoReplyInfo() {
      retireveAutoReplyInfo(this.brandId, this.armId)
        .then(res => {
          let result = res.result
          this.templateContentInfo = result.templateContent
          this.autoReplyInfo = reformSuggestForView(this.brandId, result.autoReply, result.templateContent)
        })
        .catch(err => {
          this.$alertMsg(err.desc).then(() => {
            if (err.code === '60000021') {
              this.$router.push({
                name: 'AutoReplyListOld',
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
    initAutoRelyInfo() {
      let json = {
        copyAllowedYn: 'Y',
        cardData: [],
        chipList: []
      }

      this.autoReplyInfo = reformSuggestForView(this.brandId, json)

      this.ready = true
      this.isNewbie = true
      this.currentProcess()
    },
    currentProcess() {
      if (this.isNewbie) {
        this.procTitle = '자동응답 등록'
      } else if (this.isModify) {
        this.procTitle = '자동응답 수정'
      } else {
        this.procTitle = '자동응답 상세'
      }
    }
  }
}
</script>
