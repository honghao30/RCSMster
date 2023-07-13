<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <!-- 기획서 v1.0 수정(chatroom-modify__title,chatroom-modify__title-use 클래스 삭제 후 공통컴포넌트 사용 / switch, top-progress-area 클래스 삭제) -->
        <PageTitle :pagetitle="pageTitle" progress="승인완료" />
        <!-- // 기획서 v1.0 수정(chatroom-modify__title,chatroom-modify__title-use 클래스 삭제 후 공통컴포넌트 사용/ switch, top-progress-area 클래스 삭제) -->
        <!-- 기획서 v1.0 수정(editmod  이중클래스 위치 수정) -->
        <div class="chatroom__wrap editmod">
          <div class="chatroom-registration">
            <div>
              <form  ref="form" :model="form">
                <div class="table__wrap">
                  <table class="table table-bodyonly form-table">
                    <colgroup>
                      <col width="196px">
                      <col />
                    </colgroup>
                    <tbody>
                      <!-- 기획서 v1.0 수정 (대화방 사용 여부 신규작업) -->
                      <tr>
                        <th scope="row" class="bd-bg"><span class="form-item__label required">대화방 사용 여부</span></th>
                        <td class="bd-bg">
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="chatRoomUse" id="chatRoomUseN" v-model="form.chatRoomUse" value="N" />
                                  <label for="chatRoomUseN"><span class="checkbox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="chatRoomUse" id="chatRoomUseY" v-model="form.chatRoomUse" value="Y" checked="checked" />
                                  <label for="chatRoomUseY"><span class="checkbox__text">사용</span></label>
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- // 기획서 v1.0 수정 (대화방 사용 여부 신규작업) -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">대화방 명</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <span class="input">
                                  <input type="text" class="input" maxlength="20" placeholder="대화방 명을 입력해주세요." v-model="form.chatRoomName">
                                  <p class="input-limit__text">
                                  {{ form.chatRoomName.length }}/20자
                                  </p>
                                </span>
                                <!-- 기획서 v1.0 수정 -->
                                <span class="flag-progress ch-tit-status">승인필요</span>
                              </div>
                              <!-- 기획서 v1.0 수정 (가이드 문구 추가) -->
                              <p class="guide-text black float-none">&middot; 수정을 하는 경우 추가 승인이 필요합니다.</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- 기획서 v1.0 수정 -->
                      <tr class="modify-type">
                        <th scope="row"><span class="form-item__label required">대화방 유형</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <!-- 기획서 v1.0 수정 (대화방 사용 여부: 사용 시 대화방 유형) -->
                              <template v-if="form.chatRoomUse === 'Y'">
                                <div class="inner__input only-txt">
                                  <div class="inner__input-box">
                                    <span class="form-item__label required">회신번호</span>
                                    <div class="inner__input-item">
                                      <div class="inner__input-btn">
                                        <span class="input">
                                          <input type="text" placeholder="010-5151-5151" disabled />
                                        </span>
                                        <ButtonCmp
                                          type="btn-default-line"
                                          @click="SelectPhoneNumModal"
                                        >번호선택</ButtonCmp>
                                      </div>
                                    </div>
                                  </div>
                                  <p class="guide-text black">&middot; 대화방에서 사용자가 문의가 있을 경우 연락할 수 있는 전화번호를 선택하세요.</p>
                                </div>
                                <div class="inner__input bd-top">
                                  <div class="inner__input-box">
                                    <span class="form-item__label required">챗봇 ID</span>
                                    <div class="inner__input-item">
                                      <div class="inner__input-btn">
                                        <span class="input">
                                          bot-8brgnl8z6jl
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <!-- // 기획서 v1.0 수정 (대화방 사용 여부: 사용 시 대화방 유형) -->
                              <!-- 기획서 v1.0 수정 (대화방 사용 여부: 미사용 시 대화방 유형) -->
                              <template v-if="form.chatRoomUse === 'N'">
                                <div class="inner__input only-txt">
                                  <div class="inner__input-box">
                                    <span class="form-item__label required">발신번호</span>
                                    <div class="inner__input-item">
                                      <div class="inner__input-btn">
                                        <span class="input">
                                          010-5151-5151
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="ch-service_wrap bd-top">
                                  <div class="ch-service-box">
                                    <span class="checkbox">
                                      <input type="checkbox" id="moService" value="moService" />
                                      <label for="moService"><span class="checkbox__text">대표번호 문자수신 서비스(MO)를 이용중인 발신번호</span></label>
                                    </span>
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
                                          <ul>
                                            <li>대표번호문자수신서비스(SMS MO)란 고객이 기업의 대표번호로 문자를 보낼 경우 해당 메시지를 기업의 서버에서 수신할 수 있도록 제공하는 대표번호 부가 서비스 입니다.</li>
                                          </ul>
                                        </div>
                                      </template>
                                    </ToolTipEl>
                                    <!-- // 툴팁 -->
                                  </div>
                                  <p class="guide-text black">&middot; 대표번호 문자수신 서비스(SMS MO)를 기존에 사용중인 경우에만 체크하세요.</p>
                                  <p class="guide-text black">&middot; ‘사용’ 선택 시 RCS에서 제공 중인 버튼 클릭 등의 고객 반응 통계는 확인할 수 없습니다.</p>
                                </div>
                              </template>
                              <!-- // 기획서 v1.0 수정 (대화방 사용 여부: 미사용 시 대화방 유형) -->
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- // 기획서 v1.0 수정 -->
                      <tr v-if="form.chatRoomUse === 'N'">
                        <th scope="row">
                          <span class="form-item__label required">통신서비스<br>가입증명원</span>
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
                              <ul>
                                <li>통신서비스 가입증명원을 제출하시면 서류 심사 후 등록이 가능합니다.</li>
                                <li>입력한 전화번호와 통신서비스 가입증명원의 전화번호가 동일해야만 전화번호가 등록됩니다.</li>
                                <li>파일이 여러 개인 경우, zip 파일로 압축하여 등록해 주세요.</li>
                              </ul>
                            </div>
                          </template>
                          </ToolTipEl>
                          <!-- // 툴팁 -->
                        </th>
                        <td>
                          <div class="form-item__content exception">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="input"><input type="text" class="input" :value="form.serviceDocument" disabled></span>
                                <input type="file" id="fileUp" class="input blind" @change="onFileChanged">
                                <label for="fileUp" class="btn btn-default-line medium">파일 선택</label>
                              </div>
                              <!-- 기획서 v1.0 수정 -->
                              <span class="flag-progress ch-tit-status">승인필요</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- 기획서 v1.0 수정 (대행사 연결 → 양방향 대행사 연결 로 수정 및 추가 작업 + bd-bg 클래스 추가) -->
                      <tr class="connect__wrap">
                        <th scope="row"><span class="form-item__label required">양방향 대행사 연결</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="checkbox">
                                  <input type="checkbox" id="connectUse" v-model="form.agencyConnect" />
                                  <label for="connectUse"><span class="checkbox__text">연결</span></label>
                                </span>
                              </div>
                              <!-- 기획서 v1.0 수정 (특수 기호표 사용)-->
                              <p class="guide-text black float-none">&middot; 문구 추가 필요</p>
                              <template v-if="form.agencyConnect">
                                <div class="inner__input">
                                  <div class="inner__input-box">
                                    <span class="form-item__label required">연결 대행사</span>
                                    <div class="inner__input-item">
                                      <!-- 연결 대행사 有 -->
                                      <div class="inner__input-btn">
                                        <span class="input">
                                          <Dropdown :options="connectOptions" placeholder="대행사를 선택해주세요." >
                                          </Dropdown>
                                        </span>
                                        <!-- 선택 시, 파트너사 페이지 새창으로 연결(확인 필요) -->
                                        <!-- 230616 [a태그 + router-link태그] →  [router-link태그] 수정 -->
                                        <router-link to="" class="btn btn-default-line medium">양방향 파트너사 보기</router-link>
                                      </div>
                                      <span class="input"><input type="text" placeholder="" disabled/></span>
                                      <!-- 연결 대행사 無 -->
                                      <!-- <div class="inner__input-btn">
                                        <span class="input">
                                          <input type="text" placeholder="현재 등록가능한 대행사가 없습니다." disabled/>
                                        </span>
                                        주석처리 해야함 / 선택 시, 파트너사 페이지 새창으로 연결(확인 필요)
                                        230616 [a태그 + router-link태그] →  [router-link태그] 수정
                                        <router-link to="" class="btn btn-default-line medium">양방향 파트너사 보기</router-link>
                                      </div>
                                      <span class="input connect-box"><input type="text" placeholder="" disabled/></span> -->
                                    </div>
                                  </div>
                                  <!-- 기획서 v1.0 수정 (문구 수정) -->
                                  <p class="guide-text black">&middot; RBC 양방향 대화방 연결을 원하는 경우 [사전청약 완료] 대행사를 선택해주세요.</p>
                                </div>
                                <!-- 기획서 v1.0 수정 (검색허용 위치 수정 및 추가작업) -->
                                <div class="inner__input allow-box">
                                  <div class="inner__input">
                                    <div class="inner__input-box">
                                      <span class="form-item__label required">검색 허용</span>
                                      <div class="inner__input-item">
                                        <div class="inner__input-btn">
                                          <span class="radiobox">
                                            <input type="radio" name="allowSearch" id="allowSearchN" v-model="form.allowSearch" value="no"/>
                                            <label for="allowSearchN"><span class="checkbox__text">미사용</span></label>
                                          </span>
                                          <span class="radiobox">
                                            <input type="radio" name="allowSearch" id="allowSearchY" v-model="form.allowSearch" value="yes" />
                                            <label for="allowSearchY"><span class="checkbox__text">사용</span></label>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <p class="guide-text black">&middot; 메시지 앱에서 브랜드를 검색할 수 있습니다.</p>
                                  </div>
                                </div>
                                <template v-if="form.allowSearch === 'yes'">
                                  <div class="inner__input allow-box">
                                    <div class="inner__input-box">
                                      <span class="form-item__label required">소개글</span>
                                      <div class="inner__input-item">
                                        <div class="inner__input-btn">
                                          <div class="input-item input-limit">
                                            <div class="textarea">
                                              <!-- 기획서 v1.0 수정 (placeholder 수정 + style 부여) -->
                                              <textarea maxlength="150" placeholder="검색 시 대화방명과 함께 표시되는 소개글을 입력해주세요." v-model="form.searchIntro" style="height: 76px;"></textarea>
                                              <div class="textarea-limit__text">
                                                <p>
                                                  {{ form.searchIntro.length }} /150자
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </template>
                              </template>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- // 기획서 v1.0 수정 (대행사 연결 → 양방향 대행사 연결 로 수정 및 추가 작업 + bd-bg 클래스 추가) -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">메시지 입력란</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                              <span class="radiobox">
                                <input type="radio" name="allowMsg" id="allowMsgN" v-model="form.allowMsg" value="N" disabled/> <!-- 기획서 v1.0 수정 (disabled 추가) -->
                                <label for="allowMsgN"><span class="checkbox__text">미사용</span></label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" name="allowMsg" id="allowMsgY" v-model="form.allowMsg" value="Y" checked="checked"  />
                                <label for="allowMsgY"><span class="checkbox__text">사용</span></label>
                              </span>
                              </div>
                            </div>
                            <!-- 기획서 v1.0 수정 (문구 수정) -->
                            <p class="guide-text black" v-if="form.allowMsg === 'Y'">&middot; 수신자가 회신을 할 수 있도록 합니다.(MO / 양방향 등 이용 가능)</p>
                          </div>
                        </td>
                      </tr>
                      <!-- 기획서 v1.0 수정 (대표번호 문자수신 서비스 삭제 + 안심마크 라디오버튼, 문구 수정, 클래스 추가, 안심마크 툴팁 안 이미지 및 문구 수정) -->
                      <tr>
                        <th scope="row" class="safety-bg"><span class="form-item__label">안심마크</span>
                          <!-- 툴팁 -->
                          <ToolTipEl
                            direction="bottomPos"
                            elAlign="leftType"
                            width="418"
                            mode="default"
                          >
                            <template slot="tooltip-message">
                              <div class="message__innerbox safety-box">
                                <strong>안심마크란 무엇인가요?</strong>
                                <div class="safety-img">
                                  <img src="@/assets/images/modal/chatroom_safetymark.png" alt="">
                                </div>
                                <ul>
                                  <li>안심마크는, 불법 사칭 문자와 구분하기 쉽도록 RCS메시지 상단에 "확인된 발신번호"를 보여주는 서비스입니다.</li>
                                  <li>한국인터넷진흥원(KISA)에서 인증한 기업만 이용할 수 있습니다.</li>
                                </ul>
                              </div>
                            </template>
                          </ToolTipEl>
                          <!-- // 툴팁 -->
                        </th>
                        <td class="safety-bg">
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="checkbox">
                                  <input type="checkbox" id="saftyMarkY" v-model="form.saftyMark" />
                                  <label for="saftyMarkY"><span class="checkbox__text">사용</span></label>
                                </span>
                              </div>
                            </div>
                            <p class="guide-text black" v-if="!form.saftyMark">&middot; 이 대화방에서는 “안심마크”를 표시하지 않습니다.</p>
                            <p class="guide-text black" v-else-if="form.saftyMark">&middot; 한국인터넷진흥원(KISA)에서 인증된 사업자로 이 대화방에 표시되는 모든 RCS 메시지에 “인증마크”가 표시됩니다.</p>
                          </div>
                        </td>
                      </tr>
                      <!-- // 기획서 v1.0 수정 (대표번호 문자수신 서비스 삭제 + 안심마크 라디오버튼, 문구 수정, 클래스 추가, 안심마크 툴팁 안 이미지 및 문구 수정) -->
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
          <div class="chatroom-emulator sticky">
            <div class="exception-txt">
              <router-link to="">대화방 등록 가이드</router-link>
            </div>
            <ChatEmulator
              :chatInfoData="form"
            />
          </div>
        </div>
        <div class="top-notice--gray">
          <ul><!-- 기획서 v1.0 수정 (문구 수정)  -->
            <li>- 대화방명을 수정하는 경우 승인 심사가 필요합니다.</li>
            <li>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</li>
          </ul>
        </div>
        <div class="button__wrap flex-end">
          <!-- 기획서 v1.0 수정 (P.65 대화방 삭제 플로우 참고) -->
          <ButtonCmp
            type="btn-blue-line"
            @click="removeListModal"
          >삭제</ButtonCmp>
          <!-- // 기획서 v1.0 수정 (P.65 대화방 삭제 플로우 참고) -->
          <!-- 기획서 v1.0 수정 (임시 저장 삭제) -->
          <!-- 기획서 v1.0 수정(p.60 대화방 수정 > 대행사 연결 여부 변경 후 [승인요청] 버튼선택 시 노출되는 Alert 정의 / 노출 기준 : 대행사 사용 → 미사용으로 변경하는 경우) -->
          <ButtonCmp
            type="btn-blue"
            @click="isNotUseModal"
          >승인 요청</ButtonCmp>
          <!-- // 기획서 v1.0 수정(p.60 대화방 수정 > 대행사 연결 여부 변경 후 [승인요청] 버튼선택 시 노출되는 Alert 정의 / 노출 기준 : 대행사 사용 → 미사용으로 변경하는 경우) -->
        </div>
      </div>
    </div>
    <!-- 모달 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 기획서 v1.0 수정 (임시 저장 모달창 삭제) -->
      <!-- 대화방 유형 > 회신번호 > 번호 선택 시 -->
      <SelectPhoneNum
        @closeModal="isModalViewed = false, isPhoneNumber = false"
        v-if="isPhoneNumber"
      >
      </SelectPhoneNum>
      <!-- 기획서 v1.0 수정(p.60 대화방 수정 > 대행사 연결 여부 변경 후 [승인요청] 버튼선택 시 노출되는 Alert 정의 / 노출 기준 : 대행사 사용 → 미사용으로 변경하는 경우)  -->
      <ConfirmMsg
        @closeModal="isModalViewed = false, isNotUse = false"
        v-if="isNotUse"
      >
        <div class="msg" slot="msg">
          대행사를 미사용하시면 <br>연결된 대화방 메뉴가 삭제됩니다.
        </div>
        <div class="button__wrap" slot="button">
          <!-- [닫기] 선택 시, Alert 종료 및 대행사 연결 상태 ‘사용’유지 -->
          <ButtonCmp
          type="btn-line"
          @click="closeMsg"
          >
            닫기
          </ButtonCmp>
          <!-- [대행사 미사용] 선택 시, Alert 종료 / 대화방 목록으로 이동 / 해당 대화방에 연결된 대화방 메뉴 삭제 처리 -->
          <router-link to="/ChatRoomList" class="btn btn-blue" @click="closeMsg">대행사 미사용</router-link>
        </div>
      </ConfirmMsg>
      <!-- // 기획서 v1.0 수정(p.60 대화방 수정 > 대행사 연결 여부 변경 후 [승인요청] 버튼선택 시 노출되는 Alert 정의 / 노출 기준 : 대행사 사용 → 미사용으로 변경하는 경우)  -->
      <!-- 기획서 v1.0 수정(삭제 선택 시, 회신번호(챗봇ID) 대화방인 경우) -->
      <ConfirmMsg
        @closeModal="isModalViewed = false, isRemoveList = false"
        v-if="isRemoveList"
      >
        <div class="msg" slot="msg">
          대화방을 삭제하시겠습니까?
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
          type="btn-line"
          @click="closeMsg"
          >
            취소
          </ButtonCmp>
          <ButtonCmp
          type="btn-blue"
          @click="closeMsg"
          >
            삭제
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- // 기획서 v1.0 수정(삭제 선택 시, 회신번호(챗봇ID) 대화방인 경우) -->
      <!--  기획서 v1.0 수정(대화방 유형: 미사용 선택 시, 대화방 사용 중지 alert 출력) -->
    </ModalView>
    <!-- //모달  -->
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ToolTipEl from '@/components/common/Tooltip.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/brand/create/components/ConfirmMsg.vue'
import SelectPhoneNum from '@/views/brand/chatroom/SelectPhoneNum.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    Dropdown,
    ToolTipEl,
    ModalView,
    ConfirmMsg,
    SelectPhoneNum,
    ChatEmulator
  },
  data() {
    return {
      form: {
        chatRoomUse: 'Y',
        chatRoomName: 'SYSTEM STUDIOS',
        chatRegistrationType: 'phone',
        serviceDocument: 'SYSTEMSTUDIO_통신서비스가입증명원.zip​',
        agencyConnect: '',
        searchIntro: 'SYSTEM STUDIOS 대화방 입니다.',
        allowMsg: 'Y',
        receptionSms: 'defalut',
        switch: '',
        saftyMark: ''
      },
      viewMode: false,
      connectOptions: [
        {
          label: '데이터워즈​',
          value: 'ing02'
        }
      ],
      isModalViewed: false,
      isPhoneNumber: false,
      isRemoveList: false,
      isNotUse: false
    }
  },
  computed: {
    isDisabled() {
      // 버튼 활성화에 대한 예시
      return this.form.chatRoomName.length <= 0
    },
    pageTitle() {
      return `${this.form.chatRoomName + '대화방 수정'}`
    }
  },
  methods: {
    onFileChanged (e) {
      const files = e.target.files
      const fileName = files[0].name
      const file = e.target.files[0]
      this.form.serviceDocument = fileName
      this.url = URL.createObjectURL(file)
    },
    closeMsg () {
      this.isModalViewed = false
      this.isPhoneNumber = false
      this.isNotUse = false
      this.isRemoveList = false
    },
    removeListModal () {
      // 회신번호(챗봇ID) 대화방 일때, alert창
      if (this.form.chatRoomUse === 'Y') {
        this.isModalViewed = true
        this.isRemoveList = true
      }
    },
    SelectPhoneNumModal () {
      this.isModalViewed = true
      this.isPhoneNumber = true
    },
    isNotUseModal () {
      if (this.form.chatRoomUse === 'N') {
        this.isModalViewed = true
        this.isNotUse = true
      }
    }
  }
}
</script>
