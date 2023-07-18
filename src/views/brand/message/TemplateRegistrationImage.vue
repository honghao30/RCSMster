template<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="템플릿 작성" />
        <div class="registration__wrap">
          <div class="registration-form__wrap">
            <form  ref="form" :model="form">
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="180px">
                    <col />
                  </colgroup>
                  <tbody>
                    <!-- 템플릿 ID -->
                    <tr>
                      <th scope="row"><span class="form-item__label">템플릿 ID</span></th>
                      <td>
                        <span class="text">템플릿 ID는 등록 완료 후 생성됩니다.</span>
                      </td>
                    </tr>
                    <!-- //템플릿 ID -->
                    <!-- 템플릿 유형 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">템플릿 유형</span></th>
                      <td>
                        <span class="text">이미지 템플릿</span>
                      </td>
                    </tr>
                    <!-- //템플릿 유형 -->
                    <!-- 템플릿 상품 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">템플릿 상품</span></th>
                      <td>
                        <span class="text">{{ templateType }}</span>
                      </td>
                    </tr>
                    <!-- //템플릿 상품 -->
                    <!-- 템플릿 명 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">템플릿 명</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <input type="text" placeholder="템플릿 이름을 입력하세요." maxlength="30" v-model="form.templateTitle"
                                  ref="templateTitle"
                                  />
                                  <div class="input-limit__text">
                                    <p>{{ form.templateTitle.length }}/30자</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //템플릿 명 -->
                  </tbody>
                </table>
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="180px">
                    <col />
                  </colgroup>
                  <tbody>
                    <!-- 이미지 - 이미지 & 타이틀 강조형, 이미지 강조형, 썸네일 세로형, 썸네일 가로형 -->
                    <tr v-if="isImageType1 || isImageType2 || isImageType3 || isImageType4">
                      <th scope="row"><span class="form-item__label required">이미지</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="radiobox">
                                <input type="radio" name="imageOptions" id="imageOptionsSquare" value="square" v-model="form.imageOptions"/>
                                <label for="imageOptionsSquare"><span class="radiobox__text">정방형 (1:1)</span></label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" name="imageOptions" id="imageOptionsVertical" value="vertical" v-model="form.imageOptions"/>
                                <label for="imageOptionsVertical"><span class="radiobox__text">세로형 (3:4)</span></label>
                              </span>
                            </div>
                          </div>
                          <div class="form-item-row" v-if="form.imageOptions === 'square'">
                            <div class="input-item">
                              <span class="input">
                                <input type="text" class="input" :value="form.imageFile" disabled>
                              </span>
                              <input type="file" id="fileUp" class="input blind"
                              @change="onFileChanged">
                              <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                            </div>
                            <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                            <p class="guide-text black">&middot; 권장 사이즈: 300*300px(또는 1:1 비율)</p>
                            <div class="input-item input-limit input-url">
                              <div class="input">
                                <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="form.imageURL"
                                ref="imageURL"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="form-item-row" v-if="form.imageOptions === 'vertical'">
                            <div class="input-item">
                              <span class="input">
                                <input type="text" class="input" :value="form.imageFile" disabled>
                              </span>
                              <input type="file" id="fileUp" class="input blind"
                              @change="onFileChanged">
                              <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                            </div>
                            <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                            <p class="guide-text black">&middot; 권장 사이즈: 300*300px(또는 1:1 비율)</p>
                            <div class="input-item input-limit input-url">
                              <div class="input">
                                <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="form.imageURL"
                                ref="imageURL"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //이미지 - 이미지 & 타이틀 강조형, 이미지 강조형, 썸네일 세로형, 썸네일 가로형 -->
                  </tbody>
                </table>
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="180px">
                    <col />
                  </colgroup>
                  <tbody>
                    <!-- 타이틀 -->
                      <!-- 이미지 & 타이틀 강조형 -->
                      <tr v-if="isImageType1">
                        <th scope="row"><span class="form-item__label">타이틀</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="titleUse" id="titleUseN" value="N" v-model="form.titleUse"/>
                                  <label for="titleUseN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="titleUse" id="titleUseY" value="Y" v-model="form.titleUse"/>
                                  <label for="titleUseY"><span class="radiobox__text">사용</span></label>
                                </span>
                              </div>
                              <div class="input-item input-limit" v-if="form.titleUse === 'Y'">
                                <div class="input">
                                  <input type="text" class="input" maxlength="30"
                                    v-model="form.titleName"
                                    placeholder="타이틀을 입력해주세요."
                                    ref="titleName"
                                  >
                                  <div class="input-limit__text">
                                    <p>{{ form.titleName.length }}/30자</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- //이미지 & 타이틀 강조형 -->
                      <!-- 이미지 템플릿 신규 -->
                      <tr v-if="isImageType7">
                        <th scope="row"><span class="form-item__label required">타이틀 - 제목</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <input type="text" class="input" maxlength="17"
                                    v-model="form.titleName"
                                    placeholder="제목을 입력해주세요."
                                    ref="titleName"
                                  >
                                  <div class="input-limit__text">
                                    <p>{{ form.titleName.length }}/17자</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="isImageType7">
                        <th scope="row"><span class="form-item__label">타이틀 - 설명</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="explainUse" id="explainUseN" value="N" v-model="form.explainUse"/>
                                  <label for="explainUseN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="explainUse" id="explainUseY" value="Y" v-model="form.explainUse"/>
                                  <label for="explainUseY"><span class="radiobox__text">사용</span></label>
                                </span>
                              </div>
                              <div class="input-item input-limit" v-if="form.explainUse === 'Y'">
                                <div class="input">
                                  <input type="text" class="input" maxlength="20"
                                    v-model="form.explainContent"
                                    placeholder="설명을 입력해주세요."
                                    ref="explainContent"
                                  >
                                  <div class="input-limit__text">
                                    <p>{{ form.explainContent.length }}/20자</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="isImageType7">
                        <th scope="row"><span class="form-item__label">타이틀 - 로고</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="logo" id="basicImage" v-model="form.logoType"  value="basicImage" />
                                  <label for="basicImage">기본 아이콘</label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="logo" id="custom" v-model="form.logoType" value="custom" />
                                  <label for="custom">직접 등록</label>
                                </span>
                              </div>
                              <template v-if="form.logoType === 'basicImage'">
                                <TemplateTitleReg
                                  :titleIconNewData="titleIconNewData"
                                  :titleIconBasicData="titleIconBasicData"
                                />
                              </template>
                              <template  v-if="form.logoType === 'custom'">
                                <div class="input-item w--full">
                                  <span class="input">
                                    <input type="text" class="input" :value="form.logoFile" disabled>
                                  </span>
                                  <input type="file" id="fileUp" class="input blind"
                                  @change="onFileChanged">
                                  <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                                </div>
                                <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                              </template>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- //이미지 템플릿 신규 -->
                    <!-- //타이틀 -->
                  </tbody>
                </table>
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="180px">
                    <col />
                  </colgroup>
                  <tbody>
                    <!-- 본문 -->
                      <!-- 본문 - 이미지 강조형, 썸네일 세로형, 썸네일 가로형, SNS형, SNS 중간버튼형, 이미지 템플릿 신규 -->
                      <tr v-if="isImageType2 || isImageType3 || isImageType4 || isImageType5 || isImageType6 || isImageType7">
                        <th scope="row"><span class="form-item__label">본문 - 제목</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="bodyTitleUse" id="bodyTitleUseN" value="N" v-model="form.bodyTitleUse"/>
                                  <label for="bodyTitleUseN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="bodyTitleUse" id="bodyTitleUseY" value="Y" v-model="form.bodyTitleUse"/>
                                  <label for="bodyTitleUseY"><span class="radiobox__text">사용</span></label>
                                </span>
                              </div>
                              <div class="input-item input-limit" v-if="form.bodyTitleUse === 'Y'">
                                <div class="input">
                                  <input type="text" class="input" maxlength="20"
                                    v-model="form.bodyTitle"
                                    placeholder="제목을 입력해주세요."
                                    ref="bodyTitle"
                                  >
                                  <div class="input-limit__text">
                                    <p>{{ form.bodyTitle.length }}/20자</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="isImageType2 || isImageType3 || isImageType4 || isImageType5 || isImageType6 || isImageType7">
                        <th scope="row"><span class="form-item__label required">본문 - 내용</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="textarea">
                                  <textarea maxlength="1300" placeholder="내용을 입력해주세요."
                                  @input="e => form.bodyContent = e.target.value"
                                  ref="descContent"></textarea>
                                  <div class="textarea-limit__text">
                                    <Emoji @input="onSelectEmoji($event, 'descContent')"/>
                                    <p>
                                      {{ form.bodyContent.length }}/1,300자
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- //본문 - 이미지 강조형, 썸네일 세로형, 썸네일 가로형, SNS형, SNS 중간버튼형, 이미지 템플릿 신규 -->
                      <!-- 본문 - 이미지 & 타이틀 강조형 -->
                      <template v-if="isImageType1 && image">
                      <tr v-for="(image, index) in imageTemplate" :key="index">
                        <th scope="row"><span class="form-item__label required">본문 {{ index + 1 }} </span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row form-template">
                              <div class="input-item input-limit input-left">
                                <div class="input">
                                  <input type="text" class="input" maxlength="4"
                                    v-model="form.bodyTitle"
                                    placeholder="소제목을 입력해주세요."
                                    ref="bodyTitle"
                                  >
                                  <div class="input-limit__text">
                                    <p>{{ form.bodyTitle.length }}/4자</p>
                                  </div>
                                </div>
                              </div>
                              <div class="input-item input-limit input-right">
                                <div class="input">
                                  <input type="text" class="input" maxlength="33"
                                    v-model="form.bodyContent"
                                    placeholder="내용을 입력해주세요."
                                    ref="bodyContent"
                                  >
                                  <div class="input-limit__text">
                                    <p>{{ form.bodyContent.length }}/33자</p>
                                  </div>
                                </div>
                              </div>
                              <div class="template-button">
                                <ButtonCmp
                                  type="btn-default-line"
                                  size="small"
                                  @click="removeimage"
                                >
                                  삭제
                                </ButtonCmp>
                                <ButtonCmp
                                  type="btn-default-line"
                                  size="medium"
                                  @click="Addimage"
                                >
                                추가하기
                                </ButtonCmp>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </template>
                      <!-- //본문 - 이미지 & 타이틀 강조형 -->
                    <!-- //본문 -->
                  </tbody>
                </table>
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="180px">
                    <col />
                  </colgroup>
                  <tbody>
                  <template v-if="isImageType6">
                    <!-- 버튼 - SNS 중간버튼형 -->
                    <tr v-for="(button,index) in form.Buttons.info" :key="index">
                      <th scope="row"><span class="form-item__label">버튼{{ index + 1 }} </span></th>
                      <td>
                        <TemplateButtonReg
                         :buttonInfo="button"
                        />
                      </td>
                    </tr>
                    <tr v-if="isImageType6">
                      <th scope="row"><span class="form-item__label">버튼색 </span></th>
                      <td>
                        <!-- 버튼 칼라 -->
                        <div class="form-item-row">
                            <div class="input-item brand-color-select">
                              <span class="radiobox">
                                <input type="radio" name="bgColor" id="defaultColor" value="#2f77fb"/>
                                <label for="defaultColor">기본색</label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" name="bgColor" id="brandColor" disabled value="#70AD47" />
                                <label for="brandColor">브랜드색 (
                                  <router-link to="#">
                                  브랜드 색 설정
                                </router-link> )</label>
                              </span>
                            </div>
                        </div>
                      </td>
                    </tr>
                    </template>
                    <!-- //버튼 - SNS 중간버튼형 -->
                    <!-- 이미지 - SNS형, SNS 중간버튼형 -->
                    <tr v-if="isImageType5 || isImageType6">
                      <th scope="row"><span class="form-item__label">이미지</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="input">
                                <input type="text" class="input" :value="form.imageFile" disabled>
                              </span>
                              <input type="file" id="fileUp" class="input blind"
                              @change="onFileChanged">
                              <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                            </div>
                            <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                            <p class="guide-text black">&middot; 권장 사이즈: 300*300px(또는 1:1 비율)</p>
                            <div class="input-item input-limit input-url">
                              <div class="input">
                                <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="form.imageURL"
                                ref="imageURL"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //이미지 - SNS형, SNS 중간버튼형 -->
                    <!-- 상세 - 썸네일 세로형-->
                    <template  v-if="isImageType3 && detail">
                    <tr v-for="(detail, index) in detailTemplate" :key="index">
                      <th scope="row"><span class="form-item__label required">상세  {{ index + 1 }}</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row form-template">
                            <div class="input-item input-left">
                              <span class="input">
                                <input type="text" class="input" :value="form.imageFile" disabled>
                              </span>
                              <input type="file" id="fileUp" class="input blind"
                              @change="onFileChanged">
                              <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                            </div>
                            <div class="template-detail">
                              <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                              <p class="guide-text black">&middot; 권장 사이즈: 300*300px(또는 1:1 비율)</p>
                              <div class="input-item input-url">
                                <div class="input">
                                  <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="form.imageURL"
                                  ref="imageURL"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="input-item input-limit input-right">
                              <div class="input">
                                <input type="text" class="input" maxlength="33"
                                  v-model="form.detailContent"
                                  placeholder="내용을 입력해주세요."
                                  ref="detailContent"
                                >
                                <div class="input-limit__text">
                                  <p>{{ form.detailContent.length }}/33자</p>
                                </div>
                              </div>
                            </div>
                            <div class="template-button">
                              <ButtonCmp
                                type="btn-default-line"
                                size="small"
                                @click="removedetail"
                              >
                                삭제
                              </ButtonCmp>
                              <ButtonCmp
                                type="btn-default-line"
                                size="medium"
                                @click="Adddetail"
                              >
                              추가하기
                              </ButtonCmp>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    </template>
                    <!-- //상세 - 썸네일 세로형 -->
                    <!-- 상세 이미지 - 썸네일 가로형-->
                    <tr v-if="isImageType4">
                      <th scope="row"><span class="form-item__label required">상세 이미지 1</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="input">
                                <input type="text" class="input" :value="form.imageFile1" disabled>
                              </span>
                              <input type="file" id="fileUp" class="input blind"
                              @change="onFileChanged1">
                              <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                            </div>
                            <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                            <p class="guide-text black">&middot; 권장 사이즈: 300*300px(또는 1:1 비율)</p>
                            <div class="input-item input-limit input-url">
                              <div class="input">
                                <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="form.imageURL1"
                                ref="imageURL"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="isImageType4">
                      <th scope="row"><span class="form-item__label required">상세 이미지 2</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="input">
                                <input type="text" class="input" :value="form.imageFile2" disabled>
                              </span>
                              <input type="file" id="fileUp" class="input blind"
                              @change="onFileChanged2">
                              <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                            </div>
                            <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                            <p class="guide-text black">&middot; 권장 사이즈: 300*300px(또는 1:1 비율)</p>
                            <div class="input-item input-limit input-url">
                              <div class="input">
                                <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="form.imageURL2"
                                ref="imageURL"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="isImageType4">
                      <th scope="row"><span class="form-item__label required">상세 이미지 3</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="input">
                                <input type="text" class="input" :value="form.imageFile3" disabled>
                              </span>
                              <input type="file" id="fileUp" class="input blind"
                              @change="onFileChanged3">
                              <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                            </div>
                            <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                            <p class="guide-text black">&middot; 권장 사이즈: 300*300px(또는 1:1 비율)</p>
                            <div class="input-item input-limit input-url">
                              <div class="input">
                                <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="form.imageURL3"
                                ref="imageURL"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //상세 이미지 - 썸네일 가로형 -->
                    <!-- 테이블 - 이미지 템플릿 신규-->
                    <tr v-if="isImageType7">
                      <th scope="row"><span class="form-item__label required">테이블</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="radiobox">
                                <input type="radio" name="tableUse" id="tableUseN" value="N" v-model="form.tableUse"/>
                                <label for="tableUseN"><span class="radiobox__text">미사용</span></label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" name="tableUse" id="tableUseY" value="Y" v-model="form.tableUse"/>
                                <label for="tableUseY"><span class="radiobox__text">사용</span></label>
                              </span>
                            </div>
                            <TemplateTableReg
                              :tableInfo="form.Table.info"
                              v-if="form.tableUse === 'Y'"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //테이블 - 이미지 템플릿 신규 -->
                    <!-- 버튼 - SNS 중간버튼형 제외 -->
                    <template v-if="!isImageType6 && !isImageType8">
                      <tr v-for="(button,index) in form.Buttons.info" :key="index">
                        <th scope="row"><span class="form-item__label">버튼{{ index + 1 }} </span></th>
                        <td>
                          <TemplateButtonReg
                          :buttonInfo="button"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row"><span class="form-item__label">버튼색 </span></th>
                        <td>
                          <!-- 버튼 칼라 -->
                          <div class="form-item-row">
                              <div class="input-item brand-color-select">
                                <span class="radiobox">
                                  <input type="radio" name="bgColor" id="defaultColor" value="#2f77fb"/>
                                  <label for="defaultColor">기본색</label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="bgColor" id="brandColor" disabled value="#70AD47" />
                                  <label for="brandColor">브랜드색 (
                                    <router-link to="#">
                                    브랜드 색 설정
                                  </router-link> )</label>
                                </span>
                              </div>
                          </div>
                        </td>
                      </tr>
                    </template>
                    <!-- // 버튼 - SNS 중간버튼형 제외 -->
                  </tbody>
                </table>
                <!-- carousel -->
                <CarouselReg :slideData="form.slideData" v-if="isImageType8"/>
              </div>
              <div class="form-btm__text">
                <template v-if="templateType === 'textTitleCustom1' || templateType === 'textTitleCustom2'">
                  <p class="guide-text black">&middot; 변수로 설정하고자 하는 내용을 {{ }} 표시로 작성해주세요. 예) {{이름}}, {{date}}</p>
                  <p class="guide-text black">&middot; 특수문자, 공란, 줄바꿈 그리고 {{description}} 변수명 사용 불가합니다.</p>
                  <p class="guide-text black">&middot; 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</p>
                </template>
                <p class="guide-text black">&middot; 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</p>
                <div class="checkbox">
                  <input type="checkbox" id="agreeChk" value="form.agree"/>
                  <label for="agreeChk"><span class="checkbox__text">정보성 메시지만 보낼 수 있으며 광고 등 정책에 위배되는 메시지 발송 시 템플릿 사용이 중지될 수 있음을 동의합니다.</span></label>
                </div>
              </div>
            </form>
          </div>
          <!-- 에뮬레이터 -->
          <div class="brand-aside">

          </div>
          <!-- // 에뮬레이터 -->
        </div>
        <div class="top-notice--gray">
          <p>- 대화방명을 수정하는 경우 승인 심사가 필요합니다.</p>
          <p>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</p>
        </div>
        <div class="button__wrap space-between">
          <div>
            <ButtonCmp
              @click="btnCancel"
              type="btn-line"
            >취소</ButtonCmp>
          </div>
          <div>
            <ButtonCmp
              type="btn-line"
              @click="saveTemp"
            >임시 저장</ButtonCmp>
            <ButtonCmp
              type="btn-blue"
              @click="onSubmit"
            >승인 요청</ButtonCmp>
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
import TemplateTableReg from '@/views/brand/message/components/TemplateTableReg.vue'
import TemplateButtonReg from '@/views/brand/message/components/TemplateButtonReg.vue'
import TemplateTitleReg from '@/views/brand/message/components/TemplateTitleReg.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
import { textTemplate } from '@/views/brand/message/templateData.js'
import CarouselReg from '@/views/brand/message/components/CarouselReg.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    Emoji,
    TemplateTableReg,
    TemplateButtonReg,
    TemplateTitleReg,
    CarouselReg
  },
  data() {
    return {
      textTemplate,
      templateType: 'textTitle1',
      messageTemplate: [],
      form: {
        templateTitle: '',
        // logoType: 'custom',
        logoFile: '',
        mainTitle: '',
        descTitle: '',
        descContent: '',
        tableRowNum: 1,
        tableTitle: '',
        tableContent: [{
          line: false,
          direction: 'row',
          key: '',
          value: ''
        }],
        varUse: 'Y',
        varSelect: '',
        templateProp: 'desc',
        itemMainTitle: '',
        itemSubTitle: '',
        itemImgType: '',
        itemImgFile: '',
        templateProduct: '이미지 & 타이틀 강조형',
        imageOptions: 'square',
        imageFile: '',
        imageURL: '',
        imageFile1: '',
        imageURL1: '',
        imageFile2: '',
        imageURL2: '',
        imageFile3: '',
        imageURL3: '',
        titleUse: 'N',
        titleName: '',
        explainUse: 'N',
        explainContent: '',
        bodyUse: 'N',
        bodyTitleUse: 'N',
        bodyTitle: '',
        bodyContent: '',
        logoType: 'basicImage',
        tableUse: 'Y',
        buttonUse: 'N',
        detailContent: '',
        Table: {
          info: {
            tableRowNum: 1,
            description: [
              {
                line: false,
                colNum: '1',
                itemLabel: '',
                itemData: ''
              }
            ]
          }
        },
        Buttons: {
          use: 'N',
          info: [{
            id: 1,
            bgColor: '#2f77fb',
            btnEvent: 'none',
            btnEventDropdown: '',
            btnName: '',
            simpleChatbot: '',
            chatbot: '',
            call: '',
            copyContent: '',
            message: {
              call: '',
              content: '',
              viewSource: ''
            },
            map: {
              latitude: '',
              longitude: '',
              location: '',
              url: '',
              query: ''
            },
            calendar: {
              date: '',
              title: '',
              content: ''
            },
            browser: {
              url: '',
              viewMode: ''
            }
          },
          {
            id: 2,
            bgColor: '#2f77fb',
            btnEvent: 'none',
            btnEventDropdown: '',
            btnName: '',
            simpleChatbot: '',
            chatbot: '',
            call: '',
            copyContent: '',
            message: {
              call: '',
              content: '',
              viewSource: ''
            },
            map: {
              latitude: '',
              longitude: '',
              location: '',
              url: '',
              query: ''
            },
            calendar: {
              date: '',
              title: '',
              content: ''
            },
            browser: {
              url: '',
              viewMode: ''
            }
          }]
        },
        slideData: [{
          slideIndex: '1',
          slideTitle: '',
          slideDescription: '',
          isActive: true,
          imgFile: '',
          buttons:{
            use: 'Y',
            info: [{
              id: 1,
              bgColor: '#2f77fb',
              btnEvent: 'none',
              btnEventDropdown: '',
              btnName: '',
              simpleChatbot: '',
              chatbot: '',
              call: '',
              copyContent: '',
              message: {
                call: '',
                content: '',
                viewSource: ''
              },
              map: {
                latitude: '',
                longitude: '',
                location: '',
                url: '',
                query: ''
              },
              calendar: {
                date: '',
                title: '',
                content: ''
              },
              browser: {
                url: '',
                viewMode: ''
              }
            },
            {
              id: 2,
              bgColor: '#2f77fb',
              btnEvent: 'none',
              btnEventDropdown: '',
              btnName: '',
              simpleChatbot: '',
              chatbot: '',
              call: '',
              copyContent: '',
              message: {
                call: '',
                content: '',
                viewSource: ''
              },
              map: {
                latitude: '',
                longitude: '',
                location: '',
                url: '',
                query: ''
              },
              calendar: {
                date: '',
                title: '',
                content: ''
              },
              browser: {
                url: '',
                viewMode: ''
              }
            }],
          }
        }],
      },
      bodyTemplate: [
        {
          num: ''
        }
      ],
      detailTemplate: [
        {
          num: ''
        }
      ],
      imageTemplate: [
        {
          num: ''
        }
      ],
      tableContentNumOption: [{
        label: '1개',
        value: 1
      },
      {
        label: '2개',
        value: 2
      },
      {
        label: '3개',
        value: 3
      }],
      titleIconNewData: [
        {
          title: '알림',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '이벤트',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '프로모션',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '청구서',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '영수증',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '예약안내',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '일정안내',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '티켓',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '쿠폰',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        }
      ],
      titleIconBasicData: [
        {
          title: '승인',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '입금',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '출금',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '취소',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '주문',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '출고',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '배송',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '회원가입',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        },
        {
          title: '인증',
          titleIcon: require('../../../assets/images/icon/icon_title_logo_alarm.png')
        }
      ],
      isImageType1: false,
      isImageType2: false,
      isImageType3: false,
      isImageType4: false,
      isImageType5: false,
      isImageType6: false,
      isImageType7: false,
      isImageType8: false
    }
  },
  mounted() {
    this.chkTypeChange()
    this.buttonUseCheck()
    if (this.$route.query.type === 'image1') {
      this.isImageType1 = true
      this.templateType = '이미지 & 타이틀 강조형'
    } else if (this.$route.query.type === 'image2') {
      this.isImageType2 = true
      this.templateType = '이미지 강조형'
    } else if (this.$route.query.type === 'image3') {
      this.isImageType3 = true
      this.templateType = '썸네일 세로형'
    } else if (this.$route.query.type === 'image4') {
      this.isImageType4 = true
      this.templateType = '썸네일 가로형'
    } else if (this.$route.query.type === 'image5') {
      this.isImageType5 = true
      this.templateType = 'SNS형'
    } else if (this.$route.query.type === 'image6') {
      this.isImageType6 = true
      this.templateType = 'SNS 중간버튼형'
    } else if (this.$route.query.type === 'image7') {
      this.isImageType7 = true
      this.templateType = '이미지 템플릿 신규'
    } else if (this.$route.query.type === 'image8') {
      this.isImageType8 = true
      this.templateType = '이미지 템플릿 캐러셀'
    }
  },
  methods: {
    chkTypeChange() {
      this.textTemplate.forEach((item) => {
        if (item.templateType === this.templateType) {
          this.messageTemplate = Object.assign({}, item.cmp)
        }
      })
    },
    changetableRow () {
      let row = this.form.tableRowNum
      let tableLength = this.form.tableContent.length
      let diff = row - tableLength
      let tableItem = {
        line: false,
        direction: 'row',
        key: '',
        value: ''
      }
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          this.form.tableContent.push(tableItem)
        }
      } else if (diff < 0) {
        for (let i = 0; i < -diff; i++) {
          this.form.tableContent.pop()
        }
      }
    },
    // 이미지 파일 업로드
    onFileChanged (e) {
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      this.form.imageFile = fileName
      this.url = URL.createObjectURL(file)
    },
    onFileChanged1 (e) {
      const files1 = e.target.files
      const file1 = files1[0]
      const fileName1 = file1.name
      this.form.imageFile1 = fileName1
      this.url = URL.createObjectURL(file1)
    },
    onFileChanged2 (e) {
      const files2 = e.target.files
      const file2 = files2[0]
      const fileName2 = file2.name
      this.form.imageFile2 = fileName2
      this.url = URL.createObjectURL(file2)
    },
    onFileChanged3 (e) {
      const files3 = e.target.files
      const file3 = files3[0]
      const fileName3 = file3.name
      this.form.imageFile3 = fileName3
      this.url = URL.createObjectURL(file3)
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

    buttonUseCheck() {
      // if (this.form.Buttons.use === 'N') {
      //   this.templateData.forEach((item, i) => {
      //     if (item.type === 'Buttons') {
      //       this.templateData.splice(i, 1)
      //     }
      //   })
      // } else {
      //   let buttonCmp = {
      //     type: 'Buttons',
      //     info: {}
      //   }
      //   buttonCmp.info = this.form.Buttons.info
      //   this.templateData.push(buttonCmp)
      // }
    },

    // 본문 추가 및 삭제
    Addbody () {
      if (this.bodyTemplate.length < 3) {
        this.bodyTemplate.push({})
      }
    },
    removebody (index) {
      if (this.bodyTemplate.length > 1) {
        this.bodyTemplate.splice(index, 1)
      }
    },

    // 상세 추가 및 삭제
    Adddetail () {
      if (this.detailTemplate.length < 3) {
        this.detailTemplate.push({})
      }
    },
    removedetail (index) {
      if (this.detailTemplate.length > 1) {
        this.detailTemplate.splice(index, 1)
      }
    },

    // 이미지 추가 및 삭제
    Addimage () {
      if (this.imageTemplate.length < 3) {
        this.imageTemplate.push({})
      }
    },
    removeimage (index) {
      if (this.imageTemplate.length > 1) {
        this.imageTemplate.splice(index, 1)
      }
    },
    onSubmit () {
      console.log()
    },
    btnCancel () {
      console.log()
    },
    saveTemp () {
      console.log()
    }
  }
}
</script>

<style>
</style>
