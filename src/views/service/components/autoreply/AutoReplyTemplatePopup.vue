<template>
  <div class="rcs_container service_wrap text-left">
    <div class="layer auto active">
      <div class="layer_cont common_tpl add_grid dv2023_autoreply-template">
        <div class="layer_body" v-if="isLoad">
          <div class="rcs_bundle_wrap rcs_bundle_wid">
            <div class="rcs_emul_form_wrap" style="margin-left: 0;">
              <div class="title_wrap mar_b20">
                <span class="h4_title bold">템플릿 선택</span>
                <span class="h4_desc bold">사용하실 자동응답 템플릿을 선택하세요.</span>
              </div>
              <div class="cont_flex_bundle mar_b20">
                <div class="total_area">
                  <span class="total_count">
                    총 <strong class="count">{{ totalcount }}</strong> 건
                  </span>
                </div>
                <div class="select_area">
                  <span class="custom_select mid col_3">
                    <select v-model="searchParam.cardType">
                      <option value>카드타입 전체</option>
                      <option v-for="item in cardTypeList" :value="item.code" :key="item.code">{{ toUppsercaseAfterWhtespace(item.codeNmAlt1 ? item.codeNmAlt1 : item.codeNm) }}</option>
                    </select>
                  </span>
                </div>
                <div class="toggle_area">
                  <button type="button" @click="toggleShowType('grid')" class="grid_view" :class="{ active: showType === 'grid' }" :style="totalcount <= 0 ? 'pointer-events:none;' : ''"></button>
                  <button type="button" @click="toggleShowType('list')" class="list_view" :class="{ active: showType === 'list' }" :style="totalcount <= 0 ? 'pointer-events:none;' : ''"></button>
                </div>
              </div>
              <!-- 리스트(list) 방식 보기 -->
              <div class="view_list_wrap" v-show="showType === 'list'">
                <div>
                  <table v-if="showType === 'list'" class="tbl_col_type">
                    <colgroup>
                      <col style="width:90px">
                      <col style="width:150px">
                      <col style="width:230px;">
                      <col style="width:240px">
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">포멧 ID</th>
                        <th scope="col">카드 타입</th>
                        <th scope="col">상품명</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in list" :key="`row-${index}`" @click="selectTemplate(row)">
                        <td>
                          <span class="custom_radio">
                            <input type="radio" :id="`selTpl_${row.tplId}`" :value="row.tplId" :checked="row.tplId === selectedTplId" @click="selectTemplate(row)"/>
                            <label :for="`selTpl_${row.tplId}`"></label>
                          </span>
                        </td>
                        <td>{{ row.tplId }}</td>
                        <td>{{ toUppsercaseAfterWhtespace(row.cardTypeNm) }}</td>
                        <td class="left">
                          <a href="javascript:void(0);" class="btn_text" @click="selectTemplate(row)">{{ row.tplNm }}</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <pagination2 :total="totalcount" @change="changePage" :current-page.sync="formData.page" class="paging type2" :pageSize="formData.size"/>
                </div>
                <div class="emulator_wrap for_list_view" style="width: auto !important;">
                  <div class="inner_emul preview_template">
                    <strong class="blind">미리보기</strong>
                    <div class="emulator_area">
                      <div class="emulator_cont">
                        <div>
                          <div cardtype="D">
                            <!-- 1) 기본 말풍선 -->
                            <div class="template-richcard-general baloon" v-if="selectedTemplate.tplId === 'SCS00000'">
                              <div class="template-richcard-textview-origin" cardtype="">
                                <p class="text colorgray">
                                  안녕하세요, RBC에 가입하신 것을 환영합니다.<br>
                                  RBC기능이나 RCS에 대해 궁금한 사항이 있으신 경우 질문을 남겨주세요.
                                </p>
                              </div>
                            </div>
                            <!-- 2) 텍스트 카드 -->
                            <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'SCL00000'">
                              <div class="template-richcard-titleview" cardtype="">
                                <h4 class="title">RBC에서 주문이 완료되었습니다.</h4>
                              </div>
                              <div class="template-richcard-descriptionview" cardtype="">
                                <p class="text">- 상품명 : 양수냄비<br/>
                                  - 주문번호 : 2020-11-30-******<br/>
                                  - 결제금액 : 23,200원(카드)<br/>
                                  - 더블 후기 적립금<br/>
                                  - 배송지 : 서울시 마포구 가양대로 1<br/><br/>
                                  ※ 반품 기준은 당사 약관/홈페이지 내 상품 정보 고지 내용에 따르며 가전/가구 설치상품은 사용 후 반품이 불가하므로 이점 유의하시기 바랍니다.
                                </p>
                              </div>
                              <div class="template-richcard-button">
                                <span class="btn">자세히 보러가기</span>
                              </div>
                            </div>
                            <!-- 3) 세로형(Tall, Medium)-->
                            <div class="template-richcard-general" v-show="selectedTemplate.tplId === 'SCwThT00' || selectedTemplate.tplId === 'SCwThM00'">
                              <div class="template-richcard-mediaview" csstype="lms">
                                <img v-if="selectedTemplate.tplId === 'SCwThM00'" src="@/assets/images/comtpl/MMS_Medium_244x144.81c75bb7.png" alt=""/>
                                <img v-else src="@/assets/images/comtpl/MMS_Tall_244x227.6da41395.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" cardtype="SM">
                                <h4 class="title">RBC샵 다이렉트 배송 안내</h4>
                              </div>
                              <div class="template-richcard-descriptionview" cardtype="SM">
                                <p class="text">구매하신 제품이 원하시는 장소로 금일 발송되었습니다.</p>
                              </div>
                              <div class="template-richcard-button">
                                <span class="btn">자세히 보러가기</span>
                              </div>
                            </div>
                            <!-- 4) 슬라이드형(Medium,2장) -->
                            <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CCwMhM0200'">
                              <swiper :slides-per-view="1" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_1.57fe365c.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">믿고 보내는 메시지 &lt;채팅+&gt;</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview">
                                    <p class="text">고객님, 안녕하세요. 확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘기며 새로운 기능을 알아보세요.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_2.a00c0d4e.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">1.’메시지 읽음확인’ 기능</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview">
                                    <p class="text">파란 말풍선 옆에 숫자 "1"이 나타나도 놀라지 마세요. 이제 문자메시지도 상대방이 읽었는지 확인할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                              </swiper>
                              <div class="template-richcard-carousel-prev">Prev</div>
                              <div class="template-richcard-carousel-next">Next</div>
                            </div>
                            <!-- 5) 슬라이드형(Medium,3장) -->
                            <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CCwMhM0300'">
                              <swiper :slides-per-view="1" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_1.57fe365c.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">믿고 보내는 메시지 &lt;채팅+&gt;</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview">
                                    <p class="text">고객님, 안녕하세요. 확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘기며 새로운 기능을 알아보세요.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_2.a00c0d4e.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">1.’메시지 읽음확인’ 기능</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview">
                                    <p class="text">파란 말풍선 옆에 숫자 "1"이 나타나도 놀라지 마세요. 이제 문자메시지도 상대방이 읽었는지 확인할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_3.5a9791bb.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">2.데이터 차감 없이 사진/ 동영상 보내기</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview">
                                    <p class="text">데이터 걱정 없이 사진과 동영상을 공유해보세요. 파일당 최대 5MB까지 데이터 차감없이 보낼 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                              </swiper>
                              <div class="template-richcard-carousel-prev">Prev</div>
                              <div class="template-richcard-carousel-next">Next</div>
                            </div>
                            <!-- 6) 슬라이드형(Medium,4장) -->
                            <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CCwMhM0400'">
                              <swiper :slides-per-view="1" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_1.57fe365c.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">믿고 보내는 메시지 &lt;채팅+&gt;</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview">
                                    <p class="text">고객님, 안녕하세요. 확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘기며 새로운 기능을 알아보세요.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_2.a00c0d4e.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">1.’메시지 읽음확인’ 기능</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview">
                                    <p class="text">파란 말풍선 옆에 숫자 "1"이 나타나도 놀라지 마세요. 이제 문자메시지도 상대방이 읽었는지 확인할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_3.5a9791bb.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">2.데이터 차감 없이 사진/ 동영상 보내기</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview">
                                    <p class="text">데이터 걱정 없이 사진과 동영상을 공유해보세요. 파일당 최대 5MB까지 데이터 차감없이 보낼 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_4.e6145ea4.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">3.마음을 전하는 ‘선물하기’</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview">
                                    <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘선물’을 눌러보세요. 커피,영화티켓,상품권 등 고마운 사람에게 마음을 전할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                              </swiper>
                              <div class="template-richcard-carousel-prev">Prev</div>
                              <div class="template-richcard-carousel-next">Next</div>
                            </div>
                            <!-- 7) 슬라이드형(Medium,5장)-->
                            <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CCwMhM0500'">
                              <swiper :slides-per-view="1" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_1.57fe365c.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">믿고 보내는 메시지 &lt;채팅+&gt;</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 10px">
                                    <p class="text">고객님, 안녕하세요. 확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘기며 새로운 기능을 알아보세요.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_2.a00c0d4e.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">1.’메시지 읽음확인’ 기능</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 10px">
                                    <p class="text">파란 말풍선 옆에 숫자 "1"이 나타나도 놀라지 마세요. 이제 문자메시지도 상대방이 읽었는지 확인할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_3.5a9791bb.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">2.데이터 차감 없이 사진/ 동영상 보내기</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 10px">
                                    <p class="text">데이터 걱정 없이 사진과 동영상을 공유해보세요. 파일당 최대 5MB까지 데이터 차감없이 보낼 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_4.e6145ea4.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">3.마음을 전하는 ‘선물하기’</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 10px">
                                    <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘선물’을 눌러보세요. 커피,영화티켓,상품권 등 고마운 사람에게 마음을 전할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_5.8716e1b1.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">4.채팅+라서 더 믿음직한 ‘송금하기’</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 10px">
                                    <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘토스로 송금’ 또는 ‘핀크로 송금’을 눌러보세요. 버튼 하나로 간편하게 송금 할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                              </swiper>
                              <div class="template-richcard-carousel-prev">Prev</div>
                              <div class="template-richcard-carousel-next">Next</div>
                            </div>
                            <!-- 8) 슬라이드형(Medium,6장)-->
                            <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CCwMhM0600'">
                              <swiper :slides-per-view="1" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_1.57fe365c.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">믿고 보내는 메시지 &lt;채팅+&gt;</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 10px">
                                    <p class="text">고객님, 안녕하세요. 확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘기며 새로운 기능을 알아보세요.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_2.a00c0d4e.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">1.’메시지 읽음확인’ 기능</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 10px">
                                    <p class="text">파란 말풍선 옆에 숫자 "1"이 나타나도 놀라지 마세요. 이제 문자메시지도 상대방이 읽었는지 확인할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_3.5a9791bb.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">2.데이터 차감 없이 사진/ 동영상 보내기</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 10px">
                                    <p class="text">데이터 걱정 없이 사진과 동영상을 공유해보세요. 파일당 최대 5MB까지 데이터 차감없이 보낼 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_4.e6145ea4.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">3.마음을 전하는 ‘선물하기’</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 10px">
                                    <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘선물’을 눌러보세요. 커피,영화티켓,상품권 등 고마운 사람에게 마음을 전할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_5.8716e1b1.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">4.채팅+라서 더 믿음직한 ‘송금하기’</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 10px">
                                    <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘토스로 송금’ 또는 ‘핀크로 송금’을 눌러보세요. 버튼 하나로 간편하게 송금 할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_232x168_5.8716e1b1.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview">
                                    <h4 class="title">5.비즈메시지 기능</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 10px">
                                    <p class="text">기업용 메시지도 더 풍성하게 이미지를 구성할 수 있습니다. 채팅+로 보다 몰입도 높은 메시지를 받아보세요.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </swiper-slide>
                              </swiper>
                              <div class="template-richcard-carousel-prev">Prev</div>
                              <div class="template-richcard-carousel-next">Next</div>
                            </div>
                            <!-- 9) 슬라이드형(Small,2장) -->
                            <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CCwShS0200'">
                              <swiper :width="194" :slides-per-view="1.6" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_2.aa7cb5ac.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style=" height: auto; max-height: 100px;">1.메시지 읽음확인</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                              </swiper>
                              <div class="template-richcard-carousel-prev">Prev</div>
                              <div class="template-richcard-carousel-next" style="">Next</div>
                            </div>
                            <!-- 10) 슬라이드형(Small,3장) -->
                            <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CCwShS0300'">
                              <swiper :width="194" :slides-per-view="1.6" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_2.aa7cb5ac.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto;max-height: 100px;">1.메시지 읽음확인</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_3.e23b6139.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style=" height: auto; max-height: 100px;">2.데이터무료 적용</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                              </swiper>
                              <div class="template-richcard-carousel-prev">Prev</div>
                              <div class="template-richcard-carousel-next" style="">Next</div>
                            </div>
                            <!-- 11) 슬라이드형(Small,4장) -->
                            <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CCwShS0400'">
                              <swiper :width="194" :slides-per-view="1.6" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style=" height: auto; max-height: 100px ">채팅+ 기능소개</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_2.aa7cb5ac.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto; max-height: 100px;">1.메시지 읽음확인</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_3.e23b6139.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto; max-height: 100px;">2.데이터무료 적용</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_4.a0080b97.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto; max-height: 100px;">3.선물하기</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">
                                      메시지 작성 하단 ‘+’버튼을 누르고 ‘선물’을 눌러보세요. 고마운 사람에게 마음을 전할 수 있어요.
                                    </p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                              </swiper>
                              <div class="template-richcard-carousel-prev">Prev</div>
                              <div class="template-richcard-carousel-next" style="">Next</div>
                            </div>
                            <!-- 12) 슬라이드형(Small,5장) -->
                            <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CCwShS0500'">
                              <swiper :width="194" :slides-per-view="1.6" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto;max-height: 100px;">채팅+ 기능소개</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_2.aa7cb5ac.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto; max-height: 100px;">1.메시지 읽음확인</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_3.e23b6139.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style=" height: auto; max-height: 100px;">2.데이터무료 적용</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_4.a0080b97.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto; max-height: 100px;">3.선물하기</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘선물’을 눌러보세요. 고마운 사람에게 마음을 전할 수 있어요.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_5.8e12c531.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto; max-height: 100px;">4.송금하기</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 토스/핀크 송금을 눌러보세요. 버튼 하나로 간편한 송금이 가능합니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                              </swiper>
                              <div class="template-richcard-carousel-prev">Prev</div>
                              <div class="template-richcard-carousel-next" style="">Next</div>
                            </div>
                            <!-- 13) 슬라이드형(Small,6장) -->
                            <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CCwShS0600'">
                              <swiper :width="194" :slides-per-view="1.6" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_2.aa7cb5ac.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto; max-height: 100px;">1.메시지 읽음확인</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_3.e23b6139.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto; max-height: 100px;">2.데이터무료 적용</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">한 개의 메시지당  최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_4.a0080b97.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto; max-height: 100px;">3.선물하기</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘선물’을 눌러보세요. 고마운 사람에게 마음을 전할 수 있어요.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_5.8e12c531.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto; max-height: 100px;">4.송금하기</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 토스/핀크 송금을 눌러보세요. 버튼 하나로 간편한 송금이 가능합니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                                <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/MMS_Medium_120x112_6.a337aabf.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                    <h4 class="title" style="height: auto; max-height: 100px;">5.비즈메시지 기능</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                    <p class="text">기업용 메시지도 더 풍성하게 이미지를 구성할 수 있습니다. 보다 몰입도 높은 메시지를 받아보세요.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">더보기</span>
                                  </div>
                                </swiper-slide>
                              </swiper>
                              <div class="template-richcard-carousel-prev">Prev</div>
                              <div class="template-richcard-carousel-next">Next</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="title_wrap mar_b20">
                    <h4 class="h4_title bold">{{ toUppsercaseAfterWhtespace(selectedTemplate.cardTypeNm) }} /
                      {{ selectedTemplate.cardCnt }}장</h4>
                  </div>
                </div>
              </div>
              <!-- 슬라이드 방식(grid) 보기 - 에뮬 -->
              <div class="view_grid_wrap" v-show="showType === 'grid'">
                <swiper :slides-per-view="4" :space-between="10" :slidesPerGroup="4" :loop="false" :pagination="{ clickable:true }" :navigation="NavigationOptions" :observer="true" :observeParents="true" :watchOverflow="true" @swiper="onSwiper">
                  <!-- 1) 기본말풍선 -->
                  <swiper-slide class="item" v-if="showTlpList.SCS00000.show">
                    <div class="preview_template new" @click="selectTemplateId('SCS00000')">
                      <label>
                        <input type="radio" name="templatepicker" value="SCS00000" :checked="selectedTplId === 'SCS00000'" />
                        <div class="emulator_area">
                          <div class="emulator_cont">
                            <div>
                              <div cardtype="D">
                                <div class="template-richcard-general baloon">
                                  <div class="template-richcard-textview-origin" cardtype="">
                                    <p class="text colorgray">안녕하세요, RBC에 가입하신 것을 환영합니다. RBC기능이나 RCS에 대해 궁금한 사항이 있으신 경우 질문을 남겨주세요.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.SCS00000.productCdNm ? showTlpList.SCS00000.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.SCS00000.tplNm }}</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- 2)텍스트카드 -->
                  <swiper-slide class="item" v-if="showTlpList.SCL00000.show">
                    <div class="preview_template new" @click="selectTemplateId('SCL00000')">
                      <label>
                        <input type="radio" name="templatepicker" value="SCL00000" :checked="selectedTplId === 'SCL00000'" />
                        <div class="emulator_area">
                          <div class="emulator_cont">
                            <div>
                              <div cardtype="D">
                                <div class="template-richcard-general">
                                  <div class="template-richcard-titleview" cardtype="">
                                    <h4 class="title">RBC에서 주문이 완료되었습니다.</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" cardtype="">
                                    <p class="text">
                                      - 상품명 : 양수냄비<br/>
                                      - 주문번호 : 2020-11-30-******<br/>
                                      - 결제금액 : 23,200원(카드)<br/>
                                      - 더블 후기 적립금<br/>
                                      - 배송지 : 서울시 마포구 가양대로 1<br/><br/>
                                      ※ 반품 기준은 당사 약관/홈페이지 내 상품 설치상품은 사용 후 반품이 불가하므로 이점 유의하시기 바랍니다.
                                    </p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.SCL00000.productCdNm ? showTlpList.SCL00000.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.SCL00000.tplNm }}</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- 3) 세로형(Tall) -->
                  <swiper-slide class="item" v-if="showTlpList.SCwThT00.show">
                    <div class="preview_template new" @click="selectTemplateId('SCwThT00')">
                      <label>
                        <input type="radio" name="templatepicker" value="SCwThT00" :checked="selectedTplId === 'SCwThT00'"/>
                        <div class="emulator_area">
                          <div class="emulator_cont">
                            <div>
                              <div cardtype="D">
                                <div class="template-richcard-general">
                                  <div class="template-richcard-mediaview" csstype="lms">
                                    <img src="@/assets/images/comtpl/MMS_Tall_244x227.6da41395.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" cardtype="SM">
                                    <h4 class="title">RBC샵 다이렉트 배송 안내</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" cardtype="SM">
                                    <p class="text">구매하신 제품이 원하시는 장소로 금일 발송되었습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.SCwThT00.productCdNm ? showTlpList.SCwThT00.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.SCwThT00.tplNm }}</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- 4) 세로형(Medium) -->
                  <swiper-slide class="item" v-if="showTlpList.SCwThM00.show">
                    <div class="preview_template new" @click="selectTemplateId('SCwThM00')">
                      <label>
                        <input type="radio" name="templatepicker" value="SCwThM00" :checked="selectedTplId === 'SCwThM00'"/>
                        <div class="emulator_area">
                          <div class="emulator_cont">
                            <div>
                              <div cardtype="D">
                                <div class="template-richcard-general">
                                  <div class="template-richcard-mediaview" csstype="lms">
                                    <img src="@/assets/images/comtpl/MMS_Medium_244x144.81c75bb7.png" alt=""/>
                                  </div>
                                  <div class="template-richcard-titleview" cardtype="SM">
                                    <h4 class="title">RBC샵 다이렉트 배송 안내</h4>
                                  </div>
                                  <div class="template-richcard-descriptionview" cardtype="SM">
                                    <p class="text">구매하신 제품이 원하시는 장소로 금일 발송되었습니다.</p>
                                  </div>
                                  <div class="template-richcard-button">
                                    <span class="btn">자세히 보러가기</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.SCwThM00.productCdNm ? showTlpList.SCwThM00.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.SCwThM00.tplNm }}</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- 5) 슬라이드형(Medium 2장) -->
                  <swiper-slide class="item" v-if="showTlpList.CCwMhM0200.show">
                    <div class="preview_template new" @click="selectTemplateId('CCwMhM0200')">
                      <label>
                        <input type="radio" name="templatepicker" value="CCwMhM0200" :checked="selectedTplId === 'CCwMhM0200'"/>
                        <div class="emulator_area">
                          <div class="emulator_cont">
                            <div>
                              <div cardtype="D">
                                <div class="template-richcard-carousel01">
                                  <swiper :width="194" :slides-per-view="1" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_1.57fe365c.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">믿고 보내는 메시지 &lt;채팅+&gt;</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview">
                                        <p class="text">고객님, 안녕하세요. 확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘기며 새로운 기능을 알아보세요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_2.a00c0d4e.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">1.’메시지 읽음확인’ 기능</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview">
                                        <p class="text">파란 말풍선 옆에 숫자 "1"이 나타나도 놀라지 마세요. 이제 문자메시지도 상대방이 읽었는지 확인할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                  </swiper>
                                  <div class="template-richcard-carousel-prev">Prev</div>
                                  <div class="template-richcard-carousel-next">Next</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwMhM0200.productCdNm ? showTlpList.CCwMhM0200.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwMhM0200.tplNm }}</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- 6) 슬라이드형(Medium 3장) -->
                  <swiper-slide class="item" v-if="showTlpList.CCwMhM0300.show">
                    <div class="preview_template new" @click="selectTemplateId('CCwMhM0300')">
                      <label>
                        <input type="radio" name="templatepicker" value="CCwMhM0300" :checked="selectedTplId === 'CCwMhM0300'"/>
                        <div class="emulator_area">
                          <div class="emulator_cont">
                            <div>
                              <div cardtype="D">
                                <div class="template-richcard-carousel01">
                                  <swiper :width="194" :slides-per-view="1" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_1.57fe365c.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">믿고 보내는 메시지 &lt;채팅+&gt;</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview">
                                        <p class="text">고객님, 안녕하세요. 확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘기며 새로운 기능을 알아보세요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_2.a00c0d4e.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">1.’메시지 읽음확인’ 기능</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview">
                                        <p class="text">파란 말풍선 옆에 숫자 "1"이 나타나도 놀라지 마세요. 이제 문자메시지도 상대방이 읽었는지 확인할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_3.5a9791bb.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">2.데이터 차감 없이 사진/ 동영상 보내기</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview">
                                        <p class="text">데이터 걱정 없이 사진과 동영상을 공유해보세요. 파일당 최대 5MB까지 데이터 차감없이 보낼 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                  </swiper>
                                  <div class="template-richcard-carousel-prev">Prev</div>
                                  <div class="template-richcard-carousel-next">Next</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwMhM0300.productCdNm ? showTlpList.CCwMhM0300.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwMhM0300.tplNm }}</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- 7) 슬라이드형(Medium 4장) -->
                  <swiper-slide class="item" v-if="showTlpList.CCwMhM0400.show">
                    <div class="preview_template new" @click="selectTemplateId('CCwMhM0400')">
                      <label>
                        <input type="radio" name="templatepicker" value="CCwMhM0400" :checked="selectedTplId === 'CCwMhM0400'"/>
                        <div class="emulator_area">
                          <div class="emulator_cont">
                            <div>
                              <div cardtype="D">
                                <div class="template-richcard-carousel01">
                                  <swiper :width="194" :slides-per-view="1" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_1.57fe365c.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">믿고 보내는 메시지 &lt;채팅+&gt;</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview">
                                        <p class="text">고객님, 안녕하세요. 확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘기며 새로운 기능을 알아보세요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_2.a00c0d4e.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">1.’메시지 읽음확인’ 기능</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview">
                                        <p class="text">파란 말풍선 옆에 숫자 "1"이 나타나도 놀라지 마세요. 이제 문자메시지도 상대방이 읽었는지 확인할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_3.5a9791bb.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">2.데이터 차감 없이 사진/ 동영상 보내기</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview">
                                        <p class="text">데이터 걱정 없이 사진과 동영상을 공유해보세요. 파일당 최대 5MB까지 데이터 차감없이 보낼 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_4.e6145ea4.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">3.마음을 전하는 ‘선물하기’</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview">
                                        <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘선물’을 눌러보세요. 커피,영화티켓,상품권 등 고마운 사람에게 마음을 전할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                  </swiper>
                                  <div class="template-richcard-carousel-prev">Prev</div>
                                  <div class="template-richcard-carousel-next">Next</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwMhM0400.productCdNm ? showTlpList.CCwMhM0400.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwMhM0400.tplNm }}</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- 8) 슬라이드형(Medium 5장) -->
                  <swiper-slide class="item" v-if="showTlpList.CCwMhM0500.show">
                    <div class="preview_template new" @click="selectTemplateId('CCwMhM0500')">
                      <label>
                        <input type="radio" name="templatepicker" value="CCwMhM0500" :checked="selectedTplId === 'CCwMhM0500'"/>
                        <div class="emulator_area">
                          <div class="emulator_cont">
                            <div>
                              <div cardtype="D">
                                <div class="template-richcard-carousel01">
                                  <swiper :width="194" :slides-per-view="1" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_1.57fe365c.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">믿고 보내는 메시지 &lt;채팅+&gt;</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 10px">
                                        <p class="text">고객님, 안녕하세요. 확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘기며 새로운 기능을 알아보세요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_2.a00c0d4e.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">1.’메시지 읽음확인’ 기능</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 10px">
                                        <p class="text">파란 말풍선 옆에 숫자 "1"이 나타나도 놀라지 마세요. 이제 문자메시지도 상대방이 읽었는지 확인할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_3.5a9791bb.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">2.데이터 차감 없이 사진/ 동영상 보내기</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 10px">
                                        <p class="text">데이터 걱정 없이 사진과 동영상을 공유해보세요. 파일당 최대 5MB까지 데이터 차감없이 보낼 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_4.e6145ea4.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">3.마음을 전하는 ‘선물하기’</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 10px">
                                        <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘선물’을 눌러보세요. 커피,영화티켓,상품권 등 고마운 사람에게 마음을 전할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_5.8716e1b1.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">4.채팅+라서 더 믿음직한 ‘송금하기’</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 10px">
                                        <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘토스로 송금’ 또는 ‘핀크로 송금’을 눌러보세요. 버튼 하나로 간편하게 송금 할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                  </swiper>
                                  <div class="template-richcard-carousel-prev">Prev</div>
                                  <div class="template-richcard-carousel-next">Next</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwMhM0500.productCdNm ? showTlpList.CCwMhM0500.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwMhM0500.tplNm }}</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- 9) 슬라이드형(Medium 6장) -->
                  <swiper-slide class="item" v-if="showTlpList.CCwMhM0600.show">
                    <div class="preview_template new" @click="selectTemplateId('CCwMhM0600')">
                      <label>
                        <input type="radio" name="templatepicker" value="CCwMhM0600" :checked="selectedTplId === 'CCwMhM0600'"/>
                        <div class="emulator_area">
                          <div class="emulator_cont">
                            <div>
                              <div cardtype="D">
                                <div class="template-richcard-carousel01">
                                  <swiper :width="194" :slides-per-view="1" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_1.57fe365c.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">믿고 보내는 메시지 &lt;채팅+&gt;</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 10px">
                                        <p class="text">고객님, 안녕하세요. 확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘기며 새로운 기능을 알아보세요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_2.a00c0d4e.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">1.’메시지 읽음확인’ 기능</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 10px">
                                        <p class="text">파란 말풍선 옆에 숫자 "1"이 나타나도 놀라지 마세요. 이제 문자메시지도 상대방이 읽었는지 확인할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_3.5a9791bb.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">2.데이터 차감 없이 사진/ 동영상 보내기</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 10px">
                                        <p class="text">데이터 걱정 없이 사진과 동영상을 공유해보세요. 파일당 최대 5MB까지 데이터 차감없이 보낼 수 있습니다..</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_4.e6145ea4.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">3.마음을 전하는 ‘선물하기’</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 10px">
                                        <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘선물’을 눌러보세요. 커피,영화티켓,상품권 등 고마운 사람에게 마음을 전할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_5.8716e1b1.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">4.채팅+라서 더 믿음직한 ‘송금하기’</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 10px">
                                        <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘토스로 송금’ 또는 ‘핀크로 송금’을 눌러보세요. 버튼 하나로 간편하게 송금 할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-slide">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_232x168_5.8716e1b1.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview">
                                        <h4 class="title">5.비즈메시지 기능</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 10px">
                                        <p class="text">기업용 메시지도 더 풍성하게 이미지를 구성할 수 있습니다. 채팅+로 보다 몰입도 높은 메시지를 받아보세요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">자세히 보러가기</span>
                                      </div>
                                    </swiper-slide>
                                  </swiper>
                                  <div class="template-richcard-carousel-prev">Prev</div>
                                  <div class="template-richcard-carousel-next">Next</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwMhM0600.productCdNm ? showTlpList.CCwMhM0600.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwMhM0600.tplNm }}</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- 10) 슬라이드형(Small 2장) -->
                  <swiper-slide class="item" v-if="showTlpList.CCwShS0200.show">
                    <div class="preview_template new" @click="selectTemplateId('CCwShS0200')">
                      <label>
                        <input type="radio" name="templatepicker" value="CCwShS0200" :checked="selectedTplId === 'CCwShS0200'"/>
                        <div class="emulator_area">
                          <div class="emulator_cont">
                            <div>
                              <div cardtype="D">
                                <div class="template-richcard-carousel02">
                                  <swiper :slides-per-view="1.6" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_2.aa7cb5ac.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style=" height: auto; max-height: 100px;">1.메시지 읽음확인</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                  </swiper>
                                  <div class="template-richcard-carousel-prev">Prev</div>
                                  <div class="template-richcard-carousel-next" style="">Next</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwShS0200.productCdNm ? showTlpList.CCwShS0200.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwShS0200.tplNm }}</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- 11) 슬라이드형(Small 3장) -->
                  <swiper-slide class="item" v-if="showTlpList.CCwShS0300.show">
                    <div class="preview_template new" @click="selectTemplateId('CCwShS0300')">
                      <label>
                        <input type="radio" name="templatepicker" value="CCwShS0300" :checked="selectedTplId === 'CCwShS0300'"/>
                        <div class="emulator_area">
                          <div class="emulator_cont">
                            <div>
                              <div cardtype="D">
                                <div class="template-richcard-carousel02">
                                  <swiper :slides-per-view="1.6" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_2.aa7cb5ac.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto;max-height: 100px;">1.메시지 읽음확인</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_3.e23b6139.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style=" height: auto; max-height: 100px;">2.데이터무료 적용</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                  </swiper>
                                  <div class="template-richcard-carousel-prev">Prev</div>
                                  <div class="template-richcard-carousel-next" style="">Next</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwShS0300.productCdNm ? showTlpList.CCwShS0300.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwShS0300.tplNm }}</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- 12) 슬라이드형(Small 4장) -->
                  <swiper-slide class="item" v-if="showTlpList.CCwShS0400.show">
                    <div class="preview_template new" @click="selectTemplateId('CCwShS0400')">
                      <label>
                        <input type="radio" name="templatepicker" value="CCwShS0400" :checked="selectedTplId === 'CCwShS0400'"/>
                        <div class="emulator_area">
                          <div class="emulator_cont">
                            <div>
                              <div cardtype="D">
                                <div class="template-richcard-carousel02">
                                  <swiper :slides-per-view="1.6" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style=" height: auto; max-height: 100px ">채팅+ 기능소개</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_2.aa7cb5ac.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto; max-height: 100px;">1.메시지 읽음확인</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_3.e23b6139.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto; max-height: 100px;">2.데이터무료 적용</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_4.a0080b97.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto; max-height: 100px;">3.선물하기</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘선물’을 눌러보세요. 고마운 사람에게 마음을 전할 수 있어요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                  </swiper>
                                  <div class="template-richcard-carousel-prev">Prev</div>
                                  <div class="template-richcard-carousel-next" style="">Next</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwShS0400.productCdNm ? showTlpList.CCwShS0400.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwShS0400.tplNm }}</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- 13) 슬라이드형(Small 5장) -->
                  <swiper-slide class="item" v-if="showTlpList.CCwShS0500.show">
                    <div class="preview_template new" @click="selectTemplateId('CCwShS0500')">
                      <label>
                        <input type="radio" name="templatepicker" value="CCwShS0500" :checked="selectedTplId === 'CCwShS0500'"/>
                        <div class="emulator_area">
                          <div class="emulator_cont">
                            <div>
                              <div cardtype="D">
                                <div class="template-richcard-carousel02">
                                  <swiper :slides-per-view="1.6" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto;max-height: 100px;">채팅+ 기능소개</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_2.aa7cb5ac.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto; max-height: 100px;">1.메시지 읽음확인</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_3.e23b6139.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style=" height: auto; max-height: 100px;">2.데이터무료 적용</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_4.a0080b97.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto; max-height: 100px;">3.선물하기</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘선물’을 눌러보세요. 고마운 사람에게 마음을 전할 수 있어요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_5.8e12c531.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto; max-height: 100px;">4.송금하기</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 토스/핀크 송금을 눌러보세요. 버튼 하나로 간편한 송금이 가능합니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                  </swiper>
                                  <div class="template-richcard-carousel-prev">Prev</div>
                                  <div class="template-richcard-carousel-next" style="">Next</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwShS0500.productCdNm ? showTlpList.CCwShS0500.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwShS0500.tplNm }}</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- 14) 슬라이드형(Small 6장) -->
                  <swiper-slide class="item" v-if="showTlpList.CCwShS0600.show">
                    <div class="preview_template new" @click="selectTemplateId('CCwShS0600')">
                      <label>
                        <input type="radio" name="templatepicker" value="CCwShS0600" :checked="selectedTplId === 'CCwShS0600'"/>
                        <div class="emulator_area">
                          <div class="emulator_cont">
                            <div>
                              <div cardtype="D">
                                <div class="template-richcard-carousel02">
                                  <swiper :slides-per-view="1.6" :space-between="3" :loop="false" :pagination="false" :navigation="true" :observer="true" :observeParents="true" class="template-richcard-carousel swiper-wrapper">
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_2.aa7cb5ac.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto; max-height: 100px;">1.메시지 읽음확인</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_3.e23b6139.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto; max-height: 100px;">2.데이터무료 적용</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_4.a0080b97.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto; max-height: 100px;">3.선물하기</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 ‘선물’을 눌러보세요. 고마운 사람에게 마음을 전할 수 있어요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_5.8e12c531.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto; max-height: 100px;">4.송금하기</h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">메시지 작성 하단 ‘+’버튼을 누르고 토스/핀크 송금을 눌러보세요. 버튼 하나로 간편한 송금이 가능합니다.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                    <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                      <div class="template-richcard-mediaview">
                                        <img src="@/assets/images/comtpl/MMS_Medium_120x112_6.a337aabf.png" alt=""/>
                                      </div>
                                      <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                        <h4 class="title" style="height: auto; max-height: 100px;">5. 비즈메시지 기능<br/><br/>
                                        </h4>
                                      </div>
                                      <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                        <p class="text">기업용 메시지도 더 풍성하게 이미지를 구성할 수 있습니다. 보다 몰입도 높은 메시지를 받아보세요.</p>
                                      </div>
                                      <div class="template-richcard-button">
                                        <span class="btn">더보기</span>
                                      </div>
                                    </swiper-slide>
                                  </swiper>
                                  <div class="template-richcard-carousel-prev">Prev</div>
                                  <div class="template-richcard-carousel-next">Next</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwShS0600.productCdNm ? showTlpList.CCwShS0600.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwShS0600.tplNm }}</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
                <div class="view_grid_button view_grid_button_prev"></div>
                <div class="view_grid_button view_grid_button_next"></div>
              </div>
            </div>
          </div>
          <div class="autoreply-template_bot">
            <a href="javascript:void(0)" class="btn sml bd_black" @click="close"><span>취소</span></a>
            <a href="javascript:void(0)" class="btn sml black" @click="confirm"><span>확인</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Navigation, Pagination } from 'swiper'
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'
import Pagination2 from '@/components/Pagination'
import { retrieveCommonTemplate } from '@/api/service/service'
import { retrieveCommonCode } from '@/api/common/code'
import { retireveTemplateList } from '@/api/service/autoReply'

