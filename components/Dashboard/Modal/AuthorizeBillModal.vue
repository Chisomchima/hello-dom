<template>
  <ModalWrapper
    submit-title="Authorize"
    title="Payment"
    @ok="ok()"
    @hide="clear()"
    size="lg"
    id="authorize"
  >
    <div class="row text-14">
      <div class="col-md-3">
        <span class="text-grey">UHID:</span> {{ nameData.uhid }}
      </div>
      <div class="col-md-6">
        <span class="text-grey">Name:</span>
        {{
          nameData.salutation +
          ' ' +
          nameData.firstname +
          ' ' +
          nameData.lastname
        }}
      </div>
    </div>
    <div class="col-md-3 text-14 px-0">
      <span class="text-grey">Gender:</span> {{ nameData.gender }}
    </div>
    <div class="d-flex align-items-center">
      <div class="class-details-data_label">Scheme(s):</div>
      <ul
        v-if="nameData.payment_scheme.length > 0"
        class="d-flex w-100 px-0 mb-0"
      >
        <li
          style="list-style: none"
          v-for="(item, index) in nameData.payment_scheme"
          :key="index"
          class="px-2 text-14"
        >
          <span class="class-details-data_value text-truncate">
            | {{ item.payer_scheme.name }}
          </span>
          <span> ({{ item.payer_scheme.type }}) </span>
        </li>
      </ul>
      <div class="text-14 ml-2" v-else>Nil</div>
    </div>
    <hr />
    <div>
      <div class="col-md-6 mb-2">
        <ValidationProviderWrapper name="Auth Code" :rules="['required']">
          <input v-model="authCode" type="text" class="form-control" />
        </ValidationProviderWrapper>
      </div>
    </div>
    <div>
      <TableComponent :items="goods" :paginate="false" :fields="fields">
        <template #delete="{ data }">
          <span class="text-danger" @click="removeItem(data.item)"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="22"
              height="22"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
              /></svg
          ></span>
        </template>
        <template #is_reserved="{ data }">
          <span v-if="data.item.is_reserved" class="badge-warning p-1 rounded"
            >R</span
          >
        </template>
      </TableComponent>
    </div>
    <div class="p-2 text-14 d-flex justify-content-between">
      <p class="mb-0 text-info border p-2">
        Total: ₦ {{ total ? total.toLocaleString('en-US') : 0 }}
      </p>
      <!-- <p class="mb-0 text-danger border p-2">
        Balance: ₦ {{ balance ? balance.toLocaleString('en-US') : 0 }}
      </p> -->
    </div>
  </ModalWrapper>
</template>

<script>
export default {
  props: {
    editData: {
      type: Object,
      require: false,
      default: () => ({}),
    },
    nameData: {
      type: Object,
      require: true,
      // default: () => ({}),
    },
    total: {
      type: Number,
      require: false,
      default: () => 0,
    },
    totalPaid: {
      type: Number,
      require: false,
      default: () => 0,
    },
    goods: {
      type: Array,
      require: false,
      default: () => [],
    },
    reserved: {
      type: Number,
      require: false,
      default: () => 0,
    },
  },
  data() {
    return {
      authCode: '',
      dateTest: '',
      payAmount: 0,
      balance: 0,
      fields: [
        {
          key: 'bill_source',
          label: 'Bill Source',
        },
        {
          key: 'description',
          label: 'Description',
        },

        {
          key: 'quantity',
          label: 'Qty',
        },
        {
          key: 'cost',
          label: 'Unit',
        },
        {
          key: 'selling_price',
          label: 'Total',
        },
        {
          key: 'delete',
          label: '',
        },
        {
          key: 'is_reserved',
          label: '',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    formattedQty() {
      // Add the commas back to the string
      const qty = this.dataObject.amount + ''
      console.log(qty)
      return qty.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
  watch: {
  },
  async mounted() {
  },

  methods: {
    ok() {
      this.$emit('authCode', this.authCode)
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
    clear() {
      this.payments = []
      this.balance = 0
      this.payAmount = 0
      this.$emit('hide')
    },
  },
}
</script>

<style lang="scss" scoped>
.b-table-sticky-header,
.table-responsive,
[class*='table-responsive-'] {
  margin-bottom: 0rem;
}
</style>