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
            b.style.background = ("repeating-linear-gradient(" +
                "0deg, " +
                "#000000, #000000 50px, " +
                "#2C2C2C 50px, #2C2C2C 100px, " +
                "#9C59D1 100px, #9C59D1 150px, " +
                "#FFFFFF 150px, #FFFFFF 200px, " +
                "#FCF434 200px, #FCF434 250px, " +
                "#000000 250px, #000000 350px," +
                "#0038A8 350px, #0038A8 430px," +
                "#9B4F96 430px, #9B4F96 470px," +
                "#D60270 470px, #D60270 550px," +
                "#000000 550px, #000000 600px)"
            );

            var styles = "@keyframes bg-scrolling-reverse {" +
                "100% {background-position: 0px " + b.clientHeight.toString() + "px;}}";

            // alert(styles);
            var styleSheet = document.createElement("style")
            styleSheet.textContent = styles
            document.head.appendChild(styleSheet)

            b.style.animation = "bg-scrolling-reverse 15s infinite";

            b.style.animationTimingFunction = "linear";

            set = true;
        } else {
            b.style.background = "";
            b.style.animation = "";
            b.style.animationTimingFunction = "";

            set = false;
        }


        return false;
    }
}