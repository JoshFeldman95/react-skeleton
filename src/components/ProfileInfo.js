import React from 'react';

import Button from '@material-ui/core/Button';
import ProfileDonut from './ProfileDonut.js'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
        main: '#FFFFFF'
      }
    }
  },
)


const styles = {
  profileInfo : {
    display: 'flex',
    alignItems: 'center',
    width: "45%",
    padding: 25,
    flexDirection: "column",
  },
  profilePic : {
    width: 120,
    height: 120,
  },
  progressLabel : {
    fontSize: 18,
    fontFamily: "roboto",
    fontWeight: 300,
    marginTop: 15
  },
};


const data = [
  { name: 'Word Quest', population: 21, color: '#60aaff', legendFontColor: 'black', legendFontSize: 12 },
  { name: 'Rhyme Racer', population: 22, color: '#ff6060', legendFontColor: 'black', legendFontSize: 12 },
  { name: 'Storybook', population: 14, color: '#444d5b', legendFontColor: 'black', legendFontSize: 12 }
];

export default class ProfileInfo extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    let newData = this.props.info.gameDist.map((dist) =>
      ({ name: dist.name, population: dist.population, color: dist.color, legendFontColor: 'black', legendFontSize: 12 })
    );
    return (
      <div style={styles.profileInfo}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 40,
        }}>
          <img
            style={styles.profilePic}
            src={this.props.info.image}
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 15,
            justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: "roboto",
              fontWeight: 300,
              fontSize: 25,
              textAlign: 'center',
            }}>
              {this.props.info.name}
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
        </div>
        <ProfileDonut info={this.props.info}/>
        <Button onClick={() => {this.props.closeModal()}} style={{backgroundColor: "#60aaff"}}variant="contained" color="primary">
          Close
        </Button>
      </div>
    )
  }
}

//
// <PieChart
//   data={newData}
//   width={350}
//   height={150}
//   chartConfig={chartConfig}
//   accessor="population"
//   backgroundColor="transparent"
//   absolute
//   style={{fontFamily: "roboto"}
// />
