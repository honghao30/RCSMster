<template>
  <div class="brand__wrap brand_create">
    <div class="brand__inner">
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 개설" />
        <StepList :stepActiveIndex="1" :stepTitle="stepTitle" />
        <!-- <PageTitleH3 titleh3="기본 정보 입력"/> -->
        <form  ref="form" :model="form">
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
                                <input type="text" class="input" maxlength="20" placeholder="브랜드명을 입력해주세요." @input="e => form.name = e.target.value" v-model="form.name">
                                <p class="input-limit__text">
                                  {{ form.name.length }}/20자
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
                                <textarea maxlength="150" placeholder="브랜드의 슬로건이나 브랜드 특징을 나타내는 소개글을 입력해주세요."  @input="e => form.desc = e.target.value" v-model="form.desc"></textarea>
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
                  <!-- 선거용으로 추가된 항목 -->
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
                              <input type="radio" name="certificationChk" id="phoneType" v-model="form.certificationType" value="phone"/>
                              <label for="phoneType"><span class="checkbox__text">휴대폰 인증</span></label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" name="certificationChk" id="upfileType" v-model="form.certificationType" value="upfile" />
                              <label for="upfileType"><span class="checkbox__text">첨부파일 인증</span></label>
                            </span>
                          </div>
                          <template v-if="form.certificationType === 'phone'">
                            <div class="input-item">
                                <span class="input"><input type="text" class="input" placeholder="‘-’없이 자리 숫자만 입력해주세요." v-model="form.phone"></span>
                                <ButtonCmp
                                    type="btn-default-line"
                                    @click="phoneCertificate"
                                >
                                휴대폰 인증
                                </ButtonCmp>
                            </div>
                            <!-- 에러 메시지 -->
                            <!-- <p class="guide-text error">휴대폰 번호을 입력해주세요.</p> -->
                          </template>
                          <template v-if="form.certificationType === 'upfile'">
                            <div class="input-item">
                              <span class="input"><input type="text" class="input" :value="form.certificationFile" disabled></span>
                              <input type="file" id="fileUp" class="input blind" @change="onCertificaChanged">
                              <label for="fileUp" class="btn btn-default-line">파일찾기</label>
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
                            <span class="input"><input type="text" class="input" :value="form.Identity" disabled></span>
                            <input type="file" id="fileUp" class="input blind" @change="onFileChanged">
                            <label for="fileUp" class="btn btn-default-line">파일찾기</label>
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
                            <span class="input"><input type="text" class="input" :value="form.agentWarrant" disabled></span>
                            <input type="file" id="fileUp" class="input blind" @change="onFileChanged">
                            <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                          </div>
                          <p class="guide-text black">&middot; 사이즈 : 388px*388px ~1080px*1080px / 1:1 비율 / 파일형식: JPG, PNG (최대 1MB)</p> <!-- 기획서 v1.0 수정 (문구 수정) -->
                        </div>
                        <!-- <p class="guide-text error">백그라운드 이미지를 선택하세요.</p> -->
                      </div>
                    </td>
                  </tr>
                  <!-- //선거용으로 추가된 항목 -->
                  <tr>
                    <th scope="row"><span class="form-item__label required">백그라운드 이미지</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="radiobox">
                              <input type="radio" name="bgImageChk" id="bgCustom" v-model="form.bgImageType" value="custom" />
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
                            <p class="guide-text black">&middot; 사이즈 : 388px*388px ~1080px*1080px / 1:1 비율 / 파일형식: JPG, PNG (최대 1MB)</p> <!-- 기획서 v1.0 수정 (문구 수정) -->
                          </template>
                        </div>
                        <p class="guide-text error"  v-if="bgImageErrorMsg">백그라운드 이미지를 선택하세요.</p>
                        <!-- 기획서 1.0 수정(문구 추가 / p.11 참고) -->
                        <p class="guide-text error"  v-if="bgImageErrorMsg">Jpg, jpeg, png 형식의 파일만 업로드 할 수 있습니다.</p>
                        <p class="guide-text error"  v-if="bgImageErrorMsg">1MB 이하의 파일만 업로드 할 수 있습니다.</p>
                        <p class="guide-text error"  v-if="bgImageErrorMsg">388 X 388px ~ 1080 X 1080px 사이즈의 파일만 업로드 할 수 있습니다.</p>
                        <!-- // 기획서 1.0 수정(문구 추가/ p.11 참고) -->
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
                              <input type="radio" name="profileImage" id="profileCustom" v-model="form.profileImageType" value="custom" @change="form.profileImage = ''"/>
                              <label for="profileCustom"><span class="checkbox__text">직접 등록</span></label>
                            </span>
                            <span class="radiobox">
                              <input type="radio" name="profileImage" id="profileDefault" v-model="form.profileImageType" value="defalut"/>
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
                              <span class="input"><input type="text" class="input" :value="form.profileImgFileUrl" disabled></span>
                              <input type="file" id="fileUp" class="input blind" @change="onProfileFileChange()">
                              <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                            </div>
                            <p class="guide-text black">&middot; 사이즈 : 388px*388px ~1080px*1080px / 1:1 비율 / 파일형식: JPG, PNG (최대 1MB)</p> <!-- 기획서 v1.0 수정 (문구 수정) -->
                          </template>
                        </div>
                        <p class="guide-text error"  v-if="profileImageErrorMsg">프로필 이미지를 선택하세요.</p>
                        <!-- 기획서 1.0 수정(문구 추가 / p.11 참고) -->
                        <p class="guide-text error"  v-if="profileImageErrorMsg">Jpg, jpeg, png 형식의 파일만 업로드 할 수 있습니다.</p>
                        <p class="guide-text error"  v-if="profileImageErrorMsg">1MB 이하의 파일만 업로드 할 수 있습니다.</p>
                        <p class="guide-text error"  v-if="profileImageErrorMsg">388 X 388px ~ 1080 X 1080px 사이즈의 파일만 업로드 할 수 있습니다.</p>
                        <!-- // 기획서 1.0 수정(문구 추가/ p.11 참고) -->
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label required">카테고리</span></th>
                    <td>
                      <!-- 기획서 1.0 수정 -->
                      <div class="form-item__content">
                        <div class="form-item-row space-between">
                          <div class="input-item w--half">
                            <div class="input-item-category">
                              <div class="item-row-title">카테고리1</div>
                              <Dropdown :options="categoryOptions" placeholder="카테고리를 선택하세요" v-model="form.category1" >
                              </Dropdown>
                            </div>
                          </div>
                          <div class="input-item w--half" v-if="form.category1">
                            <div class="input-item-category">
                              <div class="item-row-title">카테고리2</div>
                              <Dropdown :options="categoryOptions2" placeholder="카테고리를 선택하세요" v-model="form.category2">
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                        <div class="form-item-row" v-if="form.category2">
                          <div class="input-item-category">
                            <div class="item-row-title">카테고리3</div>
                            <div class="input-item">
                              <span class="input">
                                  <input type="text" class="input" placeholder="검색용 키워드를 입력하세요." v-model="category3">
                              </span>
                            </div>
                          </div>
                        </div>
                        <p class="guide-text black">&middot; 보다 좋은 서비스 제공을 위하여 운영자가 임의 변경할 수 있습니다.</p> <!-- 기획서 v1.0 수정 (특수문자 추가 및 black 클래스 추가) -->
                        <p class="guide-text error" v-if="categoryErrorMsg" >카테고리를 선택해주세요.</p>
                      </div>
                      <!-- //기획서 1.0 수정 -->
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
                        <!-- 기획서 v1.0 수정 (문구 수정 / p.10 참고 : 전화번호 010 입력 시 입력 내용 사라지고 경고 메시지 노출) -->
                        <p class="guide-text error" v-if="telErrorMsg" >휴대폰번호는 입력할 수 없습니다.</p>
                      </div>
                    </td>
                  </tr>
                  <!-- 1차 디자인 수정 - 추가 -->
                  <tr class="bd-bottom-none"> <!-- 1차 디자인 수정 (bd-bottom-none 클래스 추가) -->
                    <th scope="row"><span class="form-item__label">브랜드 컬러</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
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
                            <!-- 기획서 v1.0 수정 (brandcolor-box 클래스 추가) -->
                            <div class="brandcolor-box">
                              <p class="guide-text black">&middot; 브랜드 컬러값 설정 시 템플릿의 메시지의 버튼에 브랜드 컬러를 적용할 수 있습니다.</p> <!-- 기획서 v1.0 수정 (p태그 추가) -->
                              <div class="input-item">
                                <el-color-picker v-model="form.brandColor"></el-color-picker>
                                <span class="input">
                                  <input type="text" class="input colorPickCode" v-model="form.brandColor"></span>
                              </div>
                            </div>
                            <!-- // 기획서 v1.0 수정 (brandcolor-box 클래스 추가) -->
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
                <!-- <ButtonCmp
                  type="btn-line"
                  @click="brandImport"
                >브랜드 불러오기</ButtonCmp> -->
                <button class="btn-brand">
                  브랜드 개설 가이드
                </button>
              </div>
              <BrandEmulator :brandInfoData="form" curTab="info"/>
            </div>
          </div>
        </form>
        <div class="bottom-notice--gray">
          <p>- 신청한 브랜드 정보는 운영자 심사를 거쳐 노출 여부가 결정되며 승인 결과는 문자메시지(SMS) 및 이메일로 알려드립니다.</p>
          <p>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</p>
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
              type="btn-line"
              @click="saveTempData"
          >임시저장
          </ButtonCmp>
          <ButtonCmp
            type="btn-blue"
            @click="onSubmit"
          >다음</ButtonCmp>
        </div>
      </div>
    </div>
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <BrandImport
          v-if="isBrandImport"
          @closeModal="isModalViewed = false"
        >
      </BrandImport>
      <ConfirmMsg
          v-if="isSave"
          @closeModal="isModalViewed = false"
        >
          <div class="msg" slot="msg">
            입력하신 정보가 임시저장 되었습니다.
          </div>
          <div class="button__wrap" slot="button">
              <ButtonCmp
              type="btn-blue"
              @click="closeMsg"
              >
                닫기
              </ButtonCmp> <!-- 기획서 v1.0 수정 (문구 수정) -->
          </div>
      </ConfirmMsg>
    </ModalView>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
