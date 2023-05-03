<template>
  <div>
    <v-jsoneditor
      ref="jsoneditor"
      v-model="jsonData"
      height="636px"
      :plus="false"
      :options="jsonEditorOptions"
    ></v-jsoneditor>
  </div>
</template>

<script>
import VJsoneditor from 'v-jsoneditor'
import refData from '../js/messageBaseFormRefData'
import comlib from '../js/common.js'
export default {
  name: '',
  components: {
    VJsoneditor
  },
  props: {
    data: {
      type: Object,
      default() {
        return {
          cardSpec: '', // 규격 - openrichcard / richcard
          cardType: '', // 양식종류 (openrichcard) - description / cell / free, 메시지 타입 (richcard) - standalone text / standalone media / carousel
          mediaPos: '', // 미디어 위치 (richcard-media) - top(vertical) / left(horizontal)
          cardWidth: '', // 카드 가로크기(richcard-carousel) - medium(MEDUIM_WIDTH), samll(SMALL_WIDTH)
          mediaHeight: '', // 미디어 높이(richcard-mediaTop && carousel) - tall(TALL_HEIGHT), medium(MEDIUM_HEIGHT), short(SHORT_HEIGHT)
          cardCount: '' // 카드 장수(richcard-carousel) - 2장 ~ 10장
        }
      }
    }
  },
  data() {
    return {
      jsonData: {},
      jsonEditorOptions: {
        mode: 'code',
        mainMenuBar: false
      }
    }
  },
  computed: {
    mediaHeight() {
      let ref = this.getRef('mediaHeight')
      if (!ref || !ref.$ref) {
        return ''
      }
      let mediaHeight = this.getDefinition(ref.$ref)
      return comlib.isEmpty(mediaHeight) ? '' : mediaHeight
    },
    isStandaloneMediaTop() {
      if (
        this.data.cardSpec === 'richcard' &&
        this.data.messageType === 'standaloneMedia' &&
        this.data.mediaPosition === 'top'
      ) {
        return true
      }
      return false
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.init()
        this.$refs.jsoneditor.destroyView()
        this.$refs.jsoneditor.initView()
      }
    },
    jsonData() {
      this.$emit('change', this.jsonData)
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      this.jsonData = {}
      // this.jsonData = refData.properties
      _.clone(this.jsonData, refData.properties)
      if (refData.nextKey && !!this.data[refData.nextKey]) {
        this.setJsonData(refData.nextKey)
      }
    },
    setJsonData(nextKey) {
      // 다음 키 값의 데이터를 세팅한다.
      let ref = this.getRef(nextKey)
      if (!ref) {
        console.error('not found matched reference')
        return false
      }

      let definition = this.getDefinition(ref.$ref)
      if (!definition) {
        console.error('not found matched definition', ref.$ref)
        return false
      }

      if (!definition.addType || definition.addType === 'set') {
        let jsonData = JSON.parse(JSON.stringify(this.jsonData))
        _.set(jsonData, definition.position, definition.properties)

        if (this.isStandaloneMediaTop) {
          jsonData = JSON.parse(
            JSON.stringify(jsonData)
              .split('|##|mediaHeight|##|')
              .join(this.mediaHeight)
          )
        }
        this.jsonData = jsonData

        if (definition.nextKey && definition.nextKey.length > 0) {
          for (let nk of definition.nextKey) {
            if (this.data[nk]) {
              this.setJsonData(nk)
            }
          }
        }
      } else if (definition.addType === 'insert') {
        this.insertItemToJsonData(definition)
      } else {
        this.appendItemToJsonData(definition)
      }
    },
    getRef(key) {
      // Standalone 이고 SMS인 경우
      if (
        key === 'cardType' &&
        this.data[key] === 'SA' &&
        this.data.productCd === 'S'
      ) {
        return refData.relatives[key]['SASMS']
      } else {
        return refData.relatives[key][this.data[key]] || refData.relatives[key]
      }
    },
    getDefinition(ref) {
      if (!ref) {
        return false
      }

      if (ref.indexOf('#/definitions') !== 0) {
        console.error('wrong format ref in relatives')
        return false
      }
      let refs = ref.split('/')
      refs.splice(0, 1)

      let def = refData
      for (let key of refs) {
        def = def[key]
      }
      return def
    },
    insertItemToJsonData(definition) {
      let positionData = _.get(this.jsonData, definition.position)
      let keys = Object.keys(definition.properties)
      for (let key of keys) {
        positionData[key] = definition.properties[key]
      }
    },
    appendItemToJsonData(definition) {
      let items = []
      _.set(this.jsonData, definition.position, items)
      for (let i = 0; i < this.data.cardCount; i++) {
        let propString = JSON.stringify(definition.properties)
        propString = propString.split('|##|count|##|').join(i + 1)
        propString = propString
          .split('|##|mediaHeight|##|')
          .join(this.mediaHeight.properties.height)
        items.push(JSON.parse(propString))
      }
      _.set(this.jsonData, definition.position, items)
    }
  }
}
</script>

<style>
</style>
