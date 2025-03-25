// Инициализация AOS
AOS.init({
    duration: 800,
    once: true
});

// Обработка формы с отправкой в Telegram
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        telegram: formData.get('telegram'),
        message: formData.get('message')
    };

    const TELEGRAM_BOT_TOKEN = "7935450995:AAF5ka7X3T9Bub0Bq6ysVnB0HrKm3ujUtns";
    const CHAT_ID = 1094905671;
    const text = `Новая заявка:\nИмя: ${data.name}\nTelegram: ${data.telegram}\nСообщение: ${data.message}`;

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.ok) {
            alert(`Спасибо, ${data.name}! Ваша заявка отправлена.`);
            this.reset();
        } else {
            alert('Ошибка отправки: ' + result.description);
        }
    })
    .catch(error => alert('Ошибка: ' + error));
});
