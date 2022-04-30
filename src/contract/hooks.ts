import { useEffect, useRef, useCallback } from 'react';
import { useContractFunction as useDappContractFunction, TransactionStatus, TransactionState } from '@usedapp/core';
import { useSnackbar, VariantType } from 'notistack';
import { contract } from './index';

export const useContractFunction = (
  functionName: string,
  onSuccess: (status: TransactionStatus) => void,
  successState: TransactionState = "Success"
) => {
    const { enqueueSnackbar } = useSnackbar();
    const { state, send, resetState } = useDappContractFunction(contract, functionName);
    const previousState = useRef('');
    const active = useRef(false);

    useEffect(() => {
        if (!active.current) return;
        if (state.status === previousState.current) return;
        previousState.current = state.status;

        if (state.status === 'None') return;

        const message = {
            'PendingSignature': { msg: 'Complete the transaction in Metamask', variant: 'info' },
            'Mining': { msg: 'Transaction sent', variant: 'info' },
            'Success': { msg: 'Transaction complete!', variant: 'success' },
            'Fail': { msg: 'Transaction failed!', variant: 'error' },
            'Exception': { msg: 'An unexpected error occurred', variant: 'error' },
            [successState]: { msg: 'Transaction complete!', variant: 'success' },
        }[state.status] as { msg: string, variant: VariantType };

        if (state.status === successState) {
            onSuccess(state);
        }

        enqueueSnackbar(message.msg, { variant: message.variant });

        if (['Success', 'Fail', 'Exception', successState].includes(state.status)) {
            resetState();
            active.current = false;
        }
    }, [onSuccess, state, send]);

    const doSend = useCallback((...args: any[]) => {
        active.current = true;
        return send(...args);
    }, [send]);

    return { send: doSend };
}
