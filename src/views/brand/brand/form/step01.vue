<template>
  <div class="brand__wrap brand_create">
    <div class="brand__inner">
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 개설" />
        <StepList :stepActiveIndex="1" :stepTitle="stepTitle" />
        <PageTitleH3 titleh3="기본 정보 입력"/>
        <form  ref="form">
          <div class="brand_wrap">
            <div class="table__wrap">
              <table class="table table-bodyonly form-table">
                <colgroup>
                  <col width="230px">
                  <col />
                </colgroup>
                <tbody>
                <tr>
                  <th scope="row"><span class="form-item__label required">브랜드명</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item input-limit">
                              <span class="input">
                                <input type="text" class="input" maxlength="20" placeholder="브랜드명을 입력해주세요."
                                  v-model.trim="brandDetail.name"
                                  @input="e => brandDetail.name = e.target.value"
                                  @blur="brandNameErrorMsg = isEmpty(brandDetail.name)"
                                  ref="name">
                                <p class="input-limit__text">
                                  {{ brandDetail.name.length }}/20자
                                </p>
                              </span>
                        </div>
                      </div>
                      <p class="guide-text error" v-if="brandNameErrorMsg">브랜드명을 입력해주세요.</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span class="form-item__label required">브랜드 소개</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item input-limit">
                          <div class="textarea">
                            <textarea maxlength="150" placeholder="브랜드의 슬로건이나 브랜드 특징을 나타내는 소개글을 입력해주세요."
                            v-model="brandDetail.description"
                            @input="e => brandDetail.description = e.target.value"
                            @blur="brandDescriptionErrorMsg = isEmpty(brandDetail.description)"
                            ref="description"></textarea>
                            <div class="textarea-limit__text">
                              <p>
                                {{ brandDetail.description.length }}/150자
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p class="guide-text error" v-if="brandDescriptionErrorMsg">브랜드 소개를 입력해주세요.</p>
                    </div>
                  </td>
                </tr>
                <!-- 선거용으로 추가된 항목 -->
                <template v-if="isSeasonBrand">
                  <tr>
                    <th scope="row">
                      <span class="form-item__label required">본인 인증</span>
                        <!-- 툴팁 -->
                        <ToolTipEl
                          direction="bottomPos"
                          elAlign="leftType"
                          width="418"
                          mode="default"
                        >
                          <template slot="tooltip-message">
                              <div class="message__innerbox"
                              >
                              <ul>
                                  <li>개인 신분증 사본 또는 인감증명을 등록해 주세요.</li>
                                  <li>파일이 여러 개인 경우, zip 파일로 압축하여 등록해 주세요.</li>
                              </ul>
                              </div>
                          </template>
                        </ToolTipEl>
                        <!-- // 툴팁 -->
                    </th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="radiobox">
                              <input type="radio" name="certificationChk" id="phoneType" v-model="brandDetail.certificationType" value="phone"/>
                              <label for="phoneType"><span class="checkbox__text">휴대폰 인증</span></label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" name="certificationChk" id="upfileType" v-model="brandDetail.certificationType" value="upfile" />
                              <label for="upfileType"><span class="checkbox__text">첨부파일 인증</span></label>
                            </span>
                          </div>
                          <template v-if="brandDetail.certificationType === 'phone'">
                            <div class="input-item">
                                <span class="input"><input type="text" class="input" placeholder="‘-’없이 자리 숫자만 입력해주세요." v-model="brandDetail.phone"></span>
                                <ButtonCmp
                                    type="btn-default-line"
                                >
                                휴대폰 인증
                                </ButtonCmp>
                            </div>
                            <!-- 에러 메시지 -->
                            <!-- <p class="guide-text error">휴대폰 번호을 입력해주세요.</p> -->
                          </template>
                          <template v-if="brandDetail.certificationType === 'upfile'">
                            <div class="input-item">
                              <span class="input"><input type="text" class="input" :value="brandDetail.certificationFileUrl" disabled ></span>
                              <input type="file" id="certificationFileUp" class="input blind" @change="onCertificaChanged" ref="certificationFileUrl">
                              <label for="certificationFileUp" class="btn btn-default-line">파일찾기</label>
                            </div>
                            <p class="guide-text black">&middot; 파일형식: JPG, PNG, TIFF, PDF, ZIP(최대 70MB)</p>
                          </template>
                        </div>
                        <p class="guide-text error"  v-if="bgImageErrorMsg">백그라운드 이미지를 선택하세요.</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span class="form-item__label required">신분 증명</span>
                        <!-- 툴팁 -->
                        <ToolTipEl
                          direction="bottomPos"
                          elAlign="leftType"
                          width="418"
                          mode="default"
                        >
                          <template slot="tooltip-message">
                              <div class="message__innerbox"
                              >
                              <ul>
                                  <li>임명직 : 신분/임명장 등 증명서류</li>
                                  <li>선거 후보자 : 선관위 등록 서류, 선관위 화면 스크린 샷 등 후보자임을 증명할 수 있는 서류</li>
                                  <li>파일이 여러 개인 경우, zip 파일로 압축하여 등록해 주세요.</li>
                              </ul>
                              </div>
                          </template>
                        </ToolTipEl>
                        <!-- // 툴팁 -->
                    </th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="input"><input type="text" class="input" :value="brandDetail.identityFileUrl" disabled></span>
                            <input type="file" id="identityFileUp" class="input blind" @change="onIdentityChanged" ref="identityFileUrl">
                            <label for="identityFileUp" class="btn btn-default-line">파일찾기</label>
                          </div>
                          <p class="guide-text black">&middot; 파일형식: JPG, PNG, TIFF, PDF, ZIP(최대 70MB)</p>
                        </div>
                        <!-- <p class="guide-text error">신분 증명 이미지를 선택하세요.</p> -->
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label required">대행사 위임증명</span>
                        <!-- 툴팁 -->
                        <ToolTipEl
                          direction="bottomPos"
                          elAlign="leftType"
                          width="418"
                          mode="default"
                        >
                          <template slot="tooltip-message">
                              <div class="message__innerbox"
                              >
                              <ul>
                                  <li>개인과 대행사간의 위임 서류를 등록해 주세요.</li>
                                  <li>파일이 여러 개인 경우, zip 파일로 압축하여 등록해 주세요.</li>
                              </ul>
                              </div>
                          </template>
                        </ToolTipEl>
                        <!-- // 툴팁 -->
                    </th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="input"><input type="text" class="input" :value="brandDetail.agentWarrantFileUrl" disabled></span>
                            <input type="file" id="agentWarrantFileUp" class="input blind" @change="onAgentWarrantChanged" ref="agentWarrantFileUrl">
                            <label for="agentWarrantFileUp" class="btn btn-default-line">파일찾기</label>
                          </div>
                          <p class="guide-text black">&middot; 사이즈 : 388 X 388px ~ 1080 X 1080px / 1:1 비율 / 파일형식: JPG, PNG (최대 1MB)</p>
                        </div>
                        <!-- <p class="guide-text error">백그라운드 이미지를 선택하세요.</p> -->
                      </div>
                    </td>
                  </tr>
                  <!-- //선거용으로 추가된 항목 -->
                </template>
                <tr>
                  <th scope="row"><span class="form-item__label required">백그라운드 이미지</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="radiobox">
                            <input type="radio" id="bgCustom" v-model="bgImageType" value="custom"/>
                            <label for="bgCustom"><span class="checkbox__text">직접 등록</span></label>
                          </span>
                          <span class="radiobox">
                            <input type="radio" id="bgDefault" v-model="bgImageType" value="default"/>
                            <label for="bgDefault"><span class="checkbox__text">기본 이미지 사용</span></label>
                          </span>
                        </div>
                        <template v-if="bgImageType === 'default'">
                          <ul class="profile-img-list">
                            <!-- 디자인 1차 수정 : 이벤트 처리 수정 -->
                            <li v-for="(bgItem, i) in fileInfo.defaultImg" :key="i" @click="bgImageCheck(i, bgItem.id, bgItem.src)"
                            :class="{ active : bgActiveNum === i }">
                                <span class="profile-img">
                                  <img :src="`${bgItem.src }`" alt="">
                                </span>
                              <span class="img__text">{{ bgItem.name }}</span>
                            </li>
                          </ul>
                          <p class="checkbox">
                            <input type="checkbox" id="defaultImg" v-model="isSameImage" @change="profileChange">
                            <label for="defaultImg">프로필 이미지에도 동일한 이미지를 사용합니다.</label>
                          </p>
                        </template>
                        <template v-if="bgImageType === 'custom'">
                          <div class="input-item">
                            <span class="input"><input type="text" class="input" :value="brandDetail.bgImgFileNm" disabled></span>
                            <input type="file" id="bgImgFileUp" class="input blind" @change="onBgFileChanged" ref="bgImgFileUrl">
                            <label for="bgImgFileUp" class="btn btn-default-line">파일찾기</label>
                          </div>
                          <p class="guide-text black">&middot; 사이즈 : 388 X 388px ~ 1080 X 1080px / 1:1 비율 / 파일형식: JPG, PNG (최대 1MB)</p>
                        </template>
                      </div>
                      <p class="guide-text error"  v-if="bgImageErrorMsg && isEmpty(brandDetail.bgImgFileUrl)">백그라운드 이미지를 선택하세요.</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span class="form-item__label required">프로필 이미지</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="radiobox">
                            <input type="radio" id="profileCustom" v-model="profileImageType" value="custom"/>
                            <label for="profileCustom"><span class="checkbox__text">직접 등록</span></label>
                          </span>
                          <span class="radiobox">
                            <input type="radio" id="profileDefault" v-model="profileImageType" value="default"/>
                            <label for="profileDefault"><span class="checkbox__text">기본 이미지 사용</span></label>
                          </span>
                        </div>
                        <template v-if="profileImageType === 'default'">
                          <ul class="profile-img-list">
                            <!-- 디자인 1차 수정 : 이벤트 처리 수정 -->
                            <li v-for="(item, i) in fileInfo.defaultImg" :key="i" @click="pfImageCheck(i, item.id, item.src)"
                            :class="{ active : profileActiveNum === i }">
                                <span class="profile-img">
                                  <img :src="`${item.src }`" alt="">
                                </span>
                              <span class="img__text">{{ item.name }}</span>
                            </li>
                          </ul>
                        </template>
                        <template v-if="profileImageType === 'custom'">
                          <div class="input-item">
                            <span class="input"><input type="text" class="input" :value="brandDetail.profileImgFileNm" disabled></span>
                            <input type="file" id="profileImgFileUp" class="input blind" @change="onProfileFileChange" ref="profileImgFileUrl">
                            <label for="profileImgFileUp" class="btn btn-default-line">파일찾기</label>
                          </div>
                          <p class="guide-text black">&middot; 사이즈 : 388 X 388px ~ 1080 X 1080px / 1:1 비율 / 파일형식: JPG, PNG (최대 1MB)</p>
                        </template>
                      </div>
                      <p class="guide-text error"  v-if="profileImageErrorMsg && isEmpty(brandDetail.profileImgFileUrl)">프로필 이미지를 선택하세요.</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span class="form-item__label required">카테고리</span></th>
                  <td>
                    <div class="form-item__content" ref="categoryId">
                      <div class="form-item-row">
                        <div class="input-item">
                          <Dropdown ref="cateDropdown" :options="bizCateGrpList" placeholder="선택하세요" v-model="brandDetail.categoryId" :value="brandDetail.categoryId" @change="changeMainCategory">
                          </Dropdown>
                        </div>
                      </div>
                      <div class="form-item-row" v-if="brandDetail.categoryId">
                        <div class="input-item">
                          <Dropdown ref="subCateDropdown" :options="bizCateCdList" placeholder="선택하세요" v-model="brandDetail.subCategoryId" :value="brandDetail.subCategoryId">
                          </Dropdown>
                        </div>
                      </div>
                      <div class="form-item-row" v-if="!isEmpty(brandDetail.subCategoryId)">
                        <div class="input-item">
                            <span class="input">
                                <input type="text" class="input" placeholder="검색용 키워드를 입력하세요." v-model="brandDetail.categoryOpt"
                                @blur="categoryErrorMsg = isEmpty(brandDetail.categoryOpt)">
                            </span>
                        </div>
                      </div>
                      <p class="guide-text">※ 보다 좋은 서비스 제공을 위하여 운영자가 임의 변경할 수 있습니다.</p>
                      <p class="guide-text error" v-if="categoryErrorMsg" >카테고리를 선택해주세요.</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span class="form-item__label required">전화번호</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input">
                              <input type="text" class="input" placeholder="‘-’없이 입력해주세요."  v-model="brandDetail.tel"
                              @blur="validateTel(brandDetail.tel)"
                              @input="brandDetail.tel= ignoreChar($event, ['WHITESPACE', 'KOR', 'ENG'])"
                              ref="tel">
                            </span>
                        </div>
                      </div>
                      <p class="guide-text error" v-if="telErrorMsg" >전화번호를 입력해주세요.</p>
                      <p class="guide-text error" v-if="useMobileNumErrorMsg" >휴대폰 번호는 사용할 수 없습니다.</p>
                    </div>
                  </td>
                </tr>
                <tr>
                    <th scope="row"><span class="form-item__label">브랜드 컬러</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="radiobox">
                              <input type="radio" id="tplColorY" v-model="brandDetail.tplColorUseYn" value="N"/>
                              <label for="tplColorY"><span class="checkbox__text">미사용</span></label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" id="tplColorN" v-model="brandDetail.tplColorUseYn" value="Y"/>
                              <label for="tplColorN"><span class="checkbox__text">사용</span></label>
                            </span>
                          </div>
                          <div class="input-item" v-show="brandDetail.tplColorUseYn === 'Y'">
                            <el-color-picker v-model="brandDetail.templateColor"></el-color-picker>
                            <span class="input">
                              <input type="text" class="input colorPickCode" v-model="brandDetail.templateColor"></span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                <!-- <tr>
                  <th scope="row"><span class="form-item__label">웹사이트</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input">
                            <input type="text" class="input" placeholder="http://brandportal.com 형식으로 입력해주세요."  v-model="brandDetail.webSiteUrl"
                            @input="brandDetail.webSiteUrl= ignoreChar($event, ['WHITESPACE', 'KOR'])"
                            ref="webSiteUrl">
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span class="form-item__label">이메일</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="input">
                            <input type="text" class="input" placeholder="이메일 주소를 입력해주세요."   v-model="brandDetail.email"
                            @input="brandDetail.email= ignoreChar($event, ['WHITESPACE', 'KOR'])"
                            ref="email">
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row"><span class="form-item__label">주소</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item post">
                          <span class="input"><input type="text" class="input" v-model="brandDetail.zipCode" disabled></span>
                          <ButtonCmp
                            type="btn-default-line"
                            @click="openAddressPopup"
                          >
                            우편번호
                          </ButtonCmp>
                        </div>
                      </div>
                      <div class="form-item-row">
                        <div class="input-item address">
                          <span class="input"><input type="text" class="input" v-model="brandDetail.roadAddress" disabled></span> <span class="input"><input type="text" class="input" v-model="brandDetail.detailAddress" disabled></span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr> -->
                </tbody>
              </table>
            </div>
            <div class="brand-aside sticky">
              <div class="button__wrap button__brand">
                <ButtonCmp
                  type="btn-blue-line"
                >브랜드 가이드</ButtonCmp>
              </div>
              <BrandEmulator :brandData="brandDetail" curTab="info"/>
            </div>
          </div>
        </form>
        <div class="top-notice--gray">
          <p>-신청한 브랜드 정보는 운영자 심사를 거쳐 노출 여부가 결정되며 승인 결과는 문자메시지(SMS) 및 이메일로 알려드립니다.</p>
          <p>-승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</p>
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
            type="btn-line"
            @click="saveTempData"
          >임시저장
          </ButtonCmp>
          <ButtonCmp
            type="btn-blue"
            @click="goNext"
          >다음</ButtonCmp>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import StepList from '@/components/common/StepList.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import BrandEmulator from '@/views/brand/components/BrandEmulator.vue'
import { ignoreChar } from '@/utils/check'
import { retrieveCommonCode } from '@/api/common/code'
import { mapGetters, mapActions } from 'vuex'
import ToolTipEl from '@/components/common/Tooltip.vue' // 선거 대시 보드 추가

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    StepList,
    Dropdown,
    BrandEmulator,
    ToolTipEl
  },

  data() {
    return {
      bgImgFile: null,
      profileImgFile: null,
      bizCateCdList: [],
      bizCateGrpList: [],
      bgImageType: 'custom',
      profileImageType: 'custom',
      bgActiveNum: -1,
      profileActiveNum: -1,
      brandNameErrorMsg: false,
      brandDescriptionErrorMsg: false,
      bgImageErrorMsg: false,
      profileImageErrorMsg: false,
      categoryErrorMsg: false,
      telErrorMsg: false,
      useMobileNumErrorMsg: false,
      isSave: false,
      quickButtons: [''],
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정', '브랜드 개설 완료'],
      isSameImage: false,
      isSeasonBrand: false
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  watch: {
  },
  computed: {
    ...mapGetters('brand', {
      brandDetail: 'getBrandDetail',
      fileInfo: 'getBrandFile',
      defaultTplColor: 'getDefaultTplColor'
    })
  },
  created() {
  },
  methods: {
    ignoreChar,
    ...mapActions({
      setAddress: 'brand/setAddress',
      setImgFile: 'brand/setImgFile',
      setTplColor: 'brand/setTemplateColor',
      setDefaultImg: 'brand/setDefaultImg',
      setCategoryInfo: 'brand/setCategoryInfo'
    }),
    initImgFileInfo() {
      if (!jglib.isEmpty(this.brandDetail.bgImgFileId)) {
        this.bgActiveNum = this.getDefaultImgFileIndexByFileId(this.brandDetail.bgImgFileId)
        if (this.bgActiveNum !== -1) {
          this.bgImageType = 'default'
        }
      }
      if (!jglib.isEmpty(this.brandDetail.profileImgFileId)) {
        this.profileActiveNum = this.getDefaultImgFileIndexByFileId(this.brandDetail.profileImgFileId)
        if (this.profileActiveNum !== -1) {
          this.profileImageType = 'default'
        }
      }
    },
    getDefaultImgFileIndexByFileId(fileId) {
      let fileIdx = -1
      this.fileInfo.defaultImg.forEach((img, idx) => {
        if (img.id === fileId) fileIdx = idx
      })
      return fileIdx
    },
    loadCategoryList() {
      // main 카테고리 조회
      retrieveCommonCode('BIZ_CATE_GRP', null, 'Y')
        .then(res => {
          this.bizCateGrpList = res.result
          this.$nextTick(() => {
            this.$refs.cateDropdown.init()
          })
          return this.brandDetail.categoryId
        })
        .then(categoryId => {
          // sub 카테고리 조회
          if (categoryId) {
            retrieveCommonCode('BIZ_CATE_GRP', categoryId, 'Y')
              .then(res => {
                this.bizCateCdList = res.result
                this.$nextTick(() => {
                  this.$refs.subCateDropdown.init()
                })
              })
          }
        })
    },
    changeMainCategory() {
      retrieveCommonCode('BIZ_CATE_GRP', this.brandDetail.categoryId, 'Y')
        .then(res => {
          this.bizCateCdList = res.result
          this.setCategoryInfo({
            target: 'sub',
            catId: null,
            catNm: null
          })
          this.$nextTick(() => {
            this.$refs.subCateDropdown.init()
          })
        })
    },
    goNext () {
      this.$emit('nextStep')
    },
    saveTempData () {
      if (this.validation()) {
        this.$emit('save')
      }
    },
    onBgFileChanged (e) {
      const file = e.target.files[0]
      let checkResult = jglib.checkFileData(file, ['jpg', 'png'], 1)
      if (checkResult.code !== 'ok') {
        this.$alertMsg(checkResult.message)
      } else {
        jglib.checkImageSize(file, 388, 388, 1080, 1080).then((valid) => {
          if (valid === 'valid') {
            this.setImgFile({
              type: 'bg',
              file: file
            })
            this.bgImgFile = file
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
    onProfileFileChange (e) {
      const file = e.target.files[0]
      let checkResult = jglib.checkFileData(file, ['png'], 1)
      if (checkResult.code !== 'ok') {
        this.$alertMsg(checkResult.message)
      } else {
        jglib.checkImageSize(file, 388, 388, 1080, 1080).then((valid) => {
          if (valid === 'valid') {
            this.setImgFile({
              type: 'profile',
              file: file
            })
            this.profileImgFile = file
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
    onCertificaChanged (e) {
      const file = e.target.files[0]
      let checkResult = jglib.checkFileData(file, ['jpg', 'png', 'tiff', 'pdf', 'zip'], 70)
      if (checkResult.code !== 'ok') {
        this.$alertMsg(checkResult.message)
      } else {
        this.setImgFile({
          type: 'certification',
          file: file
        })
      }
    },
    onIdentityChanged (e) {
      const file = e.target.files[0]
      let checkResult = jglib.checkFileData(file, ['jpg', 'png', 'tiff', 'pdf', 'zip'], 70)
      if (checkResult.code !== 'ok') {
        this.$alertMsg(checkResult.message)
      } else {
        this.setImgFile({
          type: 'identity',
          file: file
        })
      }
    },
    onAgentWarrantChanged(e) {
      const file = e.target.files[0]
      let checkResult = jglib.checkFileData(file, ['jpg', 'png', 'tiff', 'pdf', 'zip'], 70)
      if (checkResult.code !== 'ok') {
        this.$alertMsg(checkResult.message)
      } else {
        this.setImgFile({
          type: 'agentWarrant',
          file: file
        })
      }
    },
    bgImageCheck (index, fileId, value) {
      this.bgActiveNum = index
      this.setDefaultImg({
        type: 'bg',
        id: fileId,
        url: value
      })
      this.profileChange()
    },
    pfImageCheck (index, fileId, value) {
      this.profileActiveNum = index
      this.setDefaultImg({
        type: 'profile',
        id: fileId,
        url: value
      })
    },
    imgConverter(url) {
      const blob = URL.createObjectURL(url)
      return blob
    },
    getBrandInfo() {
      return this.brandDetail
    },
    isEmpty(data) {
      return jglib.isEmpty(data)
    },
    validateTel(data) {
      this.telErrorMsg = this.isEmpty(data)
      this.useMobileNumErrorMsg = jglib.isMobileNumber(data)
    },
    validation() {
      // if (this.tplColorUseYn === 'Y') {
      //   this.brandDetail.brandColor = null
      // }
      if (jglib.isEmpty(this.brandDetail.name)) {
        this.brandNameErrorMsg = true
        this.$alertMsg('브랜드명을 입력해주세요.')
        this.$refs.name.focus()
        return
      }
      if (jglib.isEmpty(this.brandDetail.description)) {
        this.brandDescriptionErrorMsg = true
        this.$alertMsg('브랜드 소개를 입력해주세요.')
        this.$refs.description.focus()
        return
      }
      // 본인인증 파일
      // if(this.brandDetail.certificationType === 'upfile' && jglib.isEmpty(this.brandDetail.certificationFileUrl)){
      //   this.$alertMsg('개인 신분증 사본 또는 인감증명을 등록해 주세요.');
      //   this.$refs.certificationFileUrl.focus();
      //   return;
      // }
      // 대행사 위임증명
      // if(jglib.isEmpty(this.brandDetail.identityFileUrl)){
      //   this.$alertMsg('임명직 : 신분/임명장 등 증명서류<br>선거 후보자 : 선관위 등록 서류, 선관위 화면 스크린 샷 등 후보자임을 증명할 수 있는 서류를 등록해 주세요.');
      //   this.$refs.identityFileUrl.focus();
      //   return;
      // }
      // 대행사 위임증명
      // if(jglib.isEmpty(this.brandDetail.agentWarrantFileUrl)){
      //   this.$alertMsg('개인과 대행사간의 위임 서류를 등록해 주세요.');
      //   this.$refs.agentWarrantFileUrl.focus();
      //   return;
      // }

      if (this.bgImageType === 'custom' && jglib.isEmpty(this.brandDetail.bgImgFileUrl)) {
        this.bgImageErrorMsg = true
        this.$alertMsg('백그라운드 이미지를 선택하세요.')
        this.$refs.bgImgFileUrl.focus()
        return
      }
      if (this.profileImageType === 'custom' && jglib.isEmpty(this.brandDetail.profileImgFileUrl)) {
        this.profileImageErrorMsg = true
        this.$alertMsg('백그라운드 이미지를 선택하세요.')
        this.$refs.profileImgFileUrl.focus()
        return
      }
      if (jglib.isEmpty(this.brandDetail.categoryId) || jglib.isEmpty(this.brandDetail.subCategoryId) || jglib.isEmpty(this.brandDetail.categoryOpt)) {
        this.categoryErrorMsg = true
        this.$alertMsg('카테고리를 선택해주세요.')
        this.$refs.categoryId.scrollIntoView(true)
        return
      }
      if (jglib.isEmpty(this.brandDetail.tel)) {
        this.telErrorMsg = true
        this.$alertMsg('전화번호를 입력해주세요.')
        this.$refs.tel.focus()
        return
      }
      if (jglib.isMobileNumber(this.brandDetail.tel)) {
        this.useMobileNumErrorMsg = true
        this.$alertMsg('휴대폰 번호는 사용할 수 없습니다.')
        this.$refs.tel.focus()
        return
      }
      if (!jglib.isEmpty(this.brandDetail.webSiteUrl) && !jglib.isUrl(this.brandDetail.webSiteUrl)) {
        this.$alertMsg('입력한 웹 사이트 주소가 올바른 URL 형식이 아닙니다.<br>올바른 URL 형식으로 입력해주세요.<br>예)http://www.brandportal.com')
        this.$refs.webSiteUrl.focus()
        return false
      }
      if (!jglib.isEmpty(this.brandDetail.email) && !jglib.isEmail(this.brandDetail.email)) {
        this.$alertMsg('잘못된 이메일 형식 입니다.')
        this.$refs.email.focus()
        return false
      }
      return true
    },
    profileChange () {
      if (this.isSameImage) {
        let num = this.bgActiveNum
        this.profileImageType = 'default'
        this.pfImageCheck(num, this.fileInfo.defaultImg[num].id, this.fileInfo.defaultImg[num].src)
      }
    }
  }
}
</script>
