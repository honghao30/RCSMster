<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="대화방 등록" />
        <div class="chatroom__wrap">
          <div class="chatroom-registration">
            <TabCmp>
              <TabItem title="개별 등록">
                <div>
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
                                      <input type="text" class="input" maxlength="20" placeholder="대화방 명을 입력해주세요." v-model="form.chatTitle">
                                      <p class="input-limit__text">
                                        {{ form.chatTitle.length }}/20자
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
                                <p class="chattype-des">최초로 생성하는 대화방은 발신번호로만 생성할 수 있습니다.</p>
                                <div class="form-item-row">
                                  <div class="input-item">
                                    <span class="radiobox">
                                      <input type="radio" name="chatChk" id="chatPhone" v-model="form.chatRegistrationType" checked value="phone" />
                                      <label for="chatPhone"><span class="checkbox__text">발신번호</span></label>
                                    </span>
                                    <!-- Case 1. 대화방 최초 등록인 경우 : 챗봇 ID 비활성화 처리 / 브랜드 개설 시 사용한 전화번호가 발신번호 영역에 자동 출력 -->
                                    <!-- Case 2. 브랜드 대시보드 LNB를 통해 대화방 등록하는 경우, 발신번호 직접 입력 -->
                                    <span class="radiobox">
                                      <input type="radio" name="chatChk" id="chatId" v-model="form.chatRegistrationType" value="Id" />
                                      <label for="chatId"><span class="checkbox__text">챗봇 ID</span></label>
                                    </span>
                                  </div>
                                  <!-- 대화방 유형 : 발신번호 -->
                                  <template v-if="form.chatRegistrationType === 'phone'">
                                    <div class="inner__input">
                                      <div class="inner__input-box">
                                        <span class="form-item__label required chattype">발신번호</span>
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
                                      <p class="guide-text black">&middot; 브랜드 개설 시 등록한 전화번호와 동일하게 반영됩니다.</p>
                                      <!-- 발신번호 시 유효성체크 부분 없음 -->
                                    </div>
                                    <div class="inner__input">
                                      <div class="inner__input-box">
                                        <span class="form-item__label required chattype">챗봇 ID</span>
                                        <div class="inner__input-item">
                                          <div class="inner__input-btn">
                                            <span class="input">
                                              <input type="text" placeholder="-없이 입력해주세요" />
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <p class="guide-text black">&middot; 동일한 대화방에 일반 문자(SMS/LMS/MMS)도 함께 보여집니다.</p>
                                    </div>
                                  </template>
                                  <!-- 대화방 유형 : 챗봇 ID -->
                                  <template v-else>
                                    <div class="inner__input">
                                      <div class="inner__input-box">
                                        <span class="form-item__label required chattype">회신번호</span>
                                        <div class="inner__input-item">
                                          <div class="inner__input-btn">
                                            <span class="input">
                                              <input type="text" placeholder="-없이 입력해주세요" />
                                            </span>
                                            <ButtonCmp
                                              type="btn-default-line"
                                              @click="SelectPhoneNumModal"
                                            >번호선택</ButtonCmp>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="inner__input">
                                      <div class="inner__input-box">
                                        <span class="form-item__label required chattype">챗봇 ID</span>
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
                                      <p class="guide-text error">중복된 챗봇ID 입니다.</p>
                                      <p class="guide-text error">‘bot-’ 뒤 문자는 반드시 영문을 포함하여 입력해주세요.</p>
                                      <p class="guide-text validation">사용 가능한 챗봇ID입니다.</p>
                                      <p class="guide-text black">&middot; 일반 문자(SMS/LMS/MMS)는 수신할 수 없으며, RCS문자만 수발신 가능합니다.</p>
                                    </div>
                                  </template>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
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
                                  <!-- 타인 소유의 발신번호인 경우 : 가이드 팝업 출력 / 정책 수급 필요 -->
                                  <a class="exception-txt">타인 소유의 발신번호인 경우</a>
                                </div>
                                <p class="guide-text black">&middot; 파일형식: JPG, PNG, TIFF, PDF, ZIP(최대 70MB)</p>
                              </div>
                            </td>
                          </tr>
                          <tr class="connect__wrap">
                            <th scope="row"><span class="form-item__label required">대행사 연결</span></th>
                            <td>
                              <div class="form-item__content">
                                <div class="form-item-row">
                                  <div class="input-item">
                                    <span class="radiobox">
                                      <input type="radio" name="agencyConnect" id="connectDefault" v-model="form.agencyConnect" value="defalut"/>
                                      <label for="connectDefault"><span class="checkbox__text">미사용</span></label>
                                    </span>
                                    <span class="radiobox">
                                      <input type="radio" name="agencyConnect" id="connectUse" v-model="form.agencyConnect" value="use" />
                                      <label for="connectUse"><span class="checkbox__text">사용</span></label>
                                    </span>
                                  </div>
                                  <template v-if="form.agencyConnect === 'use'">
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
                                            <a class="btn btn-default-line medium"><router-link to="">챗봇 연결 가능한 대행사</router-link></a>
                                          </div>
                                          <span class="input"><input type="text" placeholder="" disabled/></span>
                                          <!-- 연결 대행사 無 -->
                                          <!-- <div class="inner__input-btn">
                                            <span class="input">
                                              <input type="text" placeholder="현재 등록가능한 대행사가 없습니다." disabled/>
                                            </span>
                                            주석처리 해야함 / 선택 시, 파트너사 페이지 새창으로 연결(확인 필요)
                                            <a class="btn btn-default-line medium"><router-link to="">챗봇 연결 가능한 대행사</router-link></a>
                                          </div>
                                          <span class="input connect-box"><input type="text" placeholder="" disabled/></span> -->
                                        </div>
                                      </div>
                                      <p class="guide-text black">&middot; RBC 간편챗봇 연결을 원하는 경우 [사전청약 완료] 대행사를 선택해주세요.</p>
                                    </div>
                                  </template>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="search-allow__wrap">
                            <th scope="row"><span class="form-item__label required">검색 허용</span></th>
                            <td>
                              <div class="form-item__content">
                                <div class="form-item-row">
                                  <div class="input-item">
                                    <span class="radiobox">
                                      <input type="radio" name="allowSearch" id="allowSearchN" v-model="form.allowSearch" value="no"/>
                                      <label for="allowSearchN"><span class="checkbox__text">미사용</span></label>
                                    </span>
                                    <span class="radiobox">
                                      <input type="radio" name="allowSearch" id="allowSearchY" v-model="form.allowSearch" value="yes" />
                                      <label for="allowSearchY"><span class="checkbox__text">사용</span></label>
                                    </span>
                                  </div>
                                  <p class="guide-text black">&middot; 메시지 앱에서 브랜드를 검색할 수 있습니다.</p>
                                  <template v-if="form.allowSearch === 'yes'">
                                    <div class="inner__input">
                                      <div class="inner__input-box">
                                        <span class="form-item__label">소개글</span>
                                        <div class="inner__input-item">
                                          <div class="inner__input-btn">
                                            <div class="input-item input-limit">
                                              <div class="textarea">
                                                <textarea maxlength="150" placeholder="브랜드의 슬로건이나 브랜드 특징을 나타내는 소개글을 입력해주세요." v-model="form.searchIntro"></textarea>
                                                <div class="textarea-limit__text">
                                                  <p>
                                                    /150자
                                                  </p>
                                                </div>
                                              </div>
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
                                <p class="guide-text black">&middot; 대화방에서 사용자가 메시지를 입력할 수 없습니다.</p>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row"><span class="form-item__label">대표번호<br>문자수신 서비스</span>
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
                                      <li>대표번호 문자수신 서비스는 휴대폰 메시지 함에서 기업의 대표번호로 문자를 보낼 경우 해당 메시지를 기업의 서버에서 수신할 수 있도록 제공하는 대표번호 부가 서비스입니다. </li>
                                    </ul>
                                  </div>
                                </template>
                              </ToolTipEl>
                              <!-- // 툴팁 -->
                            </th>
                            <td>
                              <div class="form-item__content">
                                <div class="form-item-row">
                                  <div class="input-item">
                                    <span class="radiobox">
                                      <input type="radio" name="receptionSms" id="receptionSmsN" v-model="form.receptionSms" value="defalut"/>
                                      <label for="receptionSmsN"><span class="checkbox__text">입력 불가능</span></label>
                                    </span>
                                    <span class="radiobox">
                                      <input type="radio" name="receptionSms" id="receptionSmsY" v-model="form.receptionSms" value="use" />
                                      <label for="receptionSmsY"><span class="checkbox__text">입력 가능</span></label>
                                    </span>
                                  </div>
                                </div>
                                <p class="guide-text black">&middot; 대화방에서 사용자가 메시지를 입력할 수 없습니다.</p>
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
                                <div class="form-item-row">
                                  <div class="input-item">
                                    <span class="radiobox">
                                      <input type="radio" name="saftyMark" id="saftyMarkN" v-model="form.saftyMark" value="N"/>
                                      <label for="saftyMarkN"><span class="checkbox__text">미사용</span></label>
                                    </span>
                                    <span class="radiobox">
                                      <input type="radio" name="saftyMark" id="saftyMarkY" v-model="form.saftyMark" value="Y" />
                                      <label for="saftyMarkY"><span class="checkbox__text">사용</span></label>
                                    </span>
                                  </div>
                                </div>
                                <p class="guide-text black">&middot; KISA(한국인터넷진흥원)에서 안심마크 활용에 대해 인증 받았습니다.</p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </TabItem>
              <TabItem title="대량 등록">
                <div>
                  <form  ref="form" :model="form">
                    <div class="table__wrap">
                      <table class="table table-bodyonly form-table">
                        <colgroup>
                          <col width="196px">
                          <col />
                        </colgroup>
                        <tbody>
                          <tr class="excel-box">
                            <th scope="row">
                              <span class="form-item__label required">엑셀 등록</span>
                              <ButtonCmp
                                  type="btn-line"
                                  size="small"
                              >샘플파일 다운로드</ButtonCmp>
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
                          <tr>
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
                                  <!-- 타인 소유의 발신번호인 경우 : 가이드 팝업 출력 / 정책 수급 필요 -->
                                  <a class="exception-txt">타인 소유의 발신번호인 경우</a>
                                </div>
                                <p class="guide-text black">&middot; 파일형식: JPG, PNG, TIFF, PDF, ZIP(최대 70MB)</p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p class="guide-text black">&middot; 발신번호를 대량으로 등록할 수 있습니다.(최대 1,000건까지 등록 가능)</p>
                    <p class="guide-text black">&middot; 대량 등록 시 프로필 이미지는 브랜드 프로필 이미지로 등록됩니다.</p>
                  </form>
                </div>
              </TabItem>
            </TabCmp>
          </div>
          <div class="chatroom-emulator sticky">
            <div class="exception-txt">
              <router-link to="">대화방 등록 가이드</router-link>
            </div>
            <ChatEmulator
              :chatName="form.chatTitle"
              :saftyMark="form.saftyMark"
              :allowMsg="form.allowMsg"
            />
          </div>
        </div>
        <div class="top-notice--gray gray-btn">
          <ul>
            <li>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</li>
            <li>- 등록 방법 변경 시, 입력한 데이터가 초기화됩니다.</li>
          </ul>
        </div>
        <div class="button__wrap">
          <ButtonCmp
              type="btn-blue-line"
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
      <!-- 대량등록 후 결과 알림  -->
      <LargeRegistationResult
        @closeModal="isModalViewed = false"
        v-if="isLargeResult"
      >
      </LargeRegistationResult>
    </ModalView>
    <!-- //모달  -->
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import TabCmp from '@/components/common/TabCmp.vue'
import TabItem from '@/components/common/TabItem.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ToolTipEl from '@/components/common/Tooltip.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/brand/create/components/ConfirmMsg.vue'
import SelectPhoneNum from '@/views/brand/chatroom/SelectPhoneNum.vue'
import LargeRegistationResult from '@/views/brand/chatroom/LargeRegistationResult.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    TabCmp,
    TabItem,
    ButtonCmp,
    Dropdown,
    ToolTipEl,
    ModalView,
    ConfirmMsg,
    SelectPhoneNum,
    ChatEmulator,
    LargeRegistationResult
  },
  data() {
    return {
      form: {
        chatTitle: '',
        chatRegistrationType: 'phone',
        serviceDocument: '',
        agencyConnect: '',
        allowSearch: '',
        searchIntro: '',
        allowMsg: 'Y',
        receptionSms: '',
        saftyMark: ''
      },
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
      isLargeResult: false
    }
  },
  computed: {
    isDisabled() {
      // 버튼 활성화에 대한 예시
      return this.form.chatTitle.length <= 0
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
    },
    LargeResult () {
      this.isModalViewed = true
      this.isLargeResult = true
    }
  }
}
</script>
