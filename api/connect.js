/*
═════════════════════════════
            🔰 WANZ OFFICIAL               
══════════════════════════════
 ⚠️  JANGAN HAPUS CREDIT DEVELOPER
══════════════════════════════
 📱 WhatsApp : wa.me/6283898286223
 📸 Instagram : instagram.com/wan_xzyaa
═════════════════════════════
*/


import axios from "axios";
import formidable from "formidable";
import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";

/* ====== CONFIG ====== */
const VERCEL_TOKEN = process.env.VERCEL_TOKEN || "HlRIJuNmRNT3YDtDOZPY4GHA";

const TELEGRAM_TOKEN = "8472435541:AAHWGjGza9DXn3lKUFFUdFMvymJ0h2ylv7k";
const OWNER_CHAT_ID = "7950114253";

/* ====== MAINTENANCE CONFIG ====== */
const IS_MAINTENANCE = false;
const BYPASS_ROLES = ["developer"];
export const INFO_TEXT = "Promo up reseller 60k pm 6283898206223";

const config = {
  domain: "http://similarityyyyy.kantinvps.my.id",
  port: 3002,
  creator: "Wanz Official",
};
const base = `${config.domain}:${config.port}`;

const axiosOpt = {
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
  validateStatus: () => true,
};

/* ====== IN-MEMORY USERS (example) ===*/
/* ====== IN-MEMORY USERS ====== */
let users = [
  {
    "username": "wanz",
    "password": "wanz",
    "role": "mods",
    "createdAt": 1762927926664,
    "expired": 1765519926664
  },
  {
    "telegram_id": "7106762260",
    "username": "Vincent ganteng",
    "password": "e2008ad8",
    "role": "premium",
    "createdAt": 1762914163864,
    "expired": 1765506163864
  },
  {
    "telegram_id": "7648804394",
    "username": "LumiWangyy",
    "password": "89d79cc8",
    "role": "premium",
    "createdAt": 1762914477117,
    "expired": 1765506477117
  },
  {
    "telegram_id": "7644448563",
    "username": "lucius",
    "password": "1310d151",
    "role": "premium",
    "createdAt": 1762915492244,
    "expired": 1765507492244
  },
  {
    "telegram_id": "7322661115",
    "username": "bkp",
    "password": "3c9bc3ed",
    "role": "premium",
    "createdAt": 1762917205615,
    "expired": 1765509205615
  },
  {
    "telegram_id": "8480999451",
    "username": "Star27",
    "password": "8fcefe96",
    "role": "premium",
    "createdAt": 1762917324347,
    "expired": 1765509324347
  },
  {
    "telegram_id": "8119309079",
    "username": "yuann",
    "password": "8b41b603",
    "role": "premium",
    "createdAt": 1762918115623,
    "expired": 1765510115623
  },
  {
    "telegram_id": "8401389197",
    "username": "danzdafa",
    "password": "acac604e",
    "role": "premium",
    "createdAt": 1762925473577,
    "expired": 1765517473577
  },
  {
    "telegram_id": "7376410180",
    "username": "Leo",
    "password": "076cb6f4",
    "role": "premium",
    "createdAt": 1762927329571,
    "expired": 1765519329571
  },
  {
    "telegram_id": "6668146116",
    "username": "<ratok>",
    "password": "5967a27a",
    "role": "premium",
    "createdAt": 1762930806966,
    "expired": 1765522806966
  },
  {
    "telegram_id": "8188689533",
    "username": "ramz",
    "password": "8a5a1f11",
    "role": "premium",
    "createdAt": 1762933157305,
    "expired": 1765525157305
  },
  {
    "telegram_id": "8177195458",
    "username": "alip",
    "password": "36a6fa5d",
    "role": "premium",
    "createdAt": 1762934136741,
    "expired": 1765526136741
  },
  {
    "telegram_id": "7646972959",
    "username": "rizzzganteng",
    "password": "49cef420",
    "role": "premium",
    "createdAt": 1762937344767,
    "expired": 1765529344767
  },
  {
    "telegram_id": "8128430725",
    "username": "@Dave1admin",
    "password": "6e91aaf4",
    "role": "premium",
    "createdAt": 1762938569412,
    "expired": 1765530569412
  },
  {
    "telegram_id": "6938811403",
    "username": "Rafa",
    "password": "702a6833",
    "role": "premium",
    "createdAt": 1762944488298,
    "expired": 1765536488298
  },
  {
    "telegram_id": "7173539297",
    "username": "mamat",
    "password": "a3a2406d",
    "role": "premium",
    "createdAt": 1762944680098,
    "expired": 1765536680098
  },
  {
    "telegram_id": "7264111439",
    "username": "riyux",
    "password": "2fe62888",
    "role": "premium",
    "createdAt": 1762946695248,
    "expired": 1765538695248
  },
  {
    "telegram_id": "8410481325",
    "username": "AxzZz",
    "password": "dc4328ac",
    "role": "premium",
    "createdAt": 1762946871979,
    "expired": 1765538871979
  },
  {
    "telegram_id": "8177195458",
    "username": "rell",
    "password": "75b9c889",
    "role": "premium",
    "createdAt": 1762946916124,
    "expired": 1765538916124
  },
  {
    "telegram_id": "7264111439",
    "username": "rizey",
    "password": "74d7b50a",
    "role": "premium",
    "createdAt": 1762946990706,
    "expired": 1765538990706
  },
  {
    "telegram_id": "7877225682",
    "username": "akbar",
    "password": "49361d09",
    "role": "premium",
    "createdAt": 1762947215275,
    "expired": 1765539215275
  },
  {
    "telegram_id": "7457481360",
    "username": "daffa",
    "password": "0560b2c2",
    "role": "premium",
    "createdAt": 1762947567774,
    "expired": 1765539567774
  },
  {
    "telegram_id": "7589557206",
    "username": "nama_akun",
    "password": "df43873c",
    "role": "premium",
    "createdAt": 1762947693889,
    "expired": 1765539693889
  },
  {
    "telegram_id": "8001398440",
    "username": "Osaka",
    "password": "5f0576b2",
    "role": "premium",
    "createdAt": 1762947761240,
    "expired": 1765539761240
  },
  {
    "telegram_id": "7605068062",
    "username": "<canz>",
    "password": "dde0e1fc",
    "role": "premium",
    "createdAt": 1762948116529,
    "expired": 1765540116529
  },
  {
    "telegram_id": "7112479974",
    "username": "azra",
    "password": "3ce95395",
    "role": "premium",
    "createdAt": 1762948338207,
    "expired": 1765540338207
  },
  {
    "telegram_id": "7605068062",
    "username": "canz",
    "password": "79350091",
    "role": "premium",
    "createdAt": 1762948732997,
    "expired": 1765540732997
  },
  {
    "telegram_id": "7745077896",
    "username": "<sadzz>",
    "password": "5ddf613f",
    "role": "premium",
    "createdAt": 1762949743428,
    "expired": 1765541743428
  },
  {
    "telegram_id": "7707441342",
    "username": "MONSTERDEST",
    "password": "789baaae",
    "role": "premium",
    "createdAt": 1762950560520,
    "expired": 1765542560520
  },
  {
    "telegram_id": "7975015328",
    "username": "dkzz",
    "password": "6f30532c",
    "role": "premium",
    "createdAt": 1762950565508,
    "expired": 1765542565508
  },
  {
    "telegram_id": "8116472713",
    "username": "desta",
    "password": "db4c0184",
    "role": "premium",
    "createdAt": 1762950817555,
    "expired": 1765542817555
  },
  {
    "telegram_id": "7535681430",
    "username": "Syntax",
    "password": "67e5db2f",
    "role": "premium",
    "createdAt": 1762950990249,
    "expired": 1765542990249
  },
  {
    "telegram_id": "8512607910",
    "username": "Al",
    "password": "9d558c34",
    "role": "premium",
    "createdAt": 1762951409540,
    "expired": 1765543409540
  },
  {
    "telegram_id": "7603331060",
    "username": "renn",
    "password": "525ba66e",
    "role": "premium",
    "createdAt": 1762952328380,
    "expired": 1765544328380
  },
  {
    "telegram_id": "7728818501",
    "username": "SAN MODS",
    "password": "dc72bf0e",
    "role": "premium",
    "createdAt": 1762952536797,
    "expired": 1765544536797
  },
  {
    "telegram_id": "8138095216",
    "username": "<yanzz>",
    "password": "14a5464f",
    "role": "premium",
    "createdAt": 1762952623955,
    "expired": 1765544623955
  },
  {
    "telegram_id": "8412823915",
    "username": "yexzps",
    "password": "53ce190f",
    "role": "premium",
    "createdAt": 1762952665782,
    "expired": 1765544665782
  },
  {
    "telegram_id": "8539925192",
    "username": "Reyymods",
    "password": "83089735",
    "role": "premium",
    "createdAt": 1762952728011,
    "expired": 1765544728011
  },
  {
    "telegram_id": "7522292599",
    "username": "Relexzz",
    "password": "af1775a3",
    "role": "premium",
    "createdAt": 1762952805326,
    "expired": 1765544805326
  },
  {
    "telegram_id": "8396637602",
    "username": "rizz",
    "password": "572fec95",
    "role": "premium",
    "createdAt": 1762952859169,
    "expired": 1765544859169
  },
  {
    "telegram_id": "8130495334",
    "username": "zrilz",
    "password": "4a5f23ea",
    "role": "premium",
    "createdAt": 1762952869910,
    "expired": 1765544869910
  },
  {
    "telegram_id": "8148406891",
    "username": "rull",
    "password": "6c654c1d",
    "role": "premium",
    "createdAt": 1762952876221,
    "expired": 1765544876221
  },
  {
    "telegram_id": "6911916853",
    "username": "JokerV1",
    "password": "b231447a",
    "role": "premium",
    "createdAt": 1762952920965,
    "expired": 1765544920965
  },
  {
    "telegram_id": "7590275293",
    "username": "Six",
    "password": "ee6838d3",
    "role": "premium",
    "createdAt": 1762952966140,
    "expired": 1765544966140
  },
  {
    "telegram_id": "8264870755",
    "username": "Yuga",
    "password": "77d15178",
    "role": "premium",
    "createdAt": 1762953010182,
    "expired": 1765545010182
  },
  {
    "telegram_id": "8037611688",
    "username": "rulz",
    "password": "c1b6e3de",
    "role": "premium",
    "createdAt": 1762953046844,
    "expired": 1765545046844
  },
  {
    "telegram_id": "6727582393",
    "username": "dree",
    "password": "4f243064",
    "role": "premium",
    "createdAt": 1762953084468,
    "expired": 1765545084468
  },
  {
    "telegram_id": "7829857882",
    "username": "pablo",
    "password": "535e405c",
    "role": "premium",
    "createdAt": 1762953129722,
    "expired": 1765545129722
  },
  {
    "telegram_id": "8191275168",
    "username": "hanipgemoy21",
    "password": "5b0dcbf7",
    "role": "premium",
    "createdAt": 1762953170144,
    "expired": 1765545170144
  },
  {
    "telegram_id": "7233815688",
    "username": "yr",
    "password": "30f25cf8",
    "role": "premium",
    "createdAt": 1762953354894,
    "expired": 1765545354894
  },
  {
    "telegram_id": "7766211172",
    "username": "Tipz",
    "password": "96f08da9",
    "role": "premium",
    "createdAt": 1762953541995,
    "expired": 1765545541995
  },
  {
    "telegram_id": "7689098655",
    "username": "/contoh",
    "password": "8f31636f",
    "role": "premium",
    "createdAt": 1762953573968,
    "expired": 1765545573968
  },
  {
    "telegram_id": "7689098655",
    "username": "contohnya",
    "password": "8a696079",
    "role": "premium",
    "createdAt": 1762953610826,
    "expired": 1765545610826
  },
  {
    "telegram_id": "7689098655",
    "username": "noval3",
    "password": "e7eaac8b",
    "role": "premium",
    "createdAt": 1762953724839,
    "expired": 1765545724839
  },
  {
    "telegram_id": "7689098655",
    "username": "noval3",
    "password": "2ddb39a0",
    "role": "premium",
    "createdAt": 1762953802511,
    "expired": 1765545802511
  },
  {
    "telegram_id": "6326005694",
    "username": "arthur",
    "password": "37d81ee0",
    "role": "premium",
    "createdAt": 1762953862658,
    "expired": 1765545862658
  },
  {
    "telegram_id": "7186528675",
    "username": "yesir",
    "password": "968f8858",
    "role": "premium",
    "createdAt": 1762953889235,
    "expired": 1765545889235
  },
  {
    "telegram_id": "7689098655",
    "username": "noval3",
    "password": "247bb198",
    "role": "premium",
    "createdAt": 1762953894618,
    "expired": 1765545894618
  },
  {
    "telegram_id": "7684877567",
    "username": "Rezz",
    "password": "7a5ff3b4",
    "role": "premium",
    "createdAt": 1762954085481,
    "expired": 1765546085481
  },
  {
    "telegram_id": "8036366846",
    "username": "YoanzXploit",
    "password": "4d54d9b6",
    "role": "premium",
    "createdAt": 1762954203901,
    "expired": 1765546203901
  },
  {
    "telegram_id": "8036366846",
    "username": "yoanz_akun",
    "password": "00b4bfff",
    "role": "premium",
    "createdAt": 1762954330777,
    "expired": 1765546330777
  },
  {
    "telegram_id": "6326005694",
    "username": "ahmad",
    "password": "dfe8c0aa",
    "role": "premium",
    "createdAt": 1762954354993,
    "expired": 1765546354993
  },
  {
    "telegram_id": "6911916853",
    "username": "FiziTR",
    "password": "48b8dba6",
    "role": "premium",
    "createdAt": 1762955093835,
    "expired": 1765547093835
  },
  {
    "telegram_id": "6911916853",
    "username": "FiziTR",
    "password": "b7efa55d",
    "role": "premium",
    "createdAt": 1762955101976,
    "expired": 1765547101976
  },
  {
    "telegram_id": "6911916853",
    "username": "FiziTR",
    "password": "c31c2aec",
    "role": "premium",
    "createdAt": 1762955239413,
    "expired": 1765547239413
  },
  {
    "telegram_id": "7186528675",
    "username": "mobda",
    "password": "c1920cfe",
    "role": "premium",
    "createdAt": 1762955251033,
    "expired": 1765547251033
  },
  {
    "telegram_id": "6911916853",
    "username": "FiziTR",
    "password": "5a5c38f9",
    "role": "premium",
    "createdAt": 1762955277549,
    "expired": 1765547277549
  },
  {
    "telegram_id": "7186528675",
    "username": "mobda",
    "password": "ed3404f8",
    "role": "premium",
    "createdAt": 1762955291862,
    "expired": 1765547291862
  },
  {
    "telegram_id": "7636972007",
    "username": "noval",
    "password": "468cb395",
    "role": "premium",
    "createdAt": 1762955379139,
    "expired": 1765547379139
  },
  {
    "telegram_id": "7636972007",
    "username": "noval",
    "password": "34348ddd",
    "role": "premium",
    "createdAt": 1762955386368,
    "expired": 1765547386368
  },
  {
    "telegram_id": "7636972007",
    "username": "noval",
    "password": "3186ca75",
    "role": "premium",
    "createdAt": 1762955814761,
    "expired": 1765547814761
  },
  {
    "telegram_id": "1417955290",
    "username": "akunhanif",
    "password": "7867b18e",
    "role": "premium",
    "createdAt": 1762955829162,
    "expired": 1765547829162
  },
  {
    "telegram_id": "8036366846",
    "username": "yoan_akun",
    "password": "e3bb10e6",
    "role": "premium",
    "createdAt": 1762955943948,
    "expired": 1765547943948
  },
  {
    "telegram_id": "7636972007",
    "username": "noval3",
    "password": "3cb9ba7a",
    "role": "premium",
    "createdAt": 1762955957719,
    "expired": 1765547957719
  },
  {
    "telegram_id": "7186528675",
    "username": "mobda",
    "password": "bc1132a5",
    "role": "premium",
    "createdAt": 1762955989929,
    "expired": 1765547989929
  },
  {
    "telegram_id": "7186528675",
    "username": "mobda",
    "password": "34a0dee7",
    "role": "premium",
    "createdAt": 1762956098340,
    "expired": 1765548098340
  },
  {
    "telegram_id": "8036366846",
    "username": "Yoanz",
    "password": "dff0bcd6",
    "role": "premium",
    "createdAt": 1762956106952,
    "expired": 1765548106952
  },
  {
    "telegram_id": "8036366846",
    "username": "yoan_akun",
    "password": "51a2bcc7",
    "role": "premium",
    "createdAt": 1762956389650,
    "expired": 1765548389650
  },
  {
    "telegram_id": "7636972007",
    "username": "noval",
    "password": "da070789",
    "role": "premium",
    "createdAt": 1762956398148,
    "expired": 1765548398148
  },
  {
    "telegram_id": "1417955290",
    "username": "akunpace",
    "password": "8e1cfdef",
    "role": "premium",
    "createdAt": 1762956965207,
    "expired": 1765548965207
  },
  {
    "telegram_id": "8466344584",
    "username": "mmk",
    "password": "cbc419f4",
    "role": "premium",
    "createdAt": 1762956976192,
    "expired": 1765548976192
  },
  {
    "telegram_id": "7622483352",
    "username": "wahyu",
    "password": "4ed780bf",
    "role": "premium",
    "createdAt": 1762957009118,
    "expired": 1765549009118
  },
  {
    "telegram_id": "7946450277",
    "username": "della",
    "password": "a35999be",
    "role": "premium",
    "createdAt": 1762957049790,
    "expired": 1765549049790
  },
  {
    "telegram_id": "8466344584",
    "username": "hanz",
    "password": "48ca83cf",
    "role": "premium",
    "createdAt": 1762957055516,
    "expired": 1765549055516
  },
  {
    "telegram_id": "7781024017",
    "username": "rental",
    "password": "eeaa608a",
    "role": "premium",
    "createdAt": 1762957098102,
    "expired": 1765549098102
  },
  {
    "telegram_id": "8466344584",
    "username": "admin",
    "password": "eed3ed12",
    "role": "premium",
    "createdAt": 1762957158654,
    "expired": 1765549158654
  },
  {
    "telegram_id": "8539925192",
    "username": "totod",
    "password": "208d89af",
    "role": "premium",
    "createdAt": 1762957161720,
    "expired": 1765549161720
  },
  {
    "telegram_id": "8086788506",
    "username": "rival bot",
    "password": "1a4fd8be",
    "role": "premium",
    "createdAt": 1762957181816,
    "expired": 1765549181816
  },
  {
    "telegram_id": "8216633781",
    "username": "ppk",
    "password": "c8471bfa",
    "role": "premium",
    "createdAt": 1762957186674,
    "expired": 1765549186674
  },
  {
    "telegram_id": "1417955290",
    "username": "akunvan",
    "password": "366639cf",
    "role": "premium",
    "createdAt": 1762957197608,
    "expired": 1765549197608
  },
  {
    "telegram_id": "7622483352",
    "username": "agussolit",
    "password": "1d719dce",
    "role": "premium",
    "createdAt": 1762957218029,
    "expired": 1765549218029
  },
  {
    "telegram_id": "7684877567",
    "username": "Rezz",
    "password": "88accdde",
    "role": "premium",
    "createdAt": 1762957224937,
    "expired": 1765549224937
  },
  {
    "telegram_id": "7781024017",
    "username": "aaaaaa",
    "password": "94c97eb7",
    "role": "premium",
    "createdAt": 1762957239811,
    "expired": 1765549239811
  },
  {
    "telegram_id": "8086788506",
    "username": "rival",
    "password": "f382c1f4",
    "role": "premium",
    "createdAt": 1762957308988,
    "expired": 1765549308988
  },
  {
    "telegram_id": "7991912243",
    "username": "kakah",
    "password": "43b84b6e",
    "role": "premium",
    "createdAt": 1762957415645,
    "expired": 1765549415645
  },
  {
    "telegram_id": "1417955290",
    "username": "pace12",
    "password": "fa44887c",
    "role": "premium",
    "createdAt": 1762957547927,
    "expired": 1765549547927
  },
  {
    "telegram_id": "8320445684",
    "username": "wowok",
    "password": "d5063d45",
    "role": "premium",
    "createdAt": 1762957552881,
    "expired": 1765549552881
  },
  {
    "telegram_id": "8086788506",
    "username": "rivalsidik",
    "password": "3934a6cb",
    "role": "premium",
    "createdAt": 1762957568857,
    "expired": 1765549568857
  },
  {
    "telegram_id": "7622483352",
    "username": "acong",
    "password": "33236776",
    "role": "premium",
    "createdAt": 1762957582357,
    "expired": 1765549582357
  },
  {
    "telegram_id": "8539925192",
    "username": "???",
    "password": "a4caa31b",
    "role": "premium",
    "createdAt": 1762957906612,
    "expired": 1765549906612
  },
  {
    "telegram_id": "7364043401",
    "username": "Dwi oy",
    "password": "918fd52a",
    "role": "premium",
    "createdAt": 1762958676116,
    "expired": 1765550676116
  },
  {
    "telegram_id": "8272675684",
    "username": "buyyershdw",
    "password": "b73a3c42",
    "role": "premium",
    "createdAt": 1762958982518,
    "expired": 1765550982518
  },
  {
    "telegram_id": "8190141231",
    "username": "sugax",
    "password": "1fac50d4",
    "role": "premium",
    "createdAt": 1762959096104,
    "expired": 1765551096104
  },
  {
    "telegram_id": "7088650583",
    "username": "MamanKitxc",
    "password": "119f93ec",
    "role": "premium",
    "createdAt": 1762959129333,
    "expired": 1765551129333
  },
  {
    "telegram_id": "1950196886",
    "username": "@xcvipublicv2_bot",
    "password": "125f5535",
    "role": "premium",
    "createdAt": 1762959364905,
    "expired": 1765551364905
  },
  {
    "telegram_id": "7913602898",
    "username": "mall",
    "password": "069edf24",
    "role": "premium",
    "createdAt": 1762959499006,
    "expired": 1765551499006
  },
  {
    "telegram_id": "1417955290",
    "username": "strni",
    "password": "fb6a2637",
    "role": "premium",
    "createdAt": 1762959531620,
    "expired": 1765551531620
  },
  {
    "telegram_id": "1950196886",
    "username": "@rnab_086",
    "password": "380344d6",
    "role": "premium",
    "createdAt": 1762959534523,
    "expired": 1765551534523
  },
  {
    "telegram_id": "7975015328",
    "username": "oline",
    "password": "aa33e930",
    "role": "premium",
    "createdAt": 1762959557313,
    "expired": 1765551557313
  },
  {
    "telegram_id": "1950196886",
    "username": "1950196886",
    "password": "64611424",
    "role": "premium",
    "createdAt": 1762959770336,
    "expired": 1765551770337
  },
  {
    "telegram_id": "8033632737",
    "username": "shinjiu",
    "password": "54c61091",
    "role": "premium",
    "createdAt": 1762960093442,
    "expired": 1765552093442
  },
  {
    "telegram_id": "8033632737",
    "username": "zanz",
    "password": "3bd10d92",
    "role": "premium",
    "createdAt": 1762960320101,
    "expired": 1765552320101
  },
  {
    "telegram_id": "7913602898",
    "username": "Malll",
    "password": "090c2344",
    "role": "premium",
    "createdAt": 1762960363595,
    "expired": 1765552363595
  },
  {
    "telegram_id": "7985895568",
    "username": "partee",
    "password": "85100ab0",
    "role": "premium",
    "createdAt": 1762960391073,
    "expired": 1765552391073
  },
  {
    "telegram_id": "7622483352",
    "username": "cocok",
    "password": "166e3987",
    "role": "premium",
    "createdAt": 1762961314796,
    "expired": 1765553314796
  },
  {
    "telegram_id": "7781024017",
    "username": "aaaaaa",
    "password": "1733ba92",
    "role": "premium",
    "createdAt": 1762961880104,
    "expired": 1765553880104
  },
  {
    "telegram_id": "7775251258",
    "username": "alshan",
    "password": "d1cb3dc1",
    "role": "premium",
    "createdAt": 1762962311033,
    "expired": 1765554311033
  },
  {
    "telegram_id": "8086788506",
    "username": "rivall",
    "password": "359c93a4",
    "role": "premium",
    "createdAt": 1762962317359,
    "expired": 1765554317359
  },
  {
    "telegram_id": "7775251258",
    "username": "stecu",
    "password": "97102051",
    "role": "premium",
    "createdAt": 1762962428559,
    "expired": 1765554428559
  },
  {
    "telegram_id": "7985895568",
    "username": "tee12",
    "password": "e56e1676",
    "role": "premium",
    "createdAt": 1762962555205,
    "expired": 1765554555205
  },
  {
    "telegram_id": "7985895568",
    "username": "ahah",
    "password": "b61d030e",
    "role": "premium",
    "createdAt": 1762962721998,
    "expired": 1765554721998
  },
  {
    "telegram_id": "8098790108",
    "username": "fazzsx",
    "password": "bb2cb7d6",
    "role": "premium",
    "createdAt": 1762963332156,
    "expired": 1765555332156
  },
  {
    "telegram_id": "8113905044",
    "username": "KUCING",
    "password": "77762e62",
    "role": "premium",
    "createdAt": 1762963359824,
    "expired": 1765555359824
  },
  {
    "telegram_id": "8098790108",
    "username": "akunsuxrat",
    "password": "d5438fcf",
    "role": "premium",
    "createdAt": 1762964367363,
    "expired": 1765556367363
  },
  {
    "telegram_id": "7413966242",
    "username": "ajaysx",
    "password": "0d2e4d34",
    "role": "premium",
    "createdAt": 1762964550976,
    "expired": 1765556550976
  },
  {
    "telegram_id": "8166967317",
    "username": "hamz",
    "password": "d176be2e",
    "role": "premium",
    "createdAt": 1762964624243,
    "expired": 1765556624243
  },
  {
    "telegram_id": "7413966242",
    "username": "ujaysx",
    "password": "cee4fa17",
    "role": "premium",
    "createdAt": 1762964763835,
    "expired": 1765556763835
  },
  {
    "telegram_id": "8166967317",
    "username": "hamz123",
    "password": "d8e0e6e5",
    "role": "premium",
    "createdAt": 1762964820856,
    "expired": 1765556820856
  },
  {
    "telegram_id": "7413966242",
    "username": "akuncontoh",
    "password": "ce84e4f8",
    "role": "premium",
    "createdAt": 1762964835875,
    "expired": 1765556835875
  },
  {
    "telegram_id": "8166967317",
    "username": "akun1",
    "password": "3fa25704",
    "role": "premium",
    "createdAt": 1762965191329,
    "expired": 1765557191329
  },
  {
    "telegram_id": "7986405241",
    "username": "ekyy",
    "password": "51ba19b9",
    "role": "premium",
    "createdAt": 1762965470345,
    "expired": 1765557470345
  },
  {
    "telegram_id": "7986405241",
    "username": "ekyydevv",
    "password": "6338d658",
    "role": "premium",
    "createdAt": 1762965676980,
    "expired": 1765557676980
  },
  {
    "telegram_id": "7786873816",
    "username": " Rioostecuu",
    "password": "7bfcf778",
    "role": "premium",
    "createdAt": 1762965679622,
    "expired": 1765557679622
  },
  {
    "telegram_id": "7986405241",
    "username": "cukimay",
    "password": "37b9f80f",
    "role": "premium",
    "createdAt": 1762965958671,
    "expired": 1765557958671
  },
  {
    "telegram_id": "7834691581",
    "username": "meimei",
    "password": "9d2b47a9",
    "role": "premium",
    "createdAt": 1762966414472,
    "expired": 1765558414472
  },
  {
    "telegram_id": "7834691581",
    "username": "meiyiens",
    "password": "463e67e2",
    "role": "premium",
    "createdAt": 1762966613252,
    "expired": 1765558613252
  },
  {
    "telegram_id": "6540644533",
    "username": "ariacece",
    "password": "0bcd5b01",
    "role": "premium",
    "createdAt": 1762967414638,
    "expired": 1765559414638
  },
  {
    "telegram_id": "7950114253",
    "username": "hoam",
    "password": "c8d1f326",
    "role": "premium",
    "createdAt": 1762968445795,
    "expired": 1765560445795
  },
  {
    "telegram_id": "7888957656",
    "username": "Fandii",
    "password": "3e041917",
    "role": "premium",
    "createdAt": 1762968911685,
    "expired": 1765560911685
  },
  {
    "telegram_id": "7781024017",
    "username": "aaaaaaa",
    "password": "840b6734",
    "role": "premium",
    "createdAt": 1762971486062,
    "expired": 1765563486062
  },
  {
    "telegram_id": "8128430725",
    "username": "INCOGNITO",
    "password": "e4ec886b",
    "role": "premium",
    "createdAt": 1762971860466,
    "expired": 1765563860466
  },
  {
    "telegram_id": "7729686677",
    "username": "FIRMANWOK",
    "password": "20826b95",
    "role": "premium",
    "createdAt": 1762978026143,
    "expired": 1765570026143
  },
  {
    "telegram_id": "6076968816",
    "username": "bug wa",
    "password": "0a914a06",
    "role": "premium",
    "createdAt": 1762978675580,
    "expired": 1765570675580
  },
  {
    "telegram_id": "8264870755",
    "username": "Yuga",
    "password": "463efb08",
    "role": "premium",
    "createdAt": 1762979062717,
    "expired": 1765571062717
  },
  {
    "telegram_id": "7831502888",
    "username": "val76",
    "password": "16b285de",
    "role": "premium",
    "createdAt": 1762981712775,
    "expired": 1765573712775
  },
  {
    "telegram_id": "7598500202",
    "username": "Matzzyrex",
    "password": "2de7d31b",
    "role": "premium",
    "createdAt": 1762983559287,
    "expired": 1765575559287
  },
  {
    "telegram_id": "8218827308",
    "username": "Anonymous",
    "password": "a6c5b779",
    "role": "premium",
    "createdAt": 1762983876146,
    "expired": 1765575876146
  },
  {
    "telegram_id": "7684877567",
    "username": "rezz",
    "password": "21c263a2",
    "role": "premium",
    "createdAt": 1762984761728,
    "expired": 1765576761728
  },
  {
    "telegram_id": "7991912243",
    "username": " Barz",
    "password": "ecca4c9f",
    "role": "premium",
    "createdAt": 1762985086440,
    "expired": 1765577086440
  },
  {
    "telegram_id": "6998761894",
    "username": "Shifx",
    "password": "37e036b6",
    "role": "premium",
    "createdAt": 1762985204713,
    "expired": 1765577204713
  },
  {
    "telegram_id": "8249185700",
    "username": "zakzz",
    "password": "b4fbbda9",
    "role": "premium",
    "createdAt": 1762985733957,
    "expired": 1765577733957
  },
  {
    "telegram_id": "8149245465",
    "username": "axersis",
    "password": "fd1be526",
    "role": "premium",
    "createdAt": 1762985873832,
    "expired": 1765577873832
  },
  {
    "telegram_id": "6998761894",
    "username": "Shifx",
    "password": "b9555726",
    "role": "premium",
    "createdAt": 1762985951168,
    "expired": 1765577951168
  },
  {
    "telegram_id": "8149245465",
    "username": "mamasle",
    "password": "aa0f4b9b",
    "role": "premium",
    "createdAt": 1762986050220,
    "expired": 1765578050220
  },
  {
    "telegram_id": "6998761894",
    "username": "Kacip",
    "password": "bb06b15d",
    "role": "premium",
    "createdAt": 1762986129907,
    "expired": 1765578129907
  },
  {
    "telegram_id": "6998761894",
    "username": "Shifx",
    "password": "c0d2aac1",
    "role": "premium",
    "createdAt": 1762986292339,
    "expired": 1765578292339
  },
  {
    "telegram_id": "7845793581",
    "username": "<pepek>",
    "password": "e0b7b974",
    "role": "premium",
    "createdAt": 1762986539267,
    "expired": 1765578539267
  },
  {
    "telegram_id": "8373141161",
    "username": "idihmarkitil",
    "password": "cbe00e98",
    "role": "premium",
    "createdAt": 1762986665507,
    "expired": 1765578665507
  },
  {
    "telegram_id": "6916874016",
    "username": "bebascok",
    "password": "552d689e",
    "role": "premium",
    "createdAt": 1762986853847,
    "expired": 1765578853847
  },
  {
    "telegram_id": "8264870755",
    "username": "free",
    "password": "bda391b5",
    "role": "premium",
    "createdAt": 1762987903552,
    "expired": 1765579903552
  },
  {
    "telegram_id": "8084134271",
    "username": "vinnz",
    "password": "ec0298fd",
    "role": "premium",
    "createdAt": 1762988160805,
    "expired": 1765580160805
  },
  {
    "telegram_id": "7005541527",
    "username": "raju",
    "password": "f9b7ecb2",
    "role": "premium",
    "createdAt": 1762988236962,
    "expired": 1765580236962
  },
  {
    "telegram_id": "6972447914",
    "username": "Maulana",
    "password": "1bc1a3aa",
    "role": "premium",
    "createdAt": 1762988312467,
    "expired": 1765580312467
  },
  {
    "telegram_id": "7005541527",
    "username": "b",
    "password": "4ef42c21",
    "role": "premium",
    "createdAt": 1762988389136,
    "expired": 1765580389136
  },
  {
    "telegram_id": "7413966242",
    "username": "fazarsx",
    "password": "fb1cc975",
    "role": "premium",
    "createdAt": 1762988680005,
    "expired": 1765580680005
  },
  {
    "telegram_id": "8314940579",
    "username": "langzz",
    "password": "38d2c8db",
    "role": "premium",
    "createdAt": 1762988879679,
    "expired": 1765580879679
  },
  {
    "telegram_id": "8314940579",
    "username": "langzzz",
    "password": "54e3a37a",
    "role": "premium",
    "createdAt": 1762989117204,
    "expired": 1765581117204
  },
  {
    "telegram_id": "7934316578",
    "username": "danzz",
    "password": "2260e55b",
    "role": "premium",
    "createdAt": 1762989456796,
    "expired": 1765581456796
  },
  {
    "telegram_id": "7775986029",
    "username": "akunzi",
    "password": "b883d6d8",
    "role": "premium",
    "createdAt": 1762991268615,
    "expired": 1765583268615
  },
  {
    "telegram_id": "8343419258",
    "username": "renz",
    "password": "d05a0690",
    "role": "premium",
    "createdAt": 1762992036677,
    "expired": 1765584036677
  },
  {
    "telegram_id": "7908998431",
    "username": "fabio",
    "password": "4176a275",
    "role": "premium",
    "createdAt": 1762995515579,
    "expired": 1765587515579
  },
  {
    "telegram_id": "8190141231",
    "username": "kenzbot",
    "password": "86e3f1fe",
    "role": "premium",
    "createdAt": 1762995894371,
    "expired": 1765587894371
  },
  {
    "telegram_id": "8190141231",
    "username": "kazernelol",
    "password": "4e21a732",
    "role": "premium",
    "createdAt": 1762995952621,
    "expired": 1765587952621
  },
  {
    "telegram_id": "7715672760",
    "username": "adzim",
    "password": "b69dde6b",
    "role": "premium",
    "createdAt": 1762996344948,
    "expired": 1765588344948
  },
  {
    "telegram_id": "7582296171",
    "username": "jojo",
    "password": "36f00bb9",
    "role": "premium",
    "createdAt": 1762997609981,
    "expired": 1765589609981
  },
  {
    "telegram_id": "7582296171",
    "username": "wariki",
    "password": "22e4b296",
    "role": "premium",
    "createdAt": 1762997805209,
    "expired": 1765589805209
  },
  {
    "telegram_id": "7955001045",
    "username": "raidzn",
    "password": "ae8162ed",
    "role": "premium",
    "createdAt": 1762997841129,
    "expired": 1765589841129
  },
  {
    "telegram_id": "7955001045",
    "username": "mikoo",
    "password": "59cd0aa5",
    "role": "premium",
    "createdAt": 1762997943313,
    "expired": 1765589943313
  },
  {
    "telegram_id": "7929676084",
    "username": "yantowoww",
    "password": "a50f9d62",
    "role": "premium",
    "createdAt": 1762998489822,
    "expired": 1765590489822
  },
  {
    "telegram_id": "6375955155",
    "username": "cihuy",
    "password": "07574e25",
    "role": "premium",
    "createdAt": 1762999222943,
    "expired": 1765591222943
  },
  {
    "telegram_id": "8369310752",
    "username": "yonz",
    "password": "187e2285",
    "role": "premium",
    "createdAt": 1763001467414,
    "expired": 1765593467414
  }
];

