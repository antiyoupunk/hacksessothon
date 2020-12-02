const con = new DBConnection;

function getStatus(){
    console.log(con.getStatus());
}
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('SetDeploying');
    // onClick's logic below:
    link.addEventListener('click', function() {
        getStatus()
    });
});