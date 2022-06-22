<template>
  <div>
    <UtilsFilterComponent @search-input="studentsFilter = $event">
      <template #default="{ visualization }">
        <TableComponent
          v-if="visualization === 'list'"
          :items="students"
          :fields="fields"
          :pages="1"
          :filter="studentsFilter"
        >
          <template #house="{ data }">
            <div class="text-center">
              <span
                class="badge"
                :style="{
                  color: data.item.house_color,
                  borderColor: data.item.house_color
                }"
                >{{ data.value }}</span
              >
            </div>
          </template>
        </TableComponent>
        <div v-else class="row">
          <!-- <div
          v-for="(value, index) in items"
          :key="index"
          class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
        > -->
          <UtilsStudentGridView
            v-for="(value, index) in students"
            :key="index"
            :data="value"
            :display-key="['first_name', 'last_name', 'gender', 'house']"
          ></UtilsStudentGridView>
          <!-- </div> -->
        </div>
      </template>
    </UtilsFilterComponent>
  </div>
</template>

<script>
import TableFunc from '~/mixins/TableCompFun' // Table component mixins
export default {
  mixins: [TableFunc],
  props: {
    students: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      studentsFilter: '',
      fields: [
        {
          key: 'first_name'
        },
        { key: 'last_name', label: 'Last Name' },
        { key: 'gender' },
        { key: 'email' },
        { key: 'house' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
