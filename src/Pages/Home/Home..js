/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import LineChart from "../../components/LineChart/LineChart";
import classNames from "./Home.module.scss";
import { Input, Form, DatePicker, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	getUserRecords,
	createRecord,
	updateRecord,
	deleteRecord,
} from "../../api/trackerApi";
import Button from "../../components/common/Button";
import moment from "moment";
import { BareLoader } from "../../components/common/Loader";

const Home = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const lastCreate = useSelector((state) => state.tracker.lastCreate);
	const lastUpdate = useSelector((state) => state.tracker.lastUpdate);
	const lastDelete = useSelector((state) => state.tracker.lastDelete);
	const recs = useSelector((state) => state.tracker.records);
	const trackerFetching = useSelector((state) => state.tracker.fetching);

	const [showAddWeightModal, setShowAddWeightModal] = useState(false);
	const [showUpdateModal, setshowUpdateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedMeasurement, setSelectedMeasurement] = useState(null);
	const [selectedId, setSelectedId] = useState();
	const [recordParsed, setRecordParsed] = useState([]);

	const records = JSON.parse(JSON.stringify(recs));

	useEffect(() => {
		dispatch(getUserRecords());
	}, [dispatch, lastCreate, lastUpdate, lastDelete]);

	useEffect(() => {}, [records]);

	useEffect(async () => {
		async function stringify() {
			const x = await JSON.parse(records);
			setRecordParsed(x);
		}
		if (records) {
			stringify();
		}

		async function sort() {
			await recordParsed?.userRecords?.sort(function (a, b) {
				return new Date(+b.recorded_date) - new Date(a.recorded_date);
			});
		}
		sort();
	}, [records]);


	useEffect(() => {
		const x = recordParsed?.userRecords?.[selectedMeasurement?.index];
		setSelectedId(x?.id);
	}, [recordParsed, selectedMeasurement]);

	const sendWeightRecord = async () => {
		try {
			await form.validateFields();
		} catch (error) {
			return;
		}
		const date = form.getFieldValue("recorded-date").toISOString();
		dispatch(
			createRecord({
				weight: parseFloat(+form.getFieldValue("weight")),
				recorded_date: date,
			})
		);
		setShowAddWeightModal(false);

	};

	const updateWeightRecord = async () => {
		try {
			await form.validateFields();
		} catch (error) {
			return;
		}

		const date = form.getFieldValue("updated-date").toISOString();

		console.log(date, +form.getFieldValue("weight-update"), selectedId)
		dispatch(
			updateRecord({
				weight: parseFloat(+form.getFieldValue("weight-update")),
				recorded_date: date,
				id: selectedId,
			})
		);
		setshowUpdateModal(false);

	};

	const deleteWeightRecord = async () => {
		dispatch(
			deleteRecord({
				id: +selectedId,
			})
		);
		setShowDeleteModal(false);
	};

	return (
		<>
			{trackerFetching && (
				<div className={classNames.overlay}>
					<div className={classNames.center}>
						<BareLoader />
					</div>
				</div>
			)}

			<div className={classNames.contentWrapper}>
				<div style={{ height: 500, width: "inherit" }}>
					{records && <LineChart records={records} select={setSelectedMeasurement} />}
				</div>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<div className={classNames.controlsWrapper}>
						<Button onClick={() => setShowAddWeightModal(true)}>
							Add new weight Measurement
						</Button>
					</div>
					<div className={classNames.controlsWrapper}>
						<Button
							onClick={() => setshowUpdateModal(true)}
							disabled={!selectedMeasurement}
						>
							Update selected Measurement
						</Button>
					</div>
					<div className={classNames.controlsWrapper}>
						<Button
							onClick={() => setShowDeleteModal(true)}
							disabled={!selectedMeasurement}
						>
							Delete your Measurement
						</Button>
					</div>
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						margin: "100px 0px",
					}}
				>
					{" "}
					<h3>
						Click on the points in the graph to select a measurement to update or delete
					</h3>
					<div style={{ fontWeight: "bold", fontSize: "20px" }}>Selected Measurement</div>
					<div style={{ fontWeight: "bold" }}>
						{`Date: ${selectedMeasurement ? selectedMeasurement?.data.x : ""} `}
					</div>
					<div style={{ fontWeight: "bold" }}>
						{`Weight :${selectedMeasurement ? selectedMeasurement?.data.y : ""} `}
					</div>
				</div>
			</div>

			<Modal
				title="Add your weight measurements"
				visible={showAddWeightModal}
				onOk={sendWeightRecord}
				onCancel={() => {
					setShowAddWeightModal(false);

					form.resetFields(["weight", "recorded-date"]);
				}}
				style={{ maxHeight: "90vh" }}
				width={500}
				centered
				className={classNames.modal}
				bodyStyle={{
					padding: 20,
					margin: 0,
					backgroundColor: "#f5f6fa",
				}}
			>
				<Form form={form} layout="vertical" onFinish={() => console.log("as")}>
					<>
						<Form.Item
							label="Add your weight"
							name="weight"
							rules={[
								{
									required: true,
									message: "Weight is Required.",
								},
							]}
						>
							<Input className={classNames.input} />
						</Form.Item>
			
						<Form.Item
							label="Date"
							name="recorded-date"
							rules={[
								{
									required: true,
									message: "Date is required",
								},
							]}
						>
							<DatePicker
								format="MMMM Do YYYY, h:mm a"
								className={classNames.input}
								showTime={{
									defaultValue: moment("00:00:00", "h:mm a"),
								}}
							/>
						</Form.Item>
					</>
				</Form>
			</Modal>
			<Modal
				title="Update your weight measurements"
				visible={showUpdateModal}
				onOk={updateWeightRecord}
				onCancel={() => {
					setshowUpdateModal(false);

					form.resetFields(["weight-update", "updated-date"]);
				}}
				style={{ maxHeight: "90vh" }}
				width={500}
				centered
				className={classNames.modal}
				bodyStyle={{
					padding: 20,
					margin: 0,
					backgroundColor: "#f5f6fa",
				}}
			>
				<Form form={form} layout="vertical" onFinish={() => console.log("as")}>
					<>
						<Form.Item
							label="Add your weight"
							name="weight-update"
							rules={[
								{
									required: true,
									message: "Weight is Required.",
								},
							]}
						>
							<Input className={classNames.input} />
						</Form.Item>
						<Form.Item
							label="Date"
							name="updated-date"
							rules={[
								{
									required: true,
									message: "Date is required",
								},
							]}
						>
							<DatePicker
								format="MMMM Do YYYY, h:mm a"
								className={classNames.input}
								showTime={{
									defaultValue: moment("00:00:00", "h:mm a"),
								}}
							/>
						</Form.Item>
					</>
				</Form>
			</Modal>
			<Modal
				title="Delete selected weight measurements"
				visible={showDeleteModal}
				onOk={deleteWeightRecord}
				onCancel={() => {
					setShowDeleteModal(false);

					form.resetFields(["weight", "Date"]);
				}}
				style={{ maxHeight: "90vh" }}
				width={500}
				centered
				className={classNames.modal}
				bodyStyle={{
					padding: 20,
					margin: 0,
					backgroundColor: "#f5f6fa",
				}}
			>
				<div>This will delete the current selected record</div>
			</Modal>
		</>
	);
};

export default Home;
