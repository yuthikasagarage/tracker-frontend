import classNames from "./Signin.module.scss";
import { Form, Spin, Alert, message, Input } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { validation } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import workout from '../../assets/workout.png'
import PrimaryButton from "../../components/common/Button";
import { loginUserCognito, SignOutUserCognito, SignUpUserCognito } from '../../api/authApi'

function Signin(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState();

  const [disable, setDisable] = useState(false);
  const history = useHistory();
  const fetching = useSelector(state => state.auth.fetching)
  const user = useSelector(state => state.auth.user)


  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [history, user])

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  function onFinish({ email, password }) {
    console.log("asa")
    dispatch(loginUserCognito({ email, password }));
    // dispatch(SignOutUserCognito());
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
          } else if (
            (changedValues && email?.length === 0) ||
            password?.length === 0
          ) {
            setDisable(true);
          }
        }}
      >
         <Spin spinning={false}>
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
            disabled={false}
          >
            Log In
          </PrimaryButton>
        </Spin>
      </Form>
      <div style={{marginTop: "40px"}}>
        <Link to="/signup" el={Link}>
          I don't have an account
        </Link>
      </div>
      
    </div>
  );
}

export default Signin;