window.addEventListener('click', function(e){
	if (e.target.className === "fa fa-caret-down fa-2x pointer") {
		console.log('oui');
		var button = document.getElementById('order');
		console.log(button);
		console.log(e);
		button.classList.toggle('rotate');
	}
});