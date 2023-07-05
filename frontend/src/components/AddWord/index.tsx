import React, { useState, SyntheticEvent } from "react";
import { API_ADDWORD_URL } from "../../helpers/constants";
import { useNavigate } from "react-router-dom";

interface AddWordProps {
  loggedIn: boolean;
}

interface WordData {
  Data: string;
}

const AddWord: React.FC<AddWordProps> = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const wordRegex = /^[a-zA-Z]{5}$/;
    if (!wordRegex.test(word)) {
      console.error("The word should contain 5 English letters.");
      return;
    }

    try {
      const data: WordData = { Data: word };

      const response = await fetch(API_ADDWORD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage("Word successfully added!");
        setWord("");
      } else {
        console.error("Error adding the word to the database.", await response.text());
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleReturnToPreviousPage = () => {
    navigate(-1);
  };

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value.toLowerCase()); // Преобразование в маленькие буквы
  };

  return (
    <div>
      <h2>Add Word</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="word">Word (5 English letters):</label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={handleWordChange}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit">Add</button>
        </div>
      </form>
      {successMessage && (
        <div>
          <p>{successMessage}</p>
          <button onClick={handleReturnToPreviousPage}>Return to Previous Page</button>
        </div>
      )}
    </div>
  );
};

export default AddWord;
