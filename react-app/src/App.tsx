import './App.css';
import { Provider } from 'react-redux';

import Header from './Header';
import { store } from './app/store';
import { modeSelector } from './mode/slice';
import { useAppSelector } from './app/hooks';
import { FC, useEffect, useState } from 'react';
import Testbed from './testbed/Testbed';

const OIDC_AUTH = 'http://localhost:28080/realms/bigrealm'

function dec2hex(dec: number) {
  return ("0" + dec.toString(16)).substr(-2);
}

function generateCodeVerifier() {
  var array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}

function sha256(plain: string) {
  // returns promise ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(a: ArrayBuffer) {
  var str = "";
  var bytes = new Uint8Array(a);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function generateCodeChallengeFromVerifier(v: string) {
  var hashed = await sha256(v);
  var base64encoded = base64urlencode(hashed);
  return base64encoded;
}

function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

interface StandardFieldProps {
  param: string
  value: string
}
const StandardField: FC<StandardFieldProps> = ({param,  value}) => (
  <fieldset>
    <label htmlFor="authorize_{param}">{param}=</label>
    <input id="authorize_{param}" name={param} value={value} />
  </fieldset>
)

interface TokenFormProps {
  code: string
  state: string
}
const TokenForm: FC<TokenFormProps> = ({ code, state }) => {
  const [ accessToken, setAccessToken ] = useState<string>()

  const codeVerifier = sessionStorage.getItem(`verifier-${state}`)

  if (codeVerifier === null) {
    return (<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong className="font-bold">Error!</strong>
    <span className="block sm:inline">Code verifiers cannot be found for ${state}.</span>
  </div>)
  }

  const tokenUrl = `${OIDC_AUTH}/protocol/openid-connect/token`;
  
  const body = new URLSearchParams();
  body.set('grant_type', 'authorization_code');
  body.set('client_id', 'reactclient');
  body.set('code_verifier', codeVerifier);
  body.set('code', code);
  const redirectUri = "https://localhost:13000"

  body.set('redirect_uri', redirectUri);


  const handlePostToken = () => {
    const response = fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    })  .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {
      console.log(data);
      setAccessToken(data.access_token)
    })
    .catch(error => {
      // Handle errors here
      console.error('There was a problem with the fetch operation:', error);
    });
  }
  return (
    <div>
      POST to {tokenUrl} :: {body.toString()}

      <button onClick={handlePostToken} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
          Submit
      </button>
      <hr />
      {accessToken !== undefined && <BackendRequest accessToken={accessToken}/>
}
    </div>
  )
}


interface BackendRequestProps {
  accessToken: string
}
const BackendRequest: FC<BackendRequestProps> = ({ accessToken}) => {
  const handleApiCall = () => {
    fetch('http://localhost:18080/secret', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(result => {
      result.text()
      .then(text => console.log("Text from API obtained:", text))
      .catch(err => console.error("Obtainure of text fails", err))
    })
    .catch(err => console.error("Fetch API fails", err))
  }
  return (<button onClick={handleApiCall} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
    API Call
  </button>)
}
function ExampleApp() {
  const authenticateEndpoint = `${OIDC_AUTH}/protocol/openid-connect/auth`
  const redirectUri = "https://localhost:13000"

  const [ stateString, setStateString ] = useState<string>()
  const [ codeVerifier, setCodeVerifier ] = useState<string>()
  const [ codeChallenge, setCodeChallenge ] = useState<string>()


  useEffect(() => {
    setStateString(makeid(16))
    setCodeVerifier(generateCodeVerifier())
  }, [])
  useEffect(() => {
    console.log("gotten her:", codeVerifier)
    if (codeVerifier !== undefined) {
      generateCodeChallengeFromVerifier(codeVerifier).then((codeChallenge) => {
        setCodeChallenge(codeChallenge)
        console.log("setted")
      })
    }
  }, [codeVerifier])

  const handleAuthenticationSubmit = () => {
    if (codeVerifier === undefined) {
      throw new Error("I want to store code verifier before submit but it is not set")
    }
    sessionStorage.setItem(`verifier-${stateString}`, codeVerifier);

    return true
  }

  const code = new URLSearchParams(window.location.search).get('code');
  const state = new URLSearchParams(window.location.search).get('state');

  return (
    <>
      <div>JWT Example</div>
      <form method="GET" action={authenticateEndpoint} onSubmit={handleAuthenticationSubmit}>
        <p>Authenticate request to GET {authenticateEndpoint} with the following parameters</p>
  
        <StandardField param="response_type" value="code" />
        <StandardField param="client_id" value="reactclient" />
        <StandardField param="redirect_uri" value={redirectUri} />
        <StandardField param="scope" value={"openid profile messages"} />
        <StandardField param="state" value={stateString||"state-not-set"} />
        <StandardField param="code_challenge" value={codeChallenge||"pending-challenge"} />
        <StandardField param="code_challenge_method" value="S256" />
        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
          Submit
        </button>
      </form>
      { code !== null && state !== null && <TokenForm code={code} state={state} />}
    </>
  )
}

function FirstPage() {
  let colorTheme = useAppSelector(modeSelector).effectiveValue;

  return (
    <div className={`${colorTheme} h-full`}>
    <div className="h-full bg-my-solid p-2">
      <Header />

      <div className="rounded-lg px-6 py-8 ring-1 ring-slate-800/5 dark:ring-slate-300/5 shadow-xl">
        <h1 className="text-3xl text-black dark:text-white font-bold underline">
          Start new app!
        </h1>
        TB
        <Testbed />/TB
        <ExampleApp />

        <h3 className="text-slate-900 text-black dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
        </p>
      </div>
    </div>
  </div>
  )
}
function App() {
  return (
    <Provider store={store}>
      <FirstPage />
    </Provider>
  );
}

export default App;
