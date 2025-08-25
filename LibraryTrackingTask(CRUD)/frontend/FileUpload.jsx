import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUpload = () => {
  const [data, setData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(true);

  // formdata for add/update
  const [formdata, setFormData] = useState({
    bookImg: "",
    book_name: "",
    Author: "",
    Borrower_name: ""
  });

  // Input handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle File upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      bookImg: e.target.files[0],
    }));
  };

  // POST API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      if (formdata.bookImg instanceof File) {
        fd.append("bookImg", formdata.bookImg);
      }
      fd.append("book_name", formdata.book_name);
      fd.append("Author", formdata.Author);
      fd.append("Borrower_name", formdata.Borrower_name);

      const response = await axios.post(
        "http://localhost:4050/librarybook",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("POST response:", response.data);

      const newBook = response.data?.data || response.data; // handle both cases
      if (newBook && newBook._id) {
        setData((prev) => [...prev, newBook]);
      }

      // reset
      setFormData({
        bookImg: "",
        book_name: "",
        Author: "",
        Borrower_name: ""
      });
      e.target.reset(); // clear file input

      getBookAPI();
    } catch (error) {
      console.log("Error in post api", error.message);
    }
  };
  //get
 const getBookAPI = async () => { 
  try { 
    const response = await axios.get("http://localhost:4050/showBooks"); 
    setData(response.data.data); 
  } 
 catch (error) 
 { 
  console.log("Error in get api", error.message); 
 } }; 
 useEffect(() => { getBookAPI(); }, []);

  useEffect(() => {
    getBookAPI();
  }, []);

  // DELETE API
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4050/deletebook/${id}`);
      setData((list) => list.filter((item) => item && item._id !== id));
    } catch (error) {
      console.log("Error delete api", error.message);
    }
  };

  // EDIT
  const handleEdit = (list) => {
    setFormData(list);
    setButtonStatus(false);
  };

  const handleCancel = () => {
    setButtonStatus(true);
    setFormData({
      bookImg: "",
      book_name: "",
      Author: "",
      Borrower_name: ""
    });
      useEffect(() => {
    getBookAPI();
  }, []);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4050/updatebook/${formdata._id}`,
        formdata
      );
      console.log("Put list", response.data.data);
      const updateData = response.data.data;
      setUser((user) =>
        user.map((list) => (list._id === updateData._id ? updateData : list))
      );

      handleCancel();
    } catch (error) {
      console.log("Error in put api", error.message);
    }
  };
  return (
    <div>
      <h2 className="text-center font-bold ">Library Book Uploader</h2>
      <form onSubmit={buttonStatus ? handleSubmit : handleUpdate}>
        <label>Upload your file</label> <br />
        <input
          type="file"
          onChange={handleFileChange}
           name="bookImg"
           className="border-black bg-amber-400 rounded-full"/>
        <div>
          <label>Book Name</label> <br />
          <input
            type="text"
            placeholder="enter book name"
            className="border-2 p-4 rounded"
            name="book_name"
            value={formdata.book_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Author</label> <br />
          <input
            type="text"
            placeholder="enter author"
            className="border-2 p-4 rounded"
            name="Author"
            value={formdata.Author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Borrower Name</label> <br />
          <input
            type="text"
            placeholder="enter Borrower name"
            className="border-2 p-4 rounded"
            name="Borrower_name"
            value={formdata.Borrower_name}
            onChange={handleChange}
          />
        </div>

        <br />
        {buttonStatus ? (
          <input
            type="submit"
            className="bg-blue-500 p-4 rounded-2xl"
            value="Submit File"
          />
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 p-4 rounded-2xl"
            >
              Update
            </button>
            <button
              onClick={handleCancel}
              className="bg-blue-500 p-4 rounded-2xl"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
     <div className="p-4">
       <table className="table-auto  w-full text-left ">
        <thead>
          <tr>
            <th className="px-4 py-2 ">BookImg</th>
            <th className="px-4 py-2 ">Book</th>
            <th className="px-4 py-2 ">Author</th>
            <th className="px-4 py-2 ">Borrower Name</th>
            <th className="px-4 py-2 ">Edit</th>
            <th className="px-4 py-2 ">Delete</th>
          </tr>
        </thead>
       <tbody>
  {data.map((list) => (
    <tr key={list._id}>
      <td>
        {list.bookImg ? (
          <img
            src={`http://localhost:4050/files/${list.bookImg}`}
            alt="Book"
            width="80"
          />
        ) : (
          "No image"
        )}
      </td>
      <td>{list.book_name}</td>
      <td>{list.Author}</td>
      <td>{list.Borrower_name}</td>
      <td>
        <button onClick={() => handleEdit(list)} className="bg-green-500 p-3 rounded">
          Edit
        </button>
      </td>
      <td>
        <button onClick={() => handleDelete(list._id)} className="bg-red-500 p-3 rounded">
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
     </div>
    </div>
  );
};

export default FileUpload;
