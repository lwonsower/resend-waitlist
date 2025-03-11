
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                dir: `dist`,
                format: 'esm',
                sourcemap: true,
            }
        ],
        external: ['react', 'react-dom'],
        plugins: [
            peerDepsExternal(),
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
        input: 'src/index.ts',
        output: {
            file: 'dist/index.d.ts',
            format: 'es',
        },
        external: ['react', 'react-dom'],
        plugins: [dts()],
        external: [/\.css$/],
    },
];
