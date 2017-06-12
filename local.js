"use strict";

const index = require("./index");
const utils = require("./utils");

index.handler({
    query: {
        mgr: "user",
        func: "generateSession",
        //email: "joe@jtenos.com"
        phone: "6022288125"
    }
}, null, (err, resp) =>{
    if (err) {
        console.error("ERR");
        console.error(err);
    } else { 
        console.log(JSON.stringify(resp));
    }
});



/********* CREATE USER ***********
index.handler({
    query: {
        mgr: "user",
        func: "addUser",
        userID: utils.createRandom(),
        email: "joe@jtenos.com",
        phone: "6022288125"
    }
}, null, (err, resp) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Success");
    }
});
*********  ***********/

/******** CALL INIT *********
index.handler({
    query: {
        mgr: "app", func: "init"
    }
}, null, (err, resp) => {
    if (err) {
        console.error(err);
    } else {
        resp.forEach(result => {
            console.log(`tableName: ${result.tableName}, success: ${result.success}, err: ${result.err}`);
        });
    }
});
********* *********/

//const userID = utils.createRandom(20);
//console.log(userID);
/*
index.handler({ query: { mgr: "card", func: "getCards", userID: "WdFqx8lAQc4AScmCzXjD" } }, null, (err, response) => {
    if (err) {
        console.error(err);
    } else {
        response.forEach(card => {
            console.log(JSON.stringify(card));
        });
    }
});
*/
/*
let items = getItems();
function processItem() {
    if (!items.length) {
        return;
    }
    let item = items.shift();
    let fields = item.split("|");
    let front = fields[1];
    let back1 = fields[2];
    let back2 = fields[3];

    console.log(JSON.stringify(item));
    
    index.handler({
        query: { 
            mgr:"card",
            func:"addCard",
            userID:"of00g898RDu0ZCJt3ZJz",
            front:front,
            back1:back1,
            back2:back2 
        }
    }, null, (err, result) =>{
        if (err) {
            console.error(err);
        } else {
            console.log("Success");
            processItem();
        }
    });
}

processItem();


function getItems() {
    return ["need work|中国人|Chinese person|zhōngguórén",
"need work|币|currency|bì",
"need work|我的中文说得不好|My Chinese isn't very good|wǒde zhōngwén shuō de bù hǎo",
"need work|七月|July|qīyuè",
"need work|明年|next year|míngnián",
"need work|三月|March|sānyuè",
"need work|五月|May|wǔyuè",
"need work|零|zero|líng",
"need work|这个|this one|zhège",
"know well|三|three|sān",
"know well|五|five|wǔ",
"need work|我家里有五个人|Wǒ jiālǐ yǒu wǔ ge rén|There are five people in my family",
"need work|今天是几号?|what is today's date?|jīntiān shì jǐ hào?",
"need work|我二十五岁|I am 25 years old|wǒ èrshíwǔ suì",
"﻿need work|加拿大|Canada|jiānádà",
"need work|和|hé|And",
"need work|喜|happy|xǐ",
"need work|昨|yesterday|zuó",
"need work|十一月|November|shíyīyuè",
"know well|谢|thank|xiè",
"need work|太|too；extreme|tài",
"need work|气|air; gas|qì",
"need work|去年|last year|qùnián",
"need work|你好|hello|nǐ hǎo",
"need work|我家里有我爸爸，妈妈，哥哥，妹妹和我|Wǒ jiālǐ yǒu wǒ bàba, māma, gēge, mèimei hé wǒ|In my family there are my father, mother, older brother, younger sister and I",
"need work|千|thousand|qiān",
"need work|去|to go|qù",
"need work|哥|gē|Older brother",
"need work|可以便宜一点吗？|can you make it a little cheaper?|kěyǐ piányí yīdiǎn ma?",
"need work|爸爸|bàba|Father",
"need work|你要买什么？|What do you want to buy? |Nǐ yào mǎi shénme? ",
"need work|一百一十|110|yī bǎi yī shí",
"need work|英国|England|yīngguó",
"need work|今天是八月十一号|today is August 11th|jīntiān shì bāyuè shíyī hào",
"need work|今年|this year|jīnnián",
"know well|九|nine|jiǔ",
"need work|不客气|you're welcome|búkèqì",
"need work|没|Negative prefix |méi",
"need work|但|but|dàn",
"need work|以|according to|yǐ",
"need work|什么|what?|shénme",
"need work|名|name|míng",
"need work|什|what?|shén",
"need work|年|year|nián",
"know well|说|speak|shuō",
"need work|六百七十八|678|liù bǎi qī shí bā",
"need work|宜|suitable|yí",
"need work|给你一千块|Here's 1000 dollars |Gěi nǐ yī qiān kuài ",
"need work|问|ask|wèn",
"need work|多|many|duō",
"need work|家|family|jiā",
"know well|七|seven|qī",
"need work|请问你的名字是|excuse me, your name is ...?|qǐngwèn nǐde míngzi shì",
"need work|一百|100|yī bǎi",
"need work|太贵了|Too expensive! |Tài guì le ",
"need work|号|number|hào",
"need work|呢|(particle)|ne",
"need work|今|present|jīn",
"need work|们|(plural suffix)|men",
"need work|你呢|and you?|nǐ ne?",
"need work|几岁?|how old?|jǐ suì?",
"need work|家|jiā|House / Home",
"need work|姓|surname|xìng",
"need work|你的生日是几号?|when is your birthday?|nǐde shēngrì shì jǐ hào?",
"need work|我是美国人|I am American|wǒ shì měiguórén",
"need work|谢谢|thanks|xièxie",
"need work|也|Also|yě",
"need work|见|to meet|jiàn",
"know well|人|person|rén",
"need work|八月|August|bāyuè",
"know well|中|middle|zhōng",
"know well|你|you|nǐ",
"need work|我要这个|I want this one |wǒ yào zhège",
"need work|爸|bà|Father",
"need work|昨天|yesterday|zuótiān",
"need work|贵|expensive|guì",
"know well|十|ten|shí",
"need work|会说|to be able to speak|huì shuō",
"know well|六|six|liù",
"need work|这个五十块钱|this one is 50 dollars|zhège wǔshí kuài qián",
"need work|几|how many?; small table|jǐ",
"need work|你会说中文吗?|Can you speak Chinese?|nǐ huì shuō zhōngwén ma?",
"need work|妈|mā|Mother",
"need work|买|To buy|mǎi",
"need work|九月|September|jiǔyuè",
"need work|请|please; to invite|qǐng",
"know well|我|I; me|wǒ",
"need work|大家好|hello everyone|dàjiā hǎo",
"need work|姐姐|jiějie|Older sister",
"need work|有|To have|yǒu",
"need work|这个几块钱？|how much is this one?|zhège jǐ kuài qián?",
"need work|姓|last name|xìng",
"need work|明天|tomorrow|míngtiān",
"need work|两|Two of|liǎng",
"need work|先|first|xiān",
"need work|一百七十|170|yī bǎi qī shí",
"need work|太贵了|too expensive!|tài guì le",
"need work|美金|US dollar|měijīn",
"know well|恨|very|hěn",
"need work|今天|today|jīntiān",
"need work|我姓{.x.}，叫{.y.}|my name is {.y.} {.x.}|wǒ xìng {.x.}, jiào {.y.}",
"need work|是哪五个人？|Shì nǎ wǔ ge rén?|Which five people are they?",
"need work|六月|June|liùyuè",
"need work|起|rise|qǐ",
"need work|你几岁?|how old are you?|nǐ jǐ suì?",
"need work|两百二十五|225|liǎng bǎi èr shí wǔ",
"need work|对不起|I'm sorry; excuse me|duìbuqǐ",
"|null|null|null",
"know well|不|not|bù",
"need work|客气|polite|kèqì",
"need work|生|birth; life|shēng",
"need work|真|real|zhēn",
"need work|我很好|I'm good|wǒ hěn hǎo",
"need work|小|small|xiǎo",
"know well|四|four|sì",
"know well|他|he; him|tā",
"need work|十二月|December|shíèryuè",
"need work|客|guest|kè",
"need work|元|dollar|yuán",
"know well|八|eight|bā",
"need work|是，我是中国人|Yes, I am Chinese|shì, wǒ shì zhōngguórén",
"need work|明|bright; clear|míng",
"need work|弟弟|dìdi|Younger brother",
"need work|五百元好不好？|Is 500 dollars okay? |Wǔ bǎi yuán hǎo bù hǎo? ",
"need work|的|(particle)|de",
"need work|弟|dì|Younger brother",
"need work|这里也有|There are some over here too |Zhèlǐ yě yǒu ",
"need work|百|hundred|bǎi",
"need work|我叫{...}|my name is {...}|wǒ jiào {...}",
"need work|你家里有几个人？|Nǐ jiālǐ yǒu jǐge rén?|How many people are there in your family?",
"need work|天|day; sky|tiān",
"know well|国|country|guó",
"need work|但是|but; however|dànshì",
"need work|这个五百五十九元|This one is 559 dollars |Zhège wǔ bǎi wǔ shí jiǔ yuán ",
"need work|您|you (polite)|nín",
"need work|你的中文说得很好|Your Chinese is very good|nǐde zhōngwén shuō de hěn hǎo",
"need work|可以|can|kěyǐ",
"need work|多少钱？|how much?|duō shǎo qián?",
"know well|是|be|shì",
"know well|一|one|yī",
"need work|一月|January|yīyuè",
"need work|七千九百一十六|7916|qī qiān jiǔ bǎi yī shí liù",
"need work|不会，我不会说中文|No, I can't speak Chinese|bú huì, wǒ bú huì shuō zhōngwén",
"need work|那个|that one|nàge",
"need work|对|opposite; correct|duì",
"need work|喜欢|to like|xǐhuān",
"need work|它|it|tā",
"need work|這個多少錢？|How much is this one? |Zhège duōshǎo qián?",
"need work|日|sun; day|rì",
"need work|岁|age in years|suì",
"need work|可以便宜一点吗？|Can you make it a little cheaper? |Kěyǐ piányí yīdiǎn ma? ",
"need work|哥哥|gēge|Older brother",
"need work|谢谢你|thank you|xièxie nǐ",
"need work|您贵姓|what is your last name?|nín guì xìng?",
"need work|人民币|Chinese currency|rénmínbì",
"need work|便|cheap|pián",
"need work|钱|money|qián",
"﻿need work|姐|older sister|jiě",
"need work|家里|jiā lǐ|In the house",
"﻿need work|一百〇一|101|yī bǎi líng yī",
"need work|法国|France|fǎguó",
"need work|我要两个|I want two of them|wǒ yào liǎng ge",
"need work|真的吗?|really?|zhēnde ma?",
"need work|欢|happy|huān",
"need work|几块钱？|how much?|jǐ kuài qián?",
"need work|两个|two of|liǎngge",
"need work|那|that|nà",
"need work|美国|USA|měiguó",
"need work|好吗?|ok?|hǎo ma?",
"need work|再|again|zài",
"need work|少|a few|shǎo",
"need work|点|dot; a little bit|diǎn",
"need work|叫|be called|jiào",
"need work|一千|1000|yī qiān",
"need work|请问|may I ask|qǐngwèn",
"need work|要|to want|yào",
"need work|先生|sir; mister|xiānshēng",
"need work|一百三十六|136|yī bǎi sān shí liù",
"need work|十月|October|shíyuè",
"need work|真的|real|zhēnde",
"need work|不是|am not/is not/are not|búshì",
"need work|中文|Chinese language|zhōngwén",
"need work|再见|Goodbye|zàijiàn",
"need work|你有没有英文书？|Do you have any English books? |Nǐ yǒu méiyǒu Yīngwén shū? ",
"need work|了|change in situation/past tense particle|le",
"need work|你叫什么名字?|what is your name?|nǐ jiào shénme míngzi",
"need work|一点|a little|yīdiǎn",
"need work|问|ask|wèn",
"need work|大家|everyone|dàjiā",
"need work|两百五十块|250 dollars|liǎng bǎi wǔ shí kuài",
"need work|二月|February|èryuè",
"need work|小姐|miss|xiǎojiě",
"need work|妹|mèi|Younger sister",
"need work|好，我要买两个|Ok, I want to buy two of them |Hǎo, wǒ yào mǎi liǎngge ",
"need work|好，谢谢你|Ok, thank you |Hǎo, xièxie nǐ ",
"need work|请|please; invite|qǐng",
"need work|这|this|zhè",
"﻿need work|那里有|There are some over there |Nàlǐ yǒu ",
"need work|五个|five of them|wǔ ge ",
"need work|可|can|kě",
"need work|块|measure word for money|kuài",
"need work|生日|birthday|shēngrì",
"need work|个|generic measure word|ge",
"know well|她|she; her|tā",
"need work|还好|so-so; ok|háihǎo",
"need work|月|month|yuè",
"need work|民|citizen|mín",
"need work|太太|Mrs.|tàitai",
"need work|么|(particle)|me",
"need work|那里|There|nàlǐ",
"need work|名字|name|míngzi",
"need work|我的生日是五月二号|my birthday is on May 2nd|wǒde shēngrì shì wǔ yuè èr hào",
"need work|四月|April|sìyuè",
"know well|大|big|dà",
"need work|妈妈|māma|Mother",
"need work|你是中国人吗？|Are you Chinese?|nǐ shì zhōngguórén ma?",
"need work|给|to give|gěi",
"need work|没有|Don't have|méiyǒu",
"need work|多少|how many/how much|duōshǎo",
"need work|妹妹|mèimei|Younger sister",
"know well|会|able to; to meet; to convene|huì",
"need work|这里|Here|zhèlǐ",
"﻿need work|还|still; return|hái",
"need work|澳洲|Australia|aozhōu",
"need work|金|gold|jīn",
"need work|你好吗?|how are you?|nǐ hǎo ma?",
"need work|中国|China|zhōngguó",
"need work|字|character|zì",
"need work|给你一百块|here is 100 dollars|gěi nǐ yībǎi kuài",
"know well|二|two|èr",
"need work|里|Inside|lǐ",
"need work|姐|older sister|jiě",
"need work|书|Book|shū",
"need work|哪|nǎ|Which",
"know well|好|good|hǎo",
"need work|便宜|cheap|piányí",
"need work|好不好？|Is that ok? |Hǎo bù hǎo? ",
"need work|吗|(particle)|ma"];
}
*/