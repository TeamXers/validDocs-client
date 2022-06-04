import { useMemo } from "react";
import { Formik, Form as FormikForm } from "formik";
import * as yup from "yup";
import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { Fields, IFieldsProps } from "./Fields";

export interface FormProps<T = any> extends IFieldsProps {
  onSubmit: (values: T) => Promise<void> | void;
  showSnackbar?: boolean;
  className?:string
}

export const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  children,
  showSnackbar,
  className
}) => {
  const initialValues = useMemo(
    () =>
      fields.reduce(
        (obj, cur) => ({ ...obj, [cur.name]: cur.initialValue }),
        {}
      ),
    [fields]
  );
  const validationSchema = useMemo(
    () =>
      yup.object(
        fields.reduce((obj, cur) => ({ ...obj, [cur.name]: cur.validator }), {})
      ),
    [fields]
  );
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          await onSubmit(values);
          // actions.resetForm();
          if (showSnackbar) enqueueSnackbar("Success", { variant: "success" });
        } catch (error: any) {
          enqueueSnackbar(error.message, { variant: "error" });
        }
      }}
    >
      <FormikForm className={className}>
        <Fields fields={fields} />
        {children}
      </FormikForm>
    </Formik>
  );
};

export const SpinnerButton: React.FC<ButtonProps & { loading: boolean }> = ({
  loading,
  ...rest
}) => (
  <Button
    disabled={loading}
    startIcon={loading && <CircularProgress size={20} color="inherit" />}
    {...rest}
  />
);
