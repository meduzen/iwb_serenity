<template>
    <div>
        <template v-if="isActive">
            <div
                v-click-outside="handleClickaway"
                class="dropdown"
                @keydown.tab="handleTabPress"
                :class="{ open : listOpen, 'dropdown--nested': nested }"
            >
                <button
                    type="button"
                    :class="toggleStyle"
                    :aria-expanded="listOpen ? 'true' : 'false'"
                    :aria-controls="`dropdown-body_${uniqueId}`"
                    :aria-labelledby="`${toggleLabel} dropdown-${uniqueId}-title`"
                    @click="toggleList"
                    @keydown.esc="closeList"
                >

                    <span :id="`dropdown-${uniqueId}-title`">
                        <slot
                            v-if="hasToggleTitleSlot"
                            name="toggleTitle"></slot>
                        <span
                            v-else
                            class="dropdown__toggle-label">{{ toggleTitle }}</span>
                    </span>

                    <template v-if="nested">
                        <svg
                            class="dropdown__toggle-icon"
                            width="8"
                            height="13"
                            viewBox="0 0 8 13"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.844857 1.12832C0.425738 1.54744 0.425738 2.22448 0.844857 2.6436L5.01456 6.8133L0.844857 10.983C0.425738 11.4021 0.425738 12.0792 0.844857 12.4983C1.26398 12.9174 1.94102 12.9174 2.36014 12.4983L7.29285 7.56557C7.71197 7.14645 7.71197 6.46941 7.29285 6.05029L2.36014 1.11757C1.95176 0.709199 1.26398 0.709199 0.844857 1.12832Z"/>
                        </svg>
                    </template>
                    <template v-else>
                        <svg
                            v-if="toggleIconVisible"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            class="dropdown__toggle-icon">
                            <path d="M15.875 9l-3.88 3.88L8.115 9a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41c-.39-.38-1.03-.39-1.42 0z"></path>
                        </svg>
                    </template>
                </button>

                <div
                    :id="`dropdown-body_${uniqueId}`"
                    class="dropdown__body"
                    :class="{hidden : !listOpen}"
                    @keydown.esc.stop="closeList"
                >
                    <div>
                        <a
                            @click.prevent="closeList()"
                            href=""
                            class="dropdown__body-title"
                            :aria-label="closeLabel"
                        >
                            <svg
                                width="8"
                                height="13"
                                viewBox="0 0 8 13"
                                xmlns="http://www.w3.org/2000/svg"
                                class="dropdown__body-title-icon"
                                :id="`icon-menu-go-back-${uniqueId}`">
                                <path d="M7.28757 1.12353C7.08695 0.92245 6.81457 0.809448 6.53052 0.809448C6.24648 0.809448 5.9741 0.92245 5.77348 1.12353L0.844612 6.05239C0.425819 6.47118 0.425819 7.1477 0.844612 7.56649L5.77348 12.4954C6.19227 12.9141 6.86878 12.9141 7.28757 12.4954C7.70637 12.0766 7.70637 11.4001 7.28757 10.9813L3.12112 6.80407L7.28757 2.63762C7.70637 2.21883 7.69563 1.53158 7.28757 1.12353Z"></path>
                            </svg>
                            {{ headerTitle }}
                        </a>
                    </div>
                    <div>
                        <div class="dropdown__body-content">
                            <slot ></slot>
                        </div>

                        <div v-if="hasFooterSlot" class="dropdown__footer">
                            <slot name="footer"></slot>
                        </div>

                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <slot ></slot>
        </template>
    </div>
</template>
<script>
import Vue from "vue";
import Vuex from "vuex";
import uuid from "uuid/v4";
import { clickOutside } from './common/directives/clickOutside.js';
import { responsive } from './common/plugins/responsive/responsive.js';

Vue.use(Vuex);

const store = new Vuex.Store();

Vue.use(responsive, { store : store });

