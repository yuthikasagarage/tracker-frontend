/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import classNames from "./LineChart.module.scss";
import { useSelector } from "react-redux";
import { timeFormat } from "d3-time-format";
import moment from "moment";

const data = [
	{
		id: "hours",
		data: [
			{ x: "A", y: "2019-05-29 04:00" },
			{ x: "B", y: "2019-05-29 02:00" },
			{ x: "C", y: "2019-05-29 07:00" },
			{ x: "D", y: "2019-05-30 04:00" },
		],
	},
];

const Line = (props) => {
	const [recs, setRecs] = useState();
	const [dataArray, setDataArray] = useState();
	const [finalData, setFinalData] = useState();

	let { records, select, ...rest } = props;
	useEffect(() => {
		async function stringify() {
			const x = await JSON.parse(records);
			setRecs(x);
		}
		stringify();
	}, [records]);

	useEffect(() => {
		let array = [];
		recs?.userRecords?.forEach((record) => {
			let obj = {};
			obj["y"] = record.weight;
			obj["x"] = moment(+record.recorded_date).format("YYYY-MM-DD HH:mm");
			array.push(obj);
		});
		setDataArray(array);
	}, [recs]);

	useEffect(() => {
		const data = [
			{
				id: "hours",
				data: dataArray,
			},
		];
		setFinalData(data);
	}, [dataArray]);

	return (
		<div style={{ height: 400 }}>
			<div className={classNames.headerText}>{`Track Your Weight & Excercise `}</div>

			{
				<ResponsiveLine
					data={finalData}
					margin={{ top: 50, right: 60, bottom: 50, left: 120 }}
					yScale={{ type: "linear" }}
					xScale={{
						type: "time",
						format: "%Y-%m-%d %H:%M",
						precision: "minute",
					}}
					xFormat="time:%dd%Hh%Mm"
					onClick={(data) => select(data)}
					axisBottom={{
						orient: "left",
						format: "%b %d",
						legend: "day hour",
						legendOffset: 30,
						legendPosition: "middle",
					}}
					pointSize={10}
					pointColor="white"
					pointBorderWidth={2}
					pointBorderColor={{ from: "serieColor" }}
					useMesh={true}
				/>
			}
		</div>
	);
};

export default Line;
