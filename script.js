window.onload = function () {
    var a = document.getElementById("they");

    const b = document.querySelector('body');
    let set = false;

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