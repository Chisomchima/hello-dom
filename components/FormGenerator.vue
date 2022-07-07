<template>
  <ValidationObserver ref="form">
    <div class="row mt-4">
      <div
        v-for="(form, index) in formConfigData"
        :key="index"
        class="col-md-4"
      >
        <div class="mb-2">
          <ValidationProviderWrapper :name="form.name" :rules="form.rules">
            <VSelect
              v-if="form.type === 'select'"
              v-model="form.value"
              :options="form.options"
              :label="form.select_label"
              @input="$emit('change', { key: form.key, value: form.value })"
            ></VSelect>

            <label
              v-else-if="form.type === 'checkbox'"
              class="exercise-option-check green-check"
            >
              <input v-model="form.value" type="checkbox" name="customRadio" />
              <span class="checkmark"></span>
              <span class="text">{{ form.name }}</span>
            </label>
            <input
              v-else
              v-model="form.value"
              class="form-control"
              :type="form.type ? form.type : 'text'"
              :placeholder="form.name"
              @input="$emit('change', { key: form.key, value: form.value })"
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
    formConfig: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      formConfigData: [
        // {
        //   name: 'First Name',
        //   rules: ['required'],
        //   value: '',
        // },
        // {
        //   name: 'Middle Name',
        //   rules: ['required'],
        //   value: '',
        // },
        // {
        //   name: 'Last Name',
        //   rules: ['required'],
        //   value: '',
        // },
        // {
        //   name: 'DOB',
        //   rules: ['required'],
        //   type: 'date',
        //   value: '',
        // },
        // {
        //   name: 'Gender',
        //   rules: ['required'],
        //   type: 'select',
        //   options: ['Male', 'Female'],
        //   value: null,
        // },
        // {
        //   name: 'Phone Number',
        //   rules: ['required'],
        //   value: '',
        // },
        // {
        //   name: 'Martial Status',
        //   rules: ['required'],
        //   value: '',
        // },
        // {
        //   name: 'Occupation',
        //   rules: ['required'],
        //   value: '',
        // },
        // {
        //   name: 'Religion',
        //   rules: ['required'],
        //   type: 'select',
        //   options: ['Christianity', 'Islam'],
        //   value: '',
        // },
        // {
        //   name: 'Nationality',
        //   rules: ['required'],
        //   value: '',
        // },
        // {
        //   name: 'State of Origin',
        //   rules: ['required'],
        //   value: '',
        // },
        // {
        //   name: 'Lga',
        //   rules: ['required'],
        //   value: '',
        // },
        // {
        //   name: 'Identification Type',
        //   rules: ['required'],
        //   type: 'select',
        //   options: [
        //     'Service No',
        //     'Driving License',
        //     'Employee Id',
        //     'Passport, Visa No',
        //   ],
        //   value: null,
        // },
        // {
        //   name: 'Identification Number',
        //   rules: ['required'],
        //   value: '',
        // },
        // {
        //   name: 'ID Validity',
        //   rules: ['required'],
        //   type: 'date',
        //   value: '',
        // },
      ],
    }
  },

   async mounted() {
    try {
      // const { results } = await this.$api.core.country({ size: 1000 })
      // this.$refs.formGen.setOptions('nationality', results)
      const { results: genders } = await this.$api.core.gender({ size: 1000 })
      this.$refs.formGen.setOptions('gender', genders)
      const { results: mStatus } = await this.$api.core.martialStatus({
        size: 1000,
      })
      this.$refs.formGen.setOptions('marital_status', mStatus)
      // const { results: religion } = await this.$api.core.religion({
      //   size: 1000,
      // })
      // this.$refs.formGen.setOptions('religion', religion)

      const { results: salutation } = await this.$api.core.salutation({
        size: 1000,
      })
      this.$refs.formGen.setOptions('salutation', salutation)
    } catch (error) {
      console.log(error)
    }
  },
  created() {
    this.formConfigData = this.formConfig.map((item) => ({
      ...item,
      value: item.type === 'select' ? null : '',
    }))
  },
  methods: {
    async getData() {
      if (await this.$refs.form.validate()) {
        const result = this.formConfigData.map((item) => ({
          name: item.name,
          value: item.value,
          key: item.key,
        }))
        return result
      }
    },
    setOptions(key, options) {
      this.formConfigData.find((item) => item.key === key).options = options
    },
  },
}
</script>

<style lang="scss" scoped>
</style>