// import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import StepList from '@/components/common/StepList.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/brand/create/components/ConfirmMsg.vue'
import BrandImport from '@/views/brand/create/components/BrandImport.vue'
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
    ModalView,
    BrandImport,
    BrandEmulator,
    ConfirmMsg,
    ToolTipEl
  },
  data() {
    return {
      form: {
        name: '',
        desc: '',
        certificationType: 'phone',
        certificationNum: '',
        certificationFile: '',
        bgImgFileUrl: '',
        custombgImgFileUrl: '',
        agentWarrant: '',
        profileImgFileUrl: '',
        bgImageType: 'custom',
        Identity: '',
        profileImageType: 'custom',
        category1: '',
        category2: '',
        category3: '',
        url: '',
        email: '',
        tel: '',
        postcode: '',
        addr1: '',
        addr2: '',
        profileDefaultItem: '',
        brandColorType: 'defalut',
        phone: '',
        certNumber: '',
        bgImage: '',
        brandColor: '#0C22E1'
      },
      isActiveNum: '',
      brandNameErrorMsg: false,
      brandDescriptionErrorMsg: false,
      bgImageErrorMsg: false,
      profileImageErrorMsg: false,
      categoryErrorMsg: false,
      telErrorMsg: false,
      isModalViewed: false,
      isSave: false,
      isBrandImport: false,
      quickButton: ['chat'],
      imgcategoryOptions,
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
          label: '쇼핑',
          value: 'shopping'
        },
        {
          label: '뷰티',
          value: 'beauty'
        },
        {
          label: '여행/레저/스포츠',
          value: 'travel'
        },
        {
          label: '엔터테인먼트',
          value: 'entertainment'
        },
        {
          label: '자동차/교통',
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
        }
      ],
      categoryOptions2: [
        {
          label: '의류',
          value: 'shopping'
        },
        {
          label: '가전/가구',
          value: 'shopping'
        },
        {
          label: '생활용품',
          value: 'shopping'
        },
        {
          label: '유아동',
          value: 'shopping'
        },
        {
          label: '자동차용품',
          value: 'shopping'
        },
        {
          label: '종합몰/마트/백화점',
          value: 'shopping'
        },
        {
          label: '오프라인 쇼핑',
          value: 'shopping'
        },
        {
          label: '해외쇼핑',
          value: 'shopping'
        },
        {
          label: '공동구매',
          value: 'shopping'
        },
        {
          label: '주문/배달/방문',
          value: 'shopping'
        },
        {
          label: '중고거래',
          value: 'shopping'
        },
        {
          label: '패션잡화',
          value: 'shopping'
        },
        {
          label: '스포츠용품',
          value: 'shopping'
        },
        {
          label: '핸드폰/주변기기',
          value: 'shopping'
        },
        {
          label: '대여',
          value: 'shopping'
        },
        {
          label: '슈퍼마켓',
          value: 'shopping'
        },
        {
          label: '쇼핑 일반',
          value: 'shopping'
        }
      ],
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정', '브랜드 개설 완료'],
      brendInfo: {},
      Timer: null,
      TimeCounter: 180,
      TimerStr: '03:00'
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
      this.$router.push('./brandcreatestep02')
    },
    saveTempData () {
      this.isModalViewed = true
      this.isSave = true
    },
    onCertificaChanged (e) {
      const files = e.target.files
      const fileName = files[0].name
      const file = e.target.files[0]
      this.form.certificationFile = fileName
      this.url = URL.createObjectURL(file)
    },
    onFileBgChanged (e) {
      const files = e.target.files
      const fileName = files[0].name
      const file = e.target.files[0]
      this.form.custombgImgFileUrl = fileName
      this.url = URL.createObjectURL(file)
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
    },
    closeModal () {
      this.isModalViewed = false
    },
    closeMsg  () {
      this.isModalViewed = false
    },
    brandImport () {
      this.isModalViewed = true
      this.isBrandImport = true
    },
    phoneCertificate () {
      this.isModalViewed = true
    },
    start() {
      this.isModalViewed = true
      this.$refs.time.classList.remove('hide')
      this.$refs.time.classList.add('active')
      this.isButtonDisabled = true

      // 1초에 한번씩 start 호출
      this.TimeCounter = 180
      var interval = setInterval(() => {
        this.TimeCounter-- // 1초씩 감소
        this.TimerStr = this.prettyTime()
        if (this.TimeCounter <= 0) this.timerStop(interval)
      }, 1000)
      return interval
    },
    timerStop: function(Timer) {
      clearInterval(Timer)
      this.TimeCounter = 0
      if (this.form.certNumber === '') {
        this.phoneCheckTimeout = true
      }
    },
    prettyTime: function() {
      // 시간 형식으로 변환 리턴
      let time = this.TimeCounter / 60
      let minutes = parseInt(time)
      let secondes = Math.round((time - minutes) * 60)
      return (
        minutes.toString().padStart(2, '0') +
        ':' +
        secondes.toString().padStart(2, '0')
      )
    }
  }
}
</script>
