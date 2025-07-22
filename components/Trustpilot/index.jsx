import TrustpilotWidget from '/components/TrustpilotWidget';
import styles from './notice.module.scss';

const Trustpilot = () => {
  return (
     <>
          <div className={styles.container}>
   <div className={"flex center"}>
                <br/><br/>
             <div className="w-full relative flex items-center lg:pl-20 pt-2">
              <div className=" ">
             <TrustpilotWidget 
               scale={1.4}
               mobileScale={1.25}
               iframeHeight="8px"
               mobileIframeHeight="70px"
               showScript={false} // Don't load script here if loading globally
             />
           </div>
             </div>
               </div>
                 </div>
                   </>
  );
};

export default Trustpilot;