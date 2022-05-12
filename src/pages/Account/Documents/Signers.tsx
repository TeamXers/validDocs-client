import { useEffect, useState } from "react";
import { ContentCopy } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { useSnackbar } from "notistack";
import { GET_SIGN_INVITE } from "../../../api/validdocs";
import { useContractFunction } from "../../../contract/hooks";
import { User } from "../../../components/queries/Accounts";

export interface AddSignerProps {
  children: (toggle: () => void) => React.ReactNode;
  tokenId: string;
}

export const AddSigner: React.FC<AddSignerProps> = ({ children, tokenId }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading } = useQuery(
    ["sign-invite", tokenId],
    GET_SIGN_INVITE,
    { placeholderData: { inviteId: "" } as any, enabled: open }
  );
  const url = `${process.env.REACT_APP_BASE_URL}account/invitations/sign/${data?.inviteId}`;

  return (
    <>
      {children(toggle)}
      <Dialog open={open} onClose={toggle}>
        <DialogTitle>Invite a Signer</DialogTitle>

        <DialogContent>
          <Typography variant="body2">
            Invite anyone to sign this document with this link
          </Typography>
          <ButtonBase
            onClick={async () => {
              try {
                if (isLoading) return;
                await navigator.clipboard.writeText(url);
                enqueueSnackbar("Copied to clipboard", { variant: "success" });
              } catch (e: any) {
                enqueueSnackbar(e.message);
              }
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1,
              mt: 1,
              border: "1px solid #cccccc",
              borderRadius: "4px",
            }}
          >
            <Typography noWrap sx={{ width: "80%", maxWidth: "400px" }}>
              {url}
            </Typography>

            {isLoading ? (
              <CircularProgress color="primary" size={20} sx={{ ml: 2 }} />
            ) : (
              <ContentCopy sx={{ ml: 2 }} />
            )}
          </ButtonBase>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface SignersProps {
  documentTokenId: string;
}

export const Signers: React.FC<SignersProps> = ({ documentTokenId }) => {
  const [signers, setSigners] = useState([]);
  const { send } = useContractFunction(
    "getSigners",
    (status) => {
      setSigners((status.transaction as any) ?? []);
    },
    {
      successState: "Mining",
      verbose: false,
    }
  );

  useEffect(() => {
    send(documentTokenId);
  }, [documentTokenId]);

  return (
    <>
      {signers.map((signer: any, index: number) => (
        <Box key={index} display="flex" alignItems={"center"} sx={{ mb: 2 }}>
          <User address={signer} />
        </Box>
      ))}
    </>
  );
};
