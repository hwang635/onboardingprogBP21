import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

// Define fxtional component PostsDisplay, which displays a series of posts
function PostsDisplay({ numPosts }) {
  // Use useState hook to store arr of posts + update posts w/ fx setPosts
  const [posts, setPosts] = useState([]);
  // Fx to get all records from Airtable + store in posts
  const getPosts = () => {
    base('Posts').select({ view: 'Grid view' }).all() // Gets + returns all records
      .then((records) => { // Takes in returned records + calls setPosts to store in posts arr
        setPosts(records);
      });
  };

  /* Use useEffect hook to call getPosts 1x at component mount
    Second arg [] is the dependency array, useEffect reruns whenever a dependency changes
    If [] is empty, this hook doesn't depend on anything + will never rerun
  useEffect(getPosts, []); */

  // MILESTONE 3: Whenever numPosts changes, getPosts is called again to fetch new posts
  useEffect(getPosts, [numPosts]);

  return posts.map((post) => (
    <Post
      key={post.id} // Good practice for list elems to have key to help compiler dist btw elems
      author={post.fields.Author}
      body={post.fields.Body}
    />
  ));
}

PostsDisplay.propTypes = { // Validate props (numPosts exists + is passed as number)
  numPosts: PropTypes.number.isRequired,
};

export default PostsDisplay; // Export PostsDisplay so it can be imported in other files
