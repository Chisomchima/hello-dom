<template>
    <ValidationObserver ref="form">
    
      <form class="p-3 border rounded w-75 m-auto">
        <h4 class="mb-1 text-center">Imaging</h4>
        <div class="row">
          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper
              name="Service Center"
              :rules="['required']"
            >
              <VSelect
                v-model="dataObject.service_center"
                :options="service_centers"
                label="name"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-6 mb-2">
            <ValidationProviderWrapper
              name="Scan"
              :rules="['required']"
            >
              <VSelect
                v-model="dataObject.img_obv"
                :multiple="true"
                :options="observations"
                :reduce="(opt) => opt.id"
                label="name"
              >
              </VSelect>
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-10 mb-2">
            <ValidationProviderWrapper name="stat" :rules="[]">
              <input id="" v-model="dataObject.stat" type="checkbox" name="" />
            </ValidationProviderWrapper>
          </div>

          <div class="col-md-12 mb-2">
            <ValidationProviderWrapper name="Comments" :rules="['']">
              <textarea
                id=""
                v-model="dataObject.comments"
                class="form-control"
                name=""
                cols="30"
                rows="10"
              ></textarea>
            </ValidationProviderWrapper>
          </div>
        </div>
      </form>
    </ValidationObserver>
</template>

<script>
import { debounce } from 'lodash'

export default {
  props: {
    editData: {
      type: Object,
      require: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      uhid: '',
      service_centers: [],
      observations: [],
      dataObject: {
        img_obv: [],
        ordering_physician: '',
        referral_facility: '',
        comments: '',
        service_center: null,
        patient: {},
        stat: false,
      },
    }
  },
  mounted(){
    this.getData()
  },
  computed: {
    name() {
      if (Object.keys(this.dataObject.patient).length > 0) {
        return (
          this.dataObject.patient.salutation +
          ' ' +
          this.dataObject.patient.firstname +
          ' ' +
          this.dataObject.patient.lastname
        )
      }
      return ''
    },
    gender() {
      if (this.dataObject.patient) {
        return this.dataObject.patient.gender
      }
      return ''
    },

    dob() {
      if (this.dataObject.patient) {
        return this.dataObject.patient.date_of_birth
      }
      return ''
    },

    email() {
      if (this.dataObject.patient) {
        return this.dataObject.patient.email
      }
      return ''
    },
  },
  watch: {
    editData: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.dataObject = newVal
        }
      },
      immediate: true,
      deep: true,
    },

    uhid: debounce(async function (newVal) {
      const results = await this.getPatientByUHID(newVal)
      if(results){
          this.dataObject.patient = results;
      }else{
         this.dataObject.patient = {};
      }

    
    }, 500),
  },
  methods: {
    async ok() {
      if (await this.$refs.form.validate()) {
        if (this.dataObject.id) {
          this.edit()
        } else {
          this.save()
        }
      }
    },
    async save() {
      try {
        const data = await this.$api.imaging.saveOrder(this.dataObject)
        this.$emit('refresh')
        this.$bvModal.hide('modal')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async edit() {
      try {
        const data = await this.$api.imaging.editLabUnit(
          this.dataObject.id,
          this.dataObject
        )
        this.$emit('refresh')
        this.$bvModal.hide('modal')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    clear() {
      this.dataObject = {
        patient: {},
        name: '',
        order_no: '',
      }
      this.$emit('hide')
    },
    getData() {
      this.getServiceCenter()
      this.getObservation()
    },
    getServiceCenter() {
      this.$api.imaging
        .getServiceCenter({ size: 1000 })
        .then((res) => {
          this.service_centers = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },

    getObservation() {
      this.$api.imaging
        .getObservation({ size: 1000 })
        .then((res) => {
          this.observations = res.results
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped>

</style>