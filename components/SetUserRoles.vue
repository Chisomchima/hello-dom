<template>
  <div class="container">
    <div class="align-items-center d-flex justify-content-between mb-4">
      <p class="text-capitalize mb-0 text-muted">
        assign any roles to this staff
      </p>
      <BaseButton
        v-if="enabled === true"
        class="btn-lg btn-outline-primary"
        @click="enabled = false"
        >Edit</BaseButton
      >
      <BaseButton
        v-if="enabled != true"
        class="btn-lg btn-primary"
        @click="save"
        >Save</BaseButton
      >
    </div>

    <TableComponent :items="items" :fields="fields" :busy="busy">
      <template #name="{ data }">
        <span class="text-capitalize">{{
          data.value.split('_').join(' ')
        }}</span>
      </template>
      <template #assign="{ data }">
        <div>
          <!-- <h1>{{data.item}}</h1> -->
          <b-form-checkbox
            :checked="checkIfExist(data.item)"
            :disabled="enabled"
            @change="updateUserRole(data.item, $event)"
          >
          </b-form-checkbox>
        </div>
      </template>
    </TableComponent>
  </div>
</template>

<script>
import { remove } from 'lodash'

export default {
  data() {
    return {
      enabled: true,
      check: true,
      items: [],
      busy: false,
      userRole: [],
      fields: [
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'description',
        },
        {
          key: 'assign',
        },
      ],
    }
  },
  async fetch() {
    try {
      const school = this.$store.getters['school/getSchoolByCode'](
        this.$route.params.id
      )
      this.busy = true

      const { data } = await this.$axios.$get(`/util/v2/roles/`)
      this.items = data

      const { data: data2 } = await this.$axios.$get(
        `/util/v2/roles/staff/${this.$route.params.employee}/school/${school.id}/`
      )

      this.userRole = data2
      this.busy = false
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async save() {
      try {
        const school = this.$store.getters['school/getSchoolByCode'](
          this.$route.params.id
        )
        const { data } = await this.$axios.$post(
          `util/v2/roles/staff/${this.$route.params.employee}/school/${school.id}/set/`,
          {
            roles: this.userRole,
          }
        )
        this.$toast({
          type: 'success',
          text: 'Roles updated successfully',
        })
        this.userRole = data
        this.enabled = true
      } catch (error) {
        console.error(error)
      }
    },
    updateUserRole(item, check) {
      if (check) {
        this.userRole.push(item)
      } else {
        this.userRole = remove(this.userRole, (n) => {
          return n.name !== item.name
        })
        // this.userRole.splice(this.userRole.indexOf(item), 1)
      }
    },
    checkIfExist(item) {
      // debugger;
      if (this.userRole.find((role) => role.name === item.name)) {
        return true
      }
      return false
    },
  },
}
</script>

<style lang="scss" scoped></style>
