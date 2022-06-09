import React, {Component} from 'react';
import Pdf from 'react-native-pdf';

export default class PdfViewComponent extends Component {
  render () {
    const {
      source
    } = this.props

  return (
    <Pdf
      source={source}
    />
  )};
}

