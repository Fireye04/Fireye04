window.onload = function () {
    var a = document.getElementById("they");

    const b = document.querySelector('body');
    let set = false;

    initGuestbook();

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


async function initGuestbook(){
    
    try {
        const response = await fetch("https://fireye-coffee-guestbook.codekai16.workers.dev/api", {method: 'GET'});
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const jsonResp = await response.json();

        const table = document.getElementsByClassName('guestbook')[0];

        document.getElementsByClassName("gbload")[0].remove();
        document.getElementsByClassName("gbhide")[0].toggleAttribute("hidden");
        
        const columnHeaders = document.createElement('tr');
        columnHeaders.innerHTML = `<th>Name</th>
        <th>Message</th>
        <th>Timestamp</th>`;
        table.appendChild(columnHeaders);

        // add table data rows
        for (let i = jsonResp.length-1; i >= 0; i--) {
            let dt = formatDatetime(new Date(Number(jsonResp[i]["timestamp"])))
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `<td>${jsonResp[i]["name"]}</td>
    <td>${jsonResp[i]["message"]}</td>
    <td>${dt}</td>`;
            table.appendChild(tableRow);
        }

      } catch (error) {
        console.error(error.message);
      }

};

function formatDatetime(date) {
    let dt = date.toString().split(" ")
    let time = dt[4].split(":")
    return time[0] + ":" + time[1] + ", " + dt[1] + " " + dt[2] + ", " + dt[3];
}


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

async function guestbookSubmit() {
    const Name = document.getElementsByClassName("gbName")[0].value.toString();
    document.getElementsByClassName("gbName")[0].value = "";

    const Message = document.getElementsByClassName("gbMessage")[0].value.toString();
    document.getElementsByClassName("gbMessage")[0].value = "";

    const body = {
        Name: Name,
        Message:Message
    };
    try {
        const response = await fetch("https://fireye-coffee-guestbook.codekai16.workers.dev/api", {headers: {
            'Content-Type': 'application/json',
        }, method: 'POST', body: JSON.stringify(body)});

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        //TODO: replace with item on page
        alert(await response.text())

        const table = document.getElementsByClassName('guestbook')[0];
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `<td>${Name}</td>
    <td>${Message}</td>
    <td>${formatDatetime(new Date())}</td>`;
        table.appendChild(tableRow);
        
    } catch (err) {
        alert(err.message);
      }
    guestbookClick();

    
}