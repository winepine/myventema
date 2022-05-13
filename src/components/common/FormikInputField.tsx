import { InputProps } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { useEffect } from "react";
import { forwardRef } from "react";
import { IconType } from "react-icons";
import CustomInputField from "./CustomInputField";


interface FormikInputFieldProps extends InputProps {
    formik: FormikProps<any>
    name: string
    label?: string
    IconRight?: IconType
    isRequired?: boolean
}
const FormikInputField = forwardRef<HTMLInputElement, FormikInputFieldProps>(({ isRequired, formik, name, label, IconRight, ...restProps }, ref) => {
    return (
        <CustomInputField 
        ref={ref}
        label={label}
        name={name}
        IconRight={IconRight}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        focusBorderColor={formik.errors[name] && formik.touched[name] && "crimson"}
        borderColor={(formik.errors[name] && formik.touched[name]) ? "crimson" : "inherit"}
        error={(formik.errors[name] && formik.touched[name]) && formik.errors[name]}
        autoFocus={formik.errors[name] && formik.touched[name] ? true : false}
        isRequired={isRequired}
        {...restProps}
        />
    )
})

export default FormikInputField;