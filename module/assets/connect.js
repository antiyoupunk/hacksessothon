const url = "https://showare-q.herokuapp.com"

var DBConnection = function() {};

DBConnection.prototype.getStatus = function() {
	let request = new XMLHttpRequest();
	var returnObj = {};
	request.open("GET", `${url}/status`, false);
	request.send();
	
	if (request.readyState === 4) {
		statusObj = JSON.parse(request.response);
		returnObj = {
			user: statusObj['user']
		};
	} else {
		console.log("Error: " + request.status + " " + request.statusText);
	}
	
	return returnObj;
};

DBConnection.prototype.setStatus = function(username) {
	var data = {
		user: username
	};
	var jData = JSON.stringify(data);
	
	let request = new XMLHttpRequest();
	request.open("PUT", `${url}/status`, false);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(jData);
	
	if (request.readyState === 4) 
		return 0;
	else
		return 1;
};

DBConnection.prototype.clearStatus = function() {
	return this.setStatus("");
};

DBConnection.prototype.getPings = function() {
	let request = new XMLHttpRequest();
	var returnObj = [];
	request.open("GET", `${url}/ping`, false);
	request.send();
	
	if (request.readyState === 4) {
		pingObj = JSON.parse(request.response);
		returnObj = pingObj['users'];
	} else {
		console.log("Error: " + request.status + " " + request.statusText);
	}
	
	return returnObj;
};

DBConnection.prototype.setPings = function(username) {
	currentPings = this.getPings();
	currentPings.push(username);
	data = {
		users: currentPings
	};
	jData = JSON.stringify(data);
	
	let request = new XMLHttpRequest();
	request.open("PUT", `${url}/ping`, false);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(jData);
	
	if (request.readyState === 4)
		return 0;
	else
		return 1;
};

DBConnection.prototype.clearPings = function() {
	data = {
		users: []
	};
	jData = JSON.stringify(data)
	
	let request = new XMLHttpRequest();
	request.open("PUT", `${url}/ping`, false);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(jData);
	
	if (request.readyState === 4)
		return 0;
	else
		return 1;
};

