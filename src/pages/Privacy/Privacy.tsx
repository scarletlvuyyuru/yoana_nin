import React from 'react';
import styles from './Privacy.module.css';

const Privacy: React.FC = () => {
  return (
    <div className={styles.privacyPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <p>
              The website www.yoananincoaching.com is operated by Yoana Nin Coaching. This page explains how Yoana Nin Coaching 
              collects, uses, and discloses Personal Information about our users.
            </p>
            <p>
              Yoana Nin Coaching uses your Personal Information only for the purpose of providing you with the best 
              possible coaching services. The collection and use of information in accordance with this policy is a 
              condition of using the coaching services of Yoana Nin Coaching.
            </p>
          </section>

          <section className={styles.section}>
            <h2>The Collection and Use of Information</h2>
            <p>
              In order to use our Site, you may be asked to provide us with personally identifiable information. 
              The term "Personal Information" includes, but is not limited to, your name, email address, or text 
              message credentials.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Exchange of Information</h2>
            <p>
              Your Personal Information may be used to contact you with newsletters, marketing materials, or other 
              information about our coaching services that may be helpful to you in the future. To unsubscribe from  
              any kind of communication from our team, please contact us at  
              <a href="mailto:yoana@yoananin.com" style={{ fontWeight: 600 }}>  yoana@yoananin.com</a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Safeguards</h2>
            <p>
              Even though we strive to protect your Personal Information using commercially acceptable means, we 
              cannot ensure its absolute security.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Privacy Policy Changes</h2>
            <p>
              As of {new Date().toLocaleDateString()}, this Privacy Policy is in effect and remains unchanged, 
              except for future modifications, which go into effect immediately upon posting.
            </p>
            <p>
              Please check this Privacy Policy periodically as we may amend it from time to time. When we post 
              any changes to the Privacy Policy we provided you before we begin our coaching relationship, your 
              ongoing utilization of Coaching Service constitutes your consent to the modified agreement and 
              acknowledgement of such changes.
            </p>
            <p>
              We will notify you if this Privacy Policy changes by sending an email to the address you have on 
              file, or by putting up a clear notice on our website.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Contact Us</h2>
            <p>
              We welcome your inquiries about this policy at 
              <a href="mailto:yoana@yoananin.com" style={{ fontWeight: 600 }}> yoana@yoananin.com</a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>HIPAA Notice of Privacy Practices</h2>
            <p><strong>Effective on {new Date().toLocaleDateString()}</strong></p>
            <p>
              The purpose of this notice is to inform you about how personal health information 
              about you may be used and disclosed, as well as how to get access to that 
              information. Please read it thoroughly and with full attention.
            </p>

            <h3>Our Legal Duty</h3>
            <p>According to the law, we must:</p>
            <ul>
              <li>Maintain the privacy of your Protected Health Information (PHI).</li>
              <li>Provide you with information about your legal rights and our privacy practices.</li>
            </ul>
            <p>Additionally, we are allowed to:</p>
            <ul>
              <li>Amend our privacy practices and this notice at any time, as long as the changes are permitted by law.</li>
              <li>We will, however, update this notice before changing our privacy practices.</li>
            </ul>

            <h3>Your Protected Health Information</h3>
            <p>
              Your personal information will not be used or disclosed without your written 
              permission, unless required by law. By writing to us, you may revoke your 
              authorization. Using or disclosing your information for treatment, payment, 
              or health-related operations does not require your consent.
            </p>
            <p>
              Your PHI may be used and disclosed for coaching services and billing purposes 
              without your consent. Information may be given to office staff, payment processors, 
              business associates, etc., when appropriate.
            </p>

            <h3>Other Disclosures</h3>
            <ul>
              <li>If you need emergency assistance, your consent is not necessary if we attempt to obtain it afterward.</li>
              <li>When compelled by federal, state, or law enforcement officials to use or disclose your PHI, we may do so without your consent.</li>
              <li>Your personal information may be disclosed if it coincides with the Mandatory Reporting Laws of North Carolina, which normally refer to threats to someone's safety, health, or welfare.</li>
            </ul>

            <h3>What Rights Do You Have Over Your PHI?</h3>
            <ul>
              <li>You are entitled to see and obtain copies of your protected health information. All requests must be in writing, and responses are provided within 30 days. You will be charged reasonable copy fees for copies of your PHI.</li>
              <li>If you request a list of the disclosures we have made, it will be provided within 60 days. Records of disclosure are kept for six years excluding law enforcement records or items for which consent has already been given.</li>
              <li>PHI you provided is subject to amendment under your consent. Any information that you think needs to be corrected or added can be requested by you. You must submit your request and the reason for it in writing.</li>
            </ul>

            <h3>Privacy Complaints</h3>
            <p>
              You can reach us directly by email at 
              <a href="mailto:yoana@yoananin.com" style={{ fontWeight: 600 }}> yoana@yoananin.com</a>. 
              You are entitled to notification in the event of a breach.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;