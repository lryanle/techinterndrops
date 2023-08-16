import { marked } from "marked";
import { Octokit } from "octokit";
import * as dotenv from "dotenv";
let output = dotenv.config({ path: __dirname + "/../.env" });

const octokit = new Octokit({
  auth: process.env.GITHUB_PAT,
});

const fetchData = async () => {
  const response = await octokit
    .request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: "SimplifyJobs",
      repo: "Summer2024-Internships",
      path: ".github/scripts/listings.json",
      headers: {
        "content-type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github.v3+json",
      },
    })
    .then((res) => {
      return res.data as any;
    });

  // if response is undefined, throw error
  if (!response) return new Error("No response from Github API");

  // decode the content
  return Buffer.from(response.content, "base64").toString("utf-8");
};

const contentParsed = fetchData().then((res) => {
  if (res instanceof Error) throw new Error(res.message);

  // use marked to parse markdown into a json object and not in html form
  return marked.lexer(res, { gfm: true, breaks: true });
});

export const extractedTable = contentParsed.then((res) => {
  return res.find((obj) => obj.type === "table") as any;
});
