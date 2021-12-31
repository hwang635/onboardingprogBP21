import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({ // Only for styling purposes
  cardContainer: {
    width: '90%',
    marginLeft: '5%',
    marginTop: '10px',
    borderRadius: '6px',
  },
  authorText: {
    fontSize: '16px',
    marginBottom: '1%',
    fontWeight: 'bolder',
    /* Make text hidden if it's too long, mark with ellipsis */
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: '#000000',
  },
  bodyText: {
    fontSize: '15px',
    fontWeight: 'normal',
    color: '#4F4F4F',
  },
});

// Define and export Post so it can be used in other files
// Post represents a component w/ author + body
export default function Post({ author, body }) {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.cardContainer}>
      <CardContent>
        <Typography className={classes.authorText}>
          {author}
        </Typography>
        <Typography className={classes.bodyText}>
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}

Post.propTypes = { // Validate props (make sure args are passed in as strs)
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
