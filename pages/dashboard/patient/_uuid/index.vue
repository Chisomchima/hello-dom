<template>
  <div>
    <BackwardNavigation />
    <UtilsHeaderCardWithAvatar
      :title="`${data.salutation ? data.salutation : ''} ${
        data.firstname ? data.firstname : ''
      } ${data.lastname ? data.lastname : ''}`"
      :data="data"
      :enable-action="true"
      
      :display-key="[
        'uhid',
        'date_of_birth',
        'gender',
        'marital_status',
        'religion',
        'nationality',
        'phone_number',
      ]"
      @edit="editRoute()"
      @make_deposit="$bvModal.show('depositModal')"
      @payers="checkPayersDetails"
      @picture="uploadAvatar"
    >
    </UtilsHeaderCardWithAvatar>
    <UtilsBaseCardTab>
      <UtilsCardTab title="Encounter">
        <keep-alive>
          <DashboardPatientEncounters :data="data" />
        </keep-alive>
      </UtilsCardTab>
      <UtilsCardTab title="Lab Order">
        <keep-alive>
          <EncountersLabOrders :patientData="data" />
        </keep-alive>
      </UtilsCardTab>
      <UtilsCardTab title="Imaging">
        <DashboardPatientImaging :data="data" />
      </UtilsCardTab>
      <UtilsCardTab title="Prescription">
        <DashboardPatientPrescription :data="data" />
      </UtilsCardTab>
      <UtilsCardTab title="Appointment">
        <h5>Coming Soon</h5>
      </UtilsCardTab>
      <UtilsCardTab title="Finance">
        <div class="d-flex justify-content-end align-items-center pt-1">
          <div class="d-flex">
            <div class="text-14 text-grey text-right p-2">
              Deposit Balance: {{ data.deposit !== null ? depositBalance : '' }}
            </div>
            <div class="text-14 text-grey text-right pl-0 pr-2 py-2">
              | Reserved: {{ data.reserve !== null ? reserveBalance : '' }}
            </div>
          </div>

          <div class="m-2">
            <button
              @click="$bvModal.show('depositModal')"
              class="btn btn-outline-primary btn-sm"
            >
              Make deposit
            </button>
          </div>
        </div>

        <TabView class="tabview-custom">
          <TabPanel class="dark-panel">
            <template #header>
              <span class="ml-2">Billing</span>
            </template>
            <DashboardPatientBilling @reload_tabs="sendSignal" :data="data" />
          </TabPanel>
          <TabPanel class="dark-panel">
            <template #header>
              <span class="ml-2">Payments</span>
            </template>
            <DashboardPatientPayment :refresh="refresh" :data="data" />
          </TabPanel>
          <TabPanel class="dark-panel">
            <template #header>
              <span class="ml-2">Invoices</span>
            </template>
            <DashboardPatientInvoice :refresh="refresh" :data="data" />
          </TabPanel>
        </TabView>
      </UtilsCardTab>
      <UtilsCardTab title="Document">
        <DashboardPatientDocument :data="data" />
      </UtilsCardTab>
    </UtilsBaseCardTab>

    <DashboardModalPayerDetails :data="data.payment_scheme" />
    <DashboardModalPatientDepositModal
      @payload="printDepositSlip($event)"
      @refresh="getNewData"
      :data="data"
    />
    <DashboardModalConfirmDepositPrint :data="data" :reciept="template" />
    <DashboardModalUploadPicture :data="data" />
  </div>
</template>

<script>
export default {
  async asyncData({ $api, route }) {
    try {
      const data = await $api.patient.getPatient(route.params.uuid)
      return {
        data,
      }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      tabs: true,
      data: null,
      refresh: false,
      template: {},
    }
  },
  computed: {
    depositBalance() {
      return this.data.deposit
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
    reserveBalance() {
      return this.data.reserve
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    },
  },
  methods: {
    editRoute() {
      this.$router.push({
        name: 'dashboard-patient-uuid-edit',
        params: {
          uuid: this.data.id,
        },
      })
    },
    uploadAvatar() {
      console.log('avatar')
      this.$bvModal.show('uploadpicture')
    },
    sendSignal() {
      this.refresh = true
    },
    printDepositSlip(e) {
      this.template = e
      this.$bvModal.show('printDepositSlip')
    },
    getNewData() {
      this.$nuxt.refresh()
    },
    checkPayersDetails() {
      console.log('check')
      this.$bvModal.show('payerDetails')
    },
  },
}
</script>

<style lang="scss" scoped>
ul > li {
  padding: 5px;
}
</style>

<style lang="scss">
.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background: #ffffff;
  border-color: $COLOR_THREE !important;
  color: $COLOR_THREE;
  font-size: 14px;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link {
  border: solid #dee2e6;
  border-width: 0 0 2px 0;
  border-color: transparent transparent #dee2e6 transparent;
  background: #ffffff;
  font-size: 14px;
  color: #6c757d;
  padding: 1rem;
  font-weight: 600;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  transition: box-shadow 0.2s;
  margin: 0 0 -2px 0;
}

.p-tabview .p-tabview-nav {
  background: #ffffff;
  border: 1px solid #dee2e6;
  /* border-width: 0 0 2px 0; */
}

li {
  cursor: pointer;
  border: 0.5px solid #fff;
}
</style>