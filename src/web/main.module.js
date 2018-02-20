function resetUI()
{
    clearMessages(), showToken("loading..."), messaging.getToken().then(function(e) {
        e ? sendTokenToServer(e) : (console.log("No Instance ID token available. Request permission to generate one."), updateUIForPushPermissionRequired(), setTokenSentToServer(!1))
    })["catch"](function(e) {
        console.log("An error occurred while retrieving token. ", e), showToken("Error retrieving Instance ID token. ", e), setTokenSentToServer(!1)
    })
}

function showToken(e) {
    document.querySelector("#token")
}

function sendTokenToServer(e)
{
    //you should put a logic here that sends the token to your server
}

function isTokenSentToServer()
{
    return 1 == window.localStorage.getItem("sentToServer")
}

function setTokenSentToServer(e)
{
    window.localStorage.setItem("sentToServer", e ? 1 : 0)
}

function showHideDiv(e, n) {}

function requestPermission()
{
    console.log("Requesting permission..."), messaging.requestPermission().then(function() {
        console.log("Notification permission granted."), resetUI()
    })["catch"](function(e) {
        console.log("Unable to get permission to notify.", e)
    })
}

function deleteToken()
{
    messaging.getToken().then(function(e) {
        messaging.deleteToken(e).then(function() {
            console.log("Token deleted."), setTokenSentToServer(!1), resetUI()
        })["catch"](function(e) {
            console.log("Unable to delete token. ", e)
        })
    })["catch"](function(e) {
        console.log("Error retrieving Instance ID token. ", e), showToken("Error retrieving Instance ID token. ", e)
    })
}

function clearMessages() {}

function updateUIForPushEnabled(e) {
    showHideDiv(tokenDivId, !0), showHideDiv(permissionDivId, !1), showToken(e)
}

function updateUIForPushPermissionRequired() {
    showHideDiv(tokenDivId, !1), showHideDiv(permissionDivId, !0)
}
var config = {
    messagingSenderId: "YOUR_FIREBASE_SENDER_ID"
};

firebase.initializeApp(config);

const messaging = firebase.messaging(),
    tokenDivId = "token_div",
    permissionDivId = "permission_div";

messaging.requestPermission().then(function() {

    console.log("Notification permission granted.");

})["catch"](function(e) {
    console.log("Unable to get permission to notify.", e)
}), messaging.onTokenRefresh(function() {

    messaging.getToken().then(function(e) {
        console.log("Token refreshed." + e), sendTokenToServer(e), resetUI()
    })["catch"](function(e) {
        console.log("Unable to retrieve refreshed token ", e), showToken("Unable to retrieve refreshed token ", e)
    })

}), messaging.onMessage(function(e) {

    console.log("Message received. ", e)

}), resetUI();
