import React from 'react';
import styles from './CredibilityStrip.module.css';
import jayLettyLogo from '../../assets/images/jay_Shetty_Certification.webp';
import energeticHealerLogo from '../../assets/images/energeticHealer.webp';
import tpaLogo from '../../assets/images/TPA_logo.webp';
import adhdCertificationLogo from '../../assets/images/Adhd_certification_badge.webp';
import authorBadgeLogo from '../../assets/images/Author_badge.webp';

interface CredibilityItem {
  name: string;
  icon: string;
  alt: string;
}

const CredibilityStrip: React.FC = () => {
  // You'll replace these with your actual credential icons
  const credentials: CredibilityItem[] = [
    {
      name: 'Jay Letty Certified',
      icon: jayLettyLogo,
      alt: 'Jay Letty Certified Professional'
    },
    {
      name: 'Energetic Healer',
      icon: energeticHealerLogo,
      alt: 'Certified Energetic Healer'
    },
    {
      name: 'TPA Certified',
      icon: tpaLogo,
      alt: 'TPA Professional Certification'
    },
    {
      name: 'ADHD Certification',
      icon: adhdCertificationLogo,
      alt: 'ADHD Professional Certification'
    },
    {
      name: 'Published Author',
      icon: authorBadgeLogo,
      alt: 'Published Author Badge'
    }
  ];

  return (
    <section className={styles.credibilityStrip}>
      <div className={styles.container}>
        <div className={styles.iconsGrid}>
          {credentials.map((item, index) => (
            <div key={index} className={styles.credentialItem}>
              <img
                src={item.icon}
                alt={item.alt}
                className={styles.credentialIcon}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredibilityStrip;