import { UpdateOrder } from '/lib/ExistingOrder';

export const UPDATE_ORDER_OBJECT = 'UPDATE_ORDER_OBJECT';
export const ADD_CAMPAIGN = 'ADD_CAMPAIGN';
export const ADD_ALBUM = 'ADD_ALBUM';
export const REMOVE_CAMPAIGN = 'REMOVE_CAMPAIGN';
export const EDIT_CAMPAIGN = 'EDIT_CAMPAIGN';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const ADD_DISCOUNT = 'ADD_DISCOUNT';
export const REMOVE_DISCOUNT = 'REMOVE_DISCOUNT';
export const UPDATE_CURRENCY = 'UPDATE_CURRENCY';
export const UPGRADE_ESTIMATES = 'UPGRADE_ESTIMATES';
export const UPDATE_VAT = 'UPDATE_VAT';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const UPDATE_PAYMENT_STATUS = 'UPDATE_PAYMENT_STATUS';
export const LOAD_CAMPAIGN = 'LOAD_CAMPAIGN';
export const LOAD_ACCOUNT = 'LOAD_ACCOUNT';
export const REMOVE_UNFINSIHED_CAMPAIGNS = 'REMOVE_UNFINSIHED_CAMPAIGNS';
export const ADD_EXTRA_COST = 'ADD_EXTRA_COST';
export const TOGGLE_PROMOTIONAL_PACKAGE = 'TOGGLE_PROMOTIONAL_PACKAGE';

const updateOrderObject = (obj, state) => {
  return {
    ...state,
    order: {
      ...state.order,
      ...obj,

      customerDetails: {
        ...state.order.customerDetails,
        ...obj.customerDetails,
        geoLocation: {
          ...state.order.customerDetails?.geoLocation,
          ...obj.customerDetails?.geoLocation,
        },
        company_details: {
          ...state.order.customerDetails?.company_details,
          ...obj.customerDetails?.company_details,
        },
      },
      currency: {
        ...state.order.currency,
        ...obj.currency,
      },
      totalPriceDetails: {
        ...state.order.totalPriceDetails,
        ...obj.totalPriceDetails,
      },
    },
  };
};

const addExtraCosts = (cost, state) => {
  const updatedCampaigns = [...state.order.campaigns];
  const vat = state.order.totalPriceDetails.VAT;
  const conversionRate = state.order.currency.conversionrate;
  let discountInUSD = 0;

  let TotalPrice = calculatePriceInUsdExcl(updatedCampaigns, state);

  // if (TotalPrice > 150) {
  //   discountInUSD = TotalPrice * 0.3;
  //   TotalPrice = TotalPrice * 0.7;
  // }

  return {
    ...state,
    order: {
      ...state.order,
      totalPriceDetails: {
        ...state.order.totalPriceDetails,
        discountInUSD: discountInUSD,
        paymentFee: (
          ((TotalPrice * cost - TotalPrice) / conversionRate) *
          vat
        ).toFixed(2),
        amount_EUR_incl_vat: (
          ((TotalPrice * cost) / conversionRate) *
          vat
        ).toFixed(2),
        amount_EUR_excl_vat: ((TotalPrice / conversionRate) * cost).toFixed(2),
        amount_local_incl_vat: (TotalPrice * cost * vat).toFixed(2),
        amount_local_excl_vat: (TotalPrice * cost).toFixed(2),
      },
    },
  };
};

const loadPreviousCart = (obj, state) => {
  const orderObject = { ...obj };

  return {
    ...state,
    order: orderObject,
  };
};

const loadAccountDetails = (details, state) => {
  const orderObject = {
    ...state.order,
    customerDetails: { ...details },
  };

  return {
    ...state,
    order: orderObject,
  };
};

const addAlbum = (album, state) => {
  const campaigns = [...state.order.campaigns];
  const breadcrumb = [...state.breadcrumb];

  const albumObject = [];

  album.map((track, index) => {
    albumObject.push({
      ...track,
      id: 'SP' + '-' + (index + 1),
    });
  });

  campaigns
    .filter((e) => e.service === 'spotify')
    .map((e) => e.campaigns.push(...albumObject));

  breadcrumb.find((e) => e.service === 'spotify').step = 'overview';

  return {
    ...state,
    order: {
      ...state.order,
      campaigns: campaigns,
    },
    breadcrumb: breadcrumb,
  };
};

