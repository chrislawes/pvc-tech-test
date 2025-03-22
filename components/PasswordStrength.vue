<script setup lang="ts">
import '@provetcloud/web-components/lib/icon'
import { passwordStrength } from '@/utils/password-strength'

const props = defineProps<{
    input: string;
}>()

const indicatorSectionsCount = computed((): number => passwordStrength().length)
const completeSectionsCount = computed((): number => passwordStrength().filter(rule => rule.isValid(props.input)).length)
</script>

<template>
    <div
        data-testid="password-strength-indicator"
        class="password-strength"
    >
        <div
            v-for="(item, index) in indicatorSectionsCount"
            :key="index"
            class="password-strength__item"
            :class="{ 'password-strength__item--active' : completeSectionsCount >= item }"
        />
    </div>
</template>

<style scoped>
.password-strength {
    display: flex;
    gap: 10px;
}

.password-strength__item {
    height: 10px;
    width: 100%;
    background-color: var(--n-color-status-neutral-weak);
}

.password-strength__item--active {
    background-color: var(--n-color-status-success);
}

.password-strength__item--active:nth-child(1) {
    background-color: var(--n-color-status-danger);
}

.password-strength__item--active:nth-child(2) {
    background-color: var(--n-color-status-warning);
}
</style>
