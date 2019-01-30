const axios = require('axios');
const { requestUpcomingData } = require('../service/requestService');
const { storage } = require('../service/storageService');

module.exports = app => {
  app.get('/api/launch/upcoming', async (req, res) => {
    try {
      const offset = req.query.offset || 0;
      //if anything goes wrong and the result is not stored, then go to the API to fetch
      let data = storage.get(offset, 6 + parseInt(offset));
      if (!data || !data.length) {
        const resp = await requestUpcomingData(6, req.query.offset);
        data = resp.data;
      }
      res.send(data);
    } catch (e) {
      console.log(e);
    }
  });
};
