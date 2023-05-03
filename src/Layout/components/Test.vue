<template>
  <div style="padding: 100px;">
    <!-- MAIN EMULATOR -->
    <div class="new-emu_wrapper">
      <!-- TOP MENU -->
      <div class="new-emu_top" :class="{ 'new-emu_top_open' : isProfileOpen }">
        <div class="new-emu_top_arrow">
          <button @click="isProfileOpen = !isProfileOpen"><img src="@/assets/images/icons/ico-emu-chevron-up.svg"/></button>
        </div>
        <div class="new-emu_top_profile new-emu_top_profile2">
          <div class="new-emu_top_icon">
            <img src="@/assets/images/common/emul_img_02.png"/>
          </div>
          <div class="new-emu_top_info">
            <p>대화방명</p>
            <span>발신번호</span>
          </div>
        </div>
        <div class="new-emu_top_call">
          <button><img src="@/assets/images/icons/ico-emu-call.svg"/></button>
        </div>
      </div>
      <!-- MID CONTENT -->
      <div class="new-emu_mid">
        <div class="new-emu_mid_date">12월 26일 월요일</div>
        <div class="new-emu_mid_sender">
          <p>RCS Biz Center 가입을 환영합니다.</p>
          <span class="new-emu_mid_date">오전 7:38</span>
        </div>
        <div class="new-emu_mid_reciever">
          <p>RCS가 무엇인가요? 누구나 사용할 수 있나요?</p>
          <span class="new-emu_mid_date">오전 7:40</span>
        </div>
        <div class="new-emu_mid_sender">
          <p>RCS Biz Center 가입을 환영합니다.</p>
          <span class="new-emu_mid_date">오전 7:38</span>
        </div>
        <div class="new-emu_mid_card new-emu_mid_card_noimg">
          <div class="new-emu_mid_card_text">
            <span>Card - Text only</span>
            <div>
              <p>대한민국의 국민이 되는 요건은 법률로 정한다. 국군은 국가의 안전보장과 국토방위의 신성한 의무를 수행함을 사명으로 하며, 그 정치적 중립성은 준수된다.</p>
            </div>
            <button>Button 1</button>
            <button>Button 2</button>
            <button>Button 3</button>
          </div>
        </div>
        <div class="new-emu_mid_card new-emu_mid_card_tall">
          <div class="new-emu_mid_card_img">
            <img src="@/assets/images/dummy/testimg4.jpg"/>
          </div>
          <div class="new-emu_mid_card_text">
            <span>Card Tall</span>
            <div>
              <p>대한민국의 국민이 되는 요건은 법률로 정한다. 국군은 국가의 안전보장과 국토방위의 신성한 의무를 수행함을 사명으로 하며, 그 정치적 중립성은 준수된다.</p>
            </div>
            <button>Button 1</button>
            <button>Button 2</button>
            <button>Button 3</button>
          </div>
        </div>
        <div class="new-emu_mid_card new-emu_mid_card_med">
          <div class="new-emu_mid_card_img">
            <img src="@/assets/images/dummy/testimg5.jpg"/>
          </div>
          <div class="new-emu_mid_card_text">
            <span>Card Medium</span>
            <div>
              <p>Lorem ipsum dolar sit amet.</p>
              <p>Lorem ipsum dolar sit amet.</p>
              <p>Lorem ipsum dolar sit amet.</p>
            </div>
            <button>Button 1</button>
            <button>Button 1</button>
            <button>Button 1</button>
          </div>
        </div>
        <swiper class="new-emu_mid_carousel" :slides-per-view="1.6" :space-between="4">
          <swiper-slide class="new-emu_mid_card">
            <div class="new-emu_mid_card_img">
              <img src="@/assets/images/dummy/testimg1.jpg"/>
            </div>
            <div class="new-emu_mid_card_text">
              <span>Card Title 1</span>
              <div>
                <p>Lorem ipsum dolar sit amet.</p>
              </div>
              <button>Button</button>
            </div>
          </swiper-slide>
          <swiper-slide class="new-emu_mid_card">
            <div class="new-emu_mid_card_img">
              <img src="@/assets/images/dummy/testimg2.jpg"/>
            </div>
            <div class="new-emu_mid_card_text">
              <span>Card Title 2</span>
              <div>
                <p>Lorem ipsum dolar sit amet. Lorem ipsum dolar sit amet.</p>
              </div>
              <button>Button</button>
            </div>
          </swiper-slide>
          <swiper-slide class="new-emu_mid_card">
            <div class="new-emu_mid_card_img">
              <img src="@/assets/images/dummy/testimg3.jpg"/>
            </div>
            <div class="new-emu_mid_card_text">
              <span>Card Title 3</span>
              <div>
                <p>Lorem ipsum dolar sit amet.</p>
              </div>
              <button>Button</button>
            </div>
          </swiper-slide>
        </swiper>
        <swiper class="new-emu_mid_carousel" :slides-per-view="2" :space-between="4">
          <swiper-slide class="new-emu_mid_card">
            <div class="new-emu_mid_card_img">
              <img src="@/assets/images/dummy/testimg1.jpg"/>
            </div>
            <div class="new-emu_mid_card_text">
              <span>Card Title 1</span>
              <div>
                <p>Lorem ipsum dolar sit amet.</p>
              </div>
              <button>Button</button>
            </div>
          </swiper-slide>
          <swiper-slide class="new-emu_mid_card">
            <div class="new-emu_mid_card_img">
              <img src="@/assets/images/dummy/testimg2.jpg"/>
            </div>
            <div class="new-emu_mid_card_text">
              <span>Card Title 2</span>
              <div>
                <p>Lorem ipsum dolar sit amet. Lorem ipsum dolar sit amet.</p>
              </div>
              <button>Button</button>
            </div>
          </swiper-slide>
          <swiper-slide class="new-emu_mid_card">
            <div class="new-emu_mid_card_img">
              <img src="@/assets/images/dummy/testimg3.jpg"/>
            </div>
            <div class="new-emu_mid_card_text">
              <span>Card Title 3</span>
              <div>
                <p>Lorem ipsum dolar sit amet.</p>
              </div>
              <button>Button</button>
            </div>
          </swiper-slide>
        </swiper>
        <div class="new-emu_mid_reciever">
          <p>RCS가 무엇인가요? 누구나 사용할 수 있나요?</p>
          <span class="new-emu_mid_date">오전 7:40</span>
        </div>
        <div class="new-emu_mid_sender">
          <p>RCS Biz Center 가입을 환영합니다.</p>
          <span class="new-emu_mid_date">오전 7:38</span>
        </div>
        <div class="new-emu_mid_reciever">
          <p>RCS가 무엇인가요? 누구나 사용할 수 있나요?</p>
          <span class="new-emu_mid_date">오전 7:40</span>
        </div>
      </div>
      <!-- BOTTOM MENU -->
      <div class="new-emu_bot">
        <carousel class="new-emu_bot_chip" :nav="true" :dots="false" :autoWidth="true" :margin="4">
          <span v-for="chip in chipList"><a href="javascript:void(0)">{{ chip }}</a></span>
        </carousel>
        <div class="new-emu_bot_drawer" :class="{ drawerUp : isDrawerUp }">
          <button @click="isDrawerUp = !isDrawerUp"></button>
          <div v-if="newEmuBotTab == 2">
            <p><a href="javascript:void(0)" @click="newEmuBotTab = 0">RCS 메시지 샘플 2</a></p>
            <p><a href="javascript:void(0)">샘플 2 mini a</a></p>
            <p><a href="javascript:void(0)">샘플 2 mini b</a></p>
            <p><a href="javascript:void(0)">샘플 2 mini c</a></p>
          </div>
          <div v-else :class="{ 'new-emu_bot_rootmenu' : newEmuBotTab == 0 }">
            <p><a href="javascript:void(0)">RCS 메시지 샘플 1</a></p>
            <p><a href="javascript:void(0)" class="new-emu_bot_hassub" @click="newEmuBotTab = 2">RCS 메시지 샘플 2</a></p>
            <p><a href="javascript:void(0)">RCS 메시지 샘플 3</a></p>
          </div>
        </div>
        <div class="new-emu_bot_input" v-if="!isInputOff">
          <button><img src="@/assets/images/icons/ico-emu-photo.svg"/></button>
          <button><img src="@/assets/images/icons/ico-emu-camera.svg"/></button>
          <button><img src="@/assets/images/icons/ico-emu-plus.svg"/></button>
          <input type="text"/>
        </div>
        <div class="new-emu_bot_input new-emu_bot_input_off" v-else>
          <input type="text" disabled placeholder="입력할 수 없는 대화방 입니다."/>
        </div>
      </div>
    </div>
    <!-- MINI SAMPLE -->
    <div class="new-emu_wrapper">
      <div class="new-emu_top">
        <div class="new-emu_top_arrow">
          <button><img src="@/assets/images/icons/ico-emu-chevron-up.svg"/></button>
        </div>
        <div class="new-emu_top_profile new-emu_top_profile2">
          <div class="new-emu_top_icon">
            <img src="@/assets/images/common/emul_img_02.png"/>
          </div>
          <div class="new-emu_top_info">
            <p>대화방명</p>
            <span>발신번호</span>
          </div>
        </div>
        <div class="new-emu_top_call">
          <button><img src="@/assets/images/icons/ico-emu-call.svg"/></button>
        </div>
      </div>
      <div class="new-emu_mid">
        <div class="new-emu_mid_date">12월 26일 월요일</div>
        <div class="new-emu_mid_sender">
          <p>RCS Biz Center 가입을 환영합니다.</p>
          <span class="new-emu_mid_date">오전 7:38</span>
        </div>
        <div class="new-emu_mid_reciever">
          <p>RCS가 무엇인가요? 누구나 사용할 수 있나요?</p>
          <span class="new-emu_mid_date">오전 7:40</span>
        </div>
        <div class="new-emu_mid_sender">
          <p>RCS는 기업과 고객 간 연결을 위한 브랜드 정보를 문자메시지를 통해 제공할 수 있는 서비스입니다.</p>
          <span class="new-emu_mid_date">오전 7:42</span>
        </div>
      </div>
      <div class="new-emu_bot">
        <div class="new-emu_bot_input">
          <button><img src="@/assets/images/icons/ico-emu-photo.svg"/></button>
          <button><img src="@/assets/images/icons/ico-emu-camera.svg"/></button>
          <button><img src="@/assets/images/icons/ico-emu-plus.svg"/></button>
          <input type="text"/>
        </div>
      </div>
    </div>
    <!-- NEW EMULATOR -->
    <div class="emul2_wrap">
      <div class="emul2_top">top</div>
      <div class="emul2_mid">
        <!-- STANDARD TEXT -->
        <div class="emul2_mid-textmsg">
          <div>집 사진을 찍을 때면 어디선가 뽀르르 나타나는 호기심 가득한 우리집 야옹이들 덕분에 웃음이 새어나와 고마울 때가 많다.</div>
          <span class="emul2_mid-date">오전 12:45</span>
        </div>
        <!-- STANDARD TEXT - RECIEVER -->
        <div class="emul2_mid-textmsg emul2_mid-reciever">
          <div>집 사진을 찍을 때면 어디선가 뽀르르 나타나는 호기심 가득한 우리집 야옹이들 덕분에 웃음이 새어나와 고마울 때가 많다.</div>
          <span class="emul2_mid-date">오전 12:45</span>
        </div>
        <!-- CARD MESSAGE - TEXT ONLY -->
        <div class="emul2_mid-cardmsg">
          <div class="emul2_mid-card">
            <div class="emul2_mid-cardimg"></div>
            <div class="emul2_mid-cardtxt">
              <span>TEXT ONLY</span>
              <p>집 사진을 찍을 때면 어디선가 뽀르르 나타나는 호기심 가득한 우리집 야옹이들 덕분에 웃음이 새어나와 고마울 때가 많다.</p>
              <button>버튼 1</button>
              <button>버튼 2</button>
            </div>
          </div>
          <span class="emul2_mid-date">오전 12:45</span>
        </div>
        <!-- CARD MESSAGE - IMAGE, TALL -->
        <div class="emul2_mid-cardmsg emul2_mid-cardtall">
          <div class="emul2_mid-card">
            <div class="emul2_mid-cardimg">
              <img src="../../assets/images/dummy/testimg1.jpg"/>
            </div>
            <div class="emul2_mid-cardtxt">
              <span>CARD - Image, Tall</span>
              <p>집 사진을 찍을 때면 어디선가 뽀르르 나타나는 호기심 가득한 우리집 야옹이들 덕분에 웃음이 새어나와 고마울 때가 많다.</p>
              <button>버튼 1</button>
              <button>버튼 2</button>
            </div>
          </div>
          <span class="emul2_mid-date">오전 12:45</span>
        </div>
        <!-- CARD MESSAGE - IMAGE, MEDIUM -->
        <div class="emul2_mid-cardmsg emul2_mid-cardmed">
          <div class="emul2_mid-card">
            <div class="emul2_mid-cardimg">
              <img src="../../assets/images/dummy/testimg1.jpg"/>
            </div>
            <div class="emul2_mid-cardtxt">
              <span>CARD - Image, Medium</span>
              <p>집 사진을 찍을 때면 어디선가 뽀르르 나타나는 호기심 가득한 우리집 야옹이들 덕분에 웃음이 새어나와 고마울 때가 많다.</p>
              <button>버튼 1</button>
              <button>버튼 2</button>
            </div>
          </div>
          <span class="emul2_mid-date">오전 12:45</span>
        </div>
        <!-- CAROUSEL - SMALL -->
        <div class="emul2_mid-caromsg">
          <swiper class="emul2_mid-carousel" :slides-per-view="1.4" :space-between="4">
            <swiper-slide class="emul2_mid-card">
              <div class="emul2_mid-cardimg">
                <img src="../../assets/images/dummy/testimg1.jpg"/>
              </div>
              <div class="emul2_mid-cardtxt">
                <span>CARD 1</span>
                <p>집 사진을 찍을 때면 어디선가 뽀르르 나타나는 호기심 가득한 우리집 야옹이들 덕분에 웃음이 새어나와 고마울 때가 많다.</p>
                <button>버튼 1</button>
                <button>버튼 2</button>
              </div>
            </swiper-slide>
            <swiper-slide class="emul2_mid-card">
              <div class="emul2_mid-cardimg">
                <img src="../../assets/images/dummy/testimg2.jpg"/>
              </div>
              <div class="emul2_mid-cardtxt">
                <span>CARD 2</span>
                <p>집 사진을 찍을 때면 어디선가 뽀르르 나타나는 호기심 가득한 우리집 야옹이들 덕분에 웃음이 새어나와 고마울 때가 많다.</p>
                <button>버튼 1</button>
                <button>버튼 2</button>
              </div>
            </swiper-slide>
            <swiper-slide class="emul2_mid-card">
              <div class="emul2_mid-cardimg">
                <img src="../../assets/images/dummy/testimg3.jpg"/>
              </div>
              <div class="emul2_mid-cardtxt">
                <span>CARD 3</span>
                <p>집 사진을 찍을 때면 어디선가 뽀르르 나타나는 호기심 가득한 우리집 야옹이들 덕분에 웃음이 새어나와 고마울 때가 많다.</p>
                <button>버튼 1</button>
                <button>버튼 2</button>
              </div>
            </swiper-slide>
            <swiper-slide class="emul2_mid-card">
              <div class="emul2_mid-cardimg">
                <img src="../../assets/images/dummy/testimg4.jpg"/>
              </div>
              <div class="emul2_mid-cardtxt">
                <span>CARD 4</span>
                <p>집 사진을 찍을 때면 어디선가 뽀르르 나타나는 호기심 가득한 우리집 야옹이들 덕분에 웃음이 새어나와 고마울 때가 많다.</p>
                <button>버튼 1</button>
                <button>버튼 2</button>
              </div>
            </swiper-slide>
          </swiper>
          <span class="emul2_mid-date">오전 12:45</span>
        </div>
        <!-- CAROUSEL - MEDIUM -->
        <div class="emul2_mid-caromsg">
          <swiper class="emul2_mid-carousel" :slides-per-view="1.4" :space-between="4">
            <swiper-slide class="emul2_mid-card">
              <div class="emul2_mid-cardimg">
                <img src="../../assets/images/dummy/testimg1.jpg"/>
              </div>
              <div class="emul2_mid-cardtxt">
                <span>CARD 1</span>
                <p>집 사진을 찍을 때면 어디선가 뽀르르 나타나는 호기심 가득한 우리집 야옹이들 덕분에 웃음이 새어나와 고마울 때가 많다.</p>
                <button>버튼 1</button>
                <button>버튼 2</button>
              </div>
            </swiper-slide>
            <swiper-slide class="emul2_mid-card">
              <div class="emul2_mid-cardimg">
                <img src="../../assets/images/dummy/testimg2.jpg"/>
              </div>
              <div class="emul2_mid-cardtxt">
                <span>CARD 2</span>
                <p>집 사진을 찍을 때면 어디선가 뽀르르 나타나는 호기심 가득한 우리집 야옹이들 덕분에 웃음이 새어나와 고마울 때가 많다.</p>
                <button>버튼 1</button>
                <button>버튼 2</button>
              </div>
            </swiper-slide>
            <swiper-slide class="emul2_mid-card">
              <div class="emul2_mid-cardimg">
                <img src="../../assets/images/dummy/testimg3.jpg"/>
              </div>
              <div class="emul2_mid-cardtxt">
                <span>CARD 3</span>
                <p>집 사진을 찍을 때면 어디선가 뽀르르 나타나는 호기심 가득한 우리집 야옹이들 덕분에 웃음이 새어나와 고마울 때가 많다.</p>
                <button>버튼 1</button>
                <button>버튼 2</button>
              </div>
            </swiper-slide>
            <swiper-slide class="emul2_mid-card">
              <div class="emul2_mid-cardimg">
                <img src="../../assets/images/dummy/testimg4.jpg"/>
              </div>
              <div class="emul2_mid-cardtxt">
                <span>CARD 4</span>
                <p>집 사진을 찍을 때면 어디선가 뽀르르 나타나는 호기심 가득한 우리집 야옹이들 덕분에 웃음이 새어나와 고마울 때가 많다.</p>
                <button>버튼 1</button>
                <button>버튼 2</button>
              </div>
            </swiper-slide>
          </swiper>
          <span class="emul2_mid-date">오전 12:45</span>
        </div>
      </div>
      <div class="emul2_bot">
        <div>chips</div>
        <div>drawer</div>
        <div>input</div>
      </div>
    </div>
  </div>
