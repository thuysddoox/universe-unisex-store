import styled from "@emotion/styled";


export const StyledImage = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  object-fit: cover;
`;