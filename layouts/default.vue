<template>
    <div class="default-layout n-grid-2">
        <div class="default-layout__content n-margin-i-auto n-padding-i-xl">
            <slot />
        </div>
        <aside class="default-layout__aside n-color-accent n-padding-i-xl">
            <img
                src="/provetcloud.svg"
                alt="Provet Logo"
                width="300"
                height="100"
                class="n-padding-i-l"
            />
        </aside>
    </div>
</template>

<style scoped>
.default-layout,
.default-layout__aside,
.default-layout__content {
    position: relative;
    min-height: 100vh;
    height: 100%;
}

.default-layout__content {
    max-width: 480px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.default-layout__aside img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
