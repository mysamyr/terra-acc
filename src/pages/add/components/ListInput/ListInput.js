import './ListInput.css';

const ListInput = ({ header, list, setList }) => {
  const onChange = (value, index) => {
    setList(prevState => {
      prevState[index] = value;
      return [...prevState];
    });
  };
  const onClickAddRow = () => {
    setList(prevState => [...prevState, '']);
  };
  const onClickDeleteRow = index => {
    setList(prevState => prevState.filter((_, idx) => idx !== index));
  };

  const inputs = list.map((item, index) => (
    <div
      key={index}
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <input
        type="text"
        onChange={e => onChange(e.target.value, index)}
        value={item}
      />
      <div
        className="icon-button remove-row"
        onClick={() => onClickDeleteRow(index)}
      >
        &times;
      </div>
    </div>
  ));

  return (
    <div style={{ width: '50%' }}>
      <h2>{header}</h2>
      {inputs}
      <div className="icon-button add-row" onClick={onClickAddRow}>
        +
      </div>
    </div>
  );
};

export default ListInput;
