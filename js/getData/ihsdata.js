function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}

var request = makeHttpObject();
request.open("GET", "https://www.ppsbathrooms.org/ihsdata.json", true);
request.send(null);
request.onreadystatechange = function() {

    if (request.readyState == 4) {
        brData = request.responseText; //only values
        brData.length = 1; //set length
        brData = brData.toString().split(','); //to string and seperate each number
        // for (var i = 0; i < brData.length; i++) { // make ints booligans
        //     brData[i] = brData[i] > 0;
        // }
        for (var i = 0; i < 14; i++) {
            setStatus(i, brData[i]);
        }
        $("#svgBathrooms").fadeIn(100);
    }
};

// Set color of squares
function setStatus(brNumber, status) {
    if (status == 1) {
        $("#br" + brNumber.toString()).css({ fill: '#32A848'}); //green
    } else if (status == 0) {
        $("#br" + brNumber.toString()).css({ fill: '#CC2825'}); //red
    } else {
        $("#br" + brNumber.toString()).css({ fill: '#00FFFF'}); //transparent
    }

}

function getBrData(brNumber) {
    if(brNumber != null)
        return brData[brNumber];
    else
        return brData;
}