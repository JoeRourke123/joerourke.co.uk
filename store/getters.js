export const strict = false;

export default {
    tabCompletion: (s, g, state, rg) => (command) => {
        for(let cmd of state.commands) {
            if(cmd.startsWith(command)) {
                return cmd;
            }
        }

        return null;
    },
    currentHistory: (s, g, state, rg) => () => {
        return state.history[state.historyIndex];
    }
};