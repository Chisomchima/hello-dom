<template>
  <ValidationObserver ref="form">
    <div class="row mt-4">
      <div
        v-for="(form, index) in formConfig"
        :key="index"
        :class="form.col ? form.col : 'col-md-4'"
      >
        <div v-show="form.show" class="mb-2">
          <ValidationProviderWrapper :name="form.name" :rules="form.rules">
            <VSelect
              v-if="form.type === 'select'"
              class="text-14"
              v-model="form.value"
              :options="form.options"
              :label="form.select_label"
              :reduce="(opt) => opt"
              @input="onInput({ key: form.key, value: form.value })"
            ></VSelect>

            <label
              v-else-if="form.type === 'checkbox'"
              class="exercise-option-check green-check"
            >
              <input
                v-model="form.value"
                type="checkbox"
                name="customRadio"
                @input="onInput({ key: form.key, value: form.value })"
              />
              <span class="checkmark"></span>
              <span class="text">{{ form.name }}</span>
            </label>
            <textarea
              v-else-if="form.type === 'textarea'"
              v-model="form.value"
              cols="10"
              rows="10"
              class="form-control"
              @input="onInput({ key: form.key, value: form.value })"
            >
            </textarea>
            <input
              v-else
              v-model="form.value"
              class="form-control"
              :type="form.type ? form.type : 'text'"
              :placeholder="form.name"
              @input="onInput({ key: form.key, value: form.value })"
            />
          </ValidationProviderWrapper>
        </div>
      </div>

      <!-- <BaseButton @click="send()">Submit</BaseButton> -->
    </div>
  </ValidationObserver>
</template>

