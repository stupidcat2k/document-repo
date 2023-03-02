import styled from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .right-container {
    display: flex;
    justify-content: space-between;
  }

  #menu {
    flex-grow: 70;
    /* border: 2px solid red; */
  }

  #user {
    justify-content: end;
    min-width: 10rem;
    flex-grow: 30;
    /* border: 2px solid yellow; */
  }
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  border: none;

  p {
    text-align: center;
    margin: auto;
  }
`;
