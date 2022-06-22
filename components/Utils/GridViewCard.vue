<template>
    <div class="classes-list-card px-4">
      
      <div class="title-text mb-1">{{data[displayKey[0]]}}</div>
      <div class="subtitle-text mb-3">{{data[displayKey[1]]}}</div>

      <!-- <div class="date-text mb-1">status</div>
          <div class="name-text mb-4"><span class="badge badge-secondary">{{value.active ? 'Active',}}</span>{{value.active}}</div> -->

      <div class="d-flex align-items-baseline justify-content-between">
        <div>
          <div class="subval-text mb-1 text-capitalize">{{displayKey[2].split('_').join(" ")}}</div>
          <div class="subval-val">{{data[displayKey[2]]}}</div>
        </div>
        <div>
          <div class="subval-text mb-1 text-capitalize">{{displayKey[3].split('_').join(" ")}}</div>
          <div class="subval-val">{{data[displayKey[3]]}}</div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    data: {
      type: Object,
      required: true
    },
    displayKey: {
      type: Array as PropType<string[]>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped></style>
