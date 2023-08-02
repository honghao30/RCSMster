<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="템플릿 메시지" />
        <div class="view__wrap">
          <div class="view-table__wrap">
            <div class="table__wrap">
              <table class="table table-bodyonly">
                <colgroup>
                  <col width="196px"/>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><span class="form-item__label">템플릿 ID</span></th>
                    <td>
                        <span class="text">SDKJ2935K</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">템플릿 유형</span></th>
                    <td>
                      <span class="text">말풍선</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">템플릿 명</span></th>
                    <td>
                      <span class="text">이미지 강조형</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">상태</span></th>
                    <td>
                      <span class="text">임시등록</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">승인일</span></th>
                    <td>
                      <span class="text">2023.05.26 12:12</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table class="table table-bodyonly">
                <colgroup>
                  <col width="196px"/>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><span class="form-item__label">작성자</span></th>
                    <td>
                      <span class="text">홍*동</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">작성일</span></th>
                    <td>
                      <span class="text">2023.05.26 10:12</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="brand-aside">
            <!-- 에뮬레이터 -->
            <TempEmulator
              :templateType="templateType"
              :templData="templateData"
            />
            <!-- // 에뮬레이터 -->
          </div>
        </div>
        <div class="button__wrap space-between">
          <div class="left">
            <router-link
              class="btn-line btn"
              to="/chatbotList"
            >취소</router-link>
          </div>
          <div class="right">
            <ButtonCmp
                type="btn-line"
            >삭제</ButtonCmp>
            <ButtonCmp
                type="btn-blue"
            >수정</ButtonCmp>
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
import TemplateEmulator from '@/views/brand/message/emulator/TemplateEmulator.vue'
export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    TemplateEmulator
  },
  data() {
    return {
      templateType: '텍스트 선택형_서술',
      templateData: {
        MainTitle: {
          info: {
            title: '문의사항',
            titleType: '',
            titleIcon: '',
            subVarTitle: ''
          }
        },
        Description: {
          info: {
            content: '문의사항이 있으시다면 채팅방에 문의 내용과 성함/연락처를 남겨주세요. ​<br> SYSTEM STUDIOS의 MD팀이 최대한 빠르게 답변 드리도록 하겠습니다!​'
          }
        },
        Buttons: {
          use: 'Y',
          info: [{
            id: 1,
            bgColor: '#2f77fb',
            btnEvent: 'url',
            btnName: '등록하기'
          }]
        }
      }
    }
  },
  methods: {
  }
}
</script>
