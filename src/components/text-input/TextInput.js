import './TextInput.css';

const TextInput = ({header, reference}) => {
  return <div className="text-input">
    <h2>{header}</h2>
    <input type="text" ref={reference}/>
  </div>;
};

export default TextInput;
