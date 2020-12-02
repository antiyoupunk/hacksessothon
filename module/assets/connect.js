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

DBConnection.prototype.setStatus = function(username, isDeploying) {
	var data = {
		user: username,
		status: isDeploying ? 1 : 0
	};
	var jData = JSON.stringify(data);
	
	let request = new XMLHttpRequest();
	request.open("PUT", url, false);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(jData);
	
	if (request.readyState === 4) 
		return 0;
	else
		return 1;
};
