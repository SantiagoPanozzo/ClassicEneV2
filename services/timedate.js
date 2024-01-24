const argentinaUrl = "https://www.timeapi.io/api/TimeZone/zone?timeZone=America/Buenos_Aires";
const spainUrl = "https://www.timeapi.io/api/TimeZone/zone?timeZone=Europe/Madrid";
const mexicoUrl = "https://www.timeapi.io/api/TimeZone/zone?timeZone=America/Mexico_City";

const getOffset = async (country) => {
  const dateUrl = `https://www.timeapi.io/api/TimeZone/zone?timeZone=${country}`;

  let date = {fake: "fake"};
  await fetch(dateUrl, {method: "GET"})
  .then((response) => response.json())
  .then((json) => date = json);
  
  const offsetSeconds = date.currentUtcOffset.seconds;
  //console.log(offsetSeconds);
  const offsetSymbol = offsetSeconds <  0 ? "-" : "+";
  const offsetHours = Math.abs(Math.floor((offsetSeconds/60)/60));
  const offsetMinutes = Math.abs(Math.floor(offsetSeconds/60)) - (60*offsetHours);
  return {offsetSymbol, offsetHours, offsetMinutes};
  
}

module.exports = getOffset;