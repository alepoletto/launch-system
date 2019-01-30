import React, { Component } from 'react';
import axios from 'axios';
import LaunchCard from './LaunchCard';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentWillMount() {
    let response = await axios.get('http://localhost:5000/api/launch/upcoming');
    if (response.data) {
      this.setState({
        items: response.data,
        offset: this.state.offset + 6 || 6
      });
    }
  }
  async loadMore() {
    let response = await axios.get(
      `http://localhost:5000/api/launch/upcoming?offset=${this.state.offset}`
    );
    if (response.data) {
      this.setState({
        items: [...this.state.items, ...response.data],
        offset: this.state.offset + 6
      });
    }
  }

  renderLaunchs() {
    return this.state.items.map(item => {
      return <LaunchCard item={item} key={item.id} />;
    });
  }

  render() {
    if (!this.state.items) {
      return (
        <div className="ui container">
          <div className="ui three cards">
            <div className="ui card">
              <div className="content">
                <div className="ui placeholder">
                  <div className="square image" />
                </div>
              </div>
            </div>
            <div className="ui card">
              <div className="content">
                <div className="ui placeholder">
                  <div className="square image" />
                </div>
              </div>
            </div>
            <div className="ui card">
              <div className="content">
                <div className="ui placeholder">
                  <div className="square image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="ui container">
        <div className="ui three column grid">{this.renderLaunchs()}</div>
        <div className="ui tree column grid">
          <div className="column centered row">
            <button
              className="positive ui button"
              onClick={() => this.loadMore()}
            >
              More...
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
