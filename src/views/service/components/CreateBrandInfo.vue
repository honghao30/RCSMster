<template>
  <div class="rcs_emul_form_cont">
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">
        브랜드 명
        <span class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input">
          <input type="text" ref="name" v-model.trim="name" placeholder="브랜드명" maxlength="20">
        </span>
        <span class="count">({{name.length}}/20자)</span>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle v_top">
        브랜드 설명
        <span class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle">
        <span class="custom_textarea">
          <textarea ref="descr" v-model.trim="descr" maxlength="150" ></textarea>
        </span>
        <span class="count">({{descr.length}}/150자)</span>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">백그라운드 이미지</strong>
      <div class="rcs_cont_bundle">
        <div class="box_add_file">
          <el-upload ref action :on-change="onBgFileChange" :file-list="bgFileList" :auto-upload="false">
            <a href="javascript:void(0);" size="small" type="primary" class="btn sml bd_black">파일선택</a>
          </el-upload>
          <span v-show="!bgFileDescFlag" class="text_desc add_file">최대사이즈 : 1080X1080px / 1:1 비율 권장 / 파일형식 : jpg, png (최대1MB)</span>
          <span v-show="bgFileDisplayFlag" class="text_desc add_file">
            {{this.bgImgFileNm}}
            <a href="javascript:void(0);" class="btn_delete" @click="bgFileBeforeRemove"><span>삭제</span></a>
          </span>
        </div>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">
        프로필 이미지
        <span class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle">
        <div class="box_add_file">
          <el-upload ref action="https://jsonplaceholder.typicode.com/posts/" :on-change="onProfileFileChange" :file-list="profileFileList" :auto-upload="false">
            <a href="javascript:void(0);" size="small" type="primary" class="btn sml bd_black">파일선택</a>
          </el-upload>
          <span v-show="!profileFileDescFlag" class="text_desc add_file">최대사이즈 : 1080X1080px / 1:1 비율 권장 / 파일형식 : png (최대1MB)</span>
          <span v-show="profileFileDisplayFlag" class="text_desc add_file">
            {{this.profileImgFileNm}}
            <a href="javascript:void(0);" class="btn_delete" @click="profileFileBeforeRemove">
              <span>삭제</span>
            </a>
          </span>
        </div>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">
        전화번호
        <span class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input short">
          <input type="text" ref="tel" v-model="tel" @input="getTel($event)" placeholder="‘-’없이 입력" maxlength="12">
        </span>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle v_top">메뉴 버튼 설정</strong>
      <div class="rcs_cont_bundle">
        <ul class="rcs_ui_list">
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui01" checked disabled>
              <label for="ui01">Chat</label>
            </span>
          </li>
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui02" v-model="checkedMenus" value="Call" @change="changeMenuCheck($event, 'Call')" ref="menuItem">
              <label for="ui02">Call</label>
            </span>
          </li>
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui03" v-model="checkedMenus" value="Web" @change="changeMenuCheck($event, 'Web')" ref="menuItem">
              <label for="ui03">Web</label>
            </span>
          </li>
          <!-- <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui04" v-model="checkedMenus" value="APP" @change="changeMenuCheck($event, 'APP')" ref="menuItem">
              <label for="ui04">APP</label>
            </span>
          </li> -->
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui05" v-model="checkedMenus" value="Store" @change="changeMenuCheck($event, 'Store')" ref="menuItem">
              <label for="ui05">Store</label>
            </span>
          </li>
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui06" v-model="checkedMenus" value="Order" @change="changeMenuCheck($event, 'Order')" ref="menuItem">
              <label for="ui06">Order</label>
            </span>
          </li>
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui07" v-model="checkedMenus" value="Buy" @change="changeMenuCheck($event, 'Buy')" ref="menuItem">
              <label for="ui07">Buy</label>
            </span>
          </li>
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui08" v-model="checkedMenus" value="Ticket" @change="changeMenuCheck($event, 'Ticket')" ref="menuItem">
              <label for="ui08">Ticket</label>
            </span>
          </li>
          <li>
            <span class="custom_checkbox">
              <input type="checkbox" id="ui09" v-model="checkedMenus" value="Moreinfo" @change="changeMenuCheck($event, 'Moreinfo')" ref="menuItem">
              <label for="ui09">Moreinfo</label>
            </span>
          </li>
        </ul>
        <ul class="box_ui_field">
          <!-- APP 이외 -->
          <li v-for="(item, index) in checkedMenuDataNoAppList" :key="index + item.code">
            <strong class="tit_ui_field">
              - {{item.code}}
              <span class="require">*</span>
            </strong>
            <div class="cont_ui_field">
              <!-- Web -->
              <span class="custom_input" v-if="item.code === 'Web'">
                <input type="text" v-model="item.values[0].value" placeholder="http://www.rcsbizcenter.com 형식으로 입력" @input="item.values[0].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="100">
              </span>
              <!-- Store, Order, Buy, Ticket, Moreinfo -->
              <span class="custom_input" v-if="item.code !== 'Chat' && item.code !== 'Call' && item.code !== 'Web'">
                <input type="text" v-model="item.values[0].value" placeholder="Web URL (http://www.portal.com )" @input="item.values[0].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="100">
              </span>
            </div>
          </li>
          <!-- APP -->
          <li v-for="(item, index) in checkedMenuDataApp" :key="`1_${index}`">
            <strong class="tit_ui_field">
              - {{item.code}}
              <span class="require">*</span>
            </strong>
            <div class="cont_ui_field">
              <span class="custom_input">
                <input type="text" v-model="item.values[0].value" placeholder="Web URL (http://www.portal.com )" @input="item.values[0].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="100">
              </span>
              <span class="custom_input">
                <input type="text" v-model="item.values[1].value" placeholder="Package Name (예: com.android.search)" @input="item.values[1].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="40">
              </span>
            </div>
          </li>
          <li v-for="(item, index) in checkedMenuDataApp" :key="`2_${index}`">
            <strong class="tit_ui_field"></strong>
            <div class="cont_ui_field">
              <span class="custom_input">
                <input type="text" v-model="item.values[2].value" placeholder="Action (예: android.intent.action.VIEW)" @input="item.values[2].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="40">
              </span>
              <span class="custom_input">
                <input type="text" v-model="item.values[3].value" placeholder="URI (예: rcsbizcenter.com/1.html)" @input="item.values[3].value=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="40">
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">
        카테고리 1
        <span class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle">
        <span class="custom_select mid">
          <select ref="bizCateGrp" v-model="bizCateGrp" @change="changeCategory">
            <option value>선택하세요</option>
            <option v-for="item in bizCateGrpList" :value="item.code" :key="item.code">{{item.codeNm}}</option>
          </select>
        </span>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">
        카테고리 2
        <span class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle">
        <span class="custom_select mid">
          <select ref="bizCateCd" v-model="bizCateCd">
            <option value>선택하세요</option>
            <option v-for="item in bizCateCdList" :value="item.code" :key="item.code">{{item.codeNm}}</option>
          </select>
        </span>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">카테고리 3</strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input">
          <input type="text" v-model.trim="cate3" maxlength="10" placeholder="검색용 키워드를 입력하세요">
        </span>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">홈페이지 주소</strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input">
          <input type="text" ref="url" v-model="url" placeholder="http://www.rcsbizcenter.com 형식으로 입력" @input="url=ignoreChar($event, ['WHITESPACE','KOR'])" maxlength="100">
        </span>
      </div>
    </div>
    <div class="rcs_item_bundle">
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
              <option v-for="item in emailDomainList" :value="item.code" :key="item.code">{{item.codeNm}}</option>
            </select>
          </span>
        </div>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle v_top">주소</strong>
      <div class="rcs_cont_bundle">
        <div class="address_search_area">
          <div class="input_search_bundle">
            <span class="custom_input">
              <input type="text" ref="addrRegnNo" v-model="addrRegnNo" readonly>
            </span>
            <a href="javascript:void(0);" ref="modal" class="btn sml bd_black" @click="openAddressPopup">우편번호</a>
            <a href="javascript:void(0);" ref="modal" class="btn sml bd_black" @click="deleteAddress">삭제</a>
            <address-popup v-if="visibleAddressPopup" :visible.sync="visibleAddressPopup" @getData="getAddress"></address-popup>
          </div>
          <div class="input_address_bundle">
            <span class="custom_input"><input type="text" v-model="addrMngNo" readonly></span>
            <span class="custom_input"><input type="text" v-model="addrDtl" readonly></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import { retrieveCommonCode } from '@/api/common/code'
