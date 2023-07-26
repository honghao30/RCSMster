<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle :pagetitle="(isNew) ? '간편챗봇 메시지 등록':'간편챗봇 메시지 수정'" />
        <div class="chatroom__wrap">
          <div class="chatroom-registration">
            <form>
              <!-- 챗봇 유형 -->
              <div class="type__radio-tab">
                <ul>
                  <li>
                    <input type="radio" id="chatBubble" value="chatBubble" class="blind" v-model='autoReplyMsgData.chatType' :checked="autoReplyMsgData.chatType == 'chatBubble'" @click="isChangeTypeCheck($event, 'chatBubble')"/>
                    <label for="chatBubble">
                      <i class="icon-chatbubble"></i>
                      <dl>
                        <dt class="tab-title">말풍선(1장)</dt> <!-- 기획서 v1.0 수정 -->
                        <dd class="tab-text">텍스트 중심의 간단한 메시지 작성</dd>
                      </dl>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="card" value="card" class="blind" v-model='autoReplyMsgData.chatType' :checked="autoReplyMsgData.chatType == 'card'" @click="isChangeTypeCheck($event, 'card')"/>
                    <label for="card">
                      <i class="icon-card"></i>
                      <dl>
                        <dt class="tab-title">카드(1장)</dt>
                        <dd class="tab-text">이미지와 텍스트를 혼합하여 풍부한 메시지 작성</dd>
                      </dl>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="slider" value="slider" class="blind" v-model="autoReplyMsgData.chatType" :checked="autoReplyMsgData.chatType == 'slider'" @click="isChangeTypeCheck($event, 'slider')"/>
                    <label for="slider">
                      <i class="icon-card"></i>
                      <dl>
                        <dt class="tab-title">캐로셀(2~6장)</dt>
                        <dd class="tab-text">이미지와 텍스트를 혼합하여 풍부한 메시지 작성</dd>
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
                                  v-model="autoReplyMsgData.name"
                                  placeholder="간편챗봇 이름을 입력해주세요."
                                  ref="chatbot_name"
                                >
                                <div class="input-limit__text">
                                  <Emoji @input="onSelectEmoji($event, 'chatbot_name')"/>
                                  <p>{{ autoReplyLen }}/30자</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- // 간편챗봇 메시지 이름 -->
                    <!-- 말풍선 내용 영역 -->
                    <template v-if="autoReplyMsgData.chatType === 'chatBubble'">
                      <tr>
                        <th scope="row"><span class="form-item__label required">내용</span></th>
                        <td>
                          <div class="form-item__content is-emoji">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="textarea" :ref="`cardData_0_content`">
                                <textarea maxlength="1300" placeholder="내용을 입력해주세요."  v-model="autoReplyMsgData.cardData[0].description"
                                          style="height: 320px"
                                ></textarea>
                                  <div class="textarea-limit__text">
                                    <Emoji @input="onSelectEmoji($event, `cardData_0_content`)"/>
                                    <p>
                                      {{ (autoReplyMsgData.cardData[0].description)? autoReplyMsgData.cardData[0].description.length:'0' }}/1,300자
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </template>
                    <!-- // 말풍선 내용 영역 -->
                    <!-- 카드 1장 영역 -->
                    <template v-if="autoReplyMsgData.chatType === 'card'">
                      <!-- 이미지 사이즈 -->
                      <!-- 기획서 v1.0 수정 -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">이미지 사이즈</span></th>
                        <td>
                          <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="imgSize" id="full" value="full" v-model="autoReplyMsgData.imgSize"/>
                                    <label for="full"><span class="radiobox__text">전체 사이즈</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="imgSize" id="medium" value="medium" v-model="autoReplyMsgData.imgSize"/>
                                    <label for="medium"><span class="radiobox__text">중간 사이즈</span></label>
                                  </span>
                                </div>
                              </div>
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="input"><input type="text" :ref='`cardData_0_file`' v-model='autoReplyMsgData.cardData[0].fileName' disabled placeholder="이미지를 등록해주세요."></span>
                                  <input type="file" id="fileUp" class="input" @change="onFileChanged($event, 0)">
                                  <label for="fileUp"
                                    class="btn btn-default-line"
                                  >파일찾기</label>
                                </div>
                                <!-- :disabled="isSlideCardEdit"  :class="{'inactive' : isSlideCardEdit }" -->
                                <p class="guide-text black">&middot; 파일형식: JPG, PNG, GIF, BMP<br>(최대 1MB, 단, 동일한 파일을 등록하는 경우 크기에 합산되지 않습니다.)</p>
                              </div>
                          </div>
                        </td>
                      </tr>
                      <!-- 카드 타이틀 영역 -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">제목</span></th>
                        <td>
                          <div class="form-item__content is-emoji">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <input type="text" class="input" maxlength="20"
                                         v-model="autoReplyMsgData.cardData[0].title"
                                         placeholder="타이틀을 입력하세요."
                                         @input="e => autoReplyMsgData.cardData[0].title = e.target.value"
                                         ref='cardData_0_title'
                                  >
                                  <div class="input-limit__text">
                                    <Emoji @input="onSelectEmoji($event, 'cardTitle', j)" />
                                    <p>{{ autoReplyMsgData.cardData[0].title.length }}/20자</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- // 카드 타이틀 영역 -->
                      <!-- 카드 내용 영역 -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">내용</span></th>
                        <td>
                          <div class="form-item__content is-emoji">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="textarea" ref='cardData_0_content'>
                                    <textarea maxlength="1300" placeholder="내용을 입력해주세요."
                                              style="height: 200px;"
                                              v-model="autoReplyMsgData.cardData[0].description"
                                              @input="e => autoReplyMsgData.cardData[0].description = e.target.value"
                                    ></textarea>
                                  <div class="textarea-limit__text">
                                    <Emoji @input="onSelectEmoji($event, 'cardContent', j)" />
                                    <p>
                                      {{ autoReplyMsgData.cardData[0].description.length }}/1,300자
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- // 카드 내용 영역 -->
                      <!-- 카드 1장 카드 버튼 영역 -->
                      <tr>
                        <th scope="row"><span class="form-item__label">카드 버튼</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="cardBtnUse" id="cardBtnUseN" value="N" v-model="autoReplyMsgData.cardData[0].buttonUseYn"/>
                                  <label for="cardBtnUseN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                                    <span class="radiobox">
                                  <input type="radio" name="cardBtnUse" id="cardBtnUseY" value="Y" v-model="autoReplyMsgData.cardData[0].buttonUseYn"/>
                                  <label for="cardBtnUseY"><span class="radiobox__text">사용</span></label>
                                </span>
                                <div class="input" v-if="autoReplyMsgData.cardData[0].buttonUseYn === 'Y'">
                                  <Dropdown :options="cardButtonCount" v-model="autoReplyMsgData.cardData[0].buttonLen" placeholder="1개" @change='changeCardBtnCount(0)' />
                                </div>
                              </div>
                            </div>
                          </div>
                          <template v-if="autoReplyMsgData.cardData[0].buttonUseYn === 'Y'">
                            <ChatButtonReg
                              v-for="(button, i) in autoReplyMsgData.cardData[0].suggestions" :key="i"
                              :index='i'
                              :cardIndex='0'
                              btnType='card'
                              @selectedAutoReply='selectedAutoReply'
                              @selectedFeed='selectedFeed'
                              @changeBtnAction='changeBtnAction'
                              :ref='`cardData_0_${i}_btn`'
                              :buttonInfo='button'
                            />
                          </template>
                        </td>
                      </tr>
                      <!-- // 카드 1장 카드 버튼 영역 -->
                      <!-- // 이미지 사이즈 -->
                    </template>
                    <!-- // 카드 1장 영역 -->
                    <!-- 슬라이더 영역 -->
                    <template v-if="autoReplyMsgData.chatType === 'slider'">
                      <!-- 이미지 사이즈 -->
