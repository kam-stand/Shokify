import { FaSearchengin } from "react-icons/fa6";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import { MdCategory } from "react-icons/md";
import { IoCart } from "react-icons/io5";
import "../styles.css/products.css"
export default function ProductsPage()
{


    return(
        <div className="product-container">
            <div className="product-search">
                <form>
                <input
                type="text"
                placeholder="Search..."
                />
                <button type="submit"><FaSearchengin size={25}/></button>
                </form>
            </div>
            <div className="product-nav">
                <div>
                    <button>

                    <FaSortAmountDownAlt size={25}/>
                    <div>
                        <p>size</p>
                    </div>
                    </button>
                </div>

                <div>
                    <button> 
                    <ImPriceTags size={25}/>
                    <div>
                        <p>price</p>
                    </div>
                    </button>
                </div>

                <div>
                    <button>

                    <MdCategory size={25}/>
                    <div>
                        <p>category</p>
                    </div>
                    </button>
                </div>
                <div>
                    <button>
                        <IoCart size={25}/>
                    <div>
                        <p>cart</p>
                    </div>
                    </button>
                    
                </div>
            </div>
        </div>
    )
}