</template>


<script>
import carousel from "vue-owl-carousel"
import { SwiperCore, Swiper, SwiperSlide } from "swiper-vue2"
import { Navigation } from "swiper"
import "swiper/swiper-bundle.css"

SwiperCore.use([ Navigation ])

export default {
  components: {
    carousel,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      newEmuBotTab: 0,
      isDrawerUp: false,
      isProfileOpen: true,
      isInputOff: true,
      inputPlaceholder: "hello",
      newEmuStartPos: 0,
      newEmuCurrIndex: 0,
      chipList: [ "가나다", "라마바", "가나다", "라마바", "가나다", "라마바", "가나다", "라마바" ],
    }
  },
  methods: {
    emul2CaroChanged(e) {
      console.log("changed!")
    }
  }
}
</script>

<style>
.emul2_wrap {
  width: 340px;
  height: 720px;
  border-radius: 16px;
  border: 8px solid black;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: #ffffff;
}
/* TOP TOP TOP */
.emul2_top {
  grid-row: 1;
  min-width: 0;
  min-height: 0;
  padding: 16px;
  background-color: pink;
}
/* MID MID MID */
.emul2_mid {
  grid-row: 2;
  min-width: 0;
  min-height: 0;
  padding: 16px 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  scrollbar-width: 0;
}
.emul2_mid::-webkit-scrollbar {
  display: none;
}
.emul2_mid-date {
  font-size: 12px;
  color: #878787;
}
.emul2_mid-card {
  border-radius: 8px;
  overflow: hidden;
  background-color: #ededed;
}
.emul2_mid-cardimg > img {
  width: 100%;
  height: 100%;
}
.emul2_mid-cardtxt {
  padding: 8px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
.emul2_mid-cardtxt > p {
  font-size: 14px;
  line-height: 1.6;
  color: #898989;
}
.emul2_mid-cardtxt > button {
  width: 100%;
  padding: 4px 0;
  font-size: 12px;
}
/* text messages */
.emul2_mid-textmsg {
  width: 100%;
  padding: 0 16px;
  display: flex;
  align-items: flex-end;
  column-gap: 8px;
}
.emul2_mid-textmsg > div {
  max-width: 220px;
  padding: 8px;
  border-radius: 8px;
  color: #111111;
  background-color: #f2f2f2;
}
.emul2_mid-reciever {
  flex-direction: row-reverse;
}
.emul2_mid-reciever > div {
  color: #ffffff;
  background-color: #3b7cf2;
}
/* card message */
.emul2_mid-cardmsg {
  width: 100%;
  padding: 0 16px;
}
.emul2_mid-cardmsg > .emul2_mid-card {
  width: 240px;
}
.emul2_mid-cardtall .emul2_mid-cardimg {
  width: 100%;
  height: 223px;
}
.emul2_mid-cardmed .emul2_mid-cardimg {
  width: 100%;
  height: 142px;
}
/* caro message */
.emul2_mid-caromsg {
  width: 100%;
}
.emul2_mid-carousel.swiper-container {
  padding: 0 16px;
  /* height: 100%; */
  /* background-color: teal; */
}
.emul2_mid-carousel .swiper-slide {
  /* height: auto; */
}
.emul2_mid-caromsg .emul2_mid-card {
  height: auto;
}
.emul2_mid-caromsg > .emul2_mid-date {
  display: block;
  margin-top: 8px;
  margin-left: 16px;
}
/* BOT BOT BOT */
.emul2_bot {
  grid-row: 3;
  min-width: 0;
  min-height: 0;
  padding: 16px;
  background-color: wheat;
}
</style>
