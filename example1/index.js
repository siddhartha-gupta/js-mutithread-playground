var num_threads = 2,
	MT = new Multithread(num_threads),
	strPool = {},
	screenData = {},
	counter = 0,
	stringEl = document.getElementById('string'),
	matchedEl = document.getElementById('matchedList');

/*
 * To generate uuid's
 */
var uuidGenerator = MT.process(
	function() {
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});

		return uuid;
	},
	addToPool
);
uuidGenerator();

function addToPool(r) {
	counter++;
	strPool[r] = r;
	screenData[r] = r;
	setTimeout(uuidGenerator, 500);
}

/*
 * To verify which uuids contains 'a'
 */
var checkStrExistance = MT.process(
	function(pool) {
		var matchedStr = {};

		for (var i in pool) {
			var strToSearch = new RegExp('a', 'i');

			if (strToSearch.test(i)) {
				matchedStr[i] = i;
			}
		}
		return matchedStr;
	},
	showMatch
);

function showMatch(matchedStr) {
	// console.log(matchedStr);
	// console.log('strPool length: ', Object.keys(strPool).length, ' :matchedStr length: ', Object.keys(matchedStr).length);
	drawStr(matchedEl, matchedStr, ', ', false);
	checkExistance();
}

function checkExistance() {
	setTimeout(function() {
		checkStrExistance(clone(strPool));
		strPool = {};
	}, 5000);
}
checkExistance();

function clone(obj) {
	if (obj == null || typeof(obj) != 'object')
		return obj;

	var temp = new obj.constructor();
	for (var key in obj)
		temp[key] = clone(obj[key]);

	return temp;
}

/*
 * To draw strings on screen
 */
function drawStr(el, data, separator, reInvoke) {
	for (var i in data) {
		el.innerHTML += i + separator;
	}
	if (reInvoke) {
		invokeDrawStr();
	}
}

function invokeDrawStr() {
	screenData = {};
	setTimeout(function() {
		drawStr(stringEl, screenData, '<br />', true);
	}, 1000);
}
invokeDrawStr();
