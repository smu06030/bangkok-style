import styled from "styled-components";

const SignInputs = ({ inputs, setInputs, element }) => {
  const { label, name, type, placeholder, terms } = element;

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

export default SignInputs;

const SignUpAlert = styled.p`
  color: red;
`;
