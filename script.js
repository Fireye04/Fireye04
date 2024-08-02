window.onload = function () {
    var a = document.getElementById("they");

    const h = document.querySelectorAll('h1,h2,h3,h4');
    const b = document.querySelector('body');
    const p = document.querySelectorAll('p');
    let set = false;

    a.onclick = function () {
        if (!set) {
            alert(
                "Hey look you found an easter egg! " +
                "You can click the same spot to spare your eyes."
            )
            for (let i = 0; i < h.length; i++) {
                h[i].style.color = "#FCF434";
            }

            b.style.background = "#9C59D1";

            for (let i = 0; i < p.length; i++) {
                p[i].style.color = "#2C2C2C";
            }
            set = true;
        } else {
            for (let i = 0; i < h.length; i++) {
                h[i].style.color = "";

            }

            b.style.background = "";

            for (let i = 0; i < p.length; i++) {
                p[i].style.color = "";
            }
            set = false;
        }


        return false;
    }
}