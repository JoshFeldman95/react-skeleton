
import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const styles = {
  storiesLearned : {
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 60,
    paddingLeft: 60,
    display : "flex",
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
  },
  booksBody : {
    maxHeight: "60vh",
    overflow: "scroll",
  },
  storiesItem : {
    display: "flex",
    flex: 1,
    padding: 6,
    borderStyle: "solid",
    borderColor: "#222222",
    borderWidth: 0.5,
    textAlign: "center",
  },

  storiesText: {
    fontSize: 20,
    fontFamily: "roboto",
    fontWeight: 300,
    textAlign: "center",

  },
  storiesTitle: {
    fontSize: 33,
    fontFamily: "roboto",
    fontWeight: 300,
    marginBottom: 30,
    marginTop: 10
  },
  itemList : {
    borderStyle: "solid",
    borderColor: "#222222",
    borderWidth: 0.5,
    maxHeight: "80%",
    width: "80%"
  }

};

const bookData =
[
{key: "The Little Prince by Antoine de Saint-Exupery"},
{key: "Harry Potter by J. K. Rowling"},
{key: "To The Lighthouse by Virgina Wolff"},
{key: "Little Women by Jane Austen"},
]

export default class StorybooksLearned extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
    return (
      <div style= {styles.storiesLearned}>
        <div style={styles.storiesTitle}>Storybook Progress</div>
        <div style={styles.booksBody}>
        <List
        >
          {this.props.info.booksLearned.map(item => <div style={styles.storiesItem}><div style={styles.storiesText}>{item.key}</div></div>)}
        </List>
        </div>
      </div>
    )


  }
}


/*
style definitons for storybooks learned:

storiesLearned: container for the list, defines where it sits in space

storiesTitle : title of the entire list

itemList : defines the items list

storiesText : actual text of the list
*/
