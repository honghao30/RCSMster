<template>
  <div class="inner notice notice-content">
    <PageTitle pagetitle="공지사항" />
    <div class="table__wrap notice-table">
      <table class="table table-list notice-content__table">
        <colgroup>
          <col width="20%">
          <col>
          <col width="17%">
        </colgroup>
        <thead>
          <tr class="notice-content__subject">
            <th scope="col" colspan="2" class="notice-content__title">
              <p v-html="detailListsDetail.subject"></p>
            </th>
            <th scope="col" class="notice-content__date">
              <p>{{ detailListsDetail.modDt | prettyDate('YYYY-MM-DD') }}</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="this.detailListFlag">
            <td class="notice-content__file">
              <span>첨부파일</span>
            </td>
            <td colspan="2" class="notice-content__list">
              <ul>
                <li class="l-align title" v-for="(list, index) in detailListsDetailList" :key="`detailListsDetailList_${index}`">
                  <a :href="list.downloadUrl" download>
                    {{ list.fileName }}
                    <span class="ico-download"><span class="blind">다운로드</span></span>
                  </a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="notice-content__contents">
              <vue-editor v-model="detailListsDetail.ctn" :editorOptions="editorOptions" disabled></vue-editor>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="button__wrap notice-content__button">
      <ButtonCmp type="btn-blue" @click="goNoticePage">목록</ButtonCmp>
    </div>
    <div class="table__wrap notice-table notice-content__list">
      <table class="table table-list notice-content__table">
        <colgroup>
          <col width="3%">
          <col width="8%">
          <col>
        </colgroup>
        <tbody>
          <tr>
            <td><button class="ico-up" @click="goPrevPage(detailListsNext.seq)"></button></td>
            <td class="m-hidden"><p class="list-data">이전글</p></td>
            <td>
              <div class="l-align title">
                <a href="javascript:void(0);" @click="goPrevPage(detailListsNext.seq)" v-if="nextFlag" v-html="this.detailListsNext.subject"></a>
                <a v-if="!nextFlag">이전글이 없습니다.</a>
              </div>
            </td>
          </tr>
          <tr>
            <td><button class="ico-down" @click="goNextPage(detailListsPrev.seq)"></button></td>
            <td class="m-hidden"><p class="list-data">다음글</p></td>
            <td>
              <div class="l-align title">
                <a href="javascript:void(0);" @click="goNextPage(detailListsPrev.seq)" v-if="prevFlag" v-html="this.detailListsPrev.subject"></a>
                <a v-if="!prevFlag">다음글이 없습니다.</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { getDetailList } from '@/api/cs/notice'

export default {
  name: 'NoticeView',
  components: {
    PageTitle,
    ButtonCmp
  },
  data() {
    return {
      detailLists: '',
      detailListsDetail: '',
      detailListsDetailList: [],
      detailListFlag: false,
      detailListsPrev: '',
      detailListsNext: '',
      page: '',
      nextFlag: true,
      prevFlag: true,
      editorOptions: {
        modules: {
          toolbar: false
        }
      }
    }
  },
  created() {
    let params = this.$route.params.no
    this.page = this.$route.params.page
    getDetailList(params)
      .then(res => {
        this.detailLists = res.result
        this.detailListsDetail = this.detailLists.detail
        if (!jglib.isEmpty(res.result.detailList)) {
          this.detailListFlag = true
          this.detailListsDetailList = res.result.detailList
        } else {
          this.detailListFlag = false
        }
        if (this.detailLists.prev !== null) {
          this.detailListsPrev = this.detailLists.prev
          this.prevFlag = true
        } else {
          this.prevFlag = false
        }
        if (this.detailLists.next !== null) {
          this.detailListsNext = this.detailLists.next
          this.nextFlag = true
        } else {
          this.nextFlag = false
        }
      })
      .catch(e => {
        // console.log(e)
      })
  },
  methods: {
    goNoticePage() {
      this.$router.push({
        name: 'Notice',
        params: { page: this.page }
      })
    },
    goPrevPage(seq) {
      if (seq !== '') {
        let params = seq
        getDetailList(params)
          .then(res => {
            this.detailLists = res.result
            this.detailListsDetail = this.detailLists.detail
            if (!jglib.isEmpty(res.result.detailList)) {
              this.detailListFlag = true
              this.detailListsDetailList = res.result.detailList
            } else {
              this.detailListFlag = false
            }
            if (this.detailLists.prev !== null) {
              this.detailListsPrev = this.detailLists.prev
              this.prevFlag = true
            } else {
              this.prevFlag = false
            }
            if (this.detailLists.next !== null) {
              this.detailListsNext = this.detailLists.next
              this.nextFlag = true
            } else {
              this.nextFlag = false
            }
          })
          .catch(e => {
            // console.log(e)
          })
      }
    },
    goNextPage(seq) {
      if (seq !== '') {
        let params = seq
        getDetailList(params)
          .then(res => {
            this.detailLists = res.result
            this.detailListsDetail = this.detailLists.detail
            if (!jglib.isEmpty(res.result.detailList)) {
              this.detailListFlag = true
              this.detailListsDetailList = res.result.detailList
            } else {
              this.detailListFlag = false
            }
            if (this.detailLists.prev !== null) {
              this.detailListsPrev = this.detailLists.prev
              this.prevFlag = true
            } else {
              this.prevFlag = false
            }
            if (this.detailLists.next !== null) {
              this.detailListsNext = this.detailLists.next
              this.nextFlag = true
            } else {
              this.nextFlag = false
            }
          })
          .catch(e => {
            // console.log(e)
          })
      }
    }
  }
}
</script>

<style>

</style>
