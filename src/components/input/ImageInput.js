const ImageInput = ({ name, setImg }) => (
  <div className="input-container">
    <h2>{name}:</h2>
    <input
      type="file"
      accept="image/png"
      onInput={e => setImg(e.target.files[0])}
    />
  </div>
);

export default ImageInput;
