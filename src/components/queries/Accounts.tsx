import { useQuery } from "react-query";
import { GET_ACCOUNT } from "../../api/validdocs";

interface AccountQuery {
    address?: string
}

export const Username: React.FC<AccountQuery> = ({ ...query }) => {
    const { data } = useQuery(['account', query],
        GET_ACCOUNT, { placeholderData: [] as any });

    return data[0]?.username;
}
