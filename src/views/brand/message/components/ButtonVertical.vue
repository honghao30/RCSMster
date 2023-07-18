<template>
  <tr>
    <td colspan="2" class="inner-table">
      <div class="table__wrap cmp-inner">
        <table class="table table-bodyonly form-table">
          <colgroup>
              <col width="180px">
              <col />
            </colgroup>
            <tbody>
              <tr v-for="(button,index) in form.Buttons.info" :key="index">
                <th scope="row"><span class="form-item__label">버튼{{ index + 1 }} </span></th>
                <td>
                <TemplateButtonReg
                :buttonInfo="button"
                />
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">버튼색 </span></th>
                <td>
                  <!-- 버튼 칼라 -->
                  <div class="form-item-row">
                      <div class="input-item brand-color-select">
                        <span class="radiobox">
                          <input type="radio" name="bgColor" id="defaultColor" value="#2f77fb"/>
                          <label for="defaultColor">기본색</label>
                        </span>
                        <span class="radiobox">
                          <input type="radio" name="bgColor" id="brandColor" disabled value="#70AD47" />
                          <label for="brandColor">브랜드색 (
                            <router-link to="#">
                            브랜드 색 설정
                          </router-link> )</label>
                        </span>
                      </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </td>
    </tr>
</template>

<script>
import TemplateButtonReg from '@/views/brand/message/components/TemplateButtonReg.vue'

export default { 
  components: {
    TemplateButtonReg
  },
  props: {
    info: {
      type: Object
    }
  },
  data() {
    return {
      form:{
        Buttons: {
                  use: 'N',
                  info: [{
                    id: 1,
                    bgColor: '#2f77fb',
                    btnEvent: 'none',
                    btnEventDropdown: '',
                    btnName: '',
                    simpleChatbot: '',
                    chatbot: '',
                    call: '',
                    copyContent: '',
                    message: {
                      call: '',
                      content: '',
                      viewSource: ''
                    },
                    map: {
                      latitude: '',
                      longitude: '',
                      location: '',
                      url: '',
                      query: ''
                    },
                    calendar: {
                      date: '',
                      title: '',
                      content: ''
                    },
                    browser: {
                      url: '',
                      viewMode: ''
                    }
                  },
                  {
                    id: 2,
                    bgColor: '#2f77fb',
                    btnEvent: 'none',
                    btnEventDropdown: '',
                    btnName: '',
                    simpleChatbot: '',
                    chatbot: '',
                    call: '',
                    copyContent: '',
                    message: {
                      call: '',
                      content: '',
                      viewSource: ''
                    },
                    map: {
                      latitude: '',
                      longitude: '',
                      location: '',
                      url: '',
                      query: ''
                    },
                    calendar: {
                      date: '',
                      title: '',
                      content: ''
                    },
                    browser: {
                      url: '',
                      viewMode: ''
                    }
                  }]
                }
            }
      }
  },
  methods: {
    
  }
}
</script>
<style>

</style>
