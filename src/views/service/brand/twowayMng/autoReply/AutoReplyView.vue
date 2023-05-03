<template>
  <div style="width: 880px;">
    <!-- group 1 -->
    <div>
      <div class="rcs_item_bundle">
        <strong class="rcs_tit_bundle p-l0">상태</strong>
        <div class="rcs_cont_bundle">
          <span>{{ autoReply.aprvRetNm }}</span>
        </div>
      </div>
      <div class="rcs_item_bundle">
        <strong class="rcs_tit_bundle p-l0">자동응답 메시지 명</strong>
        <div class="rcs_cont_bundle">
          <span>{{ autoReply.name }}</span>
        </div>
      </div>
      <div class="rcs_item_bundle">
        <strong class="rcs_tit_bundle p-l0">자동응답 ID</strong>
        <div class="rcs_cont_bundle">
          <span>{{ autoReply.armId }}</span>
        </div>
      </div>
      <div class="rcs_item_bundle">
        <strong class="rcs_tit_bundle p-l0">템플릿</strong>
        <div class="rcs_cont_bundle">
          <span>{{ autoReply.tplNm }}</span>
        </div>
      </div>
    </div>
    <!-- group2 -->
    <div v-if="autoReplyTemplate.maxCardCnt > 1">
      <div class="rcs_item_bundle">
        <strong class="rcs_tit_bundle p-l0"></strong>
        <div class="rcs_cont_bundle">
          <ul style="display: flex; column-gap: 8px;">
            <li v-for="idx in autoReplyTemplate.maxCardCnt" :key="`btnCard_${idx}`" @click="selectCardTab(idx - 1)" style="display: inline-block">
              <a href="javascript:void(0)" class="btn sml" :class="autoReplySelectedCardIdx === (idx - 1) ? 'black' : 'bd_black'">카드 {{ idx }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- group 3 -->
    <div v-if="autoReplyTemplate.maxCardCnt >= 1">
      <div v-for="(card, idx) in autoReplyTemplate.maxCardCnt" :key="`card_${idx}`" v-show="autoReplySelectedCardIdx === idx">
        <div class="rcs_item_bundle" v-if="autoReplyTemplate.maxMediaSize > 0">
          <strong class="rcs_tit_bundle p-l0">이미지</strong>
          <div class="rcs_cont_bundle">
            {{ autoReply.cardData[idx].fileName || '-' }}
          </div>
        </div>
        <div class="rcs_item_bundle" v-if="autoReplyTemplate.maxTitleSize > 0">
          <strong class="rcs_tit_bundle p-l0">제목</strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">
              <input type="text" v-model="autoReply.cardData[idx].title" disabled />
            </span>
          </div>
        </div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">본문</strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input custom_textarea w670">
              <textarea type="text" v-model="autoReply.cardData[idx].description" disabled/>
            </span>
          </div>
        </div>
        <!-- 버튼 -->
        <auto-reply-button-suggestion
          v-if="autoReplyTemplate.btnUseYn === 'Y'"
          :ref="'button'+idx"
          :buttonUseYn="autoReply.cardData[idx].buttonUseYn"
          :templateInfo="autoReplyTemplate"
          :jsonCardData="autoReply.cardData[idx]"
          :isNewbie="false" :isModify="false"/><!-- v-if="idx < autoReplyTemplate.maxBtnCnt" -->
      </div>
    </div>
    <!-- gruop 4 -->
    <div>
      <div class="rcs_item_bundle">
        <auto-reply-chip-list-suggestion ref="chips"
          :templateInfo.sync="autoReplyTemplate"
          :autoReplyData.sync="autoReply"
          :isNewbie="false"
          :isModify="false"/>
      </div>
    </div>
    <!-- 데이터 변경 이력 -->
    <div>
      <div class="rcs_item_bundle">
        <strong class="rcs_tit_bundle p-l0">등록일</strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ autoReply.dpRegDt }} / {{ autoReply.regUserNm }}</span>
          </div>
      </div>
      <!-- 마지막 수정일 ? -->
      <div class="rcs_item_bundle">
        <strong class="rcs_tit_bundle p-l0">최근수정일</strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ autoReply.dpModDt }} / {{ autoReply.modUserNm }}</span>
          </div>
      </div>
    </div>
    <!-- 버튼 영역 -->
    <div class="btn_wrap dv2023_btnspace mar_t40 full_width temWrite btn_flex first">
      <a href="javascript:void(0);" class="btn mid bd_blue" @click="goBack"><span>이전</span></a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="isSaved || isActive" @click="remove"><span>삭제</span></a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="isSaved || isActive" @click="modify"><span>수정</span></a>
      <a href="javascript:void(0);" class="btn mid blue" v-if="isSaved" @click="register"><span>등록</span></a>
    </div>
  </div>
