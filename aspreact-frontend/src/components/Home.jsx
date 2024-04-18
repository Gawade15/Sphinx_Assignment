import React, { useState } from 'react';
import './styles.css'; // Make sure to include the styles.css file in your project

const ExperimentTracker = () => {
  const [stagesData, setStagesData] = useState(stages);

  const handleAddColumnBefore = (stageIndex, stepIndex) => {
    const updatedStages = [...stagesData];
    if (stageIndex === 1 && updatedStages[1].steps.length >= 4) {
      alert('Maximum 4 columns allowed for Stage 2!');
      return;
    } else if (stageIndex === 0 && updatedStages[0].steps.length >= 1) {
      alert('No columns can be added for Stage 1!');
      return;
    }
    updatedStages[stageIndex].steps.splice(stepIndex, 0, {
      number: updatedStages[stageIndex].steps.length + 1,
      temperature: 95.0,
      duration: '03:00',
    });
    setStagesData(updatedStages);
  };

  const handleAddColumnAfter = (stageIndex, stepIndex) => {
    const updatedStages = [...stagesData];
    if (stageIndex === 1 && updatedStages[1].steps.length >= 4) {
      alert('Maximum 4 columns allowed for Stage 2!');
      return;
    } else if (stageIndex === 0 && updatedStages[0].steps.length >= 1) {
      alert('No columns can be added for Stage 1!');
      return;
    }
    updatedStages[stageIndex].steps.splice(stepIndex + 1, 0, {
      number: updatedStages[stageIndex].steps.length + 1,
      temperature: 95.0,
      duration: '03:00',
    });
    setStagesData(updatedStages);
  };

  const handleDeleteColumn = (stageIndex, stepIndex) => {
    const updatedStages = [...stagesData];
    updatedStages[stageIndex].steps.splice(stepIndex, 1);
    setStagesData(updatedStages);
  };

  return (
    <div className="experiment-tracker">
      {stagesData.map((stage, index) => (
        <Stage
          key={index}
          stage={stage}
          onAddColumnBefore={(stepIndex) => handleAddColumnBefore(index, stepIndex)}
          onAddColumnAfter={(stepIndex) => handleAddColumnAfter(index, stepIndex)}
          onDeleteColumn={(stepIndex) => handleDeleteColumn(index, stepIndex)}
        />
      ))}
    </div>
  );
};

const Stage = ({ stage, onAddColumnBefore, onAddColumnAfter, onDeleteColumn }) => {
  return (
    <div className="stage">
      <h5>{stage.name}</h5>
      <div className="stage-content">
        {stage.steps.map((step, index) => (
          <Step
            key={index}
            step={step}
            onAddColumnBefore={() => onAddColumnBefore(index)}
            onAddColumnAfter={() => onAddColumnAfter(index)}
            onDeleteColumn={() => onDeleteColumn(index)}
          />
        ))}
      </div>
    </div>
  );
};

const Step = ({ step, onAddColumnBefore, onAddColumnAfter, onDeleteColumn }) => {
  return (
    <div className="step d-flex flex-row" >
      <div className="step-info">
        <p> {step.temperature}°,  {step.duration}</p>
        <button className="btn btn-primary" onClick={onAddColumnBefore}>
          Before
        </button>
        <button className="btn btn-primary" onClick={onAddColumnAfter}>
          After
        </button>
      <button className="btn btn-danger" onClick={onDeleteColumn}>
        Delete Step
      </button>
      </div>
    </div>
  );
};

const stages = [
  {
    name: 'Stage 1 : HOLDING ',
    steps: [
      { number: 1, temperature: 95.0, duration: '03:00' },
    //   { number: 2, temperature: 95.0, duration: '00:30' },
    //   { number: 3, temperature: 90.0, duration: '00:30' },
    ],
  },
  {
    name: 'Stage 2 : CYCLING 40x ',
    steps: [
      { number: 1, temperature: 95.0, duration: '03:00' },
      { number: 2, temperature: 95.0, duration: '00:30' },
    ],
  },
  {
    name: 'Stage 3 : MELT CURVE ',
    steps: [
      { number: 1, temperature: 95.0, duration: '03:00' },
      { number: 2, temperature: 95.0, duration: '00:30' },
      { number: 3, temperature: 60.0, duration: '00:30' },
    ],
  },
];

export default ExperimentTracker;