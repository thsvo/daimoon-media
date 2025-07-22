//Core
import { useState, useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
//Helpers

//Library
import Search from '/components/Search';
import ShopContext from '/context/Order/shop-context';
import Layout from '/components/Layout';
import SpecialItemPackage from '/ui/SpecialItemPackage';
import Cookies from 'universal-cookie';
import ReleaseDate from '/components/ReleaseDate';

import loader from '/public/icons/loader.gif';
import Spotlight2 from '/public/Spotlights/spotlight-2.png';

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

const Welcome = () => {
  const context = useContext(ShopContext);
  const router = useRouter();
  const cookies = new Cookies();
  const [step, setStep] = useState('search');
  const [loading, setLoading] = useState(false);
  const [track, setTrack] = useState();
  const [selectedPackage, setSelectedPackage] = useState();
  const [packageCheck, setPackageCheck] = useState(false);
  const [releaseDate, setReleaseDate] = useState(false);

  const toggleReleaseDate = () => {
    setReleaseDate(!releaseDate);
  };

  const [modal, setModal] = useState({
    visible: false,
    status: 'succes',
    message: 'Song found!',
  });

  const updateTrack = async () => {
    setLoading(true);
    const spotifyCampaign = context.order.campaigns.find((e) => e.service === 'spotify');
    if (spotifyCampaign && spotifyCampaign.campaigns.length > 0) {
      const lastCampaign = spotifyCampaign.campaigns[spotifyCampaign.campaigns.length - 1];
      await context.editCampaign(lastCampaign, selectedPackage);
    }

    setTimeout(() => {
      router.push('/campaigns/checkout?step=personal');
    }, '1000');
  };

  useEffect(() => {
    selectedPackage && updateTrack();
  }, [selectedPackage]);

  return (
    <Layout>
      {/* Right spotlight - hidden on small screens */}
      <div className='absolute right-[-400px] bottom-[-300px] opacity-70 md:opacity-100 hidden md:block'>
        <Image
          width={700}
          height={700}
          src={Spotlight2}
          placeholder='blur'
          alt={''}
          priority
        />
      </div>
      <div className='wrapper flex-1 flex-col center w-full min-h-screen px-4 md:px-0'>
        {(cookies.get('usedPromotionalPackage') && packageCheck == false) ||
        packageCheck == true ? (
          <div className='text-center p-4 md:p-8'>
            <h1 className='bold text-xl md:text-2xl'>
              A custom package has already been added into your cart or has been
              bought
            </h1>
          </div>
        ) : (
          <>
            <div className='flex py-5 md:py-10 px-4 md:px-10 min-h-[170px] my-5 md:my-10 center w-full'>
              <AnimatePresence mode={'popLayout'}>
                {loading ? (
                  <div className='flex justify-center items-center'>
                    <Image width={50} height={50} src={loader} alt={''} />
                  </div>
                ) : (
                  <>
                    {step == 'search' && (
                      <div className='flex flex-col center w-full'>
                        <div className='text-center'>
                          <h1 className='bold text-xl md:text-2xl'>Step 1: Search Your Track</h1>
                        </div>

                        <p className='text-center max-w-[680px] italic bold text-sm md:text-base px-2 md:px-0 my-2 md:my-3'>{`Before you're able to select your exclusive deal, you'll need to find your track first.`}</p>
                        <span className='text-center text-sm md:text-base mb-4'>
                          Are you ready to get the ground shaking, partner? 🤝
                        </span>
                        <motion.div
                          className='mt-4 md:mt-6 w-full'
                          key={'search'}
                          variants={variants}
                          initial='hidden'
                          animate='enter'
                          exit='exit'
                          transition={{ type: 'linear' }}
                        >
                          <div className='w-full max-w-[380px] mx-auto'>
                            {releaseDate ? (
                              <ReleaseDate
                                toggleReleaseDate={toggleReleaseDate}
                                activeService={'spotify'}
                                route={false}
                                onTrackAdded={() => setStep('package')}
                              />
                            ) : (
                              <>
                                <Search
                                  activeField={false}
                                  setModal={setModal}
                                  activeService={'spotify'}
                                  placeholder={`Search song or paste Spotify link`}
                                  redirect={false}
                                  campaign={true}
                                  callback={(item) => {
                                    if (item) {
                                      setTrack(item);
                                      setStep('package');
                                    }
                                  }}
                                />
                                <p
                                  onClick={() => toggleReleaseDate(true)}
                                  style={{ color: '#1db954' }}
                                  className="text-center font-bold mt-2 cursor-pointer text-sm md:text-base"
                                >
                                  <u>My release is not live yet</u> 👋
                                </p>
                              </>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    )}
                    {step == 'package' && (
                      <div className='flex flex-col center w-full'>
                        <div className='text-center'>
                          <h1 className='bold text-xl md:text-2xl'>Step 2: Claim Deal</h1>
                        </div>
                        <p className='text-center max-w-[680px] italic bold text-sm md:text-base px-2 md:px-0 my-2 md:my-3'>{`Click on the Spotify Dominance package to claim it!`}</p>
                        <span className='text-center text-sm md:text-base mb-4'>
                          It will only be available for purchase once. See you
                          on the other side!
                        </span>
                        <motion.div
                          className='mt-4 md:mt-6 w-full px-2 md:px-0'
                          key={'specialPackages'}
                          variants={variants}
                          initial='hidden'
                          animate='enter'
                          exit='exit'
                          transition={{ type: 'linear' }}
                        >
                          <SpecialItemPackage
                            streams='6000'
                            min_streams='5000'
                            max_streams='7000'
                            followers='30000'
                            originalPrice='147'
                            newPrice='97'
                            budget='48'
                            setSelectedPackage={setSelectedPackage}
                          />
                        </motion.div>
                      </div>
                    )}
                  </>
                )}
              </AnimatePresence>
              {/* Left spotlight - hidden on small screens */}
              <div className='absolute left-[-400px] bottom-[-300px] opacity-70 md:opacity-100 hidden md:block'>
                <Image
                  width={700}
                  height={700}
                  src={Spotlight2}
                  placeholder='blur'
                  alt={''}
                  priority
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Welcome;