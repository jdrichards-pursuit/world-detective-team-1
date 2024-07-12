const systemPromptForArticleSummary = `You are a newspaper editor. You will receive two inputs, one is an article, and the other is the user's age. Create a two paragraph summary of the article for the user based on whether they fall into the 11-14 years old range, or the 15-18 years old range.  Return the summary text property as an object for containing both users in the same JSON format.

Example output:
{
  "youngerSummary": "A terrorist from Somalia was accidentally allowed into the United States and lived freely for almost a year before being caught again. The man, who was on a watchlist for being part of a dangerous group called al-Shabaab, crossed the border illegally in California last March. He was arrested but then released due to a mistake. He traveled to Minnesota, where he was finally arrested again in January. Now, some government officials want to know how this happened and if any taxpayer money was used to help him travel or live in the US. They are asking questions about how he got from California to Minnesota and if he received any benefits from the government.",
  "olderSummary": "A Somali terrorist, identified as a member of al-Shabaab, was mistakenly allowed into the United States and remained at large for nearly a year before being rearrested. The incident has sparked concern among Republican lawmakers, who are demanding answers from Homeland Security Secretary Alejandro Mayorkas. The 27-year-old Somalian crossed the border illegally in California in March 2023 and was initially arrested, but a misidentification led to his release. He was eventually rearrested in Minnesota in January 2024. The case highlights the increasing number of individuals on terror watchlists attempting to enter the US illegally, with 70 such encounters recorded between October 2023 and February 2024. This incident has reignited debates about border security and the potential risks associated with illegal immigration."
}
Example inputs:
Input 1: The war in eastern Ukraine that simmered quietly for months has erupted in a lethal bout of fighting in recent days. The violence, which killed at least eight Ukrainian soldiers and three on the pro-Russian side, shifted the front lines by only a few hundred yards in several spots, but potentially complicates American efforts to improve relations with Russia. The United States Army helps to train and equip Ukrainian soldiers, who are fighting Russian-backed separatists in two eastern provinces of Ukraine, in the only active war in Europe today. In the latest outbreak, the sides vied for control of what are known as “gray zone” territories, areas between the front lines that had previously been in buffer zones.
The Ukrainian Army advanced in at least two places, according to news reports and official Ukrainian accounts, but it said it did so to rebuff rebel attacks. Each side blamed the other for the escalation. Referring to one front-line town, an adviser to the Ukrainian Interior Ministry, Yuri Kasyanov, told Radio Free Europe on Tuesday, “The defenders of Avdiivka preferred to advance the line” to a more defensible position. Ukraines Foreign Affairs Ministry issued a statement appealing to Western governments to intervene diplomatically. “For the last two days, the Russian occupation forces carried out massive attacks across the line,” firing with rocket artillery, heavy mortars and other long-range weapons, the statement said.
European monitors reported heavy shelling of Avdiivka since Sunday. Journalists who visited the town reported evidence of a psychological warfare operation of a sophistication that suggested Russian involvement. Cellphones in the town received text messages addressed to Ukrainian soldiers, who often carry phones, saying, “You are just meat to your commanders.” The shelling disrupted electrical and water supplies. The Ukrainian authorities set up heated shelters for residents whose homes had been damaged, as nighttime temperatures dropped to minus 18 degrees Fahrenheit (minus 28 Celsius). “Given harsh weather conditions and the continuing shelling by the militants, the humanitarian situation in the area continues to deteriorate,” the Foreign Affairs Ministrys statement said. The authorities said they were preparing to evacuate the towns 16,000 residents. The rebel governments of the Luhansk and Donetsk Peoples Republics, which are not recognized internationally, issued a joint statement addressed to President Vladimir V. Putin of Russia and President Trump that also called for a diplomatic solution. The Trump administrations maneuvering for better relations with Russia has alarmed Ukrainian officials, who fear that Western pressure could ease on Russia to withdraw its unacknowledged military forces in eastern Ukraine. But Ukraine is not without options in defending itself, including using its army, which showed an ability to fight even before American training began. Since the so-called line of contact was initially negotiated in a cease-fire in September 2014, the Ukrainian Army has in places given ground after separatist attacks. With its recent advance, the army moved back into at least one such area, near Avdiivka, without crossing the original cease-fire line, Mr. Kasyanov, the adviser to the Interior Ministry, said.'
Input 2: 13`;
const hardCodedArticle = {
  text: `The war in eastern Ukraine that simmered quietly for months has erupted in a lethal bout of fighting in recent days. The violence, which killed at least eight Ukrainian soldiers and three on the pro-Russian side, shifted the front lines by only a few hundred yards in several spots, but potentially complicates American efforts to improve relations with Russia. The United States Army helps to train and equip Ukrainian soldiers, who are fighting Russian-backed separatists in two eastern provinces of Ukraine, in the only active war in Europe today. In the latest outbreak, the sides vied for control of what are known as “gray zone” territories, areas between the front lines that had previously been in buffer zones. The Ukrainian Army advanced in at least two places, according to news reports and official Ukrainian accounts, but it said it did so to rebuff rebel attacks. Each side blamed the other for the escalation. Referring to one front-line town, an adviser to the Ukrainian Interior Ministry, Yuri Kasyanov, told Radio Free Europe on Tuesday, “The defenders of Avdiivka preferred to advance the line” to a more defensible position. Ukraines Foreign Affairs Ministry issued a statement appealing to Western governments to intervene diplomatically. “For the last two days, the Russian occupation forces carried out massive attacks across the line,” firing with rocket artillery, heavy mortars and other long-range weapons, the statement said.
  European monitors reported heavy shelling of Avdiivka since Sunday. Journalists who visited the town reported evidence of a psychological warfare operation of a sophistication that suggested Russian involvement. Cellphones in the town received text messages addressed to Ukrainian soldiers, who often carry phones, saying, “You are just meat to your commanders.” The shelling disrupted electrical and water supplies. The Ukrainian authorities set up heated shelters for residents whose homes had been damaged, as nighttime temperatures dropped to minus 18 degrees Fahrenheit (minus 28 Celsius). “Given harsh weather conditions and the continuing shelling by the militants, the humanitarian situation in the area continues to deteriorate,” the Foreign Affairs Ministrys statement said. The authorities said they were preparing to evacuate the towns 16,000 residents. The rebel governments of the Luhansk and Donetsk Peoples Republics, which are not recognized internationally, issued a joint statement addressed to President Vladimir V. Putin of Russia and President Trump that also called for a diplomatic solution. The Trump administrations maneuvering for better relations with Russia has alarmed Ukrainian officials, who fear that Western pressure could ease on Russia to withdraw its unacknowledged military forces in eastern Ukraine. But Ukraine is not without options in defending itself, including using its army, which showed an ability to fight even before American training began. Since the so-called line of contact was initially negotiated in a cease-fire in September 2014, the Ukrainian Army has in places given ground after separatist attacks. With its recent advance, the army moved back into at least one such area, near Avdiivka, without crossing the original cease-fire line, Mr. Kasyanov, the adviser to the Interior Ministry, said.`,
  case_files_article_id: 123456789,
};
module.exports = { systemPromptForArticleSummary, hardCodedArticle };