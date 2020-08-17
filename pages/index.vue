<template>
  <div class="terminal is-dark">
    <div class="flex-container">
      <div class="log-list"></div>
      <div class="input-area">
        <span>></span>
        <input type="text">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Terminal',
}
</script>

<style>
  .terminal {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #222222;

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  .terminal::-webkit-scrollbar {
    display: none;
  }

  .flex-container {
    display: flex;
    flex-flow: column;
    height: 100%;
  }

  .flex-container .log-list {
    overflow-y: scroll;
    flex-grow: 2;
    height: calc(100vh - 50px);
    width: 100%;

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  } .log-list::-webkit-scrollbar {
         display: none;
  }

  .flex-container .input-area {
    width: 100%;
    flex-grow: 0;
    height: 50px;
    display: flex;
    flex-flow: row;
    align-items: flex-end;
    justify-items: center;

    font-family: "Courier", monospace;
    font-size: 1.2em;
    color: mediumseagreen;
  }

  .flex-container .input-area span {
    height: 100%;
    padding-top: 12px;
    padding-left: 12px;
    font-weight: bold;
  }

  .flex-container .input-area input {
    height: 100%;
    width: 100%;
    padding-left: 20px;
    padding-right: 40px;

    background: transparent;
    border: none;

    caret-color: transparent;

    font-family: "Courier", monospace;
    font-size: 1.2em;
    color: mediumseagreen;
  }
  .flex-container .input-area input:focus{
    outline: none;
  }

  body, html {
    margin: 0 !important;
    overflow: hidden !important;
    padding: 0 !important;
    width: 100% !important;
    height: 100vh !important;
  }
</style>
