import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.css'


type ToastInput = {
  type: 'info' | 'success' | 'error' | 'warning',
  text: string,
}
declare module 'vue/types/vue' {
  interface Vue {
    $toast(message: ToastInput): void
  }
}


type updatedType = {
  [key: string]: any;
}
const toastVer: updatedType = iziToast;

iziToast.settings({
  position: 'bottomCenter',
  progressBar: false,
})

export default ({ app }: any, inject: any) => {
  // Inject $hello(msg) in Vue, context and store.
  //   const type = 'error'
  inject('toast', ({ type, text = '' }: ToastInput) => {

    return toastVer[type]({
      title: text,
    })
  },
  )
}
