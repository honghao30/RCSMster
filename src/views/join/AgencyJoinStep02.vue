<template>
  <div class="join">
    <PageTitle pagetitle="대행사 회원가입" />
    <StepList :stepActiveIndex="2" :stepTitle="stepTitle" />
    <PageTitleH3 titleh3="대행사정보 입력" />
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
        <!-- 0620: 고객 요청 반영 - colgroup width값 수정 -->
          <colgroup>
            <col width="230px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label required">사업자등록번호</span></th>
              <td>
                <div class="form-item__content" v-if="showall">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input input-info"><input type="text" class="input" placeholder="‘-’없이 10자리 숫자만 입력해주세요." v-model="form.certificate"></span>
                      <ButtonCmp
                        type="btn-default-line"
                        @click="checkCertificate">
                      사업자등록번호 인증
                      </ButtonCmp>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="certificateErrorMsg">사업자등록번호를 입력해주세요.</p>
                  <p class="guide-text black">&bull; 사업자등록번호 인증 후 회원가입을 진행 할 수 있습니다.</p>
                  <p class="guide-text black guide-text__link">선거 후보자/정치/공인입니다. <a href="./FAQ">FAQ</a>    <a href="./OnlineInquire">온라인 문의</a></p>
                </div>
                <div class="form-item__content" v-else>
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="input input-info"><input type="text" class="input" :value="certificatetemp" disabled></span>
                    </div>
                  </div>
                  <p class="guide-text validation">사업자등록번호 인증이 완료되었습니다.</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">사업자등록증</span></th>
              <td>
                <div class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <span class="input input-info"><input type="text" class="input" :value="filesName" :disabled="disabled" placeholder="사업자등록증을 등록해주세요."></span>
                    <input type="file" id="fileUp" class="input" @change="onFileChanged">
                    <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                    </div>
                  </div>
                  <p class="guide-text black">&bull; 사업자등록증이 없는 경우 사업자등록증명 또는 고유번호증을 등록해주세요.</p>
                  <p class="guide-text black">&bull; 비영리법인/국가기관인 경우 고유번호증을 등록해주세요.</p>
                  <p class="guide-text black">&bull; 사업자등록증 제출: 마스터 권한 / 사업자등록증 미 제출: 매니저 권한</p>
                  <p class="guide-text black">&bull; 파일형식: JPG, PNG, PDF, TIFF(최대 5MB)</p>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">법인명(단체명)</span></th>
              <td>
                <div  v-if="joinIng" class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item">
                    <span class="input input-info"><input type="text" class="input" placeholder="사업자등록증에 등록된 법인명(단체명)을 입력해주세요." :disabled="disabled" v-model="form.companyname"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="companynameErrorMsg">법인명(단체명)을 입력해주세요.</p>
                </div>
                <div v-else class="form-item__content">더피프티원</div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">업태</span></th>
              <td>
                <div v-if="joinIng" class="form-item__content">
                <div class="form-item-row">
                  <div class="input-item">
                    <span class="input input-info"><input type="text" class="input" placeholder="사업자등록증에 등록된 첫번째 업태명을 입력해주세요." :disabled="disabled"  v-model="form.biztype"></span>
                  </div>
                </div>
                <p class="guide-text error" v-if="biztypeErrorMsg">사업자등록증에 등록된 첫번째 업태명을 입력해주세요.</p>
                <p class="guide-text black">&bull; 비영리법인/국가기관인 경우 ‘기업/단체’로 입력해주세요.</p>
                </div>
                <div v-else class="form-item__content">서비스업</div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">종목</span></th>
              <td>
                <div v-if="joinIng" class="form-item__content">
                <div class="form-item-row">
                  <div class="input-item">
                    <span class="input input-info"><input type="text" class="input" placeholder="사업자등록증에 등록된 첫번째 종목명을 입력해주세요." :disabled="disabled" v-model="form.bizevent"></span>
                  </div>
                </div>
                <p class="guide-text error" v-if="bizeventErrorMsg">사업자등록증에 등록된 첫번째 종목명을 입력해주세요.</p>
                <p class="guide-text black">&bull; 비영리법인/국가기관인 경우 ‘비영리, 공공/행정, 정치/사회, 복지, 종교, 모임, 기관/단체일반’ 중에서 해당하는 항목을 입력해주세요.</p>
                </div>
                <div v-else class="form-item__content">IT</div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">기업주소</span></th>
              <td>
                <div v-if="joinIng" class="form-item__content">
                  <div class="form-item-row">
                    <div class="input-item post">
                    <span class="input input-post"><input type="text" class="input" v-model="form.postcode"></span>
                    <ButtonCmp
                      type="btn-default-line"
                      @click="findPost">
                      우편번호
                    </ButtonCmp>
                    </div>
                  </div>
                  <div class="form-item-row">
                    <div class="input-item address">
                    <span class="input input-info"><input type="text" class="input" v-model="form.addr1"></span> <span class="input input-info"><input type="text" class="input" v-model="form.addr2"></span>
                    </div>
                  </div>
                  <p class="guide-text error" v-if="postcodeErrorMsg">기업주소를 입력해주세요.</p>
                </div>
                <div v-else class="form-item__content">06128 서울시 강남구 봉은사로 18길</div>
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
        <!-- 0620: 고객 요청 반영 - colgroup width값 수정 -->
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
                <th scope="row"><span class="form-item__label">API Client IP</span></th>
                <td>
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item ip"
                        v-for="(item, index) in apiList"
                        :key="index"
                      >
                        <span class="input"><input type="text" class="input" v-model="form.ip" placeholder="단일 IP 주소 입력"></span>
                        <span class="input"><input type="text" class="input" v-model="form.ipName" placeholder="항목명"></span>
                        <ButtonCmp
                          type="btn-default-line"
                          size="small"
                          @click="deleteApiRow"
                        >
                        삭제
                        </ButtonCmp>
                      </div>
                      <ButtonCmp
                        type="btn-default-line"
                        size="small"
                        @click="addApiRow"
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
                      <!-- 0620: 고객 요청 반영 - 'w--half' -> 'input-half' class명 수정 -->
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
                      <!-- 0620: 고객 요청 반영 - 'w--half' -> 'input-half' class명 수정 -->
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
                      <!-- 0620: 고객 요청 반영 - 'w--half' -> 'w--full' class명 수정 -->
                      <div class="input-item w--full"  v-if="form.agency === 'agencyY'">
                        <label for="url" class="item-label">대화방 수신 URL</label>
                        <span class="input">
                          <input type="text" id="url" />
                        </span>
                      </div>
                      <!-- 0620: 고객 요청 반영 - 'w--half' -> 'w--full' class명 수정 -->
                      <div class="input-item w--full"  v-if="form.agency === 'agencyN'">
                        <span class="item-label">중계사 선택</span>
                        <ButtonCmp
                          type="btn-default-line"
                          @click="agenceySelect"
                        >
                        중계사 선택
                        </ButtonCmp>
                        <span class="result-text">선택 중계사 <em class="point">4</em>개</span>
                      </div>
                    </div>
                    <p class="guide-text black">&bull; 중계사를 선택해주세요.</p>
                    <!-- <p class="guide-text error" v-if="agencyErrorMsg">중계사를 선택해주세요.</p> -->
                    <p class="guide-text black" v-if="form.agency === 'agencyY'">※ 중계사 지정 안내<br>중계사로 지정된 브랜드의 모든 메시지 및 자동응답메시지의 트래픽이 모두 중계사에게 부과됩니다.<br>대행사가 중계사로 지정되는 경우 해당 대행사가 메시지 청약 및 과금을 대행한다는 것에 대한 동의 절차를 진행해야 합니다.</p>
                    <p class="guide-text black" v-if="form.agency === 'agencyN'">※ 중계사 선택 안내<br>반드시 청약이 완료된 중계사를 선택해야 하며 메시지를 수신하기 위한 webhook.url 정보를 해당 중계사의 시스템에 등록해야 합니다. </p>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label required">특수부가통신<br>사업자등록증</span></th>
                <td>
                  <div class="form-item__content">
                    <div class="form-item-row">
                      <div class="input-item">
                      <span class="input input-info"><input type="text" class="input" :value="filesName2" :disabled="disabled" placeholder="특수부가통신 사업자등록증을 등록해주세요." v-model="form.files"></span>
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
                <!-- 0620: 대행사 서비스 범위 체크 박스의 텍스트 '가능' 삭제 -->
                <th scope="row"><span class="form-item__label">대행사 서비스 범위</span></th>
                <td>
                  <div class="form-item__content service-range">
                    <div class="form-item-row">
                      <!-- 0620: 고객 요청 반영 - '인하우스 개발' 삭제 및 넘버링 변경 -->
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
                      <!-- 0620: 고객 요청 반영 - '단기 계약','선거용 RVS 메시지 계약' 삭제 및 넘버링 변경 -->
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
                      <!-- 0620: 고객 요청 반영 - 'RCS SMS/LMS/MMS','이미지 템플릿 계약','챗봇','자동응답' 삭제 및 넘버링 변경 -->
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
                      <span class="input input-info"><input type="text" class="input" :value="filesName3" :disabled="disabled"></span>
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
    <div class="button__wrap space-between">
      <ButtonCmp
        type="btn-line"
      >이전</ButtonCmp>
      <ButtonCmp
        type="btn-blue"
        @click="nextStep"
        :disabled="disabled"
      >다음</ButtonCmp>
    </div>
    <!-- // 모달 영역 -->
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false">
      <ConfirmMsg
      v-if="certifMessage"
      @closeModal="isModalViewed = false"
    >
      <div slot="msg">
        <div class="msg">
          동일한 사업자등록번호로 회원가입을<br />
          진행하고 있습니다. 최초의 회원가입 완료 후<br />
          추가 회원가입이 가능합니다.
        </div>
        <div class="msg2">
          홍*동(hkp***@the-51.com)
        </div>
      </div>
      <div class="button__wrap" slot="button">
          <ButtonCmp
            type="btn-blue-line"
            @click="closeMsg"
          >닫기
          </ButtonCmp>
          <ButtonCmp
          type="btn-blue"
          @click="closeMsg"
          >
            온라인 문의
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <ConfirmMsg
        v-else-if="AgencyModal"
        @closeModal="isModalViewed = false"
      >
        <div slot="msg">
          <div class="msg">
            중계사 시스템에 메시지에 대한 청약 및 대행사<br> webhook url 정보를 등록하셨나요?
          </div>
        </div>
        <div class="button__wrap" slot="button">
            <ButtonCmp
            type="btn-blue-line"
            @click="closeMsg"
            >아니오</ButtonCmp>
            <ButtonCmp
            type="btn-blue"
            @click="agencyManagement"
            >예</ButtonCmp>
        </div>
      </ConfirmMsg>
      <FormModals
        v-else-if="AgencyManage"
        @closeModal="isModalViewed = false"
        modalsize="Max628"
      >
      <div class="modal__content--title" slot="title">
        중계사 선택
      </div>
        <div slot="modal-body">
          <div class="agency-list__wrap">
              <div class="agency-list__search">
                <div class="form-item__content">
                  <span class="input search">
                    <input type="text"
                      name="Search"
                      class="input"
                      placeholder="중계사명을 입력해주세요."
                      v-model="searchWord"
                      @click="search"
                    >
                  </span>
                </div>
                <p class="guide-text error" v-if="agentErrorMsg">중계사명을 입력해주세요.</p>
              </div>
              <div class="agency-list__selelect">
                <div class="agency-list__left">
                  <ul>
                    <li v-for="(list, index) in agencyList"
                      :key="index"
                    >
                      <div class="checkbox">
                        <input type="checkbox"
                         :id="`agency0${index }`"
                         @click="selectCheck"
                         :value="list"
                         v-model="selectedAgencyList"
                         />
                        <label
                         :for="`agency0${index }`"
                        ><span class="checkbox__text">{{ list }}</span></label>
                      </div>
                    </li>
                  </ul>
                  <!-- 검색 결과가 없을 때 -->
                  <p class="nodata">검색 결과가 없습니다.</p>
                </div>
                <div class="agency-list__right">
                  <ul
                    v-if="this.selectedAgencyList.length > 0"
                  >
                    <li v-for="(list, index) in selectedAgencyList"
                      :key="index"
                    >
                      {{ list }}
                      <ButtonCmp
                      type="btn-only-icon-dell"
                      @click="removeSelect"
                      ></ButtonCmp>
                    </li>
                  </ul>
                  <p class="nodata"
                    v-else
                  >
                    중계사를 추가해주세요.
                  </p>
                </div>
              </div>
          </div>
        </div>
        <div class="button__wrap" slot="button">
            <ButtonCmp
            type="btn-blue-line"
            @click="closeMsg"
            >닫기</ButtonCmp>
            <ButtonCmp
            type="btn-blue"
            @click="nextSelect"
            :disabled="!isDisabled"
            >다음</ButtonCmp>
        </div>
      </FormModals>
      <FormModals
        v-else-if="DelegatesManage"
        @closeModal="isModalViewed = false"
        modalsize="Max628"
      >
      <div class="modal__content--title" slot="title">
        대표중계사 선택
      </div>
        <div slot="modal-body">
          <div class="agency-guide__graybox">
            중계사 목록 중에서 대표중계사를 선택해주세요.
          </div>
          <div class="agency-list__wrap">
            <div class="agency-list__select">
              <dl>
                <dt>
                  중계사 이름
                </dt>
                <dd>
                  <ul>
                    <li v-for="(list, index) in agencyListSelect"
                      :key="index"
                    >
                      <span class="radiobox">
                        <input type="radio"
                          :id="`agency0${index }`"
                          name="DelegatesAgency"
                          @click="selectRadio"
                          :value="list"
                        />
                        <label
                          :for="`agency0${index }`"
                        >
                          <span class="radiobox__text">{{ list }}</span>
                        </label>
                      </span>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
          <p class="guide-text error" v-if="selectErrorMsg">선택할 수 없는 중계사입니다. 중계사와 별도의 양방향 서비스 사전 청약 후 선택해주세요.</p>
        </div>
        <div class="button__wrap" slot="button">
            <ButtonCmp
            type="btn-blue-line"
            @click="closeMsg"
            >닫기</ButtonCmp>
            <ButtonCmp
            type="btn-blue"
            @click="saveAgent"
            >저장</ButtonCmp>
        </div>
      </FormModals>
      <ZipCode v-else
        @closeModal="isModalViewed = false"
      />
    </ModalView>
    <!-- 중개사 url 정보 입력 확인 팝업 호출 시점 기획 확인 필요-->
    <!-- // 모달 영역 -->
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import StepList from '@/components/common/StepList.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import FormModals from '@/views/join/components/FormModals.vue'
import ZipCode from '@/views/join/components/ZipCode.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    ModalView,
    StepList,
    ConfirmMsg,
    ZipCode,
    FormModals
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
        service: ['A2P', 'chatbot'],
        serviceRange: [],
        agency: 'agencyY',
        selectedOptions: '',
        agentName: '',
        files: ''
      },
      apiList: [],
      selecteAuth: ['Auth_1'],
      certificateErrorMsg: false,
      companynameErrorMsg: false,
      biztypeErrorMsg: false,
      bizeventErrorMsg: false,
      postcodeErrorMsg: false,
      serviceErrorMsg: false,
      agencyErrorMsg: false,
      agentErrorMsg: false,
      filesErrorMsg: false,
      selectErrorMsg: true,
      showall: true,
      files: '',
      filesName: '',
      filesName2: '',
      filesName3: '',
      isModalViewed: false,
      joinIng: true,
      AgencyModal: false,
      certificatetemp: '123456789',
      isAgencyModal: false,
      stepTitle: ['약관동의', '대행사정보 입력', '회원정보 입력', '가입완료'],
      disabled: true,
      AgencyManage: false,
      agencyList: ['경민중계', '더피프티원', '더피프티원1', '성문대행', '더피프티원2', '더피프티원3', '더피프티원4', '더피프티원5', '성문대행2', '성문대행3'],
      agencyListSelect: [],
      searchWord: '',
      DelegatesManage: false,
      selectedAgencyList: []
    }
  },
  props: {
    lists: Object
  },
  watch: {
    isModalViewed () {
      if (this.isModalViewed) {
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
    }
  },
  computed: {
    isDisabled() {
      return this.agencyListSelect.length > 0
    },
    filteredList() {
      return this.selectedOptions.filter(list => {
        return list.name.toLowerCase().includes(this.searchWord.toLowerCase())
      })
    }
  },
  methods: {
    nextStep () {
      console.log(this.form.files)
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
        return
      }
      if (this.form.files === '') {
        this.filesErrorMsg = true
        return
      }
      this.disabled = false
      this.$router.push('./AgencyJoinStep03')
    },
    checkCertificate () {
      if (this.form.certificate === '') {
        this.certificateErrorMsg = true
      } else if (this.form.certificate === '123') {
        this.isModalViewed = true
        this.certifMessage = true
        this.joinIng = false
      } else {
        this.showall = false
        this.disabled = false
      }
    },
    closeModal () {
      this.isModalViewed = false
      this.isAgencyModal = false
    },
    closeMsg  () {
      this.isModalViewed = false
    },
    onFileChanged (e) {
      const files = e.target.files
      this.files = files
      const filesName = files[0].name
      this.filesName = filesName
    },
    findPost () {
      this.isModalViewed = true
      this.certifMessage = false
    },
    addApiRow () {
      if (this.apiList.length < 10) {
        this.apiList.push({})
        console.log(this.apiList.length < 10)
      }
    },
    deleteApiRow (index) {
      this.apiList.splice(index, 1)
    },
    agenceySelect () {
      this.isModalViewed = true
      this.AgencyModal = true
    },
    agencyManagement () {
      this.AgencyModal = false
      this.AgencyManage = true
    },
    selectCheck (e) {
      this.agencyListSelect.push(e.target.value)
    },
    removeSelect (index) {
      this.agencyListSelect.splice(index, 1)
    },
    nextSelect () {
      this.DelegatesManage = true
      this.AgencyManage = false
    },
    search () {
      if (this.form.agentName === '') {
        this.agentErrorMsg = true
        return false
      }
    },
    selectRadio (e) {
      if (e.target.value === '') {
        this.selectErrorMsg = true
        return false
      }
    },
    saveAgent () {
      this.DelegatesManage = false
      this.isModalViewed = false
    }
  }
}
</script>
