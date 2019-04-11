(() => {
	console.log("working");

	// greensock, Timeline and TweenMax under the doc link - tells you examples, how to add functions while TweenMax is done
	// https://cdnjs.com/libraries/gsap

	// variable stack
	// grab the shields at the bottom of the page
	const 	shields 			= document.querySelectorAll('.sigil-container'),
			lightBox 			= document.querySelector('.lightbox'),
			video				= document.querySelector('video'),
			closeLB 			= document.querySelector('.lightbox-close'),
			banners				= document.querySelector('#houseImages'),
			houseName			= document.querySelector('.house-name'),
			houseInfo			= document.querySelector('.house-info'),
			playButton			= document.querySelector('#play-pause'),
			muteButton 			= document.querySelector('#mute'),
			fullScreenButton	= document.querySelector('#full-screen'),
			timeBar 			= document.querySelector('#time-bar'),
			volumeBar 			= document.querySelector('#volume-bar');

	// multidimensional array
	const	houseData = [
		[`STARK`, `House Stark of Winterfell is a Great House of Westeros, ruling over the vast region known as the North from their seat in Winterfell. It is one of the oldest lines of Westerosi nobility by far, claiming a line of descent stretching back over eight thousand years. Before the Targaryen conquest, as well as during the War of the Five Kings and Daenerys Targaryen's invasion of Westeros, the leaders of House Stark ruled over the region as the Kings in the North.`],

		[`BARATHEON`, `House Baratheon of Storm's End is a legally extinct Great House of Westeros. A cadet branch was formerly the royal house, but House Lannister now controls the throne. House Baratheon traditionally ruled the Stormlands on the eastern coast of Westeros, aptly named for its frequent storms, from their seat of Storm's End. House Baratheon became the royal house of the Seven Kingdoms after Robert Baratheon led a rebellion against the Targaryen dynasty. At the end of the rebellion, Robert ascended the Iron Throne as Robert I and married Cersei Lannister after the death of Lyanna Stark.`],

		[`LANNISTER`, `House Lannister of Casterly Rock is one of the Great Houses of Westeros, one of its richest and most powerful families and oldest dynasties. It is also the current royal house of the Seven Kingdoms following the extinction of House Baratheon of King's Landing, which had been their puppet house anyway.

			The Lannisters rule over the Westerlands. Their seat is Casterly Rock, a massive rocky promontory overlooking the Sunset Sea which has had habitations and fortifications built into it over the millennia. They are the Lords Paramount of the Westerlands and Wardens of the West. As the new royal house, they also rule directly over the Crownlands from their seat of the Red Keep in King's Landing, the traditional seat of the royal family.`],

		[`GREYJOY`, `House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over the Iron Islands, a harsh and bleak collection of islands off the west coast of Westeros, from the castle at Pyke. The head of the house is the Lord Reaper of Pyke. 

			House Greyjoy's sigil is traditionally a golden kraken on a black field. Their house words are "We Do Not Sow," although the phrase "What Is Dead May Never Die" is also closely associated with House Greyjoy and their bannermen, as they are associated with the faith of the Drowned God.`],

		[`TULLY`, `House Tully of Riverrun is an exiled Great House of Westeros. Its most senior member carried the title of Lord of Riverrun and Lord Paramount of the Trident, until the Red Wedding. The current head is Lord Edmure Tully, son of the late Hoster Tully. The Tully sigil is a silver trout on a red and blue background. Their house words are "Family, Duty, Honor."`],

		[`ARRYN`,`House Arryn of the Eyrie is one of the Great Houses of Westeros. It has ruled over the Vale of Arryn for millennia, originally as the Kings of Mountain and Vale and more recently as Lords Paramount of the Vale and Wardens of the East under the Targaryen kings and Baratheon-Lannister kings. The nominal head of House Arryn is Robin Arryn, the Lord of the Eyrie, with his stepfather Petyr Baelish acting as Lord Protector until he reaches the age of majority.`],

		[`TARGERYEN`, `House Targaryen of Dragonstone is a Great House of Westeros and was the ruling royal House of the Seven Kingdoms for three centuries since it conquered and unified the realm, before it was deposed during Robert's Rebellion and House Baratheon replaced it as the new royal House. The few surviving Targaryens fled into exile to the Free Cities of Essos across the Narrow Sea. Currently based on Dragonstone off of the eastern coast of Westeros, House Targaryen seeks to retake the Seven Kingdoms from House Lannister, who formally replaced House Baratheon as the royal House following the destruction of the Great Sept of Baelor.`],

		[`FREY`, `House Frey of the Twins was the Great House of the Riverlands, having gained their position for their treachery against their former liege lords, House Tully, who were stripped of all their lands and titles for their rebellion against the Iron Throne; House Tully had supported the independence movement for the Kingdom of the North. The current head of the house is unknown following the assassinations of Lord Walder Frey and two of his sons, Lothar Frey and Walder Rivers, by the vengeful Arya Stark. This is made more complex by the subsequent assassination of all the male Freys soon after.`],

		[`TYRELL`, `House Tyrell of Highgarden is an extinct Great House of Westeros. It ruled over the Reach, a vast, fertile, and heavily-populated region of southwestern Westeros, from their castle-seat of Highgarden as Lords Paramount of the Reach and Wardens of the South after taking control of the region from House Gardener during the Targaryen conquest. 

			The Tyrell sigil is a golden rose on a pale green field. Their house words are "Growing Strong."`]
		];

	function showLightbox() {
		setTimeout(() => { 
		//  grab the right video src
		// debugger; 
		// gets the lowercase house name from the class list
		// can type this.className.split(" ")[1] into the console
		let targetHouse = this.className.split(" ")[1];

		// make sure the names match - needs to be uppercase
		// start becomes Stark -> first make a capital S, then add ark (or any house name)
		
		let targetSrc = targetHouse.charAt(0).toUpperCase() + targetHouse.slice(1);

		video.src = `video/House-${targetSrc}.mp4`;

		lightBox.classList.add('show-lightbox');

		video.load();
		video.play();
		}, 1500);
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

		//change house name
		houseName.textContent = `House ${houseData[1 * this.dataset.offset][0]}`;

		//change the house content
		houseInfo.textContent = houseData[1 * this.dataset.offset][1];

		//set the style (CSS will animate this for us)
		// banners.style.right = totalOffset;
		TweenMax.to(banners, 0.8, {right: totalOffset});
	}

	function playPause() {
		if (video.paused == true) {
			// Play the video
			video.play();

			// Update the button text to 'Pause'
			playButton.innerHTML = "Pause";
		} else {
			// Pause the video
			video.pause();

			// Update the button text to 'Play'
			playButton.innerHTML = "Play";
		}
	}

	function muteUnmute() {
		if (video.muted == false) {
			// Mute the video
			video.muted = true;

			volumeBar.value = 0;
			muteButton.innerHTML = "Unmute";
		} else {
			// Unmute the video
			video.muted = false;

			volumeBar.value = video.volume;
			muteButton.innerHTML = "Mute";
		}
	}

	function fullScreen() {
		if (video.requestFullscreen) {
			video.requestFullscreen();
		} else if (video.mozRequestFullScreen) {
			video.mozRequestFullScreen(); // Firefox
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen(); // Chrome and Safari
		}
	}

	function timeTracker() {
		// Calculate the new time
		var totalTime = video.duration * (timeBar.value / 100);

		// Update the video time
		video.currentTime = totalTime;
	}

	// Updates the seek bar as the video plays
	function timeUpdater() {
		// Calculate the slider value
		var totalValue = (100 / video.duration) * video.currentTime;

		// Update the slider value
		timeBar.value = totalValue;
	}

	function volumeChange() {
		// Update video volume
		video.volume = volumeBar.value;
	}

	function videoPause() {
		video.pause();
	}

	shields.forEach(shield => shield.addEventListener('click', showLightbox));
	shields.forEach(shield => shield.addEventListener('click', animateBanner));

	video.addEventListener('ended', hideLightbox);
	closeLB.addEventListener('click', hideLightbox);

	// video event listeners

	playButton.addEventListener('click', playPause);
	video.addEventListener('click', playPause);
	muteButton.addEventListener('click', muteUnmute);
	fullScreenButton.addEventListener('click', fullScreen);
	timeBar.addEventListener('change', timeTracker);
	video.addEventListener('timeupdate', timeUpdater);
	// pauses timebar when user is dragging handle
	timeBar.addEventListener('mousedown', videoPause);
	timeBar.addEventListener('mouseup', playPause);
	volumeBar.addEventListener('change', volumeChange);

})();