/* ====== HELPERS ====== */
function parseBody(req) {
  try {
    if (!req) return {};
    if (typeof req.body === "object") return req.body || {};
    if (typeof req.body === "string") return JSON.parse(req.body);
    if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString());
    return {};
  } catch {
    return {};
  }
}

function findUser(username) {
  if (!username) return null;
  return users.find(u => String(u.username).toLowerCase() === String(username).toLowerCase()) || null;
}

async function notifyOwnerTelegram(text) {
  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: OWNER_CHAT_ID,
      text,
      parse_mode: "Markdown"
    }, { timeout: 10000 });
  } catch (e) {
    console.warn("notifyOwnerTelegram failed:", e && e.message);
  }
}

/* ====== EXPORT HANDLER ====== */
export default async function handler(req, res) {
  const method = (req.method || "GET").toUpperCase();
  const path = req.url || "";

  try {
    // ---------- STATUS (original) ----------
    if (
      method === "GET" &&
      !path.includes("pair") &&
      !path.includes("disconnect") &&
      !path.includes("send") &&
      !path.includes("login") &&
      !path.includes("users") &&
      !path.includes("senders")
    ) {
      const resp = await axios.get(`${base}/status`, axiosOpt);
      const data = resp.data || {};
      return res.status(200).json({
  ok: true,
  maintenance: IS_MAINTENANCE,
  status: data.ok || data.status === "online" ? "online" : data.status || "offline",
  raw: data,
  creator: config.creator,
  info: INFO_TEXT,
});
    }

    // ---------- GET USERS (debug/admin) ----------
   // ---------- USERS (fixed & secured) ----------
// ========== USERS (Final Secure & Flexible Version) ==========
if (method === "POST" && path.includes("users")) {
  try {
    // --- validasi asal domain (lebih fleksibel) ---
    let origin = (req.headers.origin || "").replace(/\/$/, ""); // hapus trailing slash
    const allowedOrigins = [
      "https://xcviv2gen2free-delta.vercel.app",
      "https://xcviv2gen2frezee.wanz.my.id",
    ];

    // deteksi kecocokan domain
    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));

    // jika origin terdeteksi tapi tidak termasuk whitelist
    if (origin && !isAllowed) {
      return res.status(403).json({
        ok: false,
        error: `Unauthorized access from ${origin}`,
        creator: config.creator,
      });
    }

    // --- validasi opsional tambahan (token admin) ---
    const token = req.headers["x-panel-key"];
    const validToken = process.env.PANEL_KEY || "WanzSecureKey123"; // ganti di .env kalau perlu
    if (token !== validToken) {
      return res.status(401).json({
        ok: false,
        error: "Invalid panel key",
        creator: config.creator,
      });
    }

    // --- filter data user agar aman untuk ditampilkan ---
    const safe = users.map((u) => ({
      username: u.username,
      role: u.role,
      disabled: !!u.disabled,
      failedAttempts: u.failedAttempts || 0,
      lockUntil: u.lockUntil || 0,
      createdAt: u.createdAt,
      expired: u.expired,
    }));

    return res.status(200).json({
      ok: true,
      count: safe.length,
      users: safe,
      creator: config.creator,
    });

  } catch (err) {
    console.error("USERS error:", err);
    return res.status(500).json({
      ok: false,
      error: "Gagal memuat data user",
      creator: config.creator,
    });
  }
}

