<template>
  <div class="card class-details-card mb-3">
    <div class="card-body">
      <div
        class="d-flex align-items-center justify-content-between flex-wrap mb-3"
      >
        <div class="class-name mr-1 text-capitalize">{{ title }}</div>
        <slot name="actions">
          <div v-if="enableAction" class="actions-dropdown">
            <div class="dropdown">
              <button
                id="dropdownMenuButton"
                class="btn btn-sm px-0 dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Actions
              </button>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenuButton"
              >
                <a class="dropdown-item" href="#" @click.prevent="$emit('edit')"
                  >Edit</a
                >
                <a
                  v-for="(action, index) in actions"
                  :key="index"
                  class="dropdown-item text-capitalize"
                  href="#"
                  @click.prevent="$emit(action)"
                  >{{ action.split('_').join(' ') }}</a
                >
                <a
                  class="dropdown-item text-danger"
                  href="#"
                  @click.prevent="$emit('delete')"
                  >Delete</a
                >
              </div>
            </div>
          </div>
        </slot>
      </div>
      <hr class="my-0" />
      <div class="mt-3">
        <slot>
          <div class="row">
            <div
              v-for="(value, name) in filterData"
              :key="value"
              class="col-sm-12 col-md-12 col-lg-12"
              :class="extraClasses"
            >
              <span class="class-details-data_label text-capitalize"
                >{{ name.split('_').join(' ') }}:</span
              >
              <span
                v-if="typeof value != 'object'"
                class="class-details-data_value"
                ><slot :name="name" :value="value">{{ value }}</slot></span
              >
              <template v-else>
                <span
                  v-for="(val, index) in value"
                  :key="index"
                  class="class-details-data_value"
                  ><slot :name="name" :value="val">{{ val }}</slot></span
                >
              </template>
            </div>
          </div>
        </slot>
     <hr/>
     <div class="col-sm-12 col-md-12 col-lg-12 mt-2 d-flex align-items-center justify-content-end">
              <small class="text-capitalize text-grey mr-1">Last Updated:</small>
              <small class="mr-5">{{ dateUpdated }}</small>
              <small class="text-capitalize text-grey mr-1">Last Updated By:</small>
              <small class="">{{ data.updated_by.username }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DateTime } from 'luxon'
import Vue, { PropType } from 'vue'
import { pick } from 'lodash'
export default Vue.extend({
  props: {
    extraClasses: {
      type: String,
      default: 'col-xl-4',
      // add the col-xl-4 to your prop and then any extra css
    },
    title: {
      type: String,
      required: true,
    },
    enableAction: {
      type: Boolean,
      default: true,
    },
    actions: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    // eslint-disable-next-line vue/require-default-prop
    displayKey: {
      type: Array as PropType<string[]>,
      required: false,
    },
  },
  computed: {
    filterData(): Object {
      return pick(this.data, this.displayKey)
    },
    dateUpdated(){
      return DateTime.fromISO(this.data.updated_at).toFormat('yyyy LLL dd')
    }
  },
  methods: {
    edit() {
      this.$emit('edit')
    },
    deleteIt() {
      this.$emit('delete')
    },
  },
})
</script>

<style lang="scss" scoped>


</style>
