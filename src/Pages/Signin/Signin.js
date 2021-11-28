/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "./Signin.module.scss";
import { Form, Alert, Input } from "antd";
import { Link, useHistory } from "react-router-dom";
import { validation } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import workout from "../../assets/workout.png";
import PrimaryButton from "../../components/common/Button";
import { loginUserCognito } from "../../api/authApi";
import { authActions } from "../../store/AuthSlice";

function Signin(props) {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	
	const [disable, setDisable] = useState(false);
	const history = useHistory();
	const fetching = useSelector((state) => state.auth.fetching);

	const user = useSelector((state) => state.auth.user);
	const signUpStatus = useSelector((state) => state.auth.signUpStatus);
	const errorMessage = useSelector(state => state.auth.error);


	useEffect(() => {
		if (signUpStatus) {
			dispatch(authActions.clearSignUpStatus());
		}
	}, [signUpStatus]);

	useEffect(() => {
		if (user) {
			history.push("/");
		}
	}, [history, user]);

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	function onFinish({ email, password }) {	
		dispatch(loginUserCognito({ email, password }));
	}

	const formProps = {
		onFinish: onFinish,
		onFinishFailed: onFinishFailed,
		form: form,
		layout: "vertical",
		hideRequiredMark: true,
		className: classNames.form,
	};

	const emailFieldProps = {
		label: "Email",
		name: "email",
		type: "email",
		className: classNames.sublabel,
		rules: [
			{ required: true, message: validation.email.required },
			{ type: "email", message: validation.email.validity },
		],
	};

	const passwordFieldProps = {
		label: "Password",
		name: "password",
		rules: [{ required: true, message: validation.password }],
		className: classNames.field,
	};

	return (
		<div className={classNames.wrapper}>
			<img src={workout} alt="logo" className={classNames.logo} />
			<h1 as="h1" style={{ fontSize: "36px" }}>
				Sign In
			</h1>

			<div style={{ marginBottom: 10, width: 400 }}>
				{errorMessage && <Alert type="error" message={errorMessage} />}
			</div>

			<Form
				{...formProps}
				onValuesChange={(changedValues, { email, password }) => {
					if (changedValues && email?.length > 0 && password?.length > 0) {
						setDisable(false);
					} else if ((changedValues && email?.length === 0) || password?.length === 0) {
						setDisable(true);
					}
				}}
			>
				<Form.Item {...emailFieldProps}>
					<Input placeholder="" className={classNames.input} />
				</Form.Item>

				<Form.Item {...passwordFieldProps}>
					<Input placeholder="" className={classNames.input} type="password" />
				</Form.Item>

				<PrimaryButton
					htmlType="submit"
					type="primary"
					style={{ width: "100%", fontWeight: "bold", zIndex: 1000000 }}
					loading={fetching}
					disabled={disable}
				>
					Log In
				</PrimaryButton>
			</Form>
			<div style={{ marginTop: "40px" }}>
				<Link to="/signup" el={Link}>
					I don't have an account
				</Link>
			</div>
		</div>
	);
}

export default Signin;