const addCampaign = (track, campaign, state) => {
  const campaigns = [...state.order.campaigns];
  const breadcrumb = [...state.breadcrumb];
  const totalPriceDetails = { ...state.order.totalPriceDetails };
  const vat = state.order.totalPriceDetails.VAT;
  const conversionRate = state.order.currency.conversionrate;
  let discountInUSD = 0;

  let TotalPrice = 0;

  campaign &&
    track.campaignObject.campaign.push({
      index: 0,
      label: 'Campaign:',
      specialPackage: campaign.specialPackage,
      value: {
        baseCostExcl: campaign.price,
        budget: 160,
        cost: campaign.price,
        costEUR: (campaign.price / conversionRate).toFixed(2),
        max_followers: campaign.followers,
        max_streams: campaign.streams,
        min_followers: campaign.followers,
        min_streams: campaign.streams,
        playlists: 0,
        streams: campaign.streams,
        text: campaign.text,
        value: campaign.followers,
      },
    });

  if (
    campaigns
      .find((e) => e.service === track.service)
      .campaigns.findIndex(
        (e) => e.campaignObject.id == track.campaignObject.id
      ) == -1
  ) {
    let service = '';

    switch (track.service) {
      case 'spotify':
        service = 'SP';
        break;
      case 'youtube':
        service = 'YT';
        break;
      case 'soundcloud':
        service = 'SC';
        break;
      case 'tiktok':
        service = 'TK';
        break;
    }

    const length = campaigns.find((e) => e.service === track.service).campaigns
      .length;

    const id = service + '-' + (length + 1);

    campaigns
      .find((e) => e.service === track.service)
      .campaigns.push({ ...track, id: id });

    if (track.campaignObject.campaign.length != 0) {
      campaigns.find((e) => e.service === track.service).total = length + 1;
    }

    breadcrumb.find((e) => e.service === track.service).step = 'overview';

    TotalPrice = calculatePriceInUsdExcl(campaigns, state);

    // if (TotalPrice > 150) {
    //   discountInUSD = TotalPrice * 0.3;
    //   TotalPrice = TotalPrice * 0.7;
    // }
  }

  return {
    ...state,
    order: {
      ...state.order,
      campaigns: campaigns,
      totalPriceDetails: {
        ...totalPriceDetails,
        discountInUSD: discountInUSD,
        amount_EUR_incl_vat: ((TotalPrice / conversionRate) * vat).toFixed(2),
        amount_EUR_excl_vat: (TotalPrice / conversionRate).toFixed(2),
        amount_local_incl_vat: (TotalPrice * vat).toFixed(2),
        amount_local_excl_vat: TotalPrice.toFixed(2),
      },
    },
    breadcrumb: breadcrumb,
  };
};

