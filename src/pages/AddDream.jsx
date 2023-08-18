import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";

const AddDream = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    console.log(storedUserObject);
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when the component is unmounted
    };
  }, []);

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [perceivedDuration, setPerceivedDuration] = useState("");
  const [setting, setSetting] = useState("");
  const [people, setPeople] = useState("");
  const [description, setDescription] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [lucid, setLucid] = useState(false);

  const storedUserString = localStorage.getItem("user");
  const storedUserObject = JSON.parse(storedUserString);

  const handleAddDreamEntry = async (event) => {
    event.preventDefault();
    const currentDate = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedDate = `${
      months[currentDate.getMonth()]
    } ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

    setDate(formattedDate);

    const dreamData = {
      date: formattedDate,
      title,
      mood,
      perceivedDuration,
      setting,
      people,
      description,
      recurring,
      lucid,
      user: storedUserObject,
      username: storedUserObject.username,
      email: storedUserObject.email,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/dreams",
        dreamData
      );
      console.log("Dream entry added successfully:", response.data);
      setTitle("");
      setMood("");
      setPerceivedDuration("");
      setSetting("");
      setPeople("");
      setDescription("");
      setRecurring(false);
      setLucid(false);
    } catch (error) {
      console.error("Error adding dream entry:", error);
    }
  };

  return (
    <div className="page addDreamPage">
      <div className="dreamEntryCloud1">
        <img
          src="https://purepng.com/public/uploads/large/11498493571qdikf8k49uogdl7steagkmhic6kvjidf2rf5ga0shxskr9xztcke16a9mdpkns3gloegtowd2ckyg0vk24x1w1pcofyzokcrx1v4.png"
          alt="Cloud"
        />
      </div>

      <div className="dreamEntryCloud2">
        <img
          src="https://purepng.com/public/uploads/large/11498493571qdikf8k49uogdl7steagkmhic6kvjidf2rf5ga0shxskr9xztcke16a9mdpkns3gloegtowd2ckyg0vk24x1w1pcofyzokcrx1v4.png"
          alt="Cloud"
        />
      </div>

      <div className="dreamEntryCloud3">
        <img
          src="https://purepng.com/public/uploads/large/11498493571qdikf8k49uogdl7steagkmhic6kvjidf2rf5ga0shxskr9xztcke16a9mdpkns3gloegtowd2ckyg0vk24x1w1pcofyzokcrx1v4.png"
          alt="Cloud"
        />
      </div>

      <div className="dreamEntryCloud4">
        <img
          src="https://purepng.com/public/uploads/large/11498493571qdikf8k49uogdl7steagkmhic6kvjidf2rf5ga0shxskr9xztcke16a9mdpkns3gloegtowd2ckyg0vk24x1w1pcofyzokcrx1v4.png"
          alt="Cloud"
        />
      </div>
      <center>
        <div className="box addDreamBox">
          <h1 className="dreamEntryText">Dream Entry</h1>
          <form className="dreamForm" onSubmit={handleAddDreamEntry}>
            <label className="formLabel">Title:</label>
            <input
              type="text"
              className="formInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />

            <label className="formLabel">Mood:</label>
            <select
              className="formInput selectMood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
            >
              <option value="">Select Mood</option>
              <option value="Happy">Happy</option>
              <option value="Excited">Excited</option>
              <option value="Energetic">Adventurous</option>
              <option value="Adventurous">Energetic</option>
              <option value="Optimistic">Optimistic</option>
              <option value="Content">Content</option>
              <option value="Calm">Calm</option>
              <option value="Peaceful">Peaceful</option>
              <option value="Hopeful">Hopeful</option>
              <option value="Inspired">Inspired</option>
              <option value="Curious">Curious</option>
              <option value="Confused">Confused</option>
              <option value="Nervous">Nervous</option>
              <option value="Frustrated">Frustrated</option>
              <option value="Angry">Angry</option>
              <option value="Sad">Sad</option>
              <option value="Lonely">Lonely</option>
              <option value="Bored">Bored</option>
            </select>

            <label className="formLabel">Perceived Duration:</label>
            <select
              className="formInput selectDuration"
              value={perceivedDuration}
              onChange={(e) => setPerceivedDuration(e.target.value)}
              required
            >
              <option value="">Select Duration</option>
              <option value="< 30 Minutes">Less than 30 Minutes</option>
              <option value="30 Minutes">30 Minutes</option>
              <option value="1 Hour">1 Hour</option>
              <option value="2 Hours">2 Hours</option>
              <option value="2-24 Hours">2 to 24 Hours</option>
              <option value="> 1 Day">More than 1 Day</option>
            </select>

            <label className="formLabel">Setting:</label>
            <input
              type="text"
              className="formInput"
              value={setting}
              onChange={(e) => setSetting(e.target.value)}
              placeholder="Enter setting"
              required
            />

            <label className="formLabel">People:</label>
            <input
              type="text"
              className="formInput"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              placeholder="Enter people"
              required
            />

            <label className="formLabel">Description:</label>
            <textarea
              className="formTextarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
            />

            <label className="checkBoxLabel1">
              <input
                type="checkbox"
                className="formCheckbox1"
                checked={recurring}
                onChange={(e) => setRecurring(e.target.checked)}
              />
              Recurring
            </label>

            <label className="checkBoxLabel2">
              <input
                type="checkbox"
                className="formCheckbox2"
                checked={lucid}
                onChange={(e) => setLucid(e.target.checked)}
              />
              Lucid
            </label>

            <button className="formButton" type="submit">
              Add Dream Entry
            </button>
          </form>
        </div>
      </center>
    </div>
  );
};

export default AddDream;
