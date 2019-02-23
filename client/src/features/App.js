import React, { Component } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from './Loading'
import LaunchCard from './LaunchCard'
import InlineLoader from './InlineLoader'

const DEPLOYED_URL = 'https://launch-system.herokuapp.com/api/launch'
const ASSETS = `${process.env.PUBLIC_URL}/assets`

let url = DEPLOYED_URL
if (process.env.NODE_ENV === 'development') {
  url = `/api/launch`
}

class App extends Component {
  state = {
    items: [],
    count: 30,
    start: 1
  }

  async componentDidMount() {
    let response = await axios.get(`${url}/upcoming`)
    if (response.data) {
      this.setState({
        items: response.data,
        offset: this.state.offset + 6 || 6
      })
    }
  }

  async loadMore() {
    const { count } = this.state
    this.setState(prevState => ({
      start: prevState.start + count
    }))
    let response = await axios.get(
      `${url}/upcoming?offset=${this.state.offset}`
    )
    if (response.data) {
      this.setState({
        items: this.state.items.concat(response.data)
      })
    }
  }

  renderLaunches() {
    const images = this.state.items.map((item, key) => {
      const isImagePlaceHolder = item.imageURL.includes('placeholder')
      if (isImagePlaceHolder) {
        return true
      }
      return <LaunchCard key={key} item={item} />
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
            <div style={{ marginTop: '0px' }}>
              <InfiniteScroll
                dataLength={this.state.items.length}
                next={this.loadMore.bind(this)}
                hasMore={true}
                loader={<InlineLoader />}
              >
                {this.renderLaunches()}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
