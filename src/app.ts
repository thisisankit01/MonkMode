import Discord, { GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Discord.Client({
  intents: ["Guilds", "GuildMessages", "MessageContent", GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const token = process.env.DISCORD_TOKEN;
const channelId = '1219072705261998110'

client.on("ready", () => {
  console.log("I'm in");
  console.log(client.user.username , client.user.id);
});

// function createTaskReminder(client, channelId) {
//   return setInterval(async () => {
//     const currentIST = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
//     const currentISTDate = new Date(currentIST);

//     if (currentISTDate.getHours() === 11  && currentISTDate.getMinutes() === 0) {
//       const channel = await client.channels.fetch(channelId);
//       if (channel instanceof Discord.TextChannel) {
//         channel.send("It's 7:10 PM IST. Time to discuss today's task.");
//       }
//     }
//   }, 60 * 1000);
// }

//   client.on("messageCreate", async (msg) => {
//     createTaskReminder(client, channelId);
//   })

  client.on("messageCreate", async (msg) => {  
    try {
      if (msg.content.toLowerCase().match("task")) {
        const thread = await msg.startThread({
          name: "Today's Task Discussion",
          autoArchiveDuration: 1440,
        });
        console.log(`Thread created for task: ${thread.name}`);
        
        setTimeout(async () => {
          await thread.setArchived(true);
          await thread.delete();
          console.log(`Thread '${thread.name}' has been archived and deleted after 24 hours.`);
        }, 86400000); 
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

client.login(token);



