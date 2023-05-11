<template>
  <div class="online">
    <div class="online-title__wrap--top">
      <PageTitle pagetitle="온라인 문의" />
      <PageTitleH3 titleh3="문의정보" noticeinfo="필수 입력값" />
    </div>
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
                    <Dropdown :options="dropdownOptions" placeholder="선택해 주세요." v-model="form.inquirevalue"/>
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
                      <div class="file-choice__title">
                        <input type="file" id="fileUp" class="input blind" @change="fileChangeCheck">
                        <label for="fileUp" class="btn btn-default-line">파일선택</label>
                      </div>
                      <el-upload
                        class="file-upload"
                        drag
                        action
                        :on-change="handleChange"
                        :auto-upload="false"
                        multiple
                        v-if="fileList.length < 1"
                        >
                        <span class="file-upload__text">마우스로 파일을 끌어다 놓으세요.</span>
                      </el-upload>
                      <ul class="file-choice__result" v-if="fileList.length > 0" >
                        <li v-for="(file, i) in fileList" :key="i">
                          {{ file.name }}
                          (
                          <em class="file_size">{{ file.size }}</em>
                          )
                          <button class="btn-file--del" @click="deleteFile(i)"><span>삭제</span></button>
                        </li>
                      </ul>
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
    <div class="online-title__wrap--top">
      <PageTitleH3 titleh3="회원정보" noticeinfo="필수 입력값" />
    </div>
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
      <div class="agree__wrap privacy">
        <h3 class="agree__title">약관동의</h3>
        <p class="agree__title-sub">개인정보 수집 및 이용 안내 (필수)</p>
        <div class="agree__item">
          <div class="agree__box">
            <div class="terms">
              <p class="terms__text">문의 내용 접수 및 처리, 결과 회신을 위하여 최소한의 개인정보를 수집합니다.</p>
              <br>
              <p class="terms__text">수집항목 : 이름, 휴대폰번호, 이메일주소</p>
              <p class="terms__text">보유기간 : 문의 접수 후 3년</p>
            </div>
          </div>
        </div>
        <div class="checkbox">
            <input type="checkbox" id="delegate" value="form.delegate"/>
            <label for="delegate"><span class="checkbox__text">개인정보 수집 및 이용에 동의합니다.</span></label>
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
      >목록</ButtonCmp>
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
        inquirevalue: '',
        inquiretitle: '',
        inquirecont: '',
        membername: '',
        memberphone: '',
        membermail: ''
      },
      dropdownOptions: [
        {
          label: '가입',
          value: 'opt1'
        },
        {
          label: '서비스 관리',
          value: 'opt2'
        },
        {
          label: '브랜드 관리',
          value: 'opt3'
        },
        {
          label: '대화방 관리',
          value: 'opt4'
        },
        {
          label: '탬플릿 관리',
          value: 'opt5'
        },
        {
          label: '자동응답 관리',
          value: 'opt6'
        },
        {
          label: '브랜드 소식 관리',
          value: 'opt7'
        }
      ],
      inquirevalueErrorMsg: false,
      inquiretitleErrorMsg: false,
      inquirecontErrorMsg: false,
      membernameErrorMsg: false,
      memberphoneErrorMsg: false,
      membermailErrorMsg: false,
      files: '',
      filesName: '',
      filesName2: '',
      isModalViewed: false,
      fileList: []
    }
  },
  watch: {
    fileList() {
      this.handleChangeFileList()
    }
  },
  methods: {
    onSubmit () {
      if (this.form.inquirevalue === '') {
        this.inquirevalueErrorMsg = true
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
    handleChange(file, fileList) {
      this.fileList.push(file)
    },
    fileChangeCheck(e) {
      let file = e.target.files[0]
      this.fileList.push(file)
    },
    deleteFile(index) {
      this.fileList.splice(index, 1)
    },
    handleChangeFileList() {
      this.$emit('change', this.fileList)
    }
  }
}
</script>
