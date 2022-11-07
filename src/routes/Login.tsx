import { login, selectAuth } from "../features/AuthSlice";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";

export default function Login() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const onLogin = () =>
    dispatch(
      login({
        username: "Andrew",
        permissions: {
          isManager: false,
          isRetailer: false,
        },
      })
    );
  const onLoginManager = () =>
    dispatch(
      login({
        username: "Amanda",
        permissions: {
          isManager: true,
          isRetailer: false,
        },
      })
    );
  const onLoginRetailer = () =>
    dispatch(
      login({
        username: "Mark",
        permissions: {
          isManager: false,
          isRetailer: true,
        },
      })
    );

  return (
    <div>
      <h1>Login</h1>
      <h2>Current Login</h2>
      <ul>
        <li>username: {auth.username ? auth.username : ""}</li>
        <li>isManager: {auth.permissions.isManager ? "Yes" : "No"}</li>
        <li>isRetailer: {auth.permissions.isRetailer ? "Yes" : "No"}</li>
      </ul>

      <div>
        <button onClick={onLogin}>Login</button>
        <button onClick={onLoginManager}>Login Manager</button>
        <button onClick={onLoginRetailer}>Login Retailer</button>
      </div>
      <ul>
        <li>
          <Link to="/">Home (Anyone who is user - {auth.username ? "Available" : "Unavailable"})</Link>
        </li>
        <li>
          <Link to="/levels">Levels (Manager Only - {auth.permissions.isManager ? "Available" : "Unavailable"})</Link>
        </li>
        <li>
          <Link to="/reports">
            Reports (Retailer Only - {auth.permissions.isRetailer ? "Available" : "Unavailable"})
          </Link>
        </li>
      </ul>
    </div>
  );
}
