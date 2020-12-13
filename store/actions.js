export default {
    sendEmail(store, { name, email, content }) {
        this.$axios.$post("https://formspree.io/f/xbjpgwnw", {
            email: email,
            _subject: "Form Submission from " + name,
            message: content,
        }).catch((e) => {
            throw "Something went wrong when sending the form!";
        });
    },

    handleCommand(store, command) {
        
    }
}