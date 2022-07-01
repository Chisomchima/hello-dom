<template>
    <div>
        <ModalWrapper :submitTitle="'Sign'" size="md" id="sign" title="Authenticate" @ok="sign" @hide="cancel">
            <h5 class="text-center">Please provide your password</h5>
            <div class="p-3 row justify-content-center">
                <ValidationObserver ref="form">
                    <div class="d-flex align-items-center">
                        <div class="w-100">
                            <ValidationProviderWrapper :rules="['required']">
                                <div>
                                    <input @keyup.enter="sign" :type="show ? 'text' : 'password'" v-model="password"
                                        placeholder="Password" class="form-control ng-untouched ng-pristine ng-valid" />
                                </div>
                            </ValidationProviderWrapper>
                        </div>
                        <div class="mt-3 ml-2 text-info pointer">
                            <div @click="show = !show">
                                <div v-if="show">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="22px"
                                        height="22px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36">
                                        <path fill="currentColor"
                                            d="M33.62 17.53c-3.37-6.23-9.28-10-15.82-10S5.34 11.3 2 17.53l-.28.47l.26.48c3.37 6.23 9.28 10 15.82 10s12.46-3.72 15.82-10l.26-.48Zm-15.82 8.9C12.17 26.43 7 23.29 4 18c3-5.29 8.17-8.43 13.8-8.43S28.54 12.72 31.59 18c-3.05 5.29-8.17 8.43-13.79 8.43Z"
                                            class="clr-i-outline clr-i-outline-path-1" />
                                        <path fill="currentColor"
                                            d="M18.09 11.17A6.86 6.86 0 1 0 25 18a6.86 6.86 0 0 0-6.91-6.83Zm0 11.72A4.86 4.86 0 1 1 23 18a4.87 4.87 0 0 1-4.91 4.89Z"
                                            class="clr-i-outline clr-i-outline-path-2" />
                                        <path fill="none" d="M0 0h36v36H0z" />
                                    </svg>
                                </div>
                                <div v-else>
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="22px"
                                        height="22px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36">
                                        <path fill="currentColor"
                                            d="M25.19 20.4a6.78 6.78 0 0 0 .43-2.4a6.86 6.86 0 0 0-6.86-6.86a6.79 6.79 0 0 0-2.37.43L18 13.23a4.78 4.78 0 0 1 .74-.06A4.87 4.87 0 0 1 23.62 18a4.79 4.79 0 0 1-.06.74Z"
                                            class="clr-i-outline clr-i-outline-path-1" />
                                        <path fill="currentColor"
                                            d="M34.29 17.53c-3.37-6.23-9.28-10-15.82-10a16.82 16.82 0 0 0-5.24.85L14.84 10a14.78 14.78 0 0 1 3.63-.47c5.63 0 10.75 3.14 13.8 8.43a17.75 17.75 0 0 1-4.37 5.1l1.42 1.42a19.93 19.93 0 0 0 5-6l.26-.48Z"
                                            class="clr-i-outline clr-i-outline-path-2" />
                                        <path fill="currentColor"
                                            d="m4.87 5.78l4.46 4.46a19.52 19.52 0 0 0-6.69 7.29l-.26.47l.26.48c3.37 6.23 9.28 10 15.82 10a16.93 16.93 0 0 0 7.37-1.69l5 5l1.75-1.5l-26-26Zm9.75 9.75l6.65 6.65a4.81 4.81 0 0 1-2.5.72A4.87 4.87 0 0 1 13.9 18a4.81 4.81 0 0 1 .72-2.47Zm-1.45-1.45a6.85 6.85 0 0 0 9.55 9.55l1.6 1.6a14.91 14.91 0 0 1-5.86 1.2c-5.63 0-10.75-3.14-13.8-8.43a17.29 17.29 0 0 1 6.12-6.3Z"
                                            class="clr-i-outline clr-i-outline-path-3" />
                                        <path fill="none" d="M0 0h36v36H0z" />
                                    </svg>
                                </div>

                            </div>
                        </div>
                    </div>
                </ValidationObserver>
            </div>
        </ModalWrapper>
    </div>
</template>

<script>
export default {
    data() {
        return {
            password: '',
            show: false
        }
    },
    methods: {
        cancel() {
            this.password = ''
        },
        async sign() {
            try {
                let response = await this.$axios.$patch(`encounters/encounter/${this.$route.params.id}/sign/`,
                {
                    password: this.password
                }
                )
                this.$bvModal.hide('sign')
                this.$emit('refresh')
                this.$toast({
                    type: 'success',
                    text: 'Success'
                });
            }
            catch (error){
                // this.$toast({
                //     type: 'error',
                //     text: error.password
                // });
            }
        }
    }
}
</script>

<style>

</style>