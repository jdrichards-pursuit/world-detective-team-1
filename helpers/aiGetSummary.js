const Anthropic = require("@anthropic-ai/sdk");
const anthropic = new Anthropic();
const {
  systemPromptForArticleSummary,
  // hardCodedArticle,
} = require("../helpers/aiData");
const { updateYoungerSummary, updateOlderSummary } = require("../queries/ai");

const extractSummary = (str, key) => {
  const regex = new RegExp(`"${key}":\\s*"([^"]*)"`, "s");
  const match = str.match(regex);
  return match ? match[1] : null;
};

const getSummaries = async (content, article_id) => {
  console.log("getSummariesFunction");
  const articleSummary = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 2000,
    temperature: 0,
    system: systemPromptForArticleSummary,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: content,
          },
        ],
      },
    ],
  });

  const parsedYoung = extractSummary(
    articleSummary.content[0].text,
    "youngerSummary"
  );
  const parsedOld = extractSummary(
    articleSummary.content[0].text,
    "olderSummary"
  );

  console.log("parsedYoung:", parsedYoung, "TYPE", typeof parsedYoung);
  console.log("parsedOld:", parsedOld, "TYPE", typeof parsedOld);

  const updatedYoungerSummary = await updateYoungerSummary(
    parsedYoung,
    article_id
  );
  const updatedOlderSummary = await updateOlderSummary(parsedOld, article_id);
  console.log("Younger", updatedYoungerSummary);
  console.log("Older", updatedOlderSummary);

  if (updatedYoungerSummary && updatedOlderSummary) {
    return { updatedYoungerSummary, updatedOlderSummary };
    // console.log("older", updateOlderSummary, "younger", updateYoungerSummary);
    // // return { updatedYoungerSummary, updatedOlderSummary };
  } else {
    res
      .status(500)
      .json({ message: "Server error, could not update summaries" });
  }
  // console.log("Updated Summary", updatedSummary);
  // }
};

module.exports = { getSummaries };
