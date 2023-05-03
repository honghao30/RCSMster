<template>
  <div>
    <div>
      <!-- 양방향 대화방 정보 -->
      <TwowayChatbotView :chatbotData="twowayChatbotData" :isImport="true" class="dv2023_subunderline"/>
      <!-- 대화방 메뉴 -->
      <div class="rcs_emul_form_wrap dv2023_nominheight">
        <div class="rcs_emul_form_cont dv2023_formspace2 bd_no dv2023_custom-chat">
          <!-- group 1 -->
          <div class="dv2023_dividermaker" style="width: 860px; padding-top: 20px;">
            <div class="rcs_item_bundle dv2023_infopop">
              <strong class="rcs_tit_bundle p-l0">
                대화방 메뉴
                <span class="relative">
                  <button class="icon_info"></button>
                  <span class="message">양방향 대화방에서 고객이 선택할 수 있는 메뉴 및 연결된 메시지 등을 사전 등록하는 기능입니다.</span>
                </span>
              </strong>
              <div class="rcs_cont_bundle">
                <span class="w670">
                  <span class="custom_radio checked dv2023_radiolength2">
                    <input type="radio" name="psMenuYn" id="psMenuY" value="Y" v-model="twowayChatbotData.psMenuYn"/>
                    <label for="psMenuY"><span>사용</span></label>
                  </span>
                  <span class="custom_radio checked dv2023_radiolength2">
                    <input type="radio" name="psMenuYn" id="psMenuN" value="N" v-model="twowayChatbotData.psMenuYn"/>
                    <label for="psMenuN"><span>미사용</span></label>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div v-if="twowayChatbotData.psMenuYn === 'Y'">
            <!-- group 2 -->
            <div>
              <!-- 메뉴 선택 -->
              <div class="rcs_item_bundle">
                <div class="rcs_cont_bundle custom-chat-write_tabs">
                  <ul>
                    <li v-for="(menu, idx) in psMenuList" :key="idx" v-bind:class="{ active: psMenuSelectedMenuIdx === idx }">
                      <a href="javascript:void(0);" @click="selectPsMenu(idx)">대화방 메뉴 {{ idx + 1 }}</a>
                      <a href="javascript:void(0);" v-if="psMenuList.length > 1" class="icon_delete" @click="removeMenu({ isSub: false, idx: idx })">X</a>
                    </li>
                  </ul>
                  <a href="javascript:void(0);" class="btn_add2" @click="addMenu({ isSub: false })" v-if="psMenuList.length < 5">메뉴 추가</a>
                  <!-- 메뉴 위치 이동 -->
                  <div class="pos_tr">
                    <span class="prev" v-if="psMenuSelectedMenuIdx === 0"> (*)앞으로 </span>
                    <a href="javascript:void(0);" class="prev" @click="moveSlide('forward')" v-else> 앞으로 </a>
                    <span class="next" v-if="psMenuSelectedMenuIdx === (psMenuList.length - 1)"> (*)뒤로 </span>
                    <a href="javascript:void(0);" class="next" @click="moveSlide('backward')" v-else> 뒤로 </a>
                  </div>
                </div>
              </div>
            </div>
            <!-- group 3: 선택된 메뉴 정보 -->
            <div>
              <!-- 1) 대화방 메뉴명 -->
              <div class="rcs_item_bundle">
                <strong class="rcs_tit_bundle p-10">대화방 메뉴{{ psMenuSelectedMenuIdx + 1 }}</strong>
                <div class="rcs_cont_bundle dv2023_relative">
                  <span class="custom_input w670">
                    <input :ref="`title_${psMenuSelectedMenuIdx}`" type="text" v-model.trim="selectedMenu.title" @input="e => selectedMenu.title = e.target.value" :placeholder="`대화방 메뉴 ${psMenuSelectedMenuIdx + 1} 메뉴명 입력`" :maxlength="psMenuTitleMaxLen"/>
                    <p class="dv2023_limitcount">(<span>{{ selectedMenu.title.length }}</span>/17)</p>
                  </span>
                  <button class="custom-chat-menu_button" @click="showSpecialCharMenu = !showSpecialCharMenu">특수문자</button>
                  <!-- 특수문자 선택창 -->
                  <emoji-picker id="emojiPicker" v-show="showSpecialCharMenu" class="light"></emoji-picker>
                </div>
              </div>
              <!-- 2) 대화방 메뉴 응답유형 -->
              <div class="rcs_item_bundle">
                <strong class="rcs_tit_bundle p-10">응답 유형</strong>
                <div class="rcs_cont_bundle dv2023_alignfs">
                  <span class="custom_select w299">
                    <select :ref="`select_${psMenuSelectedMenuIdx}`" v-model="selectedMenu.type" @change="changeMenuType">
                      <option value="" disabled selected>선택하세요</option>
                      <option value="basic_reply">챗봇 연동하여 답하기</option>
                      <option value="auto_reply">자동응답 메시지 등록</option>
                      <option value="dial_phone_number">전화 걸기</option>
                      <option disabled>-------------------------------------</option>
                      <option value="sub_menu">하위메뉴 설정</option>
                    </select>
                  </span>
                  <!-- 3-2) 자동응답 -->
                  <div v-if="selectedMenu.type === 'auto_reply'" class="dv2023_marginl chat-menu-write_arpick">
                    <div>
                      <span class="custom_radio checked">
                        <input type="radio" name="loadAutoReplyYn" id="loadAutoReply_Y" value="Y" v-model="selectedMenu.isLoadAutoReply" @click="toggleAutoReplySelectType($event, 'Y', 'selectedMenu')"/>
                        <label for="loadAutoReply_Y"><span>자동응답 메시지 선택</span></label>
                      </span>
                      <span class="custom_radio checked">
                        <input type="radio" name="loadAutoReplyYn" id="loadAutoReply_N" value="N" v-model="selectedMenu.isLoadAutoReply" @click="toggleAutoReplySelectType($event, 'N', 'selectedMenu')"/>
                        <label for="loadAutoReply_N"><span>자동응답 메시지 작성</span></label>
                      </span>
                    </div>
                    <span class="custom_input">
                      <input v-model="selectedMenu.armIdName" disabled :ref="`autoReply_${psMenuSelectedMenuIdx}`" placeholder="자동응답 메시지 선택/작성 버튼을 클릭하여 자동응답 메시지를 선택해 주세요." />
                    </span>
                  </div>
                  <!-- 3-3) 전화걸기 -->
                  <div v-if="selectedMenu.type === 'dial_phone_number'" class="dv2023_marginl">
                    <span class="custom_input dv2023_countbumper w360">
                      <input :ref="`dialPhoneNumber_${psMenuSelectedMenuIdx}`" v-model.trim="selectedMenu.dialPhoneNumber.phoneNumber" type="text" placeholder="전화번호 입력" maxlength="40"/>
                      <p class="dv2023_limitcount">(<span>{{ selectedMenu.dialPhoneNumber.phoneNumber.length }}</span>/40)</p>
                    </span>
                  </div>
                </div>
              </div>
              <!-- 3) 선택한 응답 유형별 입력 데이터 -->
              <div>
                <!-- 3-1) 챗봇응답: 입력란 없음 -->
                <!-- 3-4) 하위 메뉴 설정 -->
                <div v-if="selectedMenu.type === 'sub_menu'">
                  <!-- 하위 메뉴 선택 -->
                  <div class="rcs_item_bundle">
                    <strong class="rcs_tit_bundle"></strong>
                    <div class="rcs_cont_bundle custom-chat-write_tabs w670">
                      <ul>
                        <li v-for="(submenu, sIdx) in selectedMenu.subMenu" :key="sIdx" v-bind:class="{ active: selectedMenu.selectedSubMenuIdx === sIdx }">
                          <a href="javascript:void(0);" @click="selectPsMenu(psMenuSelectedMenuIdx, sIdx)">메뉴 {{ psMenuSelectedMenuIdx + 1 }} - {{ sIdx + 1 }}</a>
                          <a href="javascript:void(0);" v-if="selectedMenu.subMenu.length > 1" class="icon_delete" @click="removeMenu({ isSub: true, idx: sIdx })">X</a>
                        </li>
                      </ul>
                      <a href="javascript:void(0);" class="btn_add2" @click="addMenu({ isSub: true })" v-if="selectedMenu.subMenu.length < 5">메뉴 추가</a>
                      <!-- 메뉴 위치 이동 -->
                      <div class="pos_tr">
                        <span class="prev" v-if="selectedMenu.selectedSubMenuIdx === 0"> (*)앞으로 </span>
                        <a href="javascript:void(0);" class="prev" @click="moveSubSlide('forward')" v-else> 앞으로 </a>
                        <span class="next" v-if="selectedMenu.selectedSubMenuIdx === (selectedMenu.subMenu.length - 1)"> (*)뒤로 </span>
                        <a href="javascript:void(0);" class="next" @click="moveSubSlide('backward')" v-else> 뒤로 </a>
                      </div>
                    </div>
                  </div>
                  <!-- 선택된 하위 메뉴 정보-->
                  <div>
                    <!-- 1) 메뉴명 -->
                    <div class="rcs_item_bundle">
                      <strong class="rcs_tit_bundle"></strong>
                      <div class="rcs_cont_bundle dv2023_minibundle">
                        <strong>메뉴 {{ `${psMenuSelectedMenuIdx + 1}-${selectedMenu.selectedSubMenuIdx + 1}` }}</strong>
                        <div style="position: relative;">
                          <span class="custom_input">
                            <input :ref="`title_${psMenuSelectedMenuIdx}_${selectedMenu.selectedSubMenuIdx}`" @input="e => selectedSubMenu.title = e.target.value"  v-model.trim="selectedSubMenu.title" type="text" :maxlength="psMenuTitleMaxLen" :placeholder="`메뉴 ${psMenuSelectedMenuIdx + 1}-${selectedMenu.selectedSubMenuIdx + 1} 메뉴명 입력`"/>
                            <p class="dv2023_limitcount">(<span>{{ selectedSubMenu.title.length }}</span>/17)</p>
                          </span>
                          <button class="custom-chat-menu_button" @click="showSpecialCharSubMenu = !showSpecialCharSubMenu">특수문자</button>
                          <!-- 특수문자 선택창 -->
                          <emoji-picker id="subEmojiPicker" v-show="showSpecialCharSubMenu" class="light" @emoji-click="subTitleEmojiClick"></emoji-picker>
                        </div>
                      </div>
                    </div>
                    <!-- 2) 응답유형 -->
                    <div class="rcs_item_bundle">
                      <strong class="rcs_tit_bundle"></strong>
                      <div class="rcs_cont_bundle dv2023_minibundle dv2023_alignfs">
                        <strong>응답 유형</strong>
                        <div>
                          <span class="custom_select w200">
                            <select :ref="`select_${psMenuSelectedMenuIdx}_${selectedMenu.selectedSubMenuIdx}`" v-model="selectedSubMenu.type" @change="changeSubMenuType">
                              <option value="" disabled selected>선택하세요</option>
                              <option value="basic_reply">챗봇 연동하여 답하기</option>
                              <option value="auto_reply">자동응답 메시지 등록</option>
                              <option value="dial_phone_number">전화 걸기</option>
                            </select>
                          </span>
                          <!-- 3-2) 자동응답 메시지 -->
                          <div v-if="selectedSubMenu.type === 'auto_reply'" class="custom-chat-write_subar">
                            <span class="custom_radio checked">
                              <input type="radio" name="sub_loadAutoReplyYn" id="sub_loadAutoReply_Y" value="Y" v-model="selectedSubMenu.isLoadAutoReply" @click="toggleAutoReplySelectType($event, 'Y', 'selectedSubMenu')"/>
                              <label for="sub_loadAutoReply_Y"><span>자동응답 메시지 선택</span></label>
                            </span>
                            <span class="custom_radio checked">
                              <input type="radio" name="sub_loadAutoReplyYn" id="sub_loadAutoReply_N" value="N" v-model="selectedSubMenu.isLoadAutoReply" @click="toggleAutoReplySelectType($event, 'N', 'selectedSubMenu')"/>
                              <label for="sub_loadAutoReply_N"><span>자동응답 메시지 작성</span></label>
                            </span>
                            <span class="custom_input">
                              <input :ref="`autoReply_${psMenuSelectedMenuIdx}_${selectedMenu.selectedSubMenuIdx}`" v-model="selectedSubMenu.armIdName" disabled placeholder="자동응답 메시지 선택/작성 버튼을 클릭하여 자동응답 메시지를 선택해 주세요." />
                            </span>
                          </div>
                          <!-- 3-3) 전화 걸기 -->
                          <div v-if="selectedSubMenu.type === 'dial_phone_number'">
                            <span class="custom_input dv2023_countbumper">
                              <input :ref="`dialPhoneNumber_${psMenuSelectedMenuIdx}_${selectedMenu.selectedSubMenuIdx}`" v-model.trim="selectedSubMenu.dialPhoneNumber.phoneNumber" type="text" placeholder="전화번호 입력" maxlength="40">
                              <p class="dv2023_limitcount">(<span>{{ selectedSubMenu.dialPhoneNumber.phoneNumber.length }}</span>/40)</p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 3) 선택한 응답 유형별 입력 데이터 -->
                    <!-- 3-1) 챗봇 연동: 입력 없음 -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 버튼 -->
        <div class="btn_wrap dv2023_btnspace mar_t40 full_width temWrite btn_flex first">
          <a href="javascript:void(0)" class="btn mid bd_blue" @click="goBack">이전</a>
          <a href="javascript:void(0)" class="btn mid bd_blue" v-if="!isNew && !isOnewayAgency" @click="remove">삭제</a>
          <a href="javascript:void(0)" class="btn mid bd_blue" v-if="!isOnewayAgency" @click="updatePsMenu('SAVED')">임시저장</a>
          <a href="javascript:void(0)" class="btn mid blue" v-if="!isOnewayAgency" @click="updatePsMenu('APRV_MOD')">등록</a>
        </div>
      </div>
    </div>
    <!-- 자동응답 메시지 선택 팝업 -->
    <AutoReplyInfoPopup v-if="showAutoReplyPopup" :visible.sync="showAutoReplyPopup" :brandId="brandId" @selectAutoReply="setAutoReplyMsgIdAndName" @close="closeAutoReplyPopup"/>
    <!-- 자동응답 메시지 작성 팝업 -->
    <AutoReplyWritePopup v-if="showAutoReplyWritePopup" :visible.sync="showAutoReplyWritePopup" :brandId="brandId" @success="setAutoReplyMsgIdAndName" @close="closeAutoReplyPopup"/>
  </div>
