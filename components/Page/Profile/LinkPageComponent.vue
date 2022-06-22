<template>
  <div class="container vh-95">
    <template v-if="data.length <= 0">
      <PageProfileNoLinkData :entity="entity">
        <BaseButton @click="showLinkModal()">+ Link School</BaseButton>
      </PageProfileNoLinkData>
    </template>
    <template v-else>
      <div class="row">
        <div class="col my-4">
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="text-capitalize recordtext mb-0">{{ entity }} Record</h4>

            <div v-if="data.length > 0">
              <BaseButton @click="showLinkModal()">+ Link School</BaseButton>
            </div>
          </div>
        </div>
      </div>
      <slot name="card">
        <div v-if="data.length > 0" class="row">
          <div
            v-for="(school, index) in data"
            :key="index"
            class="col-md-6 my-3 my-md-0"
          >
            <PageProfileLinkStudentCard
              :details="school"
              :display="displayDetailsKey"
              @click="log(school)"
            ></PageProfileLinkStudentCard>
          </div>
        </div>
        <div
          v-else-if="data.length < 0"
          class="d-flex align-items-center justify-content-center vh-95"
        >
          <BaseButton @click="showLinkModal()">+ Link School</BaseButton>
        </div>
      </slot>
    </template>
    <PageProfileLinkModal
      @button:click="link({ entity, schoolCode, linkCode })"
    >
      <template #title>
        <h6 class="font-weight-bold mb-1">Link {{ entity }} to school.</h6>
        <p class="subtext">
          Enter the link to join your
          <span v-if="entity == 'parent'" class="subtext">child's</span> school

          <b-icon
            v-b-tooltip.hover.top="
              'Make sure to take note of the case sensitivity and syntax'
            "
            icon="info-circle"
            class="ml-2 text-dark"
          ></b-icon>
        </p>
      </template>

      <template #input1>
        <div class="d-flex justify-content-center">
          <ValidationProviderWrapper :rules="['required']" :name="``">
            <input
              ref="schoolcodecontent"
              v-model="enteredCode"
              class="form-control ng-valid ng-dirty ng-touched placeholder"
              name="confirm"
              placeholder="e.g SVAA-fdkfo2"
              type="text"
              @keyup="movetonextfield()"
            />
          </ValidationProviderWrapper>
        </div>
      </template>
      <!-- <template #input2>
        <div class="d-flex justify-content-center pb-3">
          <ValidationProviderWrapper :rules="['required']" :name="``">
            <input
              ref="studentcodecontent"
              v-model="linkCode"
              class="form-control ng-valid ng-dirty ng-touched placeholder"
              name="confirm"
              type="text"
            />
          </ValidationProviderWrapper>
        </div>
      </template> -->
    </PageProfileLinkModal>
  </div>
</template>

<script>
//import Vue, { PropType } from "vue";

export default {
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    entity: {
      type: String,
      required: true,
    },
    displayDetailsKey: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      test: 'value',
      schoolCode: '',
      linkCode: '',
      enteredCode: '',
    }
  },
  methods: {
    log(school) {
      if (this.entity === 'student') {
        this.$router.push('/student/lms/' + school.school_code + '/dashboard')
      }

      if (this.entity === 'staff') {
        this.$router.push('/sms/' + school.school_code + '/lms/classes')
      }

      // this.$router.push('/profile/' + this.entity + '/' + school.school_code);
      // console.log(school);
    },
    refresh() {
      this.$nuxt.refresh()
    },
    movetonextfield() {
      //  splits the entered code from the input after the dash has been inputed
      // and seperates them into schoolcode and linkcode

      const str = this.enteredCode.replace(/\s+/g, '')
      const [schoolcode, linkcode] = str.split('-')

      this.schoolCode = schoolcode
      this.linkCode = linkcode
    },
    showLinkModal() {
      this.$bvModal.show('b-modal-wrapper')
    },

    async link({ entity, schoolCode, linkCode }) {
      try {
        const { data } = await this.$axios.$post(
          `/util/v2/link/entity/?entity=${entity}`,
          {
            school_code: schoolCode,
            link_code: linkCode,
          }
        )

        this.$toast({
          type: 'success',
          text: `Linking as ${entity} was successful`,
        })
        await this.$nuxt.refresh()

       

        // this.linkToPage(entity, data.school_code)

        this.$bvModal.hide('b-modal-wrapper')

        setTimeout(() => {
          this.$emit('reload-page')
        }, 3000)

        return true
        // this.$router.push(`/sms/${this.schoolCode}/adminstration/student`) } catch (e) {
      } catch (e) {
        console.log(e)
      }
    },

    linkToPage(entity, code) {
      if (entity === 'student') {
        this.$router.push('/student/lms/' + code + '/dashboard')
      }

      if (entity === 'staff') {
        this.$router.push('/sms/' + code + '/lms/classes')
      }
    },
  },
}
</script>

<style scoped>
.recordtext {
  font-size: 20px;
}

.placeholder::placeholder {
  font-size: 14px;
  font-weight: 200;
  color: #000;
  opacity: 0.5;
}

.vh-95 {
  height: 90vh;
}

.subtext {
  font-size: 12px;
  color: #c0c0c0;
}

@media (max-width: 768px) {
  .recordtext {
    font-size: 16px;
  }
}
</style>
