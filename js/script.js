(() => {
  let slideNumber = 1;

  const slides = document.querySelectorAll(".slider__item"),
    buttonPrev = document.querySelector(".slider__button--prev"),
    buttonNext = document.querySelector(".slider__button--next"),
    sliderToggles = document.querySelector(".slider__toggles"),
    toggles = document.querySelectorAll(".slider__toggle");

  let isRun = true;
  let currentToggle = 1;

  //--
  // const showInitialSlide = slideNumber => {
  //   slides.forEach(item => {
  //     item.style.zIndex = -1;
  //   });
  //   slides[slideNumber - 1].style.zIndex = 0;
  // };
  // showInitialSlide(slideNumber);
  //--

  //immediately invoked function (IIFE)
  (slideNumber => {
    slides.forEach(item => {
      item.style.zIndex = -1;
    });
    slides[slideNumber - 1].style.zIndex = 0;
  })(slideNumber);

  const changeSlide = (index, sign = 1) => {
    if (index > slides.length) {
      slideNumber = 1;
    }
    if (index < 1) {
      slideNumber = slides.length;
    }

    let slidePosition = 100;
    slides[slideNumber - 1].style.zIndex = 1;

    slides.forEach(item => {
      item.style.left = "initial";
      item.style.right = "initial";
    });

    toggles.forEach(item => {
      item.classList.remove("slider__toggle--active");
    });

    let idInt = setInterval(animateSlide, 10);

    function animateSlide() {
      if (slidePosition <= 0) {
        clearInterval(idInt);
        isRun = true;
        currentToggle = slideNumber;

        slides.forEach(item => {
          item.style.zIndex = -1;

          sign == 1 ? (item.style.left = "100%") : (item.style.right = "100%");
        });

        slides[slideNumber - 1].style.zIndex = 0;
        sign == 1
          ? (slides[slideNumber - 1].style.left = 0)
          : (slides[slideNumber - 1].style.right = 0);
      } else {
        slidePosition -= 1;
        sign == 1
          ? (slides[slideNumber - 1].style.left = slidePosition + "%")
          : (slides[slideNumber - 1].style.right = slidePosition + "%");
      }
    }
    toggles[slideNumber - 1].classList.add("slider__toggle--active");
  };

  const changeSlideIndex = index => {
    if (isRun) {
      changeSlide((slideNumber += index), index);
      isRun = false;
    }
  };

  buttonNext.addEventListener("click", () => {
    changeSlideIndex(1);
  });

  buttonPrev.addEventListener("click", () => {
    changeSlideIndex(-1);
  });

  const onHandleToggle = number => {
    if (isRun && currentToggle != number) {
      changeSlide((slideNumber = number));
      isRun = false;
    }
  };

  sliderToggles.addEventListener("click", evt => {
    for (let i = 0; i <= toggles.length; i++) {
      if (
        evt.target.classList.contains("slider__toggle") &&
        evt.target == toggles[i - 1]
      ) {
        onHandleToggle(i);
      }
    }
  });
})();