</template>

<script>
import TwowayChatbotView from '@/views/service/brand/twowayMng/twoway/TwowayChatbotView'
import AutoReplyInfoPopup from '@/views/service/components/autoreply/AutoReplyInfoPopup'
import AutoReplyWritePopup from '@/views/service/components/autoreply/AutoReplyWritePopup'
import { getMenuObj, updatePersistentMenu, deletePersistentMenu } from '@/api/service/persistentMenu'
import 'emoji-picker-element'
export default {
  name: 'PersistentMenuWrite',
  components: {
    TwowayChatbotView,
    AutoReplyInfoPopup,
    AutoReplyWritePopup
  },
  props: {
    isNew: { type: Boolean },
    psMenuStatus: { type: String, default: '' },
    twowayChatbotData: { type: Object, default: null },
    psMenuList: { type: Array, default() { return [] } },
    psMenuSelectedMenuIdx: { type: Number, default: 0 }
  },
  data() {
    return {
      brandId: '',
      chatbotId: '',
      targetProperty: '',
      psMenuTitleMaxLen: 17, // 대화방메뉴명 최대 입력가능 글자수
      selectedMenu: {}, // 선택된 대화방 메뉴
      selectedSubMenu: {}, // 선택된 대화방 메뉴(하위)
      showSpecialCharMenu: false, // 특수문자 선택창 show 여부
      showSpecialCharSubMenu: false,
      showAutoReplyPopup: false, // 자동응답 메시지 선택 팝업 show 여부
      showAutoReplyWritePopup: false, // 자동응답 메시지 작성 팝업 show 여부
      hasAutoReplyType: false // 자동응답 메시지가 응답 유형에 있는 경우
    }
  },
  computed: {
    isOnewayAgency() { return window.localStorage.getItem('userType') === 'AGENCY' && !window.localStorage.getItem('rcsSvc').includes('chat') } // 단방향 서비스 제공 대행사인지?
  },
  watch: {
    psMenuList: {
      immediate: true,
      handler() {
        this.selectedMenu = this.psMenuList[this.psMenuSelectedMenuIdx]
        if (this.selectedMenu.type === 'sub_menu') {
          this.selectedMenu.selectedSubMenuIdx = 0
          this.selectedSubMenu = this.selectedMenu.subMenu[0]
        } else {
          this.selectedMenu.selectedSubMenuIdx = 0
          this.selectedSubMenu = null
        }
      }
    },
    // 선택된 대화방 메뉴 변경
    psMenuSelectedMenuIdx: {
      immediate: true,
      handler(val) {
        if (val > -1) {
          this.selectedMenu = this.psMenuList[val]
          if (this.selectedMenu.type === 'sub_menu') {
            this.selectedMenu.selectedSubMenuIdx = 0
            this.selectedSubMenu = this.selectedMenu.subMenu[0]
          } else {
            this.selectedMenu.selectedSubMenuIdx = 0
            this.selectedSubMenu = null
          }
        }
      }
    },
    // 자동응답메시지 지정시 에뮬레이터로 바로 업데이트 처리를 위함
    'selectedMenu.armIdName'(val) {
      if (!jglib.isEmpty(val)) this.$emit('updateAutoReplyData', this.selectedMenu.armId)
      else this.$emit('updateAutoReplyData', null)
    },
    'selectedSubMenu.armIdName'(val) {
      if (!jglib.isEmpty(val)) this.$emit('updateAutoReplyData', this.selectedSubMenu.armId)
      else this.$emit('updateAutoReplyData', null)
    },
    'twowayChatbotData.psMenuYn': {
      immediate: true,
      handler(val) {
        if (val === 'Y') {
          this.$emit('update:psMenuSelectedMenuIdx', 0)
          this.$nextTick(() => {
            document.getElementById('emojiPicker').addEventListener('emoji-click', e => {
              let code = e.detail.unicode
              let target = this.$refs[`title_${this.psMenuSelectedMenuIdx}`]
              if (target.value.length < this.psMenuTitleMaxLen - 1) { // 이모지의 length가 2글자로 잡힘
                let titleArr = target.value.split('')
                titleArr.splice(target.selectionStart, 0, code)
                this.selectedMenu.title = titleArr.join('')
              }
              this.showSpecialCharMenu = false
            })
          })
        } else {
          this.$emit('update:psMenuSelectedMenuIdx', -1)
          this.$emit('updateAutoReplyData', null)
        }
      }
    }
  },
  created() {
    this.brandId = this.$route.params.brandId
    this.chatbotId = this.$route.params.chatbotId
  },
  mounted() {
    this.$nextTick(() => {
      // 대화방 메뉴를 사용하는 경우는 첫번째 메뉴에 포커싱 가도록 한다.
      if (this.twowayChatbotData.psMenuYn === 'Y') {
        this.$refs['title_0'].focus()
      }
    })
  },
  methods: {
    /** 대화방 메뉴 클릭 */
    selectPsMenu(idx, subIdx = -1) {
      if (subIdx === -1) { // 상위 대화방 메뉴 클릭
        this.$emit('update:psMenuSelectedMenuIdx', idx)
      } else {
        this.selectedMenu.selectedSubMenuIdx = subIdx
        this.selectedSubMenu = this.selectedMenu.subMenu[subIdx]
        this.$emit('updateSelectedSubMenu', { to: 'chatbotEmulator', subIdx: subIdx })
      }
    },
    /** 하위메뉴명 특수문자 선택 */
    subTitleEmojiClick(e) {
      let code = e.detail.unicode
      let target = this.$refs[`title_${this.psMenuSelectedMenuIdx}_${this.selectedMenu.selectedSubMenuIdx}`]
      if (target.value.length < this.psMenuTitleMaxLen - 1) { // 이모지의 length가 2글자로 잡힘
        let titleArr = target.value.split('')
        titleArr.splice(target.selectionStart, 0, code)
        this.selectedSubMenu.title = titleArr.join('')
      }
      this.showSpecialCharSubMenu = false
    },
    /** 에뮬레이터에서 하위메뉴 클릭시, 이 함수를 호출하여 화면 데이터 변경 */
    updateSelectedSubPsMenu(subIdx) {
      this.selectedMenu.selectedSubMenuIdx = subIdx
      this.selectedSubMenu = this.selectedMenu.subMenu[subIdx]
    },
    addMenu({ isSub }) {
      let menu = getMenuObj({ useSubMenu: !isSub })
      if (isSub) {
        this.selectedMenu.subMenu.push(menu)
        this.selectPsMenu(this.psMenuSelectedMenuIdx, this.selectedMenu.subMenu.length - 1)
      } else {
        this.psMenuList.push(menu)
        this.selectPsMenu(this.psMenuList.length - 1)
      }
    },
    removeMenu({ isSub, idx }) {
      let nextIdx = idx === 0 ? 0 : idx - 1
      this.$confirmMsg('대화방 메뉴를 삭제 하시겠습니까?<br>삭제 시 입력된 내용이 모두 삭제 됩니다.', '', '확인', '취소').then(() => {
        if (isSub) {
          this.selectedMenu.subMenu.splice(idx, 1)
          this.selectPsMenu(this.psMenuSelectedMenuIdx, nextIdx)
        } else {
          this.psMenuList.splice(idx, 1)
          this.selectPsMenu(nextIdx)
        }
      })
    },
    /** 상위메뉴 순서 변경 */
    moveSlide(direction) {
      let moveIdx = this.psMenuSelectedMenuIdx + (direction === 'forward' ? -1 : 1)
      this.psMenuList.splice(this.psMenuSelectedMenuIdx, 1)
      this.psMenuList.splice(moveIdx, 0, this.selectedMenu)
      this.selectPsMenu(moveIdx)
    },
    /** 하위메뉴 순서 변경 */
    moveSubSlide(direction) {
      let moveIdx = this.selectedMenu.selectedSubMenuIdx + (direction === 'forward' ? -1 : 1)
      this.selectedMenu.subMenu.splice(this.selectedMenu.selectedSubMenuIdx, 1)
      this.selectedMenu.subMenu.splice(moveIdx, 0, this.selectedSubMenu)
      this.selectPsMenu(this.psMenuSelectedMenuIdx, moveIdx)
    },
    /** 상위메뉴 응답유형 변경 */
    changeMenuType(e) {
      let targetMenu = this.psMenuList[this.psMenuSelectedMenuIdx]
      if (e.target.value === 'sub_menu') {
        let subMenu = getMenuObj({ useSubMenu: false })
        targetMenu.subMenu = []
        targetMenu.subMenu.push(subMenu)
        this.selectPsMenu(this.psMenuSelectedMenuIdx, 0)
      } else {
        targetMenu.subMenu = []
      }
      if (e.target.value !== 'auto_reply') {
        targetMenu.isLoadAutoReply = ''
        targetMenu.armId = ''
        targetMenu.armIdName = ''
      }
    },
    /** 하위메뉴 응답유형 변경 */
    changeSubMenuType(e) {
      let targetSubMenu = this.psMenuList[this.psMenuSelectedMenuIdx].subMenu[this.selectedMenu.selectedSubMenuIdx]
      if (e.target.value !== 'auto_reply') {
        targetSubMenu.isLoadAutoReply = ''
        targetSubMenu.armId = ''
        targetSubMenu.armIdName = ''
      }
    },
    toggleAutoReplySelectType(e, value, property) {
      e.preventDefault() // isLoadAutoReply 값은 바로 변경하지 않음, 실제 선택/작성시 값 업데이트 하도록 한다.
      this.targetProperty = property // 대상이 상위메뉴인지, 하위메뉴인지 property 이름을 지정한다
      if (value === 'Y') {
        this.showAutoReplyPopup = true // 자동응답 메시지 선택 팝업 오픈
      } else {
        this.showAutoReplyWritePopup = true // 자동응답 메시지 작성 팝업 오픈
      }
    },
    /** 자동응답 메시지 작성/선택시 데이터 set */
    setAutoReplyMsgIdAndName(autoReply) {
      this.$data[this.targetProperty].armId = autoReply.armId
      this.$data[this.targetProperty].armIdName = autoReply.name
      if (autoReply.type === 'write') {
        this.$data[this.targetProperty].isLoadAutoReply = 'N' // 사용자가 작성한 경우
      } else {
        this.$data[this.targetProperty].isLoadAutoReply = 'Y' // 선택한 경우
      }
    },
    /** 자동응답 메시지를 작성/선택하지 않고 팝업을 닫은 경우 => 기존값 유지 */
    closeAutoReplyPopup() {
      let target = this.$data[this.targetProperty]
      // 기존에 등록된 자동응답이 없다면 선택 표시 안함
      if (jglib.isEmpty(target.armId)) target.isLoadAutoReply = ''
    },
    /** 목록으로 */
    goList() {
      this.$router.push({ name: 'PersistentMenuList', params: { brandId: this.brandId } })
    },
    /** 이전 */
    goBack() {
      if (this.isOnewayAgency) {
        this.goList()
      } else { // 수정권한이 있는 사용자들
        this.$confirmMsg('대화방메뉴 작성을 취소하고<br>목록으로 돌아가시겠습니까?').then(() => {
          this.goList()
        })
      }
    },
    /** 삭제 */
    remove() {
      this.$confirmMsg('대화방메뉴를 삭제 하시겠습니까?').then(() => {
        let data = { chatbotId: this.twowayChatbotData.chatbotId }
        deletePersistentMenu(this.brandId, data).then(res => {
          if (res.code === '20000000') this.goList()
        }).catch((err) => {
          this.$alertMsg(err.desc).then(() => {})
        })
      })
    },
    /** 선택된 메뉴의 항목 focus */
    focusThis(id) {
      this.$nextTick(() => {
        if (this.$refs[id][0]) this.$refs[id][0].focus()
        else this.$refs[id].focus()
      })
    },
    /** 데이터 검증 알림 메시지 */
    validAlert(refName, targetIdx, targetSubIdx = -1) {
      let msg, focusId, menuTabStr
      this.selectPsMenu(targetIdx)
      if (targetSubIdx === -1) { // 하위 메뉴가 아님
        focusId = `${refName}_${targetIdx}`
        menuTabStr = targetIdx + 1
      } else {
        this.selectPsMenu(this.psMenuSelectedMenuIdx, targetSubIdx)
        focusId = `${refName}_${targetIdx}_${targetSubIdx}`
        menuTabStr = `${targetIdx + 1}-${targetSubIdx + 1}`
      }
      // 메시지 set
      switch (refName) {
        case 'title': msg = `대화방 메뉴${menuTabStr} 메뉴명을 입력해 주세요`; break
        case 'select': msg = `대화방 메뉴${menuTabStr} 유형을 선택해 주세요.`; break
        case 'autoReply': msg = `대화방 메뉴${menuTabStr} 자동응답을 선택해 주세요.`; break
        default: msg = `대화방 메뉴${menuTabStr} 응답값을 입력해 주세요.`
      }
      this.$alertMsg(msg).then(() => {
        this.focusThis(focusId)
      })
    },
    validValue(refName, reason, targetIdx, targetSubIdx = -1) {
      let msg, focusId
      if (targetSubIdx === -1) { // 하위 메뉴가 아님
        focusId = `${refName}_${targetIdx}`
      } else {
        this.selectPsMenu(this.psMenuSelectedMenuIdx, targetSubIdx)
        focusId = `${refName}_${targetIdx}_${targetSubIdx}`
      }
      if (reason === 'phoneNumber') msg = '전화번호는 숫자만 입력되어야 합니다.'
      this.$alertMsg(msg).then(() => {
        this.focusThis(focusId)
      })
    },
    /** 데이터 검증 */
    validation(isSave) {
      const menuTypes = ['basic_reply', 'auto_reply', 'dial_phone_number', 'sub_menu']
      const subMenuTypes = ['basic_reply', 'auto_reply', 'dial_phone_number']
      for (let idx = 0; idx < this.psMenuList.length; idx++) {
        let menu = this.psMenuList[idx]
        // 1. 타이틀
        if (jglib.isEmpty(menu.title)) {
          this.validAlert('title', idx)
          return Promise.resolve(false)
        }
        // 2. 응답유형 - 선택안함, 유효하지 않은 값
        if (jglib.isEmpty(menu.type)) {
          this.validAlert('select', idx)
          return Promise.resolve(false)
        }
        if (!menuTypes.includes(menu.type)) {
          this.validAlert('select', idx)
          return Promise.resolve(false)
        }
        // 3. 타입별 데이터 체크
        if (menu.type === 'auto_reply' && jglib.isEmpty(menu.armId)) { // 3-1) 자동응답
          this.validAlert('autoReply', idx)
          return Promise.resolve(false)
        } else if (menu.type === 'dial_phone_number') { // 3-2) 전화걸기
          if (jglib.isEmpty(menu.dialPhoneNumber.phoneNumber)) {
            this.validAlert('dialPhoneNumber', idx)
            return Promise.resolve(false)
          }
          if (isNaN(menu.dialPhoneNumber.phoneNumber)) {
            this.validValue('dialPhoneNumber', 'phoneNumber', idx)
            return Promise.resolve(false)
          }
        } else if (menu.type === 'sub_menu') { // 3-3) 하위메뉴
          for (let subIdx = 0; subIdx < menu.subMenu.length; subIdx++) {
            // 1. 타이틀
            let subMenu = menu.subMenu[subIdx]
            if (jglib.isEmpty(subMenu.title)) {
              this.validAlert('title', idx, subIdx)
              return Promise.resolve(false)
            }
            // 2. 응답유형 - 선택안함, 유효하지 않은 값
            if (jglib.isEmpty(subMenu.type)) {
              this.validAlert('select', idx, subIdx)
              return Promise.resolve(false)
            }
            if (!subMenuTypes.includes(subMenu.type)) {
              this.validAlert('select', idx, subIdx)
              return Promise.resolve(false)
            }
            // 3. 타입별 데이터 체크
            if (subMenu.type === 'auto_reply' && jglib.isEmpty(subMenu.armId)) { // 3-1) 자동응답
              this.validAlert('autoReply', idx, subIdx)
              return Promise.resolve(false)
            } else if (subMenu.type === 'dial_phone_number') { // 3-2) 전화걸기
              if (jglib.isEmpty(subMenu.dialPhoneNumber.phoneNumber)) {
                this.validAlert('dialPhoneNumber', idx, subIdx)
                return Promise.resolve(false)
              }
              if (isNaN(subMenu.dialPhoneNumber.phoneNumber)) {
                this.validValue('dialPhoneNumber', 'phoneNumber', idx, subIdx)
                return Promise.resolve(false)
              }
            }
          }
        }
      }
      return Promise.resolve(true)
    },
    getMenuData() {
      let menus = []
      for (let idx = 0; idx < this.psMenuList.length; idx++) {
        let menu = this.psMenuList[idx]
        let ordNo = (idx + 1).toString()
        switch (menu.type) {
          case 'basic_reply':
            menus.push({ type: 'reply', title: menu.title, postbackId: menu.postbackId, ordNo: ordNo }); break
          case 'auto_reply':
            this.hasAutoReplyType = true
            menus.push({ type: 'reply', title: menu.title, postbackId: menu.postbackId, ordNo: ordNo, autoReplyMsgId: menu.armId }); break
          case 'dial_phone_number':
            menus.push({ type: 'action', title: menu.title, postbackId: menu.postbackId, ordNo: ordNo, actionType: 'dialerAction', action: { dialerAction: { dialPhoneNumber: { phoneNumber: menu.dialPhoneNumber.phoneNumber } } } }); break
          case 'sub_menu':
            let subMenus = []
            for (let subIdx = 0; subIdx < menu.subMenu.length; subIdx++) {
              let subMenu = menu.subMenu[subIdx]
              let subOrdNo = (subIdx + 1).toString()
              switch (subMenu.type) {
                case 'basic_reply':
                  subMenus.push({ type: 'reply', title: subMenu.title, postbackId: subMenu.postbackId, ordNo: subOrdNo }); break
                case 'auto_reply':
                  this.hasAutoReplyType = true
                  subMenus.push({ type: 'reply', title: subMenu.title, postbackId: subMenu.postbackId, ordNo: subOrdNo, autoReplyMsgId: subMenu.armId }); break
                case 'dial_phone_number':
                  subMenus.push({ type: 'action', title: subMenu.title, postbackId: subMenu.postbackId, ordNo: subOrdNo, actionType: 'dialerAction', action: { dialerAction: { dialPhoneNumber: { phoneNumber: subMenu.dialPhoneNumber.phoneNumber } } } }); break
              }
              subMenus[subIdx].actionJson = JSON.stringify(subMenus[subIdx].action)
            }
            menus.push({ type: 'menu', title: menu.title, postbackId: menu.postbackId, ordNo: ordNo, subMenu: subMenus }); break
        }
        menus[idx].actionJson = JSON.stringify(menus[idx].action)
      }
      return menus
    },
    /** 대화방 메뉴 업데이트(임시저장/등록) */
    async updatePsMenu(actionType) {
      if (this.twowayChatbotData.psMenuYn === 'N') {
        this.$confirmMsg('대화방 메뉴 사용을 변경하시겠습니까?').then(() => {
          let data = {
            brandId: this.brandId,
            action: actionType,
            chatbotId: this.twowayChatbotData.chatbotId,
            psMenuYn: this.twowayChatbotData.psMenuYn
          }
          updatePersistentMenu(this.brandId, data).then(res => {
            if (res.code === '20000000') this.goList()
          }).catch((err) => {
            this.$alertMsg(err.desc).then(() => {})
          })
        })
      } else {
        if (await this.validation(true)) {
          let menu = this.getMenuData()
          let msg
          // 사용자가 작성한 자동응답 메시지가 포함되어 있는지 확인한다.
          let hasUserWriteAutoReply = false
          for (let i = 0; i < this.psMenuList.length; i++) {
            if (hasUserWriteAutoReply) break
            else {
              let menu = this.psMenuList[i]
              if (menu.type === 'auto_reply') { // 자동응답 메시지의 경우
                if (menu.isLoadAutoReply === 'N') hasUserWriteAutoReply = true
              } else if (menu.type === 'sub_menu') { // 하위메뉴의 경우
                for (let j = 0; j < menu.subMenu.length; j++) {
                  if (hasUserWriteAutoReply) break
                  else {
                    let subMenu = menu.subMenu[j]
                    if (subMenu.type === 'auto_reply') {
                      if (subMenu.isLoadAutoReply === 'N') hasUserWriteAutoReply = true
                    }
                  }
                }
              }
            }
          }
          if (actionType === 'SAVED') msg = '입력하신 내용이 임시저장 됩니다.<br>등록을 완료하셔야 사용이 가능합니다.'
          else msg = this.hasAutoReplyType ? '입력하신 대화방 메뉴와 자동응답 메시지가<br>함께 등록 되며 승인없이 사용 가능합니다.' : '입력하신 대화방 메뉴가 등록됩니다.<br/>대화방 메뉴는 승인 없이 사용 가능합니다.'
          this.$confirmMsg(msg).then(() => {
            let data = {
              action: actionType,
              chatbotId: this.twowayChatbotData.chatbotId,
              psMenuYn: this.twowayChatbotData.psMenuYn,
              psMenuStatus: this.psMenuStatus,
              persistentMenu: menu
            }
            updatePersistentMenu(this.brandId, data).then(res => {
              if (res.code === '20000000') {
                // 현재 페이지에서 사용자가 직접 작성한 자동응답메시지가 있을 경우
                if (this.hasAutoReplyType && hasUserWriteAutoReply) this.$alertMsg('등록된 자동응답은 자동응답 메시지 목록에서 확인할 수 있습니다.').then(() => this.goList())
                else this.goList()
              } else {
                if (this.hasAutoReplyType) this.$alertMsg('자동응답 청약 확인에 실패 하였습니다.<br>선택한 중계사를 통해 자동응답 청약 여부를 확인해 주시기 바랍니다.')
              }
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {})
            })
          })
        }
      }
    }
  }
}
</script>
