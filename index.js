document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".slider__container");
  const sliderIndicators = document.querySelector(".slider__indicators");
  const en = document.querySelector(".lang__en");
  const ru = document.querySelector(".lang__ru");
  const translateElements = document.querySelectorAll("[data-en]");
  const menu = document.querySelector('menu');
  const headerMenu = document.querySelector('.header__menu');
  const closeMenu = document.querySelector('.close')

  let open = false;

  headerMenu.addEventListener('click', () => {
    menu.classList.add('open');
  })

  closeMenu.addEventListener('click', () => {
    menu.classList.remove('open')
  })

  let currentLang = "ru";
  let currentIndex = 0;

  ru.classList.add("active");

  for (let i = 0; i < container.children.length; i++) {
    const indicator = document.createElement("div");

    indicator.classList.add("indicator__item");

    sliderIndicators.appendChild(indicator);

    indicator.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });
  }

  sliderIndicators.children[currentIndex].classList.add("active");

  function nextSlide() {
    currentIndex = (currentIndex + 1) % container.children.length;

    updateCarousel();
  }

  function updateCarousel() {
    const translateValue = -currentIndex * 100 + "%";

    container.style.transform = `translateX(${translateValue})`;

    [...sliderIndicators.children].forEach((item) =>
      item.classList.remove("active")
    );

    sliderIndicators.children[currentIndex].classList.add("active");
  }

  setInterval(nextSlide, 3000);

  const switchLanguage = (lang) => {
    en.classList.toggle("active", lang === "en");
    ru.classList.toggle("active", lang === "ru");

    currentLang = lang;

    translateElements.forEach((item) => {
      const translation = item.getAttribute(`data-${currentLang}`);

      if (item.nodeName === "INPUT") {
        item.setAttribute(
          "placeholder",
          item.getAttribute(`data-${currentLang}`)
        );
      } else {
        item.firstChild.nodeValue = translation;
      }

    });
  };

  en.addEventListener("click", () => switchLanguage("en"));
  ru.addEventListener("click", () => switchLanguage("ru"));
});
