import { lazy } from "react";
const Landing = lazy(() => import("../components/landing/Landing"));
const PageNotFound = lazy(() => import("../components/error/Error404"));
const SiteReference = lazy(() =>
  import("../components/sitereference/SiteReference")
);
const FAQ = lazy(() => import("../components/faq/FAQ"));
const Questionnaires = lazy(() =>
  import("../components/questionnaire/QuestionnaireConnectionHub")
);
const QuestionnairesSelect = lazy(() =>
  import("../components/questionnaire/QuestionnaireSurveys")
);
const Register = lazy(() => import("../components/user/Register"));
const Login = lazy(() => import("../components/user/Login"));
const ConfirmUser = lazy(() => import("../components/user/ConfirmUser"));
const ResetPassword = lazy(() => import("../components/user/ResetPassword"));
const ChangePassword = lazy(() => import("../components/user/ChangePassword"));
const BlogSingle = lazy(() => import("../components/blog/BlogArticleSingle"));
const BlogListing = lazy(() => import("../components/blog/BlogListing.jsx"));
const AwaitingConfirmation = lazy(() =>
  import("../components/user/AwaitingConfirmation")
);
const ResourceForm = lazy(() => import("../components/resources/ResourceForm"));

const USCISCentersMain = lazy(() =>
  import("../components/usciscenters/USCISCentersMain")
);
const BrowseResources = lazy(() =>
  import("../components/resources/BrowseResources")
);
const Newsletters = lazy(() =>
  import("../components/newsletters/Newsletters")
);
const NewsletterCleanTemplate = lazy(() =>
  import("../components/newsletters/templates/CleanTemplate")
);
const NewsLetterSignup = lazy(() =>
  import("components/newslettersubscriptions/NewsLetterSignup")
);
const NewsLetterUnsubscribe = lazy(() =>
  import("components/newslettersubscriptions/NewsLetterUnsubscribe")
);
const CheckoutSuccess = lazy(() =>
  import("../components/checkout/CheckoutSuccess")
);
const ContactUsForm = lazy(() =>
  import("../components/contactus/ContactUsForm")
);
const Products = lazy(() => import("../components/checkout/Products"));
const ProcessingProducts = lazy(() =>
  import("../components/checkout/CheckoutProcessing")
);
const ParentComponent = lazy(() =>
  import("../components/comments/ParentComponent")
);
const Podcast = lazy(() => import("../components/podcasts/Podcast"));
const CreatePodcast = lazy(() =>
  import("../components/podcasts/CreatePodcast")
);
const Location = lazy(() => import("../components/location/Location"));
const FileUploadParent = lazy(() =>
  import("../components/fileUpload/FileUploadParent")
);

const VideochatMain = lazy(() =>
  import("../components/videochat/VideochatMain")
);
const LocationCard = lazy(() => import("../components/location/LocationCard"));
const EditPodcast = lazy(() => import("../components/podcasts/EditPodcast"));

const FormsTable = lazy(() => import("../components/FormsTable"));

const TeamMembers = lazy(() => import("../components/teammembers/TeamMembers"));

const SharedStories = lazy(() => import("../components/sharedstories/SharedStories"))

const AboutUs = lazy(() => import("../components/aboutus/AboutUs"));

