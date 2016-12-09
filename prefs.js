/*jshint node:true */
/*jshint -W097 */
/*jshint esversion: 6 */
"use strict";

var async = require('async');
var aws   = require('aws-sdk');

var config = {
    aws_credentials: './aws_config.json',
    db: {
        table_name: 'METAR_preferences',
    },
    default_userinfo: {
        preferences: {
            wind_reference: 'magnetic',
            default_airport: null,
        },
        stats: {
            use_count: 0,
            last_use: "",
        }
    }
};

// set up to use database
aws.config.loadFromPath(config.aws_credentials);


function setUserInfo(userId,info,cb) {
    if (userId && (userId !== null)) {
        info.stats.use_count++;
        info.stats.last_use = Math.floor(Date.now() / 1000);
        var p = {
            TableName: config.db.table_name,
            Item: {
                userId: userId,
                stats: info.stats,
                preferences: info.preferences,
            }
        };

        var docClient = new aws.DynamoDB.DocumentClient();
        docClient.put(p,function(e,d) {
            if (e) {
                console.error('-err- unable to put',
		        JSON.stringify(e,null,2));
            } else {
                console.log('-info- successfully updated ' + userId);
                console.log(p);
            }
            cb(e);
        });
    } else {
        console.error('no valid user id');
    }
}

function getUserInfo(userId,cb) {
    console.log('-d- getUserInfo userId: ' + userId);
    var user_info = config.default_userinfo;
    if (userId && (userId !== null)) {
        var p = {
            TableName: config.db.table_name,
            KeyConditionExpression: "#id = :userid",
            ExpressionAttributeNames: {
                "#id": "userId"
            },
            ExpressionAttributeValues: {
                ":userid": userId
            }
        };

        var docClient = new aws.DynamoDB.DocumentClient();
        docClient.query(p,function(e,d) {
            if (e) {
                console.error('-err- unable to query: ',
                    JSON.stringify(e,null,2));
                    return cb('err',user_info);
            } else {
                if (d.Count > 0) {
                    console.log('-info- query returned result(s)');
                    if (d.Count > 1)  console.log('-warn- multiple users matched query');
                    user_info = d.Items[0];
                    console.log(user_info);
                    return cb(null,user_info);
                } else {
                    console.log('-warn- query returned no results');
                    return cb('warn',user_info);
                }
            }
        });

    } else {
        console.log('-warn- unknown user, using default preferences');
        return cb('warn', user_info);
    }
}


module.exports = {
    getUserInfo: getUserInfo,
    setUserInfo: setUserInfo,
};


