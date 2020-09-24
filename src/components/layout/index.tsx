import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';


const Layout = ({ children }) => {
  const [showCookieConsent, setShowCookieConsent] = useState<boolean>(true);

  useEffect(() => {

  }, []);
  const handleCookieAccept = () => {
    setShowCookieConsent(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      justifyContent="space-between"
    >
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
