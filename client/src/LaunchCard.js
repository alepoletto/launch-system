import React from 'react';

const LaunchCard = props => {
  const { item } = props;
  return (
    <div className="column" key={item.id}>
      <div className="ui fluid card">
        <div className="image">
          <img src={item.imageURL} alt="" />
        </div>
        <div className="content">
          <div className="header">{item.rocketName}</div>
          <div className="meta">
            <a>{item.locationName}</a>
          </div>
          <div className="description">
            launch by <b>{item.agencieName || '...'}</b>
            <p className="center">
              links:
              {item.rocketWikiURL
                ? [<br />, <a href={item.rocketWikiURL}>Rocket Wiki</a>]
                : ''}
              {item.agencieWikiURL
                ? [<br />, <a href={item.agencieWikiURL}>Agency Wiki</a>]
                : ''}
              {item.missionWikiURL
                ? [<br />, <a href={item.missionWikiURL}>Agency Wiki</a>]
                : ''}
            </p>
          </div>
        </div>
        <div className="extra content">
          <span className="right floated">{item.time}</span>
        </div>
      </div>
    </div>
  );
};

export default LaunchCard;
