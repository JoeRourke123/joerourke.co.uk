export default {
    historyUp(state) {
        if (state.historyIndex < state.history.length - 1) {
            state.historyIndex++;
        }
    },
    historyDown(state) {
        if (state.historyIndex >= 0) {
            state.historyIndex--;
        }
    },
    preCommand(state, command) {
        state.readyForNextLine = false;
        state.hasBeenCleared = false;
        state.history.unshift(command);
    },
    setHaltNextLine(state, halt) {
        state.haltNextLine = halt;
    },
    appendResults(state, result) {
        state.currentResult += result;
    },
    setResults(state, result) {
        state.currentResult = result;
    },
    postCommand(state, command) {
        if (!state.haltNextLine) {
            state.readyForNextLine = true;

            if (!state.hasBeenCleared) {
                state.log[state.lines++] = command;
                state.log.push("");

                state.results.push(state.currentResult);
            }

            state.currentResult = "";
            state.historyIndex = -1;
        } else if(!state.hasBeenCleared) {
            state.log[state.lines] = command;
        }

        state.hasBeenCleared = false;
    },
    clearTerminal(state) {
        state.lines = 0;
        state.log = [''];
        state.results = [];
        state.hasBeenCleared = true;
    }
}