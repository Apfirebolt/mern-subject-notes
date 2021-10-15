import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../actions/authActions";
import { Link as ReachLink } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Link,
  Heading,
  Flex,
  useToast,
} from "@chakra-ui/react";

const HeaderComponent = () => {
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const toast = useToast();
  
  const gotoLink = (link) => {
    if (link) {
      history.push('/' + link)
    }
  }

  const logoutFunction = () => {
    toast({
      title: 'Logged out successfully',
      status: 'success',
      isClosable: true,
    })
    dispatch(logout());
  }

  return (
    <Box p={4} bg="gray">
      {userInfo ? (
        <Menu>
          <Flex>
            <Heading as="h4" size="md" color="white" m={2}>
              Welcome, {userInfo.username}
            </Heading>
            <MenuButton as={Button}>Actions</MenuButton>
          </Flex>
          <MenuList>
            <MenuItem>
              <Link as={ReachLink} to="/subjects">
                Subjects
              </Link>
            </MenuItem>
            <MenuItem>
              <Link as={ReachLink} to="/subjects/add">
                Add Subject
              </Link>
            </MenuItem>
            <MenuItem onClick={() => logoutFunction()}>Log out</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Menu>
          <MenuButton as={Button} m={1} onClick={() => gotoLink('login')}>
            Login
          </MenuButton>
          <MenuButton as={Button} m={1} onClick={() => gotoLink('register')}>
            Register
          </MenuButton>
        </Menu>
      )}
    </Box>
  );
};

export default HeaderComponent;
