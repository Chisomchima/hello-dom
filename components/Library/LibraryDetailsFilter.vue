<template>
  <div>
    <div class="library-selector-item-wrapper row mt-2 mx-2">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="col library-selector-item"
        @click="$emit('filter', option.event)"
      >
        <a href="#" class="btn">
          <div class="line-height-1">
            <Icon :icon="option.icon" class="icon mb-1 mr-2" />
          </div>
          {{ option.text }}
        </a>
      </div>
      <span> Group By</span>
      <b-form-select
        class="mb-3 mt-3 ml-2"
        style="width: 7rem"
        @input="$emit('filter', $event)"
      >
        <!-- This slot appears above the options from 'options' prop -->
        <template #first>
          <b-form-select-option :value="null" disabled
            >-- Please select an option --</b-form-select-option
          >
        </template>

        <!-- These options will appear after the ones from 'options' prop -->
        <b-form-select-option value="subject">Subject</b-form-select-option>
        <b-form-select-option value="format">Format</b-form-select-option>
      </b-form-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          text: 'All Books',
          icon: 'fluent:library-28-filled',
          event: 'all',
        },
        {
          text: 'Class Library',
          icon: 'healthicons:i-training-class',
          event: 'class',
        },
        {
          text: 'Favourites',
          icon: 'bi:bookmark-star-fill',
          event: 'favourite',
        },
      ],
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
