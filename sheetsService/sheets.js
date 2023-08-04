const {google} = require('googleapis');

// sheet ID needs to be made dynamic
const SHEET_ID = '1HzjyuBrE3jnh-kfkjYWKPjxeySo8L1eroHPz4RyLGBE';

async function uploadResponse(responses) {
  // Creating google client with service account details
  const client = new google.auth.GoogleAuth({
      keyFile: "service-account.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  client.authorize(function (err, tokens) {
    if(err) {
        console.log(err);
        return;
    } else {
        uploadResponseToSheets(client, responses);
    }
  });
}

// function to upload response to sheets
const uploadResponseToSheets = async(client, responses) => {
  const gsapi = google.sheets({version:'v4', auth: client});
  let parsedRes = parseResponse(responses);

  await gsapi.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: parsedRes,
    },
  })

}

// function to parse response from stream to the format required by sheets API
const parseResponse = (responses) => {
  responses = JSON.parse(responses);
  var parsedResponses = [];

  for (i in responses){
    let res = responses[i];
    var parsedresponse = [];

    for (answer in res){
      parsedresponse.push(`${res[answer].userId},${res[answer].response}`);
    }
    parsedResponses.push(parsedresponse);
  }
  return parsedResponses;
}

module.exports = uploadResponse;