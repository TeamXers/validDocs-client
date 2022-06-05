import { useCallback, useState } from "react";
import { Box, ButtonBase, Checkbox, Container, FormControlLabel, Typography } from "@mui/material";
import { PictureAsPdf } from "@mui/icons-material";
import { Field, FieldProps, useField } from "formik";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { IField } from "../../../components/forms/Fields";
import { Form, SpinnerButton } from "../../../components/forms/Form";
import { AppBreadcrumbs } from "../../../components/Breadcrumbs";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useContractFunction } from "../../../contract/hooks";
import { POST_DOCUMENT, POST_DOC_FILE } from "../../../api/validdocs";
import { useAppState } from "../../../context/Provider";

const FIELDS: IField[] = [
  {
    name: "name",
    label: "Document Name",
    initialValue: "",
    validator: yup.string().required("Give your document a name!"),
  },
  {
    name: "description",
    label: "Description",
    multiline: true,
    initialValue: "",
    validator: yup.string(),
  },
];

export const CreateDocument = () => {
  const { state } = useAppState();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [pendingDoc, setPendingDoc] = useState<any>(null);

  const { send } = useContractFunction("mintDocument", async (status) => {
    if (!pendingDoc) return;
    if (!status.receipt) return;
    let tokenId = (status.receipt as any).events[0].args.tokenId;
    tokenId = Number.parseInt(tokenId);
    await POST_DOCUMENT({
      ...pendingDoc,
      tokenId,
      tranxHash: status.transaction?.hash,
    });
    navigate(`/account/documents/${tokenId}`);
  }, { verbose: true });

  const { mutate: saveDoc, isLoading } = useMutation(POST_DOC_FILE, {
    onSuccess: async (data: any, document: any) => {
      try {
        if (state.walletAddress && data.metadataHash) {
          setPendingDoc(document);
          await send(
            state.walletAddress,
            `https://gateway.pinata.cloud/ipfs/${data.metadataHash}`
          );
        } else {
          enqueueSnackbar("Failed to mint token", { variant: "error" });
        }
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const onSubmit = useCallback(
    async (values: any) => {
      saveDoc({
        ...values, isPublic: values.isPublic?.[0] === 'on' ? true : false,
        authorAddress: state.account?.address
      });
    },
    [saveDoc, state]
  );

  return (
    <Box bgcolor="white" minHeight={"100vh"}>
      <Header />

      <Container sx={{ py: 8 }}>
        <AppBreadcrumbs
          sx={{ mb: 2 }}
          links={[
            { title: "Account" },
            { title: "Documents", link: "/account/documents" },
            { title: "New Document" },
          ]}
        />

        <Typography variant="h2" sx={{ mb: 6 }}>
          Create a new Document
        </Typography>

        <Box maxWidth="50rem">
          <Form fields={FIELDS} onSubmit={onSubmit}>
            <DocFileInput name="document" />

            <Field name='isPublic'>
              {({ field }: FieldProps) =>
                <FormControlLabel
                  control={<Checkbox
                    name={field.name}
                    checked={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    sx={{ fontSize: 20 }} />}
                  label="Is this document open to the public"
                  sx={{ display: 'block', mb: 4 }} />}
            </Field>

            <SpinnerButton
              loading={isLoading}
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </SpinnerButton>
          </Form>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

const DocFileInput: React.FC<Pick<IField, "name">> = ({ name }) => {
  const [field, meta, helpers] = useField(name);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDropAccepted: (files) => {
      helpers.setValue(files[0]);
    },
    accept: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/pdf",
      "	application/vnd.ms-excel",
      "text/plain",
      "application/vnd.ms-powerpoint",
      "image/jpeg",
      "image/png",
    ],
  });

  return (
    <ButtonBase
      {...getRootProps({ className: "dropzone" })}
      onFocus={() => {
        helpers.setTouched(true);
      }}
      sx={{
        display: "block",
        border: "2px dashed #eeeeee",
        borderRadius: "10px",
        bgcolor: "#fafafa",
        color: "#bdbdbd",
        textAlign: "center",
        width: "100%",
        height: "10rem",
        mb: 2,
        transition: "border-color ease-in-out 200ms",
        ["&:hover"]: {
          borderColor: "primary.main",
        },
      }}
    >
      <input {...getInputProps()} />

      {field.value && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="black"
        >
          <PictureAsPdf />{" "}
          <Typography sx={{ ml: 2 }}>{field.value.name}</Typography>
        </Box>
      )}
      {!field.value && (
        <>
          <Typography>
            Drag 'n' drop some files here, or click to select files
          </Typography>
          <Typography sx={{ fontSize: "10px", color: "#707070" }}>
            {"*"} PDF, DOC, DOCX, XLS, TXT, PPT, JPG, JPEG, and PNG (max 20mb)
          </Typography>
        </>
      )}
    </ButtonBase>
  );
};
