<script setup lang="ts">
import '@provetcloud/web-components/lib/icon'
import { passwordStrength } from '@/utils/password-strength'

const props = defineProps<{
    input: string;
}>()
</script>

<template>
    <ul class="password-rules">
        <li
            v-for="(item, index) in passwordStrength()"
            :key="index"
        >
            <provet-stack direction="horizontal" gap="xs">
                <div class="password-rules__icon">

                    <provet-icon
                        :name="(isValid = item.isValid(props.input)) ? 'interface-checked-small' : 'interface-close-small'"
                        :color="isValid ? 'var(--n-color-status-success)' : 'var(--n-color-text-weaker)'"
                        size="s"
                    />

                </div>
                <span class="n-font-size-m" :class="{ 'n-color-text-weaker': !isValid }">
                    {{ item.label }}
                </span>
            </provet-stack>
        </li>
    </ul>
</template>

<style scoped>
.password-rules {
    list-style: none;
}

.password-rules__icon {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
