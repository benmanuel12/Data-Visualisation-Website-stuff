"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putTweets = void 0;
var moment = require('moment');
function putTweets(dataArray) {
    return __awaiter(this, void 0, void 0, function () {
        var AWS, _loop_1, i;
        return __generator(this, function (_a) {
            AWS = require("aws-sdk");
            AWS.config.update({
                region: "us-east-1",
                endpoint: "https://dynamodb.us-east-1.amazonaws.com"
            });
            _loop_1 = function (i) {
                var documentClient = new AWS.DynamoDB.DocumentClient();
                // Process date to timestamp
                var dateString = dataArray[i][1];
                // need YYYY-MM-DDTHH:MM:SS.sssZ
                var dateStringArray = dateString.split(" ");
                dateString = dateStringArray[5] + "-" + moment().month(dateStringArray[1]).format("MM") + "-" + dateStringArray[2] + "T" + dateStringArray[3] + ".000Z";
                var myDate = Date.parse(dateString);
                var myDateStringTemp = myDate.toString();
                myDateStringTemp = myDateStringTemp.slice(0, -3);
                myDate = parseInt(myDateStringTemp);
                var params = {
                    TableName: "TweetData",
                    Item: {
                        TweetID: dataArray[i][0],
                        TweetTime: myDate,
                        TweetText: dataArray[i][2],
                        Location: dataArray[i][3]
                    }
                };
                // let result: any = await documentClient.put(params).promise()
                // console.log(result)
                documentClient.put(params, function (err, data) {
                    if (err) {
                        console.error("Unable to add item");
                        console.error("Error JSON:", JSON.stringify(err));
                    }
                    else {
                        console.log("Weather added to table:", params.Item);
                    }
                });
            };
            for (i = 0; i < dataArray.length; i++) {
                _loop_1(i);
            }
            return [2 /*return*/];
        });
    });
}
exports.putTweets = putTweets;
