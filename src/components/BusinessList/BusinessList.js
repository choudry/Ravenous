import React from "react";
import styles from "./BusinessList.module.css";

import Business from "../Business/Business";

const BusinessList = ({ businessList }) => {
  return (
    <div className={styles.BusinessList}>
      {businessList.map((business) => (
        <Business key={business.id} business={business} />
      ))}
    </div>
  );
};

export default BusinessList;
