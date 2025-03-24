import { useState, useRef } from "react";

import './style.css'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axiosInstance from "../../helpers/axios";
import { toast } from "react-toastify";
function Post() {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const data = useSelector((state: RootState) => state.userData);
  const [textContent,setTextContentt]=useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  
  
  
  const makePost = async () => {
    const formData = new FormData();
    formData.append("type", "image");
    
    if (selectedFile) {
      formData.append("media", selectedFile);
    }
    
    formData.append("textContent", textContent);
  
    console.log("FormData Debugging:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      const response = await axiosInstance.post("/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 200) {
        toast.info("Post Successfully made");
        setPreview(null);
        setSelectedFile(null);
        setTextContentt("");
      }
    } catch (error) {
      console.error("Error making post:", error);
      toast.error("Failed to make post");
    }
  };
  

  return (
    <div className="page-post">

      <div className="top-section">
        <img className="profile-pic" src={data.profilePic && data.profilePic.trim() !== "" ? data.profilePic : "/icons/user-image-with-black-background.png"} alt="Profile Pic" />
        <div className="content-area">
          <strong>{data.name}</strong>
          <textarea placeholder="Write a message ..." onChange={(e)=>setTextContentt(e.target.value)} className="content-text" />
        </div>
      </div>

      {
        !preview &&
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          alt=""
          onChange={handleFileChange}
          className="hidden-file-input"
        />
      }

      {preview && <div className="image-holder">
        <div className="close-button" onClick={() => setPreview(null)}>Close image</div>
        <img src={preview} className="content-image" alt="Preview" />
      </div>}

      <button className="button-base-normal" onClick={makePost}>Add Post</button>


    </div>
  );
}

export default Post;
