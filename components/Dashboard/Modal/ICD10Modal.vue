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
        <!-- <div class="text-center">
          {{index}}
        </div> -->
        <div class="p-3">
            <input
              type="text"
              placeholder=" Type to search..."
              class="form-control ng-untouched ng-pristine ng-valid"
              v-model="searchParam"
            />
        </div>
         <TableComponent
          :items="dataOBJS"
          :fields="fields"
          :pages="pages"
          :busy="busy"
          @page-changed="goToNextPage"
        >
         <template #clear="{ data }">
            <label class="exercise-option-check blue-check">
              <input
                type="checkbox"
                name="customRadio"
                @change="pick($event.target.checked, data.item, index)"
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
            required: true
        },
        pages: {
            type: Number,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        
    },
    watch: {
      options(){
        this.busy = false
        this.dataOBJS = this.options
      },
      searchParam(){
        this.busy = true
        this.$emit('searchParam', this.searchParam)
      }
    },
    methods: {
        pick(event, item, index){
          this.$emit('diagnosis', item, index)
        },
        goToNextPage(n){
          this.busy = true
          this.$emit('page-changed', n)
        }
    },
    mounted(){
      this.dataOBJS = this.options
    },
    data(){
        return{
        dataOBJS: [],
        selected: [],
        searchParam: '',
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

