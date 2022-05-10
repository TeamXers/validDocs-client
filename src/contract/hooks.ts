import { useEffect, useRef } from "react";
import {
  useContractFunction as useDappContractFunction,
  TransactionStatus,
  TransactionState,
} from "@usedapp/core";
import { useSnackbar, VariantType } from "notistack";
import { contract } from "./index";

export const useContractFunction = (
  functionName: string,
  onSuccess: (status: TransactionStatus) => void,
  successState: TransactionState = "Success"
) => {
  const { enqueueSnackbar } = useSnackbar();
  const { state, send, resetState } = useDappContractFunction(
    contract,
    functionName
  );
  const previousState = useRef("");

  useEffect(() => {
    if (state.status === previousState.current) return;
    previousState.current = state.status;

    if (state.status === "None") return;

    const message = {
      PendingSignature: {
        msg: "Complete the transaction in Metamask",
        variant: "info",
      },
      Mining: { msg: "Transaction sent", variant: "info" },
      Success: { msg: "Transaction complete!", variant: "success" },
      Fail: { msg: "Transaction failed!", variant: "error" },
      Exception: { msg: "An unexpected error occurred", variant: "error" },
    }[state.status] as { msg: string; variant: VariantType };

    if (state.status === successState) {
      onSuccess(state);
    }

    enqueueSnackbar(message.msg, { variant: message.variant });

    if (["Success", "Fail", "Exception"].includes(state.status)) {
      resetState();
    }
  }, [onSuccess, state, send]);

  return { send };
};
