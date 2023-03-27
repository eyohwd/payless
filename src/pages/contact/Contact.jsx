import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import Card from "../../components/card/Card";
import styles from "./Contact.module.scss";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, 'template_eu55vid', form.current, 'wclCBxCHsoFgtQdzH')
      .then((result) => {
        toast.success("Message sent successfully...")
          //console.log(result.text);
      }, (error) => {
        toast.error(error.text)
          //console.log(error.text);
      });
      e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
      <h2>Contact</h2>
      <div className={styles.section}>
        <form ref={form} onSubmit={sendEmail}>
          <Card cardClass={styles.card}>
            <label>Name</label>
            <input type="text" name="user_name" placeholder="Full Name" required/>

            <label>Email</label>
            <input type="email" name="user_email" placeholder="Your active email" required/>

            <label>Subject</label>
            <input type="text" name="subject" placeholder="Subject" required/>

            <label>Your Message:</label>
            <textarea name="message" cols="30" rows="10"></textarea>
            <button className="--btn --btn-primary">Send Message</button>
          </Card>
          </form>
        <div className={styles.details}>
          <Card cardClass={styles.card2}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via 
              other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt/>
                  <p>+234 704 123 4000</p>
                </span>

                <span>
                  <FaPhoneAlt/>
                  <p>+234 809 954 5499</p>
                </span>

                <span>
                  <FaEnvelope/>
                  <p>paylesslpg@gmail.com</p>
                </span>

                <span>
                  <GoLocation/>
                  <p>Okota, Lagos, Nigeria.</p>
                </span>

                <span>
                  <FaTwitter/>
                  <p>@paylesslpg</p>
                </span>
              </div>
          </Card>
        </div>
      </div>
      </div>
    </section>
  );
}

export default Contact;
