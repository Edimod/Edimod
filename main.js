(function () {
    'use strict';

    // --- 0. REJESTRACJA SERVICE WORKERA EDIMOD PWA ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js', {
                scope: './'
            })

            .then((reg) => {
                console.log('CO TY TU ROBISZ!', reg);
            })
            .catch((err) => {
                console.error('Błąd rejestracji Service Workera:', err);
            });
        });
    }

    // --- 1. DŹWIĘK KLIKNIĘCIA ---
    const clickSound = new Audio('click.mp3');
    clickSound.volume = 0.25;

    document.addEventListener('mousedown', () => {
        clickSound.currentTime = 0;
        clickSound.play().catch(err => {});
    });

    // --- 2. OBSŁUGA CUSTOMOWEGO KURSORA ---
    const customCursor = document.querySelector('.custom-cursor.site-wide');

    if (customCursor) {
        window.addEventListener('mousemove', (evt) => {
            customCursor.classList.add('visible');
            const x = evt.clientX - 30;
            const y = evt.clientY - 30;
            customCursor.style.setProperty('--x', `${x}px`);
            customCursor.style.setProperty('--y', `${y}px`);
            customCursor.style.transform = `translate(${x}px, ${y}px)`;
        });

        document.addEventListener('mouseleave', () => {
            customCursor.classList.remove('visible');
        });

        document.addEventListener('mousedown', () => {
            customCursor.classList.remove('active');
            void customCursor.offsetWidth; 
            customCursor.classList.add('active');
        });

        customCursor.addEventListener('animationend', () => {
            customCursor.classList.remove('active');
        });

        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, .dropdown-btn, #language-button')) {
                customCursor.classList.add('type-link');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('a, button, .dropdown-btn, #language-button')) {
                customCursor.classList.remove('type-link');
            }
        });
    }

    // --- 3. LOGIKA PO ZAŁADOWANIU STRONY ---
    document.addEventListener('DOMContentLoaded', () => {

        // --- A. SWOBODNE PRZECIĄGANIE OC ---
        const ocImg = document.getElementById('draggable-oc');

        if (ocImg) {
            let isDragging = false;
            let startX = 0, startY = 0;
            let initialX = 0, initialY = 0;

            function startDrag(clientX, clientY) {
                isDragging = true;
                startX = clientX;
                startY = clientY;
                const rect = ocImg.getBoundingClientRect();
                initialX = rect.left;
                initialY = rect.top;
                ocImg.style.bottom = 'auto';
                ocImg.style.right = 'auto';
                ocImg.style.left = initialX + 'px';
                ocImg.style.top = initialY + 'px';
            }

            function moveDrag(clientX, clientY) {
                if (!isDragging) return;
                const dx = clientX - startX;
                const dy = clientY - startY;

                ocImg.style.left = (initialX + dx) + 'px';
                ocImg.style.top = (initialY + dy) + 'px';

                if (clientY < window.innerHeight / 2) {
                    ocImg.src = 'oc2.jpg';
                } else {
                    ocImg.src = 'oc.jpg';
                }
            }

            // Obsługa myszki (komputer)
            ocImg.addEventListener('mousedown', (e) => {
                startDrag(e.clientX, e.clientY);
                e.preventDefault();
            });

            window.addEventListener('mousemove', (e) => {
                moveDrag(e.clientX, e.clientY);
            });

            window.addEventListener('mouseup', () => {
                isDragging = false;
            });

            // Obsługa dotyku (telefon)
            ocImg.addEventListener('touchstart', (e) => {
                const touch = e.touches[0];
                startDrag(touch.clientX, touch.clientY);
                e.preventDefault();
            }, { passive: false });

            window.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                const touch = e.touches[0];
                moveDrag(touch.clientX, touch.clientY);
                e.preventDefault();
            }, { passive: false });

            window.addEventListener('touchend', () => {
                isDragging = false;
            });
        }


        // --- B. Obsługa rozwijanego menu "File" ---
        const dropdown = document.querySelector('.dropdown');
        const dropdownBtn = document.querySelector('.dropdown-btn');

        if (dropdown && dropdownBtn) {
            dropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });

            document.addEventListener('click', () => {
                dropdown.classList.remove('active');
            });
        }

        // --- C. Napis na środku strony ---
        const textElement = document.getElementById('welcome-text');
        if (textElement) {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const timeInMinutes = hours * 60 + minutes;

            if (timeInMinutes >= 0 && timeInMinutes <= 210) {
                textElement.textContent = "coś stoi za tobą..";
                textElement.classList.add('midnight-scare');
            } else {
                textElement.classList.remove('midnight-scare');
                const timeGreeting = hours < 16 ? "Dzień Dobry" : "Dobry Wieczór";
                const texts = [
                    timeGreeting,
                    "Siema",
                    "Witam",
                    "Cześć!",
                    "Elo",
                    "Ooga Booga",
                    "Zmęczony szkołą co nie",
                ];

                const randomIndex = Math.floor(Math.random() * texts.length);
                const chosenText = texts[randomIndex];
                textElement.textContent = chosenText;

                if (chosenText === "Ooga Booga") {
                    let isPlaying = false;
                    const audio = new Audio('ooga-booga-spooky-month.mp3');

                    textElement.addEventListener('mouseenter', () => {
                        if (customCursor) customCursor.classList.add('type-link');
                    });

                    textElement.addEventListener('mouseleave', () => {
                        if (customCursor) customCursor.classList.remove('type-link');
                    });

                    textElement.addEventListener('click', () => {
                        if (isPlaying) return;
                        isPlaying = true;

                        document.body.style.backgroundImage = "url('Oogabooga.png')";
                        document.body.style.backgroundSize = "cover";
                        document.body.style.backgroundPosition = "center";
                        document.body.style.backgroundRepeat = "no-repeat";

                        const ocImg = document.getElementById('draggable-oc');
                        if (ocImg) ocImg.src = 'oc3.jpg';

                        audio.currentTime = 0;
                        audio.play().catch(err => console.log("Błąd audio:", err));

                        audio.onended = () => {
                            document.body.style.backgroundImage = "none";
                            document.body.style.backgroundColor = "";
                            if (ocImg) ocImg.src = 'oc.jpg';
                            isPlaying = false;
                        };
                    });
                }
            }
        }

        // --- D. Dynamiczny tytuł karty ---
        const originalTitle = document.title;
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.title = "Wróć do nas 😢";
            } else {
                document.title = originalTitle;
            }
        });
    });

})();


