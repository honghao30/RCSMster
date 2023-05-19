<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 개설" />
        <StepList :stepActiveIndex="1" :stepTitle="stepTitle" />
        <div class="top-notice--gray">
          <p>-신청한 브랜드 정보는 운영자 심사를 거쳐 노출 여부가 결정되며 승인 결과는 문자메시지(SMS) 및 이메일로 알려드립니다.</p>
          <p>-승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</p>
        </div>
        <PageTitleH3 titleh3="기본 정보 입력" noticeinfo="필수 입력값" />
        <form  ref="form" :model="form">
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
                              <input type="text" class="input" maxlength="20" placeholder="브랜드명을 입력해주세요." v-model="form.brandName">
                              <p class="input-limit__text">
                                {{ form.brandName.length }}/20자
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
                              <textarea maxlength="150" placeholder="브랜드의 슬로건이나 브랜드 특징을 나타내는 소개글을 입력해주세요." v-model="form.brandDescription"></textarea>
                              <div class="textarea-limit__text">
                                <p>
                                  {{ form.brandDescription.length }}/150자
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
                  <th scope="row"><span class="form-item__label required">백그라운드 이미지</span></th>
                  <td>
                    <div class="form-item__content">
                      <div class="form-item-row">
                        <div class="input-item">
                          <span class="radiobox">
                            <input type="radio" name="bgImageChk" id="bgDefault" v-model="form.bgImageType" value="defalut" @change="form.bgImage = 'defalut.png'"/>
                            <label for="bgDefault"><span class="checkbox__text">기본 이미지 사용</span></label>
                          </span>
                          <span class="radiobox">
                            <input type="radio" name="bgImageChk" id="bgCustom" v-model="form.bgImageType" value="custom" @change="form.bgImage = ''"/>
                            <label for="bgCustom"><span class="checkbox__text">직접 등록</span></label>
                          </span>
                        </div>
                        <template v-if="form.bgImageType === 'custom'">
                          <div class="input-item">
                            <span class="input"><input type="text" class="input" :value="form.bgImage" disabled></span>
                            <input type="file" id="fileUp" class="input blind" @change="onFileChanged">
                            <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                          </div>
                          <p class="guide-text black">&middot; 사이즈 : 388 X 388px ~ 1080 X 1080px / 1:1 비율 / 파일형식: JPG, PNG (최대 5MB)</p>
                        </template>
                      </div>
                      <p class="guide-text error"  v-if="bgImageErrorMsg">백그라운드 이미지를 선택하세요.</p>
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
                            <input type="radio" name="profileImage" id="profileDefault" v-model="form.profileImageType" value="defalut"/>
                            <label for="profileDefault"><span class="checkbox__text">기본 이미지 사용</span></label>
                          </span>
                          <span class="radiobox">
                            <input type="radio" name="profileImage" id="profileCustom" v-model="form.profileImageType" value="custom" @change="form.profileImage = ''"/>
                            <label for="profileCustom"><span class="checkbox__text">직접 등록</span></label>
                          </span>
                        </div>
                        <template v-if="form.profileImageType === 'defalut'">
                          <ul class="profile-img-list">
                            <li v-for="(item, i) in categoryOptions" :key="i" @click="pfImageCheck(i, item.value)"
                            :class="{ active : isActiveNum === i }">
                              <i :class="`icon-${item.value}`"></i>
                              <span class="img__text">{{ item.label }}</span>
                            </li>
                          </ul>
                        </template>
                        <template v-if="form.profileImageType === 'custom'">
                          <div class="input-item">
                            <span class="input"><input type="text" class="input" :value="form.profileImage" disabled></span>
                            <input type="file" id="fileUp" class="input blind" @change="onProfileFileChange()">
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
                              <input type="text" class="input" placeholder="검색용 키워드를 입력하세요." v-model="category3">
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
                <tr>
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
                          <span class="input"><input type="text" class="input" v-model="form.addr1" disabled></span> <span class="input"><input type="text" class="input" v-model="form.addr2" disabled></span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
        <div class="button__wrap">
          <ButtonCmp
            type="btn-blue"
            @click="onSubmit"
          >다음</ButtonCmp>
        </div>
      </div>
      <div class="brand-aside  sticky">
        <div class="button__wrap">
          <ButtonCmp
            type="btn-blue-line"
            @click="isModalViewed = true"
          >브랜드 불러오기</ButtonCmp>
          <ButtonCmp
            type="btn-blue-line"
          >브랜드 가이드</ButtonCmp>
        </div>
        <div class="preview__wrap ">
          <div class="preview__image">
            <img
              v-if="url"
              :src="url"
             />
             <img src="@/assets/images/dummy/brand_image.png"
              v-else
              alt=""
             >
          </div>
          <div class="brand-title">
            <span class="logo">
              <img src="@/assets/images/dummy/brand_logo.png"
                v-if="this.form.profileImage == ''"
                alt=""
              >
              <img src="@/assets/images/icon/icon_company_person.png"
                v-else-if="this.bgImageType"
                alt=""
              >
              <img src="@/assets/images/icon/icon_company_person.png"
                v-else
                alt=""
              >
            </span>
            <div class="brand-desc">
              <h4 v-if="this.form.brandName == ''">브랜드명</h4>
              <h4 v-else>{{ this.form.brandName }}</h4>
              <p class="brand__text" v-if="this.form.brandDescription == ''">브랜드 소개글이 노출 됩니다. 최대 150자까지 입력하세요.</p>
              <p class="brand__text" v-else>{{ this.form.brandDescription }}</p>
            </div>
          </div>
          <div class="brand-detail">
            <TabCmp tabClass="brand-quick__tab" :activeIndex="1">
              <TabItem title="소식">
                <!-- <div>소식</div> -->
              </TabItem>
              <TabItem title="정보">
                <dl class="tel">
                  <dt>전화번호</dt>
                  <dd>{{ form.tel }}</dd>
                </dl>
                <dl class="web">
                  <dt>웹사이트</dt>
                  <dd>{{ form.url }}</dd>
                </dl>
                <dl class="email">
                  <dt>이메일</dt>
                  <dd>{{ form.email }}</dd>
                </dl>
              </TabItem>
            </TabCmp>
          </div>
        </div>
      </div>
    </div>
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <BrandImport
          @closeModal="isModalViewed = false"
        >
      </BrandImport>
    </ModalView>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import StepList from '@/components/common/StepList.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ModalView from '@/components/common/ModalView.vue'
