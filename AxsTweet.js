// Copyright 2008 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either ex or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview AxsJAX to enhance accessibility
 * of Skel. 
 *
 * This is a skeleton AxsJAX script - when you start using it,
 * you should do a global replace of "axsTweet" with 
 * "axsWhateverYourAppNameIs" and update this fileoverview.
 *
 * @author clchen@google.com (Charles L. Chen)
 */
// create namespace
var axsTweet = {};

/**
 * These are strings to be spoken to the user
 * @type string
 */
axsTweet.HELP = 'The following shortcut keys are available. ';


/**
 * The AxsJAX object that will do the tickling and speaking.
 * @type AxsJAX?
 */
axsTweet.axsJAXObj = null;
/**
 * The AxsNav object that will handle navigation.
 * @type AxsNav?
 */
axsTweet.axsNavObj = null;

/**
 * The AxsSound object that will play earcons
 * @type AxsSound?
 */
axsTweet.axsSoundObj = null;

/**
 * The PowerKey object that will provide a quick search
 * @type PowerKey?
 */
axsTweet.pkObj = null;

/**
 * The AxsLens object that will magnify content.
 * @type AxsLens?
 */
axsTweet.axsLensObj = null;

/**
 * The magnification factor for the AxsLens object.
 * @type number
 */
axsTweet.magSize = 1.5;
axsTweet.loggedin = null;
/**
 * Initializes the AxsJAX script
 */
 
axsTweet.init = function(){


  axsTweet.axsJAXObj = new AxsJAX(true);
  axsTweet.axsNavObj = new AxsNav(axsTweet.axsJAXObj);


 var patt1 = new RegExp("/logout");
 var patt2 = new RegExp("twitter.com");
 var patt3 = new RegExp("login");
  if(patt2.test(document.baseURI) && !patt3.test(document.baseURI)) {
      if(patt1.test(document.getElementsByTagName("body")[0].innerHTML)) {
          //alert("User is logged in.");
          axsTweet.loggedin = true;
          axsTweet.axsJAXObj.speakTextViaNode("Twitter home page has been loaded.");
      } else {
          axsTweet.loggedin = false;
          //alert("User is not logged in.");
          //axsTweet.axsJAXObj.speakTextViaNode("You are not logged in. Press control and L to log in.");
          window.location = "http://twitter.com/login";
          axsTweet.LoginPage.pageLoad();
      }
  }


  //Add event listeners
  document.addEventListener('DOMNodeInserted',
                            axsTweet.nodeInsertedHandler,
                            true);
  document.addEventListener('DOMAttrModified',
                            axsTweet.attrModifiedHandler,
                            true);
  document.addEventListener('keypress', axsTweet.keyHandler, true);

  var cnrString = '<cnr> ' +
                  '    <list title="Cycle Results" next="DOWN j" prev="UP k"' +
                  ' hotkey="w">' +
                  '        <item action="CALL:speakTweet">' +
                  '            /html/body[@id="home"]/div[@id="container"]/t' +
                  'able/tbody/tr/td[@id="content"]/div/div[3]/ol[@id="timelin' +
                  'e"]/li' +
                  '        </item>' +
                  '        <target title="Delete Tweet" hotkey="d" >' +
                  '            ./span[2]/ul/li/span[@class="del"]' +
                  '        </target>' +
                  '        <target title="Reply Tweet" hotkey="r">' +
                  '            ./span[2]/ul/li/span[@class="reply"]' +
                  '        </target>' +
                  '        <target title="Retweet" hotkey="t">' +
                  '            ./span[2]/ul/li/span[@class="retweet-link"]' +
                  '        </target>' +
                  '        <!--target title="Retweet" hotkey="f">' +
                  '            //./span[2]/ul/li/span[@class="retweet-link"]' +
                  '        //</target-->' +
                  '    </list>' +
                  '    <list title="Trending" next="DOWN j" prev="UP k" hotk' +
                  'ey="e">' +
                  '        <item action="CALL:speakTrends">' +
                  '            /html/body[@id="home"]/div[@id="container"]/t' +
                  'able/tbody/tr/td[@id="side_base"]/div[@id="side"]/div[@id=' +
                  '"trends"]/ul/li/a' +
                  '        </item>' +
                  '    </list>' +
                  '    <list title="Cycle Results" next="UP j" prev="DOWN k"' +
                  ' fwd="x" back="c" >' +
                  '        <item>' +
                  '            /html/body[@id="following"]/div[@id="containe' +
                  'r"]/table/tbody/tr/td[@id="content"]/div/div[@id="follow"]' +
                  '/div[@id="follow_grid"]/table/tbody/tr[*]/td[2]/address/sp' +
                  'an[2]/span[1]' +
                  '        </item>' +
                  '        <target title="Next Following Link" hotkey="b">' +
                  '            /html/body[@id="following"]/div[@id="containe' +
                  'r"]/table/tbody/tr/td[@id="content"]/div/div[@id="follow"]' +
                  '/div[@id="follow_grid"]/div[@id="pagination"]/a' +
                  '        </target>' +
                  '        <target title="Prev Following Link" hotkey="c">' +
                  '            /html/body[@id="following"]/div[@id="containe' +
                  'r"]/table/tbody/tr/td[@id="content"]/div/div[@id="follow"]' +
                  '/div[@id="follow_grid"]/div[@id="pagination"]/a[2]' +
                  '        </target>' +
                  '    </list>' +
                  '    <list title="Cycle Results" next="UP j" prev="DOWN k"' +
                  '>' +
                  '        <item>' +
                  '            /html/body[@id="followers"]/div[@id="containe' +
                  'r"]/table/tbody/tr/td[@id="content"]/div/div[@id="follow"]' +
                  '/div[@id="follow_grid"]/table/tbody/tr[*]/td[2]/address/sp' +
                  'an[2]/span[1]' +
                  '        </item>' +
                  '    </list>' +
                  '    <target title="Next Followers Link" hotkey="b">' +
                  '        /html/body[@id="followers"]/div[@id="container"]/' +
                  'table/tbody/tr/td[@id="content"]/div/div[@id="follow"]/div' +
                  '[@id="follow_grid"]/div[@id="pagination"]/a' +
                  '    </target>' +
                  '    <target title="Prev Followers Link" hotkey="c">' +
                  '        /html/body[@id="followers"]/div[@id="container"]/' +
                  'table/tbody/tr/td[@id="content"]/div/div[@id="follow"]/div' +
                  '[@id="follow_grid"]/div[@id="pagination"]/a[2]' +
                  '    </target>' +
                  '</cnr>';
              
  axsTweet.axsNavObj.navInit(cnrString, null);

  axsTweet.axsLensObj = new AxsLens(axsTweet.axsJAXObj);
  axsTweet.axsNavObj.setLens(axsTweet.axsLensObj);
  axsTweet.axsLensObj.setMagnification(axsTweet.magSize);

  axsTweet.axsSoundObj = new AxsSound(true);
  axsTweet.axsNavObj.setSound(axsTweet.axsSoundObj);

  axsTweet.pkObj = new PowerKey('available actions', axsTweet.axsJAXObj);
  axsTweet.axsNavObj.setPowerKey(axsTweet.pkObj, '.');

  //Delete the next line when you are done with your script.
 
};

