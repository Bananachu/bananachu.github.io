(function() {
	var btn = document.getElementById("themebtn");
	var body = document.getElementsByTagName("body")[0];

	btn.addEventListener('click', switchTheme);

	function switchTheme() {
		if (btn.value === 'light') {
			body.style.color = "#ddd"
			body.style.background = "linear-gradient(to right, #000 -10%, #222, #000 110%)"
			btn.value = 'dark';
		} else {
			body.style.color = "#222"
			body.style.background = "linear-gradient(to right, #ddd -10%, #fff, #ddd 110%)"
			btn.value = 'light';
		}
	}
})();
