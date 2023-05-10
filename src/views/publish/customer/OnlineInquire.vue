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
                    <div class="select">
                      <select name="" id="selectValue" v-model="form.inquirevalue">
                        <option value="1">가입</option>
                        <option value="2">서비스 관리</option>
                        <option value="3">브랜드 관리</option>
                        <option value="4">대화방 관리</option>
                        <option value="5">탬플릿 관리</option>
                        <option value="6">자동응답 관리</option>
                        <option value="7">브랜드 소식 관리</option>
                      </select>
                    </div>
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
                    <label class="btn btn-default-line">파일선택</label>
                    <el-upload
                      class="upload-demo"
                      drag
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList"
                      multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                      <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
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

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    ModalView
  },
  data() {
    return {
      form: {
        inquirevalue: '',
        inquiretitle: '',
        inquirecont: '',
        certificate: '',
        certificateFile: '',
        biztype: '',
        bizevent: '',
        postcode: '',
        addr1: '',
        addr2: '',
        service: [],
        serviceRange: [],
        agency: ''
      },
      inquirevalueErrorMsg: false,
      inquiretitleErrorMsg: false,
      inquirecontErrorMsg: false
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
      if (this.form.biztype === '') {
        this.biztypeErrorMsg = true
        return
      }
      if (this.form.bizevent === '') {
        this.bizeventErrorMsg = true
        return
      }
      if (this.form.postcode === '' || this.form.addr1 === '' || this.form.addr2 === '') {
        this.postcodeErrorMsg = true
        return
      }
      if (!this.form.service.length) {
        this.serviceErrorMsg = true
        return
      }
      if (this.form.agency === '') {
        this.agencyErrorMsg = true
      }
    },
    closeModal () {
      this.isModalViewed = false
      this.isAgencyModal = false
    },
    onFileChoice (e) {
      const files = e.target.files
      this.files = files
      const filesName = files[0].name
      this.filesName = filesName
    }
  }
}
</script>
