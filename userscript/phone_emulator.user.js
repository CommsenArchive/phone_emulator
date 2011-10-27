// ==UserScript==
// @id             phone_emulator
// @name           phone emulator
// @version        1.0
// @namespace      
// @author         	
// @description    
// @include        http://localhost/phone_emulator.html*
// @run-at         document-end
// ==/UserScript==

function getDeviceRemoteContent (url, ua, container) {	
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		headers: {
			"User-Agent": ua
		},
		onload: function(response) {
			var doc = (container.contentWindow.document || container.contentDocument.document);
			var fixed = response.responseText
				.replace(/href=\"\//g, 'href="' + url + '/')
				.replace(/src=\"\//g, 'src="' + url + '/')
				.replace(/url\(\//g, 'url(' + url + '/');
			doc.open();
			doc.writeln(fixed);
			doc.close();
		}
	});
}

function getRemoteContent () {
	var url = document.getElementById("urlbox").value;
	var deviceContainers = document.getElementsByClassName('device');

	for (var a = 0; a < deviceContainers.length; a++) {
		var ua = deviceContainers[a].getElementsByClassName('deviceUA')[0].value;
		var result = deviceContainers[a].getElementsByClassName('deviceResult')[0];
		getDeviceRemoteContent(url, ua, result);
	}

};


var loadLink = document.getElementById("loadPage");
loadLink.addEventListener("click", getRemoteContent, false);