<!--                      <tr>
                        <th scope="row"><span class="form-item__label required">이미지 사이즈</span></th>
                        <td>
                          <div class="form-item-row">
                            <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="imgSize" id="full" value="full" v-model="autoReplyMsgData.imgSize"/>
                                    <label for="full"><span class="radiobox__text">전체 사이즈</span></label>
                                  </span>
                              <span class="radiobox">
                                    <input type="radio" name="imgSize" id="medium" value="medium" v-model="autoReplyMsgData.imgSize"/>
                                    <label for="medium"><span class="radiobox__text">중간 사이즈</span></label>
                                  </span>
                            </div>
                          </div>
                        </td>
                      </tr>-->
                      <!-- 이미지 사이즈 -->
                      <!-- 타이틀 사용 여부 -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">타이틀</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="slideTitleYn" id="slideTitleN" value="N" v-model="autoReplyMsgData.chatCardTitle"/>
                                    <label for="slideTitleN"><span class="radiobox__text">미사용</span></label>
                                  </span>
                                <span class="radiobox">
                                    <input type="radio" name="slideTitleYn" id="slideTitleY" value="Y" v-model="autoReplyMsgData.chatCardTitle"/>
                                    <label for="slideTitleY"><span class="radiobox__text">사용</span></label>
                                  </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- // 타이틀 사용 여부  -->
                      <!-- 내용 사용 여부 -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">내용</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="slideContentYn" id="slideContentN" value='N' v-model="autoReplyMsgData.chatCardContent"/>
                                    <label for="slideContentN"><span class="radiobox__text">미사용</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="slideContentYn" id="slideContentY" value='Y' v-model="autoReplyMsgData.chatCardContent"/>
                                    <label for="slideContentY"><span class="radiobox__text">사용</span></label>
                                  </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- // 내용 사용 여부  -->
                    </template>
                    <!-- 응답버튼 사용 여부 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">응답 버튼</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="chipBtnUse" id="chipBtnUseN" value="N" v-model="autoReplyMsgData.chipBtnUse"/>
                                  <label for="chipBtnUseN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="chipBtnUse" id="chipBtnUseY" value="Y" v-model="autoReplyMsgData.chipBtnUse"/>
                                  <label for="chipBtnUseY"><span class="radiobox__text">사용</span></label>
                                </span>
                                <div class="input" v-if="autoReplyMsgData.chipBtnUse === 'Y'">
                                  <Dropdown :options="chipButtonCount" v-model="autoReplyMsgData.chipBtnLen" placeholder="1개" @change='changeChipBtnCount'  />
                                </div>
                              </div>
                            </div>
                        </div>
                        <template v-if="autoReplyMsgData.chipBtnUse === 'Y'">
                          <ChatButtonReg
                            v-for="(button, i) in autoReplyMsgData.chipSuggestions" :key="i"
                            :index='i'
                            btnType='chip'
                            @selectedAutoReply='selectedAutoReply'
                            @selectedFeed='selectedFeed'
                            :ref="`chipBtns_${i}`"
                            @changeBtnAction='changeBtnAction'
                            :buttonInfo='button'
                          />
                        </template>
                      </td>
                    </tr>
                    <!-- // 응답버튼 사용 여부 -->
                  </tbody>
                </table>
                <!--  슬라이드 영역 -->
                <div class="item-reg__wrap" v-if="autoReplyMsgData.chatType == 'slider'">
                  <div class="item-reg__inner">
                    <draggable
                      v-model="autoReplyMsgData.cardData"
                      class="item-reg__list"
                      draggable=".item--draggable"
                    >
                      <div
                        v-for="(msg, i) in autoReplyMsgData.cardData" :key="i"
                        class="item"
                        :class="[{'active': msg.isActive}, {'item--draggable': isCardEdit}]"
                        @click="cardActive(i)"
                      >
                        <span v-text="`카드${msg.cardNo}`" class="item-text"></span>
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
                      v-if="autoReplyMsgData.cardData.length < 6"
                      @click="addCard()"
                      >+<span class="blind">추가</span></a>
                  </div>
                  <div class="ctrl-btns">
                    <ButtonCmp
                        type="btn-line"
                        size="small"
                        :disabled="autoReplyMsgData.cardData.length < 2"
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
                <!-- 카드 내용 영역 -->
                <template v-if="autoReplyMsgData.chatType == 'slider'">
                  <template v-for="(msg, j) in autoReplyMsgData.cardData">
                    <table class="table table-bodyonly form-table" v-if="msg.isActive" :key="j" >
                      <colgroup>
                        <col width="196px">
                        <col />
                      </colgroup>
                      <tbody>
                        <!-- 카드 이미지 등록 영역 -->
                        <tr>
                          <th scope="row"><span class="form-item__label required">이미지</span></th>
                          <td>
                            <div class="form-item__content is-emoji">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="input"><input type="text" :ref="`cardData_${j}_file`" class="input" v-model="msg.fileName" disabled placeholder="이미지를 등록해주세요." /></span>
                                  <input type="file" id="fileUp" class="input blind" @change="onFileChanged($event, j)">
                                  <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                                </div>
                              </div>
                              <p class="guide-text black">&middot; 이미지 사이즈: 900 * 1,200</p>
                              <p class="guide-text black">&middot; 파일형식: JPG, PNG, GIF, BMP(최대 1MB, 단, 동일한 파일을 등록하는 경우 크기에 합산되지 않습니다.)</p>
                            </div>
                          </td>
                        </tr>
                        <!-- // 카드 이미지 등록 영역 -->
                        <!-- 카드 타이틀 영역 -->
                        <tr v-if="autoReplyMsgData.chatCardTitle == 'Y'">
                          <th scope="row"><span class="form-item__label required">타이틀</span></th>
                          <td>
                            <div class="form-item__content is-emoji">
                              <div class="form-item-row">
                                <div class="input-item input-limit">
                                  <div class="input">
                                    <input type="text" class="input" maxlength="20"
                                      v-model="msg.title"
                                      placeholder="타이틀을 입력하세요."
                                      :ref="`cardData_${j}_title`"
                                      @input="e => msg.title = e.target.value"
                                    >
                                    <div class="input-limit__text">
                                      <Emoji @input="onSelectEmoji($event, `cardData_${j}_title`, j)" />
                                      <p>{{ msg.title.length }}/20자</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <!-- // 카드 타이틀 영역 -->
                        <!-- 카드 내용 영역 -->
                        <tr v-if="autoReplyMsgData.chatCardContent === 'Y'">
                          <th scope="row"><span class="form-item__label required">내용</span></th>
                          <td>
                            <div class="form-item__content is-emoji">
                              <div class="form-item-row">
                                <div class="input-item input-limit">
                                  <div class="textarea" :ref="`cardData_${j}_content`">
                                    <textarea maxlength="1300" placeholder="내용을 입력해주세요."  v-model="msg.description"
                                    @input="e => msg.description = e.target.value"
                                    style="height: 200px;"
                                    ></textarea>
                                    <div class="textarea-limit__text">
                                      <Emoji @input="onSelectEmoji($event, `cardData_${j}_content`, j)" />
                                      <p>
                                        {{ msg.description.length }}/1,300자
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <!-- // 카드 내용 영역 -->
                        <tr>
                          <th scope="row"><span class="form-item__label required">슬라이드 버튼</span></th>
                          <td>
                            <!-- 카드 버튼 사용 유무 영역 -->
                            <div class="form-item__content">
                                <div class="form-item-row">
                                  <div class="input-item">
                                    <span class="radiobox">
                                      <input type="radio" name="btn" id="btnN" value="N" v-model="msg.buttonUseYn"
                                      />
                                      <label for="btnN"><span class="radiobox__text">미사용</span></label>
                                    </span>
                                    <span class="radiobox">
                                      <input type="radio" name="btn" id="btnY" value="Y" v-model="msg.buttonUseYn"
                                      />
                                      <label for="btnY"><span class="radiobox__text">사용</span></label>
                                    </span>
                                    <div class="input" v-if="autoReplyMsgData.cardData[j].buttonUseYn === 'Y'">
                                      <Dropdown :options="cardButtonCount" v-model="autoReplyMsgData.cardData[j].buttonLen" placeholder="1개" @change='changeCardBtnCount(j)' />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- // 카드 버튼 사용 유무 영역 -->
                              <!-- 카드 버튼 영역 -->
                              <template v-if="autoReplyMsgData.cardData[j].buttonUseYn === 'Y'">
                                <ChatButtonReg
                                  v-for="(button, c) in autoReplyMsgData.cardData[j].suggestions" :key="c"
                                  :index='c'
                                  :cardIndex='j'
                                  btnType='card'
                                  :ref='`cardData_${j}_${c}_btn`'
                                  @selectedAutoReply='selectedAutoReply'
                                  @selectedFeed='selectedFeed'
                                  @changeBtnAction='changeBtnAction'
                                  :buttonInfo='button'
                                />
                              </template>
                              <!-- // 카드 버튼 영역 -->
                          </td>
                        </tr>
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
            <autoReplyMsgEmulator
              :brandInfoData='brandInfo'
              :chatInfoData="autoReplyMsgData"
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
              :disabled='!isSaved && !isNew'
          >임시 저장</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
              @click="onSubmit"
          >저장</ButtonCmp>
        </div>
      </div>
    </div>
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 임시 저장 alert -->
      <ConfirmMsg
      v-if="isSaveDraftMsg"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          임시저장이 완료되었습니다.
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
    </ModalView>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import autoReplyMsgEmulator from '@/views/brand/autoreply/components/autoReplyMsgEmulator.vue'
