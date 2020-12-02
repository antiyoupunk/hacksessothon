const url = "https://showare-q.herokuapp.com/status"

var DBConnection = function() {};

DBConnection.prototype.getStatus = function() {
	let request = new XMLHttpRequest();
	request.open("GET", url);
	request.send();
	request.onload = () => {
		if (request.status === 200) {
			statusObj = JSON.parse(request.response);
			returnObj = {
				user: statusObj['user'],
				status: statusObj['status']
			};
			return returnObj;
		} else {
			console.log("Error: " + request.status + " " + request.statusText);
		}
	};
};
