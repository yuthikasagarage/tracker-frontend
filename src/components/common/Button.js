import classNames from "../../assets/styles/common/Button.module.scss";
import { Button } from "antd";
import React from "react";


export default function DefaultButton(props) {
  
  const { children,
    className,
    onClick,
    variant = "primary",
    size = "large",
    ...rest } = props;

  return (
    <Button
      {...rest}
      className={`${classNames.button} ${classNames[variant]} ${classNames[size]} ${className} `}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
