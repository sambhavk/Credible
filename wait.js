const db = require('./dao');
const send = require('./send');

module.exports = {
    waitnreply: function (mid, MsgFrom, MsgData) {
        console.log("==> " + new Date().toLocaleTimeString() + " Inside wait/waitnreply()");
        let sql = `select HERO_ID, FINAL_CREDIBILITY_SCORE, SUPPORTIVE_TEXT, SUPPORTIVE_URL, (HERO_WGT + LEVERAGE_WGT) as total_weight from Messages m, Messages_Score ms where ms.MESSAGE_ID='${mid}' and m.FINAL_CREDIBILITY_SCORE=ms.SUBMITTED_CREDIBILITY_SCORE order by total_weight desc limit 3`;
        let fun = function () {
            db.fetch(sql, function (data) {
                if (data.length > 0) {
                    module.exports.nowait(mid, MsgFrom, MsgData);
                    return;
                }
                else
                    fun();
            });
        }
        fun();
    },

    nowait: function (mid, MsgFrom, MsgData) {
        console.log("==> " + new Date().toLocaleTimeString() + " Inside wait/nowait()");
        const rating = ["Confirmed False", "Fishy", "Partial Truth", "Mostly True", "Confirmed True"];
        let sql = `select FINAL_CREDIBILITY_SCORE, SUPPORTIVE_TEXT, SUPPORTIVE_URL, (HERO_WGT + LEVERAGE_WGT) as total_weight from Messages m, Messages_Score ms where ms.MESSAGE_ID='${mid}' and m.FINAL_CREDIBILITY_SCORE=ms.SUBMITTED_CREDIBILITY_SCORE order by total_weight desc limit 3`
        db.fetch(sql, function (data) {
            let response, score, comments, reference, wgt;
            for (let index = 0; index < data.length; index++) {
                score = data[index].FINAL_CREDIBILITY_SCORE;
                comments = data[index].SUPPORTIVE_TEXT;
                reference = data[index].SUPPORTIVE_URL;
                wgt = data[index].total_weight;

                response = `Fact: ${MsgData}\n\n*Rating: ${rating[score]}*\n\nReview: ${comments}\n\nReferences: ${reference}`;
                send.post(response, 0, MsgFrom);
            }
            console.log("==> " + new Date().toLocaleTimeString() + " Response sent!!\n\n");
        })
    },

    checkresponse: function (mid, heroes, MsgFrom, MsgData) {
        console.log("==> " + new Date().toLocaleTimeString() + " Inside wait/checkresponse()");
        let finalcredsc = 0, wgtsc = 0, wgt = 0, rating = ["Confirmed False", "Fishy", "Partial Truth", "Mostly True", "Confirmed True"], response, comments, reference;
        let sql = `select HERO_ID, SUBMITTED_CREDIBILITY_SCORE, SUPPORTIVE_TEXT, SUPPORTIVE_URL,ms.HERO_WGT, (HERO_WGT + LEVERAGE_WGT) as total_weight from Messages_Score ms where ms.MESSAGE_ID='${mid}' order by total_weight desc`;
        let fun = function () {
            db.fetch(sql, function (data) {
                if (data.length >= (0.3 * (heroes.length))) {
                    for (let i = 0; i < heroes.length; i++) {
                        for (let j = 0; j < data.length; j++) {
                            if (heroes[i].heroid == data[j].HERO_ID) {
                                wgtsc = ((data[j].SUBMITTED_CREDIBILITY_SCORE) * (data[j].total_weight + heroes[i].heroWgt)) + wgtsc;
                                wgt = wgt + data[j].total_weight;
                            }
                        }
                    }
                    finalcredsc = wgtsc / wgt;
                    for (let index = 0; index < data.length; index++) {
                        comments = data[index].SUPPORTIVE_TEXT;
                        reference = data[index].SUPPORTIVE_URL;

                        response = `Fact: ${MsgData}\n\n*Rating: ${rating[Math.round(finalcredsc)]}*\n\nReview: ${comments}\n\nReferences: ${reference}`;
                        send.post(response, 0, MsgFrom);

                        if ((data[index].SUBMITTED_CREDIBILITY_SCORE <= (finalcredsc - 1)) || (data[index].SUBMITTED_CREDIBILITY_SCORE >= (finalcredsc + 1))) {
                            wgt = data[index].HERO_WGT - 0.1;
                        }
                        else {
                            wgt = data[index].HERO_WGT + 0.1;
                        }
                        let update = `update abc.heroes set WGT=${wgt.toFixed(1)} where HERO_ID='${data[index].HERO_ID}'`;
                        db.fetch(update, function (result) {
                            console.log("==> " + new Date().toLocaleTimeString() + " Final Weight updated in database for Hero ID= " + data[index].HERO_ID);
                        });
                    }
                    console.log("==> " + new Date().toLocaleTimeString() + " Response sent!!");

                    let update = `update abc.messages set FINAL_CREDIBILITY_SCORE=${Math.round(finalcredsc)} where MSG_ID='${mid}'`;
                    db.fetch(update, function (data) {
                        console.log("==> " + new Date().toLocaleTimeString() + " Final Credibility Score updated in database for Message ID= " + mid + "\n\n");
                    })
                    return;
                }
                else
                    fun();
            });
        }
        fun();
    }
}