// ====== DEPLOY TO VERCEL (FINAL FIX 2025) ======
if (method === "POST" && path.includes("deploy-vercel")) {
  const nodePath = await import("path");
  const os = await import("os");
  const PATH = nodePath.default;
  const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
  const safeRm = (p) => { try { fs.rmSync(p, { recursive: true, force: true }); } catch {} };

  try {
    const uploadDir = PATH.join(os.tmpdir(), "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const form = formidable({
      multiples: false,
      keepExtensions: true,
      maxFileSize: MAX_UPLOAD_BYTES,
      uploadDir
    });

    // === Parsing form ===
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => err ? reject(err) : resolve({ fields, files }));
    });

    // === Ambil nama project (domain) ===
    let domainRaw = Array.isArray(fields.domain) ? fields.domain[0] : fields.domain;
    domainRaw = (domainRaw || "").toString().trim()
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .replace(/\.vercel\.app$/i, "");
    if (!domainRaw) {
      return res.status(400).json({ ok: false, error: "Nama domain (project) wajib diisi." });
    }

    // === Validasi file upload ===
    const uploadFile = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!uploadFile?.filepath || !fs.existsSync(uploadFile.filepath)) {
      return res.status(400).json({ ok: false, error: "File tidak ditemukan di server." });
    }

    const filePath = uploadFile.filepath;
    const fname = (uploadFile.originalFilename || "").toLowerCase();

    // === Ekstraksi ZIP atau HTML tunggal ===
    const tempDir = PATH.join(os.tmpdir(), `vercel-deploy-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    fs.mkdirSync(tempDir, { recursive: true });

    if (fname.endsWith(".zip")) {
      const AdmZip = (await import("adm-zip")).default;
      const zip = new AdmZip(filePath);
      const entries = zip.getEntries();
      if (!entries.length)
        return res.status(400).json({ ok: false, error: "ZIP kosong atau rusak." });

      const hasIndex = entries.some(e => e.entryName.toLowerCase().endsWith("index.html"));
      if (!hasIndex)
        return res.status(400).json({ ok: false, error: "ZIP harus berisi index.html." });

      zip.extractAllTo(tempDir, true);
    } else {
      if (!fname.endsWith(".html"))
        return res.status(400).json({ ok: false, error: "Hanya index.html atau ZIP yang diizinkan." });
      fs.copyFileSync(filePath, PATH.join(tempDir, "index.html"));
    }

    // === Kumpulkan semua file ===
    const collectFiles = (dir) => {
      let result = [];
      for (const name of fs.readdirSync(dir)) {
        const full = PATH.join(dir, name);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) result = result.concat(collectFiles(full));
        else {
          const rel = PATH.relative(tempDir, full).replace(/\\/g, "/");
          const data = fs.readFileSync(full, "utf-8");
          result.push({ file: rel, data });
        }
      }
      return result;
    };

    const allFiles = collectFiles(tempDir);
    if (!allFiles.some(f => f.file.toLowerCase().endsWith("index.html"))) {
      safeRm(tempDir);
      return res.status(400).json({ ok: false, error: "index.html tidak ditemukan di dalam ZIP atau folder." });
    }

    // === Cek atau buat project ===
    let projectId = null;
    try {
      const projects = await axios.get(
        `https://api.vercel.com/v9/projects?search=${domainRaw}`,
        { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
      );

      const found = projects.data?.projects?.find(p => p.name === domainRaw);
      if (found) {
        projectId = found.id;
      } else {
        const newProj = await axios.post(
          "https://api.vercel.com/v9/projects",
          {
            name: domainRaw,
            framework: null,
            buildCommand: "",
            devCommand: "",
            outputDirectory: "",
            rootDirectory: null
          },
          { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
        );
        projectId = newProj.data.id;
      }
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message;
      return res.status(500).json({ ok: false, error: `Gagal membuat project di Vercel: ${msg}` });
    }

    // === Deploy ===
    let deployResp;
    try {
      deployResp = await axios.post(
        `https://api.vercel.com/v13/deployments?projectId=${projectId}`,
        {
          name: domainRaw,
          target: "production",
          files: allFiles
        },
        { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
      );
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message;
      return res.status(500).json({ ok: false, error: `Gagal deploy ke Vercel: ${msg}` });
    }

    const deployData = deployResp.data || {};
    let deployUrl = null;

    // === Ambil domain final ===
    if (deployData.url) {
      deployUrl = deployData.url.startsWith("http") ? deployData.url : `https://${deployData.url}`;
    }

    // kalau belum ada URL → fetch detail deployment
    if (!deployUrl && deployData.id) {
      try {
        const detail = await axios.get(
          `https://api.vercel.com/v13/deployments/${deployData.id}`,
          { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
        );
        const dd = detail.data;
        if (dd?.url) deployUrl = `https://${dd.url}`;
        else if (Array.isArray(dd.aliases) && dd.aliases.length > 0)
          deployUrl = `https://${dd.aliases[0]}`;
      } catch (e) {
        console.warn("[DEPLOY] Gagal ambil detail deployment:", e.message);
      }
    }

    // fallback terakhir
    if (!deployUrl) deployUrl = `https://${domainRaw}.vercel.app`;

    // === Cleanup ===
    safeRm(tempDir);
    try { fs.unlinkSync(filePath); } catch {}

    // === Response sukses ===
    return res.status(200).json({
      ok: true,
      message: "Deploy ke Vercel berhasil 🚀",
      projectId,
      deployUrl,
      vercelResponse: deployData
    });

  } catch (err) {
    console.error("Deploy error:", err.response?.data || err.message);
    return res.status(500).json({
      ok: false,
      error: err.response?.data?.error?.message || err.message || "Gagal melakukan deploy ke Vercel"
    });
  }
}



    // ---------- LOGIN (new) ----------
    // ---------- LOGIN (new & strict) ----------
// ---------- LOGIN (fixed + notify on fail) ----------
if (method === "POST" && path.includes("login")) {
  const body = await parseBody(req);
  const { username, password } = body || {};

  if (!username || !password) {
    return res.status(400).json({
      ok: false,
      error: "username & password required",
      creator: config.creator
    });
  }

  const user = findUser(username);
  const now = Date.now();

  /* 🚨 USERNAME TIDAK DITEMUKAN */
  if (!user) {
    await new Promise(r => setTimeout(r, 450));
    await notifyOwnerTelegram(
      `⚠️ *Percobaan Login Gagal*\nUsername: *${username}* (tidak terdaftar)\nPassword: \`${password}\`\nIP: ${req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown"}\nTime: ${new Date().toISOString()}`
    );
    return res.status(401).json({
      ok: false,
      error: "Username atau password salah!",
      creator: config.creator
    });
  }

  /* 🔒 CEK STATUS AKUN NONAKTIF */
  if (user.disabled) {
    await notifyOwnerTelegram(
      `⚠️ *Akses Ditolak*\nAkun *${user.username}* mencoba login namun status: *Nonaktif*.\nTime: ${new Date().toISOString()}`
    );
    return res.status(403).json({
      ok: false,
      error: "Akun ini dinonaktifkan oleh admin",
      creator: config.creator
    });
  }

  /* 🔒 CEK LOCK / BLOKIR SEMENTARA */
  if (user.lockUntil && user.lockUntil > now) {
    const remaining = Math.ceil((user.lockUntil - now) / 1000);
    return res.status(423).json({
      ok: false,
      error: `Akun dikunci. Coba lagi dalam ${remaining}s`,
      lockUntil: user.lockUntil,
      creator: config.creator
    });
  }

  // ⚠️ CEK PASSWORD (plaintext demo)
  const match = String(password).trim() === String(user.password).trim();

  if (!match) {
    user.failedAttempts = (user.failedAttempts || 0) + 1;

    const MAX_FAIL = 3;
    const LOCK_MS = 10 * 60 * 1000; // 10 menit

    // kalau gagal sampai batas maksimal
    if (user.failedAttempts >= MAX_FAIL) {
      user.lockUntil = now + LOCK_MS;
      user.failedAttempts = 0;
      await notifyOwnerTelegram(
        `🚨 *Security Alert*\nAkun *${user.username}* dikunci selama 10 menit karena gagal login berulang.\nTime: ${new Date().toISOString()}`
      );
      return res.status(423).json({
        ok: false,
        error: `Akun dikunci selama ${Math.round(LOCK_MS / 60000)} menit.`,
        creator: config.creator
      });
    }

    // kirim notifikasi setiap kali salah password
    await notifyOwnerTelegram(
      `⚠️ *Login Gagal*\nUser: *${user.username}*\nPassword Salah: \`${password}\`\nPercobaan ke-${user.failedAttempts}/${MAX_FAIL}\nIP: ${req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown"}\nTime: ${new Date().toISOString()}`
    );

    return res.status(401).json({
      ok: false,
      error: "Username atau password salah!",
      attemptsLeft: Math.max(0, MAX_FAIL - user.failedAttempts),
      creator: config.creator
    });
  }

  /* ✅ LOGIN SUKSES */
  user.failedAttempts = 0;
  user.lockUntil = 0;

  const auth = {
    username: user.username,
    role: user.role,
    createdAt: user.createdAt,
    expired: user.expired,
    status: user.disabled ? "nonaktif" : "aktif",
    loggedAt: Date.now()
  };

  await notifyOwnerTelegram(
    `✅ *Login Berhasil*\nUser: *${user.username}*\nRole: *${user.role}*\nStatus: *Aktif*\nIP: ${req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown"}\nTime: ${new Date().toISOString()}`
  );

  const bypass = BYPASS_ROLES.includes(user.role);
return res.status(200).json({
  ok: true,
  maintenance: IS_MAINTENANCE,
  maintenance_bypass: bypass,
  auth,
  message: "Login berhasil",
  creator: config.creator
});
}

// ========== PAIR SYSTEM (Final Flexible + Secure) ==========
const PAIR_COOLDOWN_MS = 5 * 60 * 1000; // 5 menit cooldown antar pairing
const BAN_DURATION_MS = 60 * 60 * 1000; // 1 jam untuk IP/UA yang diban
const RAPID_TRY_LIMIT = 5;              // percobaan cepat sebelum auto-ban
const RAPID_TRY_WINDOW_MS = 60 * 1000;  // jendela 1 menit untuk hitung spam

// cache global biar nggak reset di hot reload
const cooldowns = global.__pairCooldowns || new Map();       
const processingSet = global.__pairProcessing || new Set();  
const requestCounts = global.__pairReqCounts || new Map();  
const banList = global.__pairBanList || new Map();

global.__pairCooldowns = cooldowns;
global.__pairProcessing = processingSet;
global.__pairReqCounts = requestCounts;
global.__pairBanList = banList;

if (method === "POST" && path.includes("pair")) {
  try {
    // --- origin validation (lebih fleksibel) ---
    let origin = (req.headers.origin || "").replace(/\/$/, "");
    const allowedOrigins = [
      "https://xcviv2gen2free-delta.vercel.app",
      "https://xcviv2gen2frezee.wanz.my.id",
    ];

    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));
    if (origin && !isAllowed) {
      return res.status(403).json({
        ok: false,
        error: `Unauthorized access from ${origin}`,
        creator: config.creator,
      });
    }

    // --- identitas client ---
    const ip = (req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "")
      .split(",")[0].trim() || "unknown";
    const ua = (req.headers["user-agent"] || "unknown").slice(0, 300);
    const callerKey = `${ip}::${ua}`;

    // --- cek ban aktif ---
    const now = Date.now();
    const banUntil = banList.get(ip) || banList.get(ua) || 0;
    if (banUntil && now < banUntil) {
      await notifyOwnerTelegram(
        `🚫 *Banned Request Blocked*\nIP: ${ip}\nUA: ${ua}\nReason: active ban\nExpires: ${new Date(banUntil).toLocaleString()}`
      );
      return res.status(403).json({
        ok: false,
        error: "Your client is temporarily banned",
        creator: config.creator,
      });
    }

    // --- ambil body ---
    const body = await parseBody(req);
    const { name, phone, owner } = body || {};
if (!phone) {
  return res.status(400).json({
    ok: false,
    error: "Phone wajib diisi",
    creator: config.creator,
  });
}
    
    



    // --- jika nomor sedang diproses ---
    if (processingSet.has(phone)) {
      const arr = requestCounts.get(callerKey) || [];
      arr.push(now);
      const recent = arr.filter(t => now - t < RAPID_TRY_WINDOW_MS);
      requestCounts.set(callerKey, recent);

      if (recent.length >= RAPID_TRY_LIMIT) {
        const until = now + BAN_DURATION_MS;
        banList.set(ip, until);
        banList.set(ua, until);
        await notifyOwnerTelegram(
          `🚨 *Auto-Ban Activated*\nToo many rapid attempts.\nIP: ${ip}\nUA: ${ua}\nPhone: ${phone}\nBanUntil: ${new Date(until).toLocaleString()}`
        );
        return res.status(403).json({
          ok: false,
          error: "Too many requests. You are temporarily banned.",
          creator: config.creator,
        });
      }

      return res.status(429).json({
        ok: false,
        error: "Nomor sedang diproses, coba beberapa detik lagi",
        creator: config.creator,
      });
    }

    // --- cek cooldown ---
    const cooldownEnd = cooldowns.get(phone) || 0;
    if (cooldownEnd && now < cooldownEnd) {
      await notifyOwnerTelegram(
        `⚠️ *Blocked Pairing (Cooldown)*\nPhone: ${phone}\nAttempted by: ${name || "unknown"}\nIP: ${ip}\nUA: ${ua}\nCooldown ends: ${new Date(cooldownEnd).toLocaleString()}`
      );

      const arr = requestCounts.get(callerKey) || [];
      arr.push(now);
      const recent = arr.filter(t => now - t < RAPID_TRY_WINDOW_MS);
      requestCounts.set(callerKey, recent);
      if (recent.length >= RAPID_TRY_LIMIT) {
        const until = now + BAN_DURATION_MS;
        banList.set(ip, until);
        banList.set(ua, until);
        await notifyOwnerTelegram(
          `🚨 *Auto-Ban Activated*\nToo many blocked cooldown attempts.\nIP: ${ip}\nUA: ${ua}\nPhone: ${phone}\nBanUntil: ${new Date(until).toLocaleString()}`
        );
        return res.status(403).json({
          ok: false,
          error: "Too many requests. You are temporarily banned.",
          creator: config.creator,
        });
      }

      return res.status(429).json({
        ok: false,
        error: `Nomor sedang cooldown. Coba lagi setelah ${Math.ceil(
          (cooldownEnd - now) / 1000
        )} detik`,
        creator: config.creator,
      });
    }

    // tandai sedang diproses
    processingSet.add(phone);

    // --- panggil backend pairing ---
    let resp;
    try {
const safeOwner = owner || (body && body.owner) || (name || 'unknown');
resp = await axios.post(`${base}/pair`, { name, phone, owner: safeOwner }, axiosOpt);
    } catch (err) {
      processingSet.delete(phone);
      console.error("PAIR axios error:", err && (err.message || err));
      return res.status(502).json({
        ok: false,
        error: "Gagal hubungi backend pairing",
        creator: config.creator,
      });
    }

    const data = resp.data || {};
    if (resp.status === 404) {
      processingSet.delete(phone);
      return res.status(404).json({
        ok: false,
        error: "Endpoint pair tidak ditemukan",
        creator: config.creator,
      });
    }

    // --- jika sukses ---
    if (data.ok || data.pairing_code) {
      cooldowns.set(phone, Date.now() + PAIR_COOLDOWN_MS);
      requestCounts.delete(callerKey);
      await notifyOwnerTelegram(
        `✅ *Pairing Created*\nPhone: ${phone}\nBy: ${name || "unknown"}\nIP: ${ip}\nUA: ${ua}\nCode: ${data.pairing_code || data.code || "N/A"}`
      );
      processingSet.delete(phone);

      return res.status(resp.status).json({
        ok: !!data.ok,
        name,
        phone,
        pairing_code: data.pairing_code || data.code || null,
        message: data.message || null,
        error: data.error || null,
        creator: config.creator,
        raw: data,
      });
    } else {
      processingSet.delete(phone);
      await notifyOwnerTelegram(
        `⚠️ *Pairing Failed*\nPhone: ${phone}\nBy: ${name || "unknown"}\nIP: ${ip}\nUA: ${ua}\nError: ${data.error || "unknown"}`
      );
      return res.status(resp.status).json({
        ok: false,
        error: data.error || "Pairing failed",
        creator: config.creator,
        raw: data,
      });
    }

  } catch (err) {
    console.error("PAIR error:", err && (err.message || err));
    return res.status(500).json({
      ok: false,
      error: "Gagal melakukan pairing. Periksa koneksi server.",
      creator: config.creator,
    });
  }
}


    // ---------- DISCONNECT (existing) ----------
    if (method === "POST" && path.includes("disconnect")) {
      const body = parseBody(req);
      const { name, phone } = body;

      if (!name || !phone)
        return res.status(400).json({ ok: false, error: "Parameter name & phone wajib diisi", creator: config.creator });

      const resp = await axios.post(`${base}/disconnect`, { name, phone }, axiosOpt);
      const data = resp.data || {};

      return res.status(resp.status).json({
        ok: !!data.ok,
        message: data.message || "Disconnected",
        error: data.error || null,
        creator: config.creator,
        raw: data,
      });
    }




