import React from 'react';
import styles from './CredibilityStrip.module.css';
import jayLettyLogo from '../../assets/images/jay_Shetty_Certification.webp';
import jayLettyLogoSmall from '../../assets/images/jay_Shetty_Certification-128.webp';
import energeticHealerLogo from '../../assets/images/energeticHealer.webp';
import energeticHealerLogoSmall from '../../assets/images/energeticHealer-128.webp';
import wbonLogo from '../../assets/images/WbonLogo.webp';
import adhdCertificationLogo from '../../assets/images/Adhd_certification_badge.webp';
import adhdCertificationLogoSmall from '../../assets/images/Adhd_certification_badge-128.webp';
import authorBadgeLogo from '../../assets/images/Author_badge.webp';
import authorBadgeLogoSmall from '../../assets/images/Author_badge-128.webp';

interface CredibilityItem {
  name: string;
  icon: string;
  /** 128px version for phones and standard screens; `icon` (200px) is used on retina desktops */
  iconSmall?: string;
  alt: string;
}

const CredibilityStrip: React.FC = () => {
  // You'll replace these with your actual credential icons
  const credentials: CredibilityItem[] = [
    {
      name: 'Jay Letty Certified',
      icon: jayLettyLogo,
      iconSmall: jayLettyLogoSmall,
      alt: 'Jay Letty Certified Professional'
    },
    {
      name: 'Energetic Healer',
      icon: energeticHealerLogo,
      iconSmall: energeticHealerLogoSmall,
      alt: 'Certified Energetic Healer'
    },
    {
      name: 'WBON Featured',
      icon: wbonLogo,
      alt: 'WBON Logo'
    },
    {
      name: 'ADHD Certification',
      icon: adhdCertificationLogo,
      iconSmall: adhdCertificationLogoSmall,
      alt: 'ADHD Professional Certification'
    },
    {
      name: 'Published Author',
      icon: authorBadgeLogo,
      iconSmall: authorBadgeLogoSmall,
      alt: 'Published Author Badge'
    }
  ];

  return (
    <section className={styles.credibilityStrip}>
      <div className={styles.container}>
        <p className={styles.label}>Certified &amp; featured</p>
        <div className={styles.iconsGrid}>
          {credentials.map((item, index) => (
            <div key={index} className={styles.credentialItem}>
              <img
                src={item.iconSmall ?? item.icon}
                srcSet={item.iconSmall ? `${item.iconSmall} 128w, ${item.icon} 200w` : undefined}
                sizes={item.iconSmall ? '(max-width: 720px) 62px, 92px' : undefined}
                alt={item.alt}
                className={styles.credentialIcon}
                loading="lazy"
                decoding="async"
                width={96}
                height={96}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredibilityStrip;