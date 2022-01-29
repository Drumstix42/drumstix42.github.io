<template>
    <header>
        <div class="navbar">
            <router-link custom v-for="item in routeItems" :to="item.path" v-slot="{ href, route, navigate, isActive, isExactActive }">
                <n-button quaternary size="large" :type="isActive || isExactActive ? 'info' : 'default'" :href="href" @click="navigate">
                    {{ item.title }}
                </n-button>
            </router-link>
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
.navbar {
    padding: 0.25rem;
    background-color: var(--navbar-bg-color);
    border-bottom: 1px solid var(--navbar-border-color);
}
</style>
