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


    async handleCommand(store, command) {
        store.commit("preCommand", command);

        let runnable = splitCommand(command);

        if(runnable[0] in this._actions) {
            await store.dispatch(runnable[0], command);
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

        setTimeout(() => { 
            let el = document.getElementById("editor")
            el.innerText = command;
            let range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(el);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            let selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }, 60);
    }
}
