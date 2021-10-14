import React from 'react'
import { Box, Text, Center, useColorModeValue } from '@chakra-ui/react'

const FooterComponent = () => {

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      p={5}>
      <Center>
        <Text as={'span'} color={'green.400'}>
            Copyright@ MERN Subject Notes, All rights reserved 2021
        </Text>
      </Center>
    </Box>
  )
}

export default FooterComponent
