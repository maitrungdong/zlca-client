import BaseNetworkDetect from './BaseNetworkDetect'

export default class Offline extends BaseNetworkDetect {
  render() {
    return !this.state.online ? this.props.children : null
  }
}
