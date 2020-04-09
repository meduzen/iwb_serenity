<template>
    <div>
        <serenityDropdown toggleTitle="Dropdown With Custom Toggle Title Example" headerTitle="Dropdown title">
            <template slot="toggleTitle">
                <span>Custom toggle title <em>(With extra markup)</em></span>
            </template>

            <div>Overlay content</div>

        </serenityDropdown>
    </div>
</template>

<script>
import serenityDropdown from '../../Serenity/Dropdown.vue';

export default {
    components: {
        serenityDropdown
    }
}
</script>