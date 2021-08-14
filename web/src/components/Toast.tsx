import React from 'react';

interface ToastProps {
	title?: String;
	message: String;
}

const Toast: React.FC<ToastProps> = ({ title, message }) => {
	return (
		<div className="fixed top-20 right-4 px-6 py-4 transition ease-in transform bg-gray-900 rounded">
			<div>{title}</div>
			<div className="text-gray-100">{message}</div>
		</div>
	);
};
export default Toast;
