<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="템플릿 작성" />
        <div class="top-notice--gray">
          <ul>
            <li>- 템플릿은 승인 완료 후 사용 및 발송이 가능합니다.</li>
            <li>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</li>
          </ul>
        </div>
        <div>
         {{ form }} {{ form.manageTitle }},{{ form.buttonCheck }},  {{ form.customLogoFile  }}, {{ form.msgTitle }}, {{ form.descriptionTitle }}, {{ form.descriptionContent }}
        </div>
        <div class="template__wrap-add">
          <div class="template__register--wrap">
            <PageTitleH3
              noticeinfo="필수 입력 값"
            />
            <form  ref="form" :model="form">
                <div class="table__wrap">
                    <table class="table table-bodyonly form-table">
                      <colgroup>
                        <col width="190px">
                        <col />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th><span class="form-item__label">템플릿 ID</span></th>
                          <td colspan="2">
                            <div class="form-item__content">
                              UBR.13L49F42Mo-m81j7pQKu9ZyB3bbHvkkP76sc
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th><span class="form-item__label">템플릿 유형</span></th>
                          <td colspan="2">
                            <div class="form-item__content">
                              텍스트 템플릿
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th><span class="form-item__label">템플릿 이름</span></th>
                          <td colspan="2">
                            <div class="form-item__content">
                              타이틀 선택형1
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th><span class="form-item__label">제목</span></th>
                          <td colspan="2">
                            <div class="form-item__content">
                              <div class="form-item__content">
                                <div class="form-item-row">
                                  <div class="input-item input-limit">
                                      <span class="input">
                                        <input type="text" class="input"
                                          v-model="form.manageTitle"
                                          :placeholder="'관리용으로 사용될 템플릿 이름입니다.'"
                                        >
                                      </span>
                                    </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                  </table>
                </div>
                <!-- // 기본 정보 -->
                <PageTitleH3 titleh3="제목" noticeinfo="필수 입력 값" />
                <div class="table__wrap">
                  <table class="table table-bodyonly form-table">
                      <colgroup>
                        <col width="190px">
                        <col />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th><span class="form-item__label required">로고</span></th>
                          <td>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="logoImg" id="logoCustom" v-model="form.logoImg"  value="logoCustom"/>
                                    <label for="logoCustom"><span class="checkbox__text">직접 등록</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="logoImg" id="logoDefault"  v-model="form.logoImg"  value="logoDefalut" />
                                    <label for="logoDefault"><span class="checkbox__text">기본 이미지 사용</span></label>
                                  </span>
                                </div>
                                <template v-if="form.logoImg === 'logoCustom'">
                                  <div class="input-item">
                                    <span class="input"><input type="text" class="input"  :value="form.customLogoFile" disabled></span>
                                    <input type="file" id="fileUp" class="input blind" @change="onFileChanged">
                                    <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                                  </div>
                                  <p class="guide-text black">&middot; 사이즈 : 388 X 388px ~ 1080 X 1080px / 1:1 비율 / 파일형식: JPG, PNG (최대 5MB)</p>
                                </template>
                              </div>
                              <p class="guide-text error" v-if="logoImageErrorMsg">백그라운드 이미지를 선택하세요.</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th><span class="form-item__label required">제목</span></th>
                          <td>
                            <div class="form-item__content">
                              <div class="form-item__content">
                                <div class="form-item-row">
                                  <div class="is-emoji">
                                    <div class="input-item input-limit">
                                      <span class="input">
                                        <input type="text" class="input"
                                          maxlength="17"
                                          v-model="form.msgTitle"
                                          :placeholder="'제목을 입력해주세요'"
                                        >
                                        <ButtonCmp
                                          type="btn-only-icon"
                                          @click="showSpecialCharTitle = !showSpecialCharTitle"
                                          ><i class="icon-emoticon"></i>
                                        </ButtonCmp>
                                        <emoji-picker id="emojiPicker" @emoji-click="onSelectEmoji($event, 'menuTitle', j)" v-show="showSpecialCharTitle" class="light emoji-wrap"></emoji-picker>
                                        <p class="input-limit__text">
                                          {{ form.msgTitle.length }}/17자
                                        </p>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="userVariable">
                          <th><span class="form-item__label required">변수사용</span></th>
                          <td>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <Dropdown :options="CheCkuserVariable" />
                                </div>
                                <ButtonCmp
                                  type="btn-default-line"
                                >변수사용</ButtonCmp>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                  </table>
                </div>
                <!-- // 제목 end -->
                <template v-if="createrTable">
                <PageTitleH3 titleh3="테이블" noticeinfo="필수 입력 값" />
                <div class="table__wrap">
                  <table class="table table-bodyonly form-table">
                    <colgroup>
                      <col width="190px">
                      <col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th><span class="form-item__label required">제목</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="is-emoji">
                                  <div class="input-item input-limit">
                                    <span class="input">
                                      <input type="text" class="input" maxlength="30"
                                        v-model="tableTitle"
                                        :placeholder="'최대 30자 까지 입력할 수 있습니다.'"
                                      >
                                      <ButtonCmp
                                        type="btn-only-icon"
                                        @click="showSpecialCharTitle = !showSpecialCharTitle"
                                        ><i class="icon-emoticon"></i>
                                      </ButtonCmp>
                                      <emoji-picker id="emojiPicker" @emoji-click="onSelectEmoji($event, 'menuTitle', j)" v-show="showSpecialCharTitle" class="light emoji-wrap"></emoji-picker>
                                      <p class="input-limit__text">
                                        {{ form.itemTitle.length }}/30자
                                      </p>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th><span class="form-item__label required">내용</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                                <Dropdown :options="tableRows" @change="onSelectChange" />
                            </div>
                            <div class="form-item-row">
                                <dl class="template__setting--table">
                                  <dt>
                                      <ul>
                                        <li>테이블 1 {{ selectedValue }}</li>
                                        <li>
                                          <div class="checkbox">
                                            <input type="checkbox" id="allth" v-model="form.thlist" value=""/>
                                            <label for="allth"><span class="checkbox__text">배열 전체적용</span></label>
                                          </div>
                                        </li>
                                        <li>
                                          <div class="checkbox">
                                            <input type="checkbox" id="alltd" v-model="form.tdlist" value=""/>
                                            <label for="alltd"><span class="checkbox__text">배열 전체적용</span></label>
                                          </div>
                                        </li>
                                      </ul>
                                  </dt>
                                  <dd>
                                    <table class="table-list-sms">
                                      <colgroup>
                                        <col width="5%" />
                                        <col width="20%" />
                                        <col width="" />
                                      </colgroup>
                                      <head>
                                        <tr>
                                          <th>라인</th>
                                          <th>배열</th>
                                          <th>내용</th>
                                        </tr>
                                      </head>
                                      <tbody>
                                        <tr
                                         v-for="(row, index) in displayTableRows.length"
                                         :key="`row_${index}`"
                                        >
                                          <td>
                                            <div class="checkbox">
                                              <input type="checkbox" :id="`tableRow${index}`" value=""/>
                                              <label :for="`tableRow${index}`"><span class="checkbox__text irtext">행 선택</span></label>
                                            </div>
                                          </td>
                                          <td>
                                            <div class="input-item tableColSelect">
                                              <span class="radiobox">
                                                <input type="radio" :name="`tableColCout_${index}`" :id="`tableColCout1_${index}`" :checked="form.tableColCout === '1'" @change="form.tableColCout = '1'" value="1"/>
                                                <label :for="`tableColCout1_${index}`"><span class="checkbox__text">1열</span></label>
                                              </span>
                                              <span class="radiobox">
                                                <input type="radio" :name="`tableColCout_${index}`" :id="`tableColCout2_${index}`" :checked="form.tableColCout === '2'" @change="form.tableColCout = '2'" value="2"/>
                                                <label :for="`tableColCout2_${index}`"><span class="checkbox__text">2열</span></label>
                                              </span>
                                            </div>
                                          </td>
                                          <td>
                                            <div class="form-item__content">
                                              <div class="form-item__content">
                                                <div class="form-item-row">
                                                  <div class="is-emoji">
                                                    <div class="input-item">
                                                      <template v-if="form.tableColCout === '2'">
                                                        <span class="input is-edit">
                                                          <input type="text" class="input" maxlength="30"
                                                            v-model="textMsgth"
                                                            @focus="showFormat = !showFormat"
                                                            :placeholder="'표 제목을 입력해주세요'"
                                                          >
                                                          <div v-show="showFormat" class="customFomat">
                                                          <span class="radiobox">
                                                            <input type="radio" name="format" id="al" v-model="form.format"  value="alignL"/>
                                                            <label for="al"><span class="checkbox__text">왼쪽정열</span></label>
                                                          </span>
                                                          <span class="radiobox">
                                                            <input type="radio" name="format" id="ar" checked v-model="form.format"  value="alignR" />
                                                            <label for="ar"><span class="checkbox__text">오른쪽정열</span></label>
                                                          </span>
                                                          <span class="radiobox">
                                                            <input type="radio" name="font" id="tbold" checked v-model="form.format"  value="Bold" />
                                                            <label for="tbold"><span class="checkbox__text">볼드</span></label>
                                                          </span>
                                                          <span class="radiobox">
                                                            <input type="radio" name="font" id="tdefault" checked v-model="form.format"  value="default" />
                                                            <label for="tdefault"><span class="checkbox__text">디폴트</span></label>
                                                          </span>
                                                        </div>
                                                        </span>
                                                      </template>
                                                      <span class="input is-edit">
                                                        <input type="text" class="input" maxlength="30"
                                                          v-model="textMsgtd"
                                                          @focus="showFormat = !showFormat"
                                                          :placeholder="'디스크립션 제목을 입력해주세요'"
                                                        >
                                                        <div v-show="showFormat" class="customFomat">
                                                          <span class="radiobox">
                                                            <input type="radio" name="format" id="al" v-model="form.format"  value="alignL"/>
                                                            <label for="al"><span class="checkbox__text">왼쪽정열</span></label>
                                                          </span>
                                                          <span class="radiobox">
                                                            <input type="radio" name="format" id="ar" checked v-model="form.format"  value="alignR" />
                                                            <label for="ar"><span class="checkbox__text">오른쪽정열</span></label>
                                                          </span>
                                                          <span class="radiobox">
                                                            <input type="radio" name="font" id="tbold" checked v-model="form.format"  value="Bold" />
                                                            <label for="tbold"><span class="checkbox__text">볼드</span></label>
                                                          </span>
                                                          <span class="radiobox">
                                                            <input type="radio" name="font" id="tdefault" checked v-model="form.format"  value="default" />
                                                            <label for="tdefault"><span class="checkbox__text">디폴트</span></label>
                                                          </span>
                                                        </div>
                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </dd>
                                </dl>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- // 테이블 end -->
                </template>
                <template v-if="createrItem">
                <PageTitleH3 titleh3="아이템" noticeinfo="필수 입력 값" />
                <div class="table__wrap">
                  <table class="table table-bodyonly form-table">
                    <colgroup>
                      <col width="190px">
                      <col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th><span class="form-item__label required">메인 제목</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="is-emoji">
                                  <div class="input-item input-limit">
                                    <span class="input">
                                      <input type="text" class="input" maxlength="30"
                                        v-model="itemTitle"
                                        :placeholder="'메인 제목을 입력해주세요'"
                                      >
                                      <ButtonCmp
                                        type="btn-only-icon"
                                        @click="showSpecialCharTitle = !showSpecialCharTitle"
                                        ><i class="icon-emoticon"></i>
                                      </ButtonCmp>
                                      <emoji-picker id="emojiPicker" @emoji-click="onSelectEmoji($event, 'menuTitle', j)" v-show="showSpecialCharTitle" class="light emoji-wrap"></emoji-picker>
                                      <p class="input-limit__text">
                                        {{ form.itemTitle.length }}/30자
                                      </p>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th><span class="form-item__label required">서브 타이틀 제목</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="is-emoji">
                                  <div class="input-item input-limit">
                                    <span class="input">
                                      <input type="text" class="input" maxlength="30"
                                        v-model="itemsubTitle"
                                        :placeholder="'서브 타이틀 제목을 입력해주세요'"
                                      >
                                      <ButtonCmp
                                        type="btn-only-icon"
                                        @click="showSpecialCharTitle = !showSpecialCharTitle"
                                        ><i class="icon-emoticon"></i>
                                      </ButtonCmp>
                                      <emoji-picker id="emojiPicker" @emoji-click="onSelectEmoji($event, 'menuTitle', j)" v-show="showSpecialCharTitle" class="light emoji-wrap"></emoji-picker>
                                      <p class="input-limit__text">
                                        {{ form.itemsubTitle.length }}/30자
                                      </p>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th><span class="form-item__label required">이미지</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="logoImg" id="itemImgCustom" v-model="form.customImg"  value="itemImgCustom"/>
                                  <label for="itemImgCustom"><span class="checkbox__text">직접 등록</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="logoImg" id="itemImgDefault"  v-model="form.defaultImg"  value="itemImgDefault" />
                                  <label for="itemImgDefault"><span class="checkbox__text">기본 이미지 사용</span></label>
                                </span>
                              </div>
                              <template v-if="form.imgImg === 'itemImgCustom'">
                                <div class="input-item">
                                  <span class="input"><input type="text" class="input"  :value="form.custImg" disabled></span>
                                  <input type="file" id="fileUp" class="input blind" @change="onFileChanged2">
                                  <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                                </div>
                                <p class="guide-text black">&middot; 사이즈 : 388 X 388px ~ 1080 X 1080px / 1:1 비율 / 파일형식: JPG, PNG (최대 5MB)</p>
                              </template>
                            </div>
                            <p class="guide-text error" v-if="itemImageErrorMsg">백그라운드 이미지를 선택하세요.</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </template>
                <!-- // 아이템 end -->
                <template v-if="createDescription">
                <PageTitleH3 titleh3="디스크립션" noticeinfo="필수 입력 값" />
                <div class="table__wrap">
                  <table class="table table-bodyonly form-table">
                    <colgroup>
                      <col width="190px">
                      <col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th><span class="form-item__label required">제목</span></th>
                        <td>
                          <div class="form-item__content">
                            <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="is-emoji">
                                  <div class="input-item input-limit">
                                    <span class="input">
                                      <input type="text" class="input" maxlength="30"
                                        v-model="descriptionTitle"
                                        :placeholder="'디스크립션 제목을 입력해주세요'"
                                      >
                                      <ButtonCmp
                                        type="btn-only-icon"
                                        @click="showSpecialCharTitle = !showSpecialCharTitle"
                                        ><i class="icon-emoticon"></i>
                                      </ButtonCmp>
                                      <emoji-picker id="emojiPicker" @emoji-click="onSelectEmoji($event, 'menuTitle', j)" v-show="showSpecialCharTitle" class="light emoji-wrap"></emoji-picker>
                                      <p class="input-limit__text">
                                        {{ form.descriptionTitle.length }}/30자
                                      </p>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th><span class="form-item__label required">내용</span></th>
                        <td>
                          <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item input-limit">
                                  <div class="textarea">
                                      <textarea maxlength="300"
                                        v-model="descriptionContent"
                                        placeholder="브랜드의 슬로건이나 브랜드 특징을 나타내는 소개글을 입력해주세요."></textarea>
                                      <div class="textarea-limit__text">
                                        <p>
                                          {{ form.descriptionContent.length }} /300자
                                        </p>
                                      </div>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                      <!-- // 디스크립션 end -->
                </template>
                <!-- // 디스크립션 end -->
                <div class="table__wrap no-line">
                  <table class="table table-bodyonly form-table">
                    <colgroup>
                      <col width="190px">
                      <col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th><span class="form-item__label">버튼</span></th>
                        <td>
                          <div class="form-item__content">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseN" v-model="form.buttonCheck" value="btnUseN"/>
                                    <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                  </span>
                                  <span class="radiobox">
                                    <input type="radio" name="btnUse" id="btnUseY" v-model="form.buttonCheck" value="btnUseY"/>
                                    <label for="btnUseY"><span class="radiobox__text">사용</span></label>
                                  </span>
                                </div>
                              </div>
                          </div>
                          <template v-if="form.buttonCheck === 'btnUseY'">
                            <div class="table__wrap no-line">
                              <table class="table table-bodyonly">
                                <colgroup>
                                  <col width="100px">
                                  <col />
                                </colgroup>
                                <tbody>
                                  <tr>
                                    <th><span class="form-item__label required">배경색</span></th>
                                    <td>
                                      <div class="form-item__content">
                                          <div class="form-item-row">
                                            <div class="input-item">
                                              <span class="radiobox">
                                                <input type="radio" name="btncolor" id="btncolor1" v-model="form.btncolor" value="basiCcolor"/>
                                                <label for="btncolor1"><span class="radiobox__text">기본색</span></label>
                                              </span>
                                              <span class="colorbox"
                                                :style="{ background: this.colors[3] }"></span>
                                              <span class="radiobox">
                                                <input type="radio" name="btncolor" id="btncolor2" v-model="form.brandColor" value="brandColor"/>
                                                <label for="btncolor2"><span class="radiobox__text">브랜드 색</span></label>
                                              </span>
                                              <span class="colorbox" :style="{ background: form.brandColor }"></span>
                                              <el-color-picker v-model="form.brandColor"></el-color-picker>
                                            </div>
                                          </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th><span class="form-item__label required">버튼</span></th>
                                    <td>
                                      <div class="form-item__content">
                                        <div class="form-item-row">
                                          <Dropdown :options="buttonSelect" />
                                        </div>
                                      </div>
                                      <dl>
                                        <dt>버튼1</dt>
                                        <dd>
                                          <div class="form-item__content is-emoji">
                                            <div class="input-item input-limit w--full" >
                                                <div class="input">
                                                    <input type="text" class="input" maxlength="20"
                                                      placeholder="사용자에게 보여지는 버튼이름을 입력해주세요."
                                                    >
                                                    <ButtonCmp
                                                      type="btn-only-icon"
                                                      ><i class="icon-emoticon"></i>
                                                    </ButtonCmp>
                                                    <p class="input-limit__text">
                                                      {{  }}/20자
                                                    </p>
                                                  </div>
                                                </div>
                                                <div class="input-item w--full">
                                                  <Dropdown placeholder="선택하세요"
                                                  />
                                                </div>
                                          </div>
                                        </dd>
                                      </dl>
                                      <dl>
                                        <dt>버튼2</dt>
                                        <dd>
                                          <div class="form-item__content is-emoji">
                                            <div class="input-item input-limit w--full" >
                                                <div class="input">
                                                    <input type="text" class="input" maxlength="20"
                                                      placeholder="사용자에게 보여지는 버튼이름을 입력해주세요."
                                                    >
                                                    <ButtonCmp
                                                      type="btn-only-icon"
                                                      ><i class="icon-emoticon"></i>
                                                    </ButtonCmp>
                                                    <p class="input-limit__text">
                                                      {{  }}/20자
                                                    </p>
                                                  </div>
                                                </div>
                                                <div class="input-item w--full">
                                                  <Dropdown placeholder="선택하세요"
                                                  />
                                                </div>
                                          </div>
                                        </dd>
                                      </dl>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </template>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </form>
            <div class="top-notice--gray">
              <ul>
                  <li>- 변수로 설정하고자 하는 내용을 {{ }} 표시로 작성해주세요. 예) {{이름}}, {{data}} </li>
                  <li>- 변수명은 20자 이내의 한글, 영문, 숫자, ‘-’만 가능합니다. </li>
                  <li>- 특수문자, 공란, 줄바꿈 그리고 {{descroption}} 변수명 사용 불가합니다. </li>
                  <li>※ 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다. 메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요. (90자 초과시 전송 불가)</li>
              </ul>
            </div>
          </div>
          <div class="emulator__wrap sticky">
            <ChatEmulator
             :templateData="form"
            />
          </div>
        </div>
        <div class="checkbox">
            <input type="checkbox" id="yakguanAgree" v-model="form.agree" value=""/>
            <label for="yakguanAgree"><span class="checkbox__text">정보성 메시지만 보낼 수 있으며 광고 등 정책에 위배되는 메시지 발송 시 템플릿 사용이 중지될 수 있음을 동의합니다.</span></label>
        </div>
        <div class="button__wrap space-between">
          <div class="btn-left">
            <ButtonCmp
              type="btn-line"
              @click="saveTemp"
            >삭제</ButtonCmp>
          </div>
          <div class="btn-right">
            <ButtonCmp
              type="btn-blue-line"
              @click="saveTemp"
            >임시 저장</ButtonCmp>
            <ButtonCmp
              type="btn-blue"
              :disabled = "isDisabled"
              @click="onSubmit"
            >저장</ButtonCmp>
          </div>
        </div>
        <!-- // 템플릿 작성 -->
      </div>
    </div>
  </div>
