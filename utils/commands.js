export default {
    email (state) {
        state.currentResult += `Your wish is my command... you can get in touch me with on:<br /><a href='mailto://${state.info.email}'>${this.state.info.email}</a>`;
    },
    github (state) {
        window.open(state.info.github, "_blank");
    },
    linkedin (state) {
        window.open(state.info.linkedin, "_blank");
    },
    ["uname -a"] (state) {
        state.currentResult += `
        <div class="textBlock">
            portfolio site version 2.0<br/>
            using software:<br/>
            &nbsp; * nuxt (build ^2.14.0)<br />
            developed with:<br />
            &nbsp; * my slightly decrepid 2015 15" MacBook Pro<br />
            &nbsp; * sheer determination, plenty of bugs, and many cups of tea
        </div>`;
    },
    sudo (state) {
        state.currentResult += `This account is not in the sudoers file. This incident will be reported.`
    },
    lightmode (state) {
        state.currentResult += `I'm sorry Dave, I'm afraid I can't do that`;
    },
    "" (state) {
        state.currentResult += ``;
    },
    clear (state) {
        state.lines = 0;
        state.log = [''];
        state.results = [];
        state.hasBeenCleared = true;
    },
    resume (state) {
        let result = ``;
        for(let i = state.info.resume.workplaces.length - 1; i >= 0; i--) {
            result += state.info.resume.workplaces[i];
            result += `<strong>${state.info.roles[i]}</strong>`;
            result += `<br /><div class="wideTextBlock">${state.info.resume.descriptions[i]}</div>`;
            result += "<span>------------------------------------------------</span><br />"
        }
        
        state.currentResult += result;
    },
    about (state) {
        state.currentResult += state.info.about.ascii + state.info.about.bio;
    },
    now (state) {
        let result = ``;
        for(let project of state.info.now) {
            result += `* ` + project + `<br />`
        }

        state.currentResult += result;
    },
    projects (state) {
        let result = ``;
        for(let project in state.info.projects) {
            result += `* ${project} - ${state.info.projects[project]}<br /><br />`
        }

        state.currentResult += result;
    },
    help (state) {
        let result = '';
        for(let group in state.groupings) {
            result += `* <strong>${group}</strong><br />`;
            for(let commIndex of state.groupings[group]) {
                result += `&nbsp;&nbsp;&nbsp;&nbsp;- ${state.commands[commIndex]} &nbsp;&nbsp;&nbsp;&nbsp;${state.descriptions[commIndex]}<br />`;
            }
            result += '<br />';
        }

        state.currentResult += result;
    }
};