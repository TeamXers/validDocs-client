import { FormHelperText, TextField, TextFieldProps,Box } from "@mui/material";
import {  HTMLInputTypeAttribute } from "react";
import { useFormikContext } from "formik";
import * as yup from "yup";

export interface IField {

  name: string;
  label?: string;
  placeholder?:string;
  type?: HTMLInputTypeAttribute | "amount";
  multiline?: boolean;
  endAdornment?: React.ReactNode;
  initialValue?: any;
  validator?: yup.AnySchema;
  customStyle?: any;
  customErrorStyle?:any
}

export interface IFieldsProps {
  fields: IField[];
}

export const Fields: React.FC<IFieldsProps> = ({ fields }) => {
  const { errors, values, handleChange, handleBlur } = useFormikContext<any>();
  const DEFAULT_STYLE = { mt: 2, mb: 1, width: "100%" }
  const DEFAULT_ERROR_STYLE = {mb: 2, width: "100%"}
  return (
    <>
      {fields.map((field) => (
        <Box key={field.name} sx={{position:"relative"}}>
          {(
            {
              amount: (
                <AmountField
                  name={field.name}
                  label={field.label}
                  sx={{ mt: 2, mb: 1, width: "100%" }}
                />
              ),
            } as any
          )[field.type ?? "any"] ?? (
              <TextField
                name={field.name}
                label={field.label}
                value={values[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                type={field.type}
                multiline={field.multiline}
                rows={4}
                placeholder={field.placeholder}
                InputProps={{
                  endAdornment: field.endAdornment,
                }}
                sx={{...DEFAULT_STYLE, ...field.customStyle}}

            />
          )}

          <FormHelperText sx={{...DEFAULT_ERROR_STYLE, ...field.customErrorStyle}} error>
            {errors[field.name]}
          </FormHelperText>
        </Box>
      ))}
    </>
  );
};

function format(value: string | number) {
  if ((value as string).charAt) {
    value = Number.parseFloat(value as string);
  }

  if (Number.isNaN(value)) return "";

  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2 }).format(
    value as number
  );
}

const AmountField: React.FC<TextFieldProps & { name: string }> = ({
  name,
  ...rest
}) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<any>();
  const formattedField = `${name}__formatted`;

  return (
    <TextField
      {...rest}
      name={name}
      value={values[formattedField] ?? format(values[name])}
      onChange={(e) => {
        const value = e.target.value;
        const regex = /^([0-9]+(\.)[0-9]*)$|^([0-9]*)$/g;

        if (!regex.test(value)) return;

        setFieldValue(formattedField, value);
        setFieldValue(name, value ? Number.parseFloat(value) : 0);
      }}
      onBlur={(e) => {
        setFieldValue(formattedField, format(e.target.value));
        setFieldTouched(name, true);
      }}
    />
  );
};
