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
  data() {
    return {
      cards: [
        {
          href: '/dashboard/patient',
          title: 'Patient Records',
          icon: 'fas fa-hospital-user',
        },

        {
          href: '/dashboard/opd',
          title: 'OPD',
          icon: 'fas fa-user-md',
          child: [
            {
              href: '/dashboard/opd/',
              title: 'Encounter Work List',
              icon: 'fas fa-list-ul',
            },
          ],
        },

        {
          href: '/dashboard/laboratory',
          title: 'Laboratory',
          icon: 'fas fa-vial',
          child: [
            {
              href: '/dashboard/laboratory/',
              title: 'Laboratory Work List',
              icon: 'fas fa-list-ul',
            },
          ],
        },

        {
          href: '/dashboard/imaging',
          title: 'Imaging',
          icon: 'fas fa-x-ray',
          child: [
            {
              href: '/dashboard/imaging/',
              title: 'Imaging Work List',
              icon: 'fas fa-list-ul',
            },
          ],
        },
        {
          href: '/dashboard/cso',
          title: 'Customer Service Officer',
          icon: 'fas fa-list-ol',
        },
        {
          href: '/dashboard/finance',
          title: 'Finance',
          icon: 'fas fa-money-check-alt',
        },
        {
          href: '/dashboard/reports',
          title: 'Reports',
          icon: 'fas fa-file',
          child: [
            {
              href: '/dashboard/reports/encounter',
              title: 'Encounter report',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/reports/laboratory',
              title: 'Laboratory report',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/reports/imaging',
              title: 'Imaging report',
              icon: 'fas fa-list-ul',
            },
            {
              href: '/dashboard/reports/patient',
              title: 'Patient report',
              icon: 'fas fa-list-ul',
            },
          ],
        },
        {
          title: 'Settings',
          href: '/dashboard/settings',
          icon: 'fas fa-cog',
          child: [
            {
              href: '/dashboard/settings/user/?tab=0',
              title: 'User Management',
              child: [
                {
                  href: '/dashboard/settings/user/?tab=0',
                  title: 'Users',
                },
              ],
            },
            {
              href: '/dashboard/settings/finance/',
              title: 'Finance Settings',
              child: [
                {
                  href: '/dashboard/settings/finance/items/',
                  title: 'Billable items',
                },
                {
                  href: '/dashboard/settings/finance/payment-method/',
                  title: 'Payment methods',
                },
              ],
            },
            {
              href: '/dashboard/settings/laboratory/',
              title: 'Laboratory Settings',
              child: [
                {
                  href: '/dashboard/settings/laboratory/service-center',
                  title: 'Laboratory center',
                },
                {
                  href: '/dashboard/settings/laboratory/service-config',
                  title: 'Laboratory configuration',
                },
              ],
            },
            {
              href: '/dashboard/settings/imaging/',
              title: 'Imaging Settings',
              child: [
                {
                  href: '/dashboard/settings/imaging/service-center',
                  title: 'Imaging Center',
                },
                {
                  href: '/dashboard/settings/imaging/service-config',
                  title: 'Imaging Configuration',
                },
              ],
            },
            {
              href: '/dashboard/settings/opd/',
              title: 'OPD Settings',
              child: [
                {
                  href: '/dashboard/settings/opd/?tab=0',
                  title: 'Department',
                },
                {
                  href: '/dashboard/settings/opd/?tab=1',
                  title: 'Clinic',
                },
              ],
            },
          ],
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