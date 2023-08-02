<template>
  <table class="table table-bodyonly form-table">
   <colgroup>
     <col width="180px">
     <col />
   </colgroup>
   <tbody>
     <tr>
      <th scope='row'><span class='form-item__label'>공지</span></th>
      <td>
        <div class='form-item__content'>
          <div class='form-item-row'>
            <div class='inner__input'>
              <div class='inner__input-box'>
                <span class='form-item__label required'>내용</span>
                <div class='inner__input-item'>
                  <div class='input-item input-limit'>
                    <div class='textarea'>
                      <textarea placeholder='내용을 입력해주세요.'
                      @input="e => info.content = e.target.value"
                        ></textarea>
                        <div class='textarea-limit__text'>
                          <p>{{ info.content.length }}/30자</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
