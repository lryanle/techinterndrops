import {
  APIEmbedField,
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  codeBlock,
} from "discord.js";
import { BotClient } from "./../types";
import { Command } from "./types";
import { parseRole } from "./../../extractdata/parser";

const optionRole = "role";

export const cmdRole: Command = {
  data: new SlashCommandBuilder()
    .setName("test-role")
    .setDescription("Testing command")
    .addStringOption((option) =>
      option
        .setName(optionRole)
        .setDescription("The role string to parse")
        .setRequired(true)
    ),

  run: async (client: BotClient, interaction: CommandInteraction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const role = interaction.options.getString(optionRole) as string;
    const parsedRole = parseRole(role);
    const embed = makeEmbedFromMap<number>(parsedRole, (v) => v.toString());
    embed.setTitle("Keyword matches");
    embed.addFields([
      {
        name: "Dumped output",
        value: codeBlock(
          printMap(
            parsedRole,
            (k) => k.toString(),
            (v) => v.toString()
          )
        ),
      },
    ]);

    await interaction.reply({
      content: role,
      embeds: [embed],
    });
  },
};

const printMap = <K, V>(
  map: Map<K, V>,
  keyFn: (k: K) => string,
  valFn: (v: V) => string
) => {
  let output = `Map (${map.size}) {\n`;
  for (const [key, value] of map) {
    output += `\t${keyFn(key)} => ${valFn(value)},\n`;
  }
  output += "}\n";

  return output;
};

const makeEmbedFromMap = <T>(
  map: Map<string, T>,
  valueStringFn: (v: T) => string
): EmbedBuilder => {
  const embed = new EmbedBuilder();
  const fields: APIEmbedField[] = [];
  for (const [key, value] of map) {
    fields.push({
      name: key,
      value: valueStringFn(value),
      inline: true,
    });
  }
  embed.addFields(fields);
  return embed;
};
