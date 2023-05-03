<template>
  <div class="rcs_container service_wrap text-left">
    <div class="layer auto active">
      <div class="layer_cont common_tpl add_grid" style="background-color: #fff; z-index:1000; height:660px" v-show="show_loading">
        <div class="layer_body">
          <div class="rcs_bundle_wrap rcs_bundle_wid">
          </div>
        </div>
      </div>
      <div class="layer_cont common_tpl add_grid">
        <div class="layer_body">
          <div class="rcs_bundle_wrap rcs_bundle_wid">
            <div class="rcs_emul_form_wrap" style="margin-left: 0;">
              <div class="title_wrap mar_b20">
                <span class="h4_title bold">공통 템플릿</span>
                <span class="h4_desc bold">- 사전 등록 및 승인 없이 모든 브랜드에서 공통으로 사용 가능</span>
              </div>
              <div class="cont_flex_bundle mar_b20">
                <div class="total_area">
                  <span class="total_count">
                    총 <strong class="count">{{ totalcount }}</strong> 건
                  </span>
                </div>
                <div class="select_area">
                  <span class="custom_select mid col_3">
                    <select v-model="searchParam.product">
                      <option value>상품전체</option>
                      <option v-for="item in productList" :value="item.code" :key="item.code">{{ item.codeNm.toUpperCase() }}</option>
                    </select>
                  </span>
                  <span class="custom_select mid col_3">
                    <select v-model="searchParam.cardType">
                      <option value>카드타입 전체</option>
                      <option v-for="item in cardTypeList" :value="item.code" :key="item.code">{{ toUppsercaseAfterWhtespace(item.codeNmAlt1 ? item.codeNmAlt1 : item.codeNm) }}</option>
                    </select>
                  </span>
                </div>
                <div class="toggle_area">
                  <template v-if="totalcount > 0">
                    <button type="button" @click="show_grid = true; show_list = false" class="grid_view" :class="{ active: show_grid }"></button>
                    <button type="button" @click="show_grid = false; show_list = true" class="list_view" :class="{ active: show_list }"></button>
                  </template>
                  <template v-else>
                    <button type="button" @click="show_grid = true; show_list = false" class="grid_view" :class="{ active: show_grid }"
                            style="pointer-events:none;"></button>
                    <button type="button" @click="show_grid = false; show_list = true" class="list_view" :class="{ active: show_list }"
                            style="pointer-events:none;"></button>
                  </template>
                </div>
              </div>
              <div class="view_list_wrap" v-show="show_list">
                <table v-if="showType === 'list'" class="tbl_col_type">
                  <caption>
                    <strong>공통템플릿 정보 팝업</strong>
                    <p>템플릿 ID, 템플릿 명, 상품코드, 타입, 카드장수</p>
                  </caption>
                  <colgroup>
                    <col style="width:150px">
                    <col style="width:90px">
                    <col style="width:230px;">
                    <col style="width:240px">
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">포멧 ID</th>
                      <th scope="col">상품
                        <div class="btn_align" @click="onSortProductCd()">
                          <button class="btn_align_top" type="button"></button>
                          <button class="btn_align_bottom" type="button"></button>
                        </div>
                      </th>
                      <th scope="col">카드 타입
                        <div class="btn_align" @click="onSortCardType()">
                          <button class="btn_align_top" type="button"></button>
                          <button class="btn_align_bottom" type="button"></button>
                        </div>
                      </th>
                      <th scope="col">상품명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr v-for="(row, index) in list" :key="`row-${index}`" v-if="searchParam.product === row.productCdNm"> -->
                    <tr v-for="(row, index) in list" :key="`row-${index}`">
                      <!-- <span v-if="searchParam.product === row.productCdNm"> -->
                      <td>{{ row.tplId }}</td>
                      <!-- if문 걸어서 상품별, 카드타입별 나오게 수정 해야 함 -->
                      <td>{{ row.productCdNm.toUpperCase() }}</td>
                      <td>{{ toUppsercaseAfterWhtespace(row.cardTypeNm) }}</td>
                      <!-- if문 걸어서 상품별, 카드타입별 나오게 수정 해야 함 -->
                      <td class="left">
                        <a href="javascript:void(0);" class="btn_text" :class="{ icon_new : row.iconnew === 'icon_new'}"
                           @click="selectTemplate(row)">{{ row.tplNm }}</a>
                      </td>
                      <!-- </span> -->
                    </tr>
                  </tbody>
                </table>
                <div v-if="showType === 'image'">이미지로 보기 일때</div>
                <pagination2 :total="totalcount" @change="changePage" :current-page.sync="formData.page" class="paging type2" :pageSize="formData.size"/>
              </div>
              <!-- 슬라이드 방식 보기 - 에뮬 -->
              <div class="view_grid_wrap" v-show="show_grid">
                <swiper
                  :slides-per-view="4"
                  :space-between="10"
                  :slidesPerGroup="4"
                  :loop="false"
                  :pagination="{ clickable:true }"
                  :navigation="NavigationOptions"
                  :observer="true"
                  :observeParents="true"
                  :watchOverflow="true"
                  @swiper="onSwiper">

                  <!-- 이미지 & 타이틀 강조형 (3:4) - 카드 뷰 - 남미라 -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.OMHITV0001.iconnew === 'icon_new'}" v-if="showTlpList.OMHITV0001.show">
                    <div class="preview_template new" style="background-color: #ffffff;">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general">
                                <div class="template-richcard-mediaview">
                                  <img src="@/assets/images/comtpl/emul_emA_imagetitle_34.png" alt=""/>
                                </div>
                                <div class="template-richcard-textview bggray br-btm" cardtype="SM">
                                  <h4 class="title">프리미엄회원 특별혜택!</h4>
                                  <ul class="imagetitle_long">
                                    <li><p><strong>행사기간</strong>7월 한 달간</p></li>
                                    <li><p><strong>참여대상</strong>프리미엄 등급 고객</p></li>
                                    <li><p><strong>제공혜택</strong>5% 추가 적립</p></li>
                                  </ul>
                                  <div class="link">
                                    <a href="javascript:void(0)">자세히 보러가기</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.OMHITV0001.productCdNm ? showTlpList.OMHITV0001.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.OMHITV0001.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>OMHITV0001</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- 이미지 & 타이틀 강조형 (1:1) - 카드 뷰 - 남미라 -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.OMHITS0001.iconnew === 'icon_new'}" v-if="showTlpList.OMHITS0001.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general">
                                <div class="template-richcard-mediaview">
                                  <img src="@/assets/images/comtpl/emul_emA_imagetitle_11.png" alt=""/>
                                </div>
                                <div class="template-richcard-textview bggray br-btm" cardtype="SM">
                                  <h4 class="title">올여름 시원하게 첫 구매 고객<br>무료배송</h4>
                                  <ul class="imagetitle_long">
                                    <li><p><strong>행사기간</strong>8월 한달 간</p></li>
                                    <li><p><strong>참여대상</strong>첫 구매 고객</p></li>
                                    <li><p><strong>제공혜택</strong>무료배송</p></li>
                                  </ul>
                                  <div class="link">
                                    <a href="javascript:void(0)">자세히 보러가기</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.OMHITS0001.productCdNm ? showTlpList.OMHITS0001.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.OMHITS0001.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>OMHITS0001</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- 이미지 강조형 (3:4) - 카드 뷰 - 남미라 -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.OMHIMV0001.iconnew === 'icon_new'}" v-if="showTlpList.OMHIMV0001.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general">
                                <div class="template-richcard-mediaview">
                                  <img src="@/assets/images/comtpl/emul_emA_image_34.png" alt=""/>
                                </div>
                                <div class="template-richcard-textview bggray br-btm" cardtype="SM">
                                  <h4 class="title">2022 한강 불꽃축제 소식</h4>
                                  <p class="imagetitle_square">아름다운 한강에서 화려만 불꽃축제와 함께 잊을 수 없는 추억을 만드세요.</p>
                                  <div class="link">
                                    <a href="javascript:void(0)">자세히 보러가기</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.OMHIMV0001.productCdNm ? showTlpList.OMHIMV0001.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.OMHIMV0001.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>OMHIMV0001</span>
                        </p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- 이미지 강조형 (1:1) - 카드 뷰 - 남미라 -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.OMHIMS0001.iconnew === 'icon_new'}" v-if="showTlpList.OMHIMS0001.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general">
                                <div class="template-richcard-mediaview">
                                  <img src="@/assets/images/comtpl/emul_emA_image_11.png" alt=""/>
                                </div>
                                <div class="template-richcard-textview bggray br-btm" cardtype="SM">
                                  <h4 class="title">국내여행지<br>베스트 10 추천</h4>
                                  <p class="imagetitle_square">제주를 여행한다면 수많은 관광 명소 중 어디를 가야 할지 행복한 고민을 하게 되죠. 어디를 가나 천혜의 경관인 제주도로 지금 떠나요.</p>
                                  <div class="link">
                                    <a href="javascript:void(0)">자세히 보러가기</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.OMHIMS0001.productCdNm ? showTlpList.OMHIMS0001.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.OMHIMS0001.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>OMHIMS0001</span>
                        </p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- 썸네일형 (세로) - 카드 뷰 - 남미라 -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.OMTBNV0001.iconnew === 'icon_new'}" v-if="showTlpList.OMTBNV0001.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general">
                                <div class="template-richcard-mediaview">
                                  <img src="@/assets/images/comtpl/emul_emA_thumnail_vertical.png" alt=""/>
                                </div>
                                <div class="template-richcard-textview bggray br-btm" cardtype="SM">
                                  <h4 class="title">미리 만나는 프리썸머 페스타</h4>
                                  <p class="introduct_A_info">쿨한 여름을 준비하는 아이템을 소개합니다.<br>10종의 다채로운 상품을 지금 만나보세요.</p>
                                  <ul class="introduct_A_list">
                                    <li>
                                      <div class="img">
                                        <img src="@/assets/images/comtpl/emul_emA_thumnail_small_01.png" alt=""/>
                                      </div>
                                      <div class="txt">
                                        <p class="desc">달콤한 컬러의 시원한 미니 손풍기, 달달함은 덤!</p>
                                      </div>
                                    </li>
                                    <li>
                                      <div class="img">
                                        <img src="@/assets/images/comtpl/emul_emA_thumnail_small_02.png" alt=""/>
                                      </div>
                                      <div class="txt">
                                        <p class="desc">쿨링 키보드로 무더운 여름 손가락 끝까지 시원하게</p>
                                      </div>
                                    </li>
                                  </ul>
                                  <div class="link">
                                    <a href="javascript:void(0)">자세히 보러가기</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.OMTBNV0001.productCdNm ? showTlpList.OMTBNV0001.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.OMTBNV0001.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>OMTBNV0001</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- 썸네일형 (가로) - 카드 뷰 - 남미라 -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.OMTBNH0001.iconnew === 'icon_new'}" v-if="showTlpList.OMTBNH0001.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general">
                                <div class="template-richcard-mediaview">
                                  <img src="@/assets/images/comtpl/emul_emA_thumnail_horizontal.png" alt=""/>
                                </div>
                                <div class="template-richcard-textview bggray br-btm" cardtype="SM">
                                  <h4 class="title">요가하는 쏭 선생님</h4>
                                  <p class="introduct_B_info">쏭 선생님과 함께 하체부종 타파 요가 자세. 지금 도전해보세요. 매주 수요일 오후 2시 업데이트!</p>
                                  <ul class="introduct_B_list">
                                    <li><img src="@/assets/images/comtpl/emul_emA_thumnail_small_03.png" alt=""/></li>
                                    <li><img src="@/assets/images/comtpl/emul_emA_thumnail_small_04.png" alt=""/></li>
                                    <li><img src="@/assets/images/comtpl/emul_emA_thumnail_small_05.png" alt=""/></li>
                                  </ul>
                                  <div class="link">
                                    <a href="javascript:void(0)">자세히 보러가기</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.OMTBNH0001.productCdNm ? showTlpList.OMTBNH0001.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.OMTBNH0001.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>OMTBNH0001</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- SNS형 - 카드 뷰 - 남미라 -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.OMSNSS0001.iconnew === 'icon_new'}" v-if="showTlpList.OMSNSS0001.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general">
                                <div class="template-richcard-textview template-snsA bggray" cardtype="SM">
                                  <h4 class="title">멋진 오늘의 건축물<br>역사와 현대가 함께 흐르는 공간</h4>
                                  <p class="imagetitle_square">19세기 말에 지어진 영국 Clerk-enwell에 있는 건물이다. 역사적인 스토리를 그대로 담아 현대식 주택으로 변화시켰다.</p>
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/emul_emA_sns.png" alt=""/>
                                  </div>
                                  <div class="link">
                                    <a href="javascript:void(0)">자세히 보러가기</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.OMSNSS0001.productCdNm ? showTlpList.OMSNSS0001.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.OMSNSS0001.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>OMSNSS0001</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- SNS형 (중간버튼) - 카드 뷰 - 남미라 -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.OMSNSH0001.iconnew === 'icon_new'}" v-if="showTlpList.OMSNSH0001.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general">
                                <div class="template-richcard-textview template-snsB bggray" cardtype="SM">
                                  <h4 class="title">ISSUE 2022<br>스마트폰과 함께하는 시간</h4>
                                  <p class="imagetitle_square">한국인의 하루 평균 스마트폰 사용 시간은, 3시간 48분으로, 20대는 하루 4시간이 넘게 스마트폰을 사용하고 있었습니다.</p>
                                  <div class="link top">
                                    <a href="javascript:void(0)">자세히 보러가기</a>
                                  </div>
                                  <div class="template-richcard-mediaview">
                                    <img src="@/assets/images/comtpl/emul_emA_sns_btn.png" alt=""/>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.OMSNSH0001.productCdNm ? showTlpList.OMSNSH0001.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.OMSNSH0001.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>OMSNSH0001</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- SMS -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.SS000000.iconnew === 'icon_new'}" v-if="showTlpList.SS000000.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general">
                                <div class="template-richcard-textview-origin" cardtype="">
                                  <p class="text colorgray">
                                    RBC샵 첫 구매 이벤트<br/><br/>5만원 이상
                                    첫 구매 후 응모 시 커피 쿠폰을 지급합니다.
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.SS000000.productCdNm ? showTlpList.SS000000.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.SS000000.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>SS000000</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- LMS -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.SL000000.iconnew === 'icon_new'}" v-if="showTlpList.SL000000.show">
                    <div class="preview_template new">
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
                                    - 상품명 : 양수냄비<br/>- 주문번호 :
                                    2020-11-30-******<br/>- 결제금액 :
                                    23,200원(카드)<br/>- 더블 후기 적립금<br/>-
                                    배송지 : 서울시 마포구 가양대로 1<br/><br/>※
                                    반품 기준은 당사 약관/홈페이지 내 상품
                                    정보 고지 내용에 따르며 가전/가구
                                    설치상품은 사용 후 반품이 불가하므로 이점
                                    유의하시기 바랍니다.
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.SL000000.productCdNm ? showTlpList.SL000000.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.SL000000.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>SL000000</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- MMS - 세로형 (Tall) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.SMwThT00.iconnew === 'icon_new'}" v-if="showTlpList.SMwThT00.show">
                    <div class="preview_template new">
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
                                  <p class="text">구매하신 제품이 원하시는 장소로 금일 발송 되었습니다.</p>
                                </div>
                                <div class="template-richcard-button">
                                  <span class="btn">자세히 보러가기</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.SMwThT00.productCdNm ? showTlpList.SMwThT00.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.SMwThT00.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>SMwThT00</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- MMS - 세로형 (Mediunm) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.SMwThM00.iconnew === 'icon_new'}" v-if="showTlpList.SMwThM00.show">
                    <div class="preview_template new">
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
                                  <p class="text">구매하신 제품이 원하시는 장소로 금일 발송 되었습니다.</p>
                                </div>
                                <div class="template-richcard-button">
                                  <span class="btn">자세히 보러가기</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.SMwThM00.productCdNm ? showTlpList.SMwThM00.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.SMwThM00.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>SMwThM00</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- MMS - 슬라이드형(Medium 2장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CMwMhM0200.iconnew === 'icon_new'}" v-if="showTlpList.CMwMhM0200.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel01">
                                <swiper
                                  :slides-per-view="1"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
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
                                </swiper>
                                <div class="template-richcard-carousel-prev">Prev</div>
                                <div class="template-richcard-carousel-next">Next</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CMwMhM0200.productCdNm ? showTlpList.CMwMhM0200.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CMwMhM0200.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CMwMhM0200</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- MMS - 슬라이드형(Medium 3장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CMwMhM0300.iconnew === 'icon_new'}" v-if="showTlpList.CMwMhM0300.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel01">
                                <swiper
                                  :slides-per-view="1"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
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
                                </swiper>
                                <div class="template-richcard-carousel-prev">Prev</div>
                                <div class="template-richcard-carousel-next">Next</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CMwMhM0300.productCdNm ? showTlpList.CMwMhM0300.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CMwMhM0300.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CMwMhM0300</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- MMS - 슬라이드형(Medium 4장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CMwMhM0400.iconnew === 'icon_new'}" v-if="showTlpList.CMwMhM0400.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel01">
                                <swiper
                                  :slides-per-view="1"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
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
                                </swiper>
                                <div class="template-richcard-carousel-prev">Prev</div>
                                <div class="template-richcard-carousel-next">Next</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CMwMhM0400.productCdNm ? showTlpList.CMwMhM0400.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CMwMhM0400.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CMwMhM0400</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- MMS - 슬라이드형(Medium 5장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CMwMhM0500.iconnew === 'icon_new'}" v-if="showTlpList.CMwMhM0500.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel01">
                                <swiper
                                  :slides-per-view="1"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CMwMhM0500.productCdNm ? showTlpList.CMwMhM0500.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CMwMhM0500.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CMwMhM0500</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- MMS - 슬라이드형(Medium 6장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CMwMhM0600.iconnew === 'icon_new'}" v-if="showTlpList.CMwMhM0600.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel01">
                                <swiper
                                  :slides-per-view="1"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
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
                                      <img src="@/assets/images/comtpl/MMS_Medium_232x168_5.8716e1b1.png" alt=""/></div>
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CMwMhM0600.productCdNm ? showTlpList.CMwMhM0600.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CMwMhM0600.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CMwMhM0600</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- MMS - 슬라이드형(Small 2장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CMwShS0200.iconnew === 'icon_new'}" v-if="showTlpList.CMwShS0200.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel02">
                                <swiper
                                  :slides-per-view="1.6"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
                                  <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                    <div class="template-richcard-mediaview">
                                      <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                    </div>
                                    <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                      <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                      </p>
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
                                      <p class="text">
                                        말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CMwShS0200.productCdNm ? showTlpList.CMwShS0200.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CMwShS0200.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CMwShS0200</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- MMS - 슬라이드형 (Small 3장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CMwShS0300.iconnew === 'icon_new'}" v-if="showTlpList.CMwShS0300.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel02">
                                <swiper
                                  :slides-per-view="1.6"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
                                  <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                    <div class="template-richcard-mediaview">
                                      <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                    </div>
                                    <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                      <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                      </p>
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
                                      <p class="text">
                                        말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                      </p>
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
                                      <h4 class="title" style="height: auto;max-height: 100px;">2.데이터무료 적용</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CMwShS0300.productCdNm ? showTlpList.CMwShS0300.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CMwShS0300.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CMwShS0300</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- MMS - 슬라이드형 (Small 4장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CMwShS0400.iconnew === 'icon_new'}" v-if="showTlpList.CMwShS0400.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel02">
                                <swiper
                                  :slides-per-view="1.6"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
                                  <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                    <div class="template-richcard-mediaview">
                                      <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                    </div>
                                    <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                      <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                      </p>
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
                                      <p class="text">
                                        말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                      </p>
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
                                      <h4 class="title" style="height: auto;max-height: 100px;">2.데이터무료 적용</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
                                      </p>
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
                                <div class="template-richcard-carousel-next">Next</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CMwShS0400.productCdNm ? showTlpList.CMwShS0400.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CMwShS0400.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CMwShS0400</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- MMS - 슬라이드형 (Small 5장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CMwShS0500.iconnew === 'icon_new'}" v-if="showTlpList.CMwShS0500.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel02">
                                <swiper
                                  :slides-per-view="1.6"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
                                  <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                    <div class="template-richcard-mediaview">
                                      <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                    </div>
                                    <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                      <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                      </p>
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
                                      <p class="text">
                                        말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                      </p>
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
                                      <p class="text">
                                        한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
                                      </p>
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
                                  <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                    <div class="template-richcard-mediaview">
                                      <img src="@/assets/images/comtpl/MMS_Medium_120x112_5.8e12c531.png" alt=""/>
                                    </div>
                                    <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                      <h4 class="title" style="height: auto; max-height: 100px;">4.송금하기</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        메시지 작성 하단 ‘+’버튼을 누르고 토스/핀크 송금을 눌러보세요. 버튼 하나로 간편한 송금이 가능합니다.
                                      </p>
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CMwShS0500.productCdNm ? showTlpList.CMwShS0500.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CMwShS0500.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CMwShS0500</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- MMS - 슬라이드형 (Small 6장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CMwShS0600.iconnew === 'icon_new'}" v-if="showTlpList.CMwShS0600.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel02">
                                <swiper
                                  :slides-per-view="1.6"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
                                  <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                    <div class="template-richcard-mediaview">
                                      <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                    </div>
                                    <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                      <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                      </p>
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
                                      <p class="text">
                                        말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                      </p>
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
                                      <p class="text">
                                        한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
                                      </p>
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
                                  <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                    <div class="template-richcard-mediaview">
                                      <img src="@/assets/images/comtpl/MMS_Medium_120x112_5.8e12c531.png" alt=""/>
                                    </div>
                                    <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                      <h4 class="title" style="height: auto; max-height: 100px;">4.송금하기</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        메시지 작성 하단 ‘+’버튼을 누르고 토스/핀크 송금을 눌러보세요. 버튼 하나로 간편한 송금이 가능합니다.
                                      </p>
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
                                      <p class="text">
                                        기업용 메시지도 더 풍성하게 이미지를 구성할 수 있습니다. 보다 몰입도 높은 메시지를 받아보세요.
                                      </p>
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CMwShS0600.productCdNm ? showTlpList.CMwShS0600.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CMwShS0600.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CMwShS0600</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- MMS 종료 -->

                  <!-- CHAT 시작 -->
                  <!-- CHAT - 기본말풍선 -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.SCS00000.iconnew === 'icon_new'}" v-if="showTlpList.SCS00000.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general baloon">
                                <div class="template-richcard-textview-origin" cardtype="">
                                  <p class="text colorgray">
                                    안녕하세요, RBC에 가입하신 것을 환영합니다. RBC기능이나 RCS에 대해 궁금한 사항이 있으신 경우 질문을 남겨주세요.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.SCS00000.productCdNm ? showTlpList.SCS00000.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.SCS00000.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>SCS00000</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- CHAT - 텍스트카드 -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.SCL00000.iconnew === 'icon_new'}" v-if="showTlpList.SCL00000.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general">
                                <div class="template-richcard-titleview" cardtype="">
                                  <h4 class="title">RBC에서 주문이 완료되었습니다.</h4>
                                </div>
                                <div class="template-richcard-descriptionview" cardtype="">
                                  <p class="text">- 상품명 : 양수냄비<br/>- 주문번호 :
                                    2020-11-30-******<br/>- 결제금액 :
                                    23,200원(카드)<br/>- 더블 후기 적립금<br/>-
                                    배송지 : 서울시 마포구 가양대로 1<br/><br/>※
                                    반품 기준은 당사 약관/홈페이지 내 상품
                                    정보 고지 내용에 따르며 가전/가구
                                    설치상품은 사용 후 반품이 불가하므로 이점
                                    유의하시기 바랍니다.
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.SCL00000.productCdNm ? showTlpList.SCL00000.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.SCL00000.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>SCL00000</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- CHAT - 세로형(Tall) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.SCwThT00.iconnew === 'icon_new'}" v-if="showTlpList.SCwThT00.show">
                    <div class="preview_template new">
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.SCwThT00.productCdNm ? showTlpList.SCwThT00.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.SCwThT00.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>SCwThT00</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- CHAT - 세로형(Medium) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.SCwThM00.iconnew === 'icon_new'}" v-if="showTlpList.SCwThM00.show">
                    <div class="preview_template new">
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.SCwThM00.productCdNm ? showTlpList.SCwThM00.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.SCwThM00.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>SCwThM00</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- CHAT - 슬라이드형(Medium 2장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CCwMhM0200.iconnew === 'icon_new'}" v-if="showTlpList.CCwMhM0200.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel01">
                                <swiper
                                  :width="194"
                                  :slides-per-view="1"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwMhM0200.productCdNm ? showTlpList.CCwMhM0200.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwMhM0200.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CCwMhM0200</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- CHAT - 슬라이드형(Medium 3장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CCwMhM0300.iconnew === 'icon_new'}" v-if="showTlpList.CCwMhM0300.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel01">
                                <swiper
                                  :width="194"
                                  :slides-per-view="1"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwMhM0300.productCdNm ? showTlpList.CCwMhM0300.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwMhM0300.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CCwMhM0300</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- CHAT - 슬라이드형(Medium 4장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CCwMhM0400.iconnew === 'icon_new'}" v-if="showTlpList.CCwMhM0400.show"><div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel01">
                                <swiper
                                  :width="194"
                                  :slides-per-view="1"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwMhM0400.productCdNm ? showTlpList.CCwMhM0400.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwMhM0400.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CCwMhM0400</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- CHAT - 슬라이드형(Medium 5장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CCwMhM0500.iconnew === 'icon_new'}" v-if="showTlpList.CCwMhM0500.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel01">
                                <swiper
                                  :width="194"
                                  :slides-per-view="1"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwMhM0500.productCdNm ? showTlpList.CCwMhM0500.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwMhM0500.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CCwMhM0500</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- CHAT - 슬라이드형(Medium 6장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CCwMhM0600.iconnew === 'icon_new'}" v-if="showTlpList.CCwMhM0600.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel01">
                                <swiper
                                  :width="194"
                                  :slides-per-view="1"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
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
                                      <p class="text">기업용 메시지도 더 풍성하게 이미지를 구성할 수 있습니다. 채팅+로 보다 몰입도 높은 메시지를 받아보세요.
                                      </p>
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwMhM0600.productCdNm ? showTlpList.CCwMhM0600.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwMhM0600.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CCwMhM0600</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- CHAT - 슬라이드형(Small 2장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CCwShS0200.iconnew === 'icon_new'}" v-if="showTlpList.CCwShS0200.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel02">
                                <swiper
                                  :slides-per-view="1.6"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
                                  <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                    <div class="template-richcard-mediaview">
                                      <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                    </div>
                                    <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                      <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                      </p>
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
                                      <p class="text">
                                        말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwShS0200.productCdNm ? showTlpList.CCwShS0200.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwShS0200.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CCwShS0200</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- CHAT - 슬라이드형(Small 3장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CCwShS0300.iconnew === 'icon_new'}" v-if="showTlpList.CCwShS0300.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel02">
                                <swiper
                                  :slides-per-view="1.6"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
                                  <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                    <div class="template-richcard-mediaview">
                                      <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                    </div>
                                    <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                      <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                      </p>
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
                                      <p class="text">
                                        말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                      </p>
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
                                      <p class="text">
                                        한 개의 메시지당  최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwShS0300.productCdNm ? showTlpList.CCwShS0300.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwShS0300.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CCwShS0300</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- CHAT - 슬라이드형(Small 4장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CCwShS0400.iconnew === 'icon_new'}" v-if="showTlpList.CCwShS0400.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel02">
                                <swiper
                                  :slides-per-view="1.6"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
                                  <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                    <div class="template-richcard-mediaview">
                                      <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                    </div>
                                    <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                      <h4 class="title" style=" height: auto; max-height: 100px ">채팅+ 기능소개</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                      확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                      </p>
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
                                      <p class="text">
                                        말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                      </p>
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
                                      <p class="text">
                                        한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
                                      </p>
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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwShS0400.productCdNm ? showTlpList.CCwShS0400.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwShS0400.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CCwShS0400</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- CHAT - 슬라이드형(Small 5장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CCwShS0500.iconnew === 'icon_new'}" v-if="showTlpList.CCwShS0500.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel02">
                                <swiper
                                  :slides-per-view="1.6"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
                                  <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                    <div class="template-richcard-mediaview">
                                      <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                    </div>
                                    <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                      <h4 class="title" style="height: auto;max-height: 100px;">채팅+ 기능소개</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview"
                                         style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                      </p>
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
                                      <p class="text">
                                        말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                      </p>
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
                                    <div class="template-richcard-descriptionview"
                                         style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
                                      </p>
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
                                  <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                    <div class="template-richcard-mediaview">
                                      <img src="@/assets/images/comtpl/MMS_Medium_120x112_5.8e12c531.png" alt=""/>
                                    </div>
                                    <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                      <h4 class="title" style="height: auto; max-height: 100px;">4.송금하기</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        메시지 작성 하단 ‘+’버튼을 누르고 토스/핀크 송금을 눌러보세요. 버튼 하나로 간편한 송금이 가능합니다.
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
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwShS0500.productCdNm ? showTlpList.CCwShS0500.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwShS0500.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CCwShS0500</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <!-- CHAT - 슬라이드형(Small 6장) -->
                  <swiper-slide class="item" :class="{ icon_new : showTlpList.CCwShS0600.iconnew === 'icon_new'}" v-if="showTlpList.CCwShS0600.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-carousel02">
                                <swiper
                                  :slides-per-view="1.6"
                                  :space-between="3"
                                  :loop="false"
                                  :pagination="false"
                                  :navigation="true"
                                  :observer="true"
                                  :observeParents="true"
                                  class="template-richcard-carousel swiper-wrapper">
                                  <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                    <div class="template-richcard-mediaview">
                                      <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                                    </div>
                                    <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                      <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                      </p>
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
                                      <p class="text">
                                        말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                      </p>
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
                                      <p class="text">
                                        한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
                                      </p>
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
                                  <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                                    <div class="template-richcard-mediaview">
                                      <img src="@/assets/images/comtpl/MMS_Medium_120x112_5.8e12c531.png" alt=""/>
                                    </div>
                                    <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                      <h4 class="title" style="height: auto; max-height: 100px;">4.송금하기</h4>
                                    </div>
                                    <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                      <p class="text">
                                        메시지 작성 하단 ‘+’버튼을 누르고 토스/핀크 송금을 눌러보세요. 버튼 하나로 간편한 송금이 가능합니다.
                                      </p>
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
                                      <p class="text">
                                        기업용 메시지도 더 풍성하게 이미지를 구성할 수 있습니다. 보다 몰입도 높은 메시지를 받아보세요.
                                      </p>
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
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.CCwShS0600.productCdNm ? showTlpList.CCwShS0600.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.CCwShS0600.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>CCwShS0600</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                  <!-- Chat 종료 -->
                  <!-- (사용하지 않음) -->
                  <!-- <swiper-slide class="item" :class="{ icon_new : showTlpList.OMHITH0001.iconnew === 'icon_new'}" v-if="showTlpList.OMHITH0001.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general">
                                <div class="template-richcard-mediaview">
                                  <img src="@/assets/images/comtpl/preview_dummy06.jpg" alt=""/>
                                </div>
                                <div class="template-richcard-textview bggray" cardtype="SM">
                                  <h4 class="title">삭제 요망 삭제 요망 </h4>
                                  <ul class="imagetitle_long">
                                    <li><p><strong>혜택1</strong>22% 적립</p></li>
                                    <li><p><strong>혜택2</strong>무료배송</p></li>
                                  </ul>
                                  <div class="link">
                                    <a href="javascript:void(0)">자세히 보러가기</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.OMHITH0001.productCdNm ? showTlpList.OMHITH0001.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.OMHITH0001.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>OMHITH0001</span></p>
                      </div>
                    </div>
                  </swiper-slide> -->
                  <!-- (사용하지 않음) -->
                  <!-- <swiper-slide class="item" :class="{ icon_new : showTlpList.OMHIMH0001.iconnew === 'icon_new'}" v-if="showTlpList.OMHIMH0001.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general">
                                <div class="template-richcard-mediaview">
                                  <img src="@/assets/images/comtpl/preview_dummy06.jpg" alt=""/>
                                </div>
                                <div class="template-richcard-textview bggray" cardtype="SM">
                                  <h4 class="title">삭제 요망 삭제 요망</h4>
                                  <p class="imagetitle_square">2022년 더 새로워진 RBC가 되었습니다. 이제 테마 선택 기능으로 더 효과적인 메시지를 고객에게
                                    전송 할 수 있습니다.</p>
                                  <div class="link">
                                    <a href="javascript:void(0)">자세히 보러가기</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.OMHIMH0001.productCdNm ? showTlpList.OMHIMH0001.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.OMHIMH0001.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>OMHIMH0001</span>
                        </p>
                      </div>
                    </div>
                  </swiper-slide> -->

                  <swiper-slide class="item" :class="{ icon_new : showTlpList.OMTBNS0001.iconnew === 'icon_new'}" v-if="showTlpList.OMTBNS0001.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general">
                                <div class="template-richcard-mediaview">
                                  <img src="@/assets/images/comtpl/preview_dummy03.jpg" alt=""/>
                                </div>
                                <div class="template-richcard-textview bggray" cardtype="SM">
                                  <h4 class="title">RBC 테마 기능 업데이트!</h4>
                                  <p class="introduct_A_info">2022년 더 새로워진 RBC를 소개 합니다. 10종의 신규 메시지와 타이틀 자유형 테마 추가
                                  </p>
                                  <ul class="introduct_A_list">
                                    <li>
                                      <div class="img">
                                        <img src="@/assets/images/comtpl/emul_emA_thumnail_vertical.png" alt=""/>
                                      </div>
                                      <div class="txt">
                                        <p class="title">공통 메시지 추가</p>
                                        <p class="desc">10가지의 다채로운 신규 메시지 추가</p>
                                      </div>
                                    </li>
                                    <li>
                                      <div class="img">
                                        <img src="@/assets/images/comtpl/preview_smalldummy02.jpg" alt=""/>
                                      </div>
                                      <div class="txt">
                                        <p class="title">테마 선택 추가</p>
                                        <p class="desc">111 더 효과적으로 강조 할 수 있는 테마</p>
                                      </div>
                                    </li>
                                  </ul>
                                  <div class="link">
                                    <a href="javascript:void(0)">자세히 보러가기</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.OMTBNS0001.productCdNm ? showTlpList.OMTBNS0001.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.OMTBNS0001.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>OMTBNS0001</span></p>
                      </div>
                    </div>
                  </swiper-slide>

                  <swiper-slide class="item" :class="{ icon_new : showTlpList.OMTBNS0002.iconnew === 'icon_new'}" v-if="showTlpList.OMTBNS0002.show">
                    <div class="preview_template new">
                      <div class="emulator_area">
                        <div class="emulator_cont">
                          <div>
                            <div cardtype="D">
                              <div class="template-richcard-general">
                                <div class="template-richcard-mediaview">
                                  <img src="@/assets/images/comtpl/preview_dummy03.jpg" alt=""/>
                                </div>
                                <div class="template-richcard-textview bggray" cardtype="SM">
                                  <h4 class="title">RBC 테마 기능 업데이트!</h4>
                                  <p class="introduct_B_info">2022년 더 새로워진 RBC를 소개 합니다. 10종의 신규 메시지와 타이틀 자유형 테마 추가</p>
                                  <ul class="introduct_B_list">
                                    <li><img src="@/assets/images/comtpl/preview_smalldummy01.jpg" alt=""/></li>
                                    <li><img src="@/assets/images/comtpl/preview_smalldummy02.jpg" alt=""/></li>
                                    <li><img src="@/assets/images/comtpl/preview_smalldummy03.jpg" alt=""/></li>
                                  </ul>
                                  <div class="link">
                                    <a href="javascript:void(0)">자세히 보러가기</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="preview_template_info">
                        <p class="product">{{ showTlpList.OMTBNS0002.productCdNm ? showTlpList.OMTBNS0002.productCdNm.toUpperCase() : '' }}</p>
                        <p class="type">상품명 :<span>{{ showTlpList.OMTBNS0002.tplNm }}</span></p>
                        <p class="formatID">포맷ID :<span>OMTBNS0002</span></p>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
                <div class="view_grid_button view_grid_button_prev"></div>
                <div class="view_grid_button view_grid_button_next"></div>
              </div>
              <!-- //슬라이드 방식 보기 - 에뮬 -->
            </div>
            <div class="emulator_wrap for_list_view" v-show="show_list">
              <div class="title_wrap mar_b20">
                <h4 class="h4_title bold">{{ toUppsercaseAfterWhtespace(selectedTemplate.cardTypeNm) }} /
                  {{ selectedTemplate.cardCnt }}장</h4>
              </div>
              <!-- 리스트방식 보기 - 에뮬 -->
              <div class="inner_emul preview_template">
                <strong class="blind">미리보기</strong>
                <div class="emulator_area">
                  <div class="emulator_cont">
                    <div>
                      <div cardtype="D">
                        <!-- 이미지 & 타이틀 강조형 (3:4) - 리스트 뷰 - 남미라 -->
                        <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'OMHITV0001'">
                          <div class="template-richcard-mediaview">
                            <img src="@/assets/images/comtpl/emul_emA_imagetitle_34.png" alt=""/>
                          </div>
                          <div class="template-richcard-textview bggray br-btm" cardtype="SM">
                            <h4 class="title">프리미엄회원 특별혜택!</h4>
                            <ul class="imagetitle_long">
                              <li><p><strong>행사기간</strong>7월 한 달간</p></li>
                              <li><p><strong>참여대상</strong>프리미엄 등급 고객</p></li>
                              <li><p><strong>제공혜택</strong>5% 추가 적립</p></li>
                            </ul>
                            <div class="link">
                              <a href="javascript:void(0)">자세히 보러가기</a>
                            </div>
                          </div>
                        </div>
                        <!-- 이미지 & 타이틀 강조형 (1:1) - 리스트 뷰 - 남미라 -->
                        <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'OMHITS0001'">
                          <div class="template-richcard-mediaview">
                            <img src="@/assets/images/comtpl/emul_emA_imagetitle_11.png" alt=""/>
                          </div>
                          <div class="template-richcard-textview bggray br-btm" cardtype="SM">
                            <h4 class="title">올여름 시원하게 첫 구매 고객<br>무료배송</h4>
                            <ul class="imagetitle_long">
                              <li><p><strong>행사기간</strong>8월 한달 간</p></li>
                              <li><p><strong>참여대상</strong>첫 구매 고객</p></li>
                              <li><p><strong>제공혜택</strong>무료배송</p></li>
                            </ul>
                            <div class="link">
                              <a href="javascript:void(0)">자세히 보러가기</a>
                            </div>
                          </div>
                        </div>
                        <!-- (사용하지 않음) -->
                        <!-- <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'OMHITH0001'">
                          <div class="template-richcard-mediaview">
                            <img src="@/assets/images/comtpl/preview_dummy06.jpg" alt=""/>
                          </div>
                          <div class="template-richcard-textview bggray" cardtype="SM">
                            <h4 class="title">삭제 요망 삭제 요망 </h4>
                            <ul class="imagetitle_long">
                              <li><p><strong>혜택1</strong>22% 적립</p></li>
                              <li><p><strong>혜택2</strong>무료배송</p></li>
                            </ul>
                            <div class="link">
                              <a href="javascript:void(0)">자세히 보러가기</a>
                            </div>
                          </div>
                        </div> -->
                        <!-- 이미지 강조형 (3:4) - 리스트 뷰 - 남미라 -->
                        <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'OMHIMV0001'">
                          <div class="template-richcard-mediaview">
                            <img src="@/assets/images/comtpl/emul_emA_image_34.png" alt=""/>
                          </div>
                          <div class="template-richcard-textview bggray br-btm" cardtype="SM">
                            <h4 class="title">2022 한강 불꽃축제 소식</h4>
                            <p class="imagetitle_square">아름다운 한강에서 화려만 불꽃축제와 함께 잊을 수 없는 추억을 만드세요.</p>
                            <div class="link">
                              <a href="javascript:void(0)">자세히 보러가기</a>
                            </div>
                          </div>
                        </div>
                        <!-- 이미지 강조형 (1:1) - 리스트 뷰 -->
                        <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'OMHIMS0001'">
                          <div class="template-richcard-mediaview">
                            <img src="@/assets/images/comtpl/emul_emA_image_11.png" alt=""/>
                          </div>
                          <!-- 이미지 강조형 (1:1) - 리스트 뷰 - 남미라 -->
                          <div class="template-richcard-textview bggray br-btm" cardtype="SM">
                            <h4 class="title">국내여행지<br>베스트 10 추천</h4>
                            <p class="imagetitle_square">제주를 여행한다면 수많은 관광 명소 중 어디를 가야 할지 행복한 고민을 하게 되죠. 어디를 가나 천혜의 경관인 제주도로 지금 떠나요.</p>
                            <div class="link">
                              <a href="javascript:void(0)">자세히 보러가기</a>
                            </div>
                          </div>
                        </div>
                        <!-- (사용하지 않음) -->
                        <!-- <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'OMHIMH0001'">
                          <div class="template-richcard-mediaview">
                            <img src="@/assets/images/comtpl/preview_dummy06.jpg" alt=""/>
                          </div>
                          <div class="template-richcard-textview bggray" cardtype="SM">
                            <h4 class="title">삭제 요망 삭제 요망</h4>
                            <p class="imagetitle_square">2022년 더 새로워진 RBC가 되었습니다. 이제 테마 선택 기능으로 더 효과적인 메시지를 고객에게 전송 할 수
                              있습니다.</p>
                            <div class="link">
                              <a href="javascript:void(0)">자세히 보러가기</a>
                            </div>
                          </div>
                        </div> -->
                        <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'OMTBNS0001'">
                          <div class="template-richcard-mediaview">
                            <img src="@/assets/images/comtpl/preview_dummy03.jpg" alt=""/>
                          </div>
                          <div class="template-richcard-textview bggray" cardtype="SM">
                            <h4 class="title">RBC 테마 기능 업데이트!</h4>
                            <p class="introduct_A_info">2022년 더 새로워진 RBC를 소개 합니다. 10종의 신규 메시지와 타이틀 자유형 테마 추가</p>
                            <ul class="introduct_A_list">
                              <li>
                                <div class="img">
                                  <img src="@/assets/images/comtpl/preview_smalldummy01.jpg" alt=""/>
                                </div>
                                <div class="txt">
                                  <p class="title">공통 메시지 추가</p>
                                  <p class="desc">10가지의 다채로운 신규 메시지 추가</p>
                                </div>
                              </li>
                              <li>
                                <div class="img">
                                  <img src="@/assets/images/comtpl/preview_smalldummy02.jpg" alt=""/>
                                </div>
                                <div class="txt">
                                  <p class="title">테마 선택 추가</p>
                                  <p class="desc">333 더 효과적으로 강조 할 수 있는 테마</p>
                                </div>
                              </li>
                            </ul>
                            <div class="link">
                              <a href="javascript:void(0)">자세히 보러가기</a>
                            </div>
                          </div>
                        </div>
                        <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'OMTBNS0002'">
                          <div class="template-richcard-mediaview">
                            <img src="@/assets/images/comtpl/preview_dummy03.jpg" alt=""/>
                          </div>
                          <div class="template-richcard-textview bggray" cardtype="SM">
                            <h4 class="title">RBC 테마 기능 업데이트!</h4>
                            <p class="introduct_B_info">2022년 더 새로워진 RBC를 소개 합니다. 10종의 신규 메시지와 타이틀 자유형 테마 추가</p>
                            <ul class="introduct_B_list">
                              <li><img src="@/assets/images/comtpl/preview_smalldummy01.jpg" alt=""/></li>
                              <li><img src="@/assets/images/comtpl/preview_smalldummy02.jpg" alt=""/></li>
                              <li><img src="@/assets/images/comtpl/preview_smalldummy03.jpg" alt=""/></li>
                            </ul>
                            <div class="link">
                              <a href="javascript:void(0)">자세히 보러가기</a>
                            </div>
                          </div>
                        </div>
                        <!-- 썸네일형 (세로) - 리스트 뷰 - 남미라 -->
                        <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'OMTBNV0001'">
                          <div class="template-richcard-mediaview">
                            <img src="@/assets/images/comtpl/emul_emA_thumnail_vertical.png" alt=""/>
                          </div>
                          <div class="template-richcard-textview bggray br-btm" cardtype="SM">
                            <h4 class="title">미리 만나는 프리썸머 페스타</h4>
                            <p class="introduct_A_info">쿨한 여름을 준비하는 아이템을 소개합니다.<br>10종의 다채로운 상품을 지금 만나보세요.</p>
                            <ul class="introduct_A_list">
                              <li>
                                <div class="img"><img src="@/assets/images/comtpl/emul_emA_thumnail_small_01.png" alt=""/></div>
                                <div class="txt">
                                  <p class="desc">달콤한 컬러의 시원한 미니 손풍기, 달달함은 덤!</p>
                                </div>
                              </li>
                              <li>
                                <div class="img"><img src="@/assets/images/comtpl/emul_emA_thumnail_small_02.png" alt=""/></div>
                                <div class="txt">
                                  <p class="desc">쿨링 키보드로 무더운 여름 손가락 끝까지 시원하게</p>
                                </div>
                              </li>
                            </ul>
                            <div class="link">
                              <a href="javascript:void(0)">자세히 보러가기</a>
                            </div>
                          </div>
                        </div>
                        <!-- 썸네일형 (가로) - 리스트 뷰 - 남미라 -->
                        <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'OMTBNH0001'">
                          <div class="template-richcard-mediaview">
                            <img src="@/assets/images/comtpl/emul_emA_thumnail_horizontal.png" alt=""/>
                          </div>
                          <div class="template-richcard-textview bggray br-btm" cardtype="SM">
                            <h4 class="title">요가하는 쏭 선생님</h4>
                            <p class="introduct_B_info">쏭 선생님과 함께 하체부종 타파 요가 자세. 지금 도전해보세요. 매주 수요일 오후 2시 업데이트!</p>
                            <ul class="introduct_B_list">
                              <li><img src="@/assets/images/comtpl/emul_emA_thumnail_small_03.png" alt=""/></li>
                              <li><img src="@/assets/images/comtpl/emul_emA_thumnail_small_04.png" alt=""/></li>
                              <li><img src="@/assets/images/comtpl/emul_emA_thumnail_small_05.png" alt=""/></li>
                            </ul>
                            <div class="link">
                              <a href="javascript:void(0)">자세히 보러가기</a>
                            </div>
                          </div>
                        </div>
                        <!-- SNS형  - 리스트 뷰 - 남미라 -->
                        <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'OMSNSS0001'">
                          <div class="template-richcard-textview template-snsA bggray" cardtype="SM">
                            <h4 class="title">멋진 오늘의 건축물<br>역사와 현대가 함께 흐르는 공간</h4>
                            <p class="imagetitle_square">19세기 말에 지어진 영국 Clerk-enwell에 있는 건물이다. 역사적인 스토리를 그대로 담아 현대식 주택으로 변화시켰다.</p>
                            <div class="template-richcard-mediaview">
                              <img src="@/assets/images/comtpl/emul_emA_sns.png" alt=""/>
                            </div>
                            <div class="link">
                              <a href="javascript:void(0)">자세히 보러가기</a>
                            </div>
                          </div>
                        </div>
                        <!-- SNS형 (중간버튼) - 리스트 뷰 - 남미라 -->
                        <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'OMSNSH0001'">
                          <div class="template-richcard-textview template-snsB bggray" cardtype="SM">
                            <h4 class="title">ISSUE 2022<br>스마트폰과 함께하는 시간</h4>
                            <p class="imagetitle_square">한국인의 하루 평균 스마트폰 사용 시간은, 3시간 48분으로, 20대는 하루 4시간이 넘게 스마트폰을 사용하고 있었습니다.</p>
                            <div class="link top">
                              <a href="javascript:void(0)">자세히 보러가기</a>
                            </div>
                            <div class="template-richcard-mediaview">
                              <img src="@/assets/images/comtpl/emul_emA_sns_btn.png" alt=""/>
                            </div>
                          </div>
                        </div>
                        <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'SS000000'">
                          <div class="template-richcard-textview-origin">
                            <p class="text colorgray">
                              RBC샵 첫 구매 이벤트<br/><br/>5만원 이상
                              첫 구매 후 응모 시 커피 쿠폰을 지급합니다.
                            </p>
                          </div>
                          <div class="template-richcard-button">
                            <span class="btn">자세히 보러가기</span>
                          </div>
                        </div>
                        <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'SL000000'">
                          <div class="template-richcard-titleview" cardtype="">
                            <h4 class="title">RBC에서 주문이 완료되었습니다.</h4>
                          </div>
                          <div class="template-richcard-descriptionview" cardtype="">
                            <p class="text">
                              - 상품명 : 양수냄비<br/>- 주문번호 :
                              2020-11-30-******<br/>- 결제금액 :
                              23,200원(카드)<br/>- 더블 후기 적립금<br/>-
                              배송지 : 서울시 마포구 가양대로 1<br/><br/>※
                              반품 기준은 당사 약관/홈페이지 내 상품
                              정보 고지 내용에 따르며 가전/가구
                              설치상품은 사용 후 반품이 불가하므로 이점
                              유의하시기 바랍니다.
                            </p>
                          </div>
                          <div class="template-richcard-button">
                            <span class="btn">자세히 보러가기</span>
                          </div>
                        </div>
                        <div class="template-richcard-general" v-show="selectedTemplate.tplId === 'SCwThT00' || selectedTemplate.tplId === 'SMwThT00' || selectedTemplate.tplId === 'SCwThM00' || selectedTemplate.tplId === 'SMwThM00' || selectedTemplate.tplId === 'SMwLhX00' || selectedTemplate.tplId === 'SMwRhX00'">
                          <div class="template-richcard-mediaview" csstype="lms">
                            <img v-if="selectedTemplate.tplId === 'SCwThM00' || selectedTemplate.tplId === 'SMwThM00'" src="@/assets/images/comtpl/MMS_Medium_244x144.81c75bb7.png" alt=""/>
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
                        <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CCwMhM0200'">
                          <swiper
                            :slides-per-view="1"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
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
                        <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CCwMhM0300'">
                          <swiper
                            :slides-per-view="1"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
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
                        <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CCwMhM0400'">
                          <swiper
                            :slides-per-view="1"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
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
                        <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CCwMhM0500'">
                          <swiper
                            :slides-per-view="1"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
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
                        <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CCwMhM0600'">
                          <swiper
                            :slides-per-view="1"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
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
                        <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CMwMhM0200'">
                          <swiper
                            :width="194"
                            :slides-per-view="1"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
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
                          </swiper>
                          <div class="template-richcard-carousel-prev">Prev</div>
                          <div class="template-richcard-carousel-next">Next</div>
                        </div>
                        <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CMwMhM0300'">
                          <swiper
                            :width="194"
                            :slides-per-view="1"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
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
                          </swiper>
                          <div class="template-richcard-carousel-prev">Prev</div>
                          <div class="template-richcard-carousel-next">Next</div>
                        </div>
                        <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CMwMhM0400'">
                          <swiper
                            :width="194"
                            :slides-per-view="1"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
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
                          </swiper>
                          <div class="template-richcard-carousel-prev">Prev</div>
                          <div class="template-richcard-carousel-next">Next</div>
                        </div>
                        <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CMwMhM0500'">
                          <swiper
                            :width="194"
                            :slides-per-view="1"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
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
                                <img src="@/assets/images/comtpl/MMS_Medium_232x168_5.8716e1b1.png" alt=""/></div>
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
                        <div class="template-richcard-carousel01" v-if="selectedTemplate.tplId === 'CMwMhM0600'">
                          <swiper
                            :width="194"
                            :slides-per-view="1"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
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
                        <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CCwShS0200'">
                          <swiper
                            :width="194"
                            :slides-per-view="1.6"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
                            <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                              <div class="template-richcard-mediaview">
                                <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                </p>
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
                                <p class="text">
                                  말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
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
                        <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CCwShS0300'">
                          <swiper
                            :width="194"
                            :slides-per-view="1.6"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
                            <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                              <div class="template-richcard-mediaview">
                                <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                </p>
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
                                <p class="text">
                                  말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                </p>
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
                                <p class="text">
                                 한 개의 메시지당  최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
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
                        <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CCwShS0400'">
                          <swiper
                            :width="194"
                            :slides-per-view="1.6"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
                            <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                              <div class="template-richcard-mediaview">
                                <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                <h4 class="title" style=" height: auto; max-height: 100px ">채팅+ 기능소개</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                </p>
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
                                <p class="text">
                                  말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                </p>
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
                                <p class="text">
                                  한 개의 메시지당  최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
                                </p>
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
                        <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CCwShS0500'">
                          <swiper
                            :width="194"
                            :slides-per-view="1.6"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
                            <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                              <div class="template-richcard-mediaview">
                                <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                <h4 class="title" style="height: auto;max-height: 100px;">채팅+ 기능소개</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                </p>
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
                                <p class="text">
                                  말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                </p>
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
                                <p class="text">
                                  한 개의 메시지당  최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
                                </p>
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
                            <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                              <div class="template-richcard-mediaview">
                                <img src="@/assets/images/comtpl/MMS_Medium_120x112_5.8e12c531.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                <h4 class="title" style="height: auto; max-height: 100px;">4.송금하기</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  메시지 작성 하단 ‘+’버튼을 누르고 토스/핀크 송금을 눌러보세요. 버튼 하나로 간편한 송금이 가능합니다.
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
                        <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CCwShS0600'">
                          <swiper
                            :width="194"
                            :slides-per-view="1.6"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
                            <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                              <div class="template-richcard-mediaview">
                                <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                </p>
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
                                <p class="text">
                                  말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                </p>
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
                                <p class="text">
                                  한 개의 메시지당  최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
                                </p>
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
                            <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                              <div class="template-richcard-mediaview">
                                <img src="@/assets/images/comtpl/MMS_Medium_120x112_5.8e12c531.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                <h4 class="title" style="height: auto; max-height: 100px;">4.송금하기</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  메시지 작성 하단 ‘+’버튼을 누르고 토스/핀크 송금을 눌러보세요. 버튼 하나로 간편한 송금이 가능합니다.
                                </p>
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
                                <p class="text">
                                  기업용 메시지도 더 풍성하게 이미지를 구성할 수 있습니다. 보다 몰입도 높은 메시지를 받아보세요.
                                </p>
                              </div>
                              <div class="template-richcard-button">
                                <span class="btn">더보기</span>
                              </div>
                            </swiper-slide>
                          </swiper>
                          <div class="template-richcard-carousel-prev">Prev</div>
                          <div class="template-richcard-carousel-next">Next</div>
                        </div>
                        <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CMwShS0200'">
                          <swiper
                            :width="194"
                            :slides-per-view="1.6"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
                            <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                              <div class="template-richcard-mediaview">
                                <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                </p>
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
                                <p class="text">
                                  말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
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
                        <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CMwShS0300'">
                          <swiper
                            :width="194"
                            :slides-per-view="1.6"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
                            <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                              <div class="template-richcard-mediaview">
                                <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                </p>
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
                                <p class="text">
                                  말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                </p>
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
                                <h4 class="title" style="height: auto;max-height: 100px;">2.데이터무료 적용</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
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
                        <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CMwShS0400'">
                          <swiper
                            :width="194"
                            :slides-per-view="1.6"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
                            <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                              <div class="template-richcard-mediaview">
                                <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                </p>
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
                                <p class="text">
                                  말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                </p>
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
                                <h4 class="title" style="height: auto;max-height: 100px;">2.데이터무료 적용</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
                                </p>
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
                          <div class="template-richcard-carousel-next">Next</div>
                        </div>
                        <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CMwShS0500'">
                          <swiper
                            :width="194"
                            :slides-per-view="1.6"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
                            <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                              <div class="template-richcard-mediaview">
                                <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                </p>
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
                                <p class="text">
                                  말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                </p>
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
                                <p class="text">
                                  한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
                                </p>
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
                            <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                              <div class="template-richcard-mediaview">
                                <img src="@/assets/images/comtpl/MMS_Medium_120x112_5.8e12c531.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                <h4 class="title" style="height: auto; max-height: 100px;">4.송금하기</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  메시지 작성 하단 ‘+’버튼을 누르고 토스/핀크 송금을 눌러보세요. 버튼 하나로 간편한 송금이 가능합니다.
                                </p>
                              </div>
                              <div class="template-richcard-button">
                                <span class="btn">더보기</span>
                              </div>
                            </swiper-slide>
                          </swiper>
                          <div class="template-richcard-carousel-prev">Prev</div>
                          <div class="template-richcard-carousel-next">Next</div>
                        </div>
                        <div class="template-richcard-carousel02" v-if="selectedTemplate.tplId === 'CMwShS0600'">
                          <swiper
                            :width="194"
                            :slides-per-view="1.6"
                            :space-between="3"
                            :loop="false"
                            :pagination="false"
                            :navigation="true"
                            :observer="true"
                            :observeParents="true"
                            class="template-richcard-carousel swiper-wrapper">
                            <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                              <div class="template-richcard-mediaview">
                                <img src="@/assets/images/comtpl/MMS_Medium_120x112_1.b0f0e90c.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                <h4 class="title" style="height: auto; max-height: 100px;">채팅+ 기능소개</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  확 달라진 메시지앱, 채팅+를 소개합니다. 좌우로 넘겨보세요.
                                </p>
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
                                <p class="text">
                                  말풍선 옆의 숫자”1”로 상대방이 읽었는지 확인할 수 있습니다.
                                </p>
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
                                <p class="text">
                                  한 개의 메시지당 최대 5MB까지 데이터 차감 없이 사진/영상을 공유할 수 있습니다.
                                </p>
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
                            <swiper-slide class="template-richcard-carousel-item swiper-sswiper-slidede">
                              <div class="template-richcard-mediaview">
                                <img src="@/assets/images/comtpl/MMS_Medium_120x112_5.8e12c531.png" alt=""/>
                              </div>
                              <div class="template-richcard-titleview" style="padding: 20px 20px 0 7px;">
                                <h4 class="title" style="height: auto; max-height: 100px;">4.송금하기</h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  메시지 작성 하단 ‘+’버튼을 누르고 토스/핀크 송금을 눌러보세요. 버튼 하나로 간편한 송금이 가능합니다.
                                </p>
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
                                <h4 class="title" style="height: auto; max-height: 100px;">5.비즈메시지 기능<br/><br/></h4>
                              </div>
                              <div class="template-richcard-descriptionview" style="padding: 5px; overflow: hidden">
                                <p class="text">
                                  기업용 메시지도 더 풍성하게 이미지를 구성할 수 있습니다. 보다 몰입도 높은 메시지를 받아보세요.
                                </p>
                              </div>
                              <div class="template-richcard-button">
                                <span class="btn">더보기</span>
                              </div>
                            </swiper-slide>
                          </swiper>
                          <div class="template-richcard-carousel-prev">Prev</div>
                          <div class="template-richcard-carousel-next">Next</div>
                        </div>
                        <div class="template-richcard-general baloon" v-if="selectedTemplate.tplId === 'SCS00000'">
                          <div class="template-richcard-textview-origin" cardtype="">
                            <p class="text colorgray">
                              안녕하세요, RBC에 가입하신 것을 환영합니다.<br>
                              RBC기능이나 RCS에 대해 궁금한 사항이 있으신 경우 질문을 남겨주세요.
                            </p>
                          </div>
                        </div>
                        <div class="template-richcard-general" v-if="selectedTemplate.tplId === 'SCL00000'">
                          <div class="template-richcard-titleview" cardtype="">
                            <h4 class="title">RBC에서 주문이 완료되었습니다.</h4>
                          </div>
                          <div class="template-richcard-descriptionview" cardtype="">
                            <p class="text">- 상품명 : 양수냄비<br/>- 주문번호 :
                              2020-11-30-******<br/>- 결제금액 :
                              23,200원(카드)<br/>- 더블 후기 적립금<br/>-
                              배송지 : 서울시 마포구 가양대로 1<br/><br/>※
                              반품 기준은 당사 약관/홈페이지 내 상품
                              정보 고지 내용에 따르며 가전/가구
                              설치상품은 사용 후 반품이 불가하므로 이점
                              유의하시기 바랍니다.
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
              </div>
              <!-- //리스트방식 보기 - 에뮬 -->
            </div>
          </div>
        </div>
        <a id="btn_close" href="javascript:void(0)" onclick class="btn_close" @click="close"></a>
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

