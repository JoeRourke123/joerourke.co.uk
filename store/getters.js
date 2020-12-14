export const strict = false;

export default {
    tabCompletion: (s, g, state, rg) => (command) => {
        let matches = [];

        for(let cmd of state.commands) {
            if(cmd.startsWith(command)) {
                matches.push(cmd);
            }
        }

        return matches.length > 0 ? matches : null;
    },
    currentHistory: (s, g, state, rg) => () => {
        return state.history[state.historyIndex];
    }
};