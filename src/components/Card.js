import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
export default function Card(props) {
  let data = useCart();
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.fooditem;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const priceRef = useRef();
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food !==[]) {
      if (food.size() === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      }
      else if(food.size!==size)
      {await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    return ;}
    return ;
    
    } 
    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };
  

  let finalPrice = qty * parseInt(options[size]);
  return (
    <div
      className="card mt-3 "
      style={{ width: "20rem", maxHeight: "500px", objectFit: "fill" }}
    >
      <img className="card-img-top" src={foodItem.img} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{foodItem.name}</h5>
        <p className="card-text">{foodItem.description}</p>
        <div className="container width-100">
          <select
            className="h-100 rounded m-2 bg-success"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {" "}
                  {i + 1}{" "}
                </option>
              );
            })}
          </select>
          <select
            className="h-100 rounded m-2 bg-success"
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <div className="d-inline h-100 fs-5">${finalPrice}/-</div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
