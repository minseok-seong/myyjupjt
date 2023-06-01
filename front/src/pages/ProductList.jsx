import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Pagination } from "@mui/material";
import { mobile } from "../components/responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  ${mobile({ marginTop: "50px" })}
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ alignItem: "center" })}
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const Paging = styled(Pagination)`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;

const ProductList = () => {
  const location = useLocation();
  const cat = decodeURI(location.pathname.split("/")[2]);
  const [category, setcategory] = useState(cat);
  const [sort, setsort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setcategory(value);
  };

  return (
    <Container>
      <Announcement />
      <Navbar />

      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>학과명:</FilterText>
          <Select onChange={handleFilters}>
            <Option disabled selected>
              학과명
            </Option>
            <Option>간호학과</Option>
            <Option>컴퓨터과</Option>
            <Option>펫케어과</Option>
            <Option>전기과</Option>
            <Option>부사관과</Option>
            <Option>유아교육과</Option>
            <Option>디자인과</Option>
            <Option>기계과</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>정렬:</FilterText>
          <Select onChange={(e) => setsort(e.target.value)}>
            <Option value="newest">최신순</Option>
            <Option value="asc">높은가격순</Option>
            <Option value="desc">낮은가격순</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={category} sort={sort} />
      <Paging count={10} color="primary" />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
