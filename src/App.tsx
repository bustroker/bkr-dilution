import React, { useState } from 'react';
import './App.css';
import Partner from "./Partner"

const App: React.FC = () => {
  const [partners, setPartners] = useState<{ id: number; initialPercentage: number, calculatedPercentage: number|undefined }[]>([{id: 1, initialPercentage: 100, calculatedPercentage: undefined}]);
  const [newPartnerSharesPercentage, setNewPartnerSharesPercentage] = useState<number>(0); // State for the additional numeric textbox


  const addPartner = () => {
    setPartners([...partners, { id: partners.length + 1, initialPercentage: 0, calculatedPercentage: undefined }]);
  };

  const removePartner = (id: number) => {
    setPartners(partners.filter((textbox) => textbox.id !== id));
  };

  const handleTextboxChange = (id: number, initialPercentage: number) => {
    setPartners(
      partners.map((textbox) => (textbox.id === id ? { ...textbox, initialPercentage } : textbox))
    );
  };

  const calculateFinalPercentage = (initialPercentage: number, newPartnerPercentage: number) => {

    const dilutionPercentage = newPartnerPercentage;
    const lostPercentage = initialPercentage * dilutionPercentage/100;
    return initialPercentage - lostPercentage;
  }

  const calculateWithDilution = (initialPercentage: number, newPartnerPercentage: number) => {
    const k: number = initialPercentage;    
    const n: number = newPartnerPercentage;

    const result = k*(1-n/100);
    return result;
  }

  const calculate = () => {

    const calculatedPartners = partners.map(partner => {
      partner.calculatedPercentage = calculateFinalPercentage(partner.initialPercentage, newPartnerSharesPercentage); 
      return partner;
    });
    console.log(JSON.stringify(calculatedPartners));

    setPartners(calculatedPartners);
  }

  const reset = () => {
    const resetPartners = partners.map(partner => {
      partner.calculatedPercentage = undefined; 
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
              calculatedPercentage={partner.calculatedPercentage}
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
