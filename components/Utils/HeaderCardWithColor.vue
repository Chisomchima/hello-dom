<template>
  <div
    class="card class-details-card dark-bg-card mb-3"
    :style="{ backgroundColor: bgColor }"
  >
    <div class="card-body" style="color: purple !important">
      <div class="d-flex align-content-center align-items-center">
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
            <div
              class="class-name mr-1 text-capitalize"
              :style="{ color: `${color} !important` }"
            >
              {{ title }}
            </div>
          </div>
          <hr class="my-0" :style="{ borderColor: `${color} !important` }" />
          <div class="mt-3">
            <div class="row">
              <div
                v-for="(value, name) in filterData"
                :key="value + name"
                class="col-md-4 mb-2 text-capitalize"
              >
                <span
                  class="class-details-data_label"
                  :style="{ color: `${color} !important` }"
                  ><slot :name="`${name}-label`">
                    {{ name.split('_').join(' ') }}:</slot
                  ></span
                >
                <span
                  v-if="typeof value != 'object'"
                  class="class-details-data_value"
                  :style="{ color: `${color} !important` }"
                  ><slot :name="name" :value="value">{{ value }}</slot></span
                >
                <template v-else>
                  <span
                    v-for="(val, index) in value"
                    :key="index"
                    class="class-details-data_value"
                    :style="{ color: `${color} !important` }"
                    ><slot :name="name" :value="val">{{ val }}</slot></span
                  >
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="ml-4 text-center">
          <div v-if="!disableAction" class="actions-dropdown">
            <div class="dropdown">
              <button
                id="dropdownMenuButton"
                class="btn btn-sm px-0 dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                :style="{ color: `${color} !important` }"
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
                <!-- <a
                  v-for="(action, index) in actions"
                  :key="index"
                  class="dropdown-item text-capitalize"
                  href="#"
                  @click.prevent="$emit(action)"
                  >{{ action.split('_').join(' ') }}</a
                > -->
                <a
                  class="dropdown-item text-danger"
                  href="#"
                  @click.prevent="$emit('delete')"
                  >Delete</a
                >
              </div>
            </div>
          </div>
          <template v-if="enableImage">
            <img
              v-if="imgSrc.length > 0"
              :src="imgSrc"
              class="card-flexed-img"
            />
            <img v-else :src="imgSrcBase64" v class="card-flexed-img" />
          </template>

          <!-- <span :style="{ color: 'black !important' }"> {{ status }} </span> -->

          <template v-if="published">
            <div>
              <p v-if="published === 'open'">
                <span class="class-details-data_value"
                  ><span class="badge blue-badge bg-grayish-blue"
                    >Published</span
                  ></span
                >
              </p>
              <p v-else>
                <span class="class-details-data_value"
                  ><span class="badge red-badge bg-grayish-blue"
                    >Draft</span
                  ></span
                >
              </p>
            </div>
          </template>

          <slot name="approval"></slot>
        </div>
      </div>
      <template v-if="tinysubjecttitle">
        <div class="d-flex justify-content-end">
          <p>
            <span class="class-details-data_value"
              ><span
                class="badge blue-badge"
                :style="{
                  color: `${color} !important`,
                  border: ` 1px solid ${color} !important`,
                }"
                >{{ tinysubjecttitle }}</span
              ></span
            >
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { pick } from 'lodash'
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    imgSrcBase64: {
      type: String,
      default: '',
    },
    published: {
      type: String,
      required: false,
      default: '',
    },
    tinysubjecttitle: {
      type: String,
      required: false,
      default: '',
    },
    enableAction: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    displayKey: {
      type: Array as PropType<string[]>,
      required: true,
    },
    enableImage: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16)
        return `#${randomColor}`
      },
    },
    color: {
      type: String,
      default: '#ffffff',
    },
    imgSrc: {
      type: String,
      default: () => {
        return require('@/assets/img/subject-imgs/brain.svg')
      },
    },
    actions: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    disableAction: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    filterData(): Object {
      return pick(this.data, this.displayKey)
    },
  },
})
</script>

<style lang="scss" scoped></style>
