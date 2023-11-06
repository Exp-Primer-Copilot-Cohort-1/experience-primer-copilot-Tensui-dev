function skillsMember() {
    var member = document.getElementById("member").value;

    if (member == "member") {
        document.getElementById("skills").style.display = "block";
    }
    else {
        document.getElementById("skills").style.display = "none";
    }
}