import { Navigate } from "react-router"

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/sign-in" />
}

export default ProtectedRoute
