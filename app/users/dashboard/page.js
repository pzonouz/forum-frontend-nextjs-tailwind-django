"use client";

import {
  useEditUserMutation,
  useFetchUserQuery,
} from "@/app/redux_toolkit/consumeAPI";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function DashboardPage() {
  const { data: user, isSuccess } = useFetchUserQuery();
  const [editUser, { isError, error, isSuccess: editUserSuccess }] =
    useEditUserMutation();
  const [nickName, setNickName] = useState("");
  const [address, setAddress] = useState("");
  const [nickNameError, setNickNameError] = useState(false);

  useEffect(() => {
    fetch("http://localhost/api/v1/users/is_unique_nickname", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ nickName: nickName }),
    }).then((res) => {
      if (!res.ok) {
        setNickNameError(true);
      } else {
        setNickNameError(false);
      }
    });
  }, [nickName]);
  useEffect(() => {
    if (isError) {
      toast.error(error?.data);
    }
    if (editUserSuccess) {
      toast.success("با موفقعیت انجام شد");
    }
  }, [isError, editUserSuccess]);
  useEffect(() => {
    if (isSuccess) {
      setNickName(user?.nickName);
      setAddress(user?.address);
    }
  }, [isSuccess]);
  const sumbitHandler = (e) => {
    e.preventDefault();
    editUser({ nickName: nickName, address: address });
  };
  return (
    <form onSubmit={sumbitHandler} className="flex flex-col gap-2">
      <div>
        <input
          type="text"
          className={classNames("input w-full", {
            "error-border": nickNameError || nickName?.length == 0,
          })}
          placeholder="نام"
          value={nickName}
          onChange={(e) => {
            setNickName(e?.target?.value);
          }}
        />
        {nickNameError && <p className="error mt-0 "> قبلا ثبت شده است</p>}
        {nickName?.length == 0 && (
          <p className="error mt-0 ">نام را وارد کنید</p>
        )}
      </div>
      {/* <input */}
      {/*   type="text" */}
      {/*   {...register("phoneNumber")} */}
      {/*   className="input" */}
      {/*   placeholder="تلفن همراه" */}
      {/* /> */}
      {/* {errors?.phoneNubmer && ( */}
      {/*   <p className="error mt-0 ">{errors?.phoneNubmer?.message}</p> */}
      {/* )} */}
      <textarea
        value={address}
        onChange={(e) => {
          setAddress(e?.target?.value);
        }}
        className="input"
        rows={4}
      ></textarea>
      <button
        className="button button_primary"
        disabled={nickNameError || nickName?.length == 0}
      >
        تغییر
      </button>
    </form>
  );
}
