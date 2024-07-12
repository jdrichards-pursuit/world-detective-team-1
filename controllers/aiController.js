// const express = require("express");
// const ai = express.Router();
// const Anthropic = require("@anthropic-ai/sdk");
// const anthropic = new Anthropic();
// const {
//   systemPromptForArticleSummary,
//   hardCodedArticle,
// } = require("../helpers/aiData");
// const { getAllNewCaseFiles } = require("../queries/caseFiles");
// const { updateYoungerSummary, updateOlderSummary } = require("../queries/ai");

// //http://localhost:3003/api/ai/summary
// ai.put("/summary", async (req, res) => {
//   const articleSummary = await anthropic.messages.create({
//     model: "claude-3-5-sonnet-20240620",
//     max_tokens: 2000,
//     temperature: 0,
//     system: systemPromptForArticleSummary,
//     messages: [
//       {
//         role: "user",
//         content: [
//           {
//             type: "text",
//             text: hardCodedArticle.text,
//           },
//         ],
//       },
//     ],
//   });
//   // console.log("Article summary", articleSummary);
//   const parsedYoung = await JSON.parse(articleSummary.content[0].text)
//     .youngerSummary;
//   const parsedOld = await JSON.parse(articleSummary.content[0].text)
//     .olderSummary;
//   // console.log("parsed", parsed);
//   const updatedYoungerSummary = await updateYoungerSummary(
//     parsedYoung,
//     hardCodedArticle.case_files_article_id
//   );
//   const updatedOlderSummary = await updateOlderSummary(
//     parsedOld,
//     hardCodedArticle.case_files_article_id
//   );
//   console.log("Younger", updatedYoungerSummary);
//   console.log("Older", updatedOlderSummary);
//   // if (updatedYoungerSummary[0]) {
//   //   res
//   //     .status(200)
//   //     .json({ message: "Success in updating summary in case files" });
//   // } else {
//   //   res
//   //     .status(500)
//   //     .json({ message: "Server error, could not update summaries" });
//   // }
//   // console.log("Updated Summary", updatedSummary);
//   // }
//   return [updatedYoungerSummary, updatedOlderSummary];
// });
// // ai.post("/questions_and_answers", async (req, res) => {});
// module.exports = ai;
