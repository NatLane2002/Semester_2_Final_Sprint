import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when the component is unmounted
    };
  }, []);

  return (
    <>
      <div className="page homePage">
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
        <div className="imageContainer">
          <h1 className="textInCloud">Welcome To Your Dream Journal Hub</h1>
          <img
            src="https://purepng.com/public/uploads/large/11498493571qdikf8k49uogdl7steagkmhic6kvjidf2rf5ga0shxskr9xztcke16a9mdpkns3gloegtowd2ckyg0vk24x1w1pcofyzokcrx1v4.png"
            alt="Cloud"
          />
        </div>
        <center>
          <div className="box homePageTextBox">
            <p>
              Discover the fascinating world of your dreams with our Dream
              Journal app. Record, explore, and compare your dreams in one
              convenient place.
            </p>
            <br />
            <p>
              <span className="subHeading">Record Your Dreams</span>
              <br />
              Capture the vivid details of your dreams using our intuitive
              journaling interface. Describe the scenes, emotions, and
              experiences you encounter during your dream journeys.
            </p>
            <br />
            <p>
              <span className="subHeading">Connect with Dream Enthusiasts</span>
              <br />
              Join a vibrant community of dream enthusiasts who are passionate
              about exploring the realm of dreams. Share your experiences,
              interpretations, and stories with like-minded individuals.
            </p>
            <br />
            <p>
              <span className="subHeading">Start Your Journey Today</span>
              <br /> Embark on a journey of self-discovery through the realm of
              dreams. Whether you're a casual dreamer or a dedicated explorer,
              Nocturnal Narratives offers a space to capture, reflect, and
              connect.
            </p>
            <br />
            <b>Get started now</b> and embark on an exciting adventure of
            self-exploration through the world of dreams.
          </div>
        </center>
      </div>
    </>
  );
};

export default Home;
