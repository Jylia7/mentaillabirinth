document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  const selectBody = document.querySelector('body');
  const selectHeader = document.querySelector('#header');

  function toggleScrolled() {
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Scroll up sticky header to headers with .scroll-up-sticky class
   */
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    if (!selectHeader.classList.contains('scroll-up-sticky')) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = `-${header.offsetHeight + 50}px`;
    } else if (scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = "0";
    } else {
      selectHeader.style.removeProperty('top');
      selectHeader.style.removeProperty('position');
    }
    lastScrollTop = scrollTop;
  });

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .has-dropdown i').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  function initIsotopeLayout() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });

    });
  }
  window.addEventListener('load', initIsotopeLayout);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function(swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

});

  /* ----------------------------------
    Start script print-text-delete
     ---------------------------------- */
     var words = ["БИЗНЕСУ", "СТАРТАПАМ", "IT-ПРОДУКТАМ"];
     var currentIndex = 0;
     var changingWord = document.getElementById("changing-word");
     var placeholder = document.getElementById("placeholder");
     var cursor = document.createElement("span");
     cursor.id = "cursor";
     cursor.textContent = "|";
// Функция для печати и стирания слов
     function typeWord(word) {
       changingWord.textContent = "";
       changingWord.appendChild(cursor);
       placeholder.style.visibility = 'hidden';

       var i = 0;
       var interval = setInterval(function() {
         if (i >= word.length) {
           clearInterval(interval);
           changingWord.removeChild(cursor);
           setTimeout(changeWord, 1000); // Задержка перед печатью следующего слова
         } else {
           changingWord.insertBefore(document.createTextNode(word.charAt(i)), cursor);
           i++;
         }
       }, 100);
     }
// Функция для изменения слова
     function changeWord() {
       var word = words[currentIndex];
       currentIndex = (currentIndex + 1) % words.length;
       var interval = setInterval(function() {
         if (changingWord.textContent === "") {
           clearInterval(interval);
           placeholder.style.visibility = 'visible';
           typeWord(word);
         } else {
           changingWord.removeChild(changingWord.childNodes[0]);
         }
       }, 100);
     }
// Запустить печать первого слова
     changeWord();

     /* ----------------------------------
    Start script QUIZ
     ---------------------------------- */

     const quizData = [
      {
          question: "Кто занимается продвижением вашей компании сегодня?",
          a: "Штатный маркетолог",
          b: "Отдел маркетинга",
          c: "Маркетинг на аутсорсинге",
          d: "Сами занимаетесь продвижением",
          e: "Продвижение не ведётся",
      },
      {
          question: "Как вы оцениваете работу вашего отдела маркетинга?",
          a: "Отлично",
          b: "Хорошо",
          c: "Удовлетворительно",
          d: "Плохо",
          e: "Никак",
      },
      {
          question: "Какие методы продвижения использовали ранее/сейчас?",
          a: "Медийная реклама",
          b: "Таргетированная реклама",
          c: "SMM",
          d: "Внешняя реклама",
          e: "Продвижение не велось",
      },
      {
          question: "Выберите основные трудности, которые хотите решить",
          a: "Как масштабироваться",
          b: "Как планировать расходы",
          c: "Растет рекламный бюджет",
          d: "Не работает реклама",
          e: "Не работает сайт",
      },
      {
          question: "Что хотите получить от аудита?",
          a: "Анализ ошибок на сайте и в рекламе",
          b: "План оптимизации расходов",
          c: "Закрыть пробелы в маркетинге",
          d: "Стратегию развития компании",
          e: "Анализ конкурентов и рынка",
      },
  ];

  const adviceSections = [
    [
      "1) Медиапланирование поможет определить оптимальные каналы продвижения и распределить бюджет эффективно",
      "2) Интеграция CRM-систем позволит автоматизировать процессы взаимодействия с клиентами и повыситьэффективность маркетинговых кампаний",
      "3) Разработка микросервисов и внедрение чат-ботов помогут оптимизировать процессы взаимодействия спотенциальными клиентами и улучшить сервис"
    ],
    [
      "1) Разработайте стратегию медиапланирования, учитывая особенности вашей целевой аудитории и конкурентов",
      "2) Внедрите автоворонку продаж для автоматизации процесса привлечения и удержания клиентов",
      "3) Используйте Landing page для запуска акций и специальных предложений, привлекая внимание потенциальныхпокупателей"
    ],
    [
      "1) Внедрите SEO-оптимизацию для улучшения видимости вашего сайта в поисковых системах",
      "2) Организуйте регулярные вебинары или онлайн-мероприятия для привлечения новых клиентов и укрепления отношений с текущими",
      "3) Используйте социальные сети для активного взаимодействия с аудиторией и продвижения продуктов/услуг"
    ],
    [
      "1) Создайте блог с полезными статьями и руководствами для привлечения целевой аудитории и установления авторитетности",
      "2) Организуйте вебинары или онлайн-курсы для обучения клиентов и укрепления связи с ними",
      "3) Внедрите программу лояльности для поощрения постоянных клиентов и стимулирования повторных покупок"
    ],
    [
      "1) Разработайте Landing page с привлекательным контентом и удобной навигацией для увеличения числа конверсий",
      "2) Внедрите анализ данных для оценки эффективности маркетинговых кампаний и принятия обоснованных решений",
      "3) Внедрите аудит юзабилити для оптимизации пользовательского опыта на вашем сайте и повышения конверсии"
    ],
    [
      "1) Создайте сайты-визитки с ярким дизайном и информацией о компании для привлечения новых клиентов",
      "2) Разработайте стратегию контент-маркетинга для привлечения и удержания аудитории",
      "3) Используйте инструменты аналитики для отслеживания поведения пользователей на сайте и оптимизации контента"
    ],
    [
      "1) Разработайте интерактивный Landing page для удобства покупателей и повышения конверсии",
      "2) Разработайте стратегию контент-маркетинга для привлечения и удержания аудитории",
      "3) Организуйте тематические акции и розыгрыши на сайте для привлечения внимания к вашему бренду"
    ],
    [
      "1) Разработайте стратегию социального медиа-маркетинга для увеличения присутствия бренда в онлайн-средах",
      "2) Используйте интерактивные сайты-визитки для повышения вовлеченности пользователей",
      "3) Используйте инструменты аналитики для отслеживания поведения пользователей на сайте и оптимизации контента"
    ],
    [
      "1) Консультации B2B и B2C помогут разработать стратегию маркетинга, выстроить взаимодействие с целевой аудиторией и решить текущие проблемы",
      "2) Автоворонка продаж поспособствует оптимизации процесса привлечения и конвертации клиентов, уменьшая потери и повышая эффективность",
      "3) Планирование и внедрение чат-ботов помогут улучшить коммуникацию с клиентами, ускорить ответы на запросы и повысить уровень обслуживания"
    ],
    [
      "1) Консультации B2B и B2C помогут определить ключевые потребности клиентов и разработать персонализированные маркетинговые стратегии",
      "2) Анализ данных позволит выявить тренды и понять, какие маркетинговые каналы приносят наибольший результат",
      "3) Интеграция CRM-систем с чат-ботами упростит взаимодействие с клиентами и повысит уровень обслуживания"
    ],
    [
      "1) Проведите аудит конкурентов для выявления их сильных и слабых сторон, чтобы адаптировать свои маркетинговые стратегии",
      "2) Разработайте персонализированные стратегии маркетинга на основе данных о поведении клиентов",
      "3) Внедрите микросервисы для улучшения процессов обработки заказов и взаимодействия с клиентами"
    ],
    [
      "1) Создайте контент-план для регулярного обновления информации на сайте и привлечения новых посетителей",
      "2) Проведите анализ эффективности рекламных кампаний для оптимизации затрат и увеличения ROI",
      "3) Внедрите систему отзывов и рейтингов на сайте для повышения доверия потенциальных клиентов и улучшения репутации бренда"
    ],
    [
      "1) Проведите анализ конкурентов для выявления новых идей и стратегий, которые могут быть применены в вашем маркетинге",
      "2) Разработайте персонализированные рассылки для увеличения вовлеченности клиентов и улучшения конверсии",
      "3) Разработайте персонализированные стратегии маркетинга на основе данных о поведении клиентов"
    ],
];
  
const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const answersText = document.querySelectorAll('.quiz-radio label');
const submitBtn = document.getElementById('submit');
let currentQuiz = 0;
let score = 0;
let currentSectionIndex = 0;
let currentAdviceIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
  loadQuiz();
});

