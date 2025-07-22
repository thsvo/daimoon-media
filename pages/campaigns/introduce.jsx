import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '/components/Layout';
import ShopContext from '/context/Order/shop-context';
import sha256 from 'crypto-js/sha256'; 

const IntroducePage = () => {
  const router = useRouter();
  const context = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phone: ''
  });

  // Helper to hash data as required by Facebook/Google
  const hashData = (value) => {
    if (!value) return '';
    return sha256(value.trim().toLowerCase()).toString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare hashed user data
    const userData = {
      em: hashData(formData.email),
      ph: hashData(formData.phone),
      fn: hashData(formData.firstName),
      ln: hashData(formData.lastName),
      db: hashData(formData.dateOfBirth),
    };

    // --- Facebook Enhanced Conversions ---
    // if (typeof window !== 'undefined' && window.fbq) {
    //   window.fbq('track', 'Lead', {}, {
    //     em: userData.em,
    //     ph: userData.ph,
    //     fn: userData.fn,
    //     ln: userData.ln,
    //     db: userData.db,
    //   });
    // }

    // --- Google GA4 Enhanced Conversions ---
    if (typeof window !== 'undefined' && window.gtag) {
     
      window.gtag('event', 'generate_lead_hash', {
        user_data: {
          email: formData.email,
          phone_number: formData.phone,
          first_name: formData.firstName,
          last_name: formData.lastName,
          date_of_birth: formData.dateOfBirth,
        },
   
      });
    }

    // Save the form data to context or process it as needed
    router.push('/campaigns/checkout');
  };

  return (
    <Layout>
      <div className="wrapper flex-1 flex-col center w-full min-h-screen py-10">
        <div className="max-w-[1200px] w-full">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#9ca3af]">
              <span>Introduce yourself</span>
              <span>/</span>
              <span>Address information</span>
              <span>/</span>
              <span>Payment methods</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-8">Checkout: Address information</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-[800px]">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name*"
                  className="bg-[#2a2a2a] rounded-lg p-4"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Last name*"
                  className="bg-[#2a2a2a] rounded-lg p-4"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>

              <input
                type="email"
                placeholder="Email*"
                className="bg-[#2a2a2a] rounded-lg p-4"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />

              <input
                type="text"
                placeholder="Date of birth & be surprised ;)"
                className="bg-[#2a2a2a] rounded-lg p-4"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
              />

              <div className="flex items-center">
                <select className="bg-[#2a2a2a] rounded-l-lg p-4 border-r border-gray-600">
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+33">+33</option>
                  {/* Add more country codes as needed */}
                </select>
                <input
                  type="tel"
                  placeholder="Phone (Optional, for support)"
                  className="bg-[#2a2a2a] rounded-r-lg p-4 flex-1"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <button
                type="submit"
                className="bg-[#8b5cf6] text-white rounded-lg p-4 mt-4 hover:bg-[#7c3aed] transition-colors"
              >
                Save & Next Step👉
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IntroducePage;