<template>
  <div>
    <div v-if="status !== 'approved'" class="text-right mb-3" style="margin-top: -0.5rem">
      <!-- <button class="btn btn-primary py-2 px-3">Save Entry</button> -->
      <BaseButton
        watch-request
        class="btn pointer d-inline-flex align-content-center"
        @click="$emit('sync')"
      >
        <!-- <div class="mr-1 line-height-0">
          <span class="iconify fs-16" data-icon="fa-solid:sync-alt"></span>
        </div> -->
        <strong class="fs-14 px-2">Sync Comments</strong>
      </BaseButton>
    </div>
    <div v-for="(item, index) in localItem" :key="index" class="form-group">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <div class="text-dark text-capitalize fs-16 font-family_brown">
          {{ item.name }}
        </div>
      </div>
      <textarea
        style="background: #fbfdfe"
        placeholder="Enter Comment"
        v-model="item.value"
        class="form-control"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localItem: this.items,
    };
  },
  watch: {
    localItem(newVal) {
      this.$emit("field-input", newVal);
    },
  },
};
</script>

<style lang="scss" scoped></style>
