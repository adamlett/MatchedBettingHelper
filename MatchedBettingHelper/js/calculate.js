addEventListeners();

function addEventListeners() {
	var fieldArray = ["backStake","backOdds", "layOdds", "layCommission","info"];
	for (var i = 0; i < fieldArray.length; i++) {
		inputListener(fieldArray[i]);
	}

	var radioArray = ["Q", "SR", "SNR"];
	for (var i = 0; i < radioArray.length; i++) {
		radioListeners(radioArray[i]);
	}
}

function inputListener(name) {
	var element = document.getElementById(name);
	element.addEventListener("input", function(e) {
		var obj = {};
		var item = element;
		obj[name] = element.value;
		chrome.storage.sync.set(obj);
		setTimeout(function() {calculate();}, 1000);
	});
}

function radioListeners(id) {
	document.getElementById(id).addEventListener('click', function() {
		var type = document.getElementById(id).value;
		chrome.storage.sync.set({'type': type});
		calculate();
	});
}

function calculate(){
	// Get HTML input
	var type = document.querySelector('input[name="type"]:checked').value;
	var backStake = document.getElementById("backStake").value;
	var backOdds = document.getElementById("backOdds").value;
	var backCommission = 0; //var backCommission = document.getElementById("backCommission").value;
	var layOdds = document.getElementById("layOdds").value;
	var layCommission = document.getElementById("layCommission").value;

	// Calculation variables
	var freeStake, stakeForfeit, typeOfBet;
	// Validation
	var incomplete = validate(backStake, backOdds, layOdds, layCommission);

	// Tyoe of bet
	if(type == "Q"){
		stakeForfeit = 0;
		freeStake = 0;
		typeOfBet = "Qualifying bet";
	}
	else if (type == "SR") { // Stake returned
		stakeForfeit = 0;
		freeStake = backStake;
		typeOfBet = "Free bet: Stake-Returned";
	}
	else if (type == "SNR"){ // Stake not returned
		stakeForfeit = backStake;
		freeStake = backStake;
		typeOfBet = "Free bet: Stake-Not-Returned";
	}
	else {
		console.log("No bet type selected.");
		incomplete = 1;
	}

	// Perform calculation if fields all valid
	if(incomplete == 0) {
		var backReturn = backOdds*backStake-(backCommission*((backOdds-1)*backStake)/100)-stakeForfeit;
		var layStake = (backReturn/(layOdds-layCommission/100)).toFixed(2);
		var layRisk = layStake*(layOdds-1);
		var backProfit = backReturn - layRisk;
		var netProfit = (parseFloat(freeStake) + parseFloat(backProfit) - parseFloat(backStake)).toFixed(2);
		var info = document.getElementById("info").value;
		document.getElementById("requiredStake").innerHTML = layStake;
		document.getElementById("profit").innerHTML = netProfit;

		// Save it using the Chrome extension storage API.
		chrome.storage.sync.set({'info': info,'backStake': backStake, 'backOdds': backOdds, 'layOdds' : layOdds,
				'layCommission' : layCommission, 'type' : type, 'layStake' : layStake, 'netProfit' : netProfit}, function() {
			console.log('Settings saved');
		});
	} else incompleteFields();
}

// Give bet details as a notification
function betNotification() {
	if (Notification.permission !== "granted")
		Notification.requestPermission();
	else {
		 chrome.storage.sync.get(['info','backStake','backOdds','layOdds','layCommission','type', 'layStake', 'netProfit'], function(items) {
			 var typeOfBet = ""; // Tyoe of bet
			 if(items.type === "Q")
				 typeOfBet = "Qualifying bet";
			 else if (items.type === "SR")  // Stake returned
				 typeOfBet = "Free bet: Stake-Returned";
			 else if (items.type === "SNR") // Stake not returned
				 typeOfBet = "Free bet: Stake-Not-Returned";
			 console.log(items.type);

			var notificationTitle = "Lay stake: £" + items.layStake + "        Profit: £" + items.netProfit;
			var notification = new Notification(notificationTitle, {
				icon: 'https://smarkets.com/static/img/global/logo_monogram.png',
				body: "Description: " + items.info + "\nBet type: " + typeOfBet + "\nBack Stake: £" + items.backStake + "    Back Odds: " + items.backOdds +"\nLay Odds: " + items.layOdds + "       Lay Commission: " + items.layCommission + "%",
				requireInteraction: true,
			});
			notification.onclick = function () {
				window.open("https://www.smarkets.com");
			};
			});
	}
}

function incompleteFields() {
	document.getElementById("requiredStake").innerHTML = "N/A";
	document.getElementById("profit").innerHTML = "N/A";
}

function loadData(){ // Load stored local data

 if (Notification.permission !== "granted")
  Notification.requestPermission();

 console.log("Test Success");
 chrome.storage.sync.get(['info','backStake','backOdds','layOdds','layCommission','type', 'layStake', 'netProfit'], function(items) {
	console.log('Settings retrieved', items);
	if (typeof items.info != 'undefined')
		document.getElementById("info").value = items.info;	
	document.getElementById("backStake").value = items.backStake;
	document.getElementById("backOdds").value = items.backOdds;
	document.getElementById("layOdds").value = items.layOdds;
	document.getElementById("layCommission").value = items.layCommission;
	document.getElementById(items.type).checked = true;
	document.getElementById("requiredStake").innerHTML = items.layStake;
	document.getElementById("profit").innerHTML = items.netProfit;
	});
}

function validate(backStake, backOdds, layOdds, layCommission){
	var incomplete = 0;
	for (var i = 0; i < arguments.length; i++) {
		if(arguments[i] == "")
			incomplete = 1;
	}
	return incomplete;
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
		var storageChange = changes[key];
		console.log('Storage key "%s" in namespace "%s" changed. ' +
								'Old value was "%s", new value is "%s".',
								key,
								namespace,
								storageChange.oldValue,
								storageChange.newValue);
	}
});

document.getElementById('clickme').addEventListener('click', betNotification);
document.addEventListener('DOMContentLoaded', function() {
  loadData();
	setTimeout(function() {calculate();}, 10);
});

document.addEventListener('keydown', function(event){
	if (event.keycode == 13)
		betNotification();
	});
