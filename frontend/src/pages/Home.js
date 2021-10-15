import React, { Fragment } from "react";
import { useSelector } from 'react-redux';
import { Center, Button } from "@chakra-ui/react";
import Loader from '../components/common/Loader'

const HomePage = () => {

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, loading } = userLogin
  console.log('userinfo is', userInfo)

  return (
    <>
      <h1>Home Page</h1>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <p>Home page content is here</p>
        </Fragment>
      )}
    </>
  );
};

export default HomePage;
