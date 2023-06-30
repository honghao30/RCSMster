<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="대화방 등록" />
        <div class="chatroom__wrap">
          <div class="chatroom-registration">
            <form  ref="form" :model="form">
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px">
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><span class="form-item__label required">대화방 명</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item input-limit">
                              <span class="input">
                                <input type="text" class="input" maxlength="20" placeholder="대화방 명을 입력해주세요." v-model="form.chatRoomName"  @input="e => form.chatRoomName = e.target.value" >
                                <p class="input-limit__text">
                                  {{ form.chatRoomName.length }}/20자
                                </p>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label required">대화방 유형</span></th>
                      <td>
                        <div class="form-item__content">
                          <!-- 1차 디자인 수정 -->
                          <!-- <p class="chattype-des">최초로 생성하는 대화방은 발신번호로만 생성할 수 있습니다.</p> -->
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="radiobox">
                                <input type="radio" name="chatChk" id="chatPhone" v-model="form.chatRegistrationType" checked value="phone" />
                                <label for="chatPhone"><span class="checkbox__text">발신번호</span></label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" name="chatChk" id="chatId" v-model="form.chatRegistrationType" value="Id" />
                                <label for="chatId"><span class="checkbox__text">챗봇 ID</span></label>
                              </span>
                            </div>
                            <!-- 대화방 유형 : 발신번호 -->
                            <template v-if="form.chatRegistrationType === 'phone'">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <div class="inner__input-item">
                                    <div class="inner__input-btn">
                                      <span class="input">
                                        <input type="text" placeholder="-없이 입력해주세요" />
                                      </span>
                                      <ButtonCmp
                                        type="btn-default-line"
                                      >중복체크</ButtonCmp>
                                    </div>
                                  </div>
                                </div>
                                <p class="guide-text black float-none">&middot; 브랜드 개설 시 등록한 전화번호와 동일하게 반영됩니다.</p>
                                <!-- 발신번호 시 유효성체크 부분 없음 -->
                                <div class="checkbox">
                                  <input type="checkbox" id="checkNUm">
                                  <label for="checkNUm">
                                    <span class="checkbox__text">대표번호 문자수신 서비스(MO)를 이용중인 발신번호</span>
                                  </label>
                                </div>
                                <p class="guide-text black float-none">&middot; 대표번호 문자수신 서비스(SMS MO)를 기존에 사용중인 경우에만 체크하세요.</p>
                                <p class="guide-text black float-none width">&middot; ‘사용’ 선택 시 RCS에서 제공 중인 버튼 클릭 등의 고객 반응 통계는 확인할 수 없습니다.</p>
                                <!-- 1차 디자인 수정 -->
                                <div class="inner__input-box input-number">
                                  <span class="form-item__label required">소유자</span>
                                  <div class="inner__input-item">
                                    <div class="input-item">
                                      <span class="radiobox">
                                        <input type="radio" name="callingNumber" id="callingNumber1" v-model="form.callingNumber" value="self"/>
                                        <label for="callingNumber1"><span class="checkbox__text">후보자 본인</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="callingNumber" id="callingNumber2" v-model="form.callingNumber" value="other" />
                                        <label for="callingNumber2"><span class="checkbox__text">타인 명의</span></label>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- 1차 디자인 수정 -->
                            </template>
                            <!-- 대화방 유형 : 챗봇 ID -->
                            <template v-else>
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label required chattype">회신번호</span>
                                  <div class="inner__input-item">
                                    <div class="inner__input-btn">
                                      <!-- 1차 디자인 수정 -->
                                      <span class="input">
                                        <input type="text" placeholder="" disabled/>
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
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label required chattype">챗봇 ID</span>
                                  <div class="inner__input-item">
                                    <span class="input">
                                      <input type="text" placeholder="회신번호 선택 시 자동으로 생성됩니다." disabled/>
                                    </span>
                                  </div>
                                </div>
                                <p class="guide-text black">&middot; 일반 문자(SMS/LMS/MMS)는 수신할 수 없으며, RCS문자만 수발신 가능합니다.</p>
                              </div>
                            </template>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="form.chatRegistrationType === 'phone'">
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
                            <div class="message__innerbox">
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
                          </div>
                          <p class="guide-text black">&middot; 파일형식: JPG, PNG, TIFF, PDF, ZIP(최대 70MB)</p>
                        </div>
                      </td>
                    </tr>
                    <tr class="connect__wrap">
                      <th scope="row"><span class="form-item__label required">양방향 대행사 연결</span></th>
                      <td>
                        <!-- 1차 디자인 수정 -->
                        <div class="form-item__content item-connect">
                          <div class="form-item-row">
                            <div class="input-item">
                              <div class="checkbox">
                                <input type="checkbox" name="agencyConnect" id="connectUse" v-model="form.agencyConnect">
                                <label for="connectUse">
                                    <span class="checkbox__text">연결</span>
                                </label>
                              </div>
                            </div>
                            <p class="guide-text black">&middot; 문구 추가 필요</p>
                            <template v-if="form.agencyConnect === true">
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
                                      <router-link to="" class="btn btn-default-line medium">챗봇 연결 가능한 대행사</router-link>
                                    </div>
                                    <span class="input"><input type="text" placeholder="" disabled/></span>
                                    <!-- 연결 대행사 無 -->
                                    <!-- <div class="inner__input-btn">
                                      <span class="input">
                                        <input type="text" placeholder="현재 등록가능한 대행사가 없습니다." disabled/>
                                      </span>
                                      주석처리 해야함 / 선택 시, 파트너사 페이지 새창으로 연결(확인 필요)
                                      230616 [a태그 + router-link태그] →  [router-link태그] 수정
                                      <router-link to="" class="btn btn-default-line medium">챗봇 연결 가능한 대행사</router-link>
                                    </div>
                                    <span class="input connect-box"><input type="text" placeholder="" disabled/></span> -->
                                  </div>
                                </div>
                                <p class="guide-text black">&middot; RBC 간편챗봇 연결을 원하는 경우 [사전청약 완료] 대행사를 선택해주세요.</p>
                              </div>
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label required">검색 허용</span>
                                  <div class="inner__input-item">
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
                                <p class="guide-text black">&middot; 메시지 앱에서 브랜드를 검색할 수 있습니다.</p>
                              </div>
                              <div class="inner__input" v-if="form.allowSearch === 'yes'">
                                <div class="inner__input-box">
                                  <span class="form-item__label required">소개글</span>
                                  <div class="inner__input-item">
                                    <div class="textarea">
                                      <textarea maxlength="50" placeholder="검색 시 대화방명과 함께 표시되는 소개글을 입력해주세요." v-model="form.searchIntro"></textarea>
                                      <div class="textarea-limit__text">
                                        <p>
                                          {{ form.searchIntro.length }} /50자
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label required">메시지 입력</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="radiobox">
                                <input type="radio" name="allowMsg" id="allowMsgN" v-model="form.allowMsg" value="N"/>
                                <label for="allowMsgN"><span class="checkbox__text">입력 불가능</span></label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" name="allowMsg" id="allowMsgY" v-model="form.allowMsg" value="Y" checked="checked"  />
                                <label for="allowMsgY"><span class="checkbox__text">입력 가능</span></label>
                              </span>
                            </div>
                          </div>
                          <p class="guide-text black" v-if="form.allowMsg == 'Y'">&middot; 대화방에서 사용자가 메시지를 입력할 수 있습니다.</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">안심마크</span>
                        <!-- 툴팁 -->
                        <ToolTipEl
                          direction="bottomPos"
                          elAlign="leftType"
                          width="418"
                          mode="default"
                        >
                          <template slot="tooltip-message">
                            <div class="message__innerbox">
                              <strong>안심마크란 무엇인가요?</strong>
                              <p class="safty-img"><img src="../../../assets/images/cmp/img_safty_mark.png" alt=""></p>
                              <ul>
                                <li>안심마크는 스미싱과 같은 사고가 많이 발생하는 기업에 대해, 실제 해당 기업에서 문자를 보냈음을 알려주는 인증마크와 + 안심문구가 결합된 기능입니다.</li>
                                <li>KISA의 승인을 얻은 사업자에 한해 RCS메시지를 보냈을 때 안심마크를 붙일 수 있으며, 이용을 원치 않는 경우 브랜드 관리자가 대화방 단위로 설정 해지할 수 있습니다.</li>
                              </ul>
                            </div>
                          </template>
                        </ToolTipEl>
                        <!-- // 툴팁 -->
                      </th>
                      <td>
                        <div class="form-item__content">
                          <div class="checkbox">
                              <input type="checkbox" id="saftymark" v-model="form.saftyMark">
                              <label for="saftymark">
                                  <span class="checkbox__text">사용</span>
                              </label>
                          </div>
                          <p class="guide-text black">&middot; 한국인터넷진흥원(KISA)에서 인증된 사업자로 이 대화방에 표시되는 모든 RCS 메시지에 “인증마크”가 표시됩니다.</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </div>
          <div class="chatroom-emulator sticky">
            <div class="exception-txt">
              <router-link to="">대화방 등록 가이드</router-link>
            </div>
            <ChatEmulator
              :chatInfoData="form"
              :chatMenuList="chatroomList[0].list"
            />
          </div>
        </div>
        <div class="top-notice--gray">
          <ul>
            <li>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</li>
            <li>- 등록 방법 변경 시, 입력한 데이터가 초기화됩니다.</li>
          </ul>
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
              type="btn-line"
              @click="saveTemp"
          >임시 저장</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
              :disabled = "isDisabled"
              @click="onSubmit"
          >승인 요청</ButtonCmp>
        </div>
      </div>
    </div>
    <!-- 모달  -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 입력된 데이터가 있는 상태에서 개별/대량 등록 변경 시 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        v-if="cancelReg"
      >
        <div class="msg" slot="msg">
          대화방 개별 등록을 취소 하시겠습니까?<br>입력하신 정보가 모두 초기화됩니다.
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
            확인
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- 임시저장 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        v-if="isModalSave"
      >
        <div class="msg" slot="msg">
          입력하신 정보가 임시저장 되었습니다.
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
          type="btn-blue"
          @click="closeMsg"
          >
            확인
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- 승인 요청 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        v-if="isModalApprove"
      >
        <div class="msg" slot="msg">
          입력하신 정보로 대화방을 등록합니다.
        </div>
        <div class="button__wrap" slot="button">
          <!-- 원래 @click="closeMsg" 이나 대량등록 후 결과알림 팝업 및 대량등록완료 페이지 구현을 위해 @click="LargeResult" 작성함 -->
          <ButtonCmp
          type="btn-line"
          @click="LargeResult"
          >
            취소
          </ButtonCmp>
          <router-link
            to="/ChatRoomRegistrationComplete"
            class="btn btn-blue"
          >승인요청</router-link>
        </div>
      </ConfirmMsg>
      <!-- 대화방 유형 > 번호 선택 시 -->
      <SelectPhoneNum
        @closeModal="isModalViewed = false"
        v-if="isPhoneNumber"
      >
      </SelectPhoneNum>
      <!-- // 타인 소유의 발신번호인 경우 -->
      <OthersNumber
        @closeModal="isModalViewed = false"
        v-if="phoneNumRoll"
      >
      </OthersNumber>
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
import OthersNumber from '@/views/brand/chatroom/OthersNumber.vue'
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
    ChatEmulator,
    OthersNumber
  },
  data() {
    return {
      form: {
        chatRoomName: '',
        chatType: 'chatRoom',
        chatRegistrationType: 'phone',
        serviceDocument: '',
        agencyConnect: false,
        allowSearch: 'no',
        searchIntro: 'N',
        allowMsg: 'N',
        receptionSms: 'defalut',
        saftyMark: '',
        callingNumber: 'brand'
      },
      chatroomList: [
        {
          list: [
            {
              label: '자주 묻는 질문✋',
              value: '🎀상담직원 연결👋',
              menuDetails: [
                {
                  title: '전화연결',
                  sevice: '010-5151-5151'
                }
              ]
            }
          ]
        }
      ],
      viewMode: false,
      connectOptions: [
        {
          label: '[사전청약 완료] 비즈뿌리오​',
          value: 'done01'
        },
        {
          label: '[사전청약 완료] 더피프티원​​',
          value: 'done02'
        },
        {
          label: '[사전청약 완료] 카카오 i 커넥트 톡​​',
          value: 'done03'
        },
        {
          label: '비즈톡​',
          value: 'ing01'
        },
        {
          label: '데이터워즈​',
          value: 'ing02'
        },
        {
          label: '아지앙스',
          value: 'ing03'
        }
      ],
      isModalViewed: false,
      isModalSave: false,
      cancelReg: false,
      isPhoneNumber: false,
      isModalApprove: false,
      phoneNumRoll: false
    }
  },
  computed: {
    isDisabled() {
      // 버튼 활성화에 대한 예시
      return this.form.chatRoomName.length <= 0
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
    saveTemp () {
      this.isModalViewed = true
      this.isModalSave = true
    },
    SelectPhoneNumModal () {
      this.isModalViewed = true
      this.isPhoneNumber = true
    },
    closeMsg () {
      this.isModalViewed = false
      this.isModalSave = false
    },
    onSubmit () {
      this.isModalViewed = true
      this.isModalApprove = true
    },
    RegistrationChange () {
      this.isModalViewed = true
      this.cancelReg = true
    }
  }
}
</script>
