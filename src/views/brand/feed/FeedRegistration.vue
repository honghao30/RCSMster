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
                    <!-- 타입선택 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">타입선택</span></th>
                      <td>
                          <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="type" id="gallery" value="gallery" v-model="form.type" :disabled="isSlideCardEdit"/>
                                    <label for="gallery"><span class="radiobox__text">갤러리 타입</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="type" id="sharing" value="sharing" v-model="form.type" :disabled="isSlideCardEdit"/>
                                    <label for="sharing"><span class="radiobox__text">쉐어링 타입</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="type" id="slideView" value="slideView" v-model="form.type" :disabled="isSlideCardEdit"/>
                                    <label for="slideView"><span class="radiobox__text">슬라이드타입</span></label>
                                  </span>
                                </div>
                              </div>
                          </div>
                      </td>
                    </tr>
                    <!-- //타입선택 -->
                    <!-- 제목 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">제목</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item input-limit">
                              <span class="input">
                                <input type="text"  maxlength="40" placeholder="제목을 입력해주세요." v-model="form.feedTitle" :disabled="isSlideCardEdit">
                                <p class="input-limit__text">
                                  {{ form.feedTitle.length }}/40자
                                </p>
                              </span>
                            </div>
                            <ButtonCmp
                                  type="btn-default-line"
                              >특수문자
                            </ButtonCmp>
                          </div>
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
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="textarea">
                                  <textarea maxlength="200" placeholder="내용을 입력해주세요."  v-model="form.feedContent"></textarea>
                                  <div class="textarea-limit__text">
                                    <p>
                                      {{ form.feedContent.length }}/200자
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <ButtonCmp
                                  type="btn-default-line"
                              >특수문자
                              </ButtonCmp>
                            </div>
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
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="input">
                                  <input type="text" disabled placeholder="이미지를 등록해주세요.">
                                </span>
                                <ButtonCmp
                                  type="btn-default-line"
                                >
                                  이미지 등록 / 편집
                                </ButtonCmp>
                              </div>
                              <p class="guide-text black">&middot; 소식 메인화면에 노출되는 이미지는 700px * 700px이며, 초과 시 central crop하여 노출됩니다.</p>
                            </div>
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
                              <p class="guide-text black">&middot; 연결 URL은 You Tube만 등록 가능합니다.</p>
                              <p class="guide-text black">&middot; 연결된 URL의 타이틀과 대표이미지(썸네일)가 자동으로 노출됩니다.</p>
                            </div>
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
                                    <input type="radio" name="btnUse" id="btnUseN" value="btnUseN" v-model="form.btnUse"/>
                                    <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseY" value="btnUseY" v-model="form.btnUse"/>
                                    <label for="btnUseY"><span class="radiobox__text">사용</span></label>
                                  </span>
                                </div>
                              </div>
                          </div>
                          <template v-if="form.btnUse == 'btnUseY'">
                            <div class="form-item__content" v-for="(btn, k) in form.buttons" :key="k">
                              <template v-if="btn.isActive">
                                <div class="form-item-row">
                                  <div class="input-item input-limit">
                                    <span class="input">
                                      <input type="text" class="input" maxlength="17" placeholder="버튼명을 입력하세요." v-model="btn.btnName" :disabled="form.isSavedbuttonList.length == 2">

                                      <p class="input-limit__text">
                                        {{ btn.btnName.length }}/17자
                                      </p>
                                    </span>
                                  </div>
                                  <ButtonCmp
                                        type="btn-default-line"
                                        :disabled="form.isSavedbuttonList.length == 2"
                                    >특수문자
                                  </ButtonCmp>
                                </div>
                                <div class="form-item-row">
                                  <div class="input-item">
                                    <Dropdown :options=btnTypeOption v-model="btn.btnType" placeholder="선택" :disabled="form.isSavedbuttonList.length == 2"></Dropdown>
                                  </div>
                                </div>
                                <div class="form-item-row" v-if="btn.btnType == 'url'">
                                  <div class="input-item">
                                    <span class="input">
                                        <input type="text" class="input" maxlength="40" placeholder="http://형식으로 입력해주세요." v-model="btn.url">
                                    </span>
                                  </div>
                                </div>
                                <div class="form-item-row" v-if="btn.btnType == 'app'">
                                  <div class="input-item w--full">
                                    <span class="input">
                                        <input type="text" class="input" maxlength="40" placeholder="http://형식으로 입력해주세요." v-model="btn.app.url">
                                    </span>
                                  </div>
                                  <div class="input-item w--full">
                                    <span class="input">
                                        <input type="text" class="input" maxlength="40" placeholder="Package name을 입력해주세요." v-model="btn.app.packageName">
                                    </span>
                                  </div>
                                  <div class="input-item w--full">
                                    <span class="input">
                                        <input type="text" class="input" maxlength="40" placeholder="Scheme을 입력해주세요." v-model="btn.app.scheme">
                                    </span>
                                  </div>
                                </div>
                                <div class="form-item-row" v-if="btn.btnType == 'chat'">
                                  <div class="input-item">
                                    <span class="input">
                                        <input type="text" class="input" maxlength="40" placeholder="대화방을 선택해주세요." v-model="btn.chatRoom" disabled>
                                    </span>
                                  </div>
                                  <ButtonCmp
                                        type="btn-default-line"
                                    >대화방 선택
                                  </ButtonCmp>
                                </div>
                                <div class="form-item-row" v-if="btn.btnType == 'call'">
                                  <div class="input-item">
                                    <span class="input">
                                        <input type="text" class="input" maxlength="40" placeholder="‘-’없이 숫자만 입력해주세요." v-model="btn.call">
                                    </span>
                                  </div>
                                </div>
                                <div class="form-item-row">
                                  <ButtonCmp
                                        type="btn-default-line"
                                        @click="addBtn(btn)"
                                        :disabled="form.isSavedbuttonList.length == 2"
                                    >버튼추가
                                  </ButtonCmp>
                                </div>
                              </template>
                            </div>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <ul class="button-list">
                                  <li
                                    v-for="(item, i) in form.isSavedbuttonList" :key="i"
                                    @click="btnInfoEdit(i)"
                                    :class="{ 'active' : item.isActive}"
                                  >
                                    <span class="button-name">{{ item.btnName }}</span>
                                    <a role="button" class="btn-del">x<span class="blind">삭제</span></a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </template>
                        </td>
                      </tr>
                      <!-- //버튼 -->
                      <!-- 게시방법 -->
                      <tr>
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
                                  <p class="guide-text black">&middot; [숨김 게시]는 브랜드 소식내에는 노출되지 않습니다.</p>
                                  <p class="guide-text black">&middot; RCS 메시지 발송 시, 메시지에 URL을 기재하는 용도로 사용됩니다. </p>
                                  <p class="guide-text black">&middot; [저장] 또는 [비공개] 상태일 경우, [게시] 상태가 아니므로 URL에 연결된 소식을 볼 수 없습니다.</p>
                                  <p class="guide-text black">&middot; [예약 게시]는 지정된 [게시]상태로 전환되므로 [게시] 이전에는 URL에 연결된 소식을 볼 수 없습니다.</p>
                                </div>
                            </div>
                        </td>
                      </tr>
                      <!-- //게시방법 -->
                      <!-- 상단고정 -->
                      <tr>
                        <th scope="row"><span class="form-item__label">상단고정</span></th>
                        <td>
                            <div class="form-item__content">
                                <div class="form-item-row">
                                  <div class="input-item">
                                    <span class="checkbox">
                                      <input type="checkbox" id="pinY" v-model="form.pinYn"/>
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
                <!-- // 갤러리 타입 & 쉐이링 타입 -->
                <!-- 슬라이드 타입 -->
                <template v-else>
                  <div class="slide-card__wrap">
                    <div class="slide-card__inner">
                      <draggable
                        v-model="form.slideData"
                        class="card-list"
                        draggable=".card--draggable"
                      >
                        <div
                          v-for="(slide, j) in form.slideData" :key="j"
                          class="card-item"
                          :class="[{'active': slide.isActive}, {'card--draggable': isSlideCardEdit}]"
                          @click="slideActive(j)"
                        >
                          <span v-text="`카드${slide.slideIndex}`" class="card-text"></span>
                          <a role="button" @click="removeSlide(j)" class="btn-del" v-if="isSlideCardEdit
                          "><span class="blind">삭제</span></a>
                        </div>
                      </draggable>
                      <a role="button" class="btn-add" @click="addSlide(form.slideData.length)" v-if="form.slideData.length < 10">+<span class="blind">추가</span></a>
                    </div>
                    <a role="button" class="btn small btn-line" @click="isSlideCardEdit = true" v-if="!isSlideCardEdit">편집</a>
                    <a role="button" class="btn small btn-blue" v-if="isSlideCardEdit" @click="saveCardEdit">저장</a>
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
                          <th scope="row"><span class="form-item__label required">슬라이드 유형</span></th>
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
                        <tr>
                          <th scope="row"><span class="form-item__label required">슬라이드 제목</span></th>
                          <td>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item input-limit">
                                  <span class="input">
                                    <input type="text" class="input" maxlength="40" placeholder="제목을 입력해주세요." v-model="slide.slideTitle"
                                    :disabled="isSlideCardEdit"
                                    >
                                    <p class="input-limit__text">
                                      {{ slide.slideTitle.length }}/34자
                                    </p>
                                  </span>
                                </div>
                                <ButtonCmp
                                      type="btn-default-line"
                                      :disabled="isSlideCardEdit"
                                  >특수문자
                                </ButtonCmp>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row"><span class="form-item__label required">슬라이드 내용</span></th>
                          <td>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item input-limit">
                                  <div class="textarea"
                                    :class="{ 'disabled' : isSlideCardEdit }"
                                  >
                                    <textarea maxlength="200" placeholder="내용을 입력해주세요."  v-model="slide.slideDescription"
                                    :disabled="isSlideCardEdit"
                                    ></textarea>
                                    <div class="textarea-limit__text">
                                      <p>
                                        {{ slide.slideDescription.length }}/126자
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <ButtonCmp
                                      type="btn-default-line"
                                      :disabled="isSlideCardEdit"
                                  >특수문자
                                </ButtonCmp>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="slide.slideType == 'image'">
                          <th scope="row">
                            <span class="form-item__label required">이미지</span>
                          </th>
                          <td>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="input"><input type="text" :value="filesName" :disabled="disabled" placeholder="이미지를 등록해주세요."></span>
                                  <input type="file" id="fileUp" class="input" @change="onFileChanged" :disabled="isSlideCardEdit">
                                  <label for="fileUp"
                                    class="btn btn-default-line"
                                    :class="{'inactive' : isSlideCardEdit }"
                                  >파일찾기</label>
                                </div>
                                <p class="guide-text black">&middot; 이미지 사이즈 / 용량 : 700px * 700px, 최대 1080px * 1080px / 최대 3MB</p>
                                <p class="guide-text black">&middot; 파일종류: JPG, PNG, GIF</p>
                              </div>
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
                                <p class="guide-text black">&middot; 연결 URL은 You Tube만 등록 가능합니다.</p>
                              <p class="guide-text black">&middot; 연결된 URL의 타이틀과 대표이미지(썸네일)가 자동으로 노출됩니다.</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row"><span class="form-item__label required">버튼</span></th>
                          <td>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseN" value="btnUseN" v-model="slide.btnUse" :disabled="isSlideCardEdit"/>
                                    <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseY" value="btnUseY" v-model="slide.btnUse" :disabled="isSlideCardEdit"/>
                                    <label for="btnUseY"><span class="radiobox__text">사용</span></label>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <template v-if="slide.btnUse == 'btnUseY'">
                              <div class="form-item__content"
                                v-for="(btn, l) in slide.buttons" :key="l">
                                <template v-if="!btn.isSaved">
                                  <div class="form-item-row">
                                    <div class="input-item input-limit">
                                      <span class="input">
                                        <input type="text" class="input" maxlength="17" placeholder="버튼명을 입력하세요." v-model="btn.btnName" :disabled="isSlideCardEdit || form.isSavedbuttonList.length > 2">
                                        <p class="input-limit__text">
                                          {{ btn.btnName.length }}/17자
                                        </p>
                                      </span>
                                    </div>
                                    <ButtonCmp
                                          type="btn-default-line"
                                          :disabled="isSlideCardEdit || form.isSavedbuttonList.length > 2"
                                      >특수문자
                                    </ButtonCmp>
                                  </div>
                                  <div class="form-item-row">
                                    <div class="input-item">
                                      <Dropdown :options=btnTypeOption v-model="btn.btnType" placeholder="선택" :disabled="isSlideCardEdit || form.isSavedbuttonList.length > 2"></Dropdown>
                                    </div>
                                  </div>
                                  <div class="form-item-row" v-if="btn.btnType == 'url'">
                                    <div class="input-item">
                                      <span class="input">
                                          <input type="text" class="input" maxlength="40" placeholder="http://형식으로 입력해주세요." v-model="btn.url">
                                      </span>
                                    </div>
                                  </div>
                                  <div class="form-item-row" v-if="btn.btnType == 'app'">
                                    <div class="input-item w--full">
                                      <span class="input">
                                          <input type="text" class="input" maxlength="40" placeholder="http://형식으로 입력해주세요." v-model="btn.app.url">
                                      </span>
                                    </div>
                                    <div class="input-item w--full">
                                      <span class="input">
                                          <input type="text" class="input" maxlength="40" placeholder="Package name을 입력해주세요." v-model="btn.app.packageName">
                                      </span>
                                    </div>
                                    <div class="input-item w--full">
                                      <span class="input">
                                          <input type="text" class="input" maxlength="40" placeholder="Scheme을 입력해주세요." v-model="btn.app.scheme">
                                      </span>
                                    </div>
                                  </div>
                                  <div class="form-item-row" v-if="btn.btnType == 'chat'">
                                    <div class="input-item">
                                      <span class="input">
                                          <input type="text" class="input" maxlength="40" placeholder="대화방을 선택해주세요." v-model="btn.chatRoom" disabled>
                                      </span>
                                    </div>
                                    <ButtonCmp
                                          type="btn-default-line"
                                      >대화방 선택
                                    </ButtonCmp>
                                  </div>
                                  <div class="form-item-row" v-if="btn.btnType == 'call'">
                                    <div class="input-item">
                                      <span class="input">
                                          <input type="text" class="input" maxlength="40" placeholder="‘-’없이 숫자만 입력해주세요." v-model="btn.call">
                                      </span>
                                    </div>
                                  </div>
                                </template>
                              </div>
                              <div class="form-item__content">
                                <div class="form-item-row">
                                  <ButtonCmp
                                        type="btn-default-line"
                                        :disabled="isSlideCardEdit"
                                    >버튼추가
                                  </ButtonCmp>
                                </div>
                                <div class="form-item-row">
                                  <ul class="button-list">
                                    <li>
                                      <span class="button-name"></span>
                                      <a role="button" class="btn-del">x<span class="blind">삭제</span></a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </template>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row"><span class="form-item__label required">게시방법</span></th>
                          <td>
                              <div class="form-item__content">
                                  <div class="form-item-row">
                                    <div class="input-item">
                                      <span class="radiobox">
                                        <input type="radio" name="publish" id="publish" value="publish" v-model="slide.publishType" :disabled="isSlideCardEdit"/>
                                        <label for="publish"><span class="radiobox__text">즉시게시</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="publish" id="resv" value="resv" v-model="slide.publishType" :disabled="isSlideCardEdit"/>
                                        <label for="resv"><span class="radiobox__text">예약게시</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="publish" id="hidden" value="hidden" v-model="slide.publishType" :disabled="isSlideCardEdit"/>
                                        <label for="hidden"><span class="radiobox__text">숨김(URL)게시</span></label>
                                      </span>
                                    </div>
                                    <p class="guide-text black">&middot; [숨김 게시]는 브랜드 소식내에는 노출되지 않습니다.</p>
                                    <p class="guide-text black">&middot; RCS 메시지 발송 시, 메시지에 URL을 기재하는 용도로 사용됩니다. </p>
                                    <p class="guide-text black">&middot; [저장] 또는 [비공개] 상태일 경우, [게시] 상태가 아니므로 URL에 연결된 소식을 볼 수 없습니다.</p>
                                    <p class="guide-text black">&middot; [예약 게시]는 지정된 [게시]상태로 전환되므로 [게시] 이전에는 URL에 연결된 소식을 볼 수 없습니다.</p>
                                  </div>
                              </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row"><span class="form-item__label">상단고정</span></th>
                          <td>
                              <div class="form-item__content">
                                  <div class="form-item-row">
                                    <div class="input-item">
                                      <span class="checkbox">
                                        <input type="checkbox" id="pinY" v-model="slide.pinYn" :disabled="isSlideCardEdit"/>
                                        <label for="pinY"><span class="radiobox__text">상단 고정 등록</span></label>
                                      </span>
                                    </div>
                                  </div>
                              </div>
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
            <TabCmp tabClass="brand-tab"  size="small">
              <TabItem title="상세보기">
                <div class="feed-emulator__wrap">
                  <div class="feed-emulator">
                    <div class="emulator-header">
                      <div class="emulator-header__inner">
                        <button class="btn-back"><span class="blind">이전으로</span></button>
                        <div class="profile">
                          <div class="profile__image">
                            <img src="@/assets/images/dummy/brand_logo.png" alt="">
                          </div>
                          <p class="brand-name">SYSTEM STUDIOS</p>
                        </div>
                      </div>
                    </div>
                    <feedEmulator :feedInfoData="form"/>
                  </div>
                </div>
              </TabItem>
              <TabItem title="소식메인 보기">
              </TabItem>
            </TabCmp>
          </div>
          <!-- // 에뮬레이터 -->
        </div>
        <div class="top-notice--gray">
          <p>- 브랜드 소식은 100개까지 작성할 수 있으며, 최대 보존 기간은 1년 입니다.</p>
          <p>- 1년 경과 시, 자동 삭제됩니다. (단, 상단고정 소식은 예외)</p>
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
              type="btn-line"
          >임시 저장</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
          >등록</ButtonCmp>
        </div>
        <!-- 이전 피드 -->
        <div class="feed-list">
          <div class="feed-list__filter">
            <div class="filter-row">
              <span class="filter-row__title">상태</span>
              <ul class="scope-list">
                <li v-for="(option, l) in statusOption" :key="l"
                @click="getfilterOption(option, filterOption.status)"
                :class="{'active': option.isSelected}"
                >{{ option.label }}</li>
              </ul>
            </div>
            <div class="filter-row">
              <span class="filter-row__title">유형</span>
              <ul class="scope-list">
                <li v-for="(option, l) in typeOption" :key="l"
                @click="getfilterOption(option, filterOption.type)"
                :class="{'active': option.isSelected}"
                >{{ option.label }}</li>
              </ul>
            </div>
            <div class="filter-row ctrl">
              <div class="date-range">
                <el-date-picker
                  v-model="filterOption.dateRange"
                  type="daterange"
                  unlink-panels
                  range-separator="~"
                  prefix-icon=""
                  :start-placeholder="todayFormat"
                  :end-placeholder="todayFormat"
                  format="yyyy.MM.dd"
                />
              </div>
              <div class="search-area">
                <Dropdown :options=serchCategoryOption v-model="filterOption.searchCategory" placeholder="선택"></Dropdown>
                <span class="input">
                  <input type="text" v-model="filterOption.searchWord" placeholder="검색어를 입력해 주세요.">
                </span>
                <ButtonCmp
                  type="btn-only-icon"
                  iconname='icon-search'
                >
              </ButtonCmp>
              </div>
            </div>
          </div>
          <feedViewItem v-for="( feed, m ) in feedViewData" :feedData="feed" :key="m"/>
        </div>
        <!-- // 이전 피드 -->
      </div>
    </div>
  </div>
