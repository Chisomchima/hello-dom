// plugins/api.js


import Core from "@/services/core";

export default (context, inject) => {
    // Initialize API factories
    const factories = {

        core: Core(context.$axios)
    };

    // Inject $api
    inject("api", factories);
};