import React, { Component } from 'react'
import axios from 'axios'
import Loading from './Loading'
import LauchCard from './LauchCard'

const DEPLOYED_URL = 'https://[NAME_PROJECT].herokuapp.com/api/launch'
const ASSETS = `${process.env.PUBLIC_URL}/assets`

let url = DEPLOYED_URL
if (process.env.NODE_ENV === 'development') {
  url = `/api/launch`
}

class App extends Component {
  state = {
    items: []
  }

  async componentWillMount() {
    let response = await axios.get(`${url}/upcoming`)
    if (response.data) {
      this.setState({
        items: response.data,
        offset: this.state.offset + 6 || 6
      })
    }
  }
  async loadMore() {
    let response = await axios.get(
      `${url}/upcoming?offset=${this.state.offset}`
    )
    if (response.data) {
      this.setState({
        items: [...this.state.items, ...response.data],
        offset: this.state.offset + 6
      })
    }
  }

  renderLaunches() {
    const images = this.state.items.map(item => {
      const isImagePlaceHolder = item.imageURL.includes('placeholder')
      if (isImagePlaceHolder) {
        return
      }
      return <LauchCard key={item.id} item={item} />
    })
    return <div className="image-list">{images}</div>
  }

  render() {
    if (!this.state.items) {
      return <Loading />
    }

    return (
      <div>
        <div className="homepage">
          <div className="pre-container">
            <div className="hero">
              <img
                className="custom-image"
                src={`${ASSETS}/images/moon.jpg`}
                alt="moon"
              />
            </div>
            <div className="overlay">
              <div className="overlay-title">Your eyes on the space.</div>
            </div>
          </div>
          <div className="">
            <div style={{ marginTop: '0px' }}>{this.renderLaunches()}</div>
          </div>
          <div className="ui tree column grid">
            <div className="column right aligned">
              <button
                className="inverted ui button"
                onClick={() => this.loadMore()}
              >
                Load More...
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
