const checkDate = (article_publish_date) => {
  const articleDate = new Date(article_publish_date);
  const currentDate = new Date();
  const differeneInDatesInMs = currentDate - articleDate;
  const msToDay = 1000 * 60 * 60 * 24;
  return (differeneInDatesInMs / msToDay).toFixed(1);
};

module.exports = checkDate;
