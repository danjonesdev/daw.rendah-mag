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

  const fetchData = async () => {
    const params = {
      currentCategory: null
    };

    const queryCategory = `
      *[_type == "category"] {
        "slug": slug.current,
        "name": title,
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
      <div className="App">
        <Store.Container>
          <Components store={mapSettingsFromData(data)} />
        </Store.Container>
      </div>
    );
  }

  return false;
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <App />,

  rootElement
);
