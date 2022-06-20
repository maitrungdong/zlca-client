import BaseNetworkDetect from './BaseNetworkDetect'

export default class Online extends BaseNetworkDetect {
  render() {
    return this.state.online ? this.props.children : null
  }
}
