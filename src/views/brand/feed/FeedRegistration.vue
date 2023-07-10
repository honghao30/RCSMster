<template>
  <div class="brand__wrap brand__feed">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 소식 등록" />
        <div class="feed__wrap">
          <div class="feed__inner">
            <form  ref="form" :model="form">
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px">
                    <col />
                  </colgroup>
                  <tbody>
                    <!-- 기획서 v1.0 수정 --- 추가-->
                    <!-- 게시여부 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">게시 여부</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="switch switch-status" role="switch">
                              {{ switchStatus }}
                              <input type="checkbox" id="switch" v-model="form.switch" checked @change="showPublicType">
                              <label class="switch__core" for="switch"></label>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- 게시방법 -->
                    <tr v-if="PublicType">
                      <th scope="row"><span class="form-item__label required">게시방법</span></th>
                      <td>
                          <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="publish" id="publish" value="publish" v-model="form.publishType"/>
                                    <label for="publish"><span class="radiobox__text">즉시게시</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="publish" id="resv" value="resv" v-model="form.publishType"/>
                                    <label for="resv"><span class="radiobox__text">예약게시</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="publish" id="hidden" value="hidden" v-model="form.publishType"/>
                                    <label for="hidden"><span class="radiobox__text">숨김(URL)게시</span></label>
                                  </span>
                                </div>
                              </div>
                              <div class="form-item-row flex-start" v-if="form.publishType === 'resv'">
                                <div class="input-item">
                                  <el-date-picker
                                    v-model="form.resvDate"
                                    type="date"
                                    placeholder="2023-07-25"
                                    class="w--full"
                                  />
                                </div>
                                <Dropdown :options="timeOption" v-model="form.resvTime"></Dropdown>
                              </div>
                              <p class="guide-text black">&middot; [숨김 게시]는 브랜드 소식내에는 노출되지 않습니다.</p>
                              <p class="guide-text black">&middot; RCS 메시지 발송 시, 메시지에 URL을 기재하는 용도로 사용됩니다. </p>
                              <p class="guide-text black">&middot; [저장] 또는 [비공개] 상태일 경우, [게시] 상태가 아니므로 URL에 연결된 소식을 볼 수 없습니다.</p>
                              <p class="guide-text black">&middot; [예약 게시]는 지정된 [게시]상태로 전환되므로 [게시] 이전에는 URL에 연결된 소식을 볼 수 없습니다.</p>
                          </div>
                          <p class="guide-text error"  v-if="feedResvErrorMsg">게시일을 선택해주세요.</p>
                      </td>
                    </tr>
                    <!-- //게시방법 -->
                  </tbody>
                </table>
              </div>

              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px">
                    <col />
                  </colgroup>
                  <tbody>
                    <!-- 타입선택 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">브랜드 소식 유형</span></th>
                      <td>
                          <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="type" id="gallery" value="gallery" v-model="form.type"  @change="isChangeTypeCheck" :disabled="isSlideCardEdit"/>
                                    <label for="gallery"><span class="radiobox__text">갤러리</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="type" id="sharing" value="sharing" v-model="form.type"  @change="isChangeTypeCheck" :disabled="isSlideCardEdit"/>
                                    <label for="sharing"><span class="radiobox__text">쉐어링</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="type" id="slideView" value="slideView" v-model="form.type"  @change="isChangeTypeCheck" :disabled="isSlideCardEdit"/>
                                    <label for="slideView"><span class="radiobox__text">슬라이드</span></label>
                                  </span>
                                </div>
                              </div>
                          </div>
                      </td>
                    </tr>
                    <!-- //타입선택 -->
                    <!-- 제목 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">제목</span></th>
                      <td>
                        <div class="form-item__content is-emoji">
                          <div class="form-item-row">
                            <div class="input-item input-limit">
                              <div class="input">
                                <input type="text"  maxlength="40"
                                ref="feedTitle"
                                placeholder="제목을 입력해주세요." v-model="form.feedTitle" @input="e => form.feedTitle = e.target.value" :disabled="isSlideCardEdit">
                                <div class="input-limit__text">
                                  <Emoji @input="onSelectEmoji($event, 'feedTitle')"/>
                                  <p>{{ form.feedTitle.length }}/40자</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p class="guide-text error"  v-if="feedTitleErrorMsg">제목을 입력해주세요.</p>
                        </div>
                      </td>
                    </tr>
                    <!-- //제목 -->
                  </tbody>
                </table>
                <!-- 갤러리 타입 & 쉐이링 타입 -->
                <template v-if="form.type !== 'slideView'">
                  <table class="table table-bodyonly form-table">
                    <colgroup>
                      <col width="196px">
                      <col />
                    </colgroup>
                    <tbody>
                      <!-- 내용 -->
                      <tr>
                        <th scope="row"><span class="form-item__label">내용</span></th>
                        <td>
                          <div class="form-item__content  is-emoji">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="textarea">
                                  <textarea maxlength="200" placeholder="내용을 입력해주세요." @input="e => form.feedContent = e.target.value"  v-model="form.feedContent"
                                  ref="feedContent"
                                  ></textarea>
                                  <div class="textarea-limit__text">
                                    <Emoji @input="onSelectEmoji($event, 'feedContent')"/>
                                    <p>
                                      {{ form.feedContent.length }}/200자
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p class="guide-text error"  v-if="feedContentErrorMsg">내용을 입력해주세요.</p>
                          </div>
                        </td>
                      </tr>
                      <!-- // 내용 -->
                      <!-- 이미지 -->
                      <tr v-if="form.type == 'gallery'">
                        <th scope="row">
                          <span class="form-item__label required">이미지</span>
                        </th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row"
                              v-if="fileList"
                            >
                              <ul class="upfile-list">
                                <li
                                 v-for="img in 10"
                                 :key="img"
                                >
                                  <router-link to="#">첨부된 이미지{{ img }}.jpg (7MB)</router-link>
                                </li>
                              </ul>
                            </div>
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="input">
                                  <input type="text" disabled placeholder="이미지를 등록해주세요.">
                                </span>
                                <ButtonCmp
                                  type="btn-default-line"
                                  @click="imageModal"
                                >
                                  이미지 등록 / 편집
                                </ButtonCmp>
                              </div>
                              <p class="guide-text black">&middot; 썸네일에 노출되는 이미지는 700px * 700px이며, 초과 시 central crop하여 노출됩니다.</p>
                            </div>
                            <p class="guide-text error"  v-if="feedImageFileErrorMsg">이미지를 등록해주세요.</p>
                          </div>
                        </td>
                      </tr>
                      <!-- // 이미지 -->
                      <!-- 연결 URL -->
                      <tr v-if="form.type == 'sharing'">
                        <th scope="row"><span class="form-item__label required">연결 URL</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="input">
                                  <input type="text" v-model="form.url" placeholder="http://형식으로 입력해주세요.">
                                </span>
                                <ButtonCmp
                                  type="btn-default-line"
                                >
                                  적용
                                </ButtonCmp>
                              </div>
                            </div>
                            <p class="guide-text black">&middot; 연결 URL은 You Tube만 등록 가능합니다.</p>
                            <p class="guide-text black">&middot; 연결된 URL의 타이틀과 대표이미지(썸네일)가 자동으로 노출됩니다.</p>
                            <p class="guide-text black">&middot; Youtube URL 주소만 입력해주세요. URL 주소는 한글 포함 8,192Byte를 초과할 수 없습니다.</p>
                            <p class="guide-text error"  v-if="feedUrlFileErrorMsg">연결 URL을 입력해주세요.</p>
                          </div>
                        </td>
                      </tr>
                      <!-- // 연결 URL -->
                      <!-- 버튼 -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">버튼</span></th>
                        <td>
                          <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseY" value="1" v-model="form.btnUseLen"/>
                                    <label for="btnUseY"><span class="radiobox__text">1개</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseY2" value="2" v-model="form.btnUseLen"/>
                                    <label for="btnUseY2"><span class="radiobox__text">2개</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseN" value="0" v-model="form.btnUseLen" checked/>
                                    <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                  </span>
                                </div>
                              </div>
                          </div>
                          <div class="form-item__content" v-if="form.btnUseLen != '0'">
                            <feedButtonReg :buttons="form.buttons" :btnUseLen="form.btnUseLen" />
                          </div>
                          <!-- <p class="guide-text error"  v-if="feedBtnErrorMsg">버튼을 입력해주세요.</p> -->
                        </td>
                      </tr>
                      <!-- //버튼 -->
                      <!-- 상단고정 -->
                      <!-- 기획서 v1.0 수정 --- 위치 변경-->
                      <tr class="no-line">
                        <th scope="row"><span class="form-item__label">상단고정</span></th>
                        <td>
                            <div class="form-item__content">
                                <div class="form-item-row">
                                  <div class="input-item">
                                    <span class="checkbox">
                                      <input type="checkbox" id="pinY" v-model="form.pinYn" @change="checkfixTitle" />
                                      <label for="pinY"><span class="radiobox__text">상단 고정 등록</span></label>
                                    </span>
                                  </div>
                                </div>
                            </div>
                        </td>
                      </tr>
                      <!-- // 상단고정 -->
                      <!-- //기획서 v1.0 수정 --- 위치 변경-->
                    </tbody>
                  </table>
                </template>
                <!-- // 갤러리 타입 & 쉐이링 타입 -->
                <!-- 슬라이드 타입 -->
                <template v-else>
                  <div class="item-reg__wrap">
                    <div class="item-reg__inner">
                      <draggable
                        v-model="form.slideData"
                        class="item-reg__list"
                        draggable=".item--draggable"
                      >
                        <div
                          v-for="(slide, j) in form.slideData" :key="j"
                          class="item"
                          :class="[{'active': slide.isActive}, {'item--draggable': isSlideCardEdit}]"
                          @click="slideActive(j)"
                        >
                          <span v-text="`카드${slide.slideIndex}`" class="item-text"></span>
                          <a role="button" @click="removeSlide(j)" class="btn-del" v-if="isSlideCardEdit
                          "><span class="blind">삭제</span></a>
                        </div>
                      </draggable>
                      <a role="button" class="btn-add" @click="addSlide(form.slideData.length)" v-if="form.slideData.length < 10">+<span class="blind">추가</span></a>
                    </div>
                    <div class="ctrl-btns">
                      <ButtonCmp
                        type="btn-line"
                        size="small"
                        @click="isSlideCardEdit = true"
                        v-if="!isSlideCardEdit"
                      >편집</ButtonCmp>
                      <ButtonCmp
                        type="btn-blue"
                        size="small"
                        @click="saveCardEdit"
                        v-if="isSlideCardEdit"
                      >저장</ButtonCmp>
                    </div>
                    <div class="guide-box" v-if="isSlideCardEdit">
                      <p class="guide-text black">&middot; 선택한 슬라이드는 드래그로 순서 변경이 가능합니다.</p>
                      <p class="guide-text black">&middot; 첫번째로 위치한 카드는 삭제 불가합니다.</p>
                    </div>
                  </div>
                  <template v-for="(slide, j) in form.slideData">
                    <table class="table table-bodyonly form-table" v-if="slide.isActive" :key="j">
                      <colgroup>
                        <col width="196px">
                        <col />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th scope="row"><span class="form-item__label required">카드 유형</span></th>
                          <td>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="slideType" id="slideTypeImg" value="image" v-model="slide.slideType" :disabled="isSlideCardEdit"/>
                                    <label for="slideTypeImg"><span class="radiobox__text">이미지</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="slideType" id="slideTypeUrl" value="url" v-model="slide.slideType" :disabled="isSlideCardEdit"/>
                                    <label for="slideTypeUrl"><span class="radiobox__text">URL 연결</span></label>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <!-- 기획서 v1.0 수정 --- 위치 변경-->
                        <tr v-if="slide.slideType == 'image'">
                          <th scope="row">
                            <span class="form-item__label required">이미지</span>
                          </th>
                          <td>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="input"><input type="text" :value="filesName" disabled placeholder="이미지를 등록해주세요."></span>
                                  <input type="file" id="fileUp" class="input" @change="onFileChanged" :disabled="isSlideCardEdit">
                                  <label for="fileUp"
                                    class="btn btn-default-line"
                                    :class="{'inactive' : isSlideCardEdit }"
                                  >파일찾기</label>
                                </div>
                                <p class="guide-text black">&middot; 이미지 사이즈 / 용량 : 700px * 700px, 최대 1080px * 1080px / 최대 3MB</p>
                                <p class="guide-text black">&middot; 파일종류: JPG, PNG, GIF</p>
                              </div>
                              <!-- 에러 메시지 주석 -->
                              <!-- <p class="guide-text error"  v-if="slideImageErrorMsg">슬라이드 이미지를 등록해주세요.</p> -->
                            </div>
                          </td>
                        </tr>
                        <tr v-if="slide.slideType == 'url'">
                          <th scope="row"><span class="form-item__label required">연결 URL</span></th>
                          <td>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="input">
                                    <input type="text" :disabled="isSlideCardEdit" v-model="slide.url" placeholder="http://형식으로 입력해주세요.">
                                  </span>
                                  <ButtonCmp
                                    type="btn-default-line"
                                  >
                                    적용
                                  </ButtonCmp>
                                </div>
                              </div>
                              <p class="guide-text black">&middot; 연결 URL은 You Tube만 등록 가능합니다.</p>
                              <p class="guide-text black">&middot; 연결된 URL의 타이틀과 대표이미지(썸네일)가 자동으로 노출됩니다.</p>
                              <p class="guide-text error"  v-if="slideUrlErrorMsg">Youtube URL 주소만 입력해주세요.</p>
                            </div>
                          </td>
                        </tr>
                        <!-- //기획서 v1.0 수정 --- 위치 변경-->
                        <tr>
                          <th scope="row"><span class="form-item__label required">카드 제목</span></th>
                          <td>
                            <div class="form-item__content is-emoji">
                              <div class="form-item-row">
                                <div class="input-item input-limit">
                                  <div class="input">
                                    <input type="text" class="input" maxlength="40" placeholder="제목을 입력해주세요."  @input="e => slide.slideTitle = e.target.value" v-model="slide.slideTitle"
                                    :disabled="isSlideCardEdit"
                                    ref="slideTitle"
                                    >
                                    <div class="input-limit__text">
                                      <Emoji @input="onSelectEmoji($event, 'slideTitle', j)"/>
                                      <p>{{ slide.slideTitle.length }}/34자</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p class="guide-text error"  v-if="slideTitleErrorMsg">카드 제목을 입력해주세요.</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row"><span class="form-item__label">카드 내용</span></th>
                          <td>
                            <div class="form-item__content is-emoji">
                              <div class="form-item-row">
                                <div class="input-item input-limit">
                                  <div class="textarea"
                                    :class="{ 'disabled' : isSlideCardEdit }"
                                  >
                                    <textarea maxlength="200" placeholder="내용을 입력해주세요."   @input="e => slide.slideDescription = e.target.value"  v-model="slide.slideDescription"
                                    :disabled="isSlideCardEdit"
                                    ref="slideContent"
                                    ></textarea>
                                    <div class="textarea-limit__text">
                                      <Emoji @input="onSelectEmoji($event, 'slideContent', j)"/>
                                      <p>
                                        {{ slide.slideDescription.length }}/126자
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- 에러 메시지 주석처리 -->
                              <!-- <p class="guide-text error"  v-if="slideContentErrorMsg">카드 내용을 입력해주세요.</p> -->
                            </div>
                          </td>
                        </tr>
                        <tr class="no-line">
                          <th scope="row"><span class="form-item__label required">버튼</span></th>
                          <td>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseY" value="1" v-model="form.btnUseLen"/>
                                    <label for="btnUseY"><span class="radiobox__text">1개</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseY2" value="2" v-model="form.btnUseLen"/>
                                    <label for="btnUseY2"><span class="radiobox__text">2개</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseN" value="0" v-model="form.btnUseLen" checked/>
                                    <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                  </span>
                                </div>
                              </div>
                          </div>
                          <div class="form-item__content" v-if="form.btnUseLen != '0'">
                            <feedButtonReg :buttons="slide.buttons" :btnUseLen="form.btnUseLen" />
                          </div>
                          <!-- 에러 메시지 주석처리 -->
                            <!-- <p class="guide-text error"  v-if="slideBtnErrorMsg">슬라이드 버튼을 입력해주세요.</p> -->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </template>

                </template>
                <!-- // 슬라이드 타입 -->
              </div>
            </form>
          </div>
          <!-- 에뮬레이터 -->
          <div class="brand-aside sticky">
             <div class="brand-emulate__type-btn">
                <ButtonCmp
                  type="btn-emulate-type"
                  :class="{'is-active': isTabActive === 1}"
                  @click="changeType(1)"
                >
                  상세보기
                </ButtonCmp>
                <ButtonCmp
                  type="btn-emulate-type"
                  :class="{'is-active': isTabActive === 2}"
                  @click="changeType(2)"
                >
                  썸네일 보기
                </ButtonCmp>
             </div>
             <feedEmulator
                :brandInfoData="brandInfoData"
                :feedInfoData="form"
                :showBrandHeader="true"
                :showThumbnail="showThumbnail"
              />
          </div>
          <!-- // 에뮬레이터 -->
        </div>
        <div class="top-notice--gray">
          <p>- 브랜드 소식은 100개까지 작성할 수 있으며, 최대 보존 기간은 1년 입니다.</p>
          <p>- 1년 경과 시, 자동 삭제됩니다. (단, 상단고정 소식은 예외)</p>
        </div>
        <div class="button__wrap flex-end">
          <!-- 기획서 v1.0 수정 --- 버튼 삭제-->
          <!-- <ButtonCmp
              type="btn-line"
          >임시 저장</ButtonCmp> -->
          <ButtonCmp
              type="btn-blue"
              @click="onSubmit"
              :disabled="form.feedTitle == ''"
          >등록</ButtonCmp>
        </div>
        <!-- 수정하기 -->
        <!-- <div class="button__wrap flex-end">
          <ButtonCmp
              type="btn-line"
          >삭제</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
          >수정</ButtonCmp>
        </div> -->
        <feedList :feedViewData="feedViewData"/>
      </div>
    </div>
    <!-- 모달 영역 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 이미지 드래그 모달 -->
      <feedModal
        @closeModal=closeModal
        @modalSave=modalSave
        v-if="isModalImage"
        :fileList="fileList"
        >
      </feedModal>
      <!-- 기획서 v1.0 수정 --- 모달 추가 -->
      <ConfirmMsg
        @closeModal=closeModal
        v-if="isChangeType"
        modalsize="Modalmax480"
      >
        <div class="msg" slot="msg">
          카드 유형을 변경하는 경우<br>
          입력한 카드 정보가 삭제됩니다.<br>
          카드 유형을 변경 하시겠습니까?
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
      <ConfirmMsg
        @closeModal=closeModal
        v-if="isFixedFeed"
        modalsize="Modalmax480"
      >
        <div class="msg" slot="msg">
          이미 고정된 소식이 있습니다.<br>
          [제목 : {{ form.feedTitle }}]<br>
          상단 고정 소식을 변경하시겠습니까?
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
      <ConfirmMsg
        @closeModal=closeModal
        v-if="removeConfirmMsg"
        modalsize="Modalmax480"
      >
        <div class="msg" slot="msg">
          카드를 삭제하시겠습니까?<br>
          카드 삭제 시,<br>
          해당 카드에 입력된 내용이 모두 삭제됩니다.
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
      <!-- //기획서 v1.0 수정 --- 모달 추가 -->
    </ModalView>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import draggable from 'vuedraggable'
