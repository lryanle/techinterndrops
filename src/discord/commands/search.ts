import {
  APIApplicationCommandOptionChoice,
  APIEmbedField,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { BotClient } from "./../types";
import { Command } from "./types";
import { internships } from "../../api/internships";
import { Internship, QueryFilter } from "./../../interfaces";

const optionCategory = "position";
export const categories = [
  "All",
  "SWE",
  "PM",
  "ML/AI",
  "DS",
  "Quant",
  "SRE",
  "EE",
  "Hardware",
];

const getAppCommandChoices = (
  items: string[]
): APIApplicationCommandOptionChoice<string>[] => {
  const choices: APIApplicationCommandOptionChoice<string>[] = [];
  let index = 0;

  for (const item of items) {
    choices.push({ name: item, value: `${index}` });
    index++;
  }

  return choices;
};

export const cmdSearch: Command = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("Get filtered results")
    .addStringOption((option) =>
      option
        .setName(optionCategory)
        .setDescription("The category to filter for")
        .setRequired(false)
        .addChoices(...getAppCommandChoices(categories))
    ),

  run: async (client: BotClient, interaction: CommandInteraction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const argCategory = interaction.options.getString(optionCategory);
    let filters: QueryFilter = {};

    if (argCategory !== null) filters.role = categories[parseInt(argCategory)];

    const data: Internship[] = await internships(filters);

    // const fields: APIEmbedField[] = [];
     // You can use any color you like

    let replies: Promise<any>[] = [];
    data.forEach((internship: Internship) => {
      const embed = new EmbedBuilder()
      .setColor("#04ff00");
      const field: APIEmbedField = {
        name: `${internship.company}`,
        value: `[${internship.role}](${internship.app_link})`,
        inline: true,
      };

      embed.addFields(field);
      replies.push( interaction.reply({
      embeds: [embed],
      }));
    });

    await Promise.all(replies);

  },
};
