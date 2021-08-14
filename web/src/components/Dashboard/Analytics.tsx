import React, { useEffect, useState } from 'react';
import { useUrlVisitsQuery } from '../../generated/graphql';
import { returnDate } from '../../utils/timestampToDate';
import ActionButton from './ActionButton';
import { Bar } from 'react-chartjs-2';

interface AnalyticsProps {
	url: any;
}

const Analytics: React.FC<AnalyticsProps> = ({ url }) => {
	const [{ data, fetching }] = useUrlVisitsQuery({ variables: { id: url.id } });
	const [labels, setLabels] = useState<Array<string>>([]);
	const [graphData, setGraphData] = useState<Array<number>>([]);
	const [visitCount, setVisitCount] = useState<number>(0);

	const chartData = {
		labels: labels,
		datasets: [
			{
				label: '# of Visits',
				data: graphData,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	const options = {
		// scales: {
		// 	x: {
		// 		type: 'time',
		// 		time: {
		// 			unit: 'day',
		// 		},
		// 	},
		// },
		elements: {
			bar: {
				borderWidth: 1,
			},
		},
		responsive: true,
		plugins: {
			legend: {
				position: 'right',
			},
		},
	};

	useEffect(() => {
		if (data && !fetching) {
			let newLabelState: Array<string> = [];
			let newDataState: Array<number> = [];
			let count: number = 0;
			data.urlVisits.map((visit) => {
				newLabelState = [...newLabelState, visit.date];
				newDataState = [...newDataState, visit.count];
				count += visit.count;
			});
			setLabels(newLabelState);
			setGraphData(newDataState);
			setVisitCount(count);
		}
	}, [data, fetching]);

	return (
		<div className="bg-gray-800 h-full w-full p-10">
			<div className="mb-16">
				<div className="mb-3 text-sm text-gray-400">
					{returnDate(url.createdAt)}
				</div>
				<div className="text-4xl font-bold">{url.title}</div>
				<div className="mt-2 text-base text-gray-400">{url.longUrl}</div>
				<div className="-mb-5 mt-10 text-xl text-blue-500">
					http://localhost:3000/{url.shortUrl}
				</div>
				<div className="w-2/3 h-1/2">
					<ActionButton
						dwarfUrl={`http://localhost:3000/${url.shortUrl}`}
						deleteButton={true}
						id={url.id}
					/>
				</div>
			</div>
			<hr className="my-10 border-gray-700 rounded" />
			<>
				<div className="text-xl mb-10">
					Total Clicks: <span className="font-bold">{visitCount}</span>
				</div>
				<div className="w-5/6">
					{visitCount !== 0 ? <Bar data={chartData} options={options} /> : null}
				</div>
			</>
		</div>
	);
};

export default Analytics;
