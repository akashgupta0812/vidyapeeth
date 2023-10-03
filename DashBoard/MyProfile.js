import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../utils/dateFormatter"
import IconBtn from "../SupportComponents/common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  // console.log("user   ",user);
  const navigate = useNavigate()

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-slate-300">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-slate-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.first_name}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-white">
              {user?.first_name + " " + user?.last_name}
            </p>
            <p className="text-sm text-white">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-slate-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-white">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-white"
              : "text-white"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-white bg-slate-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-white">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-white">First Name</p>
              <p className="text-sm font-medium text-white">
                {user?.first_name}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-white">Email</p>
              <p className="text-sm font-medium text-white">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-white">Gender</p>
              <p className="text-sm font-medium text-white">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-white">Last Name</p>
              <p className="text-sm font-medium text-white">
                {user?.last_name}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-white">Phone Number</p>
              <p className="text-sm font-medium text-white">
                {user?.additionalDetails?.phone ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-white">Date Of Birth</p>
              <p className="text-sm font-medium text-white">
                {formattedDate(user?.additionalDetails?.DateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}