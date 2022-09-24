<template>
    <header class="header">
        <div class="navbar">
            <div class="inner px-2">
                <div class="mx-2 title flex align-items-center">
                    <n-image
                        class="icon"
                        width="24"
                        :src="`/icarus-game/ItemIcons/Tools/ITEM_Building_RepairTool.ITEM_Building_RepairTool.png`"
                        :preview-disabled="true"
                    />
                    <span class="px-2">Icarus Crafting Calculator</span>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    components: {},
    props: [],
    data() {
        return {};
    },
    computed: {
        routeItems() {
            const items = [];
            const routes = this.$router.options.routes || [];

            // build array of Routes that contain a "title"
            routes.forEach((record) => {
                if (record.title) {
                    items.push(record);
                }
            });

            return items;
        },
    },
};
</script>

<style lang="scss">
.header {
    position: sticky;
    top: 0;
    z-index: 999;
}

.navbar {
    padding: 0.25rem;
    background-color: var(--navbar-bg-color);
    border-bottom: 1px solid var(--navbar-border-color);

    .inner {
        margin: 0 auto;
        max-width: 100rem;

        .title {
            min-height: 2rem;
            font-weight: bold;
            font-size: 1rem;
        }
    }
}
</style>
