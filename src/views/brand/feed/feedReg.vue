<template>
  <div class="brand__wrap brand__feed">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle :pagetitle="regTypeStr" />
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
                              <input type="checkbox" id="switch" v-model="form.switch">
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
                                    <input type="radio" name="publish" id="resv" value="reservation" v-model="form.publishType"/>
                                    <label for="resv"><span class="radiobox__text">예약게시</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="publish" id="hidden" value="internet" v-model="form.publishType"/>
                                    <label for="hidden"><span class="radiobox__text">숨김(URL)게시</span></label>
                                  </span>
                                </div>
                              </div>
                              <div class="form-item-row flex-start" v-if="form.publishType === 'reservation'">
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
                                    <input type="radio" name="type" id="gallery" value="gallery" v-model="form.type"  @click="isChangeTypeCheck($event, 'gallery')" :disabled="isSlideCardEdit"/>
                                    <label for="gallery"><span class="radiobox__text">갤러리</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="type" id="sharing" value="share" v-model="form.type"  @click="isChangeTypeCheck($event, 'share')" :disabled="isSlideCardEdit"/>
                                    <label for="sharing"><span class="radiobox__text">쉐어링</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="type" id="slideView" value="slide" v-model="form.type"  @click="isChangeTypeCheck($event, 'slide')" :disabled="isSlideCardEdit"/>
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
                                placeholder="제목을 입력해주세요." v-model="form.title" @input="e => form.title = e.target.value" :disabled="isSlideCardEdit">
                                <div class="input-limit__text">
                                  <Emoji @input="onSelectEmoji($event, 'feedTitle')"/>
                                  <p>{{ form.title.length }}/40자</p>
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
                <template v-if="form.type !== 'slide'">
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
                                  <textarea maxlength="200" placeholder="내용을 입력해주세요." @input="e => form.description = e.target.value"  v-model="form.description"
                                  ref="feedContent"
                                  ></textarea>
                                  <div class="textarea-limit__text">
                                    <Emoji @input="onSelectEmoji($event, 'feedContent')"/>
                                    <p>
                                      {{ form.description.length }}/200자
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
                                 v-for="(img, i) in form.media"
                                 :key="i"
                                >
                                  <router-link v-if='img.fileName' to="#">첨부된 이미지 {{ img.fileName }} {{ img.fileSize }}</router-link>
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
                      <tr v-if="form.type == 'share'">
                        <th scope="row"><span class="form-item__label required">연결 URL</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="input">
                                  <input type="text" v-model="form.share.snsLink" placeholder="http://형식으로 입력해주세요.">
                                </span>
                                <ButtonCmp
                                  type="btn-default-line"
                                  @click='setSnsImg(form.share)'
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
                                    <input type="radio" name="btnUse" id="btnUseY" value="1" v-model="form.btnUseLen" @change='changeFormBtn($event)'/>
                                    <label for="btnUseY"><span class="radiobox__text">1개</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseY2" value="2" v-model="form.btnUseLen" @change='changeFormBtn($event)'/>
                                    <label for="btnUseY2"><span class="radiobox__text">2개</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseN" value="0" v-model="form.btnUseLen" @change='changeFormBtn($event)' checked/>
                                    <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                  </span>
                                </div>
                              </div>
                          </div>
                          <div class="form-item__content" v-if="form.buttons">
                            <feedButtonReg :button="button" :index='j' v-for="(button, j) in form.buttons" :key="j" />
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
                        v-model="form.slide"
                        class="item-reg__list"
                        draggable=".item--draggable"
                      >
                        <div
                          v-for="(slide, j) in form.slide" :key="j"
                          class="item"
                          :class="[{'active': slide.isActive}, {'item--draggable': isSlideCardEdit}]"
                          @click="slideActive(j)"
                        >
                          <span v-text="`카드${slide.slideIndex}`" class="item-text"></span>
                          <a role="button" @click="removeSlide(j)" class="btn-del" v-if="isSlideCardEdit
                          "><span class="blind">삭제</span></a>
                        </div>
                      </draggable>
                      <a role="button" class="btn-add" @click="addSlide()" v-if="form.slide.length < 10">+<span class="blind">추가</span></a>
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
                  <template v-for="(slide, j) in form.slide">
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
                                    <input type="radio" name="slideType" id="slideTypeImg" value="gallery" v-model="slide.type" :disabled="isSlideCardEdit"/>
                                    <label for="slideTypeImg"><span class="radiobox__text">이미지</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="slideType" id="slideTypeUrl" value="share" v-model="slide.type" :disabled="isSlideCardEdit"/>
                                    <label for="slideTypeUrl"><span class="radiobox__text">URL 연결</span></label>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <!-- 기획서 v1.0 수정 --- 위치 변경-->
                        <tr v-if="slide.type == 'gallery'">
                          <th scope="row">
                            <span class="form-item__label required">이미지</span>
                          </th>
                          <td>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="input"><input type="text" :value="slide.media[0].fileName" disabled placeholder="이미지를 등록해주세요."></span>
                                  <input type="file" id="fileUp" class="input" @change="onFileChanged($event, slide)" :disabled="isSlideCardEdit">
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
                        <tr v-if="slide.type == 'share'">
                          <th scope="row"><span class="form-item__label required">연결 URL</span></th>
                          <td>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="input">
                                    <input type="text" :disabled="isSlideCardEdit" v-model="slide.share.snsLink" placeholder="http://형식으로 입력해주세요.">
                                  </span>
                                  <ButtonCmp
                                    type="btn-default-line"
                                    @click='setSnsImg(slide.share)'
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
                                    <input type="text" class="input" maxlength="40" placeholder="제목을 입력해주세요."  @input="e => slide.title = e.target.value" v-model="slide.title"
                                    :disabled="isSlideCardEdit"
                                    ref="slideTitle"
                                    >
                                    <div class="input-limit__text">
                                      <Emoji @input="onSelectEmoji($event, 'slideTitle', j)"/>
                                      <p>{{ slide.title.length }}/34자</p>
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
                                    <textarea maxlength="200" placeholder="내용을 입력해주세요."   @input="e => slide.description = e.target.value"  v-model="slide.description"
                                    :disabled="isSlideCardEdit"
                                    ref="slideContent"
                                    ></textarea>
                                    <div class="textarea-limit__text">
                                      <Emoji @input="onSelectEmoji($event, 'slideContent', j)"/>
                                      <p>
                                        {{ slide.description.length }}/126자
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
                                    <input type="radio" name="btnUse" id="btnUseY" value="1" @change='changeSlideBtnUse(slide)' v-model="slide.btnUse"/>
                                    <label for="btnUseY"><span class="radiobox__text">1개</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseY2" value="2" @change='changeSlideBtnUse(slide)' v-model="slide.btnUse"/>
                                    <label for="btnUseY2"><span class="radiobox__text">2개</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseN" value="0" @change='changeSlideBtnUse(slide)' v-model="slide.btnUse"/>
                                    <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                  </span>
                                </div>
                              </div>
                          </div>
                          <div class="form-item__content" v-if="slide.buttons">
                            <feedButtonReg :button="button" :index='j' v-for="(button, j) in slide.buttons" :key="j" />
                          </div>
                          <!-- 에러 메시지 주석처리 -->
                            <!-- <p class="guide-text error"  v-if="slideBtnErrorMsg">슬라이드 버튼을 입력해주세요.</p> -->
                          </td>
                        </tr>
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
              @click="onSubmit()"
              :disabled="isSubmitCheck"
          >{{ regBtnStr }}</ButtonCmp>
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
        <feedList ref='feedList' @mod='setFeedItem' />
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
        :propFileList="form.media"
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
          [제목 : {{ form.title }}]<br>
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
import feedObj from '@/views/brand/feed/components/feedObj'
import { mapGetters } from 'vuex'
import { createFeed, feedUpdate, getOgTagInfo } from '@/api/feed/feed'

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
      form: JSON.parse(JSON.stringify(feedObj.form)),
      isTabActive: 1,
      btnTypeOption: [
        { codeNm: 'URL 연결', code: 'url' },
        { codeNm: 'App 연결', code: 'app' },
        { codeNm: '대화방 연결', code: 'chat' },
        { codeNm: '전화걸기', code: 'call' }
      ],
      slideActiveIndex: 0,
      isSlideCardEdit: false,
      timeOption: [
        { codeNm: '00시', code: '00' },
        { codeNm: '01시', code: '01' },
        { codeNm: '02시', code: '02' },
        { codeNm: '03시', code: '03' },
        { codeNm: '04시', code: '04' },
        { codeNm: '05시', code: '05' },
        { codeNm: '06시', code: '06' },
        { codeNm: '07시', code: '07' },
        { codeNm: '08시', code: '08' },
        { codeNm: '09시', code: '09' },
        { codeNm: '10시', code: '10' },
        { codeNm: '12시', code: '12' },
        { codeNm: '13시', code: '13' },
        { codeNm: '14시', code: '14' },
        { codeNm: '15시', code: '15' },
        { codeNm: '16시', code: '16' },
        { codeNm: '17시', code: '17' },
        { codeNm: '18시', code: '18' },
        { codeNm: '19시', code: '19' },
        { codeNm: '20시', code: '20' },
        { codeNm: '21시', code: '21' },
        { codeNm: '22시', code: '22' },
        { codeNm: '23시', code: '23' }
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
      removeConfirmMsg: false,
      slideUrlErrorMsg: false
    }
  },
  created() {
    this.todayFormat = moment().format('YYYY.MM.DD')
  },
  mounted() {
    this.switchStatus = this.form.switch ? '게시' : '미게시'
  },
  watch: {},
  computed: {
    ...mapGetters('brand', {
      brandInfoData: 'getBrandDetail'
    }),
    regTypeStr() {
      return jglib.isEmpty(this.form.feedId) ? '브랜드 소식 등록' : '브랜드 소식 수정'
    },
    regBtnStr() {
      return jglib.isEmpty(this.form.feedId) ? '등록' : '수정'
    },
    PublicType() {
      return this.form.switch
    },
    brandId() {
      return this.$router.currentRoute.params.brandId
    },
    switchStatus: {
      get() {
        return this.form.switch ? '게시' : '미게시'
      },
      set(value) {
        this.form.switch = value
      }
      // return this.form.switch ? '게시' : '미게시'
    },
    isSubmitCheck() {
      if (this.form === 'slide') {
        // 슬라이드 일때 제목 체크
        if (this.form.title === '') {
          return true
        }
        // 슬라이드 일때 슬라이드 제목 체크
        for (let key in this.form.slide) {
          let slide = this.form.slide[key]
          if (slide) {
            if (slide.title === '') {
              return true
            }
          }
        }
      } else {
        // 갤러리 쉐어 일때 제목 미디어, 쉐어 체크
        if (this.form.title === '') {
          return true
        }
      }
      return false
    }
  },
  methods: {
    // 슬라이드 추가
    addSlide () {
      let slideData = JSON.parse(JSON.stringify(feedObj.slide))
      slideData.slideIndex = this.form.slide.length + 1
      slideData.isActive = false
      this.form.slide.push(slideData)
    },
    // 슬라이드 삭제
    removeSlide (idx) {
      if (this.form.slide.length > 1) {
        this.form.slide.splice(idx, 1)
        this.isModalViewed = true
        this.removeConfirmMsg = true
      }
    },
    // 슬라이드 활성화
    slideActive (idx) {
      this.slideActiveIndex = idx
      this.form.slide.forEach((slide, index) => {
        if (idx !== index) {
          slide.isActive = false
        } else {
          slide.isActive = true
        }
      })
    },
    // 슬라이드 편집 활성화
    saveCardEdit() {
      this.form.slide.forEach((slide, index) => {
        if (index === 0) {
          slide.isActive = true
        } else {
          slide.isActive = false
        }
      })
      this.isSlideCardEdit = false
    },
    // 이미지 파일 업로드 (슬라이드 이미지형 일때)
    onFileChanged (e, slide) {
      const reader = new FileReader()
      let file = e.target.files[0] // 파일
      slide.media[0].file = e.target.files
      slide.media[0].fileName = file.name
      reader.onload = e => {
        slide.media[0].url = e.target.result
      }
      reader.readAsDataURL(file)
    },
    // 모달 버튼
    modalSave (fileList) {
      this.form.media = fileList
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
    feedValidationCheck() {
      if (!this.form.title) {
        this.feedTitleErrorMsg = true
        return false
      }

      if (this.form === 'slide') {
        // 슬라이드 일때 제목 체크
        if (this.form.title === '') {
          return false
        }
        // 슬라이드 체크
        for (let key in this.form.slide) {
          let slide = this.form.slide[key]
          // 제목 체크
          if (slide.title === '') {
            return false
          }
          // 이미지일때 image
          if (slide.type === 'gallery') {
            if (slide.media !== undefined) {
              if (slide.media[0].url === '') {
                return false
              }
            }
          } else if (slide.type === 'share') {
            // 쉐어 일때 url
            if (slide.share.imageUrl === '') {
              return false
            }
          }
        }
      } else {
        // 갤러리 쉐어 일때 제목 미디어, 쉐어 체크
        if (this.form.title === '') {
          return false
        }
        // if (this.form.type === 'sharing' && this.form.imgFiles.length < 1) {
        //   this.feedImageFileErrorMsg = true
        //   return
        // }
        if (this.form.type === 'share' && !this.form.url) {
          this.feedUrlFileErrorMsg = true
          return
        }
        if (this.form.type !== 'slide') {
          if (!this.form.description) {
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
      }
      return true
    },
    onSubmit () { // save/ok
      let confirmTxt = '저장 하시겠습니까?'
      this.$confirmMsg(confirmTxt).then(() => {
        // 파라미터 정리
        let param = this.settingFeedParams()
        if (jglib.isEmpty(this.form.feedId)) {
          // 등록
          createFeed(this.brandId, param).then((res) => {
            this.form = JSON.parse(JSON.stringify(feedObj.form))
            this.$alertMsg('등록 되었습니다.')
            this.$refs.feedList.getFeedList()
          }).catch(res => {
            if (res && res.error && res.error.code === '60000702') {
              this.$alertMsg(res.error.message)
            } else {
              this.$alertMsg('처리중 오류가 발생하였습니다.')
            }
          })
        } else {
          // 수정
          feedUpdate(this.brandId, this.form.feedId, param).then((res) => {
            this.form = JSON.parse(JSON.stringify(feedObj.form))
            this.$alertMsg('수정 되었습니다.')
            this.$refs.feedList.getFeedList()
          })
        }
      })
    },
    settingFeedParams() {
      let formData = new FormData()
      let params = {}
      let buttons = []
      let status = (this.form.switch) ? 'ok' : 'save'
      if (!this.form.switch) {
        this.form.publishType = 'publish'
      }
      params = {
        title: this.form.title, // 제목
        description: this.form.description, // 내용
        type: this.form.type, // 소식유형 (gallery, slide, share)
        status: status,
        publishType: this.form.publishType,
        pinYn: this.form.pinYn === true ? 'Y' : 'N'
      }
      if (this.form.type === 'gallery') {
        params.media = []
        for (let i = 0; i < this.form.media.length; i++) {
          params.media[i] = { orderNo: (i + 1), fileId: this.form.media[i].fileId }
          if (this.form.media[i].file !== undefined) {
            formData.append('formMedia' + [i + 1], this.form.media[i].file[0])
          }
        }
        // formData.append('media', params.media)
        /* formData.append(
          'media',
          new Blob([JSON.stringify(params.media)], { type: 'application/json' })
        ) */
      } else if (this.form.type === 'share') {
        params.share = { title: this.form.share.title, imageUrl: this.form.share.imageUrl, snsLink: this.form.share.snsLink }
      }
      // 갤러리 / 쉐어형 일때 버튼 세팅
      if (this.form.type === 'gallery' || this.form.type === 'share') {
        let buttonCnt = parseInt(this.form.btnUseLen)
        if (parseInt(this.form.btnUseLen) > 0) {
          for (let i = 0; i < buttonCnt; i++) {
            if (this.form.buttons[i].btnOtherType === 'app') {
              buttons.push({
                orderNo: i + 1,
                type: this.form.buttons[i].btnOtherType,
                title: this.form.buttons[i].btnName,
                appLink: {
                  packageName: this.form.buttons[i].app.packageName,
                  scheme: this.form.buttons[i].app.scheme,
                  uri: this.form.buttons[i].app.url,
                  link: ''
                }
              })
            } else if (this.form.buttons[i].btnOtherType === 'chat') {
              buttons.push({
                orderNo: i + 1,
                title: this.form.buttons[i].btnName,
                type: this.form.buttons[i].btnOtherType,
                link: this.form.buttons[i].message.call
              })
            } else if (this.form.buttons[i].btnType === 'call') {
              buttons.push({
                orderNo: i + 1,
                title: this.form.buttons[i].btnName,
                type: this.form.buttons[i].btnType,
                link: this.form.buttons[i].call
              })
            } else if (this.form.buttons[i].btnType === 'url') {
              buttons.push({
                orderNo: i + 1,
                title: this.form.buttons[i].btnName,
                type: this.form.buttons[i].btnType,
                link: this.form.buttons[i].url
              })
            }
          }
          params = {
            ...params,
            buttons: buttons
          }
        }
      }
      // 슬라이드 형일때
      if (this.form.type === 'slide') {
        params.slide = []
        let slideCnt = this.form.slide.length
        for (let i = 0; i < slideCnt; i++) {
          let slide = this.form.slide[i]
          params.slide[i] = {
            orderNo: (i + 1),
            title: slide.title,
            description: slide.description,
            type: slide.type
          }
          if (slide.type === 'gallery') {
            // 이미지 세팅
            let media = []
            if (!jglib.isEmpty(slide.media)) {
              for (let key in slide.media) {
                media.push({
                  orderNo: key + 1,
                  fileId: slide.media[key].fileId
                })
                if (slide.media[key].file !== undefined) {
                  formData.append('slideMedia' + [(i + 1)] + '_' + [(parseInt(key) + 1)], slide.media[key].file[0])
                }
              }
            }
            params.slide[i] = {
              ...params.slide[i],
              media: media
            }
          } else if (slide.type === 'share') {
            // 공유정보 생성
            params.slide[i] = {
              ...params.slide[i],
              share: { title: slide.share.title, imageUrl: slide.share.imageUrl, snsLink: slide.share.snsLink }
            }
          }
          // 버튼
          if (!jglib.isEmpty(slide.buttons)) {
            buttons = []
            for (let key in slide.buttons) {
              let btn = slide.buttons[key]
              if (btn.btnOtherType === 'app') {
                buttons.push({
                  orderNo: i + 1,
                  type: btn.btnOtherType,
                  title: btn.btnName,
                  appLink: {
                    packageName: btn.app.packageName,
                    scheme: btn.app.scheme,
                    uri: btn.app.url,
                    link: ''
                  }
                })
              } else if (btn.btnOtherType === 'chat') {
                buttons.push({
                  orderNo: i + 1,
                  title: btn.btnName,
                  type: btn.btnOtherType,
                  link: btn.message.call
                })
              } else if (btn.btnType === 'call') {
                buttons.push({
                  orderNo: i + 1,
                  title: btn.btnName,
                  type: btn.btnType,
                  link: btn.call
                })
              } else if (btn.btnType === 'url') {
                buttons.push({
                  orderNo: i + 1,
                  title: btn.btnName,
                  type: btn.btnType,
                  link: btn.url
                })
              }
            }
            params.slide[i] = {
              ...params.slide[i],
              buttons: buttons
            }
          }
        }
      }
      // 예약 게시인 경우
      if (this.form.publishType === 'reservation') {
        if (!jglib.isEmpty(this.resvDate) && !jglib.isEmpty(this.resvTime)) {
          params.publishDate = this.resvDate.getFullYear() + '' + (this.resvDate.getMonth() + 1) + '' + this.resvDate.getDate() + '' + this.resvTime + '0000'
        }
      }
      formData.append('params', JSON.stringify(params))
      return formData
    },
    isChangeTypeCheck(e, type) {
      e.preventDefault()
      if (this.form.type !== type) {
        this.$confirmMsg(`상품유형을 변경하는 경우 입력한 메시지가 삭제됩니다.<br>상품유형을 변경 하시겠습니까?`).then(() => {
          this.form.type = type
          // 초기화
          this.initFeedForm()
        }).catch(e => {
          return false
        })
        // this.isModalViewed = true
        // this.isChangeType = true
        // this.isFixedFeed = false
      }
    },
    initFeedForm() {
      this.form = JSON.parse(JSON.stringify(feedObj.form))
    },
    closeMsg () {
      this.isModalViewed = false
      this.isChangeType = false
    },
    checkfixTitle () {
      if (this.form.pinYn === true) {
        this.isModalViewed = true
        this.isFixedFeed = true
        this.isChangeType = false
      }
    },
    changeType(tab) {
      this.isTabActive = (this.isTabActive === tab) ? 0 : tab
      this.showThumbnail = !this.showThumbnail
    },
    changeSlideBtnUse(slide) {
      let btnCnt = parseInt(slide.btnUse)
      let btn = JSON.parse(JSON.stringify(feedObj.btn))
      slide.buttons = []
      for (let i = 0; i < btnCnt; i++) {
        slide.buttons.push(JSON.parse(JSON.stringify(btn)))
      }
    },
    setSnsImg(share) {
      // <!-- Native이슈로 임시처리(추후 삭제 필요)
      if (share.snsLink.indexOf('youtube') === -1 && share.snsLink.indexOf('youtu.be') === -1) {
        this.$alertMsg('연결 URL은 YouTube만 등록 가능합니다.')
        return
      }
      // Native이슈로 임시처리(추후 삭제 필요) -->

      if (jglib.isUrl(share.snsLink)) {
        getOgTagInfo(encodeURIComponent(share.snsLink)).then(res => {
          if (res.code === '20000000' && res.result.httpCode === 200) {
            share.imageUrl = res.result.image

            // <!-- Native이슈로 임시처리(추후 삭제 필요)
            if (res.result.title !== '') {
              share.title = res.result.title.slice(0, 80)
            }
            // Native이슈로 임시처리(추후 삭제 필요) -->
            /* Native이슈로 임시처리(추후 원복 필요) this.ogTitle = res.result.title.slice(0, 80) */
          } else if (res.code === '20000000' && res.result.httpCode > 299 && res.result.httpCode < 400) {
            this.$alertMsg('redirection URL은 등록 불가 합니다.')
          } else {
            this.$alertMsg('연결 URL을 정확히 입력해주세요.')
          }
        })
          .catch(res => {
            this.$alertMsg('연결 URL을 정확히 입력해주세요.')
          })
      } else {
        this.$alertMsg('연결 URL을 정확히 입력해주세요.')
      }
    },
    setFeedItem(item) {
      console.log(item)
      this.form = JSON.parse(JSON.stringify(feedObj.form))
      this.form.feedId = item.feedId
      this.form.switch = (item.status !== 'save')
      this.form.publishType = item.publishType
      this.form.type = item.type
      this.form.title = item.title
      this.form.updateDate = item.updateDate
      if (item.type === 'gallery' || item.type === 'share') {
        this.form.description = item.description
        this.form.btnUseLen = (jglib.isEmpty(item.buttons) ? '0' : item.buttons.length + '')
        // this.form.buttons = (!jglib.isEmpty(item.buttons) ? item.buttons : [])
        this.form.buttons = []
        for (let key in item.buttons) {
          let itemBtn = item.buttons[key]
          let btnObj = { btnName: itemBtn.btnName }
          if (itemBtn.type === 'app' || itemBtn.type === 'chat') {
            btnObj.btnType = 'other'
            btnObj.btnOtherType = itemBtn.type
          } else {
            btnObj.btnType = itemBtn.type
            btnObj.btnOtherType = ''
          }
          if (itemBtn.type === 'app') {
            btnObj.app = {}
            btnObj.app.url = itemBtn.appLink.uri
            btnObj.app.scheme = itemBtn.appLink.scheme
            btnObj.app.packageName = itemBtn.appLink.packageName
          } else if (itemBtn.type === 'chat') {
            // 퍼블 완료되면 작업
          } else if (itemBtn.type === 'call') {
            btnObj.call = itemBtn.link
          } else if (itemBtn.type === 'url') {
            btnObj.url = itemBtn.link
          }
          this.form.buttons.push(btnObj)
        }
      }
      if (item.type === 'gallery') {
        for (let key in item.media) {
          let itemMedia = item.media[key]
          this.form.media.push({
            fileId: itemMedia.fileId,
            fileName: itemMedia.fileNm,
            orderNo: itemMedia.orderNo,
            url: itemMedia.url
          })
        }
      }
      if (item.type === 'share') {
        this.form.share = item.share
      }
      if (item.type === 'slide') {
        this.form.slide = []
        for (let key in item.slide) {
          let itemSlide = item.slide[key]
          let slideObj = {
            slideIndex: itemSlide.orderNo,
            type: itemSlide.type,
            title: itemSlide.title,
            description: itemSlide.description,
            buttons: [],
            media: [],
            share: {}
          }
          console.log(key)
          if (key === '0') {
            slideObj.isActive = true
          } else {
            slideObj.isActive = false
          }
          if (itemSlide.type === 'gallery') {
            for (let me in itemSlide.media) {
              let itemMedia = itemSlide.media[me]
              slideObj.media.push({
                fileId: itemMedia.fileId,
                fileName: itemMedia.fileNm,
                orderNo: itemMedia.orderNo,
                url: itemMedia.url
              })
            }
          } else if (itemSlide.type === 'share') {
            slideObj.share = itemSlide.share
          }
          // 슬라이드 버튼
          for (let btnno in itemSlide.buttons) {
            let itemBtn = itemSlide.buttons[btnno]
            let btnObj = { btnName: itemBtn.btnName }
            if (itemBtn.type === 'app' || itemBtn.type === 'chat') {
              btnObj.btnType = 'other'
              btnObj.btnOtherType = itemBtn.type
            } else {
              btnObj.btnType = itemBtn.type
              btnObj.btnOtherType = ''
            }
            if (itemBtn.type === 'app') {
              btnObj.app = {}
              btnObj.app.url = itemBtn.appLink.uri
              btnObj.app.scheme = itemBtn.appLink.scheme
              btnObj.app.packageName = itemBtn.appLink.packageName
            } else if (itemBtn.type === 'chat') {
              // 퍼블 완료되면 작업
            } else if (itemBtn.type === 'call') {
              btnObj.call = itemBtn.link
            } else if (itemBtn.type === 'url') {
              btnObj.url = itemBtn.link
            }
            slideObj.buttons.push(btnObj)
          }
          slideObj.btnUse = slideObj.buttons.length + ''
          this.form.slide.push(slideObj)
        }
      }
      this.form.pinYn = item.pinYn === 'Y'
      if (item.publishType === 'reservation') {
        this.form.resvDate = moment.utc(item.publishDate, 'YYYYMMDDhhmmss').toDate()
        this.form.resvTime = moment.utc(item.publishDate, 'YYYYMMDDhhmmss').format('hh')
      }
      // this.form.updateData = moment.utc(item.publishDate, 'YYYY년 MM월 DD일 hh:ss').format('YYYY년 MM월 DD일 hh:ss')
      let form = this.$refs.form
      form.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    },
    changeFormBtn(e) {
      let btnCnt = parseInt(e.target.value)
      this.form.buttons = []
      let btn = feedObj.btn
      for (let i = 0; i < btnCnt; i++) {
        this.form.buttons.push(JSON.parse(JSON.stringify(btn)))
      }
    }
  }
}
</script>

<style>
</style>
