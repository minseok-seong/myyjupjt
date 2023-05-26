import "./App.css";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Community from "./pages/Community";
import Upload from "./pages/Upload";
import Post from "./pages/Post";
import { Edit } from "./pages/Edit";
import ProductUpload from "./pages/ProductUpload";
import Mypage from "./pages/Mypage";
import Ai from "./pages/Ai";
import Message from "./pages/Message";
import SellMessages from "./pages/SellMessages";
import BuyerMessages from "./pages/BuyerMessages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        {/* <Route path=":category" element={<ProductList />} /> */}
        {/* </Route> */}
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/ai" element={<Ai />} />

        <Route path="/productUpload" element={<ProductUpload />} />
        <Route path="/register" element={<Register />} />
        <Route path="/community" element={<Community />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/sellmessage/:id" element={<SellMessages />} />
        <Route path="/buyermessage/:id" element={<BuyerMessages />} />
        <Route path="/message/:id" element={<Message />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
