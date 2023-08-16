import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { BotClient } from "./../types";
import { Command } from "./types";

const OptionChannel = "channel";

export const cmdAdmin: Command = {
  data: new SlashCommandBuilder()
    .setName("admin")
    .setDescription("Administrative command for TID Bot")
    .addStringOption((option) =>
      option
        .setName(OptionChannel)
        .setDescription("The repository to get the commit from")
        .setRequired(true)
    ),

  run: async (client: BotClient, interaction: CommandInteraction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const channel = interaction.options.getString(OptionChannel) as string;
    await interaction.reply({
      content: channel,
    });
  },
};
