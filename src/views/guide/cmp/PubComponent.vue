<template>
  <div class="ia__list">
    <div :class="{ collapse : collapse }"  class="ia__list__header" @click="toggleList();">
      <h2 class="ia__list__title">{{ title }}</h2>
      <!-- <div class="ia__list__legend">
        <span>총 페이지: {{list.length}}</span> /
        <span>완료: {{ comptNum }}</span> /
        <span>진척률: {{ Math.round(comptNum / list.length * 100) }} %</span>
      </div> -->
    </div>
    <div class="ia__list__content" v-if="!collapse">
      <table class="ia__list__table">
          <colgroup>
              <col style="width:10%;">
              <col style="width:10%;">
              <col style="width:10%;">
              <col style="width:10%;">
              <col style="width:6%;">
              <col style="width:8%;">
              <col style="width:10%;">
              <col style="width:14%;">
              <col style="width:4%;">
              <col style="">
          </colgroup>
          <thead>
            <tr>
              <th>1 depth</th>
              <th>2 depth</th>
              <th>3 depth</th>
              <th>4 depth</th>
              <th>5 depth</th>
              <th>화면ID</th>
              <th>작업이력</th>
              <th>Link</th>
              <th>배포예정</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in list" :key="i">
              <td><span v-if="item.depth1">{{ item.depth1 }}</span></td>
              <td><span v-if="item.depth2">{{ item.depth2 }}</span></td>
              <td><span v-if="item.depth3">{{ item.depth3 }}</span></td>
              <td><span v-if="item.depth4">{{ item.depth4 }}</span></td>
              <td><span v-if="item.depth5">{{ item.depth5 }}</span></td>
              <td style="text-align:center"><span v-if="item.screenId">{{ item.screenId }}</span></td>
              <td style="text-align:center">
                <span v-if="item.status">
                <p
                 v-for="status in item.status"
                 :key="status"
                >
                  - {{ status }}
                </p>
              </span></td>
              <td><span v-if="item.link"><router-link
                :to="item.link"
                :class="{ publish: item.isPublished === true }"
                target="_blank">{{item.link}}</router-link></span></td>
              <td style="text-align:center"><span>{{ item.pubData }}</span></td>
              <td><span v-if="item.comments">
                <p
                  v-for="item in item.comments"
                  :key="item">
                  - {{ item }}
                </p>
              </span></td>
            </tr>
          </tbody>
      </table>
    </div>
    </div>
</template>

<script>
export default {
  name: 'PubComponent',
  data() {
    return {
      comptNum: 0,
      collapse: false
    }
  },
  props: {
    title: String,
    list: {
      type: Array
    }
  },
  mounted() {
    this.countComptRow()
  },
  methods: {
    countComptRow() {
      let comptArray = []
      this.list.forEach(i => {
        if (i.status === '완료') {
          comptArray.push(i)
        }
      })
      this.comptNum = comptArray.length
    },
    toggleList() {
      if (this.collapse) {
        this.collapse = false
      } else {
        this.collapse = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* {font-size: 13px;}
.ia__list {margin-top:50px;}
.wsg-guide-header+.ia__list  {
  margin-top: 10px;
}
.ia__list__header {
  position:relative;
  background-color:#aaa;
  padding:8px 12px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  cursor:pointer;
  &:after {
      content: '';
      position:absolute;
      right:2px;
      top:18px;
      width: 10px;
      height: 10px;
      border: 2px solid #fff;
      border-width: 2px 2px 0 0;
      transform: rotate(315deg) translate(-50%, -50%);
  }
  &.collapse {
    &:after {
      top: 12px;
      right: 15px;
      transform: rotate(135deg) translate(-50%, -50%);
    }
  }
}
.ia__list__legend {padding-right:20px;}
.ia__list__legend span {color:#111}
.ia__list__title {font-size:15px;color:#fff;}
.ia__list__table {width: 100%;}
.ia__list__table {border-top: solid 0 #96acbf; border-bottom: solid 1px #aaa;}
.ia__list__table th,
.ia__list__table td { border-top: 1px solid #e6e6e6; color: #000;line-height: 1.4; padding: 7px 10px 3px 10px; text-align: center; font-size: 13px; border-left: 1px solid #e6e6e6;vertical-align: top;}
.ia__list__table th {padding-bottom: 5px; border-bottom: 1px solid #d9e3ea;border-left: 1px solid #d9e3ea; font-weight: bold; font-size: 13px;background: #f4f8fb;vertical-align: top;}
.ia__list__table tr:first-child td {border-top: 0;}
.ia__list__table tr th:first-child,
.ia__list__table tr td:first-child {border-left: 0;}
.ia__list__table tr th:first-child {padding-left: 0;padding-right: 0;}
.ia__list__table td {text-align: left;}
.publish {
  color:#2F77FB;
}
.publish:after {
    content: '(✔)';
    display: inline-block;
    font-size:9px;
    margin-left:2px;
  }
</style>
