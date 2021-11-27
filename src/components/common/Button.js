import classNames from "../../assets/styles/common/Button.module.scss";
import { Button } from "antd";
import React from "react";


export default function DefaultButton({
  children,
  className,
  onClick,
  variant = "primary",
  size = "large",
  ...props
}){
  return (
    <Button
      {...props}
      className={`${classNames.button} ${classNames[variant]} ${classNames[size]} ${className} `}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