</template>
<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import 'emoji-picker-element'

let colors = [
  '#232323',
  '#404040', '#941527', '#b91724', '#bd462d',
  '#641432', '#c0537e', '#ac3f68', '#af6d4c',
  '#967240', '#583029', '#816d33', '#69692b',
  '#004326', '#155a10', '#3b7728', '#46804c',
  '#1a8b9e', '#1888c0', '#4483cf', '#0a386c',
  '#4d65cb', '#6264bb', '#665ba6', '#764f93',
  '#4e2d56', '#86487b', '#b85c9f', '#252525',
  '#58AEF2'
]

export default {
  name: 'Template',
  components: {
    BrandLnb,
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    Dropdown,
    ChatEmulator
  },
  data () {
    return {
      form: {
        manageTitle: '',
        custemImg: '',
        defaultImg: '',
        msgTitle: '',
        msgDesTitle: '',
        msgDesCont: '',
        buttonCheck: 'btnUseN',
        agree: false,
        logoImgFileUrl: '',
        userVariable: [],
        itemTitle: '',
        itemsubTitle: '',
        imgImg: '',
        descriptionContent: '',
        descriptionTitle: '',
        itemImgFileUrl: '',
        customLogoFile: '',
        colors: '',
        basicLogologo: '',
        tableTitle: '',
        tableColCout: '2',
        tableRow: false,
        displayTableRows: '1',
        btncolor: '',
        brandColor: '',
        custImg: ''
      },
      showFormat: false,
      CheCkuserVariable: [
        {
          label: '변수 선택',
          value: '변수 선택'
        }
      ],
      tableRows: [
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
        }
      ],
      displayTableRows: [
        {
          'chek': '',
          'thName': ''
        }
      ],
      buttonSelect: [
        {
          label: '1개',
          value: '1개'
        },
        {
          label: '2개',
          value: '2개'
        }
      ],
      selectedValue: '',
      showSpecialCharTitle: false, // 특수문자 선택창 show 여부
      logoImageErrorMsg: false,
      itemImageErrorMsg: false,
      createDescription: false,
      createrTable: false,
      createrItem: false,
      userVariable: false
    }
  },
  created() {
    this.colors = colors
  },
  computed: {
    isDisabled() {
      return !this.form.agree
    }
  },
  mounted () {
    if (this.$route.query.type === 'smsType001') {
      this.createDescription = true
      // 공통 제목 노출
      // 타이틀 선택형 1 디스크립션 노출
    } else if (this.$route.query.type === 'smsType002') {
      this.createrTable = true
      // 타이틀 선택형 2 테이블 노출
    } else if (this.$route.query.type === 'smsType003') {
      this.userVariable = true
      this.createDescription = true
      // 타이틀 자유형1 변수 & 디스크립션 노출
    } else if (this.$route.query.type === 'smsType004') {
      this.userVariable = true
      this.createrTable = true
      // 타이틀 자유형1 변수 & 테이블 노출
    } else if (this.$route.query.type === 'smsType005') {
      this.createrItem = true
      this.createDescription = true
      // 아이템 강조형1 아이템 & 디스크립션 노출
    } else if (this.$route.query.type === 'smsType006') {
      this.createrItem = true
      this.createrTable = true
      // 아이템 강조형2 아이템 & 테이블 노출
    }
  },
  methods: {
    toggleFormat () {
      console.log('dd')
      this.showFormat = !this.showFormat
    },
    onSelectEmoji(e, field, index) {
      let code = e.detail.unicode
      if (field === 'menuTitle') {
        this.form.chatMenuData[index].menuTitle += code
        this.showSpecialCharTitle = false
      }
    },
    onFileChanged (e) {
      const files = e.target.files
      const fileName = files[0].name
      const file = e.target.files[0]
      this.form.customLogoFile = fileName
      this.url = URL.createObjectURL(file)
    },
    onSelectChange(value) {
      let trCount = parseInt(value)
      if (trCount > this.displayTableRows.length) {
        let newTr = {
          'chek': '',
          'thName': ''
        }
        for (let i = this.displayTableRows.length; i < trCount; i++) {
          this.displayTableRows.push(newTr)
        }
      } else if (trCount < this.displayTableRows.length) {
        this.displayTableRows.splice(trCount)
      }
    },
    updateCheckboxes(index) {
      this.form.tableRow = this.form.tableRow.map(() => false)
      this.$set(this.form.tableRow, index, true)
    }
  }
}
</script>

<style lang="scss">

</style>
