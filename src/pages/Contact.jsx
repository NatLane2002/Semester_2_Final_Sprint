import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { AiFillClockCircle } from "react-icons/ai";

const Contact = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when the component is unmounted
    };
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission, like sending the data to a server or performing other actions.
    console.log("Form submitted with data:", { name, email, message });
  };

  return (
    <>
      <div className="page">
        <center>
          <div className="contactPageContentContainer">
            <h1 className="getInTouchHeading">GET IN TOUCH</h1>
            <main>
              <div className="getInTouchPara">
                <p>
                  You can contact us any way that is convenient for you. We are
                  available 24/7 via fax or email. You can also use a quick
                  contact form below or visit us personally.
                </p>
              </div>
              <div className="box contactPageFormBox">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                  <label>
                    Name:
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Message:
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </label>
                  <button type="submit">Submit</button>
                </form>
              </div>
              <div className="box contactPageContactInfoBox">
                <div className="icon locationIcon">
                  <MdLocationOn />
                </div>
                <div className="icon phoneIcon">
                  <AiFillPhone />
                </div>
                <div className="icon emailIcon">
                  <MdEmail />
                </div>
                <div className="icon clockIcon">
                  <AiFillClockCircle />
                </div>
                <h2>
                  <strong>Address:</strong>
                </h2>
                <p>1234 Street Address City Address, 1234</p>
                <h2>
                  <strong>Phone:</strong>
                </h2>
                <p>(123) 456-7890</p>
                <h2>
                  <strong>We are Open:</strong>
                </h2>
                <p>Monday - Thursday: 9:00 AM - 5:30 PM </p>
                <p>Friday 9:00 AM - 6:00 PM </p>
                <p>Saturday: 11:00 AM - 5:00 PM</p>
                <h2>
                  <strong>Email:</strong>
                </h2>
                <p>support@dreamjournalapp.com</p>
              </div>
            </main>
          </div>
        </center>
      </div>
    </>
  );
};

export default Contact;
