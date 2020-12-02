const url = "https://showare-q.herokuapp.com/status"

var DBConnection = function() {};

DBConnection.prototype.getStatus = function() {
	let request = new XMLHttpRequest();
	var returnObj = {};
	request.open("GET", url, false);
	request.send();
	
	if (request.readyState === 4) {
		statusObj = JSON.parse(request.response);
		returnObj = {
			user: statusObj['user'],
			status: statusObj['status']
		};
	} else {
		console.log("Error: " + request.status + " " + request.statusText);
	}
	
	return returnObj;
};
