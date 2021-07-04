import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Breadcrumbs, Link, Typography, makeStyles } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = ({ className, mode, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link variant="body1" color="inherit" to="/" component={RouterLink}>
          Dashboard
        </Link>
        {mode === 'dog' ? (
          <Link variant="body1" color="inherit" to="/dogs" component={RouterLink}>
            Dog Breeds Finder
          </Link>
        ) : (
          <Link variant="body1" color="inherit" to="/companies" component={RouterLink}>
            Companies Similarities
          </Link>
        )}
        <Typography variant="body1" color="textPrimary">
          Result
        </Typography>
      </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          {mode === 'dog' ? ("Result for Dog breed finder") : null}
          {mode === 'dogSimilarity' ? ("Result for Dog Image Similarity") : null}
          {mode === 'company' ? ("Result for Company Similarity") : null}
        </Typography>

    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
