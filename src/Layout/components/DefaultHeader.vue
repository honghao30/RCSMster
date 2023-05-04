<template>	
	<header class="header">
		<div class="inner">
			<div class="header__logo">
				<h1><router-link to="/"><span class="blind">RCS Biz Center</span></router-link></h1>
			</div>
			<div class="header__menu">
				<nav class="nav">
					<ul>
						<li v-for="(item, i) in navMenu" :key="i" class="nav-item">
							<router-link :to="item.to">{{ item.title }}</router-link>
							<ul class="nav-sub" v-if="item.children">
								<li v-for="(subItem, i) in item.children" :key="i">
									<router-link :to="subItem.to">{{ subItem.title }}</router-link>
								</li>
							</ul>
						</li>
					</ul>
				</nav>
				<div class="header__util">
					<router-link to="/dashboard" class="link-dashboard">기업 대시보드</router-link>
					<div class="user">
						<a role="button"><span class="name">홍길동</span>님</a>
						<ul class="user-menu">
							<li><router-link to="/">내 계정관리</router-link></li>
							<li><a role="button">로그아웃</a></li>
						</ul>
					</div>
					<a role="button" class="alarm">
						<span class="blind">알람</span>
						<span class="alarm__num">9+</span>
					</a>
				</div>
			</div>
		</div>
	</header>
</template>
<script>
import navMenu from './nav'

export default {
    name: 'DefaultHeader',
	data() {
		return {
			navMenu
		}
	}
}
</script>

<style>

</style>