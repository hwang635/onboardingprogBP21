import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

// Represents form to submit new post w/ author + body, then creates record in Airtable
export default function AddPost({ updateNumPosts }) {
  // Hooks to store/update author + body of new post, set to default strings
  const [author, setAuthor] = useState('No author');
  const [body, setBody] = useState('No body');

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

    updateNumPosts();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Interactive textfields to enter author + body text */}
      <TextField
        helperText="Enter your name"
        label="Author"
        onChange={handleAuthorChange}
      />
      <TextField
        helperText="Enter your post"
        label="Body"
        onChange={handleBodyChange}
      />
      {/* When the submit button is pressed, handleSubmit will be called */}
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}

AddPost.propTypes = { // Validate props (updateNumPosts exists + is passed as a fx)
  updateNumPosts: PropTypes.func.isRequired,
};
