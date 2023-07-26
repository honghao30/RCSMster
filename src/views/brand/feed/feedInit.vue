<template>
  <div class="brand__wrap brand__feed">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 알림 등록" />
        <div class="feed__wrap">
          <div class="feed__inner">
            <form  ref="form" :model="form">
              <div class="table__wrap no-line">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px">
                    <col />
                  </colgroup>
                  <tbody>
                    <tr class="no-line">
                      <th scope="row"><span class="form-item__label">영업정보</span></th>
                      <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <!-- 기획서 v1.0 수정 --- 순서 변경-->
                                <span class="radiobox">
                                  <input type="radio" id="noticeUseY" name="notice" value="Y" v-model="form.useYn" ><label for="noticeUseY">사용</label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" id="noticeUseN" name="notice" value="N" v-model="form.useYn"><label for="noticeUseN">미사용</label>
                                </span>
                                <!-- // 기획서 v1.0 수정 -->
                              </div>
                            </div>
                          </div>
                          <template v-if="form.useYn === 'Y'">
                             <div class="feed-detail__wrap">
                                <div class="form-item__content is-emoji">
                                  <div class="form-item-row">
                                    <div class="input-item input-limit">
                                      <span class="form-item__label required">제목</span>
                                      <div class="input">
                                        <input type="text" class="input" maxlength="12" placeholder="알림 제목을 입력해주세요."  @input="e => form.title = e.target.value" v-model="form.title" ref="title">
                                        <div class="input-limit__text">
                                          <Emoji @input="onSelectEmoji($event, 'title')"/>
                                          <p>{{ form.title.length }}/12자</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                    <p class="guide-text error" v-if="brandTitleErrorMsg">알림 제목을 입력해주세요.</p>
                                </div>
                                <div class="form-item__content is-emoji">
                                  <div class="form-item-row">
                                    <div class="input-item input-limit">
                                      <span class="form-item__label required">내용</span>
                                      <div class="textarea feed__textarea" >
                                        <textarea maxlength="150" placeholder="알림 내용을 입력해주세요."   @input="e => form.content = e.target.value" v-model="form.content" ref="content"></textarea>
                                        <div class="textarea-limit__text">
                                          <Emoji @input="onSelectEmoji($event, 'content')"/>
                                          <p>
                                            {{ form.content.length }}/200자
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="guide-text error" v-if="brandContentErrorMsg">알림 내용을 입력해주세요.</p>
                                </div>
                                <div class="feed-temple-opener">
                                  <button
                                    class="btn-brandTip"
                                    @click=onBrandTip
                                    type="button"
                                    :class="{open: isOpen}"
                                  >
                                    알림판 작성 가이드
                                  </button>
                                </div>
                             </div>
                          </template>
                          <!-- 기획서 v1.0 수정 --- 추가-->
                      </td>
                    </tr>
                    <!-- //기획서 v1.0 수정 --- 추가-->
                  </tbody>
                </table>
              </div>
               <!-- 기획서 v1.0 수정 --- 추가-->
              <div class="feed-write__wrap--guide" v-if="form.useYn === 'Y'">
                <div class="brand-tip__wrap" v-if="isOpen">
                  <ul class="brand-tip__box">
                    <li>
                      <h5>1. 영업시간 안내</h5>
                      <div class="brand-tip__example">
                        <strong>영업시간 안내</strong>
                        <p>월~금 : 10:30 ~ 20:00 <br />
                          주말 및 공휴일은 휴무입니다.</p>
                      </div>
                      <ButtonCmp
                        type="btn-blue-line small"
                        @click=brandTip1
                      >적용</ButtonCmp>
                    </li>
                    <li>
                      <h5>2. 임시휴무 안내</h5>
                      <div class="brand-tip__example">
                        <strong>1월 23일 임시휴무 안내</strong>
                        <p>내부 인테리어로 임시휴무입니다. <br />
                          더 산뜻하게 다시 모시겠습니다!</p>
                      </div>
                      <ButtonCmp
                        type="btn-blue-line small"
                        @click=brandTip2
                      >적용</ButtonCmp>
                    </li>
                    <li>
                      <h5>3. 강조하고 싶은 내용 인재</h5>
                      <div class="brand-tip__example">
                        <strong>출시기념!</strong>
                        <p>단 7일간! 이 메시지를 보여주시는 <br />
                          분들께만 10% 할인!</p>
                      </div>
                      <ButtonCmp
                        type="btn-blue-line small"
                        @click=brandTip3
                      >적용</ButtonCmp>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
          <div class="brand-aside sticky">
            <BrandEmulator :brandData="brandDetail" curTab="feed" :feedData="form"/>
          </div>
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
            type="btn-blue"
            @click="onSubmit"
            :disabled="this.form.useYn.length < 1"
          >
          저장
        </ButtonCmp>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import BrandEmulator from '@/views/brand/components/BrandEmulator.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
