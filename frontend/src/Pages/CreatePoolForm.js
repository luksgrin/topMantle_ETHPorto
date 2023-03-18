import React, { useState } from "react";
import Create_Pool_Step_1 from "./Create_Pool_Step_1";
import Create_Pool_Step_2 from "./Create_Pool_Step_2";
import Create_Pool_Step_3 from "./Create_Pool_Step_3";
import Create_Pool_Step_4 from "./Create_Pool_Step_4";

function Create_Pool_Form() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tokens: [],
    fees: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTokenChange = (tokens) => {
    setFormData({ ...formData, tokens });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // replace with your form submission logic
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Create_Pool_Step_1
            formData={formData}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <Create_Pool_Step_2
            formData={formData}
            handleTokenChange={handleTokenChange}
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
          />
        );
      case 3:
        return (
          <Create_Pool_Step_3
            formData={formData}
            handleInputChange={handleInputChange}
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
          />
        );
      case 4:
        return (
          <Create_Pool_Step_4
            formData={formData}
            handleSubmit={handleSubmit}
            handlePrevStep={handlePrevStep}
          />
        );
      default:
        return null;
    }
  };

  return <form onSubmit={handleSubmit}>{renderStep()}</form>;
}

export default Create_Pool_Form;
