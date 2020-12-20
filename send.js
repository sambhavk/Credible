let post = require('./post');

module.exports = {
    post: function (msg, data, to) {
        console.log("==> " + new Date().toLocaleTimeString() + " Inside send/post()");
        if (data) {
            let factCheck = [];

            for (let index = 0; index < msg.length; index++) {
                let claimant = "Claim by " + msg[index].claimant;
                let text = "Fact: " + msg[index].text;
                let rating = "*Rating: " + msg[index].claimReview[0].textualRating + "*";
                let article = "Read article: " + msg[index].claimReview[0].url;
                factCheck[index] = claimant + "\n\n" + text + "\n\n" + rating + "\n\n" + article;

                post.post(factCheck[index], to);
            }
            console.log("==> " + new Date().toLocaleTimeString() + " Fact response (" + msg.length + ") sent successfully to= " + to);
        }
        else {
            post.post(msg, to);
        }
    }
}