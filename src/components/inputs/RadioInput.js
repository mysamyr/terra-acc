import { v4 } from 'uuid';

const RadioInput = ({ header, config, selectedType, setType }) => (
  <div className="input-container">
    <h2>{header}</h2>

    {config.map(({ name, type }) => (
      <label key={v4()}>
        {name}
        <input
          type="radio"
          checked={selectedType === type}
          onChange={() => setType(type)}
        />
      </label>
    ))}
  </div>
);

export default RadioInput;
