function saveName(){
    var nameVal = document.getElementById("nameText").value;
    chrome.storage.sync.set({name: nameVal}, function() {
        console.log(nameVal);
        return;
    });
}
function loadName(){
    chrome.storage.sync.get({name: ''}, function(n) {
        document.getElementById("nameText").value = n.name;
        console.log(n);
        return;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var saveButton = document.getElementById('saveNameButton');
    loadName();
    saveButton.addEventListener('click', function() {
        saveName();
    });
});