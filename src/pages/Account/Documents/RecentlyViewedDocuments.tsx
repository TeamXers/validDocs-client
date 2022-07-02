import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { GET_RECENTLY_VIEWED_DOCUMENTS } from "../../../api/validdocs";
import { Documents } from "../../../components/documents/Documents";
import { useAppState } from "../../../context/Provider";

export const RecentlyViewedDocuments = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { state } = useAppState();
    const { data, isFetching } = useQuery(
        ["Docs", "recently-viewed", state.authToken],
        GET_RECENTLY_VIEWED_DOCUMENTS as any,
        {
            initialData: [] as any[],
            enabled: Boolean(state.authToken),
            retry: 3,
            onError: (error: any) => {
                enqueueSnackbar(error.message, { variant: "error" });
            },
        }
    );

    return <Documents isLoading={isFetching || !state.walletConnected} documents={data ?? []} />;
}
