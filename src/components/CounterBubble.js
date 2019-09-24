import React from 'react';

const styles = {
  bubbleTotal: {
    display: "flex",
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 60,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 3,
    right: -25,
    flex: 1,
    padding: 10,
  },
  weeklyBubbleTotal: {
    display: "flex",
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "white",
    width: 20,
    height: 20,
    borderRadius: 20,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 50,
    right: -35,
    flex: 1,
    padding: 10,
  },
  sessionCount : {
    fontSize: 25,
  }
};

export default class CounterBubble extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div style={this.props.weekly ? styles.weeklyBubbleTotal : styles.bubbleTotal}>
          <div style={{"fontSize" : this.props.numberSize, "textAlign" : "center"}}>
            {this.props.sessionCount}
          </div>
      </div>

    );
  }
}
