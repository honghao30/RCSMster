<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="TOMMY JEANS 외 69건 대화방" />
        <div class="top-progress-area">
          <span class="flag-progress">임시저장</span>
          <span class="flag-progress">승인대기</span>
          <span class="flag-progress ing">검수중</span>
          <span class="flag-progress reject">반려</span>
          <p class="date">최종변경 : 2023. 04. 11</p>
          <p class="reject-text">반려사유 : 통신서비스가입증명원 번호와 불일치함 외 69건</p>
        </div>
        <div class="chatroom__wrap view-box">
          <div class="chatroom-registration">
            <form  ref="form" :model="form">
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px"/>
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><span class="form-item__label">대화방 명</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">SYSTEMSTUDIO_대량등록.xlsx</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">대화방 명</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">TOMMY JEANS 외 69건</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">발신번호</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">TOMMY JEANS 외 69건</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">통신서비스<br>가입증명원</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <a class="text" download>통신서비스가입증명원.pdf</a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">대행사 연결</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">미사용</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">메시지 입력</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">입력 불가능</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">대표번호<br>문자수신 서비스</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">미사용</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">RCS 사용여부</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">미사용</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">안심마크</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">사용</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </div>
          <div class="chatroom-emulator sticky">
            <ChatEmulator/>
          </div>
        </div>
        <!-- 임시저장,승인대기,검수중 top-notice--gray 사용 -->
        <div class="top-notice--gray gray-btn">
          <ul>
            <li>
              <span class="flag-progress reject">삭제 D-7</span>
              2023.04.11 삭제 예정
            </li>
            <li>- 임시저장 상태에서는 30일 이후 자동 삭제 처리 됩니다.</li>
            <li>- 승인심사는 48시간 이내이며, 내부 사정상 지연될 수 있습니다.</li>
          </ul>
        </div>
        <div class="button__wrap">
          <ButtonCmp
              type="btn-blue"
          >수정</ButtonCmp>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    ChatEmulator
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
