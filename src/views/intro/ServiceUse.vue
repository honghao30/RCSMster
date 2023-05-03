<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <breadcrumb :depth1MenuId="'M0100'" :depth2MenuId="'M0102'"/>
      <div class="top_title_area">
        <h1 class="h1_title">서비스 이용안내</h1>
      </div>
      <div class="use_info_service">
        <div class="cont_block_bundle">
          <div class="title_wrap">
            <h3 class="h3_title mar_b15">
              <span class="blue">01</span> RCS Biz Center 가입
            </h3>
            <span class="h3_desc">RCS Biz Center 이용을 위해선 기업 담당자 또는 대행사로 가입이 필요합니다.</span>
          </div>
          <div class="tbl_col_wrap mar_t35">
            <table class="tbl_col_type type2">
              <caption>
                <strong>서비스가입 안내</strong>
                <p>가입 구분, 계정 권한, 상세 설명</p>
              </caption>
              <colgroup>
                <col style="width:224px;">
                <col style="width:236px;">
                <col style="width:auto;">
              </colgroup>
              <thead>
                <tr>
                  <th class="br_r">가입 구분</th>
                  <th class="br_r">계정 권한</th>
                  <th>상세 설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th rowspan="2" class="br_r medium">기업 담당자</th>
                  <td class="br_r medium">기업 관리자</td>
                  <td class="left">
                    <ul class="bullet_list">
                      <li>가입 심사 승인 후 가입 완료</li>
                      <li>브랜드 개설 및 운영, 대행사 지정 가능</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td class="br_r medium">기업 담당자</td>
                  <td class="left">
                    <ul class="bullet_list">
                      <li>가입 심사 없이 즉시 가입 완료</li>
                      <li>개설 된 브랜드의 운영 가능</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th class="br_r medium">대행사</th>
                  <td class="br_r medium">대행사</td>
                  <td class="left">
                    <ul class="bullet_list">
                      <li>가입 심사 승인 후 가입 완료 (사업자등록증 제출 필수)</li>
                      <li>기업 관리자로부터 브랜드 운영 권한을 받아 브랜드 운영 가능 (발신번호/템플릿 관리)</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="cont_block_bundle">
          <div class="title_wrap">
            <h3 style="font-size: 18px; font-weight: bold;">※ RCS 서비스 사용 문의하기</h3>
            <span class="h3_desc">
              RCS서비스는 대행사를 통해 제공합니다. 견적 및 상세 기능은 대행사에 문의해주세요.
            </span>
          </div>
          <div class="tbl_col_wrap mar_t35">
            <table class="tbl_col_type type2">
              <caption>
                <strong>서비스사용 문의</strong>
                <p>대행사명, 전화번호, 이메일, 홈페이지, 제공서비스</p>
              </caption>
              <colgroup>
                <col style="width: 13%;"/>
                <col style="width: 13%;"/>
                <col style="width: 18%;"/>
                <col style="width: auto;"/>
                <col style="width: 6%;"/>
                <col style="width: 6%;"/>
                <col style="width: 6%;"/>
              </colgroup>
              <thead>
                <tr>
                  <th class="br_r" rowspan="2">대행사명</th>
                  <th class="br_r" rowspan="2">전화번호</th>
                  <th class="br_r" rowspan="2">이메일</th>
                  <th class="br_r" rowspan="2">홈페이지</th>
                  <th colspan="3">제공서비스</th>
                </tr>
                <tr>
                  <th class="br_r">단방향</th>
                  <th class="br_r">양방향</th>
                  <th>웹발송</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(agency, idx) in agencyList" :key="idx">
                  <td class="br_r">{{ agency.name }}</td>
                  <td class="br_r">{{ addHypenTel(agency.tel) }}</td>
                  <td class="br_r btn_text">
                    <span v-if="!agency.email">-</span>
                    <a v-else :href="`mailto:${agency.email}`">{{ agency.email }}</a>
                  </td>
                  <td class="br_r btn_text"><a :href="agency.url" target="_blank">{{ showOnlyDomain(agency.url) }}</a></td>
                  <td class="br_r">{{ agency.rcsSvc.includes('a2p') ? 'O' : 'X' }}</td>
                  <td class="br_r">{{ agency.rcsSvc.includes('chat') ? 'O' : 'X' }}</td>
                  <td>{{ agency.webSendYn === 'Y' ? 'O' : 'X' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="cont_block_bundle">
          <div class="title_wrap">
            <h3 class="h3_title mar_b15">
              <span class="blue">02</span> 브랜드 개설
            </h3>
            <span class="h3_desc">
              RCS Biz 메시지를 발송하기 위해서는 브랜드를 개설해야 합니다.
              <br>브랜드 개설 시 등록한 정보는 운영자 심사 완료 후 메시지 앱의 프로필 영역에 노출 됩니다.
            </span>
          </div>
          <div class="tbl_col_wrap mar_t35">
            <table class="tbl_col_type type2">
              <caption>
                <strong>브랜드 개설 정보</strong>
                <p>필수 입력 정보, 선택 정보</p>
              </caption>
              <colgroup>
                <col style="width:50%;">
                <col style="width:50%;">
              </colgroup>
              <thead>
                <tr>
                  <th class="br_r">필수 입력 정보</th>
                  <th>선택 정보</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="br_r">브랜드명, 프로필 이미지, 발신번호, 카테고리 설정, 통신서비스 가입증명원</td>
                  <td>브랜드 설명, 백그라운드 이미지, 홈페이지 주소, 이메일, 주소, 추가 발신번호</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="cont_block_bundle">
          <div class="title_wrap">
            <h3 class="h3_title mar_b15">
              <span class="blue">03</span> 브랜드 대행사/부관리자 지정
            </h3>
            <span class="h3_desc">
              브랜드 별로 RCS 서비스를 운영할 부관리자와 대행사를 지정합니다.
              <br>RCS Biz 메시지를 발송하기 위해서는 반드시 하나 이상의 대행사에 브랜드 운영 권한을 부여해야 합니다.
            </span>
            <span
              class="h3_desc red caption mar_t15"
            >원활한 서비스 이용을 위해 사전에 대행사와 브랜드 운영 및 RCS Biz 메시지 발송에 대한 계약을 진행해 주세요.</span>
          </div>
          <div class="img_intro11 mar_t40"></div>
        </div>
        <div class="cont_block_bundle">
          <div class="title_wrap">
            <h3 class="h3_title mar_b15">
              <span class="blue">04</span> 발신번호 등록
            </h3>
            <span class="h3_desc">
              RCS Biz 메시지를 발송할 발신 전화번호는 사전에 등록해야 합니다. (통신서비스 가입증명원 제출 필수)
              <br>브랜드 별 다수의 발신번호를 등록 가능하나 번호를 중복하여 사용할 순 없습니다.
            </span>
          </div>
          <div class="tbl_col_wrap mar_t35">
            <table class="tbl_col_type type2">
              <caption>
                <strong>등록 가능한 발신번호</strong>
                <p>구분, 설명</p>
              </caption>
              <colgroup>
                <col style="width:339px;">
                <col style="width:auto;">
              </colgroup>
              <thead>
                <tr>
                  <th class="br_r">구분</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="br_r">유선 전화번호</td>
                  <td class="left">지역번호 포함한 전화번호 (17개 지역번호)</td>
                </tr>
                <tr>
                  <td class="br_r">전국 대표번호</td>
                  <td class="left">15XX, 16XX, 18XX 등 대표번호</td>
                </tr>
                <tr>
                  <td class="br_r">공통서비스식별번호(0N0계열)</td>
                  <td class="left">030, 050, 070 등 번호</td>
                </tr>
                <tr>
                  <td class="br_r">특수번호</td>
                  <td class="left">112, 1355 등은 해당 사용자(국가, 지방단체, 공공기관 등)에 한하여 사용 가능</td>
                </tr>
              </tbody>
            </table>
          </div>
          <span class="h3_desc caption mar_t15">이동통신전화번호(010-0000-0000)는 추후 제공 예정</span>
          <span class="h3_desc caption mar_t5">발신번호는 수신자가 실제 발신(통화)이 가능한 번호만 허용</span>
        </div>

        <div class="cont_block_bundle">
          <div class="title_wrap">
            <h3 class="h3_title mar_b15">
              <span class="blue">05</span> 양방향 대화방 등록
            </h3>
            <span class="h3_desc">
              고객과의 양방향 소통을 위해서는 양방향 대화방 등록이 필요 합니다.<br>
              기존에 등록한 발신번호 기반 또는 ID 등록을 통한 개설이 가능하며, 브랜드 별 다수의 양방향 대화방 등록이 가능 합니다.
            </span>
          </div>
          <div class="tbl_col_wrap mar_t35">
            <table class="tbl_col_type type2">
              <caption>
                <strong>양방향 대화방 등록</strong>
                <p>구분, 설명, 운영자 승인 여부</p>
              </caption>
              <colgroup>
                <col style="width:220px;">
                <col style="width:auto;">
                <col style="width:290px;">
              </colgroup>
              <thead>
                <tr>
                  <th class="br_r">구분</th>
                  <th class="br_r">설명</th>
                  <th>운영자 승인 여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="br_r">대화방 명</td>
                  <td class="br_r left">기존에 등록된 발신번호명을 사용하거나, 변경하여 개설 가능</td>
                  <td>승인 필요</td>
                </tr>
                <tr>
                  <td class="br_r">발신번호</td>
                  <td class="br_r left">기존에 등록된 발신번호로 양방향 대화방 개설 가능</td>
                  <td>승인 불필요</td>
                </tr>
                <tr>
                  <td class="br_r">챗봇 ID</td>
                  <td class="br_r left">대화방 ID를 직접 등록하여 개설 가능</td>
                  <td>승인 불필요</td>
                </tr>
                <tr>
                  <td class="br_r">대행사</td>
                  <td class="br_r left">챗봇 서비스(양방향 대화방)를 제공하는 대행사 등록 필요</td>
                  <td>승인 불필요</td>
                </tr>
                <tr>
                  <td class="br_r">대화방 메뉴</td>
                  <td class="br_r left">대화방 메뉴 사용여부 및 메뉴 등록</td>
                  <td>승인 불필요</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="cont_block_bundle">
          <div class="title_wrap">
            <h3 class="h3_title mar_b15">
              <span class="blue">06</span> 템플릿 등록
            </h3>
            <span class="h3_desc">
              브랜드를 개설하고 승인된 발신번호로 메시지를 발송할 수 있는 템플릿은 텍스트 유형과 이미지 유형으로 구분할 수 있습니다.<br>
              텍스트 템플릿은 타이틀 선택형과 타이틀 자유형이 제공되며 다양한 형태로 메시지를 발송할 수 있습니다.<br>
              이미지 템플릿은 보다 다양한 형태와 옵션으로 메시지 성격에 맞는 이미지를 표현할 수 있으며 정보성은 물론 광고성 메시지도 발송할 수 있습니다.
            </span>
          </div>
          <div class="tbl_col_wrap mar_t35">
            <table class="tbl_col_type type2">
              <caption>
                <strong>템플릿 등록</strong>
                <p>구분, RCS SMS, RCS LMS, RCS MMS, RCS 텍스트 템플릿, RCS 이미지 템플릿</p>
              </caption>
              <colgroup>
                <col style="width: 8%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
                <col style="width: 5%;">
              </colgroup>
              <thead>
                <tr>
                  <th class="br_r th_16" rowspan="2">구분</th>
                  <th class="br_r th_16" rowspan="2">RCS<br>SMS</th>
                  <th class="br_r th_16" rowspan="2">RCS<br>LMS</th>
                  <th class="br_r th_16" rowspan="2">RCS<br>MMS</th>
                  <th class="br_r th_16" colspan="3">RCS 텍스트 템플릿</th>
                  <th class="th_16" colspan="8">RCS 이미지 템플릿</th>
                </tr>
                <tr>
                 <th class="br_r" style="font-size: 15px;" colspan="3">타이틀 선택형 / 타이틀 자유형</th>
                 <th class="br_r" style="font-size: 15px; padding: 5px;" colspan="2">이미지 & 타이틀 강조형</th>
                 <th class="br_r" style="font-size: 15px;" colspan="2">이미지 강조형</th>
                 <th class="br_r" style="font-size: 15px;" colspan="2">썸네일형</th>
                 <th style="font-size: 15px;" colspan="2">SNS형</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="br_r small">메시지 타입</td>
                  <td class="br_r" style="font-size: 13px;">Formatcard</td>
                  <td class="br_r" style="font-size: 13px;">Formatcard</td>
                  <td class="br_r" style="font-size: 13px;">Formatcard</td>
                  <td class="br_r small red">서술<br><span style="font-size: 12px;">(Description)</span></td>
                  <td class="br_r small red">스타일<br><span style="font-size: 13px;">(Cell)</span></td>
                  <td class="br_r small">기본<br><span style="font-size: 13px;">(Free)</span></td>
                  <td class="br_r small blue">정방형<br>(1:1)</td>
                  <td class="br_r small blue">세로형<br>(3:4)</td>
                  <td class="br_r small blue">정방형<br>(1:1)</td>
                  <td class="br_r small blue">세로형<br>(3:4)</td>
                  <td class="br_r small blue">세로형</td>
                  <td class="br_r small blue">가로형</td>
                  <td class="br_r small blue">-</td>
                  <td class="small blue">중간<br>버튼</td>
                </tr>
                <tr>
                  <td class="br_r small">운영자 승인 여부</td>
                  <td class="br_r small">불필요</td>
                  <td class="br_r small">불필요</td>
                  <td class="br_r small">불필요</td>
                  <td class="br_r small red" style="font-weight: bold; color: #a00000">필요</td>
                  <td class="br_r small red" style="font-weight: bold; color: #a00000">필요</td>
                  <td class="br_r small">불필요</td>
                  <td class="br_r small blue" style="font-weight: bold; color: #2c398a">필요</td>
                  <td class="br_r small blue" style="font-weight: bold; color: #2c398a">필요</td>
                  <td class="br_r small blue" style="font-weight: bold; color: #2c398a">필요</td>
                  <td class="br_r small blue" style="font-weight: bold; color: #2c398a">필요</td>
                  <td class="br_r small blue" style="font-weight: bold; color: #2c398a">필요</td>
                  <td class="br_r small blue" style="font-weight: bold; color: #2c398a">필요</td>
                  <td class="br_r small blue" style="font-weight: bold; color: #2c398a">필요</td>
                  <td class="small blue" style="font-weight: bold; color: #2c398a">필요</td>
                </tr>
                <tr>
                  <td class="br_r small small">정보성 메시지 발송</td>
                  <td class="br_r small">가능</td>
                  <td class="br_r small">가능</td>
                  <td class="br_r small">가능</td>
                  <td class="br_r small red">가능</td>
                  <td class="br_r small red">가능</td>
                  <td class="br_r small">가능</td>
                  <td class="br_r small blue">가능</td>
                  <td class="br_r small blue">가능</td>
                  <td class="br_r small blue">가능</td>
                  <td class="br_r small blue">가능</td>
                  <td class="br_r small blue">가능</td>
                  <td class="br_r small blue">가능</td>
                  <td class="br_r small blue">가능</td>
                  <td class="small blue">가능</td>
                </tr>
                <tr>
                  <td class="br_r small">광고성 메시지 발송</td>
                  <td class="br_r small">가능</td>
                  <td class="br_r small">가능</td>
                  <td class="br_r small">가능</td>
                  <td class="br_r small red" style="font-weight: bold;">불가</td>
                  <td class="br_r small red" style="font-weight: bold;">불가</td>
                  <td class="br_r small" style="font-weight: bold;">불가</td>
                  <td class="br_r small blue">가능</td>
                  <td class="br_r small blue">가능</td>
                  <td class="br_r small blue">가능</td>
                  <td class="br_r small blue">가능</td>
                  <td class="br_r small blue">가능</td>
                  <td class="br_r small blue">가능</td>
                  <td class="br_r small blue">가능</td>
                  <td class="small blue">가능</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="cont_block_bundle">
          <div class="title_wrap">
            <h3 class="h3_title mar_b15">
              <span class="blue">07</span> 자동응답 등록
            </h3>
            <span class="h3_desc">
              양방향 대화방 이용 시 고객 문의에 미리 등록한 자동응답 메시지를 발송할 수 있습니다.
            </span>
          </div>
          <div class="tbl_col_wrap mar_t35">
            <table class="tbl_col_type type2">
              <caption>
                <strong>자동응답 등록</strong>
                <p>구분, 설명, 운영자 승인 여부</p>
              </caption>
              <colgroup>
                <col style="width:220px;">
                <col style="width:auto;">
                <col style="width:290px;">
              </colgroup>
              <thead>
                <tr>
                  <th class="br_r">구분</th>
                  <th class="br_r">설명</th>
                  <th>운영자 승인 여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="br_r">자동응답 템플릿</td>
                  <td class="br_r left">다양한 템플릿 중 선택하여 이미지와 TEXT로 응답 내용 작성</td>
                  <td>승인 불필요</td>
                </tr>
                <tr>
                  <td class="br_r">칩 리스트</td>
                  <td class="br_r left">예상되는 고객의 질의를 최대 11개의 칩리스트로 등록 가능</td>
                  <td>승인 불필요</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="cont_block_bundle">
          <div class="title_wrap">
            <h3 class="h3_title mar_b15">
              <span class="blue">08</span> 브랜드 소식 등록
            </h3>
            <span class="h3_desc">
              브랜드의 신상품, 이벤트, 공지사항 등을 등록하여 브랜드 홍보가 가능 합니다.<br>
              소식의 스타일에 맞는 다양한 레이아웃으로 등록 가능 합니다.
            </span>
          </div>
          <div class="tbl_col_wrap mar_t35">
            <table class="tbl_col_type type2">
              <caption>
                <strong>브랜드 소식 등록</strong>
                <p>구분, 설명, 운영자 승인 여부</p>
              </caption>
              <colgroup>
                <col style="width:220px;">
                <col style="width:auto;">
                <col style="width:290px;">
              </colgroup>
              <thead>
                <tr>
                  <th class="br_r">구분</th>
                  <th class="br_r">설명</th>
                  <th>운영자 승인 여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="br_r">Gallery type</td>
                  <td class="br_r left">한 장 또는 다수의 이미지를 강조하여 등록</td>
                  <td>승인 불필요</td>
                </tr>
                <tr>
                  <td class="br_r">Sharing type</td>
                  <td class="br_r left">SNS, 동영상 등 외부 페이지를 연결하여 등록</td>
                  <td>승인 불필요</td>
                </tr>
                <tr>
                  <td class="br_r">Slide view type</td>
                  <td class="br_r left">다수의 슬라이드 구성을 통한 등록</td>
                  <td>승인 불필요</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import Breadcrumb from '@/components/global/Breadcrumb'
import { getAgencyList } from '@/api/utility/utility'

export default {
  name: 'serviceuse',
  components: { Breadcrumb },
  data() {
    return {
      agencyList: []
    }
  },
  created() {
    let param = { page: 1, size: 99999 }
    getAgencyList(param).then(res => {
      if (res.code === '20000000') this.agencyList = res.result.list
      else this.agencyList = []
    }).catch(() => {
      this.agencyList = []
    })
  },
  methods: {
    addHypenTel(tel) {
      if (jglib.isPhoneNumber(tel)) {
        return jglib.mobileNumConverter(tel)
      } else {
        return jglib.telNumConverter(tel)
      }
    },
    // url 출력은 도메인 까지만 한다.
    showOnlyDomain(fullUrl) {
      let idx, protocol, url
      if (fullUrl.includes('http://')) idx = 7
      else if (fullUrl.includes('https://')) idx = 8
      protocol = fullUrl.substring(0, idx)
      url = fullUrl.substring(idx, fullUrl.length)
      let domain = url.split('/')[0]
      return `${protocol}${domain}`
    }
  }
}
</script>

<style lang="less" scoped>
  .th_16 {
    font-size: 16px;
  }
</style>
