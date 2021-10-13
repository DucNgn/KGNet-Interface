import { Box, TextField, Typography } from "@material-ui/core";
import React from "react";

export type TextFieldWithTitleProps = {
	placeholder: string;
	label: string;
	setter: any;
	value: any;
	className?: string;
};

const TextFieldWithTitle = ({ placeholder, label, setter, value, className }: TextFieldWithTitleProps) => {
	return (
		<Box display='flex' alignItems='center' justifyContent='flex-start'>
			<Typography variant='body1' color='textPrimary' gutterBottom>
				{placeholder}
			</Typography>
			<Box mx={10} />
			<TextField
				className={className}
				label={label}
				variant='outlined'
				value={value}
				onChange={(e) => setter(e.target.value)}
			/>
		</Box>
	);
};

export default TextFieldWithTitle;
