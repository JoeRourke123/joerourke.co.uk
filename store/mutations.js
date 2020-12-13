import commandMutations from '../utils/commands.js';

function splitCommand(command) {
    let result = "";
    let spaceSplit = command.split(" ");
    let i = 0;
    for(; i < spaceSplit.length; i++) {
        if(i === 0) {
            result += spaceSplit[i];
        } else if(spaceSplit[i].startsWith("-")) {
            result += ' ' + spaceSplit[i];
        } else {
            break;
        }
    }

    return [result, ...spaceSplit.slice(i, spaceSplit.length)];
}

export default {
    historyUp(state) {
        if(state.historyIndex < state.history.length - 1) {
            state.historyIndex++;
        }
    },
    historyDown(state) {
        if(state.historyIndex >= 0) {
            state.historyIndex--;
        }
    },
    commandMutation(state, command) {
        state.readyForNextLine = false;
        state.hasBeenCleared = false;

        let commandSplit = splitCommand(command);

        if(commandSplit[0] in this._mutations) {
            this.commit(commandSplit[0]);
        } else {
            state.currentResult = `${commandSplit[0]}: command not found`;
        }

        state.readyForNextLine = true;

        if(!state.hasBeenCleared) {
            state.log[state.lines++] = command;
            state.log.push("");

            state.results.push(state.currentResult);
        }
        
        state.history.unshift(command);
        state.currentResult = "";
        state.historyIndex = -1;
    },
    ...commandMutations
}