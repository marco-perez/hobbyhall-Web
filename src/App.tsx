import { lazy } from 'react'
import './App.css'
import {
	BrowserRouter as Router,
	Route,
	Routes
} from 'react-router-dom';

const SignIn = lazy(() =>
	import('./components/sign-in/sign-in').then((module) => ({
		default: module.SignIn
	}))
);

function App() {
  return (
    // TODO: do i need to use <suspense />
    <Router>
      <Routes>
        {/* Sign-In / Sign-Up / Forgot PW Routes - No user required to access*/}
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignIn />} />
					<Route path="/forgot" element={<SignIn />} />
          <Route path="/onboarding" element={<h1>onboarding</h1>} />
          <Route path="/home" element={<h1>home page</h1>} />
      </Routes>
    </Router>
  )
}

export default App
