<template>
  <div class="terminal is-dark" id="terminal">
    <div class="flex-container" id="flex-container">
      <div class="log-list" id="log-list">
        <div class="command" v-if="!$store.state.history.includes('clear')">
          <span class="line">
            Welcome to Joe's portfolio shell.<br />
            For more information and assistance, run 'help'.<br /><br />
          </span>
        </div>
        <div class="command" :key="index" v-for="(command, index) in log">
          <span class="line">
            <span class="is-yellow">joe-rourke</span>@<span class="is-red"
              >portfolio</span
            >
            $
            <span v-if="lines === index && readyForNextLine">
              <span @keydown="commChanged" id="editor" contenteditable></span
              ><span class="caret"></span>
            </span>
            <span v-else>
              {{ command }}
            </span>
          </span>
          <div class="results" v-if="index < lines || !readyForNextLine">
            <span v-html="results[index]" v-if="index < lines"></span>
            <span v-html="currentResult" v-else></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Terminal",
  data() {
    return {
      caretInterval: null,
      caretOn: false,
    };
  },
  computed: {
    log() {
      return this.$store.state.log;
    },
    lines() {
      return this.$store.state.lines;
    },
    currentResult() {
      return this.$store.state.currentResult;
    },
    results() {
      return this.$store.state.results;
    },
    readyForNextLine() {
      return this.$store.state.readyForNextLine;
    },
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if(e.keyCode === 67 && e.ctrlKey && this.$store.state.history.length > 0) {
        this.$store.commit("setHaltNextLine", false);
        this.$store.commit("postCommand", this.$store.state.history[0]);
      }
    })

    this.caretInterval = setInterval(() => {
      let carets = document.getElementsByClassName("caret");
      for(let caret of carets) {
        caret.innerText = (this.caretOn) ? "▋" : "";
      }
      this.caretOn = !this.caretOn;
    }, 550);

    setInterval(() => {
      this.focusInput();
    }, 50);
  },
  beforeDestroy() {
    clearInterval(this.caretInterval);
  },
  methods: {
    async commChanged(e) {
      console.log(e);
      if (e.which === 13) {
        // Enter pressed
        e.preventDefault();
        await this.$store.dispatch("handleCommand", e.target.innerText);
      } else if (e.which === 9) {
        // Tab pressed
        e.preventDefault();

        let tabResults = this.$store.getters.tabCompletion(e.target.innerText);

        if (tabResults != null) {
          if (tabResults.length === 1) {
            e.target.innerText = tabResults[0];
            let range = document.createRange(); //Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(e.target); //Select the entire contents of the element with the range
            range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
            let selection = window.getSelection(); //get the selection object (allows you to change selection)
            selection.removeAllRanges(); //remove any selections already made
            selection.addRange(range); //make the range you have just created the visible selection
          } else {
            this.$store.dispatch("showTabResults", {
              command: e.target.innerText,
              results: tabResults,
            });
          }
        }
      } else if (e.which === 38) {
        e.preventDefault();
        this.$store.commit("historyUp");
        e.target.innerText = this.$store.getters.currentHistory() ?? "";
      } else if (e.which === 40) {
        e.preventDefault();
        this.$store.commit("historyDown");
        e.target.innerText = this.$store.getters.currentHistory() ?? "";
      } else if(e.which === 37 || e.which === 39) {
        e.preventDefault();
      }
    },
    focusInput() {
      if (document.getElementById("editor")) {
        document.getElementById("editor").focus();
      }
    },
    scrollToBottom() {
      let element = document.getElementById("terminal");
      element.scrollTop = element.scrollHeight + 9999;
      element = document.getElementById("log-list");
      element.scrollTop = element.scrollHeight + 9999;
      element = document.getElementById("flex-container");
      element.scrollTop = element.scrollHeight + 9999;
    },
  },
};
</script>

<style>
.terminal {
  width: 100vw;
  height: calc(100vh - 20px);
  margin: 0;
  padding: 20px;
  overflow-y: scroll;
  overflow-x: hidden;

  caret-color: transparent;

  font-family: "Courier", monospace;
  background-color: #222222;
  color: #f5f5f5;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.terminal::-webkit-scrollbar {
  display: none;
}

[contenteditable]:focus {
  outline: 0 solid transparent;
}

body,
html {
  margin: 0 !important;
  overflow: hidden !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100vh !important;
  background-color: #222222;
}

.is-yellow {
  color: orange;
}

.is-red {
  color: indianred;
}

.textBlock {
  max-width: 75ch;
}

.wideTextBlock {
  max-width: 100ch;
}

pre.workplaceTitle {
  font-size: 8px;
  padding-left: 0;
  background: transparent;
}

a {
  color: mediumseagreen;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

pre {
  color: whitesmoke;
  background-color: #222222;
}

strong {
  color: whitesmoke;
}
</style>
