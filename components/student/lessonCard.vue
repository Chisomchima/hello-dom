<template>
  <div class="card-wrapper">
    <div v-if="headerTitle" class="card-header">{{ headerTitle }}</div>
    <div v-if="items.length < 1" class="p-3 text-center text-muted">
      Not available
    </div>
    <template v-else>
      <ul class="list-group list-group-flush">
        <li
          v-for="(item, i) in items"
          :key="i"
           :class="[(i === lessonindex && lessonstartedCom) ? 'list-card-item' :'']"
          class="list-group-item d-flex align-items-center list-card-item-hover"
        >
          <Icon
            class="mr-lg-3 fa-2x nav-item-icon d-md-block"
            :icon="formatType(item.type)"
          />{{ item.title || item.name }}
        </li>
        <!-- <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Vestibulum at eros</li> -->
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
    lessonindex: {
      type: Number,
      required: false,
      default: 0,
    },
    lessonstarted: {
      type: Boolean,
      required: true,
    },
    headerTitle: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    lessonstartedCom() {
      console.log(this.lessonstarted)
      return this.lessonstarted
    },
  },
  methods: {
    checkTopicColor(index) {
      console.log(index, this.lessonindex)
      if (index === this.lessonindex && this.lessonstartedCom) {
        return 'activeTopicColor'
      }
      return 'topicColor'
    },

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
}
</script>

<style scoped>
.topicColor {
  color: #484848;
}
.activeTopicColor {
  color: #1070b7;
}
.topicTypeColor {
  color: #8b9eb0;
}
.card-wrapper {
  background: #fcfeff;
  border: 1px solid #ebedf5;
  box-sizing: border-box;
  margin-bottom: 16px;
  border-radius: 5px;
  font-size: 12px;
}
.card-wrapper:first-child {
  margin-top: 35px;
}
.card-wrapper .card-header {
  color: #0b4870;
  padding-top: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid #ebedf5;
  font-weight: bold;
}
.card-wrapper .card-item {
  width: calc(100% - 40px);
  margin: 0 auto;
  padding: 12px 0;
  padding-left: 36px;
  border-bottom: 1px solid #ebedf5;
}
.card-wrapper .card-item:last-child {
  border-bottom: none;
}
.card-item .title {
  color: #484848;
}
.card-item .tag {
  color: #8b9eb0;
}
.card-item .status {
  color: #1070b7;
}

.list-card-item {
  background-color: #dbeaf4;
  color: #1070b7;
}
.list-card-item-hover:hover {
  background-color: #dbeaf4 !important;
  color: #1070b7 !important;
}
</style>
