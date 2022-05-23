import { Avatar, AvatarProps } from "@mui/material";

export const UserAvatar: React.FC<{ username: string } & AvatarProps> = ({ username, sx, ...props }) => {
    const avatar = username?.substring(0, 1);
    return <Avatar sx={{ ...stringAvatar(username ?? ""), ...sx }}>
        {avatar}
    </Avatar>
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

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
