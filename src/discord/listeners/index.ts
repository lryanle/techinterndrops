import { BotClient } from './../types';

export type OnDiscordEvent = (client: BotClient) => void;
export { onInteractionCreate } from './onInteractionCreate';
export { onReady } from './onReady';
