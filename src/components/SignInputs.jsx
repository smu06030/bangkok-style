import styled from "styled-components";

const SignInput = ({ inputs, setInputs, label, name, type, placeholder, terms }) => {
  // input들을 제어하는 함수
  const inputOnChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <>
      <legend>{label}</legend>
      <input
        style={inputStyle}
        type={type}
        name={name}
        placeholder={placeholder}
        value={inputs[name]}
        onChange={(e) => inputOnChange(e)}
      />
      <SignUpAlert>{inputs[name].length > 0 && terms}</SignUpAlert>
    </>
  );
};

export default SignInput;

const inputStyle = { with: "500px" }

const SignUpAlert = styled.p`
  color: red;
`;
