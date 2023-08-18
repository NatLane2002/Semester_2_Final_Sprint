import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { useUser } from "../context/UserContext";

const Login = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when the component is unmounted
    };
  }, []);

  const formRef = useRef(null);

  const { setLoggedIn } = useAuth();
  const { user, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInLS, setLoggedInLS] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAlreadyLoggedInErrorMsg, setShowAlreadyLoggedInErrorMsg] =
    useState(false);
  const [alreadyLoggedInErrorMsg, setAlreadyLoggedInErrorMsg] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (localStorage.getItem("loggedIn") === "true") {
      formRef.current.reset();
      setAlreadyLoggedInErrorMsg(
        "Please sign out before logging into a new account"
      );
      setShowAlreadyLoggedInErrorMsg(true);
      setTimeout(() => {
        setShowAlreadyLoggedInErrorMsg(false);
      }, 5000);
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/regUsers");
      const users = response.data;
      const fullUserObj = users.find(
        (user) => user.email === email && user.password === password
      );

      if (fullUserObj) {
        // Successful login
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("user", JSON.stringify(fullUserObj));
        setLoggedIn(true);
        setUser(fullUserObj);
        formRef.current.reset();
        setSuccessMessage("Login Successful");
        setShowSuccessMsg(true);
        setTimeout(() => {
          setShowSuccessMsg(false);
        }, 3000);
        console.log("Logged in:", fullUserObj.id);
      } else {
        // Unsuccessful login
        setErrorMsg("Incorrect email or password");
        setShowErrorMsg(true);
        setTimeout(() => {
          setShowErrorMsg(false);
        }, 3000);
        console.log("Login failed: Incorrect email or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="page loginPage">
        <center>
          <div className="box loginBox">
            <div className="loginText">Login</div>
            <form ref={formRef} className="loginForm" onSubmit={handleSignIn}>
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="username@gmail.com"
              />

              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />

              <button type="submit">Sign-In</button>
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
            <div className="textUnderLoginForm">
              Don't have an account
              yet?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/register" className="registerForFreeText">
                Register for free
              </Link>
            </div>
            <div className="blueBorderLine"></div>
          </div>
          {showSuccessMsg && (
            <div className="successfulLoginMsg">{successMessage}</div>
          )}
          {showErrorMsg && <div className="errorLoggingInMsg">{errorMsg}</div>}
          {showAlreadyLoggedInErrorMsg && (
            <div className="alreadyLoggedInErrorMsg">
              {alreadyLoggedInErrorMsg}
            </div>
          )}
        </center>
      </div>
    </>
  );
};

export default Login;
