(function () {
    "use strict";

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

            window.addEventListener('load', () => {
                const rect = ocImg.getBoundingClientRect();
                ocImg.style.left = (window.innerWidth - rect.width - 50) + 'px';
                ocImg.style.top = (window.innerHeight - rect.height - 50) + 'px';
                ocImg.style.bottom = 'auto';
                ocImg.style.right = 'auto';
            });

            ocImg.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                
                const rect = ocImg.getBoundingClientRect();
                initialX = rect.left;
                initialY = rect.top;

                e.preventDefault();
            });

            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;

                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                ocImg.style.left = (initialX + dx) + 'px';
                ocImg.style.top = (initialY + dy) + 'px';

                if (e.clientY < window.innerHeight / 2) {
                    ocImg.src = 'oc2.jpg';
                } else {
                    ocImg.src = 'oc.jpg';
                }
            });

            window.addEventListener('mouseup', () => {
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
                    "Elo",
                    "Ooga Booga",
                    "Zmęczony szkołą co nie",
                    "AvA",
                    "odio el chocolate"
                ];

                const randomIndex = Math.floor(Math.random() * texts.length);
                const chosenText = texts[randomIndex];
                textElement.textContent = chosenText;


if (chosenText === "AvA") {
    let isPlaying = false;
    const audio = new Audio('music.mp3');
    // Tworzymy zmienną na poziomie warunku, aby była dostępna także w audio.onended
    let img; 

    textElement.addEventListener('mouseenter', () => {
        if (customCursor) customCursor.classList.add('type-link');
    });

    textElement.addEventListener('mouseleave', () => {
        if (customCursor) customCursor.classList.remove('type-link');
    });

    textElement.addEventListener('click', () => {
        if (isPlaying) return;
        isPlaying = true;
        audio.currentTime = 0;
        audio.play().catch(err => console.log("Błąd audio:", err));

        // 1. Tworzymy nowy element obrazka
        img = new Image();

        // 2. Ustawiamy źródło obrazka
        img.src = 'ava.png';

        // 3. Ustawiamy szerokość na 60 pikseli (lub 100, jak wolisz)
        img.width = 120;

        // NOWE: Pozycjonowanie w lewym dolnym rogu ekranu
        img.style.position = 'fixed';
        img.style.left = '20px';   // odległość od lewej krawędzi
        img.style.bottom = '50px'; // odległość od dolnej krawędzi
        img.style.zIndex = '9999'; // upewnia się, że obrazek jest na wierzchu

        // 4. Wstawiamy obrazek na stronę
        document.body.appendChild(img);

        // 3. Powrót do normy po zakończeniu dźwięku
        audio.onended = () => {
            document.body.style.backgroundImage = "none";
            document.body.style.backgroundColor = "";

            // NOWE: Usuwanie obrazka ze strony po skończeniu muzyki
            if (img) {
                img.remove();
            }

            isPlaying = false;
        };
    });
}

if (chosenText === 'odio el chocolate') {
    let isPlaying = false;
    
    const videoBg = document.createElement('video');
    videoBg.src = 'odio el chocolate.mp4';
    videoBg.style.position = 'fixed';
    videoBg.style.top = '0';
    videoBg.style.left = '0';
    videoBg.style.width = '100vw';
    videoBg.style.height = '100vh';
    
    // --- POPRAWKA PRZYCINANIA ---
    // contain sprawi, że całe wideo będzie widoczne bez ucinania góry i dołu
    videoBg.style.objectFit = 'contain'; 
    // Dodajemy czarne tło dla wideo na wypadek, gdyby ekran miał inne proporcje niż film
    videoBg.style.backgroundColor = 'black'; 
    
    videoBg.style.zIndex = '-1'; 
    videoBg.style.pointerEvents = 'none';
    
    // --- WYDŁUŻENIE CZASU ---
    // Włączamy zapętlenie, aby wideo nie wyłączyło się za wcześnie, jeśli plik jest krótki
    videoBg.loop = true; 

    textElement.addEventListener('mouseenter', () => {
        if (customCursor) customCursor.classList.add('type-link');
    });

    textElement.addEventListener('mouseleave', () => {
        if (customCursor) customCursor.classList.remove('type-link');
    });

    textElement.addEventListener('click', () => {
        if (isPlaying) return;
        isPlaying = true;

        const originalBodyBg = document.body.style.backgroundColor;
        const originalHtmlBg = document.documentElement.style.backgroundColor;
        const originalBodyImg = document.body.style.backgroundImage;
        
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        document.body.style.backgroundImage = 'none';

        document.body.appendChild(videoBg);
        
        const ocImg = document.getElementById('draggable-oc');
        if (ocImg) {
            ocImg.src = 'oc3.jpg';
        }

        videoBg.currentTime = 0;
        videoBg.play().catch(err => console.log("Błąd wideo:", err));

        // --- FUNKCJA KOŃCZĄCA EASTER EGGA ---
        const endEasterEgg = () => {
            videoBg.pause(); // Zatrzymujemy odtwarzanie
            
            if (videoBg.parentNode) {
                videoBg.parentNode.removeChild(videoBg);
            }

            document.body.style.backgroundColor = originalBodyBg;
            document.documentElement.style.backgroundColor = originalHtmlBg;
            document.body.style.backgroundImage = originalBodyImg;

            if (ocImg) {
                ocImg.src = 'oc.jpg';
            }
            
            isPlaying = false;
        };

        // --- USTAWIANIE CZASU TRWANIA ---
        // Zamiast czekać na koniec pliku (videoBg.onended), ustawiamy własny licznik.
        // Wpisz poniżej czas w milisekundach (np. 10000 to 10 sekund animacji)
        const czasTrwaniaWMilisekundach = 14000; 
        setTimeout(endEasterEgg, czasTrwaniaWMilisekundach);
    });
}


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

        // 1. Zmiana tła na grafikę Ooga Booga
        document.body.style.backgroundImage = "url('Oogabooga.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";

        // 2. Zmiana duszka OC na oc3.jpg na czas trwania easter egga
        const ocImg = document.getElementById('draggable-oc');
        if (ocImg) {
            ocImg.src = 'oc3.jpg';
        }

        audio.currentTime = 0;
        audio.play().catch(err => console.log("Błąd audio:", err));

        // 3. Powrót do normy po zakończeniu dźwięku
        audio.onended = () => {
            document.body.style.backgroundImage = "none";
            document.body.style.backgroundColor = "";
            
            // Przywracamy zwykły wygląd OC
            if (ocImg) {
                ocImg.src = 'oc.jpg';
            }

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
