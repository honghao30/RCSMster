<template>
  <div class="rcs_container service_wrap">
    <!-- 2019.10.02 페이지 수정 -->
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'템플릿 관리'"/>
      </div>
      <brand-top active="template" :brandId="brandId"></brand-top>
      <div class="dashboard_wrap">
        <section class="section">
          <div class="title_area mar_b16">
            <h3 class="h3_title">기본(free)</h3>
            <ul class="bullet_list fs16">
              <li>기본(free)은 발송할 메시지에 대한 사전 등록이나 승인 없이 정보성 메시지를 발송할 수 있는 템플릿입니다.</li>
            </ul>
          </div>
          <div class="free_tpl">
            <div class="rcs_bundle_wrap">
              <div class="free_tpl_th">
                <div class="title_wrap">
                  <span class="h3_desc bold mar_b10">01</span>
                  <h4 class="h4_title">기본(free) 생성</h4>
                </div>
              </div>
              <div class="free_tpl_td">
                <span v-if="theme === 'TA'" class="h4_desc">브랜드별로 1개만 생성할 수 있습니다.</span>
                <span v-else class="h4_desc">브랜드 개설 후 승인완료 시 자동으로 기본(free)이 생성됩니다. (브랜드별로 생성)</span>
              </div>
            </div>
            <div class="rcs_bundle_wrap">
              <div class="free_tpl_th">
                <div class="title_wrap">
                  <span class="h3_desc bold mar_b10">02</span>
                  <h4 class="h4_title">기본(free) 안내</h4>
                </div>
              </div>
              <div class="free_tpl_td">
                <div class="cont_flex_bundle">
                  <div class="cont_bundle mar_r20">
                    <h4 class="h4_title mar_b10">기본(free) 정보</h4>
                    <ul class="bullet_list fs16">
                      <li>템플릿 ID : {{tplId}}</li>
                      <li>템플릿명 : {{tplNm}}</li>
                      <li>사용 브랜드 : {{brandNm}} ({{brandId}})</li>
                    </ul>
                  </div>
                  <div class="cont_bundle">
                    <h4 class="h4_title mar_b15">기본(free) 제한 사항</h4>
                    <ul class="bullet_list fs16">
                      <li>최대 메시지 입력 글자수 90자</li>
                      <li>이미지 첨부 불가</li>
                      <li>버튼 액션 사용 불가</li>
                      <li>광고 메시지 사용 불가 (정보성 메시지만 발송 가능)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="rcs_bundle_wrap br_b">
              <div class="free_tpl_th">
                <div class="title_wrap">
                  <span class="h3_desc bold mar_b10">03</span>
                  <h4 class="h4_title">기본(free) 사용 예시</h4>
                </div>
              </div>
              <div class="free_tpl_td">
                <div class="cont_flex_bundle">
                  <!-- <div class="tpl_ex_box mar_r20">
                    <h4 class="h4_title center">알림메시지</h4>
                    <span class="h4_desc Regular">
                      홍*동님 해피팡팡 주문주신 상품을
                      <br>우체국택배
                      <br>6022679429577로
                      <br>오늘 발송 예정입니다.
                    </span>
                  </div> -->
                  <!-- <div class="tpl_ex_box mar_r20">
                    <h4 class="h4_title center">알림메시지</h4>
                    <span class="h4_desc Regular">
                      홍*동님의 회원 가입이
                      <br>완료되었습니다.
                      <br>브랜드, 발신번호, 템플릿 등록이
                      <br>가능합니다. 다양한 템플릿 서비스를
                      <br>이용해 보세요.
                    </span>
                  </div> -->
                  <!-- <div class="tpl_ex_box mar_r20">
                    <h4 class="h4_title center">알림메시지</h4>
                    <span class="h4_desc Regular">
                      KB국민카드0*1*승인
                      <br>홍*동
                      <br>30,000원 일시불
                      <br>12/01 20:33
                      <br>GS25상암DMC점
                      <br>누적 245,145원
                    </span>
                  </div> -->
                  <!-- <div class="tpl_ex_box">
                    <h4 class="h4_title center">알림메시지</h4>
                    <span class="h4_desc Regular">
                      [인증번호:112256]
                      <br>사용자본인 인증번호를
                      <br>입력해주세요.
                    </span>
                  </div> -->
                  <div class="tpl_ex_box" :class="{ 'tp_free': theme === 'TA' }">
                    <h4 class="h4_title">알림</h4>
                    <span class="h4_desc Regular">
                      김** 고객님의 9월 사용금액<br/>
                      168,200원이 신한은행에서 금일 출금
                      예정입니다.<br/>
                      출금 계좌의 잔액을 확인해주세요.<br/><br/>

                      문의사항은 고객센터로 문의주세요.
                      <!--
                      김** 고객님의 9월 사용금액<br/> 168,200원이 신한은행에서 금일 출금<br/>
                      예정입니다.<br/> 출금 계좌의 잔액을 확인해주세요.<br/>
                      출금계좌 : 신한 123-4567-88899<br/><br/>
                      예금주 : 김**<br/>
                      출금예정일 : 2022년 9월 5일<br/><br/>
                      문의사항은 고객센터로 문의주세요.-->
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn_wrap right full_width mar_t40">
              <a href="javascript:void(0);" class="btn mid bd_blue" @click="goList">
                <span>목록</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>
<script>
import BrandTop from '@/views/service/components/BrandTop'
import Breadcrumb from '@/components/global/Breadcrumb'
import { retrieveTemplateDetail } from '@/api/service/template'

export default {
  name: 'TemplateFree',
  components: { BrandTop, Breadcrumb },
  data() {
    return {
      brandId: '',
      brandNm: '',
      tplId: '',
      tplNm: '',
      theme: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.brandId = this.$route.params.brandId
    this.tplId = this.$route.params.tplId
    this.theme = this.$route.params.theme
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      retrieveTemplateDetail(this.brandId, this.tplId)
        .then(res => {
          this.brandNm = res.result.brandNm
          this.tplNm = res.result.tplNm
        })
        .catch(err => {
          this.$alertMsg(err.desc).then(() => {
            if (err.code === '60000021') {
              this.$router.push({
                name: 'TemplateList',
                params: { brandId: this.brandId }
              })
            }
          })
        })
    },
    goList() {
      // 뒤로 가기로 변경
      this.$router.go(-1)
    }
  }
}
</script>
<style>
</style>
