<template>

  <div class="rcs_container service_wrap">

    <article id="content" class="content">
      <!-- 대시보드 > 기업 정보 -->
      <div class="box_breadcrumb">
        <ul class="breadcrumb">
          <li class="home">
            <a href="javascript:void(0);">홈</a>
          </li>
          <li>
            <a href="javascript:void(0);" @click="moveRoute('/feed/dashboard')">브랜드 소식 관리</a>
          </li>
          <li>
            <a href="javascript:void(0);" @click="moveRoute('/feed/list')">소식 목록</a>
          </li>
          <li>
            <span>소식 상세</span>
          </li>
        </ul>
      </div>

      <div class="top_business_area">
        <div class="inner">
          <strong class="title">{{corpInfo.name}}</strong>
        <div class="desc_area">
            <span>{{userInfo.corpId}}</span>
            <span>{{ corpInfo.aprvReqDt | prettyDate('YYYY-MM-DD') }}</span>
        </div>
        </div>
      </div>

      <div class="contents_wrap callerid_wrap">
        <div class="title_area mar_t50 mar_b30">
            <h3 class="h3_title">소식 상세</h3>
        </div>

       <div class="rbc_bundle_wrap auto_wrap">
          <div class="rbc_emul_form_wrap">
            <!-- depth1 -->
            <div class="rbc_emul_form_cont">
              <div class="rbc_item_bundle">
                <strong class="rbc_tit_bundle">상태</strong>
                <div v-if="statusNum === 0 " class="rbc_cont_bundle">저장</div>
                <div v-if="statusNum === 1 " class="rbc_cont_bundle">게시</div>
                <div v-if="statusNum === 2 " class="rbc_cont_bundle">예약 게시</div>
                <div v-if="statusNum === 3 " class="rbc_cont_bundle">숨김 게시</div>
                <div v-if="statusNum === 4 " class="rbc_cont_bundle">비공개</div>
              </div>
              <div class="rbc_item_bundle">
                <strong class="rbc_tit_bundle">소식 ID</strong>
                <!-- 2021.08.05 RBC고도화수정4-->
                <div class="rbc_cont_bundle positionRelative">
                  {{feedId}}
                  <div class="url_copy"  v-if="statusNum !== 0">

                    <span class="url">{{copyUrl}}</span>
                    <span class="url copy" v-show="copyUrlShow">복사되었습니다.</span>

                    <a href="javascript:void(0);" class="btn sml bd_black" @click="copyUrlToast()">
                      <span>복사</span>
                    </a>
                  </div>
                </div>
                <!-- // 2021.08.05 RBC고도화수정4 -->
              </div>
              <div class="rbc_item_bundle">
                <strong class="rbc_tit_bundle">브랜드</strong>
                <div class="rbc_cont_bundle">
                  {{selBrand.brandName}}
                </div>
              </div>
              <div class="rbc_item_bundle">
                <strong class="rbc_tit_bundle">유형</strong>
                <div class="rbc_cont_bundle">
                  {{typeName}}
                </div>
              </div>

              <div class="rbc_item_bundle">
                <strong class="rbc_tit_bundle">제목 <span class="require">*</span></strong>
                <div class="rbc_cont_bundle">
                  <div class="length_area">
                    <span class="custom_input">
                      <input v-model.trim="title" type="text" placeholder="제목을 입력해 주세요." oninput="javascript: if (this.value.length > 40) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 40);">
                    </span>
                    <span class="length">(<em>{{title.length}}</em>/40)</span>
                  </div>
                </div>
              </div>
              <div class="rbc_item_bundle" v-if="type !== 'slide' ">
                <strong class="rbc_tit_bundle">내용</strong>
                <div class="rbc_cont_bundle">
                  <div class="content_text_info mar_b25">
                    <h4 class="h4_title">
                      내용은 최대 2,000자 이내의<br>
                      한글, 영문, 숫자, 언더바, 특수문자(자판에서 제공되는)로 작성 가능합니다.
                    </h4>
                  </div>
                  <div class="length_area">
                    <span class="custom_textarea">
                      <textarea v-model.trim="description" class="hei_115" placeholder="내용을 입력해 주세요." required @keyup="changeDescription('mainDescription', 'mainDescription')" oninput="javascript: if (this.value.length > 2000) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 2000);"></textarea>
                    </span>
                    <span class="length">(<em>{{description.length}}</em>/2000)</span>
                  </div>
                </div>
              </div>

              <!-- gallery type-->
              <div class="rbc_item_bundle" v-if="type == 'gallery' ">
                <strong class="rbc_tit_bundle">
                  이미지 <span class="require">*</span>
                  <span class="positionRelative">
                    <button class="icon_info">툴팁</button>
                    <span class="message nowrap">
                      <span class="ico_bar">이미지는 가로 최소 700px, 세로 600px~1080px, 3MB까지 가능 합니다.</span> <!-- 2021.09.23 RBC고도화수정1 -->
                      <span class="ico_bar">소식 메인 화면에 노출되는 이미지는 700px X 700px이며,<br> 초과하는 이미지 central crop하여 노출 됩니다.</span>
                    </span>
                  </span>
                </strong>
                <div class="rbc_cont_bundle" style="position: relative;">
                  <div class="content_text_info mar_b10">
                    <h4 class="h4_title">
                      - 이미지는 필수 1장, 최대 10장까지 등록 가능 합니다.<br>
                      - 권장 이미지 사이즈(700px X 600~1080px)/ jpg, png, gif (용량 최대 3MB) <!-- 2021.09.23 RBC고도화수정2 -->
                    </h4>
                    <div class="pos_tr">
                      <a href="javascript:void(0);" class="btn sml bd_black" @click="showLayer()">
                        <span>썸네일 보기</span>
                      </a>
                    </div>
                  </div>
                  <!-- upload -->
                  <div class="image_upload">

                    <!-- image -->
                    <div class="image" v-for="(file, index) in media" :key="index">
                      <div class="i_block">
                        <img :src="file.preview" />
                      </div>
                      <div class="button">
                        <!--<span class="prev" @click="fileUpButton" :index="index">왼쪽으로 이동</span>-->
                        <a href="javascript:void(0);" class="prev" @click="fileUpButton" :index="index">왼쪽으로 이동</a>
                        <a href="javascript:void(0);" class="next" @click="fileDownButton" :index="index">오른쪽으로 이동</a>
                        <a href="javascript:void(0)" class="delete" @click="fileDeleteButton" :index="file.orderNo">삭제</a>
                      </div>
                    </div>
                    <!-- //image -->
                    <input v-if="media.length < 10" type="file" id="file" ref="files" @change="imageUpload" multiple class="btn_add2" accept="image/gif, image/jpeg, image/png" style="cursor:pointer"/>

                  </div>
                  <!-- //upload -->
                </div>
              </div>
              <!-- //gallery type-->

              <!-- sharing type-->
              <div class="rbc_item_bundle"  v-if="type == 'share' ">
                <strong class="rbc_tit_bundle">연결 URL <span class="require">*</span></strong>
                <div class="rbc_cont_bundle">
                  <div class="content_text_info mar_b10">
                    <h4 class="h4_title">
                      - 연결 URL은 YouTube만 등록 가능합니다.<br>
                      - 연결된 URL의 타이틀과 대표이미지(썸네일)가 자동으로 노출됩니다. <br>
                      <!-- <span class="mar_l8"> 들여쓰기 -->
                    </h4>
                  </div>
                  <span class="custom_input wid_438">
                    <input type="text" placeholder="http://형식으로 입력해 주세요." v-model.trim="snsLink" @input="shareLinkChange">
                  </span>
                  <a href="javascript:void(0);" @click="checkOgtag" class="btn sml bd_black mar_l20 wid_100">적용</a>
                </div>
              </div>
              <!-- //sharing type-->

              <!-- Native이슈로 임시처리(추후 원복 필요)
              <div class="rcs_item_bundle url" v-if="type == 'share'">
                <div class="box_table">
                  <div class="box_th">
                    <strong class="title">타이틀</strong>
                  </div>
                  <div class="box_td">
                      <div class="length_area">
                        <span class="custom_input">
                          <input type="text" placeholder="타이틀을 입력해 주세요." v-model.trim="ogTitle" oninput="javascript: if (this.value.length > 80) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 80);">
                        </span>
                        <span class="length">(<em>{{ogTitle.length}}</em>/80)</span>
                      </div>
                  </div>
                </div>
              </div>
              <div class="rcs_item_bundle url" v-if="type == 'share' && ogImage != ''">
                <div class="box_table">
                  <div class="box_th">
                    <strong class="title">이미지</strong>
                  </div>
                  <div class="box_td">
                    <div class="image_upload col1">
                      <div class="image">
                        <div class="i_block">
                          <img :src="ogImage">
                          <a href="javascript:void(0);" class="delete" @click="shareDeleteButton">삭제</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="rcs_item_bundle url" v-if="type == 'share' && ogImage == ''">
                <div class="box_table">
                  <div class="box_th">
                    <strong class="title">이미지</strong>
                  </div>
                  <div class="box_td">
                    <div class="image_upload col1 hei_100">
                      <input type="file" id="file2" ref="files" @change="imageUpload" multiple accept="image/gif, image/jpeg, image/png" name="ATTACH_FILE_NAME" class="btn_add2" style="cursor: pointer;">
                    </div>
                    <div class="text">
                      - 이미지 1장을 반드시 등록해야 합니다.
                      <br>- 권장 이미지 사이즈(700~1080px X 500~1080px)/jpg, png, gif(최대 3MB)
                    </div>
                  </div>
                </div>
              </div>
              // Native이슈로 임시처리(추후 원복 필요) -->

              <div class="rbc_item_bundle" v-if="type == 'gallery' || type == 'share' ">
                <strong class="rbc_tit_bundle">버튼 노출 <span class="require">*</span></strong>
                <div class="rbc_cont_bundle">
                  <span class="custom_radio min">
                    <input type="radio" name="Radio1" id="Radio01_1" checked v-model="buttonCnt" value="0">
                    <label for="Radio01_1">미사용</label>
                  </span>
                  <span class="custom_radio min">
                    <input type="radio" name="Radio1" id="Radio01_2" v-model="buttonCnt" value="1">
                    <label for="Radio01_2">1개</label>
                  </span>
                  <span class="custom_radio min">
                    <input type="radio" name="Radio1" id="Radio01_3" v-model="buttonCnt" value="2">
                    <label for="Radio01_3">2개</label>
                  </span>
                </div>
              </div>

              <!-- 버튼 -->
              <div class="rcs_item_bundle"  v-if="buttonCnt != 0">
                <strong class="rcs_tit_bundle"  style="padding-left:28px !important;">버튼</strong>
                <div class="rcs_cont_bundle" style="padding-left:33px !important;">
                  <!-- 2개 까지 노출 길어서 주석처리 -->
                  <div class="box_table"  v-if="buttonCnt == 1 || buttonCnt == 2">
                    <div class="box_th">
                      <strong class="title">버튼1</strong>
                    </div>
                    <div class="box_td">
                      <div class="box_btn_action_bundle">
                        <div class="box_top_bundle">
                          <div class="length_area">
                            <span class="custom_select">
                              <select required v-model="bottons[0].btnSel">
                                <option value="" disabled selected>선택하세요</option>
                                <option value="app">App연결</option>
                                <option value="chat">대화방 연결</option>
                                <option value="call">전화걸기</option>
                                <option value="url">URL</option>
                              </select>
                            </span>
                            <span class="custom_input" v-if="bottons[0].btnSel === ''">
                              <input type="text" placeholder="버튼명을 입력 하세요." disabled>
                            </span>
                            <span class="length"  v-if="bottons[0].btnSel === ''">(<em>{{bottons[0].btnName.length}}</em>/17)</span>

                            <span class="custom_input" v-if="bottons[0].btnSel === 'app'">
                              <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="bottons[0].btnNameApp" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                            </span>
                            <span class="length" v-if="bottons[0].btnSel === 'app'">(<em>{{bottons[0].btnNameApp.length}}</em>/17)</span>

                            <span class="custom_input" v-if="bottons[0].btnSel === 'chat'">
                              <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="bottons[0].btnNameChat" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                            </span>
                            <span class="length" v-if="bottons[0].btnSel === 'chat'">(<em>{{bottons[0].btnNameChat.length}}</em>/17)</span>

                            <span class="custom_input" v-if="bottons[0].btnSel === 'call'">
                              <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="bottons[0].btnNameCall" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                            </span>
                            <span class="length" v-if="bottons[0].btnSel === 'call'">(<em>{{bottons[0].btnNameCall.length}}</em>/17)</span>

                            <span class="custom_input" v-if="bottons[0].btnSel === 'url'">
                              <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="bottons[0].btnNameUrl" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                            </span>
                            <span class="length" v-if="bottons[0].btnSel === 'url'">(<em>{{bottons[0].btnNameUrl.length}}</em>/17)</span>
                          </div>
                        </div>

                        <!-- App연결-->
                        <div class="box_bottom_bundle" v-bind:class="{active: bottons[0].btnSel === 'app'}">
                          <span class="custom_input">
                            <input type="text" id placeholder="packageName" v-model.trim="bottons[0].btnPackageName">
                          </span>
                          <span class="custom_input">
                            <input type="text" id placeholder="scheme" v-model.trim="bottons[0].btnAction">
                          </span>
                          <span class="custom_input">
                            <input type="text" id placeholder="uri" v-model.trim="bottons[0].btnUri">
                          </span>
                        </div>
                        <!-- 대화방 연결-->
                        <div class="box_bottom_bundle" v-bind:class="{active: bottons[0].btnSel === 'chat'}">
                          <div class="flex_wrap">
                            <span class="custom_input">
                              <input type="text" v-model.trim="bottons[0].btnLinkChat" disabled>
                            </span>
                            <a href="javascript:void(0);" class="btn sml bd_black" @click="showChatPopup('btn1')"><span>양방향대화방 선택</span></a>
                          </div>
                        </div>
                        <!-- 전화걸기-->
                        <div class="box_bottom_bundle" v-bind:class="{active: bottons[0].btnSel === 'call'}">
                          <span class="custom_input">
                            <input type="text" id placeholder="전화번호는 ‘-‘ 없이 등록해 주세요" v-model.trim="bottons[0].btnLinkCall" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum">
                          </span>
                        </div>
                        <!-- URL-->
                        <div class="box_bottom_bundle" v-bind:class="{active: bottons[0].btnSel === 'url'}">
                          <span class="custom_input">
                            <input type="text" id placeholder="연결할 URL을 http:// 형식으로 입력해주세요." v-model.trim="bottons[0].btnLinkUrl">
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="box_table" v-if="buttonCnt == 2">
                    <div class="box_th">
                      <strong class="title">버튼2</strong>
                    </div>
                    <div class="box_td">
                      <div class="box_btn_action_bundle">
                        <div class="box_top_bundle">
                          <div class="length_area">
                            <span class="custom_select">
                              <select required v-model="bottons[1].btnSel">
                                <option value="" disabled selected>선택하세요</option>
                                <option value="app">App연결</option>
                                <option value="chat">대화방 연결</option>
                                <option value="call">전화걸기</option>
                                <option value="url">URL</option>
                              </select>
                            </span>
                            <span class="custom_input" v-if="bottons[1].btnSel === ''">
                              <input type="text" placeholder="버튼명을 입력 하세요." disabled>
                            </span>
                            <span class="length"  v-if="bottons[1].btnSel === ''">(<em>0</em>/17)</span>

                            <span class="custom_input" v-if="bottons[1].btnSel === 'app'">
                              <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="bottons[1].btnNameApp" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                            </span>
                            <span class="length" v-if="bottons[1].btnSel === 'app'">(<em>{{bottons[1].btnNameApp.length}}</em>/17)</span>

                            <span class="custom_input" v-if="bottons[1].btnSel === 'chat'">
                              <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="bottons[1].btnNameChat" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                            </span>
                            <span class="length" v-if="bottons[1].btnSel === 'chat'">(<em>{{bottons[1].btnNameChat.length}}</em>/17)</span>

                            <span class="custom_input" v-if="bottons[1].btnSel === 'call'">
                              <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="bottons[1].btnNameCall" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                            </span>
                            <span class="length" v-if="bottons[1].btnSel === 'call'">(<em>{{bottons[1].btnNameCall.length}}</em>/17)</span>

                            <span class="custom_input" v-if="bottons[1].btnSel === 'url'">
                              <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="bottons[1].btnNameUrl" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                            </span>
                            <span class="length" v-if="bottons[1].btnSel === 'url'">(<em>{{bottons[1].btnNameUrl.length}}</em>/17)</span>
                          </div>
                        </div>

                        <!-- App연결-->
                        <div class="box_bottom_bundle" v-bind:class="{active: bottons[1].btnSel === 'app'}">
                          <span class="custom_input">
                            <input type="text" id placeholder="packageName" v-model.trim="bottons[1].btnPackageName">
                          </span>
                          <span class="custom_input">
                            <input type="text" id placeholder="scheme" v-model.trim="bottons[1].btnAction">
                          </span>
                          <span class="custom_input">
                            <input type="text" id placeholder="uri" v-model.trim="bottons[1].btnUri">
                          </span>
                        </div>
                        <!-- 대화방 연결-->
                        <div class="box_bottom_bundle" v-bind:class="{active: bottons[1].btnSel === 'chat'}">
                          <div class="flex_wrap">
                            <span class="custom_input">
                              <input type="text" v-model.trim="bottons[1].btnLinkChat" disabled>
                            </span>
                            <a href="javascript:void(0);" class="btn sml bd_black" @click="showChatPopup('btn2')"><span>양방향대화방 선택</span></a>
                          </div>
                        </div>
                        <!-- 전화걸기-->
                        <div class="box_bottom_bundle" v-bind:class="{active: bottons[1].btnSel === 'call'}">
                          <span class="custom_input">
                            <input type="text" id placeholder="전화번호는 ‘-‘ 없이 등록해 주세요" v-model.trim="bottons[1].btnLinkCall" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum">
                          </span>
                        </div>
                        <!-- URL-->
                        <div class="box_bottom_bundle" v-bind:class="{active: bottons[1].btnSel === 'url'}">
                          <span class="custom_input">
                            <input type="text" id placeholder="연결할 URL을 http:// 형식으로 입력해주세요." v-model.trim="bottons[1].btnLinkUrl">
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- //버튼 -->

              <!-- slide_area -->
              <div class="rbc_item_bundle" v-if="type == 'slide' ">
                <div class="depth2_area">
                  <!-- tab -->
                  <div class="tab_area noarr mar_t40 mar_l0 mar_b10">  <!-- 2021.08.20 RBC고도화수정1 -->
                    <ul>
                      <li v-for="(list, index) in slideCnt" :key="(index+1)" v-bind:class="{active: slideTab === (index+1)}">
                        <a href="javascript:void(0);" @click="selectSlideTab" :index="(index+1)">{{index+1}}<br> Slide</a>
                        <a href="javascript:void(0);" v-if="(index+1) > 2" class="icon_delete" @click="slideDelete" :index="index">{{index+2}} Slide 삭제</a>
                      </li>
                      <!--
                      <li v-if="(index+1) > 0">
                          <a href="javascript:void(0);">{{index+2}}<br> Slide</a>
                          <a href="javascript:void(0);" class="icon_delete">{{index+2}} Slide 삭제</a>
                      </li>
                      -->
                    </ul>

                    <a href="javascript:void(0);" class="btn_add2 mar_t20" v-if="(slideCnt.length+1) < 11" @click="slideAdd">추가</a>
                    <div class="pos_tr">
                      <span class="prev" v-if="slideTab === 1">선택된 슬라이드 앞으로 이동</span>
                      <a href="javascript:void(0);" class="prev" @click="slideUpButtonSlide" v-else>선택된 슬라이드 앞으로 이동</a>

                      <span class="next" v-if="slideTab === slideCnt.length">선택된 슬라이드 앞으로 이동</span>
                      <a href="javascript:void(0);" class="next" @click="slideDownButtonSlide" v-else>선택된 슬라이드 뒤로 이동</a>
                    </div>
                  </div>
                  <!-- //tab -->

                  <!-- slide1 -->
                  <div class="rbc_emul_form_cont bg_height">
                    <div class="rbc_item_bundle">
                      <strong class="rbc_tit_bundle">Slide{{(slideTab)}} 유형 <span class="require">*</span></strong>
                      <div class="rbc_cont_bundle">
                        <span class="custom_radio medium checked">
                          <input type="radio" name="slideTemplate" id="slideTemplate01" checked v-model="slideCnt[slideTab-1].slideType" value="gallery">
                          <label for="slideTemplate01">
                            <span>Image</span>
                          </label>
                        </span>
                        <span class="custom_radio medium checked">
                          <input type="radio" name="slideTemplate" id="slideTemplate02" v-model="slideCnt[slideTab-1].slideType" value="share">
                          <label for="slideTemplate02">
                            <span>URL</span>
                          </label>
                        </span>
                      </div>
                    </div>
                    <div class="rbc_item_bundle pad_t0">
                      <strong class="rbc_tit_bundle">Slide{{slideTab}} 제목 <span class="require">*</span></strong>
                      <div class="rbc_cont_bundle">
                        <div class="length_area">
                          <span class="custom_input">
                            <input type="text" placeholder="Slide 제목을 입력해 주세요." v-model.trim="slideCnt[slideTab-1].slideTitle" oninput="javascript: if (this.value.length > 34) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 34);">
                          </span>
                          <span class="length">(<em>{{slideCnt[slideTab-1].slideTitle.length}}</em>/34)</span>
                        </div>
                      </div>
                    </div>
                    <div class="rbc_item_bundle pad_t0">
                      <strong class="rbc_tit_bundle">Slide{{slideTab}} 내용 <span class="require"></span></strong>
                      <div class="rbc_cont_bundle">
                        <div class="content_text_info mar_b25">
                          <h4 class="h4_title">
                            내용은 최대 126자 이내의<br>
                            한글, 영문, 숫자, 언더바, 특수문자(자판에서 제공되는)로 작성 가능합니다.
                          </h4>
                        </div>
                        <div class="length_area">
                          <span class="custom_textarea">
                            <textarea class="hei_115" placeholder="Slide 내용을 입력해 주세요." v-model="slideCnt[slideTab-1].slideDescription" required @keyup="changeDescription('slideDescription', 'slideItem'+(slideTab-1))" @input="textChange" oninput="javascript: if (this.value.length > 126) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 126);"></textarea>
                          </span>
                          <span class="length">(<em>{{slideCnt[slideTab-1].slideDescription.length}}</em>/126)</span>
                        </div>
                      </div>
                    </div>

                    <div class="rbc_item_bundle pad_t0" v-if="slideCnt[slideTab-1].slideType == 'gallery' ">
                      <strong class="rbc_tit_bundle">
                        Slide{{slideTab}} 이미지 <span class="require">*</span>
                      </strong>
                      <div class="rbc_cont_bundle">
                        <div class="content_text_info mar_b10">
                          <h4 class="h4_title">
                            - 권장 이미지(정사각형, 최소700px X 700px, 최대1080px X 1080px)/jpg, png, gif(용량 최대 3MB) <!-- 2021.09.23 RBC고도화수정2 -->
                          </h4>
                        </div>
                        <!-- upload -->
                        <div class="image_upload" style="position: relative;">
                          <div class="miri_event_bloon" style="top:-36px; right: -156px;" @click="clickMiriCanvas"></div>

                          <!-- image -->
                          <div class="image" v-for="(file, index) in slideCnt[slideTab-1].slideMedia" :key="index">
                            <div class="i_block" v-if="slideCnt[slideTab-1].slideMedia">
                              <img :src="file.preview" />
                            </div>
                            <a href="javascript:void(0);" class="delete" @click="fileDeleteButtonSlide" :index="file.orderNo">이미지 삭제</a> <!-- delete -->

                          </div>
                          <!-- //image -->
                          <div class="image_upload hei_100">
                            <input v-if="slideCnt[slideTab-1].slideMedia.length < 1" type="file" id="file2" ref="filesSlide" @change="imageUploadSlide" multiple  class="btn_add2" accept="image/gif, image/jpeg, image/png" style="cursor:pointer"/>
                          </div>
                        </div>
                        <!-- //upload -->
                      </div>
                    </div>

                    <div class="rbc_item_bundle pad_t0" v-if="slideCnt[slideTab-1].slideType == 'share' ">
                      <strong class="rbc_tit_bundle">Slide{{slideTab}} 연결 URL <span class="require">*</span></strong>
                      <div class="rbc_cont_bundle">
                        <div class="content_text_info mar_b10">
                          <h4 class="h4_title">
                            - 연결 URL은 YouTube만 등록 가능합니다.<br>
                            - 연결된 URL의 타이틀과 대표이미지(썸네일)가 자동으로 노출됩니다. <br>
                            <!--
                            - 단축 URL은 등록 불가합니다.<br>
                            - 등록한 URL의 타이틀과 대표이미지(썸네일)가 노출됩니다.<br>
                            <span class="mar_l8">단, 타이틀과 제공된 이미지가 없는 경우 직접 입력해야 합니다.</span>
                            -->
                          </h4>
                        </div>
                        <span class="custom_input wid_438">
                          <input type="text" placeholder="http:// 형식으로 입력해 주세요." v-model.trim="slideCnt[slideTab-1].slideSnsLink" @input="shareSlideLinkChange(slideTab-1)">
                        </span>
                        <a href="javascript:void(0);" @click="checkOgtagSlide" class="btn sml bd_black mar_l20 wid_100">적용</a>
                      </div>
                    </div>

                    <!-- 2021.10.28 RBC고도화추가2 -->
                    <div class="rcs_item_bundle url" v-if="slideCnt[slideTab-1].slideType == 'share' && slideCnt[slideTab-1].slideOgYn">
                      <div class="box_table">
                        <div class="box_th">
                          <strong class="title">타이틀</strong>
                        </div>
                        <div class="box_td">
                            <div class="length_area">
                              <span class="custom_input">
                                <input type="text" placeholder="타이틀을 입력해 주세요." v-model.trim="slideCnt[slideTab-1].slideOgTitle" oninput="javascript: if (this.value.length > 80) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 80);">
                              </span>
                              <span class="length">(<em>{{slideCnt[slideTab-1].slideOgTitle.length}}</em>/80)</span>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="rcs_item_bundle url" v-if="slideCnt[slideTab-1].slideType == 'share' && slideCnt[slideTab-1].slideOgImage != '' && slideCnt[slideTab-1].slideOgYn">
                      <div class="box_table">
                        <div class="box_th">
                          <strong class="title">이미지</strong>
                        </div>
                        <div class="box_td">
                          <div class="image_upload col1">
                            <div class="image">
                              <div class="i_block">
                                <img :src="slideCnt[slideTab-1].slideOgImage">
                                <a href="javascript:void(0);" class="delete" @click="shareDeleteButton" :index="slideTab-1">삭제</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="rcs_item_bundle url" v-if="slideCnt[slideTab-1].slideType == 'share' && slideCnt[slideTab-1].slideOgImage == '' && slideCnt[slideTab-1].slideOgYn">
                      <div class="box_table">
                        <div class="box_th">
                          <strong class="title">이미지</strong>
                        </div>
                        <div class="box_td">
                          <div class="image_upload col1 hei_100">
                            <input type="file" id="file2" ref="filesSlide" @change="imageUploadSlide" multiple accept="image/gif, image/jpeg, image/png" name="ATTACH_FILE_NAME" class="btn_add2" style="cursor: pointer;">
                          </div>
                          <div class="text">
                            - 이미지 1장을 반드시 등록해야 합니다.
                            <br>- 권장 이미지 사이즈(700~1080px X 500~1080px)/jpg, png, gif(최대 3MB)
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- //2021.10.28 RBC고도화추가2 -->

                    <div class="rbc_item_bundle pad_t0">
                      <strong class="rbc_tit_bundle">Slide{{slideTab}} 버튼 노출 <span class="require">*</span></strong>
                      <div class="rbc_cont_bundle">
                        <span class="custom_radio min">
                          <input type="radio" name="Slide1Radio1" id="Slide1Radio01_1" checked v-model="slideCnt[slideTab-1].slideButtonCnt" value="0">
                          <label for="Slide1Radio01_1">미사용</label>
                        </span>
                        <span class="custom_radio min">
                          <input type="radio" name="Slide1Radio1" id="Slide1Radio01_2" v-model="slideCnt[slideTab-1].slideButtonCnt" value="1">
                          <label for="Slide1Radio01_2">1개</label>
                        </span>
                        <span class="custom_radio min">
                          <input type="radio" name="Slide1Radio1" id="Slide1Radio01_3" v-model="slideCnt[slideTab-1].slideButtonCnt" value="2">
                          <label for="Slide1Radio01_3">2개</label>
                        </span>
                      </div>
                    </div>
                    <!-- 버튼 -->
                    <div class="rcs_item_bundle pad_t0" v-if="slideCnt[slideTab-1].slideButtonCnt != 0 ">
                      <strong class="rcs_tit_bundle v_top">Slide{{slideTab}} 버튼</strong>
                      <div class="rcs_cont_bundle">
                        <!-- 2개 까지 노출 길어서 주석처리 -->
                        <div class="box_table" v-if="slideCnt[slideTab-1].slideButtonCnt == 1 || slideCnt[slideTab-1].slideButtonCnt == 2 ">
                          <div class="box_th">
                            <strong class="title">버튼1</strong>
                          </div>
                          <div class="box_td">
                            <div class="box_btn_action_bundle">
                              <div class="box_top_bundle">
                                <div class="length_area">
                                  <span class="custom_select">
                                    <select required v-model="slideCnt[slideTab-1].slideBottons[0].slideBtnSel">
                                      <option value="" disabled selected>선택하세요</option>
                                      <option value="app">App연결</option>
                                      <option value="chat">대화방 연결</option>
                                      <option value="call">전화걸기</option>
                                      <option value="url">URL</option>
                                    </select>
                                  </span>
                                  <span class="custom_input" v-if="slideCnt[slideTab-1].slideBottons[0].slideBtnSel === ''">
                                    <input type="text" placeholder="버튼명을 입력 하세요." disabled>
                                  </span>
                                  <span class="length" v-if="slideCnt[slideTab-1].slideBottons[0].slideBtnSel === ''">(<em>0</em>/17)</span>

                                  <span class="custom_input" v-if="slideCnt[slideTab-1].slideBottons[0].slideBtnSel === 'app'">
                                    <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="slideCnt[slideTab-1].slideBottons[0].slideBtnNameApp" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                                  </span>
                                  <span class="length" v-if="slideCnt[slideTab-1].slideBottons[0].slideBtnSel === 'app'">(<em>{{slideCnt[slideTab-1].slideBottons[0].slideBtnNameApp === undefined ? '0' : slideCnt[slideTab-1].slideBottons[0].slideBtnNameApp.length}}</em>/17)</span>

                                  <span class="custom_input" v-if="slideCnt[slideTab-1].slideBottons[0].slideBtnSel === 'chat'">
                                    <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="slideCnt[slideTab-1].slideBottons[0].slideBtnNameChat" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                                  </span>
                                  <span class="length" v-if="slideCnt[slideTab-1].slideBottons[0].slideBtnSel === 'chat'">(<em>{{slideCnt[slideTab-1].slideBottons[0].slideBtnNameChat === undefined ? '0' : slideCnt[slideTab-1].slideBottons[0].slideBtnNameChat.length}}</em>/17)</span>

                                  <span class="custom_input" v-if="slideCnt[slideTab-1].slideBottons[0].slideBtnSel === 'call'">
                                    <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="slideCnt[slideTab-1].slideBottons[0].slideBtnNameCall" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                                  </span>
                                  <span class="length" v-if="slideCnt[slideTab-1].slideBottons[0].slideBtnSel === 'call'">(<em>{{slideCnt[slideTab-1].slideBottons[0].slideBtnNameCall === undefined ? '0' : slideCnt[slideTab-1].slideBottons[0].slideBtnNameCall.length}}</em>/17)</span>

                                  <span class="custom_input" v-if="slideCnt[slideTab-1].slideBottons[0].slideBtnSel === 'url'">
                                    <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="slideCnt[slideTab-1].slideBottons[0].slideBtnNameUrl" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                                  </span>
                                  <span class="length" v-if="slideCnt[slideTab-1].slideBottons[0].slideBtnSel === 'url'">(<em>{{slideCnt[slideTab-1].slideBottons[0].slideBtnNameUrl === undefined ? '0' : slideCnt[slideTab-1].slideBottons[0].slideBtnNameUrl.length}}</em>/17)</span>
                                </div>
                              </div>

                              <!-- App연결-->
                              <div class="box_bottom_bundle" v-bind:class="{active: slideCnt[slideTab-1].slideBottons[0].slideBtnSel === 'app'}">
                                <span class="custom_input">
                                  <input type="text" id placeholder="packageName" v-model.trim="slideCnt[slideTab-1].slideBottons[0].slideBtnPackageName">
                                </span>
                                <span class="custom_input">
                                  <input type="text" id placeholder="scheme" v-model.trim="slideCnt[slideTab-1].slideBottons[0].slideBtnAction">
                                </span>
                                <span class="custom_input">
                                  <input type="text" id placeholder="uri" v-model.trim="slideCnt[slideTab-1].slideBottons[0].slideBtnUri">
                                </span>
                              </div>
                              <!-- 대화방 연결-->
                              <div class="box_bottom_bundle" v-bind:class="{active: slideCnt[slideTab-1].slideBottons[0].slideBtnSel === 'chat'}">
                                <div class="flex_wrap">
                                  <span class="custom_input">
                                    <input type="text" v-model.trim="slideCnt[slideTab-1].slideBottons[0].slideBtnLinkChat" disabled>
                                  </span>
                                  <a href="javascript:void(0);" class="btn sml bd_black"  @click="showChatPopup('slideBtn1')"><span>양방향대화방 선택</span></a>
                                </div>
                              </div>
                              <!-- 전화걸기-->
                              <div class="box_bottom_bundle" v-bind:class="{active: slideCnt[slideTab-1].slideBottons[0].slideBtnSel === 'call'}">
                                <span class="custom_input">
                                  <input type="text" id placeholder="전화번호는 ‘-‘ 없이 등록해 주세요" v-model.trim="slideCnt[slideTab-1].slideBottons[0].slideBtnLinkCall" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum">
                                </span>
                              </div>
                              <!-- URL-->
                              <div class="box_bottom_bundle" v-bind:class="{active: slideCnt[slideTab-1].slideBottons[0].slideBtnSel === 'url'}">
                                <span class="custom_input">
                                  <input type="text" id placeholder="연결할 URL을 http:// 형식으로 입력해주세요." v-model.trim="slideCnt[slideTab-1].slideBottons[0].slideBtnLinkUrl">
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="box_table" v-if="slideCnt[slideTab-1].slideButtonCnt == 2" >
                          <div class="box_th">
                            <strong class="title">버튼2</strong>
                          </div>
                          <div class="box_td">
                            <div class="box_btn_action_bundle">
                              <div class="box_top_bundle">
                                <div class="length_area">
                                  <span class="custom_select">
                                    <select required v-model="slideCnt[slideTab-1].slideBottons[1].slideBtnSel">
                                      <option value="" disabled selected>선택하세요</option>
                                      <option value="app">App연결</option>
                                      <option value="chat">대화방 연결</option>
                                      <option value="call">전화걸기</option>
                                      <option value="url">URL</option>
                                    </select>
                                  </span>
                                  <span class="custom_input" v-if="slideCnt[slideTab-1].slideBottons[1].slideBtnSel === ''">
                                    <input type="text" placeholder="버튼명을 입력 하세요." disabled>
                                  </span>
                                  <span class="length" v-if="slideCnt[slideTab-1].slideBottons[1].slideBtnSel === ''">(<em>0</em>/17)</span>

                                  <span class="custom_input" v-if="slideCnt[slideTab-1].slideBottons[1].slideBtnSel === 'app'">
                                    <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="slideCnt[slideTab-1].slideBottons[1].slideBtnNameApp" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                                  </span>
                                  <span class="length" v-if="slideCnt[slideTab-1].slideBottons[1].slideBtnSel === 'app'">(<em>{{slideCnt[slideTab-1].slideBottons[1].slideBtnNameApp === undefined ? '0' : slideCnt[slideTab-1].slideBottons[1].slideBtnNameApp.length}}</em>/17)</span>

                                  <span class="custom_input" v-if="slideCnt[slideTab-1].slideBottons[1].slideBtnSel === 'chat'">
                                    <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="slideCnt[slideTab-1].slideBottons[1].slideBtnNameChat" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                                  </span>
                                  <span class="length" v-if="slideCnt[slideTab-1].slideBottons[1].slideBtnSel === 'chat'">(<em>{{slideCnt[slideTab-1].slideBottons[1].slideBtnNameChat === undefined ? '0' : slideCnt[slideTab-1].slideBottons[1].slideBtnNameChat.length}}</em>/17)</span>

                                  <span class="custom_input" v-if="slideCnt[slideTab-1].slideBottons[1].slideBtnSel === 'call'">
                                    <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="slideCnt[slideTab-1].slideBottons[1].slideBtnNameCall" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                                  </span>
                                  <span class="length" v-if="slideCnt[slideTab-1].slideBottons[1].slideBtnSel === 'call'">(<em>{{slideCnt[slideTab-1].slideBottons[1].slideBtnNameCall === undefined ? '0' : slideCnt[slideTab-1].slideBottons[1].slideBtnNameCall.length}}</em>/17)</span>

                                  <span class="custom_input" v-if="slideCnt[slideTab-1].slideBottons[1].slideBtnSel === 'url'">
                                    <input type="text" placeholder="버튼명을 입력 하세요." v-model.trim="slideCnt[slideTab-1].slideBottons[1].slideBtnNameUrl" oninput="javascript: if (this.value.length > 17) alert('제한된 글자수를 초과하였습니다.'); this.value = this.value.slice(0, 17);">
                                  </span>
                                  <span class="length" v-if="slideCnt[slideTab-1].slideBottons[1].slideBtnSel === 'url'">(<em>{{slideCnt[slideTab-1].slideBottons[1].slideBtnNameUrl === undefined ? '0' : slideCnt[slideTab-1].slideBottons[1].slideBtnNameUrl.length}}</em>/17)</span>
                                </div>
                              </div>

                              <!-- App연결-->
                              <div class="box_bottom_bundle" v-bind:class="{active: slideCnt[slideTab-1].slideBottons[1].slideBtnSel === 'app'}">
                                <span class="custom_input">
                                  <input type="text" id placeholder="packageName" v-model.trim="slideCnt[slideTab-1].slideBottons[1].slideBtnPackageName">
                                </span>
                                <span class="custom_input">
                                  <input type="text" id placeholder="scheme" v-model.trim="slideCnt[slideTab-1].slideBottons[1].slideBtnAction">
                                </span>
                                <span class="custom_input">
                                  <input type="text" id placeholder="uri" v-model.trim="slideCnt[slideTab-1].slideBottons[1].slideBtnUri">
                                </span>
                              </div>
                              <!-- 대화방 연결-->
                              <div class="box_bottom_bundle" v-bind:class="{active: slideCnt[slideTab-1].slideBottons[1].slideBtnSel === 'chat'}">
                                <div class="flex_wrap">
                                  <span class="custom_input">
                                    <input type="text" v-model.trim="slideCnt[slideTab-1].slideBottons[1].slideBtnLinkChat" disabled>
                                  </span>
                                  <a href="javascript:void(0);" class="btn sml bd_black" @click="showChatPopup('slideBtn2')"><span>양방향대화방 선택</span></a>
                                </div>
                              </div>
                              <!-- 전화걸기-->
                              <div class="box_bottom_bundle" v-bind:class="{active: slideCnt[slideTab-1].slideBottons[1].slideBtnSel === 'call'}">
                                <span class="custom_input">
                                  <input type="text" id placeholder="전화번호는 ‘-‘ 없이 등록해 주세요" v-model.trim="slideCnt[slideTab-1].slideBottons[1].slideBtnLinkCall" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum">
                                </span>
                              </div>
                              <!-- URL-->
                              <div class="box_bottom_bundle" v-bind:class="{active: slideCnt[slideTab-1].slideBottons[1].slideBtnSel === 'url'}">
                                <span class="custom_input">
                                  <input type="text" id placeholder="연결할 URL을 http:// 형식으로 입력해주세요." v-model.trim="slideCnt[slideTab-1].slideBottons[1].slideBtnLinkUrl">
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- //버튼 -->
                  </div>
                  <!-- //slide1 -->
                </div>
              </div>
              <!-- //slide_area -->

              <div class="rbc_item_bundle line2"> <!-- 2021.08.05 RBC고도화수정3 -->
                <strong class="rbc_tit_bundle">게시 방법 <span class="require">*</span></strong>
                <div class="rbc_cont_bundle">
                  <span class="custom_radio min">
                    <input type="radio" name="Radio2" id="Radio02_1" checked value="publish" v-model="publishType" :disabled="statusNum === 1 || statusNum === 3 || statusNum === 4" @change="typeChacge('publish')">
                    <label for="Radio02_1">즉시 게시</label>
                  </span>
                  <span class="custom_radio min">
                    <input type="radio" name="Radio2" id="Radio02_2" value="reservation" v-model="publishType" :disabled="statusNum === 1 || statusNum === 3 || statusNum === 4" @change="typeChacge('reservation')">
                    <label for="Radio02_2">예약 게시</label>
                  </span>
                  <span class="custom_radio min">
                    <input type="radio" name="Radio2" id="Radio02_3" value="internet" v-model="publishType" :disabled="statusNum === 1 || statusNum === 3 || statusNum === 4" @change="typeChacge('internet')">
                    <label for="Radio02_3">숨김 게시</label>
                    <span class="positionRelative">
                      <button class="icon_info">툴팁</button>
                      <span class="message nowrap">
                        <span class="ico_bar">[숨김 게시]는 브랜드 소식내에는 노출되지 않습니다.</span>
                        <span class="ico_bar">RCS 메시지 발송 시, 메시지에 URL을 기재하는 용도로<br> 사용됩니다.</span>
                        <span class="ico_bar">[저장] 또는 [비공개] 상태일 경우는 [게시]상태가 아니므로<br> URL에 연결된 소식을 볼 수 없습니다.</span>
                        <span class="ico_bar">[예약 게시]는 지정된 시간에 [게시]상태로 전환되므로<br> [게시]상태 이전에는 URL에 연결된 소식을 볼 수 없습니다.</span>
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              <!-- 예약 게시 일시 -->
              <div class="rbc_item_bundle" v-if="publishType == 'reservation' ">
                <strong class="rbc_tit_bundle">예약 게시 일시</strong>
                <div class="rbc_cont_bundle">
                  <div class="cont_flex_bundle date_checkbox">
                    <span class="custom_input icon_date">
                      <div class="date_picker">
                        <el-date-picker
                        :picker-options="datePickerOptions"
                          v-model="pubDtYMD"
                          type="date"
                          placeholder="시작일"
                          value-format="yyyyMMdd"
                          :disabled="statusNum === 1 || statusNum === 4"
                        ></el-date-picker>
                      </div>
                    </span>
                    <span class="custom_select micromin">
                      <select v-model="pubDtHH" :disabled="statusNum === 1 || statusNum === 4">
                        <option value="00">00시</option>
                        <option value="01">01시</option>
                        <option value="02">02시</option>
                        <option value="03">03시</option>
                        <option value="04">04시</option>
                        <option value="05">05시</option>
                        <option value="06">06시</option>
                        <option value="07">07시</option>
                        <option value="08">08시</option>
                        <option value="09">09시</option>
                        <option value="10">10시</option>
                        <option value="11">11시</option>
                        <option value="12">12시</option>
                        <option value="13">13시</option>
                        <option value="14">14시</option>
                        <option value="15">15시</option>
                        <option value="16">16시</option>
                        <option value="17">17시</option>
                        <option value="18">18시</option>
                        <option value="19">19시</option>
                        <option value="20">20시</option>
                        <option value="21">21시</option>
                        <option value="22">22시</option>
                        <option value="23">23시</option>
                      </select>
                    </span>
                  </div>
                </div>
              </div>
              <!-- //예약 게시 일시 -->

              <div class="rbc_item_bundle">
                <strong class="rbc_tit_bundle">상단 고정</strong>
                <div class="rbc_cont_bundle">
                  <span class="custom_checkbox">
                    <input type="checkbox" id="agree01" v-model="pinYn" :disabled="(statusNum === 2 || statusNum === 3 || statusNum === 4) || (publishType !== 'publish' && statusNum === 0)">
                    <label for="agree01">상단 고정 등록</label>
                  </span>
                </div>
              </div>
            </div>

            <!-- //depth1 -->
            <div class="btn_wrap center mar_t40">
             <a href="javascript:void(0);" class="btn mid bd_blue" @click="cancel()" v-if="statusNum === 0 || statusNum === 1 || statusNum === 2 || statusNum === 3 || statusNum === 4">
                <span>목록</span>
              </a>
              <a href="javascript:void(0);" class="btn mid blue" @click="saveFeed('modify')" v-if="statusNum === 1 || statusNum === 2 || statusNum === 3 || statusNum === 4">
                <span>수정</span>
              </a>
              <a href="javascript:void(0);" class="btn mid blue" @click="saveFeed('save')" v-if="statusNum === 0">
                <span>저장</span>
              </a>
              <a href="javascript:void(0);" class="btn mid black" @click="saveFeed('hide')" v-if="statusNum === 1 || statusNum === 3">
                <span>비공개</span>
              </a>
              <a href="javascript:void(0);" class="btn mid black" @click="saveFeed('ok')" v-if="statusNum === 0 ">
                <span>등록</span>
              </a>
              <a href="javascript:void(0);" class="btn mid black" @click="remove()" v-if="statusNum === 0 || statusNum === 1 || statusNum === 2 || statusNum === 3 || statusNum === 4"> <!-- 2021.07.29 RBC고도화수정1 -->
                <span>삭제</span>
              </a>
            </div>

            <div class="title_area mar_t60 mar_b30">
              <h3 class="h3_title">작업이력</h3>
            </div>
             <!-- depth1 -->
            <div class="rbc_emul_form_cont">

              <div class="rbc_item_bundle" v-for="(list, index) in hist1" :key="index +'l'">
                <strong class="rbc_tit_bundle">{{list.modCtn}}</strong>
                <div class="rbc_cont_bundle">
                  {{list.regDt}} / {{list.userNm}}
                </div>
              </div>
              <div class="rbc_item_bundle line2" v-for="(list, index) in hist2" :key="index +'r'">
                <strong class="rbc_tit_bundle">{{list.modCtn}}</strong>
                <div class="rbc_cont_bundle">
                  {{list.regDt}} / {{list.userNm}}
                </div>
              </div>

            </div>
            <!-- //depth1 -->
          </div>

          <!-- 스크롤시 자동-->
          <div class="rbc_emulator_wrap auto" v-if="type == 'gallery' || type == 'share' ">
            <div class="rbc_inner_emul">
              <strong class="blind">미리보기</strong>
              <div class="rbc_emulator_area hei_640">
                <div class="rbc_emulator_cont">
                  <div class="rbc_emulator_view">
                    <div class="desc_area no_util no_chip">
                      <!-- 내용 -->
                      <div class="preview_wrap mar_all0">
                        <!-- title -->
                        <div class="title_wrap">
                          <div class="logo">
                            <img :src="selBrand.brandImage">
                          </div>
                          <div class="name">{{selBrand.brandName}}</div>
                        </div>
                        <!-- //title -->
                        <!-- news -->
                        <div class="news_area layer_scroll" id="mainDescription">
                          <div class="date">{{nowDateData}}</div>
                          <div class="title">{{title}}</div>
                          <div class="desc" v-html="description1"></div>

                          <div class="imgDiv" v-if="type == 'gallery' ">
                            <div class="image" v-for="(file, index) in media" :key="index">
                              <img :src="file.preview" />
                            </div>
                          </div>

                          <div class="image_area imgDiv" v-if="type == 'share' ">
                            <div class="image" v-if="ogImage != '' ">
                              <img :src="ogImage">
                            </div>

                            <div class="noimg_area" v-else>
                              <div class="ver-mid">
                                <img src="../../assets/images/common/icon_noimg1.png" >
                                <div class="text">제공되는 이미지가 없습니다.</div>
                              </div>
                            </div>

                            <div class="url" v-if=" youtubeYn === 'N'">{{ogTitle}}</div>
                          </div>

                          <div class="button btnDiv" v-if="buttonCnt == 1 || buttonCnt == 2">
                            <a href="javascript:void(0);" class="btn" v-if="buttonCnt == 1 && bottons[0].btnSel === 'app'">{{bottons[0].btnNameApp}}</a>
                            <a href="javascript:void(0);" class="btn" v-else-if="buttonCnt == 1 && bottons[0].btnSel === 'chat'">{{bottons[0].btnNameChat}}</a>
                            <a href="javascript:void(0);" class="btn" v-else-if="buttonCnt == 1 && bottons[0].btnSel === 'call'">{{bottons[0].btnNameCall}}</a>
                            <a href="javascript:void(0);" class="btn" v-else-if="buttonCnt == 1 && bottons[0].btnSel === 'url'">{{bottons[0].btnNameUrl}}</a>
                            <div class="row col2" v-if="buttonCnt == 2">
                              <a href="javascript:void(0);" class="btn" v-if="bottons[0].btnSel === 'app'">{{bottons[0].btnNameApp}}</a>
                              <a href="javascript:void(0);" class="btn" v-else-if="bottons[0].btnSel === 'chat'">{{bottons[0].btnNameChat}}</a>
                              <a href="javascript:void(0);" class="btn" v-else-if="bottons[0].btnSel === 'call'">{{bottons[0].btnNameCall}}</a>
                              <a href="javascript:void(0);" class="btn" v-else-if="bottons[0].btnSel === 'url'">{{bottons[0].btnNameUrl}}</a>
                              <a href="javascript:void(0);" class="btn" v-if="bottons[1].btnSel === 'app'">{{bottons[1].btnNameApp}}</a>
                              <a href="javascript:void(0);" class="btn" v-else-if="bottons[1].btnSel === 'chat'">{{bottons[1].btnNameChat}}</a>
                              <a href="javascript:void(0);" class="btn" v-else-if="bottons[1].btnSel === 'call'">{{bottons[1].btnNameCall}}</a>
                              <a href="javascript:void(0);" class="btn" v-else-if="bottons[1].btnSel === 'url'">{{bottons[1].btnNameUrl}}</a>
                            </div>
                          </div>
                        </div>
                        <!-- //news -->
                      </div>
                      <!-- //내용 -->
                      <div class="btn_wrap">
                        <div class="navi_area">
                          <span class="icon1"></span>
                          <span class="icon2"></span>
                          <span class="icon3"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 스크롤시 자동-->
          <div class="rbc_emulator_wrap auto" v-if="type == 'slide'">
            <div class="rbc_inner_emul">
              <strong class="blind">미리보기</strong>
              <div class="rbc_emulator_area hei_325">
                <div class="rbc_title">소식 메인 미리보기</div> <!-- 2021.08.31 RBC고도화추가1 -->
                <div class="rbc_emulator_cont">
                  <div class="rbc_emulator_view">
                    <div class="desc_area no_util no_chip">
                      <!-- 내용 -->
                      <div class="preview_wrap mar_all0">
                        <!-- news -->
                        <div class="news_area layer_scroll">
                          <div class="date">{{nowDateData}}</div>
                          <div class="title">{{title}}</div>
                          <!-- slideSmall -->
                          <div class="detail_wrap small wid_170">
                            <carousel v-bind="options1" @changed="changed1" class="slideSmall" v-if="type1 == '0'">

                              <!-- item -->
                              <div class="item" v-for="(list, index) in slideCnt" :key="index">

                                <div class="thumb_area" v-if="list.slideType == 'gallery'">
                                  <div class="thumb" v-for="(item, index2) in list.slideMedia" :key="index2">
                                    <img :src="item.preview" v-if="index2 == 0">
                                  </div>
                                  <div class="text">{{list.slideTitle}}</div>
                                </div>

                                <div class="thumb_area sharing" v-if="list.slideType == 'share'">
                                  <div class="thumb" v-if="list.slideOgImage != ''">
                                    <img :src="list.slideOgImage" alt="">
                                  </div>

                                  <!-- noimage -->
                                  <div class="thumb noimage" v-else>
                                    <span class="text">제공되는 이미지가 없습니다.</span>
                                  </div>
                                  <!-- //noimage -->
                                  <div class="url">
                                    <span class="ellipsisRow2">{{list.slideOgTitle}}</span>
                                  </div>

                                  <div class="text">{{list.slideTitle}}</div>

                                </div>

                              </div>
                              <!-- //item -->

                            </carousel>
                          </div>
                          <!-- //slideSmall -->
                        </div>
                        <!-- //news -->
                      </div>
                      <!-- //내용 -->
                    </div>
                  </div>
                </div>
              </div>

              <!-- 슬라이드 미리보기 -->
              <div class="rbc_emulator_area hei_slide"> <!-- 2021.10.22 RBC고도화수정1 -->
                <div class="rbc_emulator_cont">
                  <div class="rbc_emulator_view">
                    <div class="desc_area layer_scroll no_util no_chip" id="slideDescription">
                      <!-- 내용 -->
                      <div class="preview_wrap slide_wrap">
                        <!-- slideMedium -->
                        <div class="detail_wrap">
                          <carousel v-bind="options2" @changed="changed2" class="slideMedium" v-if="type1 == '0'">

                            <!-- item -->
                            <div class="item" v-for="(list, index) in slideCnt" :key="index" :id="'slideItem'+index">

                              <div class="thumb_area" v-if="list.slideType == 'gallery'">
                                <div class="thumb" v-for="(item, index2) in list.slideMedia" :key="index2">
                                  <img :src="item.preview" v-if="index2 == 0">
                                </div>
                              </div>

                              <div class="thumb_area sharing" v-if="list.slideType == 'share'">
                                <div class="thumb" v-if="list.slideOgImage != ''">
                                    <img :src="list.slideOgImage" alt="">
                                  </div>
                                  <!-- noimage -->
                                  <div class="thumb noimage" v-else>
                                    <span class="text">제공되는 이미지가 없습니다.</span>
                                  </div>
                                  <!-- //noimage -->
                                  <div class="url" v-if=" list.slideYoutubeYn === 'N'">
                                    <span class="ellipsisRow2">{{list.slideOgTitle}}</span>
                                  </div>
                              </div>

                              <div class="text_area02">
                                <div class="title">{{list.slideTitle}}</div>
                                <div class="desc" v-html="list.slideDescription1"></div>
                                <div class="button_area" v-if="list.slideButtonCnt == 1 || list.slideButtonCnt == 2">
                                  <div class="row" v-if="list.slideButtonCnt == 1">
                                    <a href="javascript:void(0);" class="btn" v-if="list.slideBottons[0].slideBtnSel === 'app'">{{list.slideBottons[0].slideBtnNameApp}}</a>
                                    <a href="javascript:void(0);" class="btn" v-else-if="list.slideBottons[0].slideBtnSel === 'chat'">{{list.slideBottons[0].slideBtnNameChat}}</a>
                                    <a href="javascript:void(0);" class="btn" v-else-if="list.slideBottons[0].slideBtnSel === 'call'">{{list.slideBottons[0].slideBtnNameCall}}</a>
                                    <a href="javascript:void(0);" class="btn" v-else-if="list.slideBottons[0].slideBtnSel === 'url'">{{list.slideBottons[0].slideBtnNameUrl}}</a>
                                  </div>
                                  <div class="row col2" v-if="list.slideButtonCnt == 2">
                                    <a href="javascript:void(0);" class="btn" v-if="list.slideBottons[0].slideBtnSel === 'app'">{{list.slideBottons[0].slideBtnNameApp}}</a>
                                    <a href="javascript:void(0);" class="btn" v-else-if="list.slideBottons[0].slideBtnSel === 'chat'">{{list.slideBottons[0].slideBtnNameChat}}</a>
                                    <a href="javascript:void(0);" class="btn" v-else-if="list.slideBottons[0].slideBtnSel === 'call'">{{list.slideBottons[0].slideBtnNameCall}}</a>
                                    <a href="javascript:void(0);" class="btn" v-else-if="list.slideBottons[0].slideBtnSel === 'url'">{{list.slideBottons[0].slideBtnNameUrl}}</a>
                                    <a href="javascript:void(0);" class="btn" v-if="list.slideBottons[1].slideBtnSel === 'app'">{{list.slideBottons[1].slideBtnNameApp}}</a>
                                    <a href="javascript:void(0);" class="btn" v-else-if="list.slideBottons[1].slideBtnSel === 'chat'">{{list.slideBottons[1].slideBtnNameChat}}</a>
                                    <a href="javascript:void(0);" class="btn" v-else-if="list.slideBottons[1].slideBtnSel === 'call'">{{list.slideBottons[1].slideBtnNameCall}}</a>
                                    <a href="javascript:void(0);" class="btn" v-else-if="list.slideBottons[1].slideBtnSel === 'url'">{{list.slideBottons[1].slideBtnNameUrl}}</a>
                                  </div>
                                </div>
                              </div>

                            </div>
                            <!-- //item -->
                          </carousel>
                        </div>
                        <!-- //slideMedium -->
                      </div>
                      <!-- //내용 -->
                      <div class="btn_wrap">
                        <div class="navi_area">
                          <span class="icon1"></span>
                          <span class="icon2"></span>
                          <span class="icon3"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- //슬라이드 미리보기 -->
            </div>

          </div>

        </div>
      </div>
      <div tabindex="0" class="layer active" v-show="layerStatus">
        <div tabindex="0" class="layer_cont wid_420">
          <div class="layer_head">
            <h2>썸네일 보기</h2>
          </div>
          <div class="layer_body">
            <div class="gallery_list" :class="{'count2': media.length === 2, 'count3': media.length === 3, 'count4': media.length > 3 }">
              <div class="image" v-for="(file, index) in layerMedia" :key="index" >
                <img :src="file.preview" >
              </div>
              <a href="javascript:;" class="more" v-if="media.length > 4"><span><em>+</em> 더보기</span></a>
            </div>
          </div>
          <div class="layer_foot">
            <div class="btn_wrap mar_t50">
              <a href="javascript:void(0);" class="btn sml black" @click="closeLayer()">
                <span>확인</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <feed-twoway-search-popup v-if="isShowFeedTwowayPopup" :brandId="brandId" :visible.sync="isShowFeedTwowayPopup" @selectedTwoway="selChatbotId"/>
    </article>
  </div>
