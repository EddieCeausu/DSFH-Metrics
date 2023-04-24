const { log } = require('console');
var http = require('http');
const { merge } = require('jquery');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);


const URL='https://status.doxy.me//metrics-display/j59g1gvnxyrh/day.json';
var RESPONSE, 
    METRICS, 
    SUMMARY, 
    DATA,
    PERIOD;


/*
SAMPLE RESPONSE:
{
  metric: {
    name: 'Doxy.me Homepage Response Time',
    metric_identifier: 'avg:pingdom.response_time{check:doxy.me_homepage}',
    created_at: '2020-03-15T23:55:24.197-04:00',
    updated_at: '2020-03-15T23:55:24.197-04:00',
    id: 'md578yqbbxlc',
    metrics_provider_id: '98xwzfnrs7fr',
    metrics_display_id: 'j59g1gvnxyrh',
    most_recent_data_at: '2023-04-24T16:48:22.000-04:00',
    backfilled: true,
    last_fetched_at: '2023-04-24T16:52:20.128-04:00',
    backfill_percentage: 1
  },
  summary: { sum: 566111, mean: 406.3969849246231 },
  data: [
    { timestamp: 1682283420, value: 664 },
  ]
*/


function getData(urlData = URL) {
   return $.ajax({
        type: 'GET',
        url: URL,
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        success: function (resp) { RESPONSE = resp; }
    });
}



async function parseData() {
    console.log("Retrieving Data...\n");
    const v = await getData();
    var newObject = Object.entries(v);
    METRICS = newObject[1];
    // console.log(Object.entries(METRICS));

    var tmp = Object.entries(METRICS[1][0]);
    tmp = Object.fromEntries(tmp);

    PERIOD = newObject[0][1];
    DATA = tmp['data'];
    METRICS = tmp['metric'];
    SUMMARY = tmp['summary'];
}

async function printvars() {
    await parseData();
    console.log("PERIOD: ");
    console.log(PERIOD);
    console.log("SUMMARY");
    console.log(SUMMARY);
    console.log("NAME");
    console.log(METRICS["name"]);
    console.log("DATA: ")
    console.log(DATA);
}

async function exportVars() {
  await parseData();
  return { 'period': PERIOD, 'summary': SUMMARY, 'metrics': METRICS, 'data': DATA }
}

module.exports = { printvars, exportVars };
