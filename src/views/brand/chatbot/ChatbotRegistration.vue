<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="간편챗봇 메시지 등록" />
        <div class="chatroom__wrap chatbot__wrap"> <!-- 기획서 v1.0 수정 -- 이중클래스 추가 -->
          <div class="chatroom-registration">
            <form  ref="form" :model="form">
              <!-- 챗봇 유형 -->
              <div class="type__radio-tab">
                <ul>
                  <li>
                    <input type="radio" id="chatBubble" value="chatBubble" v-model="form.chatType" class="blind" @change="isChangeTypeCheck"/>
                    <label for="chatBubble">
                      <i class="icon-chatbubble"></i>
                      <dl>
                        <dt class="tab-title">말풍선<span class="tab-title-small">(1장)</span></dt> <!-- 기획서 v1.0 수정 -->
                        <dd class="tab-text">텍스트 중심의 간단한 메시지 작성</dd>
                      </dl>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="card" value="card" v-model="form.chatType" class="blind"  @change="isChangeTypeCheck"/>
                    <label for="card">
                      <i class="icon-card"></i>
                      <dl>
                        <dt class="tab-title">카드<span class="tab-title-small">(1장)</span></dt> <!-- 기획서 v1.0 수정 -->
                        <dd class="tab-text">이미지와 텍스트를 혼합하여 풍부한 메시지 작성</dd>
                      </dl>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="slider" value="slider" v-model="form.chatType" class="blind"  @change="isChangeTypeCheck"/>
                    <label for="slider">
                      <i class="icon-slide"></i> <!-- 기획서 v1.0 수정 -->
                      <dl>
                        <dt class="tab-title">캐로셀<span class="tab-title-small">(2~6장)</span></dt> <!-- 기획서 v1.0 수정 -->
                        <dd class="tab-text">여러 장의 메시지 작성</dd>
                      </dl>
                    </label>
                  </li>
                </ul>
              </div>
              <!-- // 챗봇 유형 -->
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px">
                    <col />
                  </colgroup>
                  <tbody>
                    <!-- 간편챗봇 메시지 이름 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">간편챗봇 메시지 이름</span></th>
                      <td>
                        <div class="form-item__content is-emoji">
                          <div class="form-item-row">
                            <div class="input-item input-limit">
                              <div class="input">
                                <input type="text" class="input" maxlength="30"
                                  v-model="form.chatbotMsgName"
                                  placeholder="간편챗봇 이름을 입력해주세요."
                                  ref="chatbotName"
                                >
                                <div class="input-limit__text">
                                  <Emoji @input="onSelectEmoji($event, 'chatbotName')"/>
                                  <p>{{ form.chatbotMsgName.length }}/30자</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- 오류 메시지 주석-->
                          <!-- <p class="guide-text error">간편챗봇 메시지 이름 입력해주세요.</p> -->
                        </div>
                      </td>
                    </tr>
                    <!-- // 간편챗봇 메시지 이름 -->
                    <template v-if="form.chatType == 'card'">
                      <!-- 이미지 사이즈 -->
                      <!-- 기획서 v1.0 수정 -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">이미지 사이즈</span></th>
                        <td>
                          <ImgCmp
                            :imgSize="form.imgSize"
                            @update:imgSize="updateImgSize"
                          />
                          <!-- :imgFile="imgFile" @fileUpload="onFileUpload" -->
                        </td>
                      </tr>
                      <!-- // 이미지 사이즈 -->
                      <!-- 타이틀 -->
                      <!-- 기획서 v1.0 수정 -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">제목</span></th>
                        <td>
                          <div class="form-item__content is-emoji">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <!-- 기획서 v1.0 수정 -- v-model 수정 -->
                                  <input type="text" class="input" maxlength="30"
                                    v-model="form.chatbotMsgTitle"
                                    @input="e => form.chatbotMsgTitle = e.target.value"
                                    placeholder="간편챗봇 이름을 입력해주세요."
                                    ref="chatbotMsgTitle"
                                  >
                                  <div class="input-limit__text">
                                    <Emoji @input="onSelectEmoji($event, 'chatbotMsgTitle')"/>
                                    <p>{{ form.chatbotMsgTitle.length }}/30자</p>
                                  </div>
                                  <!-- 기획서 v1.0 수정 -- v-model 수정 -->
                                </div>
                              </div>
                            </div>
                            <!-- <p class="guide-text error">제목 입력해주세요.</p> -->
                          </div>
                        </td>
                      </tr>
                      <!-- // 타이틀  -->
                      <!-- 내용 -->
                      <!-- 기획서 v1.0 수정  -- 삭제 내용 -->
                      <!-- // 내용  -->
                    </template>
                    <!-- 메시지 복사 -->
                    <!-- 기획서 v1.0 수정  -- 삭제 메시지 복사 -->
                    <!-- 기획서 v1.0 수정  -- 내용 위치 수정 -->
                    <tr  v-if="form.chatType !== 'slider'">
                      <th scope="row"><span class="form-item__label required">내용</span></th>
                      <td>
                        <div class="form-item__content is-emoji">
                          <div class="form-item-row">
                            <div class="input-item input-limit">
                              <div class="textarea">
                                <textarea maxlength="1300" placeholder="내용을 입력해주세요."  @input="e => form.bubbleContent = e.target.value"  v-model="form.bubbleContent"
                                ref="bubbleContent"
                                style="height: 320px"></textarea>
                                <div class="textarea-limit__text">
                                  <Emoji @input="onSelectEmoji($event, 'bubbleContent')"/>
                                  <p>
                                    {{ form.bubbleContent.length }}/1,300자
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- 오류 메시지 주석처리 -->
                          <!-- <p class="guide-text error">내용을 입력해주세요.</p> -->
                        </div>
                      </td>
                    </tr>
                    <!-- 카드버튼 -->
                    <tr  v-if="form.chatType == 'card'">
                      <th scope="row"><span class="form-item__label">카드 버튼</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="cardBtnUse" id="cardBtnUseN" value="N" v-model="form.cardBtnUse"/>
                                  <label for="cardBtnUseN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="cardBtnUse" id="cardBtnUseY" value="Y" v-model="form.cardBtnUse"/>
                                  <label for="cardBtnUseY"><span class="radiobox__text">사용</span></label>
                                </span>
                                <div class="input" v-if="form.cardBtnUse === 'Y'">
                                  <Dropdown :options="cardButtonCount" v-model="form.buttonLen" placeholder="1개"  />
                                </div>
                              </div>
                            </div>
                        </div>
                        <ChatCardButtonReg
                          :buttons="form.cardButtons"
                          :buttonLen="form.buttonLen"
                          v-if="form.cardBtnUse === 'Y'"
                          @openChatbotModal="ChatBotModal"
                        />
                      </td>
                    </tr>
                    <template  v-if="form.chatType == 'slider'">
                      <!-- 타이틀 -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">타이틀</span></th>
                        <td>
                          <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="title" id="titleN" value="N" v-model="form.chatCardTitle" @click="NotUseModal" /> <!-- 기획서 v1.0 수정 --모달창 추가(p.22) -->
                                    <label for="titleN"><span class="radiobox__text">미사용</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="title" id="titleY" value="Y" v-model="form.chatCardTitle" />
                                    <label for="titleY"><span class="radiobox__text">사용</span></label>
                                  </span>
                                </div>
                              </div>
                          </div>
                        </td>
                      </tr>
                      <!-- // 타이틀  -->
                      <!-- 내용 -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">내용</span></th>
                        <td>
                          <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="content" id="contentN" value="N" v-model="form.chatCardContent" @click="NotUseModal" /> <!-- 기획서 v1.0 수정 --모달창 추가(p.22) -->
                                    <label for="contentN"><span class="radiobox__text">미사용</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="content" id="contentY" value="Y" v-model="form.chatCardContent" />
                                    <label for="contentY"><span class="radiobox__text">사용</span></label>
                                  </span>
                                </div>
                              </div>
                          </div>
                        </td>
                      </tr>
                      <!-- // 내용  -->
                    </template>
                    <!-- 응답버튼 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">응답 버튼</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="chipBtnUse" id="btnUseN" value="N" v-model="form.chipBtnUse"/>
                                  <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="chipBtnUse" id="btnUseY" value="Y" v-model="form.chipBtnUse"/>
                                  <label for="btnUseY"><span class="radiobox__text">사용</span></label>
                                </span>
                                <div class="input" v-if="form.chipBtnUse === 'Y'">
                                  <Dropdown :options="buttonCount" v-model="form.buttonLen" placeholder="1개"  />
                                </div>
                              </div>
                            </div>
                        </div>
                        <ChatChipButtonReg
                          :buttons="form.chipButtons"
                          :buttonLen="form.buttonLen"
                          v-if="form.chipBtnUse === 'Y'"
                          @openChatbotModal="ChatBotModal"
                        />
                      </td>
                    </tr>
                    <!-- // 응답버튼 -->
                  </tbody>
                </table>
                <!--  슬라이드 영역 -->
                <div class="item-reg__wrap"   v-if="form.chatType == 'slider'">
                  <div class="item-reg__inner">
                    <div class="item-reg__list" v-if="form.chatType == 'chatBubble'">
                      <div class="item active">
                        <span class="item-text">캐로셀 1</span>
                      </div>
                    </div>
                    <draggable
                      v-model="form.msgData"
                      class="item-reg__list"
                      draggable=".item--draggable"
                      v-else
                    >
                      <div
                        v-for="(msg, i) in form.msgData" :key="i"
                        class="item"
                        :class="[{'active': msg.isActive},]"
                        @click="cardActive(i)"
                      >
                        <span v-text="`캐로셀${msg.index}`" class="item-text"></span>
                        <ButtonCmp
                          type="btn-only-icon"
                          ><i class="icon-copy"></i>
                        </ButtonCmp>
                        <a role="button" class="btn-del" v-if="isCardEdit"
                        @click="removeCard(i)"
                        ><span class="blind">삭제</span></a>
                      </div>
                    </draggable>
                    <a role="button" class="btn-add"
                      v-if="form.msgData.length < 6"
                      :class="{'inactive' :  form.chatType == 'chatBubble'}"
                      @click="addCard()"
                      >+<span class="blind">추가</span></a>
                  </div>
                  <div class="ctrl-btns">
                    <ButtonCmp
                        type="btn-line"
                        size="small"
                        :disabled="form.chatType == 'chatBubble' || form.msgData.length < 2"
                        v-if="!isCardEdit"
                        @click="isCardEdit = true"
                    >편집</ButtonCmp>
                    <ButtonCmp
                        type="btn-blue"
                        size="small"
                        v-if="isCardEdit"
                        @click="saveCardEdit"
                    >저장</ButtonCmp>
                  </div>
                </div>
                <!--  // 카드 추가, 드래그 영역 -->
                <!-- 슬라이드 내용 영역 -->
                <template v-if="form.chatType == 'slider'">
                  <template v-for="(msg, j) in form.msgData">
                    <table class="table table-bodyonly form-table" v-if="msg.isActive" :key="j" >
                      <colgroup>
                        <col width="196px">
                        <col />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th scope="row"><span class="form-item__label required">이미지</span></th>
                          <td>
                            <div class="form-item__content is-emoji">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="input"><input type="text" class="input" v-model="msg.imgFile" disabled /></span>
                                  <input type="file" id="fileUp" class="input blind" @change="onFileChanged">
                                  <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                                </div>
                              </div>
                              <p class="guide-text black">&middot; 이미지 사이즈: 900 * 1,200</p>
                              <p class="guide-text black">&middot; 파일형식: JPG, PNG, GIF, BMP(최대 1MB, 단, 동일한 파일을 등록하는 경우 크기에 합산되지 않습니다.)</p>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="form.chatCardTitle == 'Y'">
                          <th scope="row"><span class="form-item__label required">타이틀</span></th>
                          <td>
                            <div class="form-item__content is-emoji">
                              <div class="form-item-row">
                                <div class="input-item input-limit">
                                  <div class="input">
                                    <input type="text" class="input" maxlength="20"
                                      v-model="msg.title"
                                      placeholder="타이틀을 입력하세요."
                                      ref="cardTitle"
                                    >
                                    <div class="input-limit__text">
                                      <Emoji @input="onSelectEmoji($event, 'cardTitle')" />
                                      <p>{{ msg.title.length }}/20자</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p class="guide-text error">타이틀을 입력해주세요.</p>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="form.chatCardContent == 'Y'">
                          <th scope="row"><span class="form-item__label required">내용</span></th>
                          <td>
                            <div class="form-item__content is-emoji">
                              <div class="form-item-row">
                                <div class="input-item input-limit">
                                  <div class="textarea">
                                    <textarea maxlength="1300" placeholder="내용을 입력해주세요."  v-model="msg.cardContent"
                                    style="height: 200px;"
                                    ref="cardContent"
                                    ></textarea>
                                    <div class="textarea-limit__text">
                                      <Emoji @input="onSelectEmoji($event, 'cardContent')" />
                                      <p>
                                        {{ msg.cardContent.length }}/1,300자
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- 오류 메시지 주석처리 -->
                              <!-- <p class="guide-text error">내용을 입력해주세요.</p> -->
                            </div>
                          </td>
                        </tr>
                        <!-- 기획서 v1.0 수정 -- 슬라이드 버튼 -->
                        <tr class="slide-btn">
                          <th scope="row"><span class="form-item__label required">슬라이드 버튼</span></th>
                          <td>
                            <div class="form-item__content">
                                <div class="form-item-row">
                                  <div class="input-item">
                                    <span class="radiobox">
                                      <input type="radio" name="btn" id="btnN" value="N" v-model="msg.btnUse"
                                      />
                                      <label for="btnN"><span class="radiobox__text">미사용</span></label>
                                    </span>
                                    <span class="radiobox">
                                      <input type="radio" name="btn" id="btnY" value="Y" v-model="msg.btnUse"
                                      />
                                      <label for="btnY"><span class="radiobox__text">사용</span></label>
                                    </span>
                                    <div class="input" v-if="msg.btnUse === 'Y'">
                                      <Dropdown :options="slideButtonCount" v-model="form.buttonLen" placeholder="1개"  />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <ChatCardButtonReg
                              :buttons="msg.buttons"
                              :buttonLen="form.buttonLen"
                              v-if="msg.btnUse === 'Y'" />
                          </td>
                        </tr>
                        <!-- // 기획서 v1.0 수정 -- 슬라이드 버튼 -->
                      </tbody>
                    </table>
                  </template>
                </template>
                <!-- // 카드 내용 영역 -->
              </div>
            </form>
          </div>
          <!-- 에뮬레이터 -->
          <div class="brand-aside">
            <ChatEmulator
              :chatInfoData="chatInfoData"
              :chatMsgData="form"
            />
          </div>
          <!-- // 에뮬레이터 -->
        </div>
        <div class="top-notice--gray">
          <p>- 간편챗봇은 담당자의 승인 없이 자유롭게 등록, 삭제 할 수 있습니다.</p>
          <p>- 단, 연결된 챗봇 메시지를 삭제하는 경우 간편챗봇이 정상적으로 작동하지 않을 수 있으므로 주의해주세요.</p>
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
              type="btn-line"
              @click="isSaveDraft"
          >임시 저장</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
              @click="onSubmit"
              :disabled = "isDisabled"
          >저장</ButtonCmp>
        </div>
      </div>
    </div>
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 간편챗봇 메시지 유형 변경 시 alert -->
      <ConfirmMsg
      v-if="isChatbotMsgChange"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          상품유형을 변경하는 경우 입력한 메시지가 삭제됩니다.<br>
          상품유형을 변경 하시겠습니까?
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
          type="btn-line"
          @click="closeMsg"
          >
            아니요
          </ButtonCmp>
          <ButtonCmp
          type="btn-blue"
          @click="closeMsg"
          >
            예
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- //간편챗봇 메시지 유형 변경 시 alert -->
      <!-- 임시 저장 alert -->
      <ConfirmMsg
      v-if="isSaveDraftMsg"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg"> <!-- 기획서 v1.0 수정  -- 내용 수정 -->
          임시저장 되었습니다.
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
      <!-- // 임시저장 alert -->
      <ChatbotConnect
        v-if="isChatBotConnect"
        @closeModal="isModalViewed = false, isChatBotConnect = false"
      >
      </ChatbotConnect>
      <!-- 기획서 v1.0 수정 -- 모달추가(p.20) -->
      <!-- 이미지 등록 후 이미지 사이즈(라디오 버튼) 변경하는 경우 Confirm MSG 노출 -->
      <ConfirmMsg
      v-if="isImgSizeChange"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          이미지 사이즈를 변경하는 경우<br>
          등록한 이미지가 삭제됩니다.<br>
          이미지를 변경 하시겠습니까?
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
          type="btn-line"
          @click="closeMsg"
          >
            아니요
          </ButtonCmp>
          <ButtonCmp
          type="btn-blue"
          @click="closeMsg"
          >
            예
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- // 이미지 등록 후 이미지 사이즈(라디오 버튼) 변경하는 경우 Confirm MSG 노출 -->
      <!-- // 기획서 v1.0 수정 -- 모달추가(p.20) -->
      <!-- 기획서 v1.0 수정 -- 모달추가(p.22) -->
      <!-- 이미지 등록 후 이미지 사이즈(라디오 버튼) 변경하는 경우 Confirm MSG 노출 -->
      <ConfirmMsg
      v-if="isNotUse"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          미사용으로 변경하는 경우<br>
          입력한 내용이 삭제됩니다.<br>
          미사용으로 변경 하시겠습니까?
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
          type="btn-line"
          @click="closeMsg"
          >
            아니요
          </ButtonCmp>
          <ButtonCmp
          type="btn-blue"
          @click="closeMsg"
          >
            예
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- // 이미지 등록 후 이미지 사이즈(라디오 버튼) 변경하는 경우 Confirm MSG 노출 -->
      <!-- // 기획서 v1.0 수정 -- 모달추가(p.22) -->
      <!-- 기획서 v1.0 수정 -- 모달추가(p.14) - 필수 입력 항목이 입력되어야 [저장] 버튼 활성화 버튼 클릭 시 -->
      <ConfirmMsg
      v-if="isChatBotRegistration"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          간편챗봇 메시지를 등록 하시겠습니까?
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
          type="btn-line"
          @click="closeMsg"
          >
            아니요
          </ButtonCmp>
          <ButtonCmp
          type="btn-blue"
          @click="saveCompleteModal"
          >
            예
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- 기획서 v1.0 수정 -- 모달추가(p.14) - [예] 버튼 클릭 시 -->
      <ConfirmMsg
      v-if="isSaveComplete"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          저장 되었습니다.
        </div>
        <div class="button__wrap" slot="button">
          <!-- [확인] 클릭 시 > 간편챗봇 메시지 목록 화면으로 이동 -->
          <router-link to="/ChatbotList" class="btn btn-blue">확인</router-link>
        </div>
      </ConfirmMsg>
      <!-- // 기획서 v1.0 수정 -- 모달추가(p.14) - [예] 버튼 클릭 시 -->
      <!-- // 기획서 v1.0 수정 -- 모달추가(p.14) - 필수 입력 항목이 입력되어야 [저장] 버튼 활성화 버튼 클릭 시 -->
    </ModalView>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'
