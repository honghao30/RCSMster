<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap stat__wrap">
        <PageTitle pagetitle="메시지 통계 목록" />
        <div class="top-ctrl-area">
          <div class="left-area">
            <!-- 그룹 ID 전체 -->
            <Dropdown searchable :options="groupIdOptions" placeholder="그룹 ID 전체" class="group-box"/>
            <!-- 발신번호/챗봇 ID 전체 -->
            <Dropdown searchable :options="numChatOptions" placeholder="발신번호/챗봇 ID 전체" class="numchat-box"/>
            <!-- 기간 / datepicker -->
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="~"
              format="yyyy.MM.dd"
              value-format="yyyyMMdd"
              ref="datePicker"
            />
            <!-- 조회기간 -->
            <Dropdown :options="rangeOption" v-model="selDateRange" @change="changeRange" class="range-box"/>
            <!-- 검색 버튼 -->
            <ButtonCmp
              type="btn-default-line"
            >검색</ButtonCmp>
          </div>
          <div class="right-area">
            <p>총 {{ msgStatList.length }}건</p>
          </div>
        </div>
        <div>
          <p>총 <strong>30</strong>건</p>
        </div>
        <div class="table__wrap" >
          <table class="table table-list">
            <colgroup>
              <col width="231px">
              <col width="192px">
              <col width="182px">
              <col width="182px"/>
              <col width="110px"/>
              <col width="112px"/>
              <col width="112px"/>
            </colgroup>
            <thead>
              <tr>
                <th scope="col"><span>그룹 ID</span></th>
                <th scope="col"><span>발신번호/챗봇 ID</span></th>
                <th scope="col"><span>발송 성공 건수</span></th>
                <th scope="col"><span>읽음 확인 건수</span></th>
                <th scope="col"><span>읽음 확인율</span></th>
                <th scope="col"><span>반응수</span></th>
                <th scope="col"><span>반응률</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in msgStatList" :key="i"
              >
                <td>
                  <!-- 그룹ID 선택 시 상세페이지로 이동 / router-link..? -->
                  {{ item.groupId }}
                </td>
                <td>
                  {{ item.numChat }}
                </td>
                <td>
                  {{ item.sendSuccess }}
                </td>
                <td>
                  {{ item.readCheckNum }}
                </td>
                <td>
                  {{ item.readCheckRate }}
                </td>
                <td>
                  {{ item.responseNum }}
                </td>
                <td>
                  {{ item.responseRate }}
                </td>
              </tr>
              <!-- 검색 결과 없는 경우 -->
              <tr class="stat-no-data">
                <td colspan="7">
                  검색 결과가 없습니다.
                </td>
              </tr>
              <!-- //검색 결과 없는 경우 -->
            </tbody>
          </table>
        </div>
        <PagingCmp />
        <div class="top-notice--gray">
          <ul>
            <li>- 그룹ID를 추가한 메시지에 한해 메시지 통계를 확인 할 수 있습니다.</li>
            <li>- 그룹ID는 분석하고자 하는 메시지별로 설정하는 것을 권장합니다.
              <!-- 툴팁 -->
              <ToolTipEl
                direction="bottomPos"
                elAlign="leftType"
                width="418"
                mode="default"
                >
                <template slot="tooltip-message">
                  <div class="message__innerbox"
                  >
                    <div class="message__innerbox-each">
                      <h5>예&#41;</h5>
                      <p>FW시즌 프로모션에 대한 메시지를<br>
                        ①FW 신상품 소개 ②아울렛 상품 소개로 나눠 2차례 발송하고자 함
                      </p>
                    </div>
                    <div class="message__innerbox-each">
                      <h5>CASE1</h5>
                      <p>FW 시즌 프로모션 기간 동안 발송한 문자를 통합하여 고객 반응 통계를 확인하고자 하는 경우 ①과② 메시지에 동일한 그룹ID를 설정</p>
                    </div>
                    <div class="message__innerbox-each">
                      <h5>CASE2</h5>
                      <p>FW 시즌 프로모션 기간 동안 발송한 문자 각각에 대해 고객반응통계를 확인하고자 하는 경우 ①과② 메시지에 각각 다른 그룹ID 설정</p>
                    </div>
                  </div>
                </template>
              </ToolTipEl>
              <!-- // 툴팁 -->
            </li>
            <li>- 동일 그룹ID 발송일 기준 3일간 (D+3) 집계됩니다.  단, 총 발송건수 약 500건 (이통사별 발송 성공건수 100건 이상)인 경우에 한해 집계됩니다.</li>
            <li>- 최근 1년 6개월 이내 기간 중 최대 31일까지 검색 가능합니다. 조회 시, 캠페인 발송 시작일을 포함하여 조회하시기 바랍니다.
              <!-- 툴팁 -->
              <ToolTipEl
                direction="bottomPos"
                elAlign="leftType"
                width="418"
                mode="default"
                >
                <template slot="tooltip-message">
                  <div class="message__innerbox"
                  >
                    <div class="message__innerbox-each">
                      <h5>예&#41;</h5>
                      <p>광고 캠페인의 메시지 발송을 ’23년 2월 1일에 한 경우, 기간 조회 시 2월 1일을 포함해서 조회</p>
                    </div>
                    <div class="message__innerbox-each">
                      <h5>CASE1</h5>
                      <p>&middot; 2월 2일부터 조회 시 발송 성공 건수가 ‘0’으로 보이게 됩니다.</p>
                    </div>
                  </div>
                </template>
              </ToolTipEl>
              <!-- // 툴팁 -->
            </li>
            <li>- 1일 내 동일 고객의 버튼 클릭 수 제외됩니다.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import ToolTipEl from '@/components/common/Tooltip.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    Dropdown,
    ButtonCmp,
    PagingCmp,
    ToolTipEl
  },
  data() {
    return {
      selDateRange: '',
      dateRange: [],
      groupIdOptions: [
        {
          label: '9743089AF350B7845589',
          value: 'GroupId01'
        },
        {
          label: '3859034853457FDJH2309',
          value: 'GroupId02'
        },
        {
          label: '3859034853457FDJH2309',
          value: 'GroupId03'
        },
        {
          label: '3859034853457FDJH2309',
          value: 'GroupId04'
        }
      ],
      numChatOptions: [
        {
          label: '023352286',
          value: 'NumChat01'
        },
        {
          label: '15886542',
          value: 'NumChat02'
        },
        {
          label: 'bot-i7ke7f30e6b',
          value: 'NumChat03'
        },
        {
          label: 'bot-i7ke7f30e6b',
          value: 'NumChat04'
        }
      ],
      rangeOption: [
        {
          label: '오늘',
          value: 'today'
        },
        {
          label: '1주일',
          value: '1w'
        },
        {
          label: '1개월',
          value: '1m'
        }
      ],
      msgStatList: [
        {
          groupId: '9743089AF350B7845589',
          numChat: '1588-6542',
          sendSuccess: '923,342,343건',
          readCheckNum: '456,540,245건',
          readCheckRate: '76.4%',
          responseNum: '540,245건',
          responseRate: '13.8%'
        },
        {
          groupId: '9743089AF350B7845589',
          numChat: '1588-6542',
          sendSuccess: '923,342,343건',
          readCheckNum: '456,540,245건',
          readCheckRate: '76.4%',
          responseNum: '540,245건',
          responseRate: '13.8%'
        },
        {
          groupId: '9743089AF350B7845589',
          numChat: '1588-6542',
          sendSuccess: '923,342,343건',
          readCheckNum: '456,540,245건',
          readCheckRate: '76.4%',
          responseNum: '540,245건',
          responseRate: '13.8%'
        },
        {
          groupId: '9743089AF350B7845589',
          numChat: '1588-6542',
          sendSuccess: '923,342,343건',
          readCheckNum: '456,540,245건',
          readCheckRate: '76.4%',
          responseNum: '540,245건',
          responseRate: '13.8%'
        },
        {
          groupId: '9743089AF350B7845589',
          numChat: '1588-6542',
          sendSuccess: '923,342,343건',
          readCheckNum: '456,540,245건',
          readCheckRate: '76.4%',
          responseNum: '540,245건',
          responseRate: '13.8%'
        },
        {
          groupId: '9743089AF350B7845589',
          numChat: '1588-6542',
          sendSuccess: '923,342,343건',
          readCheckNum: '456,540,245건',
          readCheckRate: '76.4%',
          responseNum: '540,245건',
          responseRate: '13.8%'
        },
        {
          groupId: '9743089AF350B7845589',
          numChat: '1588-6542',
          sendSuccess: '923,342,343건',
          readCheckNum: '456,540,245건',
          readCheckRate: '76.4%',
          responseNum: '540,245건',
          responseRate: '13.8%'
        },
        {
          groupId: '9743089AF350B7845589',
          numChat: '1588-6542',
          sendSuccess: '923,342,343건',
          readCheckNum: '456,540,245건',
          readCheckRate: '76.4%',
          responseNum: '540,245건',
          responseRate: '13.8%'
        },
        {
          groupId: '9743089AF350B7845589',
          numChat: '1588-6542',
          sendSuccess: '923,342,343건',
          readCheckNum: '456,540,245건',
          readCheckRate: '76.4%',
          responseNum: '540,245건',
          responseRate: '13.8%'
        },
        {
          groupId: '9743089AF350B7845589',
          numChat: '1588-6542',
          sendSuccess: '923,342,343건',
          readCheckNum: '456,540,245건',
          readCheckRate: '76.4%',
          responseNum: '540,245건',
          responseRate: '13.8%'
        }
      ]
    }
  },
  created() {
    let today = new Date()
    let year = today.getFullYear()
    let month = ('0' + (today.getMonth() + 1)).slice(-2)
    let day = ('0' + today.getDate()).slice(-2)
    let dateString = year + month + day
    this.dateRange = [ dateString, dateString ]
  },
  methods: {
    changeRange() {
      let today = new Date()
      let year = today.getFullYear()
      let month = ('0' + (today.getMonth() + 1)).slice(-2)
      let day = ('0' + today.getDate()).slice(-2)
      let dateString = year + month + day
      this.dateRange[1] = dateString
      if (this.selDateRange === 'today') {
        this.dateRange[0] = dateString
        this.$refs.datePicker.value = [dateString, dateString]
      } else if (this.selDateRange === '1w') {
        let changeDate = today.getTime() - (7 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)
        let changeDateString = changeYear + changeMonth + changeday
        this.dateRange[0] = changeDateString
        this.$refs.datePicker.value = [changeDateString, dateString]
      } else if (this.selDateRange === '1m') {
        let changeDate = today.getTime() - (30 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)
        let changeDateString = changeYear + changeMonth + changeday
        this.dateRange[0] = changeDateString
        this.$refs.datePicker.value = [changeDateString, dateString]
      }
    },
    changeCal() {
      this.selDateRange = ''
    }
  }
}
</script>
