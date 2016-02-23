var strPool = {},
	screenData = {};

self.addEventListener('message', interactor, false);

function interactor(e) {
	generateString();
	invokeDrawStr();
	checkExistance();
}

function generateString() {
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});

	strPool[uuid] = uuid;
	screenData[uuid] = uuid;
	setTimeout(generateString, 500);
}

function invokeDrawStr() {
	setTimeout(function() {
		postSreenData();
	}, 1000);
}

function postSreenData() {
	self.postMessage({
		msg: screenData,
		type: 'drawStr'
	});
	screenData = {};
	invokeDrawStr();
}

function checkStrExistance(pool) {
	var matchedStr = {};

	for (var i in strPool) {
		var strToSearch = new RegExp('a', 'i');

		if (strToSearch.test(i)) {
			matchedStr[i] = i;
		}
	}
	self.postMessage({
		msg: matchedStr,
		type: 'strMatched'
	});
	checkExistance();
}

function checkExistance() {
	setTimeout(function() {
		checkStrExistance(clone(strPool));
		strPool = {};
	}, 30000);
}

function clone(obj) {
	if (obj == null || typeof(obj) != 'object')
		return obj;

	var temp = new obj.constructor();
	for (var key in obj)
		temp[key] = clone(obj[key]);

	return temp;
}

// /*
//  * To verify which uuids contains 'a'
//  */
// var checkStrExistance = MT.process(
// 
// 	showMatch
// );

// function showMatch(matchedStr) {
// 	// console.log(matchedStr);
// 	// console.log('strPool length: ', Object.keys(strPool).length, ' :matchedStr length: ', Object.keys(matchedStr).length);
// 	drawStr(matchedEl, matchedStr, ', ', false);
// 	checkExistance();
// }



// /*
//  * To draw strings on screen
//  */
// function drawStr(el, data, separator, reInvoke) {
// 	for (var i in data) {
// 		el.innerHTML += i + separator;
// 	}
// 	if (reInvoke) {
// 		invokeDrawStr();
// 	}
// }
