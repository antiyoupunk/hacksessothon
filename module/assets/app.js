const con = new DBConnection;
console.log(con);
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