<template>
  <div class="rcs_emul_form_step">
    <h3 class="h3_title fs20 full_width mar_t15 mar_b10">STEP 1. 브랜드 홈 정보 입력</h3>
    <div class="rcs_item_bundle extra_bd_t pdtop10">
      <strong class="rcs_tit_bundle">브랜드 ID</strong>
      <div class="rcs_cont_bundle">{{ getApprovalBrandList.brandId }}</div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">브랜드 Key</strong>
      <div class="rcs_cont_bundle">{{ getApprovalBrandList.brandKey }}</div>
    </div>
    <!-- 백그라운드 이미지 -->
    <div class="rcs_item_bundle" v-if="resignation">
      <strong class="rcs_tit_bundle">백그라운드 이미지</strong>
      <div class="rcs_cont_bundle">{{ bgImgFileImageData }}</div>
    </div>
    <div class="rcs_item_bundle" v-else>
      <strong class="rcs_tit_bundle">백그라운드 이미지<span class="require">&nbsp;*</span></strong>
      <div class="rcs_cont_bundle">
        <ul class="rcs_imgslt_list" style="margin-top:2px;">
          <li><button class="btn sml bd_black" :class="bgImgUse === 1 ? 'btn_ck' : ''" @click="chooseDefaultImage('background')"><span>기본이미지</span></button></li>
          <li>
            <div class="box_add_file">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-change="onFileChangeBgImgFile" :file-list="bgFileList" :auto-upload="false">
                <el-button type="primary" class="btn sml bd_black" :class="bgImgUse === 2 ? 'btn_ck' : ''">사용자이미지</el-button>
              </el-upload>
            </div>
          </li>
          <li style="position: relative;"><div class="miri_event_bloon" style="top: -22px; left: -4px;" @click="clickMiriCanvas"></div></li>
        </ul>
        <div class="box_file_txt">
          <p v-show="!bgImgFileImageDataYn">사이즈 : 388X388px~1080X1080px / 1:1 비율 / 파일형식 : jpg, png (최대1MB)</p>
          <span v-show="bgImgFileImageDataYn" class="text_desc add_file">{{ bgImgFileImageData }}<a href="javascript:void(0);" class="btn_delete" @click="removeImageBgImgFile" v-if="bgImgFileImageDataYn"><span>삭제</span></a></span>
        </div>
      </div>
    </div>
    <!-- 메뉴 버튼 설정 -->
    <div class="rcs_item_bundle" v-if="resignation">
      <strong class="rcs_tit_bundle v_top">퀵 버튼 설정</strong>
      <div class="rcs_cont_bundle pad_t16">
        <ul class="box_ui_field">
          <li v-for="(list, index) in menuItemNoAppList" :key="`1_${index}`">
            <strong class="tit_ui_field">{{ list.menuItemNm }}</strong>
            <div class="cont_ui_field" v-if="list.menuItemNm === 'Call'">{{ getApprovalBrandList.tel }}</div>
            <div class="cont_ui_field" v-else-if="list.menuItemNm !== 'Chat' && list.menuItemNm !== 'App'">Web URL: {{ list.values[0].value }}</div>
          </li>
          <li v-for="(list, index) in menuItemApp" :key="`2_${index}`">
            <strong class="tit_ui_field">{{ list.menuItemNm }}</strong>
            <div class="cont_ui_field" v-if="list.menuItemNm === 'App'">Web URL: {{ list.values[0].value }}</div>
            <div class="cont_ui_field" v-if="list.menuItemNm === 'App'">Package Name: {{ list.values[1].value }}</div>
          </li>
          <li v-for="(list, index) in menuItemApp" :key="`3_${index}`">
            <strong class="tit_ui_field"></strong>
            <div class="cont_ui_field" v-if="list.menuItemNm === 'App'">Action: {{ list.values[2].value }}</div>
            <div class="cont_ui_field" v-if="list.menuItemNm === 'App'">URI: {{ list.values[3].value }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="rcs_item_bundle" v-else>
      <strong class="rcs_tit_bundle" style="padding-top:27px;">퀵 버튼 설정</strong>
      <div class="rcs_cont_bundle">
        <ul class="rcs_ui_list">
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui01" disabled checked ref="menuItem">
              <label for="ui01">Chat</label>
            </span>
          </li>
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui02" :value="'Call'" v-model="checkmenuItemList" @change="changeMenuCheck($event, 'Call')" ref="menuItem">
              <label for="ui02">Call</label>
            </span>
          </li>
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui09" :value="'Moreinfo'" v-model="checkmenuItemList" @change="changeMenuCheck($event, 'Moreinfo')" ref="menuItem">
              <label for="ui09">Moreinfo</label>
            </span>
          </li>
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui06" :value="'Order'" v-model="checkmenuItemList" @change="changeMenuCheck($event, 'Order')" ref="menuItem">
              <label for="ui06">Order</label>
            </span>
          </li>
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui07" :value="'Buy'" v-model="checkmenuItemList" @change="changeMenuCheck($event, 'Buy')" ref="menuItem">
              <label for="ui07">Buy</label>
            </span>
          </li>
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui08" :value="'Ticket'" v-model="checkmenuItemList" @change="changeMenuCheck($event, 'Ticket')" ref="menuItem">
              <label for="ui08">Ticket</label>
            </span>
          </li>
          <!-- 당분간 앱 사용 중단 disabled 처리 -->
          <li v-if="!appMenuDisable">
            <span class="custom_checkbox">
              <input type="checkbox" id="ui04" :value="'App'" v-model="checkmenuItemList" @change="changeMenuCheck($event, 'App')" ref="menuItem" disabled="true">
              <label for="ui04">APP</label>
            </span>
          </li>
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui03" :value="'Web'" v-model="checkmenuItemList" @change="changeMenuCheck($event, 'Web')" ref="menuItem">
              <label for="ui03">Web</label>
            </span>
          </li>
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui05" :value="'Store'" v-model="checkmenuItemList" @change="changeMenuCheck($event, 'Store')" ref="menuItem">
              <label for="ui05">Store</label>
            </span>
          </li>
        </ul>
        <ul class="box_ui_field">
          <!-- APP 이외 -->
          <li v-for="(item, index) in menuItemNoAppInputList" :key="`3_${index}`">
            <strong class="tit_ui_field">- {{ item.menuItemNm }} *</strong>
            <div class="cont_ui_field">
              <span class="custom_input">
                <span class="custom_input" v-if="item.code === 'CALL'">
                  <input type="text" :value="tel" placeholder="전화번호와 동일" readonly>
                </span>
                <input type="text" v-model="item.values[0].value" placeholder="http://www.brandportal.com 형식으로 입력" v-if="item.menuItemNm === 'Web'"
                      @input="item.values[0].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="100">
                <input type="text" v-model="item.values[0].value" placeholder="쇼핑몰 위한 URL 입력 (예: http://www.portal.com )" v-else-if="item.menuItemNm === 'Store'"
                      @input="item.values[0].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="100">
                <input type="text" v-model="item.values[0].value" placeholder="주문/신청 위한 URL 입력 (예: http://www.portal.com )" v-else-if="item.menuItemNm === 'Order'"
                      @input="item.values[0].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="100">
                <input type="text" v-model="item.values[0].value" placeholder="구매/결제 위한 URL 입력 (예: http://www.portal.com )" v-else-if="item.menuItemNm === 'Buy'"
                      @input="item.values[0].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="100">
                <input type="text" v-model="item.values[0].value" placeholder="예매/예약 위한 URL 입력 (예: http://www.portal.com )" v-else-if="item.menuItemNm === 'Ticket'"
                      @input="item.values[0].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="100">
                <input type="text" v-model="item.values[0].value" placeholder="기타 안내 위한 URL 입력 (예: http://www.portal.com )" v-else-if="item.menuItemNm === 'Moreinfo'"
                      @input="item.values[0].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="100">
              </span>
            </div>
          </li>
          <!-- APP 당분간 앱 사용 중단 readonly 처리 -->
          <li v-for="(item, index) in menuItemApp" :key="`4_${index}`">
            <strong class="tit_ui_field">- {{item.code}} *</strong>
            <div class="cont_ui_field">
              <span class="custom_input">
                <input type="text" v-model="item.values[0].value" placeholder="Web URL (http://www.portal.com )" @input="item.values[0].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="100" readonly>
              </span>
              <span class="custom_input">
                <input type="text" v-model="item.values[1].value" placeholder="Package Name (예: com.android.search)" @input="item.values[1].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="40" readonly>
              </span>
            </div>
          </li>
          <li v-for="(item, index) in menuItemApp" :key="`5_${index}`">
            <strong class="tit_ui_field"></strong>
            <div class="cont_ui_field">
              <span class="custom_input">
                <input type="text" v-model="item.values[2].value" placeholder="Action (예: android.intent.action.VIEW)" @input="item.values[2].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="40" readonly>
              </span>
              <span class="custom_input">
                <input type="text" v-model="item.values[3].value" placeholder="URI (예: rcsbizcenter.com/1.html)" @input="item.values[3].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="40" readonly>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 프로필 이미지 -->
    <div class="rcs_item_bundle" v-if="resignation">
      <strong class="rcs_tit_bundle v_top">프로필 이미지</strong>
      <div class="rcs_cont_bundle">{{ profileImgFileImageData }}</div>
    </div>
    <div class="rcs_item_bundle" v-else>
      <strong class="rcs_tit_bundle v_top">프로필 이미지<span class="require">&nbsp;*</span></strong>
      <div class="rcs_cont_bundle">
        <ul class="rcs_imgslt_list" style="margin-top:6px;">
          <li>
            <button class="btn sml bd_black" :class="profileImgUse === 1 ? 'btn_ck' : ''" @click="chooseDefaultImage('profile')"><span>기본이미지</span></button>
          </li>
          <li>
            <div class="box_add_file">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-change="onFileChangeprofileImgFile" :file-list="profileList" :auto-upload="false">
                <el-button type="primary" class="btn sml bd_black" :class="profileImgUse === 2 ? 'btn_ck' : ''">사용자이미지</el-button>
              </el-upload>
            </div>
          </li>
        </ul>
        <div class="box_file_txt">
          <p v-show="!profileImgFileImageDataYn">사이즈 : 388X388px~1080X1080px / 1:1 비율 / 파일형식 : png (최대1MB)</p>
          <span v-show="profileImgFileImageDataYn" class="text_desc add_file">{{ profileImgFileImageData }}<a href="javascript:void(0);" class="btn_delete" @click="removeImageprofileImgFile" v-if="profileImgFileImageDataYn"><span>삭제</span></a></span>
        </div>
      </div>
    </div>
    <!-- 브랜드 명 -->
    <div class="rcs_item_bundle" v-if="resignation">
      <strong class="rcs_tit_bundle">브랜드 명</strong>
      <div class="rcs_cont_bundle">{{ name }}</div>
    </div>
    <div class="rcs_item_bundle" v-else>
      <strong class="rcs_tit_bundle">브랜드 명<span class="require">&nbsp;*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input">
          <input type="text" ref="name" @input="e => name = e.target.value" v-model.trim="name" maxlength="20" placeholder="브랜드 명을 작성해 주세요.">
        </span>
        <span class="count" v-if="name.length === 0">(0/20자)</span>
        <span class="count" v-if="name.length !== 0">({{ name.length }}/20자)</span>
      </div>
    </div>
    <!-- 브랜드 설명 -->
    <div class="rcs_item_bundle" v-if="resignation">
      <strong class="rcs_tit_bundle v_top">브랜드 설명</strong>
      <div class="rcs_cont_bundle" v-html="setDescrCarageReturn(descr)"></div>
    </div>
    <div class="rcs_item_bundle" v-else>
      <strong class="rcs_tit_bundle v_top">브랜드 설명<span class="require">&nbsp;*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_textarea">
          <textarea ref="descr" @input="e => descr = e.target.value" v-model.trim="descr" maxlength="150" placeholder="브랜드의 슬로건이나 브랜드의 특징을 나타내는 설명문구를 작성해주세요."></textarea>
        </span>
        <span class="count" v-if="descr.length === 0">(0/150자)</span>
        <span class="count" v-else>({{ descr.length }}/150자)</span>
      </div>
    </div>
    <!-- 전화번호 -->
    <div class="rcs_item_bundle" v-show="resignation">
      <strong class="rcs_tit_bundle">전화번호</strong>
      <div class="rcs_cont_bundle">{{ getApprovalBrandList.tel }}</div>
    </div>
    <div class="rcs_item_bundle" v-show="!resignation">
      <strong class="rcs_tit_bundle">전화번호<span class="require">&nbsp;*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input short">
          <input type="text" ref="tel" v-model="tel" @input="getTel($event)" placeholder="‘-’없이 입력" maxlength="12">
        </span>
      </div>
    </div>
    <!-- 웹 사이트 -->
    <div class="rcs_item_bundle" v-if="resignation">
      <strong class="rcs_tit_bundle">웹 사이트</strong>
      <div class="rcs_cont_bundle">{{ getApprovalBrandList.url }}</div>
    </div>
    <div class="rcs_item_bundle" v-else>
      <strong class="rcs_tit_bundle">웹 사이트</strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input">
          <input type="text" placeholder="http://www.brandportal.com 형식으로 입력" ref="url" v-model="url" @input="url=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="100">
        </span>
      </div>
    </div>
    <!-- 이메일 -->
    <div class="rcs_item_bundle" v-if="resignation">
      <strong class="rcs_tit_bundle">이메일</strong>
      <div class="rcs_cont_bundle">{{ getApprovalBrandList.email }}</div>
    </div>
    <div class="rcs_item_bundle" v-else>
      <strong class="rcs_tit_bundle">이메일</strong>
      <div class="rcs_cont_bundle">
        <div class="box_email">
          <span class="custom_input">
            <input type="text" ref="emailId" v-model="emailId" @input="emailId=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="30">
          </span>
          <span class="hypen">@</span>
          <span class="custom_input">
            <input v-if="!emailFormFlag" type="text" v-model="emailDomain" @input="emailDomain=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="30">
            <input v-if="emailFormFlag" type="text" v-model="emailDomain" disabled>
          </span>
          <span class="custom_select">
            <select v-model="setEmailDomain">
              <option value>직접입력</option>
              <option v-for="item in emailDomainList" :value="item.code" :key="item.code">{{ item.codeNm }}</option>
            </select>
          </span>
        </div>
      </div>
    </div>
    <!-- 주소 -->
    <div class="rcs_item_bundle" v-show="resignation">
      <strong class="rcs_tit_bundle">주소</strong>
      <div class="rcs_cont_bundle">{{ addrRegnNo + ' ' + addrMngNo + ' ' + addrDtl }}</div>
    </div>
    <div class="rcs_item_bundle" v-show="!resignation">
      <strong class="rcs_tit_bundle v_top">주소</strong>
      <div class="rcs_cont_bundle">
        <div class="address_search_area">
          <div class="input_search_bundle">
            <span class="custom_input">
              <input type="text" ref="addrRegnNo" readonly v-model="addrRegnNo">
            </span>
            <a href="javascript:void(0);" type="text" ref="modal" class="btn sml bd_black" @click="openAddressPopup">우편번호</a>
            <a href="javascript:void(0);" type="text" ref="modal" class="btn sml bd_black" @click="deleteAddress">삭제</a>
          </div>
          <address-popup v-if="visibleAddressPopup" :visible.sync="visibleAddressPopup" @getData="getAddress"></address-popup>
          <div class="input_address_bundle">
            <span class="custom_input"><input type="text" readonly v-model="addrMngNo"></span>
            <span class="custom_input"><input type="text" readonly v-model="addrDtl"></span>
          </div>
        </div>
      </div>
    </div>
    <default-images v-if="chooseDefault" :assigned="chooseDefaultData" @setDefaultData="setDefaultData"></default-images>
  </div>
</template>

<script>
import AddressPopup from '@/components/address'
import { checkBrandDefaultImages, retrieveCommonCode } from '@/api/common/code'
import { ignoreChar } from '@/utils/check'
import DefaultImages from '@/views/service/brand/brand/popup/DefaultImages'

export default {
  components: {
    DefaultImages,
    AddressPopup
  },
  props: {
    brandId: {
      type: String
    },
    RESPONSE: {
      type: Object
    }
  },
  data() {
    return {
      // 승인상태값
      resignation: true,
      getApprovalBrandList: [],
      emailList: [],
      emailId: '',
      emailDomain: '',
      setEmailDomain: '',
      emailDomainList: [],
      tel: '',
      name: '',
      nameLength: '',
      descr: '',
      url: '',
      addrRegnNo: '',
      addrMngNo: '',
      addrDtl: '',
      bgFileList: [],
      status: '',
      bgImgUse: 0, // 백그라운드 타입 > 0: 미선택 1: 샘플 2: 업로드
      bgImgFileImageData: '',
      bgImgFileImageDataYn: true,
      bgImgFileDelYn: 'N',
      bgImgFileId: '',
      bgImgFileNo: '',
      profileList: [],
      profileImgUse: 0, // 프로필 타입 > 0: 미선택 1: 샘플 2: 업로드
      profileImgFileImageData: '',
      profileImgFileImageDataYn: true,
      profileImgFileDelYn: 'N',
      profileImgFileId: '',
      profileImgFileNo: '',
      visibleAddressPopup: false,
      appMenuDisable: true,
      checkmenuItemList: [],
      menuItemList: [
        {
          code: 'CHAT',
          menuItemId: 'Chat',
          menuItemNm: 'Chat',
          visible: false,
          values: [{ value: '' }]
        },
        {
          code: 'CALL',
          menuItemId: 'Call',
          menuItemNm: 'Call',
          visible: false,
          values: [{ value: '' }]
        },
        {
          code: 'MOREINFO',
          menuItemId: 'Moreinfo',
          menuItemNm: 'Moreinfo',
          visible: false,
          values: [{ value: '', type: 'url', title: 'Web URL 주소' }],
          check: true
        },
        {
          code: 'ORDER',
          menuItemId: 'Order',
          menuItemNm: 'Order',
          visible: false,
          values: [{ value: '', type: 'url', title: 'Web URL 주소' }],
          check: true
        },
        {
          code: 'BUY',
          menuItemId: 'Buy',
          menuItemNm: 'Buy',
          visible: false,
          values: [{ value: '', type: 'url', title: 'Web URL 주소' }],
          check: true
        },
        {
          code: 'TICKET',
          menuItemId: 'tickets',
          menuItemNm: 'Ticket',
          visible: false,
          values: [{ value: '', type: 'url', title: 'Web URL 주소' }],
          check: true
        },
        {
          code: 'APP',
          menuItemId: 'APP',
          menuItemNm: 'App',
          visible: false,
          values: [
            { value: '', type: 'url', title: 'Web URL(웹사이트) 주소' },
            { value: '', type: 'text', title: 'Package Name' },
            { value: '', type: 'text', title: 'Action' },
            { value: '', type: 'text', title: 'URI' }
          ],
          check: true
        },
        {
          code: 'WEB',
          menuItemId: 'Web',
          menuItemNm: 'Web',
          visible: false,
          values: [{ value: '', type: 'url', title: 'Web(웹사이트) 주소' }],
          check: true
        },
        {
          code: 'STORE',
          menuItemId: 'Store',
          menuItemNm: 'Store',
          visible: false,
          values: [{ value: '', type: 'url', title: 'Web URL 주소' }],
          check: true
        },
      ],
      chooseDefault: false,
      chooseDefaultData: {
        type: null
      }
    }
  },
  computed: {
    viewerDataInfo() {
      // this.name.replace(/<|>|\(|\)|'|on.*\(|eval\(|<|\/>|javascript|&lt|&gt|&#x0003C|&#60|&#x0003E|&#62|&#39/gi,'')
      /* eslint-disable */
      this.name = this.name.replace(/<|>|on.*\(|eval\(|<|\/>|javascript|&lt|&gt|&#x0003C|&#60|&#x0003E|&#62/gi, '')
      if (this.resignation) {
        this.descr = this.descr.replace(/on.*\(|eval\(|javascript|&lt|&gt|&#x0003C|&#60|&#x0003E|&#62/gi, '')
      } else {
        this.descr = this.descr.replace(/<|>|on.*\(|eval\(|<|\/>|javascript|&lt|&gt|&#x0003C|&#60|&#x0003E|&#62/gi, '')
      }
      this.tel = this.tel.replace(/\D/g, '')
      /* eslint-disable */
      return {
        name: this.name,
        descr: this.descr,
        tel: this.tel,
        menuItemList: this.menuItemList,
        url: this.url,
        email: `${this.emailId}@${this.emailDomain}`,
        addrRegnNo: this.addrRegnNo,
        addrMngNo: this.addrMngNo,
        addrDtl: this.addrDtl,
        bgImgFile: this.bgFileList.length > 0 ? this.bgFileList[0] : '',
        bgImgFileId: this.bgImgFileId,
        bgImgFileNo: this.bgImgFileNo,
        bgImgFileUrl: this.bgImgFileUrl,
        profileImgFile: this.profileList.length > 0 ? this.profileList[0] : '',
        profileImgFileId: this.profileImgFileId,
        profileImgFileNo: this.profileImgFileNo,
        profileImgFileUrl: this.profileImgFileUrl
      }
    },
    emailFormFlag() {
      return !jglib.isEmpty(this.setEmailDomain)
    },
    menuItemNoAppInputList() {
      return this.menuItemList.filter(opt => opt.visible && opt.menuItemId !== 'APP' && opt.menuItemId !== 'Chat')
    },
    menuItemNoAppList() {
      return this.menuItemList.filter(opt => opt.visible && opt.menuItemId !== 'APP')
    },
    menuItemApp() {
      return this.menuItemList.filter(opt => opt.visible && opt.menuItemId === 'APP')
    },
    isAprvRetOk() {
      return (this.getApprovalBrandList.aprvRet === 'OK' || this.status === 'APRV_MOD')
    }
  },
  watch: {
    viewerDataInfo: {
      deep: true,
      handler() {
        this.$emit('viewerDataInfo', this.viewerDataInfo)
      }
    },
    setEmailDomain(value) {
      if (value) {
        this.emailDomain = value
      } else {
        this.emailDomain = ''
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    ignoreChar,
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    },
    init() {
      const res = this.RESPONSE
      this.getApprovalBrandList = res.result
      if (this.getApprovalBrandList.aprvRet === 'WAITING' || this.getApprovalBrandList.aprvRet === 'INSPECTED' || this.getApprovalBrandList.aprvRet === 'INSPECTING' || this.$store.state.user.userCd === 'AGENCY') {
        this.resignation = true
      } else if (this.getApprovalBrandList.aprvRet === 'REJECTED' || this.getApprovalBrandList.aprvRet === 'SAVED' || this.getApprovalBrandList.aprvRet === 'OK') {
        this.resignation = false
      }
      if (!jglib.isEmpty(this.getApprovalBrandList.name)) {
        this.name = this.getApprovalBrandList.name
      }
      if (!jglib.isEmpty(this.getApprovalBrandList.descr)) {
        if (this.getApprovalBrandList.aprvRet === 'WAITING' || this.getApprovalBrandList.aprvRet === 'INSPECTED' || this.getApprovalBrandList.aprvRet === 'INSPECTING') {
          this.descr = this.getApprovalBrandList.descr.replace(/\n/gi, '<br/>')
        } else {
          this.descr = this.getApprovalBrandList.descr
        }
      }
      if (jglib.isEmpty(this.getApprovalBrandList.bgImgFileId)) {
        this.bgImgFileImageDataYn = false
      } else {
        this.setImages('bg', this.getApprovalBrandList.bgImgFileId)
        this.bgImgFileNo = this.getApprovalBrandList.bgImgFileNo
        this.bgImgFileId = this.getApprovalBrandList.bgImgFileId
        this.bgImgFileUrl = this.getApprovalBrandList.bgImgFileUrl
      }

      if (jglib.isEmpty(this.getApprovalBrandList.profileImgFileId)) {
        this.profileImgFileImageDataYn = false
      } else {
        this.setImages('pf', this.getApprovalBrandList.profileImgFileId)
        this.profileImgFileNo = this.getApprovalBrandList.profileImgFileNo
        this.profileImgFileId = this.getApprovalBrandList.profileImgFileId
        this.profileImgFileUrl = this.getApprovalBrandList.profileImgFileUrl
      }
      this.tel = this.getApprovalBrandList.tel

      if (!jglib.isEmpty(this.getApprovalBrandList.menuItemList)) {
        let menuItemList = this.getApprovalBrandList.menuItemList
        menuItemList.forEach(item => {
          this.checkmenuItemList.push(item.menuItemNm)
          this.menuItemList.filter((menu, index) => {
            if (menu.menuItemNm === item.menuItemNm) {
              this.menuItemList[index].visible = true
              this.menuItemList[index].values[0].value = item.webLink
              if (item.menuItemNm === 'App') {
                if (!this.resignation) {
                  this.appMenuDisable = false
                  this.$alertMsg('APP 메뉴 버튼 제공이 일시 중단되었습니다.<br>다른 메뉴 버튼을 설정 해주세요.')
                }
                this.menuItemList[index].values[1].value = item.appPkgNm
                this.menuItemList[index].values[2].value = item.appAct
                this.menuItemList[index].values[3].value = item.appUri
              }
            }
          })
        })
      }
      retrieveCommonCode('EMAIL_DOMAIN').then(res => {
        this.emailDomainList = res.result
        let filter = _.filter(this.emailDomainList, { code: this.emailDomain })
        if (filter.length > 0) {
          this.setEmailDomain = filter[0].code
        }
      })
      this.url = this.getApprovalBrandList.url
      this.email = this.getApprovalBrandList.email
      this.emailList = !jglib.isEmpty(this.email) ? this.email.split('@') : ''
      this.emailId = !jglib.isEmpty(this.emailList) ? this.emailList[0] : ''
      this.emailDomain = !jglib.isEmpty(this.emailList) ? this.emailList[1] : ''
      if (!jglib.isEmpty(this.getApprovalBrandList.addrRegnNo)) {
        this.addrRegnNo = this.getApprovalBrandList.addrRegnNo
      }
      if (!jglib.isEmpty(this.getApprovalBrandList.addrMngNo)) {
        this.addrMngNo = this.getApprovalBrandList.addrMngNo
      }
      if (!jglib.isEmpty(this.getApprovalBrandList.addrDtl)) {
        this.addrDtl = this.getApprovalBrandList.addrDtl
      }
      this.status = this.getApprovalBrandList.status
    },
    setImages(type, fileId) {
      checkBrandDefaultImages(fileId).then(res => {
        const data = res.result
        if (type === 'bg') {
          this.bgImgUse = data !== null ? 1 : 2
          this.bgImgFileImageData = data !== null ? data.name : this.getApprovalBrandList.bgImgFileName
        } else if (type === 'pf') {
          this.profileImgUse = data !== null ? 1 : 2
          this.profileImgFileImageData = data !== null ? data.name : this.getApprovalBrandList.profileImgFileName
        }
      })
    },
    changeMenuCheck(e, targetMenu) {
      if (!jglib.isEmpty(this.checkmenuItemList)) {
        if (this.checkmenuItemList.filter(item => item !== 'App').length > 4) {
          this.$alertMsg('메뉴는 3개까지 선택가능 합니다.')
          this.$nextTick(() => { this.checkmenuItemList.splice(this.checkmenuItemList.indexOf(targetMenu), 1) })
        } else {
          let item = _.find(this.menuItemList, { menuItemNm: targetMenu })
          if (this.checkmenuItemList.indexOf(targetMenu) !== -1) {
            item.visible = true
          } else {
            item.visible = false
            item.values.forEach(v => { v.value = '' })
          }
        }
      }
    },
    chooseDefaultImage(type) {
      this.chooseDefaultData.type = type
      this.chooseDefaultData.id = type === 'background' ? this.bgImgFileId : this.profileImgFileId
      this.chooseDefaultData.src = type === 'background' ? this.bgImgFileUrl : this.profileImgFileUrl
      this.chooseDefault = true
    },
    setDefaultData(data) {
      if (data) {
        if (data.type === 'background') {
          this.bgImgUse = 1
          this.bgImgFileId = data.id
          this.bgImgFileNo = 1
          this.bgImgFileImageData = data.name
          this.bgImgFileUrl = data.src
          this.bgImgFileImageDataYn = true
        }
        if (data.type === 'profile' || (data.type === 'background' && data.setBoth)) {
          this.profileImgUse = 1
          this.profileImgFileId = data.id
          this.profileImgFileNo = 1
          this.profileImgFileImageData = data.name
          this.profileImgFileUrl = data.src
          this.profileImgFileImageDataYn = true
        }
      }
      this.chooseDefault = false
    },
    // 백그라운드 이미지
    onFileChangeBgImgFile(file) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['jpg', 'jpeg', 'png'], 1)
      if (uploadCheck.code === 'errorExt') {
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorSize') {
        this.$alertMsg(uploadCheck.message)
      } else {
        jglib.checkImageSize(files, 388, 388, 1080, 1080).then((valid) => {
          if (valid === 'valid') {
            this.removeBgImgFile()
            this.bgImgFileImageDataYn = true
            this.bgImgUse = 2
            this.bgFileList.push(files)
            this.bgImgFileImageData = file.raw.name
          } else if (valid === 'size') {
            this.$alertMsg('388X388px~1080X1080px 사이즈 파일만 업로드 할 수 있습니다.')
          } else if (valid === 'ratio') {
            this.$alertMsg('1:1 비율의 파일만 업로드 할 수 있습니다.')
          } else {
            this.$alertMsg('이미지 속성이 확장자와 일치하지 않습니다.')
          }
        })
      }
    },
    removeImageBgImgFile() {
      this.$confirmMsg(`백그라운드 이미지를 삭제 하시겠습니까?`, '타이틀', '확인', '취소')
        .then(() => { this.removeBgImgFile() })
    },
    removeBgImgFile() {
      this.bgImgUse = 0
      this.bgImgFileDelYn = 'Y'
      this.bgImgFileImageData = ''
      this.bgFileList = []
      this.bgImgFileImageDataYn = false
      this.bgImgFileId = ''
      this.bgImgFileNo = ''
    },
    // 프로필 이미지
    onFileChangeprofileImgFile(file) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['png'], 1)
      if (uploadCheck.code === 'errorExt') {
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorSize') {
        this.$alertMsg(uploadCheck.message)
      } else {
        jglib.checkImageSize(files, 388, 388, 1080, 1080).then((valid) => {
          if (valid === 'valid') {
            this.removeprofileImgFile()
            this.profileImgFileImageDataYn = true
            this.profileImgUse = 2
            this.profileList.push(files)
            this.profileImgFileImageData = file.raw.name
          } else if (valid === 'size') {
            this.$alertMsg('388X388px~1080X1080px 사이즈 파일만 업로드 할 수 있습니다.')
          } else if (valid === 'ratio') {
            this.$alertMsg('1:1 비율의 파일만 업로드 할 수 있습니다.')
          } else {
            this.$alertMsg('이미지 속성이 확장자와 일치하지 않습니다.')
          }
        })
      }
    },
    removeImageprofileImgFile() {
      this.$confirmMsg(`프로필 이미지를 삭제 하시겠습니까?`, '타이틀', '확인', '취소')
        .then(() => { this.removeprofileImgFile() })
    },
    removeprofileImgFile() {
      this.profileImgUse = 0
      this.profileImgFileDelYn = 'Y'
      this.profileImgFileImageData = ''
      this.profileList = []
      this.profileImgFileImageDataYn = false
      this.profileImgFileId = ''
      this.profileImgFileNo = ''
    },
    getTel(e) {
      let tel = e.target.value
      if (isNaN(tel)) tel = tel.replace(/[^0-9]/g, '')
      this.$emit('getTel', tel)
    },
    openAddressPopup() {
      this.visibleAddressPopup = true
    },
    getAddress(address) {
      this.addrRegnNo = address.zipNo
      this.addrMngNo = address.roadFullAddr
      this.addrDtl = address.detail
    },
    deleteAddress() {
      this.addrRegnNo = ''
      this.addrMngNo = ''
      this.addrDtl = ''
    },
    validation() {
      if (jglib.isEmpty(this.bgImgFileImageData)) {
        this.$alertMsg('백그라운드 이미지를 업로드 해주세요.')
        return false
      }
      if (!jglib.isEmpty(this.menuItemList)) {
        for (let i = 0; i < this.menuItemList.length; i++) {
          let item = this.menuItemList[i]
          if (item.code === 'Call') {
            continue
          }
          if (item.visible && item.check) {
            for (const v of item.values) {
              if (!jglib.isEmpty(v.value)) {
                // 값이 입력된 경우
                if (v.type === 'url' && !jglib.isUrl(v.value)) {
                  // url 형태가 아닌경우
                  if (item.code === 'Web') {
                    this.$alertMsg(`퀵 버튼 설정에서 입력한 ${v.title}가<br>올바른 URL 형식이 아닙니다.<br>올바른 URL 형식으로 입력해주세요.<br>예)http://www.brandportal.com`)
                  } else {
                    this.$alertMsg(`퀵 버튼 설정에서 입력한 ${item.code}의 ${v.title}가<br>올바른 URL 형식이 아닙니다.<br>올바른 URL 형식으로 입력해주세요.<br>예)http://www.portal.com`)
                  }
                  return false
                }
              } else {
                // 값이 입력되지 않은 경우
                if (item.code === 'APP') {
                  if (v.type === 'url') {
                    this.$alertMsg(`퀵 버튼 설정에서 선택하신 ${item.code}의 Web URL 정보를 입력해주세요`)
                  } else {
                    this.$alertMsg(`퀵 버튼 설정에서 선택하신 ${item.code}의 ${v.title} 정보를 입력해주세요`)
                  }
                } else {
                  this.$alertMsg(`퀵 버튼 설정에서 선택하신 ${item.code} 정보를 입력해주세요`)
                }
                return false
              }
            }
          }
        }
      }
      if (jglib.isEmpty(this.profileImgFileImageData)) {
        this.$alertMsg('프로필 이미지를 업로드 해주세요.')
        return false
      }
      if (jglib.isEmpty(this.name)) {
        this.$alertMsg('브랜드명을 입력 해주세요.')
        this.$refs.name.focus()
        return false
      }
      if (jglib.isEmpty(this.descr)) {
        this.$alertMsg('브랜드 설명을 입력 해주세요.')
        this.$refs.descr.focus()
        return false
      }
      if (jglib.isEmpty(this.tel)) {
        this.$alertMsg('전화번호를 입력 해주세요.')
        this.$refs.tel.focus()
        return false
      }
      if (!jglib.isEmpty(this.url) && !jglib.isUrl(this.url)) {
        this.$refs.url.focus()
        this.$alertMsg('입력한 웹 사이트 주소가 올바른 URL 형식이 아닙니다.<br>올바른 URL 형식으로 입력해주세요.<br>예)http://www.brandportal.com')
        return false
      }
      if ((jglib.isEmpty(this.emailId) && jglib.isEmpty(this.emailDomain)) || (!jglib.isEmpty(this.emailId) && !jglib.isEmpty(this.emailDomain))) {
      } else {
        this.$alertMsg('이메일을 입력해주세요.')
        this.$refs.emailId.focus()
        return false
      }
      return true
    },
    getBrandInfo() {
      // this.menuItemList = this.menuItemList.filter(res => {
      //   return res.visible
      // })
      let getmenuItemList = []
      for (let i = 0; i < this.menuItemList.length; i++) {
        let item = this.menuItemList[i]
        if (item.menuItemNm === 'App') {
          // 당분간 앱 사용 중단
          // getmenuItemList.push({
          //   menuItemId: item.menuItemId.toLowerCase(),
          //   webLink: item.values[0].value,
          //   appPkgNm: item.values[1].value,
          //   appAct: item.values[2].value,
          //   appUri: item.values[3].value
          // })
        } else if (item.menuItemNm === 'Chat') {
          getmenuItemList.push({
            menuItemId: item.menuItemId.toLowerCase(),
            webLink: ''
          })
        } else {
          getmenuItemList.push({
            menuItemId: item.menuItemId.toLowerCase(),
            webLink: item.values[0].value
          })
        }
      }
      return {
        corpId: this.getApprovalBrandList.corpId,
        brandId: this.getApprovalBrandList.brandId,
        name: this.name,
        descr: this.descr,
        bgImgFile: this.bgFileList.length > 0 ? this.bgFileList[0] : '',
        bgImgFileId: this.bgImgFileImageDataYn ? this.bgImgFileId : '',
        bgImgFileDelYn: this.bgImgFileDelYn,
        profileImgFile: this.profileList.length > 0 ? this.profileList[0] : '',
        profileImgFileDelYn: this.profileImgFileDelYn,
        profileImgFileId: this.profileImgFileId,
        menuItemList: this.menuItemList.filter(item => item.menuItemNm !== 'App'),
        tel: this.tel,
        url: !jglib.isEmpty(this.url) ? this.url : '',
        email: !jglib.isEmpty(this.emailId) && !jglib.isEmpty(this.emailDomain) ? `${this.emailId}@${this.emailDomain}` : '',
        addr: `${this.addrRegnNo} ${this.addrMngNo} ${this.addrDtl}`,
        addrRegnNo: this.addrRegnNo,
        addrMngNo: this.addrMngNo,
        addrDtl: this.addrDtl,
        status: this.status
      }
    },
    setDescrCarageReturn(carageReuturnVal) {
      if (carageReuturnVal == null || carageReuturnVal === '') {
        return carageReuturnVal
      }
      return carageReuturnVal.replace(/(?:\r\n|\r|\n)/g, '<br />')
    },
    clickMiriCanvas() {
      this.$router.push({ name: 'miricanvas' })
    }
  }
}
</script>
