import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default {
    input: "./src/script/index.ts",
    output: [{
        file: "./src/script/b.js",
        format: "umd"
    }],
    plugins: [
        typescript(),
        terser({
            output: {
                comments: false,
                semicolons: false
            }
        })
    ]
};