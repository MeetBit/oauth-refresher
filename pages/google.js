import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Google.module.css'
import axios from 'axios'
const qs = require('qs')

export async function getServerSideProps({ query }) {

  let props = {}

  const error = query.error
  const code = query.code
  const redirect_uri = query.state

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET

  if (error) {
    props.error = error
  } else if (code) {
    const tokenInput = qs.stringify({
      'client_id': clientId,
      'client_secret': clientSecret,
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': redirect_uri,
    })
    const tokenData = await axios({ //query google access token
      url: `https://oauth2.googleapis.com/token`,
      method: 'post',
      headers: {
        'Content-type': `application/x-www-form-urlencoded`,
      },
      data: tokenInput
    })
    const tokenResponse = tokenData.data

    props.response = tokenResponse
  }

  return { props }

}

export default function Google({ error, response }) {

  const [scope, setScope] = useState('openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar')
  const onChangeScope = (e) => {
    e?.preventDefault()
    setScope(e.target.value)
  }
  const [redirectUri, setRedirectUri] = useState('http://localhost:3000/google')
  const onChangeRedirectUri = (e) => {
    e?.preventDefault()
    setRedirectUri(e.target.value)
  }
  const [clientId, setClientId] = useState(process.env.NEXT_PUBLIC_CLIENT_ID)
  const [clientSecret, setClientSecret] = useState(process.env.NEXT_PUBLIC_CLIENT_SECRET)

  const onRedirect = (e) => {
    e?.preventDefault()

    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}&state=${redirectUri}`


    //console.log(url)
    window.location.href = url
  }

  console.log(clientId)

  return (
    <div className={styles.container}>
      <Head>
        <title>Google OAUTH Refresher</title>
        <meta name="description" content="Refresh Google Oauth Credentials" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Google OAUTH Refresher
        </h1>

        <p className={styles.description}>
          Refresh expired OAUTH tokens from the <a href="https://developers.google.com/identity/protocols/oauth2" targer="_blank" rel="noopener noreferrer">Google Identity API</a> for server-side webapps.<br />
          Make sure to add <code className={styles.code}>http://localhost:3000/google</code> as a redirect_uri <a
            href="https://console.cloud.google.com/apis/credentials"
            target="_blank"
            rel="noopener noreferrer"
          >here.</a>
        </p>

        <div className={styles.grid}>
          <label> scope:
            <input type="text" value={scope} onChange={onChangeScope} />
          </label>

          <label> redirect_uri:
            <input type="text" value={redirectUri} onChange={onChangeRedirectUri} disabled />
          </label>

          <label> client_id:
            <input type="text" value={clientId || 'Set in .env as "NEXT_PUBLIC_CLIENT_ID"'} disabled />
          </label>

          <label> client_secret:
            <input type="text" value={clientSecret || 'Set in .env as "NEXT_PUBLIC_CLIENT_SECRET"'} disabled />
          </label>
        </div>

        <div className={styles.grid}>
          {response ?
            <>
              <code className={`${styles.code} ${styles.response}`}>{JSON.stringify(response)}</code>
              <a href='/google' className={styles.card}>
                <h2>Refresh Again &rarr;</h2>
                <p>Refresh a different account.</p>
              </a>
              <a href='/' className={styles.card}>
                <h2>Go Back &rarr;</h2>
                <p>Refresh other tokens.</p>
              </a>
            </>
            :
            <>
              <div onClick={scope && redirectUri && clientId && clientSecret ? onRedirect : null} className={`${styles.card} ${scope && redirectUri && clientId && clientSecret ? '' : styles["card-disabled"]}`}>
                <h2>Login with Google &rarr;</h2>
                <p>Redirect to Google's OAuth 2.0 server.</p>
              </div>
              <a href='/' className={styles.card}>
                <h2>Go Back &rarr;</h2>
                <p>Refresh other tokens.</p>
              </a>
            </>
          }
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://meetbit.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/meetbit.svg" alt="Vercel Logo" width={96} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
