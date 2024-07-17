import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            {/** 사용자가 theme mode를 선택한 후 새로고침하면, 다시 초기화 mode로 돌아오기 때문에 사용자가 선택한 theme을 유지하기 위해 ColorModeScript 태그 사용 */}
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);