function loadQuiz() {
  currentSectionIndex = 0; // Сбрасываем индекс текущего раздела
  currentAdviceIndex = 0; // Сбрасываем индекс текущего совета
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  answersText.forEach((answerText, index) => {
      answerText.innerText = currentQuizData[String.fromCharCode(97 + index)];
  });
  submitBtn.style.display = 'none';
}

function deselectAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
    });
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
            submitBtn.style.display = 'block';
        }
    });
    if (!answer) {
        submitBtn.style.display = 'none';
    }
    return answer;
}

function displayAdvice() {
    const randomSectionIndex = Math.floor(Math.random() * adviceSections.length);
    const currentSection = adviceSections[randomSectionIndex];

    for (let i = 0; i < 3; i++) {
        const advice = currentSection[i];
        const adviceContainer = document.createElement('div');
        adviceContainer.classList.add('advice-container');
        adviceContainer.innerText = advice;
        quiz.appendChild(adviceContainer);
    }
}

function generateRandomIndexes(length) {
  const indexes = [];
  while (indexes.length < length) {
      const randomIndex = Math.floor(Math.random() * length);
      if (!indexes.includes(randomIndex)) {
          indexes.push(randomIndex);
      }
  }
  return indexes;
}

let buttonClicks = 0; // Добавляем переменную для отслеживания количества нажатий на кнопку

// Удаляем вызов displayAdvice() из обработчика событий для answerEls
answerEls.forEach(answerEl => {
    answerEl.addEventListener('change', () => {
        getSelected();
    });
});

// Изменяем обработчик событий для кнопки "ВПЕРЕД &#8594;"
submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        buttonClicks++; // Увеличиваем счетчик нажатий на кнопку
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            while (quiz.firstChild) {
                quiz.removeChild(quiz.firstChild);
            }
            // Проверяем, является ли текущее количество нажатий на кнопку пятым
            if (buttonClicks === 5) {
                displayAdvice(); // Вызываем displayAdvice() только при пятом нажатии
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    loadQuiz();
});

/* ----------------------------------
    Start script Reviews
     ---------------------------------- */
     
var swiper = new Swiper( '.swiper-container.two', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		effect: 'coverflow',
		loop: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		coverflow: {
			rotate: 0,
			stretch: 100,
			depth: 150,
			modifier: 1.5,
			slideShadows : false,
		}
} );

/* ----------------------------------
    Widget Button script Reviews
     ---------------------------------- */

     const button = document.getElementById('messenger-button');
        let count = 0;

        const messengers = ['phone', 'whatsapp', 'telegram'];
        const links = ['tel:+79950775676', 'https://api.whatsapp.com/send?phone=79950775676', 'https://t.me/badabo'];

        function changeMessenger() {
            button.classList.remove('phone', 'whatsapp', 'telegram');
            button.classList.add(messengers[count % 3]);
            button.setAttribute('data-link', links[count % 3]);
        }

        function redirectToMessenger() {
            const link = button.getAttribute('data-link');
            window.location.href = link;
        }
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            redirectToMessenger();
            count = (count + 1) % 3;
        });

        setInterval(() => {
            changeMessenger();
            count = (count + 1) % 3;
        }, 3000);

/* ----------------------------------
    Popup script Reviews
     ---------------------------------- */

document.addEventListener('DOMContentLoaded', function() {
    var popupLinks = document.querySelectorAll('.popup-link');
    var closeButtons = document.querySelectorAll('.close');

    popupLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior

            var targetId = this.getAttribute('data-target'); // Get target popup ID
            var popup = document.getElementById(targetId);
            popup.style.display = 'block';
            var scrollX = window.scrollX || window.pageXOffset; // Get horizontal scroll position
            var scrollY = window.scrollY || window.pageYOffset; // Get vertical scroll position
            var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // Get window width
            var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // Get window height
            var popupWidth = popup.offsetWidth; // Get popup width
            var popupHeight = popup.offsetHeight; // Get popup height
            var popupTop = scrollY + (windowHeight - popupHeight) / 2; // Calculate top position to center the popup
            var popupLeft = scrollX + (windowWidth - popupWidth) / 2; // Calculate left position to center the popup
            popup.style.top = popupTop + 'px'; // Set top position of the popup
            popup.style.left = popupLeft + 'px'; // Set left position of the popup
        });
    });

    closeButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior

            var popup = this.parentElement;
            popup.style.display = 'none';
        });
    });
});