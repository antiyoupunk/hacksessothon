const con = new DBConnection;
var appState = {currentName: "", currentStatus: "idle"};
function getStatus(){
    con.getStatus(setStatus);
}
function setStatus(status){
    var msgBox = document.getElementById('trunkStatusMessage');
    if(status.user === ""){
        chrome.browserAction.setIcon({path:"../icons/clear-128.png"});
        msgBox.innerHTML = '<b style="color:#0a0">Trunk is clear, and ready for deploy</b>'
        appState.currentStatus = "idle";
    }else{
        if(status.user === appState.currentName){
            chrome.browserAction.setIcon({path:"../icons/working-128.png"});
            appState.currentStatus = "deploying";
            msgBox.innerHTML = '<b style="color:#996200">You are deploying. Everyong is waiting...</b>'
        }else{
            chrome.browserAction.setIcon({path:"../icons/stop-128.png"});
            document.getElementById("pingMsg").innerHTML = 'Ping ' + status.user;
            msgBox.innerHTML = '<b style="color:#a00">' + status.user + ' is deploying, wait your turn!</b>'
            appState.currentStatus = "blocked";
        }
    }
    document.getElementById("statusSection").setAttribute("class", appState.currentStatus);
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
    con.setStatus(appState.currentName, function(){window.close()});
    
}
function setFinished(){
    if(appState.currentName === ""){
        //notify user they're messing up here
        return;
    }
    con.setStatus('', function(){window.close()});
}
function setPing(){
    if(appState.currentName === ""){
        //notify user they're messing up here
        return;
    }
    con.setPings(appState.currentName);
}
function updateName(n){
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