var ajaxTarget = 'joystick';

function ajaxCallback(status,joystick){
	if(status == 200 && joystick != "") {
		document.getElementById("message").innerHTML="joystick : " + joystick;
		var div = document.getElementById('joystick-table').getElementsByTagName('div');
		for(var i=0; i<div.length; i++){
			div[i].className = "";
		}
		if(joystick == 0){
			document.getElementById('centre').className = "selected";
		}
		else if(joystick == 2){
			document.getElementById('bas').className = "selected";
		}
		else if(joystick == 4){
			document.getElementById('gauche').className = "selected";
		}
		else if(joystick == 6){
			document.getElementById('droite').className = "selected";
		}
		else if(joystick == 8){
			document.getElementById('haut').className = "selected";
		}
		else if(joystick == 5){
			document.getElementById('centre').className = "center-selected";
		}
		doAjax(ajaxTarget+"?joystick="+joystick,ajaxCallback,0,0);
	}
}

function run(){
	document.getElementById("message").innerHTML = "";
	joystick = Number(document.getElementById("message").value);
	if(isNaN(joystick))
		joystick = -1;
	
	doAjax(ajaxTarget+"?joystick="+joystick,ajaxCallback,0,0);
}

function doAjax(ajaxTarget,ajaxCallBack,timeout,timeoutCallBack){
	var xhr;
	var xhrTimer;
	try{ xhr = new XMLHttpRequest(); }
	catch(e){ xhr = new ActiveXObject('Microsoft.XMLHTTP'); }
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4) {
			ajaxCallBack(xhr.status,xhr.responseText);
			if(timeout > 0)
				clearTimeout(xhrTimer);
		}
	};
	xhr.open("GET", ajaxTarget, true);
	if(timeout > 0)
		xhrTimer = setTimeout(function() { xhr.abort(); timeoutCallBack;}, timeout);
	xhr.send(null);
}

function ajaxGet(url) {
	var xhr;
	try{ xhr = new XMLHttpRequest(); }
	catch(e){ xhr = new ActiveXObject('Microsoft.XMLHTTP'); }

	xhr.onreadystatechange = function(){
		if(xhr.readyState  == 4){
			if(ajaxRet=xhr.status==200)
				ajaxCallback(xhr.responseText);
		}
	};
	xhr.open("GET", url, true);
	xhr.send(null);
}
