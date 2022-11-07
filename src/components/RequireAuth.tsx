import { Navigate, useLocation } from "react-router-dom";
import { selectAuth } from "../features/AuthSlice";
import { useAppSelector } from "../hooks";

type Role = "isManager" | "isRetailer";

type Props = {
  children: JSX.Element;
  restrictTo?: Role[];
};

export default function RequireAuth({ children, restrictTo }: Props) {
  const auth = useAppSelector(selectAuth);
  const location = useLocation();

  // If no user at all then need to login
  if (!auth.username) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no restrictTo then any logged in user has access
  if (auth.username && !restrictTo) {
    return children;
  }

  // If restrictTo check the user has the relevant pemissions
  let permitAccess = false;
  if (auth.username && restrictTo) {
    // if (restrictTo) {
    Object.keys(auth.permissions).forEach((key) => {
      if (auth.permissions[key as keyof typeof auth.permissions] === true && restrictTo.includes(key as Role)) {
        permitAccess = true;
      }
    });
    // }
  }

  if (permitAccess) {
    return children;
  }

  // If none of the above the no permissions
  return <h1>You do not have the correct level of access</h1>;
}
