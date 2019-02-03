import React, { Component } from 'react'
import { Button, Header, Icon, Image, Modal, Item } from 'semantic-ui-react'
import { format } from 'date-fns'

class LauchCard extends Component {
  imageRef = React.createRef()
  state = {
    spans: 0,
    modalOpen: false
  }

  modalContent = () => {
    const { item } = this.props
    return (
      <div className="image-container" onClick={this.handleOpen}>
        <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
          <img
            width={'100%'}
            ref={this.imageRef}
            alt={item.rocketName}
            src={item.imageURL}
            key={item.id}
          />
        </div>
        <article className="image-overlay">
          <div>{item.rocketName}</div>
        </article>
      </div>
    )
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

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  renderLinks = item => {
    return (
      <Item.Content style={{ margin: '10px 0' }}>
        <Item.Header color="red">
          Links:
        </Item.Header>
      <Item.Meta>

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
      </Item.Meta>
      </Item.Content>
    )
  }

  extraContent = item => {
    const time = format(new Date(item.time), 'dd MMMM yyyy')
    return <Item.Extra>{time}</Item.Extra>
  }

  render() {
    const { item } = this.props
    return (
      <Modal
        trigger={this.modalContent()}
        closeIcon
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size="small"
      >
        <Header icon="rocket"  color='red' content={item.rocketName} />
        <Modal.Content image>
          <Image wrapped size="medium" src={item.imageURL} />
          <Modal.Description>
            <Item.Content>
              <Item.Header as="h5">
                {item.rocketName}
              </Item.Header>
              {item.agencieName && (
                <Item.Meta> Launch by: {item.agencieName}</Item.Meta>
              )}
              <Item.Description>{item.locationName}</Item.Description>
              {this.renderLinks(item)}
              {this.extraContent(item)}
            </Item.Content>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Back
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default LauchCard
