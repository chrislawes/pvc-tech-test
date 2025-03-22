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

/* Wouldn't normally overwrite utility classes like this, couldn't find responsive helpers in the library */
.n-grid-2 {
    --n-grid-columns: 1;
}

@media only screen and (min-width: 760px) {
    .n-grid-2 {
        --n-grid-columns: 2;
    }
}

.default-layout__aside {
    display: none;
}

@media only screen and (min-width: 760px) {
    .default-layout__aside {
        display: block;
    }
}

.default-layout__aside img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
