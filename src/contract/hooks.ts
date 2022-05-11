import { useEffect, useRef, useCallback, useState } from 'react';
import { useContractFunction as useDappContractFunction, TransactionStatus, TransactionState } from '@usedapp/core';
import { useSnackbar, VariantType } from 'notistack';
import { contract } from './index';
import axios from 'axios';

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
            'Exception': {
                msg: state.errorMessage ?? 'An unexpected error occurred', variant: 'error'
            },
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

export const useGetFileToken = (tokenId?: string) => {
    const { enqueueSnackbar } = useSnackbar();
    const [fileUrl, setFileUrl] = useState('');
    const { send } = useContractFunction('tokenURI', async (status) => {
        try {
            const res = await axios.get(status.transaction as any);
            setFileUrl(res.data.file);
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Failed to get File', { variant: 'error' });
        }
    }, 'Mining');

    useEffect(() => {
        (async () => {
            try {
                if (!tokenId) return;
                await send(tokenId);
            } catch (error) {
                console.log(error);
                enqueueSnackbar('Could not get token info', { variant: 'error' });
            }
        })();
    }, [send, tokenId]);


    return { send, fileUrl };
}
