<template>
  <div class="dashBoard-side">
    <!-- 기업정보 -->
    <div class="side-box side-box__info">
      <div class="side-box__info-top">
        <div class="side-box-top">
          <h4>더피프티원</h4>
          <span class="authority">마스터</span>
        </div>
        <div class="side-box-middle">
          <span class="id">CO.K0803h0r0O</span>
          <span class="date">2023.03.09</span>
        </div>
      </div>
      <div class="side-box-cont">
        <p>KISA(한국인터넷진흥원)에서 <span>안심마크</span> 활용에 대해 인증 받았습니다.</p>
      </div>
    </div>
    <!-- 버튼 / @click 클릭 시 추가해야함-->
    <div class="side-btn">
      <ButtonCmp
        type="btn-blue"
      >
      전체 브랜드 운영 관리
      </ButtonCmp>
    </div>
    <!-- 운영권한 관리 및 신청 내역 -->
    <div class="side-box side-box__authority">
      <div class="side-box-top">
        <h4>운영권한 승인 신청 내역 ({{authorityList.length}})</h4>
      </div>
      <div class="side-box-cont">
        <div class="authority-list" v-for="(item,i) in authorityList" :key="i">
          <ul>
            <li class="authority-list__company">{{ item.company }}</li>
            <li class="authority-list-between">
              <ul>
                <li class="authority-list__name">{{ item.name }}</li>
                <li class="authority-list__date">{{ item.date }}</li>
              </ul>
            </li>
            <li class="authority-list-center">
              <ul>
                <li class="authority-list__phone">{{ item.phone }}</li>
                <li>&nbsp;/&nbsp;</li>
                <li class="authority-list__mail">{{ item.mail }}</li>
              </ul>
            </li>
          </ul>
          <div class="button__wrap">
            <ButtonCmp
              type="btn-line"
              size="small"
            >반려</ButtonCmp>
            <ButtonCmp
              type="btn-blue"
              size="small"
              @click="onSubmit"
            >승인</ButtonCmp>
          </div>
        </div>
      </div>
    </div>
    <!-- 멤버 초대하기 -->
    <div class="side-box side-box__invite">
      <div class="side-box-top">
        <h4>멤버 초대하기</h4>
        <p>함께 관리하고 운영하는 멤버를 초대하세요.</p>
        <p>아직 가입하지 않는 멤버도 초대할 수 있어요.</p>
      </div>
      <div class="side-box-cont">
        <ul class="invite__step">
          <li>
            <strong>1</strong>
            <span>매니저 초대하기</span>
          </li>
          <li>
            <strong>2</strong>
            <span>대행사 초대하기</span>
          </li>
        </ul>
        <div class="invite__addbox">
          <p>대행사가 있으면 챗봇과 같은 다양한 대화방 메뉴 기능을 사용할 수 있어요.</p>
          <div class="button__wrap">
            <ButtonCmp
              type="btn btn-blue-line"
              size="medium"
            >
            챗봇 대행사 보기
            </ButtonCmp>
          </div>
        </div>
      </div>
    </div>
    <!-- 가변 배너 -->
    <div class="side-box side-box__banner">
      <div class="side-box-top">
        <h3>챗봇 대행사<br/>필요하지 않으세요?</h3>
        <p>대행사 보러가기</p>
      </div>
      <div class="side-box-cont"></div>
    </div>
    <!-- 승인 내역 -->
    <div class="side-box side-box__approve">
      <div class="side-box-top">
        <h4>승인 내역</h4>
      </div>
      <div class="side-box-cont">
        <TabCmp size="small">
          <TabItem title="전체">
            <div class="approve-cont" v-for="(item,i) in approveList" :key="i">
              <ul>
                <li class="approve-cont-top">
                  <ul>
                    <li class="approve-cont__type">{{ item.type }}</li>
                    <li class="approve-cont__date">{{ item.date }}</li>
                  </ul>
                </li>
                <li class="approve-cont-between">
                  <ul>
                    <li class="approve-cont__name">{{ item.name }}</li>
                    <li class="approve-cont__chat">{{ item.chat }}</li>
                  </ul>
                </li>
                <li class="authority-list-btm">{{ item.des }}</li>
              </ul>
            </div>
          </TabItem>
          <TabItem title="진행중">
          </TabItem>
          <TabItem title="완료">
          </TabItem>
      </TabCmp>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import TabCmp from '@/components/common/TabCmp.vue'
import TabItem from '@/components/common/TabItem.vue'

export default {
  components: {
    ButtonCmp,
    TabCmp,
    TabItem
  },
  data() {
    return {
      authorityList: [
        {
          company: 'SYSTEM STUDIOS',
          name: '김솔솔(solsol51)',
          date: '2023.04.18',
          phone: '010-1234-5678',
          mail: 'solsol@studios.com'
        },
        {
          company: 'SYSTEM HOME',
          name: '오동동(DDoh123)',
          date: '2023.04.18',
          phone: '010-1234-5678',
          mail: 'solsol@studios.com'
        },
        {
          company: '롯데홈쇼핑',
          name: '김미미(mimmim)',
          date: '2023.04.18',
          phone: '010-1234-5678',
          mail: 'solsol@studios.com'
        }
      ],
      approveList: [
        {
          type: '반려',
          date: '2023.03.09 17:12',
          name: 'SYSTEM HOMME',
          chat: '대화방',
          des: 'CX hub (사업자등록증과 업종 등록안내등등'
        },
        {
          type: '승인완료',
          date: '2023.03.09 17:12',
          name: 'SYSTEM HOMME',
          chat: '템플릿',
          des: '5월 청구서 템플릿'
        },
        {
          type: '반려',
          date: '2023.03.09 17:12',
          name: 'SYSTEM HOMME',
          chat: '대화방',
          des: 'CX hub (인터넷 광고 금지 메시지)'
        }
      ]
    }
  }
}
</script>

<style>

</style>
