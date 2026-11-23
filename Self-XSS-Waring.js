
function showWarning() {
  console.log(
    "%cZaczekaj!",
    "color: #ff5555; font-size: 40px; font-weight: bold;"
  );

  console.log(
    "%cJeśli ktoś powiedział Ci, żeby coś tutaj wkleić, istnieje szansa 11/10, że próbuje Cię oszukać!",
    "color: #ff5555; font-size: 16px;"
  );

  console.log(
    "%cNie wklejaj kodu do konsoli, jeśli nie wiesz, co robi!",
    "color: #ff5555; font-size: 16px;"
  );
}

  console.log(
    "%cZachowaj bezpieczeństwo podczas korzystania z DevTools.",
    "color: #ff5555; font-size: 16px;"
  );
}
// Pierwsze ostrzeżenie
showWarning();

// Powtarzaj co 5 sekund
setInterval(showWarning, 5000);
