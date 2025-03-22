<script setup lang="ts">
definePageMeta({
    middleware: (_, from) => {
        // Super simple check to ensure the user is coming from the register page, not just directly
        if (from.fullPath !== '/') {
            return navigateTo('/')
        }
    }
})
</script>

<template>
    <h1>🎉 Welcome!</h1>
</template>
