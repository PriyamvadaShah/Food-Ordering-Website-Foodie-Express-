import React from 'react'
import { useState } from 'react';
import { assets } from '../../assets/assets'
import './Add.css'

import axios from "axios"
import { toast } from 'react-toastify';


export default function Add({url}) {


  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  })

  const onChangehandler = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setData(prev => ({ ...prev, [name]: value }));

  }

  const onSubmitHandler = async (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
   
try
  {  const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      });
      setImage(false);
      toast.success(response.data.msg);
    }
    else {
      toast.error(response.data.msg);
    }
  }
  catch(err){
    console.log(err);
  }
  }
  
  return (

    <div className='add'>
      <form className='adding' onSubmit={onSubmitHandler} >
        <div className='add-img-upload'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt='/' />
          </label>
          <input onChange={(evt) => setImage(evt.target.files[0])} type="file" id="image" hidden required />
        </div>

        <div className='add-product-name'>
          <p>Product Name</p>
          <input onChange={onChangehandler} value={data.name} type='text' name='name' placeholder='Type here' />
        </div>

        <div className='add-product-description'>
          <p>Product Description</p>
          <textarea onChange={onChangehandler} value={data.description} name='description' rows='5' placeholder='Write content here' />
        </div>

        <div className='category-price'>
          <div className='add-category'>
            <p>Product Category</p>
            <select onChange={onChangehandler} name="category">
            <option value="Starter">Starters</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pizza">Pizza</option>
              <option value="Burger">Burger</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className='add-price'>
            <p>Product Price</p>
            <input onChange={onChangehandler} value={data.price} type="number" name="price" placeholder='$20' />
          </div>

        </div>
        <div className="btn-div">
          <button className='add-btn'> ADD</button>
        </div>
      </form>

    </div>
  )
}
