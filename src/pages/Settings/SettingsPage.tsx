import React from 'react';
import { Box, Grid, Text, Flex } from '@chakra-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LeftContainer,
  RightContainer,
} from '../../components/AppLayoutContainers';
import { useAppSelector } from '../../redux/hooks';
import { Avatar } from '../../components/Ui';

const SettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const { name } = useAppSelector((state) => state.sessionSlice);
  return (
    <>
      <Grid templateColumns="30% 70%" height="100vh" overflow="hidden">
        <LeftContainer>
          <Box p="10px">
            <Text fontWeight={700} fontSize="15px">
              Settings
            </Text>
            <Flex
              my="10px"
              bg={
                pathName === '/settings/profile'
                  ? 'sideBar.selected'
                  : 'brand.gray'
              }
              p="10px"
              borderRadius="10px"
              alignItems="center"
              cursor="pointer"
              onClick={() => navigate('/settings/profile')}
            >
              <Avatar name={name} />
              <Text fontSize="20px" fontWeight={500}>
                {name}
              </Text>
            </Flex>
          </Box>
        </LeftContainer>
        <RightContainer>
          <Outlet />
        </RightContainer>
      </Grid>
    </>
  );
};

export default SettingsPage;
