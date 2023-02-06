import { lazy } from "react";

const AnalyticsDashboards = lazy(() =>
  import("../components/dashboard/analytics/Analytics")
);
const AdvertisementCard = lazy(() =>
  import("../components/advertisements/AdvertisementCard")
);
const AdvertisementForm = lazy(() =>
  import("../components/advertisements/AdvertisementForm")
);
const Analytics = lazy(() => import("../components/analytics/DashBoard"));
const AppointmentsDashboard = lazy(() =>
  import("../components/appointments/Appointments")
);
const AttorneyForm = lazy(() =>
  import("../components/attorney/addattorneyform/AttorneyForm")
);
const AttorneyProfile = lazy(() =>
  import("../components/attorney/AttorneyProfile")
);
const AttorneyDashboard = lazy(() =>
  import("../components/attorney/dashboard/AttorneyDashboard")
);
const PageNotFound = lazy(() => import("../components/error/Error404"));
const NewsletterManager = lazy(() =>
  import("../components/newsletters/NewsletterManager")
);
const NewsLetterSubscriptions = lazy(() =>
  import("../components/newslettersubscriptions/NewsLetterSubscriptions")
);
const ImmigrantVisaCategories = lazy(() =>
  import("../components/immigrantvisacategories/ImmigrantVisaCategories")
);
const Category = lazy(() =>
  import("../components/immigrantvisacategories/Category")
);

const FileManager = lazy(() => import("../components/filemanager/FileManager"));
const NewFAQ = lazy(() => import("../components/faq/FAQForm"));
const AddYearForm = lazy(() => import("../components/AddYearForm"));
const FormBasic = lazy(() => import("../components/forums/Forum"));
const UsersTable = lazy(() => import("../components/admin/UsersTable"));
const PaginatedForums = lazy(() =>
  import("../components/forums/PaginatedForums")
);
const SurveyForm = lazy(() => import("../components/survey/Survey"));
const VideochatStatistics = lazy(() =>
  import("../components/videochat/VideochatStatistics")
);
const NVICViewer = lazy(() =>
  import("../components/nonimmigrantvisacategories/NIVCViewer")
);

const ForumCommentThread = lazy(() =>
  import("../components/forums/ForumCommentThread")
);
const AddBlog = lazy(() => import("../components/blogs/BlogForm"));
const License = lazy(() => import("../components/licenses/License"));
const LicenseForm = lazy(() => import("../components/licenses/LicenseForm"));

const ResourceForm = lazy(() => import("../components/resources/ResourceForm"));
const PageTranslation = lazy(() =>
  import("../components/translations/AddPageTranslation")
);

const UserSettingsChange = lazy(() =>
  import("../components/user/UserSettingsChangeForm")
);
const ChangePassword = lazy(() => import("../components/user/ChangePassword"));

