import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls";
 
const ls = new SecureLS();


export default ({ store }) => {
  createPersistedState({
    key: 'V3C Medical app',
    // paths: [],
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    },
  })(store)
}