</template>

<script>
import AutoReplyButtonSuggestion from '@/views/service/components/AutoReplyButtonSuggestion'
import AutoReplyChipListSuggestion from '@/views/service/components/AutoReplyChipListSuggestion'
import { saveAutoReply, removeAutoReply, getAutoReplySubmitData } from '@/api/service/autoReply'
export default {
  name: 'AutoReplyView',
  components: {
    AutoReplyButtonSuggestion,
    AutoReplyChipListSuggestion
  },
  props: {
    autoReply: { type: Object, default: null },
    autoReplyTemplate: { type: Object, default: null },
    autoReplySelectedCardIdx: { type: Number, default: 0 } // 선택된 카드 인덱스
  },
  data() {
    return {
      brandId: ''
    }
  },
  computed: {
    isSaved() { return this.autoReply.aprvRet === 'SAVED' },
    isActive() { return this.autoReply.aprvRet === 'OK' },
    productType() {
      if (this.autoReplyTemplate.cardType === 'CR' || this.autoReplyTemplate.cardType === 'CS') return 'carousel'
      else if (this.autoReplyTemplate.cardType === 'SM') return 'standaloneMedia'
      else return 'standalone'
    }
  },
  created() {
    this.brandId = this.$route.params.brandId
  },
  methods: {
    /** 선택 카드 변경 */
    selectCardTab(idx) {
      this.$emit('update:autoReplySelectedCardIdx', idx)
    },
    /** 이전 */
    goBack() {
      this.goList()
    },
    /** 목록으로 */
    goList() {
      this.$router.push({ name: 'AutoReplyList', params: { brandId: this.brandId } })
    },
    /** 수정 */
    modify() {
      this.$emit('update:isWrite', true)
    },
    /** 삭제 */
    remove() {
      this.$confirmMsg('자동응답 메시지를 삭제 하시겠습니까?').then(() => {
        removeAutoReply(this.brandId, this.autoReply.armId).then(res => {
          if (res.code === '20000000') this.goList()
        }).catch((err) => {
          this.$alertMsg(err.desc).then(() => {})
        })
      })
    },
    // 데이터 검증
    validation() {
      // * 저장시 필수인 항목을 제외하고 검증
      // * 상품별 필수 데이터 유무를 체크한다.
      for (let i = 0; i < this.autoReplyTemplate.maxCardCnt; i++) {
        let cardData = this.autoReply.cardData[i]
        // 1. standalone(기본 텍스트, 텍스트 카드): 본문
        if (this.productType === 'standalone') {
          if (jglib.isEmpty(cardData.description)) {
            this.$alertMsg('내용을 입력해 주세요.')
            return Promise.resolve(false)
          }
        }
        // 2. standalone media top(tall, medium): 이미지
        if (this.productType === 'standaloneMedia') {
          if (jglib.isEmpty(cardData.fileName)) {
            this.$alertMsg('이미지를 선택해 주세요.')
            return Promise.resolve(false)
          }
        }
        // 3. carousel: 이미지, 제목, 본문이 모두 입력되지 않은 경우 버튼이 입력되었는지 확인
        if (this.isCarousel) {
          if (jglib.isEmpty(cardData.fileName) && jglib.isEmpty(cardData.title) && jglib.isEmpty(cardData.description) && cardData.suggestions.length === 0) {
            this.$alertMsg(`카드 ${i + 1}의 버튼을 선택해 주세요.`)
            return Promise.resolve(false)
          }
        }
        // 4. 버튼 데이터 검증
        if (this.$refs[`button${i}`] && cardData.suggestions.length > 0) {
          if (!this.$refs[`button${i}`][0].validateData()) {
            return Promise.resolve(false)
          }
        }
        // 5. 칩 리스트 검증
        if (!this.$refs['chips'].validateData()) {
          return Promise.resolve(false)
        }
      }
      return Promise.resolve(true)
    },
    /** 등록 */
    async register() {
      if (await this.validation()) {
        this.$confirmMsg('자동응답 메시지를 등록 하시겠습니까?').then(() => {
          let armData = _.cloneDeep(this.autoReply)
          armData.status = 'APRV_NEW'
          armData.aprvRet = 'WAITING'
          let data = getAutoReplySubmitData(this.brandId, this.productType, armData, this.autoReplyTemplate)
          saveAutoReply(this.brandId, data).then(res => {
            if (res.code === '20000000') this.goList()
          }).catch((err) => {
            this.$alertMsg(err.desc).then(() => {})
          })
        })
      }
    }
  }
}
</script>

<style>

</style>
