<template>
  <table class="table table-bodyonly form-table">
   <colgroup>
     <col width="180px">
     <col />
   </colgroup>
   <tbody>
    <tr>
       <th scope="row"><span class="form-item__label required">타이틀 - 제목</span></th>
       <td>
         <div class="form-item__content">
           <div class="form-item-row">
             <div class="input-item input-limit">
                 <div class="input">
                   <input type="text"
                     class="input"
                     maxlength="17"
                     id="mainTitle_Title"
                     v-model="form.MainTitle.info.mainTitle"
                     @input="calcText()"
                     placeholder="제목을 입력해주세요."
                   >
                   <div class="input-limit__text">
                     <p>{{ mainTitleLength }}/8자</p>
                   </div>
                 </div>
               </div>
           </div>
         </div>
       </td>
     </tr>
     <tr>
       <th scope="row"><span class="form-item__label">타이틀 - 로고</span></th>
       <td>
         <div class="form-item__content">
         <!-- 로고 등록 -->
           <div class="form-item-row">
             <div class="input-item">
               <span class="radiobox">
                 <input type="radio" name="logoType" id="basicImage" v-model="form.MainTitle.logoType"  value="basicImage" />
                 <label for="basicImage">기본 아이콘</label>
               </span>
               <span class="radiobox">
                 <input type="radio" name="logoType" id="custom" v-model="form.MainTitle.logoType" value="custom" />
                 <label for="custom">직접 등록</label>
               </span>
             </div>
           </div>
           <div class="form-item-row" v-if="form.MainTitle.logoType === 'basicImage'">
             <div class="input-item logoList">
               <TemplateTitleReg
                 :titleIconNewData="titleIconNewData"
                 :titleIconBasicData="titleIconBasicData"
                 @optionSelected="checkTitleSelected"
               />
               </div>
           </div>
           <div class="form-item-row" v-if="form.MainTitle.logoType === 'custom'">
             <div class="input-item w--full">
               <span class="input">
                 <input type="text" class="input" :value="form.logoFile" disabled>
               </span>
               <input type="file" id="fileUp" class="input blind"
               @change="onFileChanged">
               <label for="fileUp" class="btn btn-default-line">파일 선택</label>
             </div>
             <p class="guide-text black">&middot; 파일형식: PNG, GIF (최대 1MB)</p>
           </div>
         </div>
       </td>
     </tr>
   </tbody>
 </table>
</template>

<script>
import TemplateTitleReg from '@/views/brand/message/components/TemplateTitleReg.vue'
export default {
 components: {
   TemplateTitleReg
 },
 props: {
   info: {
     type: Object,
     default: null
   }
 },
 data () {
   return {
     mainTitleLength : 0,
     form: {
       MainTitle: {
         logoType:'basicImage',
         info: {
           mainTitle: '',
           titleType: '',
           varUse: 'Y',
           logoUse: 'Y',
           logoFile: '',
           logoUrl: '',
           logoCategory:'none',
           mainDesc: ''
         }
       }
     },
     titleIconNewData: [
       {
         title: '알림',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '이벤트',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '프로모션',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '청구서',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '영수증',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '예약안내',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '일정안내',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '티켓',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '쿠폰',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       }
     ],
     titleIconBasicData: [
       {
         title: '승인',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '입금',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '출금',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '취소',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '주문',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '출고',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '배송',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '회원가입',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       },
       {
         title: '인증',
         titleIcon: require('../../../../assets/images/icon/icon_title_logo_alarm.png')
       }
     ]
   }
 },
 created() {
   //if (jglib.isEmpty(this.jsonData)) { > 값 가져오는 부분

   //} else {
   //}
   this.description = this.inputText
 },
 methods: {
   // 이미지 파일 업로드
   onFileChanged (e) {
     const files = e.target.files
     const file = files[0]
     const fileName = file.name
     this.form.logoFile = fileName
     this.url = URL.createObjectURL(file)
   },
   onSelectEmoji(e, target) {
     let emoji = e
     let refName = target
     this.$refs[refName].value += emoji
   },
   calcText() {
     let length = document.getElementById('mainTitle_Title').value
     this.calcLength(length)
   },
   calcLength(text) {
     this.mainTitleLength = text.split(/{{.*?}}/).join('').length
   },
   showLogo(){
     console.log(this.info.logoUse)
   }
 }
}
</script>
