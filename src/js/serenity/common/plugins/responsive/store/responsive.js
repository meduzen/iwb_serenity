export default {
    namespaced: true,

    state: {
        currentBreakpoint: "x-small",
        currentWindowWidth: null
    },

    mutations: {
        setCurrentBreakpoint(state, breakpoint) {
            state.currentBreakpoint = breakpoint;
        },
        setCurrentWindowWidth(state, width) {
            state.currentWindowWidth = width;
        }
    },

    getters: {
        getCurrentBreakpoint: state => {
            return state.currentBreakpoint;
        },
        getCurrentWindowWidth: state => {
            return state.currentWindowWidth;
        }
    }
};