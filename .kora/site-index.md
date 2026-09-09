# Site index · format 2
Structure and the names of what each page offers. Values that change often — prices, hours, phone,
address — and body copy are deliberately not recorded here; read the page itself for those.

## index.html → /
title: Jaiwai Thai Kitchen – Real Thai Flavour in Georgetown, TX
purpose: Home page for Jaiwai Thai Kitchen in Georgetown, TX, providing restaurant information, story, menu highlights, chef's specials, reviews, FAQ, and a table booking form.
sections:
- `#top` — hero introductory text and actions: See the menu, Order Online
- scrolling marquee of signature dishes: Pad Thai, Green Curry, Khao Soi, Pad Krapow, Tom Yum, Mango Sticky Rice
- `#story` "Our story" — restaurant history and background information
- `#menu` "The menu" — menu introduction and link to full menu: View full menu
- `#specials` "Chicken Khao Soi" — chef's special dish feature: Chicken Khao Soi, Order this, More specials
- `#reviews` "What people are saying" — customer reviews: Maria L, James T, Priya S
- `#faq` "Frequently Asked Questions" — frequently asked questions and answers: Do you offer vegan or vegetarian options?, Can I order online for pickup?, What are your hours?, How do I reach the restaurant?
- `#visit` "Find us &amp; book in" — location, hours, contact information, and table booking form: Get directions, Request booking

## contact.html → /contact
title: Contact Us – Jaiwai Thai Kitchen | Georgetown, TX
purpose: Provide visitors with contact information, location, operating hours, directions, and online ordering access for Jaiwai Thai Kitchen.
sections:
- "Get In Touch" — Introductory text
- "Contact Details" — Address and phone number
- "Opening Hours" — Operating hours schedule
- Interactive map and directions
also: The restaurant's address appears in the contact details section and in the structured-data block.
also: The restaurant's telephone number appears in the contact details section and in the structured-data block.

## menu.html → /menu
title: Our Menu – Jaiwai Thai Kitchen | Georgetown, TX
purpose: Display the restaurant's menu items for online viewing
sections:
- "Our Menu" — Menu introduction and online ordering prompt: Order Online

## support files
Files that are not pages. A line marked [content] holds words or data a visitor reads, so a
change to the site's content can land there; the rest only make the site work or look right.
- `robots.txt` — 91 bytes — too small to hold content
- `sitemap.xml` — Search engine sitemap listing website URLs
- `style.css` — Site styling and CSS helper classes for layout, typography, colors, and animations
- `js/main.js` — UI behavior, event handlers, rendering logic, and component initialization
- `js/menu-data.js` — the restaurant's full menu including dishes, descriptions, prices, and categories: Spring Rolls (Shrimp or Tofu), Egg Rolls (Pork or Vegetable), Cheese Rolls (Fried), Dumplings (Steam or Fried), Shrimp Tempura, Chicken Satay, Pork Skewers, Tom Yum (Red Soup), Tom Kha (Coconut Soup), Thai Fried Rice, Green Curry Fried Rice, Basil Fried Rice, Pineapple Fried Rice, Tiger Cry (Regular / Rib-eye), Jaiwai Rib-eye Pad Kra Pow, Jaiwai Special Pad Kra Pow, Chicken Khao Soi (Regular / Fried Chicken), Grilled / Fried Salmon Paradise, Papaya Salad, Beef Nam Tok (Regular / Rib-eye), Green Curry, Red Curry, Yellow Curry, Spicy Cashew Fever, Buddha Delight, Pad Kra Prow (Hot Basil), Beef Broccoli, Sesame Teriyaki Chicken, Pra Ram Chicken, Prik King, Pad Thai, Pad Kee Mao (Drunken Noodles), Pad See Ew, Angel Hair Pad Kee Mao, Pad Woon Sen, Mango Sticky Rice, Kids Chicken Fried Rice, Chicken Nuggets & French Fries  [content]

## shared (every page)
The header, navigation, mobile menu and footer are propagated from index.html to every other page by
`shell_propagation`. A change to any of them is made on index.html alone and copied automatically.
