/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import classNames from "./LineChart.module.scss";
import moment from "moment";


const Line = (props) => {
  const [recs, setRecs] = useState();
  const [dataArray, setDataArray] = useState();
  const [finalData, setFinalData] = useState();

  let { records, select } = props;

  const stringify = async () => {
    const x = await JSON.parse(records);
    setRecs(x);
  };

  useEffect(async () => {
    if (records && records.length > 0) {
      await stringify();
    }
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
      <div
        className={classNames.headerText}
      >{`Track Your Weight & Excercise `}</div>

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