//const { createProxyMiddleware } = require("http-proxy-middleware");
//
//module.exports = function (app) {
//    app.use(
//        "/api",
//        createProxyMiddleware({
//            target: `http://localhost:8080/`,
//            headers: {
//                accept: "application/json",
//                method: "GET",
//            },
//            changeOrigin: true,
//            secure: false
//        })
//    );
//}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
        port: 5173,
    },
    plugins: [react()],
});