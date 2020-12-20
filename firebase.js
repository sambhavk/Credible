var firebase = require('firebase');
const db1 = require('./dao');

module.exports = {
    init: function () {
        console.log("==> " + new Date().toLocaleTimeString() + " initializing firebase");
        firebase.initializeApp({
            apiKey: "AIzaSyBYazuOWleDModQGWw7EDrFYYPApGIBj1E",
            authDomain: "credible-54fef.firebaseapp.com",
            storageBucket: "credible-54fef.appspot.com",
            databaseURL: 'https://credible-54fef-default-rtdb.firebaseio.com'
        });
    },

    fetch: function (mid, heroes) {
        console.log("==> " + new Date().toLocaleTimeString() + " inside firebase/fetch()");
        var db = firebase.database();
        var ref = db.ref('/HeroResponse');
        let heroescount = heroes.length;
        ref.on('value', function (snapshot) {
            let data = snapshot.val();
            while (heroescount > 0) {
                if (data[mid] != undefined) {
                    for (let index = 0; index < heroescount; index++) {
                        let hid = heroes[index].HERO_ID;
                        if (data[mid][hid] != undefined) {
                            let sql = `insert into messages_score(HERO_ID,MESSAGE_ID,HERO_WGT,LEVERAGE_WGT,SUBMITTED_CREDIBILITY_SCORE,SUPPORTIVE_TEXT,SUPPORTIVE_URL) VALUES('${hid}','${mid}','${heroes[index].WGT}',0,'${data[mid][hid].CredScore}','${data[mid][hid].SupportingText}','${data[mid][hid].References}')`;
                            db1.fetch(sql, function (result) {
                                console.log("==> " + new Date().toLocaleTimeString() + " 1 record inserted in MySQL database from firebase for " + mid + "/" + hid);
                            });
                        }
                    }
                }
                heroescount = heroescount - 1;
            }
        },
            function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
    }
}