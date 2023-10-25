<template>
  <div class="tmep__wrap">
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>table 에 대한 기본 정의 내용 입니다.</li>
        </ul>
      </div>
    </div>
    <TitleH3 titleh3="THEAD TYPE" />
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>모든 테이블은 div .table__wrap 안에 위치 </li>
          <li>.table table-list 클래스 기본 사용</li>
          <li>
            - scss 파일 tableCommon + tableListType mixin 사용
          </li>
        </ul>
      </div>
    </div>
    <div class="table__wrap">
      <table class="table table-list">
        <thead>
          <tr>
            <th scope="col">이름</th>
            <th scope="col">이름</th>
            <th scope="col">이름</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>이름</td>
            <td>이름</td>
            <td>이름</td>
          </tr>
        </tbody>
      </table>
    </div>
    <TitleH3 titleh3="TBODY TYPE" />
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>.table table-bodyonly 클래스 기본 사용</li>
          <li>- scss 파일 tableCommon + tableBodyType mixin 사용</li>
          <li>- 기본 클래스 : .table table-bodyonly 에서는 last-child : {border-btm : 0}</li>
          <li>- 추가 클래스 : .table table-bodyonly btm-line_box 에서는 last-child : {border-btm : 2px}</li>
        </ul>
      </div>
    </div>
    <div class="table__wrap">
      <table class="table table-bodyonly btm-line_box">
        <colgroup>
          <col width="200px">
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">이름</th>
            <td>이름</td>
          </tr>
          <tr>
            <th scope="row">휴대폰 번호</th>
            <td>이름</td>
          </tr>
          <tr>
            <th scope="row">주소</th>
            <td>이름</td>
          </tr>
        </tbody>
      </table>
    </div>
    <TitleH3 titleh3="THEAD FIXED TYPE" />
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>.table table-list 클래스 기본 사용 + 이중클래스 fixed-thead_table table-different</li>
          <li>
            -모달 창 안에 있는 THEAD FIXED TYPE인 경우 :
            <ul>
              <li>- .modal__content--inner 클래스 + 이중클래스 y-visible dashboard_modal 사용</li>
              <li>- .table table-list 클래스 기본 사용 + 이중클래스 fixed-thead_table 사용 </li>
              <li>
                <ButtonCmp
                  type="btn-blue"
                  size="small"
                  @click="theadFixedModal"
                >
                  모달창 안 스크롤 테이블 클릭
                </ButtonCmp>
                <ModalView
                  v-if="isModalViewed" @closeModal="isModalViewed = false, theadFixedModal = false"
                >
                  <div
                    class="modal__content--inner y-visible dashboard_modal"
                  >
                    <div class="modal__content--body_fixed-table">
                      <div class="table__wrap">
                        <table class="table table-list fixed-thead_table">
                          <thead>
                            <tr>
                              <th scope="col" style="width: 10%;">
                                <span class="checkbox">
                                  <input type="checkbox" id="all" @change="checkAll"/>
                                  <label for="all"></label>
                                </span>
                              </th>
                              <th scope="col" style="width: 15%;"><span class="no-before">권한</span></th>
                              <th scope="col" style="width: 30%;"><span>이름</span></th>
                              <th scope="col" style="width: 45%;"><span>이메일</span></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item,i) in theadFixedList" :key="i">
                              <td style="width: 10%;">
                                <span class="checkbox">
                                  <input type="checkbox" :id="`item${i+1}`" :value="`item${i+1}`" v-model="checkList" >
                                  <label :for="`item${i+1}`"></label>
                                </span>
                              </td>
                              <td style="width: 15%;"><span>{{item.authority}}</span></td>
                              <td style="width: 30%;"><span class="text-ellipsis-wd">{{ item.UserNm}}</span></td>
                              <td style="width: 45%;"><span class="text-ellipsis-wd">{{ item.email }}</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="modal__content--footer">
                      <div class="button__wrap">
                        <ButtonCmp
                          type="btn-line"
                          @click="closeMsg"
                        >취소</ButtonCmp>
                      </div>
                    </div>
                  </div>
                </ModalView>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="table__wrap">
      <table class="table table-list fixed-thead_table table-different">
        <thead>
          <tr>
            <th scope="col">이름</th>
            <th scope="col">이름</th>
            <th scope="col">이름</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>이름</td>
            <td>이름</td>
            <td>이름</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>이름</td>
            <td>이름</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>이름</td>
            <td>이름</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>이름</td>
            <td>이름</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>이름</td>
            <td>이름</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>이름</td>
            <td>이름</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>이름</td>
            <td>이름</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>이름</td>
            <td>이름</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>이름</td>
            <td>이름</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>이름</td>
            <td>이름</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TitleH3 from '../cmp/TitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'

