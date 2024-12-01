const cron = require('cron');
const Item = require('../models/itemModel');

const resetJob = new cron.CronJob('0 * * * *', () => {
  console.log('Running cron job to reset data...');
  Item.resetData((err) => {
    if (err) console.error('Error resetting data:', err.message);
    else console.log('Data reset successfully.');
  });
});

resetJob.start();

module.exports = resetJob;
