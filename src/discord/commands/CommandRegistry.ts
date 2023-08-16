import { cmdAdmin } from "./admin";
import { cmdSearch } from "./search";
import { Command } from "./types";
import { cmdRole } from "./role";

export const CommandRegistry: Command[] = [cmdAdmin, cmdSearch, cmdRole];
