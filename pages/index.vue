<template>
  <div class="terminal is-dark">
    <div class="flex-container">
      <div class="log-list">
        <div class="command" v-for="(line, index) in log">
          <span class="line" v-if="lines === index && readyForNextLine">
            <span class="is-yellow">joe-rourke</span>@<span class="is-red">portfolio</span> $ <span
            @keydown="commChanged" id="editor" :contenteditable="lines === index"></span><span id="caret"></span>
          </span>
          <span v-else>
            <span class="is-yellow">joe-rourke</span>@<span class="is-red">portfolio</span> $ {{ line }}
          </span>
          <div class="results" v-if="index < lines || (index === lines && !readyForNextLine)">
            <br/>
            <span v-html="results[index]"></span>
          </div>
        </div>
        <div class="form" v-if="!readyForNextLine && form.active">
          <span>{{ form.promptText }}</span> <span id="editor" @keydown="commChanged" contenteditable></span><span id="caret"></span>
        </div>
        <div class="hangman" v-else-if="!readyForNextLine && hangman.active">
          <span>Your Guess: </span><span id="editor" @keydown="commChanged" contenteditable></span><span id="caret"></span>
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
        lines: 0,

        log: [""],
        history: [],
        results: [],

        form: {
          active: false,
          inputIndex: 0,
          promptText: "Enter your name:",
          name: "",
          email: "",
          content: "",
        },

        hangman: {
          active: false,
          guessed: [],
          word: "",
          wrong: [],
        },

        readyForNextLine: true,

        viewingIndex: 0,
      }
    },
    mounted() {
      setInterval(() => {
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
    methods: {
      commChanged(e) {
        console.log(e);
        try {
          if (e.which === 13) {
            e.preventDefault();

            if (this.form.active) {
              this.handleFormEnter(e.target.innerText);
              e.target.innerText = "";
              return;
            } else if(this.hangman.active) {
              this.handleHangman(e.target.innerText);
              e.target.innerText = "";
              return;
            }

            this.log[this.lines] = e.target.innerText;
            if(this.history[this.history.length - 1] !== e.target.innerText) {
              this.history.push(e.target.innerText);
            }

            this.runCommand(this.lines, this.log[this.lines]);

            if (this.readyForNextLine) {
              this.beginNextLine();
            }
          } else if (e.which === 38 && this.viewingIndex > 0) {
            e.target.innerText = this.history[--this.viewingIndex];
          } else if (e.which === 40) {
            if (this.viewingIndex < this.history.length - 1) {
              e.target.innerText = this.history[++this.viewingIndex];
            } else if(this.viewingIndex === this.history.length - 1) {
              e.target.innerText = "";
            }
          } else if (e.which === 37 || e.which === 39) {
            e.preventDefault();
          }
        } catch (e) {
          console.log(e);
        }
      },
      focusInput() {
        if (document.getElementById("editor")) {
          document.getElementById("editor").focus();
        }
      },
      runCommand(index, command) {
        let parsedArgs = command.toLowerCase().split(" ");
        let commOne = parsedArgs[0];

        switch (commOne) {
          case "hello":
            this.results[index] = "Hello there!";
            break;
          case "clear":
            this.lines = -1;
            this.viewingIndex = -1;
            this.log = [];
            this.results = [];

            if (index === 0) {
              document.getElementById("editor").innerText = "";
            }
            break;
          case "light-mode":
            this.results[index] = "I'm sorry Dave, I'm afraid I can't do that.<br />";
            break;
          case "list":
            this.showResume(index);
            break;
          case "about":
            let ascii = this.$store.state["ascii"];
            this.results[index] = ascii;
            this.results[index] += "<div class='textBlock'>";
            this.results[index] += this.$store.state["about"];
            this.results[index] += "</div>";
            break;
          case "now":
            this.results[index] += "<br />* Rebuilding my A Level coursework as a progressive web app using Vue.JS and Django.";
            this.results[index] += "<br />* A music app which generates music through an RNN";

            let now = this.$store.state['now'];

            this.results[index] = "* " + now[0];
            for(let i = 1; i < now.length; i++) {
              this.results[index] += "<br />* " + now[i];
            }

            break;
          case "info":
            this.results[index] = `
            <div class="textBlock">
              portfolio site version 1.0<br/>
              using software:<br/>
              &nbsp; - nuxt (build ^2.14.0)<br />
              developed with:<br />
              &nbsp; - my slightly decrepid 2015 15" MacBook Pro<br />
              &nbsp; - sheer determination, plenty of bugs, and many cups of tea
            </div>
          `;
            break;
          case "email":
            this.results[index] = "Your wish is my command... you can get in touch me with on:<br />";
            this.results[index] += `<a href='mailto://${this.$store.state['email']}'>${this.$store.state['email']}</a>`;
            break;
          case "hangman":
            this.readyForNextLine = false;
            this.hangman.active = true;
            this.handleHangman("");
            return;
          case "github":
          case "linkedin":
            let url = this.$store.state["urls"][commOne];
            this.results[index] = "";
            window.open(url, "_blank");
            break;
          case "form":
            this.results[index] = "";
            this.form.active = true;
            this.readyForNextLine = false;
            return;
          case "help":
            this.showHelp(commOne, index);
            break;
          default:
            this.results[index] = `${commOne} is not a recognised command.<br /> Run 'help' to see the available commands.`
        }

        this.readyForNextLine = true;
      },
      showHelp(commOne, index) {
        let helpData = this.$store.state[commOne];
        this.results[index] = "";

        for (const key in helpData) {
          this.results[index] += `${key}</br>`;
          for (const comm in helpData[key]) {
            this.results[index] += `&emsp;&emsp;${comm}&emsp;&emsp;${helpData[key][comm]}</br>`
          }
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
          this.form.active = false;
          this.form.inputIndex = 0;

          this.results[this.lines] += "<br />Thank you so much for your message, I'll get back to you as soon as possible!<br />"

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
      showResume(index) {
        this.results[index] = "";

        const workplaces = this.$store.state['workplaceTitles'];
        const titles = this.$store.state['jobTitles'];
        const descriptions = this.$store.state['jobDescriptions'];

        for(let i = workplaces.length - 1; i >= 0; i--) {
          this.results[index] += workplaces[i];
          this.results[index] += `<strong>${titles[i]}</strong>`;
          this.results[index] += `<br /><div class="wideTextBlock">${descriptions[i]}</div>`;
          this.results[index] += "<span>------------------------------------------------</span><br />"
        }
      },
      handleHangman(letter) {
        let buffer = this.results[this.lines];
        this.lines++;

        if(this.hangman.guessed.length === 0 && this.hangman.wrong.length === 0 && this.hangman.word === "") {
          this.hangman.word = this.$store.state.hangmanWords[Math.floor(Math.random() * 200)];
          buffer = "";
          letter = "";
        } else if(letter.length > 1) {
          buffer += "Only enter one letter please!<br />";
        } else if(this.hangman.word.includes(letter)) {
            if(!this.hangman.guessed.includes(letter)) {
              this.hangman.guessed.push(letter);
            }
        } else if(!this.hangman.word.includes(letter) && !this.hangman.wrong.includes(letter)) {
          buffer += letter + " is not a part of the word!<br />";
          this.hangman.wrong.push(letter);

          buffer += `<pre>${ this.$store.state.hangmanAscii[this.hangman.wrong.length - 1] }</pre><br />`;

          let max = this.$store.state.hangmanAscii.length;
          if(this.hangman.wrong.length >= max) {
            buffer += `Oh no, you lost... the word was '${ this.hangman.word }'<br />`;
            this.hangman.active = false;
            this.results[--this.lines] = buffer;
            this.beginNextLine();
            return;
          }
        }

        buffer += `<br />Wrong Guesses: ${this.hangman.wrong}<br />`;
        buffer += `Word: `;
        let won = true;
        for(let letter of this.hangman.word.split("")) {
          if(this.hangman.guessed.includes(letter)) {
            buffer += letter + " ";
          } else {
            buffer += "_ ";
            won = false;
          }
        }
        buffer += "<br /><br />";

        if(won) {
          buffer += `Congratulations! You correctly guessed the word.<br />`;
          this.readyForNextLine = true;
          this.hangman.active = false;
        }

        this.lines--;
        this.results[this.lines] = buffer;
      }
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
</style>