import { mapActions, mapGetters } from 'vuex'
import jglib from '@/utils/jglib'
import { brandDefaultImg } from '@/api/service/service'
import { editAlimpan, getAlimpan } from '@/api/feed/feed'

export default {
  components: {
    BrandLnb,
    BrandEmulator,
    PageTitle,
    ButtonCmp,
    Emoji
  },
  data () {
    return {
      isAllChecked: false,
      notice: '[]',
      isBtnDisabled: true,
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
        useYn: 'N',
        title: '',
        content: ''
      },
      emojiCode: '',
      isOpen: true,
      noticeUse: false,
      brandTitleErrorMsg: false,
      brandContentErrorMsg: false
    }
  },
  computed: {
    ...mapGetters('brand', {
      brandDetail: 'getBrandDetail'
    })
  },
  mounted() {
    this.brandId = this.$route.params.brandId
    this.fetchApprovalBrand({ brandId: this.brandId })
      .then(() => {
        this.loadBrandDefaultImg()
      })
      .catch(err => {
        this.$alertMsg(err.desc)
        if (err.code === '64498') {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
      })
    this.getInit()
  },
  methods: {
    ...mapActions('brand', {
      fetchApprovalBrand: 'fetchApprovalBrand',
      setBrandDefaultImg: 'setBrandDefaultImg'
    }),
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
    },
    getInit() {
      getAlimpan(this.brandId).then((res) => {
        this.form.useYn = (res.result.alimpanYn === 'Y') ? 'Y' : 'N'
        this.form.title = res.result.alimpanTitle
        this.form.content = res.result.alimpanDesc
      })
    },
    onSubmit () {
      if (this.form.useYn === 'Y') {
        if (this.form.title === '') {
          this.brandTitleErrorMsg = true
          return false
        }
        if (this.form.content === '') {
          this.brandContentErrorMsg = true
          return false
        }
      }
      // 알림판 정보 등록
      let param = {
        brandId: this.brandId,
        alimpanYn: this.form.useYn,
        alimpanTitle: this.form.title,
        alimpanDesc: this.form.content
      }
      editAlimpan(this.brandId, param).then((res) => {
        this.$alertMsg('저장 되었습니다.')
      })
    },
    onBrandTip () {
      this.isOpen = !this.isOpen
    },
    brandTip1 () {
      this.form.title = '영업시간 안내'
      this.form.content = '월~금 : 10:30 ~ 20:00 주말 및 공휴일은 휴무입니다.'
    },
    brandTip2 () {
      this.form.title = '1월 23일 임시휴무 안내'
      this.form.content = '내부 인테리어로 임시휴무입니다. 더 산뜻하게 다시 모시겠습니다!'
    },
    brandTip3 () {
      this.form.title = '출시기념!'
      this.form.content = '단 7일간! 이 메시지를 보여주시는 분들께만 10% 할인!'
    },
    loadBrandDefaultImg() {
      return brandDefaultImg().then(res => {
        if (res.code === '20000000') {
          if (!jglib.isEmpty(res.result)) {
            let jsonArray = JSON.parse(res.result)
            this.setBrandDefaultImg(jsonArray)
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
