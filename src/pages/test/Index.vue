<template>
    <n-config-provider :theme="darkTheme">
        <div>
            <Header></Header>
            <Icarus></Icarus>
        </div>
        <n-global-style></n-global-style>
    </n-config-provider>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { NConfigProvider, NGlobalStyle } from 'naive-ui';
import { darkTheme } from 'naive-ui';

import Header from '@/pages/icarus//components/Header.vue';

// async import so that the Pinia store can be initialized before being referenced (workaround for now)
const Icarus = defineAsyncComponent(() => import('@/pages/icarus/Icarus.vue'));

export default {
    name: 'App',
    components: {
        Icarus: Icarus,
        NConfigProvider,
        NGlobalStyle,
        Header,
    },
    props: {},
    data() {
        return {
            darkTheme,
        };
    },
    computed: {},
    methods: {},
};
</script>

<style lang="scss"></style>
