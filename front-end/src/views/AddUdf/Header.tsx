import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Breadcrumbs, Link, Typography, makeStyles } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles(() => ({
	root: {},
}));

type Props = {
	className?: string;
};
const Header = ({ className, ...rest }: Props) => {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root, className)} {...rest}>
			<Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
				<Link variant='body1' color='inherit' to='/' component={RouterLink}>
					Dashboard
				</Link>
				<Typography variant='body1' color='textPrimary'>
					Create custom UDF
				</Typography>
			</Breadcrumbs>
			<Typography variant='h5' color='textPrimary'>
				Create custom UDF
			</Typography>
		</div>
	);
};

Header.propTypes = {
	className: PropTypes.string,
};

export default Header;
