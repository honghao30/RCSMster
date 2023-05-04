<template>
  <div class="tmep__wrap">
      <div class="wsg-guide-content">
        <div class="wsg-note__wrap--gray-box">
          <ul class="wsg_desc">
            <li>table 에 대한 기본 정의 내용 입니다.</li>
          </ul>
        </div>
      </div>
      <TitleH3 titleh3="THEAD TYPE" />
      <div class="wsg-guide-content">
        <div class="wsg-note__wrap--gray-box">
          <ul class="wsg_desc">
            <li>모든 테이블은 .table__wrap 로 감싼다.</li>
            <li>.table table-list 클래스 기본 사용</li>
            <li>
              - scss 파일 tableCommon + tableListType mixin 사용
            </li>            
          </ul>
        </div>
      </div>    
      <div class="table__wrap">
        <table class="table table-list">
          <thead>
            <tr>
              <th scope="col">이름</th>
              <th scope="col">이름</th>
              <th scope="col">이름</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>이름</td>
              <td>이름</td>
              <td>이름</td>
            </tr>
          </tbody>
        </table>
      </div>  
      <TitleH3 titleh3="TBODY TYPE" />   
      <div class="wsg-guide-content">
        <div class="wsg-note__wrap--gray-box">
          <ul class="wsg_desc">            
            <li>.table table-bodyonly 클래스 기본 사용</li>
            <li>
              - scss 파일 tableCommon + tableBodyType mixin 사용
            </li>
          </ul>
        </div>
      </div>
      <div class="table__wrap">
        <table class="table table-bodyonly">
          <tbody>
            <tr>
              <th scope="row">이름</th>
              <td>이름</td>
            </tr>
            <tr>
              <th scope="row">이름</th>
              <td>이름</td>
            </tr>
            <tr>
              <th scope="row">이름</th>
              <td>이름</td>
            </tr>                        
          </tbody>
        </table>
      </div>          
  </div>
</template>

<script>
import TitleH3 from '../cmp/TitleH3.vue'

export default {
  components: {
    TitleH3
  }

}
</script>

<style lang="scss">
.tmep__wrap {
    width: 100%;
    height: 100%;
  .table__wrap {
    margin: 20px 0;
  }   
}
</style>