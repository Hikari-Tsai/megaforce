/* MEGAFORCE Blog — category filter for blog/index.html (supports #cat-<id> links). */
(function () {
	var filter = document.querySelector('.mf-filter');
	if (!filter) { return; }
	var cards = document.querySelectorAll('.mf-card');

	function apply(key) {
		var found = false;
		filter.querySelectorAll('a').forEach(function (a) {
			var on = a.getAttribute('data-filter') === key;
			a.parentNode.classList.toggle('active', on);
			found = found || on;
		});
		if (!found) { return apply('all'); }
		cards.forEach(function (card) {
			card.hidden = key !== 'all' && (' ' + card.getAttribute('data-cats') + ' ').indexOf(' ' + key + ' ') < 0;
		});
	}

	filter.addEventListener('click', function (e) {
		var a = e.target.closest('a[data-filter]');
		if (!a) { return; }
		e.preventDefault();
		var key = a.getAttribute('data-filter');
		history.replaceState(null, '', key === 'all' ? location.pathname : '#' + key);
		apply(key);
	});

	var initial = (location.hash || '').replace('#', '');
	apply(/^cat-\d+$/.test(initial) ? initial : 'all');
})();
