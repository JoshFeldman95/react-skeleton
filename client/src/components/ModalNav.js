import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BooksIcon from '@material-ui/icons/LibraryBooks';
import PhonemesIcon from '@material-ui/icons/TextFormat';
import WordsIcon from '@material-ui/icons/Message';

let styles = {
    root: {
      flexGrow: 1,
      maxWidth: 500,
    },
}

export default class ModalNav extends React.Component{
  constructor(props) {
    super(props);
  }


  handleChange = (event, newValue) => {
    this.props.setNav(newValue)
  }

  render() {
    return (
      <Paper square className={styles.root}>
        <Tabs
          value={this.props.navIndex}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<PhonemesIcon />} label="Phonemes Learned" />
          <Tab icon={<BooksIcon />} label="Books Learned" />
          <Tab icon={<WordsIcon />} label="Words Learned" />
        </Tabs>
      </Paper>
    );

  }
}
