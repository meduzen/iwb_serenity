import responsiveModule from './store/responsive';

export const responsive = {
    install: (Vue, options) => {

        if (!options || !options.store) {
            throw new Error('Please initialise plugin with a Vuex store.');
        }

        // Register modals vuex module
        options.store.registerModule('responsiveModule', responsiveModule);

        // Breakpoints List
        var breakpoints = {
            "x-small": 0,
            "small": 36,
            "medium": 48,
            "desktop": 62,
            "widescreen": 75
        };

        var containerWidth = {
            "x-small": undefined,
            "small": 540,
            "medium": 720,
            "desktop": 960,
            "widescreen": 1140
        };

        // Media Queries List
        // 0.0625em is equal to 1px, and is use to make sure the "smaller" breakpoint doesn't overide with the next (e.g. small stop at 767px and not 768px)
        var mediaQueries = {
            "x-small": "screen and (min-width: " + breakpoints["x-small"] + "em) and (max-width: " + (breakpoints.small - 0.0625) +"em)",
            "small": "screen and (min-width:" + breakpoints.small + "em) and (max-width: " + (breakpoints.medium - 0.0625) +"em)",
            "medium": "screen and (min-width:" + breakpoints.medium + "em) and (max-width: " + (breakpoints.desktop - 0.0625) +"em)",
            "desktop": "screen and (min-width:" + breakpoints.desktop + "em) and (max-width: " + (breakpoints.widescreen - 0.0625) +"em)",
            "widescreen": "screen and (min-width:" + breakpoints.widescreen + "em)",
            "from-small": "screen and (min-width:" + breakpoints.small + "em)",
            "from-medium": "screen and (min-width:" + breakpoints.medium + "em)",
            "from-desktop": "screen and (min-width:" + breakpoints.desktop + "em)",
            "from-widescreen": "screen and (min-width:" + breakpoints.widescreen + "em)",
            "to-small": "screen and (max-width:" + (breakpoints.small - 0.0625) + "em)",
            "to-medium": "screen and (max-width:" + (breakpoints.medium - 0.0625) + "em)",
            "to-desktop": "screen and (max-width:" + (breakpoints.desktop - 0.0625) + "em)",
            "to-widescreen": "screen and (max-width:" + (breakpoints.widescreen - 0.0625) + "em)"
        };

        var mediaQueriesList = [];

        // Current Breakpoint
        var currentBreakpoint = "x-small";

        /**
         * [mediaQuery Create new mediaQueryList with their callbacks and register it to mediaQueriesList array]
         * @param  {string} breakpoint      [A string representing the media query]
         * @param  {function} matchCallback   [The callback launch if the mediaQuery matche]
         * @param  {function} unmatchCallback [The cllback launch if the mediaQuery doesn't matche]
         * @return {int}                 [The index of the new entry in mediaQueriesList array]
         */
        function mediaQuery (breakpoint, matchCallback, unmatchCallback) {
            // Check Parameters
            // ---------------------
            // breakpoint
            if(breakpoint === undefined) {
                throw new Error("breakpoint is required, got undefined");
            }

            const breakpointType = typeof breakpoint;
            if(breakpointType !== "string") {
                throw new Error(`breakpoint: string expected, got ${breakpointType}`);
            }

            if(!mediaQueries.hasOwnProperty(breakpoint)) {
                const allowedBreakpoint = Object.keys(mediaQueries).map(key => key);

                throw new Error(`breakpoint: ${breakpoint} is not a valid breakpoint, should be one of the following: ${mediaQueries}`);
            }

            // matchCallback
            if(matchCallback === undefined) {
                throw new Error("matchCallback is required, got undefined");
            }

            const matchCallbackType = typeof matchCallback;
            if(matchCallbackType !== "function") {
                throw new Error(`matchCallback: function expected, got ${matchCallbackType}`);
            }

            // unmatchCallback
            const unmatchCallbackType = typeof unmatchCallback;

            if(unmatchCallback !== undefined && unmatchCallbackType !== "function") {
                throw new Error(`unmatchCallback: function expected, got ${unmatchCallbackType}`);
            }

            // Build Media Query
            // ---------------------
            var matchMedia = window.matchMedia(mediaQueries[breakpoint]);

            var screenTest = (e) => {
                if (e.matches) {
                    matchCallback();
                } else {
                    if(unmatchCallback !== undefined) {
                        unmatchCallback();
                    }
                }
            };

            screenTest(matchMedia);
            matchMedia.addListener(screenTest);

            mediaQueriesList.push({
                "matchMedia": matchMedia,
                "screenTest": screenTest
            });

            var index = mediaQueriesList.length - 1;

            return index;
        }

        /**
         * [removeMediaQuery Remove listener on a given mediaQuery entry in mediaQueriesList]
         * @param  {number} mediaQueryIndex [The index of the entry in mediaQueriesList]
s         */
        function removeMediaQuery (mediaQueryIndex) {
            if(mediaQueriesList[mediaQueryIndex]) {
                var matchMedia = mediaQueriesList[mediaQueryIndex].matchMedia;
                var screenTest = mediaQueriesList[mediaQueryIndex].screenTest;
                matchMedia.removeListener(screenTest);
            }

            return false;
        }

        // Set Current Breakpoint
        // ---------------------
        // Widescreen
        mediaQuery("widescreen", () => {
            options.store.commit("responsiveModule/setCurrentBreakpoint", "widescreen");
        });

        // Desktop
        mediaQuery("desktop", () => {
            options.store.commit("responsiveModule/setCurrentBreakpoint", "desktop");
        });

        // Medium
        mediaQuery("medium", () => {
            options.store.commit("responsiveModule/setCurrentBreakpoint", "medium");
        });

        // Small
        mediaQuery("small", () => {
            options.store.commit("responsiveModule/setCurrentBreakpoint", "small");
        });

        // X-small
        mediaQuery("x-small", () => {
            options.store.commit("responsiveModule/setCurrentBreakpoint", "x-small");
        });

        // Save the current window.width and register global resize event listener
        options.store.commit("responsiveModule/setCurrentWindowWidth", window.innerWidth);
        window.addEventListener("resize", () => {
            options.store.commit("responsiveModule/setCurrentWindowWidth", window.innerWidth);
        });

        Vue.prototype.$responsive = {
            breakpoints() {
                return breakpoints;
            },
            containerWidth() {
                return containerWidth;
            },
            registerMediaQuery(breakpoint, matchCallback, unmatchCallback) {
                return mediaQuery(breakpoint, matchCallback, unmatchCallback);
            },
            unregisterMediaQuery(mediaQueryIndex) {
                return removeMediaQuery(mediaQueryIndex);
            },
        };
    }
};