
import React from 'react';
import WordsLearned from "./ProgressComponents/WordsLearned.js";
import PhonemesLearned from "./ProgressComponents/PhonemesLearned.js";
import StorybooksLearned from "./ProgressComponents/StorybooksLearned.js";
import ModalNav from './ModalNav.js';




const styles = {
  progressDetails : {
    width: "55%",
    display: "flex",
    flexDirection: "column",
  },
};

export default class ProgressDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navIndex: 0
    }
  }

  setNavIndex = (i) =>{
    this.setState({
      navIndex: i
    })
  }

  render() {

    const WordsLearnedComp = () => <WordsLearned info={this.props.info}/>;

    const PhonemesLearnedComp = () => <PhonemesLearned info={this.props.info}/>;

    const StorybooksLearnedComp = () => <StorybooksLearned info={this.props.info}/>;

    let progressContent = () => {switch(this.state.navIndex) {
      case 0:
        return (<PhonemesLearned info={this.props.info}/>);
      case 1:
        return (<StorybooksLearned info={this.props.info}/>);
      case 2:
        return (<WordsLearned info={this.props.info}/>);
      default:
        console.log("error");
        return null;
    }}

    return (
      <div style={styles.progressDetails}>
        {progressContent()}
        < ModalNav navIndex={this.state.navIndex} setNav={this.setNavIndex}/>
      </div>
    )


  }
}
