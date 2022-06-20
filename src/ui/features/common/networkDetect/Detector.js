import BaseNetworkDetect from './BaseNetworkDetect'

export default class Detector extends BaseNetworkDetect {
  render() {
    return typeof this.props.children === 'function'
      ? this.props.children({ isOnline: this.state.online })
      : null
  }
}
