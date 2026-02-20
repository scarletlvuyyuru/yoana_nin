import React from 'react';
import styles from './Terms.module.css';

const Terms: React.FC = () => {
  return (
    <div className={styles.termsPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Terms & Conditions</h1>
          <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms 
              and provisions of this agreement. If you do not agree with these terms, please do not use this website.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Agreement for Client Service</h2>
            <p>
              This agreement is between Yoana Nin Coaching (referred to as "Coach") and clients seeking coaching 
              services (referred to as "Client"). Coaching services are to be provided by the coach in accordance 
              with the terms outlined in this agreement.
            </p>
            <p>
              A Client and Coach work collaboratively (not as business associates or in legal alliances) to enhance 
              the client's personal and professional performance.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Responsibilities</h2>
            <ol>
              <li>
                <strong>Coach Standards:</strong> Coach agrees to follow the Ethics and Standards of Conduct set forth by 
                the International Coach Federation (ICF). The ICF's Code of Ethics is outlined in detail at: 
                <a href="https://coachingfederation.org/ethics/code-of-ethics" target="_blank" rel="noopener noreferrer">
                  https://coachingfederation.org/ethics/code-of-ethics
                </a>
              </li>
              <li>
                <strong>Client Responsibility:</strong> Client's emotional, mental, and physical well being is his/her 
                responsibility. Likewise, the client is responsible for all his/her own choices, decisions, behaviors, 
                and actions. Coach is not liable or accountable for any action or inaction, as well as for any direct 
                or indirect results of service provided to the client. It is important for the client to understand 
                that coaching does not work as a therapy nor is a therapy in and of itself. It is in no way designed 
                to treat any mental disorder or medical problem, nor does it prevent them.
              </li>
              <li>
                <strong>Professional Advice:</strong> Client knows that coaching is not a substitute for legal, medical, 
                mental, or any other qualified professional advice, and he/she will seek specialized help from certified 
                independent practitioners for respective matters. If the client is under the care of a mental health 
                professional, the coach must be informed.
              </li>
              <li>
                <strong>Honesty Commitment:</strong> A successful Coach/Client relationship is built on honesty. In addition 
                to offering his/her full energy to the coaching program, the client agrees to communicate openly, 
                truthfully, and share direct feedback.
              </li>
            </ol>
          </section>

          <section className={styles.section}>
            <h2>Services</h2>
            <p>
              Coaching programs are customized based on client needs and may involve monthly or multi-month programs 
              conducted by telephone, video call, or in-person meetings. Between scheduled sessions, Coach may be 
              available to Client by email or text messages with agreed-upon response times. Additional services may 
              be provided as needed according to Client's specific requirements.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Schedule & Fees</h2>
            <p>
              Coaching fees and schedules are determined based on the specific program selected. Payment terms will 
              be outlined in individual service agreements. Coach's offerings and fees may change, with current rates 
              applying to new agreements.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Procedures</h2>
            <p>
              Coaching meetings will take place at a mutually agreed upon time and communication method between Coach 
              and Client. Scheduled calls and meetings are typically initiated by the Client. Clients will be notified 
              via email if there are any changes to contact information for scheduled appointments.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Confidentiality</h2>
            <p>
              By virtue of the ICF Code of Ethics, this coaching relationship as well as all information the Client 
              shares with the Coach is deemed confidential, but it is not necessarily considered legally confidential 
              (as in medicine or law). Any information regarding the Client will not be disclosed without his/her 
              written consent. Client's name will not be disclosed as a reference without his/her permission.
            </p>
            <p>
              Information not considered confidential is that which: (a) was in the Coach's possession before the 
              Client shared it; (b) has been widely publicized or is typical in the Client's industry; (c) is obtained 
              by the Coach from a third party without breach of any obligation to the Client; (d) is independently 
              developed by the Coach without referencing or using any confidential information from the Client; or 
              (e) is required by law to be disclosed by the Coach.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Cancellation Policy</h2>
            <p>
              If Client wishes to reschedule a coaching session, he/she must provide 48 hours notice in advance. 
              Rescheduled sessions will generally be held within a reasonable timeframe of the original date. No 
              replacement will be possible if changes are not made with 48 hours prior notice.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Refund Policy</h2>
            <p>
              Coaching is a relationship that requires full commitment and refunds will not be generally offered for 
              this service. Each refund request will be evaluated on a case-by-case basis, contingent on any 
              extenuating and unexpected circumstances that may arise in the Client's life.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Limited Liability</h2>
            <p>
              Coach makes no expressed or implied guarantees or warranties, except as specifically provided in individual 
              service agreements. It is understood that the Coach shall not be liable for any consequential, special, 
              or exemplary damages. The Coach's entire liability and the Client's exclusive remedy under this agreement 
              are limited to the amount paid by the Client to Coach for all services rendered up until the termination 
              date, regardless of any damages sustained by the Client.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Dispute Resolution</h2>
            <p>
              In the event of a dispute arising out of this agreement, the Coach and Client pledge to attempt mediation 
              in good faith for up to 30 days after giving notice. All further negotiations will be settled legally 
              in a court with the appropriate jurisdiction if the dispute is not resolved.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Contact Information</h2>
            <p>
              For questions regarding these terms, please contact:
              <br />
              <a href="mailto:yoana@yoananin.com" style={{ fontWeight: 600 }}>yoana@yoananin.com</a>
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.centerHeading}>Group Coaching Agreement</h2>
            <h3>Our Mission Statement:</h3>
            <p>
              Creating a group that helps members live their best lives by taking steps to 
              become the best possible version of themselves.
            </p>
            
            <h3>The Dynamic of Group Coaching:</h3>
            <p>
              There is a shared commitment between the facilitator and all participants 
              involved in the group coaching process. By participating in the program, you agree to what is stated in the remaining parts of this agreement.
            </p>
            <p>
              It is my responsibility to participate in the process of setting and monitoring 
              goals and outcomes. As a member of the group, I agree to support, honor, 
              and value each participant. Feedback is assumed to be offered positively 
              without judgment, and each participant decides whether or not to receive it. 
              Although coaching can sometimes be incorporated into therapy, it is not the 
              same as therapy. Following the start of coaching, if I need therapy, another 
              provider will be recommended. The coaching may continue, but a release 
              authorizing the sharing of information will likely be required.
            </p>

            <h3>Protecting Your Privacy</h3>
            <p>
              In group coaching, all information is confidential, except in cases governed 
              by law, such as child abuse. In all telephone and/or internet 
              communications, all parties agree to take all reasonable measures to ensure 
              confidentiality.
            </p>

            <h3>Financial Policy</h3>
            <p>
              It is necessary to pay all group coaching fees before the first session. By 
              doing this, I will ensure my place in the group as well as my dedication. The 
              cost of coaching is not covered by insurance because it is not deemed 
              medically necessary. Most credit cards are accepted as well as cash, checks, 
              and cashier's checks. Returned checks will incur additional fees.
            </p>

            <h3>Our Cancellation Policy</h3>
            <p>
              Group sessions may not be rescheduled, and fees are non-refundable, unless 
              authorized by your coach. If this is done, we will make every effort to accommodate the 
              majority of participants. It is understood that I may not be able to make all 
              group sessions, and I should let my coach know as soon as possible when I 
              will be unable to attend.
            </p>

            <h3>Agreement Between the Parties</h3>
            <p>
              This contract has been read and understood by me as a signed party. My 
              coach does not guarantee or warrant the results of these services. My coach 
              will only provide services that fall within his/her skill set.
            </p>
            <p>
              I agree to take responsibility for the results of taking part in Yoana Nin Coaching programs.
            </p>
            <p>
              We are dedicated to helping you grow and achieve your goals as well as 
              those of your fellow members. Participants of the group will help you explore 
              new possibilities, plans, and actions, share their experiences and provide 
              assistance as needed.
            </p>
            <p>
              It's your coach's job to guide the group, facilitate conversations, provide 
              resources, share useful strategies, and help the group work together. But it's 
              up to you to take action and produce results from this process.
            </p>

            <h3>Group Participant Standards</h3>
            <p>The following standards are agreed upon by all participants:</p>
            <ul>
              <li>Honest communication and openness to coaching, advice, and feedback.</li>
              <li>Helping others when they need it and asking for their support.</li>
              <li>Allowing others to learn without interfering.</li>
              <li>Paying according to the payment plan and staying current.</li>
              <li>Participants are required to maintain the confidentiality of all information they share.</li>
              <li>Using participants' email information only for program communication. (You may not spam or solicit for any reason at any time.)</li>
              <li>All parts of the program may be filmed, videotaped, or recorded on camera. Yoana Nin Coaching has the right to use this recorded material without compensation or review after you participate in coaching programs.</li>
              <li>Those who fail to comply with the above requirements may be removed from the course. No refunds will be given to participants who are released from the program.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;