/**
 * Handler for DOMNodeInserted events. 
 * @param {Object} evt A DOMNodeInserted event.
 */
axsTweet.nodeInsertedHandler = function(evt){
  var target = evt.target;
  // If the target node is something that should
  // be spoken, speak it here.
  
  if (target.className == "inline-form retweet-dlg" && evt.type == "DOMNodeInserted")
  {
	axsTweet.axsJAXObj.speakTextViaNode("Do you want to Retweet? Press y for yes and n for no");
  }
};

/**
 * Handler for DOMAttrModified events. 
 * @param {Object} evt A DOMAttrModified event.
 */
axsTweet.attrModifiedHandler = function(evt){
  var attrib = evt.attrName;
  var newVal = evt.newValue;
  var oldVal = evt.prevValue;
  var target = evt.target;
  // If the target node is something that should
  // be spoken, speak it here.
 
};

axsTweet.LoginPage = {};
axsTweet.LoginPage.state = "username";
axsTweet.LoginPage.pageLoad = function() {
    axsTweet.axsJAXObj.speakTextViaNode("Please enter login details . . Enter username and then press tab to enter password.");
    //alert("Login page lodaded.");
}

/**
 * Handler for key events. 
 * @param {Object} evt A keypress event.
 * @return {boolean} If true, the event should be propagated.
 */
