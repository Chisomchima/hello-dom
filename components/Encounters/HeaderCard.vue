<template>
    <div v-if="consultationData">
        <div style="border-radius: 4px" class="
                          p-3
                          bg-white
                          d-flex
                          flex-wrap
                          align-items-center
                          justify-content-between
                          pt-3
                          mb-3
                          shadow-sm
                        ">
            <div class="col-md-7 px-0 text-grey text-14 col-sm-7 col-lg-7">
                <div class="row px-0">
                    <div class="col-md-6 col-sm-6 col-lg-6">
                        <b>ENC-ID:</b>
                        {{
                            consultationData.encounter_id
                            ? consultationData.encounter_id
                            : 'nil'
                        }}
                    </div>

                    <div class="col-md-6 col-sm-6 col-lg-6">
                        <b>Department:</b>
                        {{ consultationData.department ? consultationData.department.name : 'nil' }}
                    </div>
                </div>
                <div class="row px-0">
                    <div class="col-md-6 col-sm-6 col-lg-6">
                        <b>Clinic:</b>
                        {{ consultationData.clinic ? consultationData.clinic.name : 'nil' }}
                    </div>
                    <div class="col-md-6 col-sm-6 col-lg-6">
                        <b>Date:</b> {{ dateCreated }}
                    </div>
                    <div class="col-md-6 col-sm-6 col-lg-6">
                        <b>Provider:</b>
                        <span v-if="Object.values(consultationData.provider ? consultationData.provider : {}).length > 0">{{
                            consultationData.provider
                            ? consultationData.provider.first_name +
                            ' ' +
                            consultationData.provider.last_name
                            : ''
                        }}</span>
                    </div>
                </div>
                <div style="
                              height: 50px;
                              overflow: hidden;
                              text-overflow: ellipsis;
                              word-break: break-all;
                            " class="text-truncate col-md-12 px-0 pt-3 col-sm-12 col-lg-11">
                    <b>Chief Complaint:</b> {{ consultationData.chief_complaint }}
                </div>
                <div v-if="consultationData.signed_date" class="col-md-12 col-sm-12">
                    <b>Signed by:</b>
                    {{
                        consultationData.provider.first_name +
                        ' ' +
                        consultationData.provider.last_name
                    }}, {{ dateSigned }}
                </div>
            </div>
            <div v-if="consultationData" class="
                            d-flex
                            justify-content-between
                            col-md-5 col-sm-5 col-lg-5
                            align-items-center
                          ">
                <div class="px-2">
                    <div class="px-2">
                        <p @click="gotoPatientProfile" class="text-14 mb-0 text-grey point signal">
                            <b>UHID:</b> {{ consultationData.patient ? consultationData.patient.uhid : '' }}
                        </p>
                    </div>
                    <div class="px-2">
                        <p class="text-14 mb-0 text-grey text-capitalize">
                            <b>Name:</b>
                            {{
                                consultationData.patient.firstname
                                ? consultationData.patient.firstname + ' ' + consultationData.patient.lastname
                                : 'nil'
                            }}
                        </p>
                    </div>
                    <div class="px-2">
                        <p class="text-14 mb-0 text-grey">
                            <b>D.O.B:</b> {{ consultationData.patient.date_of_birth }} <span
                                v-if="consultationData.patient.age">({{
                                    consultationData.patient.age.year }} 
                                    <span v-if="consultationData.patient.age.year > 1">Yrs</span>
                                     <span v-else>Yr</span>)</span>
                        </p>
                    </div>
                    <!-- <div v-if="consultationData.patient.age" class="px-2">
                                    <p class="text-14 mb-0 text-grey">
                                        <b>Age (Y-M-D):</b>
                                        {{ consultationData.patient.age.year ? consultationData.patient.age.year : '0' }} -
                                        {{ consultationData.patient.age.month ? consultationData.patient.age.month : '0' }} -
                                        {{ consultationData.patient.age.day ? consultationData.patient.age.day : '0' }}
                                    </p>
                                </div> -->
                    <div class="px-2">
                        <p class="text-14 mb-0 text-grey">
                            <b>Gender:</b>
                            {{ consultationData.patient.gender ? consultationData.patient.gender : 'nil' }}
                        </p>
                    </div>
                    <div class="px-2">
                        <p class="text-14 mb-0 text-grey">
                            <b>Payer:</b>
                            {{ consultationData.patient.payer ? consultationData.patient.payer : ' nil ' }}
                        </p>
                    </div>
                </div>

                <div class="px-0">
                    <div id="button-2" class="theme-color-text">
                        <b-avatar square :src="consultationData.patient ? consultationData.patient.profile_picture : ''"
                            variant="#e7f0f8" style="border: 2px solid #f5f6f7" size="8rem" />

                        <b-tooltip target="button-2" variant="secondary" placement="bottom">
                            <div class="d-block text-14 text-white">
                                {{ consultationData.patient.salutation ? consultationData.patient.salutation : 'Mr.' }}

                                {{
                                    consultationData.patient.firstname
                                    ? consultationData.patient.firstname +
                                    ' ' +
                                    consultationData.patient.middlename +
                                    ' ' +
                                    consultationData.patient.lastname
                                    : 'Anonymous'
                                }}
                                <br />
                                Gender: {{ consultationData.patient.gender ? consultationData.patient.gender : 'Male' }}
                                <br />
                                Phone No:
                                {{
                                    consultationData.patient.phone_number ? consultationData.patient.phone_number : 'nil'
                                }}
                                <br />
                                Nationality:
                                {{
                                    consultationData.patient.nationality
                                    ? consultationData.patient.nationality
                                    : 'Nigerian'
                                }}
                                <br />
                                Marital Status:
                                {{
                                    consultationData.patient.marital_status
                                    ? consultationData.patient.marital_status
                                    : 'Single'
                                }}
                                <br />
                                Religion:
                                {{ consultationData.patient.religion ? consultationData.patient.religion : 'nil' }}
                                <br />
                                L.G.A: {{ consultationData.patient.lga ? consultationData.patient.lga : 'nil' }}
                            </div>
                        </b-tooltip>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DateTime } from 'luxon'
export default {
    props: {
        consultationData: {
            type: Object,
            required: true
        }
    },
    methods: {
        gotoPatientProfile() {
            this.$router.push({
                name: 'dashboard-patient-uuid',
                params: {
                    uuid: this.consultationData.patient.id,
                },
            })
        },
    },
    computed: {
        dateCreated() {
            return DateTime.fromISO(this.consultationData?.encounter_datetime).toLocaleString(
                DateTime.DATETIME_SHORT
            )
        },
    }
}
</script>