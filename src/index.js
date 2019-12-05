import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Store from "./store";
import Components from "./components";

import "./styles.scss";

import sanity from "./store/sanity";
import { mapSettingsFromData } from "./store/map-settings-from-data";

function App() {
  const [isFetching, setFetching] = useState(false);
  const [data, setData] = useState([]);

  function setDocHeight() {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight / 100}px`
    );
  }

  window.addEventListener("resize", function() {
    console.log("resize");
    setDocHeight();
  });
  window.addEventListener("orientationchange", function() {
    console.log("orientation");
    setDocHeight();
  });

  setDocHeight();

  const fetchData = async () => {
    const params = {
      currentCategory: null
    };

    const queryCategory = `
      *[_type == "category"] {
        "slug": slug.current,
        "name": title,
        "color": color
      }
    `;

    const queryPacks = `
      *[_type == "pack"] {
        "slug": slug.current,
        "name": title,
        "samples": *[_type == "sample" && references(*[_type=="category" && title == $currentCategory]._id) && references(^._id)] {
          "slug": slug.current,
          "name": title,
          ...,
        }
      }
    `;

    const data = [];

    const request = await sanity.fetch(queryCategory).then(sanityCategories => {
      if (sanityCategories) {
        const forLoop = async () => {
          for (let i = 0; i < sanityCategories.length; i++) {
            params.currentCategory = sanityCategories[i].name;

            const category = {
              slug: sanityCategories[i].slug,
              name: sanityCategories[i].name,
              color: sanityCategories[i].color,
              packs: null
            };

            await sanity.fetch(queryPacks, params).then(sanityPacks => {
              if (sanityPacks) {
                category.packs = sanityPacks;
              } else {
                console.warn("Error retrieving pack");
              }
            });

            data.push(category);
          }

          return data;
        };

        return forLoop();
      } else {
        return null;
      }
    });

    return request;
  };

  useEffect(function fetch() {
    (async function() {
      setFetching(true);
      setData(await fetchData());
      setFetching(false);
    })();
  }, []);

  if (isFetching) {
    return <div>Fetching data....</div>;
  }

  if (data.length) {
    return (
      <>
        <div className="App">
          <Store.Container>
            <Components store={mapSettingsFromData(data)} />
          </Store.Container>
        </div>
        <div className="device-orientation-message  align-center  justify-center  bg-white  w-100">
          <div className="flex  flex-wrap  align-center  justify-center  ph4">
            <img
              alt="Rendah Mag Logo"
              className="db  w3  mb4  ph2"
              src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1575305028/brand/small-inverted.png"
            />
            <p className="black  f3  bold  tac  w-100">Welcome to</p>
            <p className="black  f2  bold  tac  mb2  w-100">Rendah Mag DAW</p>
            <p className="black  f4  tac  mb5  w-100">
              To begin, please turn your <br /> device to landscape.
            </p>

            <span>
              <svg
                className="w4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#000000"
              >
                <path d="M14 12h-4v-12h4v12zm6.949-4.493l1.81-.857c-.353-.7-.758-1.368-1.236-1.981l-1.512 1.318c.36.474.667.986.938 1.52zm-.797-4.299c-.589-.54-1.214-1.038-1.9-1.454l-1.216 1.599c.577.334 1.104.739 1.602 1.177l1.514-1.322zm1.827 7.792h2.006c-.072-.861-.229-1.694-.473-2.493l-1.82.862c.144.527.23 1.074.287 1.631zm-1.895 6.919l1.539 1.29c.465-.616.871-1.276 1.211-1.976l-1.846-.787c-.259.519-.562 1.011-.904 1.473zm1.912-4.919c-.054.54-.162 1.063-.299 1.574l1.864.795c.224-.762.372-1.553.439-2.369h-2.004zm-3.258 6.403c-1.779 1.608-4.129 2.597-6.713 2.597-5.525 0-10.021-4.486-10.021-10 0-1.913.554-3.691 1.496-5.207l2.162 2.162 1.353-7.014-7.015 1.351 2.045 2.045c-1.287 1.904-2.045 4.191-2.045 6.663 0 6.627 5.385 12 12.025 12 3.204 0 6.107-1.259 8.264-3.297l-1.551-1.3z" />
              </svg>
            </span>
          </div>
        </div>
      </>
    );
  }

  return false;
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <App />,

  rootElement
);
