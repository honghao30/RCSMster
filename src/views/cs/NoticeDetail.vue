<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <breadcrumb :depth1MenuId="'M0400'" :depth2MenuId="'M0401'"/>
      <div class="top_title_area">
        <h2 class="h2_title">공지사항</h2>
      </div>
      <div class="detail_view_wrap">
        <div class="subject_area">
          <strong class="label_notice" v-if="detailListsDetail.notiYn === 'y'">공지</strong>
          <strong class="label_notice" v-if="detailListsDetail.notiYn === 'n'">{{ this.query.no }}</strong>
          <strong class="title" v-html="detailListsDetail.subject"></strong>
          <span class="date">{{ detailListsDetail.modDt | prettyDate('YYYY-MM-DD') }}</span>
        </div>
        <div class="content_area">
<!--          <p v-html="detailListsDetail.ctn"></p>-->
          <vue-editor v-model="detailListsDetail.ctn" :editorOptions="editorOptions" disabled></vue-editor>
        </div>
        <div class="add_files_area" v-if="this.detailListFlag">
          <strong>첨부파일</strong>
          <p v-for="(list, index) in detailListsDetailList" :key="`detailListsDetailList_${index}`" style="margin-right:20px;">
            <a class="btn_down" :href="list.downloadUrl" target="_blank">
              <span class="text_green" v-html="list.fileName"></span>
            </a>
          </p>
        </div>
        <ul class="prev_next_list">
          <li>
            <strong @click="goPrevPage(detailListsNext.seq)">이전글</strong>
            <a href="javascript:void(0);" class="btn_text" @click="goPrevPage(detailListsNext.seq)" v-if="nextFlag" v-html="this.detailListsNext.subject"></a>
            <a v-if="!nextFlag">이전글이 없습니다.</a>
          </li>
          <li>
            <strong @click="goNextPage(detailListsPrev.seq)">다음글</strong>
            <a href="javascript:void(0);" class="btn_text" @click="goNextPage(detailListsPrev.seq)" v-if="prevFlag" v-html="this.detailListsPrev.subject"></a>
            <a v-if="!prevFlag">다음글이 없습니다.</a>
          </li>
        </ul>
      </div>
      <div class="btn_wrap right mar_t40">
        <a href="javascript:void(0);" class="btn mid bd_blue" @click="goNoticePage">목록</a>
      </div>
    </article>
  </div>
</template>
<script>
import { getDetailList } from '@/api/cs/notice'
import Breadcrumb from '@/components/global/Breadcrumb'

export default {
  name: 'NoticeDetail',
  components: { Breadcrumb },
  data() {
    return {
      query: '',
      detailLists: '',
      detailListsDetail: '',
      detailListsDetailList: [],
      detailListFlag: false,
      detailListsPrev: '',
      detailListsNext: '',
      detailListsPrevSubject: '',
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
  mounted() {},
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