import draggable from 'vuedraggable'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ChatCardButtonReg from '@/views/brand/chatbot/components/ChatCardButtonReg.vue'
import ChatChipButtonReg from '@/views/brand/chatbot/components/ChatChipButtonReg.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ChatbotConnect from '@/views/brand/chatbot/components/ChatbotConnect.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
import ImgCmp from '@/views/brand/chatbot/components/ImgCmp.vue'

export default {
  components: {
    PageTitle,
    ChatEmulator,
    draggable,
    BrandLnb,
    ButtonCmp,
    ChatCardButtonReg,
    ChatChipButtonReg,
    ModalView,
    ConfirmMsg,
    Dropdown,
    ChatbotConnect,
    Emoji,
    ImgCmp
  },
  data() {
    return {
      form: {
        chatType: 'chatBubble',
        chatbotMsgName: '',
        chatbotMsgTitle: '', // 기획서 v1.0 수정 -- 추가
        imgSize: 'full',
        chatCardTitle: 'N',
        chatCardContent: 'N',
        cardBtnUse: 'N',
        chipBtnUse: 'N',
        chipButtons: [
          {
            btnName: '🎀 상담직원연결 👋​'
          },
          {
            btnName: '질문하기'
          },
          {
            btnName: '전화하기'
          },
          {
            btnName: '응답버튼 2'
          },
          {
            btnName: '응답버튼 3'
          }
        ],
        bubbleContent: '',
        copyMsg: 'Y',
        buttonLen: '',
        cardButtons: '',
        msgData: [
          {
            index: 1,
            isActive: true,
            imgFile: 'dummy/template_image.png',
            title: '제목',
            cardContent: '',
            btnUse: 'N',
            buttons: []
          },
          {
            index: 2,
            isActive: false,
            imgFile: 'dummy/template_image.png',
            title: '',
            cardContent: '내용',
            btnUse: 'N',
            buttons: []
          },
          {
            index: 3,
            isActive: false,
            imgFile: 'dummy/template_image.png',
            title: '제목',
            cardContent: '내용',
            btnUse: 'N',
            buttons: []
          },
          {
            index: 4,
            isActive: false,
            imgFile: 'dummy/template_image.png',
            title: '제목제목제목제목제목',
            cardContent: '내용내용내용내용내용',
            btnUse: 'Y',
            buttons: [
              {
                btnName: '간편챗봇 연결'
              }
            ]
          },
          {
            index: 5,
            isActive: false,
            imgFile: 'dummy/template_image.png',
            title: '제목제목제목제목제목',
            cardContent: '내용내용내용내용내용',
            btnUse: 'Y',
            buttons: [
              {
                btnName: '간편챗봇 연결'
              },
              {
                btnName: '간편챗봇 연결'
              }
            ]
          }
        ],
        msgCardData: [
          {
            index: 1,
            isActive: true,
            imgSize: 'full',
            imgFile: '',
            title: '',
            cardContent: '',
            btnUse: 'N',
            buttons: []
          },
          {
            index: 2,
            isActive: true,
            imgSize: 'full',
            imgFile: '',
            title: '제목',
            cardContent: '',
            btnUse: 'N',
            buttons: []
          },
          {
            index: 3,
            isActive: false,
            imgSize: 'medium',
            imgFile: 'dummy/chat_emulator_card_image.png',
            title: '',
            cardContent: '',
            btnUse: 'N',
            buttons: []
          },
          {
            index: 4,
            isActive: false,
            imgSize: 'medium',
            imgFile: 'dummy/chat_emulator_card_image.png',
            title: '제목',
            cardContent: '내용',
            btnUse: 'N',
            buttons: []
          },
          {
            index: 5,
            isActive: false,
            imgSize: 'medium',
            imgFile: 'dummy/chat_emulator_card_image.png',
            title: '제목제목제목제목제목',
            cardContent: '내용내용내용내용내용',
            btnUse: 'Y',
            buttons: [
              {
                btnName: '간편챗봇 연결'
              }
            ]
          },
          {
            index: 6,
            isActive: false,
            imgSize: 'medium',
            imgFile: 'dummy/chat_emulator_card_image.png',
            title: '제목제목제목제목제목',
            cardContent: '내용내용내용내용내용',
            btnUse: 'Y',
            buttons: [
              {
                btnName: '간편챗봇 연결'
              },
              {
                btnName: '간편챗봇 연결'
              }
            ]
          }
        ]
      },
      isCardEdit: false,
      chatInfoData: {
        chatRoomName: 'SYSTEMSTUDIO',
        saftyMark: 'Y',
        hideInputFooter: true,
        mode: 'registration'
      },
      imgFile: '',
      cardActiveIndex: 0,
      isModalViewed: false,
      isChatbotMsgChange: false,
      isSaveDraftMsg: false,
      isChatBotConnect: false,
      showSpecialCharTitle: false, // 특수문자 선택창 show 여부
      showSpecialCharBubbleContent: false,
      isImgSizeChange: false, // 기획서 v1.0 수정 -- 모달 추가
      isNotUse: false, // 기획서 v1.0 수정 -- 모달 추가
      isChatBotRegistration: false, // 기획서 v1.0 수정 -- 모달 추가
      isSaveComplete: false, // 기획서 v1.0 수정 -- 모달 추가
      buttonCount: [
        {
          label: '1개',
          value: '1'
        },
        {
          label: '2개',
          value: '2'
        },
        {
          label: '3개',
          value: '3'
        },
        {
          label: '4개',
          value: '4'
        },
        {
          label: '5개',
          value: '5'
        },
        {
          label: '6개',
          value: '6'
        },
        {
          label: '7개',
          value: '7'
        },
        {
          label: '8개',
          value: '8'
        },
        {
          label: '9개',
          value: '9'
        },
        {
          label: '10개',
          value: '10'
        },
        {
          label: '11개',
          value: '11'
        }        
      ],
      cardButtonCount: [
        {
          label: '1개',
          value: '1'
        },
        {
          label: '2개',
          value: '2'
        },
        {
          label: '3개',
          value: '3'
        },
        {
          label: '4개',
          value: '4'
        }
      ],
      slideButtonCount: [
        {
          label: '1개',
          value: '1'
        },
        {
          label: '2개',
          value: '2'
        }
      ]
    }
  },
  computed: {
    chatMsgData() {
      return this.form.msgData.filter(msg => {
        return msg.isActive === true
      })
    },
    isDisabled() {
      // 버튼 활성화에 대한 예시
      return this.form.chatbotMsgName.length <= 0
    }
  },
  methods: {
    // 카드 추가
    addCard () {
      let msgData = {
        index: (this.form.msgData.length + 1),
        isActive: false,
        imgFile: '',
        title: '',
        cardContent: '',
        btnUse: 'N',
        buttons: [{
          btnName: '',
          btnEvent: '',
          isActive: true
        }]
      }
      if (this.form.chatType !== 'chatBubble') {
        this.form.msgData.push(msgData)
      }
    },
    // 슬라이드 삭제
    removeCard (idx) {
      if (this.form.msgData.length > 1) {
        this.form.msgData.splice(idx, 1)
      }
    },
    // 슬라이드 활성화
    cardActive (idx) {
      this.cardActiveIndex = idx
      this.form.msgData.forEach((msg, index) => {
        if (idx !== index) {
          msg.isActive = false
        } else {
          msg.isActive = true
        }
      })
    },
    // 슬라이드 편집 활성화
    saveCardEdit() {
      this.form.msgData.forEach((msg, index) => {
        if (index === 0) {
          msg.isActive = true
        } else {
          msg.isActive = false
        }
      })
      this.isCardEdit = false
    },
    // 이미지 파일 업로드
    onFileChanged (e) {
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      this.form.msgData[0].imgFile = fileName
      this.url = URL.createObjectURL(file)
    },
    onFileUpload({ imgSize, imgFile }) {
      this.imgSize = imgSize
      this.imgFile = imgFile
    },
    isChangeTypeCheck() {
      if (this.form.chatbotMsgName) {
        this.isModalViewed = true
        this.isChatbotMsgChange = true
      }
    },
    isSaveDraft() {
      this.isModalViewed = true
      this.isSaveDraftMsg = true
    },
    closeMsg () {
      this.isModalViewed = false
      this.isChatbotMsgChange = false
      this.isSaveDraftMsg = false
      this.isImgSizeChange = false // 기획서 v1.0 수정 -- 모달 추가 (p.20)
      this.isNotUse = false // 기획서 v1.0 수정 -- 모달 추가 (p.22)
      this.isChatBotRegistration = false // 기획서 v1.0 수정 -- 모달 추가 (p.14)
      this.isSaveComplete = false // 기획서 v1.0 수정 -- 모달 추가 (p.14)
    },
    ChatBotModal() {
      this.isModalViewed = true
      this.isChatBotConnect = true
    },
    imgSizeChangeModal() {
      this.isModalViewed = true
      this.isImgSizeChange = true
    }, // 기획서 v1.0 수정 -- 모달 추가 (p.20)
    NotUseModal() {
      this.isModalViewed = true
      this.isNotUse = true
    }, // 기획서 v1.0 수정 -- 모달 추가 (p.22)
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
    },
    updateImgSize(newImgSize) {
      this.form.imgSize = newImgSize
    },
    onSubmit () {
      this.isModalViewed = true
      this.isChatBotRegistration = true
      this.isSaveComplete = false
    }, // 기획서 v1.0 수정 -- 모달 추가 (p.14)
    saveCompleteModal() {
      this.isModalViewed = true
      this.isSaveComplete = true
      this.isChatBotRegistration = false
    } // 기획서 v1.0 수정 -- 모달 추가 (p.14)
  }
}
</script>

<style>
</style>
