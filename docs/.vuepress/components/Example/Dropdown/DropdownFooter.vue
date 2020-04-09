<template>
    <div>
        <serenityDropdown toggleTitle="Dropdown With Footer Example" headerTitle="Dropdown title">
            <div style="min-width:12.5rem;">
                <div class="field">
                    <label
                        for="dropdownInputExample02"
                        class="field__label">
                        <span class="label__text">Dropdown Input</span>
                    </label>
                    <input type="text" class="input--text" id="dropdownInputExample02" />
                </div>
            </div>

            <template slot="footer">
                <button type="button" class="button button--primary">Apply</button>
            </template>
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