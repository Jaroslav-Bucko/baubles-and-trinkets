// ==UserScript==
// @name     Mass remove FB apps
// @version  1
// @grant    none
// @description This script mass removes your Facebook apps
// @include https://www.facebook.com/settings?tab=applications
// ==/UserScript==

// Creative Commons Attribution License (--> or Public Domain)
// http://creativecommons.org/licenses/by/2.5/

// 1. Go to https://www.facebook.com/settings?tab=applications
// 2. Follow instruction
// 3. (optional) If in panic, close tab :)

// add app ids here to skip. To obtain id right click on app in list and select inspect element. The appid is id of div in form "app-id-12345"
var exceptionList = [
  'app-id-138566025676', // airbnb
  'app-id-123966167614127', // bandsintown
  'app-id-823425307723964', // coursera
  'app-id-241284008322', // deezer
  'app-id-52254943976', // disqus
  'app-id-151397988232158', // doodle
  'app-id-234536436609303', //duolingo
  'app-id-202423869273', // endomondo
  'app-id-2415071772', // goodreads
  'app-id-124024574287414', // instagram
  'app-id-289173861173327', // kaggle
  'app-id-69103156693', // kickstarter
  'app-id-192959324047861', // lastfm
  'app-id-10150110947375581', // mendeley
  'app-id-163114453728333', // netflix
  'app-id-174829003346', // spotify
  'app-id-145044622175352', // stackexchange
  'app-id-19507961798', // soundcloud
  'app-id-464891386855067', // tinder
  'app-id-158879950980488', // trailforks

]

var exceptions=[]

function doDelete(app){
  app.style.backgroundColor = "red";
  let target = app.querySelector("#delete-link");
  target.click();
}

function deleteApps(apps){
  
  if (confirm('Mass apps removal: You have ' + apps.length+' apps. Clean? You will have to reenable valid apps.')) {
    if (confirm('Mass apps removal: Skip apps in exception list? See top of script.')) {
    	exceptions = exceptionList;
    }
    
    let body = document.querySelector("body");
  
		let config = { attributes: false, childList: true, subtree: false };
  
  	let checkForDialog = function(mutations) {
  		for(var mutation of mutations) {
      	if (mutation.type == 'childList') {
        	let deleteButton = mutation.target.querySelector('input[name="ok"]');
          deleteButton.click();
        }
			}
  	}
  
  	let observer = new MutationObserver(checkForDialog);
  	observer.observe(body, config);
    
    
  for (var app of apps) {
    if (exceptions.indexOf(app.id) > -1)
    {
      continue;
    }
    
    doDelete(app);
	}
	} else {
    return
	} 
}

function waitLoop(){
  let apps = document.querySelectorAll("._25ko");
  if (apps.length == 0) {
    if (confirm('Mass apps removal: No apps found. Wait?')) {
			window.setTimeout(waitLoop, 3000);    
    } else {
      return;
    }
  } else {
  	deleteApps(apps)
  }
}


window.setTimeout(waitLoop,2000);
