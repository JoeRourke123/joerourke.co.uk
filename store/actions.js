import commandActions from '../utils/commands.js';

function splitCommand(command) {
    let result = "";
    let spaceSplit = command.split(" ");
    let i = 0;
    for (; i < spaceSplit.length; i++) {
        if (i === 0) {
            result += spaceSplit[i];
        } else if (spaceSplit[i].startsWith("-")) {
            result += ' ' + spaceSplit[i];
        } else {
            break;
        }
    }

    return [result, ...spaceSplit.slice(i, spaceSplit.length)];
}

export const strict = false;

export default {
    sendEmail(store, { name, email, content }) {
        this.$axios.$post("https://formspree.io/f/xbjpgwnw", {
            email: email,
            _subject: "Form Submission from " + name,
            message: content,
        }).catch((e) => {
            throw "Something went wrong when sending the form!";
        });
    },
    ...commandActions,


    handleCommand(store, command) {
        store.commit("preCommand", command);

        let runnable = splitCommand(command);

        if(runnable[0] in this._actions) {
            store.dispatch(runnable[0], command);
        } else {
            store.commit("appendResults", `${runnable[0]}: command not found.`);
        }

        store.commit("postCommand", command);
    },

    showTabResults(store, {command, results}) {
        store.commit("preCommand", command);

        for(let res of results) {
            store.commit("appendResults", res + "&nbsp;&nbsp;&nbsp;&nbsp;");
        }

        store.commit("postCommand", command);
    }
}