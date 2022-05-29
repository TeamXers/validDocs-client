import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { GET_DOCUMENTS } from "../../../api/validdocs";
import { Documents } from "../../../components/documents/Documents";
import { useAppState } from "../../../context/Provider";

export const YourDocuments = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { state } = useAppState();
    const query = useMemo(
        () => ({ authorAddress: state.walletAddress }),
        [state.walletAddress, state.authToken]
    );
    const { data, isFetching } = useQuery(
        ["Docs", query],
        GET_DOCUMENTS as any,
        {
            initialData: [] as any[],
            enabled: Boolean(state.walletAddress),
            retry: 3,
            onError: (error: any) => {
                enqueueSnackbar(error.message, { variant: "error" });
            },
        }
    );

    return <Documents isLoading={isFetching || !state.walletConnected} documents={data ?? []} />;
}
