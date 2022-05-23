import { Box, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { GET_ACCOUNT } from "../../api/validdocs";
import { UserAvatar } from "./UserAvatar";

interface AccountQuery {
  address?: string;
}

interface UserProps extends AccountQuery {
  showAvatar?: true;
}

export const User: React.FC<UserProps> = ({ showAvatar, ...query }) => {
  const { data } = useQuery(["account", query], GET_ACCOUNT, {
    placeholderData: [] as any,
  });

  const username = data[0]?.username;

  return (
    <>
      <UserAvatar username={username ?? ''} sx={{ mr: 2 }}  />
      <Box>
        <Typography sx={{ maxWidth: "10rem" }} noWrap>
          {data[0]?.username}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
          sx={{ maxWidth: "10rem" }}
          noWrap
        >
          {data[0]?.address}
        </Typography>
      </Box>
    </>
  );
};