import BrandImport from '@/views/brand/create/components/BrandImport.vue'
import TabItem from '@/components/common/TabItem.vue'
import TabCmp from '@/components/common/TabCmp.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    StepList,
    Dropdown,
    ModalView,
    BrandImport,
    TabItem,
    TabCmp
  },
  data() {
    return {
      form: {
        brandName: '',
        brandDescription: '',
        bgImage: '',
        profileImage: '',
        bgImageType: '',
        profileImageType: '',
        category1: '',
        category2: '',
        category3: '',
        url: '',
        email: '',
        tel: '',
        postcode: '',
        addr1: '',
        addr2: '',
        profileDefaultItem: ''
      },
      isActiveNum: '',
      brandNameErrorMsg: false,
      brandDescriptionErrorMsg: false,
      bgImageErrorMsg: false,
      profileImageErrorMsg: false,
      categoryErrorMsg: false,
      telErrorMsg: false,
      isModalViewed: false,
      quickButtons: [''],
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
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정', '브랜드 개설 완료'],
      brendInfo: {}
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
      if (this.form.category2 === '') {
        this.categoryErrorMsg = true
        return
      }
      if (this.form.tel === '') {
        this.telErrorMsg = true
        return false
      }
      localStorage.setItem('brand', JSON.stringify(this.form))
      this.$router.push('./brandcreatestep02')
    },
    onFileChanged (e) {
      const files = e.target.files
      const fileName = files[0].name
      const file = e.target.files[0]
      this.form.bgImage = fileName
      this.url = URL.createObjectURL(file)
    },
    onProfileFileChange (e) {
      const files = e.target.files
      const fileName = files[0].name
      const file = e.target.files[0]
      this.form.profileImage = fileName
      this.url = URL.createObjectURL(file)
    },
    pfImageCheck (index, value) {
      this.isActiveNum = index
      this.form.profileImage = value
    },
    closeModal () {
      this.isModalViewed = false
    }
  }
}
</script>
