<template>
  <div class="dashBoard-main__content">
    <div class="approval-statu__box">
      <strong>가입 승인 </strong>
      <p>가입 승인 완료 후 RBC의 모든 기능을 정상적으로 사용하실 수 있습니다.</p>
    </div>
    <!-- // 가입 상태 안내 메시지 -->
    <div class="board-main__box--roun-type">
      <div class="dash-tit">
        <h3>운영중인 브랜드</h3>
        <span>(<em>982</em>)</span>
      </div>
      <div class="top-ctrl-area">
        <div class="left-area">
          <div class="search-area">
            <Dropdown searchable :options="dropdownOptions" placeholder="브랜드명">
            </Dropdown>
          </div>
        </div>
        <div class="right-area">
          <div class="ctrl">
            <div class="pager">
              <span class="num">1/3</span>
              <a role="button" class="btn-prev"><span class="blind">이전으로</span></a>
              <a role="button" class="btn-next"><span class="blind">다음으로</span></a>
            </div>
          </div>
        </div>
      </div>
      <div class="table__wrap">
        <table class="table table-list">
          <colgroup>
              <col width="58%">
              <col>
              <col>
              <col>
            </colgroup>
          <thead>
            <tr>
              <th scope="col"><span>브랜드 명</span></th>
              <th scope="col"><span>대화방</span></th>
              <th scope="col"><span>템플릿</span></th>
              <th scope="col"><span>대행사</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in brandData" :key="i">
              <td>
                <div class="brandname">
                  <div class="brand">
                    <div class="brand__mark" role="bookmark">
                      <input type="checkbox" :id="`bookmark${i}`" :checked="item.mark" >
                      <label class="brand__mark__core" :for="`bookmark${i}`"></label>
                    </div>
                    <div class="brand__logo">
                      <img :src="item.brandLogo" alt="">
                    </div>
                    <span class="brand__title"><router-link to="">{{ item.title }}</router-link></span>
                    <span class="brnad__new" v-if="item.new">NEW</span>
                  </div>
                  <span class="brand__message" v-if="item.message">메세지 발송 가능</span>
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
      <!-- 230616 [a태그 + router-link태그] →  [router-link태그] 수정 -->
      <router-link to="" class="btn btn-blue">브랜드 개설하기</router-link>
    </div>
    <!-- // 브랜드 개설 배너 -->
    <div class="board-main__box--roun-type">
      <div class="dash-tit">
        <h3>내 기업 브랜드</h3>
        <span>(<em>982</em>)</span>
      </div>
      <div class="top-ctrl-area">
        <div class="left-area">
          <div class="search-area">
            <Dropdown searchable :options="dropdownOptions" placeholder="브랜드명">
            </Dropdown>
          </div>
        </div>
        <div class="right-area">
          <div class="ctrl">
            <div class="pager">
              <span class="num">1/3</span>
              <a role="button" class="btn-prev"><span class="blind">이전으로</span></a>
              <a role="button" class="btn-next"><span class="blind">다음으로</span></a>
            </div>
          </div>
        </div>
      </div>
      <div class="table__wrap">
        <table class="table table-list">
          <thead>
            <tr>
              <th scope="col" width="50%"><span>브랜드 명</span></th>
              <th scope="col" width="12.5%"><span>대화방</span></th>
              <th scope="col" width="12.5%"><span>템플릿</span></th>
              <th scope="col" width="12.5%"><span>대행사</span></th>
              <th scope="col" width="12.5%"><span>운영권한</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in myBrandData" :key="i">
              <td>
                <div class="brandname mybrandname">
                  <div class="brand">
                    <div class="brand__logo">
                      <img :src="item.brandLogo" alt="">
                    </div>
                    <span class="brand__title"><router-link to="">{{ item.title }}</router-link></span>
                  </div>
                  <span class="brand__message" v-if="item.message">메세지 발송 가능</span>
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
                <ButtonCmp
                  v-if="item.authority"
                  type="btn-blue"
                  size="small"
                >
                권한신청
                </ButtonCmp>
                <span class="flag-progress" v-if="!item.authority">승인대기</span>
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
import Dropdown from '@/components/common/Dropdown.vue'

export default {
  components: {
    ButtonCmp,
    Dropdown
  },
  data() {
    return {
      dropdownOptions: [
        {
          label: '브랜드 명 1',
          value: '01'
        },
        {
          label: '브랜드 명 2',
          value: '02'
        },
        {
          label: '브랜드 명 3',
          value: '03'
        },
        {
          label: '브랜드 명 4',
          value: '04'
        }
      ],
      brandData: [
        {
          mark: true,
          brandLogo: require('../../../assets/images/dummy/brand_logo_1.png'),
          title: '더피프티원더피프티원더피프티원더피프티원...',
          new: true,
          message: true,
          chatData: 999,
          templateData: 654,
          agencyData: 0
        },
        {
          mark: true,
          brandLogo: require('../../../assets/images/dummy/brand_logo_2.png'),
          title: 'CX hub',
          new: false,
          message: false,
          chatData: 275,
          templateData: 999,
          agencyData: 3
        },
        {
          mark: false,
          brandLogo: require('../../../assets/images/dummy/brand_logo_3.png'),
          title: 'SYSTEM HOMME',
          new: false,
          message: true,
          chatData: 102,
          templateData: 87,
          agencyData: 2
        },
        {
          mark: false,
          brandLogo: require('../../../assets/images/dummy/brand_logo_3.png'),
          title: 'SYSTEM STUDIO HOUSE',
          new: false,
          message: true,
          chatData: 714,
          templateData: 69,
          agencyData: 1
        },
        {
          mark: false,
          brandLogo: require('../../../assets/images/dummy/brand_logo_4.png'),
          title: '롯데홈쇼핑',
          new: false,
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
          authority: false
        },
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_2.png'),
          title: '더캐시미어',
          message: true,
          chatData: 275,
          templateData: 106,
          agencyData: 3,
          authority: true
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
          authority: true
        },
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_4.png'),
          title: '클럽모나코​',
          message: true,
          chatData: 127,
          templateData: 106,
          agencyData: 3,
          authority: true
        }
      ]
    }
  }
}
</script>

<style>

</style>
