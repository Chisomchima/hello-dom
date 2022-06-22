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
        <strong class="fs-14 px-2">Sync Behavioral</strong>
      </BaseButton>
    </div>

    <template v-for="(item, index) in localItem">
      <div
        v-if="item.type === 'options'"
        :key="index"
        class="row align-items-center mb-4"
      >
        <div class="col-xl-2 col-lg-12 col-md-2 mb-2 mb-md-0 mb-lg-2 mb-xl-0">
          <div class="text-dark text-capitalize fs-16">{{ item.name }}</div>
        </div>
        <div class="col-xl-7 col-lg-10 col-md-7 col-sm-10 col-9">
          <select v-model="localItem[index].value" class="text-capitalize form-control">
            <option
              v-for="(option, index2) in item.options"
              :key="index2"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <div v-if="item.type === 'range'" :key="index" class="row align-items-center mb-4">
        <div class="col-xl-2 col-lg-12 col-md-2 mb-2 mb-md-0 mb-lg-2 mb-xl-0">
          <div class="text-dark text-capitalize fs-16">{{ item.name }}</div>
        </div>
        <div class="col-xl-7 col-lg-10 col-md-7 col-sm-10 col-9">
          <input
            v-model="localItem[index].value"
            type="range"
            :min="item.range ? item.range.min : '0'"
            :max="item.range ? item.range.max : '100'"
            class="slider form-control-range"
          />
        </div>
        <div class="col-sm-2 col-3">
          <div
            class="px-2 py-2 bg-grayish-variant-1 rounded font-family_brown fs-16 d-inline"
          >
            {{ localItem[index].value }}/{{ item.range ? item.range.max : "100" }}
          </div>
        </div>
      </div>
      <div
        v-if="item.type === 'comment'"
        :key="index"
        class="row align-items-center mb-4"
      >
        <div class="col-xl-2 col-lg-12 col-md-2 mb-2 mb-md-0 mb-lg-2 mb-xl-0">
          <div class="text-dark text-capitalize fs-16">{{ item.name }}</div>
        </div>
        <div class="col-xl-7 col-lg-10 col-md-7 col-sm-10 col-9">
          <textarea v-model="localItem[index].value" class="form-control" />
        </div>
      </div>
    </template>
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
