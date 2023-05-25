d<template>
  <div class="join">
    <PageTitle pagetitle="개인정보 관리" />
    <PageTitleH3 titleh3="내 계정 정보" noticeinfo="필수 입력값" />
    <form  ref="form" :model="form">
        <div class="table__wrap">
          <table class="table table-bodyonly form-table">
            <colgroup>
              <col width="200px">
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
                <th scope="row"><span class="form-item__label required">이름</span></th>
                <td colspan="3">
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input"><input type="text" class="input" value="홍길동" placeholder="이름을 입력해주세요." v-model="form.name"></span>
                      </div>
                      <p class="guide-text error" v-if="nameErrorMsg">이름을 입력해주세요.</p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">휴대폰(관리자)</span></th>
                <td colspan="3">
                    <div class="form-item__content">
                        <div class="form-item-row">
                            <div class="input-item">
                                <span class="input"><input type="text" class="input" value="010-1234-5678" disabled v-model="form.phone"></span>
                                <ButtonCmp
                                    type="btn-default-line"
                                    @click="phoneCertificate"
                                >
                                휴대폰 번호 변경
                                </ButtonCmp>
                            </div>
                            <p class="guide-text black">※ 휴대폰번호 변경 시 본인인증은 필수입니다.</p>
                            <p class="guide-text error" v-if="phoneErrorMsg">휴대폰 번호를 입력해주세요.</p>
                        </div>
                    </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">휴대폰(담당자)</span></th>
                <td colspan="3">
                  <div class="form-item__content">
                      <div class="form-item-row agency-phone"
                        v-for="(manage, index) in manageList"
                        :key="index"
                      >
                      <div class="input-item">
                        <span class="inpun-item__title">이름</span>
                        <span class="input">
                          <input type="text" class="input" placeholder="이름을 입력해주세요.">
                        </span>
                      </div>
                      <div class="input-item">
                        <span class="inpun-item__title">휴대폰 번호</span>
                        <span class="input">
                          <input type="text" class="input" placeholder="‘-’없이 숫자만 입력해주세요.">
                        </span>
                      </div>
                        <ButtonCmp
                          type="btn-default-line"
                          size="small"
                          @click="removeManager"
                        >
                        삭제
                        </ButtonCmp>
                      </div>
                      <ButtonCmp
                        type="btn-default-line"
                        size="small"
                        @click="AddManager"
                      >
                      추가
                      </ButtonCmp>
                      <p class="guide-text black">&middot; 대행사 관리를 위한 추가 사용자를 최대10개 등록할 수 있습니다.</p>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">담당자 이메일</span></th>
                <td colspan="3">
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input"><input type="text" class="input" placeholder="담당자 이메일을 입력해주세요."   v-model="form.email"></span>
                      </div>
                    </div>
                    <p class="guide-text error" v-if="emailErrorMsg">담당자 이메일을 입력해주세요.</p>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">담당자 연락처</span></th>
                <td>
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input"><input type="text" class="input" placeholder="‘-’없이 자리 숫자만 입력해주세요."   v-model="form.tel"></span>
                      </div>
                    </div>
                    <p class="guide-text error" v-if="telErrorMsg">전화번호 이메일을 입력해주세요.</p>
                  </div>
                </td>
                <th scope="row"><span class="form-item__label">내선번호</span></th>
                <td class="align--top">
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                        <span class="input"><input type="text" class="input" placeholder="내선번호를 입력해주세요."   v-model="form.extNum"></span>
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
      <PageTitleH3 titleh3="서비스정보 입력" noticeinfo="필수 입력값" />
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
                        <ButtonCmp
                                type="btn-default-line"
                            >
                            API KEY 재발급
                        </ButtonCmp>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">API Client IP</span></th>
                <td>
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item ip">
                        <span class="input"><input type="text" class="input" v-model="form.ip" placeholder="단일 IP 주소 입력"></span>
                        <span class="input"><input type="text" class="input" v-model="form.ipName" placeholder="항목명"></span>
                        <ButtonCmp
                          type="btn-default-line"
                          size="small"
                        >
                        삭제
                        </ButtonCmp>
                      </div>
                      <div class="input-item ip">
                        <span class="input"><input type="text" class="input" v-model="form.ip" placeholder="단일 IP 주소 입력"></span>
                        <span class="input"><input type="text" class="input" v-model="form.ipName" placeholder="항목명"></span>
                        <ButtonCmp
                          type="btn-default-line"
                          size="small"
                        >
                        삭제
                        </ButtonCmp>
                      </div>
                      <div class="input-item ip">
                        <span class="input"><input type="text" class="input" v-model="form.ip" placeholder="단일 IP 주소 입력"></span>
                        <span class="input"><input type="text" class="input" v-model="form.ipName" placeholder="항목명"></span>
                        <ButtonCmp
                          type="btn-default-line"
                          size="small"
                        >
                        삭제
                        </ButtonCmp>
                      </div>
                      <ButtonCmp
                        type="btn-default-line"
                        size="small"
                      >
                      추가
                      </ButtonCmp>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">Agency Key</span></th>
                <td>
                  <div class="form-item__content">
                    <div class="form-item-row agency-key">
                      <div class="input-item">
                        <table class="inner-table">
                          <tbody>
                            <tr>
                              <td>
                                <span class="flag-progress">동기화 완료</span>
                              </td>
                              <td><span class="text">AK.TxMIxUI1s20cgR5</span></td>
                              <td><span class="text">2022. 03. 30</span></td>
                              <td><span class="text">15:40:08</span></td>
                              <td><span class="text">system</span></td>
                              <td><ButtonCmp
                                    type="btn-default-line"
                                      >
                                      Agency Key 삭제
                                  </ButtonCmp>
                                  <ButtonCmp
                                      type="btn-only-icon"
                                      iconname="icon-tooltip"
                                  ><span class="irtext">설명</span>
                                  </ButtonCmp>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span class="flag-progress">동기화 완료</span>
                              </td>
                              <td><span class="text">AK.TxMIxUI1s20cgR5</span></td>
                              <td><span class="text">2022. 03. 30</span></td>
                              <td><span class="text">15:40:08</span></td>
                              <td><span class="text">system</span></td>
                              <td><ButtonCmp
                                    type="btn-default-line"
                                      >
                                      Agency Key 재발급
                                  </ButtonCmp>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p class="guide-text">※ Biz RCS 메시지 발송 시 필요한 대행사별 특수키입니다. 보안을 위해 외부에 노출되지 않도록 유의하세요.</p>
                      <p class="guide-text">※ Biz RCS 메시지 신규 보안 정책 적용 시 최초 발송 대행사는 반드시 Agency Key를 삽입하여 발송해야 합니다.</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
      <div class="button__wrap">
        <ButtonCmp
          type="btn-line"
        >취소</ButtonCmp>
        <router-link
          class="btn btn-blue-line"
        >기업정보 관리</router-link>
        <ButtonCmp
          type="btn-blue"
          @click="onSubmit"
        >저장</ButtonCmp>
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
        email: '',
        tel: '',
        extNum: ''
      },
      nameErrorMsg: false,
      phoneErrorMsg: false,
      emailErrorMsg: false,
      telErrorMsg: false,
      manageList: [
        {
          name: '홍길동',
          phone: '010-1234-5678'
        }
      ]
    }
  },
  methods: {
    onSubmit () {
      if (this.form.name === '') {
        this.nameErrorMsg = true
        return
      }
      if (this.form.phone === '') {
        this.phoneErrorMsg = true
        return
      }
      if (this.form.email === '') {
        this.emailErrorMsg = true
        return
      }
      if (this.form.tel === '') {
        this.telErrorMsg = true
        // return
      }
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
