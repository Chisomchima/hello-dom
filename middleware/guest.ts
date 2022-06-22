
import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = ({ store, redirect }) => {
    // Use context
    if (store.getters['auth/isLoggedIn']) {
        return redirect('/auth/profile')
    }
}

export default myMiddleware

