import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export const DocumentMenu = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <>
      <IconButton
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{ width: "40px", height: "40px" }}
      >
        <MoreVert />
      </IconButton>

      <Menu open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        <MenuItem onClick={() => {}}></MenuItem>
      </Menu>
    </>
  );
};
