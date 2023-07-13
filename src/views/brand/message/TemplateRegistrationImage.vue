<template>
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
                        <span class="text">{{ form.templateProduct }}</span>
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
                    <!-- 이미지 유형 -->
                      <!-- 이미지 & 타이틀 강조형, 이미지 강조형 -->
                      <tr>
                        <th scope="row"><span class="form-item__label">이미지 유형</span></th>
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
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label required">이미지</span>
                                  <div class="inner__input-item">
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
                                  </div>
                                </div>
                              </div>
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">URL</span>
                                  <div class="inner__input-item">
                                    <div class="input-item input-limit">
                                    <div class="input">
                                      <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="form.imageURL"
                                      ref="imageURL"
                                      />
                                    </div>
                                  </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="form-item-row" v-if="form.imageOptions === 'vertical'">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label required">이미지</span>
                                  <div class="inner__input-item">
                                    <div class="input-item">
                                      <span class="input">
                                        <input type="text" class="input" :value="form.imageFile" disabled>
                                      </span>
                                      <input type="file" id="fileUp" class="input blind"
                                      @change="onFileChanged">
                                      <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                                    </div>
                                    <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                                  </div>
                                </div>
                              </div>
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">URL</span>
                                  <div class="inner__input-item">
                                    <div class="input-item input-limit">
                                    <div class="input">
                                      <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="form.imageURL"
                                      ref="imageURL"
                                      />
                                    </div>
                                  </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- //이미지 & 타이틀 강조형 -->
                      <!-- 썸네일형(세로), 썸네일형(가로), SNS형, 이미지 템플릿 신규 -->
                      <tr>
                        <th scope="row"><span class="form-item__label">이미지 유형</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row" v-if="form.imageOptions === 'square'">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label required">이미지</span>
                                  <div class="inner__input-item">
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
                                  </div>
                                </div>
                              </div>
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">URL</span>
                                  <div class="inner__input-item">
                                    <div class="input-item input-limit">
                                    <div class="input">
                                      <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="form.imageURL"
                                      ref="imageURL"
                                      />
                                    </div>
                                  </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="form-item-row" v-if="form.imageOptions === 'vertical'">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label required">이미지</span>
                                  <div class="inner__input-item">
                                    <div class="input-item">
                                      <span class="input">
                                        <input type="text" class="input" :value="form.imageFile" disabled>
                                      </span>
                                      <input type="file" id="fileUp" class="input blind"
                                      @change="onFileChanged">
                                      <label for="fileUp" class="btn btn-default-line">파일 선택</label>
                                    </div>
                                    <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
                                  </div>
                                </div>
                              </div>
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">URL</span>
                                  <div class="inner__input-item">
                                    <div class="input-item input-limit">
                                    <div class="input">
                                      <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="form.imageURL"
                                      ref="imageURL"
                                      />
                                    </div>
                                  </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- 썸네일형(세로), 썸네일형(가로), SNS형, 이미지 템플릿 신규 -->
                    <!-- //이미지 유형 -->
                    <!-- 타이틀 -->
                      <!-- 이미지 & 타이틀 강조형 -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">타이틀</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">제목</span>
                                  <div class="inner__input-item">
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
                                  </div>
                                </div>
                                <div class="inner__input-box" v-if="form.titleUse === 'Y'">
                                  <div class="inner__input-item">
                                    <div class="input-item input-limit">
                                      <div class="input">
                                        <input type="text" class="input" maxlength="17"
                                          v-model="form.titleName"
                                          placeholder="템플릿 이름을 입력해주세요."
                                          ref="titleName"
                                        >
                                        <div class="input-limit__text">
                                          <p>{{ form.titleName.length }}/17자</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- //이미지 & 타이틀 강조형 -->
                      <!-- 이미지 템플릿 신규 -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">타이틀</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">제목</span>
                                  <div class="inner__input-item">
                                    <div class="input-item input-limit">
                                      <div class="input">
                                        <input type="text" class="input" maxlength="17"
                                          v-model="form.titleName"
                                          placeholder="템플릿 이름을 입력해주세요."
                                          ref="titleName"
                                        >
                                        <div class="input-limit__text">
                                          <p>{{ form.titleName.length }}/17자</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">설명</span>
                                  <div class="inner__input-item">
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
                                  </div>
                                </div>
                                <div class="inner__input-box" v-if="form.explainUse === 'Y'">
                                  <div class="inner__input-item">
                                    <div class="input-item input-limit">
                                      <div class="input">
                                        <input type="text" class="input" maxlength="17"
                                          v-model="form.explainContent"
                                          placeholder="템플릿 이름을 입력해주세요."
                                          ref="explainContent"
                                        >
                                        <div class="input-limit__text">
                                          <p>{{ form.explainContent.length }}/17자</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="inner__input-box">
                                  <span class="form-item__label">로고</span>
                                  <div class="inner__input-item">
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
                                      <div class="input-item logoList">
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType1" value="logoType1"
                                            v-model="form.logoType"
                                          />
                                          <label for="logoType1"><span class="irtext">없음</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType1" value="logoType1"
                                            v-model="form.logoType"
                                          />
                                          <label for="logoType1"><span class="irtext">알림</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType2" value="logoType2"
                                            v-model="form.logoType"
                                          />
                                          <label for="logoType2"><span class="irtext">이벤트</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType3" value="logoType3"
                                            v-model="form.logoType"
                                          />
                                          <label for="logoType3"><span class="irtext">프로모션</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType4" value="logoType4"
                                            v-model="form.logoType"
                                          />
                                          <label for="logoType4"><span class="irtext">청구/영수증</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="logo" id="logoType5" value="logoType5"
                                            v-model="form.logoType"
                                          />
                                          <label for="logoType5"><span class="irtext">예약/일정안내</span></label>
                                        </span>
                                      </div>
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
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- //이미지 템플릿 신규 -->
                    <!-- //타이틀 -->
                    <!-- 본문 -->
                      <!-- 이미지 & 타이틀 강조형 -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">본문</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row addTemplate"
                              v-for="(body, index) in bodyTemplate"
                              :key="index"
                            >
                              <template v-if="body">
                                <div class="inner__input">
                                  <div class="inner__input-box">
                                    <span class="form-item__label">소제목</span>
                                    <div class="inner__input-item">
                                      <div class="input-item input-limit">
                                        <div class="input">
                                          <input type="text" class="input" maxlength="4"
                                            v-model="form.bodyTitle"
                                            placeholder="제목을 입력해주세요."
                                            ref="bodyTitle"
                                          >
                                          <div class="input-limit__text">
                                            <p>{{ form.bodyTitle.length }}/4자</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="inner__input">
                                  <div class="inner__input-box">
                                    <span class="form-item__label">내용</span>
                                    <div class="inner__input-item">
                                      <div class="input-item input-limit">
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
                                    </div>
                                  </div>
                                </div>
                              </template>
                              <ButtonCmp
                                type="btn-default-line"
                                size="small"
                                @click="removebody"
                              >
                                삭제
                              </ButtonCmp>
                            <ButtonCmp
                                type="btn-default-line"
                                size="small"
                                @click="Addbody"
                              >
                              추가
                              </ButtonCmp>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- //이미지 & 타이틀 강조형 -->
                      <!-- 이미지 강조형, 썸네일형(가로), SNS형, 이미지 템플릿 신규  -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">본문</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">제목</span>
                                  <div class="inner__input-item">
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
                                  </div>
                                </div>
                                <div class="inner__input-box" v-if="form.bodyTitleUse === 'Y'">
                                  <div class="inner__input-item">
                                    <div class="input-item input-limit">
                                      <div class="input">
                                        <input type="text" class="input" maxlength="17"
                                          v-model="form.bodyTitle"
                                          placeholder="템플릿 이름을 입력해주세요."
                                          ref="bodyTitle"
                                        >
                                        <div class="input-limit__text">
                                          <p>{{ form.bodyTitle.length }}/17자</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">내용</span>
                                  <div class="inner__input-item">
                                    <div class="input-item input-limit">
                                      <div class="textarea">
                                        <textarea maxlength="150" placeholder="내용을 입력해주세요."
                                        @input="e => form.bodyContent = e.target.value"
                                        ref="descContent"></textarea>
                                        <div class="textarea-limit__text">
                                          <Emoji @input="onSelectEmoji($event, 'descContent')"/>
                                          <p>
                                            {{ form.bodyContent.length }}/150자
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- //이미지 강조형, 썸네일형(가로), SNS형, 이미지 템플릿 신규 -->
                      <!-- 썸네일형(세로)  -->
                      <tr>
                        <th scope="row"><span class="form-item__label required">본문</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="bodyUse" id="bodyUseN" value="N" v-model="form.bodyUse"/>
                                  <label for="bodyUseN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="bodyUse" id="bodyUseY" value="Y" v-model="form.bodyUse"/>
                                  <label for="bodyUseY"><span class="radiobox__text">사용</span></label>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="form-item__content" v-if="form.bodyUse === 'Y'">
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">제목</span>
                                  <div class="inner__input-item">
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
                                  </div>
                                </div>
                                <div class="inner__input-box" v-if="form.bodyTitleUse === 'Y'">
                                  <div class="inner__input-item">
                                    <div class="input-item input-limit">
                                      <div class="input">
                                        <input type="text" class="input" maxlength="17"
                                          v-model="form.bodyTitle"
                                          placeholder="템플릿 이름을 입력해주세요."
                                          ref="bodyTitle"
                                        >
                                        <div class="input-limit__text">
                                          <p>{{ form.bodyTitle.length }}/17자</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="form-item-row">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">내용</span>
                                  <div class="inner__input-item">
                                    <div class="input-item input-limit">
                                      <div class="textarea">
                                        <textarea maxlength="150" placeholder="내용을 입력해주세요."
                                        @input="e => form.bodyContent = e.target.value"
                                        ref="descContent"></textarea>
                                        <div class="textarea-limit__text">
                                          <Emoji @input="onSelectEmoji($event, 'descContent')"/>
                                          <p>
                                            {{ form.bodyContent.length }}/150자
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- //썸네일형(세로) -->
                    <!-- //본문 -->
                    <!-- 상세 - 썸네일형(세로)-->
                    <tr>
                      <th scope="row"><span class="form-item__label required">상세</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row addTemplate"
                            v-for="(detail, index) in detailTemplate"
                            :key="index"
                          >
                            <template v-if="detail">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label required">이미지</span>
                                  <div class="inner__input-item">
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
                                  </div>
                                </div>
                              </div>
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">URL</span>
                                  <div class="inner__input-item">
                                    <div class="input-item input-limit">
                                    <div class="input">
                                      <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="form.imageURL"
                                      ref="imageURL"
                                      />
                                    </div>
                                  </div>
                                  </div>
                                </div>
                              </div>
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">내용</span>
                                  <div class="inner__input-item">
                                    <div class="input-item input-limit">
                                      <div class="textarea">
                                        <textarea maxlength="150" placeholder="내용을 입력해주세요."
                                        @input="e => form.bodyContent = e.target.value"
                                        ref="descContent"></textarea>
                                        <div class="textarea-limit__text">
                                          <Emoji @input="onSelectEmoji($event, 'descContent')"/>
                                          <p>
                                            {{ form.bodyContent.length }}/150자
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <ButtonCmp
                                type="btn-default-line"
                                size="small"
                                @click="removedetail"
                              >
                                삭제
                              </ButtonCmp>
                            <ButtonCmp
                                type="btn-default-line"
                                size="small"
                                @click="Adddetail"
                              >
                              추가
                              </ButtonCmp>
                            </template>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //상세 - 썸네일형(세로) -->
                    <!-- 이미지 - 썸네일형(가로)-->
                    <tr>
                      <th scope="row"><span class="form-item__label required">이미지</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row addTemplate"
                            v-for="(image, index) in imageTemplate"
                            :key="index"
                          >
                            <template v-if="image">
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label required">이미지</span>
                                  <div class="inner__input-item">
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
                                  </div>
                                </div>
                              </div>
                              <div class="inner__input">
                                <div class="inner__input-box">
                                  <span class="form-item__label">URL</span>
                                  <div class="inner__input-item">
                                    <div class="input-item input-limit">
                                    <div class="input">
                                      <input type="text" placeholder="http로 시작하는 URL 주소를 입력해주세요." v-model="form.imageURL"
                                      ref="imageURL"
                                      />
                                    </div>
                                  </div>
                                  </div>
                                </div>
                              </div>
                              <ButtonCmp
                                type="btn-default-line"
                                size="small"
                                @click="removeimage"
                              >
                                삭제
                              </ButtonCmp>
                            <ButtonCmp
                                type="btn-default-line"
                                size="small"
                                @click="Addimage"
                              >
                              추가
                              </ButtonCmp>
                            </template>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //이미지 - 썸네일형(가로) -->
                    <!-- 테이블 - 이미지 템플릿 신규-->
                    <tr>
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
                            <TemplateTable2Reg
                              :tableInfo="form.Table.info"
                              v-if="form.tableUse === 'Y'"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //테이블 - 이미지 템플릿 신규 -->
                    <!-- 버튼 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">버튼</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="btnUse" id="btnUseN" value="N" v-model="form.Buttons.use" @change="buttonUseCheck"/>
                                  <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="btnUse" id="btnUseY" value="Y" v-model="form.Buttons.use" @change="buttonUseCheck"/>
                                  <label for="btnUseY"><span class="radiobox__text">사용</span></label>
                                </span>
                              </div>
                            </div>
                        </div>
                        <TemplateButtonReg
                         :buttonInfo="form.Buttons.info"
                          v-if="form.Buttons.use === 'Y'"
                        />
                      </td>
                    </tr>
                    <!-- // 버튼 -->
                  </tbody>
                </table>
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
            <ChatEmulator
              :messageTemplate="messageTemplate"
              :messageData="form"
            />
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
              type="btn-line"
            >취소</ButtonCmp>
          </div>
          <div>
            <ButtonCmp
              type="btn-line"
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
import ChatEmulator from '@/views/brand/message/components/ChatEmulator.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import TemplateTable2Reg from '@/views/brand/message/components/TemplateTable2Reg.vue'
import TemplateButtonReg from '@/views/brand/message/components/TemplateButtonReg.vue'
// import Dropdown from '@/components/common/Dropdown.vue'
import Emoji from '@/components/common/Emoji.vue'
import { textTemplate } from '@/views/brand/message/templateData.js'
import 'emoji-picker-element'