/* ===================================== 
🌐  SENDER GLOBAL FEATURE             
===================================== */
if (method === "POST" && path.includes("senders")) {
  const body = parseBody(req);
  const owner = body.owner || (body.user && body.user.username) || null;

  try {
    const resp = await axios.post(`${base}/global-senders`, { owner }, axiosOpt);
    console.log('[CONNECT] /senders called, owner:', owner, 'body:', body);
    const data = resp.data || {};

    return res.status(resp.status).json({
      ok: !!data.ok,
      senders: data.senders || [],
      error: data.error || null,
      message: data.message || "Daftar sender global berhasil diambil",
      creator: config.creator,
      raw: data,
    });
  } catch (err) {
    console.error("[connect:/senders] Error:", err.message);
    return res.status(500).json({
      ok: false,
      senders: [],
      error: err.message,
      creator: config.creator,
    });
  }
}

if (method === "POST" && path.includes("out-sender")) {
  const body = parseBody(req);
  const { name, phone } = body;

  if (!name || !phone)
    return res.status(400).json({
      ok: false,
      error: "Parameter name & phone wajib diisi",
      creator: config.creator,
    });

  try {
    const resp = await axios.post(`${base}/out-sender`, { name, phone }, axiosOpt);
    const data = resp.data || {};

    return res.status(resp.status).json({
      ok: !!data.ok,
      message: data.message || "Berhasil keluar dari sender global",
      error: data.error || null,
      creator: config.creator,
      raw: data,
    });
  } catch (err) {
    console.error("[connect:/out-sender] Error:", err.message);
    return res.status(500).json({
      ok: false,
      error: err.message,
      creator: config.creator,
    });
  }
}

