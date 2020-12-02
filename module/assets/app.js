const con = new DBConnection;
function getStatus(){
    console.log(con.getStatus());
}
window.setInterval(getStatus, 10000);
function fetchName(){
    chrome.storage.sync.get({name: ''}, function(n) {
        updateName(n)
    });
}
function updateName(n){
    console.log(n)
        if(n.name == '' || n.name == undefined || !n.name){
            document.getElementById("username").innerHTML = '<a id="optionsLink">Set Name</a>';
        }else{
            console.log(n)
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
        getStatus()
    });

});