const TogglePromotionalPackage = (promotion, state) => {
  const campaigns = [...state.order.campaigns];
  const vat = state.order.totalPriceDetails.VAT;
  const conversionRate = state.order.currency.conversionrate;
  let targetCost = 0;
  let discountInUSD = 0;

  //REVAMP THIS BLOCK OF CODE WHEN READY

  const serviceIndex = campaigns.findIndex(
    (e) => e.service === promotion.service
  );

  const updatedItemIndex = campaigns[serviceIndex].campaigns.findIndex(
    (item) => item.id === promotion.trackId
  );

  const entry =
    campaigns[serviceIndex].campaigns[updatedItemIndex].campaignObject.campaign[
      promotion.promotion.labelIndex
    ].value;

  const discount = promotion.promotion.item;

  let targets = [];

  if (promotion.service == 'youtube' && entry.targets.length != 0) {
    if (!entry.promotional) {
      targets = entry.targets.map((target) => {
        const precentage = parseInt(target.cost.replace('%', ''));
        const baseCost = entry.baseCostExcl + discount.cost;
        target.costExcl = (baseCost / 100) * precentage;
        targetCost = targetCost + target.costExcl;

        return target;
      });
    } else {
      targets = entry.targets.map((target) => {
        const precentage = parseInt(target.cost.replace('%', ''));

        target.costExcl = (entry.baseCostExcl / 100) * precentage;
        targetCost = targetCost + target.costExcl;

        return target;
      });
    }
  }

  if (!entry.promotional) {
    campaigns[serviceIndex].campaigns[updatedItemIndex].campaignObject.campaign[
      promotion.promotion.labelIndex
    ].value = {
      ...entry,
      targets: targets,
      value: discount.value + entry.value,
      streams: discount.streams + entry.streams,
      text: entry.text,
      min_streams: discount.min_streams + entry.min_streams,
      max_streams: discount.max_streams + entry.max_streams,
      min_followers: discount.min_followers + entry.min_followers,
      max_followers: discount.max_followers + entry.max_followers,
      cost: discount.cost + entry.baseCostExcl + targetCost,
      costEUR: (
        (discount.cost + entry.baseCostExcl + targetCost) /
        conversionRate
      ).toFixed(2),
      baseCostExcl: entry.baseCostExcl,
      playlists: discount.playlists + entry.playlists,
      promotional: [
        {
          labelIndex: promotion.promotion.labelIndex,
          promo: {
            text: discount.text,
            value: discount.value,
            cost: discount.cost,
          },
        },
      ],
      budget: entry.budget + discount.budget,
    };
  } else {
    delete campaigns[serviceIndex].campaigns[updatedItemIndex].campaignObject
      .campaign[promotion.promotion.labelIndex].value.promotional;

    campaigns[serviceIndex].campaigns[updatedItemIndex].campaignObject.campaign[
      promotion.promotion.labelIndex
    ].value = {
      ...entry,
      targets: targets,
      value: entry.value - discount.value,
      streams: entry.streams - discount.streams,
      text: entry.text,
      min_streams: entry.min_streams - discount.min_streams,
      max_streams: entry.max_streams - discount.max_streams,
      min_followers: entry.min_followers - discount.min_followers,
      max_followers: entry.max_followers - discount.max_followers,
      cost: entry.baseCostExcl + targetCost,
      costEUR: (entry.baseCostExcl + targetCost / conversionRate).toFixed(2),
      baseCostExcl: entry.baseCostExcl,
      playlists: entry.playlists - discount.playlists,

      budget: entry.budget - discount.budget,
    };
  }

  let TotalPrice = calculatePriceInUsdExcl(campaigns, state);

  // if (TotalPrice > 150) {
  //   discountInUSD = TotalPrice * 0.3;
  //   TotalPrice = TotalPrice * 0.7;
  // }

  return {
    ...state,
    order: {
      ...state.order,

      totalPriceDetails: {
        ...state.order.totalPriceDetails,
        discountInUSD: discountInUSD,
        amount_EUR_incl_vat: ((TotalPrice / conversionRate) * vat).toFixed(2),
        amount_EUR_excl_vat: (TotalPrice / conversionRate).toFixed(2),
        amount_local_incl_vat: (TotalPrice * vat).toFixed(2),
        amount_local_excl_vat: TotalPrice.toFixed(2),
      },
    },
  };
};

const calculatePriceInUsdExcl = (updatedCampaigns, state) => {
  const addCoupons = [...state.order.totalPriceDetails.coupons];

  let totalValue = 0;
  updatedCampaigns.map((entry) => {
    entry.total > 0 &&
      entry.campaigns.map((campaign) => {
        campaign.campaignObject.campaign.map((o) => {
          totalValue = totalValue + o.value.cost;
        });
      });
  });

  if (addCoupons.length != 0) {
    addCoupons.map((item) => {
      if (item.result.amount.includes('%')) {
        let discountPrice = (
          (totalValue / 100) *
          item.result.amount.replace('%', '')
        ).toFixed(2);

        item.result.discount = discountPrice;
        totalValue = totalValue - discountPrice;
      }
      if (!item.result.amount.includes('%')) {
        if (item.result.amount > totalValue) {
          item.result.discount = totalValue;
          totalValue = 0;
        } else {
          item.result.discount = item.result.amount;
          totalValue = totalValue - item.result.amount;
        }
      }
    });
  }

  return Math.round(totalValue * 100) / 100;
};

const updateCurrency = (currency, state) => {
  const updatedCampaigns = [...state.order.campaigns];
  const vat = state.order.totalPriceDetails.VAT;
  const conversionRate = currency.valuta.conversionrate;
  let discountInUSD = 0;

  let TotalPrice = calculatePriceInUsdExcl(updatedCampaigns, state);

  // if (TotalPrice > 150) {
  //   discountInUSD = TotalPrice * 0.3;
  //   TotalPrice = TotalPrice * 0.7;
  // }

  return {
    ...state,
    order: {
      ...state.order,
      customerDetails: {
        ...state.order.customerDetails,
        country: currency.country,
      },
      currency: currency.valuta,
      totalPriceDetails: {
        ...state.order.totalPriceDetails,
        discountInUSD: discountInUSD,
        amount_EUR_incl_vat: ((TotalPrice / conversionRate) * vat).toFixed(2),
        amount_EUR_excl_vat: (TotalPrice / conversionRate).toFixed(2),
        amount_local_incl_vat: (TotalPrice * vat).toFixed(2),
        amount_local_excl_vat: TotalPrice.toFixed(2),
      },
    },
  };
};

