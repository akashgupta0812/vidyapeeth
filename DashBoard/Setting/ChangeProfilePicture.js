// import { useEffect,  useState } from "react"
// import { FiUpload } from "react-icons/fi"
// import { useDispatch, useSelector } from "react-redux"
// import IconBtn from "../../SupportComponents/common/IconBtn"
// // import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
// // import IconBtn from "../../../common/IconBtn"
// import { updateDisplayPicture } from "../../services/operations/SettingAPI/SettingAPI"
// import { setLoading } from "../../redux/slices/authReducer"
// export default function ChangeProfilePicture() {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const dispatch = useDispatch()
//   const [file, setFile] = useState(null);

//   console.log(file)

//   const handleFileChange = (event) => {
//     console.log("fileeeee ",event.target.files[0]);
//       setFile(event.target.files[0]);
//   }
// //   const [loading, setLoading] = useState(false)
// //   const [imageFile, setImageFile] = useState(null)
// //   const [previewSource, setPreviewSource] = useState(null)

// //   const fileInputRef = useRef(null)

// //   const handleClick = () => {
// //     fileInputRef.current.click()
// //   }

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0]
// //     // console.log(file)
// //     if (file) {
// //       setImageFile(file)
// //     //   previewFile(file)
// //     }
// //   }

// //   const previewFile = (file) => {
// //     const reader = new FileReader()
// //     reader.readAsDataURL(file)
// //     reader.onloadend = () => {
// //       setPreviewSource(reader.result)
// //     }
// //   }

// //   const handleFileUpload = () => {
// //     try {
// //       console.log("uploading...")
// //       setLoading(true)
// //       const formData = new FormData()
// //       formData.append("displayPicture", imageFile)
// //       // console.log("formdata", formData)
// //       dispatch(updateDisplayPicture(token, formData)).then(() => {
// //         setLoading(false)
// //       })
// //     } catch (error) {
// //       console.log("ERROR MESSAGE - ", error.message)
// //     }
// //   }
// const handleSubmit = (event) => {
//     event.preventDefault();
//     // setLoading(true)
//     console.log("file in last ",file);
    
//       const formData = new FormData();
//       // console.log("form dta ",formData);
//       formData.append('image', file);
//       // formData.append('name',"Akash");
//       // for(var x = 0; x<file.length; x++) {
//       //     data.append("image", file)
//       // }
//       // console.log("data ",formData);
//       // console.log("data ka image ",formData.image);
//       // axios.post('/upload', formData)
//       // .then((response) => {
//       //   // Handle the response from the server
//       //   console.log(response.data);
//       // })
//       // .catch((error) => {
//       //   // Handle any errors
//       //   console.error(error);
//       // });
//       // dispatch(updateDisplayPicture(token, formData))
//       dispatch(updateDisplayPicture(token, formData))
    
    
        
// }
// //   useEffect(() => {
// //     if (imageFile) {
// //     //   previewFile(imageFile)
// //     console.log("hiii");
// //     }
// //   }, [imageFile])
//   return (
//     <>
//       {/* <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
//         <div className="flex items-center gap-x-4">
//           <img
//             src={user?.image}
//             alt={`profile-${user?.firstName}`}
//             className="aspect-square w-[78px] rounded-full object-cover"
//           />
//           <div className="space-y-2">
//             <p>Change Profile Picture</p>
//             <div className="flex flex-row gap-3">
//               <input
//                 type="file"
//                 // ref={fileInputRef}
//                 onChange={handleFileChange}
//                 // className="hidden"
//                 accept="image/png, image/gif, image/jpeg"
//               />
//               <button
//                 onClick={handleClick}
//                 disabled={loading}
//                 className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
//               >
//                 Select
//               </button>
//               <IconBtn
//                 text={loading ? "Uploading..." : "Upload"}
//                 onclick={handleFileUpload}
//               >
//                 {!loading && (
//                   <FiUpload className="text-lg text-richblack-900" />
//                 )}
//               </IconBtn>
//             </div>
//           </div>
//         </div>
//       </div> */}
//         <img
//             src={user?.image}
//             alt={`profile-${user?.firstName}`}
//             className="aspect-square w-[78px] rounded-full object-cover"
//           />
//       <div>
       
//         <div className="" >

//             <label htmlFor="file">Upload File:</label>
//             <input 
//             className="form-control-file mb-3" 
//             type="file" id="file" 
//             // accept=".jpg"
          
//             onChange={handleFileChange}
//             />

//             <button 
//             className="btn btn-primary mt-3" 
//             onClick={handleSubmit}
//             >Upload</button>
//         </div>
       

//        {/* Display Image Here */}
//     </div>
//     </>
//   )
// }
import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { updateDisplayPicture } from "../../services/operations/SettingAPI/SettingAPI"

// import IconBtn from "../../../common/IconBtn"
import IconBtn from "../../SupportComponents/common/IconBtn"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("image", imageFile)
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])
  return (
    <>
      <div className="flex items-center justify-between rounded-md border-2 border-white bg-slate-800 p-8 px-12 text-white">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}