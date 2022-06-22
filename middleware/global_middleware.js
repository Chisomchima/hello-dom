export default function ({ $gates, store, route, redirect }) {
  // this is to make sure it only runs in the sms section of the app
  if (route.matched.some((route) => route.path.includes('/sms'))) {
    const rolesObj = store.state.roles.roles
    const schoolRoles = rolesObj.find((item) => item.code === route.params.id)

    $gates.setRoles(schoolRoles.roles)

    const pageAndRoles = [
      {
        pageRegex: /sms-id-lms-*/,
        roles: ['admin', 'teacher'],
      },
      {
        pageRegex: /sms-id-administration-*/,
        roles: ['admin', 'records'],
      },
      {
        pageRegex: /sms-id-staff-*/,
        roles: ['admin', 'hr'],
      },
    ]
    const foundPage = pageAndRoles.find((page) => page.pageRegex.test(route.name))
    if (foundPage) {
      const userRoles = $gates.getRoles()
      const foundRole = foundPage.roles.find((role) => userRoles.includes(role))
      if (!foundRole) {
        redirect(`/sms/${route.params.id}/permission-denied?fromPage=${route.fullPath}`);
        // return
      }
      // if (foundRole) {
      //   $permission.toggleAccess(true)
      //   return
      // }
    }
    // $permission.toggleAccess(true)
  }
}
