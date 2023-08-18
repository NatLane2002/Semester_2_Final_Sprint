import { useEffect } from "react";

const Version = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when the component is unmounted
    };
  }, []);

  return (
    <>
      <div className="page versionPage">
        <center>
          <p>
            <strong>Last Updated: </strong>August <br /> 15th, 2023
          </p>
          <p>
            <strong>Version: </strong>1.0.0.
          </p>
        </center>
      </div>
    </>
  );
};

export default Version;
