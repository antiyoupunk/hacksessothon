chrome.runtime.onInstalled.addListener(function() {
    setInterval(getStatus, 1000);
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {pathContains: 'showare'},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
});

function getStatus(){
    const con = new DBConnection;
    con.getStatus(fetchName);
}
function setStatus(status, currentName){
    if(status.user === ""){
        chrome.browserAction.setIcon({path:"../icons/clear-128.png"});
    }else{
        if(status.user === currentName){
            chrome.browserAction.setIcon({path:"../icons/working-128.png"});
            checkPings();
        }else{
            chrome.browserAction.setIcon({path:"../icons/stop-128.png"});
        }
    }
    currentName = fetchName();
}
function checkPings(){
    const con = new DBConnection;
    con.getPings(displayPings);
}
function displayPings(conPings){
    if(!conPings || conPings.users.length === 0)
        return;
    if(conPings.users.length === 1){
        var msg = conPings.users[0] + " is waiting on you to finish deploying your changes."
    }else{
        var msg = "The following users are waiting for you to finish deployment:\n" + conPings.users.join('\n');
    }
    var notifyOpt = {
        type: 'basic',
        iconUrl: '../icons/working-128.png',
        title: 'Speed it up!',
        message: msg
    }
    console.log(JSON.stringify(conPings));
    chrome.notifications.create("deployWidgetNotify-" + Date.now(), notifyOpt);
    const con = new DBConnection;
    con.clearPings();
}
function fetchName(status){
    if(status){
        chrome.storage.sync.get({name: ''}, function(n) {
            setStatus(status, n.name)
        });
    }
}