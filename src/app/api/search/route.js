export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || 'iphone';

  const demoResults = [
    { title: "Apple iPhone 16 Pro 256GB", price: "1.189", shop: "Coolblue", image: "https://image.coolblue.nl/max/500x500/products/1938423", url: "https://coolblue.nl/product/1938423" },
    { title: "iPhone 16 Pro Max", price: "1.399", shop: "Bol.com", image: "https://image.bol.com/is/image/BOL/9300000199671473", url: "https://bol.com/nl/nl/p/apple-iphone-16-pro-max/9300000199671473/" },
    { title: "Sony PlayStation 5 Slim", price: "474", shop: "Coolblue", image: "https://image.coolblue.nl/max/500x500/products/1782938", url: "https://coolblue.nl/product/1782938" },
    { title: "Philips Airfryer XXL", price: "179", shop: "Amazon.nl", image: "https://m.media-amazon.com/images/I/81t0m3g5K6L._AC_SL1500_.jpg", url: "https://amazon.nl/dp/B0B2K9L5N2?tag=thieschr-21" },
    { title: "Samsung 55\" OLED TV", price: "1.299", shop: "Bol.com", image: "https://image.bol.com/is/image/BOL/9300000187654321", url: "https://bol.com" },
    { title: "Nintendo Switch OLED", price: "309", shop: "Coolblue", image: "https://image.coolblue.nl/max/500x500/products/1678901", url: "https://coolblue.nl/product/1678901" },
  ];

  return Response.json({ results: demoResults });
}