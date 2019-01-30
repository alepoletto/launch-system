const MemoryStorage = require('../storage/MemoryStorage');
const { requestUpcomingData } = require('./requestService');

const storage = new MemoryStorage(100);
let items = 0;
const addToStorage = data => {
  data.forEach(element => {
    storage.add(element);
    items++;
  });
};

//request in batchs of 50
const load = async () => {
  console.log('#### loading information from the server ####');
  try {
    let offset = 0;
    let resp = await requestUpcomingData(50, offset);
    let total = parseInt(resp.total);
    addToStorage(resp.data);
    //go on untill there is no more items or the storage capacity is reached
    while (items < total && items < storage.getMaxCapacity()) {
      offset += 50;
      resp = await requestUpcomingData(50, offset);
      addToStorage(resp.data);
    }
    console.log(
      `#### load end, ${storage.getCurrentCapacity()} records loaded ####`
    );
  } catch (e) {
    console.error('ERROR during load =>', e);
  }
};

load();

module.exports = { storage };
