<template>
  <div class="header__wrap">
    <header class="header-guid">
      <div class="header__logo">
		<h1>
      <router-link to="/PubGuides/">
        RBC 퍼블리싱 가이드
      </router-link>
		</h1>
      </div>
      <ul class="header__util-menu--right">
        <li>
              <router-link 
          to="/PubGuides/" 
          class="btn__pub is-active"
              >
          개요
              </router-link>
        </li>					
        <li>
            <router-link 
                to="/RullGuide" 
                class="btn__pub"
            >
                규칙 & 설계
              </router-link>
        </li>
        <li>
            <router-link 
                to="/UiGuides" 
                class="btn__pub"
            >
                UI 가이드
              </router-link>
        </li>        	
        <li>
              <router-link
                to="/PubList"
                class="btn__pub">
                  퍼블 리스트
              </router-link>
        </li>
    </ul>
	</header>
  </div>
</template>

<script>
export default {
    name: 'DefaultHeader'
}
</script>

<style lang="scss" scoped>
@import url('@/assets/scss/common/guide.scss');
.header-guid {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background:#373d55;
        color:#fff;	
        padding:15px 24px;
        z-index: 50;
        position: relative;
        .header__logo {
            font-size:26px;
            h1 {width:300px;background: none;}
        }
        
        .header__util-menu--right {
            display: flex;
            justify-content: flex-end;
            gap:20px;
            font-size:20px;
        }
    }
</style>