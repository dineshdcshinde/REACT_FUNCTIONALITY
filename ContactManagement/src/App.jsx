import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  const [allContacts, setAllContacts] = useState([]);
  const fileInputRef = useRef();

  const [editingId, setEditingId] = useState(null);

  const [contactInfo, setcontactInfo] = useState({
    name: "",
    contact: "",
    email: "",
    id: nanoid(),
    photourl: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      const editUpdateContatcts = allContacts.map((contact) => {
        if (contact.id === editingId) {
          return {
            ...contact,
            name: contactInfo.name,
            contact: contactInfo.contact,
            email: contactInfo.email,
            photourl: contactInfo.photourl,
          };
        }
      });

      setAllContacts(editUpdateContatcts);
      setEditingId(null);
    } else {
      setAllContacts([...allContacts, contactInfo]);
    }

    setcontactInfo({
      name: "",
      contact: "",
      email: "",
      id: nanoid(),
    });

    if (fileInputRef) {
      fileInputRef.current.value = null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcontactInfo({ ...contactInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setcontactInfo({ ...contactInfo, photourl: URL.createObjectURL(file) });
    }
  };

  const handleDelete = (id) => {
    const updatedContact = allContacts.filter((contact) => contact.id !== id);
    setAllContacts(updatedContact);
  };

  const handleEdit = ({ id, name, contact, photourl, email }) => {
    setEditingId(id);
    setcontactInfo({
      name: name,
      contact: contact,
      email: email,
    });
  };

  return (
    <>
      <div className="wrapper w-full flex min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 p-6">
        <div className="formContainer w-1/3 min-h-screen bg-indigo-600 p-6 rounded-lg shadow-lg">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-white text-xl font-semibold text-center">
              Add Contact
            </h2>

            <div className="flex flex-col">
              <label className="text-white">Name:</label>
              <input
                type="text"
                placeholder="Enter Name"
                onChange={handleChange}
                value={contactInfo.name}
                name="name"
                className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white">Contact:</label>
              <input
                type="number"
                placeholder="Enter Contact Number"
                onChange={handleChange}
                value={contactInfo.contact}
                name="contact"
                className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white">Email:</label>
              <input
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={contactInfo.email}
                name="email"
                className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white">Photo:</label>
              <input
                type="file"
                name="photourl"
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={editingId ? true : false}
                className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button className="py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all">
              Add
            </button>
          </form>
        </div>

        <div className="output w-2/3 pl-4 flex flex-wrap gap-4">
          {allContacts.map((contact) => (
            <div
              className="contactCard flex flex-col items-center h-fit bg-white p-4 rounded-lg shadow-lg w-[30%]
                "
              key={contact?.id}
            >
              <div className="imageSection flex justify-center items-center mb-3">
                <img
                  src={contact?.photourl}
                  alt={contact?.name}
                  className="h-[100px] w-[100px] object-cover rounded-full border-4 border-indigo-500"
                />
              </div>

              <div className="contactDetails flex justify-center items-center flex-col">
                <p className="font-semibold text-lg">{contact?.name}</p>
                <p className="text-gray-500">{contact?.email}</p>
                <p className="text-indigo-600 font-medium flex justify-center items-center gap-2">
                  <span>{contact?.contact}</span>
                  <i className="ri-clipboard-line cursor-pointer hover:text-indigo-800"></i>
                </p>
              </div>

              <div className="functionality flex justify-around items-center w-full mt-3">
                <button
                  className="text-red-500 hover:text-red-700 transition-all"
                  onClick={() => handleDelete(contact?.id)}
                >
                  <i className="ri-delete-bin-6-line text-2xl"></i>
                </button>

                <button
                  className="text-blue-500 hover:text-blue-700 transition-all"
                  onClick={() =>
                    handleEdit(contact)
                  }
                >
                  <i className="ri-pencil-fill text-2xl"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
