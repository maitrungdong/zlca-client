import { Component } from 'react'

export default class BaseNetworkDetect extends Component {
  constructor() {
    super()
    this.state = {
      online: true,
    }

    this.goOnline = this.goOnline.bind(this)
    this.goOffline = this.goOffline.bind(this)
  }

  componentDidMount() {
    window.ZlcaDetectNetwork.addEventListener('online', this.goOnline)
    window.ZlcaDetectNetwork.addEventListener('offline', this.goOffline)
  }

  componentWillUnmount() {
    window.ZlcaDetectNetwork.removeEventListener('online', this.goOnline)
    window.ZlcaDetectNetwork.removeEventListener('offline', this.goOffline)
  }

  goOnline() {
    if (!this.state.online) {
      this.callOnChangeHandler(true)
      this.setState({ online: true })
    }
  }

  goOffline() {
    if (this.state.online) {
      this.callOnChangeHandler(false)
      this.setState({ online: false })
    }
  }

  callOnChangeHandler(online) {
    if (this.props.onChange) {
      this.props.onChange(online)
    }
  }
}
