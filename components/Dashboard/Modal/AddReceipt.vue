<template>
  <ModalWrapper
    id="id"
    size="lg"
    submitTitle="Select"
    title="View More Products"
    :stacking="false"
    @show="getData()"
    @hide="$bvModal.hide('id')"
    @ok="ok()"
  >
    <div class="container mt-3 mb-5">
      <b-row class="mb-3">
        <b-col md="3">
          <b-form-input
            id="filterInput"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-table
            striped
            hover
            outlined
            :items="products"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
          >
            <template #cell(select)="data">
              <!-- <pre>{{ data }}</pre> -->
              <b-form-checkbox
                :disabled="enabled"
                @change="selection(data.item.id, $event, data.item.name)"
              >
              </b-form-checkbox>
              <!-- <pre>{{ checked }}</pre> -->
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            align="right"
            pills
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>

      <!-- <b-row>
        <b-col>
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
            variant="primary"
          ></b-spinner>
        </b-col>
      </b-row> -->
    </div>

    <div
      v-if="isLoading"
      class="d-flex align-items-center justify-content-center mt-3"
    ></div>
  </ModalWrapper>
</template>

<script>
export default {
  props: {
    search: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      products: [],
      prodId: '',
      productName: '',
      enabled: false,
      checked: false,
      value: null,
      isLoading: false,
      filter: '',
      perPage: 7,
      currentPage: 1,

      fields: [
        {
          key: 'name',
          label: 'name',
        },
        {
          key: 'generic_drug.name',
          label: 'Generic Drug',
        },
        {
          key: 'select',
          label: 'select',
        },
      ],
    }
  },
  computed: {
    rows() {
      return this.products.length
    },
  },
  async mounted() {
    await this.getData()
  },
  methods: {
    ok() {
      const obj = {
        name: this.productName,
        id: this.prodId
      }
      // if (await this.$refs.form.validate()) {
      this.$emit('getId', obj)
      this.$bvModal.hide('id')
      // }
    },
    selection(id, check, name) {
      if (check) {
        this.checked = check
        this.prodId = id
        this.productName = name
        // this.enabled = true
      }
    },

    closeModal() {
      this.$bvModal.hide('id')
    },

    async getData() {
      this.isLoading = true
      try {
        const { results } = await this.$api.inventory.getProducts({
          search: this.search,
        })
        this.products = results
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        console.log(err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
textarea.form-control {
  min-height: 50px;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.float {
  position: relative;
  top: -3px;
  right: -17px;
}

.shrink {
  height: 2px;
}
.search-options {
  width: 100%;
  height: auto;
}

.option {
  color: grey;
}
.option:hover {
  cursor: pointer;
  background-color: rgb(227, 243, 238);
}
.view-more {
  color: rgb(102, 102, 203);
  margin-top: 20px;
  text-decoration: underline;
  cursor: pointer;
}
</style>
