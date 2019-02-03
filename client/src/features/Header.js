import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
const ASSETS = `${process.env.PUBLIC_URL}/assets`

class Header extends Component {
  render() {
    const { handleMenuClick } = this.props
    return (
      <div>
        <Menu
          size="large"
          fixed={this.props.visible ? false : 'top'}
          className="header-top"
        >
          <div className="flex-header">
            <div className="header-title">
              <img src={`${ASSETS}/images/logo.svg`} alt="logo" />
            </div>
            <div className="menu-icon" onClick={handleMenuClick}>
              <i className="align justify icon" />
            </div>
          </div>
        </Menu>
      </div>
    )
  }
}

export default Header
