import React, { useEffect, useState } from 'react';
import { useUrlVisitsQuery } from '../../generated/graphql';
import { returnDate } from '../../utils/timestampToDate';
import ActionButton from './ActionButton';
import BarChart from '../Charts/Bar';
import { getWeek } from '../../utils/getWeek';

interface AnalyticsProps {
	url: any;
	userId: string;
}

interface WeekProps {
	date: string;
	count: number;
}

const Analytics: React.FC<AnalyticsProps> = ({ url, userId }) => {
	const [{ data, fetching }] = useUrlVisitsQuery({ variables: { id: url.id } });
	const [labels, setLabels] = useState<Array<string>>([]);
	const [graphData, setGraphData] = useState<Array<number>>([]);
	const [visitCount, setVisitCount] = useState<number>(0);

	useEffect(() => {
		if (data && !fetching) {
			let newLabelState: Array<string> = [];
			let newDataState: Array<number> = [];
			let count: number = 0;

			let week: WeekProps[] = [];

			// getting current week
			week = getWeek();

			// updating count
			data.urlVisits.map((visit) => {
				let objIndex: number = week.findIndex((obj) => obj.date == visit.date);
				if (objIndex > 0) {
					week[objIndex].count = visit.count;
				}
			});

			week.map((day) => {
				newLabelState = [...newLabelState, day.date];
				newDataState = [...newDataState, day.count];
				count += day.count;
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
						userId={userId}
					/>
				</div>
			</div>
			<hr className="my-10 border-gray-700 rounded" />
			<>
				<div className="text-xl mb-10">
					This Week Visits: <span className="font-bold">{visitCount}</span>
				</div>
				<div className="w-5/6">
					<BarChart labels={labels} graphData={graphData} />
				</div>
			</>
		</div>
	);
};

export default Analytics;
