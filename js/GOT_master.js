(() => {
	console.log("working");

	// greensock, Timeline and TweenMax under the doc link - tells you examples, how to add functions while TweenMax is done
	// https://cdnjs.com/libraries/gsap

	// variable stack
	// grab the shields at the bottom of the page
	const 	shields 	= document.querySelectorAll('.sigil-container'),
			lightBox 	= document.querySelector('.lightbox'),
			video		= document.querySelector('video'),
			closeLB 	= document.querySelector('.lightbox-close'),
			banners		= document.querySelector('#houseImages'), 
			houseName	= document.querySelector('.house-name')
			houseInfo 	= document.querySelector('.house-info');

	const houseData = [ // STARK 
	`House Stark of Winterfell is a Great House of Westeros, ruling over the vast region known as the North from their seat in Winterfell. It is one of the oldest lines of Westerosi nobility by far, claiming a line of descent stretching back over eight thousand years. Before the Targaryen conquest, as well as during the War of the Five Kings and Daenerys Targaryen's invasion of Westeros, the leaders of House Stark ruled over the region as the Kings in the North.`]

	function showLightbox() {
		//  grab the right video src
		// debugger; 
		// gets the lowercase house name from the class list
		// can type this.className.split(" ")[1] into the console
		let targetHouse = this.className.split(" ")[1];

		// make sure the names match - needs to be uppercase
		// start becomes Stark -> first make a capital S, then add ark (or any house name)
		
		let targetSrc = targetHouse.charAt(0).toUpperCase() + targetHouse.slice(1);

		// change the paragraph text 
		// backticks are JS template strings
		houseName.textContent = `House ${targetSrc}`;

		// retrieves first index in array 
		houseInfo.textContent = houseData[0];

		video.src = `video/House-${targetSrc}.mp4`;

		lightBox.classList.add('show-lightbox');

		video.load();
		video.play();
	}

	function hideLightbox() {
		lightBox.classList.remove('show-lightbox');
		// rewind the video + pause it
		video.currentTime = 0;
		video.pause();
	}

	function animateBanner() {
		const offSet = 600; // this is the offset / width of one image

		// total distance the images need to move in a pixel value
		// data.offset is comming from each shield we click on
		totalOffset = this.dataset.offset * offSet; // + "px";

		//set the style (CSS will animate this for us)
		// banners.style.right = totalOffset;
		TweenMax.to(banners, 0.8, {right: totalOffset});
	}

	shields.forEach(shield => shield.addEventListener('click', showLightbox));
	// shields.forEach(shield => shield.addEventListener('click', animateBanner));

	video.addEventListener('ended', hideLightbox);
	closeLB.addEventListener('click', hideLightbox);

})();