export default {
  components: {
    ChatEmulator,
    PageTitle,
    BrandLnb,
    ButtonCmp,
    TemplateTable2Reg,
    TemplateButtonReg,
    // Dropdown,
    Emoji
  },
  data() {
    return {
      textTemplate,
      templateType: 'textTitle1',
      messageTemplate: '',
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
        titleUse: 'N',
        titleName: '',
        explainUse: 'N',
        explainContent: '',
        bodyUse: 'N',
        bodyTitleUse: 'N',
        bodyTitle: '',
        bodyContent: '',
        logoType: 'basicImage',
        tableUse: 'N',
        buttonUse: 'N',
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
            bgColor: '#2f77fb',
            btnEvent: '',
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
            bgColor: '#2f77fb',
            btnEvent: '',
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
        }
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
      }]
    }
  },
  mounted() {
    this.chkTypeChange()
    this.buttonUseCheck()
  },
  methods: {
    chkTypeChange() {
      this.textTemplate.forEach((item) => {
        if (item.templateType === this.templateType) {
          this.messageTemplate = Object.assign({}, item.cmp)
          // this.messageTemplate.cmp.forEach((cmp) => {
          //   Object.keys(cmp.data).forEach((key) => {
          //     cmp.data[key] = ''
          //   })
          // })
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
      if (this.form.Buttons.use === 'N') {
        this.templateData.forEach((item, i) => {
          if (item.type === 'Buttons') {
            this.templateData.splice(i, 1)
          }
        })
      } else {
        let buttonCmp = {
          type: 'Buttons',
          info: {}
        }
        buttonCmp.info = this.form.Buttons.info
        this.templateData.push(buttonCmp)
      }
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
    }
  }
}
</script>

<style>
</style>
