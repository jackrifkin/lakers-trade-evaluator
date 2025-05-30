const Dialogue = ({
  text,
  callback,
}: {
  text: string;
  callback: (result: boolean) => void;
}) => {
  return (
    <div className="dialogue-container">
      <div className="dialogue">
        <p>{text}</p>
        <div className="dialogue-button-container">
          <button className="cancel-button" onClick={() => callback(false)}>
            Cancel
          </button>
          <button className="confirm-button" onClick={() => callback(true)}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialogue;
