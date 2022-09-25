<template>
  <div>
    <ModalWrapper
      size="lg"
      id="icd10modal"
      :title="`Diagnosis lists`"
      :arrangement="false"
      :cancelText="`Close`"
      >
      <div>
        <div>
          {{index}}
        </div>
        <div class="p-3">
            <input
              type="text"
              placeholder=" Type to search..."
              class="form-control ng-untouched ng-pristine ng-valid"
            />
        </div>
         <TableComponent
          :items="options"
          :fields="fields"
          :pages="pages"
          :busy="busy"
          @page-changed="$emit('page-changed', $event)"
        >
         <template #clear="{ data }">
            <label class="exercise-option-check blue-check">
              <input
                type="checkbox"
                name="customRadio"
                @change="pick($event.target.checked, data.item)"
              />
              <span class="checkmark"></span>
            </label>
          </template>
        </TableComponent>
      </div>
    </ModalWrapper>
  </div>
</template>

<script lang="ts">
import TableFunc from '~/mixins/TableCompFun'
import Vue from 'vue'
export default Vue.extend({
     mixins: [TableFunc],
    props: {
        options: {
            type: Array,
            default:() => ([]) 
        },
        pages: {
            type: Number,
            default:() => (1) 
        },
        index: {
            type: Number,
            default:() => (0),
            required: true
        }
    },
    methods: {
        pick(event, item){
            console.log(item)
            this.$emit('diagnosis', item)
        }
    },
    mounted(){
        console.log('myindex',this.index)
    },
    data(){
        return{
        fields: [
        {
          key: 'clear',
          label: '',
          sortable: true,
        },
        {
          key: 'code',
          label: 'Code',
          sortable: true,
        },
        {
          key: 'case',
          label: 'Case',
          sortable: true,
        },
      ],
        }
    },
})
</script>

<style lang="scss" scoped>
</style>

