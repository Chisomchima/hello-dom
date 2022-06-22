<template>
  <div class="rounded">
    <div class="mt-2 bg-white table_container px-auto table-responsive">
      <b-table
        ref="selectableTable"
        striped
        :fixed="fixed"
        hover
        responsive
        :fields="fields"
        show-empty
        :items="items"
        :busy="isBusy"
        class="custom-table"
        :filter="filter"
        sort-icon-left
        table-class="custom-table pointer my-table-class"
        tbody-class=""
        details-td-class="my-table-class"
        tbody-tr-class="my-table-class"
        :filter-included-fields="filterOn"
        :sort-desc.sync="sortDesc"
        selectable
        no-select-on-click
        @row-clicked="$emit('row-clicked', $event)"
        @row-selected="onRowSelected"
        @filtered="onFiltered"
      >
        <template #table-colgroup="scope">
          <template v-for="field in scope.fields">
            <col
              v-if="field.key === 'email'"
              :key="field.key"
              :style="{ width: '15rem' }"
            />
            <col
              v-else-if="field.key === 'house_color'"
              :key="field.key"
              :style="{ width: '8rem' }"
            />
            <col
              v-else-if="field.key === 'DOB'"
              :key="field.key"
              :style="{ width: '9rem' }"
            />
            <col
              v-else-if="field.key === 'status'"
              :key="field.key"
              :style="{ width: '7rem' }"
            />
            <col
              v-else-if="field.key === 'connected'"
              :key="field.key"
              :style="{ width: '10rem' }"
            />
            <col
              v-else-if="field.key === 'grade_books'"
              :key="field.key"
              :style="{ width: '5rem' }"
            />
            <col
              v-else-if="field.key === 'excercises'"
              :key="field.key"
              :style="{ width: '6rem' }"
            />
            <col
              v-else-if="field.key === 'lesson_count'"
              :key="field.key"
              :style="{ width: '3rem' }"
            />
            <col v-else :key="field.key" :style="{ width: '' }" />
          </template>
        </template>

        <template #head(check)="row">
          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <div class="shift-left">
            <b-form-checkbox
              ref="tableCheckBox"
              v-model="row.detailsShowing"
              @change="selectAllRows"
              @click="selectAllRows"
            >
            </b-form-checkbox>
          </div>
        </template>
        <template #cell(house_color)="data">
          <div
            v-if="data.value"
            class="text-center"
            :style="{
              borderColor: data.value,
              color: data.value,
              border: '1px solid',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.3rem',
            }"
          >
            {{ data.item.house | wrapHouse }}
          </div>
        </template>
        <template #cell(status)="data">
          <div
            v-if="data.value === true"
            class="text-center text-success"
            :style="{
              border: '1px solid',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.3rem',
            }"
          >
            Linked
          </div>
          <div
            v-else
            class="text-center"
            :style="{
              border: '1px solid',
              padding: '0.25rem 0.4rem',
              borderRadius: '0.3rem',
            }"
          >
            Not linked
          </div> </template
        ><template #cell(stats)="data">
          <div
            class="text-capitalize"
            :class="
              data.value === 'marked'
                ? 'text-success'
                : data.value === 'started'
                ? 'text-warning'
                : data.value === 'submitted'
                ? 'text-info'
                : 'text-danger'
            "
          >
            {{ data.value }}
          </div> </template
        ><template #cell(attempt)="data">
          <div
            :class="data.value === 'View Attempt' ? 'text-primary' : ''"
            :style="{
              cursor: data.value === 'View Attempt' ? 'pointer' : '',
            }"
            @click="$emit('attempt', data.item)"
          >
            {{ data.value }}
          </div>
        </template>
        <template #cell(created_at)="data">
          <div>{{ data.value.slice(0, 11) }}</div>
        </template>

        <template #cell(substitute_teacher)="data">
          <template v-for="(teacher, index) in data.value">
            <div :key="index">
              {{ teacher.teacher_name }}<span v-if="data.value.length > 1">,</span>
            </div>
          </template>
        </template>
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(relationship)="row">
          <div class="text-capitalize">
            {{ row.value }}
          </div>
        </template>

        <template #cell(substitute_teacher )="data">
          <div>{{ data.value }}sss</div>
        </template>

        <template #head(three_dots)="data">
          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <div></div>
        </template>
        <template #cell(email)="data">
          <slot name="email" :data="data">
            <span class=""> {{ data.value | wrapEmail }} </span>
          </slot>
        </template>
        <template #cell(three_dots)="data">
          <div>
            <b-dropdown
              size="lg"
              variant="link"
              menu-class="w-25 customdots"
              class="cutom2"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template #button-content>
                <span class="iconify" data-icon="bi:three-dots-vertical"></span>
              </template>
              <b-dropdown-item href="#" @click="edit(data)">Edit</b-dropdown-item>
              <!-- <b-dropdown-item href="#" @click="remove(data)">
                <span class="text-danger"> Delete </span>
              </b-dropdown-item> -->
            </b-dropdown>
          </div>
        </template>
        <template #head(triple_dots)="data"> <div></div> </template>>
        <template #cell(triple_dots)="data">
          <div>
            <b-dropdown
              size="lg"
              variant="link"
              menu-class=""
              class="cutom2"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template #button-content>
                <span class="iconify" data-icon="bi:three-dots-vertical"></span>
              </template>
              <template v-for="(item, index) in data.value">
                <b-dropdown-item
                  :key="index"
                  href="#"
                  class=""
                  @click="$emit(item.event, data.item)"
                  >{{ item.name }}</b-dropdown-item
                >
              </template>
            </b-dropdown>
          </div>
          <!-- <div @click="handleDots(data)">
            <span class="iconify" data-icon="bi:three-dots-vertical"></span>
          </div> -->
          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        </template>
        <template #cell(id)>
          <div></div>
        </template>
        <template #head(id)>
          <div></div>
        </template>
        <template #cell(theme)="data">
          <div
            class="rounded-circle"
            style="height: 25px; width: 25px"
            :style="{ backgroundColor: data.value }"
          ></div>
        </template>
        <template #cell()="data">
          <div class="border-primary singular" @click="redirect(data)">
            {{ data.value }}
          </div>
        </template>

        <!-- get all cells -->
        <template v-for="(item, index) in fields" v-slot:[`cell(${item.key})`]="data">
          <span :key="index">
            <slot :name="item.key" :data="data"> {{ data.value }} </slot>
          </span>
        </template>
        <template v-slot:[`head(error_message)`]="data">
          <slot name="error_message_head" :data="data">{{ data.label }}</slot>
        </template>
        <template v-slot:[`head(email)`]="data">
          <slot name="emailHeader" :data="data">
            <span>
              {{ data.label }}
            </span>
          </slot>
        </template>
        <template #cell(gender)="data">
          <slot name="gender" :data="data">
            <span class="border-primary singular text-capitalize">
              {{ data.value }}
            </span>
          </slot>
        </template>
        <template #cell(middle_name)="data">
          <slot name="middle_name" :data="data">
            <span class="border-primary singular text-capitalize">
              {{ data.value }}
            </span>
          </slot>
        </template>
        <template #cell(role)="data">
          <div class="border-primary singular text-capitalize">
            {{ data.value }}
          </div>
        </template>
        <template #head(extra_icons)>
          <div></div>
        </template>
        <template #cell(extra_icons)="data">
          <div class="d-flex justify-content-end">
            <div class="pr-2">
              <span class="mx-2" @click="iconDelete(data)">
                <span class="iconify text-danger" data-icon="mi:delete"></span>
              </span>
              <span class="mx-2">
                <span class="iconify" data-icon="ant-design:edit-twotone"></span>
              </span>
              <a id="a1" download="file1.png" @click="iconDownload(data)">
                <span class="iconify" data-icon="feather:download"></span>
              </a>
            </div>
          </div>
        </template>
        <template #head(image)="">
          <div></div>
        </template>

        <template #cell(primary_contact)="data">
          <div class="m-0">
            <span v-if="data.value == true" class="text-primary"> Emergency</span>
          </div>
        </template>
        <template #cell(connected)="data">
          <div class="m-0" :style="{ position: 'relative', right: '1rem' }">
            <span
              v-if="data.value == true"
              class="border border-primary rounded p-1 text-primary"
            >
              connected</span
            >
            <span v-else class="border rounded border-primary p-2">
              {{ $route.params.id }}-{{ data.item.activation_code }}</span
            >
          </div>
        </template>
      </b-table>
    </div>
    <div v-show="showPagination" class="mt-3">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        align="right"
        size="sm"
        class="my-0"
        @input="pageNumber"
        @change="$emit('page-changed', $event)"
      ></b-pagination>
      <!-- {{selected}} -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    perPage: {
      type: Number,
      default: 12,
    },
    isBusy: {
      type: Boolean,
      required: false,
      default: false,
    },
    showPagination: {
      type: Boolean,
      required: false,
      default: true,
    },
    fields: {
      type: Array,
      required: false,
      default: () => [],
    },

    sortDirection: {
      type: String,
      required: false,
      default: "asc",
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
    filterOn: {
      type: Array,
      required: false,
      default: () => [],
    },
    filter: {
      type: String,
      required: false,
      default: null,
    },
    allowRedirect: {
      type: Boolean,
      required: false,
      default: false,
    },
    pages: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentPage: 1,
      totalRows: 0,
      allSelected: false,
      selected: [],
      sortDesc: false,
    };
  },
  computed: {},
  watch: {
    pages() {
      this.totalRows = this.perPage * this.pages;
    },
  },
  mounted() {
    this.totalRows = this.perPage * this.pages;
  },

  methods: {
    edit(e) {
      this.$emit("edit", e);
      
    },
    remove(e) {
      this.$emit("remove", e.item);
      
    },
    iconDelete(e) {
      this.$emit("iconDelete", e.item);
    },
    async iconDownload(e) {

      try {
        const response = await axios.get(e.item.url, { responseType: "blob" });
        const blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${e.item.file_name}${e.item.format}`;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (e) {
        console.error(e);
      }
    },
    pageNumber(e) {
      this.$emit("pageChange", e);
      console.log(e);
    },
    handleDots(data) {
      console.log(data);
    },
    redirect(e) {
      if (this.allowRedirect === true) {
        alert("sss");
        this.$router.push(`${e.item.route}/${e.item.id}`);
      }
    },
    onRowSelected(items) {
      this.$emit("single-row", items);
      this.selected = items;
    },
    selectAllRows() {
      if (this.allSelected) {
        this.$refs.selectableTable.clearSelected();
        this.allSelected = !this.allSelected;
        setTimeout(() => {
          this.$emit("allSelected", this.selected);
        }, 100);
      } else {
        this.$refs.selectableTable.selectAllRows();
        this.allSelected = !this.allSelected;
        setTimeout(() => {
          this.$emit("allSelected", this.selected);
        }, 100);
      }
    },
    toggleSingleRow(i) {
      this.$emit("single-row-selected", i);
      if (i.rowSelected === true) {
        setTimeout(() => {
          this.$refs.selectableTable.unselectRow(i.index);
        }, 100);
      } else if (i.rowSelected === false) {
        setTimeout(() => {
          this.$refs.selectableTable.selectRow(i.index);
        }, 100);
      }

      // Rows are indexed from 0, so the third row is index 2
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style scoped>
.iconify:hover {
  cursor: pointer;
}
.table_container {
  border-radius: 10px;
  background-color: white;
  padding: 0px 10px 5px 20px;
}
.singular:hover {
  cursor: pointer;
}
.cutom2 .dropdown-menu {
  min-width: 5rem !important;
}

.doWrap {
  max-width: 50%;
  word-wrap: break-word;
}
.minimum {
  max-width: 30px;
}
.widd {
  width: 7rem !important;
}
.my-table-class td div {
  padding-left: 0.75rem !important;
}
/* .shift-left {
  position: relative;
  right: 0.4rem;
} */
</style>
