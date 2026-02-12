import * as React from "react";

type BackgroundMode = "light" | "dark";

type BackgroundContextValue = {
  mode: BackgroundMode;
  color: string;
};

const BackgroundContext = React.createContext<BackgroundContextValue>({
  mode: "light",
  color: "#ffffff",
});

export const BackgroundProvider = ({
  value,
  children,
}: {
  value: BackgroundContextValue;
  children: React.ReactNode;
}) => {
  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBackground = () => React.useContext(BackgroundContext);

export type { BackgroundMode, BackgroundContextValue };
