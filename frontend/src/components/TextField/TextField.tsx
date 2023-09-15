import React from "react";
import "./TextField.scss";
import { ComponentPropsWithoutRef } from 'react';

type TextFieldProps = ComponentPropsWithoutRef<'input'>;

const TextField = (props : TextFieldProps) => {

  console.log("props",props)
  
  return (
    <div className="TextField">
        <label className="TextField__label">
            <input className="TextField__input" {...props} />
        </label>
        <p className="TextField__error"></p>
    </div>
  )
}

export default TextField;