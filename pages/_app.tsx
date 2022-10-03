import React from "react";
import { AppProps } from "next/app";
import { theme } from "@styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from "@emotion/react";
import NextNProgress from 'nextjs-progressbar';
import {
  UserContextProvider,
  QueryParamProvider,
  BreakpointsContextProvider,
  MasterContext,
  AppContextProvider,
} from '@contexts';
import '@styles/main.css';
import 'antd/dist/antd.css';
import 'antd/lib/style/index.css';
import 'antd/lib/layout/style/index.css';
import 'antd/lib/grid/style/index.css';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/message/style/index.css';
import 'antd/lib/form/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/tabs/style/index.css';
import 'antd/lib/avatar/style/index.css';
import 'antd/lib/dropdown/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/select/style/index.css';
import 'antd/lib/checkbox/style/index.css';
import 'antd/lib/carousel/style/index.css';
import 'antd/lib/pagination/style/index.css';
import 'antd/lib/tooltip/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/spin/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import 'antd/lib/upload/style/index.css';
import '@styles/app.scss';
import { SafeAny } from '@interfaces';

function MyApp({ Component, pageProps }: AppProps | SafeAny): JSX.Element {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <MasterContext
      components={[
        [QueryClientProvider, { client: queryClient }],
        [QueryParamProvider],
        [AppContextProvider],
        [UserContextProvider],
        [ThemeProvider, { theme }],
        [BreakpointsContextProvider],
      ]}
    >
      <NextNProgress color={theme.colors.primary} options={{ showSpinner: false }} />
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </MasterContext>
  );
}

export default MyApp;
