document.addEventListener("DOMContentLoaded", function() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            const qiblaDirection = calculateQiblaDirection(userLat, userLon);
            const pointer = document.getElementById('qibla-pointer');
            pointer.style.transform = `rotate(${qiblaDirection}deg)`;
        }, function(error) {
            alert('Error getting location');
        });
    } else {
        alert('Geolocation is not supported by your browser');
    }
});

function calculateQiblaDirection(lat, lon) {
    const kaabaLat = 21.422487;
    const kaabaLon = 39.826206;
    const phiK = kaabaLat * Math.PI / 180.0;
    const lambdaK = kaabaLon * Math.PI / 180.0;
    const phi = lat * Math.PI / 180.0;
    const lambda = lon * Math.PI / 180.0;
    const qibla = Math.atan2(Math.sin(lambdaK-lambda), (Math.cos(phi) * Math.tan(phiK)) - (Math.sin(phi) * Math.cos(lambdaK-lambda))) * 180 / Math.PI;
    return (qibla + 360) % 360;
}
