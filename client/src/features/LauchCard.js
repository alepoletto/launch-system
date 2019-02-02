import React, { Component } from 'react'

class LauchCard extends Component {
  imageRef = React.createRef()
  state = {
    spans: 0
  }

  componentDidMount() {
    // getting image high only after image loads
    this.imageRef.current.addEventListener('load', this.setSpans)
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight
    const spans = Math.ceil(height / 10) // based on css: grid-auto-rows: 10px;
    this.setState({ spans })
  }

  render() {
    const { item } = this.props
    return (
      <div className='image-container'>
        <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
          <img
            width={'100%'}
            ref={this.imageRef}
            alt={item.rocketName}
            src={item.imageURL}
            key={item.id}
          />
        </div>
        <article className='image-overlay'>
          <div>
          {item.rocketName}
          </div>

        </article>
      </div>
    )
  }
}

export default LauchCard
