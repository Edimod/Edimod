(function () {
    "use strict";

    // --- OBSŁUGA CUSTOMOWEGO KURSORA ---
    const customCursor = document.querySelector('.custom-cursor.site-wide');

    if (customCursor) {
        // Śledzenie ruchu myszy po całej stronie
        window.addEventListener('mousemove', (evt) => {
            customCursor.classList.add('visible');
            
            const x = evt.clientX - 30;
            const y = evt.clientY - 30;
            
            customCursor.style.setProperty('--x', `${x}px`);
            customCursor.style.setProperty('--y', `${y}px`);
            customCursor.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Ukrywanie kursora po opuszczeniu okna
        document.addEventListener('mouseleave', () => {
            customCursor.classList.remove('visible');
        });

        // Animacja kliknięcia (Podskok)
        document.addEventListener('mousedown', () => {
            customCursor.classList.remove('active');
            void customCursor.offsetWidth; 
            customCursor.classList.add('active');
        });

        customCursor.addEventListener('animationend', () => {
            customCursor.classList.remove('active');
        });

        // Reakcja kursora na najechanie na linki i przyciski
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

    // --- LOGIKA PO ZAŁADOWANIU STRONY ---
    document.addEventListener('DOMContentLoaded', () => {
        
        // 1. Obsługa rozwijanego menu "File"
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

        // 2. Napis na środku strony (dla index.html)
        const textElement = document.getElementById('welcome-text');
        if (textElement) {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const timeInMinutes = hours * 60 + minutes;

            if (timeInMinutes >= 0 && timeInMinutes <= 210) {
                textElement.textContent = "coś stoi za tobą.";
                textElement.classList.add('midnight-scare');
            } else {
                textElement.classList.remove('midnight-scare');
                const timeGreeting = hours < 16 ? "Dzień Dobry" : "Dobry Wieczór";
                const texts = [
                    timeGreeting,
                    "Siema",
                    "Witam",
                    "Cześć!",
                    "Co tam",
                    "Szczęść Boże",
                    "Join Discorddddd",
                    "Elo",
                    "Powered by Edimod",
                    "Nie wiem co tu pisać",
                    "Ooga Booga",
                    "Zmęczony szkołą co nie"
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

                        audio.currentTime = 0;
                        audio.play().catch(err => console.log("Błąd audio:", err));

                        audio.onended = () => {
                            document.body.style.backgroundImage = "none";
                            document.body.style.backgroundColor = "";
                            isPlaying = false;
                        };
                    });
                }
            }
        }

        // 3. Dynamiczny tytuł karty ("Wróć do nas")
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
