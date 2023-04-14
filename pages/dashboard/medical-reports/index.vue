<template>
  <div>
    <div class="row">
      <div class="col-12 mb-2">
        <div class="d-flex justify-content-between align-items-center">
          <div class="page-heading mb-0">Medical Reports</div>
          <div>
            <BaseButton
              class="btn-primary btn-lg"
              @click="$bvModal.show('Add-encounter')"
              >New Medical Report</BaseButton
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mb-4">
        <div class="card">
          <div class="card-body">
            <DashboardMedicalReportsMedicalReportFilter/>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <UtilsFilterComponent
          disable-pagination
          :disable-visualization="true"
          search-placeholder="Search"
        >
          <TableComponent
            :fields="fields"
            :pages="pages"
            :items="items"
            :busy="busy"
            :dropdown-item="['nurse_vital']"
            @nurse_vital="addVitals($event)"
            @page-changed="filter($event, currentFilter)"
            @row-clicked="viewPatientData"
          >
          </TableComponent>
        </UtilsFilterComponent>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
