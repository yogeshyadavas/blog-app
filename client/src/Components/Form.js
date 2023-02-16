import React, { useEffect } from "react";
import {
  CREATE_BLOG_MUTATION,
  UPDATE_BLOG_MUTATION,
} from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createBlog, { data: successResponse, error }] =
    useMutation(CREATE_BLOG_MUTATION);
  const [updateBlog, { data: updatesuccessResponse, updateerror }] =
    useMutation(UPDATE_BLOG_MUTATION);
  const navigate = useNavigate();
  const location = useLocation();

  const updateFlag = location.state.update;

  const toCancel = () => {
    navigate("/", { state: { heading: " ", content: " " } });
  };

  const onSubmit = (data) => {
    if (updateFlag) {
      updateBloes(data);
    } else {
      addBlog(data);
    }
  };

  const addBlog = (data) => {
    createBlog({
      variables: {
        data: {
          heading: data.heading,
          date: new Date().toLocaleString(),
          content: data.content,
        },
      },
    });
  };

  const updateBloes = (data) => {
    updateBlog({
      variables: {
        data: {
          id: location.state.id,
          heading: data.heading,
          date: new Date().toLocaleString(),
          content: data.content,
        },
      },
    });
  };

  useEffect(() => {
    if (successResponse?.createBlog?.id) {
      navigate("/", { state: { refetch: true } });
      console.log("A new Blog is added successfully!!!");
    } else if (error) {
      console.log("Error: " + error);
    }
  }, [successResponse, error, navigate]);

  useEffect(() => {
    if (updatesuccessResponse?.updateBlog?.id) {
      navigate("/", { state: { refetch: true } });
      console.log("A  Blog is updated successfully!!!");
    } else if (updateerror) {
      console.log("Error: " + updateerror);
    }
  }, [updatesuccessResponse, updateerror, navigate]);

  return (
    <div >
      <h1 style={{ textAlign: "center" }}> CREATE YOUR BLOG HERE </h1> <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className=" main">
          <h4> BLOG Heading</h4>
          <br />
          <input
            size="50"
            type="text"
            placeholder="Heading"
            name="heading"
            defaultValue={location.state.heading}
            {...register("heading", { required: true })}
           
          />
          
          {errors.heading && <span>This field is required</span>}
          <br />

          <h4>BLOG CONTENT</h4>
          <br />
          <textarea
            id="textarea"
             
            type="text"
            placeholder="Content"
            name="content"
            defaultValue={location.state.content}
            {...register("content", { required: true })}
            
          />
          <br />
          {errors.content && <span>This field is required</span>}
          <br />
          <br />
          <div id="button1">
          <button className="btn btn-success button1" type="submit">
            Submit
          </button>
          </div>
        </div>
       
      </form>
      <div id="button2">
        <button
          onClick={toCancel}
          type="button"
          className="btn btn-danger me-md-2"
        >
          Cancel
        </button>
      </div>
      <br />
    </div>
  );
}

export default Form;
