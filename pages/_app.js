import "@ant-design/pro-form/dist/form.css";
import "@ant-design/pro-layout/dist/layout.css";
import "@ant-design/pro-table/dist/table.css";
import { ConfigProvider, Spin } from "antd";
import "antd/dist/antd.css";
import id from "antd/lib/locale/en_US";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "../app/store";
import CustomError from "../src/components/CustomError";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ConfigProvider locale={id}>
      <SessionProvider
        basePath="/esign/api/auth"
        baseUrl="/esign"
        session={session}
      >
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              {Component.auth ? (
                <Auth roles={Component.auth.roles}>
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )}
            </Hydrate>
          </QueryClientProvider>
        </Provider>
      </SessionProvider>
    </ConfigProvider>
  );
}

function Auth({ children, roles }) {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated: () => signIn(),
  });

  const currentRole = data?.user?.role;

  if (status === "loading") {
    return <Spin />;
  }

  if (data?.user && roles.includes(currentRole)) {
    return children;
  } else {
    return <CustomError statusCode={403} />;
  }
}

export default MyApp;
