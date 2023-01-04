<template>
    <transition name="fade" mode="out-in" v-bind="$attrs" v-on="$listeners">
        <slot></slot>
    </transition>
</template>
<script>
export default {
    inheritAttrs: false
};
</script>
<style>
.fade-leave-active {
    transition: opacity 0.3s, transform .4s;
}

.fade-enter-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0.5s;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.fadeIn {
    animation-name: fadeIn;
    transition: opacity 0.8s;
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

.fadeOut {
    animation-name: fadeOut;
    transition: opacity 0.1s;
}
</style>
  