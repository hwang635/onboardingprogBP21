import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

// Define and export Post so it can be used in other files
// Post represents a component w/ author + body
export default function Post({ author, body }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>
          {`Author: ${author}`}
        </Typography>
        <Typography>
          {`Body: ${body}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

Post.propTypes = { // Validate props (make sure args are passed in as strs)
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
