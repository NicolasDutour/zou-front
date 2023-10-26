# Project Ted

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

You can check out [GitHub repository](https://github.com/NicolasDutour/ted)

This project is a website where any restaurant can have his own page

### Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Deployment

This website has been deployed on [Vercel Platform](https://vercel.com)

### Hosting

This website is host on: [Hostinger](https://www.hostinger.fr/)

### Firebase CRUD
Ex: The `collection` restaurants has 1 or more `document` which has `values`

##### Create or update all document values

**`restaurants`** is the name of the collection
You need a `documentId` otherwise a new document will be created
```bash
const data = {} // => Values to send as an object
setDoc(doc(db, "restaurants", documentId), data)

```

##### Add a new document

**`restaurants`** is the name of the collection
```bash
const data = {} // => Values to send as an object
await addDoc(collection(db, "restaurants"), data)
```

##### Get 1 document in a collection

**`restaurants`** is the name of the collection
```bash
const documentId = "6DXPXHi6h0ZqufP2UkBH"
const docSnap = await getDoc(doc(db, "restaurants" documentId))
const data = docSnap.data() // =>  return an object
```

#### Get all collections

```bash
const restaurantsCollectionRef = collection(db, "restaurants")
const data = await getDocs(restaurantsCollectionRef)
const filterData = data.docs.map(doc => ({
    ...doc.data(), id: doc.id
   }))
  return filterData
```