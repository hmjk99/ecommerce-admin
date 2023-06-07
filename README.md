
# Pineapple_Admin

Pineapple-admin is a full-stack application that lets the admin login with their Google account and perform full CRUD functionality with products for the [Pineapple-Front](https://ecommerce-front-hmjk99.vercel.app/).The application was created using Next.js and styled with Tailwind CSS. MongoDB was used to create multiple models and relating them one-to-many.
## Features

- One-to-many realtionship between categories and products models. 
- Allows users login with their gmail account (NextAuth).
- Simple design using TailwindCSS.
- Full CRUD functionality for products and categories.
- Used AWS (Amazon Web Services) S3 Bucket to hold uploaded image files. 
- Assign parent category to each category.
- Upload multiple images for each products.
- Add multiple properties to each categories.

## Demo

Live link: https://ecommerce-admin-hmjk99.vercel.app/

![Alt Text](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmYwNDAwMWNiZDk5NWQ0ZDI2YTIxNDNjZTFmYTlkNWRkZmY5NmZiYSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/ek658Qo2dBkew47l5b/giphy.gif)

## Run Locally

Clone the project

```bash
  git clone https://github.com/hmjk99/pineapple-admin.git
```

Go to the project directory

```bash
  cd pineapple-admin
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Related

Here are some related projects

- [Pineapple_Front](https://github.com/hmjk99/pineapple-front)

