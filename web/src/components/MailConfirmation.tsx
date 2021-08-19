import React from 'react';

const MailConfirmation: React.FC<{}> = ({}) => {
	return (
		<div className="text-center">
			<div className="text-3xl font-bold">Check Your Mail!</div>
			<div className="pt-5 text-xl text-gray-400">
				We have just emailed you the instructions to reset your password.
			</div>
		</div>
	);
};
export default MailConfirmation;
