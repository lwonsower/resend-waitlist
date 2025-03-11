
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                dir: "dist",
                entryFileNames: 'index.js',
                format: "cjs",
                sourcemap: true,
            },
            {
                dir: `dist`,
                entryFileNames: 'index.mjs',
                format: 'esm',
                sourcemap: true,
            }
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
        output: { file: "dist/types/index.d.ts", format: "esm" },
        plugins: [dts()],
        external: [/\.css$/],
    },
];
