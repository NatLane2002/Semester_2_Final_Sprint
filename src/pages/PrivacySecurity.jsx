import { useEffect } from "react";

const PrivacySecurity = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling when the component is unmounted
    };
  }, []);

  return (
    <>
      <center>
        <div className="page privacyPage">
          <h1>Privacy and Security</h1>
          <p>
            At Dream Journal, we value your privacy and are committed to
            ensuring the security of your personal information and dream
            entries. This Privacy and Security page outlines our practices and
            measures to protect your data.
          </p>
          <ol>
            <h2>Data Collection and Usage</h2>
            <li>
              When you record dream entries on our platform, we collect and
              store the information you provide, such as dream descriptions,
              emotions, and tags. This data is used solely for the purpose of
              enabling you to journal and analyze your dreams.
            </li>
            <li>
              During the registration process, we collect your email address and
              other basic details. We use this information to create and secure
              your account, and to communicate important updates and
              notifications.
            </li>
          </ol>

          <h2>Privacy Controls</h2>
          <ol>
            <li>
              You have full control over the visibility of your dream entries.
              You can choose to keep them private, share them with a select
              group, or make them public for the community to see.
            </li>
            <li>
              You can manage your account settings, including password changes
              and email preferences, in the account management section of the
              app.
            </li>
          </ol>

          <h2>Security Measures</h2>
          <ol>
            <li>
              We use industry-standard encryption protocols to protect your data
              during transmission and storage. Your dream entries and personal
              information are securely stored on our servers.
            </li>
            <li>
              Only authorized personnel have access to the server
              infrastructure. We employ strict access controls and regular
              security audits to ensure the safety of your data.
            </li>
          </ol>

          <h2>Community Guidelines</h2>
          <ol>
            <li>
              We encourage respectful and supportive interactions among our
              community members. Be mindful of the privacy settings and
              preferences of others when sharing or discussing dream entries.
            </li>
            <li>
              We actively moderate content to prevent the sharing of
              inappropriate or harmful material. Users who violate our community
              guidelines may face account suspension.
            </li>
          </ol>

          <h2>Third-Party Integration</h2>
          <ol>
            <li>
              Our app may include links to third-party websites or services. We
              are not responsible for the privacy practices or content of these
              external platforms.
            </li>
            <div className="bottomLi">
              <li>
                We may use analytics tools to gather usage information and
                improve our services. This data is anonymized and used solely
                for statistical analysis.
              </li>
            </div>
          </ol>
        </div>
      </center>
    </>
  );
};

export default PrivacySecurity;
