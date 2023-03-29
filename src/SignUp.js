import React, { useState } from "react";
import "./signup.css";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [telephone, setTelephone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const bcrypt = require("bcryptjs");

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // TODO: Send sign up data to backend
    const data = {
      firstName,
      lastName,
      role,
      email,
      organization,
      telephone,
      username,
      password: hashedPassword,
    };

    console.log("hmm", data);
    try {
      const response = await fetch("https://sq1ide44oc.execute-api.us-east-1.amazonaws.com/Prod/signup", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result.message); // should log "Data saved to S3"
      console.log("form submitted!");

      setFirstName("");
      setLastName("");
      setRole("buyer");
      setEmail("");
      setOrganization("");
      setTelephone("");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="names">
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label className="names1">
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>

      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="buyer">Buyer</option>
          <option value="supplier">Supplier</option>
        </select>
      </label>
      <label>
        Email address:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          onBlur={(e) => {
            if (!validateEmail(e.target.value)) {
              alert("Invalid email format");
              e.target.value = "";
            }
          }}
        />
      </label>

      <div className="org">
        <label>
          Organisation:
          <input
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </label>
        <label className="org1">
          Telephone:
          <input
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </label>
      </div>

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          onBlur={(e) => {
            if (!validatePassword(e.target.value)) {
              alert("Password must be at least 8 characters long");
              e.target.value = "";
            }
          }}
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
