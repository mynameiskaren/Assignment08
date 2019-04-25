/*eslint-env browser*/
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};
var theSpeed;

// REWRITTEN TO TAKE ADVANTAGE OF CLOSURES
var createSlideshow = function () {
    "use strict";
    // PRIVATE VARIABLES AND FUNCTIONS
    var timer, play = true, nodes, img, stopSlideShow, displayNextImage, setPlayText;
    
    //Step 3 - Change up the application so that you now have a private variable called speed and the default speed of 2000 should be set for it.
    var speed = 2000;
    
    nodes = { image: null, caption: null };
    img = { cache: [], counter: 0 };
    
    stopSlideShow = function () {
        clearInterval(timer);
    };
    displayNextImage = function () {
        if (img.counter === img.cache.length) {
            img.counter = 0;
        } else {
            img.counter += 1;
        }
        var image = img.cache[img.counter];
        nodes.image.src = image.src;
        nodes.caption.innerHTML = image.title;
    };
    setPlayText = function (btn) {
        if (play) {
            btn.value = "Resume";
        } else {
            btn.value = "Pause";
        }
    };
    // PUBLIC METHODS THAT HAVE ACCESS TO PRIVATE VARIABLES AND FUNCTIONS
    return {
        loadImages: function (slides) {
            var image, i;
            for (i = 0; i < slides.length; i += 1) {
                image = new Image();
                image.src = slides[i].href;
                image.title = slides[i].title;
                img.cache.push(image);
            }
            return this;
        },
        
        //Step 4 - Create 2 new public methods within your createSlideshow() method. One should set the speed variable and the other should get the speed variable. You’ll need to figure out what to do within these methods to get the application to work correctly. 
        setSpeed: function () {
			stopSlideShow();	
			speed = theSpeed;
			return this;
		},
		getSpeed: function () {
			return speed;
		},
        
        startSlideShow: function () {
            if (arguments.length === 2) {
                nodes.image = arguments[0];
                nodes.caption = arguments[1];
            }
            
            //Step 5 - The second parameter of the setInterval() method will now be set by the speed variable.
            timer = setInterval(displayNextImage, this.getSpeed());
            
            return this;
        },
        createToggleHandler: function () {
            var me = this;
            // CLOSURE TO BE USED AS THE CLICK EVENT HANDLER
            return function () {
                // 'THIS' IS THE CLICKED BUTTON
                // 'ME' IS THE OBJECT LITERAL
                if (play) {
                    stopSlideShow();
                } else {
                    me.startSlideShow();
                }
                setPlayText(this);
                // TOGGLE PLAY 'FLAG'
                play = !play;
            };
        }
    };
};



// CREATE THE SLIDESHOW OBJECT
var slideshow = createSlideshow();

function validate(number) {
    "use strict";
    if (isNaN(number) || number === null) {
        window.alert("Not a number! Enter a number please.");
		return false;
    } else if (number < 0) {
		window.alert("Enter a positive number.");
		return false;
	} else {
		return true;
	}
}

window.addEventListener("load", function () {
    "use strict";
    var slides = [
        {href: "images/backpack.jpg", title: "He backpacks in the Sierras often"},
        {href: "images/boat.jpg", title: "He loves his boat"},
        {href: "images/camaro.jpg", title: "He loves his Camaro more"},
        {href: "images/punk.jpg", title: "He used to be in a punk band and toured with No Doubt and Sublime"},
        {href: "images/race.jpg", title: "He's active and loves obstacle coarse racing"}
    ];
	// START THE SLIDESHOW
    slideshow.loadImages(slides).startSlideShow($("image"), $("caption"));
    // PAUSE THE SLIDESHOW
    $("play_pause").onclick = slideshow.createToggleHandler();
	
    // Step 2 - When the user clicks the button, a prompt should appear that has the current speed shown and allows the user to change it to a different speed.
    $("speed").addEventListener("click", function () {
		do {
			theSpeed = parseInt(window.prompt("Current slideshow speed: " + slideshow.getSpeed() + "\nEnter new slideshow speed."), 10);
		} while (validate(theSpeed) === false);
		slideshow.setSpeed(theSpeed).startSlideShow();
	});
	
});