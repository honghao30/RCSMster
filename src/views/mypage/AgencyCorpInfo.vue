<!-- 0620: 추가 된 페이지 대행사_비지니스 정보 관리 -->
<template>
  <div class="join">
    <!-- 디자인 1차 수정 -->
    <PageTitle pagetitle="비지니스 정보 관리" progress="승인완료" />
    <!-- 선거용 배너 노출 영역 -->
    <template v-if="election">
      <div class="top-notice--gray election">
        <div class="title">2024년 4월 10일 제 22대 국회의원선거 선거 운동</div>
        <div class="sub-title">기간 : 2023년 10월 13일~ 2024년 5월 10일</div>
        <span class="flag-progress done">아이디 발급 완료</span>
        <div class="election__banner--innerbox">
          <p>발급된 계정으로 접속하여 기간 동안 브랜드를 생성/운영관리 할 수 있습니다.</p>
          <span class="msgbox-round"
          >
              ID : 123456789
          </span>
        </div>
      </div>
      <div class="top-notice--gray election">
        <div class="title">2024년 4월 10일 제 22대 국회의원선거 선거 운동</div>
        <div class="sub-title">기간 : 2023년 10월 13일~ 2024년 5월 10일</div>
        <div class="election__banner--innerbox">
          <p>발급된 계정으로 접속하여 기간 동안 브랜드를 생성/운영관리 할 수 있습니다.</p>
          <ButtonCmp
            type="btn-blue"
            @click="newIdApproval"
          >
            기간제 계정 신청
          </ButtonCmp>
        </div>
      </div>
    </template>
    <!-- //선거용 배너 노출 영역 -->
    <PageTitleH3 titleh3="비지니스 정보"/>
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
          <colgroup>
            <col width="230px">
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row"><span class="form-item__label">사업자등록번호</span></th>
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
                      <span class="text">{{ filesName }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">법인명(단체명)</span></th>
              <td>
                <span class="text">{{ form.companyname }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">업태</span></th>
              <td>
                <span class="text">{{ form.biztype }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">종목</span></th>
              <td>
                <span class="text">{{ form.bizevent }}</span>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">기업주소</span></th>
              <td>
                <span class="text">{{ form.postcode }} {{ form.addr1 }} {{ form.addr2 }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <PageTitleH3 titleh3="서비스정보 입력"/>
    <form  ref="form" :model="form">
      <div class="table__wrap">
        <table class="table table-bodyonly form-table">
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
                      <span class="text">{{ form.url }}</span>
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
                    <div class="input-item">
                      <span class="text">{{ form.service }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">중계사</span></th>
              <td>
                <div class="form-item__content agency">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="text">{{ form.agency }}</span>
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
                      <span class="text">{{ form.certificateFile2 }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label">대행사 서비스 범위</span></th>
              <td>
                <div class="form-item__content service-range">
                  <div class="form-item-row">
                    <span class="form-item-row__title">제공서비스</span>
                      <span class="text">{{ form.agencyService1 }}</span>
                  </div>
                  <div class="form-item-row">
                    <span class="form-item-row__title">계약가능 서비스</span>
                      <span class="text">{{ form.agencyService2 }}</span>
                  </div>
                  <div class="form-item-row">
                    <span class="form-item-row__title">제공 상품(템플릿)</span>
                      <span class="text">{{ form.agencyService3 }}</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="form-item__label required">대행사 로고</span></th>
              <td>
                <div class="form-item__content agency">
                  <div class="form-item-row">
                    <div class="input-item">
                      <span class="text">{{ form.agencyLogoFile }}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
    <div class="top-notice--gray gray__bottom">
      <!-- 승인대기 일 때 -->
      <p>- 승인대기 : 운영자 심사 대기중입니다.</p>
      <!-- 승인완료 일 때 -->
      <p>- 승인완료 : 승인이 완료 되었습니다.</p>
      <!-- 반려 일 때 -->
      <p class="error">- 반려 : 사업자등록증의 퀄리티가 안 좋아서 확인할 수 없습니다. 다시 올려주세요.</p>
      <p>- 기업 정보는 운영자 심사 후 변경이 완료됩니다.</p>
      <p>- 운영자 심사 대기 상태에서는 정보 수정이 불가합니다.</p>
    </div>
    <div class="button__wrap space-between">
      <ButtonCmp
        type="btn-line"
      >취소</ButtonCmp>
      <div class="button__wrap button__left">
        <ButtonCmp
          type="btn btn-line"
          @click="myInfo"
        >개인정보 관리</ButtonCmp>
        <!-- 승인대기 일 때 -->
        <ButtonCmp
          type="btn-blue"
          :disabled="!isDisabled"
          @click="onSubmit"
        >수정</ButtonCmp>
        <!-- 승인완료, 반려 일 때 -->
        <ButtonCmp
          type="btn-blue"
          @click="onSubmit"
        >수정</ButtonCmp>
      </div>
    </div>
    <!-- 모달 -->
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        modalsize="Max628"
      >
        <div slot="msg">
          <div class="msg election">
            <div class="phone-cert__title">
              2024년 4월 10일 제 22대 국회의원선거 선거 운동<br>
              계정이 발급되었습니다.
            </div>
            <div class="phone-cert__number">ID : 13456789</div>
            <div class="phone-cert__msg">
              비밀번호 재설정 이후 사용하실 수 있습니다.<br>
              확인 버튼을 선택하시면 비밀번호 재설정 페이지로 이동합니다.
            </div>
          </div>
        </div>
        <div class="button__wrap" slot="button">
            <ButtonCmp
              type="btn-blue"
              @click="closeMsg"
            >
              확인
            </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- // 모달 -->
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    ModalView,
    ConfirmMsg
  },
  data() {
    return {
      form: {
        certificate: '1058778973',
        certificateFile: '사업자등록증_2023.pdf',
        companyname: '더피프티원',
        biztype: '서비스',
        bizevent: '광고업',
        postcode: '06128',
        addr1: '서울특별시 강남구 봉은사로18길 58(역삼동, 건영빌딩)',
        addr2: '1층',
        url: 'https://www-qa.rcsbizcenter.com/main',
        service: 'RCS A2P / RCS 챗봇(양방향)',
        agency: '중계사임',
        certificateFile2: '특수부가통신_첨부파일.pdf',
        agencyService1: '웹 발송 / API 연동',
        agencyService2: '없음',
        agencyService3: '이미지 템플릿',
        agencyLogoFile: 'Logo_final.jpg'
      },
      selecteAuth: ['Auth_1'],
      filesName: '사업자등록증_2023.pdf',
      election: true,
      isModalViewed: false
    }
  },
  watch: {
  },
  methods: {
    onSubmit () {
      this.$router.push('./AgencyCorpInfoEdit')
    },
    corpInfo () {
      this.$router.push('./myInfo')
    },
    newIdApproval () {
      this.isModalViewed = true
    },
    closeMsg () {
      this.isModalViewed = false
    }
  }
}
</script>
