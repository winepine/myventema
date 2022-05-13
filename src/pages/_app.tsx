import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'site-settings/site-theme/default';
import { AppProvider } from 'contexts/app/app.provider';
import { AuthProvider } from 'contexts/auth/auth.provider';
import { LanguageProvider } from 'contexts/language/language.provider';
import { SpringModalProvider } from 'contexts/spring-modal/use-spring-modal';
import { TagsProvider } from 'contexts/tags/use-tags';
import { CartProvider } from 'contexts/cart/use-cart';
import { useMedia } from 'utils/use-media';
import AppLayout from 'layouts/app-layout';
import { ChakraProvider } from "@chakra-ui/react"
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

// External CSS import here
import 'swiper/swiper-bundle.min.css';
import 'rc-drawer/assets/index.css';
import 'rc-table/assets/index.css';
import 'rc-collapse/assets/index.css';
import 'react-multi-carousel/lib/styles.css';
import 'components/multi-carousel/multi-carousel.style.css';
import 'react-spring-modal/dist/index.css';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import 'components/scrollbar/scrollbar.css';
import '@redq/reuse-modal/lib/index.css';

import { GlobalStyle } from 'assets/styles/global.style';

// Language translation messages
import { messages } from 'site-settings/site-translation/messages';
import 'typeface-lato';
import 'typeface-poppins';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import NProgressbar from 'components/common/NProgressbar';
import customTheme from 'styles/chakraCustomTheme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ProductsProvider } from 'contexts/products/use-products';
// import useTagManager from 'hooks/useTagManager';
import TagManager from "react-gtm-module"
import { googleTagManagerKey } from 'site-settings/site-credentials';
import CookiesPopup from 'components/common/CookiesPopup';
import Head from 'next/head';

export default function ExtendedApp({ Component, pageProps }) {
  const router = useRouter();
  const mobile = useMedia('(max-width: 580px)');
  const tablet = useMedia('(max-width: 991px)');
  const desktop = useMedia('(min-width: 992px)');
  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  })
  const [loadTagManager, setLoadTagManager] = useState(false);

  // Google Tag manager
  useEffect(() => {
    if (!loadTagManager) return;

    TagManager.initialize({ gtmId: googleTagManagerKey });
  }, [loadTagManager]);

  // Progress bar code
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }))
    }
    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }))
    }
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeEnd)
    router.events.on('routeChangeError', handleRouteChangeEnd)
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeEnd)
      router.events.off('routeChangeError', handleRouteChangeEnd)
    }
  }, [router.events]);

  return (
    <>
    <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
    <QueryClientProvider client={new QueryClient}>
      <ProductsProvider>
        <TagsProvider>
          <SpringModalProvider>
            <ThemeProvider theme={defaultTheme}>
              <LanguageProvider messages={messages}>
                <CartProvider>
                  <AppProvider>
                    <AuthProvider>
                      <ChakraProvider theme={customTheme}>
                        <AppLayout >
                          {/* <ApolloProvider client={client}> */}
                            <NProgressbar isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
                            <Component
                              {...pageProps}
                              deviceType={{ mobile, tablet, desktop }}
                            />
                            <CookiesPopup onAccept={() => setLoadTagManager(true)} onDecline={() => setLoadTagManager(false)} />
                          {/* </ApolloProvider> */}
                        </AppLayout>
                      </ChakraProvider>
                      <GlobalStyle />
                    </AuthProvider>
                  </AppProvider>
                </CartProvider>
              </LanguageProvider>
            </ThemeProvider>
          </SpringModalProvider>
        </TagsProvider>
      </ProductsProvider>
    </QueryClientProvider>
    </>
  );
}