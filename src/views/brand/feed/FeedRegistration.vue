<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <div class="registration__wrap">
        <PageTitle pagetitle="브랜드 소식 등록" />
        <form  ref="form" :model="form">
          <div class="table__wrap">
            <table class="table table-bodyonly form-table">
              <colgroup>
                <col width="160px">
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row"><span class="form-item__label required">타입선택</span></th>
                  <td>
                      <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="radiobox btn-type">
                                <input type="radio" name="type" id="gallery" value="gallery" v-model="type"/>
                                <label for="gallery"><span class="radiobox__text">갤러리형</span></label>
                              </span>
                              <span class="radiobox btn-type">
                                <input type="radio" name="type" id="sharing" value="sharing" v-model="type"/>
                                <label for="sharing"><span class="radiobox__text">쉐어형</span></label>
                              </span>
                              <span class="radiobox btn-type">
                                <input type="radio" name="type" id="slideView" value="slideView" v-model="type"/>
                                <label for="slideView"><span class="radiobox__text">슬라이드뷰</span></label>
                              </span>
                            </div>
                          </div>
                      </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span class="form-item__label">제목</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item input-limit">
                          <span class="input">
                            <input type="text" class="input" maxlength="40" placeholder="제목을 입력해주세요.">
                            <p class="input-limit__text">
                              /40자
                            </p>
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span class="form-item__label">내용</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item input-limit">
                          <div class="textarea">
                            <textarea maxlength="1000" placeholder="내용을 입력해주세요."></textarea>
                            <div class="textarea-limit__text">
                              <p>
                                /1000자
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="slide-drag__area" v-if="type === 'slideView'">
              <draggable @start="drag=true" @end="onEnd" v-model="slideData">
                <button v-for="(item, j) in slideData" :key="j" style="cursor:pointer" @click="slideChange(j)">{{ item }}</button>
              </draggable>
            </div>
            <table class="table table-bodyonly form-table">
              <colgroup>
                <col width="160px">
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row"><span class="form-item__label required">슬라이드유형</span></th>
                  <td>
                    <span class="text"></span>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span class="form-item__label required">연결URL</span></th>
                  <td>
                    <span class="text"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
      <div class="preview__wrap">
      <div class="preview-box">
        <div class="preview-gallery" v-if="type === 'gallery'">
          갤러리
        </div>
        <div class="preview-sharing" v-if="type === 'sharing'">
          쉐어형
        </div>
        <div class="preview-slideview" v-if="type === 'slideView'">
          <div class="preview__inner">
            <swiper
              :options="swiperOption"
              ref="mySwiper"
            >
              <swiper-slide v-for="(slide, i) in slideData" :key="i">
                <div class="description">
                  <p class="title">{{ slide }}</p>
                </div>

              </swiper-slide>
            </swiper>
            <!-- <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div> -->
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import PageTitle from '@/components/common/PageTitle.vue'
import draggable from 'vuedraggable'
import 'swiper/css/swiper.css'

export default {
  components: {
    PageTitle,
    draggable,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      type: 'gallery',
      slideData: ['슬라이드 1', '슬라이드 2', '슬라이드 3', '슬라이드 4'],
      slideActiveIndex: 0,
      swiperOption: {
        spaceBetween: 12,
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.slide-dot__btns, .swiper-pagination',
          clickable: true
          // renderBullet: function (index, className) {
          //   return '<button class="' + className + '"><span class="text">슬라이드' + (index + 1) + '</span></button>'
          // }
        }
      }
    }
  }
}
</script>

<style scoped>
.inner {background-color:#F5F5F5}
.feed {display: flex;gap: 32px}
.registration__wrap {flex: auto;background-color:#fff;}
.preview__wrap {flex: 0 0 302px;background-color:#fff;}
.swiper-slide {min-height: 200px;}
.preview__wrap {min-height: 860px;height: 100%;}
.preview-box {position:sticky;top: 120px;}
</style>
