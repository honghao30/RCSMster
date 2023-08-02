<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="템플릿 메시지 목록" />
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
                <input type="text" placeholder="검색어를 입력하세요." v-model="searchWord"/>
                <ButtonCmp
                  type="btn-only-icon"
                  iconname='icon-search'
                  @click="loadTemplateList"
                >
                </ButtonCmp>
              </span>
            </div>
          </div>
          <div class="right-area">
            <Dropdown :options="templateOptions" v-model="templateOption" placeholder="템플릿 유형"/>
            <Dropdown :options="statusOptions" v-model="statusOption" placeholder="상태"/>
          </div>
        </div>
        <div class="table__wrap chatroom__table">
          <table class="table table-list">
            <colgroup>
              <col width="12%"/>
              <col width="14%"/>
              <col width="14%"/>
              <col />
              <col width="12%"/>
              <col width="12%"/>
              <col width="12%"/>
            </colgroup>
            <thead>
              <tr>
                <th scope="col"><span>템플릿 ID</span></th>
                <th scope="col"><span>템플릿 유형</span></th>
                <th scope="col"><span>템플릿 상품</span></th>
                <th scope="col"><span>템플릿 명</span></th>
                <th scope="col"><span>작성자</span></th>
                <th scope="col"><span>최종 수정일</span></th>
                <th scope="col"><span>상태</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in templateData.templateList" :key="i"
              >
                <td>
                  {{ item.tplId }}
                </td>
                <td>
                  {{ item.productCd }}
                </td>
                <td>
                  {{ item.formNm }}
                </td>
                <td>
                  <router-link :to="{name: 'editTemplate', params: {tplId: item.tplId}}">{{ item.tplNm }}</router-link>
                </td>
                <td>
                  {{ item.regUserNm }}
                </td>
                <td>
                  {{ item.date | prettyDate('YYYY-MM-DD')}}
                </td>
                <td>
                  <span :class="{'reject' : item.status === '반려'}">
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PagingCmp :total='templateData.totalCount' :current-page='templateData.formData.page' :pageSize='templateData.formData.size' @change='loadTemplateList'/>
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
  templateList
} from '@/api/service/template'

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
      dateRange: ['', ''],
      searchWord: '',
      templateOption: 'all',
      templateData: {
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
        templateList: []
      },
      statusOption: '',
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
      templateOptions: [
        {
          codeNm: '전체',
          code: 'all'
        },
        {
          codeNm: '텍스트 템플릿',
          code: 'TT'
        },
        {
          codeNm: 'LMS 템플릿',
          code: 'LT'
        },
        {
          codeNm: '이미지 템플릿',
          code: 'IT'
        }
      ],
      statusOptions: [
        {
          codeNm: '전체',
          code: 'all'
        },
        {
          codeNm: '임시저장',
          code: 'SAVED'
        },
        {
          codeNm: '승인 대기',
          code: 'WAITING'
        },
        {
          codeNm: '승인 완료',
          code: 'ACTIVE'
        },
        {
          codeNm: '반려',
          code: 'REJECTED'
        }
      ],
    }
  },
  mounted() {
    this.changeRange()
    this.loadTemplateList(1)
  },
  methods: {
    loadTemplateList(page){
      console.log(page)
      this.templateData.templateList = []
      this.brandId = this.templateData.formData.brandId
      let reqData = {
        aprvRet: this.statusOption, //상태(status)
        //keyword: this.searchWord, > 검색이 여러개 (현재 버튼 색 검색 disabled)
        type: this.templateOption, //템플릿 타입
        inputValue: this.searchWord,
        startDt: this.dateRange[0],
        endDt: this.dateRange[1],
        page: page
      }
      console.log(reqData)
      templateList(this.brandId, reqData).then(res => {
              if(res.code == '20000000'){
                console.log(res);

                this.templateData.formData.page = res.result.page
                this.templateData.formData.size = res.result.size
                this.templateData.totalCount = res.result.totalSize

                res.result.templateList.forEach(data => {
                  let obj = {
                    tplId: '',
                    productCd: '',
                    formNm:'',
                    tplNm: '',
                    regUserNm: '',
                    date: '',
                    status:''
                  }

                  obj.tplId = data.tplId
                  obj.productCd = this.typeConverter(data)
                  obj.formNm = data.formNm
                  obj.tplNm = data.tplNm
                  obj.regUserNm = data.regUserNm
                  obj.date = data.regDt
                  obj.status = this.statusConverter(data.aprvRet)

                  this.templateData.templateList.push(obj)
                })
              }
            })
            .catch(err => {
              this.$alertMsg(err.desc)
            })
    },
    statusConverter(status){
      let resultype = ""
      if(status === ''){
        resultype = '-'
      }else if(status === 'SAVED'){
        resultype = '저장'
      }else if(status === 'WAITING'){
        resultype = '승인대기'
      }else if(status === 'INSPECTED'){
        resultype = '승인대기'
      }else if(status === 'REJECTED'){
        resultype = '반려'
      }else{
        resultype = '승인완료'
      }
      return resultype
    },
    // typeConverter(data){
    //   let resultype = ""
    //   let type = data.cardType
    //   let prodCd = data.productCd
    //   let category = data.tplBizCate

    //   if(prodCd === 'T'){
    //     if(category === 'TA'){
    //       resultype = '타이틀 자유형'
    //     }else{
    //       resultype = '타이틀 선택형'
    //     }
    //   }else if(prodCd === 'L'){
    //     resultype = 'LMS템플릿'
    //   }else if(prodCd === 'I'){
    //     if(type.includes('HIT')){
    //       resultype = '이미지 & 타이틀 강조형'
    //     }else if(type.includes('HIM')){
    //       resultype = '이미지 강조형'
    //     }else if(type.includes('TBN')){
    //       resultype = '썸네일형'
    //     }else if(type.includes('SNS')){
    //       resultype = 'SNS형'
    //     }else(
    //       resultype = '이미지템플릿'
    //     )
    //   }else if(prodCd === 'F'){
    //     resultype = '기본템플릿'
    //   }
    //   return resultype
    // },
    typeConverter(data){
      let resultype = ""
      let prodCd = data.productCd

      if(prodCd === 'T'){
        resultype = '텍스트 템플릿'
      }else if(prodCd === 'L'){
        resultype = 'LMS 템플릿'
      }else if(prodCd === 'I'){
        resultype = '이미지 템플릿'
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
