import React, { useState } from 'react';
import './App.css';

interface PartnerProps {
  id: number;
  initialPercentage: number;
  dilutedPercentage: number|undefined;
  onRemove: (id: number) => void;
  onChange: (id: number, value: number) => void;
}

const Partner: React.FC<PartnerProps> = ({ id, initialPercentage, dilutedPercentage, onRemove, onChange }) => {
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
      
      {dilutedPercentage != undefined &&
      <div>
          <text className="newpartner-label">{dilutedPercentage}</text>
          <text className="newpercentage-label">%</text>
      </div>
      }
    </div>
  );
};

const App: React.FC = () => {
  const [partners, setPartners] = useState<{ id: number; initialPercentage: number, dilutedPercentage: number|undefined }[]>([{id: 1, initialPercentage: 100, dilutedPercentage: undefined}]);
  const [newPartnerSharesPercentage, setNewPartnerSharesPercentage] = useState<number>(0); // State for the additional numeric textbox


  const addPartner = () => {
    setPartners([...partners, { id: partners.length + 1, initialPercentage: 0, dilutedPercentage: undefined }]);
  };

  const removePartner = (id: number) => {
    setPartners(partners.filter((textbox) => textbox.id !== id));
  };

  const handleTextboxChange = (id: number, initialPercentage: number) => {
    setPartners(
      partners.map((textbox) => (textbox.id === id ? { ...textbox, initialPercentage } : textbox))
    );
  };

  const applyDilution = (initialPercentage: number, newPartnerPercentage: number) => {
    const k: number = initialPercentage;    
    const n: number = newPartnerPercentage;

    const result = k*(1-n/100);
    return result;
  }

  const calculate = () => {

    const calculatedPartners = partners.map(partner => {
      partner.dilutedPercentage = applyDilution(partner.initialPercentage, newPartnerSharesPercentage); 
      return partner;
    });
    console.log(JSON.stringify(calculatedPartners));

    setPartners(calculatedPartners);
  }

  const reset = () => {
    const resetPartners = partners.map(partner => {
      partner.dilutedPercentage = undefined; 
      return partner;
    });
    console.log(JSON.stringify(resetPartners));

    setPartners(resetPartners);
  }

  return (
    <div className="App">
        <div className="textbox-list">
          {partners.map((partner) => (
            <Partner
              key={partner.id}
              id={partner.id}
              initialPercentage={partner.initialPercentage}
              dilutedPercentage={partner.dilutedPercentage}
              onRemove={removePartner}
              onChange={handleTextboxChange}
            />
          ))}
          <button className="add-button" onClick={addPartner}>
            +
          </button>
      </div>

      <div className="newpartner-container">       {/* <div className="newpartner-container"> */}
        <text className="newpartner-label">New partner percentage</text>
        <input
          type="number"
          value={newPartnerSharesPercentage}
          onChange={(e) => setNewPartnerSharesPercentage(Number(e.target.value))}
          className="number-input newpartner-number-input"
        />
        <text className="percentage-label">%</text>
      </div>

      <button className="calculate-button" onClick={calculate}>
        Calculate
      </button>
      <button className="calculate-button" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default App;