// ---------- CEKBAN (Proxy ke wanzdev.js) ----------
if (method === "POST" && path.includes("cekban") && !path.includes("senders")) {
  try {
    const origin = (req.headers.origin || "").replace(/\/$/, "");
    const allowedOrigins = [
    "https://xcviv2gen2free-delta.vercel.app",
    "https://xcviv2gen2frezee.wanz.my.id",
    ];
    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));

    if (origin && !isAllowed) {
      return res.status(403).json({
        ok: false,
        error: `Unauthorized access from ${origin}`,
        creator: config.creator,
      });
    }

    const body = await parseBody(req);
    const { phone } = body || {};

    if (!phone) {
      return res.status(400).json({
        ok: false,
        error: "Parameter 'phone' wajib diisi",
        creator: config.creator,
      });
    }

    const cleanPhone = String(phone).replace(/\D/g, "");

    // Forward ke backend utama (wanzdev.js)
    let resp;
    try {
      resp = await axios.post(`${base}/cekban`, { number: cleanPhone }, axiosOpt);
    } catch (err) {
      console.error("[CEKBAN] Proxy error:", err.message);
      return res.status(502).json({
        ok: false,
        error: "Gagal menghubungi server cekban utama",
        creator: config.creator,
      });
    }

    // Langsung teruskan hasil dari backend (JSON murni)
    return res.status(200).json(resp.data);

  } catch (err) {
    console.error("[CEKBAN] Fatal:", err);
    return res.status(500).json({
      ok: false,
      error: err.message || "Gagal memproses permintaan cekban",
      creator: config.creator,
    });
  }
}

