// plugins/api.js


import Core from "@/services/core";
import Patient from "@/services/patient";
import Encounter from "@/services/encounter";
import Laboratory from "@/services/laboratory";
import Facility from "@/services/facility";
import LabOrder from "@/services/laborder";
import Finance from "@/services/finance";
import Imaging from "@/services/imaging";
import Finance_Settings from "@/services/finance_settings";
import reports from "@/services/reports";
import Opd from "@/services/opd_settings";
import Users from "@/services/users";
import Templates from "@/services/templates";
import pharmacy from "@/services/pharmacy";

export default (context, inject) => {
    // Initialize API factories
    const factories = {

        core: Core(context.$axios),
        patient: Patient(context.$axios),
        encounter: Encounter(context.$axios),
        laboratory: Laboratory(context.$axios),
        facility: Facility(context.$axios),
        laborder: LabOrder(context.$axios),
        finance: Finance(context.$axios),
        imaging: Imaging(context.$axios),
        finance_settings: Finance_Settings(context.$axios),
        reports: reports(context.$axios),
        opd: Opd(context.$axios),
        users: Users(context.$axios),
        templates: Templates(context.$axios),
        pharmacy: pharmacy(context.$axios)
    };

    // Inject $api
    inject("api", factories);
};