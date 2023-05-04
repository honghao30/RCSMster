<template>
    <transition
        name="fade"
    >
        <div
        class="modal__wrap"
        >
            <div class="overlay-mask" @click="$emit('closeModal')"></div>
            <div class="modal__container">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
</script>

<style>

</style>
