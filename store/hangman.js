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
    guess(state, letter) {

    },
    incrementRound(state) {
        state.game.round += 1;
    },
    setGame(state, game) {
        state.game = game;
    }
}

function addFieldBehaviour(el, store) {
    let currentRound = store.state.hangman.game.round;
    el.contentEditable = true;
    el.onkeydown = (e) => {
        if (e.which === 13 && e.target.innerText.length <= 1) {
            store.commit("hangman/guess", e.target.innerText);
        } else if (e.which === 13 && e.target.innerText.length > 1) {
            store.commit("hangman/incrementRound");

            let result = `You must only enter one, letter please try again.<br />`;
            result += `<span>><span id="hangmanGuess${store.state.hangman.game.round}"></span></span>`;

            store.commit("appendResults", result);

            setTimeout(() => { addFieldBehaviour(document.getElementById("hangmanGuess" + store.state.hangman.game.round), store); }, 75);
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

    result += `<span>><span id="hangmanGuess"></span></span>`;

    store.commit("appendResults", result);

    setTimeout(() => {
        let hmGuess = document.getElementById("hangmanGuess");
        addFieldBehaviour(hmGuess, store);
    }, 75)
}