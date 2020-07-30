import React, { useEffect } from 'react';
import './categories.css';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllProducts } from '../../redux/actions'

const Categories = ({ getAllProducts }) => {
    useEffect(() => {
        getAllProducts()
    },[])
    let { category } = useParams();
    return (<div>{category}</div>)
}

export default connect(null, { getAllProducts })(Categories);