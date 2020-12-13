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
                <span @keydown="commChanged" id="editor" contenteditable></span>
                <span id="caret"></span>
              </span>
              <span v-else>
                {{ command }}
              </span>
          </span>
          <div class="results" v-if="index < lines || !readyForNextLine">
            <span v-if="index < lines">
              {{ results[index] }}
            </span>
            <span v-else>
              {{ currentResult }}
            </span>
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
        viewingIndex: 0,
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
        e.preventDefault();
        
        try {
          if (e.which === 13) {   // Enter pressed

          } else if(e.which === 9) {    // Tab pressed
            this.tabCompletion(e);
          } else if (e.which === 38 && this.viewingIndex > 0) {   // Go back in history (down pressed)
            e.target.innerText = this.history[--this.viewingIndex];
          } else if (e.which === 40) {
            if (this.viewingIndex < this.history.length - 1) {    // Go forward in history (up pressed)
              e.target.innerText = this.history[++this.viewingIndex];
            } else if(this.viewingIndex === this.history.length - 1) {
              e.target.innerText = "";
            }
          } else if (e.which === 37 || e.which === 39) {        // Left and right buttons pressed
          }
        } catch (e) {
          console.error(e);
        }
      },
      focusInput() {
        if (document.getElementById("editor")) {
          document.getElementById("editor").focus();
        }
      },
      handleFormEnter(text) {
        this.results[this.lines] += `${this.form.promptText} ${text}<br />`;
        this.form.promptText = ["Enter your email:", "Your message:", "Enter your name:"][this.form.inputIndex];

        if(this.form.inputIndex === 0) {
          this.form.name = text;
        } else if(this.form.inputIndex === 1) {
          this.form.email = text;
        } else if(this.form.inputIndex === 2) {
          this.form.content = text;

          try {
            this.$store.dispatch("sendEmail", this.form);
            this.results[this.lines] += "<br />Thanks for your message. I'll be sure to get back to you as soon as possible!";
          } catch(e) {
            this.results[this.lines] += "<br />" + e;
          }

          this.form.active = false;
          this.form.inputIndex = 0;

          this.beginNextLine();
          return;
        }

        this.form.inputIndex++;
      },
      beginNextLine() {
        this.lines++;
        this.viewingIndex = this.history.length;

        this.readyForNextLine = true;

        this.log.push("");

        setTimeout(() => {
          this.focusInput();
        }, 75);
      },
      tabCompletion(e) {
        let command = e.target.innerText;
        let help = this.$store.state.help;

        for(let key in help) {
          for(let comm in help[key]) {
            if(comm.startsWith(command)) {
              e.target.innerText = comm;
              e.target.focus();
              document.execCommand('selectAll', false, null);
              document.getSelection().collapseToEnd();
              return;
            }
          }
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
