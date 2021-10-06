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


//When I click left, move slides to the left

//When I click right, move slides to the right

nextButton.addEventListener("click", e => {
  //find the current slide you are on first
  const currentSlide = track.querySelector(".current-slide");//only look in track to find .current-slide
  console.log(currentSlide);
  //find next slide

});

//When I click the nav indicators, move to that slide
