<template>
  <div>
    <sidebar-menu
      style="top: 60px"
      theme="white-theme"
      :collapsed="true"
      :menu="menu"
    />
  </div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
export default {
  components: {
    SidebarMenu,
  },
  data() {
    return {
      menu: [
        {
          header: true,
          title: 'Main Navigation',
          hiddenOnCollapse: true,
        },
        {
          href: '/dashboard',
          title: 'Dashboard',
          icon: 'fa fa-tv',
        },

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
          href: '/dashboard/cso',
          title: 'Customer Service Officer',
          icon: 'fas fa-list-ol',
        },
        {
          title: 'Settings',
          href: '/dashboard/settings',
          icon: 'fas fa-cog',
          child: [
             {
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
          ],
        },

        // {
        //   component: 'ATest',
        //   props: { name: 'Dimeji' },
        //   // hidden: false
        //   // hiddenOnCollapse: true
        // },
      ],
      routes: [
        {
          pathName: 'dashboard',
          name: 'dashboard',
          icon: 'camera',
        },

        {
          pathName: 'dashboard-hr',
          name: 'patient',
          icon: 'archive',
          isToggled: false,

          dropdown: [
            {
              pathName: 'dashboard-patient',
              name: 'search patient',
              icon: 'people',
            },
            {
              pathName: 'dashboard-patient-add',
              name: 'register patient',
              icon: 'people',
            },
          ],
        },
        {
          pathName: 'dashboard-opd',
          name: 'OPD',
          icon: 'archive',
          isToggled: false,

          dropdown: [
            {
              pathName: 'dashboard-opd',
              name: 'Encounter Worklist',
            },
            // {
            //   pathName: 'dashboard-patient-add',
            //   name: 'register patient',
            // },
            // {
            //   pathName: 'sms-id-staff-pension-settings',
            //   name: 'Pension Settings',
            // },
            // {
            //   pathName: 'sms-id-staff-banks',
            //   name: 'Banks',
            // },
          ],
        },
        {
          pathName: 'dashboard-settings',
          name: 'Settings',
          icon: 'archive',
          isToggled: false,

          dropdown: [
            {
              pathName: 'dashboard-settings-laboratory',
              name: 'Laboratory Settings',
            },
            // {
            //   pathName: 'dashboard-patient-add',
            //   name: 'register patient',
            // },
            // {
            //   pathName: 'sms-id-staff-pension-settings',
            //   name: 'Pension Settings',
            // },
            // {
            //   pathName: 'sms-id-staff-banks',
            //   name: 'Banks',
            // },
          ],
        },
      ],
      isMobile: false,
      isShowing: false,
    }
  },
  created() {
    this.$nuxt.$on('openSidebar', () => {
      this.isMobile = !this.isMobile
      this.isShowing = !this.isShowing
    })
  },
}
</script>

<style scoped lang="scss">
.nav-item-icon {
  z-index: 999;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 900;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  background: rgba(0, 0, 0, 0.2);
}

.site-sidebar {
  z-index: 901 !important;
}

.bold {
  font-weight: 900;
}

.site-sidebar .nav-item .nav-item-icon {
  line-height: 0;
}
.site-sidebar .nav-item .nav-item-icon svg {
  height: 36px;
  width: 36px;
}
.site-sidebar .nav-item .nav-item-icon svg path {
  fill: #8f9aa3;
}

.site-sidebar.show .dontshow {
  display: none;
}

.nuxt-link-exact-active {
  background: rgba(16, 112, 183, 0.1) !important;
}
.nuxt-link-exact-active {
  background: rgba(16, 112, 183, 0.1) !important;
}
.nuxt-link-exact-active .nav-item-text {
  color: #0d6cbb !important;
}

.nuxt-link-exact-active .nav-item-icon {
  color: #0d6cbb !important;
}
.nuxt-link-exact-active .nav-item-text {
  color: #0d6cbb !important;
}

.nuxt-link-exact-active .nav-item-icon {
  color: #0d6cbb !important;
}

.nav-item {
  border-radius: 8px;
  position: relative;
}
.smaller-text {
  font-size: 14px;
  margin-left: 0.5rem;
}
.more-width {
  width: 80%;
}
.inline {
  display: inline !important;
}
</style>