// Import Swiper styles
import 'swiper/swiper-bundle.css'
// import '@/assets/css/designvii.css'

SwiperCore.use([Navigation, Pagination])

export default {
  name: 'CommTplViewPopup',
  props: {
    visible: {
      type: Boolean
    },
    defaultProduct: {
      type: String
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    Pagination2
  },
  data() {
    return {
      formData: {
        size: 10,
        page: 1
      },
      totalcount: 0,
      originList: [],
      newList: [],
      list: [],
      productList: [],
      cardTypeList: [],
      selectedTemplate: {},
      selectedSwiper: {},
      searchParam: {
        product: this.defaultProduct ? this.defaultProduct : '',
        cardType: ''
      },
      showType: 'list',
      show_loading: true,
      show_grid: true,
      show_list: false,
      checkCardType: true,
      checkProduct: true,
      NavigationOptions: {
        nextEl: '.view_grid_button_next',
        prevEl: '.view_grid_button_prev'
      },
      spaceBetween: 2,
      cardTypeSort: {
        'S': ['SA'],
        'L': ['SA'],
        'M': ['HIT', 'HIM', 'TBN', 'SNS', 'SM', 'SH', 'CR', 'CS'],
        'C': ['SM', 'SH', 'SAL', 'SAS', 'CR', 'CS']
      },
      showTlpList: {
        OMHITV0001: { show: true },
        OMHITS0001: { show: true },
        OMHITH0001: { show: true },
        OMHIMV0001: { show: true },
        OMHIMS0001: { show: true },
        OMHIMH0001: { show: true },
        OMTBNV0001: { show: true },
        OMTBNH0001: { show: true },
        OMTBNS0001: { show: true },
        OMTBNS0002: { show: true },
        OMSNSS0001: { show: true },
        OMSNSH0001: { show: true },
        SS000000: { show: true },
        SL000000: { show: true },
        SCwThT00: { show: true },
        SMwThT00: { show: true },
        SCwThM00: { show: true },
        SMwThM00: { show: true },
        CCwMhM0200: { show: true },
        CCwMhM0300: { show: true },
        CCwMhM0400: { show: true },
        CCwMhM0500: { show: true },
        CCwMhM0600: { show: true },
        CMwMhM0200: { show: true },
        CMwMhM0300: { show: true },
        CMwMhM0400: { show: true },
        CMwMhM0500: { show: true },
        CMwMhM0600: { show: true },
        CCwShS0200: { show: true },
        CCwShS0300: { show: true },
        CCwShS0400: { show: true },
        CCwShS0500: { show: true },
        CCwShS0600: { show: true },
        CMwShS0200: { show: true },
        CMwShS0300: { show: true },
        CMwShS0400: { show: true },
        CMwShS0500: { show: true },
        CMwShS0600: { show: true },
        SCS00000: { show: true },
        SCL00000: { show: true }
      },
      showNewIconList: [ // new 아이콘을 표시할 템플릿 리스트
        'OMHITS0001',
        'OMHITV0001',
        'OMHIMV0001',
        'OMHIMS0001',
        'OMTBNV0001',
        'OMTBNH0001',
        'OMSNSH0001',
        'OMSNSS0001'
      ]
    }
  },
  computed: {
    jsonData() {
      if (jglib.isEmpty(this.selectedTemplate)) {
        return {}
      }
      let fmtStr = this.selectedTemplate.fmtStr
      fmtStr = fmtStr.replace(/(\{\{media)\d*(\}\})/g, '')
      fmtStr = fmtStr.replace(/(\{\{title)\d*(\}\})/g, '메시지 제목')
      fmtStr = fmtStr.replace(
        /(\{\{description)\d*(\}\})/g,
        '메시지 내용이 출력됩니다.'
      )
      return JSON.parse(fmtStr)
    }
  },
  watch: {
    'searchParam.product'() {
      this.getCardType(this.searchParam.product)
      this.searchData()
      this.searchParam.cardType = this.searchParam.product === 'S' || this.searchParam.product === 'L' ? 'SA' : ''
    },
    'searchParam.cardType'() {
      this.getCardType(this.searchParam.product)
      this.searchData()
    },
    'formData.page'() {
      this.searchData()
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      this.retreiveData()
      retrieveCommonCode('TPL_PRODUCT').then(res => {
        this.productList = res.result.filter(opt => opt.code !== 'T' && opt.code !== 'I')
      })
      this.getCardType('')
    },
    getCardType(productCd) {
      retrieveCommonCode('TPL_CARD_TYPE').then(res => {
        this.cardTypeList = res.result.filter(opt => !(opt.code === 'D' || opt.code === 'C' || opt.code === 'F' || opt.code === 'SH' || opt.code === 'HITS' || opt.code === 'HITV' || opt.code === 'HIMS' || opt.code === 'HIMV' || opt.code === 'TBNH' || opt.code === 'TBNV' || opt.code === 'SNSH' || opt.code === 'SNSS'))
        if (productCd !== '') {
          this.cardTypeList = this.cardTypeList.filter(obj => this.cardTypeSort[productCd].includes(obj.code))
        }
      })
    },
    onSwiper(swiper) {
      this.selectedSwiper = swiper
    },
    onSortProductCd() {
      if (this.checkProduct) {
        this.originList.sort(function (a, b) {
          let x = a.productCd
          let y = b.productCd
          if (x < y) {
            return -1
          }
          if (x > y) {
            return 1
          }
          return 0
        })
      } else {
        this.originList.sort(function (a, b) {
          let x = a.productCd
          let y = b.productCd
          if (x > y) {
            return -1
          }
          if (x < y) {
            return 1
          }
          return 0
        })
      }
      this.checkProduct = !this.checkProduct
      this.searchData()
    },
    onSortCardType() {
      if (this.checkCardType) {
        this.originList.sort(function (a, b) {
          let x = a.cardType
          let y = b.cardType
          if (x < y) {
            return -1
          }
          if (x > y) {
            return 1
          }
          return 0
        })
      } else {
        this.originList.sort(function (a, b) {
          let x = a.cardType
          let y = b.cardType
          if (x > y) {
            return -1
          }
          if (x < y) {
            return 1
          }
          return 0
        })
      }
      this.checkCardType = !this.checkCardType
      this.searchData()
    },
    retreiveData() {
      retrieveCommonTemplate(this.formData)
        .then(res => {
          if (res.result !== undefined) {
            res.result.tplPopList.reverse()
          }
          this.originList = res.result.tplPopList
          // const d = new Date()
          // let month1 = new Date(d.getFullYear(), d.getMonth() - 6, d.getDate())

          this.originList.forEach(element => {
            if (this.showNewIconList.includes(element.tplId)) {
              element.iconnew = 'icon_new'
            }
          })

          // showTlpList 에 있는 순서대로 정렬 후 originList를 덮어씀.
          for (let key in this.showTlpList) {
            if (this.showTlpList[key].show) {
              let findObj = this.originList.find(o => o.tplId === key)
              if (findObj) {
                this.newList.push(findObj)
              }
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

          let spaceCount = 0
          for (let i = 0; i < showTlpListKey.length; i++) {
            if (this.showTlpList[showTlpListKey[i]].show) {
              spaceCount++
            }
          }
          this.spaceBetween = spaceCount

          let page = this.formData.page
          let itemsPerPage = this.formData.size
          let totalItems = searchList.length // res.result.totalSize

          let start = (page - 1) * itemsPerPage
          let end = res.result.totalSize

          if (itemsPerPage < totalItems) {
            end = itemsPerPage * page
            if (end > totalItems) {
              end = totalItems
            }
          }

          // this.list = res.result.tplPopList.slice(start, end)
          // this.totalcount = res.result.totalSize
          this.list = searchList.slice(start, end)
          this.totalcount = totalItems
          this.selectedTemplate = this.list[0]

          this.show_loading = false
        })
        .catch(err => {
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

      let spaceCount = 0
      for (let i = 0; i < showTlpListKey.length; i++) {
        if (this.showTlpList[showTlpListKey[i]].show) {
          spaceCount++
        }
      }
      this.spaceBetween = spaceCount

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
    // retreiveData2() {
    //   retrieveCommonTemplate(this.formData, this.searchParam)
    //     .then(res => {
    //       this.list = res.result.tplPopList.slice(1, 10)
    //       this.totalcount = res.result.totalSize
    //       this.selectedTemplate = this.list[0]
    //     })
    //     .catch(err => {
    //       this.$alertMsg(err.desc)
    //     })
    // },
    selectTemplate(row) {
      this.selectedTemplate = row
    },
    changePage(page) {
      this.formData.page = page
    },
    toUppsercaseAfterWhtespace(str) {
      if (str) {
        return jglib.toUppsercaseAfterWhtespace(str)
      }
      return null
    },
    close() {
      this.$emit('update:commTplViewVisible', false)
    // },
    // changeShowType(type) {
    //   this.showType = type
    }
  }
}
</script>
<style>
.emulator_area {
  width: 340px;
  border: 1px solid #cccccc !important;
  border-radius: 16px !important;
  padding: 9px !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #f6f6f6 !important;
}
.emulator_area .emulator_cont {
  position: relative;
  border: 1px solid #cccccc;
  border-radius: 12px !important;
  background: #fff;
  overflow: hidden;
  padding: 0;
  min-height: 492px !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