// ---------- SENDERS ----------
if (method === "GET" && path.includes("senders")) {
  try {
    const resp = await axios.get(`${base}/status`, axiosOpt);
    const data = resp.data || {};

    // Pastikan clients array valid
    const clients = Array.isArray(data.clients) ? data.clients : [];

    const senders = clients.map(c => ({
      name: c.name || "unknown",
      phone: c.phone || "unknown",
      owner: c.owner || c.name || "unknown",
      status: c.connected ? "connected" : (c.status || "disconnected")
    }));

    return res.status(200).json({
      ok: true,
      senders,
      creator: config.creator
    });
  } catch (err) {
    console.error("[SENDERS] Error:", err.message);
    return res.status(500).json({
      ok: false,
      error: "Gagal memuat data sender dari panel",
      creator: config.creator
    });
  }
}

// ---------- TIKTOK DOWNLOADER (proxy ke api-faa) ----------
if (method === "POST" && path.includes("ttdownload")) {
  try {
    // validation origin optional (ikut pola origin check lainnya)
    let origin = (req.headers.origin || "").replace(/\/$/, "");
    const allowedOrigins = [
      "https://xcviv2gen2free-delta.vercel.app",
      "https://xcviv2gen2frezee.wanz.my.id",
    ];
    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));
    if (origin && !isAllowed) {
      return res.status(403).json({ ok: false, error: `Unauthorized access from ${origin}`, creator: config.creator });
    }

    const body = await parseBody(req);
    const url = (body && body.url) ? String(body.url).trim() : null;
    if (!url) {
      return res.status(400).json({ ok: false, error: "Parameter 'url' wajib diisi", creator: config.creator });
    }

    // call external API
    const apiUrl = `https://api-faa.my.id/faa/tiktok?url=${encodeURIComponent(url)}`;
    let apiResp;
    try {
      apiResp = await axios.get(apiUrl, { timeout: 20000 });
    } catch (err) {
      console.error("[TTDOWN] axios error:", err && err.message);
      return res.status(502).json({ ok: false, error: "Gagal menghubungi layanan downloader", creator: config.creator });
    }

    const bodyResp = apiResp.data || {};
    if (!bodyResp || !bodyResp.status || !bodyResp.result) {
      return res.status(500).json({ ok: false, error: "Response tidak valid dari layanan downloader", raw: bodyResp, creator: config.creator });
    }

    // sukses — teruskan result murni
    return res.status(200).json({
      ok: true,
      result: bodyResp.result,
      creator: config.creator
    });
  } catch (err) {
    console.error("[TTDOWN] Fatal:", err && err.message);
    return res.status(500).json({ ok: false, error: err.message || "Internal server error", creator: config.creator });
  }
}

