export const state = () => ({
  help: {
    "seeing my work": {
      "list": "lists all my previous and current experience",
      "now": "what am i working on at the moment?",
      "projects": "my favourite personal and academic projects",
      "about": "a little bit about me",
      // "blog": "a student's perspective on this and that",
    },
    "my other pages": {
      "github": "opens my GitHub page",
      "linkedin": "opens my LinkedIn page",
    },
    "getting in touch": {
      "email": "shows you my email address",
      "form": "lets you fill out a contact form",
    },
    "fun things": {
      "hangman": "fancy a game of hangman?",
      // "console-wars": "alien ships on your tail, shake 'em off",
    },
    "using the site": {
      "help": "brings you back here!",
    },
    "nerdy things": {
      // "help -v": "run help in nerd mode",
      "info": "how did this website come about",
      "light-mode": "revert the console colours",
    },
  },
  email: "hello@joerourke.co.uk",
  hello: {
    "there": "General Kenobi.",
  },
  work: {},
  about: `Hi, I am a Full Stack Engineer particularly interested in 
          machine learning. Currently, I am studying AI at Royal Holloway, University of London.
          I am also interested in politics and the environment, and how technology can be used to
          fight in these causes (check out my blog for more on this!). <br />
          I'm always on the lookout for the latest opportunities and technologies, so please do get in touch!<br />`,
  urls: {
    "github": "https://github.com/joerourke123",
    "linkedin": "https://linkedin.com/in/joe-rourke",
  },
  projects: {
    "Shortr": "my A-Level coursework project - uses NLP and a bespoke pattern matching algorithm in order to summarise" +
      " and aggregate news articles which interest the user. Built using Flask and JavaScript - the project achieved a mark of " +
      "67 out of 70. I am currently rebuilding it using Django and Vue.JS",
    "forkie": "A first-year university coursework project, where we were given the requirements of a file repository system and required to implement it." +
      " This was for an advanced programming module I was selected for. " +
      "This project was built in a small team where I had to guide and teach most of the members how to use the Flask Python library. It achieved an A grade.",
    "metamap": "A geolocation based social network built for Royal Hackaway - the biggest hackathon in Surrey. The app was developed" +
      "using Flutter and the backend with Flask and MongoDB",
    "pastey/paster": "A winning hackathon project built for the purpose of allowing students to easily transfer files between their " +
      "their computer and the department's linux server. The frontend and UI were built with Java and the backend in Python running on GCP.",
    "joerourke.co.uk": "This site - I'm always working on updating it and improving it and making it more and more like a real terminal",
  },
  now: [
    "I'm always doing work on this site, and my blog where I write about technology, politics, and the environment!",
    "Rebuilding my A Level coursework, a news aggregator and summariser, as a progressive web app using Vue.JS and Django.",
    "A powerful cross platform mobile browser with integrated DevTools, to finally allow for proper mobile debugging"
  ],

  ascii: `<pre style="width: 50%; background: transparent;">
     /\\\\\\\\\\\\\\\\\\\\
     || _   _ ||
    (@ (o) (o) @)
      |   ||  |
      |   __/ |
       \\______/
     ____|  |____
    /    \\__/     \\
   /               \\
  /__/|   joe   |\\__\\
 / /  |         | \\  \\
 </pre>
 `,

  workplaceTitles: [
    `<pre class="workplaceTitle">
 ___                       _     _  _         _   _                                       ___   ___     ___                              _                          _   
| _ \\  ___   _  _   __ _  | |   | || |  ___  | | | |  ___  __ __ __  __ _   _  _         / __| / __|   |   \\   ___   _ __   __ _   _ _  | |_   _ __    ___   _ _   | |_ 
|   / / _ \\ | || | / _\` | | |   | __ | / _ \\ | | | | / _ \\ \\ V  V / / _\` | | || |  _    | (__  \\__ \\   | |) | / -_) | '_ \\ / _\` | | '_| |  _| | '  \\  / -_) | ' \\  |  _|
|_|_\\ \\___/  \\_, | \\__,_| |_|   |_||_| \\___/ |_| |_| \\___/  \\_/\\_/  \\__,_|  \\_, | ( )    \\___| |___/   |___/  \\___| | .__/ \\__,_| |_|    \\__| |_|_|_| \\___| |_||_|  \\__|
             |__/                                                           |__/  |/                                |_|                                                 
</pre>`,
    `<pre class="workplaceTitle">
                ___  
  ___   _ _    / _ \\ 
 / _ \\ | ' \\  | (_) |
 \\___/ |_||_|  \\__\\_\\
                             
</pre>`,
    `<pre class="workplaceTitle">
 ___                     _                      _          _ 
| __|  _ _   ___   ___  | |  __ _   _ _    __  (_)  _ _   ( )
| _|  | '_| / -_) / -_) | | / _\` | | ' \\  / _| | | | ' \\  |/ 
|_|   |_|   \\___| \\___| |_| \\__,_| |_||_| \\__| |_| |_||_|                                                                  
</pre>
    `,
    `<pre class="workplaceTitle">
 ___   _                                      __  __
/ __| | |_    __ _   _ _   _ __   ___   __ _  \\ \\/ /
\\__ \\ | ' \\  / _\` | | '_| | '_ \\ |___| / _\` |  &gt;  &lt; 
|___/ |_||_| \\__,_| |_|   | .__/       \\__,_| /_/\\_\\
                          |_|                       
</pre>
    `,
    `<pre class="workplaceTitle">
 ___                              _            ___ 
| __|  ___   _ _   _ __    _  _  | |  __ _    | __|
| _|  / _ \\ | '_| | '  \\  | || | | | / _\` |   | _| 
|_|   \\___/ |_|   |_|_|_|  \\_,_| |_| \\__,_|   |___|
</pre>
    `,
  ],
  jobTitles: [
    "Undergraduate AI Researcher (Jul - Sep 2020)",
    "Full Stack Engineer (May - Oct 2020)",
    "Freelance Developer (Jan 2020 - )",
    "Software Support Engineer (July 2018)",
    "Web Developer / IT Support (June - July 2017)"
  ],
  jobDescriptions: [
    "I worked alongisde academics and postgraduate students in the Computer Science department in order to adapt previous research into automated negotiation to create a new bileratal negotaition strategy. The strategy can cope with uncertain preferences and implemented in Java for use with the GENIUS negotiation simulation environment. It required use of Microsoft's Z3 solver program in order to provide preferences in uncertain environments. A full research paper based on my findings is in the works.",
    "I developed a web and mobile application alongside a colleague for a new company under Callagenix. The application provided companies, primarily clinical practices, with a queue and appointment management system for easing pressure on clients and staff throughout the COVID-19 pandemic. I had responsibility for the database and web server set up, using Python's Django library and Postgres for the backend. The frontend design was my main task though, using Vue.JS to produce a elegant and powerful web application. A mobile version of the application was also under works, using the Flutter framework for cross platform development. Unfortunately, the project was abandoned prior to full release.",
    "As a student, I work also as a freelance developer - mainly in web and software commissions - to gain some extra funds. In these projects, ranging from local business landing sites to embedded Raspberry Pi-based systems written with C++, I constantly elicit details from the client and provide them with long term maintenance of their projects after delivery. These experiences have given me a lot of confidence in my development abilities and chance to maintain contact and meet clients.",
    "In this work experience placement, I got to experience a real software company preparing for a new release. While most of my work lied with the support team helping clients diagnose and solve problems with the company's software, I was able to observe and discuss the process of building and releasing a real software package with their developers. This role taught me about communication and conducting myself in a workplace environment, which has helped me in future professional and academic endeavors.",
    "While doing work experience at Formula E in London, I helped the web developer and tech support teams in their daily duties, diagnosing and fixing staff computers and equipment, and helping diagnose bugs in their new website's test release. I learnt about jQuery for speeding up frontend development and how web developers work together using tools like Slack and Git."
  ],

  hangmanWords: ["abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing", "buzzwords", "caliph", "cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", "daiquiri", "dirndl", "disavow", "dizzying", "duplex", "dwarves", "embezzle", "equip", "espionage", "euouae", "exodus", "faking", "fishhook", "fixable", "fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove", "frazzled", "frizzled", "fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", "giaour", "gizmo", "glowworm", "glyph", "gnarly", "gnostic", "gossip", "grogginess", "haiku", "haphazard", "hyphen", "iatrogenic", "icebox", "injury", "ivory", "ivy", "jackpot", "jaundice", "jawbreaker", "jaywalk", "jazziest", "jazzy", "jelly", "jigsaw", "jinx", "jiujitsu", "jockey", "jogging", "joking", "jovial", "joyful", "juicy", "jukebox", "jumbo", "kayak", "kazoo", "keyhole", "khaki", "kilobyte", "kiosk", "kitsch", "kiwifruit", "klutz", "knapsack", "larynx", "lengths", "lucky", "luxury", "lymph", "marquis", "matrix", "megahertz", "microwave", "mnemonic", "mystify", "naphtha", "nightclub", "nowadays", "numbskull", "nymph", "onyx", "ovary", "oxidize", "oxygen", "pajama", "peekaboo", "phlegm", "pixel", "pizazz", "pneumonia", "polka", "pshaw", "psyche", "puppy", "puzzling", "quartz", "queue", "quips", "quixotic", "quiz", "quizzes", "quorum", "razzmatazz", "rhubarb", "rhythm", "rickshaw", "schnapps", "scratch", "shiv", "snazzy", "sphinx", "spritz", "squawk", "staff", "strength", "strengths", "stretch", "stronghold", "stymied", "subway", "swivel", "syndrome", "thriftless", "thumbscrew", "topaz", "transcript", "transgress", "transplant", "triphthong", "twelfth", "twelfths", "unknown", "unworthy", "unzip", "uptown", "vaporize", "vixen", "vodka", "voodoo", "vortex", "voyeurism", "walkway", "waltz", "wave", "wavy", "waxy", "wellspring", "wheezy", "whiskey", "whizzing", "whomever", "wimpy", "witchcraft", "wizard", "woozy", "wristwatch", "wyvern", "xylophone", "yachtsman", "yippee", "yoked", "youthful", "yummy", "zephyr", "zigzag", "zigzagging", "zilch", "zipper", "zodiac", "zombie"],
  hangmanAscii: [`
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
  =========`]
});

export const actions = {
  sendEmail(store, { name, email, content }) {
    this.$axios.$post("https://formspree.io/f/xbjpgwnw", {
      email: email,
      _subject: "Form Submission from " + name,
      message: content,
    }).catch((e) => {
      throw "Something went wrong when sending the form!";
    });
  }
};
