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
        state.log[state.lines] = command;
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
    replaceLastLine(state, result) {
        state.currentResult = state.currentResult.substring(0, state.currentResult.lastIndexOf("<br />")) + "<br />" + result;
    },
    postCommand(state, command) {
        if (!state.haltNextLine) {
            state.readyForNextLine = true;

            if (!state.hasBeenCleared) {
                state.log.push("");
                state.lines++;

                state.results.push(state.currentResult);
            }

            state.currentResult = "";
            state.historyIndex = -1;
        }

        if(state.hangman.game?.currentCaretInterval != null) {
            clearInterval(state.hangman.game.currentCaretInterval);
        }

        state.hasBeenCleared = false;
    },
    clearTerminal(state) {
        state.lines = 0;
        state.log = [''];
        state.results = [];
        state.hasBeenCleared = true;
    },
}