import 'swiper/css/swiper.css'
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import feedEmulator from '@/views/brand/feed/components/feedEmulator.vue'
import moment from 'moment'
import feedButtonReg from '@/views/brand/feed/components/feedButtonReg.vue'
import feedList from '@/views/brand/feed/feedList.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/components/common/ConfirmMsg.vue'
import feedModal from '@/views/brand/feed/components/feedModal.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'

export default {
  components: {
    PageTitle,
    draggable,
    BrandLnb,
    ButtonCmp,
    Dropdown,
    feedEmulator,
    feedButtonReg,
    ModalView,
    feedModal,
    feedList,
    ConfirmMsg,
    Emoji
  },
  data() {
    return {
      form: {
        switch: true,
        type: 'gallery',
        feedTitle: '',
        feedDate: '4월 19일 오후 3:00​',
        feedContent: '',
        btnUse: '',
        btnUseLen: '0',
        imgFiles: [],
        url: '',
        buttons: [],
        isSavedbuttonList: [],
        publishType: 'publish',
        resvDate: '',
        resvTime: '',
        pinYn: false,
        slideData: [{
          slideIndex: '1',
          slideType: 'image',
          slideTitle: '',
          slideDescription: '',
          isActive: true,
          imgFile: '',
          url: '',
          btnUse: 'btnUseN',
          buttons: []
        },
        {
          slideIndex: '2',
          slideType: 'image',
          slideTitle: '',
          slideDescription: '',
          isActive: false,
          imgFile: '',
          url: '',
          btnUse: 'btnUseN',
          buttons: []
        }]
      },
      brandInfoData: {
        name: 'SYSTEM STUDIOS',
        profileImgFileUrl: 'dummy/brand_logo.png'
      },
      isTabActive: 1,
      btnTypeOption: [
        {
          label: 'URL 연결',
          value: 'url'
        },
        {
          label: 'App 연결',
          value: 'app'
        },
        {
          label: '대화방 연결',
          value: 'chat'
        },
        {
          label: '전화걸기',
          value: 'call'
        }
      ],
      slideActiveIndex: 0,
      isSlideCardEdit: false,
      timeOption: [
        {
          label: '00시',
          value: '00'
        },
        {
          label: '01시',
          value: '01'
        },
        {
          label: '02시',
          value: '02'
        }
      ],
      feedViewData: [
        {
          feedId: 1222213,
          feedType: '갤러리',
          feedStatus: '숨김(URL)',
          feedAuthor: '김미미',
          feedDate: '2023.04.09',
          feedPublishDate: '2023.04.09 05:56',
          isFixed: true,
          feedItem: {
            feedDate: '4월 19일 오후 3:00',
            type: 'gallery',
            feedTitle: 'SK 텔레콤의 스마트한 제안',
            feedContent: 'SK텔레콤을 다양하게 만나보세요! #SKT Insight · SK텔레콤 네이버 포스트 스크랩 · SK텔레콤 페이스북 #Facebook · SK텔레콤 유튜브 #YouTube ​',
            imgFiles: ['dummy/feed_image_02.png', 'dummy/feed_image.png', 'dummy/feed_image_03.png', 'dummy/feed_image.png', 'dummy/feed_image_02.png']
          }
        },
        {
          feedId: 1222213,
          feedType: '쉐어링',
          feedStatus: '게시',
          feedAuthor: '김미미',
          feedDate: '2023.04.09',
          feedPublishDate: '2023.04.09 05:56',
          isFixed: false,
          feedItem: {
            feedDate: '4월 19일 오후 3:00',
            type: 'sharing',
            feedTitle: 'SK 텔레콤의 스마트한 제안',
            feedContent: 'SK텔레콤을 다양하게 만나보세요! #SKT Insight · SK텔레콤 네이버 포스트 스크랩 · SK텔레콤 페이스북 #Facebook · SK텔레콤 유튜브 #YouTube ​'
          }
        },
        {
          feedId: 1222215,
          feedType: '슬라이드',
          feedStatus: '게시',
          feedAuthor: '홍길동',
          feedDate: '2023.07.03',
          feedPublishDate: '2023.07.03 05:56',
          isFixed: false,
          feedItem: {
            feedDate: '4월 19일 오후 3:00',
            type: 'slideView',
            feedTitle: '통신사의 스마트한 제안',
            slideData: [{
              slideType: 'image',
              slideTitle: 'LG U+의 제안',
              slideDescription: '네이버 포스트 스크랩'
            },
            {
              slideType: 'image',
              slideTitle: 'LG U+의 제안',
              slideDescription: '네이버 포스트 스크랩'
            }]
          }
        }
      ],
      filesName: '',
      fileList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      isModalViewed: false,
      isModalImage: false,
      feedTitleErrorMsg: false,
      feedContentErrorMsg: false,
      feedImageFileErrorMsg: false,
      feedUrlFileErrorMsg: false,
      feedBtnErrorMsg: false,
      feedResvErrorMsg: false,
      slideTitleErrorMsg: false,
      showSpecialCharTextArea: false,
      showSpecialCharTitle: false, // 특수문자 선택창 show 여부
      showSpecialCharSlide: false,
      showSpecialCharSlideTextArea: false,
      isChangeType: false,
      isFixedFeed: false,
      showThumbnail: false,
      fileList: false,
      removeConfirmMsg: false,
      PublicType: true
    }
  },
  created() {
    this.todayFormat = moment().format('YYYY.MM.DD')
  },
  mounted() {
    this.switchStatus = this.form.switch ? '게시' : '미게시'
  },
  computed: {
    switchStatus: {
      get() {
        return this.form.switch ? '게시' : '미게시'
      },
      set(value) {
        this.form.switch = value
      }
      // return this.form.switch ? '게시' : '미게시'
    }
  },
  methods: {
    // 슬라이드 추가
    addSlide () {
      let slideData = {
        slideIndex: (this.form.slideData.length + 1),
        slideType: 'image',
        slideTitle: '',
        slideDescription: '',
        isActive: false,
        imgFile: '',
        url: '',
        btnUse: 'btnUseN',
        buttons: [{
          btnName: '',
          btnType: '',
          url: '',
          app: {
            url: '',
            packageName: '',
            scheme: ''
          },
          chatRoom: '',
          call: '',
          isActive: true
        }]
      }
      this.form.slideData.push(slideData)
    },
    // 슬라이드 삭제
    removeSlide (idx) {
      if (this.form.slideData.length > 1) {
        this.form.slideData.splice(idx, 1)
        this.isModalViewed = true
        this.removeConfirmMsg = true
      }
    },
    // 슬라이드 활성화
    slideActive (idx) {
      this.slideActiveIndex = idx
      this.form.slideData.forEach((slide, index) => {
        if (idx !== index) {
          slide.isActive = false
        } else {
          slide.isActive = true
        }
      })
    },
    // 슬라이드 편집 활성화
    saveCardEdit() {
      this.form.slideData.forEach((slide, index) => {
        if (index === 0) {
          slide.isActive = true
        } else {
          slide.isActive = false
        }
      })
      this.isSlideCardEdit = false
    },
    // 이미지 파일 업로드
    onFileChanged (e) {
      const files = e.target.files
      this.files = files
      const filesName = files[0].name
      this.filesName = filesName
    },
    // 모달 버튼
    modalSave () {
      this.isModalViewed = false
      this.isModalImage = false
      this.isChangeType = false
    },
    closeModal () {
      this.isModalViewed = false
      this.isModalImage = false
      this.removeConfirmMsg = false
    },
    imageModal () {
      this.isModalViewed = true
      this.isModalImage = true
      this.fileList = true
      this.isChangeType = false
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
    onSubmit () {
      if (!this.form.feedTitle) {
        this.feedTitleErrorMsg = true
        return
      }
      // if (this.form.type === 'sharing' && this.form.imgFiles.length < 1) {
      //   this.feedImageFileErrorMsg = true
      //   return
      // }
      if (this.form.type === 'sharing' && !this.form.url) {
        this.feedUrlFileErrorMsg = true
        return
      }
      if (this.form.type !== 'slideView') {
        if (!this.form.feedContent) {
          this.feedContentErrorMsg = true
          return
        }
        if (this.form.btnUse === 'btnUseY') {
          if (this.form.buttons.length < 2 || !this.form.buttons[0].btnName) {
            this.feedBtnErrorMsg = true
            return
          }
        }
        if (this.form.publishType === 'resv') {
          if (!this.form.resvDate) {
            this.feedResvErrorMsg = true
            return
          }
        }
      }
      if (this.form.type === 'slideView') {

      }
      this.$router.push('./')
    },
    showPublicType () {
      this.PublicType = !this.PublicType
    },
    isChangeTypeCheck() {
      if (this.form.type) {
        this.isModalViewed = true
        this.isChangeType = true
      }
    },
    closeMsg () {
      this.isModalViewed = false
      this.isChangeType = false
    },
    checkfixTitle () {
      if (this.form.pinYn === true) {
        this.isModalViewed = true
        this.isFixedFeed = true
      }
    },
    changeType(tab) {
      this.isTabActive = (this.isTabActive === tab) ? 0 : tab
      this.showThumbnail = !this.showThumbnail
    }
  }
}
</script>

<style>
</style>
