import { Field } from 'formik';
import React from 'react';

interface InputFieldProps {
	field: string;
	label: string;
	errors: string | undefined;
	touched: boolean | undefined;
	required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
	field,
	label,
	required,
	errors,
	touched,
}) => {
	return (
		<div>
			<label className="text-left p-2 text-gray-300 text-base" htmlFor={field}>
				{label}
				{required ? <span className="ml-1 text-red-400">*</span> : null}
			</label>
			<Field
				className="mt-2 mb-2 w-full px-3 py-2 outline-none bg-gray-800 rounded text-gray-300"
				id={field}
				name={field}
			/>
			{errors && touched ? (
				<div className="text-base text-left text-red-400 ml-2 mb-4">
					{errors}
				</div>
			) : null}
		</div>
	);
};
export default InputField;