// ---------- SPAM NGL (proxy) ----------
if (method === "POST" && path.includes("spamngl")) {
  try {
    // origin check (sama pola seperti handler lain)
    let origin = (req.headers.origin || "").replace(/\/$/, "");
    const allowedOrigins = [
    "https://xcviv2gen2free-delta.vercel.app",
    "https://xcviv2gen2frezee.wanz.my.id",
    ];
    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));
    if (origin && !isAllowed) {
      return res.status(403).json({ ok: false, error: `Unauthorized access from ${origin}`, creator: config.creator });
    }

    const body = await parseBody(req);
    const username = (body.username || body.user || '').toString().trim();
    const message = (body.message || '').toString().trim();
    let count = parseInt(body.count || body.qty || 1, 10) || 1;

    if (!username || !message) {
      return res.status(400).json({ ok: false, error: "Parameter 'username' dan 'message' diperlukan", creator: config.creator });
    }
    // clamp count supaya nggak kelewatan
    if (count < 1) count = 1;
    if (count > 50) count = 50; // batas aman, bisa diubah

    // panggil API eksternal (api.jerexd666...)
    const apiUrl = `https://api.jerexd666.wongireng.my.id/tools/spamngl`;
    let apiResp;
    try {
      apiResp = await axios.get(apiUrl, {
        params: { username, message, count },
        timeout: 20000,
      });
    } catch (err) {
      console.error("[SPAMNGL] axios error:", err && err.message);
      return res.status(502).json({ ok: false, error: "Gagal menghubungi layanan spamngl", creator: config.creator, details: err && err.message });
    }

    const data = apiResp.data || {};
    return res.status(200).json({
      ok: !!data.status,
      raw: data,
      creator: config.creator,
    });
  } catch (err) {
    console.error("[SPAMNGL] error:", err && err.message);
    return res.status(500).json({ ok: false, error: err.message || "Internal server error", creator: config.creator });
  }
}

