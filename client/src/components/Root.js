import React from "react";
import StudentContainer from "./StudentContainer.js"
import socketIOClient from "socket.io-client";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid'


const endpoint = window.location.hostname + ":" + window.location.port;

const status = {
    CORRECT: 0,
    INCORRECT: 1,
    UNKNOWN: 2,
}


const styles = {
  appBar: {
    position: 'relative',
    backgroundColor: '#60aaff',
  },
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
  },
  input: {
    color: "white",
    borderWidth: 1,
    borderBottomStyle: "solid",
    borderColor: "white",
    padding: 2,
    borderRadius: 1,
  }
};


class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      studentInfo : [],
      filter: "",
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
    const url = window.location.hostname + ":" + window.location.port
    xhr.open('GET', 'http://' + url + '/get_nodes?subject_id=p001&path=/studentInfo')
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
    data.sort(function(a,b) { return a.sessionCount - b.sessionCount})
    console.log(data)
    const prioritized_data = data.map(studentInfo => {
      const newData = {...studentInfo}
      if (studentInfo.sessionCount > 10) {
        newData.priority = 0
      }
      else {
        newData.priority = 2
      }
      return newData;
    })
    this.setState({studentInfo: prioritized_data})
  }



  getStudentInfo = () => {
    this.getData();
    const socket = socketIOClient(endpoint);
    socket.on('connect', () => {
      socket.emit("join", {room: "A"})
    })

    socket.on('student_info', (data) => {
      console.log("getting more student info")
      this.updateStudents(data.studentInfo)
    })

  };

  componentDidMount() {
    this.getStudentInfo()
  }

  render() {
    let filteredStudents = this.state.studentInfo
    if (this.state.filter) {
      filteredStudents = filteredStudents.filter((stud) => {
        console.log(stud.name)
        console.log(this.state.filter)
        stud.name.startsWith(this.state.filter);
      })
    }
    console.log(filteredStudents)
    const studentContainers = filteredStudents.map((studentInfo) =>
      <StudentContainer image={studentInfo.image} info={studentInfo} key={studentInfo.id}/>
    );
      return (
        <div style={styles.container}>
          <AppBar style={styles.appBar}>
          <Toolbar>
            <Grid
              justify="space-between" // Add it here :)
              container
              spacing={24}
            >
              <Typography variant="h6">
                {"Student Overview"}
              </Typography>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
                onChange={(e) => {this.setState({filter: e.target.value})}}
                style={styles.input}
                disableUnderline={true}
              />
            </Grid>
          </Toolbar>
          </AppBar>
          <div style={styles.students}>
               { studentContainers }
          </div>
        </div>
      );
  };
}

export default Root;
