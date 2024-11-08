// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly BACKEND_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
