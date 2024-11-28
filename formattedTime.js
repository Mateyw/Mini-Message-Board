module.exports = function getFormattedTime() {
    const date = new Date();

    // Get hours and minutes
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let weekday = date.getDay();

    let dayWeekdayMap = {
        "0": "Sunday",
        "1": "Monday",
        "2": "Tuesday",
        "3": "Wednesday",
        "4": "Thursday",
        "5": "Friday",
        "6": "Saturday"
    };

    // Add leading zeros if necessary
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Format as HH:mm
    const weekdayName = dayWeekdayMap[weekday];
    return `${hours}:${minutes}, ${weekdayName}`;
};