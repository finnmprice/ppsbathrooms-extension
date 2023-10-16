chrome.storage.local.get(["school"]).then((result) => {
    school = result.school;
    if (school == undefined)
        school = "none";
    if(school != "none") {
        window.location.replace(school + ".html");
    }
});