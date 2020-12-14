<template>
  <div class="terminal is-dark" id="terminal">
    <div class="flex-container" id="flex-container">
      <div class="log-list" id="log-list">
        <div class="command">
          <span class="line">
            This is a work in progress. Feel free to try it out though. Run 'help' if you need any :)
          </span>
        </div>
        <div class="command" :key="index" v-for="(command, index) in log">
          <span class="line">
            <span class="is-yellow">joe-rourke</span>@<span class="is-red">portfolio</span> $ 
              <span v-if="lines === index && readyForNextLine">
                <span @keydown="commChanged" id="editor" contenteditable></span><span id="caret"></span>
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
    name: 'Terminal',
    data() {
      return {
        caretInterval: null,
      }
    },
    computed: {
      log() { return this.$store.state.log; },
      lines() { return this.$store.state.lines; },
      currentResult() { return this.$store.state.currentResult; },
      results() { return this.$store.state.results; },
      readyForNextLine() { return this.$store.state.readyForNextLine; },
    },
    mounted() {
      this.caretInterval = setInterval(() => {
        if (document.getElementById("caret") != null) {
          if (document.getElementById("caret").innerText === "▋") {
            document.getElementById("caret").innerText = "";
          } else {
            document.getElementById("caret").innerText = "▋";
          }
        }
      }, 550);

      setInterval(() => {
        this.focusInput();
      }, 50);
    },
    beforeDestroy() {
      clearInterval(this.caretInterval);
    },
    methods: {
      commChanged(e) {        
        if (e.which === 13) {   // Enter pressed
          e.preventDefault();
          this.$store.dispatch('handleCommand', e.target.innerText);
        } else if(e.which === 9) {    // Tab pressed
          e.preventDefault();

          let tabResults = this.$store.getters.tabCompletion(e.target.innerText);

          if(tabResults != null) {
            if(tabResults.length === 1) {
              e.target.innerText = tabResults[0];
            } else {
              this.$store.dispatch('showTabResults', {command: e.target.innerText, results: tabResults});
            }
          }
          
          let range = document.createRange();//Create a range (a range is a like the selection but invisible)
          range.selectNodeContents(e.target);//Select the entire contents of the element with the range
          range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
          let selection = window.getSelection();//get the selection object (allows you to change selection)
          selection.removeAllRanges();//remove any selections already made
          selection.addRange(range);//make the range you have just created the visible selection
        } else if(e.which === 38) { 
          e.preventDefault();
          this.$store.commit('historyUp');
          e.target.innerText = this.$store.getters.currentHistory() ?? "";
        } else if(e.which === 40) {
          e.preventDefault();
          this.$store.commit('historyDown');
          e.target.innerText = this.$store.getters.currentHistory() ?? "";
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
  }
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
    color: #F5F5F5;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .terminal::-webkit-scrollbar {
    display: none;
  }

  [contenteditable]:focus {
    outline: 0 solid transparent;
  }

  body, html {
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
