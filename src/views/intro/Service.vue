<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="rcs_container">
    <article id="content" class="content intro">
      <div class="intro_breadcrumb">
        <breadcrumb :depth1MenuId="'M0100'" :depth2MenuId="'M0101'"/>
      </div>
      <div class="top_title_area">
        <h1 class="h1_title mar_b25">브랜드 홈</h1>
        <span class="h3_desc fs20">기업과 고객 간 연결을 위한 브랜드 정보를 제공합니다.</span>
      </div>
      <div class="rsc_service_info">
        <carousel v-bind="options" class="brand_slide">
          <div class="item">
            <section class="section_promotion">
              <div class="inner">
                <div class="title_wrap mar_b40">
                  <h3 class="h3_title mar_b15">브랜드 정보</h3>
                  <span class="h4_desc fs16 Regular">
                    로고, 백그라운드 이미지 설정, 소개글 등을 통해
                    <br>브랜드를 홍보할 수 있습니다.
                  </span>
                </div>
              </div>
            </section>
            <section class="section_menu_setting">
              <div class="cont_block_bundle bg_gray">
                <div class="inner">
                  <div class="img_intro01"></div>
                  <div class="text_area">
                    <div class="title_wrap mar_b20">
                      <h3 class="h3_title mar_b15">메뉴 노출 설정</h3>
                      <span class="h4_desc fs16 Regular">
                        대화방 이동, 전화 연결 등 기본 사용성 및 브랜드가 갖고 있는 웹 사이트와 앱 연결,
                        <br>브랜드 서비스 연결을 위한 노출 설정이 가능합니다.
                      </span>
                    </div>
                    <ul class="menu_list">
                      <li class="chat">
                        <div class="text_area">
                          <h4 class="h4_title">Chat</h4>
                          <span class="h4_desc">대화방으로 이동</span>
                        </div>
                      </li>
                      <li class="call">
                        <div class="text_area">
                          <h4 class="h4_title">Call</h4>
                          <span class="h4_desc">전화 연결로 이동</span>
                        </div>
                      </li>
                      <li class="web">
                        <div class="text_area">
                          <h4 class="h4_title">Web</h4>
                          <span class="h4_desc">대표 웹사이트로 이동</span>
                        </div>
                      </li>
                      <li class="store">
                        <div class="text_area">
                          <h4 class="h4_title">Store</h4>
                          <span class="h4_desc">웹사이트로 이동(쇼핑몰)</span>
                        </div>
                      </li>
                      <li class="order">
                        <div class="text_area">
                          <h4 class="h4_title">Order</h4>
                          <span class="h4_desc">웹사이트로 이동(주문/신청)</span>
                        </div>
                      </li>
                      <li class="buy">
                        <div class="text_area">
                          <h4 class="h4_title">Buy</h4>
                          <span class="h4_desc">웹사이트로 이동(구매/결제)</span>
                        </div>
                      </li>
                      <li class="ticket">
                        <div class="text_area">
                          <h4 class="h4_title">ticket</h4>
                          <span class="h4_desc">웹사이트로 이동(예매/예약)</span>
                        </div>
                      </li>
                      <li class="moreinfo">
                        <div class="text_area">
                          <h4 class="h4_title">Moreinfo</h4>
                          <span class="h4_desc">상세 안내 페이지로 이동</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div class="item news">
            <section class="section_promotion">
              <div class="inner">
                <div class="title_wrap mar_b40">
                  <h3 class="h3_title mar_b15">브랜드 소식</h3>
                  <span class="h4_desc fs16 Regular">
                    신상품, 이벤트, 공지사항 등을
                    <br>다양한 레이아웃으로 컨텐츠를 생성하여 홍보할 수 있습니다.
                  </span>
                </div>
              </div>
            </section>
            <section class="section_menu_setting">
              <div class="cont_block_bundle bg_gray">
                <div class="inner">
                  <div class="img_intro01"></div>
                  <div class="text_area">
                    <div class="title_wrap mar_b20">
                      <h3 class="h3_title mar_b15">소식 유형</h3>
                      <span class="h4_desc fs16 Regular">
                        다양한 등록 타입을 통해, 소식 알림 효과를 극대화할 수 있습니다.
                      </span>
                    </div>
                    <ul class="menu_list">
                      <li class="gallery">
                        <div class="text_area">
                          <h4 class="h4_title">Gallery</h4>
                          <span class="h4_desc">이미지를 강조하는 타입</span>
                        </div>
                      </li>
                      <li class="sharing">
                        <div class="text_area">
                          <h4 class="h4_title">Sharing</h4>
                          <span class="h4_desc">SNS나 외부 페이지 연결 타입</span>
                        </div>
                      </li>
                      <li class="slide">
                        <div class="text_area">
                          <h4 class="h4_title">Slide view</h4>
                          <span class="h4_desc">다수의 슬라이드 구성 타입</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </carousel>

        <section class="text_mesaage">
          <div class="title_wrap message center mar_t40">
            <h4 class="h4_title mar_b5">등록 방법에 따라 설정</h4>
            <h1 class="h1_title fs42">브랜드 소식 유형</h1>
          </div>
          <div class="inner brand_news">
            <div class="cont_flex_bundle br_bottom">
              <div class="cont_block_bundle center">
                <div class="title_wrap">
                  <h3 class="h3_title mar_b8">Gallery type</h3>
                  <span class="h4_desc fs16">
                    이미지를 강조하여 서비스를 소개할 수 있습니다.
                    <br>이미지는 최대 10장 까지 등록 가능 합니다.
                  </span>
                </div>
                <div class="img_intro12 mar_t25"></div>
              </div>
              <div class="cont_block_bundle center">
                <div class="title_wrap">
                  <h3 class="h3_title mar_b8">Sharing type</h3>
                  <span class="h4_desc fs16">
                    SNS에 업로드한 컨텐츠를 연결하여
                    <br>소식을 업로드 할 수 있습니다.
                  </span>
                </div>
                <div class="img_intro12_2 mar_t25"></div>
              </div>
            </div>
            <div class="cont_flex_bundle pad_t60 pad_b20">
              <div class="title_wrap mar_l70">
                <h3 class="h3_title mar_b8">Slide view type</h3>
                <span class="h4_desc fs16">
                  최대 10장의 슬라이드를 1개의 소식으로
                  <br>등록할 수 있는 유형입니다.
                  <br>각 슬라이드는 이미지 강조형과
                  <br>URL연결형으로 구분하여 등록 합니다.
                </span>
              </div>
              <div class="image_wrap">
                <div class="img_intro12_3"></div>
              </div>
            </div>
          </div>

          <div class="tab_wrap">
            <ul class="tab_nav">
              <li :class="{active : menuNm === 'message'}">
                <a href="javascript:void(0);" @click="selectMenu('message')">메시지</a>
              </li>
              <li :class="{active : menuNm === 'twoWay'}">
                <a href="javascript:void(0);" @click="selectMenu('twoWay')">양방향 대화</a>
              </li>
            </ul>
            <div class="tab_container">
              <div :class="menuNm === 'message' ? 'tab_content active' : 'tab_content'">
                <section class="text_mesaage">
                  <div class="top_title_area mar_t100">
                    <h1 class="h1_title mar_b15">메시지</h1>
                    <span class="h3_desc fs20">더 길어지고, 더 풍부해진 사용자 메시지 경험을 제공 합니다.</span>
                  </div>
                  <div class="inner">
                    <div class="cont_flex_bundle">
                      <div class="cont_block_bundle bg_gray center">
                        <div class="title_wrap message">
                          <h4 class="h4_title mar_b5">단문형 메시지</h4>
                          <h1 class="h1_title fs42 mar_b15">RCS SMS</h1>
                          <span class="h4_desc fs16">액션버튼 1개를 추가적으로 사용할 수 있습니다.</span>
                        </div>
                        <div class="img_intro02 mar_t40"></div>
                      </div>
                      <div class="cont_block_bundle bg_gray center">
                        <div class="title_wrap">
                          <h4 class="h4_title message mar_b5">장문형 메시지</h4>
                          <h1 class="h1_title fs42 mar_b15">RCS LMS</h1>
                          <span class="h4_desc fs16">액션버튼 3개를 추가적으로 사용할 수 있습니다.</span>
                        </div>
                        <div class="img_intro03 mar_t40"></div>
                      </div>
                    </div>
                  </div>
                </section>
                <section class="message">
                  <div class="inner">
                    <div class="cont_block_bundle bg_gray">
                      <div class="title_wrap message center">
                        <h4 class="h4_title mar_b5">미디어가 포함된 장문형 메시지</h4>
                        <h1 class="h1_title fs42">RCS MMS</h1>
                      </div>

                      <!-- S :  신규 메시지 8종 202207 남미라-->
                      <div class="cont_flex_bundle pad_b60 mar_t20 br_bottom">
                        <div style="padding-right:40px;"><img src="@/assets/images/intro/new_mms_01.png"></div>
                        <div class="title_wrap" style="width:330px;">
                          <h3 class="h3_title mar_b15">이미지 & 타이틀 강조형</h3>
                          <span class="h4_desc fs16">
                            세로형, 가로형의 미디어를<br>
                            사용할 수 있습니다.<br>
                            제목과 함께 간단한 텍스트로<br>
                            풍부한 메시지를 구성할 수 있습니다.
                          </span>
                        </div>
                      </div>

                      <div class="cont_flex_bundle pad_b60 mar_t20 br_bottom">
                        <div class="title_wrap" style="width:300px;">
                          <h3 class="h3_title mar_b15">이미지 강조형</h3>
                          <span class="h4_desc fs16">
                          세로형, 가로형의 미디어를<br>
                          사용할 수 있습니다.<br>
                          제목과 함께 줄글 텍스트로<br>
                          풍부한 메시지를 구성할 수 있습니다.
                          </span>
                        </div>
                        <div style="padding-right:65px;"><img src="@/assets/images/intro/new_mms_02.png"></div>
                      </div>

                      <div class="cont_flex_bundle pad_b60 mar_t20 br_bottom">
                        <div style="padding-right:40px;"><img src="@/assets/images/intro/new_mms_03.png"></div>
                        <div class="title_wrap" style="width:330px;">
                          <h3 class="h3_title mar_b15">썸네일형</h3>
                          <span class="h4_desc fs16">
                            썸네일 이미지와 관련 설명을<br>
                            입력하여 상품이나 서비스를<br>효과적으로 전달할 수 있습니다.
                          </span>
                        </div>
                      </div>

                      <div class="cont_flex_bundle pad_b60 mar_t20 br_bottom">
                        <div class="title_wrap" style="width:300px;">
                          <h3 class="h3_title mar_b15">SNS형</h3>
                          <span class="h4_desc fs16">
                          제목과 줄글 텍스트를 입력할 수 있습니다.<br>
                          버튼과 이미지를 활용하여,<br>
                          SNS 느낌의 메시지를<br>
                          작성해 보세요.
                          </span>
                        </div>
                        <div style="padding-right:65px;"><img src="@/assets/images/intro/new_mms_04.png"></div>
                      </div>

                      <!-- E :  신규 메시지 8종 202207 남미라-->
                      <div class="cont_flex_bundle pad_b60 mar_t20 br_bottom">
                        <div class="img_intro04"></div>
                        <div class="title_wrap">
                          <h3 class="h3_title mar_b15">Standalone</h3>
                          <span class="h4_desc fs16">
                            미디어를 위 또는 좌/우에 배치하여
                            <br>풍부한 메시지로 구성해보세요.
                          </span>
                        </div>
                      </div>
                      <div class="cont_flex_bundle pad_t60">
                        <div class="title_wrap">
                          <h3 class="h3_title mar_b8">Carousel</h3>
                          <span class="h4_desc fs16">
                            여러 개의 미디어를 한번에 발송하거나,
                            <br>컨텐츠 내용의 구분이 필요할 때 사용할 수 있습니다.
                          </span>
                        </div>
                        <div class="img_intro05"></div>
                      </div>
                      <div class="cont_flex_bundle">
                        <div class="img_intro06"></div>
                      </div>
                      <div class="cont_flex_bundle">
                        <div class="img_intro07"></div>
                      </div>
                    </div>
                  </div>
                </section>

                <section class="text_mesaage" id="themeIntro">
                  <div class="inner">
                    <div class="top_title_area mar_t100">
                      <h1 class="h1_title mar_b15">RCS 템플릿</h1>
                      <span class="h3_desc fs20">보다 저렴한 가격으로 메시지 템플릿을 만들 수 있습니다.</span>
                    </div>
                  </div>
                  <div class="inner">
                    <div class="cont_flex_bundle">
                      <div class="cont_block_bundle bg_gray center" style="height:608px;">
                        <div class="title_wrap message">

                          <p class="intro-txt-bluebox po01">정보성만 이용 가능</p>
                          <h1 class="h1_title fs42 mar_b15">텍스트 템플릿</h1>
                          <span class="h4_desc fs16">텍스트 템플릿은 정보성 메시지에 한해 발송 가능</span>
                        </div>
                        <div class="img_intro11-2 mar_t40"></div>
                      </div>
                      <div class="cont_block_bundle bg_gray center" style="height:608px;">
                        <div class="title_wrap">

                          <p class="intro-txt-bluebox po01">광고성 이용 가능</p>
                          <h1 class="h1_title fs42 mar_b15">이미지 템플릿</h1>
                          <span class="h4_desc fs16">자주 이용하는 광고성메시지 혹은 정보성 메시지 발송 가능</span>
                        </div>
                        <div class="img_intro12-2 mar_t40"  style="height:404px;margin-top:32px ;"></div>
                      </div>
                    </div>
                  </div>
                </section>

                <section class="message" id="textThemeIntro">
                  <div class="inner">
                    <div class="cont_block_bundle bg_gray">
                      <div class="title_wrap message center">
                        <h1 class="h1_title fs42 mar_b20">텍스트 템플릿</h1>
                        <span class="h4_desc fs16">RCS 텍스트 템플릿은 타이틀 자유형과 타이틀 선택형 템플릿을 제공합니다.</span>
                      </div>
                      <div class="" style="width:100%; margin:40px auto 20px; padding-left:70px;">
                        <span class="h4_desc fs16">
                          <strong>타이틀 자유형</strong> : 제목을 직접 입력할 수 있고, 제목에 변수를 사용할 수 있습니다. <br>
                          <strong>타이틀 선택형</strong> : 유형을 선택하여 본문 텍스트를 구성할 수 있습니다.
                        </span>
                      </div>
                      <div style="width:100%;border-bottom:1px solid #e5e5e5;padding-bottom:50px;">
                        <img src="@/assets/images/intro/tmpl_icon.png" style="padding-left:70px;">
                        <ul class="expTmplt" style="margin-left:70px;">
                          <li><span class="ssnum01">1</span>타이틀 자유형 테마는 제목을 직접 입력 할 수 있으며, 제목 우측 텍스트는 변수를 입력할 수 있습니다.</li>
                          <li><span class="ssnum01">2</span>제목을 강조할 수 있는 두꺼운 라인이 표시 됩니다.</li>
                          <li><span class="ssnum01">3</span>타이틀 선택형의 제목은 유형을 선택하면 자동으로 표시 됩니다.</li>
                        </ul>
                      </div>
                      <div class="cont_flex_bundle br_bottom intro_tmplt_img">
                        <div><img src="@/assets/images/intro/tmpl_description.png"></div>
                        <div class="title_wrap left">
                          <h3 class="h3_title mar_b8">서술(description) 템플릿</h3>
                          <span class="h4_desc fs16">
                            목적에 맞는 정보성 메시지를
                            <br>사전에 등록 및 승인을 받아 발송할 수 있습니다.
                          </span>
                        </div>
                      </div>
                      <div class="cont_flex_bundle br_bottom intro_tmplt_img">
                        <div><img src="@/assets/images/intro/tmpl_cell.png"></div>
                        <div class="title_wrap left">
                          <h3 class="h3_title mar_b8">스타일(cell) 템플릿</h3>
                          <span class="h4_desc fs16">
                             목적에 맞는 정보성 메시지를
                            <br>사전에 등록 및 승인을 받아 발송할 수 있습니다.
                          </span>
                        </div>
                      </div>
                      <div class="cont_flex_bundle  intro_tmplt_img">
                        <div><img src="@/assets/images/intro/tmpl_free.png"></div>
                        <div class="title_wrap left">
                          <h3 class="h3_title mar_b8">기본(free) 템플릿</h3>
                          <span class="h4_desc fs16">
                              목적에 맞는 정보성 메시지를
                              <br>사전 등록이나 승인 없이 발송할 수 있습니다.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <!-- 이미지 템플릿 추가 -->
                <section class="message" id="imageThemeIntro" style="padding-top:40px;">
                  <div class="inner" style="padding:0; margin:0 auto;">
                  <div class="cont_block_bundle bg_gray" style="padding:0; margin:0 auto;">

                  <div class="cont_flex_bundle  intro_tmplt_img" style="padding:0; margin:0; padding-bottom:0 !important;">
                        <div><img src="@/assets/images/intro/service_imagethem_03.jpg" style="padding-bottom:0 !important;"></div>
                        <div class="title_wrap left">
                         <p class="intro-txt-bluebox po02">광고성 이용 가능</p>
                          <h3 class="h3_title mar_b8">이미지 템플릿</h3>
                          <span class="h4_desc fs16" style="padding-top:10px;">
                            기존 RCS MMS보다 저렴한 가격으로<br>
                            이용할 수 있습니다.<br><br>
                            자주 이용하는 광고 혹은 정보성 메시지를 <br>
                            사전에 등록 후 간편하게 발송해 보세요.<br><br>
                            총 6가지 스타일을 사용하실 수 있고,<br>
                            (RCS MMS 이미지 & 타이틀 강조형, 이미지 강조형,<br>
                            썸네일형, SNS형과 동일)<br>
                            콘텐츠에 따라 메시지 커스터마이징도 가능합니다.
                          </span>
                        </div>
                      </div>
                      </div>
                  </div>
                </section>
                <section class="action_button">
                  <div class="inner">
                    <div class="cont_block_bundle bg_gray">
                      <div class="title_wrap message center">
                        <h1 class="h1_title fs42 mar_b20">액션 버튼</h1>
                        <span class="h4_desc fs16">버튼에 다양한 기능을 담아서 메시지를 보내세요.</span>
                      </div>
                      <table class="tbl_row_type">
                        <caption>
                          <strong>액션버튼</strong>
                          <p>URL 연결, 지도/위치, 일정 등록, 복사하기, 대화방열기, 전화 연결</p>
                        </caption>
                        <colgroup>
                          <col style="width:243px">
                          <col style="width:auto">
                        </colgroup>
                        <tbody>
                          <tr>
                            <th>URL 연결</th>
                            <td>Web page 또는 App으로 이동할 수 있습니다.</td>
                          </tr>
                          <tr>
                            <th>지도/위치</th>
                            <td>미리 지정된 지도의 위치를 보여주거나 사용자의 현재 위치를 서버로 전송할 수 있습니다.</td>
                          </tr>
                          <tr>
                            <th>일정 등록</th>
                            <td>사용자의 캘린더에 특정 일정을 등록할 수 있습니다.</td>
                          </tr>
                          <tr>
                            <th>복사하기</th>
                            <td>특정 문구를 사용자 단말이 자동 복사할 수 있게 합니다.</td>
                          </tr>
                          <tr>
                            <th>대화방열기</th>
                            <td>다른 번호로 메시지를 보낼 수 있도록 대화방을 엽니다.</td>
                          </tr>
                          <tr>
                            <th>전화 연결</th>
                            <td>특정 전화번호로 전화를 걸 수 있습니다.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
              <div :class="menuNm === 'twoWay' ? 'tab_content active' : 'tab_content'">
                <section class="text_mesaage">
                  <div class="top_title_area mar_t100">
                    <h1 class="h1_title mar_b15">양방향 대화</h1>
                    <span class="h3_desc fs20">고객과의 자연스러운 대화를 유도합니다.</span>
                  </div>
                </section>
                <section class="message">
                  <div class="inner">
                    <div class="cont_block_bundle bg_gray">
                      <div class="title_wrap message center">
                        <h1 class="h1_title fs42">양방향 메시지</h1>
                      </div>
                      <div class="cont_flex_bundle mar_t20">
                        <div class="title_wrap">
                          <h3 class="h3_title mar_b15">양방향 메시지</h3>
                          <span class="h4_desc fs16">
                            단말의 사용자의 요청에 대해 기업에서
                            <br> 실시간으로 응답할 수 있는
                            <br>양방향 커뮤니케이션을 제공합니다.
                            <br>채팅창에 사용자가 직접 입력하여
                            <br>응답할 수도 있으며,
                            <br>기업이 미리 설정한 질문에 대해서만
                            <br>응답할 수 있도록 설정할 수 도 있습니다.
                          </span>
                          <h4 class="h4_title fs18 mar_t30 mar_b10">활용 예시</h4>
                          <div class="ico_dot">통신요금 조회</div>
                          <div class="ico_dot">쇼핑</div>
                          <div class="ico_dot">배송조회</div>
                          <div class="ico_dot">숙박 예약</div>
                          <div class="ico_dot">항공기 예약 조회</div>
                          <div class="ico_dot">세탁물 주문</div>
                          <div class="ico_dot">음식 주문</div>
                        </div>
                        <div class="img_intro04_2"></div>
                      </div>
                    </div>
                  </div>
                </section>
                <section class="message">
                  <div class="inner">
                    <div class="cont_block_bundle bg_gray">
                      <div class="title_wrap message center">
                        <h4 class="h4_title mar_b5">고객 안내 주요 질문 설정</h4>
                        <h1 class="h1_title fs42">대화방 메뉴</h1>
                      </div>
                      <div class="cont_flex_bundle mar_t20">
                        <div class="img_intro04_1"></div>
                        <div class="title_wrap">
                          <h3 class="h3_title mar_b15">대화방 메뉴</h3>
                          <span class="h4_desc fs16">
                            최대 5개의 대화방 메뉴를 설정할 수 있으며,
                            <br>각 대화방 메뉴 별로 하위에 5개의 메뉴를 추가로
                            <br>설정할 수 있습니다.
                          </span>
                          <h4 class="h4_title fs18 mar_t30 mar_b10">활용 예시</h4>
                          <div class="ico_dot">브랜드 홈 페이지 연결</div>
                          <div class="ico_dot">브랜드 상품, 할인 정보</div>
                          <div class="ico_dot">자주 묻는 Q&amp;A</div>
                          <div class="ico_dot">App 다운로드, App 바로가기</div>
                          <div class="ico_dot">채팅/챗봇상담 연결</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section class="message">
                  <div class="inner">
                    <div class="cont_block_bundle bg_gray">
                      <div class="title_wrap message center">
                        <h4 class="h4_title mar_b5">고객 응답 메시지 사전 작성</h4>
                        <h1 class="h1_title fs42">자동응답 메시지</h1>
                      </div>
                      <div class="cont_flex_bundle pad_b60 br_bottom">
                        <div class="title_wrap">
                          <h3 class="h3_title mar_b8">자동응답 메시지</h3>
                          <span class="h4_desc fs16 ls-1">
                            사전에 메시지 카드를 작성하고,
                            <br>해당 메시지 카드를 대화방메뉴의
                            <br>응답 메시지로 설정할 수 있습니다.
                            <br>고객은 선택한 메뉴에 대해 사전에 등록한
                            <br>메시지 카드로 실시간 응대를 받을 수 있습니다.
                          </span>
                        </div>
                        <div class="img_intro05_1"></div>
                      </div>
                      <div class="cont_flex_bundle pad_b20 pad_t60 pad_l0 center">
                        <div class="img_intro07_1"></div>
                        <div class="title_wrap left pad_b235">
                          <h3 class="h3_title mar_b8">칩 리스트</h3>
                          <span class="h4_desc fs16">
                            메시지에 포함되는 주요 메뉴로,
                            <br>최대 11개 까지 설정할 수 있습니다.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
import Breadcrumb from '@/components/global/Breadcrumb'
import carousel from 'vue-owl-carousel'

export default {
  name: 'service',
  components: {
    Breadcrumb,
    carousel
  },
  data() {
    return {
      activeIndex: 0,
      plugin: null,
      options: {
        autoplay: false,
        nav: true,
        items: 1,
        center: false,
        dots: true,
        loop: true
      },
      menuNm: 'message'
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to && to.hash && to.hash.startsWith('#')) {
      setTimeout(() => {
        document.getElementById(to.hash.split('#')[1]).scrollIntoView()
      }, 500)
    }
    next()
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    selectMenu(menuNm) {
      this.menuNm = menuNm
    }
  }
}
</script>

<style lang="less" scoped></style>
