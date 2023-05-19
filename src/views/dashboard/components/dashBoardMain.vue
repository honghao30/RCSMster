<template>
  <div class="dashBoard-main__content">
    <div class="approval-statu__box">
      <strong>가입 승인 </strong>
      <p>가입 승인 완료 후 RBC의 모든 기능을 정상적으로 사용하실 수 있습니다.</p>
    </div>
    <!-- // 가입 상태 안내 메시지 -->
    <div class="board-main__box--roun-type">
      <PageTitleH3 titleh3="운영중인 브랜드" totalCount="982" />
      <div class="pagination__area--top">
        <Dropdown :options=dropdownOptions />
        <div class="pager">
          <span class="num">1 / 3</span>
          <a role="button" class="btn-prev" ><span class="blind">이전으로</span></a>
          <a role="button" class="btn-next" ><span class="blind">다음으로</span></a>
        </div>
      </div>
      <div class="table__wrap">
        <table class="table table-list">
          <thead>
            <tr>
              <th width="58%" scope="col"><span>브랜드 명</span></th>
              <th scope="col"><span>대화방</span></th>
              <th scope="col"><span>템플릿</span></th>
              <th scope="col"><span>대행사</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in brandData" :key="item">
              <td class="brandname">
                <div class="bookmark">
                  <a class="bookmark__act" v-if="item.bookmark" @click="bookmarkAct"></a>
                  <a class="bookmark__de-act" v-if="!item.bookmark" @click="bookmarkDeAct"></a>
                </div>
                <div class="brand">
                  <div class="brand__name">
                    <img :src="item.brandLogo" alt="" class="brand__logo">
                    <router-link to="" class="brand__title">{{ item.title }}</router-link>
                  </div>
                  <div class="brand__message">
                    <p v-if="item.message">메세지 발송 가능</p>
                  </div>
                </div>
              </td>
              <td>
                <span class="data-chat">{{ item.chatData }}</span>
              </td>
              <td>
                <span class="data-template">{{ item.templateData }}</span>
              </td>
              <td>
                <span class="data-agency">{{ item.agencyData }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- // 페이지 게이션 -->
    <div class="brand-banner__box">
      <strong>브랜드를 만들고 고객과 연결될 수 있는<br/>RBC의 다양한 기능을 사용하세요.</strong>
      <div class="button__wrap">
        <ButtonCmp type="btn-blue">✚ &nbsp;브랜드 개설하기</ButtonCmp>
      </div>
    </div>
    <!-- // 브랜드 개설 배너 -->
    <div class="board-main__box--roun-type">
      <PageTitleH3 titleh3="내 기업 브랜드" totalCount="982" />
      <div class="pagination__area--top">
        <Dropdown :options=dropdownOptions />
        <div class="pager">
          <span class="num">1 / 3</span>
          <a role="button" class="btn-prev" ><span class="blind">이전으로</span></a>
          <a role="button" class="btn-next" ><span class="blind">다음으로</span></a>
        </div>
      </div>
      <div class="table__wrap">
        <table class="table table-list">
          <thead>
            <tr>
              <th scope="col" width="40%"><span>브랜드 명</span></th>
              <th scope="col" width="15%"><span>대화방</span></th>
              <th scope="col" width="15%"><span>템플릿</span></th>
              <th scope="col" width="15%"><span>대행사</span></th>
              <th scope="col" width="15%"><span>운영권한</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in myBrandData" :key="item">
              <td class="brandname">
                <div class="brand">
                  <div class="brand__name">
                    <img :src="item.brandLogo" alt="" class="brand__logo">
                    <router-link to="" class="brand__title">{{ item.title }}</router-link>
                  </div>
                  <div class="brand__message">
                    <p v-if="item.message">메세지 발송 가능</p>
                  </div>
                </div>
              </td>
              <td>
                <span class="data-chat">{{ item.chatData }}</span>
              </td>
              <td>
                <span class="data-template">{{ item.templateData }}</span>
              </td>
              <td>
                <span class="data-agency">{{ item.agencyData }}</span>
              </td>
              <td>
                <div class="authority">
                  <a class="authority__act" v-if="item.authority">권한신청</a>
                  <a class="authority__de-act" v-if="!item.authority">승인대기</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- // 페이지 게이션 -->
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import Dropdown from '@/components/common/Dropdown.vue'

export default {
  components: {
    ButtonCmp,
    PageTitleH3,
    Dropdown
  },
  data() {
    return {
      dropdownOptions: [
        {
          label: '브랜드 명',
          value: ''
        },
        {
          label: '대화방',
          value: ''
        },
        {
          label: '템플릿',
          value: ''
        },
        {
          label: '대행사',
          value: ''
        }
      ],
      brandData: [
        {
          bookmark: true,
          brandLogo: require('../../../assets/images/dummy/brand_logo_1.png'),
          title: '더피프티원',
          message: true,
          chatData: 999,
          templateData: 654,
          agencyData: 0
        },
        {
          bookmark: true,
          brandLogo: require('../../../assets/images/dummy/brand_logo_2.png'),
          title: 'CX hub',
          message: false,
          chatData: 275,
          templateData: 999,
          agencyData: 3
        },
        {
          bookmark: false,
          brandLogo: require('../../../assets/images/dummy/brand_logo_3.png'),
          title: 'SYSTEM HOMME',
          message: true,
          chatData: 102,
          templateData: 87,
          agencyData: 2
        },
        {
          bookmark: false,
          brandLogo: require('../../../assets/images/dummy/brand_logo_3.png'),
          title: 'SYSTEM STUDIO HOUSE',
          message: true,
          chatData: 714,
          templateData: 69,
          agencyData: 1
        },
        {
          bookmark: false,
          brandLogo: require('../../../assets/images/dummy/brand_logo_4.png'),
          title: '롯데홈쇼핑',
          message: false,
          chatData: 999,
          templateData: 999,
          agencyData: 5
        }
      ],
      myBrandData: [
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_1.png'),
          title: 'LANVIN COLLECTION',
          message: true,
          chatData: 872,
          templateData: 654,
          agencyData: 0,
          authority: true
        },
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_2.png'),
          title: '더캐시미어',
          message: true,
          chatData: 275,
          templateData: 106,
          agencyData: 3,
          authority: false
        },
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_3.png'),
          title: '타미힐피거',
          message: false,
          chatData: 872,
          templateData: 654,
          agencyData: 0,
          authority: true
        },
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_3.png'),
          title: 'TOMMY JEANS',
          message: true,
          chatData: 87,
          templateData: 29,
          agencyData: 2,
          authority: false
        },
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_4.png'),
          title: '클럽모나코​',
          message: true,
          chatData: 127,
          templateData: 106,
          agencyData: 3,
          authority: false
        }
      ]
    }
  }
}
</script>

<style>

</style>
