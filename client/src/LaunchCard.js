import React from 'react'
import { format } from 'date-fns'

const LaunchCard = ({ item }) => {
  return (
    <div className="image-list">
      <img key={item.id} src={item.imageURL} alt={item.rocketName} />
    </div>
  )
}

const content = item => {
  return (
    <div className="content">
      <div className="header">{item.rocketName}</div>
      <div className="meta">
        <a>{item.locationName}</a>
      </div>
    </div>
  )
}

const extraContent = item => {
  const time = format(new Date(item.time), 'dd MMMM yyyy')
  return (
    <div className="extra content">
      <span className="right floated">{time}</span>
    </div>
  )
}

const description = item => {
  return (
    <div className="description">
      launch by <b>{item.agencieName || '...'}</b>
      <div className="center">
        <React.Fragment>links:</React.Fragment>
        {item.rocketWikiURL && (
          <div>
            <a href={item.rocketWikiURL}>Rocket Wiki</a>
          </div>
        )}
        {item.agencieWikiURL && (
          <div>
            <a key={item.id} href={item.agencieWikiURL}>
              Agency Wiki
            </a>
          </div>
        )}
        {item.missionWikiURL && (
          <div>
            <a key={item.id} href={item.missionWikiURL}>
              Agency Wiki
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default LaunchCard
