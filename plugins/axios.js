
export default function ({ $axios, $toast, store, redirect }) {
  // $axios.defaults.timeout = 1000 * 5 // t - 5s
  $axios.onRequest((config) => {
    store.commit('toggleRequestInProgress', true)
    // if (store.state.auth.token) {
      // console.log('token')
    //  config.headers.common.Authorization = `Bearer ${store.state.auth.token}`
     config.headers.common.Authorization = `Token d3473d576e21aff0c6603d06a3e064a2d9561119`
    // }
    return config
  })
  $axios.onError((error) => {
    store.commit('toggleRequestInProgress', false)

    if (error.response && error.response.status === 401) {
      store.dispatch('auth/logout')
      redirect('/auth/login?redirect=true');
      $toast({
        type: 'error',
        text: error.response.data.message,
      })
      return Promise.reject(error)
    }

    if (error.response && error.response.status === 400) {
      $toast({
        type: 'error',
        text: error.response.data.message,
      })
      return Promise.reject(error)
    }

    if (error.response && error.response.status === 404) {
      $toast({
        type: 'error',
        text: 'Not Found',
      })
    } else {
      $toast({
        type: 'error',
        text: (error.response.data.message) || 'Error Occurred',
      })

      return Promise.reject(error)
    }

    if (error.message) {
      $toast({
        type: 'error',
        text: error.message,
      })
      return Promise.reject(error)
    }


    $toast({
      type: 'error',
      text: 'Error Occurred',
    })

    return Promise.reject(error)

  })
  $axios.onResponse((response) => {
    // NProgress.done();
    store.commit('toggleRequestInProgress', false)
    // if (response.status === 200 || response.status === 201) {
    //   $toast({
    //     type: 'success',
    //     text: response.data.message,
    //   })
    // }
    return response
  })
}
