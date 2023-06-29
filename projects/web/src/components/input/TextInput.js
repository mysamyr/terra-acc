const TextInput = ({header, reference}) => {
  return <div className="input-container">
    <h2>{header}</h2>
    <input type="text" ref={reference}/>
  </div>;
};

export default TextInput;
