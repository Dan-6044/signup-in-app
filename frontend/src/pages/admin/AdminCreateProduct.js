import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminCreateProduct = () => {
 const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    //categories from the backend
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        axios.get('/api/category/all')
        .then(cat =>{
            console.log(cat.data.categories);
            setCategories(cat.data.categories)
        })
        .catch(error =>{
            console.log(error)
        })
    }, [])

    //handle and convert it in base 64
    const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setImage(reader.result);
        }

    }
    
    //submit the form
    const submitForm = async (e) =>{
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/product/create', {name, description, price, category, image})
            if  (data.success === true){
                setName('');
                setDescription('');
                setPrice('');
                setCategory('');
                setImage('');
                toast.success('product created successfully')
            }
            console.log(data);
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <>
      <Header />
      <div className="container-fluid flex-grow-1 custom_class d-flex flex-column min-vh-100">
        <h2 className="signup_title text-center text-primary mb-1">CREATE PRODUCT</h2>
        <form className="col-sm-6 offset-3 pt-5 signup_form" encType="multipart/form-data" onSubmit={submitForm}>
          <div className="form-group mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group mb-1">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="form-control select select-initialized"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose Category</option>
              {categories && categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-control"
              onChange={handleImage}
            />
          </div>

          <img className="img-fluid" src={image} alt="" />
          <button type="submit"className="btn btn-primary btn-block mb-4">
            Create
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AdminCreateProduct;
