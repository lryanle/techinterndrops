import { Client } from "discord.js";
import { Octokit } from "octokit";

export type BotClient = {
  discordClient: Client;
  githubClient: Octokit;
};

export type ConfigFileSchema = {
  tokens: {
    discord: string;
    github: string;
  };
  github: {
    userAgent: string;
    timeZone: string;
  };
  supabase: {
    publicUrl: string;
    anonKey: string;
  };
};
