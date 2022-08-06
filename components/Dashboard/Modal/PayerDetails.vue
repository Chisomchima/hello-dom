<template>
  <div>
    <ModalWrapper
      size="lg"
      id="payerDetails"
      :title="`Payment Schemes`"
      :arrangement="false"
      :cancelText="`Close`"
      >
      <div>
         <TableComponent
          :items="data"
          :fields="fields"
          :paginate="false"
        >
        <template #type="{ data }">
            <span class="text-capitalize">{{data.item.type}}</span>
          </template>
          <template #edit="{ data }">
            <div @click="edit(data.item)" class="text-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="18"
                height="18"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585l1.594-1.58zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006v-1.589z"
                />
                <path
                  fill="currentColor"
                  d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"
                />
              </svg>
            </div>
          </template>
        </TableComponent>
      </div>
    </ModalWrapper>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        data: {
            type: Array,
            default:() => ([]) 
        }
    },
    data(){
        return{
        fields: [
        {
          key: 'payer_scheme.name',
          label: 'Enrollee ID',
          sortable: true,
        },
        {
          key: 'payer_scheme.type',
          label: 'Type',
          sortable: true,
        },
        {
          key: 'enrollee_id',
          label: 'Enrollee ID',
          sortable: true,
        },
        {
          key: 'relationship',
          label: 'Relationship',
          sortable: true,
        },
        {
          key: 'exp_date',
          label: 'Expiry Date',
          sortable: true,
        },
      ],
        }
    },
})
</script>

<style lang="scss" scoped>
</style>

