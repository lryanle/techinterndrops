// keyword to primary key
// primary key maps to category

import { extractedTable } from "./githubextract";

const rolesMap = new Map([
  [
    "software",
    [
      "Software",
      "Engineer",
      "Frontend",
      "Backend",
      "Mobile",
      "cyber",
      "CSEC",
      "Cybersecurity",
      "Security",
      "SecOps",
      "IT",
      "Information",
      "Technology",
      "Performance",
      "tech",
      "mobile",
      "IOS",
      "Android",
      "firmware",
      "cloud",
      "techops",
      "tech ops",
    ],
  ],
  [
    "ml",
    ["ML", "Machine", "Learning", "AI", "vision", "NLP", "cv", "artificial"],
  ],
  ["ds", ["DS", "Data", "Analytics"]],
  [
    "quant",
    [
      "Fin",
      "Finance",
      "Quantitative",
      "Investment",
      "Investments",
      "Trading",
      "Debt",
      "Equity",
      "fintech",
    ],
  ],
  ["sre", ["Infra", "Infrastructure", "reliability"]],
  ["electrical", ["Electrical"]],
  [
    "hardware",
    ["Hardware", "Firmware", "GPU", "Microarchitecture", "architecture"],
  ],
  ["pm", ["project", "product", "manager", "management"]],
]);

// Creates a fast search index by inverting a Map<string, string[]>.
// It maps each keyword in the array to the category itself, allowing
// for O(1) lookup time, when iterating over an array of words containing
// possible keywords
//
// Example output:
// ```
// 'Software Engineer' => 'software'
// 'Frontend' => 'software'
// 'Backend' => 'software
// 'mobile' => 'software'
// // etc....
// ```
const createSearchIndexForRoles = (map: Map<string, string[]>) => {
  const searchIndex = new Map<string, string>([]);

  for (const [category, keywords] of map) {
    for (const keyword of keywords) {
      searchIndex.set(keyword, category);
    }
  }
  return searchIndex;
};

const searchIndex = createSearchIndexForRoles(rolesMap);

// type TokenKind = "word" | "number" | "punctuation";
// type Token = {
//   input: string;
//   kind: TokenKind;
// };
// export function tokenize(input: string) {
//   if (input.length === 0) {
//     return [];
//   }

//   let previousTokenKind: TokenKind | undefined;
//   for (let i = 0; i < input.length; i++) {
//     const char = input[i];

//   }
// }

/**
 * 2023 Intern Conversion: 2024 Return Intern Software Engineer II - Bentonville - AR
 * Futureforce Grace Hopper Conference – Software Engineer Internship for Summer 2024
 * Software Developer – Co-op
 * Technology Analyst, Software Engineering (Sponsorship status unknown)
 */
export function parseRole(role: string) {
  const tokens = role.split(" ");
  const stopTokens = [":", "-", "the", "a", "at", "for"];

  const categoryFrequency = new Map<string, number>();
  for (const token of tokens) {
    // skip punctuation and other words we don't care about
    if (stopTokens.includes(token)) {
      continue;
    }

    // lowercase every token for case-insensitive matching
    //const normalizedToken = token.toLowerCase();
    const category = searchIndex.get(token);
    if (category === undefined) {
      continue;
    }

    // build our frequency table for possible keyword matches
    if (categoryFrequency.has(category)) {
      categoryFrequency.set(
        category,
        (categoryFrequency.get(category) as number) + 1
      );
    } else {
      categoryFrequency.set(category, 1);
    }
  }
  return categoryFrequency;
}
