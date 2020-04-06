<template>
    <div>
        <serenityDropdown toggleTitle="Dropdown Example" headerTitle="Dropdown header title">
            <div style="min-width:12.5rem;">
                <div class="field">
                    <label
                        for="dropdownInputExample01"
                        class="field__label">
                        <span class="label__text">Dropdown Input</span>
                    </label>
                    <input type="text" class="input--text" id="dropdownInputExample01">
                </div>
            </div>
        </serenityDropdown>
    </div>
</template>

<script>
import serenityDropdown from '../Serenity/Dropdown.vue';

export default {
    components: {
        serenityDropdown
    }
}
</script>