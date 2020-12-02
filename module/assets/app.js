const con = new DBConnection;
var appState = {currentName: "", currentStatus: "idle"};
function getStatus(){
    var status = con.getStatus();
    if(status.user === ""){
        chrome.browserAction.setIcon({path:"../icons/clear-128.png"});
        appState.currentStatus = "idle";
    }else{
        if(status.user === appState.currentName){
            chrome.browserAction.setIcon({path:"../icons/working-128.png"});
            appState.currentStatus = "deploying";
            checkPings();
        }else{
            chrome.browserAction.setIcon({path:"../icons/stop-128.png"});
            appState.currentStatus = "blocked";
        }
    }
}
getStatus();
window.setInterval(getStatus, 10000);
function fetchName(){
    chrome.storage.sync.get({name: ''}, function(n) {
        updateName(n)
    });
}
function setDeploying(){
    window.close();
    if(appState.currentName === ""){
        return;
    }
}
function updateName(n){
    console.log(n)
    if(n.name == '' || n.name == undefined || !n.name){
        appState.currentName = "";
        document.getElementById("username").innerHTML = '<a id="optionsLink">Set Name</a>';
    }else{
        appState.currentName = n.name;
        document.getElementById("username").innerHTML = '<a id="optionsLink">' + n.name + '</a>';
    }
    var optionsLink = document.getElementById('optionsLink');
    optionsLink.addEventListener('click', function() {
        chrome.tabs.create({ url: "../view/options.html" });
    });
}
fetchName();
document.addEventListener('DOMContentLoaded', function() {
    var deployButton = document.getElementById('setDeploying');
    
    deployButton.addEventListener('click', function() {
        setDeploying()
    });

});