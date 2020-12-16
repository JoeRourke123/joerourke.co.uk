import { hangmanFunctionality } from '../store/hangman';

export default {
    email (store, command) {
        store.commit("appendResults", `Your wish is my command... you can get in touch me with at <a target="_blank" href='mailto://${store.state.info.email}'>${store.state.info.email}</a><br /><br />`);
    },
    github (store, command) {
        window.open(store.state.info.github, "_blank");
    },
    linkedin (store, command) {
        window.open(store.state.info.linkedin, "_blank");
    },
    ["uname -a"] (store, command) {
        store.commit("appendResults", `
        <div class="textBlock">
            portfolio site version 2.0<br/>
            using software:<br/>
            &nbsp; * nuxt (build ^2.14.0)<br />
            developed with:<br />
            &nbsp; * my slightly decrepid 2015 15" MacBook Pro<br />
            &nbsp; * sheer determination, plenty of bugs, and many cups of tea
        </div>`);
    },
    sudo (store, command) {
        store.commit("appendResults", `This account is not in the sudoers file. This incident will be reported.`);
    },
    lightmode (store, command) {
        store.commit("appendResults", `I'm sorry Dave, I'm afraid I can't do that`);
    },
    "" (store, command) {},
    clear (store, command) {
        store.commit("clearTerminal");
    },
    resume (store, command) {
        let state = store.state;
        let result = ``;
        for(let i = state.info.resume.workplaces.length - 1; i >= 0; i--) {
            result += state.info.resume.workplaces[i];
            result += `<strong>${state.info.resume.roles[i]}</strong>`;
            result += `<br /><div class="wideTextBlock">${state.info.resume.descriptions[i]}</div>`;
            result += "<span>------------------------------------------------</span><br />"
        }
        
        store.commit("appendResults", result);
    },
    about (store, command) {
        store.commit("appendResults", store.state.info.about.ascii + store.state.info.about.bio);
    },
    now (store, command) {
        let state = store.state;

        let result = ``;
        for(let project of state.info.now) {
            result += `* ` + project + `<br />`
        }

        store.commit("appendResults", result);
    },
    projects (store, command) {
        let state = store.state;

        let result = ``;
        for(let project in state.info.projects) {
            result += `* ${project} - ${state.info.projects[project]}<br /><br />`
        }

        store.commit("appendResults", result);
    },
    help (store, command) {
        let state = store.state;

        let result = '';
        for(let group in state.groupings) {
            result += `* <strong>${group}</strong><br />`;
            for(let commIndex of state.groupings[group]) {
                result += `&nbsp;&nbsp;&nbsp;&nbsp;- ${state.commands[commIndex]} &nbsp;&nbsp;&nbsp;&nbsp;${state.descriptions[commIndex]}<br />`;
            }
            result += '<br />';
        }

        store.commit("appendResults", result);
    },
    hangman (store, command) {
        hangmanFunctionality(store);
    },
    coffee(store, command) {
        window.open(store.state.info.buy_a_coffee, "_blank");
    },
    async haha(store, command) {
        store.commit("appendResults", "Loading...");
        let joke = await this.$axios.$get("https://icanhazdadjoke.com/", {
            headers: {
                "Accept": "text/plain"
            }
        });

        store.commit("setResults", joke + "<br /><br />");
    },
    async doggo(store, command) {
        store.commit("appendResults", "Loading... cuteness pending...");
        let doggoEntry = await this.$axios.$get("https://api.thedogapi.com/v1/images/search?api_key=2f37a67a-d80a-4ce0-8d6e-b902d99de000&mime_types=gif");
        store.commit("setResults", `<br /><img src="${ doggoEntry[0]['url'] }" /><br /><br />`)
    },
    lauren(store) {
        store.commit("appendResults", "I love you so so much baby :p<br /><br />");
    },
};