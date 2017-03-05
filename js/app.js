var pxlArr = [];

	var count = 0;
$(document).ready(function () {
	var impressionUrl = 'https://googleads.g.doubleclick.net/pagead/viewthroughconversion/968945291/?value=1.00&currency_code=AUD&label=m3kkCI6IylgQi92DzgM&guid=ON&script=0';
	var interactionUrl = 'https://googleads.g.doubleclick.net/pagead/viewthroughconversion/968945291/?value=1.00&currency_code=AUD&label=IumECJGIylgQi92DzgM&guid=ON&script=0';
	var exitUrl = 'https://googleads.g.doubleclick.net/pagead/viewthroughconversion/968945291/?value=1.00&currency_code=AUD&label=1YxUCP-oyFgQi92DzgM&guid=ON&script=0';
	
	var $backdrop = $(".main-backdrop");
	var $maintitle = $(".main-title");
	var $hotspot = $("#hotspot");
	var jeep = {
		jeep1: {
			name: "Patriot",
			color: ["Grey", "Black", "White", "Red", "Green", "Dark Grey", "Black Grey", "Blue"]
		},
		jeep2: {
			name: "Compass",
			color: ["Beige", "Black", "Red", "Green", "Sea Blue", "Blue", "Dark Blue", "White"]
		},
		jeep3: {
			name: "Renegade",
			color: ["Black", "Blue", "Mat Black", "Green", "Grey", "Orange", "Red", "Brown", "White", "Yellow"]
		},
		jeep4: {
			name: "Grand Cherokee",
			color: ["Grey", "Black", "Blue", "Beige", "Dark Grey", "Green", "Red", "Bluish Grey", "White"]
		},
		jeep5: {
			name: "Wrangler",
			color: ["Dark Grey", "Light Grey", "Black", "Blue", "Red", "Green", "White", "Yellow"]
		},
		jeep6: {
			name: "Cherokee",
			color: ["Dark Grey", "Light Grey", "Black", "Blue", "Gold", "Green", "Red", "White"]
		}
	};
	var isExpanded = false,
		currJeep,
		isLeave = true;

	TweenMax.to($('#expanse-ad'), 0, { display: 'none' });
	TweenMax.to($hotspot, 0, { display: "none" });

	$(".banner").hide();

	$(".color").on('mouseenter', function () {
		isLeave = false;	
		$(this).parent().parent('.gallery').find('.gallery-color li').removeClass('active');
		$("#" + $(this).attr("target-color")).addClass('active');
		$(this).parent('.color-car').find('.color').removeClass('active');
		$(this).addClass("active");
		var model = this.getAttribute('target-color').split('-');
		Enabler.counter("Mouse Roll-Over_Color_" + jeep[model[0]]['name'] + "_" + jeep[model[0]]['color'][$(this).index()], true);
		loadPixel(interactionUrl);
 	});

	$(".btn-hotspot").on('mouseenter', function () {
		TweenMax.to(".vehicle-light", 0.2, { opacity: 0 });
		TweenMax.to("#" + $(this).attr("target-light"), 0.3, { opacity: 0.8 });
		Enabler.counter("Mouse Roll-Over_" + jeep[this.getAttribute('target-information')]['name'], true);
		loadPixel(interactionUrl);
 	});

	$(".btn-hotspot").on('mouseleave', function () {
		TweenMax.to(".vehicle-light", 0.2, { opacity: 0 });
		TweenMax.to("#" + $(this).attr("target-light"), 0.3, { opacity: 0 });
 	});

	$(".btn-hotspot").on('click', function () {
		loadPixel(interactionUrl);
		console.log(">>>>>>>>>>>>NEXT<<<<<<<<<<<<");
		document.getElementById("BlockerLeft").style.display = "block";
		document.getElementById("BlockerRight").style.display = "block";
		//document.getElementById('BlockerLeft').display = "none";

		!isExpanded && function () {
			Enabler.requestExpand();
            loadPixel(interactionUrl);
			Enabler.counter("CTR_" + jeep[this.getAttribute('target-information')]['name'], true);
		}.bind(this)();
		TweenMax.to($('#expanse-ad'), 1, { display: 'block', opacity: 1, ease: Power1.easeInOut });
		TweenMax.from($('.gallery'), 0.2, { x: -530 });
		TweenMax.from($('.infor'), 0.2, { x: 700 });
		TweenMax.from($('.btn-more'), 0.2, { x: 700 });
		TweenMax.from($('.link'), 0.2, { x: 700 });
		//TweenMax.to($('#minimise-ad'),1, {display: 'none'});
		//TweenMax.to($('.message'),0, {opacity: 0,display: 'none'});
		$('.information-car').removeClass('active');
		$("#" + $(this).attr("target-information")).addClass('active');
		currJeep = jeep[this.getAttribute('target-information')]['name'];
		Enabler.counter("CTR_Image load_Expanded Frame__" + currJeep, true);
		setTimeout(function(){ 
			document.getElementById("BlockerLeft").style.display = "none"; 
			document.getElementById("BlockerRight").style.display = "none";
		}, 1000);
	});

	$(".pagination").on('click', function () {
		$("#" + $(this).attr("target-information")).click();
	});
	
	//
	//	$(".btn-minimise").on('click',function() {
	//			TweenMax.to($('#minimise-ad'),1, {display: 'block',y:0, ease:Power1.easeInOut});
	//		  TweenMax.to($('#expanse-ad'),1, {opacity: 0,display: 'none', y:0, ease:Power1.easeInOut});
	////		  TweenMax.to($('.message'),0, {opacity: 0,display: 'none'});
	//
	//
	//  });
	
	function resetCta(el, sib) {
		var p = el.parentNode;
		p.removeChild(el)
		if (!sib)
			setTimeout(function () { p.appendChild(el) }, 0);
		else
			setTimeout(function () { p.insertBefore(el, sib) }, 0);
	}

	$('#btn-more').on('click', function () {
		window.isStop = true;
		TweenMax.pauseAll(true, true);
		Enabler.requestCollapse();
		Enabler.exit("Exit_" + currJeep + "_More Details");
		resetCta(this, this.nextSibling);
	});

	$('#test-drive').on('click', function () {
		window.isStop = true;
		TweenMax.pauseAll(true, true);
		Enabler.requestCollapse();
		Enabler.exit("Exit_" + currJeep + "_Test Drive");
		resetCta(this);
	});

	$('#brochure').on('click', function () {
		window.isStop = true;
		TweenMax.pauseAll(true, true);
		Enabler.requestCollapse();
		Enabler.exit("Exit_" + currJeep + "_Brochure");
		resetCta(this);
	});

	$('#get-quote').on('click', function () {
		window.isStop = true;
		TweenMax.pauseAll(true, true);
		Enabler.requestCollapse();
		Enabler.exit("Exit_" + currJeep + "_Get Quote");
		resetCta(this);
	});

	$('.close-expanded').on('click', function () {
		Enabler.reportManualClose();
		Enabler.counter('CTR_Close Expand',true);
		loadPixel(interactionUrl);
		Enabler.requestCollapse();
		
	});

	if (Enabler.isInitialized()) {
		init();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
	}

	// Runs when Enabler is ready.
	function init() {
		if (Enabler.isPageLoaded()) {
			politeInit();
		} else {
			Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit);
		}
		
		Enabler.setExpandingPixelOffsets(0, 0, 970, 500);
		
		// //Interaction Pixel
		// Enabler.constructor.prototype.counter = (function(_super) {
		// 	return function() {
		// 		if(arguments[0].indexOf('CTR_Close Ad') == -1) {
		// 			loadPixel(interactionUrl);
		// 		}
		// 		return _super.apply(this, arguments);
		// 	}; 
		// })(Enabler.constructor.prototype.counter);
		
		//Exit Pixel
		Enabler.addEventListener(studio.events.StudioEvent.EXIT, function() {
			loadPixel(exitUrl);
		})
	};

	// Runs when the page is completely loaded.		
	function politeInit() {
		if (Enabler.isVisible()) {
			adVisibilityHandler();
		} else {
			Enabler.addEventListener(studio.events.StudioEvent.VISIBLE,
				adVisibilityHandler);
		}
		//Impression Pixel
		loadPixel(impressionUrl);
		trackPxl();
	};

	function adVisibilityHandler() {

		$(".banner").show();

		car = new TimelineMax();
		car
			.from($backdrop, 0.6, { opacity: 0, delay: 1, ease: Power0.easeInOut })
			.from($maintitle, 0.6, { opacity: 0, delay: 1, ease: Power0.easeInOut })
			.to($backdrop, 2.5, { y: -217, delay: 0.5, ease: Power0.easeInOut });
		;

		headlights = new TimelineMax();
		headlights
			.to("#one-light", 0.4, { opacity: 1, ease: Power1.easeInOut, delay: 6 })
			.to("#one-light", 0, { opacity: 0, delay: 0.2 })
			.to("#two-light", 0.4, { opacity: 1, ease: Power1.easeInOut })
			.to("#two-light", 0, { opacity: 0, delay: 0.2 })
			.to("#three-light", 0.4, { opacity: 1, ease: Power1.easeInOut })
			.to("#three-light", 0, { opacity: 0, delay: 0.2 })
			.to("#four-light", 0.4, { opacity: 1, ease: Power1.easeInOut })
			.to("#four-light", 0, { opacity: 0, delay: 0.2 })
			.to("#five-light", 0.4, { opacity: 1, ease: Power1.easeInOut })
			.to("#five-light", 0, { opacity: 0, delay: 0.2 })
			.to("#six-light", 0.4, { opacity: 1, ease: Power1.easeInOut })
			.to("#six-light", 0, { opacity: 0, delay: 0.2 })
			.to($hotspot, 0, { display: "block", opacity: 0, delay: -0.2 })
			.to($hotspot, 0.5, { opacity: 1 })
			.to($hotspot, 0.5, { y: -10, repeat: 4, yoyo: true })
		//		.to(".message",0.2, {opacity: 1, delay:4})
			.to("#snow", 1, { opacity: 0, display: 'none', delay: -7.5 });
		;

		$("canvas.snow").let_it_snow({
			windPower: 2,
			speed: 1,
			interaction: false,
			size: 1,
			count: 400
		});

		Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, function () {
	    	isExpanded = true;
			Enabler.finishExpand();
   			headlights.pause();
   			$('#hotspot').css({
				'transform': 'matrix(1, 0, 0, 1, 0, -10)'
   			});
		});
		Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, function () {

		});
		Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, function () {
	    	isExpanded = false;
			Enabler.finishCollapse();
   			TweenMax.to($('#expanse-ad'), 0, { display: 'none' });
		});
		Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, function () {

		});
	}

	function loadPixel(url) {
		pxlArr.push(url);
	}

	function trackPxl(){
		setTimeout(function(){
			if(count<pxlArr.length){
				var pxl = document.createElement('img');
				pxl.src = pxlArr[count];
				// console.log(count,pxlArr[count]);
				count++;
			}
			trackPxl();
		},500);
	}


});
