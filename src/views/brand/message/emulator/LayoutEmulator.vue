<template>
  <div class="chat-emulator__wrap layout">
    <div class="chat-emulator">
      <div class="emulator-layout-body">
        <draggable
          class="component-list"
          :list="cmpList"
          group="comp"
          handle=".btn-drag"
          :class="{'preview': showPreview}"
        >
          <template v-for="(item, i) in cmpList">
            <div class="component-item"
              :key="i"
              :class="[{'inactive' : !item.isActive }, {'active': item.isActive}]"
              v-if="!(!item.componentName && (isEdit || showPreview))"
              @click="cmpActive(item)"
            >
              <div class="component-item__box" v-if="!item.componentName">
                <p class="default-message">컴포넌트 선택해주세요.</p>
              </div>
              <div class="component-item__box" v-else>
                <img :src="item.iconImgFileUrl" />
              </div>
              <div class="cmp-ctrl" v-if="isEdit">
                <ButtonCmp
                  type="btn-only-icon"
                  iconname='icon-delete'
                  class="btn-delete"
                  @click="removeCmpItem(i)"
                ><span class="irtext">삭제</span>
                </ButtonCmp>
                <ButtonCmp
                  type="btn-only-icon"
                  iconname='icon-drag'
                  class="btn-drag"
                ><span class="irtext">드래그</span>
                </ButtonCmp>
              </div>
            </div>
          </template>
        </draggable>
        <button class="btn-add"
          @click="addCmpItem"
          v-if="!(showPreview || isEdit || viewMode) && cmpList.length < compoLimit"
        >
          +<span class="irtext">추가</span>
        </button>
      </div>
    </div>
    <template v-if="!viewMode">
      <div class="button__wrap" v-if="!showPreview && !isEdit">
        <ButtonCmp
          type="btn-blue-line"
          @click="EditCmpList"

        >편집</ButtonCmp>
        <ButtonCmp
          type="btn-blue-line"
          @click="preview"
        >미리보기</ButtonCmp>
      </div>
      <div class="button__wrap" v-if="isEdit">
        <ButtonCmp
          type="btn-line"
          @click="cancleEditCmpList"
        >취소</ButtonCmp>
        <ButtonCmp
          type="btn-blue-line"
          @click="cancleEditCmpList"
        >저장</ButtonCmp>
      </div>
      <div class="button__wrap" v-if="showPreview">
        <ButtonCmp
          type="btn-blue-line"
          @click="cancleEditCmpList"
        >닫기</ButtonCmp>
      </div>
    </template>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import draggable from 'vuedraggable'

export default {
  components: {
    ButtonCmp,
    draggable
  },
  props: {
    cmpList: {
      type: Array,
      default: null
    },
    compoLimit: {
      type: Number,
      default: null
    },
    viewMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isEdit: false,
      showPreview: false
    }
  },
  methods: {
    addCmpItem() {

      let cmpItem = {
        componentId: '',
        componentName: '',
        iconImgFileUrl: '',
        headerYn: '',
        bodyYn: '',
        footerYn: '',
        isActive: false
      }

      this.cmpList.push(cmpItem)
    },
    EditCmpList() {
      this.isEdit = true
    },
    cancleEditCmpList() {
      this.isEdit = false
      this.showPreview = false
    },
    removeCmpItem(idx) {
      this.cmpList.splice(idx, 1)
    },
    preview() {
      this.showPreview = true
    },
    cmpActive(cmp) {
      this.cmpList.forEach((item) => {
        item.isActive = false
      })
      cmp.isActive = true
    }
  }
}
</script>