const addDiscount = (discount, state) => {
  const updatedCampaigns = [...state.order.campaigns];
  const totalPriceDetails = { ...state.order.totalPriceDetails };
  const vat = state.order.totalPriceDetails.VAT;
  const conversionRate = state.order.currency.conversionrate;
  const addCoupons = [...state.order.totalPriceDetails.coupons, discount];
  let discountInUSD = 0;

  let TotalPrice = calculatePriceInUsdExcl(updatedCampaigns, state);

  // if (TotalPrice > 150) {
  //   discountInUSD = TotalPrice * 0.3;
  //   TotalPrice = TotalPrice * 0.7;
  // }

  addCoupons.map((item) => {
    if (item.result.amount.includes('%')) {
      let discountPrice = (
        (TotalPrice / 100) *
        item.result.amount.replace('%', '')
      ).toFixed(2);
      item.result.discount = discountPrice;
      TotalPrice = TotalPrice - discountPrice;
    }
    if (!item.result.amount.includes('%')) {
      if (item.result.amount > TotalPrice) {
        item.result.discount = TotalPrice;
        TotalPrice = 0;
      } else {
        item.result.discount = item.result.amount;
        TotalPrice = TotalPrice - item.result.amount;
      }
    }
  });

  return {
    ...state,
    order: {
      ...state.order,
      campaigns: updatedCampaigns,
      totalPriceDetails: {
        ...totalPriceDetails,
        discountInUSD: discountInUSD,
        amount_EUR_incl_vat: ((TotalPrice / conversionRate) * vat).toFixed(2),
        amount_EUR_excl_vat: (TotalPrice / conversionRate).toFixed(2),
        amount_local_incl_vat: (TotalPrice * vat).toFixed(2),
        amount_local_excl_vat: TotalPrice.toFixed(2),
        coupons: [...addCoupons],
      },
    },
  };
};

const upgradeEstimates = (upgrade, state) => {
  const campaigns = [...state.order.campaigns];

  campaigns.map((e) => {
    e.campaigns.map((item, index) => {
      item.campaignObject.campaign.map((campaign) => {
        campaign.value.value =
          Math.round(campaign.value.value * upgrade * 100) / 100 || 0;

        campaign.value.max_followers =
          Math.round(campaign.value.max_followers * upgrade * 100) / 100 || 0;

        campaign.value.min_followers =
          Math.round(campaign.value.min_followers * upgrade * 100) / 100 || 0;

        campaign.value.max_streams =
          Math.round(campaign.value.max_streams * upgrade * 100) / 100 || 0;

        campaign.value.min_streams =
          Math.round(campaign.value.min_streams * upgrade * 100) / 100 || 0;

        campaign.value.streams =
          Math.round(campaign.value.streams * upgrade * 100) / 100 || 0;

        if (e.service != 'spotify' && e.service != 'tiktok') {
          const numericValue = parseFloat(
            campaign.value.text.replace(/,/g, '')
          );
          const updatedValue = isNaN(
            Math.round(numericValue * upgrade * 100) / 100
          )
            ? 0
            : Math.round(numericValue * upgrade * 100) / 100;
          campaign.value.text = updatedValue.toFixed(3);
        }
      });
    });
  });
  console.log('upgrade', campaigns);

  return {
    ...state,
    order: {
      ...state.order,
      campaigns: campaigns,
    },
  };
};

const removeDiscount = (discount, state) => {
  const updatedCampaigns = [...state.order.campaigns];
  const totalPriceDetails = { ...state.order.totalPriceDetails };
  const vat = state.order.totalPriceDetails.VAT;
  const conversionRate = state.order.currency.conversionrate;
  const coupons = [...state.order.totalPriceDetails.coupons];
  let discountInUSD = 0;

  const couponIndex = coupons.findIndex(
    (item) => item.result.name === discount
  );

  coupons.splice(couponIndex, 1);

  let TotalPrice = calculatePriceInUsdExcl(updatedCampaigns, state);

  // if (TotalPrice > 150) {
  //   discountInUSD = TotalPrice * 0.3;
  //   TotalPrice = TotalPrice * 0.7;
  // }

  coupons.map((item) => {
    if (item.result.amount.includes('%')) {
      let discountPrice =
        (TotalPrice / 100) * item.result.amount.replace('%', '');
      TotalPrice = TotalPrice - discountPrice;
    }
  });

  return {
    ...state,
    order: {
      ...state.order,
      campaigns: updatedCampaigns,
      totalPriceDetails: {
        ...totalPriceDetails,
        discountInUSD: discountInUSD,
        amount_EUR_incl_vat: ((TotalPrice / conversionRate) * vat).toFixed(2),
        amount_EUR_excl_vat: (TotalPrice / conversionRate).toFixed(2),
        amount_local_incl_vat: (TotalPrice * vat).toFixed(2),
        amount_local_excl_vat: TotalPrice.toFixed(2),
        coupons: [...coupons],
      },
    },
  };
};

