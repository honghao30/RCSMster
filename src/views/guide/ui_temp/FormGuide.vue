<template>
  <div class="tmep__wrap">
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>Form 요소에 대한 기본 정의 내용 입니다.</li>
        </ul>
      </div>
    </div>
    <TitleH3 titleh3="Input" />
    <span class="input">
        <input ref="usrid" type="text" class="input" placeholder="input 입니다.">
    </span>
    <!--
    <TitleH3 titleh3="Select" />
    <div class="wsg-guide-content">
      <div class="select">
        <select name="" id="selectValue">
          <option value="1">선택 1</option>
          <option value="2">선택 2</option>
          <option value="3">선택 3</option>
        </select>
      </div>
    </div>
    -->
    <TitleH3 titleh3="Dropdown" />
    <div class="wsg-guide-content">
      <div class="wsg-note__wrap--gray-box">
        <ul class="wsg_desc">
          <li>Dropdown은 option을 데이터 형식으로 넣어줍니다. Dropdown 메뉴 내 검색을 원할 시에는 searchable 을 prop으로 전달하면 됩니다. </li>
        </ul>
      </div>
    </div>

    <Dropdown searchable :options="dropdownOptions" v-model="form.dropdown">
    </Dropdown>
    <!-- search 가 필요하시면 searchable 추가해주세요.-->
    <TitleH3 titleh3="Checkbox" />
    <span class="checkbox">
      <input type="checkbox" id="check" value="form.check"/>
      <label for="check"><span class="checkbox__text">옵션1</span></label>
    </span>
    <TitleH3 titleh3="Radiobox" />
    <span class="radiobox">
        <input type="radio" name="radio" id="radio1" />
        <label for="radio1"><span class="radiobox__text">옵션1</span></label>
      </span>
      <span class="radiobox">
        <input type="radio" name="radio" id="radio2" />
        <label for="radio2"><span class="radiobox__text">옵션2</span></label>
      </span>
      <span class="radiobox">
        <input type="radio" name="radio" id="radio3" />
        <label for="radio3"><span class="radiobox__text">옵션3</span></label>
      </span>
    <TitleH3 titleh3="Datepicker" />
    <el-date-picker
        v-model="form.date"
        type="date"
        placeholder="날짜를 선택하세요">
    </el-date-picker>
    <TitleH3 titleh3="Textarea" />
    <div class="input-item input-limit">
      <div class="textarea">
        <textarea maxlength="1000" placeholder="문의 내용을 입력해주세요." v-model="form.textarea"></textarea>
        <div class="textarea-limit__text">
          <p>
            {{ form.textarea.length }}/1000자
          </p>
        </div>
      </div>
    </div>
    <TitleH3 titleh3="스위치" />
    <div class="switch" role="switch">
      <input type="checkbox" id="switch" v-model="form.switch">
      <label class="switch__core" for="switch"></label>
    </div>
    <!-- <TitleH3 titleh3="Form List" />
    <div class="wsg-guide-content">
      <div class="form-list">
        <div class="form-item">
          <span class="form-item__label">아이디</span>
          <div class="form-item__content">
            <input type="text" class="input" v-model="form.id"/>
          </div>
          <p class="guide-text error" v-if="!idValidation">아이디를 입력해주세요.</p>
        </div>
        <div class="form-item">
          <span class="form-item__label">휴대폰번호</span>
          <div class="form-item__content">
            <input type="text" class="input">
            <button class="btn__certi">인증번호 요청</button>
          </div>
          <p class="guide-text error" v-if="!idValidation">휴대폰번호를 입력해주세요.</p>
        </div>
      </div>
      <button @click="checkValidation">Validation Check</button>
    </div> -->
    <TitleH3 titleh3="Form List(Table형)" />
    <div class="table__wrap">
      <table class="table table-bodyonly form-table">
        <colgroup>
          <col width="200px">
          <col />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row"><span class="form-item__label required">이름</span></th>
            <td>
                <div class="form-item__content">
                    <div class="form-item-row">
                        <div class="input-item">
                            <span class="input"><input type="text" class="input" placeholder="담당자 이름을 입력해주세요."></span>
                        </div>
                    </div>
                    <p class="guide-text error">담당자 이름을 입력해주세요.</p>
                </div>
            </td>
          </tr>
          <tr>
            <th scope="row"><span class="form-item__label required">휴대폰 번호</span></th>
            <td>
                <div class="form-item__content">
                    <div class="form-item-row">
                        <div class="input-item">
                            <span class="input"><input type="text" class="input" placeholder="‘-’없이 자리 숫자만 입력해주세요."></span>
                            <ButtonCmp
                                type="btn-default-line"
                            >
                            휴대폰 인증
                            </ButtonCmp>
                        </div>
                        <p class="guide-text error">휴대폰 번호을 입력해주세요.</p>
                    </div>
                </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TitleH3 from '../cmp/TitleH3.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  data() {
    return {
      form: {
        selectValue: '',
        date: '',
        check: '',
        radio: 1,
        radioGroup: 3,
        id: '',
        dropdown: '',
        textarea: '',
        switch: ''
      },
      dropdownOptions: [
        {
          label: 'all',
          value: 'all'
        },
        {
          label: 'option1',
          value: 'option1'
        },
        {
          label: 'option2',
          value: 'option2'
        },
        {
          label: 'option3',
          value: 'option3'
        }
      ],
      idValidation: true
    }
  },
  components: {
    TitleH3,
    Dropdown,
    ButtonCmp
  },
  methods: {
    checkValidation() {
      this.idValidation = false
    }
  }

}
</script>
