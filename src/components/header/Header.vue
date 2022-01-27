<template>
    <header>
        <div class="">
            <router-link v-for="item in routeItems" :to="item.path" v-slot="{ href, route, navigate, isActive, isExactActive }">
                <P-Button
                    :label="item.title"
                    class="p-button-text outline-none"
                    :class="[!isActive && 'p-button-plain', !isExactActive && ' p-button-plain']"
                    :href="href"
                    @click="navigate"
                ></P-Button>
            </router-link>
            <!-- <P-Button label="Home" icon="pi pi-check" class="p-button-primary"></P-Button> -->
            <!-- <P-Button label="Icarus" icon="pi pi-trash" class="p-button-primary p-button-text"></P-Button> -->
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
