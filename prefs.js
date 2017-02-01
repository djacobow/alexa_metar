/*jshint node:true */
/*jshint -W097 */
/*jshint esversion: 6 */
"use strict";

var async = require('async');
var aws   = require('aws-sdk');

var config = {
    aws_credentials: './aws_config.json',
    pref_db: {
        table_name: 'METAR_preferences',
    },
    cache_db: {
        metar_table_name: 'weathercache',
        taf_table_name: 'forecastcache',
        max_age: 3 * 60,
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

function sta_get(id,type,cb) {
    var tname = type === 'taf' ?
                config.cache_db.taf_table_name :
                config.cache_db.metar_table_name;

    var p = {
        TableName: tname,
        KeyConditionExpression: "#id = :staid",
        ExpressionAttributeNames: {
            "#id": "station"
        },
        ExpressionAttributeValues: {
            ":staid" :  id,
        },
    };

    var docClient = new aws.DynamoDB.DocumentClient();
    var five_minutes_ago = Math.floor(Date.now() / 1000) -
        config.cache_db.max_age;

    docClient.query(p,function(e,d) {
        if (e) console.error(JSON.stringify(e,null,2));
        if (e)               return cb('query_err',null);
        if (!d.Items)        return cb('no_items_key');
        if (!d.Items.length) return cb('no_items_returned');
        var res = d.Items[0];
        if (!res.store_date) return cb('missing_date',null);
        if (res.store_date < five_minutes_ago) return cb('too_old',null);
        if (true) console.log(id + ' valid in cache');
        return cb(null,res.wdata);
    });

}

function sta_store(id,type,data,cb) {

    var tname = type === 'taf' ?
                config.cache_db.taf_table_name :
                config.cache_db.metar_table_name;

    // Get around the RIDICULOUS limitation in dynamodb that it cannot
    // store empty strings. Why? Who knows?! It's the dumbest thing
    // ever!
    if (data.response &&
        data.response.errors &&
        data.response.errors.length &&
        !data.response.errors[0].length) delete data.response.errors;
    if (data.response &&
        data.response.warnings &&
        data.response.warnings.length &&
        !data.response.warnings[0].length) delete data.response.warnings;

    var p = {
        TableName: tname,
        Item: {
            station: id,
            wdata: data,
            store_date: Math.floor(Date.now() / 1000),
        },
    };

    var docClient = new aws.DynamoDB.DocumentClient();
    docClient.put(p,function(e,d) {
        if (e) {
            console.error('-err- unable to put station data ',
                JSON.stringify(e,null,2));
            console.error(
                JSON.stringify(p,null,2)
            );
        }
        cb(e);
    });
}


function setUserInfo(userId,info,cb) {
    if (userId && (userId !== null)) {
        info.stats.use_count++;
        info.stats.last_use = Math.floor(Date.now() / 1000);
        var p = {
            TableName: config.pref_db.table_name,
            Item: {
                userId: userId,
                stats: info.stats,
                preferences: info.preferences,
            }
        };

        var docClient = new aws.DynamoDB.DocumentClient();
        docClient.put(p,function(e,d) {
            if (e) {
                console.error('-err- unable to put user info data ',
		        JSON.stringify(e,null,2));
            } else {
                if (false) {
                    console.log('-info- successfully updated ' + userId);
                    console.log(p);
                }
            }
            return cb(e);
        });
    } else {
        console.error('no valid user id');
        return cb('no_valud_user_id');
    }
}

function getUserInfo(userId,cb) {
    console.log('-d- getUserInfo userId: ' + userId);
    var user_info = config.default_userinfo;
    if (userId && (userId !== null)) {
        var p = {
            TableName: config.pref_db.table_name,
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
                    // console.log('-info- query returned result(s)');
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
    sta_store: sta_store,
    sta_get: sta_get,
};


