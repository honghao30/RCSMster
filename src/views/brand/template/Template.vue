<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <div class="template-area">
          <div class="template-components">
            <draggable
              class="component-list"
              :list="templateComp"
              :group="{ name: 'comp', pull: 'clone', put: false }"
              :sort="false"
              @end="onEnd($event)"
              draggable=".item--draggable"
            >
              <TemplateItem
                v-for="(comp, i) in templateComp"
                :key="i"
                :type="comp.type"
                :compInfo="comp.compInfo"
                :inActive="comp.inActive"
              />
            </draggable>
          </div>

          <div class="template-preview">
            <draggable
              class="component-list"
              :list="selectedComp"
              group="comp"
              handle=".btn-drag"
            >
              <TemplateItem
                v-for="(comp, j) in selectedComp"
                :key="j"
                :compInfo="comp.compInfo"
                :type="comp.type"
                :deleteable="true"
                :draghandle="true"
                @onDelete="removeComp(j)"
                :class="'item' + (j+1)"
              />
            </draggable>
          </div>
        </div>
      </div>
      <ChatEmulator />
    </div>
  </div>
</template>
<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import draggable from 'vuedraggable'
import TemplateItem from '@/views/brand/template/components/TemplateItem.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'

export default {
  name: 'Template',
  components: {
    BrandLnb,
    draggable,
    TemplateItem,
    ChatEmulator
  },
  data () {
    return {
      dragging: false,
      selectedComp: [
      ],
      templateComp: [
        {
          id: 0,
          type: 'MainImage',
          compInfo: {
            full: true,
            imageSrc: 'dummy/template_image.png'
          },
          inActive: false
        },
        {
          id: 1,
          type: 'MainImage',
          compInfo: {
            full: true,
            imageSrc: 'dummy/template_image_02.png'
          },
          inActive: false
        },
        {
          id: 2,
          type: 'Title',
          compInfo: {
            thumSrc: 'dummy/brand_logo.png',
            displayText: 'RCS Biz Center'
          },
          inActive: false
        },
        {
          id: 3,
          type: 'Description',
          compInfo: {
            subTitle: '미리 만나는 프리썸머 페스타',
            description: '쿨~한 여름을 준비하는 아이템을 소개 합니다. 10종의 다채로운 상품을 지금 만나보세요.'
          },
          inActive: false
        },
        {
          id: 4,
          type: 'SubDescription',
          compInfo: {
            type: 'title',
            subTitle: '2주간 즐기는 프리미엄 특별혜택!',
            description: [
              {
                title: '행사기간',
                desc: '2022.07.01 ~ 2022.07.31'
              },
              {
                title: '참여대상',
                desc: '프리미엄 등급 고객'
              },
              {
                title: '제공혜택',
                desc: '22% 추가적립 + 무료배송'
              }
            ]
          },
          inActive: false
        },
        {
          id: 5,
          type: 'SubDescription',
          compInfo: {
            type: 'thum',
            subTitle: '',
            description: [
              {
                thumSrc: 'dummy/template_thum_01.png',
                desc: '달콤한 컬러의 시원한 미니 선풍기,<br>달달함은 덤!'
              },
              {
                thumSrc: 'dummy/template_thum_02.png',
                desc: '쿨링 키보드로 무더운 여름 손가락<br>끝까지 시원하게'
              }
            ]
          },
          inActive: false
        },
        {
          id: 6,
          type: 'Table',
          compInfo: {
            title: 'Q. 최대 발송 글자수?',
            description: [
              {
                tableTitle: 'SMS',
                tableText: '90자'
              },
              {
                tableTitle: 'LMS',
                tableText: '1300자'
              }
            ]
          },
          inActive: false
        },
        {
          id: 7,
          type: 'Thumnails',
          compInfo: {
            thums: [
              {

                thumSrc: 'dummy/template_image.png'
              },
              {

                thumSrc: 'dummy/template_image.png'
              },
              {

                thumSrc: 'dummy/template_image.png'
              }
            ]
          },
          inActive: false
        },
        {
          id: 8,
          type: 'Item',
          compInfo: {
            mainText: '고객 반응 120% Up',
            subText: '문자대비 고객 버튼 클릭 평균',
            thumSrc: 'dummy/template_image.png'
          }
        },
        {
          id: 9,
          type: 'Item',
          compInfo: {
            reverse: true,
            mainText: '고객 반응 120% Up',
            subText: '문자대비 고객 버튼 클릭 평균',
            thumSrc: 'dummy/template_image.png'
          },
          inActive: false
        },
        {
          id: 10,
          type: 'Notice',
          compInfo: {
            noticeText: '* RCS는 4천만 RCS 사용자를 대상으로 안드로이드 단말에서만 수신됩니다.<br>** RCS 대상이 아닌 단말은 대행사 계약 조건에 따라 fallback문자로 전달될 수 있습니다.'
          },
          inActive: false
        },
        {
          id: 11,
          type: 'Buttons',
          compInfo: {
            buttons: ['자세히 보러가기']
          },
          inActive: false
        },
        {
          id: 12,
          type: 'Buttons',
          compInfo: {
            direction: 'vertical',
            buttons: ['버튼 라벨', '버튼 라벨']
          },
          inActive: false
        },
        {
          id: 13,
          type: 'Banner',
          compInfo: {
            imageSrc: null
          },
          inActive: false
        }
      ]
    }
  },
  methods: {
    removeComp(index) {
      let prevListId = this.selectedComp[index].id
      this.selectedComp.splice(index, 1)
      this.templateComp[prevListId].inActive = false
    },
    onEnd (evt) {
      let moved = false
      let $this = this.templateComp[evt.oldIndex]
      this.selectedComp.forEach(comp => {
        if (comp.id === $this.id) {
          moved = true
        }
      })
      if (moved) {
        $this.inActive = true
      }
    }
  }
}
</script>

<style lang="scss">

</style>
