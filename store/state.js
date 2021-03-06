export const strict = false;

export default () => ({
    // Related to main terminal functionality
    currentResult: ``,
    results: [],
    log: [''],
    lines: 0,

    store: null,

    // History related states
    history: [],
    historyIndex: -1,

    // Flag states
    hasBeenCleared: false,
    readyForNextLine: true,
    haltNextLine: false,

    commands: ["help", "about", "uname -a", "email", "github", "linkedin", "lightmode",
    "clear", "resume", "now", "projects", "hangman", "coffee", "doggo", "haha", "sl"],
    descriptions: [
        "to get back here!", "just a bit about me", "the tech behind this",
        "for enquiries and business talk", "checkout some of my projects",
        "go to my linkedin profile", "for burning your eyes",
        "clean up the screen", "my professional work",
        "what i've been working on recently", "some of my favourite personal/uni projects",
        "the classic game", "any donations would be greatly appreciated!",
        "an adorable little suprise", "i'll tell you a joke!", "choo choo!",
    ],
    groupings: {
        "about me and my projects": [1, 8, 9, 10, 12],
        "nerdy stuff": [2, 6],
        "get in touch": [3, 4, 5],
        "messin' around": [11, 13, 14, 15]
    },

    info: {
        email: "hello@joerourke.co.uk",
        github: "https://github.com/joerourke123",
        linkedin: "https://linkedin.com/in/joe-rourke",
        buy_a_coffee: "https://www.buymeacoffee.com/joerourke",
        about: {
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
            bio: `
            <div class="textBlock">
                Hi, I am a student and full stack developer particularly interested in 
                machine learning. Currently, I am studying AI at Royal Holloway, University of London.
                I'm also interested in politics and the environment, and how technology can be used to
                fight in these causes (I'm hoping to start a blog on this soon!). I'm always on the lookout for 
                new projects and opportunities so feel free to shoot me an email!<br />
            </div>`,
        },
        resume: {
            workplaces: [
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
            roles: [
                "Undergraduate AI Researcher (Jul - Sep 2020)",
                "Full Stack Engineer (Apr - Oct 2020)",
                "Freelance Developer (Jan 2020 - )",
                "Software Support Engineer (July 2018)",
                "Web Developer / IT Support (June - July 2017)"
            ],
            descriptions: [
                "I worked alongisde academics and postgraduate students in the Computer Science department in order to adapt previous research into automated negotiation to create a new bileratal negotaition strategy. The strategy can cope with uncertain preferences and implemented in Java for use with the GENIUS negotiation simulation environment. It required use of Microsoft's Z3 solver program in order to provide preferences in uncertain environments. A full research paper based on my findings is in the works.",
                "I developed a web and mobile application alongside a colleague for a new company under Callagenix. The application provided companies, primarily clinical practices, with a queue and appointment management system for easing pressure on clients and staff throughout the COVID-19 pandemic. I had responsibility for the database and web server set up, using Python's Django library and Postgres for the backend. The frontend design was my main task though, using Vue.JS to produce a elegant and powerful web application. A mobile version of the application was also under works, using the Flutter framework for cross platform development. Unfortunately, the project was abandoned prior to full release.",
                "As a student, I work also as a freelance developer - mainly in web and software commissions - to gain some extra funds. In these projects, ranging from local business landing sites to embedded Raspberry Pi-based systems written with C++, I constantly elicit details from the client and provide them with long term maintenance of their projects after delivery. These experiences have given me a lot of confidence in my development abilities and chance to maintain contact and meet clients.",
                "In this work experience placement, I got to experience a real software company preparing for a new release. While most of my work lied with the support team helping clients diagnose and solve problems with the company's software, I was able to observe and discuss the process of building and releasing a real software package with their developers. This role taught me about communication and conducting myself in a workplace environment, which has helped me in future professional and academic endeavors.",
                "While doing work experience at Formula E in London, I helped the web developer and tech support teams in their daily duties, diagnosing and fixing staff computers and equipment, and helping diagnose bugs in their new website's test release. I learnt about jQuery for speeding up frontend development and how web developers work together using tools like Slack and Git."
            ],
        },
        now: [
            "I've recently built a flashcard app based on Notion using Kotlin, React, GraphQL, and Redis! Check it out at https://flotion.space",
            "My next project is an app to tackle the awkward act of asking colleagues if they want a cup of tea!",
            "I also plan on building some command line tools using Go - to make management of my VPS easier!",
        ],
        projects: {
            "Shortr": "my A-Level coursework project - uses NLP and a bespoke pattern matching algorithm in order to summarise" +
              " and aggregate news articles which interest the user. Built using Flask and JavaScript - the project achieved a mark of " +
              "67 out of 70.",
            "flotion": "Using the Notion API and some extra backend processing - with Kotlin and Redis. I built a" +
              " web app, using React, where you can test yourselves on flashcards made using Notion. Try it at <a href='https://flotion.space' target='_blank'>https://flotion.space</a>. I built the web app initially to help me study for my exams - and it worked great!",
            "ecothon": "A geolocation based environmental competition app which pit you against your community to be the most environmentally friendly. Built for Royal Hackaway 2021, where we won a prize! Technologies included Flutter, Go, and MongoDB.",
            "Pastey": "A winning hackathon project built for the purpose of allowing students to easily transfer files between their " +
              "their computer and the department's linux server. The frontend and UI were built with Java and the backend in Python running on GCP.",
          "Oaxaca": "A restaurant ordering system, for a fictional establishment, built for a university team project " +
            "over 5 SCRUM sprints. Developed using Django and Vue.JS with a Postgres database. I was mostly responsible" +
            " for the Vue.JS interface, database design, and for being the SCRUM master and guide to the technologies for the rest of the team. " +
            "Try it out at <a href='https://oaxaca.tk/' target='_blank'>https://oaxaca.tk</a>",
        },
    },
  sl: `
<pre>
      o x o x o x o . . .
    o      _____            _______________ ___=====__T___
  .][__n_n_|DD[  ====_____  |    |.\/.|   | |   |_|     |_
>(________|__|_[_________]_|____|_/\_|___|_|___________|_|
_/oo OOOOO oo\`  ooo   ooo   o^o       o^o   o^o     o^o        
</pre>`
});
