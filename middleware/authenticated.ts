
import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = ({ store, redirect }) => {
    // Use context
    if (!store.getters['auth/isLoggedIn']) {

        return redirect('/auth/login')
    }
}

export default myMiddleware