const routes = [
  {
    path: "videochat",
    name: "VideochatMain",
    exact: true,
    element: VideochatMain,
    roles: [],
    isAnonymous: true,
    hasNavbar: false,
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    exact: true,
    element: AboutUs,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "comments/parent",
    name: "ParentComponent",
    exact: true,
    element: ParentComponent,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/",
    name: "Landing",
    exact: true,
    element: Landing,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/blogs",
    name: "BlogList",
    exact: true,
    element: BlogListing,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/blogs/:id",
    name: "BlogSingle",
    exact: true,
    element: BlogSingle,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/products/success",
    name: "CheckoutSuccess",
    exact: true,
    element: CheckoutSuccess,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/products",
    name: "Products",
    exact: true,
    element: Products,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/products/processing",
    name: "ProcessingProducts",
    exact: true,
    element: ProcessingProducts,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/register",
    name: "Register",
    exact: true,
    element: Register,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/login",
    name: "Login",
    exact: true,
    element: Login,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/confirmuser",
    name: "ConfirmUser",
    exact: true,
    element: ConfirmUser,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/awaitconfirm",
    name: "AwaitingConfirmation",
    exact: true,
    element: AwaitingConfirmation,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/resetpassword",
    name: "ResetPassword",
    exact: true,
    element: ResetPassword,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/changepassword",
    name: "ChangePassword",
    exact: true,
    element: ChangePassword,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/resourceform",
    name: "ResourceForm",
    exact: true,
    element: ResourceForm,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/resources/browse",
    name: "BrowseResources",
    exact: true,
    element: BrowseResources,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/contact",
    name: "ContactUsForm",
    exact: true,
    element: ContactUsForm,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/location",
    name: "Location",
    exact: true,
    element: Location,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/questionnaires/select",
    name: "QuestionnaireSelect",
    exact: true,
    element: QuestionnairesSelect,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/questionnaires/:surveyId",
    name: "Questionnaire",
    exact: true,
    element: Questionnaires,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/faqs",
    name: "FAQ",
    exact: true,
    element: FAQ,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/fileupload",
    name: "FileUpload",
    exact: true,
    element: FileUploadParent,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/newsletter/signup",
    name: "Newsletter Signup",
    exact: true,
    element: NewsLetterSignup,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/newsletter/unsubscribe",
    name: "Newsletter unsubscribe",
    exact: true,
    element: NewsLetterUnsubscribe,
    roles: [],
    isAnonymous: true,
  },
  {
     path: "/newsletters",
     name: "Newsletters",
     element: Newsletters,
     roles: [],
     exact: true,
     isAnonymous: true,
  },
  {
    path: "/newsletters/c/:id",
    name: "NewsletterCleanTemplate",
    exact: true,
    element: NewsletterCleanTemplate,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/centers",
    name: "USCISCentersMain",
    exact: true,
    element: USCISCentersMain,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/location/mylist",
    name: "LocationCard",
    exact: true,
    element: LocationCard,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/location/:id",
    name: "Location",
    exact: true,
    element: Location,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
  {
    path: "/formstable",
    name: "FormsTable",
    exact: true,
    element: FormsTable,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },

  {
    path: "/team",
    name: "TeamMembers",
    exact: true,
    element: TeamMembers,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/sharedstories",
    name: "SharedStories",
    exact: true,
    element: SharedStories,
    roles: [],
    isAnonymous: true,
  },
];

const errorRoutes = [
  {
    path: "*",
    name: "Error - 404",
    element: PageNotFound,
    roles: [],
    exact: true,
    isAnonymous: true,
    hasNavbar: true,
  },
];

const siteReference = [
  {
    path: "/sitereferences",
    name: "Site Reference",
    exact: true,
    element: SiteReference,
    roles: [],
    isAnonymous: true,
    hasNavbar: true,
  },
];

const createPodcast = [
  {
    path: "podcast/create",
    name: "CreatePodcast",
    element: CreatePodcast,
    roles: [],
    exact: true,
    isAnonymous: true,
    hasNavbar: true,
  },
];

const editPodcast = [
  {
    path: "podcast/edit",
    name: "EditPodcast",
    element: EditPodcast,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
];

const podcast = [
  {
    path: "/podcast",
    name: "Podcast",
    element: Podcast,
    roles: [],
    exact: true,
    isAnonymous: true,
    hasNavbar: true,
  },
];

var allRoutes = [
  ...routes,
  ...errorRoutes,
  ...podcast,
  ...siteReference,
  ...createPodcast,
  ...editPodcast,
];

export default allRoutes;
