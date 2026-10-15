const cursor = document.querySelector('.custom-cursor.site-wide');

// Śledzenie ruchu myszy po całej stronie
window.addEventListener('mousemove', (evt) => {
    cursor.classList.add('visible');
    
    const x = evt.clientX - 30;
    const y = evt.clientY - 30;
    
    cursor.style.setProperty('--x', `${x}px`);
    cursor.style.setProperty('--y', `${y}px`);
    
    cursor.style.transform = `translate(${x}px, ${y}px)`;
});

// Ukrywanie kursora, gdy mysz opuszcza okno przeglądarki
document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
});

// Obsługa kliknięcia (Animacja Podskoku)
document.addEventListener('mousedown', () => {
    cursor.classList.remove('active');
    void cursor.offsetWidth; 
    cursor.classList.add('active');
});

cursor.addEventListener('animationend', () => {
    cursor.classList.remove('active');
});

// Zmiana kursora po najechaniu na logo lub napis Edimod w headerze
const logoLink = document.querySelector('header a');
if (logoLink) {
    logoLink.addEventListener('mouseenter', () => {
        cursor.classList.add('type-link');
    });

    logoLink.addEventListener('mouseleave', () => {
        cursor.classList.remove('type-link');
    });
}

// --- LOSOWY NAPIS NA ŚRODKU STRONY (Zależny od godziny) ---
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('welcome-text');
    if (!textElement) return;

    const currentHour = new Date().getHours();
    const timeGreeting = currentHour < 16 ? "Dzień Dobry" : "Dobry Wieczór";

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

        // Zmiana kursora na łapkę/link po najechaniu na napis Ooga Booga
        textElement.addEventListener('mouseenter', () => {
            if (cursor) cursor.classList.add('type-link');
        });

        textElement.addEventListener('mouseleave', () => {
            if (cursor) cursor.classList.remove('type-link');
        });

        // Kliknięcie w napis odtwarza dźwięk i zmienia tło
        textElement.addEventListener('click', () => {
            if (isPlaying) return;
            isPlaying = true;

            // Ustawienie obrazka tła
            document.body.style.backgroundImage = "url('Oogabooga.png')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";

            // Odtwarzanie dźwięku
            audio.currentTime = 0;
            audio.play().catch(err => console.log("Błąd odtwarzania audio:", err));

            // Przywrócenie pierwotnego tła po zakończeniu odtwarzania
            audio.onended = () => {
                document.body.style.backgroundImage = "none";
                document.body.style.backgroundColor = "#ffffff";
                isPlaying = false;
            };
        });
    }
});