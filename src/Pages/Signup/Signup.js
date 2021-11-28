import classNames from "./Signup.module.scss";
import { Form, Input , Alert } from "antd";
import { Link, useHistory } from "react-router-dom";
import { validation } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import workout from "../../assets/workout.png";
import PrimaryButton from "../../components/common/Button";
import { SignUpUserCognito } from "../../api/authApi";

export default function Signup() {
	const [form] = Form.useForm();
	const history = useHistory();
	const user = useSelector((state) => state.auth.user);
	const signUpStatus = useSelector((state) => state.auth.signUpStatus);

	const dispatch = useDispatch();
	const [confirmDirty, setConfirmDirty] = useState(false);

	useEffect(() => {
		if (user) {
			history.push("/");
		}
	}, [history, user]);

	const [disable, setDisable] = useState(true);
	const errorMessage = useSelector(state => state.auth.error);


	function handleSubmit({ email, password, user_name }) {
		dispatch(SignUpUserCognito({ email, password, user_name }));
	}

	const handleConfirmBlur = (event) => {
		setConfirmDirty(confirmDirty || !!event.target.value);
	};

	return (
		<div className={classNames.wrapper}>
			<img src={workout} alt=" logo" className={classNames.logo} />
			{!signUpStatus && (
				<>
					<h1>Sign up</h1>
					<div style={{ marginBottom: 10, width: 400 }}>
				{errorMessage && <Alert type="error" message={errorMessage} />}
			</div>
					<Form
						onFinish={handleSubmit}
						form={form}
						layout="vertical"
						hideRequiredMark
						className={classNames.formWrapper}
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{ required: true, message: validation.email.required },
								{ type: "email", message: validation.email.valid },
							]}
							className={classNames.sublabel}
						>
							<Input
								placeholder=""
								className={classNames.email}
								onClick={() => {
									setDisable(false);
								}}
							/>
						</Form.Item>
						<Form.Item
							label="User Name"
							name="user_name"
							rules={[
								{ required: true, message: validation.username.required },
								{ type: "string", message: validation.username.valid },
							]}
							className={classNames.sublabel}
						>
							<Input
								placeholder=""
								className={classNames.email}
								onClick={() => {
									setDisable(false);
								}}
							/>
						</Form.Item>
						<Form.Item
							label="Password"
							className={classNames.sublabel}
							name="password"
							validateFirst={true}
							rules={[
								{ required: true, message: validation.password.required },
								{
									min: 8,
									message: validation.password.minLength,
								},
								{
									pattern: new RegExp(
										"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$*.{}?\"!@#%&/,><':;|_~`^\\]\\[\\)\\(]).{6,}"
									),
									message: validation.password.regex,
								},
							]}
						>
							<Input
								placeholder=""
								className={classNames.input}
								type="password"
								onClick={() => {
									setDisable(false);
								}}
							/>
						</Form.Item>
						<Form.Item
							label="Confirm Password"
							name="confirm-password"
							dependencies={["password"]}
							className={classNames.sublabel}
							rules={[
								{ required: true, message: validation.confirmPassword.required },
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(validation.confirmPassword.match);
									},
								}),
							]}
						>
							<Input
								type="password"
								placeholder=""
								className={classNames.input}
								onBlur={handleConfirmBlur}
								onClick={() => {
									setDisable(false);
								}}
							/>
						</Form.Item>
						<PrimaryButton
							htmlType="submit"
							type="primary"
							style={{ width: "100%", fontWeight: "bold" }}
							disabled={disable}
						>
							Sign up
						</PrimaryButton>
					</Form>
				</>
			)}
			{signUpStatus && (
				<>
					<h2>Contact </h2>
					<h2>sandamalsagarage@gmail.com </h2>
					<h2> to Activate your account </h2>
				</>
			)}
			<div className={classNames.links}>
				<div style={{ marginTop: "20px" }}>
					<Link to="/Signin" el={Link}>
						I already have an account
					</Link>
				</div>
			</div>
		</div>
	);
}
