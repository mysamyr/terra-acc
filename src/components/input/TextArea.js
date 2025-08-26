const TextArea = ({ header, reference }) => (
  <div className="input-container">
    {header && <h2>{header}</h2>}
    <textarea ref={reference}></textarea>
  </div>
);

export default TextArea;
