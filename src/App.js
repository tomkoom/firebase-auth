import './App.css';
import { useAuth } from './Context/AuthContext';
import { GoogleAuthProvider } from "firebase/auth";

function App() {
  const { currentUser, signInWithGoogle, logout } = useAuth();
  return (
    <div className="App">

      {!currentUser
        ? <button
          onClick={() =>
            signInWithGoogle()
              .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                console.log("Credential: ", credential);
                const token = credential.accessToken;
                console.log("Token: ", token);
                const user = result.user;
                console.log("User: ", user);
              })
              .catch((error) => {
                console.log(error.message);
              })
          }
        >
          Signing in with Google
        </button>
        : <button onClick={() => logout()}>Logout</button>}

      <pre>Current user: {JSON.stringify(currentUser, null, 2)}</pre>
    </div>
  );
}

export default App;
