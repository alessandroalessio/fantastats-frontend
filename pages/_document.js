import Document, { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,400;0,600;0,700;0,800;1,200;1,400;1,600;1,700;1,800" rel="stylesheet" />
        </Head>
        <body>
            <Navbar />
            <Main />
            <Footer />
            <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument