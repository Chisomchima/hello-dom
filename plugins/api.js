// plugins/api.js


import Core from "@/services/core";
import Patient from "@/services/patient";
import Encounter from "@/services/encounter";
import Laboratory from "@/services/laboratory";
import Facility from "@/services/facility";

export default (context, inject) => {
    // Initialize API factories
    const factories = {

        core: Core(context.$axios),
        patient: Patient(context.$axios),
        encounter: Encounter(context.$axios),
        laboratory: Laboratory(context.$axios),
        facility: Facility(context.$axios),
    };

    // Inject $api
    inject("api", factories);
};