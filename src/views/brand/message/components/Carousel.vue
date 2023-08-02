<template>
  <div class="carousel">
    <div class="item-reg__wrap">
      <div class="item-reg__inner">
        <draggable
          v-model="slideData"
          class="item-reg__list"
          draggable=".item--draggable"
        >
          <div
            v-for="(slide, j) in slideData" :key="j"
            class="item"
            :class="[{'active': slide.isActive}, {'item--draggable': isSlideCardEdit}]"
            @click="slideActive(j)"

          >
            <span v-text="`템플릿${slide.slideIndex}`" class="item-text"></span>
            <ButtonCmp
              type="btn-only-icon"
              ><i class="icon-copy"></i>
            </ButtonCmp>
            <a role="button" class="btn-del" v-if="isSlideCardEdit"
            @click="removeSlide(j)"
            ><span class="blind">삭제</span></a>
          </div>
        </draggable>
        <a role="button" class="btn-add" @click="addSlide" v-if="slideData.length < 5">+<span class="blind">추가</span></a>
      </div>
      <div class="ctrl-btns">
        <ButtonCmp
          type="btn-line"
          size="small"
          @click="isSlideCardEdit = true"
          v-if="!isSlideCardEdit"
        >편집</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          size="small"
          v-if="isSlideCardEdit"
          @click="saveCardEdit"
        >저장</ButtonCmp>
      </div>
    </div>
    <template v-for="slide in slideData">
      <!-- 이미지 등록 -->
      <table class="table table-bodyonly form-table" :key="slide.slideIndex" v-if="slide.isActive">
        <colgroup>
          <col width="180px">
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row"><span class="form-item__label required">이미지</span></th>
            <td>
              <div class="form-item__content">
                <div class="form-item-row">
                  <div class="input-item">
                    <span class="input">
                      <input type="text" class="input" :value="slide.imgFile" disabled placeholder="파일찾기를 통해 이미지를 업로드하세요.">
                    </span>
                    <input type="file" id="fileUp" class="input blind"
                    @change="onFileChanged">
                    <label for="fileUp" class="btn btn-default-line">파일 찾기</label>
                  </div>
                </div>
                <p class="guide-text black">&middot; 이미지 사이즈 / 용량 : 700px * 700px, 최대 1080px * 1080px / 최대 3MB</p>
                <p class="guide-text black">&middot; 파일종류: JPG, PNG, GIF</p>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row"><span class="form-item__label required">본문 - 제목</span></th>
            <td>
              <div class="form-item__content">
                <div class="form-item-row">
                  <div class="input-item input-limit">
                    <div class="input">
                      <input type="text"
                        class="input"
                        maxlength="20"
                        @input="e => slide.title = e.target.value"
                        placeholder="제목을 입력해주세요."
                      >
                      <div class="input-limit__text">
                        <p>{{ slide.title.length }}/20자</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row"><span class="form-item__label required">본문 - 내용</span></th>
            <td>
              <div class="form-item__content">
                <div class="form-item-row">
                  <div class="input-item input-limit">
                    <div class="textarea">
                      <textarea maxlength="1300" placeholder="내용을 입력해주세요."
                      @input="e => slide.content = e.target.value"></textarea>
                      <div class="textarea-limit__text">
                        <p>
                          {{ slide.content.length }}/1,300자
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr  v-for="(button, index) in slide.buttons.info" :key="index">
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
                      <input type="radio" name="bgColor" id="defaultColor"
                      checked value="#2f77fb"/>
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
    </template>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import TemplateButtonReg from '@/views/brand/message/utils/TemplateButtonReg.vue'
export default {
  props: {
    slideData: {
      type: Array,
      default: null
    }
  },
  components: {
    draggable,
    ButtonCmp,
    TemplateButtonReg
  },
  data() {
    return {
      form: {},
      slideActiveIndex: 0,
      isSlideCardEdit: false
    }
  },
  methods: {
    // 이미지 파일 업로드
    onFileChanged (e) {
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      this.form.logoFile = fileName
      this.url = URL.createObjectURL(file)
      this.form.SelectedLogo.push(this.url)
      console.log(this.form.SelectedLogo)
    },
    // 슬라이드 선택
    slideActive(idx) {
      this.slideActiveIndex = idx
      this.slideData.forEach((slide, index) => {
        if (idx !== index) {
          slide.isActive = false
        } else {
          slide.isActive = true
        }
      })
    },
    // 슬라이드 추가
    addSlide () {
      let slide = {
        slideIndex: this.slideData.length + 1,
        title: '',
        content: '',
        isActive: true,
        imgFile: '',
        buttons: {
          use: 'Y',
          info: [{
            id: 1,
            bgColor: '',
            btnEvent: '',
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
            bgColor: '',
            btnEvent: '',
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
      this.slideData.forEach((item) => {
        item.isActive = false
      })
      this.slideData.push(slide)
    },
    // 슬라이드 삭제
    removeSlide (idx) {
      if (this.slideData.length > 1) {
        this.slideData.splice(idx, 1)
      }
      this.slideData[0].isActive = true
    },
    saveCardEdit() {
      this.slideData.forEach((slide, index) => {
        if (index === 0) {
          slide.isActive = true
        } else {
          slide.isActive = false
        }
      })
      this.isSlideCardEdit = false
    }
  }

}
</script>
