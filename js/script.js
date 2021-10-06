// Testimonials Carousel


//What we need to get for carousel to work
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);// so get li from track ul above
//they been converted to a single variable within an array//instead of doing each slide
const nextButton = document.querySelector(".button-right");
const prevButton = document.querySelector(".button-left");
const dotsNav = document.querySelector(".carousel-nav");//just the nav
const dots = Array.from(dotsNav.children);//the carousel indicators as above


//the slide is different size in variour resp modes so need to get a slide's size
const slideSize = slides[0].getBoundingClientRect();//to see it but we need it's width
//const slideWidth = slideSize.width;//or better
const slideWidth = slides[0].getBoundingClientRect().width;//332
//console.log(slideWidth);//332


//arrange the slides next to one another as now they are stacking on top of each other
/*slides[0].style.left = slideWidth * 0 + "px";//refactored from: slides[0].style.left = 0;//first slide
slides[1].style.left = slideWidth * 1 + "px";//refactored from: slides[1].style.left = slideWidth + "px";//second slide moved to the right of it's width
slides[2].style.left = slideWidth * 2 + "px";//3rd slide
//Instead better to do a loop as might add other slides later
slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + "px";//so times it index so slide 1 * 0, 1* 1 and 2 *
});*/

//then refactor it to this as better understand what's going on then
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
}
slides.forEach(setSlidePosition);




//When I click right, move slides to the right

/*nextButton.addEventListener("click", e => {
  //find the current slide you are on first
  const currentSlide = track.querySelector(".current-slide");//only look in track to find .current-slide
  //console.log(currentSlide);
  //find next slide
  const nextSlide = currentSlide.nextElementSibling;//need to click on > to see it
  //console.log(nextSlide)

  //move to next slide
  const amountToMove = nextSlide.style.left;//find out how much we are going to be moving to
  //console.log(amountToMove);//500px is amount we are going to move by
  //then move whole track
  track.style.transform = 'translateX(-' + amountToMove + ')';
  currentSlide.classList.remove("current-slide");//so can move from one to the other
  nextSlide.classList.add("current-slide");//not juse from 1st slide to 2nd
});*/


//ALL FUNCTIONS TOGETHER

//The above Move left and right/too much code so shorten it by using a function
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

//refactored code from moving dot to match slide as from below
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  //left/right buttons disappear when end of slide sequence
  if (targetIndex === 0) {//so at first slide
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {//if we are on last slide
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
}


//When I click left, move slides to the left
prevButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;

  //so when click on < get the corresponding dot
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});


//when I click right, move slides to the right
nextButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;

  //so when click on > get the corresponding dot
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;

  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});


//When I click the nav indicators, move to that slide
dotsNav.addEventListener("click", e => {
  //what indicator is clicked on
  //const targetDot = e.target;//e is tracking where we click on
  //console.log(e.target);//just to target what we are clicking on so one dot f.ex
  //the above becomes:
  const targetDot = e.target.closest("button");//this means only button(s) and
  //console.log(targetDot)//and no whte space around


  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");

  //which dot are you on i.e its index
  const targetIndex = dots.findIndex(dot => dot === targetDot);//so returning the index no of the dot you click on
  //console.log(targetIndex);so click on first dot get 0 etc
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);//so when click on a dot it's going to 
  //find the whole track and move to the slide the dot you are clicking on

  /*get the icons moving so when press on a dot get the correct slide
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide"); THIS CODE REFACTORED TO UPDATEDOTS() ABOVe
  but run it in here*/
  updateDots(currentDot, targetDot);

  /*left/right buttons disappear when end of slide sequence
  if (targetIndex === 0) {//so at first slide
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {//if we are on last slide
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  } THE FUNCTION CALLED FROM ABOVE CALLED HERE:*/

  hideShowArrows(slides, prevButton, nextButton, targetIndex);

});
