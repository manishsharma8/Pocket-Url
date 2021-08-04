import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<{}> = ({ children }) => {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
};

export default Layout;