import draggable from 'vuedraggable'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ChatButtonReg from '@/views/brand/autoreply/components/ChatButtonReg.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
import { mapGetters, mapActions } from 'vuex'
import { createAutoReply, getAutoReplySubmitData, saveAutoReply } from '@/api/service/autoReply'
import Dropdown from '@/components/common/Dropdown.vue'
import autoReplyMsgUtils from '@/views/brand/autoreply/components/js/autoReplyMsgUtils'
import actionData from '@/components/js/openrichcardDefaultRefData'

export default {
  components: {
    PageTitle,
    autoReplyMsgEmulator,
    draggable,
    BrandLnb,
    ButtonCmp,
    ChatButtonReg,
    ModalView,
    ConfirmMsg,
    Emoji,
    Dropdown
  },
  data() {
    return {
      brandId: '',
      armId: '',
      isCardEdit: false,
      isModalViewed: false,
      isSaveDraftMsg: false,
      isNameError: {
        isShow: false,
        txt: ''
      },
      remainImageSize: 0,
      cardButtonCount: [
        { codeNm: '1개', code: '1' },
        { codeNm: '2개', code: '2' },
        { codeNm: '3개', code: '3' },
        { codeNm: '4개', code: '4' }
      ],
      chipButtonCount: [
        { codeNm: '1개', code: '1' },
        { codeNm: '2개', code: '2' },
        { codeNm: '3개', code: '3' },
        { codeNm: '4개', code: '4' },
        { codeNm: '5개', code: '5' },
        { codeNm: '6개', code: '6' },
        { codeNm: '7개', code: '7' },
        { codeNm: '8개', code: '8' },
        { codeNm: '9개', code: '9' },
        { codeNm: '10개', code: '10' }
      ]
    }
  },
  created() {
    this.brandId = this.$router.currentRoute.params.brandId
    if (!this.isNew) {
      this.armId = this.$router.currentRoute.params.autoReplyMsgId
      // state에 autoReplyMsgData 값이 있는지 검사
      if (!this.autoReplyMsgData.armId) {
        this.getData()
      } else {
        this.autoReplyMsgData.cardData[0].isActive = true
      }
    } else {
      this.initAutoReplyMsgData({ brandId: this.brandId, chatType: 'chatBubble' })
      // this.autoReplyMsgData.chatType = 'card'
    }
  },
  mounted() {},
  computed: {
    isSaved() { return !jglib.isEmpty(this.autoReplyMsgData.aprvRet) && this.autoReplyMsgData.aprvRet === 'SAVED' },
    isNew() {
      return (!this.$router.currentRoute.params.autoReplyMsgId)
    },
    ...mapGetters('autoReply', {
      autoReplyMsgData: 'getAutoReplyData',
      chipSuggestions: 'getChipSuggestions',
      cards: 'getCards'
    }),
    ...mapGetters('brand', {
      brandInfo: 'getBrandDetail'
    }),
    autoReplyLen() {
      if (this.autoReplyMsgData.name) {
        return this.autoReplyMsgData.name.length
      } else {
        return '0'
      }
    },
    productType() {
      if (this.autoReplyMsgData.chatType === 'card') {
        return 'standalone'
      } else if (this.autoReplyMsgData.chatType === 'slider') {
        return 'carousel'
      } else {
        return 'scs'
      }
    }
  },
  watch: {
    // 'autoReplyMsgData.chatType'(value) {
    //   if (value !== 'chatBubble') {
    //     this.autoReplyMsgData.cardData[0].isActive = true
    //   }
    // }
  },
  methods: {
    ...mapActions({
      getAutoReplyData: 'autoReply/get_auto_reply_data',
      initAutoReplyMsgData: 'autoReply/init_auto_reply_msg_data',
      getTemplateData: 'autoReply/get_template_data',
      setCardActive: 'autoReply/set_card_active'
    }),
    getData() {
      this.getAutoReplyData({ brandId: this.brandId, armId: this.armId }).then(res => {
        this.autoReply = res.result.autoReply
        this.templateContent = res.result.templateContent
      }).catch(e => {
        this.$alertMsg(e.desc)
      })
    },
    // 카드 추가
    addCard () {
      let msgData = JSON.parse(JSON.stringify(autoReplyMsgUtils.cardData))
      msgData.cardNo = (this.autoReplyMsgData.cardData.length + 1)
      msgData.isActive = false
      this.autoReplyMsgData.cardData.push(msgData)
      // 카드 추가 삭제시 템플릿 아이디를 초기화 한다.
      this.autoReplyMsgData.tplId = ''
      this.autoReplyMsgData.tplNm = ''
    },
    // 슬라이드 삭제
    removeCard (idx) {
      if (this.autoReplyMsgData.cardData.length > 1) {
        this.autoReplyMsgData.cardData.splice(idx, 1)
      }
      // 카드 추가 삭제시 템플릿 아이디를 초기화 한다.
      this.autoReplyMsgData.tplId = ''
      this.autoReplyMsgData.tplNm = ''
    },
    // 슬라이드 활성화
    cardActive (idx) {
      this.autoReplyMsgData.cardData.forEach((msg, index) => {
        if (idx !== index) {
          msg.isActive = false
        } else {
          msg.isActive = true
        }
      })
    },
    // 슬라이드 편집 활성화
    saveCardEdit() {
      this.autoReplyMsgData.cardData.forEach((msg, index) => {
        if (index === 0) {
          msg.isActive = true
        } else {
          msg.isActive = false
        }
      })
      this.isCardEdit = false
    },
    calculDisplayMaxFileSize(size) {
      return parseInt(size) / (1024 * 1024)
    },
    // 이미지 파일 업로드
    onFileChanged (e, idx) {
      let fileData = e.target.files[0]
      if (fileData === undefined) {
        return false
      }
      // 용량 체크
      let maxFileSize = this.calculDisplayMaxFileSize(this.autoReplyMsgData.maxMediaSize)
      // 유효한 파일인지 체크
      let uploadCheck = jglib.checkFileData(fileData, ['jpg', 'jpeg', 'png', 'gif', 'bmp'], maxFileSize)
      // jglib.checkImageSize(fileData, 900, 900, 1200, 1200).then((valid) => {
      //   if (valid === 'size') {
      //     this.$alertMsg('900X900px~1200X1200px 사이즈 파일만 업로드 할 수 있습니다.')
      //   } else {
      //     this.$alertMsg('이미지 속성이 확장자와 일치하지 않습니다.')
      //   }
      // })
      if (uploadCheck.code === 'errorExt' || uploadCheck.code === 'errorSize') this.$alertMsg(uploadCheck.message)
      else {
        let remainSize = this.autoReplyMsgData.maxMediaSize - fileData.size
        if (remainSize < 0) {
          this.$alertMsg('이미지 용량이 초과 되었습니다.')
        } else {
          this.remainImageSize = remainSize
          this.autoReplyMsgData.cardData[idx].fileRaw = fileData
          this.autoReplyMsgData.cardData[idx].fileName = fileData.name
          this.autoReplyMsgData.cardData[idx].fileUrl = this.url = URL.createObjectURL(fileData)
        }
      }
    },
    isChangeTypeCheck(e, type) {
      e.preventDefault()
      if (this.autoReplyMsgData.chatType !== type) {
        this.$confirmMsg(`상품유형을 변경하는 경우 입력한 메시지가 삭제됩니다.<br>상품유형을 변경 하시겠습니까?`).then(() => {
          // 초기화
          this.initAutoReplyMsgData({ brandId: this.brandId, chatType: type })
        }).catch(e => {
          return false
        })
      }
    },
    async inputValidation(name, isAllCheck, isSave) {
      // 유효성 초기화
      autoReplyMsgUtils.validateInit(this.autoReplyMsgData, this.$refs)
      // 간편 챗봇 명 체크
      if (name === 'chatbot_name' || isAllCheck) {
        if (jglib.isEmpty(this.autoReplyMsgData.name)) {
          this.$refs['chatbot_name'].style.border = '1px solid red'
          this.$refs['chatbot_name'].focus()
          return Promise.resolve(false)
        }
      }
      let cardData = this.autoReplyMsgData.cardData
      let target = ''
      if (this.autoReplyMsgData.chatType === 'chatBubble') {
        // 내용 체크
        target = `cardData_0_content`
        if ((name === target || isAllCheck) && !isSave) {
          if (jglib.isEmpty(cardData[0].description)) {
            this.$refs[target].style.border = '1px solid red'
            this.$refs[target].focus()
            return Promise.resolve(false)
          }
        }
      } else if (this.autoReplyMsgData.chatType === 'card') {
        target = `cardData_0_file`
        // 이미지 체크
        if ((name === target || isAllCheck)) {
          if (jglib.isEmpty(cardData[0].fileUrl)) {
            this.$refs[target].style.border = '1px solid red'
            this.$refs[target].focus()
            return Promise.resolve(false)
          }
        }
        target = `cardData_0_title`
        // 제목 체크
        if ((name === target || isAllCheck) && !isSave) {
          if (jglib.isEmpty(cardData[0].title)) {
            this.$refs[target].style.border = '1px solid red'
            this.$refs[target].focus()
            return Promise.resolve(false)
          }
        }
        // 내용 체크
        target = `cardData_0_content`
        if ((name === target || isAllCheck) && !isSave) {
          if (jglib.isEmpty(cardData[0].description)) {
            this.$refs[target].style.border = '1px solid red'
            this.$refs[target].focus()
            return Promise.resolve(false)
          }
        }
        // 카드 버튼 사용 유무 체크
        if (this.autoReplyMsgData.cardData[0].buttonUseYn === 'Y' && isAllCheck && !isSave) {
          let btns = this.autoReplyMsgData.cardData[0].suggestions
          for (let b in btns) {
            target = `cardData_0_${b}_btn`
            this.$refs[target][0].validateBtnInit()
          }
          for (let b in btns) {
            target = `cardData_0_${b}_btn`
            let vlidSugg = autoReplyMsgUtils.validateBtnDataCheck(btns[b], 0, b)
            if (!vlidSugg.result) {
              this.$nextTick(() => {
                this.$refs[target][0].validateData(vlidSugg)
              })
              return Promise.resolve(false)
            }
          }
        }
      } else if (this.autoReplyMsgData.chatType === 'slider') {
        // 슬라이더 타입 체크
        for (let key in cardData) {
          key = parseInt(key)
          target = `cardData_${key}_file`
          // 이미지 체크
          if ((name === target || isAllCheck)) {
            if (jglib.isEmpty(cardData[key].fileUrl)) {
              this.cardActive(parseInt(key))
              this.$nextTick(() => {
                this.$refs[target][0].style.border = '1px solid red'
                this.$refs[target][0].focus()
              })
              return Promise.resolve(false)
            }
          }
          target = `cardData_${key}_title`
          // 제목 체크
          if ((name === target || isAllCheck) && !isSave && this.autoReplyMsgData.chatCardTitle === 'Y') {
            if (jglib.isEmpty(cardData[key].title)) {
              this.cardActive(parseInt(key))
              this.$nextTick(() => {
                this.$refs[target][0].style.border = '1px solid red'
                this.$refs[target][0].focus()
              })
              return Promise.resolve(false)
            }
          }
          // 내용 체크
          target = `cardData_${key}_content`
          if ((name === target || isAllCheck) && !isSave && this.autoReplyMsgData.chatCardContent === 'Y') {
            if (jglib.isEmpty(cardData[key].description)) {
              this.cardActive(parseInt(key))
              this.$nextTick(() => {
                this.$refs[target][0].style.border = '1px solid red'
                this.$refs[target][0].focus()
              })
              return Promise.resolve(false)
            }
          }
          // 카드 버튼 사용 유무 체크
          if (this.autoReplyMsgData.cardData[key].buttonUseYn === 'Y' && isAllCheck && !isSave) {
            let btns = this.autoReplyMsgData.cardData[key].suggestions
            for (let b in btns) {
              target = `cardData_${key}_${b}_btn`
              if (this.autoReplyMsgData.cardData[key].isActive) {
                this.$refs[target][0].validateBtnInit()
              }
            }
            for (let b in btns) {
              target = `cardData_${key}_${b}_btn`
              let vlidSugg = autoReplyMsgUtils.validateBtnDataCheck(btns[b], key, b)
              if (!vlidSugg.result) {
                this.cardActive(parseInt(key))
                this.$nextTick(() => {
                  this.$refs[target][0].validateData(vlidSugg)
                })
                return Promise.resolve(false)
              }
            }
          }
        }
      }
      // 응답 버튼 사용 유무 체크
      if (this.autoReplyMsgData.chipBtnUse === 'Y' && isAllCheck && !isSave) {
        let chipBtns = this.autoReplyMsgData.chipSuggestions
        for (let b in chipBtns) {
          target = `chipBtns_${b}`
          this.$refs[target][0].validateBtnInit()
        }
        for (let b in chipBtns) {
          target = `chipBtns_${b}`
          let vlidSugg = autoReplyMsgUtils.validateBtnDataCheck(chipBtns[b], 0, b)
          if (!vlidSugg.result) {
            this.$nextTick(() => {
              this.$refs[target][0].validateData(vlidSugg)
            })
            return Promise.resolve(false)
          }
        }
      }
      return Promise.resolve(true)
    },
    async validation(isSave) {
      // 서버에서 템플릿을 조회 하여 셋팅
      if (jglib.isEmpty(this.autoReplyMsgData.tplId) && jglib.isEmpty(this.autoReplyMsgData.tplNm)) {
        await this.getTemplateData({ autoReplyMsgData: this.autoReplyMsgData }).then((res) => {}).catch((err) => {
          console.log(err.desc)
        })
        this.$nextTick(() => {})
        if (jglib.isEmpty(this.autoReplyMsgData.tplId)) {
          this.$alertMsg('템플릿 정보가 없습니다. 관리자에 문의 하세요.')
          return Promise.resolve(false)
        }
      }
      // 인풋 유효성 체크
      if (!await this.inputValidation('', true, isSave)) {
        return Promise.resolve(false)
      }
      return Promise.resolve(true)
    },
    closeMsg () {
      this.isModalViewed = false
      this.isSaveDraftMsg = false
    },
    onSelectEmoji(e, target, idx) {
      let emoji = e
      let refName = target
      if (idx !== undefined) {
        this.$refs[refName][0].value += emoji
      } else {
        this.$refs[refName].value += emoji
      }
    },
    goList() {
      this.$router.push({ name: 'autoreplymsglist', params: { brandId: this.brandId } })
    },
    // 임시 저장
    async isSaveDraft() {
      if (await this.validation(true)) {
        this.$alertMsg('입력하신 내용이 임시저장 됩니다.<br>등록을 완료하셔야 사용이 가능합니다.').then(() => {
          this.autoReplyMsgData.status = 'APRV_NEW'
          this.autoReplyMsgData.aprvRet = 'SAVED'
          let data = getAutoReplySubmitData(this.brandId, this.productType, this.autoReplyMsgData, { cardType: this.autoReplyMsgData.cardType, btnUseYn: this.autoReplyMsgData.btnUseYn })
          if (this.isNew) {
            createAutoReply(this.brandId, data).then(res => {
              if (res.code === '20000000') this.goList()
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {
              })
            })
          } else {
            saveAutoReply(this.brandId, this.armId, data).then(res => {
              if (res.code === '20000000') this.goList()
              this.isModalViewed = true
              this.isSaveDraftMsg = true
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {
              })
            })
          }
        })
      }
    },
    // 등록
    async onSubmit() {
      if (await this.validation(false)) {
        this.$alertMsg('저장 하시겠습니까?').then(() => {
          this.autoReplyMsgData.status = 'APRV_NEW'
          this.autoReplyMsgData.aprvRet = 'WAITING'
          let data = getAutoReplySubmitData(this.brandId, this.productType, this.autoReplyMsgData, { cardType: this.autoReplyMsgData.cardType, btnUseYn: this.autoReplyMsgData.btnUseYn })
          if (this.isNew) {
            createAutoReply(this.brandId, data).then(res => {
              if (res.code === '20000000') this.goList()
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {
              })
            })
          } else {
            saveAutoReply(this.brandId, this.armId, data).then(res => {
              if (res.code === '20000000') this.goList()
              this.isModalViewed = true
              this.isSaveDraftMsg = true
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {
              })
            })
          }
        })
      }
    },
    selectedAutoReply(arm, cardIndex, btnIndex, type) {
      if (type === 'card') {
        this.autoReplyMsgData.cardData[cardIndex].suggestions[btnIndex].reply.autoReplyMsgId = arm.armId
      } else {
        this.autoReplyMsgData.chipSuggestions[btnIndex].reply.autoReplyMsgId = arm.armId
      }
    },
    selectedFeed(feed, cardIndex, btnIndex, type) {
      if (type === 'card') {
        this.autoReplyMsgData.cardData[cardIndex].suggestions[btnIndex].action.urlAction.openUrl.url = feed.feedUrl
      } else {
        this.autoReplyMsgData.chipSuggestions[btnIndex].action.urlAction.openUrl.url = feed.feedUrl
      }
    },
    changeCardBtnCount(i) {
      let btnLen = parseInt(this.autoReplyMsgData.cardData[i].buttonLen)
      this.autoReplyMsgData.cardData[i].suggestions = []
      for (let k = 0; k < btnLen; k++) {
        this.autoReplyMsgData.cardData[i].suggestions.push(JSON.parse(JSON.stringify(autoReplyMsgUtils.cardButtonInfo)))
      }
    },
    changeChipBtnCount() {
      let btnLen = parseInt(this.autoReplyMsgData.chipBtnLen)
      this.autoReplyMsgData.chipSuggestions = []
      for (let k = 0; k < btnLen; k++) {
        this.autoReplyMsgData.chipSuggestions.push(JSON.parse(JSON.stringify(autoReplyMsgUtils.cardButtonInfo)))
      }
    },
    changeBtnAction(actionType, btnType, cardIndex, btnIndex) {
      if (jglib.isEmpty(actionType)) {
        return false
      }
      let action = JSON.parse(JSON.stringify(actionData['suggestions'][actionType]))
      if (btnType === 'card') {
        if (actionType.indexOf('reply') > -1) {
          this.autoReplyMsgData.cardData[cardIndex].suggestions[btnIndex].reply = action
        } else {
          this.autoReplyMsgData.cardData[cardIndex].suggestions[btnIndex].action = action
        }
      } else {
        if (actionType.indexOf('reply') > -1) {
          this.autoReplyMsgData.chipSuggestions[btnIndex].reply = action
        } else {
          this.autoReplyMsgData.chipSuggestions[btnIndex].action = action
        }
      }
    }
  }
}
</script>

<style>
</style>
