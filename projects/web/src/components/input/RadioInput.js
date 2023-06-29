const RadioInput = ({header, config, selectedType, setType}) => {

  return (
    <div className="input-container">
      <h2>{header}:</h2>

      {config.map(({name, type}) =>
        <label>
          {name}
        <input type="radio"
               checked={selectedType === type}
               onChange={() => setType(type)}
        />
        </label>
      )}
  </div>
  );
};

export default RadioInput;