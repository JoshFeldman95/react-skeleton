
import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const status = {
    CORRECT: 0,
    INCORRECT: 1,
    UNKNOWN: 2,
}


/*
style definitons for phonemes learned:

wordsLearned: container for the list, defines where it sits in space

wordTitler : title of the entire list

itemList : defines the items list

wordText : actual text of the list
*/

const styles = {
  itemList : {
    borderStyle: "solid",
    borderColor: "#222222",
    borderWidth: 0.5,
    height: "80%",
    width: "80%"
  },
  wordsLearned : {
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 60,
    paddingLeft: 60,
    display : "flex",
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
  },
  wordItem : {
    display: "flex",
    justifyContent: "center",
    padding: 6,
    borderStyle: "solid",
    borderColor: "#222222",
    borderWidth: 0.5,
    flex: "1 0 calc(33% - 40px)",
  },
  placeholder: {
    borderStyle: "hidden",
  },
  wordBody : {
    maxHeight: "65vh",
    overflow: "scroll",
    display: "flex",
    flexWrap: "wrap",
    borderStyle: "solid",
    borderColor: "#222222",
    borderWidth: 0.5,
  },
  wordText: {
    fontSize: 20,
    fontFamily: "roboto",
    fontWeight: 300,
    textAlign: "center",
  },
  wordTitle: {
    fontSize: 33,
    fontFamily: "roboto",
    fontWeight: 300,
    marginBottom: 30,
    marginTop: 10
  }

};


export default class WordsLearned extends React.Component {
  constructor(props) {
    super(props)

  }

  getStatusView(item) {
    switch (item.status) {
      case status.CORRECT:
        return (
          <div style={{backgroundColor: "#91ff82", ...styles.wordItem}}><div style={styles.wordText}>{item.key}</div></div>
        )
      case status.INCORRECT:
        return (
          <div style={{backgroundColor: "#ffa395", ...styles.wordItem}}>
          <div style={styles.wordText}>{item.key}
          </div></div>
        )
      case status.UNKNOWN:
        return <div style={styles.wordItem}><div style={styles.wordText}>{item.key}</div></div>
    }

  }

  render() {
    let remainder = 3 - this.props.info.wordsLearned.length%3;
    let placeholders = [...Array(remainder).keys()].map(i => (<div style={{...styles.wordItem, ...styles.placeholder}}><div style={styles.wordText}></div></div>))

    return (
      <div style= {styles.wordsLearned}>
        <div style={styles.wordTitle}>Words Progress</div>
        <div style={styles.wordBody}>
          {this.props.info.wordsLearned.map(i => this.getStatusView(i))}
          {placeholders}
        </div>
      </div>
    )


  }
}