// Import Swiper styles
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination])

export default {
  name: 'AutoReplyTemplatePopup',
  components: {
    Swiper,
    SwiperSlide,
    Pagination2
  },
  props: {
    brandId: { type: String },
    tplId: { type: String },
    visible: { type: Boolean }
  },
  data() {
    return {
      isLoad: false, // 팝업 로딩 완료 여부
      totalcount: 0, // 전체 카운트
      formData: { size: 10, page: 1 },
      searchParam: { product: 'C', cardType: '' },
      showType: 'list', // 보기 방식(list / grid)
      originList: [],
      newList: [],
      list: [],
      cardTypeList: [], // 카드 타입목록
      selectedSwiper: {},
      NavigationOptions: { // 슬라이드 방식(grid) 일 경우, 좌, 우버튼 옵션
        nextEl: '.view_grid_button_next',
        prevEl: '.view_grid_button_prev'
      },
      templateList: null, // 자동응답 메시지 템플릿 정보
      showTlpList: {},
      selectedTemplate: {}, // 선택된 템플릿 정보
      selectedTplId: '' // 선택된 템플릿 ID
    }
  },
  watch: {
    'searchParam.cardType'() {
      this.getCardType()
      this.searchData()
    }
  },
  created() {
    this.isLoad = false
    this.init()
  },
  methods: {
    async init() {
      // 1. 자동응답 메시지에 사용가능한 템플릿 목록 가져오기
      let params = { brandId: 'common', cardSpec: 'richcard', productCd: 'C', status: 'ACTIVE', aprvRet: 'OK', orderKey: 'MAX_CARD_CNT,MAX_MEDIA_SIZE' }
      let res = await retireveTemplateList(this.brandId, params)
      if (res.code === '20000000') {
        this.templateList = res.result
        for (let i = 0; i < res.result.length; i++) {
          let item = res.result[i]
          this.showTlpList[item.tplId] = { show: true }
        }
        this.retreiveData()
        this.getCardType()
      }
    },
    // 자동응답 메시지에서 사용 가능한 템플릿 코드 set
    getCardType() {
      retrieveCommonCode('TPL_CARD_TYPE').then(res => {
        let autoreplyCardTypeCode = ['SAS', 'SAL', 'SM', 'CR', 'CS'] // Standalone Sms, StandAlone Lms, Standalone Media Top, Carousel Medium, Carousel Small
        this.cardTypeList = res.result.filter(opt => autoreplyCardTypeCode.includes(opt.code))
      })
    },
    onSwiper(swiper) {
      this.selectedSwiper = swiper
    },
    /** 보기 방식 변경 */
    toggleShowType(type) {
      this.showType = type
    },
    retreiveData() {
      // 1. 전체 공통템플릿 목록 가져오기
      retrieveCommonTemplate(this.formData).then(res => {
        if (res.result !== undefined) {
          res.result.tplPopList.reverse()
        }
        this.originList = res.result.tplPopList // 원본 데이터 저장

        // 2. showTlpList 에 있는 순서대로 정렬 후 originList를 덮어씀.
        for (let key in this.showTlpList) {
          if (this.showTlpList[key].show) {
            let findObj = this.originList.find(o => o.tplId === key)
            if (findObj) this.newList.push(findObj)
          }
        }
        let deepCopy = JSON.parse(JSON.stringify(this.newList))
        this.originList = deepCopy

        let searchList = this.searchParam.product !== '' ? this.originList.filter(opt => opt.productCd === this.searchParam.product) : this.originList
        let showTlpListKey = Object.keys(this.showTlpList)

        for (let i = 0; i < showTlpListKey.length; i++) {
          this.showTlpList[showTlpListKey[i]].show = false
          searchList.forEach(element => {
            if (element.tplId === showTlpListKey[i]) {
              this.showTlpList[showTlpListKey[i]] = element
              this.showTlpList[showTlpListKey[i]].show = true
            }
          })
        }
        // 사용자가 선택한 자동응답메시지가 있다면..
        if (!jglib.isEmpty(this.tplId)) {
          let template = searchList.find(x => x.tplId === this.tplId)
          let index = searchList.indexOf(template)
          if (index >= 10) {
            let page = Math.floor(parseInt(index) / 10) + 1
            this.formData.page = page // 페이지 값을 재설정
          }
          this.selectedTemplate = template
          this.selectedTplId = this.tplId
        } else {
          this.selectedTemplate = this.list[0]
        }

        let page = this.formData.page
        let itemsPerPage = this.formData.size
        let totalItems = searchList.length // res.result.totalSize

        let start = (page - 1) * itemsPerPage
        let end = res.result.totalSize

        if (itemsPerPage < totalItems) {
          end = itemsPerPage * page
          if (end > totalItems) end = totalItems
        }
        this.list = searchList.slice(start, end)
        this.totalcount = totalItems

        this.isLoad = true
      }).catch(err => {
        this.$alertMsg(err.desc)
      })
    },
    searchData() {
      let searchList = this.searchParam.product !== '' ? this.originList.filter(opt => opt.productCd === this.searchParam.product) : this.originList
      searchList = this.searchParam.cardType !== '' ? searchList.filter(opt => opt.cardType === this.searchParam.cardType) : searchList

      let showTlpListKey = Object.keys(this.showTlpList)

      for (let i = 0; i < showTlpListKey.length; i++) {
        this.showTlpList[showTlpListKey[i]].show = false
        searchList.forEach(element => {
          if (element.tplId === showTlpListKey[i]) {
            this.showTlpList[showTlpListKey[i]] = element
            this.showTlpList[showTlpListKey[i]].show = true
          }
        })
      }

      if (searchList.length <= this.formData.size) {
        this.formData.page = 1
      }

      let itemsPerPage = this.formData.size
      let page = this.formData.page
      let totalItems = searchList.length

      let start = (page - 1) * itemsPerPage
      let end = searchList.length
      if (itemsPerPage < totalItems) {
        end = itemsPerPage * page
        if (end > totalItems) {
          end = totalItems
        }
      }
      this.list = searchList.slice(start, end)
      this.totalcount = totalItems

      if (this.list.length !== 0) {
        this.selectedTemplate = this.list[0]
      }
      this.selectedSwiper.slideTo(0, 500)
    },
    /** 템플릿 선텍: list 모드 */
    selectTemplate(row) {
      this.selectedTemplate = row
      this.selectedTplId = row.tplId
    },
    /** 템플릿 선택: grid 모드 */
    selectTemplateId(tplId) {
      this.selectedTplId = tplId
      let template = this.templateList.find(x => x.tplId === tplId)
      this.selectedTemplate = template
    },
    /** 페이지 변경 */
    changePage(page) {
      this.formData.page = page
      this.searchData()
    },
    toUppsercaseAfterWhtespace(str) {
      if (str) {
        return jglib.toUppsercaseAfterWhtespace(str)
      }
      return null
    },
    /** 템플릿 선택 */
    confirm() {
      if (jglib.isEmpty(this.selectedTplId)) this.$alertMsg('템플릿이 선택되지 않았습니다.')
      else {
        let template = this.templateList.find(x => x.tplId === this.selectedTplId)
        this.$emit('templateInfo', template)
        this.$emit('update:visible', false)
      }
    },
    /** 팝업 닫기 */
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
