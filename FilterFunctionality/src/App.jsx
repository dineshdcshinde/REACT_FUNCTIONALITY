import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import formData from "./db/Data.json";

function App() {
  const [products, setProducts] = useState([...formData.products]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [productName, setproductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // filtered Logic
  const onSearch = () => {
    let filtered = products.filter((product) => {
      return (
        (!productName ||
          product.title.toLowerCase().includes(productName.toLowerCase())) &&
        (!price || product.price <= Number(price)) &&
        (!category ||
          product.category.toLowerCase().includes(category.toLowerCase()))
      );
    });
    setFilteredProducts(filtered);
  };

  // const getProducts = async () => {
  //   try {
  //     let response = await fetch(`https://dummyjson.com/products`);
  //     let data = await response.json();
  //     setProducts(data.products);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // getProducts();
    onSearch();
  }, [productName, category, price]);

  return (
    <>
      <div className="wrapper min-h-screen w-full bg-[#3c3c3c] text-white ">
        <header>
          <nav className="flex justify-between p-2 ">
            <div className="navLeft">
              <h4 className="text-2xl font-semibold pl-4">Product List</h4>
            </div>
            <div className="navRight flex justify-between gap-2 items-center">
              <input
                type="text"
                placeholder="Search By Product"
                className=" text-black outline-none border-none  rounded pl-1"
                value={productName}
                onChange={(e) => setproductName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Search By Price"
                className=" text-black outline-none border-none  rounded pl-1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="text"
                placeholder="Search By Category"
                className=" text-black outline-none border-none  rounded pl-1"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </nav>
        </header>

        <div className="flex w-full">
          <div className="filteredArea w-[15%]  p-2 pl-4">
            <ul>
              {[...new Set(products.map((product) => product.category))].map(
                (uniqueCategory, idx) => {
                  return (
                    <li
                      key={idx}
                      className="m-2 px-2 py-2 rounded-md bg-slate-500 text-center cursor-pointer transition"
                      onClick={() => setCategory(uniqueCategory)}
                    >
                      {uniqueCategory}
                    </li>
                  );
                }
              )}
              <li
                className="m-2 px-2 py-2 rounded-md bg-red-500 text-center cursor-pointer transition"
                onClick={() => {
                  setproductName("");
                  setPrice("");
                  setCategory("");
                }}
              >
                Clear All
              </li>
            </ul>
          </div>

          <div className="productContainer w-[85%]  flex  flex-wrap justify-around gap-4 p-2">
            {filteredProducts.map((product) => (
              <div
                className="productCard p-1 bg-neutral-600 shadow-lg w-[30%] hover:scale-105 transition-transform duration-300 ease-in-out m-1"
                key={product.id}
              >
                <div className="image flex justify-center items-center">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-60 w-60 object-cover rounded-md"
                  />
                </div>
                <div className="productInfo m-2 flex justify-center items-center flex-col">
                  <p className="text-xl font-semibold">{product.title}</p>
                  <p className="text-lg flex justify-between w-[80%] m-2">
                    <span className="bg-[#21a7eacc] px-4 rounded-full">
                      {product.category}
                    </span>
                    ₹{product.price}
                  </p>
                  <button className="mt-2 bg-[#ff6600] text-white py-1 px-4 rounded hover:bg-[#ff4500]">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
