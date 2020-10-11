<template>
  <div class="terminal is-dark">
    <div class="flex-container">
      <div class="log-list">
        <div class="command" v-for="(line, index) in log">
          <span class="line" v-if="lines === index">
            <span class="is-yellow">joe-rourke</span>@<span class="is-red">portfolio</span> > <span @keydown="commChanged" id="editor" :contenteditable="lines === index"></span><span id="caret"></span>
          </span>
          <span v-else>
            <span class="is-yellow">joe-rourke</span>@<span class="is-red">portfolio</span> > {{ line }}
          </span>
          <div class="results" v-if="index < lines">
            <br />
            <span v-html="results[index]"></span>
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
      command: "",
      lines: 0,
      log: [""],

      results: [],

      caretOn: false,

      viewingIndex: 0,
    }
  },
  mounted() {
    setInterval(() => {
      if(document.getElementById("caret") != null) {
        if(document.getElementById("caret").innerText === "▋") {
          document.getElementById("caret").innerText = "";
        } else {
          document.getElementById("caret").innerText = "▋";
        }
      }
    }, 500);

    this.focusInput();
  },
  methods: {
    commChanged(e) {
      console.log(e);
      try {
        if(e.which === 13) {
          e.preventDefault();

          this.log[this.lines] = e.target.innerText;

          this.lines++;
          this.viewingIndex = this.lines;

          this.runCommand(this.lines - 1, this.log[this.lines - 1]);

          this.log.push("");

          setTimeout(() => {
            this.focusInput();
          }, 75);
        } else if(e.which === 38 && this.viewingIndex > 0) {
          e.target.innerText = this.log[--this.viewingIndex];
        } else if(e.which === 40) {
          if(this.viewingIndex < this.lines) {
            e.target.innerText = this.log[++this.viewingIndex];
          }
        } else if(e.which === 37 || e.which === 39) {
          e.preventDefault();
        }
      } catch(e) {
        console.log(e);
      }
    },
    focusInput() {
      if(document.getElementById("editor")) {
        document.getElementById("editor").focus();
      }
    },
    runCommand(index, command) {
      let parsedArgs = command.toLowerCase().split(" ");
      let commOne = parsedArgs[0];

      switch(commOne) {
        case "hello":
          this.results[index] = "Hello there!";
          break;
        case "clear":
          break;
        case "github":
        case "linkedin":
          let url = this.$store.state["urls"][commOne];
          this.results[index] = "";
          window.open(url, "_blank");
          break;
        case "help":
          let helpData = this.$store.state[commOne];
          this.results[index] = "";

          for(const key in helpData) {
            this.results[index] += `${key}</br>`;
            for(const comm in helpData[key]) {
              this.results[index] += `&emsp;&emsp;${comm}&emsp;&emsp;${ helpData[key][comm] }</br>`
            }
          }

          break;
        default:
          this.results[index] = `${commOne} is not a recognised command.<br /> Run 'help' to see the available commands.`
      }
    }
  },
}
</script>

<style>
  .terminal {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 20px;
    overflow-y: scroll;
    overflow-x: hidden;

    caret-color: transparent;

    font-family: "Courier", monospace;
    background-color: #222222;
    color: #F5F5F5;

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
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
</style>
