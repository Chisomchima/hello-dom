import db from "@/services/db"

export default ({ _app }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    inject('dexie', db);
}