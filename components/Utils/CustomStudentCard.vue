<template>
  <div
    class="card class-details-card dark-bg-card mb-3"
    :style="{ backgroundColor: white }"
  >
    <div class="card-body">
      <div class="d-flex align-content-center">
        <div class="flex-grow-1">
          <div
            class="
              d-flex
              align-items-center
              justify-content-between
              flex-wrap
              mb-3
            "
          >
            <div class="class-name mr-1">{{ title }}</div>
          </div>
          <hr class="my-0" />
          <div class="mt-3">
            <div class="row">
              <div
                v-for="(value, name) in filterData"
                :key="value"
                class="col-md-4 mb-2 text-capitalize"
              >
                <span class="class-details-data_label"
                  >{{ name.split('_').join(' ') }}:</span
                >
                <span class="class-details-data_value">{{ value }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="ml-4">
          <img
            src="../../assets/img/subject-imgs/brain.svg"
            class="card-flexed-img"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardFunc from '@/mixins/CardFunc'

export default {
  mixins: [CardFunc]
}
</script>

<style lang="scss" scoped></style>