const appointmentsRoutes = [
  {
    path: "/appointments",
    name: "Appointments",
    element: AppointmentsDashboard,
    roles: ["User", "Attorney", "Admin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboards",
    icon: "uil-home-alt",
    header: "Navigation",
    children: [
      {
        path: "/dashboard/analytics",
        name: "Analytics",
        element: AnalyticsDashboards,
        roles: ["Admin"],
        exact: true,
        isAnonymous: false,
      },
    ],
  },
];

const VideochatRoutes = [
  {
    path: "/videochat/statistics",
    name: "VideochatStatistics",
    exact: true,
    element: VideochatStatistics,
    roles: ["Admin"],
    isAnonymous: true,
  },
];

const processingTimesRoutes = [
  {
    path: "/processingtimes/new",
    name: "NewProcessingTime",
    exact: true,
    element: AddYearForm,
    roles: ["Admin", "SysAdmin"],
    isAnonymous: true,
  },
];

const test = [
  {
    path: "/test",
    name: "Test",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["Fail"],
    isAnonymous: false,
  },
  {
    path: "/secured",
    name: "A Secured Route",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["Fail"],
    isAnonymous: false,
  },
  {
    path: "/secured2",
    name: "A Secured Route",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/analytic",
    name: "analytics",
    exact: true,
    element: Analytics,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/addsurvey",
    name: "AddSurvey",
    exact: true,
    element: SurveyForm,
    roles: ["Admin"],
    isAnonymous: false,
  },
];
const ForumRoute = [
  {
    path: "/forums/add",
    name: "A Secured Form",
    exact: true,
    element: FormBasic,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/forums/:id/edit",
    name: "Editing Paginated Forum",
    exact: true,
    element: FormBasic,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/forums/list",
    name: "Paginated Forums",
    exact: true,
    element: PaginatedForums,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/forums/:id/comments",
    name: "Forums Comments",
    exact: true,
    element: ForumCommentThread,
    roles: ["Admin"],
    isAnonymous: false,
  },
  {
    path: "/faqs/new",
    name: "NewFAQ",
    exact: true,
    element: NewFAQ,
    roles: ["Admin"],
    isAnonymous: true,
  },
  {
    path: "/faqs/:id",
    name: "NewFAQ",
    exact: true,
    element: NewFAQ,
    roles: ["Admin"],
    isAnonymous: true,
  },
];
const AdminRoute = [
  {
    path: "/admin/users",
    name: "List of Users",
    exact: true,
    element: UsersTable,
    roles: ["Admin"],
    isAnonymous: false,
  },
];

const usersRoutes = [
  {
    path: "/users/:id/settings",
    name: "UserSettingsChange",
    exact: true,
    element: UserSettingsChange,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    exact: true,
    element: ChangePassword,
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
    isAnonymous: false,
  },
];
const newsletterManager = [
  {
    path: "/newsletters/manage",
    name: "Newsletter Manager",
    element: NewsletterManager,
    roles: ["Admin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "newsletters/manage/:id",
    name: "Edit Newsletter",
    exact: true,
    element: NewsletterManager,
    roles: ["Admin", "SysAdmin"],
    isAnonymous: true,
  },
];
const newslettersubscriptions = [
  {
    path: "/newslettersubscriptions",
    name: "Newsletter Subscriptions",
    element: NewsLetterSubscriptions,
    roles: ["Admin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];
const immigrantvisacategories = [
  {
    path: "/immigrantvisacategories",
    name: "Immigrant Visa Categories",
    element: ImmigrantVisaCategories,
    roles: ["Admin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/immigrantvisacategories/category",
    name: "Add and Edit Category",
    element: Category,
    roles: ["Admin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const fileManager = [
  {
    path: "/files/manage",
    name: "File Manager",
    element: FileManager,
    roles: ["Admin"],
    exact: true,
    isAnonymous: false,
  },
];
const nonimmigrantvisacategories = [
  {
    path: "/nonimmigrantvisacategories",
    name: "Nonimmigrant Visa Categories",
    element: NVICViewer,
    roles: ["Admin"],
    exact: true,
    isAnonymous: false,
  },
];

const blogRoutes = [
  {
    path: "blogs/add",
    name: "AddBlog",
    exact: true,
    element: AddBlog,
    roles: ["Admin", "User"],
    isAnonymous: true,
  },
  {
    path: "blogs/:id/edit",
    name: "EditBlog",
    exact: true,
    element: AddBlog,
    roles: ["Admin", "User"],
    isAnonymous: true,
  },
];

const licenses = [
  {
    path: "/licenses",
    name: "Licenses",
    element: License,
    roles: ["User", "Admin", "Attorney"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/licenses/new",
    name: "Add License",
    element: LicenseForm,
    roles: ["Admin", "Attorney"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/licenses/:id",
    name: "Edit License",
    element: LicenseForm,
    roles: ["Admin", "Attorney"],
    exact: true,
    isAnonymous: false,
  },
];

const resourceForm = [
  {
    path: "/resourceform",
    name: "Resource Form",
    element: ResourceForm,
    roles: ["Admin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const attorneyRoutes = [
  {
    path: "/addattorney",
    name: "Add Attorney Profile",
    element: AttorneyForm,
    roles: ["Attorney"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/attorney/dashboard",
    name: "Attorney Dashboard",
    element: AttorneyDashboard,
    roles: ["Attorney"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/attorney/profile",
    name: "Attorney Profile",
    element: AttorneyProfile,
    roles: ["Attorney"],
    exact: true,
    isAnonymous: false,
  },
];

const translationRoutes = [
  {
    path: "/pagetranslations/add",
    name: "Add Page Translation",
    element: PageTranslation,
    roles: ["Admin"],
    exact: true,
    isAnonymous: false,
  },
];

const advertisementRoutes = [
  {
    path: "/advertisements/new",
    name: "Add Advertisement",
    element: AdvertisementForm,
    roles: ["Admin", "Attorney"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/advertisements/:id",
    name: "Update Advertisement",
    element: AdvertisementForm,
    roles: ["Admin", "Attorney"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/advertisements",
    name: "Advertisements",
    element: AdvertisementCard,
    roles: ["Admin", "Attorney"],
    exact: true,
    isAnonymous: false,
  },
];

const allRoutes = [
  ...appointmentsRoutes,
  ...usersRoutes,
  ...dashboardRoutes,
  ...test,
  ...errorRoutes,
  ...ForumRoute,
  ...newsletterManager,
  ...newslettersubscriptions,
  ...immigrantvisacategories,
  ...processingTimesRoutes,
  ...AdminRoute,
  ...VideochatRoutes,
  ...fileManager,
  ...nonimmigrantvisacategories,
  ...blogRoutes,
  ...licenses,
  ...resourceForm,
  ...attorneyRoutes,
  ...translationRoutes,
  ...advertisementRoutes,
];

export default allRoutes;
