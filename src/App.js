import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Popup } from "semantic-ui-react";

function App() {
  const [product, setproduct] = useState([]);
  const [selectvalue, setselectvalue] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    axios({
      url: "https://fakestoreapi.com/products",
      method: "GET",
    }).then((res) => {
      setproduct(res.data);
    });
  }, []);
  let category = new Set(product.map((d) => d.category));
  category = [...category];

  let imageperpage = 5;
  const pagevisited = pageNumber * imageperpage;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  let tempproduct = product.filter((d) => {
    if (selectvalue === "All"||selectvalue==="") {
      return d;
    } else {
      return d.category === selectvalue;
    }
  });
  const pageCount =
    tempproduct.length > 0 ? Math.ceil(tempproduct.length / imageperpage) : 0;

  return (
    <>
      <h1>Products Available</h1>
      <div className="select">
        <select
          name="category"
          value={selectvalue}
          onChange={(e) => {
            setselectvalue(e.target.value);
          }}
          id="category"
        >
          <option id="All" value="All">
            ALL
          </option>
          {category.map((data, index) => (
            <option id={index} value={data}>
              {data}
            </option>
          ))}
        </select>
      </div>
      <div className="product_container">
        {product
          .filter((d) => {
            if (selectvalue === "All" || selectvalue === "") {
              return d;
            } else {
              return d.category === selectvalue;
            }
          })
          .slice(pagevisited, pagevisited + imageperpage)
          .map((d, index) => (
            <>
              <Popup
                content={
                  <div className="box ">
                    {" "}
                    <img src={d.image} alt="" />
                    <p>{d.description}</p>
                  </div>
                }
                key={d.name}
                header={d.name}
                trigger={<img className="Image" width={200} src={d.image} alt="" />}
              />
            </>
          ))}
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationbtns"}
        previousLinkClassName={"prevbtn"}
        nextLinkClassName={"nextbtn"}
        disabledClassName={"paginationdisabled"}
        activeClassName={"paginationactive"}
      />
    </>
  );
}

export default App;
