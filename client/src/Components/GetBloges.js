import React, { useState, useEffect } from "react";

import { LOAD_BLOGES } from "../GraphQL/Queries";
import { useQuery, useMutation } from "@apollo/client";
import { DELETE_BLOG_MUTATION } from "../GraphQL/Mutations";
import { useNavigate, useLocation } from "react-router-dom";

function GetBloges() {
  const { data, refetch } = useQuery(LOAD_BLOGES);
  const [bloges, setBloges] = useState([]);
  const [deleteBlog, { data: successResponse, error }] =
    useMutation(DELETE_BLOG_MUTATION);

  const navigate = useNavigate();
  const location = useLocation();

  if (location?.state?.refetch) {
    refetch();
  }

  const toCreate = () => {
    navigate("/form", { state: { heading: " ", content: " ", update: false } });
  };

  const showMore = (val) => {
    navigate("/More", {
      state: {
        heading: val.heading,
        content: val.content,
        id: val.id,
        date: new Date().toLocaleString(),
      },
    });
  };

  const toUpdate = (val) => {
    console.log(val);
    navigate("/form", {
      state: {
        heading: val.heading,
        content: val.content,
        id: val.id,
        update: true,
      },
    });
  };

  const deleteBlogAction = (id) => {
    deleteBlog({
      variables: {
        id: id,
      },
    });
  };
  useEffect(() => {
    if (successResponse?.deleteBlog?.id) {
      refetch();
      console.log("Blog is deleted successfully!!!");
    } else if (error) {
      console.log("Error: " + error);
    }
  }, [successResponse, error, refetch]);

  useEffect(() => {
    if (data) {
      setBloges(data.getAllBloges);
    }
  }, [data]);

  const LongText = ({ content, limit }) => {
    const [showAll, setShowAll] = useState(false);

    const showLess = () => setShowAll(false);

    if (content.length <= limit) {
      return <div>{content}</div>;
    }

    if (showAll) {
      return (
        <div>
          {content}
          <button className="btn btn-link p-0" onClick={showLess}>
            Read less
          </button>
        </div>
      );
    }

    const toShow = content.substring(0, limit) + "...";
    return <div>{toShow}</div>;
  };

  return (
    <div >
      <div className="row">
        <h1 className="text-center">BLOG APP </h1>
      </div>
      <br />
      <div className="container mt-5">
        <div className="row">
          <br />

          {bloges.map((val) => {
            return (
              <div className="col-4 " key={val.id}>
                <div className="card " style={{ width: "18rem" }}>
                  <div className="Card-body">
                    <h1> {val.heading} </h1>

                    <h5> {val.date}</h5>

                    <h3>
                      {" "}
                      <LongText content={val.content} limit={50} />
                    </h3>
                    <footer>
                      <button
                        onClick={() => toUpdate(val)}
                        className="btn btn-warning"
                      >
                        {" "}
                        <i className="edit-button far fa-edit fa-2x button-css" />
                      </button>{" "}
                      <button
                        className="btn btn-info"
                        onClick={() => deleteBlogAction(val.id)}
                      >
                        {" "}
                        <i className="delete-button fas fa-trash fa-2x ml-2 button-css" />
                      </button>
                      <div className="gap-2 d-md-flex justify-content-md-end View">
                        <button
                          onClick={() => showMore(val)}
                          type="button"
                          className="btn btn-success me-md-2"
                        >
                          {" "}
                          ...
                        </button>
                      </div>
                    </footer>

                    <br />
                  </div>
                </div>
              </div>
            );
          })}

          <br />
        </div>
        <button onClick={toCreate} type="button" class="btn btn-primary button">
          CREATE BLOG
        </button>
      </div>
    </div>
  );
}

export default GetBloges;
