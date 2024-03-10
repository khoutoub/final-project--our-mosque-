function findQiblaDirection() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat1 = toRadians(position.coords.latitude);
            const lon1 = toRadians(position.coords.longitude);
            const lat2 = toRadians(21.4225); // Latitude for Kaaba
            const lon2 = toRadians(39.8262); // Longitude for Kaaba

            const deltaLon = lon2 - lon1;
            const y = Math.sin(deltaLon) * Math.cos(lat2);
            const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
            let brng = Math.atan2(y, x);
            brng = toDegrees(brng); // Convert to degrees
            brng = (brng + 360) % 360; // Normalize

            document.getElementById('qibla-direction').textContent = `Qibla direction is ${brng.toFixed(2)}° from North.`;
        }, function(error) {
            alert('Error getting location');
        });
    } else {
        alert('Geolocation is not supported by your browser');
    }
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}