<script>
export default {
  props: {
    currentPosition: {
      type: Number,
      required: true,
      default: 0,
    },
    editFormData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      formPosition: [
        [
          'is_baby',
          'salutation',
          'firstname',
          'middlename',
          'lastname',
          'date_of_birth',
          'gender',
          'email',
          'phone_number',
          'marital_status',
          'arms_of_service',
          'arms_no',
          'id_type',
          'id_number',
          'id_validity',
        ],
        [
          'address',
          'address_city',
          'address_country',
          'address_postal_code',
          'occupation',
          'religion',
          'nationality',
          'state_of_origin',
          'lga',
        ],
        [
          'relation_name',
          'relationship',
          'relation_address',
          'relation_phone_num',
          'relation_city',
          'relation_country',
        ],
        [],
      ],
      formConfig: [
        {
          key: 'is_baby',
          name: 'is Baby',
          type: 'checkbox',
          rules: [''],
          value: false,
          col: 'col-md-12',
          show: false,
        },
        {
          key: 'salutation',
          name: 'Salutation',
          rules: [''],
          type: 'select',
          select_label: 'salutations',
          options: [],
          col: 'col-md-3',
          value: '',
          show: false,
        },
        {
          key: 'firstname',
          name: 'First Name',
          rules: ['required'],
          value: '',
          col: 'col-md-3',
          show: true,
        },
        {
          key: 'middlename',
          name: 'Middle Name',
          rules: [''],
          value: '',
          col: 'col-md-3',
          show: true,
        },
        {
          key: 'lastname',
          name: 'Last Name',
          rules: ['required'],
          value: '',
          col: 'col-md-3',
          show: true,
        },
        {
          key: 'date_of_birth',
          name: 'DOB',
          rules: ['required'],
          type: 'date',
          value: '',
          col: 'col-md-3',
          show: true,
        },
        {
          key: 'gender',
          name: 'Gender',
          rules: ['required'],
          type: 'select',
          select_label: 'gender',
          col: 'col-md-3',
          options: [],
          value: null,
          show: true,
        },
        {
          key: 'arms_of_service',
          name: 'Arms of service',
          rules: [''],
          type: 'select',
          select_label: 'Arms of service',
          options: [],
          col: 'col-md-3',
          value: null,
          show: true,
        },
        {
          key: 'arms_no',
          name: 'Arms No.',
          rules: [''],
          value: '',
          col: 'col-md-3',
          show: true,
        },
        {
          key: 'email',
          name: 'Email',
          rules: ['email'],
          value: '',
          show: true,
        },
        {
          key: 'phone_number',
          name: 'Phone Number',
          rules: ['required'],
          value: '',
          show: true,
        },
        {
          key: 'marital_status',
          name: 'Marital Status',
          rules: [''],
          type: 'select',
          select_label: 'marital_status',
          options: [],
          value: '',
          show: true,
        },
        {
          key: 'id_type',
          name: 'Identification Type',
          rules: [''],
          type: 'select',
          options: [
            'Service No',
            'Driving License',
            'Employee Id',
            'Passport, Visa No',
          ],
          value: null,
          show: true,
        },
        {
          key: 'id_number',
          name: 'Identification Number',
          rules: [''],
          value: '',
          show: true,
        },
        {
          key: 'id_validity',
          name: 'ID Validity',
          rules: [''],
          type: 'date',
          value: '',
          show: true,
        },

        {
          key: 'address',
          name: 'Address',
          rules: [''],
          type: 'textarea',
          value: '',
          col: 'col-md-12',
        },
        {
          key: 'address_city',
          name: 'City',
          rules: [''],
          value: '',
        },
        {
          key: 'address_country',
          name: 'Country',
          rules: [''],
          value: '',
        },
        {
          key: 'address_postal_code',
          name: 'Postal Code',
          rules: [''],
          type: 'input',
          value: '',
        },

        {
          key: 'occupation',
          name: 'Occupation',
          rules: [''],
          value: '',
          type: 'select',
          select_label: 'occupation',
          options: [],
        },
        {
          key: 'religion',
          name: 'Religion',
          rules: [''],
          type: 'select',
          select_label: 'religion',
          options: ['Christianity', 'Islam'],
          value: '',
        },
        {
          key: 'nationality',
          select_label: 'country',
          name: 'Nationality',
          options: [],
          type: 'select',
          rules: [''],
          value: '',
        },
        {
          key: 'state_of_origin',
          name: 'State of Origin',
          rules: [''],
          type: 'select',
          select_label: 'state',
          options: [],
          value: '',
        },
        {
          key: 'lga',
          name: 'LGA',
          rules: [''],
          value: '',
        },

        {
          key: 'relation_name',
          name: 'Relative Name',
          rules: [''],
          value: '',
          col: 'col-md-6',
        },
        {
          key: 'relationship',
          name: 'Relationship',
          col: 'col-md-6',
          rules: [''],
          value: '',
          options: [
            'Brother',
            'Brother-in-law',
            'Daughter',
            'Daughter-in-law',
            'Father',
            'Father-in-law',
            'Friend',
            'Grandfather',
            'Grandmother',
            'Husband',
            'Mother',
            'Mother-in-law',
            'Self',
            'Sister',
            'Sister-in-law',
            'Son',
            'Son-in-law',
            'Uncle',
            'Wife',
          ],
          type: 'select',
        },
        {
          key: 'relation_address',
          name: 'Address',
          rules: [''],
          value: '',
          col: 'col-md-12',
          type: 'textarea',
        },
        {
          key: 'relation_phone_num',
          name: 'Phone Number',
          rules: [''],
          value: '',
        },
        {
          key: 'relation_city',
          name: 'City',
          rules: [''],
          value: '',
        },
        {
          key: 'relation_country',
          name: 'Country',
          rules: [''],
          value: '',
        },

        {
          key: 'scheme',
          name: 'Scheme',
          rules: [],
          value: '',
          select_label: 'name',
          type: 'select',
          col: 'col-md-3',
        },
        {
          key: 'enrollee_id',
          name: 'Enrollee ID',
          rules: [],
          type: 'text',
          col: 'col-md-3',
        },
        {
          key: 'relationship_payer',
          name: 'Relationship',
          rules: [],
          value: '',
          type: 'select',
          col: 'col-md-3',
          options: ['Principle', 'Dependent'],
        },
        {
          key: 'expiration_date',
          name: 'Expiration date',
          rules: [],
          value: '',
          type: 'date',
          col: 'col-md-3',
        },
      ],
    }
  },
  watch: {
    currentPosition: {
      handler(newVal) {
        console.log(newVal)
        this.updateForm(newVal)
      },
      deep: true,
    },
    editFormData: {
      handler(newVal) {
        for (const key in newVal) {
          // console.log(`${key}: ${newVal[key]}`)
          const index = this.formConfig.findIndex((item) => item.key === key)
          if (index > -1) {
            this.formConfig[index].value = newVal[key]
          }
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.$api.core.gender({ size: 1000 }).then((res) => {
      this.setOptions('gender', res.results)
    })

    this.$api.core.martialStatus({ size: 1000 }).then((res) => {
      this.setOptions('marital_status', res.results)
    })

    this.$api.core.salutation({ size: 1000 }).then((res) => {
      this.setOptions('salutation', res.results)
    })

    this.$api.core.country({ size: 1000 }).then((res) => {
      this.setOptions('nationality', res.results)
    })

    this.$api.core.religion({ size: 1000 }).then((res) => {
      this.setOptions('religion', res.results)
    })

    this.$api.core.occupation({ size: 1000 }).then((res) => {
      this.setOptions('occupation', res.results)
    })
    this.$api.core.getCoatofArm({ size: 1000 }).then((res) => {
      this.setOptions('arms_of_service', res.results)
    })
    this.$api.finance_settings.getPayerSchemes({ size: 1000 }).then((res) => {
      this.setOptions('scheme', res.results)
      console.log(res.results)
    })
  },
  created() {
    this.formConfig.forEach((item) => {
      item.show = false
    })
    this.updateForm(0)
  },
  methods: {
    updateForm(index) {
      const key = this.formPosition[index]
      this.formConfig = this.formConfig.map((item) => {
        if (key.includes(item.key)) {
          item.show = true
        } else {
          item.show = false
        }
        return item
      })
    },
    async checkFormValidity() {
      const data = await this.$refs.form.validate()
      if (data) {
        return true
      }
      return false
    },
    setOptions(key, options) {
      this.formConfig.find((item) => item.key === key).options = options
    },
    onInput({ key, value }) {
      if (key === 'nationality') {
        this.$api.core.state({ size: 1000, country: value.id }).then((res) => {
          this.setOptions('state_of_origin', res.results)
        })
      }

      this.$emit('input:data', { key, value })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>