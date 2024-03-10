// script.js
document.addEventListener("DOMContentLoaded", function() {
    const surahSelect = document.getElementById('surah-select');
    const verseContainer = document.getElementById('verse-container');

    // Fetch list of Surahs
    fetch('https://api.alquran.cloud/v1/surah')
        .then(response => response.json())
        .then(data => {
            if(data.data) {
                data.data.forEach(surah => {
                    let option = document.createElement('option');
                    option.value = surah.number;
                    option.textContent = `${surah.number}. ${surah.englishName} - ${surah.name}`;
                    surahSelect.appendChild(option);
                });
            }
        });

    // Listen for Surah selection changes
    surahSelect.addEventListener('change', function() {
        const surahNumber = this.value;
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`)
            .then(response => response.json())
            .then(data => {
                verseContainer.innerHTML = ''; // Clear previous verses
                if(data.data && data.data.ayahs) {
                    data.data.ayahs.forEach(ayah => {
                        let p = document.createElement('p');
                        p.textContent = `${ayah.text} (${ayah.numberInSurah})`;
                        verseContainer.appendChild(p);
                    });
                }
            });
    });
});
