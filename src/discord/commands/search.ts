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

const optionCategory = "channel";
export const categories = [
  "Software Engineer",
  "Machine Learning/AI",
  "Data Science",
  "Quantitative",
  "Cybersecurity",
  "Performance",
  "Infrastructure",
  "Site Reliability",
  "Electrical",
  "Hardware",
  "IT",
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

    const fields: APIEmbedField[] = [];
    const embed = new EmbedBuilder()
      .setTitle(`${filters.role} Opportunities`)
      .setColor("#3498db"); // You can use any color you like

    data.forEach((internship: Internship) => {
      fields.push({
        name: `${internship.company}`,
        value: `[${internship.role}](${internship.app_link})`,
        inline: true,
      });
    });

    embed.addFields(fields);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
