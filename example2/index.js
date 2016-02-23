var strPool = {},
	screenData = {},
	stringEl = document.getElementById('string'),
	matchedEl = document.getElementById('matchedList');

var worker = new Worker('computation.js');
worker.addEventListener('message', receiveString, false);
worker.postMessage('start');

function receiveString(e) {
	switch (e.data.type) {
		case 'drawStr':
			drawStr(stringEl, e.data.msg, '<br />');
			break;

		case 'strMatched':
			drawStr(matchedEl, e.data.msg, ', ', true, '<br /><br />');
			break;
	}
}

function drawStr(el, data, separator, showCount, endSeparator) {
	for (var i in data) {
		el.innerHTML += i + separator;
	}

	if (showCount) {
		el.innerHTML += 'Count: ' + Object.keys(data).length;
	}
	if (endSeparator) {
		el.innerHTML += endSeparator;
	}
}
