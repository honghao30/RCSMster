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
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <input type="text" maxlength="30" v-model="templateNameId"   />
                                </div>
                              </div>
                            </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //템플릿 ID -->
                    <!-- 템플릿 유형 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">템플릿 유형</span></th>
                      <td>
                        <span class="text">LMS 템플릿(템플릿 유형)</span>
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
                    <tr class="bdBottom-bg">
                      <th scope="row"><span class="form-item__label required">템플릿 명</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <input type="text" placeholder="템플릿 이름을 입력하세요." maxlength="30" v-model="templateName"
                                  ref="templateTitle"
                                  />
                                  <div class="input-limit__text">
                                    <p>{{ templateName.length }}/30자</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //템플릿 명 -->
                    <!-- 타이틀 -->
                      <!-- 장문형, 문단형, 청구서형 -->
                      <tr v-if="isLmsType1 || isLmsType3 || isLmsType4">
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
                      <tr class="bdBottom-bg" v-if="isLmsType1 || isLmsType3 || isLmsType4">
                        <th scope="row"><span class="form-item__label required">타이틀 - 제목</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <input type="text"
                                    class="input"
                                    maxlength="17"
                                    ref="mainTitle"
                                    @input="e => form.MainTitle.info.mainTitle = e.target.value"
                                    placeholder="제목을 입력해주세요."
                                  >
                                  <div class="input-limit__text">
                                    <Emoji @input="onSelectEmoji($event, 'mainTitle')" />
                                    <p>{{ form.MainTitle.info.mainTitle.length }}/17자</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- //장문형, 문단형, 청구서형 -->
                      <!-- 타이틀 강조형 -->
                      <tr v-if="isLmsType2">
                        <th scope="row"><span class="form-item__label required">타이틀 - 제목</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <input type="text"
                                    class="input"
                                    maxlength="17"
                                    ref="mainTitle"
                                    @input="e => form.MainTitle.info.mainTitle = e.target.value"
                                    placeholder="제목을 입력해주세요."
                                  >
                                  <div class="input-limit__text">
                                    <Emoji @input="onSelectEmoji($event, 'mainTitle')" />
                                    <p>{{ form.MainTitle.info.mainTitle.length }}/17자</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="isLmsType2">
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
                                    <p>{{ form.MainTitle.info.mainExplain.length }}/20자</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="bdBottom-bg" v-if="isLmsType2">
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
                      <!-- //타이틀 강조형 -->
                    <!-- //타이틀 -->
                    <!-- 본문 - 장문형, 타이틀 강조형, 청구서형-->
                    <tr v-if="isLmsType1 || isLmsType2 || isLmsType4">
                      <th scope="row"><span class="form-item__label required">본문 - 소제목</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="radiobox">
                                <input type="radio" name="minititleuser" id="minititleN" value="minititleN"
                                  v-model="form.title.minititleuser"
                                />
                                <label for="minititleN">미사용</label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" name="minititleuser" id="minititleY" value="minititleY"
                                  v-model="form.title.minititleuser"
                                />
                                <label for="minititleY">사용</label>
                              </span>
                            </div>
                            <template v-if="form.title.minititleuser === 'minititleY'">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <input type="text"
                                    class="input"
                                    maxlength="20"
                                    ref="miniTitle"
                                    v-model="form.title.minititle"
                                    @input="e => form.title.minititle = e.target.value"
                                    placeholder="제목을 입력해주세요."
                                  >
                                  <div class="input-limit__text">
                                    <Emoji @input="onSelectEmoji($event, 'miniTitle')" />
                                    <p>{{ form.title.minititle.length }}/20자</p>
                                  </div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="bdBottom-bg" v-if="isLmsType1 || isLmsType2 || isLmsType4">
                      <th scope="row"><span class="form-item__label required">본문 - 내용</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item input-limit">
                              <div class="textarea">
                                <textarea maxlength="1300" placeholder="내용을 입력해주세요."
                                @input="e => form.Description.info.description = e.target.value"
                                ref="descContent"></textarea>
                                <div class="textarea-limit__text">
                                  <Emoji @input="onSelectEmoji($event, 'descContent')"/>
                                  <p>
                                    {{ form.Description.info.description.length }}/1,300자
                                  </p>
                                </div>
                              </div>
                            </div>
                            <p class="guide-text error">내용을 선택해주세요.</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- //본문 - 장문형, 타이틀 강조형, 청구서형 -->
                    <!-- 본문 & 버튼 - 문단형 -->
                      <!-- 본문 1 -->
                      <tr v-if="isLmsType3">
                        <th scope="row"><span class="form-item__label required">본문1 - 소제목</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="minititle1user" id="minititle1N" value="minititle1N"
                                    v-model="form.title.minititle1user"
                                  />
                                  <label for="minititle1N">미사용</label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="minititle1user" id="minititle1Y" value="minititle1Y"
                                    v-model="form.title.minititle1user"
                                  />
                                  <label for="minititle1Y">사용</label>
                                </span>
                              </div>
                              <template v-if="form.title.minititle1user === 'minititle1Y'">
                                <div class="input-item input-limit">
                                  <div class="input">
                                    <input type="text"
                                      class="input"
                                      maxlength="20"
                                      ref="minititle1"
                                      v-model="form.title.minititle1"
                                      @input="e => form.title.minititle1 = e.target.value"
                                      placeholder="최대 17자 까지 입력할 수 있습니다."
                                    >
                                    <div class="input-limit__text">
                                      <Emoji @input="onSelectEmoji($event, 'minititle1')" />
                                      <p>{{ form.title.minititle1.length }}/20자</p>
                                    </div>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="isLmsType3">
                        <th scope="row"><span class="form-item__label required">본문1 - 내용</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="textarea">
                                  <textarea maxlength="1300" placeholder="내용을 입력해주세요."
                                  @input="e => form.Description.info.description = e.target.value"
                                  ref="descContent"></textarea>
                                  <div class="textarea-limit__text">
                                    <Emoji @input="onSelectEmoji($event, 'descContent')"/>
                                    <p>
                                      {{ form.Description.info.description.length }}/1,300자
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <p class="guide-text error">내용을 선택해주세요.</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="isLmsType3" v-for="(button,index) in form.Buttons.info" :key="index">
                        <th scope="row"><span class="form-item__label">본문1 - 버튼{{ index + 1 }} </span></th>
                        <td>
                          <TemplateButtonReg
                          :buttonInfo="button"
                          />
                        </td>
                      </tr>
                      <tr class="bdBottom-bg" v-if="isLmsType3">
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
                      <!-- 본문 2 -->
                      <tr v-if="isLmsType3">
                        <th scope="row"><span class="form-item__label required">본문2 - 소제목</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="minititle2user" id="minititle2N" value="minititle2N"
                                    v-model="form.title.minititle2user"
                                  />
                                  <label for="minititle2N">미사용</label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="minititle2user" id="minititle2Y" value="minititle2Y"
                                    v-model="form.title.minititle2user"
                                  />
                                  <label for="minititle2Y">사용</label>
                                </span>
                              </div>
                              <template v-if="form.title.minititle2user === 'minititle2Y'">
                                <div class="input-item input-limit">
                                  <div class="input">
                                    <input type="text"
                                      class="input"
                                      maxlength="20"
                                      ref="minititle2"
                                      v-model="form.title.minititle2"
                                      @input="e => form.title.minititle2 = e.target.value"
                                      placeholder="제목을 입력해주세요."
                                    >
                                    <div class="input-limit__text">
                                      <Emoji @input="onSelectEmoji($event, 'minititle2')" />
                                      <p>{{ form.title.minititle2.length }}/20자</p>
                                    </div>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="isLmsType3">
                        <th scope="row"><span class="form-item__label required">본문2 - 내용</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="textarea">
                                  <textarea maxlength="1300" placeholder="내용을 입력해주세요."
                                  @input="e => form.Description.info.description = e.target.value"
                                  ref="descContent"></textarea>
                                  <div class="textarea-limit__text">
                                    <Emoji @input="onSelectEmoji($event, 'descContent')"/>
                                    <p>
                                      {{ form.Description.info.description.length }}/1,300자
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <p class="guide-text error">내용을 선택해주세요.</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="isLmsType3" v-for="(button,index) in form.Buttons.info" :key="index">
                        <th scope="row"><span class="form-item__label">본문2 - 버튼{{ index + 1 }} </span></th>
                        <td>
                          <TemplateButtonReg
                          :buttonInfo="button"
                          />
                        </td>
                      </tr>
                      <tr class="bdBottom-bg" v-if="isLmsType3">
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
                    <!-- //본문 & 버튼 - 문단형 -->
                    <!-- 테이블 & 버튼 - 청구서형  -->
                      <!-- 테이블1 -->
                      <tr v-if="isLmsType4">
                        <th scope="row"><span class="form-item__label required">테이블1 - 제목</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <input type="text" placeholder="제목을 입력해주세요." maxlength="17" v-model="form.Table.tableTitle"
                                  ref="tableTitle"
                                  />
                                  <div class="input-limit__text">
                                    <p>{{ form.Table.tableTitle.length }}/17자</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="isLmsType4">
                        <th scope="row"><span class="form-item__label required">테이블1 - 내용</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <template>
                                <TemplateTableReg
                                  :tableInfo="form.Table.info"
                                />
                              </template>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="isLmsType4" v-for="(button,index) in form.Buttons.info" :key="index">
                        <th scope="row"><span class="form-item__label">테이블1 - 버튼{{ index + 1 }} </span></th>
                        <td>
                          <TemplateButtonReg
                          :buttonInfo="button"
                          />
                        </td>
                      </tr>
                      <tr class="bdBottom-bg" v-if="isLmsType4">
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
                      <!-- 테이블2 -->
                      <tr v-if="isLmsType4">
                        <th scope="row"><span class="form-item__label required">테이블2 - 제목</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="input">
                                  <input type="text" placeholder="제목을 입력해주세요." maxlength="17" v-model="form.Table2.tableTitle"
                                  ref="tableTitle"
                                  />
                                  <div class="input-limit__text">
                                    <p>{{ form.Table2.tableTitle.length }}/17자</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="isLmsType4">
                        <th scope="row"><span class="form-item__label required">테이블2 - 내용</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <template>
                                <TemplateTableReg
                                  :tableInfo="form.Table .info"
                                />
                              </template>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="isLmsType4" v-for="(button,index) in form.Buttons.info" :key="index">
                        <th scope="row"><span class="form-item__label">테이블2 - 버튼{{ index + 1 }} </span></th>
                        <td>
                          <TemplateButtonReg
                          :buttonInfo="button"
                          />
                        </td>
                      </tr>
                      <tr class="bdBottom-bg" v-if="isLmsType4">
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
                    <!-- //테이블 & 버튼 - 청구서형  -->
                    <!-- 버튼 - 장문형, 타이틀 강조형 -->
                    <tr v-if="isLmsType1 || isLmsType2" v-for="(button,index) in form.Buttons.info" :key="index">
                      <th scope="row"><span class="form-item__label">버튼{{ index + 1 }} </span></th>
                      <td>
                        <TemplateButtonReg
                         :buttonInfo="button"
                        />
                      </td>
                    </tr>
                    <tr v-if="isLmsType1 || isLmsType2">
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
                    <!-- //버튼 - 장문형, 타이틀 강조형 -->
                  </tbody>
                </table>
              </div>
              <div class="form-btm__text">
                <!--
                <template v-if="templateType === 'textTitleCustom1' || templateType === 'textTitleCustom2'">
                  <p class="guide-text black">&middot; 변수로 설정하고자 하는 내용을 {{ }} 표시로 작성해주세요. 예) {{이름}}, {{date}}</p>
                  <p class="guide-text black">&middot; 특수문자, 공란, 줄바꿈 그리고 {{description}} 변수명 사용 불가합니다.</p>
                  <p class="guide-text black">&middot; 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</p>
                </template>
                <p class="guide-text black">&middot; 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</p>
                 -->
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
            <TempEmulator
              :templateType="templateType"
              :templData="form"
            />
            <!-- :templateData="templateData" -->
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
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import TempEmulator from '@/views/brand/message/components/TempEmulator.vue'
import TemplateButtonReg from '@/views/brand/message/components/TemplateButtonReg.vue'
import TemplateTableReg from '@/views/brand/message/components/TemplateTableReg.vue'
import TemplateTitleReg from '@/views/brand/message/components/TemplateTitleReg.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    Emoji,
    TempEmulator,
    TemplateButtonReg,
    TemplateTableReg,
    TemplateTitleReg
  },
  data() {
    return {
      templateNameId: 'UBR.13L49F42Mo-8MwF1zkPHUj3xayCJsg3OcPv2',
      templateType: 'textTitle1',
      templateName: '',
      templateData: [],
      templateProp: 'desc',
      form: {
        logoType: 'basicImage',
        logoFile: '',
        explainUse: 'N',
        title: {
          minititle: '',
          minititleuser: 'minititleN',
          minititle1: '',
          minititle1user: 'minititle1N',
          minititle2: '',
          minititle2user: 'minititle2N'
        },
        stitle: '',
        MainTitle: {
          info: {
            mainTitle: '',
            mainExplain: '',
            titleType: '',
            varUse: 'Y',
            logoUse: 'Y',
            logoUrl: '',
            mainDesc: ''
          }
        },
        Description: {
          user: 'DescriptionN',
          info: {
            description: ''
          }
        },
        Table: {
          tableTitle: '',
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
        Table2: {
          tableTitle: '',
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
        }
      },
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
      isSelectType: false,
      isFreeType: false,
      isLmsType1: false,
      isLmsType2: false,
      isLmsType3: false,
      isLmsType4: false
    }
  },
  mounted() {
    this.initTemplate(3)
    this.buttonUseCheck()
    if (this.$route.query.type === 'lms1') {
      this.isLmsType1 = true
      this.templateType = '장문형'
    } else if (this.$route.query.type === 'lms2') {
      this.isLmsType2 = true
      this.templateType = '문단형'
    } else if (this.$route.query.type === 'lms3') {
      this.isLmsType3 = true
      this.templateType = '타이틀 강조형'
    } else if (this.$route.query.type === 'lms4') {
      this.isLmsType4 = true
      this.templateType = '청구서형'
    }
  },
  methods: {
    initTemplate(templateNum) {
      this.templateData = this.textTemplate[templateNum]
      console.log(this.textTemplate[templateNum])
      this.templateData.forEach((item) => {
        let type = item.type
        Object.keys(this.form).forEach((key) => {
          if (type === key) {
            item.info = this.form[key].info
          }
        })
      })
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
    // 이미지 파일 업로드
    onFileChanged (e) {
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      this.form.logoFile = fileName
      this.url = URL.createObjectURL(file)
    },
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
    },
    onSubmit () {
    }
  }
}
</script>
