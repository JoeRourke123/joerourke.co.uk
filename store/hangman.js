export const strict = false;

export const state = () => ({
    art: [`
    +---+
    |   |
        |
        |
        |
        |
    =========`, `
    +---+
    |   |
    O   |
        |
        |
        |
    =========`, `
    +---+
    |   |
    O   |
    |   |
        |
        |
    =========`, `
    +---+
    |   |
    O   |
   /|   |
        |
        |
    =========`, `
    +---+
    |   |
    O   |
   /|\\  |
        |
        |
    =========`, `
    +---+
    |   |
    O   |
   /|\\  |
   /    |
        |
      =========`, `
    +---+
    |   |
    O   |
   /|\\  |
   / \\  |
        |
    =========`],

    words: ["abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing", "buzzwords", "caliph", "cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", "daiquiri", "dirndl", "disavow", "dizzying", "duplex", "dwarves", "embezzle", "equip", "espionage", "euouae", "exodus", "faking", "fishhook", "fixable", "fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove", "frazzled", "frizzled", "fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", "giaour", "gizmo", "glowworm", "glyph", "gnarly", "gnostic", "gossip", "grogginess", "haiku", "haphazard", "hyphen", "iatrogenic", "icebox", "injury", "ivory", "ivy", "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest", "jazzy", "jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole", "khaki", "kilobyte", "kiosk", "kitsch", "kiwifruit", "klutz", "knapsack", "larynx", "lengths", "lucky", "luxury", "lymph", "marquis", "matrix", "megahertz", "microwave", "mnemonic", "mystify", "naphtha", "nightclub", "nowadays", "numbskull", "nymph", "onyx", "ovary", "oxidize", "oxygen", "pajama", "peekaboo", "phlegm", "pixel", "pizazz", "pneumonia", "polka", "pshaw", "psyche", "puppy", "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", "quizzes", "quorum", "razzmatazz", "rhubarb", "rhythm", "rickshaw", "schnapps", "scratch", "shiv", "snazzy", "sphinx", "spritz", "squawk", "staff", "strength", "strengths", "stretch", "stronghold", "stymied", "subway", "swivel", "syndrome", "thriftless", "thumbscrew", "topaz", "transcript", "transgress", "transplant", "triphthong", "twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vixen", "vodka", "voodoo", "vortex", "voyeurism", "walkway", "waltz", "wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", "whomever", "wimpy", "witchcraft", "wizard", "woozy", "wristwatch", "wyvern", "xylophone", "yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", "zigzagging", "zilch", "zipper", "zodiac", "zombie"],
    game: null,
});

export const mutations = {
    setGame(state, game) {
        state.game = game;
    },
    addToWrong(state, letter) {
        state.game.wrong.push(letter);
    },
    addToGuesses(state, letter) {
        state.game.guessed.push(letter);
    }
}

export const actions = {
    guess(store, letter) {
        let fullyGuessed = true;
        let result = "<br /><br />";
        let hasGuessed = store.state.game.guessed.includes(letter) || store.state.game.wrong.includes(letter);
        let inWord = store.state.game.word.includes(letter);

        let attempts = store.state.game.wrong.length;
        let attemptsAllowed = store.state.art.length;
        
        if (hasGuessed) {
            result += `You have already guessed '${letter}'!<br />`;
        } else if (inWord) {
            store.commit("addToGuesses", letter);
        } else if (attempts < attemptsAllowed) {
            result += `Wrong... '${letter}' is not in the word!<br />`;
            store.commit("addToWrong", letter);
            attempts++;
        }

        if (attempts > 0) {
            result += `<pre style="width: 30%; background: transparent;">${store.state.art[attempts - 1]}</pre><br />`;
        }

        if (!inWord && attempts >= attemptsAllowed) {
            result += `Uh oh... you've died... the word was '${store.state.game.word}'<br />`;
            store.commit("appendResults", result, { root: true });
            store.commit("setHaltNextLine", false, { root: true });
            store.commit("postCommand", null, { root: true });
            return;
        } else {

            if(store.state.game.wrong.length > 0) {
                result += `Wrong guesses: ${JSON.stringify(store.state.game.wrong)}<br />`;
            }

            for (let char of store.state.game.word) {
                if (store.state.game.guessed.includes(char)) {
                    result += char + " ";
                } else {
                    result += "_ ";
                    fullyGuessed = false;
                }
            }

            result += "<br />";
        }

        if(fullyGuessed) {
            store.commit("appendResults", `<br /><br />Yay! You guessed the word '${store.state.game.word}'.<br />`, { root: true });
            store.commit("setHaltNextLine", false, { root: true });
            store.commit("postCommand", null, { root: true });
        } else {
            store.commit("appendResults", result, { root: true });
        }
    }
}

function addFieldBehaviour(el, store) {
    el.contentEditable = true;
    el.onkeydown = (e) => {
        if(e.which === 13) {
            e.preventDefault();
            el.blur();

            el.contentEditable = false;
            el.classList.remove("hangmanGuess");

            let result = "";

            if (el.innerText.length <= 1) {
                store.dispatch("hangman/guess", el.innerText);

                if(store.state.readyForNextLine && !store.state.haltNextLine) {
                    return;
                }
            } else {
                result += `<br />You must only enter one, letter please try again.<br />`;
            }

            result += `<span>><span class="hangmanGuess"></span></span>`;

            store.commit("appendResults", result);

            setTimeout(() => { 
                let hmGuess = document.getElementsByClassName("hangmanGuess");
                addFieldBehaviour(hmGuess[hmGuess.length - 1], store); 
            }, 75);
        }
    }
    el.focus();
}

export const hangmanFunctionality = (store) => {
    let state = store.state;

    store.commit("hangman/setGame", {
        guessed: [],
        word: state.hangman.words[Math.floor(Math.random() * state.hangman.words.length)],
        round: 0,
        wrong: [],
    });

    store.commit("setHaltNextLine", true);

    let result = '';
    for (let i = 0; i < state.hangman.game.word.length; i++) {
        result += '_ ';
    }
    result += '<br />';

    result += `<span>><span class="hangmanGuess"></span></span>`;

    store.commit("appendResults", result);

    setTimeout(() => {
        let hmGuess = document.getElementsByClassName("hangmanGuess");
        addFieldBehaviour(hmGuess[hmGuess.length - 1], store);
    }, 75)
}