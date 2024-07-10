
interface PartnerProps {
    id: number;
    initialPercentage: number;
    calculatedPercentage: number|undefined;
    onRemove: (id: number) => void;
    onChange: (id: number, value: number) => void;
  }
  
  const Partner: React.FC<PartnerProps> = ({ id, initialPercentage, calculatedPercentage, onRemove, onChange }) => {
    return (
      <div className="textbox-container">
        <text className="partner-label">Initial shares percentage partner {id}</text>
        <button className="minus-button" onClick={() => onRemove(id)}>
          -
        </button>
        <input
          type="number"
          value={initialPercentage}
          onChange={(e) => onChange(id, Number(e.target.value))}
          className="number-input"
        />
        <text className="percentage-label">%</text>
        
        {calculatedPercentage != undefined &&
        <div>
            <text className="newpartner-label">{calculatedPercentage}</text>
            <text className="newpercentage-label">%</text>
        </div>
        }
      </div>
    );
  };

export default Partner;