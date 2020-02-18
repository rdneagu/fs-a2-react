module.exports = { 
  extends: [ 
    "airbnb-base",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
  ],
  plugins: [
    "jsx-a11y",
    "react",
    "react-hooks",    
  ],
  rules: {
    "react/jsx-filename-extension": [ 1, { "extensions": [".js", ".jsx"] } ], // allows JSX content to be saved as .js files
    'max-len': [ "error", { "code": 180 } ], // sets the max character allowed in a line to 180 characters
    'linebreak-style': 0, // removes the restriction on the linebreak
    'camelcase': 0, // removes the camelcase restriction for the variable names
    'radix': 0, // removes the radix restriction for the parseInt function
  },
};