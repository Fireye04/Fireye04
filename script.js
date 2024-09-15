const start = () => {

    gapi.client.init({
        'apiKey': process.env.API_KEY,
        'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(() => {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'GUESTBOOK!H2:H2', // for example: List 1!A1:B6
    }).then((response) => {
        return response.result.values.toString();
    }).then((targett) => {
    return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'GUESTBOOK!'.concat(targett), // for example: List 1!A1:B6
    }).then((response) => {
        // parse the response data
        const loadedData = response.result.values;
    
        // populate the HTML table with the data
        const table = document.getElementsByClassName('guestbook')[0];
        
        document.getElementsByClassName("gbload")[0].remove();
        document.getElementsByClassName("gbhide")[0].toggleAttribute("hidden");

        // add column headers
        const columnHeaders = document.createElement('tr');
        columnHeaders.innerHTML = `<th>${loadedData[0][0]}</th>
    <th>${loadedData[0][1]}</th>`;
        table.appendChild(columnHeaders);
    
        // add table data rows
        for (let i = 1; i < loadedData.length; i++) {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `<td>${loadedData[i][0]}</td>
    <td>${loadedData[i][1]}</td>`;
            table.appendChild(tableRow);
        }
        }).catch((err) => {
            console.log(err.message);
        });
    })
})

};

function guestbookClick() {
    const form = document.getElementsByClassName("gbform")[0]
    if (form.hasAttribute("hidden")) {
        // Show form!
        form.toggleAttribute("hidden");
        document.getElementsByClassName("gbutton")[0].innerHTML = "I change my mind, cancel please!";
    } else {
        // Hide again
        form.toggleAttribute("hidden");
        document.getElementsByClassName("gbutton")[0].innerHTML = "Leave a message!";
    }
}

function guestbookSubmit() {
    gapi.load('client', click);
}

function click() {
    const Name = document.getElementsByClassName("gbName")[0].value.toString();
    document.getElementsByClassName("gbName")[0].value = "";

    const Message = document.getElementsByClassName("gbMessage")[0].value.toString();
    document.getElementsByClassName("gbMessage")[0].value = "";

    alert(Name.concat(" ", Message))

    let values = [
      [
        Name, Message
      ]
    ];
    const body = {
      values: values,
    };
    try {
        gapi.client.init({
            'apiKey': process.env.API_KEY,
            'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        }).then(() => {
            return gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "A1",
        valueInputOption: "RAW",
        resource: body
        })
        }).then((response) => {
        const result = response.result;
        console.log(`${result.updates.updatedCells} cells appended.`);
        if (callback) callback(response);
      });
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      return;
    }
  }




window.onload = function () {
    var a = document.getElementById("they");

    const b = document.querySelector('body');
    let set = false;

    gapi.load('client', start);

    a.onclick = function () {
        if (!set) {
            alert(
                "Hey look you found an easter egg! " +
                "You can click the same spot to spare your eyes."
            );

            b.style.backgroundImage = 'url("./Assets/rainbow.svg")';
            b.style.backgroundSize = "100% 600px";
            b.style.animation = "bgScroll 5s linear infinite";

            set = true;
        } else {
            b.style.background = "";
            b.style.animation = "";

            set = false;
        }


        return false;
    }
}
