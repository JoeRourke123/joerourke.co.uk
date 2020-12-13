export const state = () => ({
    email: () => {
        return `Your wish is my command... you can get in touch me with on:<br /><a href='mailto://${this.state.info.email}'>${this.state.info.email}</a>`;
    },
    github: () => {
        this.dispatch("openExternalLink", this.state.info.github);
    },
    linkedin: () => {
        this.dispatch("openExternalLink", this.state.info.linkedin);
    },
    "uname -a": () => {
        return `
        <div class="textBlock">
            portfolio site version 2.0<br/>
            using software:<br/>
            &nbsp; * nuxt (build ^2.14.0)<br />
            developed with:<br />
            &nbsp; * my slightly decrepid 2015 15" MacBook Pro<br />
            &nbsp; * sheer determination, plenty of bugs, and many cups of tea
        </div>`;
    },
    sudo: () => {
        return `This account is not in the sudoers file. This incident will be reported.`
    },
    lightmode: () => {
        return `I'm sorry Dave, I'm afraid I can't do that`;
    },
    "": () => {
        return ``;
    },
    clear: () => {
        this.state.lines = -1;
        this.state.log = [];
        this.state.results = [];
        return "";
    },
    resume: () => {
        let result = ``;
        for(let i = this.state.info.resume.workplaces.length - 1; i >= 0; i--) {
            result += this.state.info.resume.workplaces[i];
            result += `<strong>${this.state.info.roles[i]}</strong>`;
            result += `<br /><div class="wideTextBlock">${this.state.info.resume.descriptions[i]}</div>`;
            result += "<span>------------------------------------------------</span><br />"
        }
        
        return result;
    },
    about: () => {
        return this.state.info.about.ascii + this.state.info.about.bio;
    },
    now: () => {
        let result = ``;
        for(let project of this.state.info.now) {
            result += `* ` + project + `<br />`
        }

        return result;
    },
    projects: () => {
        let result = ``;
        for(let project in this.state.info.projects) {
            result += `* ${project} - ${this.state.info.projects[project]}<br />`
        }

        return result;
    }
});

export const actions = () => ({
    openExternalLink: (store, url) => {
        window.open(url, "_blank");
    }
})