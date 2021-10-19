//CAROUSEL

//Switching slides so when user clicks a button the carousel should move to
//next or previous slide

//Get elements
const carousel = document.querySelector(".carousel");
const previousButton = carousel.querySelector(".previous-button");
const nextButton = carousel.querySelector(".next-button");

//When click on next button we want to show the next slide
const contents = carousel.querySelector(".carousel-contents");
const dotsContainer = carousel.querySelector(".carousel-dots");

nextButton.addEventListener("click", event => {
  //find currentSlide
  const currentSlide = contents.querySelector(".is-selected");
  //get to next slide
  const nextSlide = currentSlide.nextElementSibling;
  //get values of the next slide(s)
  const destination = getComputedStyle(nextSlide).left;
  //use destination value to set .carousel-content
  contents.style.left = "-" + destination;
  //update .is-selected class
  currentSlide.classList.remove("is-selected");
  nextSlide.classList.add("is-selected");

  //show previous button when clicking on next button
  previousButton.removeAttribute("hidden");
  //hide next button when on last slide
  if (!nextSlide.nextElementSibling) {
    nextButton.setAttribute("hidden", true);
  }

  //updating dots when click on next button
  const currentDot = dotsContainer.querySelector(".is-selected");
  //find next dot
  const nextDot = currentDot.nextElementSibling;
  //remove .is-selected from currentDot
  currentDot.classList.remove("is-selected");
  //add .is-selected to nextDot
  nextDot.classList.add("is-selected");

});

//When click on previous button we want to show the previous slide

previousButton.addEventListener("click", event => {
  //find currentSlide
  const currentSlide = contents.querySelector(".is-selected");
  //get to previous slide
  const previousSlide = currentSlide.previousElementSibling;
  //get values of the previous slide(s)
  const destination = getComputedStyle(previousSlide).left;
  //use destination value to set .carousel-content
  contents.style.left = "-" + destination;
  //update .is-selected class
  currentSlide.classList.remove("is-selected");
  previousSlide.classList.add("is-selected");

  //show next button when clicking on previous button
  nextButton.removeAttribute("hidden");
  //hide previous button when on first slide
  if (!previousSlide.previousElementSibling) {
    previousButton.setAttribute("hidden", true);
  }

  //updating dots when click on previous button
  const currentDot = dotsContainer.querySelector(".is-selected");
  //find previous dot
  const previousDot = currentDot.previousElementSibling;
  //remove .is-selected from currentDot
  currentDot.classList.remove("is-selected");
  //add .is-selected to previousDot
  previousDot.classList.add("is-selected");

});

//WORKING THE DOTS

//get elements
const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));



//When a dot is clicked we need to find its corresponding slide
dots.forEach(dot => {
  dot.addEventListener("click", event => {
    let clickedDotIndex;
    for (let index = 0; index < dots.length; index++) {
      if (dots[index] === dot) {
        clickedDotIndex = index;
      }
    }
    //use clidkedDotIndex to find slide to show
    const slideToShow = slides[clickedDotIndex];
    const destination = getComputedStyle(slideToShow).left;
    contents.style.left = "-" + destination;

    //update location of .is-selected
    slides.forEach(slide => {
      slide.classList.remove("is-selected");
    })
    //then add .is-selected to newly displayed slide
    slideToShow.classList.add("is-selected");

    //update dot state so the selected dot is black
    dots.forEach(d => {
      d.classList.remove("is-selected");
    })
    dot.classList.add("is-selected");

    //Showing/hiding previous and next buttons when click on a dot
    if (clickedDotIndex === 0) {
      previousButton.setAttribute("hidden", true);
      nextButton.removeAttribute("hidden");
    } else if (clickedDotIndex === dots.length - 1) {
      previousButton.removeAttribute("hidden");
      nextButton.setAttribute("hidden", true);
    } else {
      previousButton.removeAttribute("hidden");
      nextButton.removeAttribute("hidden");
    }
  });
})

//Position the slides with Javascript - forEach loop
const slideWidth = slides[0].getBoundingClientRect().width;

slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + "px";
})
