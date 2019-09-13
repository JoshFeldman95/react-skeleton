
import React from 'react';
// import ProgressCircle from 'react-native-progress-circle'
import ProfileInfo from "./ProfileInfo.js"
import ProgressDetails from "./ProgressDetails.js"
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
  appBar: {
    position: 'relative',
    backgroundColor: '#60aaff',
  },
  modalContainer : {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileModal : {
    display: 'flex',
    alignItems: 'center',
    width: "100%",
    backgroundColor: 'white',
    borderRadius: 0,
    flexGrow: 1,
  },
  modalBody : {
    display: 'flex',
    flexDirection: 'row',
    width: "100%",
    height: "100%"
  },
  profilePic : {
    width: 150,
    height: 150,
  },

  progressLabel : {
    fontSize: 18,
    fontFamily: "roboto",
    fontWeight: 300,
    marginTop: 15,
  },

  closeButton: {
    position: 'absolute',
    padding: 5,
    backgroundColor: "#ffffff",
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderRadius: 20,
    right: -8,
    top: -10,
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000000',
  }
};

export default class ProfileModal extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Dialog fullScreen aria-labelledby="simple-dialog-title" open={this.props.modalVisible}>
      <div style={styles.modalContainer}>
          <AppBar style={styles.appBar}>
          <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => {this.props.setModalVisible(false)}} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            {"Progress Details"}
          </Typography>
          </Toolbar>
          </AppBar>
          <div style={styles.profileModal}>
              <div style={styles.modalBody}>
                <ProfileInfo closeModal={() => {this.props.setModalVisible(false);}} info={this.props.info}/>
                <ProgressDetails info={this.props.info}/>
              </div>
          </div>
        </div>
      </Dialog>
    )
  }

}


// <Modal
//   animationType="slide"
//   transparent={true}
//   visible={this.props.modalVisible}
//   onRequestClose={() => {
//     Alert.alert('Modal has been closed.');
//   }}>
//
//   <View style={styles.modalContainer}>
//     <View style={styles.profileModal}>
//             <View style={styles.modalBody}>
//               <ProfileInfo info={this.props.info}/>
//               <ProgressDetails info={this.props.info}/>
//             </View>
//             <TouchableHighlight
//               style={styles.closeButton}
//               onPress={() => {
//                 this.props.setModalVisible(!this.props.modalVisible);
//               }}>
//               <Text style={{fontSize: 18}}>X</Text>
//             </TouchableHighlight>
//     </View>
//   </View>
// </Modal>

/*
style definitons for profile modal:

modalContainer : defines where the modal should sit in space

profileModal : the actual modal itself, including the black border, width, etc.

modalBody : defines the structure for the modal contents

profilePic : profile picture styling

progessLabel : text to show the progress of the student

closeButton : the circular button that closes the modal
*/
