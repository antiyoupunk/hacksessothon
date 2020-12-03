const url = "https://showare-q.herokuapp.com"

var DBConnection = function() {};

DBConnection.prototype.getStatus = function(callback) {
	let request = new XMLHttpRequest();
	var returnObj = {};
	request.open("GET", `${url}/status`);
	request.onload = function(){
		if(typeof callback === 'function'){
			returnObj = JSON.parse(this.response);
			callback(returnObj);
		}
	}
	request.send();
};

DBConnection.prototype.setStatus = function(username) {
	var data = {
		user: username
	};
	var jData = JSON.stringify(data);
	//no need for a response here
	let request = new XMLHttpRequest();
	request.open("PUT", `${url}/status`);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(jData);
	return 1;//we'll assume this always works so we don't need to sync this - getStatus can be called to verify
};

DBConnection.prototype.clearStatus = function() {
	return this.setStatus("");
};

DBConnection.prototype.getPings = function(callback) {
	let request = new XMLHttpRequest();
	var returnObj = [];
	request.open("GET", `${url}/ping`);
	request.onload = function(){
		if(typeof callback === 'function'){
			returnObj = JSON.parse(this.response);
			callback(returnObj);
		}
	}
	request.send();
};

DBConnection.prototype.setPings = function(username) {
	currentPings = this.getPings();
	currentPings.push(username);
	data = {
		users: currentPings
	};
	jData = JSON.stringify(data);
	
	let request = new XMLHttpRequest();
	request.open("PUT", `${url}/ping`);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(jData);
	
	return 1;//same as above, just assume it worked
};

DBConnection.prototype.clearPings = function() {
	data = {
		users: []
	};
	jData = JSON.stringify(data)
	
	let request = new XMLHttpRequest();
	request.open("PUT", `${url}/ping`);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(jData);
	
	return 1;//repeating yourself is a sign of dementia
};