const editCampaign = (track, campaign, state) => {
  const updatedCampaigns = [...state.order.campaigns];
  const totalPriceDetails = { ...state.order.totalPriceDetails };
  const vat = state.order.totalPriceDetails.VAT;
  const conversionRate = state.order.currency.conversionrate;
  let discountInUSD = 0;

  const serviceIndex = updatedCampaigns.findIndex(
    (e) => e.service === track.service
  );

  const updatedItemIndex = updatedCampaigns[serviceIndex].campaigns.findIndex(
    (item) => item.id === track.id
  );

  const entry = updatedCampaigns[serviceIndex].campaigns[updatedItemIndex];

  campaign.map(
    (item) =>
      (item.value.costEUR = (item.value.cost / conversionRate).toFixed(2))
  );

  updatedCampaigns[serviceIndex].campaigns[updatedItemIndex] = {
    ...entry,
    campaignObject: { ...entry.campaignObject, campaign: campaign },
  };

  updatedCampaigns.find((e) => e.service === track.service).total = 0;

  updatedCampaigns[serviceIndex].campaigns.map((i) => {
    if (i.campaignObject.campaign.length != 0) {
      updatedCampaigns.find((e) => e.service === track.service).total++;
    }
  });

  let TotalPrice = calculatePriceInUsdExcl(updatedCampaigns, state);

  // if (TotalPrice > 150) {
  //   discountInUSD = TotalPrice * 0.3;
  //   TotalPrice = TotalPrice * 0.7;
  // }

  return {
    ...state,
    order: {
      ...state.order,
      campaigns: updatedCampaigns,
      totalPriceDetails: {
        ...totalPriceDetails,
        discountInUSD: discountInUSD,
        amount_EUR_incl_vat: ((TotalPrice / conversionRate) * vat).toFixed(2),
        amount_EUR_excl_vat: (TotalPrice / conversionRate).toFixed(2),
        amount_local_incl_vat: (TotalPrice * vat).toFixed(2),
        amount_local_excl_vat: TotalPrice.toFixed(2),
      },
    },
  };
};

const removeCampaign = (id, service, state) => {
  const updatedCampaigns = [...state.order.campaigns];
  const totalPriceDetails = { ...state.order.totalPriceDetails };
  const vat = state.order.totalPriceDetails.VAT;
  const conversionRate = state.order.currency.conversionrate;
  const breadcrumb = state.breadcrumb;
  let discountInUSD = 0;

  const serviceIndex = updatedCampaigns.findIndex((e) => e.service === service);

  const updatedItemIndex = updatedCampaigns[serviceIndex].campaigns.findIndex(
    (item) => item.id === id
  );

  if (updatedItemIndex != -1) {
    if (
      updatedCampaigns[serviceIndex].campaigns[updatedItemIndex].campaignObject
        .campaign.length
    ) {
      updatedCampaigns[serviceIndex].total--;
    }
    updatedCampaigns[serviceIndex].campaigns.splice(updatedItemIndex, 1);
  }

  //Resetting breadcrumb so the entire Productpage is showing
  const breadcrumbIndex = breadcrumb.findIndex((e) => e.service === service);
  updatedCampaigns[serviceIndex].campaigns.length == 0 &&
    (breadcrumb[breadcrumbIndex].step = 'search');

  //breadcrumb[breadcrumbIndex]
  //breadcrumb.findIndex((e) => e.service === service).step == 'search';

  let TotalPrice = calculatePriceInUsdExcl(updatedCampaigns, state);

  // if (TotalPrice > 150) {
  //   discountInUSD = TotalPrice * 0.3;
  //   TotalPrice = TotalPrice * 0.7;
  // }

  const updatedState = {
    ...state,
    order: {
      campaigns: updatedCampaigns,
      ...state.order,
      totalPriceDetails: {
        ...totalPriceDetails,
        discountInUSD: discountInUSD,
        amount_EUR_incl_vat: ((TotalPrice / conversionRate) * vat).toFixed(2),
        amount_EUR_excl_vat: (TotalPrice / conversionRate).toFixed(2),
        amount_local_incl_vat: (TotalPrice * vat).toFixed(2),
        amount_local_excl_vat: TotalPrice.toFixed(2),
      },
    },
  };

  //Update order in DB
  UpdateOrder(updatedState.order.order_id, updatedState.order);

  return updatedState;
};