</template>
<script>
import moment from 'moment'
import carousel from 'vue-owl-carousel'
import { getUserInfo } from '@/api/service/service'
import store from '@/store'
import FeedTwowaySearchPopup from '@/views/feed/components/FeedTwowaySearchPopup'
import {
  getOgTagInfo,
  fileUpload,
  feedUpdate,
  feedDetail,
  feedRemove,
  feedUpdateHistory,
  feedPinCheck,
  getFeedCnt,
  getBrandStatus
} from '@/api/feed/feed'

export default {
  name: 'FeedDetail',
  components: {
    carousel,
    FeedTwowaySearchPopup
  },
  data() {
    return {
      isShowFeedTwowayPopup: false,
      chatBtnId: '',
      brandId: '',
      // 슬라이드 UI
      activeIndex: 0,
      plugin: null,
      options1: {
        startPosition: 0,
        margin: 4,
        stagePadding: 70,
        autoplay: false,
        nav: false,
        items: 1,
        center: true,
        dots: false,
        loop: false
      },
      options2: {
        startPosition: 0,
        margin: 10,
        stagePadding: 40,
        autoplay: false,
        nav: false,
        items: 1,
        center: true,
        dots: false,
        loop: false
      },
      userInfo: {
        userType: '',
        corpId: '',
        corpAdmYn: ''
      },
      corpInfo: {
        name: '', // 기업명
        corpId: '', // 기업ID
        aprvReqDt: '', // 등록일
        brandOperYn: '', // 브랜드 개설 여부
        reqCorpAdmYn: '', // 관리자 신청 여부(담당자)
        status: '',
        aprvStatus: ''
      },
      copyUrl: '복사되었습니다.', // 소식 URL
      copyUrlShow: false,
      layerStatus: false, // 레이어 사용여부
      brandList: [], // 브랜드 목록
      nowDateData: '', // 현재일자
      cntBrand: '', // 브랜드 변경정보

      status: '', // 상태
      statusNum: '', // 상세 상태
      selBrand: '', // 브랜드 정보
      title: '', // 제목
      description: '', // 내용
      description1: '', // 내용
      type: 'gallery', // 유형 gallery, slide, share
      type1: '0',
      typeName: '',
      snsLink: '', // share 타입 URL
      media: [], // gallery 타입 업로드용 파일정보

      buttonCnt: '0', // 버튼 노출 갯수
      bottons: [{ btnSel: '', btnName: '', btnNameApp: ' ', btnNameChat: '', btnNameCall: ' ', btnNameUrl: ' ', btnText: '', btnPackageName: '', btnAction: '', btnUri: '', btnLink: '' }, { btnSel: '', btnName: '', btnNameApp: '', btnNameChat: '', btnNameCall: '', btnNameUrl: '', btnText: '', btnPackageName: '', btnAction: '', btnUri: '', btnLink: '' }],

      publishType: 'publish', // 게시유형 publish, reservation, internet
      pubDtYMD: '',
      pubDtHH: '',
      publishDate: '',
      ogImage: '', // 태그 이미지
      ogTitle: '', // 태그 타이틀
      ogContent: '', // 태그 내용
      uploadImageIndex: 0, // 이미지 업로드를 위한 변수
      defaultPinYn: false,
      pinYn: false,
      slideCnt: [
        {
          slideIndex: '1', // 시작번호
          slideType: 'gallery', // 유형
          slideTitle: '', // 제목
          slideDescription: '', // 내용
          slideDescription1: '', // 내용
          slideButtonCnt: '0', // 버튼 노출 갯수
          slideBottons: [{ slideBtnSel: '', slideBtnName: '', slideBtnNameApp: '', slideBtnNameChat: '', slideBtnNameCall: '', slideBtnNameUrl: '', slideBtnText: '', slideBtnPackageName: '', slideBtnAction: '', slideBtnUri: '', slideBtnLink: '' }, { slideBtnSel: '', slideBtnName: '', slideBtnText: '', slideBtnPackageName: '', slideBtnAction: '', slideBtnUri: '', slideBtnLink: '' }],
          slideOgImage: '', // 태그 이미지
          slideOgTitle: '', // 태그 타이틀
          slideOgContent: '', // 태그 내용
          slideSnsLink: '', // 연결URL
          slideMedia: [], // 업로드용 파일
          slideUploadImageIndex: 0 // 이미지 업로드를 위한 변수
        }
      ], // 슬라이드 갯수
      slideTab: 1, // 슬라이드 선택tab
      pickerOptions2: {
        shortcuts: [
          {
            text: 'Last week',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Last month',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Last 3 months',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      hist1: [],
      hist2: [],
      datePickerOptions: {
        disabledDate (date) {
          return moment().add(-1, 'days') >= date || moment().add(1, 'month') <= date
        }
      }
    }
  },
  watch: {
    'description'() {
      this.description1 = this.replaceTexttoHtml(this.description).replace(/\|\|on.*\(|eval\(|javascript/gi, '').split('\n').join('<br />')
    }
  },
  created() {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다

    this.brandId = this.$route.params.brandId
    this.feedId = this.$route.params.feedId
    this.init()

    store.dispatch('getUserInfo').then(userInfo => {
      this.userInfo.userType = userInfo.userType
      this.userInfo.corpId = userInfo.corpId
      this.userInfo.corpAdmYn = userInfo.corpAdmYn
      this.getUserInfo()
    })
  },
  mounted() {
    /* 2021.10.26 RBC고도화추가1 */
    let setMinHeight = function(minheight = 0) {
      $('.rbc_emulator_area.hei_slide .owl-carousel').each(function(i, e) {
        let oldminheight = minheight
        $(e).find('.owl-item').each(function(i, e) {
          minheight = $(e).children('.item').height() > minheight ? $(e).children('.item').height() : minheight
        })
        $(e).find('.owl-item .item').css('min-height', minheight + 'px')
        minheight = oldminheight
      })
    }
    setTimeout(setMinHeight, 500)
    /* // 2021.10.26 RBC고도화추가1 */
  },
  computed: {
    // 썸네일 최대 개수 제한
    layerMedia() {
      return this.media.filter(function (media) {
        if (media.orderNo < 4) {
          return media
        }
      })
    }
  },
  methods: {
    init() {
      // 현재일자
      let date = new Date()

      let year = date.getFullYear().toString()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month.toString() : month.toString()
      let day = date.getDate()
      day = day < 10 ? '0' + day.toString() : day.toString()
      let hour = date.getHours()
      hour = hour < 10 ? '0' + hour.toString() : hour.toString()
      let minites = date.getMinutes()
      minites = minites < 10 ? '0' + minites.toString() : minites.toString()
      let seconds = date.getSeconds()
      seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString()

      this.nowDateData = date.getMonth() + 1 + '월 ' + date.getDate() + '일 ' + date.getHours() + ':' + date.getMinutes()

      // 소식 상세 가져오기
      feedDetail(this.brandId, this.feedId)
        .then(res => {
          if (res.code === '20000000') {
            // 상태 값 설정 0:저장, 1:게시, 2:예약게시, 3:숨김게시, 4: 비공개
            if (res.result.publishType === 'publish' && res.result.status === 'ok') {
              this.statusNum = 1
            } else if (res.result.publishType === 'reservation' && res.result.status === 'ok') {
              let publishDate = res.result.publishDate
              let nowDate = year + month + day + hour + minites + seconds
              if (publishDate <= nowDate) {
                this.statusNum = 1
              } else {
                this.statusNum = 2
              }
            } else if (res.result.publishType === 'internet' && res.result.status === 'ok') {
              this.statusNum = 3
            } else if (res.result.status === 'save') {
              this.statusNum = 0
            } else if (res.result.status === 'hide') {
              this.statusNum = 4
            }

            this.title = this.replaceHtml(res.result.title)
            this.type = res.result.type
            this.status = res.result.status
            this.publishType = res.result.publishType
            this.pinYn = res.result.pinYn === 'Y'
            this.defaultPinYn = res.result.pinYn === 'Y'
            this.selBrand = { brandId: res.result.brandId,
              brandName: res.result.brandNm,
              brandImage: res.result.brandImgUrl
            }

            if (res.result.publishDate !== undefined) {
              this.pubDtYMD = res.result.publishDate.substring(0, 8)
              this.pubDtHH = res.result.publishDate.substring(8, 10)
              this.copyUrl = res.result.feedUrl
            }
            // 유형 galllery
            if (res.result.type === 'gallery') {
              this.typeName = 'Gallery'
              if (res.result.description !== undefined) {
                this.description = this.replaceHtml(res.result.description)
                this.description1 = this.replaceTexttoHtml(res.result.description).replace(/\|\|on.*\(|eval\(|javascript/gi, '').split('\n').join('<br />')
              }
              for (let i = 0; i < res.result.media.length; i++) {
                this.media[i] = { orderNo: i, fileId: res.result.media[i].fileId, preview: res.result.media[i].url }
              }
              this.media = [...this.media]
              if (res.result.buttons !== undefined) {
                this.buttonCnt = res.result.buttons.length
                for (let i = 0; i < res.result.buttons.length; i++) {
                  if (res.result.buttons[i].type === 'app') {
                    this.bottons[i].btnSel = res.result.buttons[i].type
                    this.bottons[i].btnNameApp = res.result.buttons[i].title
                    this.bottons[i].btnPackageName = res.result.buttons[i].appLink.packageName
                    this.bottons[i].btnAction = res.result.buttons[i].appLink.scheme
                    this.bottons[i].btnUri = res.result.buttons[i].appLink.uri
                    this.bottons[i].btnLink = res.result.buttons[i].link
                  } else if (res.result.buttons[i].type === 'chat') {
                    this.bottons[i].btnSel = res.result.buttons[i].type
                    this.bottons[i].btnNameChat = res.result.buttons[i].title
                    this.bottons[i].btnPackageName = ''
                    this.bottons[i].btnAction = ''
                    this.bottons[i].btnUri = ''
                    this.bottons[i].btnLinkChat = res.result.buttons[i].link
                  } else if (res.result.buttons[i].type === 'call') {
                    this.bottons[i].btnSel = res.result.buttons[i].type
                    this.bottons[i].btnNameCall = res.result.buttons[i].title
                    this.bottons[i].btnPackageName = ''
                    this.bottons[i].btnAction = ''
                    this.bottons[i].btnUri = ''
                    this.bottons[i].btnLinkCall = res.result.buttons[i].link
                  } else if (res.result.buttons[i].type === 'url') {
                    this.bottons[i].btnSel = res.result.buttons[i].type
                    this.bottons[i].btnNameUrl = res.result.buttons[i].title
                    this.bottons[i].btnPackageName = ''
                    this.bottons[i].btnAction = ''
                    this.bottons[i].btnUri = ''
                    this.bottons[i].btnLinkUrl = res.result.buttons[i].link
                  }
                }
              }

            // 유형 share
            } else if (res.result.type === 'share') {
              this.typeName = 'Sharing'
              if (res.result.description !== undefined) {
                this.description = this.replaceHtml(res.result.description)
                this.description1 = this.replaceTexttoHtml(res.result.description).replace(/\|\|on.*\(|eval\(|javascript/gi, '').split('\n').join('<br />')
              }
              this.ogImage = res.result.share.imageUrl
              this.ogTitle = res.result.share.title.slice(0, 80)
              this.ogContent = res.result.share.description
              this.snsLink = res.result.share.snsLink
              this.ogYn = true

              if (this.snsLink.indexOf('youtube') !== -1 || this.snsLink.indexOf('youtu.be') !== -1) {
                this.youtubeYn = 'Y'
              } else {
                this.youtubeYn = 'N'
              }

              if (res.result.buttons !== undefined) {
                this.buttonCnt = res.result.buttons.length
                for (let i = 0; i < res.result.buttons.length; i++) {
                  if (res.result.buttons[i].type === 'app') {
                    this.bottons[i].btnSel = res.result.buttons[i].type
                    this.bottons[i].btnNameApp = res.result.buttons[i].title
                    this.bottons[i].btnPackageName = res.result.buttons[i].appLink.packageName
                    this.bottons[i].btnAction = res.result.buttons[i].appLink.scheme
                    this.bottons[i].btnUri = res.result.buttons[i].appLink.uri
                    this.bottons[i].btnLink = res.result.buttons[i].link
                  } else if (res.result.buttons[i].type === 'chat') {
                    this.bottons[i].btnSel = res.result.buttons[i].type
                    this.bottons[i].btnNameChat = res.result.buttons[i].title
                    this.bottons[i].btnPackageName = ''
                    this.bottons[i].btnAction = ''
                    this.bottons[i].btnUri = ''
                    this.bottons[i].btnLinkChat = res.result.buttons[i].link
                  } else if (res.result.buttons[i].type === 'call') {
                    this.bottons[i].btnSel = res.result.buttons[i].type
                    this.bottons[i].btnNameCall = res.result.buttons[i].title
                    this.bottons[i].btnPackageName = ''
                    this.bottons[i].btnAction = ''
                    this.bottons[i].btnUri = ''
                    this.bottons[i].btnLinkCall = res.result.buttons[i].link
                  } else if (res.result.buttons[i].type === 'url') {
                    this.bottons[i].btnSel = res.result.buttons[i].type
                    this.bottons[i].btnNameUrl = res.result.buttons[i].title
                    this.bottons[i].btnPackageName = ''
                    this.bottons[i].btnAction = ''
                    this.bottons[i].btnUri = ''
                    this.bottons[i].btnLinkUrl = res.result.buttons[i].link
                  }
                }
              }

            // 유형 slide
            } else if (res.result.type === 'slide') {
              this.typeName = 'Slide View'
              this.slideCnt = []
              for (let i = 0; i < res.result.slide.length; i++) {
                let description = ''
                if (res.result.slide[i].description !== null && res.result.slide[i].description !== undefined) {
                  description = this.replaceHtml(res.result.slide[i].description)
                }
                let params = {
                  slideIndex: i,
                  slideTitle: this.replaceHtml(res.result.slide[i].title),
                  slideDescription: description, // 내용
                  slideDescription1: this.replaceTexttoHtml(description).replace(/\(|\)|on.*\(|eval\(|javascript/gi, '').split('\n').join('<br />'), // 내용
                  slideType: '',
                  slideButtonCnt: '0', // 버튼 노출 갯수
                  slideBottons: [{ slideBtnSel: '', slideBtnName: '', slideBtnNameApp: '', slideBtnNameChat: '', slideBtnNameCall: '', slideBtnNameUrl: '', slideBtnText: '', slideBtnPackageName: '', slideBtnAction: '', slideBtnUri: '', slideBtnLink: '' }, { slideBtnSel: '', slideBtnName: '', slideBtnNameApp: '', slideBtnNameChat: '', slideBtnNameCall: '', slideBtnNameUrl: '', slideBtnText: '', slideBtnPackageName: '', slideBtnAction: '', slideBtnUri: '', slideBtnLink: '' }]
                }

                if (res.result.slide[i].buttons !== null && res.result.slide[i].buttons !== undefined) {
                  params.slideButtonCnt = res.result.slide[i].buttons.length
                  for (let k = 0; k < res.result.slide[i].buttons.length; k++) {
                    if (res.result.slide[i].buttons[k].type === 'app') {
                      params.slideBottons[k] = { slideBtnSel: res.result.slide[i].buttons[k].type, slideBtnNameApp: res.result.slide[i].buttons[k].title, slideBtnPackageName: res.result.slide[i].buttons[k].appLink.packageName, slideBtnAction: res.result.slide[i].buttons[k].appLink.scheme, slideBtnUri: res.result.slide[i].buttons[k].appLink.uri, slideBtnLink: res.result.slide[i].buttons[k].link }
                    } else if (res.result.slide[i].buttons[k].type === 'chat') {
                      params.slideBottons[k] = { slideBtnSel: res.result.slide[i].buttons[k].type, slideBtnNameChat: res.result.slide[i].buttons[k].title, slideBtnPackageName: '', slideBtnAction: '', slideBtnUri: '', slideBtnLinkChat: res.result.slide[i].buttons[k].link }
                    } else if (res.result.slide[i].buttons[k].type === 'call') {
                      params.slideBottons[k] = { slideBtnSel: res.result.slide[i].buttons[k].type, slideBtnNameCall: res.result.slide[i].buttons[k].title, slideBtnPackageName: '', slideBtnAction: '', slideBtnUri: '', slideBtnLinkCall: res.result.slide[i].buttons[k].link }
                    } else if (res.result.slide[i].buttons[k].type === 'url') {
                      params.slideBottons[k] = { slideBtnSel: res.result.slide[i].buttons[k].type, slideBtnNameUrl: res.result.slide[i].buttons[k].title, slideBtnPackageName: '', slideBtnAction: '', slideBtnUri: '', slideBtnLinkUrl: res.result.slide[i].buttons[k].link }
                    }
                  }
                }

                // 유형 slide > galllery
                if (res.result.slide[i].type === 'gallery') {
                  params.slideType = 'gallery'
                  params.slideMedia = []
                  for (let k = 0; k < res.result.slide[i].media.length; k++) {
                    params.slideMedia[k] = { orderNo: k, fileId: res.result.slide[i].media[k].fileId, preview: res.result.slide[i].media[k].url }
                  }
                  params.slideUploadImageIndex = 0
                  params.slideOgImage = ''
                  params.slideOgTitle = ''
                  params.slideOgContent = ''
                  params.slideSnsLink = ''
                  this.slideCnt.push(params)
                // 유형 slide > share
                } else if (res.result.slide[i].type === 'share') {
                  params.slideType = 'share'
                  params.slideMedia = []
                  params.slideUploadImageIndex = 0
                  params.slideOgImage = res.result.slide[i].share.imageUrl // 태그 이미지
                  params.slideOgTitle = res.result.slide[i].share.title.slice(0, 80) // 태그 타이틀
                  params.slideOgContent = res.result.slide[i].share.description // 태그 내용
                  params.slideSnsLink = res.result.slide[i].share.snsLink // 연결URL
                  params.slideOgYn = true
                  if (params.slideSnsLink.indexOf('youtube') !== -1 || params.slideSnsLink.indexOf('youtu.be') !== -1) {
                    params.slideYoutubeYn = 'Y'
                  } else {
                    params.slideYoutubeYn = 'N'
                  }
                  this.slideCnt.push(params)
                }
              }
            }
          } else {
            this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
          }
        })
        .catch(res => {
          this.xhrCatch(res)
        })

      // 소식 업데이트내역 가져오기
      feedUpdateHistory(this.brandId, this.feedId).then(res => {
        if (res.code === '20000000') {
          for (let i = 0; i < res.result.length; i++) {
            res.result[i].regDt = this.dateFormat1(res.result[i].regDt)
            if (i < 1) {
              this.hist1.push(res.result[i])
            } else {
              this.hist2.push(res.result[i])
            }
          }
        } else {
          this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
        }
      })
    },

    moveRoute(path) {
      this.$router.push(path).catch(e => {})
    },

    // 슬라이드
    textChange(e) {
      let text = e.target.value

      this.slideCnt[this.slideTab - 1].slideDescription1 = this.replaceTexttoHtml(text).replace(/\|\|on.*\(|eval\(|javascript/gi, '').split('\n').join('<br />')
      this.setSlideBox()
    },

    changed1(e) {
      let smallTotal = e.item.count
      let smallItemsPerPage = e.page.size
      let smallItemGoOut = e.item.index
      let smallItemRemain = smallTotal - (smallItemsPerPage + smallItemGoOut)

      if (smallItemRemain === 0) { $('.slideSmall').removeClass().addClass('slideSmall last') } else { $('.slideSmall').removeClass().addClass('slideSmall col' + (smallItemGoOut + 1)) }
    },
    changed2(e) {
      let total = e.item.count
      let itemsPerPage = e.page.size
      let itemGoOut = e.item.index
      let itemRemain = total - (itemsPerPage + itemGoOut)
      if (itemRemain === 0) { $('.slideMedium').removeClass().addClass('slideMedium last') } else { $('.slideMedium').removeClass().addClass('slideMedium col' + (itemGoOut + 1)) }
    },

    dateFormat1(dateparam) {
      let year = dateparam.substring(0, 4)
      let month = dateparam.substring(4, 6)
      let day = dateparam.substring(6, 8)
      let hour = dateparam.substring(8, 10)
      let minute = dateparam.substring(10, 12)
      let second = dateparam.substring(12, 14)
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    },
    // 사용자 정보 조회
    getUserInfo() {
      let reqData = {
        userType: this.userInfo.userType,
        corpId: this.userInfo.corpId
      }
      getUserInfo(reqData).then(res => {
        this.corpInfo.name = res.result.name
        this.corpInfo.corpId = res.result.corpId
        this.corpInfo.aprvReqDt = res.result.aprvReqDt ? res.result.aprvReqDt : ' '
        this.corpInfo.brandOperYn = res.result.brandOperYn
        this.corpInfo.reqCorpAdmYn = res.result.reqCorpAdmYn
        this.corpInfo.status = res.result.status
        this.corpInfo.aprvStatus = res.result.aprvStatus
      })
    },
    // URL 복사 버튼 클릭 시
    copyUrlToast() {
      this.copyUrlShow = true
      setTimeout(function () {
        this.copyUrlShow = false
      }.bind(this), 2000)
      this.$copyText(this.copyUrl)
    },
    // sharing 타입 url입력 후 적용 버튼 클릭 시
    checkOgtag() {
      // <!-- Native이슈로 임시처리(추후 삭제 필요)
      if (this.snsLink.indexOf('youtube') === -1 && this.snsLink.indexOf('youtu.be') === -1) {
        this.$alertMsg('연결 URL은 YouTube만 등록 가능합니다.')
        return
      }
      // Native이슈로 임시처리(추후 삭제 필요) -->

      if (jglib.isUrl(this.snsLink)) {
        getOgTagInfo(encodeURIComponent(this.snsLink)).then(res => {
          if (res.code === '20000000' && res.result.httpCode === 200) {
            this.ogImage = res.result.image

            // <!-- Native이슈로 임시처리(추후 삭제 필요)
            if (res.result.title === '') {
              this.ogTitle = this.title
            } else {
              this.ogTitle = res.result.title.slice(0, 80)
            }
            // Native이슈로 임시처리(추후 삭제 필요) -->

            /* Native이슈로 임시처리(추후 원복 필요) this.ogTitle = res.result.title.slice(0, 80) */

            if (this.snsLink.indexOf('youtube') !== -1 || this.snsLink.indexOf('youtu.be') !== -1) {
              this.youtubeYn = 'Y'
            } else {
              this.youtubeYn = 'N'
            }
            this.ogYn = true
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

    // 쉐어 url 입력시
    shareLinkChange () {
      this.ogYn = false
    },

    // sharing 타입 이미지 취소 버튼 클릭 시
    shareDeleteButton(e) {
      if (jglib.isEmpty(e.target.getAttribute('index'))) {
        this.ogImage = ''
      } else {
        this.slideCnt[e.target.getAttribute('index')].slideOgImage = ''
      }
    },

    // 이미지 업로드 버튼 클릭 시
    imageUpload() {
      // 서버 업로드 후 이미지 ID 받아서 처리.
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        if (this.media.length + (i + 1) < 11) {
          let file = this.$refs.files.files[i]
          let formData = new FormData()
          formData.append('file', file)
          formData.append('type', this.type)
          let minW = 0
          let minH = 0

          if (this.type === 'gallery') {
            minW = 700
            minH = 600
          } else if (this.type === 'share') {
            minW = 700
            minH = 500
          }

          if (file.size > 3145728) {
            this.$alertMsg('이미지 용량은 최대 3MB까지만 가능합니다.')
            document.querySelector('.btn_add2').value = ''
            return
          }
          let fileExt = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length).toLowerCase()
          if (fileExt !== 'jpg' && fileExt !== 'jpeg' && fileExt !== 'gif' && fileExt !== 'png') {
            this.$alertMsg('이미지는 jpg, jpeg, png, gif 만 가능 합니다.')
            document.querySelector('.btn_add2').value = ''
            return
          }

          jglib.checkFeedImageSize(file, minW, minH, 1080, 1080).then((valid) => {
            if (valid === 'valid') {
              fileUpload(this.selBrand.brandId, formData).then(res => {
                if (this.type === 'gallery') {
                  this.media = [
                    ...this.media,
                    // 이미지 업로드
                    {
                      // 실제 파일
                      file: this.$refs.files.files[i],
                      // 이미지 프리뷰
                      preview: res.result.url,
                      // 삭제및 관리를 위한 number
                      orderNo: this.media.length,

                      fileId: res.result.fileId
                    }
                  ]
                } else if (this.type === 'share') {
                  this.ogImage = res.result.url
                }
                document.querySelector('.btn_add2').value = ''
              })
                .catch(res => {
                  this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
                })
            } else if (valid === 'size') {
              this.$alertMsg('최소(' + minW + 'X' + minH + 'px), 최대(1080X1080px) 사이즈 파일만 업로드 할 수 있습니다.')
              document.querySelector('.btn_add2').value = ''
            } else {
              this.$alertMsg('이미지는 jpg, jpeg, png, gif 만 가능 합니다.')
              document.querySelector('.btn_add2').value = ''
            }
          })
        }
      }
    },
    // 이미지 삭제 버튼 클릭 시
    fileDeleteButton(e) {
      const index = e.target.getAttribute('index')
      this.media = this.media.filter(data => data.orderNo !== Number(index))
    },
    // 이미지 < 버튼 클릭 시
    fileUpButton(e) {
      const index = e.target.getAttribute('index')

      if (Number(index) !== 0) {
        let currentList = this.media
        const item = currentList.splice(index, 1)
        currentList.splice(index - 1, 0, item[0])

        this.media = currentList
      }
    },
    // 이미지 > 버튼 클릭 시
    fileDownButton(e) {
      const index = e.target.getAttribute('index')

      if (Number(index) !== this.media.length) {
        let currentList = this.media
        const item = currentList.splice(index, 1)
        currentList.splice(index + 1, 0, item[0])

        this.media = currentList
      }
    },

    // 슬라이드 탭 선택 시
    selectSlideTab(e) {
      const index = e.target.getAttribute('index')
      this.type1 = '1'
      this.setSlideBox()
      setTimeout(function () {
        this.type1 = '0'
        setTimeout(function () {
          this.moveToSlide(index)
          this.slideTab = Number(index)
        }.bind(this))
      }.bind(this))
    },
    // 슬아이드 탭 추가 시
    slideAdd() {
      let tabData = {
        slideIndex: (this.slideCnt.length + 1), // 시작번호
        slideType: 'gallery', // 유형
        slideTitle: '', // 제목
        slideDescription: '', // 내용
        slideButtonCnt: '0', // 버튼 노출 갯수
        slideBottons: [{ slideBtnSel: '', slideBtnName: '', slideBtnText: '', slideBtnPackageName: '', slideBtnAction: '', slideBtnUri: '', slideBtnLink: '' }, { slideBtnSel: '', slideBtnName: '', slideBtnText: '', slideBtnPackageName: '', slideBtnAction: '', slideBtnUri: '', slideBtnLink: '' }],
        slideOgImage: '', // 태그 이미지
        slideOgTitle: '', // 태그 타이틀
        // slideOgContent: '', // 태그 내용
        slideSnsLink: '', // 연결URL
        slideMedia: [], // 업로드용 파일
        slideUploadImageIndex: 0 // 이미지 업로드를 위한 변수
      }
      this.type1 = '1'
      this.slideCnt.push(tabData)

      setTimeout(function () {
        this.type1 = '0'
        this.setSlideBox()
        setTimeout(function () {
          this.moveToSlide(this.slideCnt.length)
          this.slideTab = Number(this.slideCnt.length)
        }.bind(this))
      }.bind(this))
    },
    // 슬라이드 탭 삭제 시
    slideDelete(e) {
      this.$confirmMsg('Slide를 삭제하시겠습니까?<br><br>Slide삭제시 해당 Slide에 입력된 내용이 모두 삭제됩니다.', '', '확인', '취소').then(() => {
        const index = e.target.getAttribute('index')
        this.slideCnt.splice(index, 1)
        if (Number(index) + 1 === this.slideTab) {
          if ((this.slideCnt.length + 1) === Number(index) + 1) {
            this.slideTab = Number(index)
            $("span[id^='carousel_prev_']")[0].click()
            $("span[id^='carousel_prev_']")[1].click()
          }
        } else {
          if (Number(index) + 1 < this.slideTab) {
            this.slideTab = Number(this.slideTab - 1)
            $("span[id^='carousel_prev_']")[0].click()
            $("span[id^='carousel_prev_']")[1].click()
          }
        }
      })
        .catch(e => {})
    },
    // 슬라이드 < 버튼 클릭 시
    slideUpButtonSlide() {
      if (this.slideTab !== 1) {
        let currentList = this.slideCnt
        const item = currentList.splice((this.slideTab - 1), 1)
        currentList.splice((this.slideTab - 1) - 1, 0, item[0])

        this.slideCnt = currentList

        this.slideTab = Number(this.slideTab - 1)

        $("span[id^='carousel_prev_']")[0].click()
        $("span[id^='carousel_prev_']")[1].click()
      }
    },
    // 슬라이드 > 버튼 클릭 시
    slideDownButtonSlide() {
      if (this.slideTab !== 10) {
        let currentList = this.slideCnt
        const item = currentList.splice((this.slideTab - 1), 1)
        currentList.splice((this.slideTab - 1) + 1, 0, item[0])

        this.slideCnt = currentList
        this.slideTab = Number(this.slideTab + 1)
        $("span[id^='carousel_next_']")[0].click()
        $("span[id^='carousel_next_']")[1].click()
      }
    },
    // 슬라이드 이미지 업로드 버튼 클릭 시
    imageUploadSlide() {
      // 서버 업로드 후 이미지 ID 받아서 처리.
      if (this.slideCnt[this.slideTab - 1].slideMedia.length < 1) {
        let file = this.$refs.filesSlide.files[0]
        let formData = new FormData()
        formData.append('file', file)

        let minW = 0
        let minH = 0

        if (this.slideCnt[this.slideTab - 1].slideType === 'gallery') {
          minW = 700
          minH = 700
          formData.append('type', 'slide')
        } else if (this.slideCnt[this.slideTab - 1].slideType === 'share') {
          minW = 700
          minH = 500
          formData.append('type', 'share')
        }

        if (file.size > 3145728) {
          this.$alertMsg('이미지 용량은 최대 3MB까지만 가능합니다.')
          $('.btn_add2').val('')
          return
        }

        let fileExt = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length).toLowerCase()
        if (fileExt !== 'jpg' && fileExt !== 'jpeg' && fileExt !== 'gif' && fileExt !== 'png') {
          this.$alertMsg('이미지는 jpg, jpeg, png, gif 만 가능 합니다.')
          $('.btn_add2').val('')
          return
        }

        jglib.checkFeedSlideImageSize(file, this.slideCnt[this.slideTab - 1].slideType, minW, minH, 1080, 1080).then((valid) => {
          if (valid === 'valid') {
            fileUpload(this.selBrand.brandId, formData).then(res => {
              if (this.slideCnt[this.slideTab - 1].slideType === 'gallery') {
                this.slideCnt[this.slideTab - 1].slideMedia = [
                  ...this.slideCnt[this.slideTab - 1].slideMedia,
                  // 이미지 업로드
                  {
                  // 실제 파일
                    file: this.$refs.filesSlide.files[0],
                    // 이미지 프리뷰
                    preview: res.result.url,
                    // 삭제및 관리를 위한 number
                    orderNo: this.slideCnt[this.slideTab - 1].slideMedia.length,

                    fileId: res.result.fileId
                  }
                ]
              } else if (this.slideCnt[this.slideTab - 1].slideType === 'share') {
                this.slideCnt[this.slideTab - 1].slideOgImage = res.result.url
              }
              $('.btn_add2').val('')
            })
              .catch(res => {
                this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
                $('.btn_add2').val('')
              })
          } else if (valid === 'size') {
            if (this.slideCnt[this.slideTab - 1].slideType === 'gallery') {
              this.$alertMsg('정사각형, 최소700pxX700px, 최대1080pxX1080px 사이즈 파일만 업로드 할 수 있습니다.')
            } else if (this.slideCnt[this.slideTab - 1].slideType === 'share') {
              this.$alertMsg('최소700pxX500px, 최대1080pxX1080px 사이즈 파일만 업로드 할 수 있습니다.')
            }
            $('.btn_add2').val('')
          } else {
            this.$alertMsg('이미지는 jpg, jpeg, png, gif 만 가능 합니다.')
            $('.btn_add2').val('')
          }
        })
      }
    },
    // 슬라이드 이미지 삭제 버튼 클릭 시
    fileDeleteButtonSlide(e) {
      const index = e.target.getAttribute('index')
      this.slideCnt[this.slideTab - 1].slideMedia = this.slideCnt[this.slideTab - 1].slideMedia.filter(data => data.orderNo !== Number(index))
    },
    // 슬라이드 이미지 < 버튼 클릭 시
    fileUpButtonSlide(e) {
      const index = e.target.getAttribute('index')

      if (Number(index) !== 0) {
        let currentList = this.slideCnt[this.slideTab - 1].slideMedia
        const item = currentList.splice(index, 1)
        currentList.splice(index - 1, 0, item[0])

        this.slideCnt[this.slideTab - 1].slideMedia = currentList
      }
    },
    // 슬라이드 이미지 > 버튼 클릭 시
    fileDownButtonSlide(e) {
      const index = e.target.getAttribute('index')

      if (Number(index) !== this.slideCnt[this.slideTab - 1].slideMedia.length) {
        let currentList = this.slideCnt[this.slideTab - 1].slideMedia
        const item = currentList.splice(index, 1)
        currentList.splice(index + 1, 0, item[0])

        this.slideCnt[this.slideTab - 1].slideMedia = currentList
      }
    },
    // slideView 타입 url입력 후 적용 버튼 클릭 시
    checkOgtagSlide() {
      if (this.slideCnt[this.slideTab - 1].slideSnsLink.indexOf('youtube') === -1 && this.slideCnt[this.slideTab - 1].slideSnsLink.indexOf('youtu.be') === -1) {
        this.$alertMsg('연결 URL은 YouTube만 등록 가능합니다.')
        return
      }

      if (jglib.isUrl(this.slideCnt[this.slideTab - 1].slideSnsLink)) {
        getOgTagInfo(encodeURIComponent(this.slideCnt[this.slideTab - 1].slideSnsLink)).then(res => {
          if (res.code === '20000000' && res.result.httpCode === 200) {
            if (this.slideCnt[this.slideTab - 1].slideSnsLink.indexOf('youtube') !== -1 || this.slideCnt[this.slideTab - 1].slideSnsLink.indexOf('youtu.be') !== -1) {
              this.slideCnt[this.slideTab - 1].slideYoutubeYn = 'Y'
            } else {
              this.slideCnt[this.slideTab - 1].slideYoutubeYn = 'N'
            }
            this.slideCnt[this.slideTab - 1].slideOgImage = ' '
            this.slideCnt[this.slideTab - 1].slideOgImage = res.result.image
            this.slideCnt[this.slideTab - 1].slideOgTitle = res.result.title.slice(0, 80)
            this.slideCnt[this.slideTab - 1].slideOgYn = true
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
    // 쉐어 url 입력시
    shareSlideLinkChange (id) {
      this.slideCnt[id].slideOgYn = false
    },
    // 썸네일 보기 버튼 클릭 시
    showLayer() {
      if (this.media.length < 1) {
        this.$alertMsg('썸네일은 이미지 등록 후 확인 가능합니다.')
      } else {
        this.layerStatus = true
      }
    },
    // 썸네일 레이어 확인 버튼 클릭 시
    closeLayer() {
      this.layerStatus = false
    },
    // 양방향대화방 선택 클릭 시
    showChatPopup(btnId) {
      this.chatBtnId = btnId
      this.isShowFeedTwowayPopup = true
    },
    // 양방향대화방 선택값 리턴
    selChatbotId(val) {
      if (this.chatBtnId === 'btn1') {
        this.bottons[0].btnLinkChat = val
      } else if (this.chatBtnId === 'btn2') {
        this.bottons[1].btnLinkChat = val
      } else if (this.chatBtnId === 'slideBtn1') {
        this.slideCnt[this.slideTab - 1].slideBottons[0].slideBtnLinkChat = val
      } else if (this.chatBtnId === 'slideBtn2') {
        this.slideCnt[this.slideTab - 1].slideBottons[1].slideBtnLinkChat = val
      }
    },
    // 게시방법에 따른 상단고정 해제
    typeChacge(val) {
      this.pinYn = false
    },
    // 버튼 타입 변경 시
    changeBotton(idx, slideIdx) {
      if (slideIdx === undefined) {
        this.bottons[idx].btnName = ''
        this.bottons[idx].btnPackageName = ''
        this.bottons[idx].btnAction = ''
        this.bottons[idx].btnUri = ''
        this.bottons[idx].btnLink = ''
      } else {
        this.slideCnt[slideIdx].slideBottons[idx].slideBtnName = ''
        this.slideCnt[slideIdx].slideBottons[idx].slideBtnText = ''
        this.slideCnt[slideIdx].slideBottons[idx].slideBtnPackageName = ''
        this.slideCnt[slideIdx].slideBottons[idx].slideBtnAction = ''
        this.slideCnt[slideIdx].slideBottons[idx].slideBtnUri = ''
        this.slideCnt[slideIdx].slideBottons[idx].slideBtnLink = ''
      }
    },
    // Validation 체크 필수값
    validation(status) {
      if (jglib.isEmpty(this.selBrand.brandId)) {
        this.$alertMsg('브랜드를 선택해주세요.')
        return false
      }

      if (jglib.isEmpty(this.title)) {
        this.$alertMsg('제목을 입력해주세요.')
        return false
      }

      // gallery 타입 일 경우
      if (this.type === 'gallery') {
        if (this.media.length < 1) {
          this.$alertMsg('이미지를 최소 1장 등록해주세요.')
          return false
        }
        // 버튼 필수값 체크
        if (this.buttonCnt !== 0) {
          for (let k = 0; k < this.buttonCnt; k++) {
            const _button = `[버튼${k + 1}]`
            if (jglib.isEmpty(this.bottons[k].btnSel)) {
              this.$alertMsg(`${_button} 선택해주세요`)
              return false
            }
            if (this.bottons[k].btnSel === 'app') {
              if (jglib.isEmpty(this.bottons[k].btnNameApp)) {
                this.$alertMsg(`${_button} 버튼명을 입력해주세요`)
                return false
              }
              if (jglib.isEmpty(this.bottons[k].btnPackageName)) {
                this.$alertMsg(`${_button} 패키지명을 입력해주세요.`)
                return false
              }
              if (jglib.isEmpty(this.bottons[k].btnAction)) {
                this.$alertMsg(`${_button} 액션명을 입력해주세요.`)
                return false
              }
              if (jglib.isEmpty(this.bottons[k].btnUri)) {
                this.$alertMsg(`${_button} uri를 입력해주세요.`)
                return false
              }
            } else {
              if (this.bottons[k].btnSel === 'url') {
                if (jglib.isEmpty(this.bottons[k].btnNameUrl)) {
                  this.$alertMsg(`${_button} 버튼명을 입력해주세요`)
                  return false
                }
                if (jglib.isEmpty(this.bottons[k].btnLinkUrl)) {
                  this.$alertMsg(`${_button} 상세내용을 입력해주세요.`)
                  return false
                }
                if (!jglib.isUrl(this.bottons[k].btnLinkUrl)) {
                  this.$alertMsg(`${_button} 연결 URL을 정확히 입력해주세요.`)
                  return false
                }
              } else if (this.bottons[k].btnSel === 'call') {
                if (jglib.isEmpty(this.bottons[k].btnNameCall)) {
                  this.$alertMsg(`${_button} 버튼명을 입력해주세요`)
                  return false
                }
                if (jglib.isEmpty(this.bottons[k].btnLinkCall)) {
                  this.$alertMsg(`${_button} 상세내용을 입력해주세요.`)
                  return false
                }
                if (isNaN(this.bottons[k].btnLinkCall)) {
                  this.$alertMsg(`${_button} 전화번호는 숫자만 가능합니다.`)
                  return false
                }
              } else if (this.bottons[k].btnSel === 'chat') {
                if (jglib.isEmpty(this.bottons[k].btnNameChat)) {
                  this.$alertMsg(`${_button} 버튼명을 입력해주세요`)
                  return false
                }
                if (jglib.isEmpty(this.bottons[k].btnLinkChat)) {
                  this.$alertMsg(`${_button} 상세내용을 입력해주세요.`)
                  return false
                }
              }
            }
          }
        }

      // share 타입 일 경우
      } else if (this.type === 'share') {
        // <!-- Native이슈로 임시처리(추후 삭제 필요)
        if (this.snsLink.indexOf('youtube') === -1 && this.snsLink.indexOf('youtu.be') === -1) {
          this.$alertMsg('연결 URL은 YouTube만 등록 가능합니다.')
          return false
        }
        // Native이슈로 임시처리(추후 삭제 필요) -->
        if (jglib.isEmpty(this.snsLink)) {
          this.$alertMsg('연결 URL을 입력해주세요.')
          return false
        }
        if (!jglib.isUrl(this.snsLink)) {
          this.$alertMsg('연결 URL을 정확히 입력해주세요.')
          return false
        }
        if (!this.ogYn) {
          this.$alertMsg('연결 URL의 적용 버튼을 눌러주세요.')
          return false
        }
        if (jglib.isEmpty(this.ogTitle)) {
          this.$alertMsg('연결 URL 타이틀을 입력해주세요.')
          return false
        }
        if (jglib.isEmpty(this.ogImage)) {
          this.$alertMsg('연결 URL 이미지를 최소 1장 등록해주세요.')
          return false
        }

        // 버튼 필수값 체크
        if (this.buttonCnt !== 0) {
          for (let k = 0; k < this.buttonCnt; k++) {
            const _button = `[버튼${k + 1}]`
            if (jglib.isEmpty(this.bottons[k].btnSel)) {
              this.$alertMsg(`${_button} 선택해주세요`)
              return false
            }
            if (this.bottons[k].btnSel === 'app') {
              if (jglib.isEmpty(this.bottons[k].btnNameApp)) {
                this.$alertMsg(`${_button} 버튼명을 입력해주세요`)
                return false
              }
              if (jglib.isEmpty(this.bottons[k].btnPackageName)) {
                this.$alertMsg(`${_button} 패키지명을 입력해주세요.`)
                return false
              }
              if (jglib.isEmpty(this.bottons[k].btnAction)) {
                this.$alertMsg(`${_button} 액션명을 입력해주세요.`)
                return false
              }
              if (jglib.isEmpty(this.bottons[k].btnUri)) {
                this.$alertMsg(`${_button} uri를 입력해주세요.`)
                return false
              }
            } else {
              if (this.bottons[k].btnSel === 'url') {
                if (jglib.isEmpty(this.bottons[k].btnNameUrl)) {
                  this.$alertMsg(`${_button} 버튼명을 입력해주세요`)
                  return false
                }
                if (jglib.isEmpty(this.bottons[k].btnLinkUrl)) {
                  this.$alertMsg(`${_button} 상세내용을 입력해주세요.`)
                  return false
                }
                if (!jglib.isUrl(this.bottons[k].btnLinkUrl)) {
                  this.$alertMsg(`${_button} 연결 URL을 정확히 입력해주세요.`)
                  return false
                }
              } else if (this.bottons[k].btnSel === 'call') {
                if (jglib.isEmpty(this.bottons[k].btnNameCall)) {
                  this.$alertMsg(`${_button} 버튼명을 입력해주세요`)
                  return false
                }
                if (jglib.isEmpty(this.bottons[k].btnLinkCall)) {
                  this.$alertMsg(`${_button} 상세내용을 입력해주세요.`)
                  return false
                }
                if (isNaN(this.bottons[k].btnLinkCall)) {
                  this.$alertMsg(`${_button} 전화번호는 숫자만 가능합니다.`)
                  return false
                }
              } else if (this.bottons[k].btnSel === 'chat') {
                if (jglib.isEmpty(this.bottons[k].btnNameChat)) {
                  this.$alertMsg(`${_button} 버튼명을 입력해주세요`)
                  return false
                }
                if (jglib.isEmpty(this.bottons[k].btnLinkChat)) {
                  this.$alertMsg(`${_button} 상세내용을 입력해주세요.`)
                  return false
                }
              }
            }
          }
        }
      // slide 타입 일 경우
      } else if (this.type === 'slide') {
        for (let i = 0; i < this.slideCnt.length; i++) {
          const _slide = `[Slide ${i + 1}]`
          if (jglib.isEmpty(this.slideCnt[i].slideTitle)) {
            this.$alertMsg(`${_slide} 제목을 입력해주세요`)
            return false
          }
          if (this.slideCnt[i].slideType === 'gallery') {
            if (this.slideCnt[i].slideMedia.length < 1) {
              this.$alertMsg(`${_slide} 이미지를 최소 1장 등록해주세요.`)
              return false
            }
          } else if (this.slideCnt[i].slideType === 'share') {
            if (jglib.isEmpty(this.slideCnt[i].slideSnsLink)) {
              this.$alertMsg(`${_slide} 연결 URL을 입력해주세요.`)
              return false
            }
            if (!this.slideCnt[i].slideOgYn) {
              this.$alertMsg(`${_slide} 연결 URL의 적용 버튼을 눌러주세요.`)
              return false
            }
            if (!jglib.isUrl(this.slideCnt[i].slideSnsLink)) {
              this.$alertMsg(`${_slide} 연결 URL을 정확히 입력해주세요.`)
              return false
            }
            if (jglib.isEmpty(this.slideCnt[i].slideOgTitle)) {
              this.$alertMsg(`${_slide} 연결 URL 타이틀을 입력해주세요.`)
              return false
            }
            if (jglib.isEmpty(this.slideCnt[i].slideOgImage)) {
              this.$alertMsg(`${_slide} 연결 URL 이미지를 최소 1장 등록해주세요.`)
              return false
            }
          }
          // 버튼 필수값 체크
          if (this.slideCnt[i].slideButtonCnt !== 0) {
            for (let k = 0; k < this.slideCnt[i].slideButtonCnt; k++) {
              const _button = `${_slide} [버튼${k + 1}]`
              if (jglib.isEmpty(this.slideCnt[i].slideBottons[k].slideBtnSel)) {
                this.$alertMsg(`${_button} 선택해주세요`)
                return false
              }
              if (this.slideCnt[i].slideBottons[k].slideBtnSel === 'app') {
                if (jglib.isEmpty(this.slideCnt[i].slideBottons[k].slideBtnNameApp)) {
                  this.$alertMsg(`${_button} 버튼명을 입력해주세요`)
                  return false
                }
                if (jglib.isEmpty(this.slideCnt[i].slideBottons[k].slideBtnPackageName)) {
                  this.$alertMsg(`${_button} 패키지명을 입력해주세요.`)
                  return false
                }
                if (jglib.isEmpty(this.slideCnt[i].slideBottons[k].slideBtnAction)) {
                  this.$alertMsg(`${_button} 스키마를 입력해주세요.`)
                  return false
                }
                if (jglib.isEmpty(this.slideCnt[i].slideBottons[k].slideBtnUri)) {
                  this.$alertMsg(`${_button} uri를 입력해주세요.`)
                  return false
                }
              } else {
                if (this.slideCnt[i].slideBottons[k].slideBtnSel === 'url') {
                  if (jglib.isEmpty(this.slideCnt[i].slideBottons[k].slideBtnNameUrl)) {
                    this.$alertMsg(`${_button} 버튼명을 입력해주세요`)
                    return false
                  }
                  if (jglib.isEmpty(this.slideCnt[i].slideBottons[k].slideBtnLinkUrl)) {
                    this.$alertMsg(`${_button} 상세내용을 입력해주세요.`)
                    return false
                  }
                  if (!jglib.isUrl(this.slideCnt[i].slideBottons[k].slideBtnLinkUrl)) {
                    this.$alertMsg(`${_button} 연결 URL을 정확히 입력해주세요.`)
                    return false
                  }
                } else if (this.slideCnt[i].slideBottons[k].slideBtnSel === 'call') {
                  if (jglib.isEmpty(this.slideCnt[i].slideBottons[k].slideBtnNameCall)) {
                    this.$alertMsg(`${_button} 버튼명을 입력해주세요`)
                    return false
                  }
                  if (jglib.isEmpty(this.slideCnt[i].slideBottons[k].slideBtnLinkCall)) {
                    this.$alertMsg(`${_button} 상세내용을 입력해주세요.`)
                    return false
                  }
                  if (isNaN(this.slideCnt[i].slideBottons[k].slideBtnLinkCall)) {
                    this.$alertMsg(`${_button} 전화번호는 숫자만 가능합니다.`)
                    return false
                  }
                } else if (this.slideCnt[i].slideBottons[k].slideBtnSel === 'chat') {
                  if (jglib.isEmpty(this.slideCnt[i].slideBottons[k].slideBtnNameChat)) {
                    this.$alertMsg(`${_button} 버튼명을 입력해주세요`)
                    return false
                  }
                  if (jglib.isEmpty(this.slideCnt[i].slideBottons[k].slideBtnLinkChat)) {
                    this.$alertMsg(`${_button} 상세내용을 입력해주세요.`)
                    return false
                  }
                }
              }
            }
          }
        }
      }
      // 예약 게시일 경우 일자 체크
      if (this.publishType === 'reservation' && (this.statusNum === 0 || this.statusNum === 2)) {
        if (jglib.isEmpty(this.pubDtYMD)) {
          this.$alertMsg('예약 게시 일자를 선택해주세요.')
          return false
        }
        if (jglib.isEmpty(this.pubDtHH)) {
          this.$alertMsg('예약 게시 시간을 선택해주세요.')
          return false
        }
        let date = new Date()
        let year = date.getFullYear().toString()
        let month = date.getMonth() + 1
        month = month < 10 ? '0' + month.toString() : month.toString()
        let day = date.getDate()
        day = day < 10 ? '0' + day.toString() : day.toString()
        let hour = date.getHours()
        hour = hour < 10 ? '0' + hour.toString() : hour.toString()
        let toDay = year + '' + month + '' + day + '' + hour
        let setDat = this.pubDtYMD + '' + this.pubDtHH
        if (setDat <= toDay) {
          this.$alertMsg('예약 게시는 지난 시간으로 설정할 수 없습니다. ')
          return false
        }
      }

      return true
    },

    // 저장 버튼 클릭 시
    saveFeed(status) {
      if (status === 'ok') {
        // 최초 등록 여부 체크
        getFeedCnt(this.selBrand.brandId).then(res => {
          if (res.result.isFirst) {
            // 브랜드 상태 체크
            getBrandStatus(this.selBrand.brandId).then(res => {
              if (!res.result) {
                this.$alertMsg('브랜드 상태 변경으로<br>소식을 등록할 수 없는 브랜드 입니다.<br><br>브랜드 상태 변경이 완료된 후<br>소식을 작성해 주세요.')
              } else {
                // 고정핀 선택 여부
                if (this.pinYn) {
                  // 기존 고정핀 게시물 확인
                  feedPinCheck(this.selBrand.brandId)
                    .then(res => {
                      if (res.code === '20000000') {
                        if (res.result !== null) {
                          if (res.result.feedId !== this.feedId) {
                            this.$confirmMsg('이미 [ 제목: ' + res.result.title + ' ]으로 고정된 게시물이 있습니다.<br>상단 고정 게시물을 변경하시겠습니까?', '', '확인', '취소')
                              .then(() => {
                                this.confirmFeed(status)
                              })
                              .catch(e => {
                                this.pinYn = false
                              })
                          } else {
                            this.confirmFeed(status)
                          }
                        } else {
                          this.confirmFeed(status)
                        }
                      } else {
                        this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
                      }
                    })
                    .catch(res => {
                      this.$alertMsg('처리중 오류가 발생하였습니다.')
                    })
                } else {
                  this.confirmFeed(status)
                }
              }
            })
          } else {
            // 고정핀 선택 여부
            if (this.pinYn) {
              // 기존 고정핀 게시물 확인
              feedPinCheck(this.selBrand.brandId)
                .then(res => {
                  if (res.code === '20000000') {
                    if (res.result !== null) {
                      this.$confirmMsg('이미 [ 제목: ' + res.result.title + ' ]으로 고정된 게시물이 있습니다.<br>상단 고정 게시물을 변경하시겠습니까?', '', '확인', '취소')
                        .then(() => {
                          this.confirmFeed(status)
                        })
                        .catch(e => {
                          this.pinYn = false
                        })
                    } else {
                      this.confirmFeed(status)
                    }
                  } else {
                    this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
                  }
                })
                .catch(res => {
                  this.$alertMsg('처리중 오류가 발생하였습니다.')
                })
            } else {
              this.confirmFeed(status)
            }
          }
        })
      } else if (status === 'modify') {
        // 고정핀 선택 여부
        if (this.pinYn) {
          // 기존 고정핀 게시물 확인
          feedPinCheck(this.selBrand.brandId)
            .then(res => {
              if (res.code === '20000000') {
                if (res.result !== null) {
                  if (res.result.feedId !== this.feedId) {
                    this.$confirmMsg('이미 [ 제목: ' + res.result.title + ' ]으로 고정된 게시물이 있습니다.<br>상단 고정 게시물을 변경하시겠습니까?', '', '확인', '취소')
                      .then(() => {
                        this.confirmFeed(status)
                      })
                      .catch(e => {
                        this.pinYn = false
                      })
                  } else {
                    this.confirmFeed(status)
                  }
                } else {
                  this.confirmFeed(status)
                }
              } else {
                this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
              }
            })
            .catch(res => {
              this.$alertMsg('처리중 오류가 발생하였습니다.')
            })
        } else {
          this.confirmFeed(status)
        }
      } else {
        this.confirmFeed(status)
      }
    },

    confirmFeed(status) {
      if (this.validation(status)) {
        let msg = ''
        const statusBtn = status
        if (status === 'save') {
          msg = '소식을 저장 하시겠습니까?<br><br>저장된 소식은 30일 후 자동 삭제 됩니다.'
        } else if (status === 'ok') {
          msg = '소식을 등록 하시겠습니까?<br><br>등록시 소식이 게시 됩니다. 단, 예약 게시인<br> 경우 예약된 시간에 소식이 게시 됩니다.'
        } else if (status === 'hide' && this.pinYn === false) {
          msg = '소식을 비공개 하시겠습니까?<br><br>비공개 처리된 소식은 30일 후 자동 삭제 됩니다.'
        } else if (status === 'hide' && this.pinYn === true) {
          msg = '고정 설정된 소식 입니다.정말 비공개 처리를 하시겠습니까?<br>비공개 처리 시 상단 고정 등록은 해제 됩니다.<br>비공개 처리된 소식은 30일 후 자동 삭제 됩니다.'
        } else if (status === 'modify') {
          msg = '소식을 수정 하시겠습니까?<br><br>※ 게시 중이거나 비공개 중인 소식은 수정된<br> 내용으로 <span class="underline">즉시 게시</span> 됩니다.'
          status = 'ok'
        }
        this.$confirmMsg(msg, '', '확인', '취소')
          .then(() => {
            let params = ''
            if (this.type === 'gallery') {
              params = {
                title: this.title, // 제목
                description: this.description, // 내용
                type: this.type, // 소식유형 (gallery, slide, share)
                media: [], // 이미지 정보
                status: status,
                publishType: this.publishType,
                pinYn: this.pinYn === true ? 'Y' : 'N'
              }

              for (let i = 0; i < this.media.length; i++) {
                params.media[i] = { orderNo: (i + 1), fileId: this.media[i].fileId }
              }

              if (this.buttonCnt > 0) {
                let buttons = []
                for (let i = 0; i < this.buttonCnt; i++) {
                  if (this.bottons[i].btnSel === 'app') {
                    buttons.push({
                      orderNo: i + 1,
                      type: this.bottons[i].btnSel,
                      title: this.bottons[i].btnNameApp,
                      appLink: {
                        packageName: this.bottons[i].btnPackageName,
                        scheme: this.bottons[i].btnAction,
                        uri: this.bottons[i].btnUri,
                        link: ''
                      }
                    })
                  } else if (this.bottons[i].btnSel === 'chat') {
                    buttons.push({
                      orderNo: i + 1,
                      title: this.bottons[i].btnNameChat,
                      type: this.bottons[i].btnSel,
                      link: this.bottons[i].btnLinkChat
                    })
                  } else if (this.bottons[i].btnSel === 'call') {
                    buttons.push({
                      orderNo: i + 1,
                      title: this.bottons[i].btnNameCall,
                      type: this.bottons[i].btnSel,
                      link: this.bottons[i].btnLinkCall
                    })
                  } else if (this.bottons[i].btnSel === 'url') {
                    buttons.push({
                      orderNo: i + 1,
                      title: this.bottons[i].btnNameUrl,
                      type: this.bottons[i].btnSel,
                      link: this.bottons[i].btnLinkUrl
                    })
                  }
                }
                params = {
                  ...params,
                  buttons: buttons
                }
              }
            } else if (this.type === 'share') {
              params = {
                title: this.title, // 제목
                description: this.description, // 내용
                type: this.type, // 소식유형 (gallery, slide, share)
                share: { title: this.ogTitle, imageUrl: this.ogImage, snsLink: this.snsLink },
                status: status,
                publishType: this.publishType,
                pinYn: this.pinYn === true ? 'Y' : 'N'
              }

              if (this.buttonCnt > 0) {
                let buttons = []
                for (let i = 0; i < this.buttonCnt; i++) {
                  if (this.bottons[i].btnSel === 'app') {
                    buttons.push({
                      orderNo: i + 1,
                      type: this.bottons[i].btnSel,
                      title: this.bottons[i].btnNameApp,
                      appLink: {
                        packageName: this.bottons[i].btnPackageName,
                        scheme: this.bottons[i].btnAction,
                        uri: this.bottons[i].btnUri,
                        link: this.bottons[i].btnLink
                      }
                    })
                  } else if (this.bottons[i].btnSel === 'chat') {
                    buttons.push({
                      orderNo: i + 1,
                      title: this.bottons[i].btnNameChat,
                      type: this.bottons[i].btnSel,
                      link: this.bottons[i].btnLinkChat
                    })
                  } else if (this.bottons[i].btnSel === 'call') {
                    buttons.push({
                      orderNo: i + 1,
                      title: this.bottons[i].btnNameCall,
                      type: this.bottons[i].btnSel,
                      link: this.bottons[i].btnLinkCall
                    })
                  } else if (this.bottons[i].btnSel === 'url') {
                    buttons.push({
                      orderNo: i + 1,
                      title: this.bottons[i].btnNameUrl,
                      type: this.bottons[i].btnSel,
                      link: this.bottons[i].btnLinkUrl
                    })
                  }
                }
                params = {
                  ...params,
                  buttons: buttons
                }
              }
            } else if (this.type === 'slide') {
              params = {
                title: this.title, // 제목
                description: this.description, // 내용
                type: this.type, // 소식유형 (gallery, slide, share)
                slide: [],
                status: status,
                publishType: this.publishType,
                pinYn: this.pinYn === true ? 'Y' : 'N'
              }

              for (let i = 0; i < this.slideCnt.length; i++) {
                if (this.slideCnt[i].slideType === 'gallery') {
                  params.slide[i] = { orderNo: (i + 1), title: this.slideCnt[i].slideTitle, description: this.slideCnt[i].slideDescription, type: this.slideCnt[i].slideType }
                  let media = []

                  // 이미지 정보 생성
                  for (let k = 0; k < this.slideCnt[i].slideMedia.length; k++) {
                    media.push({
                      orderNo: k + 1,
                      fileId: this.slideCnt[i].slideMedia[k].fileId
                    })
                  }
                  params.slide[i] = {
                    ...params.slide[i],
                    media: media
                  }
                  // 버튼 정보 생성
                  if (this.slideCnt[i].slideButtonCnt > 0) {
                    let buttons = []
                    for (let k = 0; k < this.slideCnt[i].slideButtonCnt; k++) {
                      if (this.slideCnt[i].slideBottons[k].slideBtnSel === 'app') {
                        buttons.push({
                          orderNo: k + 1,
                          type: this.slideCnt[i].slideBottons[k].slideBtnSel,
                          title: this.slideCnt[i].slideBottons[k].slideBtnNameApp,
                          appLink: {
                            packageName: this.slideCnt[i].slideBottons[k].slideBtnPackageName,
                            scheme: this.slideCnt[i].slideBottons[k].slideBtnAction,
                            uri: this.slideCnt[i].slideBottons[k].slideBtnUri,
                            link: ''
                          }
                        })
                      } else if (this.slideCnt[i].slideBottons[k].slideBtnSel === 'chat') {
                        buttons.push({
                          orderNo: k + 1,
                          type: this.slideCnt[i].slideBottons[k].slideBtnSel,
                          title: this.slideCnt[i].slideBottons[k].slideBtnNameChat,
                          link: this.slideCnt[i].slideBottons[k].slideBtnLinkChat
                        })
                      } else if (this.slideCnt[i].slideBottons[k].slideBtnSel === 'call') {
                        buttons.push({
                          orderNo: k + 1,
                          type: this.slideCnt[i].slideBottons[k].slideBtnSel,
                          title: this.slideCnt[i].slideBottons[k].slideBtnNameCall,
                          link: this.slideCnt[i].slideBottons[k].slideBtnLinkCall
                        })
                      } else if (this.slideCnt[i].slideBottons[k].slideBtnSel === 'url') {
                        buttons.push({
                          orderNo: k + 1,
                          type: this.slideCnt[i].slideBottons[k].slideBtnSel,
                          title: this.slideCnt[i].slideBottons[k].slideBtnNameUrl,
                          link: this.slideCnt[i].slideBottons[k].slideBtnLinkUrl
                        })
                      }
                    }
                    params.slide[i] = {
                      ...params.slide[i],
                      buttons: buttons
                    }
                  }
                } else if (this.slideCnt[i].slideType === 'share') {
                  params.slide[i] = { orderNo: (i + 1), title: this.slideCnt[i].slideTitle, description: this.slideCnt[i].slideDescription, type: this.slideCnt[i].slideType }

                  // 공유정보 생성
                  params.slide[i] = {
                    ...params.slide[i],
                    share: { title: this.slideCnt[i].slideOgTitle, imageUrl: this.slideCnt[i].slideOgImage, snsLink: this.slideCnt[i].slideSnsLink }
                  }

                  // 버튼 정보 생성
                  if (this.slideCnt[i].slideButtonCnt > 0) {
                    let buttons = []
                    for (let k = 0; k < this.slideCnt[i].slideButtonCnt; k++) {
                      if (this.slideCnt[i].slideBottons[k].slideBtnSel === 'app') {
                        buttons.push({
                          orderNo: k + 1,
                          type: this.slideCnt[i].slideBottons[k].slideBtnSel,
                          title: this.slideCnt[i].slideBottons[k].slideBtnNameApp,
                          appLink: {
                            packageName: this.slideCnt[i].slideBottons[k].slideBtnPackageName,
                            scheme: this.slideCnt[i].slideBottons[k].slideBtnAction,
                            uri: this.slideCnt[i].slideBottons[k].slideBtnUri
                          }
                        })
                      } else if (this.slideCnt[i].slideBottons[k].slideBtnSel === 'chat') {
                        buttons.push({
                          orderNo: k + 1,
                          type: this.slideCnt[i].slideBottons[k].slideBtnSel,
                          title: this.slideCnt[i].slideBottons[k].slideBtnNameChat,
                          link: this.slideCnt[i].slideBottons[k].slideBtnLinkChat
                        })
                      } else if (this.slideCnt[i].slideBottons[k].slideBtnSel === 'call') {
                        buttons.push({
                          orderNo: k + 1,
                          type: this.slideCnt[i].slideBottons[k].slideBtnSel,
                          title: this.slideCnt[i].slideBottons[k].slideBtnNameCall,
                          link: this.slideCnt[i].slideBottons[k].slideBtnLinkCall
                        })
                      } else if (this.slideCnt[i].slideBottons[k].slideBtnSel === 'url') {
                        buttons.push({
                          orderNo: k + 1,
                          type: this.slideCnt[i].slideBottons[k].slideBtnSel,
                          title: this.slideCnt[i].slideBottons[k].slideBtnNameUrl,
                          link: this.slideCnt[i].slideBottons[k].slideBtnLinkUrl
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
            }

            if (this.publishType === 'reservation') {
              params.publishDate = this.pubDtYMD + this.pubDtHH + '0000'
            }

            feedUpdate(this.selBrand.brandId, this.feedId, params)
              .then(res => {
                if (res.code === '20000000') {
                  if (statusBtn === 'modify') {
                    this.$alertMsg('수정되었습니다.')
                    this.hist1 = []
                    this.hist2 = []
                    this.init()
                  } else if (statusBtn === 'save') {
                    this.$alertMsg('저장되었습니다.')
                    this.hist1 = []
                    this.hist2 = []
                    this.init()
                  } else {
                    this.$router.push(`/feed/list`)
                  }
                } else {
                  this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
                }
              })
              .catch(res => {
                this.xhrCatch(res)
              })
          })
          .catch(e => {
          })
      }
    },

    // 목록 버튼 클릭 시
    cancel() {
      this.$router.push(`/feed/list`)
    },

    // 삭제 버튼 클릭 시
    remove() {
      let msg = '소식을 삭제 하시겠습니까?<br><br>삭제된 소식은 다시 확인할 수 없습니다.'
      if (this.defaultPinYn) {
        msg = '고정 설정된 소식 입니다.<br>정말 삭제하시겠습니까?<br>삭제된 소식은 다시 확인할 수 없습니다.'
      }
      this.$confirmMsg(msg, '', '확인', '취소')
        .then(() => {
          feedRemove(this.selBrand.brandId, this.feedId)
            .then(res => {
              if (res.code === '20000000') {
                this.$router.push(`/feed/list`)
              } else {
                this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
              }
            })
            .catch(res => {
              this.xhrCatch(res)
            })
        })
    },
    xhrCatch(res) {
      if (res && res.error && res.error.code) {
        this.$alertMsg(res.error.message).then(() => {
          if (res.error.code === '60000702') {
            this.cancel()
          }
        })
      } else {
        this.$alertMsg('처리중 오류가 발생하였습니다.')
      }
    },
    replaceHtml(str) {
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      str = str.replace(/&#38;/g, '&')
      str = str.replace(/&quot;/g, '"')
      str = str.replace(/&#39;/g, '\'')
      str = str.replace(/&#40;/g, '(')
      str = str.replace(/&#41;/g, ')')
      str = str.replace(/&#35;/g, '#')

      return str
    },
    replaceTexttoHtml(str) {
      str = str.replace(/</g, '&lt;')
      str = str.replace(/>/g, '&gt;')
      return str
    },
    changeDesc() {
      this.description1 = this.replaceTexttoHtml(this.description).replace(/\|\|on.*\(|eval\(|javascript/gi, '').split('\n').join('<br />')
    },

    changeDescSlide() {
      this.description1 = this.replaceTexttoHtml(this.description).replace(/\|\|on.*\(|eval\(|javascript/gi, '').split('\n').join('<br />')
    },

    changeDescription(divId, itemId) {
      let objDiv = document.getElementById(divId)
      let itemDiv = document.getElementById(itemId)
      if (divId === 'mainDescription') {
        let imgDiv = $('.imgDiv').find('.image').length > 0 ? $('.imgDiv').height() + 19 : 0
        if (this.type === 'share') {
          imgDiv = $('.imgDiv').height() + 19
        }
        let btnDiv = $('.btnDiv').length > 0 ? $('.btnDiv').height() + 24 : 0
        let focusHeight = itemDiv.scrollHeight - imgDiv - btnDiv
        if (focusHeight > 517) {
          objDiv.scrollTop = focusHeight - 537
        } else {
          objDiv.scrollTop = 0
        }
        this.changeDesc()
      } else {
        if (itemDiv.scrollHeight > 560) {
          objDiv.scrollTop = itemDiv.scrollHeight - 560
        } else {
          objDiv.scrollTop = 0
        }
      }
    },
    moveToSlide(next) {
      let nextStep = next - 1
      for (let i = 0; i < nextStep; i++) {
        $("span[id^='carousel_next_'")[0].click()
        $("span[id^='carousel_next_'")[1].click()
      }
    },
    setSlideBox() {
      /* 2021.10.26 RBC고도화추가1 */
      let setMinHeight = function(minheight = 0) {
        $('.rbc_emulator_area.hei_slide .owl-carousel').each(function(i, e) {
          $(e).find('.owl-item .item').css('min-height', '0px')
        })

        $('.rbc_emulator_area.hei_slide .owl-carousel').each(function(i, e) {
          let oldminheight = minheight
          $(e).find('.owl-item').each(function(i, e) {
            minheight = $(e).children('.item').height() > minheight ? $(e).children('.item').height() : minheight
          })
          $(e).find('.owl-item .item').css('min-height', minheight + 'px')
          minheight = oldminheight
        })
      }
      setTimeout(setMinHeight, 500)
    /* // 2021.10.26 RBC고도화추가1 */
    },
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    },
    clickMiriCanvas() {
      this.$router.push({ name: 'miricanvas' })
    }
  }
}
</script>
<style>
</style>
