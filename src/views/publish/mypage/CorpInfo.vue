<template>
  <div class="join">
    <PageTitle pagetitle="기업정보 관리" />
    <div class="top-progress-area">
      <span class="flag-progress">승인대기</span>
      <p class="date">최종변경 : 2023. 03. 30</p>
      <p class="comment">운영자 심사 대기중입니다.</p>
    </div>
    <div class="top-notice--gray">
      <p>-기업 정보는 운영자 심사 후 변경이 완료됩니다.</p>
      <p>-운영자 심사 대기 상태에서는 정보 수정이 불가합니다.</p>
    </div>
    <PageTitleH3 titleh3="기업정보" noticeinfo="필수 입력값" />
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
                  <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input"><input type="text" class="input" placeholder="‘-’없이 10자리 숫자만 입력해주세요." v-model="form.certificate" disabled></span>
                          <ButtonCmp
                            type="btn-default-line"
                            @click="checkCertificate"
                          >
                          사업자등록번호 변경
                          </ButtonCmp>
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
                      <span class="input"><input type="text" class="input" :value="filesName" disabled></span>
                      <input type="file" id="fileUp" class="input">
                      <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                    </div>
                  </div>
                  <p class="guide-text black">&middot; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                  <p class="guide-text error">사업자등록증을 제출해주세요.</p>
                  <p class="guide-text">※ 사업자등록증이 없는 경우 사업자등록증명 또는 고유번호증을 등록해주세요.</p>
                  <p class="guide-text">※ 비영리법인/국가기관인 경우 고유번호증을 등록해주세요.</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">법인명(단체명)</span></th>
              <td>
                <span class="text">더피프티원</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">업태</span></th>
              <td>
                <span class="text">서비스</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">종목</span></th>
              <td>
                <span class="text">광고업</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">기업주소</span></th>
              <td>
                <span class="text">06128 서울특별시 강남구 봉은사로18길 58(역삼동, 건영빌딩) 1층</span>
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
                    <span class="input"><input type="text" class="input" :value="filesName2"></span>
                    <input type="file" id="fileUp2" class="input">
                    <label for="fileUp2" class="btn btn-default-line">파일찾기</label>
                    </div>
                  </div>
                  <p class="guide-text black">&middot; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                  <p class="guide-text">※ 사업자등록증이 없는 경우 사업자등록증명 또는 고유번호증을 등록해주세요. </p>
                  <p class="guide-text">※ 비영리법인/국가기관인 경우 고유번호증을 등록해주세요. </p>
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
    </form>
    <p class="guide-text">※ 대행사에서 제공가능한 서비스 범위를 선택하시면 기업에게 대행사를 추천해드립니다.</p>
    <div class="button__wrap">
      <ButtonCmp
        type="btn-line"
      >취소</ButtonCmp>
      <router-link
        to="/myinfo"
        class="btn btn-blue-line"
      >개인정보 관리</router-link>
      <ButtonCmp
        type="btn-blue"
      >저장</ButtonCmp>
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
        service: ['A2P', 'chatbot']
      },
      selecteAuth: ['Auth_1'],
      filesName: '사업자등록증_2023.pdf'
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>
