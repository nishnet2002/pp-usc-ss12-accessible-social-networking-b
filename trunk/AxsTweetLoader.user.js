// ==UserScript==
// @name          Twitter Accessibility Enhancements
// @namespace     
// @description   AsxTweet
// @include       http://*twitter.com/*
// @include       https://*twitter.com/*
// ==/UserScript==

function loadScript(){
  
    var theLib = document.createElement('script');
    theLib.type = 'text/javascript';
    theLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/AxsJAX.js';
    var navLib = document.createElement('script');
    navLib.type = 'text/javascript';
    navLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/AxsNav.js';
    var lensLib = document.createElement('script');
    lensLib.type = 'text/javascript';
    lensLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/AxsLens.js';
    var sndLib = document.createElement('script');
    sndLib.type = 'text/javascript';
    sndLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/AxsSound.js';
    var pkLib = document.createElement('script');
    pkLib.type = 'text/javascript';
    pkLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/PowerKey.js';

    document.getElementsByTagName('head')[0].appendChild(theLib);
    document.getElementsByTagName('head')[0].appendChild(navLib);
    document.getElementsByTagName('head')[0].appendChild(lensLib);
    document.getElementsByTagName('head')[0].appendChild(sndLib);
    document.getElementsByTagName('head')[0].appendChild(pkLib);
  
    var theScript = document.createElement('script');
    theScript.type = 'text/javascript';
  
    var baseURL = "http://pp-usc-ss12-accessible-social-networking-b.googlecode.com/svn/trunk/";

    theScript.src = baseURL + 'AxsTweet.js';
    
    document.getElementsByTagName('head')[0].appendChild(theScript);
}

loadScript();
