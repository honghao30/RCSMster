<template>
  <div v-if="showNotice">
    <div v-for="(content, index) in contents" :key="index">
      <div class="layer midd mainlayer active" style="overflow: auto; overscroll-behavior: none;" v-if="content.show" :style="content.style" @click="setPriority(content.seq)">
        <div class="layer_cont">
          <div class="layer_cont_wrap">
            <div class="layer_head line">
              <h2>{{content.subject}}</h2>
            </div>
            <div class="layer_body">
              <div class="layer_scroll">
                <div class="template_guide">
                  <div class="notice_message" v-html="content.ctn"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="layer_foot">
            <span class="custom_checkbox"><input type="checkbox" :id="'checkbox' + content.seq" v-model="content.checkToday"><label :for="'checkbox' + content.seq">오늘 하루 더 이상 열지 않기</label></span>
            <a :id="'btn_close' + content.seq" href="javascript:void(0)" @click="hide(index)" class="btn_close"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPopupNotice } from '@/api/cs/notice'

export default {
  name: 'NoticePopup',
  data() {
    return {
      showNotice: false,
      contents: []
    }
  },
  created() {
    this.show()
  },
  mounted() {},
  methods: {
    show() {
      getPopupNotice().then(res => {
        const results = res.result
        let index = 0
        if (results && Array.isArray(results)) {
          results.reverse().forEach(result => {
            const cookiename = `rcsbizNotice_${result.seq}`
            if (document.cookie.indexOf(`${cookiename}=donotshow`) < 0) {
              // 오늘 하루 안보기 이외의 팝업들을 추출한다.
              // 우측에서 좌측으로 팝업들을 띄운다. (좌측이 최근 팝업)
              result.checkToday = false
              result.order = index + 1
              result.left = 'left: ' + (58 - (index++ * 10)) + '%;'
              result.style = result.left + 'z-index:' + (result.order * 100)
              result.show = true
              this.contents.push(result)
            }
          })
          this.contents.reverse().forEach((result, index) => {
            // 가장 최근(가장 좌측) 팝업부터 순서를 정해둔다.
            result.order = index + 1
          })
          this.showNotice = true
        }
      })
    },
    hide(index) {
      const content = this.contents[index]
      if (content.checkToday) {
        const cookiename = `rcsbizNotice_${content.seq}`
        this.setCookie(cookiename, 'donotshow')
      }
      content.show = false
      if (this.contents.filter(f => f.show).length === 0) {
        this.showNotice = false
      }
    },
    setCookie(name, value) {
      let todayDate = new Date()
      todayDate.setDate(todayDate.getDate() + 1)
      todayDate.setHours(0, 0, 0, 0)

      document.cookie = name + '=' + escape(value) + '; path=/; expires=' + todayDate.toGMTString() + ';'
    },
    setPriority(seq) {
      const current = this.contents.find(content => content.seq === seq) // 선택된 팝업
      const currentOrder = current.order // 선택된 팝업의 기존 순서
      // 현재 선택된 팝업이 첫번째가 아닌 경우
      if (current.order !== 1) {
        this.contents.forEach((content, index) => {
          // 기존 팝업의 순서보다 낮은 팝업들의 순서를 1씩 증가시킨다.
          if (currentOrder > content.order) {
            content.order = content.order + 1
          }
          // 선택된 팝업의 순서를 첫번째로 설정한다.
          if (current.seq === content.seq) {
            content.order = 1
          }
          content.style = content.left + 'z-index:' + (this.contents.length - content.order + 1) * 100
        })
      }
    }
  }
}
</script>
