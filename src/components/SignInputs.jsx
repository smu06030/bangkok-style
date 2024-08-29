const SignInputs = ({ inputs, setInputs, element }) => {
  const { label, name, type, placeholder } = element;

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
    </>
  );
};

export default SignInputs;
