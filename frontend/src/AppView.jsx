import LandingScreen from "./screens/LandingScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import RepositoryScreen from "./screens/RepositoryScreen.jsx";
import PaperDetailScreen from "./screens/PaperDetailScreen.jsx";
import ReaderScreen from "./screens/ReaderScreen.jsx";
import BookmarksScreen from "./screens/BookmarksScreen.jsx";
import SubmitYourPaperScreen from "./screens/SubmitYourPaperScreen.jsx";
import MySubmissionsScreen from "./screens/MySubmissionsScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import ReviewQueueScreen from "./screens/ReviewQueueScreen.jsx";
import SubmissionReviewScreen from "./screens/SubmissionReviewScreen.jsx";
import UploadAndIndexScreen from "./screens/UploadAndIndexScreen.jsx";
import CoordinatorAnalyticsScreen from "./screens/CoordinatorAnalyticsScreen.jsx";
import UsersAndRolesScreen from "./screens/UsersAndRolesScreen.jsx";
import CategoriesScreen from "./screens/CategoriesScreen.jsx";
import AuditLogScreen from "./screens/AuditLogScreen.jsx";
import BackupAndSystemScreen from "./screens/BackupAndSystemScreen.jsx";
import SubmissionDetailScreen from "./screens/SubmissionDetailScreen.jsx";
import Sidebar from "./components/Sidebar.jsx";
import CiteModal from "./components/CiteModal.jsx";
import RoleSwitcher from "./components/RoleSwitcher.jsx";
import Toasts from "./components/Toasts.jsx";

/** Pure view layer: receives the view-model bag `v` built by App.renderVals(). */
export default function AppView({ v }) {
  return (
    <>
      {v.isLanding && <LandingScreen v={v} />}
      {v.isRegister && <RegisterScreen v={v} />}
      {v.inApp && <Sidebar v={v} />}
      <div data-main="" style={{ paddingLeft: v.shellPad }}>
        {v.isRepo && <RepositoryScreen v={v} />}
        {v.isDetail && <PaperDetailScreen v={v} />}
        {v.isReader && <ReaderScreen v={v} />}
        {v.isBookmarks && <BookmarksScreen v={v} />}
        {v.isSubmit && <SubmitYourPaperScreen v={v} />}
        {v.isMySubs && <MySubmissionsScreen v={v} />}
        {v.isProfile && <ProfileScreen v={v} />}
        {v.isQueue && <ReviewQueueScreen v={v} />}
        {v.isReview && <SubmissionReviewScreen v={v} />}
        {v.isUpload && <UploadAndIndexScreen v={v} />}
        {v.isAnalytics && <CoordinatorAnalyticsScreen v={v} />}
        {v.isUsers && <UsersAndRolesScreen v={v} />}
        {v.isCategories && <CategoriesScreen v={v} />}
        {v.isAudit && <AuditLogScreen v={v} />}
        {v.isBackup && <BackupAndSystemScreen v={v} />}
        {v.isSubDetail && <SubmissionDetailScreen v={v} />}
      </div>
      {v.citeOpen && <CiteModal v={v} />}
      <RoleSwitcher v={v} />
      <Toasts v={v} />
    </>
  );
}
