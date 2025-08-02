import React, { useState } from "react";

function Form() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();

    console.log(input);

    setInput({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <input type="text" placeholder="Enter Your Name" />
        <br />
        <br />
        <input type="email" placeholder="Enter Your Email" />
        <br />
        <br />
        <input type="password" placeholder="Enter Your Password" />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