axsTweet.keyHandler = function(evt){
  //If Ctrl is held, it must be for some AT.
 if(window.location != "http://twitter.com/login")
    {
        if(evt.ctrlKey && evt.altKey) {
            if (evt.charCode == 52) {       //4
                window.location = "http://twitter.com/following";
            }

            if(evt.charCode == 51)          //3
                window.location = "http://twitter.com/followers";

            if(evt.charCode == 49) {        //1
                try{
                    document.getElementById("status").focus();
                    axsTweet.axsJAXObj.speakTextViaNode("You can enter Tweet");
                } catch(e){}
            }

            if(evt.charCode == 50) {        //2
                try{
                    document.getElementById("update-submit").click();
                    axsTweet.axsJAXObj.speakTextViaNode("You Posted a Tweet");
                } catch(e){}
            }
            if(evt.charCode == 48) {        //0
                try{
                    document.getElementById('sign_out_form').submit();
                    axsTweet.axsJAXObj.speakTextViaNode("You are signed out!");
                } catch(e){}
            }

            if (evt.keyCode == 27) {
                try {
                    axsTweet.axsJAXObj.lastFocusedNode.blur();
                    alert("Blurred");
                } catch(e){alert("Not Blurred");}
                return false;
            }
            //alert(evt.charCode+" "+evt.keyCode );
            if ( evt.charCode == 53) {      //5
                window.location = "http://twitter.com/";
            }

            if(evt.keyCode == 9) {
                if(!axsTweet.loggedin) {
                    if(axsTweet.LoginPage.state === "username") {
                        axsTweet.axsJAXObj.speakTextViaNode("Enter password and then hit enter.");
                        alert("Enter password and then hit enter.");
                        document.getElementById("password").focus();
                    } else {
                        document.getElementById("username_or_email").focus();
                    }
                }
            }
        }
    }

    if (axsTweet.axsJAXObj.inputFocused) return true;

    var command = axsTweet.keyCodeMap[evt.keyCode] ||
    axsTweet.charCodeMap[evt.charCode];

    if (command) return command();

    return true;
};

/**
 * Map from key codes to functions
 */
axsTweet.keyCodeMap = {
  // Map additional keyboard behavior that involves key codes here
};

/**
 * Map from character codes to functions
 * @return {boolean} Always returns false to indicate 
 *                   that the keycode has been handled.
 */
axsTweet.charCodeMap = {
  // Map additional keyboard behavior that involves char codes here
  // - (minus symbol)
  45 : function() {
         axsTweet.magSize -= 0.10;
         axsTweet.axsLensObj.setMagnification(axsTweet.magSize);
         return false;
       },
  // = (equal symbol)
  61 : function() {
         axsTweet.magSize += 0.10;
         axsTweet.axsLensObj.setMagnification(axsTweet.magSize);
         return false;
       },
  // ? (question mark)
  63 : function() {
         var helpStr = axsTweet.HELP +
                       axsTweet.axsNavObj.localHelpString() +
                       axsTweet.axsNavObj.globalHelpString();
         axsTweet.axsJAXObj.speakTextViaNode(helpStr);
         return false;
       }
};
var curr = null;


function removeHTMLTags(html_data)
{
    var strInputCode = html_data;    
    strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1){return (p1 == "lt")? "<" : ">";});
    var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
    return (strTagStrippedText);
}

function getElementsByClassName(oElm, strTagName, strClassName)
{
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }
    }
    return (arrReturnElements);
}

// This function makes the TTS speak the tweet intelligently
function speakTweet(currentElement)
{
    var compStr = "", tempStr = "";
    var realnameA = new Array();
    realnameA = getElementsByClassName(currentElement.elem,"img","photo fn");
    compStr += realnameA[0].getAttribute("alt");

    usernameA = new Array();
    usernameA = getElementsByClassName(currentElement.elem,"a","tweet-url screen-name");
    compStr += " with twitter name " + usernameA[0].innerHTML + " says. ";

    // Replace URLs
    var hrefArray = currentElement.elem.getElementsByTagName('a');
    for(var i=0; i<hrefArray.length;i++)
    {
        if(hrefArray[i].className == "tweet-url web")    
        {
            var replStr = "; Details at this link;";
            hrefArray[i].innerHTML = replStr;
        }
    }
    // end of Replace URLs

    messageA = new Array();
    usernameA = getElementsByClassName(currentElement.elem,"span","entry-content");
    tempStr = removeHTMLTags(usernameA[0].innerHTML);
    compStr += tempStr;
    compStr = compStr.replace(/#/gi,"");
	
	 axsTweet.axsLensObj.view(currentElement.elem);
   currentElement.elem.scrollIntoView(true);
   axsTweet.axsJAXObj.speakTextViaNode(compStr);
}

function speakTrends(currentElement)
{
       var trendStr = "";
       trendStr = currentElement.elem.innerHTML;
       trendStr = trendStr.replace(/#/gi,"Tag of ");
   axsTweet.axsLensObj.view(currentElement.elem);
   currentElement.elem.scrollIntoView(true);
   axsTweet.axsJAXObj.speakTextViaNode(trendStr);
}


axsTweet.init();
