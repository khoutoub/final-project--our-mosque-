document.addEventListener("DOMContentLoaded", function() {
    // Example coordinates for Indianapolis
    const latitude = "39.7684";
    const longitude = "-86.1581";
    const method = 2; 

    
    const apiURL = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${method}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const times = data.data.timings;
            document.getElementById("fajr").textContent = times.Fajr;
            document.getElementById("dhuhr").textContent = times.Dhuhr;
            document.getElementById("asr").textContent = times.Asr;
            document.getElementById("maghrib").textContent = times.Maghrib;
            document.getElementById("isha").textContent = times.Isha;
        })
        .catch(error => {
            console.error("Error fetching prayer times:", error);
            document.getElementById("fajr").textContent = 'Unavailable';
            document.getElementById("dhuhr").textContent = 'Unavailable';
            document.getElementById("asr").textContent = 'Unavailable';
            document.getElementById("maghrib").textContent = 'Unavailable';
            document.getElementById("isha").textContent = 'Unavailable';
        });
});
