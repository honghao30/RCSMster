<!-- 0620: 추가 된 페이지 대행사_개인정보 관리 -->
<template>
  <div class="join">
    <PageTitle pagetitle="개인정보 관리" />
    <PageTitleH3 titleh3="내 계정 정보" />
    <form ref="form" :model="form">
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
                    <span class="text">CX Hub</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">계정정보</span></th>
              <td colspan="3">
                <div class="form-item__content">
                  <div class="form-item-row">
                    <span class="text">대행사</span>
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
              <th scope="row"><span class="form-item__label">휴대폰(관리자)</span></th>
              <td colspan="3">
                  <div class="form-item__content">
                      <div class="form-item-row">
                          <!-- 기획서 v1.0 수정 - 이름 추가 -->
                          <div class="input-item input-list">
                            <span class="text input-list__title">{{ form.name }}</span>
                            <span class="text">{{ form.phone }}</span>
                          </div>
                      </div>
                  </div>
              </td>
            </tr>
            <tr> <!-- 기획서 v1.0 수정 - 스타일 삭제 -->
              <th scope="row"><span class="form-item__label">휴대폰(담당자)</span></th>
              <td colspan="3">
                <div class="form-item__content">
                    <div class="form-item-row agency-phone"
                      v-for="(manager, index) in manageList"
                      :key="index"
                    >
                    <template v-if="manager.num != null">
                      <div class="input-item input-list">
                        <span class="text input-list__title">{{ manager.name }}</span>
                        <span class="text">{{ manager.phone }}</span>
                      </div>
                    </template>
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
    <PageTitleH3 titleh3="서비스 정보 입력" />
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="200px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label">API KEY</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item justify">
                      <span class="text">SK.U2OEo9pOzelDe0T</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">API Client IP</span></th>
              <td>
                <div class="form-item__content">
                    <div class="form-item-row agency-phone"
                      v-for="(api, index) in apiList"
                      :key="index"
                    >
                    <template v-if="api.num != null">
                      <div class="input-item input-list">
                        <span class="text input-list__title">{{ api.ip }}</span>
                        <span class="text">{{ api.name }}</span>
                      </div>
                    </template>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">Agency Key</span></th>
              <td>
                <div class="form-item__content">
                  <!-- 기획서 v1.0 수정 - 구조변경 -->
                  <div class="form-item-row">
                    <div class="input-item agency-key">
                      <span class="flag-progress">동기화 완료</span>
                      <span class="text">AK.TxMIxUI1s20cgR5</span>
                      <span class="text">2022. 03. 30</span>
                      <span class="text">15:40:08</span>
                      <span class="text">system</span>
                    </div>
                    <div class="input-item agency-key">
                      <span class="flag-progress">동기화 완료</span>
                      <span class="text">AK.TxMIxUI1s20cgR5</span>
                      <span class="text">2022. 03. 30</span>
                      <span class="text">15:40:08</span>
                      <span class="text">system</span>
                    </div>
                  </div>
                </div>
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
          :disabled="!isDisabled"
          @click="onSubmit"
        >수정</ButtonCmp>
      </div>
    </div>
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <CertificateMsg @closeModal="isModalViewed = false" />
    </ModalView>
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
      },
      nameErrorMsg: false,
      phoneErrorMsg: false,
      emailErrorMsg: false,
      telErrorMsg: false,
      manageList: [
        {
          num: 1,
          name: '홍길동',
          phone: '010-1234-5678'
        },
        {
          num: 1,
          name: '이길동',
          phone: '010-1234-5678'
        },
        {
          num: 1,
          name: '최길동',
          phone: '010-1234-5678'
        }
      ],
      apiList: [
        {
          num: 1,
          ip: '121.134.127.195',
          name: '항목 명_001'
        },
        {
          num: 2,
          ip: '121.134.127.195',
          name: '항목 명_001'
        },
        {
          num: 3,
          ip: '121.134.127.195',
          name: '항목 명_001'
        }
      ]
    }
  },
  computed: {
    isDisabled() {
      return this.checkedAgreement1 === true
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
    },
    AddManager () {
      if (this.manageList.length < 10) {
        this.manageList.push({})
      }
    },
    removeManager (index) {
      this.manageList.splice(index, 1)
    }
  }
}
</script>
