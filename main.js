const recv = require('./index');
const fact = require('./keyExtractor');
const topic = require('./topicClassifier');
const db = require('./dao');
const googleFact = require('./factCheck');
const send = require('./send');
const post = require('./post');
const wait = require('./wait');
const firebase = require('./firebase');

console.log("==> Credible service is active!!! <==");

db.connect();
firebase.init();
let timerid = setInterval(call, 3000);

function call() {
    let MsgData, MsgFrom, MsgTo, MsgTopic, Msgkeys, count = 17;
    recv.msg(function (body, to, from) {
        MsgData = body.messages[0].body; MsgFrom = from; MsgTo = to;
        if (MsgData != "join mountain-weather") {
            if (MsgTo == "whatsapp:+14155238886") {
                id = count + 1;
                count = "M" + id;
                console.log("==> " + new Date().toLocaleTimeString() + " Message Body= " + MsgData);
                console.log("==> " + new Date().toLocaleTimeString() + " Message Received from= " + MsgFrom);
                processing(MsgData, MsgFrom, MsgTo, MsgTopic, Msgkeys, count);
            }
            else
                return;
        }
    })
}

function processing(MsgData, MsgFrom, MsgTo, MsgTopic, Msgkeys, count) {
    let googleRes;
    post.post("Message Received!!", MsgFrom);
    console.log("==> " + new Date().toLocaleTimeString() + " Acknowledgement Sent");

    topic.topic(MsgData, function (str) {
        MsgTopic = str;
        console.log("==> " + new Date().toLocaleTimeString() + " Message topic=" + str);
        fact.keyword(MsgData, function (key) {
            Msgkeys = key;
            console.log("==> " + new Date().toLocaleTimeString() + " Optimized Message= " + key);
            googleFact.query(Msgkeys, function (data) {
                googleRes = data;
                if (googleRes != undefined) {
                    console.log("==> " + new Date().toLocaleTimeString() + " Response Received from google");
                    send.post(googleRes, 1, MsgFrom);
                }
                else {
                    console.log("==> " + new Date().toLocaleTimeString() + " No Response Received from google");
                    PreScreening(MsgData, Msgkeys, MsgFrom, MsgTopic, count);
                }
            });
        });
    });
}

function PreScreening(MsgData, Msgkeys, MsgFrom, MsgTopic, count) {
    console.log("==> " + new Date().toLocaleTimeString() + " Inside PreScreening");
    let sql = `select MSG_ID,FINAL_CREDIBILITY_SCORE from messages where soundex('${Msgkeys}')=soundex(KEYWORDS)`;
    db.fetch(sql, function (data) {
        if (data.length != 0) {
            console.log("==> " + new Date().toLocaleTimeString() + " Similar Message present in DB");
            let i = data.length - 1, maxscore = 0, mid = data[0].MSG_ID;
            while (i >= 0) {
                if (data[i].FINAL_CREDIBILITY_SCORE != null && maxscore < data[i].FINAL_CREDIBILITY_SCORE) {
                    maxscore = data[i].FINAL_CREDIBILITY_SCORE;
                    mid = data[i].MSG_ID;
                }
                i = i - 1;
            }
            if (maxscore == 0) {
                console.log("==> " + new Date().toLocaleTimeString() + " Similar Message present in DB but still in manual screening phase");
                send.post("We couldn't find relevant Fact-Check info for -\n" + MsgData + "\n- on Internet.\nReason for this could be that this is a Recent Message and will need to be screened.\n\nWe are sending this to our Credible Heroes to generate a Credibility Score for this message.\n\nWe will notify you once this info is available.\nStay Tuned!", 0, MsgFrom);
                wait.waitnreply(mid, MsgFrom, MsgData);
            }
            else {
                console.log("==> " + new Date().toLocaleTimeString() + " Sending response data of similar message to user");
                wait.nowait(mid, MsgFrom, MsgData)
            }
        }
        else {
            console.log("==> " + new Date().toLocaleTimeString() + " No such message in DB. Calling Heroes...");
            db.insertMsg(count, MsgData, MsgTopic, Msgkeys);
            send.post("We couldn't find relevant Fact-Check info for -\n" + MsgData + "\n- on Internet.\nReason for this could be that this is a Recent Message and will need to be screened.\n\nWe are sending this to our Credible Heroes to generate a Credibility Score for this message.\n\nWe will notify you once this info is available.\nStay Tuned!", 0, MsgFrom);
            ManualScreening(MsgData, MsgFrom, MsgTopic, count);
        }
    })
}

function ManualScreening(MsgData, MsgFrom, MsgTopic, count) {
    console.log("==> " + new Date().toLocaleTimeString() + " Inside ManualScreening");
    if (MsgTopic != "Others" && MsgTopic != undefined) {
        let heroes = [{ heroid: "", heroWgt: 0, number: "" }];
        let sql = `select hi.HERO_ID, hi.EXPERT, h.WHATSAPP_NO,h.WGT from heroes_interests hi, heroes h where hi.topics='${MsgTopic}' and hi.HERO_ID=h.HERO_ID;`;
        db.fetch(sql, function (data) {
            let i = data.length - 1, j = 0;
            while (i >= 0) {
                if (data[i].EXPERT != undefined) {
                    heroes[j].heroWgt = 1;
                    heroes[j].heroid = data[i].HERO_ID;
                    heroes[j].number = "whatsapp:" + data[i].WHATSAPP_NO;
                }
                else {
                    heroes[j].heroWgt = 0;
                    heroes[j].heroid = data[i].HERO_ID;
                    heroes[j].number = "whatsapp:" + data[i].WHATSAPP_NO;
                }
                let url = `https://heroresponse-f4f71.web.app/?mid=${count}&hid=${heroes[j].heroid}`;
                send.post(`Hello Hero!!\nCredible Network asks for your help.\nPlease review the below claim -\n${MsgData}\nSubmit your response here -\n\n${url}`, 0, heroes[j].number);
                i = i - 1;
                j = j + 1
            }
            firebase.fetch(count, data);
            console.log("==> " + new Date().toLocaleTimeString() + " Notification sent to Credible heroes");
            wait.checkresponse(count, heroes, MsgFrom, MsgData);
        })
    }
    else {
        let sql = "select HERO_ID,WHATSAPP_NO from heroes";
        db.fetch(sql, function (data) {
            for (let index = 0; index < data.length; index++) {
                let url = `https://heroresponse-f4f71.web.app/?${count}&${data[index].HERO_ID}`;
                send.post(`Hello Hero!!\nCredible Network asks for your help.\nPlease review the below claim -\n${MsgData}\nSubmit your response here -\n\n${url}`, 0, "whatsapp:" + data[index].WHATSAPP_NO);
            }
        })
        console.log("==> " + new Date().toLocaleTimeString() + " Notification sent to all Credible heroes");
        wait.checkresponse(count, data, MsgFrom, MsgData);
    }
}