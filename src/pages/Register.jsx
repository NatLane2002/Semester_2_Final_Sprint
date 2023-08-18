import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const Register = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    console.log(storedUserObject);
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when the component is unmounted
    };
  }, []);

  const storedUserString = localStorage.getItem("user");
  const storedUserObject = JSON.parse(storedUserString);

  const formRef = useRef(null);

  const { user, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loginExag, setLoginExag] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setShowErrorMsg(true);
      setTimeout(() => {
        setShowErrorMsg(false);
      }, 3000);
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/regUsers");
      const users = response.data;
      const userExists = users.some((user) => user.email === email);

      if (userExists) {
        formRef.current.reset();
        setShowErrorMsg(true);
        setErrorMessage("Email is already associated with an account");
        setShowSuccessMsg(false);
        setTimeout(() => {
          setShowErrorMsg(false);
        }, 3000);
        return;
      }

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

      // Extract the username from the email using regex
      const username = email.match(/^([^@]*)@/)[1];

      const newUserResponse = await axios.post(
        "http://localhost:8000/regUsers",
        {
          username,
          email,
          password,
          joinDate: formattedDate,
        }
      );

      const newUser = newUserResponse.data;
      console.log("User registered:", newUser);
      formRef.current.reset();
      setErrorMessage("");
      setShowSuccessMsg(true);
      setShowErrorMsg(false);
      setSuccessMessage("Thank you for creating an account!");
      setLoginExag(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
        setLoginExag(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="page loginPage">
        <center>
          <div className="box loginBox">
            <div className="loginText">Register</div>
            <form ref={formRef} className="loginForm" onSubmit={handleRegister}>
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="username@gmail.com"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />

              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
                required
              />
              <button type="submit">Register</button>
            </form>
            <img
              className="strangeShapeImg1"
              src="https://s3-alpha-sig.figma.com/img/cf9d/1e38/4e814a76ce5d50b488befe7a09410cc1?Expires=1691971200&Signature=NzvAxFD~2bk8bI6CzyrJoVWHkX6lZGReAJZfRYwau4JTuefF9SEeXsW7MporG~tiMRhopOcdCleHyRmiKOjzxSSaFnqljoeotEI1CvBy2A5qCknnZ87p6VlHTgnR4r1aaifBhB5u5pPt4vfKsXeNoa0Jd37ZxgaDJ-kYbaTIaJAK2r8rGo-pYgq4NYjXaDXG3Z-RO7TiqWXd8JNKxADa-0zjPk0VWnPkyEADcU9mc3jW-dOfGlCas4piy05ZgdYmsf7K1sTq7K68vXwVl9hhnSIyCMxm~Pour2QGxAQcA8ijPh94hoeDncL0gB1L3xzQcE6~JSdVMf3laXeJpl7htA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="Shape"
            />
            <img
              className="strangeShapeImg2"
              src="https://s3-alpha-sig.figma.com/img/79bc/d215/91df62bc578655cc41723803350a190a?Expires=1691971200&Signature=nFCBT6JCSTQMEMMM1X8CXeb4k3v63UQ-QpHazCHh5zfKLC~j6N-zKmWozJnuO17IqZ25LvK0KmINziHa8LxmK4ijH6e8s5gmhU3rmKimUMRUM4tdPevdUBEGPjZMssopz1b3yUXwNs2kD99zib8gK1JyxvXf~L~TCvsuLSHNKf-C5kjVwK7UYNjcn0Lw53-oplCxyYV~X3~W8BQ8slLjVxSgr1RgLJCbfbE2HDRnzgTssUe7SeLDI-hNWuq9yqTGKTYnGiZBzpR1P11a3iN6dFDeHWXbgPLBpCzVOPR4laTSb7DYMT8K1-JvHb4Zu818Q675eSWj66x1oXlt1tDs5g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="Shape"
            />
            <img
              className="strangeShapeImg3"
              src="https://s3-alpha-sig.figma.com/img/3412/2f87/6d17f34053c55eb9a5b4769eb2d5522b?Expires=1691971200&Signature=TVagVKWshVRKnDZKsPRUA1cNPq902yNUlBUM96cz9A6kU5MUIKDYS-4OykMZLK~oUE2ciDQY6s6b~OxIJkb21sZr5xxbxV32o5RL4zIY3S0LL2owLdBPv6klRsO9o8MDATrKCPbDRHvIB-ro9HrY7KB6LTtOXL2Mun8HqJNfKG68z8fEcqkGeHSVa1W3usk-QcZqtpMLTEjsWINr9vi~ki~ZLKOXuS9HHw96Dy3z5~Szksf6pa4Fch7aled~C76tm0PJWPEsAI5lrhBhd7ODpGTc-OdYaT6PcFyd-z6I7foUkDFoNIFSR-SbaEtgn0UNnGeHCAYIvpPYSXXgg6sMBQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="Shape"
            />
            <div
              className={
                loginExag
                  ? "loginExag textUnderLoginForm loginTextDiv"
                  : "textUnderLoginForm loginTextDiv"
              }
            >
              <Link to="/login" className="registerForFreeText">
                Log In
              </Link>
            </div>
            <div className="blueBorderLine"></div>
          </div>
          {showErrorMsg && <div className="error">{errorMessage}</div>}
          {showSuccessMsg && <div className="successMsg">{successMessage}</div>}
        </center>
      </div>
    </>
  );
};

export default Register;
