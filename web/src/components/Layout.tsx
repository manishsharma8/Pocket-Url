import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<{}> = ({ children }) => {
	return (
		<div className="h-screen">
			<Navbar />
			{children}
		</div>
	);
};

export default Layout;