let rightClickStage = 0;
let allowNextContextMenu = false;

const messages = [
  "Stop!",
  "Nie.",
  "Nei pozwalam.",
  "Pls.",
  "Nie.",
  "Dobra, jak jesteś taki, to masz."
];

document.addEventListener("contextmenu", function(event) {

  if (allowNextContextMenu) {
    allowNextContextMenu = false;
    rightClickStage = 0;
    return; // Normalne menu przeglądarki!
  }

  event.preventDefault();

  let old = document.getElementById("right-click-warning");
  if (old) old.remove();

  const menu = document.createElement("div");
  menu.id = "right-click-warning";

  Object.assign(menu.style, {
    position: "fixed",
    left: Math.min(event.clientX, innerWidth - 260) + "px",
    top: Math.min(event.clientY, innerHeight - 80) + "px",
    background: "#252525",
    color: "white",
    padding: "14px 22px",
    borderRadius: "9px",
    font: "15px Arial",
    zIndex: "999999",
    boxShadow: "0 5px 20px #0008",
    cursor: "pointer"
  });

  menu.textContent = messages[rightClickStage];

  menu.onclick = function() {
    if (rightClickStage === 5) {
      menu.remove();
      allowNextContextMenu = true;
      return;
    }

    rightClickStage++;
    menu.textContent = messages[rightClickStage];
  };

  document.body.appendChild(menu);
});
