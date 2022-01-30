<template>
    <div>
        <!-- <n-select v-model:show="isOpen" filterable placeholder="Select a recipe" :options="options">
            <template v-if="isOpen" #arrow>
                <n-icon size="12">
                    <Search></Search>
                </n-icon>
            </template>
        </n-select> -->
        <Multiselect class="multiselect-dark" v-model="value" :options="options" searchable placeholder="Select a recipe"></Multiselect>
    </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';
import { Search } from '@vicons/fa';

export default {
    name: 'CraftingToolItemSelector',
    components: {
        Multiselect,
        Search,
    },
    props: {},
    data() {
        return {
            isOpen: false,
            value: null,
            options: [
                {
                    label: 'Test 1',
                    value: 1,
                },
                {
                    label: 'Test 2',
                    value: 2,
                },
                {
                    label: 'Test 3',
                    value: 3,
                },
                {
                    label: 'Test 4',
                    value: 4,
                },
            ],
        };
    },
    computed: {},
    methods: {},
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
