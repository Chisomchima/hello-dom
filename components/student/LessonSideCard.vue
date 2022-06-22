<template>
  <div class="pr-4">
    <div class="my-3">
      <div
        style="cursor: pointer"
        class="d-flex align-items-center gencolor"
        @click="$emit('collapse-side-bar')"
      >
        <p class="mb-0">Collapse</p>
        <b-icon
          font-scale="1"
          icon="chevron-double-right"
          class="mx-1"
        ></b-icon>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-header d-flex align-items-center">
        <span>
          {{ title }}
        </span>
      </div>
      <ul class="list-group list-group-flush">
        <template v-if="busy">
          <li
            v-for="n in 3"
            :key="n"
            class="
              list-group-item
              d-flex
              align-items-center
              list-card-item-hover
              pointer
            "
          >
            <b-skeleton class="w-100" type="input"></b-skeleton></li
        ></template>

        <template v-else>
          <li
            v-for="(item, index) in items"
            :key="index"
            class="
              list-group-item
              d-flex
              align-items-center
              list-card-item-hover
            "
            :class="[
              item.content_index === Number($route.query.content_index)
                ? 'list-card-item'
                : '',
            ]"
            @click="$emit('item-click', item)"
          >
            <span
              v-if="
                selectedLesson != 'start' &&
                selectedLesson == item.content_index
              "
              class="pr-2"
            >
              <b-icon
                font-scale="1"
                icon="play-circle-fill"
                class="mx-1 gencolor"
              ></b-icon>
            </span>

            <span v-if="item.completed" class="text-success pr-2">
              <span
                class="iconify"
                data-icon="akar-icons:circle-check-fill"
              ></span
            ></span>

            <Icon
              class="mr-lg-3 fa-2x nav-item-icon d-md-block"
              :icon="formatType(item.type)"
            />
            <span :class="[item.completed ? 'visited-color' : '']">{{
              item.title
            }}</span>
          </li>
        </template>

        <!-- <li class="list-group-item">Dapibus ac facilisis in</li>
      <li class="list-group-item">Vestibulum at eros</li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: 'Lesson Content',
    },
    items: {
      type: Array,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
    busy: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatType(type) {
      console.log(type)
      if (['free_text', 'articles'].includes(type)) {
        return 'ant-design:file-text-outlined'
      }
      if (['video'].includes(type)) {
        return 'vscode-icons:file-type-video'
      }
      if (['youtube', 'youtube_embed'].includes(type)) {
        return 'openmoji:youtube'
      }
      if (['images', 'image'].includes(type)) {
        return 'vscode-icons:file-type-image'
      }
      if (['spreadsheets', 'spreadsheet'].includes(type)) {
        return 'vscode-icons:file-type-excel2'
      }
      if (['documents', 'word_document'].includes(type)) {
        return 'vscode-icons:file-type-word'
      }
      if (['pdf'].includes(type)) {
        return 'ant-design:file-pdf-filled'
      }
      if (['slide_show', 'powerpoint'].includes(type)) {
        return 'vscode-icons:file-type-powerpoint2'
      }
    },
  },

  computed: {
    selectedLesson() {
      const word = 'start'
      if (this.$route.path.includes(word)) {
        return this.$route.query.content_index
      }
      return word
    },
  },

  mounted() {
    console.log('inner route', this.$route.query)
  },
}
</script>

<style scoped>
.info-card-header:first-child {
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}

.info-card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.info-card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  color: #0b4870;
  background-color: #fcfeff;
  font-weight: bold;
}

.info-card-body {
  flex: 1 1 auto;
  padding: 1.25rem;
}

.list-card-item {
  background-color: #dbeaf4;
  color: #1070b7;
}
.list-card-item-hover:hover {
  background-color: #dbeaf4 !important;
  color: #1070b7 !important;
}

.visited-color {
  color: #1070b7 !important;
}

.gencolor {
  color: #1070b7 !important;
}
</style>
