<template>
  <div>
    <div class="d-flex justify-content-between mb-5">
      <h5>Charts of Accounts</h5>
      <b-button variant="primary" @click="showAddModal"
        >Add a new Account</b-button
      >
    </div>

    <UtilsBaseCardTab backgroundColor="#F5F6F7">
      <UtilsCardTab title="Assets">
        <financeAddCard
          v-for="(card, index) in cards"
          :key="index"
          :data="card"
          @refreshPage="refreshPage"
          @add="$bvModal.show('add-account')"
        ></financeAddCard>
      </UtilsCardTab>
      <UtilsCardTab title="Liabilities &  Credit Cards">
        <financeAddCard
          v-for="(card, index) in liabilities"
          :key="index"
          :data="card"
          @refreshPage="refreshPage"
        ></financeAddCard>
      </UtilsCardTab>

      <UtilsCardTab title="Income">
        <financeAddCard
          v-for="(card, index) in income"
          :key="index"
          :data="card"
          @refreshPage="refreshPage"
        ></financeAddCard>
      </UtilsCardTab>
      <UtilsCardTab title="Expenses">
        <financeAddCard
          v-for="(card, index) in expenses"
          :key="index"
          :data="card"
          @refreshPage="refreshPage"
        ></financeAddCard>
      </UtilsCardTab>
      <UtilsCardTab title="Equity">
        <financeAddCard
          v-for="(card, index) in equity"
          :key="index"
          :data="card"
          @refreshPage="refreshPage"
        ></financeAddCard>
      </UtilsCardTab>
    </UtilsBaseCardTab>
    <!-- **** modals **** -->
    <section>
      <ModalWrapper
        id="add-account"
        title="Add an Account"
        submit-title="Save"
        variant="danger"
        @ok="handleOk"
        @hide="clearAccount"
      >
        <div class="px-3">
          <div>
            <ValidationObserver v-slot="{ validate }">
              <div
                id="runValidate"
                ref="runValidate"
                type="button"
                @click="validate().then((e) => (validated = e))"
              ></div>
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <label>Account Type</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <v-select
                        v-model="account.account_type"
                        class="style-chooser1"
                        placeholder="Select Account Type"
                        label="account_type_name"
                        :options="types"
                      >
                      </v-select>
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-12 p-r">
                  <div class="form-group">
                    <label>Account Name</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <input
                        v-model="account.account_name"
                        _ngcontent-dpg-c305=""
                        type="text"
                        placeholder="Account Name"
                        class="form-control"
                      />
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-12 p-r">
                  <div class="form-group">
                    <label>Account ID (optional)</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <input
                        v-model="account.account_id"
                        type="text"
                        placeholder="Enter account ID"
                        class="form-control"
                      />
                    </ValidationProviderWrapper>
                  </div>
                </div>
                <div class="col-12 p-r">
                  <div class="form-group">
                    <label>Description (optional)</label>
                    <ValidationProviderWrapper :rules="['required']">
                      <textarea
                        v-model="account.account_description"
                        name=""
                        class="form-control ng-untouched ng-pristine ng-valid"
                        id=""
                        cols="30"
                        rows="5"
                      ></textarea>
                    </ValidationProviderWrapper>
                  </div>
                </div>

                <div class="col-6 ml-4 pl-1">
                  <div class="form-group row">
                    <b-form-checkbox
                      v-model="account.is_active"
                      id="checkbox-1"
                      name="checkbox-1"
                      class="col"
                      :value="false"
                      :unchecked-value="true"
                    >
                      <span class="text-secondary"> Archive this account </span>
                    </b-form-checkbox>
                  </div>
                </div>
              </div>
            </ValidationObserver>
          </div>
        </div>
      </ModalWrapper>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validated: false,
      account: {
        account_name: '',
        account_id: '',
        account_description: '',
        account_type: '',
        is_active: true,
      },
      categories: [],
      types: [],
      accounts: [],
      cards: [
        {
          title: 'Cash and Bank',
          left: 'Cash on Hand',
          middle:
            'Cash you have not deposited in the bank. Add your bank and credit card accounts to accurately categorize transactions that are not cash.',
        },
        {
          title: 'Money in Transit',
          left: '',
          middle: '',
        },
        {
          title: 'Expected Payments from Customers',
          left: '',
          middle: '',
        },
        {
          title: 'Inventory',
          left: '',
          middle: '',
        },
        {
          title: 'Property, Plant, Equipment',
          left: '',
          middle: '',
        },
        {
          title: 'Depreciation and Amortization',
          left: '',
          middle: '',
        },
        {
          title: 'Vendor Prepayments and Vendor Credits',
          left: '',
          middle: '',
        },
        {
          title: 'Other Short-Term Asset',
          left: '',
          middle: '',
        },
        {
          title: 'Other Long-Term Asset',
          left: '',
          middle: '',
        },
        {
          title: 'Taxes',
          left: '',
          middle: '',
        },
      ],
      liabilities: [
        {
          title: 'Credit Card',
          left: '',
          middle: '',
        },
        {
          title: 'Loan and Line of  Credit',
          left: '',
          middle: '',
        },
        {
          title: 'Expected Payments to Vendors',
          left: '',
          middle: '',
        },
        {
          title: 'Sales Taxes',
          left: '',
          middle: '',
        },
        {
          title: 'Due for Payroll',
          left: '',
          middle: '',
        },
        {
          title: 'Due to  You and Other Business Owners',
          left: '',
          middle: '',
        },
        {
          title: 'Customer  Prepayments and Customer Credits',
          left: '',
          middle: '',
        },
        {
          title: 'Other Short-Term Liability',
          left: '',
          middle: '',
        },
        {
          title: 'Other Long-Term Liability',
          left: '',
          middle: '',
        },
      ],
      income: [
        {
          title: 'Income',
          content: [
            {
              name: 'Commission Income',
              left: 'No transactions for this account',
              middle: 'Income earned from commission',
            },
            {
              name: 'Sales',
              left: 'Last transaction on February 27, 2021',
              middle:
                'Payments from your customers for products and services that your business sold.',
            },
          ],
          left: '',
          middle: '',
        },
        {
          title: 'Discounts',
          content: [],
        },
        {
          title: 'Other Income',
          content: [],
        },
        {
          title: 'Uncategorized Income',
          content: [
            {
              name: 'Uncategorized Income',
              left: 'No transactions for this account',
              middle:
                'Income that you haven’t categorized yet. Categoroze it now to keep your records accurate',
            },
          ],
        },
        {
          title: 'Gain on Foreign Exchange',
          content: [
            {
              name: 'Uncategorized Income',
              left: 'No transactions for this account',
              middle:
                'Foreign echange gains happen when thr exchange rate between your business’s home currency and a foreign currency transaction changes and results in a gain. This can happen in the time between a transaction being entered and being settled, for eample, between when you send an invoice and when your customer pays it. This can affect foreign xurreency invoice payments, bill payments, or foreign currency held in your bank.',
            },
          ],
        },
      ],
      equity: [
        {
          title: 'Business Owner Contribution and Drawing',
          content: [
            {
              name: 'Owner Investment / Drawings',
              left: 'No transactions for this account',
              middle:
                'Owner investment represents the amount of money or assets you put into your business, either to start the business or keep it running. An owners draw is a direct withdrawal from business cash or assets for your personal use.',
            },
          ],
        },
        {
          title: 'Retained Earnings: Profit',
          content: [
            {
              name: 'Uncategorized Expenses',
              left: 'No transactions for this account',
              middle:
                "Owner's equity is what remains after you subtract business liabilities from business assets. In other words, its whats left over for you if you sell all your assets and pay all your debts.",
            },
          ],
        },
      ],
      expenses: [
        {
          title: 'Operating Expenses',
          content: [
            {
              name: 'Accounting Fees',
              left: 'No transactions for this account',
              middle: 'Accounting or bookkeeping services for your business',
            },
            {
              name: 'Advertising and Promotion',
              left: 'No transactions for this account',
              middle:
                'Advertising or other costs to promote your business. Includes web or social media promotion. ',
            },
            {
              name: 'Bank Service Charges',
              left: 'No transactions for this account',
              middle:
                'Fees you pay to your bank like transaction charges, monthly charges, and overdraft charges.',
            },

            {
              name: 'Accounting Fees',
              left: 'No transactions for this account',
              middle: 'Accounting or bookkeeping services for your business',
            },
            {
              name: 'Business Liscence and Permits',
              left: 'No transactions for this account',
              middle:
                'Fees for licenses and permits your business requires to operate.',
            },

            {
              name: 'Computer - Hardware',
              left: 'No transactions for this account',
              middle:
                'Desktop or laptop computers, mobile phones, tablets, and accessories used for your business.',
            },
            {
              name: 'Computer - Hosting',
              left: 'No transactions for this account',
              middle:
                'Fees for web storage and access, like hosting your business website or app',
            },
            {
              name: 'Computer Internet',
              left: 'No transactions for this account',
              middle:
                'Internet services for your business. Does not include data access for mobile devices.',
            },
            {
              name: 'Depreciation Expense',
              left: 'No transactions for this account',
              middle: '',
            },
            {
              name: 'Dues and Subscripitions',
              left: 'No transactions for this account',
              middle:
                'Fees or dues you pay to professional, business, and civic organizations. Does not include business licenses and permits or business memberships',
            },
            {
              name: 'Education and Training',
              left: 'No transactions for this account',
              middle:
                'Education and training for yourself or your staff that directly relates to your business, including annual courses to maintain a professional designation, or required safety certifications.',
            },
            {
              name: 'Insurance - Vehicles',
              left: 'No transactions for this account',
              middle: 'Insurance for the vehicle you use for busines',
            },
            {
              name: 'Insurance Expense',
              left: 'No transactions for this account',
              middle:
                'Interest your business pays on loans and other forms of debt, including business loans, credit cards, mortgages, and vehicle payments.',
            },
            {
              name: 'Meals and Entertainment',
              left: 'No transactions for this account',
              middle:
                'Food and beverages you consume while conducting business, with clients and vendors, or entertaining customers.',
            },
            {
              name: 'Office Supplies',
              left: 'No transactions for this account',
              middle:
                'Office supplies and services for your business office or space.',
            },
            {
              name: 'Postage and Delivery',
              left: 'No transactions for this account',
              middle: 'Shipping, postage, or courier fees for your business.',
            },
            {
              name: 'Printing and Reproduction',
              left: 'No transactions for this account',
              middle:
                'The cost of printing, copying, scanning, or digitizing materials for business.',
            },
            {
              name: 'Professional Fees',
              left: 'No transactions for this account',
              middle:
                'Fees you pay to consultants or trained professionals for advice or services related to your business.',
            },
          ],
        },
        {
          title: 'Cost of Goods Sold',
          content: [
            {
              name: 'Commissions Paid',
              left: 'No transactions for this account',
              middle: '',
            },
          ],
        },
      ],
    }
  },
  async fetch() {
    try {
      const endpoints = [
        `/finances/schools/${this.loggedInStaff.school_details.id}/account/categories/`,
        `finances/schools/${this.loggedInStaff.school_details.id}/account/types/`,
        `/finances/schools/${this.loggedInStaff.school_details.id}/accounts/`,
      ]
      const [categories, types, accounts] = await Promise.all(
        endpoints.map((endpoint) => this.$axios.get(endpoint))
      )
      if (categories.data) {
        this.categories = categories.data.results
      }
      if (types.data) {
        this.types = types.data.results
      }
      if (accounts.data) {
        this.accounts = accounts.data.results
      }
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    loggedInStaff() {
      return this.$store.getters['staff/getSchoolByCode'](this.$route.params.id)
    },
  },
  methods: {
    clearAccount() {
      this.account = {
        account_name: '',
        account_id: '',
        account_description: '',
        account_type: '',
        is_active: true,
      }
    },
    async handleAddAccount() {
      await console.log('hmh')
    },
    async refreshPage() {
      await this.fetch()
    },
    async handleOk() {
      if (this.$refs.runValidate) {
        this.$refs.runValidate.click()
      }
      if (!this.validated) return
      try {
        const account = this.account
        delete account.is_active
        await this.$axios.post(
          `/finances/schools/${this.loggedInStaff.school_details.id}/accounts/`,
          account
        )
        this.$bvModal.hide('add-account')

        this.clearAccount()
        this.$fetch()
      } catch (error) {
        console.error(error)
      }
    },

    showAddModal() {
      this.$bvModal.show('add-account')
    },
    addItem() {
      console.log('success')
    },
  },
}
</script>

<style scoped>
.style-chooser1 >>> .vs__search::placeholder,
.style-chooser1 >>> .vs__dropdown-toggle,
.style-chooser1 >>> .vs__dropdown-menu {
  background: #fbfdfe;
  color: #abb4bc;
}

label {
  font-size: 12px;
  color: rgb(122, 120, 120);
}
</style>
