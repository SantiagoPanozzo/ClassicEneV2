const { SlashCommandBuilder } = require('discord.js');
const getOffset = require("../services/timedate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('anunciar')
    .setDescription('Crear un anuncio de stream')
    .addNumberOption(option => option
      .setName("dia")
      .setDescription("Dia del stream")
      .setRequired(true))
    .addNumberOption(option => option
      .setName("mes")
      .setDescription("Mes del stream")
      .setRequired(true))
    .addNumberOption(option => option
      .setName("año")
      .setDescription("Año del stream")
      .setRequired(true))
    .addNumberOption(option => option
      .setName("hora")
      .setDescription("Hora del stream")
      .setRequired(true))
    .addNumberOption(option => option
      .setName("minutos")
      .setDescription("Minutos del stream")
      .setRequired(true))
    .addStringOption(option => option
      .setName("descripcion")
      .setDescription("Completa la frase ... donde estaremos {descripcion}!")
      .setRequired(true)
    ),
  async execute(interaction) {
    const dia = String(interaction.options.getNumber("dia"))
    const mes = String(interaction.options.getNumber("mes"))
    const año = String(interaction.options.getNumber("año"))
    const hora = String(interaction.options.getNumber("hora"))
    const minutos = String(interaction.options.getNumber("minutos"))
    const descripcion = String(interaction.options.getString("descripcion"))
    
    res = await getOffset("Europe/Madrid");
    offsetSymbol = res.offsetSymbol + "";
    offsetHours = res.offsetHours + "";
    offsetMinutes = res.offsetMinutes + "";
    offsetHours = (offsetHours.length == 1) ? "0" + offsetHours : offsetHours
    offsetMinutes = (offsetMinutes.length == 1) ? "0" + offsetMinutes : offsetMinutes
    
    let text = makeStreamAlert(dia, mes, año, hora, minutos, offsetSymbol, offsetHours, offsetMinutes, descripcion)

    await interaction.reply(text);

  },
};

function makeStreamAlert(day, month, year, hour, minute, offsetSymbol, offsetHours, offsetMinutes, descripcion) {
  const rol_id = "<@&829669564903063592>";
  const emoji_id = "<:panbug:831130111079350312>\n"

  hour = (hour.length == 1) ? "0" + hour : hour
  minute = (minute.length == 1) ? "0" + minute : minute
  day = (day.length == 1) ? "0" + day : day
  month = (month.length == 1) ? "0" + month : month
  year = (year.length == 2) ? "20" + year : year

  const selectedDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:00.000${offsetSymbol}${offsetHours}:${offsetMinutes}`);
  const epoch = selectedDate.getTime();

  let formatDate = "<t:" + String(epoch).slice(0, String(epoch).length - 3) + ":F>"
  const mesTexto = getMes(Number(month))
  let text = `${rol_id} El día ${day} de ${mesTexto}, habrá stream sobre las ${hour}:${minute}, donde estaremos ${descripcion}:duck:! `
    + `No te lo pierdas!! Ahora enserio, no te lo pierdas va a ser un puto caos ${emoji_id}  \n` +
    "En tu horario:\n" + formatDate;
  return text
}
function getMes(num) {
  const meses = ["enero", "feberero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
  return meses[num - 1]
}
