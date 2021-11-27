import classNames from "./Signup.module.scss";
import { Form, Spin, Alert, message, Input } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { validation } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import workout from '../../assets/workout.png'
import PrimaryButton from "../../components/common/Button";

export default function Signup() {
  const [form] = Form.useForm();
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [signUpData, setSignUpData] = useState();

  const [submitted, setSubmitted] = useState(false);

  const [disable, setDisable] = useState(true);

  function handleSubmit({ email, password }) {

    setSubmitted(true);
  }

  const handleConfirmBlur = (event) => {
    setConfirmDirty(confirmDirty || !!event.target.value);
  }

  return (
    <div className={classNames.wrapper}>
      <img src={workout} alt=" logo" className={classNames.logo} />
      <h1>Sign up</h1>
      {signUpData?.error && submitted && (
        <Alert
          message={signUpData?.error.message}
          type="error"
          style={{ marginBottom: 10 }}
        />
      )}
      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        hideRequiredMark
        className={classNames.formWrapper}
      >
        {/* Email */}
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
              setSubmitted(false);
              setDisable(false);
            }}
          />
        </Form.Item>

        {/* Password field */}
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

        {/* Confirm password field */}
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

        <Spin spinning={false}>
          {/* Submit button */}
          <PrimaryButton
            htmlType="submit"
            type="primary"
            style={{ width: "100%", fontWeight: "bold" }}
            loading={signUpData?.fetching}
            disabled={disable}
          >
            Sign up
          </PrimaryButton>
        </Spin>
      </Form>
      <div className={classNames.links}>
        <div style={{marginTop: "20px"}}>
          <Link to="/Signin" el={Link}>
            I already have an account
          </Link>        
        </div>
      </div>


    </div>
  );
}
