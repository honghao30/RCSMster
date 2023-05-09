<template>
  <div class="join">
    <PageTitle pagetitle="대행사 회원가입" />
    <JoinStep :step="2" :agency=true />
    <PageTitleH3 titleh3="대행사정보 입력" noticeinfo="필수 입력값" />
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="200px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label required">사업자등록번호</span></th>
              <td>
                <div class="form-item__content" v-if="showall">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input"><input type="text" class="input" placeholder="‘-’없이 10자리 숫자만 입력해주세요." v-model="form.certificate"></span>
                      <ButtonCmp
                        type="btn-default-line"
                        @click="checkCertificate">
                      사업자등록번호 인증
                      </ButtonCmp>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="certificateErrorMsg">사업자등록번호를 입력해주세요.</p>
                  <p class="guide-text">※ 사업자등록번호 인증 후 회원가입을 진행 할 수 있습니다.</p>
                </div>
                <div class="form-item__content" v-else>
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input"><input type="text" class="input" :value="certificatetemp" disabled></span>
                    </div>
                  </div>
                  <p class="guide-text black">※ 사업자등록번호 인증이 완료되었습니다.</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">사업자등록증</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <span class="input"><input type="text" class="input" :value="filesName"></span>
                    <input type="file" id="fileUp" class="input" @change="onFileChanged">
                    <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                    </div>
                  </div>
                  <p class="guide-text black">&middot; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                  <p class="guide-text"> ※ 사업자등록증이 없는 경우 사업자등록증명 또는 고유번호증을 등록해주세요. </p>
                  <p class="guide-text"> ※ 비영리법인/국가기관인 경우 고유번호증을 등록해주세요. </p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">법인명(단체명)</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <span class="input"><input type="text" class="input" placeholder="사업자등록증에 등록된 법인명(단체명)을 입력해주세요." v-model="form.companyname"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="companynameErrorMsg">법인명(단체명)을 입력해주세요.</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">업태</span></th>
              <td>
                <div class="form-item__content">
                <div class="form-item-row">
                  <div class="input-item">
                    <span class="input"><input type="text" class="input" placeholder="사업자등록증에 등록된 첫번째 업태명을 입력해주세요."  v-model="form.biztype"></span>
                  </div>
                </div>
                <p class="guide-text error" v-if="biztypeErrorMsg">사업자등록증에 등록된 첫번째 업태명을 입력해주세요.</p>
                <p class="guide-text">※ 비영리법인/국가기관인 경우 ‘기업/단체’로 입력해주세요.</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">종목</span></th>
              <td>
                <div class="form-item__content">
                <div class="form-item-row">
                  <div class="input-item">
                    <span class="input"><input type="text" class="input" placeholder="사업자등록증에 등록된 첫번째 종목명을 입력해주세요."   v-model="form.bizevent"></span>
                  </div>
                </div>
                <p class="guide-text error" v-if="bizeventErrorMsg">사업자등록증에 등록된 첫번째 종목명을 입력해주세요.</p>
                <p class="guide-text">※ 비영리법인/국가기관인 경우 ‘비영리, 공공/행정, 정치/사회, 복지, 종교, 모임, 기관/단체일반’ 중에서 해당하는 항목을 입력해주세요.</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">기업주소</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item post">
                    <span class="input"><input type="text" class="input" v-model="form.postcode"></span>
                    <ButtonCmp
                      type="btn-default-line"
                      @click="findPost">
                      우편번호
                    </ButtonCmp>
                    </div>
                  </div>
                  <div class="form-item-row">
                    <div class="input-item address">
                    <span class="input"><input type="text" class="input" v-model="form.addr1"></span> <span class="input"><input type="text" class="input" v-model="form.addr2"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="postcodeErrorMsg">기업주소를 입력해주세요.</p>
                </div>
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
              <th scope="row"><span class="form-item__label required">제공 서비스</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item service  w--half">
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
                    <div class="input-item w--half">
                      <div class="radiobox">
                        <input type="radio" name="agency" id="agencyY" v-model="form.agency" value="agencyY"/>
                        <label for="agencyY"><span class="checkbox__text">중계사임</span></label>
                      </div>
                      <div class="radiobox">
                        <input type="radio" name="agency" id="agencyN" value="agencyN" v-model="form.agency"/>
                        <label for="agencyN"><span class="checkbox__text">중계사 아님</span></label>
                      </div>
                    </div>
                    <div class="input-item w--half"  v-if="form.agency === 'agencyY'">
                      <label for="url" class="item-label">대화방 수신 URL</label>
                      <span class="input">
                        <input type="text" id="url" />
                      </span>
                    </div>
                    <div class="input-item w--half"  v-if="form.agency === 'agencyN'">
                      <span class="item-label">중계사 선택</span>
                      <ButtonCmp
                        type="btn-default-line"
                      >
                      중계사 선택
                      </ButtonCmp>
                      <span class="result-text">선택 중계사 <em class="point">4</em>개</span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="agencyErrorMsg">중계사를 선택해주세요.</p>
                  <p class="guide-text" v-if="form.agency === 'agencyY'">※ 중계사 지정 안내<br>중계사로 지정된 브랜드의 모든 메시지 및 자동응답메시지의 트래픽이 모두 중계사에게 부과됩니다.<br>대행사가 중계사로 지정되는 경우 해당 대행사가 메시지 청약 및 과금을 대행한다는 것에 대한 동의 절차를 진행해야 합니다.</p>
                  <p class="guide-text" v-if="form.agency === 'agencyN'">※ 중계사 선택 안내<br>반드시 청약이 완료된 중계사를 선택해야 하며 메시지를 수신하기 위한 webhook.url 정보를 해당 중계사의 시스템에 등록해야 합니다. </p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">특수부가통신<br>사업자등록증</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <span class="input"><input type="text" class="input" :value="filesName2"></span>
                    <input type="file" id="fileUp2" class="input">
                    <label for="fileUp2" class="btn btn-default-line">파일찾기</label>
                    </div>
                  </div>
                  <p class="guide-text black">&middot; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                  <p class="guide-text"> ※ 사업자등록증이 없는 경우 사업자등록증명 또는 고유번호증을 등록해주세요. </p>
                  <p class="guide-text"> ※ 비영리법인/국가기관인 경우 고유번호증을 등록해주세요. </p>
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
                          <label for="service1"><span class="checkbox__text">웹 발송 가능</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service2" value="service2" v-model="form.serviceRange"/>
                          <label for="service2"><span class="checkbox__text">API 연동 가능</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service3" value="service3" v-model="form.serviceRange"/>
                          <label for="service3"><span class="checkbox__text">인하우스 개발 가능</span></label>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div class="form-item-row">
                    <span class="form-item-row__title">계약가능 서비스</span>
                    <ul class="service-list">
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service4" value="service4" v-model="form.serviceRange"/>
                          <label for="service4"><span class="checkbox__text">소량발송 계약 가능</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service5" value="service5" v-model="form.serviceRange"/>
                          <label for="service5"><span class="checkbox__text">단기 계약 가능</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service6" value="service6" v-model="form.serviceRange"/>
                          <label for="service6"><span class="checkbox__text">선거용 RVS 메시지 계약 가능</span></label>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div class="form-item-row align--top">
                    <span class="form-item-row__title">제공 상품(템플릿)</span>
                    <ul class="service-list">
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service7" value="service7" v-model="form.serviceRange"/>
                          <label for="service7"><span class="checkbox__text">RCS SMS/LMS/MMS</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service8" value="service8" v-model="form.serviceRange"/>
                          <label for="service8"><span class="checkbox__text">텍스트 템플릿</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service9" value="service9"  v-model="form.serviceRange"/>
                          <label for="service9"><span class="checkbox__text">이미지 템플릿 계약 가능</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service10" value="service10" v-model="form.serviceRange" />
                          <label for="service10"><span class="checkbox__text">챗봇</span></label>
                        </span>
                      </li>
                      <li>
                        <span class="checkbox">
                          <input type="checkbox" id="service11" value="service11" v-model="form.serviceRange"/>
                          <label for="service11"><span class="checkbox__text">자동응답</span></label>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="guide-text">※ 대행사에서 제공가능한 서비스 범위를 선택하시면 기업에게 대행사를 추천해드립니다.</p>
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
        >취소</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="onSubmit"
        >다음</ButtonCmp>
      </div>
      </form>
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
import CertificateMsg from '@/views/publish/join/CertificateMsg.vue'
import AgencyCheckMsg from '@/views/publish/join/AgencyCheckMsg.vue'
import JoinStep from '@/views/publish/join/JoinStep'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    ModalView,
    CertificateMsg,
    JoinStep,
    AgencyCheckMsg
  },
  data() {
    return {
      form: {
        certificate: '',
        certificateFile: '',
        companyname: '',
        biztype: '',
        bizevent: '',
        postcode: '',
        addr1: '',
        addr2: '',
        service: [],
        serviceRange: [],
        agency: ''
      },
      selecteAuth: ['Auth_1'],
      certificateErrorMsg: false,
      companynameErrorMsg: false,
      biztypeErrorMsg: false,
      bizeventErrorMsg: false,
      postcodeErrorMsg: false,
      serviceErrorMsg: false,
      agencyErrorMsg: false,
      showall: true,
      files: '',
      filesName: '',
      filesName2: '',
      isModalViewed: false,
      certificatetemp: '123456789',
      isAgencyModal: false
    }
  },
  methods: {
    onSubmit () {
      if (this.form.certificate === '') {
        this.certificateErrorMsg = true
        return
      }
      if (this.form.companyname === '') {
        this.companynameErrorMsg = true
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
    checkCertificate () {
      if (this.form.certificate === '') {
        this.certificateErrorMsg = true
        return
      }
      this.showall = false
      this.isModalViewed = true
    },
    closeModal () {
      this.isModalViewed = false
      this.isAgencyModal = false
    },
    onFileChanged (e) {
      const files = e.target.files
      this.files = files
      const filesName = files[0].name
      this.filesName = filesName
    }
  }
}
</script>