import { ignoreChar } from '@/utils/check'
import AddressPopup from '@/components/address'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  components: {
    AddressPopup
  },
  props: {
    loadBrandInfo: {
      type: Object,
      require: false
    }
  },
  data() {
    return {
      corpId: '',
      name: '',
      descr: '',
      tel: '',
      menuItemList: [],
      bizCateGrp: '',
      bizCateGrpList: [],
      bizCateCd: '',
      bizCateCdList: [],
      emailDomainList: [],
      cate3: '',
      url: '',
      email: '', // 추후 emailId 와 emailDomain 합쳐서 넣어줌.
      emailId: '',
      emailDomain: '',
      setEmailDomain: '',
      addrRegnNo: '',
      addrMngNo: '',
      addrDtl: '',

      checkedMenus: ['Chat', 'Call'], // 초기 메뉴체크 기본값 'Chat', 'Call' 셋팅
      checkedMenuDatas: [
        {
          code: 'Chat',
          visible: true,
          values: [{ value: '' }]
        },
        {
          code: 'Call',
          visible: true,
          values: [{ value: '' }]
        },
        {
          code: 'Web',
          visible: false,
          values: [{ value: '', type: 'url', title: 'Web(웹사이트) 주소' }],
          check: true
        },
        // {
        //   code: 'APP',
        //   visible: false,
        //   values: [
        //     {value: '', type:'url', title:'Web URL(웹사이트) 주소'},
        //     {value: '', type:'text', title:'Package Name'},
        //     {value: '', type:'text', title:'Action'},
        //     {value: '', type:'text', title:'URI'}
        //   ],
        //   check: true
        // },
        {
          code: 'Store',
          visible: false,
          values: [{ value: '', type: 'url', title: 'Web URL 주소' }],
          check: true
        },
        {
          code: 'Order',
          visible: false,
          values: [{ value: '', type: 'url', title: 'Web URL 주소' }],
          check: true
        },
        {
          code: 'Buy',
          visible: false,
          values: [{ value: '', type: 'url', title: 'Web URL 주소' }],
          check: true
        },
        {
          code: 'Ticket',
          visible: false,
          values: [{ value: '', type: 'url', title: 'Web URL 주소' }],
          check: true
        },
        {
          code: 'Moreinfo',
          visible: false,
          values: [{ value: '', type: 'url', title: 'Web URL 주소' }],
          check: true
        }
      ],
      bgImgFileNm: '',
      bgImgFileId: null,
      bgImgFileNo: null,
      bgFileList: [],
      profileImgFileNm: '',
      profileImgFileId: null,
      profileImgFileNo: null,
      profileFileList: [],
      visibleAddressPopup: false
    }
  },
  created() {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
    // 카테고리1 리스트 가져오는 함수
    retrieveCommonCode('BIZ_CATE_GRP', null, 'Y').then(res => {
      this.bizCateGrpList = res.result
    })
    retrieveCommonCode('EMAIL_DOMAIN').then(res => {
      this.emailDomainList = res.result
      let filter = _.filter(this.emailDomainList, { code: this.emailDomain })
      if (filter.length > 0) {
        this.setEmailDomain = filter[0].code
      }
    })
    this.getBrandInfo()
  },
  mounted() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
    // onload 상태와 동일하다. DOM 이후에 조작할 경우 이곳에서 수행
    this.$emit('changeBrandInfo', this.brandInfoData)
  },
  watch: {
    loadBrandInfo: {
      deep: true,
      handler(brandInfo) {
        // 복사한 브랜드의 정보를 입력한다. 필수 입력값이 아닌 항목의 데이터가 없는 경우 동일하게 처리하기 위해 기존 값을 삭제한다.
        // 브랜드명
        this.name = ''
        // 설명
        if (brandInfo.descr) {
          this.descr = brandInfo.descr
        }
        // 전화번호
        if (brandInfo.tel) {
          this.tel = brandInfo.tel
        }
        // 백그라운드 이미지
        this.bgFileRemove()
        if (brandInfo.bgImgFileId) {
          this.bgImgFileNm = brandInfo.bgImgFileName
          this.bgImgFileId = brandInfo.bgImgFileId
          this.bgImgFileNo = brandInfo.bgImgFileNo
        }
        // 프로필 이미지
        this.profileFileRemove()
        if (brandInfo.profileImgFileId) {
          this.profileImgFileNm = brandInfo.profileImgFileName
          this.profileImgFileId = brandInfo.profileImgFileId
          this.profileImgFileNo = brandInfo.profileImgFileNo
        }
        // 카테고리 1, 2
        if (brandInfo.bizCateGrp) {
          this.bizCateGrp = brandInfo.bizCateGrp
          this.changeCategory(brandInfo.bizCateCd)
        }
        // 카테고리 3
        this.cate3 = brandInfo.cate3 ? brandInfo.cate3 : ''
        // 메뉴 초기화
        this.checkedMenus = ['Chat', 'Call']
        this.checkedMenuDatas.forEach(data => {
          data.visible = (data.code === 'Chat' || data.code === 'Call')
          data.values.forEach(v => {
            v.value = ''
          })
        })
        // 메뉴 할당
        if (brandInfo.menuItemList) {
          this.checkedMenus = []
          brandInfo.menuItemList.forEach(menu => {
            this.checkedMenuDatas.forEach(checked => {
              if (checked.code.toUpperCase() === menu.menuItemNm.toUpperCase()) {
                this.checkedMenus.push(checked.code)
                if (checked.code === 'Chat' || checked.code === 'Call') {
                  checked.visible = true
                } else if (checked.code === 'APP') {
                  checked.visible = true
                  checked.values[0].value = menu.webLink
                  checked.values[1].value = menu.appPkgNm
                  checked.values[2].value = menu.appAct
                  checked.values[3].value = menu.appUri
                } else {
                  checked.visible = true
                  checked.values[0].value = menu.webLink
                }
              }
            })
          })
        }
        // 홈페이지
        this.url = brandInfo.url ? brandInfo.url : null
        // 주소
        if (brandInfo.addrRegnNo) {
          this.addrRegnNo = brandInfo.addrRegnNo
          this.addrMngNo = brandInfo.addrMngNo
          this.addrDtl = brandInfo.addrDtl
        } else {
          this.addrRegnNo = ''
          this.addrMngNo = ''
          this.addrDtl = ''
        }
        // 이메일
        if (brandInfo.email) {
          const email = brandInfo.email.split('@')
          this.emailId = email[0]
          this.emailDomain = email[1]
        } else {
          this.emailId = ''
          this.emailDomain = ''
        }
        // 이메일 도메인 초기화(직접입력)
        this.setEmailDomain = ''
        this.$emit('getTel', this.tel)
      }
    },
    brandInfoData: {
      deep: true,
      handler(brandInfo) {
        this.$emit('changeBrandInfo', brandInfo)
      }
    },
    setEmailDomain(value) {
      if (value) {
        this.emailDomain = value
      }
    }
  },
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
    // method를 바로 연결하면 tic 단위로 계속 실행되기 때문에, 값이 변경할 때만 수행되고,
    // cache로 남는 computed를 활용하는 것이 성능에 좋음
    bgFileDisplayFlag() {
      return !jglib.isEmpty(this.bgImgFileNm)
    },
    bgFileDescFlag() {
      return !jglib.isEmpty(this.bgImgFileNm)
    },
    profileFileDisplayFlag() {
      return !jglib.isEmpty(this.profileImgFileNm)
    },
    profileFileDescFlag() {
      return !jglib.isEmpty(this.profileImgFileNm)
    },
    brandInfoData() {
      // this.name.replace(/<|>|\(|\)|'|on.*\(|eval\(|<|\/>|javascript|&lt|&gt|&#x0003C|&#60|&#x0003E|&#62|&#39/gi,'')
      /* eslint-disable */
      this.name = this.name.replace(/<|>|\(|\)|on.*\(|eval\(|<|\/>|javascript|&lt|&gt|&#x0003C|&#60|&#x0003E|&#62/gi, '')
      this.descr = this.descr.replace(/<|>|\(|\)|on.*\(|eval\(|<|\/>|javascript|&lt|&gt|&#x0003C|&#60|&#x0003E|&#62/gi, '')
      this.tel = this.tel.replace(/[^0-9]/g, '')
      /* eslint-disable */
      return {
        name: this.name,
        descr: this.descr,
        tel: this.tel,
        menuItemList: this.menuItemList,
        bizCateGrp: this.bizCateGrp,
        bizCateCd: this.bizCateCd,
        cate3: this.cate3,
        // url: this.url,
        // email: `${this.emailId}@${this.emailDomain}`,
        url: !jglib.isEmpty(this.url) ? this.url : '',
        email: !jglib.isEmpty(this.emailId) && !jglib.isEmpty(this.emailDomain) ? `${this.emailId}@${this.emailDomain}` : '',
        addrRegnNo: this.addrRegnNo,
        addrMngNo: this.addrMngNo,
        addrDtl: this.addrDtl,
        bgImgFile: this.bgFileList.length > 0 ? this.bgFileList[0] : null,
        bgImgFileId: this.bgImgFileId,
        bgImgFileNo: this.bgImgFileNo,
        profileImgFile: this.profileFileList.length > 0 ? this.profileFileList[0] : null,
        profileImgFileId: this.profileImgFileId,
        profileImgFileNo: this.profileImgFileNo
      }
    },
    emailFormFlag() {
      return !jglib.isEmpty(this.setEmailDomain)
    },
    checkedMenuDataNoAppList() {
      return this.checkedMenuDatas.filter(opt => opt.visible && opt.code !== 'APP' && opt.code !== 'Chat' && opt.code !== 'Call')
    },
    checkedMenuDataApp() {
      return this.checkedMenuDatas.filter(opt => opt.visible && opt.code === 'APP')
    }
  },
  methods: {
    ignoreChar,
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    },
    onBgFileChange(file, fileList) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['jpg', 'jpeg', 'png'], 1)
      if (uploadCheck.code === 'errorExt') {
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorSize') {
        this.$alertMsg(uploadCheck.message)
      } else {
        jglib.checkImageSize(files, 388, 388, 1080, 1080).then((valid) => {
          if (valid === 'valid') {
            this.bgFileRemove()
            this.bgFileList.push(files)
            this.bgImgFileNm = files.name
          } else if (valid === 'size') {
            this.$alertMsg('최소(388X388px), 최대(1080X1080px) 사이즈 파일만 업로드 할 수 있습니다.')
          } else {
            this.$alertMsg('이미지 속성이 확장자와 일치하지 않습니다.')
          }
        })
      }
    },
    bgFileRemove(file, fileList) {
      this.bgFileList = []
      this.bgImgFileNm = ''
      // 불러오기를 통해 할당 된 정보 삭제
      this.bgImgFileId = null
      this.bgImgFileNo = null
    },
    bgFileBeforeRemove(file, fileList) {
      let fileNm = this.bgFileList.length === 0 ? this.bgImgFileNm : this.bgFileList[0].name
      return this.$confirmMsg(`${fileNm} 파일을 삭제 하시겠습니까?`)
        .then(res => { this.bgFileRemove() })
        .catch(e => {})
    },
    // 프로필 이미지 업로드 관련 함수
    onProfileFileChange(file, fileList) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['png'], 1)
      if (uploadCheck.code === 'errorExt') {
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorSize') {
        this.$alertMsg(uploadCheck.message)
      } else {
        jglib.checkImageSize(files, 388, 388, 1080, 1080).then((valid) => {
          if (valid === 'valid') {
            this.profileFileRemove()
            this.profileFileList.push(files)
            this.profileImgFileNm = files.name
          } else if (valid === 'size') {
            this.$alertMsg('최소(388X388px), 최대(1080X1080px) 사이즈 파일만 업로드 할 수 있습니다.')
          } else {
            this.$alertMsg('이미지 속성이 확장자와 일치하지 않습니다.')
          }
        })
      }
    },
    profileFileRemove(file, fileList) {
      this.profileFileList = []
      this.profileImgFileNm = ''
      // 불러오기를 통해 할당 된 정보 삭제
      this.profileImgFileId = null
      this.profileImgFileNo = null
    },
    profileFileBeforeRemove(file, fileList) {
      let fileNm = this.profileFileList.length === 0 ? this.profileImgFileNm : this.profileFileList[0].name
      return this.$confirmMsg(`${fileNm} 파일을 삭제 하시겠습니까?`)
        .then(res => { this.profileFileRemove() })
        .catch(e => {})
    },
    changeMenuCheck(e, targetMenu) {
      if (this.checkedMenus.length > 4) {
        this.$alertMsg('메뉴는 3개까지 선택가능 합니다.')
        // 메뉴아이템 선택 한 것이 상한에 걸릴경우 체크박스 처리.
        this.$nextTick(res => { this.checkedMenus.splice(this.checkedMenus.indexOf(targetMenu), 1) })
      } else {
        let target = _.find(this.checkedMenuDatas, { code: targetMenu })
        if (this.checkedMenus.indexOf(targetMenu) !== -1) {
          target.visible = true
        } else {
          target.visible = false
          target.values.forEach(v => { v.value = '' })
        }
      }
      this.getBrandInfo()
    },
    changeCategory(bizCateCd) {
      retrieveCommonCode('BIZ_CATE_GRP', this.bizCateGrp, 'Y')
        .then(res => {
          this.bizCateCd = ''
          this.bizCateCdList = res.result
        })
        .finally(() => {
          if (bizCateCd && typeof bizCateCd === 'string') {
            this.bizCateCd = bizCateCd
          }
        })
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
    getBrandInfo() {
      let list = this.checkedMenuDatas
      list = list.filter(res => { return res.visible })
      this.menuItemList = list
      return this.brandInfoData
    },
    getTel(e) {
      this.$emit('getTel', e.target.value)
    },
    validation() {
      if (jglib.isEmpty(this.name)) {
        this.$alertMsg('브랜드 명을 입력해 주세요.')
        this.$refs.name.focus()
        return false
      }
      if (jglib.isEmpty(this.descr)) {
        this.$alertMsg('브랜드 설명을 입력 해주세요.')
        this.$refs.descr.focus()
        return false
      }
      if (jglib.isEmpty(this.profileImgFileNm)) {
        this.$alertMsg('프로필 이미지를 업로드 해주세요.')
        return false
      }
      if (jglib.isEmpty(this.tel)) {
        this.$alertMsg('전화번호를 입력해 주세요.')
        this.$refs.tel.focus()
        return false
      }
      for (let i = 0; i < this.checkedMenuDatas.length; i++) {
        const item = this.checkedMenuDatas[i]
        if (item.visible && item.check) {
          for (const v of item.values) {
            if (!jglib.isEmpty(v.value)) {
              // 값이 입력된 경우
              if (v.type === 'url' && !jglib.isUrl(v.value)) {
                // url 형태가 아닌경우
                if (item.code === 'Web') {
                  this.$alertMsg(`메뉴 버튼 설정에서 입력한 ${v.title}가<br>올바른 URL 형식이 아닙니다.<br>올바른 URL 형식으로 입력해주세요.<br>예)http://www.rcsbizcenter.com`)
                } else {
                  this.$alertMsg(`메뉴 버튼 설정에서 입력한 ${item.code}의 ${v.title}가<br>올바른 URL 형식이 아닙니다.<br>올바른 URL 형식으로 입력해주세요.<br>예)http://www.rcsbizcenter.com`)
                }
                return false
              }
            } else {
              // 값이 입력되지 않은 경우
              if (item.code === 'APP') {
                if (v.type === 'url') {
                  this.$alertMsg(`메뉴 버튼 설정에서 선택하신 ${item.code}의 Web URL 정보를 입력해주세요`)
                } else {
                  this.$alertMsg(`메뉴 버튼 설정에서 선택하신 ${item.code}의 ${v.title} 정보를 입력해주세요`)
                }
              } else {
                this.$alertMsg(`메뉴 버튼 설정에서 선택하신 ${item.code} 정보를 입력해주세요`)
              }
              return false
            }
          }
        }
      }
      if (jglib.isEmpty(this.bizCateGrp)) {
        this.$alertMsg('카테고리1을 선택해 주세요.')
        this.$refs.bizCateGrp.focus()
        return false
      }
      if (jglib.isEmpty(this.bizCateCd)) {
        this.$alertMsg('카테고리2를 선택해 주세요.')
        this.$refs.bizCateCd.focus()
        return false
      }
      if (!jglib.isEmpty(this.url) && !jglib.isUrl(this.url)) {
        this.$alertMsg('입력한 홈페이지 주소가 올바른 URL 형식이 아닙니다.<br>올바른 URL 형식으로 입력해주세요.<br>예)http://www.rcsbizcenter.com')
        this.$refs.url.focus()
        return false
      }
      if (jglib.isEmpty(this.emailId) && jglib.isEmpty(this.emailDomain) || (!jglib.isEmpty(this.emailId) && !jglib.isEmpty(this.emailDomain))) {
      } else {
        this.$alertMsg('이메일을 입력해주세요.')
        this.$refs.emailId.focus()
        return false
      }
      // if (jglib.isEmpty(this.url)) {
      //   this.$alertMsg('URL을 입력해 주세요.')
      //   this.$refs.url.focus()
      //   return false
      // }
      // if (jglib.isEmpty(this.emailId) || jglib.isEmpty(this.emailDomain)) {
      //   this.$alertMsg('이메일을 입력해주세요.')
      //   this.$refs.emailId.focus()
      //   return false
      // }
      // if (jglib.isEmpty(this.addrRegnNo)) {
      //   this.$alertMsg('주소를 입력해주세요.')
      //   this.$refs.addrRegnNo.focus()
      //   return false
      // }

      return true
    }
  }
}
</script>
