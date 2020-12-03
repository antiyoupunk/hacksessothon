const con = new DBConnection;
var appState = {currentName: "", currentStatus: "idle"};
function getStatus(){
    con.getStatus(setStatus);
}
function setStatus(status){
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
function fetchName(){
    chrome.storage.sync.get({name: ''}, function(n) {
        updateName(n)
    });
}
function setDeploying(){
    if(appState.currentName === ""){
        //notify user they're messing up here
        return;
    }
    con.setStatus(appState.currentName);
    
}
function setFinished(){
    if(appState.currentName === ""){
        //notify user they're messing up here
        return;
    }
    con.setStatus('');
}
function setPing(){
    if(appState.currentName === ""){
        //notify user they're messing up here
        return;
    }
    con.setPings(appState.currentName);
}
function checkPings(){
    con.getPings(displayPings);
}
function displayPings(conPings){
    alert(conPings);
    con.clearPings();
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

document.addEventListener('DOMContentLoaded', function() {
    fetchName();
    getStatus();
    var deployButton = document.getElementById('setDeploying');
    var finishedButton = document.getElementById('setFinished');
    var pingButton = document.getElementById('sendPing');
    
    deployButton.addEventListener('click', function() {
        setDeploying()
    });
    finishedButton.addEventListener('click', function() {
        setFinished()
    });
    pingButton.addEventListener('click', function() {
        setPing()
    });

});