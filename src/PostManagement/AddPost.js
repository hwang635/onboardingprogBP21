import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const useStyles = makeStyles({ // Only for styling purposes
  formContainer: {
    width: '30%',
    marginLeft: '5%',
    marginBottom: '5px',
    borderRadius: '6px',
  },
  inputFields: {
    width: '100%',
    fontSize: '15px',
    margin: '1px 1px 1px 1px',
  },
  button: {
    backgroundColor: '#1DA1F2',
    marginTop: '12px',
    fontWeight: 'bold',
    color: 'white',
  },
});

// Represents form to submit new post w/ author + body, then creates record in Airtable
export default function AddPost({ updateNumPosts }) {
  // Hooks to store/update author + body of new post, set to default strings
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');

  // Update author/body whenever input changes
  // setAuthor/Body can't be called directly thru fx passing in TextField
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  // When form is submitted, handleSubmit creates Airtable record w/ newly entered body + author
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents default handling
    // After create runs, it returns all newly created records
    // Any records/err are passed to callback fx (2nd arg) for error handling
    base('Posts').create([
      {
        fields: {
          Author: author,
          Body: body,
        },
      },
    ], (err, record) => {
      if (err) {
        console.error(`Error message: ${err}, Record: ${record}`);
      }
    });

    // Clear author + body input fields, update # posts for rerendering
    setAuthor('');
    setBody('');
    updateNumPosts();
  };

  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      {/* Interactive textfields to enter author + body text */}
      <TextField
        helperText="Username"
        label="Author"
        value={author}
        onChange={handleAuthorChange}
        className={classes.inputFields}
      />
      <TextField
        helperText="What's happening?"
        label="Body"
        value={body}
        multiline
        onChange={handleBodyChange}
        className={classes.inputFields}
      />
      {/* When the submit button is pressed, handleSubmit will be called */}
      <Button variant="contained" type="submit" className={classes.button}>
        POST
      </Button>
    </form>
  );
}

AddPost.propTypes = { // Validate props (updateNumPosts exists + is passed as a fx)
  updateNumPosts: PropTypes.func.isRequired,
};
