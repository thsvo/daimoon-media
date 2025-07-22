import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { useTrustpilot, loadTrustpilotScript } from '/hooks/useTrustpilot';

const TrustpilotWidget = ({
  templateId = "5419b732fbfb950b10de65e5",
  businessunitId = "5c79635565c9d500015b04c9",
  locale = "en-US",
  styleHeight = "30px",
  styleWidth = "100%",
  theme = "dark",
  scale = 1.1,
  mobileScale = 1.25,
  iframeHeight = "50px",
  mobileIframeHeight = "70px",
  className = "",
  showScript = true,
  ...props
}) => {
  const widgetRef = useRef(null);
  const { isLoaded } = useTrustpilot();

  // Generate unique ID for this widget instance
  const widgetId = `trustpilot-widget-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      {showScript && (
        <Script
          src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="afterInteractive"
          onLoad={() => {
            window.dispatchEvent(new Event('trustpilot-loaded'));
          }}
          onError={() => {
            // Retry with fallback loading
            loadTrustpilotScript().catch(() => {
              // Final fallback after 3 seconds
              setTimeout(() => {
                loadTrustpilotScript().catch(console.warn);
              }, 3000);
            });
          }}
        />
      )}
      
      <style jsx>{`
        .${widgetId} {
          transform: scale(${scale});
          transform-origin: center;
        }
        .${widgetId} iframe {
          height: ${iframeHeight} !important;
        }
        @media (max-width: 600px) {
          .${widgetId} {
            transform: scale(${mobileScale});
          }
          .${widgetId} iframe {
            height: ${mobileIframeHeight} !important;
          }
        }
      `}</style>
      
      <div
        ref={widgetRef}
        className={`trustpilot-widget ${widgetId} ${className}`}
        data-locale={locale}
        data-template-id={templateId}
        data-businessunit-id={businessunitId}
        data-style-height={styleHeight}
        data-style-width={styleWidth}
        data-theme={theme}
        {...props}
      >
        <a
          href="https://www.trustpilot.com/review/daimoon.media"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Fallback content */}
        </a>
      </div>
    </>
  );
};

export default TrustpilotWidget;
