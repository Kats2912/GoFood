import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";
import Card from "../components/Card";
import Carousal from "../components/Carousal";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {

  const [search,setSearch]= useState('');

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseCat = await fetch("http://localhost:5000/api/foodCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    response = Object.values(response);
    response = Object.values(response[0]);
    responseCat = await responseCat.json();
    responseCat = Object.values(responseCat);
    responseCat = Object.values(responseCat[0]);
    //response = JSON.stringify(response);

    setFoodItem(response);
    setFoodCat(responseCat);

    console.log(foodItem);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="bg-dark">
      <div>
        <Navbar />
      </div>
      <div>
      <div><div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"fill !important"}}>
    <div className="carousel-inner" id='carousel'>
        <div className='carousal-caption 'style={{zIndex:"10"}}>
        <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value = {search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
    </div>
        </div>
      <div className="carousel-item active">
        <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100" alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://source.unsplash.com/random/300×300/?pizza" className="d-block w-100" alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://source.unsplash.com/random/300×300/?chocolate" className="d-block w-100" alt="..."/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div></div>
      </div>
      <div className="container">
        {foodCat !== [] ? 
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="bg-white fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr/>
              {
                foodItem!==[]?
                foodItem.filter((item)=>(item.CategoryName===data.CategoryName)&&item.name.toLowerCase().includes(search.toLocaleLowerCase())).
                map(filterItems=>{
                  return (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card 
                      fooditem = {filterItems}
                      options = {filterItems.options[0]}
                      ></Card>
                    </div>
                  )
                }):<div>""""</div>
              }
              </div>
            );
          }
        ) : (
          <div>""""</div>
        )}
       
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
