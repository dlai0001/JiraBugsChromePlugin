var jiraComponentsUrl = JiraSettings.jiraUrl + 
	"/rest/api/2/project/" + 
	JiraSettings.projectName + 
	"/components";

var components = [];

var matchedComponents = [];



function getComponents() {
	$.get(jiraComponentsUrl, function(data) {
		console.log(data);
		$("#jiraurl").attr('href', JiraSettings.jiraUrl);
		for (var i=0; i<data.length; i++) {
		
			try {
				var regEx = /\[locator:([^\]]+)\]/;
				var match = regEx.exec(data[i].description);

				components.push({
					name: data[i].name,
					locator: match[1]
				});
			} catch(e){}
		}
		console.log(components);
		matchComponents();
	});
}

function matchComponents() {
	chrome.tabs.getSelected(null,function(tab) {
	    var tablink = tab.url;
	    console.log(tablink);
	    
	    for(var i=0; i<components.length; i++) {
	    	console.log("matching " + components[i].name);
	    	var expr = components[i].locator.replace('*', '.*');
	    	if (tablink.match(new RegExp(expr))) {
				console.log("matched component");
				matchedComponents.push(components[i].name);
	    	}
	    }
	    console.log("match components " + matchedComponents);
	    getBugs();
	});
}


function getBugs() {
	for (var i=0; i<matchedComponents.length; i++) {
		var queryUrl = JiraSettings.jiraUrl + 
			"/rest/api/2/search?jql=project%20%3D%20" + JiraSettings.projectName + "%20" + 
			"AND%20issuetype%20%3D%20Bug%20AND%20status%20!%3D%20Closed%20" + 
			"AND%20component='" + matchedComponents[i] + "'";
		
		$.get(queryUrl, function(data) {
			console.log(data);
			try {
				for(var j=0; j<data.issues.length; j++) {
					console.log(data.issues[j]);
					
					//Add links and description of issues to the display.
					var url = JiraSettings.jiraUrl + "/browse/" + data.issues[j].key;
					$("<li>"
					+ "<a target=\"_blank\" href=\"" + url + "\">"
					+ data.issues[j].fields.summary 
					+ "</a>"
					+ "</li>").appendTo("#buglist");
				}
				
			} catch(e) {}
		});
	}
}



//Start the chain

getComponents();