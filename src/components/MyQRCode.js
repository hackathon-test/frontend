import React, {Component} from 'react';
import QRCode from "react-native-qrcode";

export default class MyQRCode extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(): void {
    console.log(`MyQRCode mounted: ${this.props.lectureId}`)
  }

  render() {
    return (
      <QRCode value={String(this.props.lectureId)}
              size={200}/>
    )
  }
}