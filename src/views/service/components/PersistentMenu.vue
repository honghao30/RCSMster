<template>
  <div>
    <div class="tab_area_2022 mar_t40 mar_b10">
      <ul>
        <li v-for="(list, index) in menu" :key="(index+1)" v-bind:class="{active: menuTab === (index+1)}">
          <a href="javascript:void(0);" :style="menuTab === (index+1) ? '' : 'background-image: none; padding-left: 15px'" @click="selectMenuTab" :index="(index+1)">대화방 메뉴{{index+1}}</a>
          <a href="javascript:void(0);" v-if="(index+1) >= 1 && !viewMode" class="icon_delete" @click="delMenu" :index="index">대화방 메뉴 삭제</a>
        </li>
      </ul>
      <a href="javascript:void(0);" class="btn_add2" @click="addMenu" v-if="(menu.length+1) < 6 && !viewMode">메뉴 추가</a>
      <div class="pos_tr" v-if="!viewMode">
        <span class="prev" v-if="menuTab === 1">선택된 슬라이드 앞으로 이동</span>
        <a href="javascript:void(0);" class="prev" @click="slideUpButtonSlide" v-else>선택된 슬라이드 앞으로 이동</a>

        <span class="next" v-if="menuTab === menu.length">선택된 슬라이드 앞으로 이동</span>
        <a href="javascript:void(0);" class="next" @click="slideDownButtonSlide" v-else>선택된 슬라이드 뒤로 이동</a>
      </div>
    </div>
    <div class="rbc_bundle_wrap">
      <div class="rbc_emul_form_wrap">
        <!-- 대화방메뉴1~5 -->
        <div class="rbc_emul_form_cont">
          <div class="rbc_item_bundle">
            <strong class="rbc_tit_bundle">대화방 메뉴 {{menuTab}}</strong>
            <div class="rbc_cont_bundle">
              <div class="length_area">
                <span class="custom_input">
                  <input type="text" @input="e => selectedMenu.title = e.target.value" v-model.trim="selectedMenu.title" :ref="`title_${menuTab}`" :placeholder="`대화방 메뉴 ${menuTab} 메뉴명 입력`" :disabled="viewMode" maxlength="17">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.title)}}/17)</span>
              </div>
            </div>
          </div>
          <div class="rbc_item_bundle">
            <strong class="rbc_tit_bundle">응답 유형</strong>
            <div class="rbc_cont_bundle">
              <div class="length_area">
                <div class="custom_select">
                  <select :ref="`select_${menuTab}`" required v-model="selectedMenu.type" :disabled="viewMode">
                    <option value="" disabled selected>선택하세요</option>
                    <option value="basic_reply">챗봇응답</option>
                    <option value="auto_reply">자동응답 선택하기</option>
                    <option value="dial_phone_number">전화걸기</option>
  <!--                  <option disabled="disabled">&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</option>-->
  <!--                  <option value="copy_to_clipboard">복사하기</option>-->
  <!--                  <option value="open_out_url">URL연결(외부 브라우저)</option>-->
  <!--                  <option value="open_inner_url">URL연결(내부 브라우저)</option>-->
  <!--                  <option value="show_location">지도보여주기(좌표)</option>-->
  <!--                  <option value="search_locations">지도보여주기(쿼리)</option>-->
  <!--                  <option value="request_location_push">현재위치공유</option>-->
  <!--                  <option value="create_calendar_event">캘린더 등록</option>-->
  <!--                  <option value="compose_text_message">메시지 작성</option>-->
                    <option disabled="disabled">----------------------------------------------------------------------------------------------------------</option>
                    <option value="sub_menu">하위 메뉴 설정</option>
                  </select>
                </div>
              </div>
              <!-- 챗봇응답 -->
              <div class="length_area" v-if="selectedMenu.type === 'basic_reply'">
              </div>
              <!-- 자동응답 -->
              <div class="length_area" v-if="selectedMenu.type === 'auto_reply'">
                <a href="javascript:void(0);" @click="autoReplyPop" class="btn sml sml120" v-bind:class="{bd_black: !viewMode, bd_gray: viewMode}" :disabled="viewMode">자동응답 메시지 선택</a>
              </div>
              <div class="length_area" v-if="selectedMenu.type === 'auto_reply'">
                <span class="custom_input">
                  <input type="text" v-model.trim="selectedMenu.armIdName" disabled>
                </span>
              </div>
              <!-- 복사하기 -->
              <div class="length_area" v-if="selectedMenu.type === 'copy_to_clipboard'">
                <span class="custom_input">
                  <input type="text" :ref="`copyToClipboard_${menuTab}`" placeholder="복사할 값 입력" v-model.trim="selectedMenu.copyToClipboard" :disabled="viewMode" maxlength="200">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.copyToClipboard)}}/200)</span>
              </div>
              <!-- URL연결(외부 브라우저) -->
              <div class="length_area" v-if="selectedMenu.type === 'open_out_url'">
                <span class="custom_input">
                  <input type="text" :ref="`openOutUrl_${menuTab}`" placeholder="http://www.rcsbizcenter.com 형식으로 입력" v-model.trim="selectedMenu.openOutUrl" :disabled="viewMode" maxlength="100">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.openOutUrl)}}/100)</span>
              </div>
              <!-- URL연결(내부 브라우저) -->
              <div class="length_area" v-if="selectedMenu.type === 'open_inner_url'">
                <span class="custom_input">
                  <input type="text" :ref="`openInnerUrl.url_${menuTab}`" placeholder="http://www.rcsbizcenter.com 형식으로 입력" v-model.trim="selectedMenu.openInnerUrl.url" :disabled="viewMode" maxlength="100">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.openInnerUrl.url)}}/100)</span>
              </div>
              <div class="rbc_item_bundle" v-if="selectedMenu.type === 'open_inner_url'">
                <strong class="rbc_tit_bundle">Half view 사용</strong>
                <div class="rbc_cont_bundle">
                  <span class="custom_radio">
                    <input type="radio" name="innerUrlRadio1" id="innerUrlRadio01_1" v-model="selectedMenu.openInnerUrl.isHalfView" value=true :disabled="viewMode">
                    <label for="innerUrlRadio01_1">YES</label>
                  </span>
                  <span class="custom_radio">
                    <input type="radio" name="innerUrlRadio1" id="innerUrlRadio01_2" checked v-model="selectedMenu.openInnerUrl.isHalfView" value=false :disabled="viewMode">
                    <label for="innerUrlRadio01_2">NO</label>
                  </span>
                </div>
              </div>
              <div class="length_area" v-if="selectedMenu.type === 'open_inner_url'">
                <span class="custom_textarea">
                  <textarea :ref="`openInnerUrl.postParameter_${menuTab}`" placeholder="인앱브라우저에서 URL 호출 시 POST방식으로 파라미터를 전달하고자 할 경우 파라미터 개수만큼 아래 형식으로 구분하여 작성하면 됩니다. (URL 상의 웹페이지는 content-type: application/x-www-form-urlencoded 로 설정하시면 됩니다.)
  <작성예시>
  “name”:”value”, “age”:30, “isBoolean”: true" v-model.trim="selectedMenu.openInnerUrl.postParameter" :disabled="viewMode" maxlength="1000"></textarea>
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.openInnerUrl.postParameter)}}/1000)</span>
              </div>
              <!-- 전화걸기 -->
              <div class="length_area" v-if="selectedMenu.type === 'dial_phone_number'">
                <span class="custom_input">
                  <input type="text" :ref="`dialPhoneNumber_${menuTab}`" placeholder="전화번호 입력" v-model.trim="selectedMenu.dialPhoneNumber" :disabled="viewMode" maxlength="40">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.dialPhoneNumber)}}/40)</span>
              </div>
              <!-- 지도보여주기(좌표) -->
              <div class="length_area" v-if="selectedMenu.type === 'show_location'">
                <span class="custom_input">
                  <input type="text" :ref="`showLocation.location.latitude_${menuTab}`" placeholder="위도입력" v-model.trim="selectedMenu.showLocation.location.latitude" maxlength="40" :disabled="viewMode">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.showLocation.location.latitude)}}/40)</span>
              </div>
              <div class="length_area" v-if="selectedMenu.type === 'show_location'">
                <span class="custom_input">
                  <input type="text" :ref="`showLocation.location.longitude_${menuTab}`" placeholder="경도입력" v-model.trim="selectedMenu.showLocation.location.longitude" maxlength="40" :disabled="viewMode">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.showLocation.location.longitude)}}/40)</span>
              </div>
              <div class="length_area" v-if="selectedMenu.type === 'show_location'">
                <span class="custom_input">
                  <input type="text" :ref="`showLocation.location.label_${menuTab}`" placeholder="위치이름" v-model.trim="selectedMenu.showLocation.location.label" maxlength="100" :disabled="viewMode">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.showLocation.location.label)}}/100)</span>
              </div>
              <div class="length_area" v-if="selectedMenu.type === 'show_location'">
                <span class="custom_input">
                  <input type="text" :ref="`showLocation.fallbackUrl_${menuTab}`" placeholder="fallback url 입력" v-model.trim="selectedMenu.showLocation.fallbackUrl" maxlength="100" :disabled="viewMode">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.showLocation.fallbackUrl)}}/100)</span>
              </div>
              <!-- 지도보여주기(쿼리) -->
              <div class="length_area" v-if="selectedMenu.type === 'search_locations'">
                <span class="custom_input">
                  <input type="text" :ref="`searchLocation.location.query_${menuTab}`" placeholder="위치이름" v-model.trim="selectedMenu.searchLocation.location.query" maxlength="100" :disabled="viewMode">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.searchLocation.location.query)}}/100)</span>
              </div>
              <div class="length_area" v-if="selectedMenu.type === 'search_locations'">
                <span class="custom_input">
                  <input type="text" :ref="`searchLocation.fallbackUrl_${menuTab}`" placeholder="fallback url 입력" v-model.trim="selectedMenu.searchLocation.fallbackUrl" maxlength="100" :disabled="viewMode">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.searchLocation.fallbackUrl)}}/100)</span>
              </div>
              <!-- 현재위치공유 -->
              <div class="length_area" v-if="selectedMenu.type === 'request_location_push'"></div>
              <!-- 캘린더 등록 -->
              <div class="length_area" v-if="selectedMenu.type === 'create_calendar_event'">
                <!-- 캘린더 - 직접 입력 -->
                <template v-if="selectedMenu.calendarAction.createCalendarEvent.useVariable">
                  <span class="custom_input">
                    <input type="text" :ref="`startTime_${menuTab}`" v-model.trim="selectedMenu.calendarAction.createCalendarEvent.startTime" :disabled="viewMode" placeholder="시작일">
                  </span>
                  <span class="custom_input">
                    <input type="text" :ref="`endTime_${menuTab}`" v-model.trim="selectedMenu.calendarAction.createCalendarEvent.endTime" :disabled="viewMode" placeholder="종료일">
                  </span>
                </template>
                <!-- 캘린더 - 달력 사용 -->
                <template v-else>
                  <span class="custom_input icon_date">
                    <div class="date_picker">
                      <date-picker style="width:290px" :ref="`startTime_${menuTab}`" v-model="selectedMenu.calendarAction.createCalendarEvent.startTime" placeholder="시작일"
                          type="datetime" :confirm="true" confirm-text="확인" :show-second="false" :minute-step="5" :second-step="5"
                          @confirm="cfm(menuTab, selectedMenu.calendarAction.createCalendarEvent)" :disabled="viewMode"/>
                    </div>
                  </span>
                  <span class="custom_input icon_date">
                    <div class="date_picker">
                      <date-picker style="width:290px; right:45px" :ref="`endTime_${menuTab}`" v-model="selectedMenu.calendarAction.createCalendarEvent.endTime" placeholder="종료일"
                          type="datetime" :confirm="true" confirm-text="확인" :show-second="false" :minute-step="5" :second-step="5"
                          @confirm="cfm(menuTab, selectedMenu.calendarAction.createCalendarEvent)" :disabled="viewMode"/>
                    </div>
                  </span>
                </template>
                <!-- <span class="custom_checkbox">
                  <input type="checkbox" :id="`action_useVariable`" v-model="selectedMenu.calendarAction.createCalendarEvent.useVariable" @change="clearTime(selectedMenu.calendarAction.createCalendarEvent)" :disabled="viewMode">
                  <label :for="`action_useVariable`">변수</label>
                </span> -->
              </div>
              <div class="length_area" v-if="selectedMenu.type === 'create_calendar_event'">
                <span class="custom_input">
                  <input type="text" :ref="`calendarAction.createCalendarEvent.title_${menuTab}`" placeholder="제목입력" v-model.trim="selectedMenu.calendarAction.createCalendarEvent.title" :disabled="viewMode" maxlength="100">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.calendarAction.createCalendarEvent.title)}}/100)</span>
              </div>
              <div class="length_area" v-if="selectedMenu.type === 'create_calendar_event'">
                <span class="custom_input">
                  <input type="text" :ref="`calendarAction.createCalendarEvent.description_${menuTab}`" placeholder="내용입력" v-model.trim="selectedMenu.calendarAction.createCalendarEvent.description" :disabled="viewMode" maxlength="500">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.calendarAction.createCalendarEvent.description)}}/500)</span>
              </div>
              <!-- 메시지 작성 -->
              <div class="length_area" v-if="selectedMenu.type === 'compose_text_message'">
                <span class="custom_input">
                  <input type="text" :ref="`composeTextMessage.phoneNumber_${menuTab}`" placeholder="전화번호 입력" v-model.trim="selectedMenu.composeTextMessage.phoneNumber" maxlength="40" :disabled="viewMode">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.composeTextMessage.phoneNumber)}}/40)</span>
              </div>
              <div class="length_area" v-if="selectedMenu.type === 'compose_text_message'">
                <span class="custom_input">
                  <input type="text" :ref="`composeTextMessage.text_${menuTab}`" placeholder="문자메시지 내용 입력" v-model.trim="selectedMenu.composeTextMessage.text" maxlength="100" :disabled="viewMode">
                </span>
                <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedMenu.composeTextMessage.text)}}/100)</span>
              </div>
              <!-- 하위 메뉴 설정 -->
              <div class="depth2_area" v-if="selectedMenu.type === 'sub_menu'">
                <div class="tab_area_2022 mar_b10">
                  <ul>
                    <li v-for="(list, index) in selectedMenu.subMenu" :key="(index+1)" v-bind:class="{active: selectedMenu.subMenuTab === (index+1)}">
                      <a href="javascript:void(0);" :style="selectedMenu.subMenuTab === (index+1) ? '' : 'background-image: none; padding-left: 15px'" @click="selectSubMenuTab" :index="(index+1)">메뉴 {{menuTab}}-{{index+1}}</a>
                      <a href="javascript:void(0);" v-if="(index+1) >= 1 && !viewMode" class="icon_delete" @click="delSubMenu" :index="index">대화방 메뉴 삭제</a>
                    </li>
                  </ul>
                  <a href="javascript:void(0);" class="btn_add2" @click="addSubMenu" v-if="(selectedMenu.subMenu.length+1) < 6 && !viewMode">메뉴 추가</a>
                  <div class="pos_tr RSub short_pos" v-if="!viewMode">
                    <span class="prev" v-if="selectedMenu.subMenuTab === 1">선택된 슬라이드 앞으로 이동</span>
                    <a href="javascript:void(0);" class="prev" @click="slideUpSubButtonSlide(menu[menuTab-1])" v-else>선택된 슬라이드 앞으로 이동</a>

                    <span class="next" v-if="selectedMenu.subMenuTab === selectedMenu.subMenu.length">선택된 슬라이드 앞으로 이동</span>
                    <a href="javascript:void(0);" class="next" @click="slideDownSubButtonSlide(menu[menuTab-1])" v-else>선택된 슬라이드 뒤로 이동</a>
                  </div>
                </div>
                <!-- 서브메뉴 1-1 ~ 5-5 -->
                <div class="rbc_emul_form_cont">
                  <div class="rbc_item_bundle">
                    <strong class="rbc_tit_bundle">메뉴 {{menuTab}}-{{menu[menuTab-1].subMenuTab}}</strong>
                    <div class="rbc_cont_bundle">
                      <div class="length_area">
                        <span class="custom_input">
                          <input type="text" @focus="selectSubMenuTab(menu[menuTab-1].subMenuTab)" @input="e => selectedSubMenu.title = e.target.value" v-model.trim="selectedSubMenu.title" :ref="`title_${menuTab}${selectedMenu.subMenuTab}`" :placeholder="`메뉴 ${menuTab}-${menu[menuTab-1].subMenuTab} 메뉴명 입력`" :disabled="viewMode" maxlength="17">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.title)}}/17)</span>
                      </div>
                    </div>
                  </div>
                  <div class="rbc_item_bundle">
                    <strong class="rbc_tit_bundle">응답 유형</strong>
                    <div class="rbc_cont_bundle">
                      <div class="length_area">
                        <div class="custom_select">
                          <select required v-model="selectedSubMenu.type" :disabled="viewMode" @focus="selectSubMenuTab(menu[menuTab-1].subMenuTab)">
                            <option value="" disabled selected>선택하세요</option>
                            <option value="basic_reply">챗봇응답</option>
                             <option value="auto_reply">자동응답 선택하기</option>
                            <option value="dial_phone_number">전화걸기</option>
  <!--                          <option disabled="disabled">&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</option>
                            <option value="copy_to_clipboard">복사하기</option>
                            <option value="open_out_url">URL연결(외부 브라우저)</option>
                            <option value="open_inner_url">URL연결(내부 브라우저)</option>
                            <option value="show_location">지도보여주기(좌표)</option>
                            <option value="search_locations">지도보여주기(쿼리)</option>
                            <option value="request_location_push">현재위치공유</option>
                            <option value="create_calendar_event">캘린더 등록</option>
                            <option value="compose_text_message">메시지 작성</option>-->
                          </select>
                        </div>
                      </div>
                      <!-- 서브메뉴 챗봇응답 -->
                      <div class="length_area" v-if="selectedSubMenu.type === 'basic_reply'">
                      </div>
                      <!-- 서브메뉴 자동응답 -->
                      <div class="length_area" v-if="selectedSubMenu.type === 'auto_reply'">
                        <a href="javascript:void(0);" @click="autoReplyPopSub" class="btn sml sml120" v-bind:class="{bd_black: !viewMode, bd_gray: viewMode}" :disabled="viewMode">자동응답 메시지 선택</a>
                      </div>
                      <div class="length_area" v-if="selectedSubMenu.type === 'auto_reply'">
                        <span class="custom_input">
                          <input type="text" v-model.trim="selectedSubMenu.armIdName" disabled>
                        </span>
                      </div>
                      <!-- 서브메뉴 복사하기 -->
                      <div class="length_area" v-if="selectedSubMenu.type === 'copy_to_clipboard'">
                        <span class="custom_input">
                          <input type="text" :ref="`copyToClipboard_${menuTab}${selectedMenu.subMenuTab}`" placeholder="복사할 값 입력" v-model.trim="selectedSubMenu.copyToClipboard" :disabled="viewMode" maxlength="200">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.copyToClipboard)}}/200)</span>
                      </div>
                      <!-- 서브메뉴 URL연결(외부 브라우저) -->
                      <div class="length_area" v-if="selectedSubMenu.type === 'open_out_url'">
                        <span class="custom_input">
                          <input type="text" :ref="`openOutUrl_${menuTab}${selectedMenu.subMenuTab}`" placeholder="http://www.rcsbizcenter.com 형식으로 입력" v-model.trim="selectedSubMenu.openOutUrl" :disabled="viewMode" maxlength="100">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.openOutUrl)}}/100)</span>
                      </div>
                      <!-- 서브메뉴 URL연결(내부 브라우저) -->
                      <div class="length_area" v-if="selectedSubMenu.type === 'open_inner_url'">
                        <span class="custom_input">
                          <input type="text" :ref="`openInnerUrl.url_${menuTab}${selectedMenu.subMenuTab}`" placeholder="http://www.rcsbizcenter.com 형식으로 입력" v-model.trim="selectedSubMenu.openInnerUrl.url" :disabled="viewMode" maxlength="100">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.openInnerUrl.url)}}/100)</span>
                      </div>
                      <div class="rbc_item_bundle" v-if="selectedSubMenu.type === 'open_inner_url'">
                        <strong class="rbc_tit_bundle">Half view 사용</strong>
                        <div class="rbc_cont_bundle">
                          <span class="custom_radio">
                            <input type="radio" name="innerUrlRadio1" id="innerUrlRadio01_1" v-model="selectedSubMenu.openInnerUrl.isHalfView" value=true :disabled="viewMode">
                            <label for="innerUrlRadio01_1">YES</label>
                          </span>
                          <span class="custom_radio">
                            <input type="radio" name="innerUrlRadio1" id="innerUrlRadio01_2" checked v-model="selectedSubMenu.openInnerUrl.isHalfView" value=false :disabled="viewMode">
                            <label for="innerUrlRadio01_2">NO</label>
                          </span>
                        </div>
                    </div>
                    <div class="length_area" v-if="selectedSubMenu.type === 'open_inner_url'">
                      <span class="custom_textarea">
                        <textarea :ref="`openInnerUrl.postParameter_${menuTab}${selectedMenu.subMenuTab}`" placeholder="인앱브라우저에서 URL 호출 시 POST방식으로 파라미터를 전달하고자 할 경우 파라미터 개수만큼 아래 형식으로 구분하여 작성하면 됩니다. (URL 상의 웹페이지는 content-type: application/x-www-form-urlencoded 로 설정하시면 됩니다.)
  <작성예시>
  “name”:”value”, “age”:30, “isBoolean”: true" v-model.trim="selectedSubMenu.openInnerUrl.postParameter" :disabled="viewMode" maxlength="1000"></textarea>
                      </span>
                      <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.openInnerUrl.postParameter)}}/1000)</span>
                    </div>
                      <!-- 서브메뉴 전화걸기 -->
                      <div class="length_area" v-if="selectedSubMenu.type === 'dial_phone_number'">
                        <span class="custom_input">
                          <input type="text" :ref="`dialPhoneNumber_${menuTab}${selectedMenu.subMenuTab}`" placeholder="전화번호 입력" @focus="selectSubMenuTab(menu[menuTab-1].subMenuTab)" v-model.trim="selectedSubMenu.dialPhoneNumber" :disabled="viewMode" maxlength="40">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.dialPhoneNumber)}}/40)</span>
                      </div>
                      <!-- 서브메뉴 지도보여주기(좌표) -->
                      <div class="length_area" v-if="selectedSubMenu.type === 'show_location'">
                        <span class="custom_input">
                          <input type="text" :ref="`showLocation.location.latitude_${menuTab}${selectedMenu.subMenuTab}`" placeholder="위도입력" v-model.trim="selectedSubMenu.showLocation.location.latitude" maxlength="40" :disabled="viewMode">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.showLocation.location.latitude)}}/40)</span>
                      </div>
                      <div class="length_area" v-if="selectedSubMenu.type === 'show_location'">
                        <span class="custom_input">
                          <input type="text" :ref="`showLocation.location.longitude_${menuTab}${selectedMenu.subMenuTab}`" placeholder="경도입력" v-model.trim="selectedSubMenu.showLocation.location.longitude" maxlength="40" :disabled="viewMode">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.showLocation.location.longitude)}}/40)</span>
                      </div>
                      <div class="length_area" v-if="selectedSubMenu.type === 'show_location'">
                        <span class="custom_input">
                          <input type="text" :ref="`showLocation.location.label_${menuTab}${selectedMenu.subMenuTab}`" placeholder="위치이름" v-model.trim="selectedSubMenu.showLocation.location.label" maxlength="100" :disabled="viewMode">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.showLocation.location.label)}}/100)</span>
                      </div>
                      <div class="length_area" v-if="selectedSubMenu.type === 'show_location'">
                        <span class="custom_input">
                          <input type="text" :ref="`showLocation.fallbackUrl_${menuTab}${selectedMenu.subMenuTab}`" placeholder="fallback url 입력" v-model.trim="selectedSubMenu.showLocation.fallbackUrl" maxlength="100" :disabled="viewMode">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.showLocation.fallbackUrl)}}/100)</span>
                      </div>
                      <!-- 서브메뉴 지도보여주기(쿼리) -->
                      <div class="length_area" v-if="selectedSubMenu.type === 'search_locations'">
                        <span class="custom_input">
                          <input type="text" :ref="`searchLocation.location.query_${menuTab}${selectedMenu.subMenuTab}`" placeholder="위치이름" v-model.trim="selectedSubMenu.searchLocation.location.query" maxlength="100" :disabled="viewMode">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.searchLocation.location.query)}}/100)</span>
                      </div>
                      <div class="length_area" v-if="selectedSubMenu.type === 'search_locations'">
                        <span class="custom_input">
                          <input type="text" :ref="`searchLocation.fallbackUrl_${menuTab}${selectedMenu.subMenuTab}`" placeholder="fallback url 입력" v-model.trim="selectedSubMenu.searchLocation.fallbackUrl" maxlength="100" :disabled="viewMode">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.searchLocation.fallbackUrl)}}/100)</span>
                      </div>
                      <!-- 서브메뉴 현재위치공유 -->
                      <div class="length_area" v-if="selectedSubMenu.type === 'request_location_push'"></div>
                      <!-- 서브메뉴 캘린더 등록 -->
                      <div class="length_area" v-if="selectedSubMenu.type === 'create_calendar_event'">
                        <!-- 캘린더 - 직접 입력 -->
                        <template v-if="selectedSubMenu.calendarAction.createCalendarEvent.useVariable">
                          <span class="custom_input">
                            <input type="text" :ref="`startTime_${menuTab}${selectedMenu.subMenuTab}`" v-model.trim="selectedSubMenu.calendarAction.createCalendarEvent.startTime" :disabled="viewMode" placeholder="시작일">
                          </span>
                          <span class="custom_input">
                            <input type="text" :ref="`endTime_${menuTab}${selectedMenu.subMenuTab}`" v-model.trim="selectedSubMenu.calendarAction.createCalendarEvent.endTime" :disabled="viewMode" placeholder="종료일">
                          </span>
                        </template>
                        <!-- 캘린더 - 달력 사용 -->
                        <template v-else>
                          <span class="custom_input icon_date">
                            <div class="date_picker">
                              <date-picker style="width:240px" :ref="`startTime_${menuTab}${selectedMenu.subMenuTab}`" v-model="selectedSubMenu.calendarAction.createCalendarEvent.startTime" placeholder="시작일"
                                  type="datetime" :confirm="true" confirm-text="확인" :show-second="false" :minute-step="5" :second-step="5"
                                  @confirm="cfmSub(selectedMenu.subMenuTab, selectedSubMenu.calendarAction.createCalendarEvent)" :disabled="viewMode"/>
                            </div>
                          </span>
                          <span class="custom_input icon_date">
                            <div class="date_picker">
                              <date-picker style="width:240px; right:45px" :ref="`endTime_${menuTab}${selectedMenu.subMenuTab}`" v-model="selectedSubMenu.calendarAction.createCalendarEvent.endTime" placeholder="종료일"
                                  type="datetime" :confirm="true" confirm-text="확인" :show-second="false" :minute-step="5" :second-step="5"
                                  @confirm="cfmSub(selectedMenu.subMenuTab, selectedSubMenu.calendarAction.createCalendarEvent)" :disabled="viewMode"/>
                            </div>
                          </span>
                        </template>
                        <!-- <span class="custom_checkbox">
                          <input type="checkbox" :id="`action_useVariable`" v-model="selectedSubMenu.calendarAction.createCalendarEvent.useVariable" @change="clearTime(selectedMenu.calendarAction.createCalendarEvent)" :disabled="viewMode">
                          <label :for="`action_useVariable`">변수</label>
                        </span> -->
                      </div>
                      <div class="length_area" v-if="selectedSubMenu.type === 'create_calendar_event'">
                        <span class="custom_input">
                          <input type="text" :ref="`calendarAction.createCalendarEvent.title_${menuTab}${selectedMenu.subMenuTab}`" placeholder="제목입력" v-model.trim="selectedSubMenu.calendarAction.createCalendarEvent.title" :disabled="viewMode" maxlength="100">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.calendarAction.createCalendarEvent.title)}}/100)</span>
                      </div>
                      <div class="length_area" v-if="selectedSubMenu.type === 'create_calendar_event'">
                        <span class="custom_input">
                          <input type="text" :ref="`calendarAction.createCalendarEvent.description_${menuTab}${selectedMenu.subMenuTab}`" placeholder="내용입력" v-model.trim="selectedSubMenu.calendarAction.createCalendarEvent.description" :disabled="viewMode" maxlength="500">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.calendarAction.createCalendarEvent.description)}}/500)</span>
                      </div>
                      <!-- 서브메뉴 메시지 작성 -->
                      <div class="length_area" v-if="selectedSubMenu.type === 'compose_text_message'">
                        <span class="custom_input">
                          <input type="text" :ref="`composeTextMessage.phoneNumber_${menuTab}${selectedMenu.subMenuTab}`" placeholder="전화번호 입력" v-model.trim="selectedSubMenu.composeTextMessage.phoneNumber" maxlength="40" :disabled="viewMode">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.composeTextMessage.phoneNumber)}}/40)</span>
                      </div>
                      <div class="length_area" v-if="selectedSubMenu.type === 'compose_text_message'">
                        <span class="custom_input">
                          <input type="text" :ref="`composeTextMessage.text_${menuTab}${selectedMenu.subMenuTab}`" placeholder="문자메시지 내용 입력" v-model.trim="selectedSubMenu.composeTextMessage.text" maxlength="100" :disabled="viewMode">
                        </span>
                        <span class="length" v-if="!viewMode">({{countDisplayTextLength(selectedSubMenu.composeTextMessage.text)}}/100)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- //서브메뉴 1-1 ~ 5-5 -->
              </div>
            </div>
          </div>
        </div>
        <!--// 대화방메뉴1~5 -->
      </div>
      <persistent-menu-emulator ref="persistentMenuEmulator" :inputFieldYn.sync="inputFieldYn" :menu.sync="menu" :menuTab.sync="menuTab" @psEmulnowTab="changeTabFromEmul"></persistent-menu-emulator>
      <auto-reply-search-popup v-if="isShowArmPopup" :visible.sync="isShowArmPopup" :brandId="brandId" :armId="this.menu[this.menuTab - 1].armId" @sendArmId="changeArmId" @sendArmIdName="changeArmIdName"/>
      <auto-reply-search-popup v-if="isShowArmPopupSub" :visible.sync="isShowArmPopupSub" :brandId="brandId" :armId="this.menu[this.menuTab - 1].subMenu[this.menu[this.menuTab - 1].subMenuTab - 1].armId" @sendArmId="changeArmIdSub" @sendArmIdName="changeArmIdNameSub"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ko'