export default {
  components: {
    TitleH3,
    ButtonCmp,
    ModalView
  },
  data() {
    return {
      isModalViewed: false,
      isAllChecked: false,
      checkList: [],
      theadFixedList: [
        { authority: '매니저', UserNm: '김가네', email: 'abc@gmail.com' },
        { authority: '마스터', UserNm: '홍길동', email: 'qqqGnaver.com' },
        { authority: '매니저', UserNm: '정가네', email: 'def@gmail.com' },
        { authority: '마스터', UserNm: '유가네', email: 'ghi@gmail.com' },
        { authority: '마스터', UserNm: '장가네', email: 'jkl@gmail.com' },
        { authority: '매니저', UserNm: '윤가네', email: 'nmo@gmail.com' },
        { authority: '매니저', UserNm: '김가네', email: 'abc@gmail.com' },
        { authority: '마스터', UserNm: '홍길동', email: 'qqqGnaver.com' },
        { authority: '매니저', UserNm: '정가네', email: 'def@gmail.com' },
        { authority: '마스터', UserNm: '유가네', email: 'ghi@gmail.com' },
        { authority: '마스터', UserNm: '장가네', email: 'jkl@gmail.com' },
        { authority: '매니저', UserNm: '윤가네', email: 'nmo@gmail.com' },
        { authority: '매니저', UserNm: '김가네', email: 'abc@gmail.com' },
        { authority: '마스터', UserNm: '홍길동', email: 'qqqGnaver.com' },
        { authority: '매니저', UserNm: '정가네', email: 'def@gmail.com' },
        { authority: '마스터', UserNm: '유가네', email: 'ghi@gmail.com' },
        { authority: '마스터', UserNm: '장가네', email: 'jkl@gmail.com' },
        { authority: '매니저', UserNm: '윤가네', email: 'nmo@gmail.com' },
        { authority: '매니저', UserNm: '김가네', email: 'abc@gmail.com' },
        { authority: '마스터', UserNm: '홍길동', email: 'qqqGnaver.com' },
        { authority: '매니저', UserNm: '정가네', email: 'def@gmail.com' },
        { authority: '마스터', UserNm: '유가네', email: 'ghi@gmail.com' },
        { authority: '마스터', UserNm: '장가네', email: 'jkl@gmail.com' },
        { authority: '매니저', UserNm: '윤가네', email: 'nmo@gmail.com' },
        { authority: '매니저', UserNm: '김가네', email: 'abc@gmail.com' },
        { authority: '마스터', UserNm: '홍길동', email: 'qqqGnaver.com' },
        { authority: '매니저', UserNm: '정가네', email: 'def@gmail.com' },
        { authority: '마스터', UserNm: '유가네', email: 'ghi@gmail.com' },
        { authority: '마스터', UserNm: '장가네', email: 'jkl@gmail.com' },
        { authority: '매니저', UserNm: '윤가네', email: 'nmo@gmail.com' }
      ]
    }
  },
  methods: {
    theadFixedModal () {
      this.isModalViewed = true
    },
    checkAll() {
      if (!this.isAllChecked) {
        this.checkList = []
        for (let j = 0; j < this.theadFixedList.length; j++) {
          let num = j + 1
          if (!this.theadFixedList[j].disabled) {
            this.checkList.push(`item${num}`)
          }
        }
        this.isAllChecked = true
      } else { // 선택해제
        this.checkList = []
        this.isAllChecked = false
      }
    },
    closeMsg () {
      this.isModalViewed = false
    }
  }
}
</script>

<style lang="scss">
.tmep__wrap {
    width: 100%;
    height: 100%;
  .table__wrap {
    margin: 20px 0;
  }
}
</style>
