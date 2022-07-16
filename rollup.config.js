import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import scss from "rollup-plugin-scss";
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import { babel } from "@rollup/plugin-babel";

import fs from 'fs';
import path from "path";

const getInputs = (dir = './src') => {

  let rs = [];
  const dirPath = path.resolve(__dirname, dir);

  fs.readdirSync(dirPath)
  .forEach(name => {
    const itemPath = path.resolve(dirPath, name);
    const stat = fs.statSync(itemPath);

    if (stat.isFile()){
      if (name.match(/\.tsx$/) && !name.match(/\.stories\.tsx$/)){
        rs.push(dir + '/' + name);
      }
    }
    else if (stat.isDirectory() && name !== 'stories'){
      rs = rs.concat(getInputs(dir + '/' + name));
    }
  });

  return rs;
}

const configs = {
  input: getInputs(),
  output: [
    // {
    //   // file: './dist/index.js',
    //   format: 'cjs'
    // },
    {
      // file: './dist/index.esm.js',
      format: 'es',
      dir: 'dist'
      // exports: "named",
    }
  ],
  plugins: [
    external(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    scss({
      output: 'dist/style.css',
      failOnError: true,
      outputStyle: "compressed",
      include: ["src/**/*.scss"],
    }),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-react"],
    }),
    terser(),
    json()
  ]
}

export default configs;