import { getPersistentMenu } from '@/api/service/callingTwoWayManagement'
import AutoReplySearchPopup from '@/views/service/components/AutoReplySearchPopup'
import PersistentMenuEmulator from '@/views/service/components/PersistentMenuEmulator'
// import '@/assets/css/designvii.css'
export default {
  name: 'PersistentMenu',
  components: {
    DatePicker,
    AutoReplySearchPopup,
    PersistentMenuEmulator
  },
  props: {
    isModify: {
      type: Boolean,
      default: true
    },
    approvaInfoData: {
      type: Object
    },
    inputFieldYn: {
      type: String
    }
  },
  data() {
    return {
      utcSplitor: ':00',
      isShowArmPopup: false,
      isShowArmPopupSub: false,
      menu: [
        {
          ordNo: 1,
          title: '',
          type: '',
          postbackId: '',
          armId: '',
          copyToClipboard: '',
          openInnerUrl: { isHalfView: false },
          showLocation: {
            location: {},
            fallbackUrl: ''
          },
          searchLocation: {
            location: {},
            fallbackUrl: ''
          },
          calendarAction: {
            createCalendarEvent: {
              startTime: '',
              endTime: '',
              title: '',
              description: ''
            }
          },
          composeTextMessage: {},
          subMenu: [ // 하위 메뉴 object
            {
              ordNo: '1',
              title: '',
              type: '',
              postbackId: '',
              armId: '',
              copyToClipboard: '',
              openInnerUrl: { isHalfView: false },
              showLocation: {
                location: {},
                fallbackUrl: ''
              },
              searchLocation: {
                location: {},
                fallbackUrl: ''
              },
              calendarAction: {
                createCalendarEvent: {
                  startTime: '',
                  endTime: '',
                  title: '',
                  description: ''
                }
              },
              composeTextMessage: {}
            }
          ],
          subMenuTab: 1 // 하위 메뉴 탭 갯수
        }
      ],
      menuList: [],
      subMenuList: [],
      // 메뉴 탭 갯수
      menuTab: 1,
      chatbotId: '',
      brandId: ''
    }
  },
  computed: {
    viewMode() {
      return !this.isModify
    },
    selectedMenu: {
      get() {
        return this.menuTab ? this.menu[this.menuTab - 1] : this.menu[0]
      },
      set(obj) {
      }
    },
    selectedSubMenu: {
      get() {
        return this.selectedMenu.subMenu[this.selectedMenu.subMenuTab - 1]
      },
      set(obj) {
      }
    }
  },
  created() {
    this.chatbotId = this.$route.params.chatbotId
    this.brandId = this.$route.params.brandId
    this.getMenu()
  },
  mounted() {
    this.focusThis('title_1')
  },
  methods: {
    focusThis(id) {
      this.$nextTick(() => {
        if (this.$refs[id][0]) {
          this.$refs[id][0].focus()
        } else {
          this.$refs[id].focus()
        }
      })
    },
    // 미리보기에서 클릭한 대화방메뉴탭 선택되게
    changeTabFromEmul(index) {
      this.menuTab = index + 1
    },
    // 글자수 체크
    countDisplayTextLength(value) {
      return value ? value.length : 0
    },
    // 자동응답메시지 armId 셋팅
    changeArmId(sendArmId) {
      this.menu[this.menuTab - 1].armId = sendArmId
    },
    // 자동응답메시지 제목 셋팅
    changeArmIdName(sendArmIdName) {
      this.menu[this.menuTab - 1].armIdName = sendArmIdName
    },
    // 자동응답메시지 armId 셋팅
    changeArmIdSub(sendArmId) {
      // this.menu[this.menuTab - 1].armId = sendArmId
      this.menu[this.menuTab - 1].subMenu[this.menu[this.menuTab - 1].subMenuTab - 1].armId = sendArmId
    },
    // 자동응답메시지 제목 셋팅
    changeArmIdNameSub(sendArmIdName) {
      this.menu[this.menuTab - 1].subMenu[this.menu[this.menuTab - 1].subMenuTab - 1].armIdName = sendArmIdName
    },
    autoReplyPop() {
      if (this.isModify) this.isShowArmPopup = true
    },
    autoReplyPopSub() {
      if (this.isModify) this.isShowArmPopupSub = true
    },
    getMenu() {
      let reqData = {
        brandId: this.brandId,
        chatbotId: this.chatbotId
      }
      // 퍼시스턴트메뉴 불러오기
      getPersistentMenu(reqData, this.brandId).then(res => {
        if (res.result.length !== 0) {
          // 불러온 메뉴 리스트에서 상위메뉴리스트와 하위메뉴리스트로 나눔
          for (let i = 0; i < res.result.length; i++) {
            if (jglib.isEmpty(res.result[i].upPostbackId)) {
              this.menuList.push(res.result[i])
            } else {
              this.subMenuList.push(res.result[i])
            }
          }
          this.makeMenuData()
        }
      })
    },
    // 퍼시트턴트메뉴 데이터로 메뉴 탭 object 구성
    makeMenuData() {
      for (let i = 0; i < this.menuList.length; i++) {
        let list = this.menuList[i]
        let jsonAction
        if (!jglib.isEmpty(list.action)) {
          // action값을 json으로 변환
          jsonAction = JSON.parse(list.action)
        }
        this.menu[i].title = list.title
        this.menu[i].ordNo = list.ordNo.substring(0, 1)
        this.menu[i].postbackId = list.postbackId
        // 타입별로 분기처리 reply , action , menu
        // reply
        if (list.type === 'reply') {
          if (list.armId !== '') {
            this.menu[i].type = 'auto_reply'
            this.menu[i].armId = list.armId
            this.menu[i].armIdName = list.armIdName
          } else {
            this.menu[i].type = 'basic_reply'
          }
        // action
        } else if (list.type === 'action') {
          if (list.actType === 'urlAction') {
            this.menu[i].type = 'open_out_url'
            this.menu[i].openOutUrl = jsonAction.urlAction.openUrl.url
          } else if (list.actType === 'localBrowserAction') {
            this.menu[i].type = 'open_inner_url'
            this.menu[i].openInnerUrl.url = jsonAction.localBrowserAction.openUrl.url
            this.menu[i].openInnerUrl.isHalfView = jsonAction.localBrowserAction.openUrl.isHalfView
            let postParameter = JSON.stringify(jsonAction.localBrowserAction.openUrl.postParameter)
            if (!jglib.isEmpty(postParameter)) {
              this.menu[i].openInnerUrl.postParameter = postParameter.replace(/[{}]/g, '').trim()
            }
          } else if (list.actType === 'mapAction') {
            if (jsonAction.mapAction.requestLocationPush) {
              this.menu[i].type = 'request_location_push'
            } else if (!jglib.isEmpty(jsonAction.mapAction.showLocation.location.query)) {
              this.menu[i].type = 'search_locations'
              this.menu[i].searchLocation.location.query = jsonAction.mapAction.showLocation.location.query
              this.menu[i].searchLocation.fallbackUrl = jsonAction.mapAction.showLocation.fallbackUrl
            } else {
              this.menu[i].type = 'show_location'
              this.menu[i].showLocation.location.latitude = jsonAction.mapAction.showLocation.location.latitude
              this.menu[i].showLocation.location.longitude = jsonAction.mapAction.showLocation.location.longitude
              this.menu[i].showLocation.location.label = jsonAction.mapAction.showLocation.location.label
              this.menu[i].showLocation.fallbackUrl = jsonAction.mapAction.showLocation.fallbackUrl
            }
          } else if (list.actType === 'dialerAction') {
            this.menu[i].type = 'dial_phone_number'
            this.menu[i].dialPhoneNumber = jsonAction.dialerAction.dialPhoneNumber.phoneNumber
          } else if (list.actType === 'calendarAction') {
            this.menu[i].type = 'create_calendar_event'
            this.menu[i].calendarAction.createCalendarEvent.startTime = this.getParsedTime(jsonAction.calendarAction.createCalendarEvent.startTime, false)
            this.menu[i].calendarAction.createCalendarEvent.endTime = this.getParsedTime(jsonAction.calendarAction.createCalendarEvent.endTime, false)
            this.menu[i].calendarAction.createCalendarEvent.title = jsonAction.calendarAction.createCalendarEvent.title
            this.menu[i].calendarAction.createCalendarEvent.description = jsonAction.calendarAction.createCalendarEvent.description
          } else if (list.actType === 'clipboardAction') {
            this.menu[i].type = 'copy_to_clipboard'
            this.menu[i].copyToClipboard = jsonAction.clipboardAction.copyToClipboard.text
          } else if (list.actType === 'composeAction') {
            this.menu[i].type = 'compose_text_message'
            this.menu[i].composeTextMessage.phoneNumber = jsonAction.composeAction.composeTextMessage.phoneNumber
            this.menu[i].composeTextMessage.text = jsonAction.composeAction.composeTextMessage.text
          }
        // menu
        } else if (list.type === 'menu') {
          this.menu[i].type = 'sub_menu'
          let subListObj = []
          // 상위메뉴리스트 postbackId와 하위메뉴리스트 upPostbackId가 같은 경우만 골라옴
          // == 해당 상위메뉴리스트에 속해있는 하위메뉴리스트만 subListObj에 push
          for (let k = 0; k < this.subMenuList.length; k++) {
            if (list.postbackId === this.subMenuList[k].upPostbackId) {
              subListObj.push(this.subMenuList[k])
            }
          }
          for (let j = 0; j < subListObj.length; j++) {
            let subList = subListObj[j]
            if (list.postbackId === subList.upPostbackId) {
              let jsonActionSub
              if (!jglib.isEmpty(subList.action)) {
                jsonActionSub = JSON.parse(subList.action)
              }
              this.menu[i].subMenu[j].title = subList.title
              this.menu[i].subMenu[j].ordNo = subList.ordNo.substring(1, 2)
              this.menu[i].subMenu[j].postbackId = subList.postbackId
              if (subList.type === 'reply') {
                if (subList.armId !== '') {
                  this.menu[i].subMenu[j].type = 'auto_reply'
                  this.menu[i].subMenu[j].armId = subList.armId
                  this.menu[i].subMenu[j].armIdName = subList.armIdName
                } else {
                  this.menu[i].subMenu[j].type = 'basic_reply'
                }
              }
              if (subList.actType === 'urlAction') {
                this.menu[i].subMenu[j].type = 'open_out_url'
                this.menu[i].subMenu[j].openOutUrl = jsonActionSub.urlAction.openUrl.url
              } else if (subList.actType === 'localBrowserAction') {
                this.menu[i].subMenu[j].type = 'open_inner_url'
                this.menu[i].subMenu[j].openInnerUrl.url = jsonActionSub.localBrowserAction.openUrl.url
                this.menu[i].subMenu[j].openInnerUrl.isHalfView = jsonActionSub.localBrowserAction.openUrl.isHalfView
                let postParameter = JSON.stringify(jsonActionSub.localBrowserAction.openUrl.postParameter)
                if (!jglib.isEmpty(postParameter)) {
                  this.menu[i].subMenu[j].openInnerUrl.postParameter = postParameter.replace(/[{}]/g, '').trim()
                }
              } else if (subList.actType === 'mapAction') {
                if (jsonActionSub.mapAction.requestLocationPush) {
                  this.menu[i].subMenu[j].type = 'request_location_push'
                } else if (!jglib.isEmpty(jsonActionSub.mapAction.showLocation.location.query)) {
                  this.menu[i].subMenu[j].type = 'search_locations'
                  this.menu[i].subMenu[j].searchLocation.location.query = jsonActionSub.mapAction.showLocation.location.query
                  this.menu[i].subMenu[j].searchLocation.fallbackUrl = jsonActionSub.mapAction.showLocation.fallbackUrl
                } else {
                  this.menu[i].subMenu[j].type = 'show_location'
                  this.menu[i].subMenu[j].showLocation.location.latitude = jsonActionSub.mapAction.showLocation.location.latitude
                  this.menu[i].subMenu[j].showLocation.location.longitude = jsonActionSub.mapAction.showLocation.location.longitude
                  this.menu[i].subMenu[j].showLocation.location.label = jsonActionSub.mapAction.showLocation.location.label
                  this.menu[i].subMenu[j].showLocation.fallbackUrl = jsonActionSub.mapAction.showLocation.fallbackUrl
                }
              } else if (subList.actType === 'dialerAction') {
                this.menu[i].subMenu[j].type = 'dial_phone_number'
                this.menu[i].subMenu[j].dialPhoneNumber = jsonActionSub.dialerAction.dialPhoneNumber.phoneNumber
              } else if (subList.actType === 'calendarAction') {
                this.menu[i].subMenu[j].type = 'create_calendar_event'
                this.menu[i].subMenu[j].calendarAction.createCalendarEvent.startTime = this.getParsedTime(jsonActionSub.calendarAction.createCalendarEvent.startTime, false)
                this.menu[i].subMenu[j].calendarAction.createCalendarEvent.endTime = this.getParsedTime(jsonActionSub.calendarAction.createCalendarEvent.endTime, false)
                this.menu[i].subMenu[j].calendarAction.createCalendarEvent.title = jsonActionSub.calendarAction.createCalendarEvent.title
                this.menu[i].subMenu[j].calendarAction.createCalendarEvent.description = jsonActionSub.calendarAction.createCalendarEvent.description
              } else if (subList.actType === 'clipboardAction') {
                this.menu[i].subMenu[j].type = 'copy_to_clipboard'
                this.menu[i].subMenu[j].copyToClipboard = jsonActionSub.clipboardAction.copyToClipboard.text
              } else if (subList.actType === 'composeAction') {
                this.menu[i].subMenu[j].type = 'compose_text_message'
                this.menu[i].subMenu[j].composeTextMessage.phoneNumber = jsonActionSub.composeAction.composeTextMessage.phoneNumber
                this.menu[i].subMenu[j].composeTextMessage.text = jsonActionSub.composeAction.composeTextMessage.text
              }
              if (j + 1 !== subListObj.length) {
                this.addSubMenu()
              }
            }
          }
        }
        if (i + 1 !== this.menuList.length) {
          this.menuTab = (i + 1) + 1
          this.addMenu()
        }
      }
      this.menuTab = 1
    },
    getParsedTime(time, isRequest) {
      if (isRequest) {
        // Date 형식을 UTC 형태로 치환 EX) Thu May 06 2021 05:00:00 GMT+0900 (대한민국 표준시) >>> 2021-05-06T05:00:00+09:00
        // 이후 MaaP형식에 따라 분을 제거한다.
        let utc = moment.utc(time).utcOffset(9 * 60).format()
        return utc.substring(0, utc.lastIndexOf(this.utcSplitor))
      }
      return moment(time + this.utcSplitor).toDate()
    },
    // 메뉴 추가
    addMenu() {
      const menuData = {
        ordNo: this.menu.length + 1,
        title: '',
        type: '',
        postbackId: '',
        armId: '',
        copyToClipboard: '',
        openInnerUrl: { isHalfView: false },
        showLocation: {
          location: {},
          fallbackUrl: ''
        },
        searchLocation: {
          location: {},
          fallbackUrl: ''
        },
        calendarAction: {
          createCalendarEvent: {
            startTime: '',
            endTime: '',
            title: '',
            description: ''
          }
        },
        composeTextMessage: {},
        subMenu: [
          {
            ordNo: 1,
            title: '',
            type: '',
            postbackId: '',
            armId: '',
            copyToClipboard: '',
            openInnerUrl: { isHalfView: false },
            showLocation: {
              location: {},
              fallbackUrl: ''
            },
            searchLocation: {
              location: {},
              fallbackUrl: ''
            },
            calendarAction: {
              createCalendarEvent: {
                startTime: '',
                endTime: '',
                title: '',
                description: ''
              }
            },
            composeTextMessage: {}
          }
        ],
        subMenuTab: 1
      }
      this.menu.push(menuData)
      this.menuTab = menuData.ordNo
      this.focusThis('title_' + this.menuTab)
    },
    // 메뉴 삭제
    delMenu(e) {
      this.$confirmMsg('대화방 메뉴를 삭제하시겠습니까? 삭제시 입력된 내용이 모두 삭제 됩니다.', '타이틀', '확인', '취소')
        .then(() => {
          // 현재 활성화 된 탭 임시 저장
          const currentTab = this.menuTab
          // 탭 삭제
          const index = e.target.getAttribute('index')
          this.menu.splice(index, 1)
          // 활성화 탭 변경
          if (this.menu.length >= currentTab) {
            this.menuTab = currentTab
          } else {
            this.menuTab = this.menu.length
          }
        })
    },
    // 메뉴 선택
    selectMenuTab(e) {
      const index = e.target.getAttribute('index')
      this.menuTab = Number(index)
      this.focusThis('title_' + this.menuTab)
    },
    // 하위 메뉴 추가
    addSubMenu() {
      const i = this.menuTab - 1
      const menuData = {
        ordNo: this.menu[i].subMenu.length + 1,
        title: '',
        type: '',
        postbackId: '',
        armId: '',
        copyToClipboard: '',
        openInnerUrl: { isHalfView: false },
        showLocation: {
          location: {},
          fallbackUrl: ''
        },
        searchLocation: {
          location: {},
          fallbackUrl: ''
        },
        calendarAction: {
          createCalendarEvent: {
            startTime: '',
            endTime: '',
            title: '',
            description: ''
          }
        },
        composeTextMessage: {}
      }
      this.menu[i].subMenu.push(menuData)
      this.menu[i].subMenuTab = menuData.ordNo
      this.focusThis('title_' + this.menuTab + this.menu[i].subMenuTab)
    },
    // 하위 메뉴 선택
    selectSubMenuTab(e) {
      const index = typeof e === 'object' ? e.target.getAttribute('index') : e
      const i = this.menuTab - 1
      this.menu[i].subMenuTab = Number(index)
      this.$refs.persistentMenuEmulator.goSubDepth(i)
      if (typeof e === 'object') {
        this.focusThis('title_' + this.menuTab + this.menu[i].subMenuTab)
      }
    },
    // 하위 메뉴 삭제
    delSubMenu(e) {
      this.$confirmMsg('메뉴를 삭제하시겠습니까?', '타이틀', '확인', '취소')
        .then(() => {
          const index = e.target.getAttribute('index')
          let i = this.menuTab - 1
          // 현재 활성화 된 탭 임시 저장
          const currentTab = this.menu[i].subMenuTab
          this.menu[i].subMenuTab = null
          // 탭 삭제
          this.menu[i].subMenu.splice(index, 1)
          // 활성화 탭 변경
          if (this.menu[i].subMenu.length >= currentTab) {
            this.menu[i].subMenuTab = currentTab
          } else {
            this.menu[i].subMenuTab = this.menu[i].subMenu.length
          }
        })
    },
    // 메뉴 탭 object를 json 데이터로 만듦
    menuData() {
      // @#@#@#=
      if (!this.validationMenu(this.menu)) {
        return false
      }
      let menus = []
      for (let i = 0; i < this.menu.length; i++) {
        switch (this.menu[i].type) {
          case 'basic_reply' :
            menus.push({
              type: 'reply',
              title: this.menu[i].title,
              postbackId: this.menu[i].postbackId,
              ordNo: i + 1
            })
            break
          case 'auto_reply' :
            menus.push({
              type: 'reply',
              title: this.menu[i].title,
              postbackId: this.menu[i].postbackId,
              ordNo: i + 1,
              autoReplyMsgId: this.menu[i].armId
            })
            break
          case 'open_out_url' :
            menus.push({
              type: 'action',
              title: this.menu[i].title,
              postbackId: this.menu[i].postbackId,
              ordNo: i + 1,
              actionType: 'urlAction',
              action: {
                urlAction: {
                  openUrl: {
                    url: this.menu[i].openOutUrl
                  }
                }
              }
            })
            break
          case 'open_inner_url' :
            let postParameter = this.menu[i].openInnerUrl.postParameter
            let json
            if (postParameter) {
              try {
                json = JSON.parse('{ ' + postParameter + '}')
              } catch (e) {
                console.error(e)
              }
            }
            menus.push({
              type: 'action',
              title: this.menu[i].title,
              postbackId: this.menu[i].postbackId,
              ordNo: i + 1,
              actionType: 'localBrowserAction',
              action: {
                localBrowserAction: {
                  openUrl: {
                    url: this.menu[i].openInnerUrl.url,
                    isHalfView: this.menu[i].openInnerUrl.isHalfView,
                    postParameter: json
                  }
                }
              }
            })
            break
          case 'show_location' :
            menus.push({
              type: 'action',
              title: this.menu[i].title,
              postbackId: this.menu[i].postbackId,
              ordNo: i + 1,
              actionType: 'mapAction',
              action: {
                mapAction: {
                  showLocation: {
                    location: {
                      latitude: this.menu[i].showLocation.location.latitude,
                      longitude: this.menu[i].showLocation.location.longitude,
                      label: this.menu[i].showLocation.location.label
                    },
                    fallbackUrl: this.menu[i].showLocation.fallbackUrl
                  }
                }
              }
            })
            break
          case 'search_locations' :
            menus.push({
              type: 'action',
              title: this.menu[i].title,
              postbackId: this.menu[i].postbackId,
              ordNo: i + 1,
              actionType: 'mapAction',
              action: {
                mapAction: {
                  showLocation: {
                    location: {
                      query: this.menu[i].searchLocation.location.query
                    },
                    fallbackUrl: this.menu[i].searchLocation.fallbackUrl
                  }
                }
              }
            })
            break
          case 'request_location_push' :
            menus.push({
              type: 'action',
              title: this.menu[i].title,
              postbackId: this.menu[i].postbackId,
              ordNo: i + 1,
              actionType: 'mapAction',
              action: {
                mapAction: {
                  requestLocationPush: {}
                }
              }
            })
            break
          case 'dial_phone_number' :
            menus.push({
              type: 'action',
              title: this.menu[i].title,
              postbackId: this.menu[i].postbackId,
              ordNo: i + 1,
              actionType: 'dialerAction',
              action: {
                dialerAction: {
                  dialPhoneNumber: {
                    phoneNumber: this.menu[i].dialPhoneNumber
                  }
                }
              }
            })
            break
          case 'create_calendar_event' :
            menus.push({
              type: 'action',
              title: this.menu[i].title,
              postbackId: this.menu[i].postbackId,
              ordNo: i + 1,
              actionType: 'calendarAction',
              action: {
                calendarAction: {
                  createCalendarEvent: {
                    startTime: this.getParsedTime(this.menu[i].calendarAction.createCalendarEvent.startTime, true),
                    endTime: this.getParsedTime(this.menu[i].calendarAction.createCalendarEvent.endTime, true),
                    title: this.menu[i].calendarAction.createCalendarEvent.title,
                    description: this.menu[i].calendarAction.createCalendarEvent.description
                  }
                }
              }
            })
            break
          case 'copy_to_clipboard' :
            menus.push({
              type: 'action',
              title: this.menu[i].title,
              postbackId: this.menu[i].postbackId,
              ordNo: i + 1,
              actionType: 'clipboardAction',
              action: {
                clipboardAction: {
                  copyToClipboard: {
                    text: this.menu[i].copyToClipboard
                  }
                }
              }
            })
            break
          case 'compose_text_message' :
            menus.push({
              type: 'action',
              title: this.menu[i].title,
              postbackId: this.menu[i].postbackId,
              ordNo: i + 1,
              actionType: 'composeAction',
              action: {
                composeAction: {
                  composeTextMessage: {
                    phoneNumber: this.menu[i].composeTextMessage.phoneNumber,
                    text: this.menu[i].composeTextMessage.text
                  }
                }
              }
            })
            break
          case 'sub_menu' :
            let subMenus = []
            for (let j = 0; j < this.menu[i].subMenu.length; j++) {
              switch (this.menu[i].subMenu[j].type) {
                case 'basic_reply' :
                  subMenus.push({
                    type: 'reply',
                    title: this.menu[i].subMenu[j].title,
                    postbackId: this.menu[i].subMenu[j].postbackId,
                    ordNo: j + 1
                  })
                  break
                case 'auto_reply' :
                  subMenus.push({
                    type: 'reply',
                    title: this.menu[i].subMenu[j].title,
                    postbackId: this.menu[i].subMenu[j].postbackId,
                    ordNo: j + 1,
                    autoReplyMsgId: this.menu[i].subMenu[j].armId
                  })
                  break
                case 'open_out_url' :
                  subMenus.push({
                    type: 'action',
                    title: this.menu[i].subMenu[j].title,
                    postbackId: this.menu[i].subMenu[j].postbackId,
                    ordNo: j + 1,
                    actionType: 'urlAction',
                    action: {
                      urlAction: {
                        openUrl: {
                          url: this.menu[i].subMenu[j].openOutUrl
                        }
                      }
                    }
                  })
                  break
                case 'open_inner_url' :
                  let postParameter = this.menu[i].subMenu[j].openInnerUrl.postParameter
                  let json
                  if (postParameter) {
                    try {
                      json = JSON.parse('{ ' + postParameter + '}')
                    } catch (e) {
                      console.error(e)
                    }
                  }
                  subMenus.push({
                    type: 'action',
                    title: this.menu[i].subMenu[j].title,
                    postbackId: this.menu[i].subMenu[j].postbackId,
                    ordNo: j + 1,
                    actionType: 'localBrowserAction',
                    action: {
                      localBrowserAction: {
                        openUrl: {
                          url: this.menu[i].subMenu[j].openInnerUrl.url,
                          isHalfView: this.menu[i].subMenu[j].openInnerUrl.isHalfView,
                          postParameter: json
                        }
                      }
                    }
                  })
                  break
                case 'show_location' :
                  subMenus.push({
                    type: 'action',
                    title: this.menu[i].subMenu[j].title,
                    postbackId: this.menu[i].subMenu[j].postbackId,
                    ordNo: j + 1,
                    actionType: 'mapAction',
                    action: {
                      mapAction: {
                        showLocation: {
                          location: {
                            latitude: this.menu[i].subMenu[j].showLocation.location.latitude,
                            longitude: this.menu[i].subMenu[j].showLocation.location.longitude,
                            label: this.menu[i].subMenu[j].showLocation.location.label
                          },
                          fallbackUrl: this.menu[i].subMenu[j].showLocation.fallbackUrl
                        }
                      }
                    }
                  })
                  break
                case 'search_locations' :
                  subMenus.push({
                    type: 'action',
                    title: this.menu[i].subMenu[j].title,
                    postbackId: this.menu[i].subMenu[j].postbackId,
                    ordNo: j + 1,
                    actionType: 'mapAction',
                    action: {
                      mapAction: {
                        showLocation: {
                          location: {
                            query: this.menu[i].subMenu[j].searchLocation.location.query
                          },
                          fallbackUrl: this.menu[i].subMenu[j].searchLocation.fallbackUrl
                        }
                      }
                    }
                  })
                  break
                case 'request_location_push' :
                  subMenus.push({
                    type: 'action',
                    title: this.menu[i].subMenu[j].title,
                    postbackId: this.menu[i].subMenu[j].postbackId,
                    ordNo: j + 1,
                    actionType: 'mapAction',
                    action: {
                      mapAction: {
                        requestLocationPush: {}
                      }
                    }
                  })
                  break
                case 'dial_phone_number' :
                  subMenus.push({
                    type: 'action',
                    title: this.menu[i].subMenu[j].title,
                    postbackId: this.menu[i].subMenu[j].postbackId,
                    ordNo: j + 1,
                    actionType: 'dialerAction',
                    action: {
                      dialerAction: {
                        dialPhoneNumber: {
                          phoneNumber: this.menu[i].subMenu[j].dialPhoneNumber
                        }
                      }
                    }
                  })
                  break
                case 'create_calendar_event' :
                  subMenus.push({
                    type: 'action',
                    title: this.menu[i].subMenu[j].title,
                    postbackId: this.menu[i].subMenu[j].postbackId,
                    ordNo: j + 1,
                    actionType: 'calendarAction',
                    action: {
                      calendarAction: {
                        createCalendarEvent: {
                          startTime: this.getParsedTime(this.menu[i].subMenu[j].calendarAction.createCalendarEvent.startTime, true),
                          endTime: this.getParsedTime(this.menu[i].subMenu[j].calendarAction.createCalendarEvent.endTime, true),
                          title: this.menu[i].subMenu[j].calendarAction.createCalendarEvent.title,
                          description: this.menu[i].subMenu[j].calendarAction.createCalendarEvent.description
                        }
                      }
                    }
                  })
                  break
                case 'copy_to_clipboard' :
                  subMenus.push({
                    type: 'action',
                    title: this.menu[i].subMenu[j].title,
                    postbackId: this.menu[i].subMenu[j].postbackId,
                    ordNo: j + 1,
                    actionType: 'clipboardAction',
                    action: {
                      clipboardAction: {
                        copyToClipboard: {
                          text: this.menu[i].subMenu[j].copyToClipboard
                        }
                      }
                    }
                  })
                  break
                case 'compose_text_message' :
                  subMenus.push({
                    type: 'action',
                    title: this.menu[i].subMenu[j].title,
                    postbackId: this.menu[i].subMenu[j].postbackId,
                    ordNo: j + 1,
                    actionType: 'composeAction',
                    action: {
                      composeAction: {
                        composeTextMessage: {
                          phoneNumber: this.menu[i].subMenu[j].composeTextMessage.phoneNumber,
                          text: this.menu[i].subMenu[j].composeTextMessage.text
                        }
                      }
                    }
                  })
                  break
              } // switch subMenu end
              subMenus[j].actionJson = JSON.stringify(subMenus[j].action)
            } // for~subMenu end
            menus.push({
              type: 'menu',
              title: this.menu[i].title,
              postbackId: this.menu[i].postbackId,
              ordNo: i + 1,
              subMenu: subMenus
            })
            break // end : case 'sub_menu'
        } // end : (this.menu[i].type)switch..
        menus[i].actionJson = JSON.stringify(menus[i].action)
      }
      this.$emit('menuData', menus)
    },
    isNotAfter(o) {
      return o.startTime && o.endTime && !moment(o.endTime).isAfter(o.startTime)
    },
    cfm(menuTab, o) {
      if (this.isNotAfter(o)) {
        this.$alertMsg('종료날짜는 시작날짜 이후이어야 합니다.').then(() => { this.focusThis(`endTime_${menuTab}`) })
      }
    },
    cfmSub(menuTab, o) {
      if (this.isNotAfter(o)) {
        this.$alertMsg('종료날짜는 시작날짜 이후이어야 합니다.').then(() => { this.focusThis(`endTime_${menuTab}${this.menu[menuTab - 1].subMenuTab}`) })
      }
    },
    clearTime(o) {
      o.startTime = null
      o.endTime = null
    },
    validationMenu(menu) {
      for (let i = 0; i < menu.length; i++) {
        let thisMenu = menu[i]
        let type = thisMenu.type
        if (type === 'copy_to_clipboard' || type === 'open_out_url' || type === 'open_inner_url' || type === 'show_location' || type === 'search_locations' ||
          type === 'request_location_push' || type === 'create_calendar_event' || type === 'compose_text_message') {
          this.$alertMsg('잘못된 응답유형이 선택되었습니다.')
          return false
        }

        let title = thisMenu.title
        let menuTabIdx = i + 1
        if (jglib.isEmpty(type)) {
          this.validAlert('select_', menuTabIdx)
          return false
        }
        if (jglib.isEmpty(title)) {
          this.validAlert('title_', menuTabIdx)
          return false
        }
        if (type === 'auto_reply' && jglib.isEmpty(thisMenu.armId)) {
          this.validAlert('autoReply_', menuTabIdx)
          return false
        }
        if (type === 'copy_to_clipboard' && jglib.isEmpty(thisMenu.copyToClipboard)) {
          this.validAlert('copyToClipboard_', menuTabIdx)
          return false
        }
        if (type === 'open_out_url' && jglib.isEmpty(thisMenu.openOutUrl)) {
          this.validAlert('openOutUrl_', menuTabIdx)
          return false
        }
        if (type === 'open_out_url' && thisMenu.openOutUrl.indexOf('http://') !== 0 && thisMenu.openOutUrl.indexOf('https://') !== 0) {
          this.validValue('openOutUrl_', menuTabIdx, 'url')
          return false
        }
        if (type === 'open_inner_url' && jglib.isEmpty(thisMenu.openInnerUrl.url)) {
          this.validAlert('openInnerUrl.url_', menuTabIdx)
          return false
        }
        if (type === 'open_inner_url' && thisMenu.openInnerUrl.url.indexOf('http://') !== 0 && thisMenu.openInnerUrl.url.indexOf('https://') !== 0) {
          this.validValue('openInnerUrl.url_', menuTabIdx, 'url')
          return false
        }
        if (type === 'open_inner_url' && !jglib.isEmpty(thisMenu.openInnerUrl.postParameter) && !this.isJsonString(thisMenu.openInnerUrl.postParameter)) {
          this.validValue('openInnerUrl.url_', menuTabIdx, 'postParameter')
          return false
        }
        if (type === 'dial_phone_number' && jglib.isEmpty(thisMenu.dialPhoneNumber)) {
          this.validAlert('dialPhoneNumber_', menuTabIdx)
          return false
        }
        if (type === 'dial_phone_number' && isNaN(thisMenu.dialPhoneNumber)) {
          this.validValue('dialPhoneNumber_', menuTabIdx, 'phoneNumber')
          return false
        }
        if (type === 'show_location') {
          if (jglib.isEmpty(thisMenu.showLocation.location.latitude)) {
            this.validAlert('showLocation.location.latitude_', menuTabIdx)
            return false
          } else if (jglib.isEmpty(thisMenu.showLocation.location.longitude)) {
            this.validAlert('showLocation.location.longitude_', menuTabIdx)
            return false
          } else if (jglib.isEmpty(thisMenu.showLocation.location.label)) {
            this.validAlert('showLocation.location.label_', menuTabIdx)
            return false
          } else if (jglib.isEmpty(thisMenu.showLocation.fallbackUrl)) {
            this.validAlert('showLocation.fallbackUrl_', menuTabIdx)
            return false
          }
        }
        if (type === 'show_location' && thisMenu.showLocation.fallbackUrl.indexOf('http://') !== 0 && thisMenu.showLocation.fallbackUrl.indexOf('https://') !== 0) {
          this.validValue('showLocation.fallbackUrl_', menuTabIdx, 'url')
          return false
        }
        if (type === 'show_location' && !/^([0-9]*)[.]?([0-9]*)?$/.test(thisMenu.showLocation.location.latitude)) {
          this.validValue('showLocation.location.latitude_', menuTabIdx, 'float')
          return false
        }
        if (type === 'show_location' && !/^([0-9]*)[.]?([0-9]*)?$/.test(thisMenu.showLocation.location.longitude)) {
          this.validValue('showLocation.location.longitude_', menuTabIdx, 'float')
          return false
        }
        if (type === 'search_locations') {
          if (jglib.isEmpty(thisMenu.searchLocation.location.query)) {
            this.validAlert('searchLocation.location.query_', menuTabIdx)
            return false
          } else if (jglib.isEmpty(thisMenu.searchLocation.fallbackUrl)) {
            this.validAlert('searchLocation.fallbackUrl_', menuTabIdx)
            return false
          }
        }
        if (type === 'search_locations' && thisMenu.searchLocation.fallbackUrl.indexOf('http://') !== 0 && thisMenu.searchLocation.fallbackUrl.indexOf('https://') !== 0) {
          this.validValue('searchLocation.fallbackUrl_', menuTabIdx, 'url')
          return false
        }
        if (type === 'create_calendar_event') {
          if (!thisMenu.calendarAction.createCalendarEvent.startTime) {
            this.validAlert('startTime_', menuTabIdx)
            return false
          } else if (!thisMenu.calendarAction.createCalendarEvent.endTime) {
            this.validAlert('endTime_', menuTabIdx)
            return false
          } else if (jglib.isEmpty(thisMenu.calendarAction.createCalendarEvent.title)) {
            this.validAlert('calendarAction.createCalendarEvent.title_', menuTabIdx)
            return false
          } else if (jglib.isEmpty(thisMenu.calendarAction.createCalendarEvent.description)) {
            this.validAlert('calendarAction.createCalendarEvent.description_', menuTabIdx)
            return false
          }
        }
        if (type === 'create_calendar_event' && this.isNotAfter(thisMenu.calendarAction.createCalendarEvent)) {
          this.validValue('endTime_', menuTabIdx, 'calendar')
          return false
        }
        if (type === 'compose_text_message') {
          if (jglib.isEmpty(thisMenu.composeTextMessage.phoneNumber)) {
            this.validAlert('composeTextMessage.phoneNumber_', menuTabIdx)
            return false
          } else if (jglib.isEmpty(thisMenu.composeTextMessage.text)) {
            this.validAlert('composeTextMessage.text_', menuTabIdx)
            return false
          }
        }
        if (type === 'sub_menu') {
          for (let j = 0; j < this.menu[i].subMenu.length; j++) {
            let thisSubMenu = menu[i].subMenu[j]
            let typeSub = thisSubMenu.type
            if (typeSub === 'copy_to_clipboard' || typeSub === 'open_out_url' || typeSub === 'open_inner_url' || typeSub === 'show_location' || typeSub === 'search_locations' ||
              typeSub === 'request_location_push' || typeSub === 'create_calendar_event' || typeSub === 'compose_text_message') {
              this.$alertMsg('잘못된 응답유형이 선택되었습니다.')
              return false
            }
            let titleSub = thisSubMenu.title
            let subMenuTabIdx = j + 1
            if (jglib.isEmpty(typeSub)) {
              this.validAlertSub('select_', menuTabIdx, subMenuTabIdx)
              return false
            }
            if (jglib.isEmpty(titleSub)) {
              this.validAlertSub('title_', menuTabIdx, subMenuTabIdx)
              return false
            }
            if (typeSub === 'auto_reply' && jglib.isEmpty(thisSubMenu.armId)) {
              this.validAlertSub('autoReply_', menuTabIdx, subMenuTabIdx)
              return false
            }
            if (typeSub === 'copy_to_clipboard' && jglib.isEmpty(thisSubMenu.copyToClipboard)) {
              this.validAlertSub('copyToClipboard_', menuTabIdx, subMenuTabIdx)
              return false
            }
            if (typeSub === 'open_out_url' && jglib.isEmpty(thisSubMenu.openOutUrl)) {
              this.validAlertSub('openOutUrl_', menuTabIdx, subMenuTabIdx)
              return false
            }
            if (typeSub === 'open_out_url' && thisSubMenu.openOutUrl.indexOf('http://') !== 0 && thisSubMenu.openOutUrl.indexOf('https://') !== 0) {
              this.validValueSub('openOutUrl_', menuTabIdx, subMenuTabIdx, 'url')
              return false
            }
            if (typeSub === 'open_inner_url' && jglib.isEmpty(thisSubMenu.openInnerUrl.url)) {
              this.validAlertSub('openInnerUrl.url_', menuTabIdx, subMenuTabIdx)
              return false
            }
            if (typeSub === 'open_inner_url' && thisSubMenu.openInnerUrl.url.indexOf('http://') !== 0 && thisSubMenu.openInnerUrl.url.indexOf('https://') !== 0) {
              this.validValueSub('openInnerUrl.url_', menuTabIdx, subMenuTabIdx, 'url')
              return false
            }
            if (typeSub === 'open_inner_url' && !jglib.isEmpty(thisSubMenu.openInnerUrl.postParameter) && !this.isJsonString(thisSubMenu.openInnerUrl.postParameter)) {
              this.validValueSub('openInnerUrl.url_', menuTabIdx, subMenuTabIdx, 'postParameter')
              return false
            }
            if (typeSub === 'dial_phone_number' && jglib.isEmpty(thisSubMenu.dialPhoneNumber)) {
              this.validAlertSub('dialPhoneNumber_', menuTabIdx, subMenuTabIdx)
              return false
            }
            if (typeSub === 'dial_phone_number' && isNaN(thisSubMenu.dialPhoneNumber)) {
              this.validValueSub('dialPhoneNumber_', menuTabIdx, subMenuTabIdx, 'phoneNumber')
              return false
            }
            if (typeSub === 'show_location') {
              if (jglib.isEmpty(thisSubMenu.showLocation.location.latitude)) {
                this.validAlertSub('showLocation.location.latitude_', menuTabIdx, subMenuTabIdx)
                return false
              } else if (jglib.isEmpty(thisSubMenu.showLocation.location.longitude)) {
                this.validAlertSub('showLocation.location.longitude_', menuTabIdx, subMenuTabIdx)
                return false
              } else if (jglib.isEmpty(thisSubMenu.showLocation.location.label)) {
                this.validAlertSub('showLocation.location.label_', menuTabIdx, subMenuTabIdx)
                return false
              } else if (jglib.isEmpty(thisSubMenu.showLocation.fallbackUrl)) {
                this.validAlertSub('showLocation.fallbackUrl_', menuTabIdx, subMenuTabIdx)
                return false
              }
            }
            if (typeSub === 'show_location' && thisSubMenu.showLocation.fallbackUrl.indexOf('http://') !== 0 && thisSubMenu.showLocation.fallbackUrl.indexOf('https://') !== 0) {
              this.validValueSub('showLocation.fallbackUrl_', menuTabIdx, subMenuTabIdx, 'url')
              return false
            }
            if (typeSub === 'show_location' && !/^([0-9]*)[.]?([0-9]*)?$/.test(thisSubMenu.showLocation.location.latitude)) {
              this.validValueSub('showLocation.location.latitude_', menuTabIdx, subMenuTabIdx, 'float')
              return false
            }
            if (typeSub === 'show_location' && !/^([0-9]*)[.]?([0-9]*)?$/.test(thisSubMenu.showLocation.location.longitude)) {
              this.validValueSub('showLocation.location.longitude_', menuTabIdx, subMenuTabIdx, 'float')
              return false
            }
            if (typeSub === 'search_locations') {
              if (jglib.isEmpty(thisSubMenu.searchLocation.location.query)) {
                this.validAlertSub('searchLocation.location.query_', menuTabIdx, subMenuTabIdx)
                return false
              } else if (jglib.isEmpty(thisSubMenu.searchLocation.fallbackUrl)) {
                this.validAlertSub('searchLocation.fallbackUrl_', menuTabIdx, subMenuTabIdx)
                return false
              }
            }
            if (typeSub === 'search_locations' && thisSubMenu.searchLocation.fallbackUrl.indexOf('http://') !== 0 && thisSubMenu.searchLocation.fallbackUrl.indexOf('https://') !== 0) {
              this.validValueSub('searchLocation.fallbackUrl_', menuTabIdx, subMenuTabIdx, 'url')
              return false
            }
            if (typeSub === 'create_calendar_event') {
              if (!thisSubMenu.calendarAction.createCalendarEvent.startTime) {
                this.validAlertSub('startTime_', menuTabIdx, subMenuTabIdx)
                return false
              } else if (!thisSubMenu.calendarAction.createCalendarEvent.endTime) {
                this.validAlertSub('startTime_', menuTabIdx, subMenuTabIdx)
                return false
              } else if (jglib.isEmpty(thisSubMenu.calendarAction.createCalendarEvent.title)) {
                this.validAlertSub('calendarAction.createCalendarEvent.title_', menuTabIdx, subMenuTabIdx)
                return false
              } else if (jglib.isEmpty(thisSubMenu.calendarAction.createCalendarEvent.description)) {
                this.validAlertSub('calendarAction.createCalendarEvent.description_', menuTabIdx, subMenuTabIdx)
                return false
              }
            }
            if (typeSub === 'create_calendar_event' && this.isNotAfter(thisSubMenu.calendarAction.createCalendarEvent)) {
              this.validValueSub('endTime_', menuTabIdx, subMenuTabIdx, 'calendar')
              return false
            }
            if (typeSub === 'compose_text_message') {
              if (jglib.isEmpty(thisSubMenu.composeTextMessage.phoneNumber)) {
                this.validAlertSub('composeTextMessage.phoneNumber_', menuTabIdx, subMenuTabIdx)
                return false
              } else if (jglib.isEmpty(thisSubMenu.composeTextMessage.text)) {
                this.validAlertSub('composeTextMessage.text_', menuTabIdx, subMenuTabIdx)
                return false
              }
            }
          }
        }
      }
      return true
    },
    validAlert(focusDom, menuTabIdx) {
      this.menuTab = menuTabIdx
      let msg
      if (focusDom === 'select_') {
        msg = '대화방 메뉴' + menuTabIdx + ' 유형을 선택해 주세요'
      } else if (focusDom === 'title_') {
        msg = '대화방 메뉴' + menuTabIdx + ' 메뉴명을 입력해 주세요'
      } else if (focusDom === 'autoReply_') {
        msg = '대화방 메뉴' + menuTabIdx + ' 자동응답을 선택해 주세요'
      } else {
        msg = '대화방 메뉴' + menuTabIdx + ' 응답값을 입력해 주세요'
      }
      this.$alertMsg(msg).then(() => {
        this.focusThis(focusDom + menuTabIdx)
      })
    },
    validAlertSub(focusDom, menuTabIdx, subMenuTabIdx) {
      this.menuTab = menuTabIdx
      this.menu[menuTabIdx - 1].subMenuTab = subMenuTabIdx
      let msg
      if (focusDom === 'select_') {
        msg = '메뉴' + menuTabIdx + '-' + subMenuTabIdx + ' 유형을 선택해 주세요'
      } else if (focusDom === 'title_') {
        msg = '메뉴' + menuTabIdx + '-' + subMenuTabIdx + ' 메뉴명을 입력해 주세요'
      } else if (focusDom === 'autoReply_') {
        msg = '메뉴' + menuTabIdx + '-' + subMenuTabIdx + ' 자동응답을 선택해 주세요'
      } else {
        msg = '메뉴' + menuTabIdx + '-' + subMenuTabIdx + ' 응답값을 입력해 주세요'
      }
      this.$alertMsg(msg).then(() => {
        this.focusThis(focusDom + menuTabIdx + subMenuTabIdx)
      })
    },
    validValue(focusDom, menuTabIdx, reason) {
      this.menuTab = menuTabIdx
      let msg
      if (reason === 'url') {
        msg = '올바른 URL 형식이 아닙니다.'
      } else if (reason === 'postParameter') {
        msg = '파라미터는 POST 형태로 입력되어야 합니다.'
      } else if (reason === 'phoneNumber') {
        msg = '전화번호는 숫자만 입력되어야 합니다.'
      } else if (reason === 'float') {
        msg = '위도 / 경도는 실수 형태로 입력되어야 합니다.'
      } else if (reason === 'calendar') {
        msg = '종료날짜는 시작날짜 이후이어야 합니다.'
      }
      this.$alertMsg(msg).then(() => {
        this.focusThis(focusDom + menuTabIdx)
      })
    },
    validValueSub(focusDom, menuTabIdx, subMenuTabIdx, reason) {
      this.menuTab = menuTabIdx
      this.menu[menuTabIdx - 1].subMenuTab = subMenuTabIdx
      let msg
      if (reason === 'url') {
        msg = '올바른 URL 형식이 아닙니다.'
      } else if (reason === 'postParameter') {
        msg = '파라미터는 POST 형태로 입력되어야 합니다.'
      } else if (reason === 'phoneNumber') {
        msg = '전화번호는 숫자만 입력되어야 합니다.'
      } else if (reason === 'float') {
        msg = '위도 / 경도는 실수 형태로 입력되어야 합니다.'
      } else if (reason === 'calendar') {
        msg = '종료날짜는 시작날짜 이후이어야 합니다.'
      }
      this.$alertMsg(msg).then(() => {
        this.focusThis(focusDom + menuTabIdx + subMenuTabIdx)
      })
    },
    isJsonString(str) {
      try {
        let val = '{' + str + '}'
        let json = JSON.parse(val)
        return (typeof json === 'object')
      } catch (e) {
        // console.error(e)
        return false
      }
    },
    slideUpButtonSlide() {
      if (this.menuTab !== 1) {
        let currentList = this.menu
        const item = currentList.splice((this.menuTab - 1), 1)
        currentList.splice((this.menuTab - 1) - 1, 0, item[0])

        this.menu = currentList
        this.menuTab = Number(this.menuTab - 1)
        this.focusThis('title_' + this.menuTab)
      }
    },
    // 슬라이드 > 버튼 클릭 시
    slideDownButtonSlide() {
      if (this.menuTab !== 10) {
        let currentList = this.menu
        const item = currentList.splice((this.menuTab - 1), 1)
        currentList.splice((this.menuTab - 1) + 1, 0, item[0])

        this.menu = currentList
        this.menuTab = Number(this.menuTab + 1)
        this.focusThis('title_' + this.menuTab)
      }
    },
    slideUpSubButtonSlide(menu) {
      let menuTab = menu.subMenuTab
      if (menuTab !== 1) {
        let currentList = menu.subMenu
        const item = currentList.splice((menuTab - 1), 1)
        currentList.splice((menuTab - 1) - 1, 0, item[0])

        menu.subMenu = currentList
        menu.subMenuTab = Number(menuTab - 1)
        this.focusThis('title_' + this.menuTab + menu.subMenuTab)
      }
    },
    slideDownSubButtonSlide(menu) {
      let menuTab = menu.subMenuTab
      if (menuTab !== 10) {
        let currentList = menu.subMenu
        const item = currentList.splice((menuTab - 1), 1)
        currentList.splice((menuTab - 1) + 1, 0, item[0])

        menu.subMenu = currentList
        menu.subMenuTab = Number(menuTab + 1)
        this.focusThis('title_' + this.menuTab + menu.subMenuTab)
      }
    }
  }
}
</script>
