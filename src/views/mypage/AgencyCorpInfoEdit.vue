<!-- 0620: 파일 명 변경 된 페이지 (기존 파일 명:CorpInfo.vue ) 대행사_비지니스 정보 관리 편집 -->
<!-- 0620: 모든 페이지 '기업 정보' -> '비지니스 정보' 로 수정 -->
<template>
  <div class="join">
    <PageTitle pagetitle="비즈니스 정보 관리" />
    <!-- 0620: 디자인 1차 수정 - top-progress-area 수정 -->
    <div class="top-progress-area">
      <!-- 승인완료 -->
      <span class="flag-progress done">승인완료</span>
    </div>
    <PageTitleH3 titleh3="비지니스 정보"/>
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
        <!-- 0620: 디자인 1차 수정 - colgroup width값 수정 -->
          <colgroup>
            <col width="230px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label required">사업자등록번호</span></th>
              <td>
                  <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="text">{{ form.certificate }}</span>
                        </div>
                      </div>
                  </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">사업자등록증</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <!-- 0620: 디자인 1차 수정 - 'input-info' class명 추가 -->
                      <span class="input input-info"><input type="text" class="input" :value="filesName" disabled></span>
                      <input type="file" id="fileUp" class="input">
                      <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                    </div>
                  </div>
                  <p class="guide-text black">&bull; 사업자등록증을 변경하는 경우 재 승인을 받아야 합니다.</p>
                  <p class="guide-text black">&bull; 사업자등록증이 없는 경우 사업자등록증명 또는 고유번호증을 등록해주세요.</p>
                  <p class="guide-text black">&bull; 비영리법인/국가기관인 경우 고유번호증을 등록해주세요.</p>
                  <p class="guide-text black">&bull; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">법인명(단체명)</span></th>
              <td>
                <span class="text">{{ form.companyname }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">업태</span></th>
              <td>
                <span class="text">{{ form.biztype }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">종목</span></th>
              <td>
                <span class="text">{{ form.bizevent }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">기업주소</span></th>
              <td>
                <span class="text">{{ form.postcode }} {{ form.addr1 }} {{ form.addr2 }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <PageTitleH3 titleh3="서비스정보 입력" />
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
        <!-- 0620: 디자인 1차 수정 - colgroup width값 수정 -->
          <colgroup>
            <col width="230px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label">수신서버 URL</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input"><input type="text" class="input" placeholder=""></span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">제공 서비스</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item service input-half">
                      <div class="checkbox">
                        <input type="checkbox" id="A2P" v-model="form.service" value="A2P"/>
                        <label for="A2P"><span class="checkbox__text">RCS A2P</span></label>
                      </div>
                      <div class="checkbox">
                        <input type="checkbox" id="chatbot" value="chatbot" v-model="form.service"/>
                        <label for="chatbot"><span class="checkbox__text">RCS 챗봇(양방향)</span></label>
                      </div>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="serviceErrorMsg">제공 서비스를 선택해 주세요.</p>
                </div>
              </td>
            </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">중계사</span></th>
                <td>
                  <div class="form-item__content agency">
                    <div class="form-item-row">
                      <div class="input-item input-half">
                        <div class="radiobox">
                          <input type="radio" name="agency" id="agencyY" v-model="form.agency" value="agencyY"/>
                          <label for="agencyY"><span class="checkbox__text">중계사임</span></label>
                        </div>
                        <div class="radiobox">
                          <input type="radio" name="agency" id="agencyN" value="agencyN" v-model="form.agency"/>
                          <label for="agencyN"><span class="checkbox__text">중계사 아님</span></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">특수부가통신<br>사업자등록증</span></th>
                <td>
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                      <!-- 0620: 디자인 1차 수정 - 'input-info' class명 추가 -->
                        <span class="input input-info"><input type="text" class="input" :placeholder="agencyFilesName" v-model="form.files" disabled></span>
                        <input type="file" id="fileUp2" class="input" >
                        <label for="fileUp2" class="btn btn-default-line">파일찾기</label>
                      </div>
                    </div>
                    <p class="guide-text error" v-if="filesErrorMsg">특수부가통신 사업자등록증을 등록해주세요.</p>
                    <p class="guide-text black">&bull; 사업자등록증이 없는 경우 사업자등록증명 또는 고유번호증을 등록해주세요.</p>
                    <p class="guide-text black">&bull; 비영리법인/국가기관인 경우 고유번호증을 등록해주세요.</p>
                    <p class="guide-text black">&bull; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">대행사 서비스 범위</span></th>
                <td>
                  <div class="form-item__content service-range">
                    <div class="form-item-row">
                      <span class="form-item-row__title">제공서비스</span>
                      <ul class="service-list">
                        <li>
                          <span class="checkbox">
                            <input type="checkbox" id="service1" value="service1" v-model="form.serviceRange"/>
                            <label for="service1"><span class="checkbox__text">웹 발송</span></label>
                          </span>
                        </li>
                        <li>
                          <span class="checkbox">
                            <input type="checkbox" id="service2" value="service2" v-model="form.serviceRange"/>
                            <label for="service2"><span class="checkbox__text">API 연동</span></label>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="form-item-row">
                      <span class="form-item-row__title">계약가능 서비스</span>
                      <ul class="service-list">
                        <li>
                          <span class="checkbox">
                            <input type="checkbox" id="service3" value="service3" v-model="form.serviceRange"/>
                            <label for="service3"><span class="checkbox__text">소량발송</span></label>
                          </span>
                        </li>
                        <li>
                          <span class="checkbox">
                            <input type="checkbox" id="service4" value="service4" v-model="form.serviceRange"/>
                            <label for="service4"><span class="checkbox__text">대량발송</span></label>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div class="form-item-row align--top">
                      <span class="form-item-row__title">제공 상품(템플릿)</span>
                      <ul class="service-list">
                        <li>
                          <span class="checkbox">
                            <input type="checkbox" id="service5" value="service5" v-model="form.serviceRange"/>
                            <label for="service5"><span class="checkbox__text">텍스트 템플릿</span></label>
                          </span>
                        </li>
                        <li>
                          <span class="checkbox">
                            <input type="checkbox" id="service6" value="service6"  v-model="form.serviceRange"/>
                            <label for="service6"><span class="checkbox__text">이미지 템플릿</span></label>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p class="guide-text black">&bull; 대행사에서 제공가능한 서비스 범위를 선택하시면 기업에게 대행사를 추천해드립니다.</p>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">대행사 로고</span></th>
                <td>
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                      <!-- 0620: 디자인 1차 수정 - 'input-info' class명 추가 -->
                        <span class="input input-info"><input type="text" class="input" :placeholder="logoFilesName" disabled></span>
                        <input type="file" id="fileUp3" class="input">
                        <label for="fileUp3" class="btn btn-default-line">파일찾기</label>
                      </div>
                    </div>
                  <p class="guide-text black">&bull; 파트너사 리스트에 노출되는 대행사 로고를 업로드해주세요.</p>
                  <p class="guide-text black">&bull; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                  </div>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </form>
    <!-- 0620: 디자인 1차 수정 - 버튼 구조 및 class 수정 -->
    <div class="button__wrap space-between">
      <ButtonCmp
        type="btn-line"
      >취소</ButtonCmp>
      <div class="button__wrap button__left">
        <ButtonCmp
          type="btn btn-line"
          @click="myInfo"
        >개인정보 관리</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="onSubmit"
        >저장</ButtonCmp>
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
        certificate: '1058778973',
        certificateFile: '',
        companyname: '더피프티원',
        biztype: '서비스',
        bizevent: '광고업',
        postcode: '06128',
        addr1: '서울특별시 강남구 봉은사로18길 58(역삼동, 건영빌딩)',
        addr2: '1층',
        agency: 'agencyY',
        service: ['A2P', 'chatbot'],
        serviceRange: []
      },
      selecteAuth: ['Auth_1'],
      filesName: '',
      agencyFilesName: 'image.jpg',
      logoFilesName: 'logo.png',
      changeCertificate: false,
      certificateErrorMsg: false
    }
  },
  watch: {
  },
  methods: {
    changeCert () {
      this.changeCertificate = true
      this.form.certificate = ''
    },
    cancelChange () {
      this.changeCertificate = false
    },
    checkCertificate () {
      if (this.form.certificate === '') {
        this.certificateErrorMsg = true
      }
    }
  }
}
</script>
