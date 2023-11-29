pageId = getId();

function getId() {
    switch ($('#pageID').html()) {
        case 'chs':
            return 0;
        case 'fhs':
            return 1;
        case 'ihs':
            return 2;
    }
}

fetch('http://ppsbathrooms.org/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    newData = data[pageId].split(',')
    if (navigator.onLine) {newStatus = newData}
    else {
        newStatus = -1;
        noWifi();
    }

    for (var i = 0; i < 36; i++) {
        setStatus(i, newStatus[i]);
    }
    $("#svgBathrooms").fadeIn(100);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function setStatus(brNumber, status) {
    if (status == 1) {
        $("#br" + brNumber.toString()).css({ fill: '#32A848'}); 
    } else if (status == 0) {
        $("#br" + brNumber.toString()).css({ fill: '#CC2825'}); 
    } else {
        $("#br" + brNumber.toString()).css({ fill: '#75B9FA'}); 
    }
}

function getBrData(brNumber) {
    if(brNumber != null)
        return brData[brNumber];
    else
        return brData;
}

function noWifi() {
    $('#noInternet').show();
    $('#noInternetGlow').show();
    showError('no internet connection');
}

function showError(error) {
    $('#errorMessage').show();
    $('#errorMessage').html('ERROR: ' + error);
}