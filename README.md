# taschenrechner
It was hard, it was fun and I learned a lot.

## JavaScript

Because the preceeding exercise was about objects I tried to think of a good way to use them in this project. In the beginning I only used them for storing all the date for perfoming the calculations and had all other variables and functions outside of objects. When I came nearly to completing the project I refactored everything so now all the variables for the calculator are keys of objects and all the functions are methods.

I'm not really sure if the way I did it was the way it's supposed to be done though.

## HTML, CSS and Design

I decided I wanted to replicate the iconic Omron86 calculator form 1975. Not every detail but the overall aesthetic and design language. I changed the layout of the buttons a bit, so that my design works better on smartphones.

Creating the design in HTML and CSS was both challengeing and fun. For the first time in any project I used a CSS variable to store a reference value for lengths. Then I calculated (almost) all of the design elements from this reference value. This way I only had to change the variable if the viewport is in portait mode to get the responsive version of the layout.