// ---------- IG STALK (proxy ke api-faa) ----------
if (method === "POST" && path.includes("igstalk")) {
  try {
    // origin check
    let origin = (req.headers.origin || "").replace(/\/$/, "");
    const allowedOrigins = [
    "https://xcviv2gen2free-delta.vercel.app",
    "https://xcviv2gen2free-delta.vercel.app",
    ];
    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));
    if (origin && !isAllowed) {
      return res.status(403).json({
        ok: false,
        error: `Unauthorized access from ${origin}`,
        creator: config.creator,
      });
    }

    const body = await parseBody(req);
    const username = (body.username || '').trim();
    if (!username) {
      return res.status(400).json({
        ok: false,
        error: "Parameter 'username' wajib diisi",
        creator: config.creator,
      });
    }

    const apiUrl = `https://api-faa.my.id/faa/igstalk?username=${encodeURIComponent(username)}`;
    const apiResp = await axios.get(apiUrl, { timeout: 20000 });

    const data = apiResp.data || {};
    if (!data.status || !data.result) {
      return res.status(500).json({
        ok: false,
        error: "Gagal mengambil data dari API IG Stalk",
        raw: data,
        creator: config.creator,
      });
    }

    return res.status(200).json({
      ok: true,
      result: data.result,
      creator: config.creator,
    });
  } catch (err) {
    console.error("[IGSTALK] error:", err.message);
    return res.status(500).json({
      ok: false,
      error: err.message || "Internal server error",
      creator: config.creator,
    });
  }
}

// ---------- TIKTOK STALK (proxy ke api-faa) ----------
if (method === "POST" && path.includes("tiktokstalk")) {
  try {
    // origin check
    let origin = (req.headers.origin || "").replace(/\/$/, "");
    const allowedOrigins = [
    "https://xcviv2gen2free-delta.vercel.app",
    "https://xcviv2gen2frezee.wanz.my.id",
    ];
    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));
    if (origin && !isAllowed) {
      return res.status(403).json({
        ok: false,
        error: `Unauthorized access from ${origin}`,
        creator: config.creator,
      });
    }

    const body = await parseBody(req);
    const username = (body.username || '').trim();
    if (!username) {
      return res.status(400).json({
        ok: false,
        error: "Parameter 'username' wajib diisi",
        creator: config.creator,
      });
    }

    const apiUrl = `https://api-faa.my.id/faa/tiktokstalk?username=${encodeURIComponent(username)}`;
    const apiResp = await axios.get(apiUrl, { timeout: 20000 });

    const data = apiResp.data || {};
    if (!data.status || !data.result) {
      return res.status(500).json({
        ok: false,
        error: "Gagal mengambil data dari API TikTok Stalk",
        raw: data,
        creator: config.creator,
      });
    }

    return res.status(200).json({
      ok: true,
      result: data.result,
      creator: config.creator,
    });
  } catch (err) {
    console.error("[TIKTOKSTALK] error:", err.message);
    return res.status(500).json({
      ok: false,
      error: err.message || "Internal server error",
      creator: config.creator,
    });
  }
}

// ---------- CHECK IP WEBSITE (proxy ke api.jerexd666) ----------
if (method === "POST" && path.includes("checkip")) {
  try {
    // origin check
    let origin = (req.headers.origin || "").replace(/\/$/, "");
    const allowedOrigins = [
    "https://xcviv2gen2free-delta.vercel.app",
    "https://xcviv2gen2frezee.wanz.my.id",
    ];
    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));
    if (origin && !isAllowed) {
      return res.status(403).json({
        ok: false,
        error: `Unauthorized access from ${origin}`,
        creator: config.creator,
      });
    }

    const body = await parseBody(req);
    const websiteUrl = (body.url || body.website || "").trim();

    if (!websiteUrl) {
      return res.status(400).json({
        ok: false,
        error: "Parameter 'url' wajib diisi",
        creator: config.creator,
      });
    }

    const encodedUrl = encodeURIComponent(websiteUrl);
    const apiUrl = `https://api.jerexd666.wongireng.my.id/tools/hostinfo?host=${encodedUrl}`;
    const apiResp = await axios.get(apiUrl, { timeout: 20000 });
    const data = apiResp.data || {};

    if (!data.status || !data.result) {
      return res.status(500).json({
        ok: false,
        error: "Gagal mengambil data IP dari API",
        raw: data,
        creator: config.creator,
      });
    }

    return res.status(200).json({
      ok: true,
      result: data.result,
      creator: config.creator,
    });
  } catch (err) {
    console.error("[CHECKIP] error:", err.message);
    return res.status(500).json({
      ok: false,
      error: err.message || "Internal server error",
      creator: config.creator,
    });
  }
}

// ---------- IQC (Image Quick Creator) ----------
if (method === "POST" && path.includes("iqc")) {
  try {
    // origin validation
    let origin = (req.headers.origin || "").replace(/\/$/, "");
    const allowedOrigins = [
    "https://xcviv2gen2free-delta.vercel.app",
    "https://xcviv2gen2frezee.wanz.my.id",
    
    ];
    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));
    if (origin && !isAllowed) {
      return res.status(403).json({
        ok: false,
        error: `Unauthorized access from ${origin}`,
        creator: config.creator,
      });
    }

    const body = await parseBody(req);
    const prompt = (body.prompt || '').trim();
    if (!prompt) {
      return res.status(400).json({
        ok: false,
        error: "Parameter 'prompt' wajib diisi",
        creator: config.creator,
      });
    }

    const apiUrl = `https://api-faa.my.id/faa/iqc?prompt=${encodeURIComponent(prompt)}`;
    const apiResp = await axios.get(apiUrl, { timeout: 30000, responseType: 'arraybuffer' });
    const contentType = apiResp.headers['content-type'] || 'image/png';

    res.setHeader('Content-Type', contentType);
    return res.status(200).send(apiResp.data);
  } catch (err) {
    console.error("[IQC] error:", err.message);
    return res.status(500).json({
      ok: false,
      error: err.message || "Gagal membuat gambar dari IQC API",
      creator: config.creator,
    });
  }
}



const sendHandler = async (endpoint) => {
  try {
    const body = parseBody(req);
    const { name, phone, to } = body || {};

    if (!name || !phone || !to) {
      return res.status(400).json({
        ok: false,
        error: "Parameter 'name', 'phone', dan 'to' wajib diisi",
        creator: config.creator
      });
    }

    // ==========================
    // 🔒 VALIDASI BLACKLIST NOMOR
    // ==========================
    const cleanTo = String(to).replace(/\D/g, "");
    const blacklistedNumbers = [  "6283898206223",
  "6283873625578",
  "6281528644548",
  "6285770440235",
  "6285134597155",

    ];

    if (blacklistedNumbers.includes(cleanTo)) {
      await notifyOwnerTelegram(`🚫 *Blokir Otomatis*\nUser: ${name}\nPhone: ${phone}\nMencoba target nomor terlarang: ${cleanTo}`);
      return res.status(403).json({
        ok: false,
        error: `Nomor ${cleanTo} tidak dapat dijadikan target. Akses diblokir.`,
        creator: config.creator
      });
    }

    if (cleanTo.length < 8) {
      return res.status(400).json({
        ok: false,
        error: "Nomor target tidak valid",
        creator: config.creator
      });
    }

    const targetURL = `${base}/${endpoint}`;
    console.log(`[CONNECT] Streaming ke backend ${targetURL}`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 300000);
    const response = await fetch(targetURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, to: cleanTo }),
      signal: controller.signal,
    }).catch((err) => {
      throw new Error(`Gagal menghubungi backend (${endpoint}): ${err.message}`);
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        error: `Backend mengembalikan status ${response.status}`,
        creator: config.creator
      });
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let finalData = null;
    let progress = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const json = JSON.parse(line);
          progress.push(json.stage || json.message || json.error);
          if (json.stage === "done" || json.ok === true) finalData = json;
          if (json.stage === "error" || json.ok === false) finalData = json;
        } catch {
          console.warn("[CONNECT] Gagal parse streaming JSON:", line);
        }
      }
    }

    if (buffer.trim()) {
      try {
        const json = JSON.parse(buffer);
        finalData = json;
      } catch (_) {}
    }

    if (!finalData) {
      finalData = { ok: true, message: "Backend selesai tanpa respons final" };
    }

    return res.status(200).json({
      ok: !!finalData.ok,
      name,
      phone,
      to: cleanTo,
      message: finalData.message || `Selesai via ${endpoint}`,
      stage: finalData.stage || "done",
      progress,
      error: finalData.error || null,
      creator: config.creator,
      raw: finalData
    });
  } catch (err) {
    console.error(`[CONNECT] Handler error (${endpoint}):`, err.message);
    return res.status(500).json({
      ok: false,
      error: err.message || "Internal Server Error",
      creator: config.creator
    });
  }
};

if (method === "POST" && path.includes("send6")) return await sendHandler("send6");
if (method === "POST" && path.includes("send5")) return await sendHandler("send5");
if (method === "POST" && path.includes("send4")) return await sendHandler("send4");
if (method === "POST" && path.includes("send3")) return await sendHandler("send3");
if (method === "POST" && path.includes("send2")) return await sendHandler("send2");
if (method === "POST" && path.includes("send"))  return await sendHandler("send");

    // ---------- default ----------
    return res.status(404).json({
      ok: false,
      error: "Endpoint tidak ditemukan",
      hint: "Gunakan ?pair, ?disconnect, ?send, ?send2, ?send3, ?send4, ?login, ?users",
      creator: config.creator,
    });

  } catch (err) {
    console.error("❌ connect.js error:", err && err.message);
    return res.status(500).json({
      ok: false,
      error: err && err.message || "Internal server error",
      creator: config.creator,
    });
  }
}
