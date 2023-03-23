<template>
    <div>
    <div class="row">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="col-md-4 col-12 col-sm-6"
      >
        <div
          class="
            card card-stats
            mb-4 mb-xl-0
            shadow-sm
            p-3
            card-hover
            pointer
            my-3
          "
          @click="goToRoute(card.href)"
        >
          <div class="card-body">
            <div class="row">
              <div class="col text-truncate">
                <h3
                  class="h5 text-uppercase mb-0 font-weight-bold text-primary"
                >
                  {{ card.title }}
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
    data(){
        return {
            cards: [
            {
              href: '/dashboard/inventory/purchases',
              title: 'Purchases',
              icon: 'fas fa-file',
            },
            {
              href: '/dashboard/inventory/receipt',
              title: 'Receipts',
              icon: 'fas fa-list-ol',
            },
            {
              href: '/dashboard/inventory/sales',
              title: 'Sales',
              icon: 'fas fa-money-check-alt',
            },
            {
              href: '/dashboard/inventory/transfers',
              title: 'Transfers',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/inventory/inventory-adjustment',
              title: 'Inventory Adjustments',
              icon: 'fas fa-cog',
            },
            {
              href: '/dashboard/inventory/vendors',
              title: 'Vendors',
              icon: 'as fa-hospital-user',
            },
            {
              href: '/dashboard/inventory/products',
              title: 'Products',
              icon: 'fas fa-list-ul',
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