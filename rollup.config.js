import babel from "rollup-plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import external from "rollup-plugin-peer-deps-external"
import css from "rollup-plugin-import-css"

export default [
    {
        input: "./src/index.js",
        output: [
            {
                file: "dist/index.js",
                format: "cjs",
            },
            {
                file: "dist/index.es.js",
                format: "es",
                exports: "named",
            }
        ],
        plugins: [
            css(),
            babel({
                exclude: "node_modules/**",
                presets: ["@babel/preset-react"]
            }),
            external(),
            resolve(),
        ]
    }
]