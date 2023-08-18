import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import axios from "axios";
import useApi from "../hooks/useApi";

const DreamList = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    // console.log(loggedIn);
    console.log(storedUserObject.username);
    console.log();
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when the component is unmounted
    };
  }, []);

  const handleBringUserToLogin = () => {
    window.location.href = "/login";
  };

  const storedUserString = localStorage.getItem("user");
  const storedUserObject = JSON.parse(storedUserString) || {};

  const [dreams, setDreams] = useState([]);
  const [hiddenDreams, setHiddenDreams] = useState([]);
  const [selectedDream, setSelectedDream] = useState([]);

  const { loggedIn } = useAuth();

  useEffect(() => {
    // Fetch dreams from the server when the component mounts
    const fetchDreams = async () => {
      try {
        const response = await axios.get("http://localhost:8080/dreams");
        const reversedDreams = response.data.reverse();
        setDreams(reversedDreams);
      } catch (error) {
        console.error("Error fetching dreams:", error);
      }
    };
    fetchDreams();
  }, [dreams]);

  const toggleDreamVisibility = (dreamId) => {
    if (hiddenDreams.includes(dreamId)) {
      setHiddenDreams(hiddenDreams.filter((id) => id !== dreamId));
    } else {
      setHiddenDreams([...hiddenDreams, dreamId]);
    }
  };

  const expandSelectedDream = (event, dreamId) => {
    const filteredDreams = dreams.filter((dream) => dream.id === dreamId);
    setSelectedDream(filteredDreams);
  };

  const unexpandSelectedDream = () => {
    setSelectedDream([]);
  };

  return (
    <div
      className={
        dreams.length === 1 ||
        hiddenDreams.length !== 0 ||
        selectedDream.length > 0
          ? "page dreamsPage oneDreamInList"
          : "page dreamsPage"
      }
    >
      {dreams.length === 0 ? (
        <div className="noPostsText">Posts will appear here...</div>
      ) : (
        <>
          <>
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
          </>
          <h1>{selectedDream.length === 0 ? "Dreams" : "Dream"}</h1>
          <center>
            <hr className="hr" />
          </center>
          <center>
            <div className="dreamsContent">
              {selectedDream.length > 0
                ? selectedDream.map((dream) => (
                    <>
                      <div className="unexpandDreamBtnDiv">
                        <button
                          className="unexpandDreamBtn"
                          onClick={unexpandSelectedDream}
                        >
                          C<br />o<br />l<br />l<br />a<br />p<br />s<br />e
                        </button>
                      </div>
                      <div
                        key={dream.id}
                        className="dreamTileBox box singleTileBox"
                      >
                        <>
                          <div className="verticalLine"></div>
                          <div className="singleTileDreamTitle">
                            {dream.title && dream.title.substring(0, 18)}
                          </div>
                          {storedUserObject?.username === dream.username ? (
                            <div className="singleTileDreamUsername">
                              <strong>User: </strong>
                              You
                            </div>
                          ) : (
                            <div className="singleTileDreamUsername">
                              <strong>
                                <u>User: </u>
                                <br />
                                {dream.username &&
                                  dream.username.substring(0, 14)}
                              </strong>
                            </div>
                          )}
                          <div className="singleTileDreamDate">
                            <strong>Date: </strong>
                            {dream.date}
                          </div>
                          <div className="singleTileDreamMood">
                            <strong>Mood: </strong>
                            {dream.mood}
                          </div>

                          <div className="singleTileDreamPerDur">
                            <strong>Perceived Duration: </strong>
                            {dream.perceivedDuration}
                          </div>
                          <div className="singleTileDreamSetting">
                            <strong>Setting: </strong>
                            {dream.setting && dream.setting.substring(0, 57)}
                          </div>
                          <div className="singleTileDreamPeople">
                            <strong>People: </strong>
                            {dream.people && dream.people.substring(0, 57)}
                          </div>
                          <div className="singleTileDreamDescription">
                            <strong>Description: </strong>
                            {dream.description}
                          </div>
                          <div className="singleTileDreamRecurring">
                            <strong>Recurring: </strong>
                            {dream.recurring ? "Yes" : "No"}
                          </div>
                          <div className="singleTileDreamLucid">
                            <strong>Lucid: </strong>
                            {dream.lucid ? "Yes" : "No"}
                          </div>
                        </>
                      </div>
                    </>
                  ))
                : dreams.map((dream, index) => (
                    <div
                      key={index}
                      className={
                        storedUserObject?.username === dream.username
                          ? "dreamTileBox dreamTileBox1 box personalUserBox"
                          : "dreamTileBox dreamTileBox1 box"
                      }
                      style={{
                        height: dream.isHidden ? "150px" : "auto",
                      }}
                      onClick={(e) => expandSelectedDream(e, dream.id)}
                    >
                      {hiddenDreams.includes(dream.id) ? (
                        <div className="hiddenDream">
                          <button
                            className="showDreamBtn"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDreamVisibility(dream.id);
                            }}
                          >
                            {`Show Dream from `}
                            <u>{dream.username}</u>
                          </button>
                        </div>
                      ) : (
                        <>
                          <h2>{dream.title && dream.title.substring(0, 18)}</h2>
                          <p>
                            <strong>Date: </strong>
                            {dream.date && dream.date.substring(0, 50)}
                          </p>
                          <div className="moodCircle">
                            <p>
                              <div className="moodText">
                                <center>
                                  <strong>
                                    {dream.mood && dream.mood.substring(0, 15)}
                                  </strong>
                                </center>
                              </div>
                            </p>
                          </div>
                          <div
                            className={
                              storedUserObject?.username === dream.username
                                ? "usernameContainer personalDreamContainer"
                                : "usernameContainer"
                            }
                          >
                            {storedUserObject?.username === dream.username ? (
                              <div className="youText">
                                <p>You</p>
                              </div>
                            ) : (
                              <p className="usernameText">
                                <strong>
                                  <u>User: </u>
                                  <br />
                                  {dream.username &&
                                    dream.username.substring(0, 14)}
                                </strong>
                              </p>
                            )}
                          </div>
                          <p>
                            <strong>Perceived Duration: </strong>
                            {dream.perceivedDuration}
                          </p>
                          <p>
                            <strong>Setting: </strong>
                            {dream.setting && dream.setting.substring(0, 37)}
                          </p>
                          <p>
                            <strong>People: </strong>
                            {dream.people && dream.people.substring(0, 37)}
                          </p>
                          <p>
                            <strong>Description: </strong>
                            {dream.description &&
                              dream.description.substring(0, 37)}
                            ...
                          </p>
                          <div>
                            <p>
                              <strong>Recurring: </strong>
                              {dream.recurring ? "Yes" : "No"}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <strong>Lucid: </strong>{" "}
                              {dream.lucid ? "Yes" : "No"}
                            </p>
                            <button
                              className="hideDreamBtn"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDreamVisibility(dream.id);
                              }}
                            >
                              H<br />i<br />d<br />e
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
            </div>
            {loggedIn ? (
              <Link to="/adddream" className="addDreamCircleBtn">
                <div className="addDreamCircleBtnText">+</div>
              </Link>
            ) : (
              <button
                onClick={handleBringUserToLogin}
                className="addDreamCircleBtn mustBeSignedInAddBtn"
              >
                <span className="addDreamCircleBtnText mustBeSignedInAddBtnText">
                  +
                </span>
              </button>
            )}
            <hr className="hr" />
          </center>
        </>
      )}
    </div>
  );
};

export default DreamList;
