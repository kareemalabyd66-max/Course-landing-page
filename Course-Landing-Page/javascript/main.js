// 1. DATA & ARRAYS SECTION//
const today = "2026-07-25";

const courseNames = ["HTML Basics", "CSS Mastery", "JavaScript", "Bootstrap"];

const courseStatus = ["Published", "In Progress", "Coming Soon", "Published"];

console.log("Today's Date : " + today);

for (let i = 0; i < courseNames.length; i++) {
  console.log(courseNames[i] + " - " + courseStatus[i]);
}

// 2. COURSES SLIDER & ACTIVE CARD LOGIC//

const track = document.getElementById("sliderTrack");
const dots = document.querySelectorAll(".dot");
const slideItems = document.querySelectorAll(".course-slide-item");
let currentIndex = 0;

function updateSlider(index) {
  currentIndex = index;

  if (track && slideItems.length > 0) {
    const slideWidth = slideItems[0].offsetWidth + 20;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    slideItems.forEach((item, i) => {
      if (i === currentIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[currentIndex]) {
    dots[currentIndex].classList.add("active");
  }
}

function currentSlide(index) {
  updateSlider(index);
}

function slideNext() {
  if (currentIndex < dots.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateSlider(currentIndex);
}

function slidePrev() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = dots.length - 1;
  }
  updateSlider(currentIndex);
}

// 3. FORM VALIDATION LOGIC (RED/GREEN BORDERS)//

document.addEventListener("DOMContentLoaded", () => {
  // تشغيل الـ Slider عند البداية
  updateSlider(0);

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (prevBtn) prevBtn.addEventListener("click", slidePrev);
  if (nextBtn) nextBtn.addEventListener("click", slideNext);

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => currentSlide(idx));
  });

  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    const inputs = signupForm.querySelectorAll("input[required]");

    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateInput(input));
      input.addEventListener("input", () => {
        if (input.classList.contains("is-invalid")) {
          validateInput(input);
        }
      });
    });

    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let isFormValid = true;

      inputs.forEach((input) => {
        if (!validateInput(input)) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        alert("Form submitted successfully!");
        signupForm.reset();
        inputs.forEach((input) => input.classList.remove("is-valid"));
      }
    });
  }
});

function validateInput(input) {
  const value = input.value.trim();

  if (value === "") {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  } else if (input.type === "email" && !validateEmail(value)) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
