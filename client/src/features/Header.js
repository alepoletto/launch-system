import React, { Component } from 'react'
import { Container, Dropdown, Menu, Header as HeaderSemantic } from 'semantic-ui-react'
const ASSETS = `${process.env.PUBLIC_URL}/assets`

class Header extends Component {
  render() {
    return (
      <div>
      <Menu size='large' fixed="top" className='header-top'>
        <div className='flex-header'>
        <div className='header-title'>
          <img src={`${ASSETS}/images/launchlogo.png`} alt=""/>
        </div>
        <div className='menu-icon'>
          <i className="align justify icon"></i>
        </div>
        </div>
      </Menu>
      </div>
    )
  }
}

export default Header
