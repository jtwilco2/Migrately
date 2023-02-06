import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";
import logger from "sabio-debug";

const _logger = logger.extend("translationService");
const endpoint = {
  translationUrl: `${API_HOST_PREFIX}/api/pagetranslations`,
};

const getAppByLanguageId = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint.translationUrl}/v2/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(onGlobalSuccess)
    .then(onGetLanguageSuccess)
    .catch(onGlobalError);
};

const getAppByLanguageIdAdd = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint.translationUrl}/v2/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAppByAll = () => {
  const config = {
    method: "GET",
    url: `${endpoint.translationUrl}/v2/paginate/?pageIndex=0&pageSize=10`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addLink = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.translationUrl}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addTranslationComplete = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.translationUrl}/v2`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const onGetLanguageSuccess = (response) => {
  _logger("onGetLanguageSuccess", response);
  if (
    response?.item[0]?.pageSection?.length > 0 &&
    response?.item[0]?.pageSection?.[0]?.keyValues?.length > 0
  ) {
    const language = {
      ...defaultLanguage,
      migratelyNavBar: { ...defaultLanguage.migratelyNavBar },
      topSection: { ...defaultLanguage.topSection },
      checklist: [...defaultLanguage.checklist],
      migratelyColumns: { ...defaultLanguage.migratelyColumns },
      migratelyFeatures: { ...defaultLanguage.migratelyFeatures },
      newsLetterSignup: { ...defaultLanguage.newsLetterSignup },
      bottomHeading: { ...defaultLanguage.bottomHeading },
      footer: { ...defaultLanguage.footer },
    };
    if (response.item[0].pageSection[0].component === "migratelyNavBar") {
      const result = response.item[0].pageSection[0];
      language.migratelyNavBar.pricing = result.keyValues?.[0]?.keyContent;
      language.migratelyNavBar.contact = result.keyValues?.[1]?.keyContent;
      language.migratelyNavBar.faqs = result.keyValues?.[2]?.keyContent;
      language.migratelyNavBar.login = result.keyValues?.[3]?.keyContent;
      language.migratelyNavBar.register = result.keyValues?.[4]?.keyContent;
      language.migratelyNavBar.language = result.keyValues?.[5]?.keyContent;
    }
    if (response.item[0].pageSection[1].component === "topSection") {
      const result = response.item[0].pageSection[1];
      language.topSection.heading = result.keyValues?.[0]?.keyContent;
      language.topSection.btmHeading = result.keyValues?.[1]?.keyContent;
      language.topSection.learnButton = result.keyValues?.[2]?.keyContent;
    }
    if (response.item[0].pageSection[2].component === "checklist") {
      const result = response.item[0].pageSection[2];
      for (let i = 0; i < language.checklist.length; i++) {
        language.checklist[i] = { ...language.checklist[i] };
        language.checklist[i].title = result.keyValues?.[i]?.keyContent;
      }
    }
    if (response.item[0].pageSection[3].component === "migratelyColumns") {
      const result = response.item[0].pageSection[3];
      language.migratelyColumns.title = result.keyValues?.[0]?.keyContent;
      language.migratelyColumns.subtitle = result.keyValues?.[1]?.keyContent;
    }
    if (response.item[0].pageSection[4].component === "migratelyColumns") {
      const result = response.item[0].pageSection[4];
      language.migratelyColumns.migratelyFeatures = {
        ...language.migratelyColumns.migratelyFeatures,
      };
      language.migratelyColumns.migratelyFeatures.cardTitle1 =
        result.keyValues?.[0]?.keyContent;
      language.migratelyColumns.migratelyFeatures.description1 =
        result.keyValues?.[1]?.keyContent;
      language.migratelyColumns.migratelyFeatures.cardTitle2 =
        result.keyValues?.[2]?.keyContent;
      language.migratelyColumns.migratelyFeatures.description2 =
        result.keyValues?.[3]?.keyContent;
      language.migratelyColumns.migratelyFeatures.cardTitle3 =
        result.keyValues?.[4]?.keyContent;
      language.migratelyColumns.migratelyFeatures.description3 =
        result.keyValues?.[5]?.keyContent;
    }
    if (response.item[0].pageSection[5].component === "migratelyFeatures") {
      const result = response.item[0].pageSection[5];
      language.migratelyFeatures.title = result.keyValues?.[0]?.keyContent;
      language.migratelyFeatures.subtitle = result.keyValues?.[1]?.keyContent;
    }
    if (response.item[0].pageSection[6].component === "migratelyFeatures") {
      const result = response.item[0].pageSection[6];
      language.migratelyFeatures.features = {
        ...language.migratelyFeatures.features,
      };
      language.migratelyFeatures.features.cardTitle1 =
        result.keyValues?.[0]?.keyContent;
      language.migratelyFeatures.features.description1 =
        result.keyValues?.[1]?.keyContent;
      language.migratelyFeatures.features.cardTitle2 =
        result.keyValues?.[2]?.keyContent;
      language.migratelyFeatures.features.description2 =
        result.keyValues?.[3]?.keyContent;
      language.migratelyFeatures.features.cardTitle3 =
        result.keyValues?.[4]?.keyContent;
      language.migratelyFeatures.features.description3 =
        result.keyValues?.[5]?.keyContent;
      language.migratelyFeatures.features.cardTitle4 =
        result.keyValues?.[6]?.keyContent;
      language.migratelyFeatures.features.description4 =
        result.keyValues?.[7]?.keyContent;
      language.migratelyFeatures.features.cardTitle5 =
        result.keyValues?.[8]?.keyContent;
      language.migratelyFeatures.features.description5 =
        result.keyValues?.[9]?.keyContent;
    }
    if (response.item[0].pageSection[7].component === "newsLetterSignup") {
      const result = response.item[0].pageSection[7];
      language.newsLetterSignup.title = result.keyValues?.[0]?.keyContent;
      language.newsLetterSignup.subTitle = result.keyValues?.[1]?.keyContent;
      language.newsLetterSignup.placeHolder = result.keyValues?.[2]?.keyContent;
      language.newsLetterSignup.subButton = result.keyValues?.[3]?.keyContent;
      language.newsLetterSignup.footer = result.keyValues?.[4]?.keyContent;
    }
    if (response.item[0].pageSection[8].component === "bottomHeading") {
      const result = response.item[0].pageSection[8];
      language.bottomHeading.header = result.keyValues?.[0]?.keyContent;
      language.bottomHeading.learnButton = result.keyValues?.[1]?.keyContent;
    }
    if (response.item[0].pageSection[9].component === "footer") {
      const result = response.item[0].pageSection[9];
      language.footer.title = result.keyValues?.[0]?.keyContent;
      language.footer.aboutUs = result.keyValues?.[1]?.keyContent;
      language.footer.products = result.keyValues?.[2]?.keyContent;
      language.footer.blog = result.keyValues?.[3]?.keyContent;
      language.footer.podcast = result.keyValues?.[4]?.keyContent;
      language.footer.support = result.keyValues?.[5]?.keyContent;
      language.footer.contact = result.keyValues?.[6]?.keyContent;
      language.footer.locations = result.keyValues?.[7]?.keyContent;
      language.footer.faqs = result.keyValues?.[8]?.keyContent;
      language.footer.discover = result.keyValues?.[9]?.keyContent;
      language.footer.question = result.keyValues?.[10]?.keyContent;
      language.footer.resources = result.keyValues?.[11]?.keyContent;
      language.footer.news = result.keyValues?.[12]?.keyContent;
      language.footer.privacy = result.keyValues?.[13]?.keyContent;
      language.footer.copyright = result.keyValues?.[14]?.keyContent;
      language.footer.rights = result.keyValues?.[15]?.keyContent;
      language.footer.terms = result.keyValues?.[16]?.keyContent;
    }
    return language;
  }
};

const defaultLanguage = {
  migratelyNavBar: {
    pricing: null,
    contact: null,
    faqs: null,
    login: null,
    register: null,
    language: null,
  },
  topSection: {
    heading: null,
    btmHeading: null,
    learnButton: null,
  },
  checklist: [
    {
      id: 1,
      title: null,
    },
    {
      id: 2,
      title: null,
    },
    {
      id: 3,
      title: null,
    },
    {
      id: 4,
      title: null,
    },
  ],
  migratelyColumns: {
    title: null,
    subtitle: null,
    migratelyFeatures: {
      cardTitle1: null,
      description1: null,
      cardTitle2: null,
      description2: null,
      cardTitle3: null,
      description3: null,
    },
  },
  migratelyFeatures: {
    title: null,
    subtitle: null,
    features: {
      cardTitle1: null,
      description1: null,
      cardTitle2: null,
      description2: null,
      cardTitle3: null,
      description3: null,
      cardTitle4: null,
      description4: null,
      cardTitle5: null,
      description5: null,
    },
  },
  newsLetterSignup: {
    title: null,
    subTitle: null,
    placeHolder: null,
    subButton: null,
    footer: null,
  },
  bottomHeading: {
    header: null,
    learnButton: null,
  },
  footer: {
    title: null,
    aboutUs: null,
    products: null,
    blog: null,
    podcast: null,
    support: null,
    contact: null,
    locations: null,
    faqs: null,
    discover: null,
    question: null,
    resources: null,
    news: null,
    privacy: null,
    copyright: null,
    rights: null,
    terms: null,
  },
};

const translationService = {
  getAppByLanguageId,
  defaultLanguage,
  addLink,
  getAppByAll,
  getAppByLanguageIdAdd,
  addTranslationComplete,
};

export default translationService;
