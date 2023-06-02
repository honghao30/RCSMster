<template>
  <div class="brand__wrap brand__feed">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 기본 소식 등록" />
        <div class="feed__wrap">
          <div class="feed__inner">
            <PageTitleH3 titleh3="알림판 정보"/>
            <form  ref="form" :model="form">
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px">
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><span class="form-item__label">알림</span></th>
                      <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" id="noticeUseN" name="notice" value="noticeUseN" v-model="form.notice"><label for="noticeUseN">미사용</label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" id="noticeUseY" name="notice" value="noticeUseY" v-model="form.notice"><label for="noticeUseY">사용</label>
                                </span>
                              </div>
                            </div>
                          </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label required">제목</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <span class="input">
                                  <input type="text" class="input" maxlength="20" placeholder="알림 제목을 입력해주세요." v-model="form.title">
                                  <p class="input-limit__text">
                                    {{ form.title.length }}/20자
                                  </p>
                                </span>
                              </div>
                            </div>
                              <p class="guide-text error" v-if="brandTitleErrorMsg">알림 제목을 입력해주세요.</p>
                          </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label required">내용</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="textarea feed__textarea" >
                                  <textarea maxlength="150" placeholder="알림 내용을 입력해주세요." v-model="form.content"></textarea>
                                  <div class="textarea-limit__text">
                                    <p>
                                      {{ form.content.length }}/200자
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                              <p class="guide-text error" v-if="brandContentErrorMsg">알림 내용을 입력해주세요.</p>
                          </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
            <div class="notice-tip__wrap">
              <PageTitleH3 titleh3="알림 활용 Tip!"/>
              <ul class="notice-tip__box">
                <li>
                  <i class="icon-time"></i>
                  <h5>영업시간 안내</h5>
                  <p>언제든 볼 수 있는 영업시간 <br />
                    안내로 활용할 수 있습니다.</p>
                  <div class="notice-tip__example">
                    <strong>영업시간 안내</strong>
                    <p>월~금 : 10:30 ~ 20:00 <br />
                      주말 및 공휴일은 휴무입니다.</p>
                  </div>
                </li>
                <li>
                  <i class="icon-calendar"></i>
                  <h5>임시휴무 안내</h5>
                  <p>임시휴무 등 특이사항이 있을 때 <br />
                    고객에게 안내할 수 있습니다.</p>
                  <div class="notice-tip__example">
                    <strong>1월 23일 임시휴무 안내</strong>
                    <p>내부 인테리어로 임시휴무입니다. <br />
                      더 산뜻하게 다시 모시겠습니다!</p>
                  </div>
                </li>
                <li>
                  <i class="icon-pen"></i>
                  <h5>강조하고 싶은 내용 인재</h5>
                  <p>신메뉴 출시, 간단한 프로모션 등을 <br />
                    간편하게 알릴 수 있습니다.</p>
                  <div class="notice-tip__example">
                    <strong>출시기념!</strong>
                    <p>단 7일간! 이 메시지를 보여주시는 <br />
                      분들께만 10% 할인!</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="brand-aside sticky">
            <BrandEmulator :brandInfoData="brandInfoData" curTab="feed" :feedData="form"/>
          </div>
        </div>
        <div class="brand-button__wrap">
          <ButtonCmp
            type="btn-line"
            @click="isModalViewed = true"
          >
            이미지 등록 / 편집
          </ButtonCmp>
          <ButtonCmp
            type="btn-blue"
            @click="onSubmit"
          >
          저장
        </ButtonCmp>
        </div>
      </div>
    </div>
    <!-- 모달 영역 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
          @closeModal="isModalViewed = false"
        >
        <div class="msg brand-info__msg" slot="msg">
          <h3>이미지 등록/편집</h3>
          <div class="msg__file">
            <p>등록된 이미지는 드래그로 순서 변경이 가능합니다.</p>
            <div class="input-item">
              <input type="file" id="fileUp" class="input blind" @change="onFileChanged">
              <label for="fileUp" class="btn btn-line">파일찾기</label>
            </div>
          </div>
          <ul>
            <li>이미지 사이즈 / 용량 : 700px * 600px~1080px / 최대 3MB</li>
            <li>파일종류: JPG, PNG, GIF</li>
            <li>이미지는 필수 1장, 최대 10장까지 등록 가능 합니다.</li>
          </ul>
          <draggable
            v-model="fileList"
            class="file-list"
            draggable=".file--draggable"
          >
            <div
              v-for="(slide, j) in fileList" :key="j"
              class="file-item"
              :class="[{'active': slide.isActive}, {'file--draggable': isfileEdit}]"
              @click="slideActive(j)"
            >
            </div>
          </draggable>
          <div class="msg__image-container">
            <div class="msg__image-item"><p>1</p></div>
            <div class="msg__image-item"><p>2</p></div>
            <div class="msg__image-item"><p>3</p></div>
            <div class="msg__image-item"><p>4</p></div>
            <div class="msg__image-item"><p>5</p></div>
            <div class="msg__image-item"><p>6</p></div>
            <div class="msg__image-item"><p>7</p></div>
            <div class="msg__image-item"><p>8</p></div>
            <div class="msg__image-item"><p>9</p></div>
            <div class="msg__image-item"><p>10</p></div>
          </div>
        </div>
        <div class="button__wrap" slot="button">
            <ButtonCmp
            type="btn-line"
            @click="closeMsg"
            >
              취소
            </ButtonCmp>
            <ButtonCmp
            type="btn-blue"
            @click="closeMsg"
            >
              저장
            </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import BrandEmulator from '@/views/brand/components/BrandEmulator.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/brand/create/components/ConfirmMsg.vue'
import draggable from 'vuedraggable'

export default {
  components: {
    BrandLnb,
    BrandEmulator,
    PageTitle,
    PageTitleH3,
    ButtonCmp,
    ModalView,
    ConfirmMsg,
    draggable
  },
  data () {
    return {
      brandInfoData: {
        quickButton: ['chat', 'call'],
        name: '네스프레소',
        desc: '최상의 품질을 가진 환경에 긍정적인 영향을 줄수있는 커피브랜드 기업',
        bgImgFileUrl: 'dummy/brand_image.png',
        profileImgFileUrl: 'dummy/brand_logo.png',
        url: 'http://www.nespresso.com',
        email: 'contactus@nespresso.com',
        tel: '080-734-1111'
      },
      form: {
        notice: '',
        title: '',
        content: ''
      },
      fileList: ['file1', 'file2', 'file3', 'file4', 'file5', 'file6', 'file7', 'file8', 'file9', 'file10'],
      brandTitleErrorMsg: false,
      brandContentErrorMsg: false,
      isModalViewed: false
    }
  },
  methods: {
    closeModal () {
      this.isModalViewed = false
    },
    closeMsg  () {
      this.isModalViewed = false
    },
    onSubmit () {
      console.log(this.form.notice)
      if (this.form.notice === 'noticeUseY') {
        if (this.form.title === '') {
          this.brandTitleErrorMsg = true
          return
        }
        if (this.form.content === '') {
          this.brandContentErrorMsg = true
          return
        }
        this.$router.push('./FeedRegistration')
      } else {
        this.$router.push('./FeedRegistration')
      }
    }
  }
}
</script>

<style>

</style>
