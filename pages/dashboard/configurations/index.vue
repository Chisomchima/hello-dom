<template>
  <div>
  <h3 class="page-heading">Configurations</h3>
    <div class="row">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="col-md-4 col-12 col-sm-6"
      >
        <div
          class="card card-stats mb-4 mb-xl-0 shadow-sm p-3 card-hover pointer my-3"
          @click="goToRoute(card.route)"
        >
          <div class="card-body">
            <div class="row">
              <div class="col text-truncate">
                <h3
                  class="h5 text-uppercase mb-0 font-weight-bold text-primary"
                >
                  {{ card.name }}
                </h3>
              </div>
              <div class="col-auto">
                <!-- <div
              class="icon icon-shape bg-danger text-white shadow"
            > -->
                <font-awesome-icon
                  :icon="card.icon"
                  class="h2 mb-0 text-primary"
                />

                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          name: 'User management',
          icon: 'fa fa-cogs',
          route: '/dashboard/configurations/user',
        },
        {
          name: 'Finance',
          icon: 'fa fa-cogs',
          route: '/dashboard/configurations/finance',
        },
        {
          name: 'Laboratory',
          icon: 'fa fa-cogs',
          route: '/dashboard/configurations/laboratory/',
        },
        {
          name: 'Imaging',
          icon: 'fa fa-cogs',
          route: '/dashboard/configurations/imaging',
        },
        {
          name: 'OPD',
          icon: 'fa fa-cogs',
          route: '/dashboard/configurations/opd',
        },
        {
          name: 'Pharmacy',
          icon: 'fa fa-cogs',
          route: '/dashboard/configurations/pharmacy',
        },
        {
          name: 'Inventory',
          icon: 'fa fa-cogs',
          route: '/dashboard/configurations/inventory',
        },
        {
          name: 'Nursing',
          icon: 'fa fa-cogs',
          route: '/dashboard/configurations/nursing',
        },
      ],
    }
  },
  methods: {
    goToRoute(e) {
      this.$router.push(e)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-hover:hover {
  border: 3px solid $COLOR_TWO;
}
</style>