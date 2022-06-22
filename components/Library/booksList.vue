<template>
  <div>
    <div v-if="enableFilters === 'subject' || enableFilters === 'format'">
      <div
        v-for="(value, propertyName, index) in legionObject"
        :key="index"
        class="mt-4"
      >
        <div class="d-flex align-items-center justify-content-between">
          <div class="fs-18 text-dark font-weight-bold text-uppercase">
            {{
              propertyName
                .replaceAll("'", '')
                .replaceAll('[', '')
                .replaceAll(']', '')
            }}
          </div>
          <!-- <a class="text-primary fs-14 font-weight-bold">View all</a> -->
        </div>
        <div class="scrollmenu">
          <LibraryItem
            v-for="(item, itemIndex) in value"
            :key="itemIndex"
            class="mr-2"
            :book="item"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="mb-4">
        <div class="d-flex align-items-center justify-content-between">
          <div class="fs-18 text-dark font-weight-bold">{{ filterName }}</div>
          <!-- <a class="text-primary fs-14 font-weight-bold">View all</a> -->
        </div>
        <div class="library-list mt-2 d-flex justify-content-start">
          <LibraryItem
            v-for="(book, index) in books"
            :key="index"
            :book="book"
          />
        </div>
        <div class="mt-3 d-flex justify-content-end">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            aria-controls="my-table"
            @change="$emit('pagination-change', $event)"
          ></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groupBy } from 'lodash'
export default {
  props: {
    enableFilters: {
      type: Boolean,
      default: false,
    },
    filterName: {
      type: String,
      default: 'All Books',
    },
    groupName: {
      type: String,
      default: 'format',
    },

    pageSize: {
      type: Number,
      default: 10,
    },
    pages: {
      type: Number,
      default: 1,
    },

    books: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      currentPage: '',
      legionObject: {},
    }
  },
  computed: {
    totalRows() {
      return this.pageSize * this.pages
    },
  },

  watch: {
    enableFilters() {
      console.log(this.groupName)
      this.legionObject = groupBy(this.books, this.groupName)
    },
  },

  methods: {
    scrollToBottom() {
      const objDiv = document.getElementById('allBooks')
      console.log(objDiv.scrollHeight)
      objDiv.scrollTop = 100
    },
    runFilter() {
      console.log('all books', this.books)

      this.legionObject = groupBy(this.books, 'this.groupName')
      console.log('filter', this.legionObject)
    },
  },
}
</script>

<style scoped>
.scrollmenu {
  overflow: auto;
  white-space: nowrap;
}
</style>
