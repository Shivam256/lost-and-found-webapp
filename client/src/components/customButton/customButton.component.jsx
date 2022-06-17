import React from 'react';
import {Button,styled} from '@mui/material';

const StyledButton = styled(Button)(()=>({
    width:'95%',
    height:'fit-content',
    backgroundColor:'#6C63FF',
    color:'#fff',
    fontSize:'1.2em',
    padding:'10px 20px',
    borderRadius:10,
    fontWeight:700,
    '&:hover':{
        backgroundColor:'#6C63FF',
        color:'#fff',
    }
}))


const CustomButton = ({children,...props}) => {
  return (
    <StyledButton {...props} >
        {children}
    </StyledButton>
  )
}

export default CustomButton