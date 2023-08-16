import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { onReady } from './listeners/onReady';
import { onInteractionCreate } from './listeners/onInteractionCreate';
import { BotClient, ConfigFileSchema } from './types';
import { Octokit } from 'octokit';

const configFilePath: string = path.join(__dirname, './config.json');
if (!fs.existsSync(configFilePath)) {
	console.error(`${configFilePath} does not exist. Please create a config file.`);
	process.exit(1);
}

const fileContents = fs.readFileSync(configFilePath, 'utf-8');
const configFile = JSON.parse(fileContents) as ConfigFileSchema;
const discordClient = new Client({
	intents: [
		GatewayIntentBits.Guilds
	],
});

const githubClient = new Octokit({
	auth: configFile.tokens.github,
	userAgent: configFile.github.userAgent,
	timeZone: configFile.github.timeZone,
});

const botClient: BotClient = {
	discordClient: discordClient,
	githubClient: githubClient,
};

onReady(botClient);
onInteractionCreate(botClient);
discordClient.login(configFile.tokens.discord);
