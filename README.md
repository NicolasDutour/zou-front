# Project Zou-front

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

You can check out [GitHub repository](https://github.com/NicolasDutour/Zou-front)

This project is a website where any restaurant can have his own page

### Getting Started

NextJs v14 is used, so you need Node version > 18.8 to make it work

Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Deployment

This website has been deployed on [Vercel Platform](https://vercel.com)

### Hosting

This website is host on: [Hostinger](https://www.hostinger.fr/)

### How Stripe works. The steps
1. Create a customer
2. Create a product with the Id of the customer (ex: abonnement)
3. Create a price with the Id of the product
4. Create a session checkout
5. Redirect to stripe integrated page for payment

### Tips
- Simulate call Api:
```bash
  await new Promise(resolve => setTimeout(resolve, 3000))
```

### Idées amélioration du site
- servives en plus des 4 que j'ai déjà " à emporter", "drive"....
  accessible PMR
  Terrasse
  climatisation

- galerie d'images: next lib for that

- paiements disponibles pour le resto: espèces, chèque, paiement sans contact: mastercad, ticket resto, Visa