<template>
  <div class="row">
    <div class="col-12 mb-3">
      <h5>Patients</h5>
    </div>
    <div class="col-md-8">
      <UtilsFilterComponent
        disablePagination
        :disable-visualization="true"
        search-placeholder="Search"
      >
        <TableComponent
          :fields="fields"
          :pages="pages"
          :items="items"
          :busy="false"
        />
      </UtilsFilterComponent>
    </div>

    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
          <div class="filter-wrapper">
            <div class="mb-2">
              <label class="form-control-label">First Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your full name"
              />
            </div>
            <div class="mb-2">
              <label class="form-control-label">Last Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your full name"
              />
            </div>
            <div class="mb-2">
              <label class="form-control-label">Phone number</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your full name"
              />
            </div>
            <div class="mb-2">
              <label class="form-control-label">D.O.B</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your email address"
              />
            </div>
            <div class="mb-3">
              <label class="form-control-label">Gender</label>
              <VSelect label="Gender" :options="genders"></VSelect>
            </div>

            <div class="mb-2">
              <div class="row">
                <div class="col-6">
                  <BaseButton class="w-100"> Filter </BaseButton>
                </div>
                <div class="col-6">
                  <BaseButton class="w-100 btn-danger"> Cancel </BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun'

export default {
  mixins: [TableFunc],
  data() {
    return {
      genders: ['male', 'female'],
      fields: [
        {
          key: 'first_name',
          label: 'Name',
          sortable: true,
          // width: '20%',
        },
        {
          key: 'last_name',
          sortable: true,
          // width: '20%',
        },
        {
          key: 'age',
          sortable: true,
          // width: '20%',
        },
        {
          key: 'bny',
          label: 'Name',
          sortable: true,
          // width: '20%',
        },
        {
          key: 'bt',
          sortable: true,
          // width: '20%',
        },
        {
          key: 'bs',
          sortable: true,
          // width: '20%',
        },
      ],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: 'Dickerson',
          last_name: 'Macdonald',
        },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
</style>