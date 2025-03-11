
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

import packageJson from './package.json' with { type: 'json' };

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.js",
                format: "cjs",
                // sourcemap: true,
                // preserveModules: true
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: true,
                declarationDir: 'dist',
            }),
            postcss(),
        ],
    },
    {
        input: "dist/index.d.ts",
        output: { file: "dist/index.d.ts", format: "esm" },
        plugins: [dts()],
        external: [/\.css$/],
    },
];
