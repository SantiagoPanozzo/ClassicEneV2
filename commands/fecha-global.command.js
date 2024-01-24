const { SlashCommandBuilder } = require('discord.js');
const getOffset = require("../services/timedate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fecha')
    .setDescription('Mostrar una fecha para gente de otros paises')
    .addNumberOption(option => option
      .setName("dia")
      .setDescription("Dia")
      .setRequired(true))
    .addNumberOption(option => option
      .setName("mes")
      .setDescription("Mes")
      .setRequired(true))
    .addNumberOption(option => option
      .setName("año")
      .setDescription("Año")
      .setRequired(true))
    .addNumberOption(option => option
      .setName("hora")
      .setDescription("Hora")
      .setRequired(true))
    .addNumberOption(option => option
      .setName("minutos")
      .setDescription("Minutos")
      .setRequired(true))
    .addStringOption(option => option
      .setName("pais")
      .setDescription("TÚ pais (o el horario que uses)")
      .setRequired(true)
      .addChoices(
        { name: "España", value: "españa" },
        { name: "Argentina", value: "argentina" },
        { name: "México", value: "mexico" },
      )
    ),
  async execute(interaction) {
    const dia = String(interaction.options.getNumber("dia"))
    const mes = String(interaction.options.getNumber("mes"))
    const año = String(interaction.options.getNumber("año"))
    const hora = String(interaction.options.getNumber("hora"))
    const minutos = String(interaction.options.getNumber("minutos"))
    const pais = String(interaction.options.getString("pais"))

    let offsetSimbolo;
    let offsetHora;
    let offsetMinuto;
    let res;
    switch (pais) {
      case "españa":
        res = await getOffset("Europe/Madrid");
        offsetSimbolo = res.offsetSymbol + "";
        offsetHora = res.offsetHours + "";
        offsetMinuto = res.offsetMinutes + "";
        break;
      case "argentina":
        res = await getOffset("America/Buenos_Aires");
        offsetSimbolo = res.offsetSymbol + "";
        offsetHora = res.offsetHours + "";
        offsetMinuto = res.offsetMinutes + "";
        break;
      case "mexico":
        res = await getOffset("America/Mexico_City");
        offsetSimbolo = res.offsetSymbol + "";
        offsetHora = res.offsetHours + "";
        offsetMinuto = res.offsetMinutes + "";
        break;
      default:
        offsetSimbolo = "+";
        offsetHora = "00";
        offsetMinuto = "00";
        //console.log("fault");
        break;
    }
    console.log(offsetSimbolo);
    console.log(offsetHora);
    console.log(offsetMinuto);

    let text = makeTimeString(dia, mes, año, hora, minutos, offsetSimbolo, offsetHora, offsetMinuto);
    await interaction.reply(text);
  },
};

function makeTimeString(day, month, year, hour, minute, offsetSymbol, offsetHour, offsetMinute) {
  hour = (hour.length == 1) ? "0" + hour : hour
  minute = (minute.length == 1) ? "0" + minute : minute
  day = (day.length == 1) ? "0" + day : day
  month = (month.length == 1) ? "0" + month : month
  year = (year.length == 2) ? "20" + year : year
  offsetHour = (offsetHour.length == 1) ? "0" + offsetHour : offsetHour
  offsetMinute = (offsetMinute.length == 1) ? "0" + offsetMinute : offsetMinute
  const datestring = `${year}-${month}-${day}T${hour}:${minute}:00.000${offsetSymbol}${offsetHour}:${offsetMinute}`;
  console.log(datestring);
  const selectedDate = new Date(datestring);
  const epoch = selectedDate.getTime();
  //console.log(String(epoch));

  let formatDate = "<t:" + String(epoch).slice(0, String(epoch).length - 3) + ":F>"
  const text = "Fecha en tu horario: " + formatDate;
  return text;
}

