<!-- 0620: 추가 된 페이지 매니저,마스터_개인정보 관리 (기존 MyInfo.vue -> MyInfoEdit.vue)-->
<template>
  <div class="join">
    <PageTitle pagetitle="개인정보 관리" />
    <PageTitleH3 titleh3="내 계정 정보" />
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="230px">
            <col />
            <col width="85px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label">아이디</span></th>
              <td colspan="3">
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="text">CX Hub</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">계정정보</span></th>
              <td colspan="3">
                <div class="form-item__content">
                  <div class="form-item-row">
                  <!-- 0620: 디자인 1차 수정 - 마스터,매니저 부분 추가 -->
                    <!-- 마스터일 때 -->
                    <div class="input-item">
                      <span class="text">마스터</span>
                    </div>
                    <!-- 매니저일 때 -->
                    <div class="input-item">
                      <span class="text">매니저</span>
                      <ButtonCmp
                        type="btn-default-line"
                      >
                      마스터 변경요청
                      </ButtonCmp>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">이름</span></th>
              <td colspan="3">
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="text">{{ form.name }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="bdBottom-bg"> <!-- 기획서 v1.0 수정 - 스타일 추가 -->
              <th scope="row"><span class="form-item__label">휴대폰 번호</span></th>
              <td colspan="3">
                  <div class="form-item__content">
                      <div class="form-item-row">
                          <div class="input-item">
                              <span class="text">{{ form.phone }}</span>
                          </div>
                      </div>
                  </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">이메일</span></th> <!-- 기획서 v1.0 수정 - 문구 수정 -->
              <td colspan="3">
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="text">{{ form.email }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">연락처</span></th> <!-- 기획서 v1.0 수정 - 문구 수정 -->
              <td colspan="3">
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="text">{{ form.tel }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">비밀번호 변경</span></th>
              <td colspan="3">
                <router-link
                  to="/pwchange"
                  class="btn btn-default-line"
                >
                  <span>비밀번호 변경</span>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <div class="button__wrap flex-end">
      <ButtonCmp
        @click="goMemberWithdraw"
        type="btn-line medium"
      >회원 탈퇴</ButtonCmp>
    </div>
    <div class="button__wrap space-between">
      <ButtonCmp
        type="btn-line"
      >취소</ButtonCmp>
      <div class="button__wrap button__left">
        <ButtonCmp
          type="btn btn-line"
          @click="corpInfo"
        >비즈니스 정보 관리</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="onSubmit"
        >수정</ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3
  },
  data() {
    return {
      form: {
        name: '홍길동',
        phone: '010-1234-5678',
        email: 'hahahaha123456@the-51.com',
        tel: '010-1234-5678'
      }
    }
  },
  methods: {
    onSubmit () {
      this.$router.push('./MyInfoEdit')
    },
    corpInfo () {
      this.$router.push('./CorpInfo')
    },
    goMemberWithdraw () {
      this.$router.push('./withdrawal')
    }
  }
}
</script>
