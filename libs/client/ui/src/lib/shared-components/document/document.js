import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
export const Doc = (props) => {return(
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{props.n}</Text>
      </View>
      <View style={styles.section}>
        <Text>{props.t}</Text>
      </View>
    </Page>
  </Document>
)};

export default Doc;

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  }
});