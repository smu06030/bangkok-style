import { useEffect, useRef } from "react";
import styled from "styled-components";

const SignInput = ({ inputs, setInputs, label, name, type, placeholder, terms, firstFocus }) => {
  // input들을 제어하는 함수
  const inputOnChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // 첫 렌더링 시 포커스
  const renderingFocus = useRef();
  useEffect(() => {
    firstFocus && renderingFocus.current.focus();
  }, []);

  return (
    <SignFieldset>
      <legend style={{ margin: "0 0 8px" }}>{label}</legend>
      <StInput
        ref={renderingFocus}
        type={type}
        name={name}
        placeholder={placeholder}
        value={inputs[name]}
        onChange={(e) => inputOnChange(e)}
      />
      <SignUpAlert>{inputs[name].length > 0 && terms}</SignUpAlert>
    </SignFieldset>
  );
};

export default SignInput;

const StInput = styled.input`
  width: 434px;
  height: 28px;
  padding: 8px 0 8px 14px;
  font-size: 14px;
  border: solid 1px #dbdbdb;
  border-radius: 5px;
`;

const SignFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SignUpAlert = styled.p`
  height: 16px;
  color: red;
  padding-bottom: 14px;
`;
