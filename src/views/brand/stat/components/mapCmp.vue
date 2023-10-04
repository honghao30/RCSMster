<template>
  <div class="korea-map"  @mouseleave="mapLayerReset">
    <svg width="280" height="407" viewBox="0 0 2500 3500" ref="svgMap">
      <path  @mouseenter="mapMouseEvent('KR-11')" @mouseleave="mapMousehide('KR-11')" title="서울" ref="KR-11" id="KR-11" class="land" :class="colorType+ 'st1'" d="M785.3,819.7v-76l-16.9-25.3H722L709.3,769h-33.8l-8.4,25.3h-25.3l-25.3-8.4v39.4l59.1,70.4
        l50.7-8.4h54.4l47-67.6H785.3z"/>
      <path @mouseenter="mapMouseEvent('KR-26')" @mouseleave="mapMousehide('KR-26')" title="부산" ref="KR-26"  id="KR-26" class="land" :class="ColorType + 'st2'" d="M2004.3,2359.5l-28,48.2l-190.1,126.7v42.2l4.2,8.4h42.2l25.3-33.8h16.9v42.2l25.3,8.4l59.1-33.8
        v-25.3l42.2-8.4l64.8-118.3L2004.3,2359.5z"/>
      <path  @mouseenter="mapMouseEvent('KR-27')" @mouseleave="mapMousehide('KR-27')" title="대구" id="KR-27" ref="KR-27"  class="land" :class="ColorType + 'st3'"  d="M1604.7,2205v-59.1l25.3-16.9l16.9,16.9h50.7v-25.3l53.5-88.7l-19.7-38l16.9-42.2l-47.4-33.8h-20.2
        l-87.8,67.6h-30.5l-42.2,46.5l25.3,46.5l-25.3,118.3l25.3,33.8L1604.7,2205z"/>
      <path  @mouseenter="mapMouseEvent('KR-28')" @mouseleave="mapMousehide('KR-28')" title="인천" id="KR-28" ref="KR-28" class="land" :class="ColorType + 'st4'"  d="M608,861.9l-33.8-67.6h-50.7v50.7l29.6,25.3v21.1l-12.7,12.7v16.9l42.2,59.1l25.3-66.6V861.9z
        M455.9,887.3v28.3h-42.4V958h42.4v-28.3h42.4v-42.4H455.9z"/>
      <path  @mouseenter="mapMouseEvent('KR-29')" @mouseleave="mapMousehide('KR-29')" title="광주" id="KR-29" ref="KR-29" class="land"  :class="ColorType + 'st5'" d="M674.1,2466.8h-40.8l-8.4,25.3l-50.7-8.4l-50.7,33.8v59.1l59.1,8.4l33.8,42.2l52.8-42.2h48.6
        l4.2-50.7h-21.1L674.1,2466.8z"/>
      <path  @mouseenter="mapMouseEvent('KR-30')" @mouseleave="mapMousehide('KR-30')" title="대전" id="KR-30" ref="KR-30" class="land"  :class="ColorType + 'st6'" d="M939.5,1575l-61.2,72.5l-8.4,92.9c0,0,50.7,56.3,50.7,57.7c0,1.4,59.1,1.4,59.1,1.4l42.2-33.8
        l16.9-126.7L939.5,1575z"/>
      <path  @mouseenter="mapMouseEvent('KR-31')" @mouseleave="mapMousehide('KR-31')" title="울산" id="KR-31" ref="KR-31" class="land" :class="ColorType + 'st7'"  d="M1984.8,2129l-61.9,67.6l-37.4-4.9v88.4h31.8l149.3,136.1h19.7l16.9-16.9v-84.5l59.1-67.6v-84.5
        h-101.4L1984.8,2129z"/>
      <path  @mouseenter="mapMouseEvent('KR-41')" @mouseleave="mapMousehide('KR-41')" title="경기" id="KR-41" ref="KR-41" class="land" :class="ColorType + 'st8'"  d="M886.7,1292.7l101.4-109.8h59.1l92.9-101.4l5.8-9.7l19.5-32.5v-84.5l16.9-16.9v-33.8l-25.3-25.3
        v-8.4l42.2-16.9v-33.8l-76-8.4v-25.3l-67.6-16.9l-25.3-143.6l50.7-33.8l-8.4-50.7l-84.5-50.7l-33.8-50.7H912l-50.7-25.3l-50.7,8.4
        l-42.2-76l-31.2-15.6l-19.5,32.5v59.1h-50.7v50.7l-76,67.6h-42.2v76l-25.3,33.8v33.8h-50.7V769l50.7,25.3h50.7l33.8,67.6v51.6
        l-25.3,66.6l42.2,25.3v33.8h-33.8l-8.4-8.4h-25.3v25.3h16.9v16.9h-16.9v33.8h25.3l16.9,16.9v50.7h25.3l8.4-8.4h25.3l16.9,16.9v46.5
        H646v6.8l33.8,52.3l130.9-46.5L886.7,1292.7z M726.2,887.3l-50.7,8.4l-59.1-70.4v-39.4l25.3,8.4h25.3l8.4-25.3h33.8l12.7-50.7h46.5
        l16.9,25.3v76h42.2l-47,67.6H726.2z"/>
      <path @mouseenter="mapMouseEvent('KR-42')" @mouseleave="mapMousehide('KR-42')" title="강원" id="KR-42" ref="KR-42" class="land" :class="ColorType + 'st9'"  d="M810.7,422.7l50.7-8.4l50.7,25.3h42.2l33.8,50.7l84.5,50.7l8.4,50.7l-50.7,33.8l25.3,143.6
        l67.6,16.9v25.3l76,8.4v33.8l-42.2,16.9v8.4l25.3,25.3V938l-16.9,16.9v84.5l-19.5,32.5l28,43.5h78.8v-43.5l39.4-32.5l50.7,50.7
        l67.6-33.8l50.7,16.9l14.8,42.2h44.3l33.8,33.8l84.5,8.4l21.2,8.5l63.3,25.3l33.8-25.3l-25.3-25.3l33.8-25.3l50.7,42.2h168.9
        l84.5-50.7l-8.4-76l-126.7-160.5v-50.7l-50.7-42.2v-50.7l-236.5-287.2l-33.8-126.7l-109.8-211.2l-25.3,16.9v67.6l-42.7,59.1
        l-75.6,50.7h-177.4l-8.4-16.9h-118.3l-8.4,16.9H1005v-16.9h-67.6L920.5,296h-25.3l-8.4-8.4h-76l-25.3,33.8h-42.2l-5.8,9.7
        l31.2,15.6L810.7,422.7z"/>
      <path @mouseenter="mapMouseEvent('KR-43')" @mouseleave="mapMousehide('KR-43')" title="충청북도" id="KR-43" ref="KR-43" class="land" :class="ColorType + 'st10'"  d="M1554,1149.1l-33.8-33.8h-44.3l-14.8-42.2l-50.7-16.9l-67.6,33.8l-50.7-50.7l-39.4,32.5v43.5h-78.8
        l-28-43.5l-5.8,9.7l-92.9,101.4h-59.1l-101.4,109.8l84.5,84.5l-25.3,33.8l-16.9-16.9H912l-42.2,84.5l69.7,96.5l99.3,64l-16.9,126.7
        l42.2,25.3v84.5l33.8,33.8l139.4,15.5l87.3-125.3v-47.9h-57.7l-42.2-19.7l16.9-177.4l-33.8-8.4l-8.4-30.2l59.1-71.1l50.7-25.3
        v-16.9l143.6-76l33.8,50.7l59.1-25.3v-76l114.1-109.7l-21.2-8.5L1554,1149.1z"/>
      <path  @mouseenter="mapMouseEvent('KR-44')" @mouseleave="mapMousehide('KR-44')" title="충청남도" id="KR-44" ref="KR-44" class="land" :class="ColorType + 'st11'"  d="M1064.1,1875.6v-84.5l-42.2-25.3l-42.2,33.8c0,0-59.1,0-59.1-1.4c0-1.4-50.7-57.7-50.7-57.7
        L768.4,1601l54.9-228.1l29.6-25.3l59.1,46.5h16.9l16.9,16.9l25.3-33.8l-84.5-84.5l-76-50.7l-130.9,46.5l-21.1,21.1v67.6l-8.4,25.3
        h-33.8v-118.3l-33.8-42.2h-42.2v33.8h-33.8l-25.3-67.6h-25.3v50.7l-16.9,8.4v67.6h-16.9l-16.9-16.9v-59.1h-16.9l-59.1,101.4
        l-67.6,8.4v59.1h67.6l16.9-25.3l16.9,16.9v33.8h33.8V1411h33.8l8.4,50.7l16.9,16.9v33.8h-33.8v25.3l33.8,8.4v25.3l-25.3,8.4v33.8
        l59.1,42.2v33.8l-33.8,3.3v17.8l33.8,4.2v25.3l-42.2,33.8v59.1l67.6,16.9v109.3l126.7-58.6v-42.2l33.8-25.3H760l25.3,33.8h76
        l16.9-8.4H912l50.7,84.5h84.5l50.7-33.8L1064.1,1875.6z"/>
      <path  @mouseenter="mapMouseEvent('KR-45')" @mouseleave="mapMousehide('KR-45')" title="전라북도" id="KR-45"  class="land" ref="KR-45" :class="ColorType + 'st12'"  d="M439,2424.6h76l54.2-50.7v-50.7l55.6-16.9l50.7,67.6l67.6-8.4l25.3,67.6h171.7l47.9-42.2l76,42.2
        l42.2-84.5l-59.1-92.9l25.3-126.7l76-84.5l88.7-25.3v-94.4l-139.4-15.5l-50.7,33.8h-84.5l-50.7-84.5h-33.8l-16.9,8.4h-76
        l-25.3-33.8h-84.5l-33.8,25.3v42.2L515,1959.5v51.2l33.8,16.9l59.1-16.9v16.9l-42.2,16.9v25.3h25.3v50.7h-67.6l-109.8,76v16.9
        l25.3,16.9h84.5v33.8l-92.9,8.4l-50.7,50.7l50.7,25.3L439,2424.6z"/>
      <path  @mouseenter="mapMouseEvent('KR-46')" @mouseleave="mapMousehide('KR-46')" title="전라남도" id="KR-46" ref="KR-46" class="land" :class="ColorType + 'st13'"  d="M1064.1,2517.5v-84.5l-76-42.2l-47.9,42.2H768.5l-25.3-67.6l-67.6,8.4l-50.7-67.6l-55.6,16.9v50.7
        l-54.2,50.7h-76l-8.4-76l-50.7-25.3v59.1l-42.2,67.6v59.1l59.1,76v16.9l-33.8,76v143.6l76,59.1v84.5l-42.2,33.8v50.7l16.9,16.9
        v33.8l16.9,50.7h50.7v-50.7l84.5-67.6v-76h33.8v84.5l67.6,16.9v-50.7l67.6-76l92.9-42.2v-50.7h59.1l67.6-25.3v-8.4l-25.3-25.3v-8.4
        h76l42.2-50.7h59.1l59.1-33.8V2602L1064.1,2517.5z M717.8,2585.1h-48.6l-52.8,42.2l-33.8-42.2l-59.1-8.4v-59.1l50.7-33.8l50.7,8.4
        l8.4-25.3h40.8l26.8,67.6H722L717.8,2585.1z M151.8,2948.3v39.9h19.3v23.5l-23.2,23.2l-20.2-20.2v-18.1h-18.1v-31.4L151.8,2948.3z
        M278.5,3125.7l42.2,42.2l59.1-42.2l16.9-50.7l-42.2-33.8L278.5,3125.7z M194.1,2863.8v37.1h42.2v21.5h15.5l19-19v-14.8h-17.6
        v-24.8H194.1z M160.3,3058.1v16.9h25.3v25.3h25.8v-33.8l-31.8-31.8L160.3,3058.1z M232.4,3186.3l29.2,15.5v19.3h-25.3l-24.8-13.2
        L232.4,3186.3z M253.2,2965.2v-8.4h16.9v-25.3h-25.3v16.9h-16.9v25.3h8.4v16.9h42.2v-25.3H253.2z"/>
      <path @mouseenter="mapMouseEvent('KR-47')" @mouseleave="mapMousehide('KR-47')" title="경상북도" id="KR-47" ref="KR-47" class="land" :class="ColorType + 'st14'"  d="M2187.5,1892.5l-25.3,33.8l-25.3,8.4h-16.9l-42.2-42.2l33.8-19.7V1815l-16.9-15.5v-109.8
        l16.9-25.3l8.4-109.8l-8.4-67.6l33.8-92.9l-31.1-112.5l-2.7-107.1l-42.2-67.6l-84.5,50.7h-168.9l-50.7-42.2l-33.8,25.3l25.3,25.3
        l-33.8,25.3l-63.3-25.3l-114.1,109.7v76l-59.1,25.3l-33.8-50.7l-143.6,76v16.9l-50.7,25.3l-59.1,71.1l8.4,30.2l33.8,8.4
        l-16.9,177.4l42.2,19.7h57.7v47.9l-87.3,125.3v94.4l71.8,33.8h67.6l42.2,67.6v76h101.4l25.3-118.3l-25.3-46.5l42.2-46.5h30.5
        l87.8-67.6h20.2l47.4,33.8l-16.9,42.2l19.7,38l-53.5,88.7v25.3h-50.7L1630,2129l-25.3,16.9v59.1l33.8,16.9h177.4l42.2-33.8
        l27.4,3.5l37.4,4.9l61.9-67.6l76,33.8h101.4v-76l25.3-33.8v-84.5l25.3-11.2v-56.3L2187.5,1892.5z M2331.1,1740.4l33.8,42.2h25.3
        l22-21.1V1723h11.7v-24.8h-33.8l-20.6,42.2H2331.1z M2474.7,1774.2h-16.9v16.9h16.9V1774.2z"/>
      <path @mouseenter="mapMouseEvent('KR-48')" @mouseleave="mapMousehide('KR-48')" title="경상남도" id="KR-48" ref="KR-48" class="land" :class="ColorType + 'st15'"  d="M1976.3,2407.7l28-48.2l-87.1-79.4h-31.8v-88.4l-27.4-3.5l-42.2,33.8h-177.4l-33.8-16.9
        l-59.1,25.3l-25.3-33.8h-101.4v-76l-42.2-67.6H1309l-71.8-33.8l-88.7,25.3l-76,84.5l-25.3,126.7l59.1,92.9l-42.2,84.5v84.5
        l101.4,84.5v84.5h67.6l16.9-28.1h50.7v-39.4l33.8-33.8l16.9,16.9l-8.4,27.1v65.8l63.4,33.8l12.7-42.2h42.2v33.8h25.3v-33.8h25.3
        v42.2h33.8v-33.8l-8.4-16.9l16.9-25.3h26.8l-1.4-25.3H1554l-42.2,25.3v-42.2l59.1-8.4v-25.3h59.1l25.3,25.3l8.4-8.4l-16.9-16.9
        l-12.7-38l-21.1-12.7l16.9-33.8h25.3v33.8l67.6,50.7h63.4v-42.2L1976.3,2407.7z"/>
      <path  @mouseenter="mapMouseEvent('KR-49')" @mouseleave="mapMousehide('KR-49')" title="제주도" id="KR-49" ref="KR-49" class="land"  :class="ColorType + 'st16'"  d="M658.6,3303.1l-67.6,42.2h-76l-76,92.9l50.7,84.5h59.1l27.2-25.3h116.4l143.6-67.6l33.8-67.6
        v-16.9l-50.7-42.2H658.6z"/>
      <polygon @mouseenter="mapMouseEvent('KR-50')" @mouseleave="mapMousehide('KR-50')" title="세종시" id="KR-50" ref="KR-50" class="land" :class="ColorType + 'st17'" points="823.4,1373 768.4,1601 869.8,1740.4 878.3,1647.5 937.4,1575.7 869.8,1478.6 912,1394.1 
        852.9,1347.6 "/>
    </svg>
    <transition name="fade">
      <div class="land__info--layer" v-if="AreaInfoShow" :style="{ top: MapPosTop + 'px', left: MapPosLeft + 'px' }">
        {{ this.filteredMapChartData[0].area }} : {{ this.filteredMapChartData[0].data }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    MapChartData: {
      type: Array,
      required: true
    },
    ColorType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      AreaInfoShow: false,
      MapPosTop: '',
      MapPosLeft: ''
    }
  },
  computed: {
    colorType() {
      // ColorType에 따라 클래스를 동적으로 변경합니다.
      if (this.ColorType === 'red') {
        return 'red'
      } else if (this.ColorType === 'blue') {
        return 'blue'
      } else {
        return ''
      }
    }
  },
  mounted () {
    console.log(this.ColorType)
  },
  methods: {
    mapMouseEvent(ref) {
      this.AreaInfoShow = true
      const refElement = this.$refs[ref]
      const svgElement = this.$refs.svgMap
      if (refElement && svgElement) {
        const rect = refElement.getBoundingClientRect()
        const width = rect.width / 2
        const offsetLeft = rect.left - svgElement.getBoundingClientRect().left
        const offsetTop = rect.top - svgElement.getBoundingClientRect().top
        this.MapPosLeft = offsetLeft
        this.MapPosTop = offsetTop
        const thisArea = refElement.id || refElement.index
        this.filteredMapChartData = this.MapChartData.filter(data => data.id === thisArea || data.index === thisArea)
        console.log(this.filteredMapChartData, width)
      }
    },
    mapMousehide(ref) {
      const refElement = this.$refs[ref]
      if (refElement) {
        const rect = refElement.getBoundingClientRect()
        const mouseX = event.clientX
        const mouseY = event.clientY
        if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
          this.AreaInfoShow = false
        }
      }
    },
    mapLayerReset () {
      if (this.AreaInfoShow) {
        this.AreaInfoShow = false
      }
    }
  }
}
</script>

<style>

</style>
