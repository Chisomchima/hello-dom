<template>
  <div class="card shadow" @click="$emit('click')">
    <div class="card-body">
      <div class="align-items-center border-bottom border-light row">
        <div class="col-2">
          <img
            width="50px"
            :src="details.school_image"
            class="img-thumbnail rounded-circle"
            alt=""
          />
        </div>
        <div class="col">
          <p class="mb-0">{{ details.school_name }}</p>
        </div>
      </div>
      <div class="row align-items-center my-2 small">
        <div class="col-3">
          <img
            v-if="details.avatar"
            width="150px"
            :src="details.avatar"
            class="img-thumbnail rounded-circle"
            alt=""
          />

          <img
            v-else
            width="150px"
            src="~/assets/img/empty-box.svg"
            class="img-thumbnail rounded-circle"
            alt=""
          />
        </div>
        <div class="col">
          <div class="align-items-center row">
            <div class="col-12 my-2 p-1">
              <p class="mb-0 font-weight-bold">{{ details[display[0]] }}</p>
            </div>
            <template v-for="(value, name) in filterDetails">
              <template v-if="name != display[0]">
                <div :key="name" class="col p-1">
                  <p class="mb-0 text-uppercase text-light">
                    {{ name.split("_").join(" ") }}<br /><span
                      class="text-capitalize text-primary font-weight-bold"
                      >{{ value }}</span
                    >
                  </p>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { pick } from "lodash";

export default Vue.extend({
  props: {
    details: {
      type: Object,
      required: true,
    },
    display: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  computed: {
    filterDetails(): Object {
      return pick(this.details, this.display);
    },
  },
});
</script>

<style lang="scss" scoped></style>
