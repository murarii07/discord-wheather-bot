import dotenv from "dotenv"
dotenv.config() //initializes dotenv
import { Client, GatewayIntentBits } from 'discord.js';
import { apiInfo, memeapi } from "./wheatherapi.js";
import { AxiosError } from "axios";
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]
}); //creates new client

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



client.on('messageCreate', async (msg) => {
  let datas = [];
  let temp;

  if (msg.author.bot) {
    return;
  }

  let weekArray = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const command = msg.content.toLowerCase().split(' ');
  if ((command[1] === 'wheather')) {
    let day = command[0];
    // console.log(weekArray)
    //to handle axioserror occur ehen day or place is not recognised by api
    try {

      datas = await apiInfo(command.pop(), day);
      // console.log(datas)
      temp = datas[0];
      switch (day) {
        //datas[1] --> condition of wheather
        case 'todays':
          msg.reply(`${temp} degress  on today✌  and wheather is ${datas[1]}`)
          break;
        case 'tomorrows':
          msg.reply(`${temp} degress on tomorrow and wheather will be ${datas[1]}`)
          break;
        case 'yesterday':
          msg.reply(`${temp} degress was on yesterday  and wheather was ${datas[1]}`)
          break;
        case weekArray[weekArray.indexOf(day)]:
          msg.reply(`${temp} degress  on ${day}  and wheather is ${datas[1]}`)
          break;
        default:
          msg.channel.send("please specify date more properly ")
      }
    }
    catch (AxiosError) {
      msg.reply('not found place')
    }
  }
  else if (command[0] === "!meme") {
    const meme = await memeapi();
    msg.reply(meme);
  }

});

//this line must be at the very end
client.login(process.env.BOTS_TOKEN);
