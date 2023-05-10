<template>
  <div class="online">
    <PageTitle pagetitle="온라인 문의" />
    <PageTitleH3 titleh3="문의정보" noticeinfo="필수 입력값" />
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="200px">
            <col />
          </colgroup>
          <tbody>
            <!-- 문의유형 / select -->
            <tr>
              <th scope="row"><span class="form-item__label required">문의유형</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <Dropdown :options=dropdownOptions />
                  </div>
                  <p class="guide-text error" v-if="inquirevalueErrorMsg">문의 유형을 선택해주세요.</p>
                </div>
              </td>
            </tr>
            <!-- 문의 제목 / text -->
            <tr class="limit-area">
              <th scope="row"><span class="form-item__label required">문의 제목</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item input-limit">
                      <span class="input">
                        <input type="text" class="input" maxlength="40" placeholder="문의 제목을 입력해주세요." v-model="form.inquiretitle">
                        <p class="input-limit__text">
                          {{ form.inquiretitle.length }}/40자
                        </p>
                      </span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="inquiretitleErrorMsg">문의 제목을 입력해주세요.</p>
                </div>
              </td>
            </tr>
            <!-- 문의 내용 / textarea -->
            <tr>
              <th scope="row"><span class="form-item__label required">문의 내용</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item input-limit">
                      <div class="textarea">
                        <textarea maxlength="1000" placeholder="문의 내용을 입력해주세요." v-model="form.inquirecont"></textarea>
                        <div class="textarea-limit__text">
                          <p>
                            {{ form.inquirecont.length }}/1000자
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="inquirecontErrorMsg">문의 내용을 입력해주세요.</p>
                </div>
              </td>
            </tr>
            <!-- 파일 선택 -->
            <tr>
              <th scope="row"><span class="form-item__label">파일첨부</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="file-choice">
                      <input type="file" id="fileUp" class="input" @change="fileChoice">
                      <label for="fileUp" class="btn btn-default-line">파일선택</label>
                      <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        multiple>
                        <div class="el-upload__text">Drop file here or </div>
                      </el-upload>
                    </div>
                  </div>
                  <p class="guide-text black">&middot; 이미지 용량: 최대 50MB</p>
                  <p class="guide-text black">&middot; 파일종류: JPG, PNG, TIFF, PDF, DOC, PPT, PPTX, XLS, XLSX, HWP</p>
                  <p class="guide-text black">&middot; 최대 5개까지 첨부 가능합니다.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <PageTitleH3 titleh3="회원정보" noticeinfo="필수 입력값" />
    <!-- 회원정보 -->
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="200px">
            <col />
          </colgroup>
          <tbody>
            <!-- 이름 -->
            <tr>
              <th scope="row"><span class="form-item__label required">이름</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <span class="input"><input type="text" class="input" placeholder="이름을 입력해 주세요." v-model="form.membername"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="membernameErrorMsg">이름을 입력해주세요.</p>
                </div>
              </td>
            </tr>
            <!-- 휴대폰 -->
            <tr>
              <th scope="row"><span class="form-item__label required">휴대폰 번호</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <span class="input"><input type="text" class="input" placeholder="휴대폰 번호를 입력해주세요." v-model="form.memberphone"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="memberphoneErrorMsg">휴대폰 번호를 입력해주세요.</p>
                </div>
              </td>
            </tr>
            <!-- 이메일 -->
            <tr>
              <th scope="row"><span class="form-item__label required">이메일</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <span class="input"><input type="text" class="input" placeholder="이메일을 입력해주세요." v-model="form.membermail"></span>
                    </div>
                  </div>
                  <p class="guide-text">※ 문의에 대한 답변을 받을 수 있도록 이메일을 정확히 입력해 주세요.</p>
                  <p class="guide-text error" v-if="membermailErrorMsg">이메일을 입력해주세요.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <form  ref="form" :model="form">
      <div class="agree__wrap">
        <h3 class="agree__title">약관동의</h3>
        <div class="agree__item">
          <div class="checkbox">
            <input type="checkbox" id="chkAll" value="form.agreeAll"/>
            <label for="chkAll"><span class="checkbox__text">대행사 회원가입 약관에 모두 확인, 동의합니다.</span></label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="service" value="form.serviceAgree"/>
            <label for="service"><span class="checkbox__text">서비스 이용약관 (필수)</span></label>
          </div>
          <div class="agree__box">
            <div class="terms">
              <p class="terms__h1">제 1 장 총 칙</p>
              <p class="terms__h2">제 1조 목적</p>
              <p class="terms__text">본 서비스 약관은 주식회사 케이티, 주식회사 에스케이텔레콤, 주식회사 엘지유플러스(이하”이동통신3사”라 한다)가 제공하는 RCS Biz Center 서비스 (이하 "서비스"라 합니다)를 이용함에 있어 필요한 서비스 이용조건 및 절차 등 기타 제반사항을 규정함을 목적으로 합니다.</p>

              <p class="terms__h2">제 2조 약관의 효력 및 변경</p>
              <p class="terms__text">① 본 약관은 서비스를 이용하고자 하는 모든 “회원”에 대하여 그 효력을 발생합니다.</p>
              <p class="terms__text">② 본 약관의 내용은 “서비스” 화면에 게시하거나 기타의 방법으로 “회원”에게 공지하고, 이에 동의한 “회원”이 “서비스”에 가입함으로써 효력이 발생합니다.</p>
            </div>
          </div>
        </div>
        <div class="agree__item">
          <div class="checkbox">
            <input type="checkbox" id="delegate" value="form.delegate"/>
            <label for="delegate"><span class="checkbox__text">신청 위임 동의 (필수)</span></label>
          </div>
          <div class="agree__box">
            <div class="terms">
              <p class="terms__text">신청자는 기업을 대리하는 자로서 권한 부여 및 등록을 요청합니다. 또한 신청자의 업무처리로 인해 발생하는 모든 책임은 당사자에게 있음을 확인합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="button__wrap">
      <ButtonCmp
        type="btn-blue-line"
      >취소</ButtonCmp>
      <ButtonCmp
        type="btn-blue"
        @click="onSubmit"
      >다음</ButtonCmp>
    </div>
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
        <CertificateMsg @closeModal="isModalViewed = false" status="ing"/>
        <!-- 기 가입자일 경우 done, 진행 중인 경우는 ing  -->
    </ModalView>

    <ModalView
      v-if="isAgencyModal" @closeModal="isAgencyModal = false"
    >
        <AgencyCheckMsg @closeModal="isAgencyModal = false"/>
    </ModalView>
    <!-- 중개사 url 정보 입력 확인 팝업 호출 시점 기획 확인 필요-->
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import Dropdown from '@/components/common/Dropdown.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    ModalView,
    Dropdown
  },
  data() {
    return {
      form: {
        inquiretitle: '',
        inquirecont: '',
        membername: '',
        memberphone: '',
        membermail: ''
      },
      dropdownOptions: ['선택하세요', '가입', '서비스 관리', '브랜드 관리', '대화방 관리', '탬플릿 관리', '자동응답 관리', '브랜드 소식 관리'],
      inquirevalueErrorMsg: false,
      inquiretitleErrorMsg: false,
      inquirecontErrorMsg: false,
      membernameErrorMsg: false,
      memberphoneErrorMsg: false,
      membermailErrorMsg: false,
      files: '',
      filesName: '',
      filesName2: '',
      isModalViewed: false
    }
  },
  methods: {
    onSubmit () {
      if (this.dropdownOptions[0] !== '가입') {
        this.inquirevalueErrorMsg = true
        console.log(this.dropdownOptions[0])
        return
      }
      if (this.form.inquiretitle === '') {
        this.inquiretitleErrorMsg = true
        return
      }
      if (this.form.inquirecont === '') {
        this.inquirecontErrorMsg = true
        return
      }
      if (this.form.membername === '') {
        this.membernameErrorMsg = true
        return
      }
      if (this.form.memberphone === '') {
        this.memberphoneErrorMsg = true
        return
      }
      if (this.form.membermail === '') {
        this.membermailErrorMsg = true
      }
    },
    closeModal () {
      this.isModalViewed = false
      this.isAgencyModal = false
    },
    fileChoice (e) {
      const files = e.target.files
      this.files = files
      const filesName = files[0].name
      this.filesName = filesName
    }
  }
}
</script>