export default Vue.extend({
    name: "Dropdown",
    directives: {
        "click-outside": clickOutside
    },
    props: {
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
        activeBreakpoint: {
            type: String,
            required: false,
            default: "all"
        }
    },
    data() {
        return {
            listOpen: false,
            firstFocusableElement: null,
            lastFocusableElement: null,
            documentScrollTop: null,
            isMobile: false,
            uniqueId: uuid(),
            isActive: true
        };
    },
    computed: {
        hasToggleTitleSlot() {
            return !!this.$slots["toggleTitle"];
        },
        hasFooterSlot() {
            return !!this.$slots["footer"];
        },
    },
    mounted: function() {
        // Responsive Behavior
        /* istanbul ignore next */
        this.$responsive.registerMediaQuery(this.mobileBreakpoint, () => {
            if(!document.documentElement.classList.contains("js-fullscreen") && this.listOpen){
                this.documentScrollTop = (
                    document.scrollingElement ||
                    document.documentElement ||
                    document.body.parentNode ||
                    document.body
                ).scrollTop;
                // Add a Modal-Open class on html tag (disable scroll in css)
                document.documentElement.classList.add("js-fullscreen");
            }
            this.isMobile = true;
        }, () => {
            if(document.documentElement.classList.contains("js-fullscreen") && this.listOpen){
                // Remove Modal-Open class on html tag
                document.documentElement.classList.remove("js-fullscreen");
            }
            this.isMobile = false;
        });

        if (this.activeBreakpoint !== "all") {
            this.$responsive.registerMediaQuery(this.activeBreakpoint, () => {
                this.isActive = true;
            }, () => {
                this.isActive = false;
            });
        }
    },
    methods: {
        toggleList: function() {
            if (this.listOpen === true) {
                this.closeList();
            } else {
                this.openList();
            }
        },
        openList: function() {
            var focusableElements = Array.from(this.$el.querySelector(".dropdown__body").querySelectorAll(
                "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex=\"0\"]"
            ));

            this.firstFocusableElement = focusableElements[0];

            // Save last focusable element of the modal
            this.lastFocusableElement = focusableElements.pop();

            if(this.isMobile){
                this.documentScrollTop = (
                    document.scrollingElement ||
                    document.documentElement ||
                    document.body.parentNode ||
                    document.body
                ).scrollTop;
                // Add a Modal-Open class on html tag (disable scroll in css)
                if(!document.documentElement.classList.contains("js-fullscreen")){
                    document.documentElement.classList.add("js-fullscreen");
                }

                if(this.nested) {
                    document.documentElement.classList.add("js-fullscreen--nested");
                }
            }
            this.listOpen = true;
            this.$emit("click");

            Vue.nextTick(() => {
                this.firstFocusableElement.focus();
            });
        },
        closeList: function() {
            this.closeListWithoutRefresh();
            this.$emit("closeList");
        },
        closeListWithoutRefresh() {
            if( this.listOpen === true && this.isAModalOpen === false) {

                if(this.isMobile && (document.documentElement.classList.contains("js-fullscreen") || document.documentElement.classList.contains("js-fullscreen--nested"))){
                    window.scroll(0, this.documentScrollTop);

                    if(this.nested) {
                        document.documentElement.classList.remove("js-fullscreen--nested");
                    } else {
                        document.documentElement.classList.remove("js-fullscreen");
                    }
                }
                this.listOpen = false;
            }
        },
        handleTabPress: function(event) {
            if(document.documentElement.classList.contains("js-fullscreen")) {
                if (event.shiftKey === true) {
                    //Tab backward
                    if (document.activeElement === this.firstFocusableElement) {
                        event.preventDefault();
                        this.lastFocusableElement.focus();
                    }
                } else {
                    // Tab forward
                    if (document.activeElement === this.lastFocusableElement) {

                        event.preventDefault();
                        this.firstFocusableElement.focus();
                    }
                }
            }
        },
        handleClickaway: function() {
            if(this.isMobile === false && this.listOpen) {
                this.closeList();
            }
        },
    },
});
</script>