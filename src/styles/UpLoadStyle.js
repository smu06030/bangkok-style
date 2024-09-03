import styled from "styled-components";

export const UpLoadContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 0px 500px;
`;

export const ImagesDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Img = styled.img`
  margin: 10px;
  height: 250px;
  width: 350px;
  border-radius: 5px;
`;

export const P = styled.p`
  margin-bottom: 20px;
  font-size: large;
  font-weight: bold;
`;

export const InputTitle = styled.input`
  width: 100%;
  border-radius: 5px;
  border-style: none;
  background-color: #eeeeee;
  height: 50px;
  padding: 0px 10px;
  /* &:invalid{
    border-color: red; 
  } */
  /* &:invalid{
    border-color: red; 
  } */
`;

export const InputTextarea = styled.textarea`
  width: 100%;
  border-radius: 5px;
  border-style: none;
  background-color: #eeeeee;
  height: 80px;
  padding: 10px;
  resize: none;
`;

export const HashInput = styled.input`
  width: 100%;
  border-radius: 5px;
  border-style: none;
  background-color: #eeeeee;
  height: 20px;
  padding: 10px;
  margin-bottom: 30px;
`;

export const Span = styled.span`
  background-color: #eeeeee;
  border-radius: 5px;
  padding: 7px 15px;
  margin-bottom: 10px;
`;

export const ButtonX = styled.button`
  border-style: none;
  /* background-color: white; */
  margin-left: 5px;
`;

export const BtnDiv = styled.div`
  /* border: 1px solid gray; */
  padding: 10px 0px;
  text-align: right;
`;

export const Button = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 5px;
  border-style: none;
  background-color: #eeeeee;
  position: relative;
  left: 20px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
  }
`;
