import { Avatar, Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { GET_ACCOUNT } from "../../api/validdocs";

interface AccountQuery {
    address?: string
}

interface UserProps extends AccountQuery {
    showAvatar?: true
}

export const User: React.FC<UserProps> = ({ showAvatar, ...query }) => {
    const { data } = useQuery(['account', query],
        GET_ACCOUNT, { placeholderData: [] as any });

    const username = data[0]?.username;
    const avatar = username?.substr(0, 1);

    return <>
        <Avatar sx={{ ...{ ...stringAvatar(username ?? '') }, mr: 2 }}>{avatar}</Avatar>
        <Box>
            <Typography sx={{ maxWidth: '10rem' }} noWrap>
                {data[0]?.username}</Typography>
            <Typography color='textSecondary' variant='body2' sx={{ maxWidth: '10rem' }} noWrap>
                {data[0]?.address}</Typography>
        </Box>
    </>
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        bgcolor: stringToColor(name),
    };
}
