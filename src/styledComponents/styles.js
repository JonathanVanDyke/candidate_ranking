import styled, { keyframes } from 'styled-components';

export const Page = styled.div`
  display: flex;
  padding: 10px;
  height: 100vh;
`

export const Dash = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const Label = styled.label`
  padding-bottom: 5px;
  font-size: 30px;
`

export const UserInput = styled.div`
  width: 50%;
  padding: 30px;
  background: rgba(0,0,0,0.8);
  border-radius: 20px;
  color: #fff;
  font: 18px Arial, sans-serif;
  visibility: ${props => props.out ? 'hidden' : 'visible'};
  animation: ${props => props.out ? fadeOut : fadeIn} 1s linear;
  transition: visibility 1s linear;
`


export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const Input = styled.input`
  outline: none;
  font-size: 30px;
`