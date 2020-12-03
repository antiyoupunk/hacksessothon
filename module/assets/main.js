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
    con.getStatus(setStatus);
}
function setStatus(status){
    if(status.user === ""){
        chrome.browserAction.setIcon({path:"../icons/clear-128.png"});
    }else{
        if(status.user === "Martin Speer"){
            chrome.browserAction.setIcon({path:"../icons/working-128.png"});
            checkPings();
        }else{
            chrome.browserAction.setIcon({path:"../icons/stop-128.png"});
        }
    }
}
function checkPings(){

}