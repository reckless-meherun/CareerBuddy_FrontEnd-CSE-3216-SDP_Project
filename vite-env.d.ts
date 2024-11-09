// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string; // Update to VITE_BASE_URL to match the variable name in .env
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
