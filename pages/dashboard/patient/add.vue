<template>
  <div>
    <DashboardStepWrapper
      ref="stepWrapper"
      :steps="['Personal Detail', 'Home Addresses', 'Payer Information']"
      @pageChange="checkPage($event)"
    >
      <template #default="{ currentStep }">
        <transition name="fade">
          <DashboardPatientRegistrationStepOne
            v-show="currentStep === 0"
            ref="stepOne"
          />
        </transition>
        <transition name="fade">
          <DashboardPatientRegistrationStepTwo
            v-show="currentStep === 1"
            ref="stepTwo"
          />
        </transition>
      </template>
    </DashboardStepWrapper>
  </div>
</template>

<script>
import { mapValues, invert, map } from 'lodash'
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {
    async checkPage({ _next, prev }) {
      if (prev === 0) {
        const data = await this.$refs.stepOne.submit()
        const results = map(data, function (value) {
          return { key: value.key, value: value.value }
        })
        console.log(results)
        if (data === undefined) {
          this.$refs.stepWrapper.goto(prev)
        }
      }
    },
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>