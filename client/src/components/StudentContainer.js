import React from 'react';
import CounterBubble from './CounterBubble.js';
import ProfileModal from './ProfileModal.js';

const styles = {
  headShot: {
    width: "100%",
  },
  bubbleBack: {
    padding: 32,
    width: 200,
    height: 200,
    borderRadius: 140,
    alignItems: "center",
    marginBottom: 8,
  },
  studentContainer: {
    display: "flex",
    flex: "1 0 0",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    height: 350,
    minWidth: "calc(33% - 40px)",
    maxWidth: "calc(33% - 40px)",
  },
  student: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    fontSize: 35,
  }
};

export default class StudentContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
  }


  setModalVisible = (visible) => {
    console.log("setting modal")
    this.setState({modalVisible: visible});
  }


  render() {
    // let image = require(this.props.info.image)
    console.log(this.props.info.image)
    let color;
    switch(this.props.info.priority) {
      case 0:
        color = "#91ff82"
        break;
      case 1:
        color = "#FFFD8E"
        // code block
        break;
      default:
        color = "#ffa395"
    }

    return (
      <div style={styles.studentContainer}>
        <ProfileModal setModalVisible={this.setModalVisible} info={this.props.info} modalVisible={this.state.modalVisible}/>
        <div
          onClick={() => {
            this.setModalVisible(true);
          }}
          style={styles.student}
        >
          <div
            style={{...styles.bubbleBack, backgroundColor: color}}>
            <img
              style={styles.headShot}
              src={this.props.image}
            />
            <CounterBubble weekly={false} numberSize={25} sessionCount={this.props.info.sessionCount}/>
            <CounterBubble weekly={true} numberSize={15} sessionCount={14}/>
          </div>
          <div style={styles.name}>{this.props.info.name}</div>
        </div>
      </div>
    );
  }
}
