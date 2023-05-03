<template>
  <div class="claim_wrap">
    <!-- 클릭시 안내 이미지 팝업 출력 -->
    <button v-if="vocCate1.code !== 'ETC'" id="btn-modal" class="ico-info" @click="toggleGuidePopup('on')"><span>정보</span></button>
    <!-- 상단 안내 문구 -->
    <p>{{ vocCate1.code === 'ETC' ? '' : '수정이 필요한 항목을 선택해주세요.' }}</p>
    <!-- 기타 사유 입력란 -->
    <div v-if="vocCate1.code === 'ETC'" class="etc">
      <!-- 300자 제한은 임시 -->
      <p class="count"><span>{{ desc.length }}</span>/300</p>
      <textarea v-model="desc" @input="e => desc = e.target.value" cols="50" rows="10" maxLength="300"
        :placeholder="`※ 수신 문자 및 브랜드가 제공하는 서비스와 관련된 요청은 해당 브랜드로 문의해주세요.\n※ 잘못된 수정 제안으로 인해 브랜드와 다른 사용자들이 피해 받지 않도록, 신중하게 작성해주세요.`"></textarea>
    </div>
    <!-- 사유 선택 -->
    <div v-else class="multi-accordion">
      <details v-for="(dep2, idx) in codeDep2" :key="idx" @click="chgVocCateCd2(dep2)">
        <summary>{{ dep2.codeNm }}</summary>
        <p class="accordion-sub wrapCheck">
          <span v-for="dep3 in dep2.subList" :key="dep3.code">
            <input :id="dep3.code" type="checkbox" :checked="dep3.code === vocCateCd3" @click="chgVocCateCd3(dep3)"/>
            <label :for="dep3.code">
              <span>{{ dep3.codeNm }}</span>
            </label>
          </span>
        </p>
      </details>
      <ul>
        <li>수신 문자 및 브랜드가 제공하는 서비스와 관련된 요청은 해당 브랜드로 문의해주세요.</li>
        <li>잘못된 수정 제안으로 인해 브랜드와 다른 사용자들이 피해 받지 않도록, 신중하게 작성해주세요.</li>
      </ul>
    </div>
    <!-- 이미지 안내 팝업 -->
    <div id="modal" class="modal-overlay" @click="toggleGuidePopup('off')">
      <div class="modal-window">
        <div class="close-area" @click="toggleGuidePopup('off')"><span>close</span></div>
        <div class="content Landscape1" v-if="vocCate1.code === 'BRAND'">
          <img v-if="screenOrientation === 'portrait'" src="@/assets/image/mobile/guide_01.png"  class="img_portrait"/>
          <img v-else src="@/assets/image/mobile/guide_01.png"  class="img_landscape"/>
        </div>
        <div class="content" v-if="vocCate1.code === 'CHATBOT'">
          <img v-if="screenOrientation === 'portrait'" src="@/assets/image/mobile/guide_02.png" class="img_portrait"/>
          <img v-else src="@/assets/image/mobile/guide_02_landscape.png" class="img_landscape"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { retrieveCommonCode } from '@/api/common/code'
export default {
  name: 'BrandClaimStep2',
  props: {
    vocCate1: {
      type: Object
    }
  },
  data() {
    return {
      codeDep2: [],
      vocCateCd2: '',
      vocCateCd3: '',
      desc: '',
      guideSrc: '',
      screenOrientation: ''
    }
  },
  watch: {
    desc() {
      this.$emit('updateData', { desc: this.desc })
    }
  },
  created() {
    this.setCode()
    window.scrollTo(0, 0)
    let self = this
    window.addEventListener('resize', function() { self.screenOrientation = screen.orientation.type.split('-')[0] })
  },
  methods: {
    async setCode () {
      let list = await retrieveCommonCode('VOC_CATE_2D', this.vocCate1.code)
      this.codeDep2 = await Promise.all(
        list.result.map(async x => {
          let res = await retrieveCommonCode('VOC_CATE_3D', x.code)
          let subList = res.result.map(c => { return { code: c.code, codeNm: c.codeNm } })
          return { code: x.code, codeNm: x.codeNm, subList: subList }
        })
      )
      store.dispatch('SetLoading', false)
    },
    chgVocCateCd2(code) {
      this.vocCateCd2 = code.code
      document.querySelectorAll('details').forEach(item => {
        item.addEventListener('toggle', event => {
          let toggled = event.target
          if (toggled.attributes.open) {
            document.querySelectorAll('details[open]').forEach(opened => {
              // 나머지 다른 열린 아이템을 닫음
              if (toggled !== opened) {
                // 현재 열려있는 요소가 아니면: 열림 속성 삭제
                opened.removeAttribute('open')
              }
            })
          }
        })
      })
    },
    chgVocCateCd3(code) {
      if (this.vocCateCd3 === code.code) {
        this.vocCateCd3 = ''
        this.desc = ''
      } else {
        this.vocCateCd3 = code.code
        this.desc = code.codeNm
      }
      this.$emit('updateData', { vocCateCd2: this.vocCateCd2, vocCateCd3: this.vocCateCd3, desc: this.desc })
    },
    toggleGuidePopup(type) {
      this.screenOrientation = screen.orientation.type.split('-')[0]
      let modal = document.getElementById('modal')
      if (type === 'on') modal.style.display = 'flex'
      else modal.style.display = 'none'
    }
  }
}
</script>
