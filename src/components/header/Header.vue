<template>
    <header>
        <div class="" :style="{ backgroundColor: 'var(--bluegray-900)' }">
            <router-link custom v-for="item in routeItems" :to="item.path" v-slot="{ href, route, navigate, isActive, isExactActive }">
                <p-button
                    :label="item.title"
                    class="p-button-text outline-none"
                    :class="[!isActive && 'p-button-plain', !isExactActive && ' p-button-plain']"
                    :href="href"
                    @click="navigate"
                ></p-button>
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
