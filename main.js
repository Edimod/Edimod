const cursor = document.querySelector('.custom-cursor.site-wide');

// Śledzenie ruchu myszy po całej stronie
window.addEventListener('mousemove', (evt) => {
    if (cursor) {
        cursor.classList.add('visible');
        
        const x = evt.clientX - 30;
        const y = evt.clientY - 30;
        
        cursor.style.setProperty('--x', `${x}px`);
        cursor.style.setProperty('--y', `${y}px`);
        
        cursor.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// Ukrywanie kursora, gdy mysz opuszcza okno przeglądarki
document.addEventListener('mouseleave', () => {
    if (cursor) cursor.classList.remove('visible');
});

// Obsługa kliknięcia (Animacja Podskoku)
document.addEventListener('mousedown', () => {
    if (cursor) {
        cursor.classList.remove('active');
        void cursor.offsetWidth; 
        cursor.classList.add('active');
    }
});

if (cursor) {
    cursor.addEventListener('animationend', () => {
        cursor.classList.remove('active');
    });
}

// Zmiana kursora po najechaniu na logo lub napis Edimod w headerze
const logoLink = document.querySelector('header a');
if (logoLink && cursor) {
    logoLink.addEventListener('mouseenter', () => {
        cursor.classList.add('type-link');
    });

    logoLink.addEventListener('mouseleave', () => {
        cursor.classList.remove('type-link');
    });
}

// --- NAPIS NA ŚRODKU STRONY (Czasowy / Losowy) ---
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('welcome-text');
    if (!textElement) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Przeliczamy czas na minuty od początku doby (00:00 = 0, 03:30 = 210)
    const timeInMinutes = hours * 60 + minutes;

    // --- TRYB NOCNY (00:00 - 03:30) ---
    if (timeInMinutes >= 0 && timeInMinutes <= 210) {
        textElement.textContent = "coś stoi za tobą.";
        textElement.classList.add('midnight-scare');
    } 
    // --- STANDARDOWY TRYB Z LOSOWANIEM ---
    else {
        textElement.classList.remove('midnight-scare');

        const timeGreeting = hours < 16 ? "Dzień Dobry" : "Dobry Wieczór";

        const texts = [
            timeGreeting,
            "No siema",
            "Join Discorddddd",
            "Elo",
            "Powered by Edimod",
            "Nie wiem co tu pisać",
            "Ooga Booga"
        ];

        const randomIndex = Math.floor(Math.random() * texts.length);
        const chosenText = texts[randomIndex];
        textElement.textContent = chosenText;

        // --- EASTER EGG DLA "Ooga Booga" ---
        if (chosenText === "Ooga Booga") {
            let isPlaying = false;
            const audio = new Audio('ooga-booga-spooky-month.mp3');

            textElement.addEventListener('mouseenter', () => {
                if (cursor) cursor.classList.add('type-link');
            });

            textElement.addEventListener('mouseleave', () => {
                if (cursor) cursor.classList.remove('type-link');
            });

            textElement.addEventListener('click', () => {
                if (isPlaying) return;
                isPlaying = true;

                document.body.style.backgroundImage = "url('Oogabooga.png')";
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "center";
                document.body.style.backgroundRepeat = "no-repeat";

                audio.currentTime = 0;
                audio.play().catch(err => console.log("Błąd odtwarzania audio:", err));

                audio.onended = () => {
                    document.body.style.backgroundImage = "none";
                    document.body.style.backgroundColor = "#ffffff";
                    isPlaying = false;
                };
            });
        }
    }
});
