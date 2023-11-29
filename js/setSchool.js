const urlParams = new URLSearchParams(window.location.search);
const fromSchool = urlParams.get('fromSchool');

console.log(fromSchool)

if(fromSchool) {
    $('#all').animate({opacity: 1}, 300);
}
else {
    chrome.storage.local.get(["school"]).then((result) => {
        school = result.school;
        if (school == undefined)
            school = "none";
            $('#all').animate({opacity: 1}, 300);
        if(school != "none") {
            window.location.replace(school + ".html");
        }
    });
}

$(".cleveland img").click(function() {
    selectSchool('chs')
    window.location.replace("chs.html");
});

$(".franklin img").click(function() {
    selectSchool('fhs')
    window.location.replace("fhs.html");
});

$(".ida img").click(function() {
    selectSchool('ihs')
    window.location.replace("ihs.html");
});

function selectSchool(school) {
    chrome.storage.local.set({ school: school });
}