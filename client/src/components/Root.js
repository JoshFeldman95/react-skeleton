import React from "react";
import StudentContainer from "./StudentContainer.js"
import socketIOClient from "socket.io-client";

const endpoint = window.location.hostname + ":" + window.location.port;

const status = {
    CORRECT: 0,
    INCORRECT: 1,
    UNKNOWN: 2,
}


const styles = {
  container: {
    fontFamily: 'roboto',
    fontWeight: 300,
    flex : 1,
    flexDirection: "column",
    alignItems: "center",

  },
  students: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    flexDirection: 'row',
  }
};


class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      studentInfo : []
    }
  };


  getData = () => {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      const raw_data = JSON.parse(xhr.responseText)
      this.updateStudents(raw_data)
    })
    // open the request with the verb and the url
    xhr.open('GET', 'http://localhost:5001/get_nodes?subject_id=p001&path=/studentInfo')
    // send the request
    xhr.send()
  }

  updateStudents = (newStudents) => {
    const data = newStudents.map(student => {
      student.image = require("../assets/" + student.image)
      return student
    })
    console.log("updating students to")
    console.log(data)

    this.setState({studentInfo: data})
  }



  getStudentInfo = () => {
    this.getData();
    const socket = socketIOClient(endpoint);
    socket.on('connect', () => {
      socket.emit("join", {room: "A"})
    })

    socket.on('student_info', (data) => {
      this.updateStudents(data.studentInfo)
    })

  };

  componentDidMount() {
    this.getStudentInfo()
  }

  render() {
    const studentContainers = this.state.studentInfo.map((studentInfo) =>
      <StudentContainer image={studentInfo.image} info={studentInfo} key={studentInfo.id}/>
    );
      return (
        <div style={styles.container}>
          <div style={styles.students}>
               { studentContainers }
          </div>
        </div>
      );
  };
}

export default Root;
