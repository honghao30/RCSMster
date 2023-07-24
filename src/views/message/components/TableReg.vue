<template>
  <div
    class="modal__content--inner zipcode__modal "
    :class="modalsize"
  >
    <div class="modal__content--header">
      <p class="modal-title">테이블 설정</p>
    </div>
    <div class="modal__content--body">
      <div class="form-table registration-form__wrap table__wrap">
        <table class="table table-bodyonly">
          <colgroup>
            <col width="166px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label">테이블 행수</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="radiobox">
                        <input type="radio" name="tableRow" id="row5" value="5" v-model="info.row"/>
                        <label for="row5"><span class="radiobox__text">5개</span></label>
                      </span>
                      <span class="radiobox">
                        <input type="radio" name="tableRow" id="row10" v-model="info.row" value="10" />
                        <label for="row10"><span class="radiobox__text">10개</span></label>
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">1열</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="inner__input">
                      <div class="inner__input-box">
                        <span class="form-item__label">
                          정렬
                        </span>
                        <div class="inner__input-item">
                          <div class="input-item">
                            <span class="radiobox">
                              <input type="radio" name="align" value="left" id="alignLeft" v-model="info.fstRow.align"/>
                              <label for="alignLeft"><span class="radiobox__text">좌측 정렬</span></label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" name="align" value="right" id="alignRight" v-model="info.fstRow.align" />
                              <label for="alignRight"><span class="radiobox__text">우측 정렬</span></label>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-item-row">
                    <div class="inner__input">
                      <div class="inner__input-box">
                        <span class="form-item__label">
                          글자 스타일
                        </span>
                        <div class="inner__input-item">
                          <div class="input-item">
                            <span class="radiobox">
                              <input type="radio" name="fontStyle" value="regular" id="regular" v-model="info.fstRow.fontStyle"/>
                              <label for="regular"><span class="radiobox__text">레귤러</span></label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" name="fontStyle" value="bold" id="bold" v-model="info.fstRow.fontStyle"/>
                              <label for="bold"><span class="radiobox__text">볼드</span></label>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">2열</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="inner__input">
                      <div class="inner__input-box">
                        <span class="form-item__label">
                          정렬
                        </span>
                        <div class="inner__input-item">
                          <div class="input-item">
                            <span class="radiobox">
                              <input type="radio" name="align2" value="left" id="alignLeft2" v-model="info.sndRow.align" />
                              <label for="alignLeft2"><span class="radiobox__text">좌측 정렬</span></label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" name="align2" value="right" id="alignRight2" v-model="info.sndRow.align" />
                              <label for="alignRight2"><span class="radiobox__text">우측 정렬</span></label>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-item-row">
                    <div class="inner__input">
                      <div class="inner__input-box">
                        <span class="form-item__label">
                          글자 스타일
                        </span>
                        <div class="inner__input-item">
                          <div class="input-item">
                            <span class="radiobox">
                              <input type="radio" name="fontStyle2" value="regular" id="regular2" v-model="info.sndRow.fontStyle"/>
                              <label for="regular2"><span class="radiobox__text">레귤러</span></label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" name="fontStyle2" value="bold" id="bold2" v-model="info.sndRow.fontStyle" />
                              <label for="bold2"><span class="radiobox__text">볼드</span></label>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">버튼</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="radiobox">
                        <input type="radio" name="tableBtnUse" id="btnUseY" value="Y" v-model="info.btnUse"/>
                        <label for="btnUseY"><span class="radiobox__text">사용</span></label>
                      </span>
                      <span class="radiobox">
                        <input type="radio" name="tableBtnUse" id="btnUseN" v-model="info.btnUse" value="N" />
                        <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">버튼 유형</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="radiobox">
                        <input type="radio" name="tableBtnAlign" id="alignCol" value="column" v-model="info.btnAlign"/>
                        <label for="alignCol"><span class="radiobox__text">상하 버튼</span></label>
                      </span>
                      <span class="radiobox">
                        <input type="radio" name="tableBtnAlign" id="alignRow" v-model="info.btnAlign" value="Row" />
                        <label for="alignRow"><span class="radiobox__text">좌우 버튼</span></label>
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">버튼 컬러</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="radiobox">
                        <input type="radio" name="tableBtnColor" id="basicColor" value="basic" v-model="info.btnColor"/>
                        <label for="basicColor"><span class="radiobox__text">기본 컬러</span></label>
                      </span>
                      <span class="radiobox">
                        <input type="radio" name="tableBtnColor" id="brandColor" v-model="info.btnColor" value="brand" />
                        <label for="brandColor"><span class="radiobox__text">브랜드 컬러</span></label>
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="$emit('closeModal')"
        >확인</ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    ButtonCmp
  },
  props: {
    info: {
      type: Object,
      default: null
    },
    modalsize: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  mounted() {
  }

}
</script>

<style>

</style>
