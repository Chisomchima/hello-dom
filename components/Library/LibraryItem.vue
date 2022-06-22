<template>
  <div :style="{ display: 'inline-block' }">
    <div
      class="pt-2 pl-2 new-libray-container d-flex align-items-end flex-column rounded text-white"
      :style="{
        position: 'relative',
        backgroundColor: book.thumbnail ? '' : '#6b9abf',

        'background-image': `url('${book.thumbnail}')`,

        'background-repeat': 'no-repeat, repeat',
        'background-size': '10rem 15.2rem',
      }"
      @click="goDetails(book)"
    >
      <div class="ml-auto">
        <VTooltip
          placement="right"
          theme="info-custom"
          :data-popper-shown="true"
          :triggers="['hover']"
          :skidding="-32"
          :arrow-padding="8"
        >
          <button class="info-icon border-0 bg-transparent text-dark">
            <span class="iconify" data-inline="false" data-icon="foundation:info"></span>
          </button>

          <template #popper>
            <div class="">
              <h5>{{ book.name }}</h5>
              <div
                class="mt-auto d-flex justify-content-start"
                :style="{
                  'font-weight': 'normal',
                  'font-size': '0.8rem',
                  'line-height': '150%',
                }"
              >
                by
                {{
                  book.author
                    ? book.author
                        .replaceAll("'", "")
                        .replaceAll("[", "")
                        .replaceAll("]", "")
                    : ""
                }}
              </div>
              <p class="mb-0">Description: {{ book.description }}</p>
              <p class="mb-0">Format: {{ book.format }}</p>
              <p class="mb-0">
                Subject:
                {{
                  book.subjects
                    ? book.subjects
                        .replaceAll("'", "")
                        .replaceAll("[", "")
                        .replaceAll("]", "")
                    : ""
                }}
              </p>
              <p class="mb-0">
                Grades(s):
                {{
                  book.grades
                    ? book.grades
                        .replaceAll("'", "")
                        .replaceAll("[", "")
                        .replaceAll("]", "")
                    : ""
                }}
              </p>
            </div>
          </template>
        </VTooltip>
      </div>
      <div
        v-if="!book.thumbnail"
        class="w-100 d-flex flex-column align-items-start"
        style="height: 11rem"
      >
        <div class="mb-auto">
          <span class="text-dark"> Name: </span>

          <span class="text-truncater-custom">
            {{ book.name }}
          </span>
        </div>
        <div class="">
          <span class="text-dark"> By: </span>

          <span class="text-truncater-custom ml-2">
            {{
              book.author
                ? book.author.replaceAll("'", "").replaceAll("[", "").replaceAll("]", "")
                : "__"
            }}
          </span>
        </div>
      </div>
      <div
        class="px-2 mt-auto text-uppercase"
        :style="{
          position: 'absolute',
          bottom: '0',
          'background-color': 'rgb(229, 135, 77)',
        }"
      >
        {{ book.format.slice(1) }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      popperInstance: () => {},
    };
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    goDetails(e) {
      if (e) {
        console.log(e);
        this.$router.push({
          name: "student-lms-schoolId-library-libraryId",
          params: { schoolId: this.$route.params.schoolId, libraryId: e.id },
          query: { _name: `${e.name}` },
        });
      }
    },
  },
};
</script>

<style>
/* Dont add any style here, its global */
.text-truncater-custom {
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  display: inline-block;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.v-popper--theme-info-custom .v-popper__inner {
  border-radius: 5px;
  color: #d7d7d8;
  padding: 5px;
  background: #161e40 !important;
}
.v-popper--theme-info-custom .v-popper__arrow-container .v-popper__arrow-outer {
  border-color: #161e40 !important;
}
.tooltip-icon-wrapper {
  padding: 0;
  height: 10rem;
  background: blue;
  color: yellow;
  border-radius: 100%;
}
</style>
