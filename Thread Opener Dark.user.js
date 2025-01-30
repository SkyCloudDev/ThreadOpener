// ==UserScript==
// @name        Thread Opener Dark
// @version     1.0
// @description Adds buttons to open all unread threads in list
// @match       https://simpcity.su/watched/*
// @match       https://simpcity.su/forums/*
// @match       https://simpcity.su/whats-new/*
// @match       https://forums.socialmediagirls.com/watched/*
// @grant       GM_addStyle
// ==/UserScript==

/*--- Create a button in a container div.  It will be styled and
    positioned with CSS.
*/
var yNode = document.createElement ('div');
yNode.innerHTML = '<button id="Unread" type="button">'
                + 'Unread</button>'
                ;
yNode.setAttribute ('id', 'myContainer2');
document.body.appendChild (yNode);



//--- Activate the newly added buttons

document.getElementById ("Unread").addEventListener (
    "click", ButtonClickAction, false
);


function ButtonClickAction(yEvent) {
    // Open all unread threads on page in new tabs
    var links = document.querySelectorAll('.structItem-title a[href*="unread"]');
    for (var J = 0, numLinks = links.length; J < numLinks; ++J) {
        let url = new URL(links[J].href, window.location.origin);
        url.searchParams.set('new', '1'); // Add ?new=1 or modify existing
        window.open(url.href, '_blank');
    }
}


//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #myContainer2 {
        position:               fixed;
        top:                    20%;
        left:                   0.5%;
        font-size:              1em;
        color:                  #ffffff;
        margin-top:             1px;
        opacity:                0.9;
        z-index:                222;
        padding:                2px 2px;
        max-width:              200px
        display: flex;
    }
    #Unread {
        cursor:                 pointer;
        background:             #32343B;
        border:                 3px solid #191b1e;
        color:                  #ffffff;
        border-radius:          5px;
    }
    #Unread:hover{
        border-color:           rgb(162,134,246);
    }
    #myContainer2 p {
        color:                  red;
        background:             black;
    }
*/} ) );



function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '') // Strip */ }
            .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    return str;
}
