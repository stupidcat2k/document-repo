import { createContext, useState } from 'react';
import { Spin } from 'antd';

export const LoadingContext = createContext();

const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={setLoading}>
      <Spin spinning={loading} size='large' style={{ minHeight: '100vh', zIndex: 99999 }}>
        {children}
      </Spin>
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
