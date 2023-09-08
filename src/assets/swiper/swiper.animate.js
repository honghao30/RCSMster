﻿function swiperAnimateCache(a) {
  let i, j, allBoxes
  for(j = 0; j < a.slides.length; j++)
    for(allBoxes = a.slides[j].querySelectorAll('.ani'), i = 0; i < allBoxes.length; i++)
     allBoxes[i].attributes['style'] ? allBoxes[i].setAttribute("swiper-animate-style-cache",
     allBoxes[i].attributes["style"].value) : allBoxes[i].setAttribute('swiper-animate-style-cache', ''),
     allBoxes[i].style.visibility = 'hidden'
}
function swiperAnimate(a) {
  let i, j, effect, style, duration, delay
  clearSwiperAnimate(a)
  var b = a.slides[a.activeIndex].querySelectorAll('.ani')
  for(i = 0; i < b.length; i++) b[i].style.visibility = 'visible', effect = b[i].attributes['swiper-animate-effect'] ? b[i].attributes['swiper-animate-effect'].value : 'swiper-animate-effect', b[i].className = b[i].className + "  " + effect + " " + "animated", style = b[i].attributes["style"].value, duration = b[i].attributes["swiper-animate-duration"] ? b[i].attributes["swiper-animate-duration"].value : "", duration && (style = style + "animation-duration:" + duration + ";-webkit-animation-duration:" + duration + ";"), delay = b[i].attributes["swiper-animate-delay"] ? b[i].attributes["swiper-animate-delay"].value : "", delay && (style = style + 'animation-delay:' + delay + ";-webkit-animation-delay:" + delay + ';'), b[i].setAttribute('style', style)
}
function clearSwiperAnimate(a) {
  let i, j, allBoxes, effect
  for(j = 0; j < a.slides.length; j++)
    for(allBoxes = a.slides[j].querySelectorAll('.ani'), i = 0; i < allBoxes.length; i++)
      allBoxes[i].attributes['swiper-animate-style-cache'] && allBoxes[i].setAttribute('style',
      allBoxes[i].attributes['swiper-animate-style-cache'].value),
      allBoxes[i].style.visibility = 'hidden', allBoxes[i].className = allBoxes[i].className.replace('animated', ' '), allBoxes[i].attributes['swiper-animate-effect'] && (effect = allBoxes[i].attributes['swiper-animate-effect'].value, 
      allBoxes[i].className = allBoxes[i].className.replace(effect, '')
  )}
export default {
  swiperAnimateCache,
  swiperAnimate,
  clearSwiperAnimate
}