const removeUnfinishedCampaigns = (state) => {
  const allCampaigns = [...state.order.campaigns];
  const updatedCampaigns = [];

  allCampaigns.map((service, serviceIndex) => {
    updatedCampaigns.push({
      service: service.service,
      campaigns: [],
      total: 0,
    });
    service.campaigns.map((track, index) => {
      let value = 0;
      track.campaignObject.campaign.map((campaign) => {
        value = value + campaign.value.cost;
      });

      if (value != 0) {
        updatedCampaigns[serviceIndex].campaigns.push(track);
        updatedCampaigns[serviceIndex].total++;
        //allCampaigns[serviceIndex].total--;
      }
    });
  });

  return {
    ...state,
    order: {
      ...state.order,
      campaigns: updatedCampaigns,
    },
  };
};

const updateVAT = (vat, state) => {
  const totalPriceDetails = { ...state.order.totalPriceDetails };
  const updatedCampaigns = [...state.order.campaigns];
  const conversionRate = state.order.currency.conversionrate;
  let discountInUSD = 0;

  state.order.totalPriceDetails.VAT = vat;

  let TotalPrice = calculatePriceInUsdExcl(updatedCampaigns, state);

  // if (TotalPrice > 150) {
  //   discountInUSD = TotalPrice * 0.3;
  //   TotalPrice = TotalPrice * 0.7;
  // }

  return {
    ...state,
    order: {
      ...state.order,
      totalPriceDetails: {
        ...totalPriceDetails,
        discountInUSD: discountInUSD,
        amount_EUR_incl_vat: ((TotalPrice / conversionRate) * vat).toFixed(2),
        amount_EUR_excl_vat: (TotalPrice / conversionRate).toFixed(2),
        amount_local_incl_vat: (TotalPrice * vat).toFixed(2),
        amount_local_excl_vat: TotalPrice.toFixed(2),
        VAT: vat,
      },
    },
  };
};

const updatePayementStatus = (status, state) => {
  return {
    ...state,
    paymentStatus: status,
  };
};

const updateCompany = (company, state) => {
  const customerDetails = { ...state.order.customerDetails };

  return {
    ...state,
    order: {
      ...state.order,
      customerDetails: {
        ...customerDetails,
        company: true,
        company_details: {
          ...customerDetails.company_details,
          ...company,
        },
      },
    },
  };
};

export const shopReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_ORDER_OBJECT:
      return updateOrderObject(action.obj, state);
    case LOAD_CAMPAIGN:
      return loadPreviousCart(action.obj, state);
    case LOAD_ACCOUNT:
      return loadAccountDetails(action.details, state);
    case ADD_CAMPAIGN:
      return addCampaign(action.track, action.campaign, state);
    case ADD_ALBUM:
      return addAlbum(action.album, state);
    case EDIT_CAMPAIGN:
      return editCampaign(action.track, action.campaign, state);
    case REMOVE_CAMPAIGN:
      return removeCampaign(action.id, action.service, state);
    case REMOVE_UNFINSIHED_CAMPAIGNS:
      return removeUnfinishedCampaigns(state);
    case ADD_DISCOUNT:
      return addDiscount(action.discount, state);
    case REMOVE_DISCOUNT:
      return removeDiscount(action.discount, state);
    case UPGRADE_ESTIMATES:
      return upgradeEstimates(action.upgrade, state);
    case UPDATE_CURRENCY:
      return updateCurrency(action.currency, state);
    case UPDATE_VAT:
      return updateVAT(action.vat, state);
    case UPDATE_COMPANY:
      return updateCompany(action.company, state);
    case UPDATE_PAYMENT_STATUS:
      return updatePayementStatus(action.status, state);
    case ADD_EXTRA_COST:
      return addExtraCosts(action.cost, state);
    case TOGGLE_PROMOTIONAL_PACKAGE:
      return TogglePromotionalPackage(action.promotion, state);
    default:
      return state;
  }
};
