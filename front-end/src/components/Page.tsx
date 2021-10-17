import React, { forwardRef } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

type Props = {
	children?: React.ReactNode;
	title: string;
};

const Page = forwardRef<HTMLDivElement, any>(
	({ children, title = "", ...rest }: Props, ref) => {
		return (
			<div ref={ref} {...rest}>
				<Helmet>
					<title>{title}</title>
				</Helmet>
				{children}
			</div>
		);
	}
);

Page.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
};

export default Page;
