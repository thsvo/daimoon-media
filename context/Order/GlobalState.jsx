import React, { useState, useEffect, useReducer } from 'react';
import { useSession } from 'next-auth/react';
import Cookies from 'universal-cookie';

import { GetOrder } from '/lib/ExistingOrder';
import { GetCurrency } from '/lib/Geo';

import ShopContext from './shop-context';
import {
  shopReducer,
  LOAD_CAMPAIGN,
  LOAD_ACCOUNT,
  ADD_CAMPAIGN,
  ADD_ALBUM,
  REMOVE_CAMPAIGN,
  EDIT_CAMPAIGN,
  UPDATE_CURRENCY,
  ADD_DISCOUNT,
  REMOVE_DISCOUNT,
  UPGRADE_ESTIMATES,
  UPDATE_ORDER_OBJECT,
  UPDATE_VAT,
  UPDATE_COMPANY,
  UPDATE_PAYMENT_STATUS,
  REMOVE_UNFINSIHED_CAMPAIGNS,
  ADD_EXTRA_COST,
  TOGGLE_PROMOTIONAL_PACKAGE,
} from './reducers';

const GlobalState = (props) => {
  const cookies = new Cookies();
  const orderId = cookies.get('orderId');
  const { data: session, status } = useSession();

  const orderObj = {
    order_id: '',
    campaigns: [
      {
        service: 'tiktok',
        campaigns: [],
        total: 0,
      },
      {
        service: 'spotify',
        campaigns: [],
        total: 0,
      },
      {
        service: 'youtube',
        campaigns: [],
        total: 0,
      },
      {
        service: 'soundcloud',
        campaigns: [],
        total: 0,
      },
    ],
    tstamp: '',
    note: '',
    customerDetails: {
      geoLocation: {
        ip: '',
        country: '',
        countryCode: '',
      },
      name: '',
      fname: '',
      lname: '',
      email: '',
      date_of_birth: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      countryCode: '',
      region: '',
      postal_code: '',
      company: false,
      company_details: {
        campany_name: '',
        vat_number: '',
        chamber_of_commerce: '',
      },
    },
    currency: {
      conversionrate: 1,
      code: 'USD',
    },
    totalPriceDetails: {
      amount_EUR_incl_vat: 0,
      amount_EUR_excl_vat: 0,
      amount_local_incl_vat: 0,
      amount_local_excl_vat: 0,
      VAT: 1,
      coupons: [],
    },
  };
  const [cartState, dispatch] = useReducer(shopReducer, {
    paymentStatus: '',
    breadcrumb: [
      {
        service: 'tiktok',
        step: 'search',
      },
      {
        service: 'spotify',
        step: 'search',
      },
      {
        service: 'youtube',
        step: 'search',
      },
      {
        service: 'soundcloud',
        step: 'search',
      },
    ],
    crossSell: false,
    order: orderObj,
  });

  useEffect(() => {
    GetCurrency().then((response) => {
      const currency = {
        code: response.valuta.code,
        conversionrate: response.valuta.conversionrate,
      };
      const geoLocation = {
        ip: response.country.ip,
        country: response.country.country,
        countryCode: response.country.countryCode,
        eu: response.country.eu,
      };

      updateOrderObject({
        currency: currency,
        customerDetails: {
          geoLocation: geoLocation,
          country: {
            countryCode: response.country.countryCode,
            eu: response.country.eu,
          },
        },
      });

      updateVAT(response.country.eu ? 1.21 : 1.0);
    });
  }, []);

  useEffect(() => {
    //Loading previous cart from DB
    session?.user &&
      loadAccountDetails({
        ...orderObj.customerDetails,
        ...(session?.user.name && { name: session?.user.name }),
        ...(session?.user.fname && { fname: session.user.fname }),
        ...(session?.user.lname && { lname: session.user.lname }),
        email: session?.user.email,
        date_of_birth: session?.user.birthday,
      });

    orderId &&
      orderId != 'undefined' &&
      GetOrder(orderId).then((order) => {
        loadPreviousCart(order);
      });
  }, [orderId, session?.user]);

  const loadPreviousCart = (obj) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: LOAD_CAMPAIGN, obj: obj });
    }, 100);
  };

  const updateOrderObject = (obj) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: UPDATE_ORDER_OBJECT, obj: obj });
    }, 100);
  };

  const loadAccountDetails = (details) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: LOAD_ACCOUNT, details: details });
    }, 100);
  };

  const upgradeEstimates = (upgrade) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: UPGRADE_ESTIMATES, upgrade: upgrade });
    }, 100);
  };

  const addAlbum = (album) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: ADD_ALBUM, album: album });
    }, 100);
  };

  const addCampaign = (track, campaign) => {
    dataLayer.push({
      event: 'order_flow',
      service: track.service,
      form_step: 'Add track',
    });

    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: ADD_CAMPAIGN, track: track, campaign: campaign });
    }, 100);
  };

  const TogglePromotionalPackage = (promotion) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: TOGGLE_PROMOTIONAL_PACKAGE, promotion: promotion });
    }, 100);
  };

  const editCampaign = (track, campaign) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: EDIT_CAMPAIGN, track: track, campaign: campaign });
    }, 100);
  };

  const addDiscount = (discount) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: ADD_DISCOUNT, discount: discount });
    }, 100);
  };

  const removeDiscount = (discount) => {
    setTimeout(() => {
      // setCart(updatedCart);
      dispatch({ type: REMOVE_DISCOUNT, discount: discount });
    }, 100);
  };

  const removeCampaign = (id, service) => {
    setTimeout(() => {
      dispatch({ type: REMOVE_CAMPAIGN, id: id, service: service });
    }, 100);
  };

  const removeUnfinishedCampaigns = () => {
    setTimeout(() => {
      dispatch({ type: REMOVE_UNFINSIHED_CAMPAIGNS });
    }, 100);
  };

  const updateCurrency = (currency) => {
    setTimeout(() => {
      dispatch({ type: UPDATE_CURRENCY, currency: currency });
    }, 100);
  };

  const updateVAT = (vat) => {
    setTimeout(() => {
      dispatch({ type: UPDATE_VAT, vat: vat });
    }, 100);
  };

  const updatePayementStatus = (status) => {
    setTimeout(() => {
      dispatch({ type: UPDATE_PAYMENT_STATUS, status: status });
    }, 100);
  };

  const updateCompany = (company) => {
    setTimeout(() => {
      dispatch({ type: UPDATE_COMPANY, company: company });
    }, 100);
  };

  const addExtraCosts = (cost) => {
    setTimeout(() => {
      dispatch({ type: ADD_EXTRA_COST, cost: cost });
    }, 100);
  };

  return (
    <ShopContext.Provider
      value={{
        paymentStatus: cartState.paymentStatus,
        breadcrumb: cartState.breadcrumb,
        order: cartState.order,
        crossSell: cartState.crossSell,
        updateOrderObject: updateOrderObject,
        loadPreviousCart: loadPreviousCart,
        loadAccountDetails: loadAccountDetails,
        updateCurrency: updateCurrency,
        addCampaign: addCampaign,
        TogglePromotionalPackage: TogglePromotionalPackage,
        addAlbum: addAlbum,
        removeCampaign: removeCampaign,
        removeUnfinishedCampaigns: removeUnfinishedCampaigns,
        editCampaign: editCampaign,
        addDiscount: addDiscount,
        removeDiscount: removeDiscount,
        upgradeEstimates: upgradeEstimates,
        updateVAT: updateVAT,
        updateCompany: updateCompany,
        updatePayementStatus: updatePayementStatus,
        addExtraCosts: addExtraCosts,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default GlobalState;
