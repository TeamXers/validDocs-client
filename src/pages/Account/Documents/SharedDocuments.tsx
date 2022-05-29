import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { GET_SHARED_DOCUMENTS } from "../../../api/validdocs";
import { Documents } from "../../../components/documents/Documents";
import { useAppState } from "../../../context/Provider";

export const SharedDocuments = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { state } = useAppState();
    const { data, isFetching } = useQuery(
        ["Docs", "Shared"], GET_SHARED_DOCUMENTS as any,
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
