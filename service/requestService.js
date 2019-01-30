const axios = require('axios');

const formatDate = () => {
  let date = new Date(),
    month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const formateData = data => {
  if (data.launches) {
    return data.launches.map(launch => {
      let lunchInfo = {
        rocketName: '',
        rocketWikiURL: '',
        agencieName: '',
        agencieWikiURL: '',
        locationName: '',
        missionWikiURL: '',
        time: '',
        imageURL: ''
      };
      if (launch.rocket) {
        lunchInfo.rocketName = launch.rocket.name;
        lunchInfo.rocketWikiURL = launch.rocket.wikiURL;
        lunchInfo.imageURL = launch.rocket.imageURL;
      }
      if (launch.missions && launch.missions.length) {
        lunchInfo.missionWikiURL = launch.missions[0].wikiURL;

        if (launch.missions[0].agencies && launch.missions[0].agencies.length) {
          lunchInfo.agencieName = launch.missions[0].agencies.reduce(
            (acc, agencie) => {
              if (acc) {
                return acc + ' | ' + agencie.name;
              }
              return agencie.name;
            },
            null
          );
          lunchInfo.agencieWikiURL = launch.missions[0].agencies.reduce(
            (acc, agencie) => {
              if (acc) {
                return acc + ' | ' + agencie.wikiURL;
              }
              return agencie.wikiURL;
            },
            null
          );
        }
      }
      if (launch.location) {
        lunchInfo.locationName = launch.location.name;
      }
      lunchInfo.time = launch.net;
      lunchInfo.id = launch.id;

      return lunchInfo;
    });
  }
  return [];
};

const requestUpcomingData = async (limit, offset) => {
  try {
    const response = await axios.get(
      `https://launchlibrary.net/1.4/launch/${formatDate()}?offset=${offset}&limit=${limit}`
    );
    const result = formateData(response.data);
    return {
      total: response.data.total,
      data: result
    };
  } catch (e) {
    console.error('ERROR requisting API =>', e);
    return [];
  }
};

module.exports = {
  requestUpcomingData
};
