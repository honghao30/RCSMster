<template>
  <div class="brand__wrap brand_create">
    <div class="brand__inner">
      <BrandLnb />
      <!-- 1차 디자인 수정 -->
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 홈 수정"  progress="승인대기" />
        <!-- 1차 디자인 수정 -->
        <StepList :stepActiveIndex="1" :stepTitle="stepTitle" />
           <form  ref="form" :model="form">
            <!-- 1차 디자인 수정 -->
            <div class="brand__wrap--edit">
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px">
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><span class="form-item__label">브랜드 ID</span></th>
                      <td>
                          <span class="text">BR.bwpczvZDy9</span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">브랜드 Key</span></th>
                      <td>
                          <span class="text">BK.POfd50S48pot0fu</span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label required">브랜드명</span></th>
                      <td>
                          <div class="form-item__content">
                            <div class="form-item-row no-wrap">
                              <div class="input-item input-limit">
                                <span class="input">
                                  <input type="text" class="input" maxlength="20" placeholder="브랜드명을 입력해주세요." v-model="form.name">
                                  <p class="input-limit__text">
                                    {{ form.name.length }}/20자
                                  </p>
                                </span>
                                <span class="flag-approval">승인필요</span>
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
                                  <textarea maxlength="150" placeholder="브랜드의 슬로건이나 브랜드 특징을 나타내는 소개글을 입력해주세요." v-model="form.desc"></textarea>
                                  <div class="textarea-limit__text">
                                    <p>
                                      {{ form.desc.length }}/150자
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p class="guide-text error" v-if="brandDescriptionErrorMsg">브랜드 소개를 입력해주세요.</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label required">본인인증</span>
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
                        <div class="form-item__content cerficaton-type">
                          <strong class="text">휴대폰 인증 완료</strong> <span class="text">010-5151-5151</span>
                          <ButtonCmp
                            type="btn-line"
                            size="medium"
                          >
                            인증변경
                          </ButtonCmp>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label required">백그라운드 이미지</span></th>
                      <td>
                        <!-- 디자인 1차 수정 : 이벤트 처리 수정 -->
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="radiobox">
                                <input type="radio" name="bgImageChk" id="bgCustom" v-model="form.bgImageType" checked value="custom" />
                                <label for="bgCustom"><span class="checkbox__text">직접 등록</span></label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" name="bgImageChk" id="bgDefault" v-model="form.bgImageType" value="defalut" />
                                <label for="bgDefault"><span class="checkbox__text">기본 이미지 사용</span></label>
                              </span>
                            </div>
                            <template v-if="form.bgImageType === 'defalut'">
                              <ul class="profile-img-list">
                                <!-- 디자인 1차 수정 : 이벤트 처리 수정 -->
                                <li v-for="(bgItem, i) in imgcategoryOptions" :key="i" @click="bgImageCheck(i, bgItem)"
                                :class="{ active : isActiveNum === i }">
                                  <span class="profile-img">
                                      <img :src="`${bgItem.src }`" alt="">
                                  </span>
                                  <span class="img__text">{{ bgItem.name }}</span>
                                </li>
                              </ul>
                              <p class="checkbox">
                                <input type="checkbox" id="defaultImg" value="defaultImg"><label for="defaultImg">프로필 이미지에도 동일한 이미지를 사용합니다.</label>
                              </p>
                            </template>
                            <template v-if="form.bgImageType === 'custom'">
                              <div class="input-item">
                                <span class="input"><input type="text" class="input" :value="form.custombgImgFileUrl" disabled></span>
                                <input type="file" id="fileUpCumtom" class="input blind" @change="onFileBgChanged">
                                <label for="fileUpCumtom" class="btn btn-default-line">파일찾기</label>
                              </div>
                              <p class="guide-text black">&middot; 사이즈 : 388 X 388px ~ 1080 X 1080px / 1:1 비율 / 파일형식: JPG, PNG (최대 5MB)</p>
                            </template>
                          </div>
                          <p class="guide-text error"  v-if="bgImageErrorMsg">백그라운드 이미지를 선택하세요.</p>
                        </div>
                        <!-- // 디자인 1차 수정 : 이벤트 처리 수정 -->
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label required">프로필 이미지</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="radiobox">
                                <input type="radio" name="profileImage" id="profileCustom" v-model="form.profileImageType" value="custom" />
                                <label for="profileCustom"><span class="checkbox__text">직접 등록</span></label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" name="profileImage" id="profileDefault" v-model="form.profileImageType" checked value="defalut"/>
                                <label for="profileDefault"><span class="checkbox__text">기본 이미지 사용</span></label>
                              </span>
                            </div>
                            <template v-if="form.profileImageType === 'defalut'">
                              <ul class="profile-img-list">
                                <!-- 디자인 1차 수정 : 이벤트 처리 수정 -->
                                <li v-for="(item, i) in imgcategoryOptions" :key="i" @click="pfImageCheck(i, item)"
                                :class="{ active : isActiveNum === i }">
                                  <span class="profile-img">
                                      <img :src="`${item.src }`" alt="">
                                  </span>
                                  <span class="img__text">{{ item.name }}</span>
                                </li>
                              </ul>
                            </template>
                            <template v-if="form.profileImageType === 'custom'">
                              <div class="input-item">
                                <span class="input"><input type="text" class="input" :value="form.profileImage" disabled></span>
                                <input type="file" id="fileUp" class="input blind" @change="onFileChanged()">
                                <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                              </div>
                              <p class="guide-text black">&middot; 사이즈 : 388 X 388px ~ 1080 X 1080px / 1:1 비율 / 파일형식: JPG, PNG (최대 5MB)</p>
                            </template>
                          </div>
                          <p class="guide-text error"  v-if="profileImageErrorMsg">프로필 이미지를 선택하세요.</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label required">카테고리</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <Dropdown :options="categoryOptions" placeholder="선택하세요" v-model="form.category1" >
                              </Dropdown>
                            </div>
                          </div>
                          <div class="form-item-row" v-if="form.category1">
                            <div class="input-item">
                              <Dropdown :options="categoryOptions" placeholder="선택하세요" v-model="form.category2">
                              </Dropdown>
                            </div>
                          </div>
                          <div class="form-item-row" v-if="form.category2">
                            <div class="input-item">
                              <span class="input">
                                  <input type="text" class="input" placeholder="검색용 키워드를 입력하세요." v-model="form.category3">
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
                              <span class="input"><input type="text" class="input" placeholder="‘-’없이 입력해주세요."  v-model="form.tel"></span>
                            </div>
                          </div>
                          <p class="guide-text error" v-if="telErrorMsg" >전화번호를 입력해주세요.</p>
                        </div>
                      </td>
                    </tr>
                    <!-- 1차 디자인 수정 - 삭제 -->
                    <!-- <tr>
                      <th scope="row"><span class="form-item__label">웹사이트</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="input"><input type="text" class="input" placeholder="http://brandportal.com 형식으로 입력해주세요."  v-model="form.url"></span>
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
                              <span class="input"><input type="text" class="input" placeholder="이메일 주소를 입력해주세요."   v-model="form.email"></span>
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
                              <span class="input"><input type="text" class="input" v-model="form.postcode" disabled></span>
                              <ButtonCmp
                                  type="btn-default-line"
                                  @click="findPost"
                              >
                                우편번호
                              </ButtonCmp>
                            </div>
                          </div>
                          <div class="form-item-row">
                            <div class="input-item address">
                              <span class="input">
                                <input type="text" class="input" v-model="form.addr1" disabled></span> <span class="input"><input type="text" class="input" v-model="form.addr2" disabled></span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr> -->
                    <!-- // 1차 디자인 수정 - 삭제 -->
                    <!-- 1차 디자인 수정 - 추가 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">브랜드 컬러</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row colunl-type">
                            <div class="input-item">
                              <span class="radiobox">
                                <input type="radio" name="brandColor" id="brandColorY" v-model="form.brandColorType" value="defalut"/>
                                <label for="brandColorY"><span class="checkbox__text">미사용</span></label>
                              </span>
                              <span class="radiobox">
                                <input type="radio" name="brandColor" id="brandColorN" v-model="form.brandColorType" value="Color"/>
                                <label for="brandColorN"><span class="checkbox__text">사용</span></label>
                              </span>
                            </div>
                            <template v-if="form.brandColorType === 'Color'">
                              <div class="input-item">
                                <el-color-picker v-model="form.brandColor"></el-color-picker>
                                <span class="input">
                                  <input type="text" class="input colorPickCode" v-model="form.brandColor"></span>
                              </div>
                            </template>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="brand-aside sticky">
                  <div class="button__wrap button__brand">
                    <!-- 1차 디자인 수정 -->
                    <button class="btn-brand">
                      브랜드 홈 작성가이드
                    </button>
                  </div>
                  <BrandEmulator :brandInfoData="form" curTab="info"/>
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
            >수정완료</ButtonCmp>
            <ButtonCmp
              type="btn-blue"
              @click="onSubmit"
            >다음</ButtonCmp>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
