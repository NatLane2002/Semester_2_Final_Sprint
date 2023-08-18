import { useEffect, useState, useContext } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import { AiFillCloud } from "react-icons/ai";
import { AiOutlineSmile } from "react-icons/ai";
import { allContext } from "../context/allContext";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  // User and context related states and variables
  const { user, setUser } = useUser();
  const { curLoggedInUserName, setCurLoggedInUserName } =
    useContext(allContext);

  // Retrieve user data from local storage
  const storedUserString = localStorage.getItem("user");
  const storedUserObject = JSON.parse(storedUserString);

  const defaultBackgroundValue = localStorage.getItem("defaultBackground");

  // Set default background for the body
  const defaultBackground = localStorage.setItem("defaultBackground", true);

  // Background image options
  const [backgroundImages, setBackgroundImages] = useState([
    "",
    "https://psconway.com/wp-content/uploads/2020/03/Above-the-CLouds.jpg",
    "https://th.bing.com/th/id/R.2f6f8581d84222e4b074d6a265aa6639?rik=477BzmiN%2bVJ1yg&pid=ImgRaw&r=0",
  ]);

  // Selected background image index
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  // States for various settings and user data
  const [edit, setEdit] = useState(false);
  const [userDreams, setUserDreams] = useState([]);
  const [dreams, setDreams] = useState([]);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [showSettings, setShowSettings] = useState();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Function to handle new username input change
  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  // Function to handle new password input change
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  // Initialize settings visibility state on component mount
  useEffect(() => {
    setShowSettings(false);
  }, []);

  // Fetch dreams from the server when the component mounts
  useEffect(() => {
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
  }, [dreams, newPassword, newUsername]);

  useEffect(() => {
    // Ensure newUsername and newPassword are not empty
    if (newUsername.trim() === "" || newPassword.trim() === "") {
      return;
    }

    // Filter and update dream entries where email matches user.email
    const updateDreamEntries = async () => {
      try {
        const response = await axios.get("http://localhost:8080/dreams");
        const dreamsToUpdate = response.data.filter(
          (dream) => dream.email === storedUserObject.email
        );

        // Update each dream entry with newUsername
        for (const dream of dreamsToUpdate) {
          const updatedDream = { ...dream, username: newUsername };
          await axios.patch(
            `http://localhost:8080/dreams/${dream.id}`,
            updatedDream
          );
          console.log(`Updated dream entry ${dream.id}`);
        }
      } catch (error) {
        console.error("Error updating dream entries:", error);
      }
    };

    const updateCommentEntries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/comments");
        // This filter function will make an array of comments which belong to the current user using their email which doesnt change to identify them
        const commentsToUpdate = response.data.filter(
          (comment) => comment.email === storedUserObject.email
        );

        // Update each dream entry
        for (const comment of commentsToUpdate) {
          const updatedComment = { ...comment, username: newUsername };
          await axios.patch(
            `http://localhost:5000/comments/${comment.id}`,
            updatedComment
          );
          console.log(`Updated comment entry ${comment.id}`);
        }
      } catch (error) {
        console.error("Error updating comment entries:", error);
      }
    };

    // Call the function to update dream entries
    updateDreamEntries();
    updateCommentEntries();
  }, [newUsername, newPassword]);

  // Fetch user-specific comments from the server
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/comments");
        const filteredComments = response.data.filter(
          (comment) => comment.username === storedUserObject.username
        );
        const reversedCommentsData = filteredComments.reverse();
        setAllComments(reversedCommentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [storedUserObject.username, allComments]);

  // Fetch dreams associated with the user from the server
  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const response = await axios.get("http://localhost:8080/dreams");
        const filteredDreams = response.data.filter(
          (dream) => dream.username === storedUserObject.username
        );
        const reversedDreamData = filteredDreams.reverse();
        setUserDreams(reversedDreamData);
      } catch (error) {
        console.error("Error fetching dreams:", error);
      }
    };

    fetchDreams();
  }, [storedUserObject.username, newUsername, newPassword]);

  // Handle comment input change
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // Handle comment submission
  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (comment.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }

    const newComment = {
      email: storedUserObject.email,
      username: storedUserObject.username,
      comment: comment,
      date: new Date().toLocaleDateString(), // Format the date
    };

    try {
      // Post the new comment to the server
      await axios.post("http://localhost:5000/comments", newComment);
      console.log("Comment posted successfully");

      // Update the allComments array with the new comment
      setAllComments((prevComments) => [...prevComments, newComment]);

      // Clear the comment field
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    console.log(storedUserObject); // This should be currently logged in user's full object which I can grab values from key-value pairs from!...
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when the component is unmounted
    };
  }, [user]);

  const handleSignOut = () => {
    if (window.confirm("Are you sure you would like to sign out?")) {
      localStorage.removeItem("user");
      console.log("Signed Out");
      localStorage.setItem("loggedIn", "false");
      window.location.href = "/login";
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you would like to delete your account?")) {
      const passwordConfirmed = prompt(
        "Please enter your password to confirm:"
      );
      if (passwordConfirmed === storedUserObject.password) {
        try {
          // Delete the user's account
          await axios.delete(
            `http://localhost:8000/regUsers/${storedUserObject.id}`
          );
          console.log("Account deleted successfully");

          // Delete dreams associated with the user's username
          const response = await axios.get("http://localhost:8080/dreams");
          const userDreams = response.data.filter(
            (dream) => dream.username === storedUserObject.username
          );

          for (const dream of userDreams) {
            await axios.delete(`http://localhost:8080/dreams/${dream.id}`);
            console.log(`Dream with ID ${dream.id} deleted`);
          }

          localStorage.removeItem("user");
          localStorage.setItem("loggedIn", "false");
          window.location.href = "/login";
        } catch (error) {
          console.error("Error deleting account:", error);
        }
      } else {
        alert("Incorrect password. Account deletion failed.");
      }
    }
  };

  const handleDeleteComment = async (e, commentId) => {
    if (window.confirm("Are you sure you would like to delete this comment?")) {
      try {
        await axios.delete(`http://localhost:5000/comments/${commentId}`);
        console.log("Comment deletion successful:", commentId);

        setAllComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } catch (error) {
        console.error("Error occurred while deleting the comment:", error);
      }
    }
  };

  const handleDeleteDream = async (e, dreamId) => {
    if (window.confirm("Are you sure you would like to delete this dream?")) {
      try {
        await axios.delete(`http://localhost:8080/dreams/${dreamId}`);
        console.log("Dream deletion successful:", dreamId);

        setUserDreams((prevDreams) =>
          prevDreams.filter((dream) => dream.id !== dreamId)
        );
      } catch (error) {
        console.error("Error occurred while deleting the dream:", error);
      }
    }
  };

  const currentUserTotalDreamEntries = dreams.filter(
    (dream) => dream.username === storedUserObject.username
  ).length;

  const allUserDreams = dreams.filter(
    (dream) => dream.username === storedUserObject.username
  );

  const moodCount = {};

  allUserDreams.forEach((dream) => {
    const mood = dream.mood;
    if (moodCount[mood]) {
      moodCount[mood]++;
    } else {
      moodCount[mood] = 1;
    }
  });

  let mostCommonMood = null;
  let maxCount = 0;

  for (const mood in moodCount) {
    if (moodCount[mood] > maxCount) {
      maxCount = moodCount[mood];
      mostCommonMood = mood;
    }
  }

  const durationCount = {};

  allUserDreams.forEach((dream) => {
    const perceivedDuration = dream.perceivedDuration;
    if (durationCount[perceivedDuration]) {
      durationCount[perceivedDuration]++;
    } else {
      durationCount[perceivedDuration] = 1;
    }
  });

  let mostCommonDuration = null;
  let maxTimeCount = 0;

  for (const duration in durationCount) {
    if (durationCount[duration] > maxTimeCount) {
      maxTimeCount = durationCount[duration];
      mostCommonDuration = duration;
    }
  }

  const handleToggleSettings = () => {
    console.log("Toggle settings");
    setShowSettings(!showSettings);
  };

  const handleShowEdit = () => {
    setEdit(!edit);
  };

  const handleUpdateUserInfo = async () => {
    if (newUsername.trim() === "" || newPassword.trim() === "") {
      alert("Username and password cannot be empty");
      return;
    }

    const updatedUser = { ...storedUserObject };
    updatedUser.username = newUsername;
    updatedUser.password = newPassword;

    try {
      // Update user data in the JSON server
      await axios.put(
        `http://localhost:8000/regUsers/${storedUserObject.id}`,
        updatedUser
      );

      // Update stored user object and local storage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setUser(updatedUser);

      console.log("User information updated successfully");
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handleChangeBackground = () => {
    if (selectedImgIdx === backgroundImages.length - 1) {
      setSelectedImgIdx(0);
    } else {
      setSelectedImgIdx(selectedImgIdx + 1);
    }

    document.body.style.backgroundImage = `url(${backgroundImages[selectedImgIdx]})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";

    // Update the defaultBackground value in local storage
    if (selectedImgIdx !== 0) {
      localStorage.setItem("defaultBackground", "false");
    } else {
      localStorage.setItem("defaultBackground", "true");
    }
  };

  return (
    <>
      <div className="page profilePage">
        {defaultBackgroundValue === "true" && (
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
        )}

        <center>
          <button
            onClick={handleToggleSettings}
            className={showSettings ? "showDreamEntriesBtn" : "showSettingsBtn"}
          >
            {showSettings ? <AiFillCloud /> : <FcSettings />}
          </button>
          <div className="box statsBox">
            <div className="usersNameContainer">
              <h1 className="usersName">
                {storedUserObject.username.substring(0, 23)}
              </h1>
            </div>
            <p className="joinDate">
              <strong>Joined: </strong>
              {storedUserObject.joinDate}
            </p>
            <div className="line"></div>
            <div className="rightSideStatsBox">
              <h1 className="dreamStatsHeading">Dream Stats</h1>
              <p>
                <strong>Total Dream Entries: </strong>
                {currentUserTotalDreamEntries}
              </p>
              <p>
                <strong>Average Perceived Duration: </strong>
                {mostCommonDuration}
              </p>
              <p>
                <strong>Most Common Dream Mood: </strong>
                {mostCommonMood}
              </p>
              {edit && (
                <>
                  <input
                    className="newUsernameInput"
                    type="text"
                    placeholder="New Username"
                    value={newUsername}
                    onChange={handleUsernameChange}
                  />

                  <input
                    className="newPasswordInput"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={handlePasswordChange}
                  />

                  <button onClick={handleUpdateUserInfo}>Update</button>
                </>
              )}
            </div>
            <button onClick={handleShowEdit} className="endBtn">
              <div className="pencilIcon">
                <FaPencilAlt />
              </div>
            </button>
          </div>

          {showSettings ? (
            <div className="box settingsBox">
              <h1 className="settingsHeading">Settings</h1>
              <hr className="settingsHr" />
              <h2 className="privacyModeText">Privacy Mode: </h2>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
              <div className="themeText">
                <p>Change Theme:</p>
              </div>
              <button
                onClick={handleChangeBackground}
                className="themeChangeBtn"
              >
                {selectedImgIdx === 1 ? "Default" : "Custom"}
              </button>
              <button onClick={handleSignOut} className="signOutBtn">
                Sign out
              </button>
              <button
                onClick={handleDeleteAccount}
                className="deleteAccountBtn"
              >
                DELETE ACCOUNT
              </button>
            </div>
          ) : (
            <>
              <div
                className={
                  userDreams.length === 0
                    ? "noDreamEntries box yourEntriesBox"
                    : "box yourEntriesBox"
                }
              >
                {userDreams.length === 0 ? (
                  <>
                    <div className="linkToAddDreamPageDiv">
                      <Link to="/adddream">
                        <button className="linkToAddDreamPage">
                          <div className="smileyFaceIcon1">
                            <AiOutlineSmile />
                          </div>
                          Log your first dream
                          <div className="smileyFaceIcon2">
                            <AiOutlineSmile />
                          </div>
                        </button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <h1>Your Dream Entries</h1>
                  </>
                )}
              </div>
              <center>
                <div
                  className={
                    userDreams.length > 2 ? "scrollableDiv" : "unscrollableDiv"
                  }
                >
                  {userDreams.map((userDream) => (
                    <div className="box singleUserDreamsBox" key={userDream.id}>
                      <div className="singleDreamBoxTitle">
                        {userDream.title && userDream.title.substring(0, 18)}
                      </div>
                      <div className="singleDreamBoxDate">{userDream.date}</div>
                      <div className="singleDreamBoxDescription">
                        <strong>Description: </strong>
                        {userDream.description &&
                          userDream.description.substring(0, 160)}
                      </div>
                      <div className="dreamTrashIcon">
                        <button
                          onClick={(e) => handleDeleteDream(e, userDream.id)}
                        >
                          <BsFillTrashFill />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </center>
            </>
          )}

          <div className="box commentFormBox">
            <h1 className="writeACommentText">Write a Comment/Note To Self</h1>
            <form className="commentForm" onSubmit={handleCommentSubmit}>
              <label htmlFor="comment">Comment</label>
              <br />
              <textarea
                id="comment"
                value={comment}
                onChange={handleCommentChange}
                maxLength={200}
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>

          <div className="commentsContainer">
            {allComments.map((comment) => (
              <div key={comment.id} className="commentTile box">
                <p className="commentDateText">{comment.date}</p>
                <div className="commentTextContainer">
                  <p className="commentCommentText">{comment.comment}</p>
                </div>
                <div className="commentTrashIcon">
                  <button onClick={(e) => handleDeleteComment(e, comment.id)}>
                    <BsFillTrashFill />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="box commentBox"></div>
        </center>
      </div>
    </>
  );
};

export default Profile;
