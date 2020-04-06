# Dropdown

Dropdown is a Vue.js component that display a "dropdown" below a toggle (the toggle is a button on wich you can apply the style you want).

:::tip Note
The Dropdown act like a "fullscren modal" below 992px.
:::

## Basic dropdown
<div class="sd-example">
    <Example-DropdownBasic></Example-DropdownBasic>
</div>

```html
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

    <template v-slot:footer>
        <button
            type="submit"
            class="button dropdown__footer-button">
        <span class="button__label">Apply</span>
        </button>
    </template>
</serenityDropdown>
```

## Props

```json
 {
    toggleTitle: {
        type: String,
        required: true
    },
    headerTitle: {
        type: String,
        required: true
    },
    toggleLabel: {
        type: String,
        required: false,
        default: ""
    },
    toggleStyle: {
        type: String,
        required: false,
        default: "dropdown__toggle"
    },
    toggleIconVisible: {
        type: Boolean,
        required: false,
        default: true
    },
    nested: {
        type: Boolean,
        required: false,
        default: false
    },
    closeLabel: {
        type: String,
        required: false,
        default: "Close Dropdown"
    },
    isAModalOpen: {
        type: Boolean,
        required: false,
        default: false
    }
}
```

### Required props:

* *toggleTitle*:

    A string used has the text content for the toggle.

* *headerTitle*:

    A string used has the header of the dropdown (Only visible in mobile)

### Optional props:

* *toggleLabel*:

    A string use has an id for the input label if present (Use by `aria-labbeledby` attribute for accessibility purpose).

* *toggleStyle*:

    *default: button button--secondary button--size-small*

    A string representing the class that apply to the toggle.

* *toggleIconVisible*:

    *default: true*

    A boolean that define if the toggle icon (a small arrow pointing down) is visible or not.

* *nested*:

    *default: false*

    A boolean that define if the element is nested inside another dropdown or not. It's could be use for mobile when you want to add a subsection inside a modal.

    e.g. : Immoweb mobile filter

* *closeLabel*:

    *default: Close Dropdown*

    A string used has label for the close dropdown button (in the header in mobile).

* *isAModalOpen*:

    *default: false*

    A boolean that define if a modal is currently open or not. Used to avoid layout issue if a modal is allreay open.
