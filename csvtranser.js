let fs = require("fs")

let csvPP = require("papaparse")

let neigh = "neighborhood.csv"
let party = "partyNodes.csv"
let actcenter = "citizenAct.csv"
let conv = "convenient.csv"

neigh = csvPP.parse(fs.readFileSync(neigh, 'utf8')).data.slice(1);
party = csvPP.parse(fs.readFileSync(party, 'utf8')).data.slice(1);
actcenter = csvPP.parse(fs.readFileSync(actcenter, 'utf8')).data.slice(1);
conv = csvPP.parse(fs.readFileSync(conv, 'utf8')).data.slice(1);

let partyDatas = [];

neigh.forEach(e => {
    partyDatas.push({
        street: e[5],
        name: e[3],
        addr: e[7],
        phone: e[8],
        type: "neighbor"
    })
});
party.forEach(e => {
    partyDatas.push({
        name: e[0],
        addr: e[1],
        phone: e[2] + "--" + e[3],
        type: "partybuild"
    })
})
let streetName = ""
actcenter.forEach(e => {
    streetName = e[6] && streetName
    partyDatas.push({
        name: e[1],
        addr: e[2],
        phone: e[5] + "--" + e[4],
        street: streetName,
        type: "actcenter"
    })
})
let citizenDatas = []
let foods = /[面餐酒饮]/,
    care = /[造型美容发]/;

conv.forEach(e => {
    let type = "shop";
    if (foods.test(e[0]))
        type = "foods";
    if (care.test(e[0]))
        type = "care";


    citizenDatas.push({
        name: e[0],
        addr: e[6],
        phone: e[9] + "--" + e[8],
        street: e[7],
        type: type
    })
})

fs.writeFileSync("./pointdatas/partyDatas.json", JSON.stringify(partyDatas, ' ', 2), "utf-8")
fs.writeFileSync("./pointdatas/citizenDatas.json", JSON.stringify(citizenDatas, ' ', 2), "utf-8")