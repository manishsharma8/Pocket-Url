import React from 'react';
import DashboardNav from './DashboardNav';

const DashboardLayout: React.FC<{}> = ({ children }) => {
	return (
		<>
			<DashboardNav />
			{children}
		</>
	);
};

export default DashboardLayout;
