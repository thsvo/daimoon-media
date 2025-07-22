import React from 'react';
import TrustpilotWidget from '/components/TrustpilotWidget';

const TrustpilotMini = () => {
  return (
    <TrustpilotWidget
      templateId="53aa8807dec7e10d38f59f32"
      styleHeight="120px"
      scale={0.8}
      mobileScale={0.95}
      iframeHeight="100px"
      mobileIframeHeight="100px"
      showScript={true}
    />
  );
};

export default TrustpilotMini;