// import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import StepList from '@/components/common/StepList.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import BrandEmulator from '@/views/brand/components/BrandEmulator.vue'
import imgcategoryOptions from '@/views/brand/create/brandBasicImg'
import ToolTipEl from '@/components/common/Tooltip.vue' // 선거 대시 보드 추가

export default {
  components: {
    PageTitle,
    ButtonCmp,
    // PageTitleH3,
    StepList,
    Dropdown,
    BrandLnb,
    BrandEmulator,
    ToolTipEl
  },
  data() {
    return {
      form: {
        name: '네스프레소',
        desc: '최상의 품질을 가진 환경에 긍정적인 영향을 줄수있는 커피브랜드 기업',
        bgImgFileUrl: 'https://file.rcsbizcenter.com/brand/common/LT-common-yeHC_1.png',
        profileImgFileUrl: 'https://file.rcsbizcenter.com/brand/common/LT-common-yeHC_1.png',
        url: 'http://www.nespresso.com',
        email: 'contactus@nespresso.com',
        tel: '080-734-1111',
        bgImageType: 'defalut',
        profileImageType: 'defalut',
        category1: 'travel',
        category2: 'service',
        category3: '시스템 스튜디오',
        postcode: '06128',
        addr1: '서울특별시 강남구 봉은사로 18길 58',
        addr2: '더피프티원',
        brandColorType: 'Color',
        phone: '',
        certNumber: '',
        bgImage: '',
        brandColor: '#0C22E1',
        quickButton: ['chat', 'web', 'tel']
      },
      isActiveNum: 10,
      brandNameErrorMsg: false,
      brandDescriptionErrorMsg: false,
      bgImageErrorMsg: false,
      profileImageErrorMsg: false,
      categoryErrorMsg: false,
      telErrorMsg: false,
      isModalViewed: false,
      categoryOptions: [
        {
          label: 'IT',
          value: 'IT'
        },
        {
          label: '교육',
          value: 'edu'
        },
        {
          label: '병원',
          value: 'clinic'
        },
        {
          label: '뷰티',
          value: 'beauty'
        },
        {
          label: '여행',
          value: 'travel'
        },
        {
          label: '엔터테인먼트',
          value: 'entertainment'
        },
        {
          label: '자동차',
          value: 'car'
        },
        {
          label: '교통',
          value: 'transportation'
        },
        {
          label: '기관/단체',
          value: 'organization'
        },
        {
          label: '금융',
          value: 'finance'
        },
        {
          label: '서비스',
          value: 'service'
        },
        {
          label: '제조',
          value: 'manufacturing'
        }],
      imgcategoryOptions,
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정']
    }
  },
  watch: {
  },
  computed: {
  },
  methods: {
    onSubmit () {
      if (this.form.brandName === '') {
        this.brandNameErrorMsg = true
        return
      }
      if (this.form.brandDescription === '') {
        this.brandDescriptionErrorMsg = true
        return
      }
      if (this.form.bgImage === '') {
        this.bgImageErrorMsg = true
        return
      }
      if (this.form.profileImage === '') {
        this.profileImageErrorMsg = true
        return
      }
      if (this.form.category3 === '') {
        this.categoryErrorMsg = true
        return
      }
      if (this.form.tel === '') {
        this.telErrorMsg = true
        return
      }
      this.$router.push('./brandcreatestep02')
    },
    onFileChanged (e) {
      const files = e.target.files
      const fileName = files[0].name
      this.form.bgImage = fileName
      this.form.profileImage = fileName
    },
    bgImageCheck (index, bgItem) {
      this.isActiveNum = index
      // this.form.bgImage = src
      this.cateName = bgItem.name
      this.cateImg = bgItem.src
      this.form.bgImgFileUrl = bgItem.src
    },
    pfImageCheck (index, item) {
      this.isActiveNum = index
      this.form.profileImgFileUrl = item.src
      console.log(this.form.profileImgFileUrl)
    },
    closeModal () {
      this.isModalViewed = false
    }
  }
}
</script>