</template>

<script>

import PageTitle from '@/components/common/PageTitle.vue'
import draggable from 'vuedraggable'
import 'swiper/css/swiper.css'
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import TabItem from '@/components/common/TabItem.vue'
import TabCmp from '@/components/common/TabCmp.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import feedEmulator from '@/views/brand/feed/components/feedEmulator.vue'
import feedViewItem from '@/views/brand/feed/components/feedViewItem.vue'
import moment from 'moment'

export default {
  components: {
    PageTitle,
    draggable,
    TabItem,
    TabCmp,
    BrandLnb,
    ButtonCmp,
    Dropdown,
    feedEmulator,
    feedViewItem
  },
  data() {
    return {
      form: {
        type: 'gallery',
        feedTitle: '',
        feedDate: '4월 19일 오후 3:00​',
        feedContent: '',
        btnUse: 'btnUseN',
        imgFiles: [],
        url: '',
        buttonCount: 0,
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
          isActive: true,
          isSaved: false
        }],
        isSavedbuttonList: [],
        publishType: 'publish',
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
            isSaved: false
          }],
          publishType: 'publish',
          pinYn: false
        }]
      },
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
      listFilterDate: '',
      filterOption: {
        status: [],
        type: [],
        dateRange: '',
        searchCategory: '',
        searchWord: ''
      },
      statusOption: [
        {
          label: '게시',
          value: 'publish',
          isSelected: false
        },
        {
          label: '예약',
          value: 'reservation',
          isSelected: false
        },
        {
          label: '숨김(URL)',
          value: 'internet',
          isSelected: false
        },
        {
          label: '임시저장',
          value: 'temporarySave',
          isSelected: false
        },
        {
          label: '미노출',
          value: 'hidden',
          isSelected: false
        },
        {
          label: '고정소식',
          value: 'fix',
          isSelected: false
        },
        {
          label: '내가 등록한 소식',
          value: 'myNews',
          isSelected: false
        }
      ],
      typeOption: [
        {
          label: '갤러리',
          value: 'gallery',
          isSelected: false
        },
        {
          label: '쉐어링',
          value: 'sharing',
          isSelected: false
        },
        {
          label: '슬라이드',
          value: 'slideView',
          isSelected: false
        }
      ],
      todayFormat: '',
      serchCategoryOption: [{
        label: '소식제목',
        value: 'feedTitle'
      },
      {
        label: '소식 ID',
        value: 'feedId'
      }],
      feedViewData: [
        {
          feedId: 1222213,
          feedType: '갤러리',
          feedStatus: '숨김(URL)',
          feedAuthor: '김미미',
          feedDate: '2023.04.09',
          feedPublishDate: '2023.04.09 05:56',
          feedItem: {
            feedDate: '4월 19일 오후 3:00',
            type: 'gallery',
            feedTitle: 'SK 텔레콤의 스마트한 제안',
            feedContent: 'SK텔레콤을 다양하게 만나보세요! #SKT Insight · SK텔레콤 네이버 포스트 스크랩 · SK텔레콤 페이스북 #Facebook · SK텔레콤 유튜브 #YouTube ​'
          }
        },
        {
          feedId: 1222213,
          feedType: '쉐어형',
          feedStatus: '게시',
          feedAuthor: '김미미',
          feedDate: '2023.04.09',
          feedPublishDate: '2023.04.09 05:56',
          feedItem: {
            feedDate: '4월 19일 오후 3:00',
            type: 'sharing',
            feedTitle: 'SK 텔레콤의 스마트한 제안',
            feedContent: 'SK텔레콤을 다양하게 만나보세요! #SKT Insight · SK텔레콤 네이버 포스트 스크랩 · SK텔레콤 페이스북 #Facebook · SK텔레콤 유튜브 #YouTube ​'
          }
        }
      ]
    }
  },
  created() {
    this.todayFormat = moment().format('YYYY.MM.DD')
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
          isActive: false,
          isSelected: false
        }],
        publishType: 'publish',
        pinYn: false
      }
      this.form.slideData.push(slideData)
    },
    // 슬라이드 삭제
    removeSlide (idx) {
      if (this.form.slideData.length > 1) {
        this.form.slideData.splice(idx, 1)
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
    // 필터 활성화
    getfilterOption(option, targetKey) {
      if (!option.isSelected) {
        targetKey.push(option.value)
        option.isSelected = true
      } else {
        let i = 0
        while (i < targetKey.length) {
          if (targetKey[i] === option.value) {
            targetKey.splice(i, 1)
          } else {
            i++
          }
        }
        option.isSelected = false
      }
    },
    // 버튼 추가 (수정 중)
    addBtn(target) {
      let btn = {
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
        isSaved: false,
        isActive: true
      }
      let buttonList = this.form.isSavedbuttonList
      let listLength = buttonList.length
      let btnItem = target
      if (listLength < 2) {
        btnItem.isActive = false
        buttonList.push(btnItem)
        this.form.buttons.push(btn)
      }
    },
    // 버튼  (수정 중)
    btnInfoEdit (index) {
      this.form.isSavedbuttonList[index].isActive = true
      this.form.buttons.forEach((btn) => {
        btn.isActive = false
      })
      this.form.buttons[index].isActive = true
    }
  }
}
</script>

<style>
</style>
