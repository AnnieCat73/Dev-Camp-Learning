//MOBILE MENU IN HEADER

//Get elements
const closeBtn = document.querySelector(".close-nav");
const openBtn = document.querySelector(".open-nav");
const navMenu = document.querySelector(".menu-nav");

//attach eventlisteners and toggle navigation-open class
closeBtn.addEventListener("click", () => {
  navMenu.classList.remove("navigation-open");
});

openBtn.addEventListener("click", () => {
  navMenu.classList.add("navigation-open");
});


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



//FULL NAME AND EMAIL VALIDATION ON FORM IN JOIN SECTION

//get elements
const form = document.querySelector(".join-form");
const fullName = document.getElementById("full-name");
const emailField = document.getElementById("email");
const joinButton = document.getElementById("join-button");

const nameMsg = form.querySelector(".name-msg");
const emailMsg = form.querySelector(".email-msg");

const validEmail = form.querySelector(".valid-email");
const validName = form.querySelector(".valid-name");
const formInput = document.querySelector("input");
const errorEmail = document.querySelector(".error-email");
const errorName = document.querySelector(".error-name");


//add eventlistener
joinButton.addEventListener("click", function (e) {

  e.preventDefault();
  const email = emailField.value;
  const fullNameValue = fullName.value;

  if (fullNameValue === "") {
    nameMsg.innerHTML = "Full Name cannot be empty";
    validName.style.display = "none";
    errorName.style.display = "block";

  } else {
    nameMsg.innerHTML = "Valid Full Name";
    validName.style.display = "block";
    errorName.style.display = "none";

  }

  if (validateEmail(email)) {

    emailMsg.innerHTML = "Email is valid";
    validEmail.style.display = "block";
    errorEmail.style.display = "none";
  } else {
    emailMsg.innerHTML = "Email is not valid";
    errorEmail.style.display = "block";
    validEmail.style.display = "none";
  }
});

const clearInput = function () {
  formInput.value = "";
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}



