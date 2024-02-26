/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
		extend: {
			gridTemplateColumns: {
				'fluid': 'repeat(auto-fit, minmax(120px, 200px))',
			},
		},
	},
  plugins: [

  ],
}

