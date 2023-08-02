<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="레이아웃 목록" />
        <div class="top-ctrl-area">
          <div class="left-area">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="~"
              format="yyyy.MM.dd"
              value-format="yyyyMMdd"
              ref="datePicker"
            />
            <Dropdown :options="rangeOption" v-model="selDateRange" @change="changeRange"/>
            <div class="search-area">
              <span class="input search-box">
                <input type="text" placeholder="검색어를 입력하세요." v-model="searchWord" />
                <ButtonCmp
                  type="btn-only-icon"
                  iconname='icon-search'
                  @click="loadLayoutList"
                >
                </ButtonCmp>
              </span>
            </div>
          </div>
          <div class="right-area">
            <Dropdown :options="layoutOptions" v-model="layoutOption" placeholder="레이아웃 유형"/>
          </div>
        </div>
        <div class="table__wrap chatroom__table">
          <table class="table table-list">
            <colgroup>
              <col width="15%"/>
              <col/>
              <col width="12%"/>
              <col width="12%" />
              <col width="12%"/>
              <col width="12%"/>
            </colgroup>
            <thead>
              <tr>                
                <th scope="col"><span>상품</span></th>
                <th scope="col"><span>레이아웃 명</span></th>                
                <th scope="col"><span>버튼 컬러</span></th>
                <th scope="col"><span>작성자</span></th>
                <th scope="col"><span>작성일</span></th>
                <th scope="col"><span>상태</span></th>
              </tr>
            </thead>
            <tbody v-if="layoutData.layoutList.length != 0">
              <tr
                v-for="(item, i) in layoutData.layoutList" :key="i"
              >
                <td>
                  {{ item.type }}
                </td>
                <td class="l-align">
                  <router-link to="">{{ item.name }}</router-link>
                </td>
                <td>
                  {{ item.btnColor }}
                </td>
                <td>
                  {{ item.regUserNm }}
                </td>
                <td>
                  {{ item.date | prettyDate('YYYY-MM-DD')}}
                </td>
                <td>
                  {{ item.status }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PagingCmp :total='layoutData.totalCount' :current-page='layoutData.formData.page' :pageSize='layoutData.formData.size' @change='loadLayoutList' v-if="layoutData.layoutList.length != 0"/>
        <!-- 레이아웃 등록 건수가 없을 떄  -->
        <div class="chatroom-none" v-if="layoutData.layoutList.length == 0">
          <PageTitle pagetitle="레이아웃 목록" :num= "0" />
          <div class="chatroom-none-txt">
            <h3>등록된 레이아웃이 없습니다.</h3>
            <p>관리자의 승인 없이도 레이아웃을 등록하여 SMS, LMS, MMS를 발송 할 수 있습니다.​<br>지금 바로 레이아웃을 등록 해보세요.​</p>
          </div>
          <div class="button__wrap">
            <router-link
              to=""
              class="btn btn-blue"
            >레이아웃 등록하기</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'

import {
  layoutList
} from '@/api/service/layout'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    Dropdown,
    PagingCmp
  },
  data() {
    return {
      selDateRange: '1w',
      brandId:'',
      dateRange: ['', ''],
      searchWord: '',
      templateOption: '',
      statusOption: '',
      layoutOption: 'all',
      layoutData: {
        formData: {
          userType: '',
          corpAdmYn: '',
          workType: '',
          histType: '',
          brandId: this.$router.currentRoute.params.brandId,
          page: 1,
          size: 6
        },
        totalCount: 0,
        layoutList: []
      },
      rangeOption: [
        {
          codeNm: '오늘',
          code: 'today'
        },
        {
          codeNm: '1주일',
          code: '1w'
        },
        {
          codeNm: '1개월',
          code: '1m'
        },
        {
          codeNm: '3개월',
          code: '3m'
        }
      ],
      layoutOptions: [
        {
          codeNm: '전체',
          code: 'all'
        },
        {
          codeNm: 'SMS',
          code: 'SMS'
        },
        {
          codeNm: 'LMS',
          code: 'LMS'
        },
        {
          codeNm: 'MMS',
          code: 'MMS'
        }
      ],
    }
  },
  mounted() {
    this.changeRange()
    this.loadLayoutList(1)
  },
  methods: {
    loadLayoutList(page){
      this.layoutData.layoutList = []
      this.brandId = this.layoutData.formData.brandId
      let reqData = {
            sampleYn: 'Y',
            prodCd: this.layoutOption,
            //keyword: this.searchWord, > 검색이 여러개 (현재 버튼 색 검색 disabled)
            layoutNm: this.searchWord,
            startDt: this.dateRange[0],
            endDt: this.dateRange[1],
            page: page
      }
      console.log(reqData)
      layoutList(this.brandId, reqData).then(res => {
              if(res.code == '20000000'){
                
                this.layoutData.formData.page = res.result.page
                this.layoutData.formData.size = res.result.size
                this.layoutData.totalCount = res.result.totalSize

                res.result.layoutList.forEach(data => {
                  let obj = {
                    id: '',
                    name: '',
                    btnColor: '',
                    regUserNm: '',
                    date: '',
                    status:''
                  }

                  obj.type = this.typeConverter(data.productCd)
                  obj.name = data.formNm
                  obj.btnColor = data.btnColor === null ? '-' : data.btnColor
                  obj.regUserNm = data.regUserNm
                  obj.date = data.regDt
                  obj.status = data.status === 'ACTIVE' ? '등록완료' : '등록중'

                  this.layoutData.layoutList.push(obj)
                })
              }
            })
            .catch(err => {
              this.$alertMsg(err.desc)
            })
    },

    typeConverter(type){
      let resultype = ""
      if(type === 'S'){
        resultype = 'SMS'
      }else if(type === 'L'){
        resultype = 'LMS'
      }else if(type === 'M'){
        resultype = 'MMS'
      }else if(type === 'I'){
        resultype = 'ITMPL'
      }
      return resultype
    },

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
      } else if (this.selDateRange === '3m') {
        let changeDate = today.getTime() - (90 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)
        let changeDateString = changeYear + changeMonth + changeday
        this.dateRange[0] = changeDateString
        this.$refs.datePicker.value = [changeDateString, dateString]
      }
    }
  }
}
</script>
