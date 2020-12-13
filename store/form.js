export const state = () => ({
    data: {

    }
});

export const mutations = {
    resetForm(state) {
        state.data = {
            active: false,
            inputIndex: 0,
            promptText: "Enter your name:",
            name: "",
            email: "",
            content: "",
        };
    }
}

export const actions = {
    openForm(store) {
        store.commit('resetForm');
    }
}