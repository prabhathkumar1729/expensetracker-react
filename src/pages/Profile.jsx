import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Avatar, Button } from "@mui/material";
import UpdatePasswordDialog from "../components/UpdatePasswordDialog";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [isUpdatePasswordDialogOpen, setIsUpdatePasswordDialogOpen] =
    React.useState(false);

  const handleOpenUpdatePasswordDialog = () => {
    setIsUpdatePasswordDialogOpen(true);
  };

  const handleCloseUpdatePasswordDialog = () => {
    setIsUpdatePasswordDialogOpen(false);
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        py={4}
      >
        <Avatar
          alt="User Avatar"
          src="https://s.yimg.com/ny/api/res/1.2/kwUySU9SFW2HWD8YOnO1lQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM1Mg--/https://media.zenfs.com/en/investorplace_417/6547c6454ca0f10863600fc11f05832d"
          sx={{ width: 200, height: 200 }}
        />
        <Typography variant="h5" mt={2}>
          {user.Name}
        </Typography>
        <Typography variant="body1" mt={1}>
          {user.Email}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          mt={2}
          onClick={handleOpenUpdatePasswordDialog}
          sx={{ margin: "20px" }}
        >
          Update Password
        </Button>
      </Box>

      <UpdatePasswordDialog
        open={isUpdatePasswordDialogOpen}
        onClose={handleCloseUpdatePasswordDialog}
        email={user.Email}
      />
    </Box>
  );
};

export default Profile;
