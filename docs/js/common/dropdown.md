# Dropdown

Dropdown is a Vue.js component that allow you to display content inside a contextual overlay triggered by a button.

The content display inside the overlay can be anything you want, like a form, some text, etc.

:::tip Note
The Dropdown act like a "fullscren modal" on screen of width below desktop (992px) (This value can be overwrited by specifying the mobileBreakpoint props).
:::

## Basic dropdown

The content of the overlay is define what's inside the `default slot` of the component.

:::warning Note
Due to the different nature of each dropdown content, please note that the minimum width of the dropdown overlay is not defined. If you want to apply a minimum width to it, you need to add a specific style to a wrapper element inside this overlay (In this example using inline style, but it can be inherited from a class, or whatever).
:::

<div class="sd-example">
    <Example-Dropdown-DropdownBasic></Example-Dropdown-DropdownBasic>
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
## Dropdown With Footer

You can add element in footer inside the overlay (in mobile fixed in the bottom) with the help of a conditional `footer slot`.

<div class="sd-example">
    <Example-Dropdown-DropdownFooter></Example-Dropdown-DropdownFooter>
</div>

```html
<serenityDropdown toggleTitle="Dropdown With Footer Example" headerTitle="Dropdown title">
    <div style="min-width:12.5rem;">
        <div class="field">
            <label
                for="dropdownInputExample01"
                class="field__label">
                <span class="label__text">Dropdown Input</span>
            </label>
            <input type="text" class="input--text" id="dropdownInputExample01" />
        </div>
    </div>

    <template slot="footer">
        <button type="button" class="button button--primary">Apply</button>
    </template>
</serenityDropdown>
```

## Dropdown With Custom Toggle

In some specific case you need a more complexe markup than just text for the toggle title (e.g. Display a part of the title with a different style), for that you can use a conditional `toggleTitle slot`.

<div class="sd-example">
    <Example-Dropdown-DropdownCustomToggle></Example-Dropdown-DropdownCustomToggle>
</div>

```html
<serenityDropdown toggleTitle="Dropdown With Custom Toggle Title Example" headerTitle="Dropdown title">
    <template slot="toggleTitle">
        <span>Custom toggle title <em>(With extra markup)</em></span>
    </template>

    <div style="min-width:12.5rem;">
        <div class="field">
            <label
                for="dropdownInputExample03"
                class="field__label">
                <span class="label__text">Dropdown Input</span>
            </label>
            <input type="text" class="input--text" id="dropdownInputExample03" />
        </div>
    </div>
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
    },
    mobileBreakpoint: {
        type: String,
        required: false,
        default: "to-desktop"
    },
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

* *mobileBreakpoint*:

    *default: to-desktop*

    A string representing a mediaQueries (listed inside plugins/responsive), use has a breakpoint by the component to define when the dropdown is considred mobile (fullscreen modal) or not.