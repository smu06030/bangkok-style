
const SignInputs = ({ idInputs, setIdInputs, element }) => {
  const { label, name, type, placeholder } = element;

  const inputOnChange = (event) => {
    const { name, value } = event.target;
    setIdInputs((prev) => {
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
        value={idInputs[name]}
        onChange={(e) => inputOnChange(e)}
      />
    </>
  );
};

export default SignInputs;
