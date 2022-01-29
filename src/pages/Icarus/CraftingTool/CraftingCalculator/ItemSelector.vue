<template>
    <div>
        <n-select v-model:show="isOpen" filterable placeholder="Select a recipe" :options="options">
            <template v-if="isOpen" #arrow>
                <n-icon size="12">
                        <Search></Search>
                    </n-icon>
            </template>
        </n-select>
    </div>
</template>

<script>
import { Search } from '@vicons/fa';

export default {
    name: 'CraftingToolItemSelector',
    components: {
        Search,
    },
    props: {},
    data() {
        return {
            Search,
            isOpen: false,
            options: [
                {
                    label: 'Test 1',
                    value: 123,
                },
                {
                    label: 'Test 2',
                    value: 345,
                },
            ],
        };
    },
    computed: {},
    methods: {},
};
</script>
